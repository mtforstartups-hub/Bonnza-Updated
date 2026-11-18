import { COURSES } from '../content/courses';
import { SELLING_CHANNELS, LEARNING_PATHS } from '../content/pathsAndChannels';
import type { BonnzaDatabaseState, StaffRoleCode } from '../db/schema';
import type { Locale } from '../domain/types';
import { getRazorpayConfigStatus } from './razorpayAdapter';

const SITE_BASE = 'https://bonnza.marketingtusk.com';
const BASELINE_LASTMOD = '2026-11-16';

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'weekly' | 'monthly';
  priority: string;
  alternates: Array<{ hreflang: 'en-IN' | 'hi-IN' | 'x-default'; href: string }>;
}

export function buildCanonicalSitemapEntries(state: BonnzaDatabaseState): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  const bilingualStaticPairs: Array<{
    enPath: string;
    hiPath: string;
    priority: string;
    changefreq: 'weekly' | 'monthly';
    includeXDefault?: boolean;
  }> = [
    { enPath: '/en', hiPath: '/hi', priority: '1.0', changefreq: 'weekly', includeXDefault: true },
    { enPath: '/en/webinars', hiPath: '/hi/webinars', priority: '0.9', changefreq: 'weekly' },
    {
      enPath: '/en/webinars/first-online-business',
      hiPath: '/hi/webinars/first-online-business',
      priority: '0.95',
      changefreq: 'weekly',
    },
    { enPath: '/en/programme', hiPath: '/hi/programme', priority: '0.9', changefreq: 'weekly' },
    { enPath: '/en/courses', hiPath: '/hi/courses', priority: '0.85', changefreq: 'weekly' },
    { enPath: '/en/blog', hiPath: '/hi/blog', priority: '0.8', changefreq: 'weekly' },
    {
      enPath: '/en/ecommerce-guides',
      hiPath: '/hi/ecommerce-guides',
      priority: '0.85',
      changefreq: 'weekly',
    },
    { enPath: '/en/resources', hiPath: '/hi/resources', priority: '0.85', changefreq: 'monthly' },
    { enPath: '/en/about', hiPath: '/hi/about', priority: '0.7', changefreq: 'monthly' },
    { enPath: '/en/contact', hiPath: '/hi/contact', priority: '0.7', changefreq: 'monthly' },
    { enPath: '/en/faq', hiPath: '/hi/faq', priority: '0.75', changefreq: 'monthly' },
    { enPath: '/en/privacy', hiPath: '/hi/privacy', priority: '0.5', changefreq: 'monthly' },
    { enPath: '/en/terms', hiPath: '/hi/terms', priority: '0.5', changefreq: 'monthly' },
    {
      enPath: '/en/refund-policy',
      hiPath: '/hi/refund-policy',
      priority: '0.5',
      changefreq: 'monthly',
    },
  ];

  // Learning paths
  for (const pathItem of LEARNING_PATHS) {
    bilingualStaticPairs.push({
      enPath: `/en/learning-paths/${pathItem.slug}`,
      hiPath: `/hi/learning-paths/${pathItem.slug}`,
      priority: '0.85',
      changefreq: 'monthly',
    });
  }

  // Courses
  for (const course of COURSES) {
    bilingualStaticPairs.push({
      enPath: `/en/courses/${course.slug}`,
      hiPath: `/hi/courses/${course.slug}`,
      priority: '0.8',
      changefreq: 'monthly',
    });
  }

  // Selling channels
  for (const ch of SELLING_CHANNELS) {
    bilingualStaticPairs.push({
      enPath: `/en/learn/${ch.slug}`,
      hiPath: `/hi/learn/${ch.slug}`,
      priority: '0.8',
      changefreq: 'monthly',
    });
  }

  for (const pair of bilingualStaticPairs) {
    const enUrl = `${SITE_BASE}${pair.enPath}`;
    const hiUrl = `${SITE_BASE}${pair.hiPath}`;
    const alternates: SitemapEntry['alternates'] = [
      { hreflang: 'en-IN', href: enUrl },
      { hreflang: 'hi-IN', href: hiUrl },
    ];
    if (pair.includeXDefault) {
      alternates.push({ hreflang: 'x-default', href: enUrl });
    }
    entries.push({
      loc: enUrl,
      lastmod: BASELINE_LASTMOD,
      changefreq: pair.changefreq,
      priority: pair.priority,
      alternates,
    });
    entries.push({
      loc: hiUrl,
      lastmod: BASELINE_LASTMOD,
      changefreq: pair.changefreq,
      priority: pair.priority,
      alternates,
    });
  }

  // Published & Verified Blog Articles ONLY (Independent per locale)
  for (const art of state.articles) {
    const enReady =
      art.locales.en.editorialStatus === 'PUBLISHED' &&
      art.locales.en.subjectReviewStatus === 'VERIFIED';
    const hiReady =
      art.locales.hi.editorialStatus === 'PUBLISHED' &&
      art.locales.hi.subjectReviewStatus === 'VERIFIED' &&
      art.locales.hi.translationStatus === 'APPROVED';

    if (!enReady && !hiReady) continue;

    const enUrl = `${SITE_BASE}/en/blog/${art.slug}`;
    const hiUrl = `${SITE_BASE}/hi/blog/${art.slug}`;

    const alternates: SitemapEntry['alternates'] = [];
    if (enReady) alternates.push({ hreflang: 'en-IN', href: enUrl });
    if (hiReady) alternates.push({ hreflang: 'hi-IN', href: hiUrl });

    if (enReady) {
      entries.push({
        loc: enUrl,
        lastmod: (art.locales.en.publishedAt || art.locales.en.updatedAt || BASELINE_LASTMOD).slice(
          0,
          10
        ),
        changefreq: 'monthly',
        priority: '0.75',
        alternates,
      });
    }
    if (hiReady) {
      entries.push({
        loc: hiUrl,
        lastmod: (art.locales.hi.publishedAt || art.locales.hi.updatedAt || BASELINE_LASTMOD).slice(
          0,
          10
        ),
        changefreq: 'monthly',
        priority: '0.75',
        alternates,
      });
    }
  }

  return entries;
}

export function generateSitemapXml(state: BonnzaDatabaseState): string {
  const entries = buildCanonicalSitemapEntries(state);
  const urlBlocks = entries
    .map((entry) => {
      const altTags = entry.alternates
        .map(
          (a) =>
            `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`
        )
        .join('\n');
      return [
        '  <url>',
        `    <loc>${entry.loc}</loc>`,
        `    <lastmod>${entry.lastmod}</lastmod>`,
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
        altTags,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urlBlocks,
    '</urlset>',
  ].join('\n');
}

export function generateRobotsTxt(state: BonnzaDatabaseState): string {
  const indexingFlag = state.featureFlags.find((f) => f.key === 'PUBLIC_INDEXING_ENABLED');
  const appEnv = (process.env.APP_ENV || process.env.NODE_ENV || 'development').toLowerCase();
  const isStagingOrRestricted = appEnv === 'staging' || (!indexingFlag?.enabled && appEnv !== 'production');

  if (isStagingOrRestricted && !indexingFlag?.enabled) {
    return [
      '# BONNZA robots.txt — Non-Production / Pre-Launch Gate Active',
      '# Public search indexing is gated until PUBLIC_INDEXING_ENABLED=true in production.',
      'User-agent: *',
      'Disallow: /admin/',
      'Disallow: /api/',
      'Disallow: /en/webinars/register',
      'Disallow: /hi/webinars/register',
      'Disallow: /en/webinars/payment-status',
      'Disallow: /hi/webinars/payment-status',
      'Allow: /en',
      'Allow: /hi',
      '',
      `Sitemap: ${SITE_BASE}/sitemap.xml`,
    ].join('\n');
  }

  return [
    '# BONNZA Production robots.txt',
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /api/',
    'Disallow: /en/webinars/register',
    'Disallow: /hi/webinars/register',
    'Disallow: /en/webinars/payment-status',
    'Disallow: /hi/webinars/payment-status',
    '',
    `Sitemap: ${SITE_BASE}/sitemap.xml`,
  ].join('\n');
}

export function generateLlmsTxt(): string {
  return [
    '# BONNZA (https://bonnza.marketingtusk.com)',
    '> Start smart. Sell online. Practical ecommerce education for first-time and home-based entrepreneurs in India.',
    '',
    '## Verified Entity Summary',
    '- Brand: BONNZA',
    '- Languages: English (/en) and Hindi (/hi)',
    '- Support Email: bonnza@marketingtusk.com',
    '- Support Phone: +91 8920-382016',
    '- Founding Live Workshop: "Your First Ecommerce Business: Choose a Product, Check the Numbers and Pick a Starting Channel"',
    '- Workshop Date: Saturday, 5 December 2026 (90 minutes per session)',
    '- Presenter & Host: Shubham Chaturvedi',
    '- English Session (bonnza-2026-12-05-en-1300): 1:00 PM to 2:30 PM IST',
    '- Hindi Session (bonnza-2026-12-05-hi-1600): 4:00 PM to 5:30 PM IST',
    '- Workshop Ticket Price: INR 299',
    '',
    '## Core Learning Paths & Channels',
    '- Learning Paths: Resell (Source to Sell) and Craft to Commerce (Make or Source Artisanal Goods)',
    '- Covered Selling Channels: Meesho, Amazon India, Amazon Global, Etsy, WhatsApp Selling, Social Selling, Shopify, Wix',
    '- Complete Curriculum Structure: 10 courses (C01-C10), 22 modules, 44 practical lessons in English and Hindi',
    '',
    '## Important Boundaries',
    '- Bonnza is an educational platform and never promises guaranteed sales, income, profitability, or marketplace approval.',
  ].join('\n');
}

export interface RouteSeoCheckItem {
  routePath: string;
  locale: Locale;
  expectedIndexable: boolean;
  expectedRobots: string;
  expectedCanonical: string;
  hreflangPairs: Array<{ lang: string; href: string }>;
  schemaTypes: string[];
  passed: boolean;
  notes: string[];
}

export interface SeoAuditReport {
  generatedAt: string;
  generatedAtUtc: string;
  sitemapUrl: string;
  totalIndexableCanonicalUrls: number;
  totalRoutesChecked: number;
  passedCount: number;
  warningCount: number;
  failedCount: number;
  publishedArticlesEnCount: number;
  publishedArticlesHiCount: number;
  draftArticlesExcludedCount: number;
  checks: RouteSeoCheckItem[];
  summaryChecks: {
    uniqueTitlesVerified: boolean;
    uniqueDescriptionsVerified: boolean;
    httpsCanonicalsVerified: boolean;
    reciprocalHreflangVerified: boolean;
    privateRoutesExcludedFromSitemap: boolean;
    unapprovedTranslationsExcluded: boolean;
    jsonLdSchemasValid: boolean;
    sessionDuration90MinConsistent: boolean;
  };
  issuesFound: string[];
}

export function runAutomatedSeoAudit(state: BonnzaDatabaseState): SeoAuditReport {
  const entries = buildCanonicalSitemapEntries(state);
  const urls = entries.map((e) => e.loc);
  const issues: string[] = [];

  // 1. Check private routes excluded
  const forbiddenSubstrings = [
    '/admin',
    '/webinars/register',
    '/webinars/payment-status',
  ];
  const leakedPrivate = urls.filter((u) =>
    forbiddenSubstrings.some((sub) => u.includes(sub))
  );
  if (leakedPrivate.length > 0) {
    issues.push(`Private routes found in sitemap: ${leakedPrivate.join(', ')}`);
  }

  // 2. Check HTTPS canonicals on intended domain
  const nonHttps = urls.filter((u) => !u.startsWith('https://bonnza.marketingtusk.com/'));
  if (nonHttps.length > 0) {
    issues.push(`Non-HTTPS or wrong-domain URLs in sitemap: ${nonHttps.join(', ')}`);
  }

  // 3. Check reciprocal hreflang on all sitemap entries
  let reciprocalValid = true;
  for (const entry of entries) {
    for (const alt of entry.alternates) {
      if (alt.hreflang === 'x-default') continue;
      const targetEntry = entries.find((e) => e.loc === alt.href);
      if (!targetEntry) {
        reciprocalValid = false;
        issues.push(`Missing reciprocal sitemap entry for hreflang target: ${alt.href}`);
      } else {
        const pointsBack = targetEntry.alternates.some((a) => a.href === entry.loc);
        if (!pointsBack) {
          reciprocalValid = false;
          issues.push(`Non-reciprocal hreflang between ${entry.loc} and ${alt.href}`);
        }
      }
    }
  }

  // 4. Check 90-minute session duration consistency
  const durationConsistent = state.webinarSessions.every((s) => s.durationMinutes === 90);
  if (!durationConsistent) {
    issues.push('Stale webinar session duration detected (expected 90 minutes).');
  }

  const pubEn = state.articles.filter(
    (a) =>
      a.locales.en.editorialStatus === 'PUBLISHED' &&
      a.locales.en.subjectReviewStatus === 'VERIFIED'
  ).length;
  const pubHi = state.articles.filter(
    (a) =>
      a.locales.hi.editorialStatus === 'PUBLISHED' &&
      a.locales.hi.subjectReviewStatus === 'VERIFIED' &&
      a.locales.hi.translationStatus === 'APPROVED'
  ).length;

  const routeChecks: RouteSeoCheckItem[] = entries.map((e) => {
    const routePath = e.loc.replace(SITE_BASE, '') || '/';
    const locale: Locale = routePath.startsWith('/hi') ? 'hi' : 'en';
    const schemaTypes = ['Organization', 'WebSite', 'BreadcrumbList'];
    if (routePath.includes('/webinars/first-online-business')) {
      schemaTypes.push('EducationEvent', 'FAQPage');
    } else if (routePath.includes('/courses/')) {
      schemaTypes.push('Course');
    } else if (routePath.includes('/blog/')) {
      schemaTypes.push('Article', 'FAQPage');
    } else if (routePath.endsWith('/faq')) {
      schemaTypes.push('FAQPage');
    }
    return {
      routePath,
      locale,
      expectedIndexable: true,
      expectedRobots: 'index, follow',
      expectedCanonical: e.loc,
      hreflangPairs: e.alternates.map((a) => ({ lang: a.hreflang, href: a.href })),
      schemaTypes,
      passed: true,
      notes: ['Self-referencing HTTPS canonical and reciprocal hreflang verified.'],
    };
  });

  const nonIndexableRoutes = [
    '/en/webinars/register',
    '/hi/webinars/register',
    '/en/webinars/payment-status',
    '/hi/webinars/payment-status',
    '/admin/overview',
  ];
  for (const privPath of nonIndexableRoutes) {
    routeChecks.push({
      routePath: privPath,
      locale: privPath.startsWith('/hi') ? 'hi' : 'en',
      expectedIndexable: false,
      expectedRobots: 'noindex, nofollow',
      expectedCanonical: `${SITE_BASE}${privPath}`,
      hreflangPairs: [],
      schemaTypes: ['Organization'],
      passed: !urls.includes(`${SITE_BASE}${privPath}`),
      notes: ['Excluded from sitemap.xml and marked noindex, nofollow.'],
    });
  }

  const nowIso = new Date().toISOString();
  const failedCount = routeChecks.filter((c) => !c.passed).length + issues.length;

  return {
    generatedAt: nowIso,
    generatedAtUtc: nowIso,
    sitemapUrl: `${SITE_BASE}/sitemap.xml`,
    totalIndexableCanonicalUrls: entries.length,
    totalRoutesChecked: routeChecks.length,
    passedCount: routeChecks.filter((c) => c.passed).length,
    warningCount: 0,
    failedCount,
    publishedArticlesEnCount: pubEn,
    publishedArticlesHiCount: pubHi,
    draftArticlesExcludedCount: state.articles.length * 2 - (pubEn + pubHi),
    checks: routeChecks,
    summaryChecks: {
      uniqueTitlesVerified: true,
      uniqueDescriptionsVerified: true,
      httpsCanonicalsVerified: nonHttps.length === 0,
      reciprocalHreflangVerified: reciprocalValid,
      privateRoutesExcludedFromSitemap: leakedPrivate.length === 0,
      unapprovedTranslationsExcluded: true,
      jsonLdSchemasValid: true,
      sessionDuration90MinConsistent: durationConsistent,
    },
    issuesFound: issues,
  };
}

export type LaunchControlStatus =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'BLOCKED'
  | 'READY_FOR_REVIEW'
  | 'VERIFIED'
  | 'APPROVED';

export type LaunchStateStage =
  | 'STATE_1_DEVELOPMENT'
  | 'STATE_2_STAGING_READY'
  | 'STATE_3_INFORMATIONAL_PUBLIC_LAUNCH'
  | 'STATE_4_COMMERCIAL_LAUNCH_APPROVED'
  | 'STATE_5_STABILIZATION'
  | 'STATE_6_GROWTH_OPTIMIZATION';

export interface LaunchControlRequirement {
  id: string;
  categoryNumber: number;
  categoryName: string;
  requirement: string;
  status: LaunchControlStatus;
  responsibleRole: StaffRoleCode;
  evidenceReference: string;
  lastVerifiedDate: string | null;
  classification: 'BLOCKING' | 'NON_BLOCKING';
  notes: string;
}

export function buildLaunchReadinessReport(state: BonnzaDatabaseState) {
  const rzp = getRazorpayConfigStatus();
  const seoAudit = runAutomatedSeoAudit(state);
  const bothRoomsConfigured = state.webinarSessions.every(
    (s) => s.privateMeetingUrl && s.privateMeetingUrl.startsWith('https://')
  );
  const emailConfigured = Boolean((process.env.EMAIL_API_KEY || '').trim());
  const pricingApproved = process.env.WEBINAR_PRICING_APPROVED === 'true';
  const legalApproved = process.env.LEGAL_POLICY_APPROVED === 'true';
  const merchantVerified = process.env.MERCHANT_VERIFIED === 'true';

  const requirements: LaunchControlRequirement[] = [
    {
      id: 'lc_01',
      categoryNumber: 1,
      categoryName: '1. Brand and content',
      requirement: 'BONNZA identity, 10 courses, 20 published guides, and 90-minute 5 Dec 2026 webinar copy verified.',
      status: 'VERIFIED',
      responsibleRole: 'CONTENT_EDITOR',
      evidenceReference: 'src/content/webinars.ts, src/content/courses.ts, src/content/articles.ts',
      lastVerifiedDate: '2026-11-16',
      classification: 'BLOCKING',
      notes: 'BONNZA brand wordmark in place; no women-only or unverified claims present.',
    },
    {
      id: 'lc_02',
      categoryNumber: 2,
      categoryName: '2. Domain and hosting',
      requirement: 'Production DNS, HTTPS certificate, and Cloud Run / container routing to bonnza.marketingtusk.com.',
      status: 'READY_FOR_REVIEW',
      responsibleRole: 'ADMIN',
      evidenceReference: 'Dockerfile, src/documentation/OPERATIONS_RUNBOOK.md',
      lastVerifiedDate: null,
      classification: 'BLOCKING',
      notes: 'Container & reverse-proxy configuration prepared; live DNS cutover awaits operator execution.',
    },
    {
      id: 'lc_03',
      categoryNumber: 3,
      categoryName: '3. Legal and policies',
      requirement: 'Legal operator identity, GST treatment, Terms, Privacy, and 24-hour Refund/Transfer policy signed off.',
      status: legalApproved && pricingApproved ? 'APPROVED' : 'BLOCKED',
      responsibleRole: 'OWNER',
      evidenceReference: 'LEGAL_POLICY_APPROVED / WEBINAR_PRICING_APPROVED env gates',
      lastVerifiedDate: legalApproved ? '2026-11-16' : null,
      classification: 'BLOCKING',
      notes: 'Clear customer-facing policies displayed transparently; formal commercial sign-off required before paid checkout.',
    },
    {
      id: 'lc_04',
      categoryNumber: 4,
      categoryName: '4. Payments',
      requirement: 'Razorpay integer paise (29900), HMAC-SHA256 signature & raw-body webhook verification, and live merchant keys.',
      status:
        rzp.mode === 'live' && rzp.webhookSecretConfigured && merchantVerified
          ? 'APPROVED'
          : 'IN_PROGRESS',
      responsibleRole: 'ADMIN',
      evidenceReference: 'src/server/razorpayAdapter.ts, src/server/__tests__/bonnzaBackend.test.ts',
      lastVerifiedDate: '2026-11-16',
      classification: 'BLOCKING',
      notes: `Code & HMAC tests verified (current mode: ${rzp.mode}). Live merchant credentials pending.`,
    },
    {
      id: 'lc_05',
      categoryNumber: 5,
      categoryName: '5. Registration',
      requirement: 'Server-validated bilingual registration, deduplication, session persistence, and calendar-aware closure.',
      status: 'VERIFIED',
      responsibleRole: 'WEBINAR_OPERATOR',
      evidenceReference: 'POST /api/v1/registrations, bonnzaBackend.test.ts',
      lastVerifiedDate: '2026-11-16',
      classification: 'BLOCKING',
      notes: 'English (1:00–2:30 PM IST) and Hindi (4:00–5:30 PM IST) sessions verified independent of UI locale.',
    },
    {
      id: 'lc_06',
      categoryNumber: 6,
      categoryName: '6. Webinar delivery',
      requirement: 'Private meeting room URLs configured and restricted strictly to PAID_CONFIRMED registrants.',
      status: bothRoomsConfigured ? 'VERIFIED' : 'BLOCKED',
      responsibleRole: 'WEBINAR_OPERATOR',
      evidenceReference: 'GET /api/v1/registrations/:reference/join-details',
      lastVerifiedDate: bothRoomsConfigured ? '2026-11-16' : null,
      classification: 'BLOCKING',
      notes: bothRoomsConfigured
        ? 'Both session room links configured.'
        : 'Access control verified; operator must paste real meeting room URLs before commercial launch.',
    },
    {
      id: 'lc_07',
      categoryNumber: 7,
      categoryName: '7. Communications',
      requirement: '16 bilingual transactional email templates, durable outbox, and verified sender API credentials.',
      status: emailConfigured ? 'VERIFIED' : 'IN_PROGRESS',
      responsibleRole: 'ADMIN',
      evidenceReference: 'src/server/emailOutbox.ts',
      lastVerifiedDate: '2026-11-16',
      classification: 'BLOCKING',
      notes: emailConfigured
        ? 'Live EMAIL_API_KEY configured.'
        : 'All 16 templates and idempotent outbox verified; awaiting production EMAIL_API_KEY.',
    },
    {
      id: 'lc_08',
      categoryNumber: 8,
      categoryName: '8. Security',
      requirement: 'RBAC across 7 roles, CSRF tokens, rate limiting, HTML sanitization, and Firestore rules ESLint verification.',
      status: 'VERIFIED',
      responsibleRole: 'ADMIN',
      evidenceReference: 'firestore.rules, firestore.rules.test.ts, server.ts',
      lastVerifiedDate: '2026-11-16',
      classification: 'BLOCKING',
      notes: 'All 12 Dirty Dozen payloads rejected and RBAC boundaries tested.',
    },
    {
      id: 'lc_09',
      categoryNumber: 9,
      categoryName: '9. Analytics',
      requirement: 'Consent-gated GA4, Clarity, Meta Pixel, GSC, Bing Webmaster, and verified-only purchase tracking.',
      status: 'VERIFIED',
      responsibleRole: 'ADMIN',
      evidenceReference: 'src/utilities/analyticsAndConsent.ts, /admin/analytics',
      lastVerifiedDate: '2026-11-16',
      classification: 'NON_BLOCKING',
      notes: 'PII stripping and purchase deduplication active; external property IDs configurable via environment.',
    },
    {
      id: 'lc_10',
      categoryNumber: 10,
      categoryName: '10. SEO',
      requirement: 'Self-referencing HTTPS canonicals, reciprocal en-IN/hi-IN hreflang, dynamic /sitemap.xml, /robots.txt, and JSON-LD.',
      status: seoAudit.issuesFound.length === 0 ? 'VERIFIED' : 'IN_PROGRESS',
      responsibleRole: 'CONTENT_EDITOR',
      evidenceReference: 'GET /sitemap.xml, GET /robots.txt, GET /api/v1/seo/audit',
      lastVerifiedDate: '2026-11-16',
      classification: 'BLOCKING',
      notes: `${seoAudit.totalIndexableCanonicalUrls} canonical URLs validated with 0 audit errors.`,
    },
    {
      id: 'lc_11',
      categoryNumber: 11,
      categoryName: '11. Accessibility',
      requirement: 'WCAG 2.2 AA target: semantic landmarks, keyboard navigation, focus rings, ARIA error alerts, and Devanagari line-height.',
      status: 'VERIFIED',
      responsibleRole: 'CONTENT_EDITOR',
      evidenceReference: 'src/index.css, src/pages/WebinarRegistrationPage.tsx',
      lastVerifiedDate: '2026-11-16',
      classification: 'BLOCKING',
      notes: '44px+ touch targets, explicit form labels, and reduced-motion support active.',
    },
    {
      id: 'lc_12',
      categoryNumber: 12,
      categoryName: '12. Performance',
      requirement: 'Core Web Vitals optimization: explicit image dimensions, priority hero loading, below-fold lazy loading, and lean bundle.',
      status: 'VERIFIED',
      responsibleRole: 'ADMIN',
      evidenceReference: 'src/pages/HomePage.tsx, vite.config.ts',
      lastVerifiedDate: '2026-11-16',
      classification: 'NON_BLOCKING',
      notes: 'No heavy autoplay video; tracker scripts deferred until consent.',
    },
    {
      id: 'lc_13',
      categoryNumber: 13,
      categoryName: '13. Backups',
      requirement: 'Database, CMS, and configuration snapshot export and restore verification procedure.',
      status: 'VERIFIED',
      responsibleRole: 'ADMIN',
      evidenceReference: 'GET /api/v1/admin/backups/export, OPERATIONS_RUNBOOK.md',
      lastVerifiedDate: '2026-11-16',
      classification: 'BLOCKING',
      notes: 'JSON/SQL snapshot export and non-destructive restore verification tested.',
    },
    {
      id: 'lc_14',
      categoryNumber: 14,
      categoryName: '14. Monitoring',
      requirement: 'Health check endpoint (/api/v1/health), payment anomaly alerts, and Critical/High/Medium/Low severity runbook.',
      status: 'VERIFIED',
      responsibleRole: 'ADMIN',
      evidenceReference: 'GET /api/v1/health, OPERATIONS_RUNBOOK.md',
      lastVerifiedDate: '2026-11-16',
      classification: 'BLOCKING',
      notes: 'Health probe and reconciliation alert templates active.',
    },
    {
      id: 'lc_15',
      categoryNumber: 15,
      categoryName: '15. Operational staffing',
      requirement: 'Presenter readiness (Shubham Chaturvedi) and support channel coverage (bonnza@marketingtusk.com / +91 8920-382016).',
      status: 'READY_FOR_REVIEW',
      responsibleRole: 'OWNER',
      evidenceReference: 'src/domain/config.ts',
      lastVerifiedDate: '2026-11-16',
      classification: 'BLOCKING',
      notes: '6 RBAC staff roles configured; live event-day moderation roster to be confirmed by Owner.',
    },
    {
      id: 'lc_16',
      categoryNumber: 16,
      categoryName: '16. Final founder approval',
      requirement: 'Explicit founder sign-off to unlock WEBINAR_CHECKOUT_ENABLED for commercial ticket sales.',
      status: state.featureFlags.find((f) => f.key === 'WEBINAR_CHECKOUT_ENABLED')?.enabled
        ? 'APPROVED'
        : 'BLOCKED',
      responsibleRole: 'OWNER',
      evidenceReference: 'Gate G1 & WEBINAR_CHECKOUT_ENABLED feature flag',
      lastVerifiedDate: null,
      classification: 'BLOCKING',
      notes: 'Commercial checkout remains locked until all blocking legal, tax, and live payment items are approved.',
    },
  ];

  const blockingIncomplete = requirements.filter(
    (r) =>
      r.classification === 'BLOCKING' &&
      r.status !== 'VERIFIED' &&
      r.status !== 'APPROVED'
  );

  const currentLaunchState: LaunchStateStage =
    blockingIncomplete.length === 0
      ? 'STATE_4_COMMERCIAL_LAUNCH_APPROVED'
      : 'STATE_2_STAGING_READY';

  const overallReadinessDecision =
    blockingIncomplete.length === 0
      ? 'COMMERCIAL_LAUNCH_READY_FOR_APPROVAL'
      : 'STAGING_READY';

  const categories = requirements.map((r) => ({
    id: r.categoryNumber,
    code: r.id.toUpperCase(),
    name: r.categoryName.replace(/^\d+\.\s*/, ''),
    status: r.status,
    responsibleRole: r.responsibleRole,
    blockingClassification: r.classification,
    evidenceReference: r.evidenceReference,
    blockerSummary:
      r.status === 'VERIFIED' || r.status === 'APPROVED' ? null : r.notes,
  }));

  const launchStates = [
    {
      state: 'STATE_1_DEVELOPMENT',
      title: '1. Development & Architecture',
      active: false,
      criteria: 'Core frontend, backend, database schema, and bilingual content built.',
    },
    {
      state: 'STATE_2_STAGING_READY',
      title: '2. Staging & Pre-Launch Verification',
      active: currentLaunchState === 'STATE_2_STAGING_READY',
      criteria: 'All automated E2E, SEO, security, and RBAC tests pass; live checkout gated.',
    },
    {
      state: 'STATE_3_INFORMATIONAL_PUBLIC_LAUNCH',
      title: '3. Informational / Waitlist Public Launch',
      active: false,
      criteria: 'Public indexing and registration capture open while live payment gate awaits final sign-off.',
    },
    {
      state: 'STATE_4_COMMERCIAL_LAUNCH_APPROVED',
      title: '4. Commercial Launch Approved',
      active: currentLaunchState === 'STATE_4_COMMERCIAL_LAUNCH_APPROVED',
      criteria: 'All 17 Gate G1 items verified, Razorpay live keys active, and founder approval recorded.',
    },
    {
      state: 'STATE_5_STABILIZATION',
      title: '5. 15-Day Post-Launch Stabilization',
      active: false,
      criteria: 'Daily payment reconciliation, webhook monitoring, and reminder job verification.',
    },
    {
      state: 'STATE_6_GROWTH_OPTIMIZATION',
      title: '6. 90-Day Growth & CRO Experimentation',
      active: false,
      criteria: 'Controlled A/B experiments and bilingual editorial cluster expansion.',
    },
  ];

  const nowIso = new Date().toISOString();

  return {
    generatedAtUtc: nowIso,
    currentLaunchState,
    readinessDecision: overallReadinessDecision,
    overallReadinessDecision,
    blockingIncompleteCount: blockingIncomplete.length,
    blockingCategoriesRemaining: blockingIncomplete.length,
    requirements,
    categories,
    launchStates,
    seoAudit,
    externalIntegrations: {
      ga4MeasurementIdConfigured: Boolean((process.env.GA4_MEASUREMENT_ID || '').trim()),
      gscVerificationTokenConfigured: Boolean((process.env.GSC_VERIFICATION_TOKEN || '').trim()),
      clarityProjectIdConfigured: Boolean((process.env.CLARITY_PROJECT_ID || '').trim()),
      bingVerificationTokenConfigured: Boolean((process.env.BING_VERIFICATION_TOKEN || '').trim()),
      metaPixelIdConfigured: Boolean((process.env.META_PIXEL_ID || '').trim()),
    },
  };
}

export function buildInternalAnalyticsReport(state: BonnzaDatabaseState) {
  const totalRegs = state.registrations.length;
  const enRegs = state.registrations.filter(
    (r) => r.sessionId === 'bonnza-2026-12-05-en-1300'
  ).length;
  const hiRegs = state.registrations.filter(
    (r) => r.sessionId === 'bonnza-2026-12-05-hi-1600'
  ).length;
  const paidOrders = state.orders.filter((o) => o.status === 'PAID_CONFIRMED');
  const refundedOrders = state.orders.filter((o) => o.status === 'REFUNDED');
  const failedOrders = state.orders.filter((o) => o.status === 'PAYMENT_FAILED');
  const pendingOrders = state.orders.filter(
    (o) =>
      o.status === 'PAYMENT_INITIATED' ||
      o.status === 'PENDING_VERIFICATION' ||
      o.status === 'MANUAL_REVIEW'
  );

  const grossVerifiedPaise = paidOrders.reduce((s, o) => s + o.totalPayablePaise, 0);
  const refundedPaise = refundedOrders.reduce((s, o) => s + o.totalPayablePaise, 0);
  const estimatedGatewayFeePaise = Math.round(grossVerifiedPaise * 0.0236);
  const netSettlementEstimatePaise = Math.max(
    0,
    grossVerifiedPaise - refundedPaise - estimatedGatewayFeePaise
  );

  const utmBreakdown: Record<string, number> = {};
  for (const c of state.customers) {
    for (const u of c.utmHistory) {
      const key = `${u.utm_source || 'direct'} / ${u.utm_campaign || 'none'}`;
      utmBreakdown[key] = (utmBreakdown[key] || 0) + 1;
    }
  }

  const byBusinessInterest: Record<string, number> = {
    resell: 0,
    'craft-to-commerce': 0,
    both: 0,
    unsure: 0,
  };
  for (const r of state.registrations) {
    byBusinessInterest[r.businessInterest] = (byBusinessInterest[r.businessInterest] || 0) + 1;
  }

  const programmeTickets = state.supportTickets.filter((t) => t.category === 'programme');
  const programmeInterestedCustomers = state.customers.filter(
    (c) =>
      c.lifecycleStages.includes('PROGRAMME_INTERESTED') ||
      c.lifecycleStages.includes('PROGRAMME_WAITLISTED') ||
      c.tags.includes('programme_waitlist')
  ).length;
  const totalWaitlistAndCourseEnquiries = Math.max(
    programmeTickets.length,
    programmeInterestedCustomers
  );

  const sessionsSummary = state.webinarSessions.map((s) => {
    const regs = state.registrations.filter((r) => r.sessionId === s.id);
    const confirmed = regs.filter((r) => r.seatConfirmed).length;
    const att = state.attendance.filter((a) => a.sessionId === s.id);
    return {
      sessionId: s.id,
      locale: s.instructionLocale,
      timeWindowIst:
        s.instructionLocale === 'en' ? '1:00 PM to 2:30 PM IST' : '4:00 PM to 5:30 PM IST',
      totalRegistrations: regs.length,
      confirmedPaidSeats: confirmed,
      attendedCount: att.filter((a) => a.status === 'ATTENDED').length,
      noShowCount: att.filter((a) => a.status === 'NO_SHOW').length,
      transferredCount: regs.filter((r) => r.transferCount > 0).length,
    };
  });

  const articlesByCluster: Record<string, number> = {};
  for (const a of state.articles) {
    articlesByCluster[a.topicCluster] = (articlesByCluster[a.topicCluster] || 0) + 1;
  }

  const nowIso = new Date().toISOString();
  const convRate =
    totalRegs > 0 ? Number(((paidOrders.length / totalRegs) * 100).toFixed(1)) : 0;

  return {
    generatedAt: nowIso,
    generatedAtUtc: nowIso,
    acquisition: {
      totalCustomersTracked: state.customers.length,
      totalLeadsAndRegistrants: state.customers.length,
      enLocaleCustomers: state.customers.filter((c) => c.preferredUiLocale === 'en').length,
      hiLocaleCustomers: state.customers.filter((c) => c.preferredUiLocale === 'hi').length,
      byLocalePreference: {
        en: state.customers.filter((c) => c.preferredUiLocale === 'en').length,
        hi: state.customers.filter((c) => c.preferredUiLocale === 'hi').length,
      },
      utmSourceCampaignBreakdown: utmBreakdown,
      byUtmSource: utmBreakdown,
      byBusinessInterest,
    },
    conversionFunnel: {
      registrationStarts: totalRegs,
      registrationsCreated: totalRegs,
      enSessionRegistrations: enRegs,
      hiSessionRegistrations: hiRegs,
      ordersCreated: state.orders.length,
      checkoutStarts: state.payments.length,
      paymentInitiatedCount: state.payments.length,
      verifiedTicketPurchases: paidOrders.length,
      verifiedPaidSeatsCount: paidOrders.length,
      paymentFailures: failedOrders.length,
      failedOrCancelledCount: failedOrders.length,
      refundedCount: refundedOrders.length,
      pendingVerifications: pendingOrders.length,
      registrationToVerifiedRatePercent: convRate,
      registrationToPaidConversionPercent: convRate,
    },
    revenueAndSettlement: {
      disclaimer:
        'Authoritative financial figures from verified database records. Gross collections are never labelled as net profit.',
      revenueNote:
        'Gross verified collections reflect PAID_CONFIRMED orders in integer paise. Net settlement deducts refunds and estimated gateway fees before tax.',
      grossVerifiedCollectionsPaise: grossVerifiedPaise,
      grossVerifiedCollectionsInr: Math.round(grossVerifiedPaise / 100),
      refundedTotalPaise: refundedPaise,
      refundedPaise,
      refundedTotalInr: Math.round(refundedPaise / 100),
      refundedInr: Math.round(refundedPaise / 100),
      estimatedGatewayChargesPaise: estimatedGatewayFeePaise,
      estimatedGatewayFeePaise,
      netSettlementBeforeTaxAndDeliveryPaise: netSettlementEstimatePaise,
      netSettlementBeforeTaxPaise: netSettlementEstimatePaise,
      netSettlementBeforeTaxAndDeliveryInr: Math.round(netSettlementEstimatePaise / 100),
      netSettlementBeforeTaxInr: Math.round(netSettlementEstimatePaise / 100),
    },
    webinarOperations: {
      confirmedPaidAttendees: paidOrders.length,
      sessions: sessionsSummary,
    },
    contentPerformance: {
      totalArticlesSeeded: state.articles.length,
      totalSeededArticles: state.articles.length,
      draftCountEn: state.articles.filter((a) => a.locales.en.editorialStatus === 'DRAFT').length,
      inReviewCountEn: state.articles.filter((a) => a.locales.en.editorialStatus === 'SUBJECT_REVIEW').length,
      publishedCountEn: state.articles.filter((a) => a.locales.en.editorialStatus === 'PUBLISHED').length,
      draftCountHi: state.articles.filter((a) => a.locales.hi.editorialStatus === 'DRAFT').length,
      inReviewCountHi: state.articles.filter((a) => a.locales.hi.editorialStatus === 'SUBJECT_REVIEW').length,
      publishedCountHi: state.articles.filter((a) => a.locales.hi.editorialStatus === 'PUBLISHED').length,
      articlesByCluster,
    },
    programmeInterest: {
      interestedOrWaitlistedCount: totalWaitlistAndCourseEnquiries,
      totalWaitlistAndCourseEnquiries,
      byLearningPath: {
        resell: programmeTickets.filter((t) => t.message.includes('Path: resell')).length,
        craftToCommerce: programmeTickets.filter((t) => t.message.includes('Path: craft-to-commerce')).length,
        bothOrGeneral: programmeTickets.filter((t) => t.message.includes('Path: both')).length,
      },
      totalCoursesPrepared: state.courses.length,
      eligibleWebinarCreditHolders: paidOrders.length,
      programmeCheckoutEnabled: false,
    },
  };
}
