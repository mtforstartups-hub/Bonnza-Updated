import type {
  Locale,
  WebinarSessionId,
  EditorialStatus,
  SubjectReviewStatus,
  TranslationStatus,
  ArticleRecord,
  CourseRecord,
} from '../domain/types';

export type StaffRoleCode =
  | 'OWNER'
  | 'ADMIN'
  | 'CONTENT_EDITOR'
  | 'WEBINAR_OPERATOR'
  | 'FACULTY_REVIEWER'
  | 'SUPPORT_AGENT'
  | 'LEARNER';

export type PaymentLifecycleState =
  | 'DRAFT'
  | 'PAYMENT_INITIATED'
  | 'PENDING_VERIFICATION'
  | 'PAID_CONFIRMED'
  | 'PAYMENT_FAILED'
  | 'EXPIRED'
  | 'REFUND_PENDING'
  | 'REFUNDED'
  | 'CHARGEBACK'
  | 'MANUAL_REVIEW';

export type WebinarOperationalStatus =
  | 'DRAFT'
  | 'SCHEDULED'
  | 'OPEN_FOR_REGISTRATION'
  | 'REGISTRATION_CLOSED'
  | 'LIVE'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'RESCHEDULED';

export type CustomerLifecycleStage =
  | 'VISITOR'
  | 'ENQUIRY_SUBMITTED'
  | 'WEBINAR_DRAFT_REGISTRANT'
  | 'WEBINAR_PAYMENT_PENDING'
  | 'WEBINAR_PAID_REGISTRANT'
  | 'WEBINAR_ATTENDED'
  | 'WEBINAR_NO_SHOW'
  | 'PROGRAMME_INTERESTED'
  | 'PROGRAMME_WAITLISTED'
  | 'REFUNDED'
  | 'DO_NOT_CONTACT';

export type SupportTicketStatus =
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'WAITING_FOR_CUSTOMER'
  | 'RESOLVED'
  | 'CLOSED';

export type EmailOutboxStatus =
  | 'Queued'
  | 'Sending'
  | 'Sent'
  | 'Failed'
  | 'Retry scheduled'
  | 'Cancelled';

export type EmailTemplateCode =
  | 'WEBINAR_REGISTRATION_STARTED'
  | 'PAYMENT_PENDING_REMINDER'
  | 'PAYMENT_CONFIRMED_RECEIPT'
  | 'WEBINAR_JOINING_INSTRUCTIONS'
  | 'REMINDER_24H'
  | 'REMINDER_2H'
  | 'REMINDER_15M'
  | 'SESSION_RESCHEDULED'
  | 'SESSION_CANCELLED'
  | 'SESSION_TRANSFER_CONFIRMED'
  | 'REFUND_INITIATED'
  | 'REFUND_COMPLETED'
  | 'POST_WEBINAR_ATTENDED_FOLLOWUP'
  | 'POST_WEBINAR_NOSHOW_FOLLOWUP'
  | 'CONTACT_ENQUIRY_ACKNOWLEDGEMENT'
  | 'ADMIN_CRITICAL_PAYMENT_ALERT';

export interface StaffUserRecord {
  id: string;
  email: string;
  fullName: string;
  passwordHash: string;
  roles: StaffRoleCode[];
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

export interface AdminSessionRecord {
  id: string;
  userId: string;
  email: string;
  fullName: string;
  roles: StaffRoleCode[];
  csrfToken: string;
  expiresAt: string;
  revokedAt: string | null;
  createdAt: string;
}

export interface AuditLogRecord {
  id: string;
  actorUserId: string | null;
  actorEmail: string;
  actorRole: StaffRoleCode | 'SYSTEM';
  action: string;
  targetType: string;
  targetId: string;
  summary: string;
  beforeSnapshot?: unknown;
  afterSnapshot?: unknown;
  createdAt: string;
}

export interface ManagedWebinarSession {
  id: WebinarSessionId;
  webinarId: string;
  instructionLocale: Locale;
  date: string;
  startUtc: string;
  endUtc: string;
  timezone: 'Asia/Kolkata';
  durationMinutes: number;
  title: { en: string; hi: string };
  presenter: string;
  status: WebinarOperationalStatus;
  capacity: number | null;
  reservedSeats: number;
  confirmedPaidSeats: number;
  baseAmountPaise: number;
  taxAmountPaise: number;
  totalPayablePaise: number;
  taxTreatmentStatus: 'PROVISIONAL_PENDING_TAX_SIGN_OFF' | 'CONFIRMED_INCLUSIVE' | 'CONFIRMED_EXCLUSIVE';
  taxNote: { en: string; hi: string };
  privateMeetingPlatform: string;
  privateMeetingUrl: string;
  privatePasscode: string;
  joiningInstructions: { en: string; hi: string };
  updatedAt: string;
}

export interface UtmAttribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_path?: string;
  capturedAt: string;
}

export interface CustomerNote {
  id: string;
  authorEmail: string;
  body: string;
  createdAt: string;
}

export interface CustomerActivity {
  id: string;
  type: string;
  summary: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface CustomerProfile {
  id: string;
  primaryEmail: string;
  fullName: string;
  phone: string;
  preferredUiLocale: Locale;
  preferredWebinarLocale: Locale;
  businessInterest: 'resell' | 'craft-to-commerce' | 'both' | 'unsure';
  lifecycleStages: CustomerLifecycleStage[];
  tags: string[];
  termsAccepted: boolean;
  marketingOptIn: boolean;
  consentRecordedAt: string;
  utmHistory: UtmAttribution[];
  notes: CustomerNote[];
  activities: CustomerActivity[];
  createdAt: string;
  updatedAt: string;
}

export interface WebinarRegistrationRecord {
  id: string;
  registrationReference: string;
  customerId: string;
  sessionId: WebinarSessionId;
  fullName: string;
  email: string;
  phone: string;
  uiLocale: Locale;
  sessionLocale: Locale;
  businessInterest: 'resell' | 'craft-to-commerce' | 'both' | 'unsure';
  termsAccepted: boolean;
  marketingOptIn: boolean;
  paymentState: PaymentLifecycleState;
  seatConfirmed: boolean;
  transferCount: number;
  transferredFromSessionId: WebinarSessionId | null;
  accessToken: string;
  utm?: UtmAttribution;
  createdAt: string;
  updatedAt: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerId: string;
  registrationId: string;
  sessionId: WebinarSessionId;
  currency: 'INR';
  subtotalPaise: number;
  taxPaise: number;
  totalPayablePaise: number;
  status: PaymentLifecycleState;
  razorpayOrderId: string | null;
  receiptNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentAttemptRecord {
  id: string;
  orderId: string;
  attemptNumber: number;
  razorpayOrderId: string;
  status: string;
  errorCode?: string;
  errorDescription?: string;
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  orderId: string;
  registrationId: string;
  customerId: string;
  provider: 'Razorpay';
  razorpayOrderId: string;
  razorpayPaymentId: string | null;
  razorpaySignature: string | null;
  amountPaise: number;
  currency: 'INR';
  state: PaymentLifecycleState;
  signatureVerified: boolean;
  webhookVerified: boolean;
  capturedAt: string | null;
  failureReason: string | null;
  attempts: PaymentAttemptRecord[];
  createdAt: string;
  updatedAt: string;
}

export interface WebhookEventRecord {
  id: string;
  providerEventId: string;
  eventType: string;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  signatureValid: boolean;
  payload: Record<string, unknown>;
  processedStatus: 'PROCESSED' | 'DUPLICATE_IGNORED' | 'INVALID_SIGNATURE' | 'FLAGGED_MANUAL_REVIEW';
  processedAt: string;
}

export interface RefundRecord {
  id: string;
  paymentId: string;
  orderId: string;
  registrationId: string;
  customerId: string;
  razorpayRefundId: string | null;
  amountPaise: number;
  reason: string;
  status: 'REFUND_PENDING' | 'REFUNDED' | 'REJECTED';
  initiatedByEmail: string;
  approvedByEmail: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReconciliationRunRecord {
  id: string;
  triggeredByEmail: string;
  checkedOrdersCount: number;
  resolvedCount: number;
  flaggedManualReviewCount: number;
  summary: string;
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  sessionId: WebinarSessionId;
  registrationId: string;
  customerId: string;
  email: string;
  fullName: string;
  status: 'ATTENDED' | 'NO_SHOW' | 'PARTIAL';
  joinTimeUtc: string | null;
  leaveTimeUtc: string | null;
  durationMinutes: number;
  markedByEmail: string;
  updatedAt: string;
}

export interface ReminderJobRecord {
  id: string;
  sessionId: WebinarSessionId;
  reminderType: '24_HOURS_BEFORE' | '2_HOURS_BEFORE' | '15_MINUTES_BEFORE' | 'POST_SESSION_FOLLOWUP';
  scheduledForUtc: string;
  status: 'SCHEDULED' | 'TRIGGERED' | 'CANCELLED';
  recipientsQueued: number;
  updatedAt: string;
}

export interface SupportTicketRecord {
  id: string;
  ticketNumber: string;
  customerId: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  subject: string;
  message: string;
  status: SupportTicketStatus;
  assignedToEmail: string | null;
  resolutionNotes: string;
  linkedRegistrationId: string | null;
  linkedOrderId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleLocaleEditorialState {
  locale: Locale;
  slug: string;
  title: string;
  shortDescription: string;
  directAnswer: string;
  summary: string;
  keyTakeaways: string[];
  editorialStatus: EditorialStatus;
  subjectReviewStatus: SubjectReviewStatus;
  translationStatus: TranslationStatus;
  reviewerName: string | null;
  sourceCheckedDate: string | null;
  publishedAt: string | null;
  seoTitle: string;
  metaDescription: string;
  updatedAt: string;
}

export interface ArticleVersionRecord {
  id: string;
  articleId: string;
  locale: Locale;
  versionLabel: string;
  editorEmail: string;
  changeNote: string;
  snapshot: Partial<ArticleLocaleEditorialState>;
  createdAt: string;
}

export interface ManagedArticleRecord extends ArticleRecord {
  locales: {
    en: ArticleLocaleEditorialState;
    hi: ArticleLocaleEditorialState;
  };
  versions: ArticleVersionRecord[];
}

export interface PageContentBlock {
  id: string;
  pageKey: 'homepage' | 'webinar' | 'programme' | 'faq' | 'policies';
  blockKey: string;
  title: { en: string; hi: string };
  body: { en: string; hi: string };
  ctaLabel?: { en: string; hi: string };
  isLockedBusinessRule: boolean;
  updatedByEmail: string;
  updatedAt: string;
}

export interface DownloadableResourceRecord {
  id: string;
  slug: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  resourceType: 'INTERACTIVE_TOOL' | 'WORKSHEET_TEMPLATE';
  isPublished: boolean;
  downloadCount: number;
  updatedAt: string;
}

export interface EmailTemplateRecord {
  code: EmailTemplateCode;
  name: string;
  subject: { en: string; hi: string };
  body: { en: string; hi: string };
  updatedAt: string;
}

export interface EmailOutboxRecord {
  id: string;
  idempotencyKey: string;
  templateCode: EmailTemplateCode;
  recipientEmail: string;
  recipientName: string;
  locale: Locale;
  subject: string;
  body: string;
  status: EmailOutboxStatus;
  attempts: number;
  lastError: string | null;
  relatedEntityType: string;
  relatedEntityId: string;
  scheduledAt: string;
  sentAt: string | null;
  updatedAt: string;
}

export interface FeatureFlagRecord {
  key:
    | 'WEBINAR_CHECKOUT_ENABLED'
    | 'COURSE_CHECKOUT_ENABLED'
    | 'BUNDLE_CHECKOUT_ENABLED'
    | 'PUBLIC_INDEXING_ENABLED';
  enabled: boolean;
  description: string;
  gatedBy: 'G1' | 'G2' | 'SEO';
  updatedByEmail: string;
  updatedAt: string;
}

export interface LaunchChecklistItem {
  id: string;
  gate: 'G1' | 'G2';
  code: string;
  label: string;
  category: string;
  isCompleted: boolean;
  verificationNote: string;
  verifiedByEmail: string | null;
  verifiedAt: string | null;
}

export interface BonnzaDatabaseState {
  schemaVersion: number;
  staffUsers: StaffUserRecord[];
  adminSessions: AdminSessionRecord[];
  auditLogs: AuditLogRecord[];
  webinarSessions: ManagedWebinarSession[];
  customers: CustomerProfile[];
  registrations: WebinarRegistrationRecord[];
  orders: OrderRecord[];
  payments: PaymentRecord[];
  webhookEvents: WebhookEventRecord[];
  refunds: RefundRecord[];
  reconciliationRuns: ReconciliationRunRecord[];
  attendance: AttendanceRecord[];
  reminderJobs: ReminderJobRecord[];
  supportTickets: SupportTicketRecord[];
  courses: CourseRecord[];
  articles: ManagedArticleRecord[];
  pageBlocks: PageContentBlock[];
  resources: DownloadableResourceRecord[];
  emailTemplates: EmailTemplateRecord[];
  emailOutbox: EmailOutboxRecord[];
  featureFlags: FeatureFlagRecord[];
  launchChecklist: LaunchChecklistItem[];
}
