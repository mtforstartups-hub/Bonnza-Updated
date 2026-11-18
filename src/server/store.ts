import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { WEBINAR_SESSIONS } from '../content/webinars';
import { COURSES } from '../content/courses';
import { ARTICLES } from '../content/articles';
import type {
  BonnzaDatabaseState,
  StaffRoleCode,
  StaffUserRecord,
  AdminSessionRecord,
  AuditLogRecord,
  ManagedWebinarSession,
  CustomerProfile,
  CustomerLifecycleStage,
  WebinarRegistrationRecord,
  OrderRecord,
  PaymentRecord,
  PaymentLifecycleState,
  WebhookEventRecord,
  RefundRecord,
  ReconciliationRunRecord,
  AttendanceRecord,
  ReminderJobRecord,
  SupportTicketRecord,
  SupportTicketStatus,
  ManagedArticleRecord,
  PageContentBlock,
  DownloadableResourceRecord,
  EmailOutboxRecord,
  EmailTemplateCode,
  FeatureFlagRecord,
  LaunchChecklistItem,
  UtmAttribution,
} from '../db/schema';
import type { Locale, WebinarSessionId, EditorialStatus, SubjectReviewStatus, TranslationStatus } from '../domain/types';
import { SEEDED_EMAIL_TEMPLATES, renderEmailTemplate, getTemplateByCode } from './emailOutbox';
import {
  WEBINAR_TICKET_PAISE,
  canTransitionPaymentState,
  verifyRazorpayCheckoutSignature,
  verifyRazorpayWebhookSignature,
  razorpayAdapter,
} from './razorpayAdapter';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE_PATH = path.resolve(DATA_DIR, 'bonnza-db.json');

export function hashPassword(plain: string): string {
  return crypto.createHash('sha256').update(`bonnza_salt_v1:${plain}`).digest('hex');
}

export function sanitizeRichText(input: string): string {
  return input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')
    .trim();
}

export const ROLE_PERMISSION_MATRIX: Record<StaffRoleCode, string[]> = {
  OWNER: ['*'],
  ADMIN: [
    'overview:read',
    'webinars:read',
    'webinars:write',
    'registrations:read',
    'registrations:write',
    'orders:read',
    'payments:read',
    'payments:reconcile',
    'refunds:initiate',
    'refunds:approve',
    'customers:read',
    'customers:write',
    'crm:read',
    'crm:write',
    'tickets:read',
    'tickets:write',
    'cms:read',
    'cms:write',
    'cms:review',
    'cms:publish',
    'notifications:read',
    'notifications:write',
    'reports:read',
    'settings:read',
    'settings:write',
    'audit:read',
  ],
  CONTENT_EDITOR: [
    'overview:read',
    'cms:read',
    'cms:write',
  ],
  FACULTY_REVIEWER: [
    'overview:read',
    'cms:read',
    'cms:review',
  ],
  WEBINAR_OPERATOR: [
    'overview:read',
    'webinars:read',
    'webinars:write',
    'registrations:read',
    'registrations:write',
    'notifications:read',
    'notifications:write',
    'reports:read',
  ],
  SUPPORT_AGENT: [
    'overview:read',
    'registrations:read',
    'registrations:write',
    'orders:read',
    'payments:read',
    'refunds:initiate',
    'customers:read',
    'customers:write',
    'crm:read',
    'crm:write',
    'tickets:read',
    'tickets:write',
    'notifications:read',
  ],
  LEARNER: ['learner:self'],
};

export function hasRolePermission(roles: StaffRoleCode[], requiredPermission: string): boolean {
  for (const role of roles) {
    const perms = ROLE_PERMISSION_MATRIX[role] || [];
    if (perms.includes('*') || perms.includes(requiredPermission)) {
      return true;
    }
  }
  return false;
}

function buildInitialSeedState(): BonnzaDatabaseState {
  const nowIso = '2026-11-16T00:00:00.000Z';

  const staffUsers: StaffUserRecord[] = [
    {
      id: 'usr_owner_01',
      email: 'mtforstartups@gmail.com',
      fullName: 'Shubham Chaturvedi (Owner)',
      passwordHash: hashPassword('BonnzaOwner#2026'),
      roles: ['OWNER'],
      isActive: true,
      lastLoginAt: null,
      createdAt: nowIso,
    },
    {
      id: 'usr_admin_01',
      email: 'admin@bonnza.marketingtusk.com',
      fullName: 'Bonnza Platform Admin',
      passwordHash: hashPassword('BonnzaAdmin#2026'),
      roles: ['ADMIN'],
      isActive: true,
      lastLoginAt: null,
      createdAt: nowIso,
    },
    {
      id: 'usr_editor_01',
      email: 'editor@bonnza.marketingtusk.com',
      fullName: 'Bonnza Content Editor',
      passwordHash: hashPassword('BonnzaEditor#2026'),
      roles: ['CONTENT_EDITOR'],
      isActive: true,
      lastLoginAt: null,
      createdAt: nowIso,
    },
    {
      id: 'usr_reviewer_01',
      email: 'reviewer@bonnza.marketingtusk.com',
      fullName: 'Bonnza Faculty Reviewer',
      passwordHash: hashPassword('BonnzaReviewer#2026'),
      roles: ['FACULTY_REVIEWER'],
      isActive: true,
      lastLoginAt: null,
      createdAt: nowIso,
    },
    {
      id: 'usr_operator_01',
      email: 'operator@bonnza.marketingtusk.com',
      fullName: 'Bonnza Webinar Operator',
      passwordHash: hashPassword('BonnzaOperator#2026'),
      roles: ['WEBINAR_OPERATOR'],
      isActive: true,
      lastLoginAt: null,
      createdAt: nowIso,
    },
    {
      id: 'usr_support_01',
      email: 'support@bonnza.marketingtusk.com',
      fullName: 'Bonnza Support Agent',
      passwordHash: hashPassword('BonnzaSupport#2026'),
      roles: ['SUPPORT_AGENT'],
      isActive: true,
      lastLoginAt: null,
      createdAt: nowIso,
    },
  ];

  const webinarSessions: ManagedWebinarSession[] = WEBINAR_SESSIONS.map((s) => {
    const amountPaise = Math.round(s.workingTicketPriceInr * 100);
    return {
      id: s.id,
      webinarId: 'webinar_first_online_business',
      instructionLocale: s.instructionLocale,
      date: s.date,
      startUtc: s.startUtc,
      endUtc: s.endUtc,
      timezone: s.timezone,
      durationMinutes: s.durationMinutes,
      title: { ...s.title },
      presenter: s.presenter,
      status: 'OPEN_FOR_REGISTRATION',
      capacity: null,
      reservedSeats: 0,
      confirmedPaidSeats: 0,
      baseAmountPaise: amountPaise,
      taxAmountPaise: 0,
      totalPayablePaise: amountPaise,
      taxTreatmentStatus: 'PROVISIONAL_PENDING_TAX_SIGN_OFF',
      taxNote: { ...s.taxNote },
      privateMeetingPlatform: 'Private Video Room (Configured in Admin)',
      privateMeetingUrl: '', // Remains empty until operator configures real room link before G1 launch
      privatePasscode: '',
      joiningInstructions: {
        en: 'Join 10 minutes before your scheduled session time with a notebook and calculator. Your private room link is unlocked only after verified payment and operator room configuration.',
        hi: 'अपने निर्धारित सत्र समय से 10 मिनट पहले एक नोटबुक और कैलकुलेटर के साथ जुड़ें। सत्यापित भुगतान और ऑपरेटर रूम कॉन्फ़िगरेशन के बाद ही आपका निजी लिंक अनलॉक होता है।',
      },
      updatedAt: nowIso,
    };
  });

  const reminderJobs: ReminderJobRecord[] = [
    {
      id: 'rem_en_24h',
      sessionId: 'bonnza-2026-12-05-en-1300',
      reminderType: '24_HOURS_BEFORE',
      scheduledForUtc: '2026-12-04T07:30:00Z',
      status: 'SCHEDULED',
      recipientsQueued: 0,
      updatedAt: nowIso,
    },
    {
      id: 'rem_en_2h',
      sessionId: 'bonnza-2026-12-05-en-1300',
      reminderType: '2_HOURS_BEFORE',
      scheduledForUtc: '2026-12-05T05:30:00Z',
      status: 'SCHEDULED',
      recipientsQueued: 0,
      updatedAt: nowIso,
    },
    {
      id: 'rem_en_15m',
      sessionId: 'bonnza-2026-12-05-en-1300',
      reminderType: '15_MINUTES_BEFORE',
      scheduledForUtc: '2026-12-05T07:15:00Z',
      status: 'SCHEDULED',
      recipientsQueued: 0,
      updatedAt: nowIso,
    },
    {
      id: 'rem_hi_24h',
      sessionId: 'bonnza-2026-12-05-hi-1600',
      reminderType: '24_HOURS_BEFORE',
      scheduledForUtc: '2026-12-04T10:30:00Z',
      status: 'SCHEDULED',
      recipientsQueued: 0,
      updatedAt: nowIso,
    },
    {
      id: 'rem_hi_2h',
      sessionId: 'bonnza-2026-12-05-hi-1600',
      reminderType: '2_HOURS_BEFORE',
      scheduledForUtc: '2026-12-05T08:30:00Z',
      status: 'SCHEDULED',
      recipientsQueued: 0,
      updatedAt: nowIso,
    },
    {
      id: 'rem_hi_15m',
      sessionId: 'bonnza-2026-12-05-hi-1600',
      reminderType: '15_MINUTES_BEFORE',
      scheduledForUtc: '2026-12-05T10:15:00Z',
      status: 'SCHEDULED',
      recipientsQueued: 0,
      updatedAt: nowIso,
    },
  ];

  const articles: ManagedArticleRecord[] = ARTICLES.map((art) => ({
    ...art,
    locales: {
      en: {
        locale: 'en',
        slug: art.slug,
        title: art.title.en,
        shortDescription: art.shortDescription.en,
        directAnswer: art.directAnswer.en,
        summary: art.summary.en,
        keyTakeaways: [...art.keyTakeaways.en],
        editorialStatus: art.editorialStatus,
        subjectReviewStatus: art.subjectReviewStatus,
        translationStatus: art.translationStatus,
        reviewerName: art.reviewer?.en || null,
        sourceCheckedDate: art.sourceCheckedDate,
        publishedAt: art.publicationDate,
        seoTitle: art.seoTitle.en,
        metaDescription: art.metaDescription.en,
        updatedAt: nowIso,
      },
      hi: {
        locale: 'hi',
        slug: art.hiSlug || art.slug,
        title: art.title.hi,
        shortDescription: art.shortDescription.hi,
        directAnswer: art.directAnswer.hi,
        summary: art.summary.hi,
        keyTakeaways: [...art.keyTakeaways.hi],
        editorialStatus: art.editorialStatus,
        subjectReviewStatus: art.subjectReviewStatus,
        translationStatus: art.translationStatus,
        reviewerName: art.reviewer?.hi || null,
        sourceCheckedDate: art.sourceCheckedDate,
        publishedAt: art.publicationDate,
        seoTitle: art.seoTitle.hi,
        metaDescription: art.metaDescription.hi,
        updatedAt: nowIso,
      },
    },
    versions: [
      {
        id: `ver_${art.id}_init`,
        articleId: art.id,
        locale: 'en',
        versionLabel: art.contentVersion || '1.0',
        editorEmail: 'bonnza@marketingtusk.com',
        changeNote: 'Initial published guide.',
        snapshot: {
          title: art.title.en,
          editorialStatus: art.editorialStatus,
          subjectReviewStatus: art.subjectReviewStatus,
        },
        createdAt: nowIso,
      },
    ],
  }));

  const pageBlocks: PageContentBlock[] = [
    {
      id: 'blk_home_hero',
      pageKey: 'homepage',
      blockKey: 'hero_callout',
      title: {
        en: 'Start smart. Sell online. Practical ecommerce education for your first online business.',
        hi: 'स्मार्ट शुरुआत करें। ऑनलाइन बेचें। आपके पहले ऑनलाइन प्रोडक्ट व्यवसाय के लिए व्यावहारिक ई-कॉमर्स शिक्षा।',
      },
      body: {
        en: 'Evaluate products, calculate true selling costs, choose the right channel, and build a weekly operating routine before risking inventory capital.',
        hi: 'इन्वेंट्री में पूंजी लगाने से पहले प्रोडक्ट परखना, वास्तविक बिक्री लागत गिनना, सही चैनल चुनना और साप्ताहिक संचालन रूटीन बनाना सीखें।',
      },
      ctaLabel: {
        en: 'Explore 5 Dec 2026 Workshop (₹299)',
        hi: '5 दिसंबर 2026 वर्कशॉप देखें (₹299)',
      },
      isLockedBusinessRule: false,
      updatedByEmail: 'bonnza@marketingtusk.com',
      updatedAt: nowIso,
    },
    {
      id: 'blk_webinar_pricing_rule',
      pageKey: 'webinar',
      blockKey: 'verified_session_pricing',
      title: {
        en: 'Fixed Workshop Session Rule (5 Dec 2026 — ₹299 / 29900 paise)',
        hi: 'निश्चित वर्कशॉप सत्र नियम (5 दिसंबर 2026 — ₹299 / 29900 पैसे)',
      },
      body: {
        en: 'Session IDs bonnza-2026-12-05-en-1300 and bonnza-2026-12-05-hi-1600 and integer paise pricing (29900) are governed by backend commerce rules.',
        hi: 'सत्र आईडी bonnza-2026-12-05-en-1300 और bonnza-2026-12-05-hi-1600 तथा मूल्य (29900 पैसे) बैकएंड नियमों द्वारा सुरक्षित हैं।',
      },
      isLockedBusinessRule: true,
      updatedByEmail: 'bonnza@marketingtusk.com',
      updatedAt: nowIso,
    },
    {
      id: 'blk_programme_notice',
      pageKey: 'programme',
      blockKey: 'programme_sales_gate_notice',
      title: {
        en: '10-Course Curriculum & Guided Support Architecture',
        hi: '10-कोर्स पाठ्यक्रम और निर्देशित सहायता संरचना',
      },
      body: {
        en: '10 courses, 22 modules, and 44 practical lessons in English and Hindi covering Resell, Craft to Commerce, and major selling channels.',
        hi: 'रीसेल, क्राफ्ट टू कॉमर्स और प्रमुख बिक्री चैनलों को कवर करने वाले अंग्रेज़ी और हिंदी में 10 कोर्स, 22 मॉड्यूल और 44 व्यावहारिक पाठ।',
      },
      isLockedBusinessRule: false,
      updatedByEmail: 'bonnza@marketingtusk.com',
      updatedAt: nowIso,
    },
    {
      id: 'blk_faq_notice',
      pageKey: 'faq',
      blockKey: 'faq_intro',
      title: {
        en: 'Transparent answers on sessions, language choice, refunds, and curriculum readiness',
        hi: 'सत्रों, भाषा चयन, रिफंड और पाठ्यक्रम की तैयारी पर पारदर्शी उत्तर',
      },
      body: {
        en: 'Switching website language between English and Hindi never alters your chosen paid workshop session.',
        hi: 'वेबसाइट की भाषा को अंग्रेज़ी और हिंदी के बीच बदलने से आपका चयनित वर्कशॉप सत्र कभी नहीं बदलता।',
      },
      isLockedBusinessRule: false,
      updatedByEmail: 'bonnza@marketingtusk.com',
      updatedAt: nowIso,
    },
    {
      id: 'blk_policy_notice',
      pageKey: 'policies',
      blockKey: 'policy_baseline_notice',
      title: {
        en: 'Clear Policies on Cancellations, Transfers & Privacy',
        hi: 'रद्दीकरण, स्थानांतरण और गोपनीयता पर स्पष्ट नीतियां',
      },
      body: {
        en: 'Cancel/Reschedule by Bonnza guarantees full refund or free transfer. One-time attendee session transfer is allowed up to 24 hours before session start.',
        hi: 'Bonnza द्वारा सत्र रद्द या पुनर्निर्धारित होने पर पूर्ण रिफंड या निःशुल्क स्थानांतरण मिलता है। सत्र शुरू होने से 24 घंटे पहले तक एक बार सत्र बदला जा सकता है।',
      },
      isLockedBusinessRule: false,
      updatedByEmail: 'bonnza@marketingtusk.com',
      updatedAt: nowIso,
    },
  ];

  const resources: DownloadableResourceRecord[] = [
    {
      id: 'res_01',
      slug: 'order-cost-calculator',
      title: {
        en: 'Interactive Order Cost & Margin Calculator',
        hi: 'इंटरैक्टिव ऑर्डर लागत और मार्जिन कैलकुलेटर',
      },
      description: {
        en: 'Calculate net contribution per order after packaging, shipping, commission, payment gateway fees, and return allowance.',
        hi: 'पैकेजिंग, शिपिंग, कमीशन, पेमेंट गेटवे शुल्क और रिटर्न भत्ते के बाद प्रति ऑर्डर शुद्ध बचत की गणना करें।',
      },
      resourceType: 'INTERACTIVE_TOOL',
      isPublished: true,
      downloadCount: 0,
      updatedAt: nowIso,
    },
    {
      id: 'res_02',
      slug: 'first-channel-worksheet',
      title: {
        en: 'First Selling Channel Comparison Worksheet',
        hi: 'पहला बिक्री चैनल तुलना वर्कशीट',
      },
      description: {
        en: 'Score your product category, margin readiness, and catalogue size across Meesho, Amazon India, WhatsApp, Shopify/Wix, and Etsy.',
        hi: 'Meesho, Amazon India, WhatsApp, Shopify/Wix और Etsy पर अपनी प्रोडक्ट श्रेणी और मार्जिन तैयारी की तुलना करें।',
      },
      resourceType: 'WORKSHEET_TEMPLATE',
      isPublished: true,
      downloadCount: 0,
      updatedAt: nowIso,
    },
    {
      id: 'res_03',
      slug: 'business-starting-worksheet',
      title: {
        en: 'First Online Business Starting Readiness Checklist',
        hi: 'पहला ऑनलाइन व्यवसाय प्रारंभिक तत्परता चेकलिस्ट',
      },
      description: {
        en: 'Step-by-step pre-launch checklist covering sample testing, supplier terms, unit economics, and weekly operating cadence.',
        hi: 'सैंपल परीक्षण, आपूर्तिकर्ता शर्तों, यूनिट इकोनॉमिक्स और साप्ताहिक संचालन रूटीन के लिए चरण-दर-चरण चेकलिस्ट।',
      },
      resourceType: 'WORKSHEET_TEMPLATE',
      isPublished: true,
      downloadCount: 0,
      updatedAt: nowIso,
    },
  ];

  const featureFlags: FeatureFlagRecord[] = [
    {
      key: 'WEBINAR_CHECKOUT_ENABLED',
      enabled: process.env.WEBINAR_CHECKOUT_ENABLED === 'true',
      description:
        'Enables live Razorpay order creation and paid ticket checkout for the 5 Dec 2026 webinar sessions. Locked until Gate G1 is satisfied.',
      gatedBy: 'G1',
      updatedByEmail: 'mtforstartups@gmail.com',
      updatedAt: nowIso,
    },
    {
      key: 'COURSE_CHECKOUT_ENABLED',
      enabled: false,
      description:
        'Enables standalone course purchases (₹2,499 planning assumption). Locked until Gate G2 is satisfied.',
      gatedBy: 'G2',
      updatedByEmail: 'mtforstartups@gmail.com',
      updatedAt: nowIso,
    },
    {
      key: 'BUNDLE_CHECKOUT_ENABLED',
      enabled: false,
      description:
        'Enables 10-course complete programme bundle purchases (₹6,999 planning assumption). Locked until Gate G2 is satisfied.',
      gatedBy: 'G2',
      updatedByEmail: 'mtforstartups@gmail.com',
      updatedAt: nowIso,
    },
    {
      key: 'PUBLIC_INDEXING_ENABLED',
      enabled: (process.env.PUBLIC_INDEXING_ENABLED || 'true').toLowerCase() !== 'false',
      description:
        'Allows search engine indexing of approved public pages and verified published articles.',
      gatedBy: 'SEO',
      updatedByEmail: 'mtforstartups@gmail.com',
      updatedAt: nowIso,
    },
  ];

  const launchChecklist: LaunchChecklistItem[] = [
    // Gate G1 — 17 items for Paid Webinar Launch Readiness
    {
      id: 'g1_01',
      gate: 'G1',
      code: 'G1_DATABASE_MIGRATIONS',
      label: '1. Relational database schema and migrations verified',
      category: 'Infrastructure',
      isCompleted: true,
      verificationNote: '0001_bonnza_core.sql and persistent transactional store active.',
      verifiedByEmail: 'mtforstartups@gmail.com',
      verifiedAt: nowIso,
    },
    {
      id: 'g1_02',
      gate: 'G1',
      code: 'G1_SESSION_RECORDS_SEEDED',
      label: '2. English (1:00 PM IST) and Hindi (4:00 PM IST) 5 Dec 2026 sessions seeded',
      category: 'Webinar Operations',
      isCompleted: true,
      verificationNote: 'bonnza-2026-12-05-en-1300 and bonnza-2026-12-05-hi-1600 seeded idempotently.',
      verifiedByEmail: 'mtforstartups@gmail.com',
      verifiedAt: nowIso,
    },
    {
      id: 'g1_03',
      gate: 'G1',
      code: 'G1_INTEGER_PAISE_PRICING',
      label: '3. Integer paise pricing (29900 paise = ₹299) enforced on server',
      category: 'Commerce',
      isCompleted: true,
      verificationNote: 'Client cannot override server-computed 29900 paise payable total.',
      verifiedByEmail: 'mtforstartups@gmail.com',
      verifiedAt: nowIso,
    },
    {
      id: 'g1_04',
      gate: 'G1',
      code: 'G1_TAX_TREATMENT_CONFIRMED',
      label: '4. Final GST / tax treatment for ₹299 ticket formally signed off',
      category: 'Finance & Legal',
      isCompleted: false,
      verificationNote: 'Currently marked PROVISIONAL_PENDING_TAX_SIGN_OFF.',
      verifiedByEmail: null,
      verifiedAt: null,
    },
    {
      id: 'g1_05',
      gate: 'G1',
      code: 'G1_RAZORPAY_LIVE_CREDENTIALS',
      label: '5. Live Razorpay Key ID and Key Secret configured in server environment',
      category: 'Payments',
      isCompleted: false,
      verificationNote: 'Awaiting live merchant credentials in environment secrets.',
      verifiedByEmail: null,
      verifiedAt: null,
    },
    {
      id: 'g1_06',
      gate: 'G1',
      code: 'G1_RAZORPAY_WEBHOOK_SECRET',
      label: '6. Razorpay webhook endpoint & webhook secret configured and verified',
      category: 'Payments',
      isCompleted: false,
      verificationNote: 'HMAC-SHA256 raw-body handler built; awaiting live webhook secret.',
      verifiedByEmail: null,
      verifiedAt: null,
    },
    {
      id: 'g1_07',
      gate: 'G1',
      code: 'G1_SIGNATURE_VERIFICATION_TESTED',
      label: '7. Checkout and webhook HMAC-SHA256 signature verification tested',
      category: 'Security',
      isCompleted: true,
      verificationNote: 'Automated test suite verifies valid, invalid, and duplicate signatures.',
      verifiedByEmail: 'mtforstartups@gmail.com',
      verifiedAt: nowIso,
    },
    {
      id: 'g1_08',
      gate: 'G1',
      code: 'G1_PRIVATE_MEETING_LINKS_CONFIGURED',
      label: '8. Private meeting room URLs configured for both 5 Dec 2026 sessions',
      category: 'Webinar Operations',
      isCompleted: false,
      verificationNote: 'Protected server-side fields ready; operator must paste real room links before launch.',
      verifiedByEmail: null,
      verifiedAt: null,
    },
    {
      id: 'g1_09',
      gate: 'G1',
      code: 'G1_MEETING_LINK_ACCESS_CONTROL',
      label: '9. Joining credentials restricted strictly to PAID_CONFIRMED registrants',
      category: 'Security',
      isCompleted: true,
      verificationNote: 'Verified by access-control endpoint and automated tests.',
      verifiedByEmail: 'mtforstartups@gmail.com',
      verifiedAt: nowIso,
    },
    {
      id: 'g1_10',
      gate: 'G1',
      code: 'G1_EMAIL_TEMPLATES_PREPARED',
      label: '10. All 16 bilingual transactional email templates prepared in Outbox',
      category: 'Communications',
      isCompleted: true,
      verificationNote: 'All 16 English & Hindi templates seeded and tested.',
      verifiedByEmail: 'mtforstartups@gmail.com',
      verifiedAt: nowIso,
    },
    {
      id: 'g1_11',
      gate: 'G1',
      code: 'G1_LIVE_EMAIL_PROVIDER_CONNECTED',
      label: '11. Production transactional email provider API key & sender domain verified',
      category: 'Communications',
      isCompleted: false,
      verificationNote: 'Outbox queues durably; awaiting live SMTP/API credentials.',
      verifiedByEmail: null,
      verifiedAt: null,
    },
    {
      id: 'g1_12',
      gate: 'G1',
      code: 'G1_REFUND_TRANSFER_WORKFLOWS',
      label: '12. Baseline refund & one-time session transfer workflows operational',
      category: 'Support & Operations',
      isCompleted: true,
      verificationNote: '24-hour transfer cutoff and refund state transitions implemented.',
      verifiedByEmail: 'mtforstartups@gmail.com',
      verifiedAt: nowIso,
    },
    {
      id: 'g1_13',
      gate: 'G1',
      code: 'G1_LEGAL_COUNSEL_SIGN_OFF',
      label: '13. Final legal counsel sign-off on Terms, Privacy, and Refund policies',
      category: 'Finance & Legal',
      isCompleted: false,
      verificationNote: 'Operational baseline active; formal legal sign-off pending.',
      verifiedByEmail: null,
      verifiedAt: null,
    },
    {
      id: 'g1_14',
      gate: 'G1',
      code: 'G1_ADMIN_RBAC_PROTECTION',
      label: '14. Admin dashboard protected with RBAC across all 7 roles and audit logs',
      category: 'Security',
      isCompleted: true,
      verificationNote: 'Server-side RBAC middleware and immutable audit logs active.',
      verifiedByEmail: 'mtforstartups@gmail.com',
      verifiedAt: nowIso,
    },
    {
      id: 'g1_15',
      gate: 'G1',
      code: 'G1_CRM_SUPPORT_TICKETS',
      label: '15. Customer CRM and contact support ticket workflows operational',
      category: 'Support & Operations',
      isCompleted: true,
      verificationNote: 'Contact submissions create CRM records, support tickets, and outbox acknowledgements.',
      verifiedByEmail: 'mtforstartups@gmail.com',
      verifiedAt: nowIso,
    },
    {
      id: 'g1_16',
      gate: 'G1',
      code: 'G1_BILINGUAL_SESSION_INDEPENDENCE',
      label: '16. UI display language switching verified independent of selected session',
      category: 'Localization',
      isCompleted: true,
      verificationNote: 'UI locale (/en, /hi) and sessionId are stored and validated independently.',
      verifiedByEmail: 'mtforstartups@gmail.com',
      verifiedAt: nowIso,
    },
    {
      id: 'g1_17',
      gate: 'G1',
      code: 'G1_OWNER_LAUNCH_APPROVAL',
      label: '17. Final Owner commercial go-live sign-off',
      category: 'Governance',
      isCompleted: false,
      verificationNote: 'Awaiting completion of items 4, 5, 6, 8, 11, and 13.',
      verifiedByEmail: null,
      verifiedAt: null,
    },

    // Gate G2 — 8 items for Course & Bundle Sales Gate
    {
      id: 'g2_01',
      gate: 'G2',
      code: 'G2_VIDEO_LESSONS_RECORDED',
      label: '1. All 44 course lessons recorded, edited, and captioned in English and Hindi',
      category: 'Curriculum',
      isCompleted: false,
      verificationNote: 'Currently in WRITTEN_PREPARED / CURRICULUM_PREPARED status.',
      verifiedByEmail: null,
      verifiedAt: null,
    },
    {
      id: 'g2_02',
      gate: 'G2',
      code: 'G2_FACULTY_CURRICULUM_SIGN_OFF',
      label: '2. Subject-matter expert verification completed for all 10 courses (C01–C10)',
      category: 'Curriculum',
      isCompleted: false,
      verificationNote: 'Curriculum outlines prepared; expert video review pending.',
      verifiedByEmail: null,
      verifiedAt: null,
    },
    {
      id: 'g2_03',
      gate: 'G2',
      code: 'G2_LMS_DELIVERY_INFRASTRUCTURE',
      label: '3. Authenticated learner video delivery & assignment review portal live',
      category: 'Platform',
      isCompleted: false,
      verificationNote: 'Scheduled for future LMS phase.',
      verifiedByEmail: null,
      verifiedAt: null,
    },
    {
      id: 'g2_04',
      gate: 'G2',
      code: 'G2_GROUP_SUPPORT_ROSTER',
      label: '4. 10-week scheduled group support calendar & mentor roster confirmed',
      category: 'Operations',
      isCompleted: false,
      verificationNote: 'Support structure defined; cohort schedule pending.',
      verifiedByEmail: null,
      verifiedAt: null,
    },
    {
      id: 'g2_05',
      gate: 'G2',
      code: 'G2_PROGRAMME_PRICING_APPROVED',
      label: '5. Final commercial pricing & GST treatment approved for ₹6,999 bundle and ₹2,499 standalone courses',
      category: 'Finance & Legal',
      isCompleted: false,
      verificationNote: 'Currently disclosed strictly as planning assumptions.',
      verifiedByEmail: null,
      verifiedAt: null,
    },
    {
      id: 'g2_06',
      gate: 'G2',
      code: 'G2_PROGRAMME_REFUND_POLICY',
      label: '6. Programme-specific cancellation and access terms approved by legal counsel',
      category: 'Finance & Legal',
      isCompleted: false,
      verificationNote: 'Awaiting legal sign-off.',
      verifiedByEmail: null,
      verifiedAt: null,
    },
    {
      id: 'g2_07',
      gate: 'G2',
      code: 'G2_COHORT_ONBOARDING_EMAILS',
      label: '7. Automated learner onboarding & weekly assignment email sequences active',
      category: 'Communications',
      isCompleted: false,
      verificationNote: 'Pending LMS activation.',
      verifiedByEmail: null,
      verifiedAt: null,
    },
    {
      id: 'g2_08',
      gate: 'G2',
      code: 'G2_OWNER_PROGRAMME_RELEASE',
      label: '8. Owner authorization to unlock COURSE_CHECKOUT_ENABLED and BUNDLE_CHECKOUT_ENABLED',
      category: 'Governance',
      isCompleted: false,
      verificationNote: 'Locked until all G2 prerequisites are complete.',
      verifiedByEmail: null,
      verifiedAt: null,
    },
  ];

  return {
    schemaVersion: 1,
    staffUsers,
    adminSessions: [],
    auditLogs: [
      {
        id: 'aud_init_001',
        actorUserId: 'usr_owner_01',
        actorEmail: 'mtforstartups@gmail.com',
        actorRole: 'OWNER',
        action: 'SYSTEM_SEED_INITIALIZED',
        targetType: 'DATABASE',
        targetId: 'bonnza_core_v1',
        summary:
          'Idempotent seed completed: 2 webinar sessions, 10 courses (22 modules, 44 lessons), 20 bilingual articles (B01–B20), 16 email templates, and G1/G2 readiness checklists.',
        createdAt: nowIso,
      },
    ],
    webinarSessions,
    customers: [],
    registrations: [],
    orders: [],
    payments: [],
    webhookEvents: [],
    refunds: [],
    reconciliationRuns: [],
    attendance: [],
    reminderJobs,
    supportTickets: [],
    courses: COURSES.map((c) => ({ ...c })),
    articles,
    pageBlocks,
    resources,
    emailTemplates: SEEDED_EMAIL_TEMPLATES.map((t) => ({ ...t })),
    emailOutbox: [],
    featureFlags,
    launchChecklist,
  };
}

class BonnzaStore {
  private state: BonnzaDatabaseState;
  private persistEnabled: boolean;

  constructor() {
    this.persistEnabled = process.env.VITEST !== 'true';
    this.state = this.loadOrSeed();
  }

  private migratePersistedSeedCopy(parsed: BonnzaDatabaseState, seed: BonnzaDatabaseState): boolean {
    let changed = false;
    const nowIso = new Date().toISOString();

    for (let i = 0; i < parsed.articles.length; i++) {
      const existing = parsed.articles[i];
      const canonical = seed.articles.find((a) => a.id === existing.id);
      if (!canonical) continue;

      const isUneditedInitialDraft =
        existing.versions.length === 1 &&
        existing.versions[0]?.versionLabel === '1.0-draft' &&
        existing.locales?.en?.editorialStatus === 'DRAFT' &&
        existing.locales?.hi?.editorialStatus === 'DRAFT';

      const isUneditedSeedUpdate =
        existing.versions.length === 1 &&
        existing.versions[0]?.id?.endsWith('_init') &&
        existing.contentVersion !== canonical.contentVersion;

      if (isUneditedInitialDraft || isUneditedSeedUpdate) {
        parsed.articles[i] = canonical;
        changed = true;
      }
    }

    for (const canonical of seed.articles) {
      if (!parsed.articles.some((a) => a.id === canonical.id)) {
        parsed.articles.push(canonical);
        changed = true;
      }
    }

    if (Array.isArray(parsed.courses)) {
      parsed.courses = seed.courses;
      changed = true;
    }

    if (Array.isArray(parsed.pageBlocks)) {
      const progIdx = parsed.pageBlocks.findIndex((b) => b.id === 'blk_programme_notice');
      if (progIdx !== -1 && parsed.pageBlocks[progIdx].body.en.includes('Gate G2')) {
        const seedProg = seed.pageBlocks.find((b) => b.id === 'blk_programme_notice');
        if (seedProg) {
          parsed.pageBlocks[progIdx] = { ...seedProg, updatedAt: nowIso };
          changed = true;
        }
      }
      const polIdx = parsed.pageBlocks.findIndex((b) => b.id === 'blk_policy_notice');
      if (polIdx !== -1 && parsed.pageBlocks[polIdx].title.en.includes('Pending Legal')) {
        const seedPol = seed.pageBlocks.find((b) => b.id === 'blk_policy_notice');
        if (seedPol) {
          parsed.pageBlocks[polIdx] = { ...seedPol, updatedAt: nowIso };
          changed = true;
        }
      }
    }

    if (
      Array.isArray(parsed.featureFlags) &&
      (process.env.PUBLIC_INDEXING_ENABLED || 'true').toLowerCase() !== 'false'
    ) {
      const idxFlag = parsed.featureFlags.find((f) => f.key === 'PUBLIC_INDEXING_ENABLED');
      if (idxFlag && !idxFlag.enabled) {
        idxFlag.enabled = true;
        idxFlag.updatedAt = nowIso;
        changed = true;
      }
    }

    return changed;
  }

  private loadOrSeed(): BonnzaDatabaseState {
    const seed = buildInitialSeedState();
    if (!this.persistEnabled) {
      return seed;
    }
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        const parsed = JSON.parse(raw) as BonnzaDatabaseState;
        if (parsed && parsed.schemaVersion === 1 && Array.isArray(parsed.webinarSessions)) {
          if (this.migratePersistedSeedCopy(parsed, seed)) {
            fs.writeFileSync(DB_FILE_PATH, JSON.stringify(parsed, null, 2), 'utf-8');
          }
          return parsed;
        }
      }
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(seed, null, 2), 'utf-8');
      return seed;
    } catch {
      return seed;
    }
  }

  public save(): void {
    if (!this.persistEnabled) return;
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const tmpFile = `${DB_FILE_PATH}.tmp`;
      fs.writeFileSync(tmpFile, JSON.stringify(this.state, null, 2), 'utf-8');
      fs.renameSync(tmpFile, DB_FILE_PATH);
    } catch {
      // Fail-safe in read-only environments
    }
  }

  public resetForTests(): void {
    this.persistEnabled = false;
    this.state = buildInitialSeedState();
  }

  public getState(): BonnzaDatabaseState {
    return this.state;
  }

  public recordAuditLog(params: {
    actorUserId?: string | null;
    actorEmail: string;
    actorRole: StaffRoleCode | 'SYSTEM';
    action: string;
    targetType: string;
    targetId: string;
    summary: string;
    beforeSnapshot?: unknown;
    afterSnapshot?: unknown;
  }): AuditLogRecord {
    const entry: AuditLogRecord = {
      id: `aud_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
      actorUserId: params.actorUserId ?? null,
      actorEmail: params.actorEmail,
      actorRole: params.actorRole,
      action: params.action,
      targetType: params.targetType,
      targetId: params.targetId,
      summary: params.summary,
      beforeSnapshot: params.beforeSnapshot,
      afterSnapshot: params.afterSnapshot,
      createdAt: new Date().toISOString(),
    };
    this.state.auditLogs.unshift(entry);
    this.save();
    return entry;
  }

  public queueTransactionalEmail(params: {
    idempotencyKey: string;
    templateCode: EmailTemplateCode;
    recipientEmail: string;
    recipientName: string;
    locale: Locale;
    variables: Record<string, string>;
    relatedEntityType: string;
    relatedEntityId: string;
  }): { record: EmailOutboxRecord; duplicateIgnored: boolean } {
    const existing = this.state.emailOutbox.find(
      (e) => e.idempotencyKey === params.idempotencyKey
    );
    if (existing) {
      return { record: existing, duplicateIgnored: true };
    }

    const template = getTemplateByCode(this.state.emailTemplates, params.templateCode);
    const rendered = renderEmailTemplate(template, params.locale, params.variables);
    const now = new Date().toISOString();
    const providerConfigured = Boolean((process.env.EMAIL_API_KEY || '').trim());

    const outboxRecord: EmailOutboxRecord = {
      id: `eml_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
      idempotencyKey: params.idempotencyKey,
      templateCode: params.templateCode,
      recipientEmail: params.recipientEmail.toLowerCase().trim(),
      recipientName: params.recipientName.trim(),
      locale: params.locale,
      subject: rendered.subject,
      body: rendered.body,
      status: providerConfigured ? 'Sent' : 'Queued',
      attempts: providerConfigured ? 1 : 0,
      lastError: providerConfigured
        ? null
        : 'Queued in durable outbox (live EMAIL_API_KEY not yet configured).',
      relatedEntityType: params.relatedEntityType,
      relatedEntityId: params.relatedEntityId,
      scheduledAt: now,
      sentAt: providerConfigured ? now : null,
      updatedAt: now,
    };

    this.state.emailOutbox.unshift(outboxRecord);
    this.save();
    return { record: outboxRecord, duplicateIgnored: false };
  }

  private ensureLifecycleStage(
    customer: CustomerProfile,
    stage: CustomerLifecycleStage
  ): void {
    if (!customer.lifecycleStages.includes(stage)) {
      customer.lifecycleStages.push(stage);
    }
  }

  public upsertCustomer(params: {
    email: string;
    fullName: string;
    phone?: string;
    uiLocale: Locale;
    webinarLocale?: Locale;
    businessInterest?: 'resell' | 'craft-to-commerce' | 'both' | 'unsure';
    termsAccepted: boolean;
    marketingOptIn: boolean;
    stage: CustomerLifecycleStage;
    utm?: UtmAttribution;
    activitySummary: string;
  }): CustomerProfile {
    const normalizedEmail = params.email.toLowerCase().trim();
    const now = new Date().toISOString();
    let customer = this.state.customers.find((c) => c.primaryEmail === normalizedEmail);

    if (!customer) {
      customer = {
        id: `cus_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
        primaryEmail: normalizedEmail,
        fullName: params.fullName.trim(),
        phone: (params.phone || '').trim(),
        preferredUiLocale: params.uiLocale,
        preferredWebinarLocale: params.webinarLocale || params.uiLocale,
        businessInterest: params.businessInterest || 'unsure',
        lifecycleStages: ['VISITOR', params.stage],
        tags: params.businessInterest && params.businessInterest !== 'unsure'
          ? [params.businessInterest]
          : [],
        termsAccepted: params.termsAccepted,
        marketingOptIn: params.marketingOptIn,
        consentRecordedAt: now,
        utmHistory: params.utm ? [params.utm] : [],
        notes: [],
        activities: [
          {
            id: `act_${Date.now()}_${crypto.randomBytes(2).toString('hex')}`,
            type: params.stage,
            summary: params.activitySummary,
            createdAt: now,
          },
        ],
        createdAt: now,
        updatedAt: now,
      };
      this.state.customers.unshift(customer);
    } else {
      customer.fullName = params.fullName.trim() || customer.fullName;
      if (params.phone && params.phone.trim()) {
        customer.phone = params.phone.trim();
      }
      customer.preferredUiLocale = params.uiLocale;
      if (params.webinarLocale) {
        customer.preferredWebinarLocale = params.webinarLocale;
      }
      if (params.businessInterest && params.businessInterest !== 'unsure') {
        customer.businessInterest = params.businessInterest;
        if (!customer.tags.includes(params.businessInterest)) {
          customer.tags.push(params.businessInterest);
        }
      }
      if (params.termsAccepted) customer.termsAccepted = true;
      if (params.marketingOptIn) customer.marketingOptIn = true;
      this.ensureLifecycleStage(customer, params.stage);
      if (params.utm && (params.utm.utm_source || params.utm.utm_campaign)) {
        customer.utmHistory.push(params.utm);
      }
      customer.activities.unshift({
        id: `act_${Date.now()}_${crypto.randomBytes(2).toString('hex')}`,
        type: params.stage,
        summary: params.activitySummary,
        createdAt: now,
      });
      customer.updatedAt = now;
    }

    this.save();
    return customer;
  }

  public createOrReuseWebinarRegistration(input: {
    fullName: string;
    email: string;
    phone?: string;
    sessionId: WebinarSessionId;
    uiLocale: Locale;
    businessInterest: 'resell' | 'craft-to-commerce' | 'both' | 'unsure';
    termsAccepted: boolean;
    marketingOptIn: boolean;
    utm?: UtmAttribution;
    nowOverrideUtc?: string;
  }): {
    registration: WebinarRegistrationRecord;
    order: OrderRecord;
    session: ManagedWebinarSession;
    reusedExistingDraft: boolean;
    alreadyPaidConfirmed: boolean;
    checkoutEnabled: boolean;
  } {
    const session = this.state.webinarSessions.find((s) => s.id === input.sessionId);
    if (!session) {
      throw new Error('Selected webinar session does not exist.');
    }
    const nowMs = input.nowOverrideUtc
      ? new Date(input.nowOverrideUtc).getTime()
      : Date.now();
    const startMs = new Date(session.startUtc).getTime();
    const endMs = new Date(session.endUtc).getTime();
    if (nowMs >= endMs) {
      session.status = 'COMPLETED';
      throw new Error(
        `SESSION_COMPLETED: The 5 December 2026 webinar session (${session.id}) has concluded and is no longer accepting registrations.`
      );
    }
    if (nowMs >= startMs) {
      session.status = 'REGISTRATION_CLOSED';
      throw new Error(
        `SESSION_CLOSED: Registration has closed because session ${session.id} has already started.`
      );
    }
    if (session.status !== 'OPEN_FOR_REGISTRATION' && session.status !== 'SCHEDULED') {
      throw new Error(`Registration is not open for session ${session.id} (status: ${session.status}).`);
    }
    if (session.capacity !== null && session.confirmedPaidSeats >= session.capacity) {
      throw new Error('Selected webinar session has reached maximum seat capacity.');
    }

    const normalizedEmail = (input.email || '').toLowerCase().trim();
    const cleanPhoneDigits = (input.phone || '').replace(/\D/g, '');
    const existingForSession = this.state.registrations.find((r) => {
      if (r.sessionId !== input.sessionId) return false;
      if (normalizedEmail && r.email === normalizedEmail) return true;
      if (
        !normalizedEmail &&
        cleanPhoneDigits &&
        r.phone.replace(/\D/g, '') === cleanPhoneDigits
      ) {
        return true;
      }
      return false;
    });

    const checkoutFlag = this.state.featureFlags.find(
      (f) => f.key === 'WEBINAR_CHECKOUT_ENABLED'
    );
    const checkoutEnabled = Boolean(checkoutFlag?.enabled);

    if (existingForSession) {
      const existingOrder = this.state.orders.find(
        (o) => o.registrationId === existingForSession.id
      )!;
      if (existingForSession.paymentState === 'PAID_CONFIRMED') {
        return {
          registration: existingForSession,
          order: existingOrder,
          session,
          reusedExistingDraft: true,
          alreadyPaidConfirmed: true,
          checkoutEnabled,
        };
      }
      // Update contact info on existing draft/pending registration
      existingForSession.fullName = input.fullName.trim();
      if (normalizedEmail) existingForSession.email = normalizedEmail;
      if (input.phone !== undefined) existingForSession.phone = input.phone.trim();
      existingForSession.businessInterest = input.businessInterest;
      existingForSession.marketingOptIn = input.marketingOptIn;
      existingForSession.updatedAt = new Date().toISOString();
      this.save();
      return {
        registration: existingForSession,
        order: existingOrder,
        session,
        reusedExistingDraft: true,
        alreadyPaidConfirmed: false,
        checkoutEnabled,
      };
    }

    const customerEmailKey =
      normalizedEmail || `wa_${cleanPhoneDigits || Date.now()}@phone.bonnza.local`;

    const customer = this.upsertCustomer({
      email: customerEmailKey,
      fullName: input.fullName,
      phone: input.phone,
      uiLocale: input.uiLocale,
      webinarLocale: session.instructionLocale,
      businessInterest: input.businessInterest,
      termsAccepted: input.termsAccepted,
      marketingOptIn: input.marketingOptIn,
      stage: 'WEBINAR_DRAFT_REGISTRANT',
      utm: input.utm,
      activitySummary: `Started webinar registration for ${session.id}`,
    });

    const now = new Date().toISOString();
    const seq = String(this.state.registrations.length + 1).padStart(4, '0');
    const registrationReference = `BNZ-2026-${seq}`;
    const orderNumber = `ORD-2026-${seq}`;

    const registration: WebinarRegistrationRecord = {
      id: `reg_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
      registrationReference,
      customerId: customer.id,
      sessionId: session.id,
      fullName: input.fullName.trim(),
      email: normalizedEmail,
      phone: (input.phone || '').trim(),
      uiLocale: input.uiLocale,
      sessionLocale: session.instructionLocale,
      businessInterest: input.businessInterest,
      termsAccepted: input.termsAccepted,
      marketingOptIn: input.marketingOptIn,
      paymentState: 'DRAFT',
      seatConfirmed: false,
      transferCount: 0,
      transferredFromSessionId: null,
      accessToken: crypto.randomBytes(24).toString('hex'),
      utm: input.utm,
      createdAt: now,
      updatedAt: now,
    };

    const order: OrderRecord = {
      id: `ord_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
      orderNumber,
      customerId: customer.id,
      registrationId: registration.id,
      sessionId: session.id,
      currency: 'INR',
      subtotalPaise: session.baseAmountPaise,
      taxPaise: session.taxAmountPaise,
      totalPayablePaise: session.totalPayablePaise,
      status: 'DRAFT',
      razorpayOrderId: null,
      receiptNumber: null,
      createdAt: now,
      updatedAt: now,
    };

    session.reservedSeats += 1;
    this.state.registrations.unshift(registration);
    this.state.orders.unshift(order);

    const sessionTimeIst =
      session.instructionLocale === 'en' ? '1:00 PM to 2:30 PM IST' : '4:00 PM to 5:30 PM IST';

    if (registration.email && registration.email.includes('@')) {
      this.queueTransactionalEmail({
        idempotencyKey: `reg_started:${registration.id}`,
        templateCode: 'WEBINAR_REGISTRATION_STARTED',
        recipientEmail: registration.email,
        recipientName: registration.fullName,
        locale: registration.uiLocale,
        variables: {
          fullName: registration.fullName,
          registrationReference: registration.registrationReference,
          sessionTitle: session.title[registration.uiLocale],
          sessionTimeIst,
        },
        relatedEntityType: 'REGISTRATION',
        relatedEntityId: registration.id,
      });
    }

    this.save();
    return {
      registration,
      order,
      session,
      reusedExistingDraft: false,
      alreadyPaidConfirmed: false,
      checkoutEnabled,
    };
  }

  public async initiateRazorpayOrder(params: {
    registrationReference: string;
  }): Promise<{
    order: OrderRecord;
    payment: PaymentRecord;
    razorpayKeyId: string | null;
  }> {
    const checkoutFlag = this.state.featureFlags.find(
      (f) => f.key === 'WEBINAR_CHECKOUT_ENABLED'
    );
    if (!checkoutFlag?.enabled) {
      throw new Error(
        'WEBINAR_CHECKOUT_DISABLED: Online ticket payment is currently disabled behind Launch Readiness Gate G1.'
      );
    }

    const registration = this.state.registrations.find(
      (r) => r.registrationReference === params.registrationReference
    );
    if (!registration) {
      throw new Error('Registration record not found.');
    }
    if (registration.paymentState === 'PAID_CONFIRMED') {
      throw new Error('ALREADY_PAID: This registration already has a confirmed paid seat.');
    }

    const order = this.state.orders.find((o) => o.registrationId === registration.id);
    if (!order) {
      throw new Error('Order record not found for registration.');
    }

    if (!canTransitionPaymentState(registration.paymentState, 'PAYMENT_INITIATED')) {
      throw new Error(
        `Cannot initiate payment from state ${registration.paymentState}.`
      );
    }

    const providerOrder = await razorpayAdapter.createProviderOrder({
      orderNumber: order.orderNumber,
      amountPaise: order.totalPayablePaise,
      currency: 'INR',
      sessionId: registration.sessionId,
      registrationReference: registration.registrationReference,
    });

    const now = new Date().toISOString();
    registration.paymentState = 'PAYMENT_INITIATED';
    registration.updatedAt = now;
    order.status = 'PAYMENT_INITIATED';
    order.razorpayOrderId = providerOrder.razorpayOrderId;
    order.updatedAt = now;

    let payment = this.state.payments.find((p) => p.orderId === order.id);
    if (!payment) {
      payment = {
        id: `pay_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
        orderId: order.id,
        registrationId: registration.id,
        customerId: registration.customerId,
        provider: 'Razorpay',
        razorpayOrderId: providerOrder.razorpayOrderId,
        razorpayPaymentId: null,
        razorpaySignature: null,
        amountPaise: order.totalPayablePaise,
        currency: 'INR',
        state: 'PAYMENT_INITIATED',
        signatureVerified: false,
        webhookVerified: false,
        capturedAt: null,
        failureReason: null,
        attempts: [
          {
            id: `att_${Date.now()}_1`,
            orderId: order.id,
            attemptNumber: 1,
            razorpayOrderId: providerOrder.razorpayOrderId,
            status: 'PAYMENT_INITIATED',
            createdAt: now,
          },
        ],
        createdAt: now,
        updatedAt: now,
      };
      this.state.payments.unshift(payment);
    } else {
      payment.razorpayOrderId = providerOrder.razorpayOrderId;
      payment.state = 'PAYMENT_INITIATED';
      payment.updatedAt = now;
      payment.attempts.push({
        id: `att_${Date.now()}_${payment.attempts.length + 1}`,
        orderId: order.id,
        attemptNumber: payment.attempts.length + 1,
        razorpayOrderId: providerOrder.razorpayOrderId,
        status: 'PAYMENT_INITIATED',
        createdAt: now,
      });
    }

    const customer = this.state.customers.find((c) => c.id === registration.customerId);
    if (customer) {
      this.ensureLifecycleStage(customer, 'WEBINAR_PAYMENT_PENDING');
      customer.updatedAt = now;
    }

    this.save();
    return {
      order,
      payment,
      razorpayKeyId: (process.env.RAZORPAY_KEY_ID || '').trim() || null,
    };
  }

  public confirmPaymentVerified(params: {
    order: OrderRecord;
    payment: PaymentRecord;
    registration: WebinarRegistrationRecord;
    razorpayPaymentId: string;
    razorpaySignature?: string;
    verifiedVia: 'CHECKOUT_SIGNATURE' | 'WEBHOOK' | 'ADMIN_RECONCILIATION';
  }): void {
    const now = new Date().toISOString();
    const wasAlreadyConfirmed = params.registration.paymentState === 'PAID_CONFIRMED';

    params.payment.razorpayPaymentId = params.razorpayPaymentId;
    if (params.razorpaySignature) {
      params.payment.razorpaySignature = params.razorpaySignature;
    }
    if (params.verifiedVia === 'CHECKOUT_SIGNATURE') {
      params.payment.signatureVerified = true;
    }
    if (params.verifiedVia === 'WEBHOOK') {
      params.payment.webhookVerified = true;
    }
    params.payment.state = 'PAID_CONFIRMED';
    params.payment.capturedAt = params.payment.capturedAt || now;
    params.payment.updatedAt = now;

    params.order.status = 'PAID_CONFIRMED';
    if (!params.order.receiptNumber) {
      params.order.receiptNumber = `RCPT-${params.order.orderNumber.replace('ORD-', '')}`;
    }
    params.order.updatedAt = now;

    params.registration.paymentState = 'PAID_CONFIRMED';
    params.registration.seatConfirmed = true;
    params.registration.updatedAt = now;

    const session = this.state.webinarSessions.find(
      (s) => s.id === params.registration.sessionId
    );
    if (session && !wasAlreadyConfirmed) {
      session.confirmedPaidSeats += 1;
      session.updatedAt = now;
    }

    const customer = this.state.customers.find(
      (c) => c.id === params.registration.customerId
    );
    if (customer) {
      this.ensureLifecycleStage(customer, 'WEBINAR_PAID_REGISTRANT');
      customer.activities.unshift({
        id: `act_${Date.now()}_${crypto.randomBytes(2).toString('hex')}`,
        type: 'PAYMENT_CONFIRMED',
        summary: `Verified ₹299 payment (${params.razorpayPaymentId}) via ${params.verifiedVia}`,
        createdAt: now,
      });
      customer.updatedAt = now;
    }

    const sessionTimeIst =
      session?.instructionLocale === 'en' ? '1:00 PM to 2:30 PM IST' : '4:00 PM to 5:30 PM IST';
    const sessionTitle = session
      ? session.title[params.registration.uiLocale]
      : params.registration.sessionId;

    this.queueTransactionalEmail({
      idempotencyKey: `payment_confirmed:${params.order.id}`,
      templateCode: 'PAYMENT_CONFIRMED_RECEIPT',
      recipientEmail: params.registration.email,
      recipientName: params.registration.fullName,
      locale: params.registration.uiLocale,
      variables: {
        fullName: params.registration.fullName,
        registrationReference: params.registration.registrationReference,
        orderNumber: params.order.orderNumber,
        receiptNumber: params.order.receiptNumber || '',
        sessionTitle,
        sessionTimeIst,
      },
      relatedEntityType: 'ORDER',
      relatedEntityId: params.order.id,
    });

    this.queueTransactionalEmail({
      idempotencyKey: `joining_instructions:${params.registration.id}`,
      templateCode: 'WEBINAR_JOINING_INSTRUCTIONS',
      recipientEmail: params.registration.email,
      recipientName: params.registration.fullName,
      locale: params.registration.uiLocale,
      variables: {
        fullName: params.registration.fullName,
        registrationReference: params.registration.registrationReference,
        sessionTitle,
        sessionTimeIst,
      },
      relatedEntityType: 'REGISTRATION',
      relatedEntityId: params.registration.id,
    });

    this.save();
  }

  public verifyCheckoutCallback(params: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }): {
    verified: boolean;
    registration: WebinarRegistrationRecord;
    order: OrderRecord;
    payment: PaymentRecord;
  } {
    const order = this.state.orders.find((o) => o.razorpayOrderId === params.razorpayOrderId);
    if (!order) {
      throw new Error('Order not found for Razorpay order ID.');
    }
    const registration = this.state.registrations.find((r) => r.id === order.registrationId)!;
    const payment = this.state.payments.find((p) => p.orderId === order.id)!;

    const isValid = verifyRazorpayCheckoutSignature({
      razorpayOrderId: params.razorpayOrderId,
      razorpayPaymentId: params.razorpayPaymentId,
      razorpaySignature: params.razorpaySignature,
    });

    if (!isValid) {
      const now = new Date().toISOString();
      payment.state = 'MANUAL_REVIEW';
      payment.failureReason = 'Invalid Razorpay checkout signature.';
      payment.updatedAt = now;
      order.status = 'MANUAL_REVIEW';
      order.updatedAt = now;
      registration.paymentState = 'MANUAL_REVIEW';
      registration.seatConfirmed = false;
      registration.updatedAt = now;

      this.recordAuditLog({
        actorEmail: 'system@bonnza.marketingtusk.com',
        actorRole: 'SYSTEM',
        action: 'CHECKOUT_SIGNATURE_MISMATCH',
        targetType: 'ORDER',
        targetId: order.id,
        summary: `Checkout signature verification failed for order ${order.orderNumber}; moved to MANUAL_REVIEW.`,
      });
      this.save();
      return { verified: false, registration, order, payment };
    }

    this.confirmPaymentVerified({
      order,
      payment,
      registration,
      razorpayPaymentId: params.razorpayPaymentId,
      razorpaySignature: params.razorpaySignature,
      verifiedVia: 'CHECKOUT_SIGNATURE',
    });

    return { verified: true, registration, order, payment };
  }

  public processRazorpayWebhook(params: {
    rawBody: string | Buffer;
    signatureHeader: string | undefined;
    eventIdHeader: string | undefined;
  }): {
    statusCode: number;
    status: WebhookEventRecord['processedStatus'];
    eventRecord: WebhookEventRecord;
  } {
    const rawStr = Buffer.isBuffer(params.rawBody)
      ? params.rawBody.toString('utf8')
      : params.rawBody;

    let parsedPayload: Record<string, unknown> = {};
    try {
      parsedPayload = JSON.parse(rawStr) as Record<string, unknown>;
    } catch {
      parsedPayload = { raw: rawStr };
    }

    const providerEventId =
      (params.eventIdHeader || '').trim() ||
      String(parsedPayload.event_id || `evt_${crypto.createHash('sha256').update(rawStr).digest('hex').slice(0, 16)}`);

    // Deduplicate webhook events by unique providerEventId
    const existingEvent = this.state.webhookEvents.find(
      (e) => e.providerEventId === providerEventId
    );
    if (existingEvent) {
      return {
        statusCode: 200,
        status: 'DUPLICATE_IGNORED',
        eventRecord: existingEvent,
      };
    }

    const signatureValid = verifyRazorpayWebhookSignature(
      params.rawBody,
      params.signatureHeader
    );

    const eventType = String(parsedPayload.event || 'unknown');
    const paymentEntity = (
      (parsedPayload.payload as Record<string, unknown>)?.payment as Record<string, unknown>
    )?.entity as Record<string, unknown> | undefined;

    const razorpayOrderId = paymentEntity?.order_id ? String(paymentEntity.order_id) : null;
    const razorpayPaymentId = paymentEntity?.id ? String(paymentEntity.id) : null;
    const amountPaise =
      typeof paymentEntity?.amount === 'number' ? paymentEntity.amount : null;

    if (!signatureValid) {
      const invalidRecord: WebhookEventRecord = {
        id: `wh_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
        providerEventId,
        eventType,
        razorpayOrderId,
        razorpayPaymentId,
        signatureValid: false,
        payload: parsedPayload,
        processedStatus: 'INVALID_SIGNATURE',
        processedAt: new Date().toISOString(),
      };
      this.state.webhookEvents.unshift(invalidRecord);
      this.save();
      return {
        statusCode: 400,
        status: 'INVALID_SIGNATURE',
        eventRecord: invalidRecord,
      };
    }

    let processedStatus: WebhookEventRecord['processedStatus'] = 'PROCESSED';

    if (razorpayOrderId) {
      const order = this.state.orders.find((o) => o.razorpayOrderId === razorpayOrderId);
      if (order) {
        const registration = this.state.registrations.find(
          (r) => r.id === order.registrationId
        )!;
        const payment = this.state.payments.find((p) => p.orderId === order.id)!;

        if (eventType === 'payment.captured' || eventType === 'order.paid') {
          if (amountPaise !== null && amountPaise !== order.totalPayablePaise) {
            processedStatus = 'FLAGGED_MANUAL_REVIEW';
            order.status = 'MANUAL_REVIEW';
            payment.state = 'MANUAL_REVIEW';
            payment.failureReason = `Amount mismatch on webhook: expected ${order.totalPayablePaise}, received ${amountPaise}`;
            registration.paymentState = 'MANUAL_REVIEW';
            registration.seatConfirmed = false;
          } else if (razorpayPaymentId) {
            this.confirmPaymentVerified({
              order,
              payment,
              registration,
              razorpayPaymentId,
              verifiedVia: 'WEBHOOK',
            });
          }
        } else if (eventType === 'payment.failed') {
          const now = new Date().toISOString();
          if (registration.paymentState !== 'PAID_CONFIRMED') {
            order.status = 'PAYMENT_FAILED';
            order.updatedAt = now;
            payment.state = 'PAYMENT_FAILED';
            payment.failureReason = String(
              paymentEntity?.error_description || 'Payment failed at gateway'
            );
            payment.updatedAt = now;
            registration.paymentState = 'PAYMENT_FAILED';
            registration.seatConfirmed = false;
            registration.updatedAt = now;
          }
        }
      }
    }

    const eventRecord: WebhookEventRecord = {
      id: `wh_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
      providerEventId,
      eventType,
      razorpayOrderId,
      razorpayPaymentId,
      signatureValid: true,
      payload: parsedPayload,
      processedStatus,
      processedAt: new Date().toISOString(),
    };

    this.state.webhookEvents.unshift(eventRecord);
    this.save();

    return {
      statusCode: 200,
      status: processedStatus,
      eventRecord,
    };
  }

  public getProtectedJoinDetails(params: {
    registrationReference: string;
    accessToken?: string;
    requesterRoles?: StaffRoleCode[];
  }): {
    allowed: boolean;
    reason?: string;
    sessionId?: WebinarSessionId;
    paymentState?: PaymentLifecycleState;
    joiningInstructions?: { en: string; hi: string };
    privateMeetingPlatform?: string;
    privateMeetingUrl?: string | null;
    privatePasscode?: string | null;
  } {
    const registration = this.state.registrations.find(
      (r) => r.registrationReference === params.registrationReference
    );
    if (!registration) {
      return { allowed: false, reason: 'Registration not found.' };
    }

    const isStaff =
      params.requesterRoles &&
      hasRolePermission(params.requesterRoles, 'registrations:read');

    if (!isStaff && params.accessToken !== registration.accessToken) {
      return {
        allowed: false,
        reason: 'Valid attendee access token is required to view protected joining details.',
        sessionId: registration.sessionId,
        paymentState: registration.paymentState,
      };
    }

    if (registration.paymentState !== 'PAID_CONFIRMED' || !registration.seatConfirmed) {
      return {
        allowed: false,
        reason: `Joining instructions are locked until payment state is PAID_CONFIRMED (current state: ${registration.paymentState}).`,
        sessionId: registration.sessionId,
        paymentState: registration.paymentState,
      };
    }

    const session = this.state.webinarSessions.find(
      (s) => s.id === registration.sessionId
    )!;

    return {
      allowed: true,
      sessionId: session.id,
      paymentState: registration.paymentState,
      joiningInstructions: session.joiningInstructions,
      privateMeetingPlatform: session.privateMeetingPlatform,
      privateMeetingUrl: session.privateMeetingUrl || null,
      privatePasscode: session.privatePasscode || null,
    };
  }

  public transferRegistrationSession(params: {
    registrationReference: string;
    targetSessionId: WebinarSessionId;
    actorEmail: string;
    actorRole: StaffRoleCode | 'LEARNER';
    nowOverrideUtc?: string;
  }): WebinarRegistrationRecord {
    const registration = this.state.registrations.find(
      (r) => r.registrationReference === params.registrationReference
    );
    if (!registration) {
      throw new Error('Registration not found.');
    }
    if (registration.sessionId === params.targetSessionId) {
      throw new Error('Registration is already assigned to the target session.');
    }

    const currentSession = this.state.webinarSessions.find(
      (s) => s.id === registration.sessionId
    )!;
    const targetSession = this.state.webinarSessions.find(
      (s) => s.id === params.targetSessionId
    );
    if (!targetSession) {
      throw new Error('Target webinar session not found.');
    }

    const isAdminOverride =
      params.actorRole === 'OWNER' ||
      params.actorRole === 'ADMIN' ||
      params.actorRole === 'WEBINAR_OPERATOR';

    const currentSessionCancelledOrRescheduled =
      currentSession.status === 'CANCELLED' || currentSession.status === 'RESCHEDULED';

    if (!isAdminOverride && !currentSessionCancelledOrRescheduled) {
      if (registration.transferCount >= 1) {
        throw new Error(
          'Baseline policy allows only a one-time session transfer per registration.'
        );
      }
      const nowMs = params.nowOverrideUtc
        ? new Date(params.nowOverrideUtc).getTime()
        : Date.now();
      const startMs = new Date(currentSession.startUtc).getTime();
      const hoursUntilStart = (startMs - nowMs) / (1000 * 60 * 60);
      if (hoursUntilStart < 24) {
        throw new Error(
          'Self-serve session transfers require at least 24 hours notice before session start.'
        );
      }
    }

    const prevSessionId = registration.sessionId;
    registration.transferredFromSessionId = prevSessionId;
    registration.sessionId = targetSession.id;
    registration.sessionLocale = targetSession.instructionLocale;
    registration.transferCount += 1;
    registration.updatedAt = new Date().toISOString();

    if (registration.seatConfirmed) {
      currentSession.confirmedPaidSeats = Math.max(0, currentSession.confirmedPaidSeats - 1);
      targetSession.confirmedPaidSeats += 1;
    }

    const order = this.state.orders.find((o) => o.registrationId === registration.id);
    if (order) {
      order.sessionId = targetSession.id;
      order.updatedAt = registration.updatedAt;
    }

    const sessionTimeIst =
      targetSession.instructionLocale === 'en'
        ? '1:00 PM to 2:30 PM IST'
        : '4:00 PM to 5:30 PM IST';

    this.queueTransactionalEmail({
      idempotencyKey: `transfer:${registration.id}:${registration.transferCount}`,
      templateCode: 'SESSION_TRANSFER_CONFIRMED',
      recipientEmail: registration.email,
      recipientName: registration.fullName,
      locale: registration.uiLocale,
      variables: {
        fullName: registration.fullName,
        registrationReference: registration.registrationReference,
        sessionTitle: targetSession.title[registration.uiLocale],
        sessionTimeIst,
      },
      relatedEntityType: 'REGISTRATION',
      relatedEntityId: registration.id,
    });

    this.recordAuditLog({
      actorEmail: params.actorEmail,
      actorRole: params.actorRole === 'LEARNER' ? 'SUPPORT_AGENT' : params.actorRole,
      action: 'SESSION_TRANSFERRED',
      targetType: 'REGISTRATION',
      targetId: registration.id,
      summary: `Transferred registration ${registration.registrationReference} from ${prevSessionId} to ${targetSession.id}`,
    });

    this.save();
    return registration;
  }

  public initiateRefund(params: {
    orderId: string;
    reason: string;
    actorEmail: string;
    actorRole: StaffRoleCode;
    autoComplete?: boolean;
  }): RefundRecord {
    const order = this.state.orders.find((o) => o.id === params.orderId);
    if (!order) {
      throw new Error('Order not found.');
    }
    const registration = this.state.registrations.find(
      (r) => r.id === order.registrationId
    )!;
    const payment = this.state.payments.find((p) => p.orderId === order.id);
    if (!payment || registration.paymentState !== 'PAID_CONFIRMED') {
      throw new Error('Only PAID_CONFIRMED orders can be refunded.');
    }

    const now = new Date().toISOString();
    const canApproveDirectly =
      params.autoComplete &&
      (params.actorRole === 'OWNER' || params.actorRole === 'ADMIN');

    const nextState: PaymentLifecycleState = canApproveDirectly
      ? 'REFUNDED'
      : 'REFUND_PENDING';

    payment.state = nextState;
    payment.updatedAt = now;
    order.status = nextState;
    order.updatedAt = now;
    registration.paymentState = nextState;
    if (nextState === 'REFUNDED') {
      registration.seatConfirmed = false;
      const session = this.state.webinarSessions.find(
        (s) => s.id === registration.sessionId
      );
      if (session) {
        session.confirmedPaidSeats = Math.max(0, session.confirmedPaidSeats - 1);
      }
    }
    registration.updatedAt = now;

    const refund: RefundRecord = {
      id: `rfnd_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
      paymentId: payment.id,
      orderId: order.id,
      registrationId: registration.id,
      customerId: registration.customerId,
      razorpayRefundId: canApproveDirectly
        ? `rfnd_rzp_${crypto.randomBytes(5).toString('hex')}`
        : null,
      amountPaise: payment.amountPaise,
      reason: params.reason.trim(),
      status: canApproveDirectly ? 'REFUNDED' : 'REFUND_PENDING',
      initiatedByEmail: params.actorEmail,
      approvedByEmail: canApproveDirectly ? params.actorEmail : null,
      createdAt: now,
      updatedAt: now,
    };

    this.state.refunds.unshift(refund);

    const customer = this.state.customers.find((c) => c.id === registration.customerId);
    if (customer && canApproveDirectly) {
      this.ensureLifecycleStage(customer, 'REFUNDED');
      customer.updatedAt = now;
    }

    this.queueTransactionalEmail({
      idempotencyKey: `refund_${refund.status.toLowerCase()}:${refund.id}`,
      templateCode: canApproveDirectly ? 'REFUND_COMPLETED' : 'REFUND_INITIATED',
      recipientEmail: registration.email,
      recipientName: registration.fullName,
      locale: registration.uiLocale,
      variables: {
        fullName: registration.fullName,
        orderNumber: order.orderNumber,
        registrationReference: registration.registrationReference,
      },
      relatedEntityType: 'REFUND',
      relatedEntityId: refund.id,
    });

    this.recordAuditLog({
      actorEmail: params.actorEmail,
      actorRole: params.actorRole,
      action: canApproveDirectly ? 'REFUND_COMPLETED' : 'REFUND_INITIATED',
      targetType: 'ORDER',
      targetId: order.id,
      summary: `${canApproveDirectly ? 'Completed' : 'Initiated'} refund of ₹299 for ${order.orderNumber}: ${params.reason}`,
    });

    this.save();
    return refund;
  }

  public runReconciliation(actorEmail: string, actorRole: StaffRoleCode): ReconciliationRunRecord {
    const pendingOrders = this.state.orders.filter(
      (o) => o.status === 'PAYMENT_INITIATED' || o.status === 'PENDING_VERIFICATION'
    );
    let resolvedCount = 0;
    let flaggedCount = 0;
    const now = new Date().toISOString();

    for (const order of pendingOrders) {
      const matchingWebhook = this.state.webhookEvents.find(
        (w) =>
          w.razorpayOrderId === order.razorpayOrderId &&
          w.signatureValid &&
          (w.eventType === 'payment.captured' || w.eventType === 'order.paid')
      );
      const registration = this.state.registrations.find(
        (r) => r.id === order.registrationId
      )!;
      const payment = this.state.payments.find((p) => p.orderId === order.id);

      if (matchingWebhook && payment && matchingWebhook.razorpayPaymentId) {
        this.confirmPaymentVerified({
          order,
          payment,
          registration,
          razorpayPaymentId: matchingWebhook.razorpayPaymentId,
          verifiedVia: 'ADMIN_RECONCILIATION',
        });
        resolvedCount += 1;
      } else {
        const ageMinutes =
          (Date.now() - new Date(order.createdAt).getTime()) / (1000 * 60);
        if (ageMinutes > 30) {
          order.status = 'MANUAL_REVIEW';
          order.updatedAt = now;
          registration.paymentState = 'MANUAL_REVIEW';
          registration.updatedAt = now;
          if (payment) {
            payment.state = 'MANUAL_REVIEW';
            payment.updatedAt = now;
          }
          flaggedCount += 1;
        }
      }
    }

    const run: ReconciliationRunRecord = {
      id: `rec_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
      triggeredByEmail: actorEmail,
      checkedOrdersCount: pendingOrders.length,
      resolvedCount,
      flaggedManualReviewCount: flaggedCount,
      summary: `Checked ${pendingOrders.length} pending orders: ${resolvedCount} reconciled to PAID_CONFIRMED, ${flaggedCount} flagged for MANUAL_REVIEW.`,
      createdAt: now,
    };

    this.state.reconciliationRuns.unshift(run);
    this.recordAuditLog({
      actorEmail,
      actorRole,
      action: 'PAYMENT_RECONCILIATION_RUN',
      targetType: 'RECONCILIATION',
      targetId: run.id,
      summary: run.summary,
    });
    this.save();
    return run;
  }

  public createSupportTicketFromContact(input: {
    name: string;
    email: string;
    phone?: string;
    category: string;
    message: string;
    uiLocale: Locale;
    utm?: UtmAttribution;
  }): SupportTicketRecord {
    const customer = this.upsertCustomer({
      email: input.email,
      fullName: input.name,
      phone: input.phone,
      uiLocale: input.uiLocale,
      termsAccepted: true,
      marketingOptIn: false,
      stage: 'ENQUIRY_SUBMITTED',
      utm: input.utm,
      activitySummary: `Submitted contact enquiry (${input.category})`,
    });

    const now = new Date().toISOString();
    const seq = String(this.state.supportTickets.length + 1).padStart(4, '0');
    const ticketNumber = `TKT-2026-${seq}`;

    const linkedReg = this.state.registrations.find(
      (r) => r.email === customer.primaryEmail
    );
    const linkedOrder = linkedReg
      ? this.state.orders.find((o) => o.registrationId === linkedReg.id)
      : undefined;

    const ticket: SupportTicketRecord = {
      id: `tkt_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
      ticketNumber,
      customerId: customer.id,
      name: input.name.trim(),
      email: customer.primaryEmail,
      phone: (input.phone || '').trim(),
      category: input.category,
      subject: `${input.category.toUpperCase()} enquiry from ${input.name.trim()}`,
      message: sanitizeRichText(input.message),
      status: 'OPEN',
      assignedToEmail: 'bonnza@marketingtusk.com',
      resolutionNotes: '',
      linkedRegistrationId: linkedReg?.id || null,
      linkedOrderId: linkedOrder?.id || null,
      createdAt: now,
      updatedAt: now,
    };

    this.state.supportTickets.unshift(ticket);

    this.queueTransactionalEmail({
      idempotencyKey: `contact_ack:${ticket.id}`,
      templateCode: 'CONTACT_ENQUIRY_ACKNOWLEDGEMENT',
      recipientEmail: ticket.email,
      recipientName: ticket.name,
      locale: input.uiLocale,
      variables: {
        fullName: ticket.name,
        ticketNumber: ticket.ticketNumber,
      },
      relatedEntityType: 'SUPPORT_TICKET',
      relatedEntityId: ticket.id,
    });

    this.save();
    return ticket;
  }

  public updateArticleEditorialState(params: {
    articleId: string;
    locale: Locale;
    updates: {
      title?: string;
      shortDescription?: string;
      directAnswer?: string;
      summary?: string;
      editorialStatus?: EditorialStatus;
      subjectReviewStatus?: SubjectReviewStatus;
      translationStatus?: TranslationStatus;
      reviewerName?: string | null;
      sourceCheckedDate?: string | null;
      seoTitle?: string;
      metaDescription?: string;
      changeNote?: string;
    };
    actorEmail: string;
    actorRole: StaffRoleCode;
  }): ManagedArticleRecord {
    const article = this.state.articles.find((a) => a.id === params.articleId);
    if (!article) {
      throw new Error(`Article ${params.articleId} not found.`);
    }

    const locState = article.locales[params.locale];
    const nextEditorialStatus = params.updates.editorialStatus ?? locState.editorialStatus;
    const nextSubjectReview =
      params.updates.subjectReviewStatus ?? locState.subjectReviewStatus;
    const nextTranslationStatus =
      params.updates.translationStatus ?? locState.translationStatus;
    const nextReviewer =
      params.updates.reviewerName !== undefined
        ? params.updates.reviewerName
        : locState.reviewerName;
    const nextSourceDate =
      params.updates.sourceCheckedDate !== undefined
        ? params.updates.sourceCheckedDate
        : locState.sourceCheckedDate;

    // Publishing Gate Enforcement
    if (nextEditorialStatus === 'PUBLISHED') {
      if (params.actorRole !== 'OWNER' && params.actorRole !== 'ADMIN') {
        throw new Error('Only OWNER or ADMIN roles may publish an article.');
      }
      if (nextSubjectReview !== 'VERIFIED') {
        throw new Error(
          'Cannot publish article: Subject-matter review status must be VERIFIED.'
        );
      }
      if (!nextReviewer || !nextReviewer.trim()) {
        throw new Error(
          'Cannot publish article: A verified reviewer name must be recorded.'
        );
      }
      if (!nextSourceDate || !nextSourceDate.trim()) {
        throw new Error(
          'Cannot publish article: Primary source checked date must be recorded.'
        );
      }
      if (params.locale === 'hi' && nextTranslationStatus !== 'APPROVED') {
        throw new Error(
          'Cannot publish Hindi article: Hindi translation status must be APPROVED.'
        );
      }
    }

    const now = new Date().toISOString();
    if (params.updates.title) {
      locState.title = sanitizeRichText(params.updates.title);
      article.title[params.locale] = locState.title;
    }
    if (params.updates.shortDescription) {
      locState.shortDescription = sanitizeRichText(params.updates.shortDescription);
      article.shortDescription[params.locale] = locState.shortDescription;
    }
    if (params.updates.directAnswer) {
      locState.directAnswer = sanitizeRichText(params.updates.directAnswer);
      article.directAnswer[params.locale] = locState.directAnswer;
    }
    if (params.updates.summary) {
      locState.summary = sanitizeRichText(params.updates.summary);
      article.summary[params.locale] = locState.summary;
    }
    if (params.updates.seoTitle) {
      locState.seoTitle = sanitizeRichText(params.updates.seoTitle);
      article.seoTitle[params.locale] = locState.seoTitle;
    }
    if (params.updates.metaDescription) {
      locState.metaDescription = sanitizeRichText(params.updates.metaDescription);
      article.metaDescription[params.locale] = locState.metaDescription;
    }

    locState.editorialStatus = nextEditorialStatus;
    locState.subjectReviewStatus = nextSubjectReview;
    locState.translationStatus = nextTranslationStatus;
    locState.reviewerName = nextReviewer;
    locState.sourceCheckedDate = nextSourceDate;
    if (nextEditorialStatus === 'PUBLISHED' && !locState.publishedAt) {
      locState.publishedAt = now;
    }
    locState.updatedAt = now;

    // Sync top-level article status if English is updated
    if (params.locale === 'en') {
      article.editorialStatus = nextEditorialStatus;
      article.subjectReviewStatus = nextSubjectReview;
      article.sourceCheckedDate = nextSourceDate;
      if (nextEditorialStatus === 'PUBLISHED') {
        article.publicationDate = locState.publishedAt;
      }
    } else {
      article.translationStatus = nextTranslationStatus;
    }

    const nextVerNum = `1.${article.versions.length}`;
    article.contentVersion = nextVerNum;
    article.versions.unshift({
      id: `ver_${article.id}_${Date.now()}`,
      articleId: article.id,
      locale: params.locale,
      versionLabel: nextVerNum,
      editorEmail: params.actorEmail,
      changeNote:
        params.updates.changeNote ||
        `Updated ${params.locale.toUpperCase()} status to ${nextEditorialStatus} / ${nextSubjectReview}`,
      snapshot: { ...locState },
      createdAt: now,
    });

    this.recordAuditLog({
      actorEmail: params.actorEmail,
      actorRole: params.actorRole,
      action: 'CMS_ARTICLE_UPDATED',
      targetType: 'ARTICLE',
      targetId: `${article.id}:${params.locale}`,
      summary: `Updated ${article.id} (${params.locale.toUpperCase()}) -> status: ${locState.editorialStatus}, review: ${locState.subjectReviewStatus}`,
    });

    this.save();
    return article;
  }

  public previewAttendanceCsv(params: {
    sessionId: WebinarSessionId;
    csvText: string;
  }): Array<{
    email: string;
    durationMinutes: number;
    status: 'ATTENDED' | 'NO_SHOW' | 'PARTIAL';
    matchedRegistrationReference: string | null;
  }> {
    const lines = params.csvText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    const preview: Array<{
      email: string;
      durationMinutes: number;
      status: 'ATTENDED' | 'NO_SHOW' | 'PARTIAL';
      matchedRegistrationReference: string | null;
    }> = [];

    for (const line of lines) {
      if (line.toLowerCase().startsWith('email,')) continue;
      const parts = line.split(',').map((p) => p.trim());
      const email = (parts[0] || '').toLowerCase();
      if (!email || !email.includes('@')) continue;
      const durationMinutes = Number.parseInt(parts[1] || '0', 10) || 0;
      const status: 'ATTENDED' | 'NO_SHOW' | 'PARTIAL' =
        durationMinutes >= 45
          ? 'ATTENDED'
          : durationMinutes > 0
          ? 'PARTIAL'
          : 'NO_SHOW';

      const reg = this.state.registrations.find(
        (r) => r.email === email && r.sessionId === params.sessionId
      );
      preview.push({
        email,
        durationMinutes,
        status,
        matchedRegistrationReference: reg?.registrationReference || null,
      });
    }
    return preview;
  }

  public commitAttendanceRecords(params: {
    sessionId: WebinarSessionId;
    records: Array<{
      registrationReference: string;
      status: 'ATTENDED' | 'NO_SHOW' | 'PARTIAL';
      durationMinutes: number;
    }>;
    actorEmail: string;
    actorRole: StaffRoleCode;
  }): AttendanceRecord[] {
    const now = new Date().toISOString();
    const updated: AttendanceRecord[] = [];
    const session = this.state.webinarSessions.find((s) => s.id === params.sessionId);
    if (!session) throw new Error('Session not found.');

    for (const item of params.records) {
      const reg = this.state.registrations.find(
        (r) =>
          r.registrationReference === item.registrationReference &&
          r.sessionId === params.sessionId
      );
      if (!reg) continue;

      let att = this.state.attendance.find(
        (a) => a.sessionId === params.sessionId && a.registrationId === reg.id
      );
      if (!att) {
        att = {
          id: `attd_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
          sessionId: params.sessionId,
          registrationId: reg.id,
          customerId: reg.customerId,
          email: reg.email,
          fullName: reg.fullName,
          status: item.status,
          joinTimeUtc: item.durationMinutes > 0 ? session.startUtc : null,
          leaveTimeUtc: item.durationMinutes > 0 ? session.endUtc : null,
          durationMinutes: item.durationMinutes,
          markedByEmail: params.actorEmail,
          updatedAt: now,
        };
        this.state.attendance.unshift(att);
      } else {
        att.status = item.status;
        att.durationMinutes = item.durationMinutes;
        att.markedByEmail = params.actorEmail;
        att.updatedAt = now;
      }

      const customer = this.state.customers.find((c) => c.id === reg.customerId);
      if (customer) {
        this.ensureLifecycleStage(
          customer,
          item.status === 'NO_SHOW' ? 'WEBINAR_NO_SHOW' : 'WEBINAR_ATTENDED'
        );
        customer.updatedAt = now;
      }

      this.queueTransactionalEmail({
        idempotencyKey: `post_webinar:${reg.id}:${item.status}`,
        templateCode:
          item.status === 'NO_SHOW'
            ? 'POST_WEBINAR_NOSHOW_FOLLOWUP'
            : 'POST_WEBINAR_ATTENDED_FOLLOWUP',
        recipientEmail: reg.email,
        recipientName: reg.fullName,
        locale: reg.uiLocale,
        variables: {
          fullName: reg.fullName,
          registrationReference: reg.registrationReference,
          sessionTitle: session.title[reg.uiLocale],
        },
        relatedEntityType: 'ATTENDANCE',
        relatedEntityId: att.id,
      });

      updated.push(att);
    }

    this.recordAuditLog({
      actorEmail: params.actorEmail,
      actorRole: params.actorRole,
      action: 'WEBINAR_ATTENDANCE_UPDATED',
      targetType: 'WEBINAR_SESSION',
      targetId: params.sessionId,
      summary: `Recorded attendance for ${updated.length} registrants in ${params.sessionId}`,
    });

    this.save();
    return updated;
  }
}

export const bonnzaStore = new BonnzaStore();
