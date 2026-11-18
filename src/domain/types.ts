export type Locale = 'en' | 'hi';

export interface LocalizedText {
  en: string;
  hi: string;
}

export type WebinarSessionId =
  | 'bonnza-2026-12-05-en-1300'
  | 'bonnza-2026-12-05-hi-1600'
  | 'bonnza-2026-12-19-en-1300'
  | 'bonnza-2026-12-19-hi-1600'
  | 'bonnza-2027-01-02-en-1300'
  | 'bonnza-2027-01-02-hi-1600'
  | 'bonnza-2027-01-16-en-1300'
  | 'bonnza-2027-01-16-hi-1600'
  | 'bonnza-2027-01-30-en-1300'
  | 'bonnza-2027-01-30-hi-1600'
  | 'bonnza-2027-02-13-en-1300'
  | 'bonnza-2027-02-13-hi-1600';

export interface WebinarSessionRecord {
  id: WebinarSessionId;
  instructionLocale: Locale;
  date: string; // YYYY-MM-DD
  startUtc: string; // ISO UTC timestamp
  endUtc: string; // ISO UTC timestamp
  timezone: 'Asia/Kolkata';
  durationMinutes: number;
  title: LocalizedText;
  presenter: string;
  originalTicketPriceInr: number;
  workingTicketPriceInr: number;
  taxNote: LocalizedText;
  paymentProvider: 'Razorpay';
  paymentIntegrationActive: boolean;
  meetingUrlExposed: boolean;
}

export type CourseReleaseStatus =
  | 'CURRICULUM_PREPARED'
  | 'RECORDING_PENDING'
  | 'UNDER_EXPERT_REVIEW'
  | 'SCHEDULED_RELEASE'
  | 'AVAILABLE';

export type BusinessPathId = 'resell' | 'craft-to-commerce' | 'both';

export interface LessonRecord {
  id: string; // e.g., C01-L01
  title: LocalizedText;
  summary: LocalizedText;
  formatStatus: 'WRITTEN_PREPARED';
}

export interface ModuleRecord {
  id: string;
  number: number;
  title: LocalizedText;
  lessons: LessonRecord[];
}

export interface CourseRecord {
  id: string; // C01 .. C10
  slug: string;
  code: string;
  title: LocalizedText;
  outcome: LocalizedText;
  intendedLearner: LocalizedText;
  prerequisites: LocalizedText;
  businessPath: BusinessPathId;
  languageAvailability: LocalizedText;
  releaseStatus: CourseReleaseStatus;
  releaseStatusLabel: LocalizedText;
  accessAndSupport: LocalizedText;
  practicalAssignments: {
    en: string[];
    hi: string[];
  };
  modules: ModuleRecord[];
  relatedArticleIds: string[];
  relatedChannelSlugs: string[];
}

export type ChannelSlug =
  | 'meesho'
  | 'amazon-india'
  | 'etsy'
  | 'amazon-global'
  | 'whatsapp-selling'
  | 'social-selling'
  | 'shopify'
  | 'wix';

export interface SellingChannelRecord {
  slug: ChannelSlug;
  name: LocalizedText;
  learningPurpose: LocalizedText;
  bestSuitedFor: LocalizedText;
  importantCaveat: LocalizedText;
  readinessChecks: { en: string[]; hi: string[] };
  courseIds: string[];
  relatedArticleIds: string[];
}

export type TopicClusterId =
  | 'business-foundations'
  | 'resell'
  | 'craft-to-commerce'
  | 'social-media-and-whatsapp'
  | 'meesho'
  | 'amazon-india'
  | 'shopify-and-wix'
  | 'etsy'
  | 'amazon-global'
  | 'operations-and-growth';

export type EditorialStatus =
  | 'DRAFT'
  | 'SUBJECT_REVIEW'
  | 'EDITORIAL_APPROVAL'
  | 'SCHEDULED'
  | 'PUBLISHED'
  | 'NEEDS_UPDATE'
  | 'ARCHIVED';

export type SubjectReviewStatus = 'PENDING' | 'VERIFIED' | 'NEEDS_REVISION';

export type TranslationStatus =
  | 'UNREVIEWED_DRAFT'
  | 'IN_REVIEW'
  | 'APPROVED';

export interface ArticleSection {
  id: string;
  heading: LocalizedText;
  paragraphs: { en: string[]; hi: string[] };
  bulletPoints?: { en: string[]; hi: string[] };
  extractableStatement?: LocalizedText;
}

export interface ArticleComparisonTable {
  caption: LocalizedText;
  headers: { en: string[]; hi: string[] };
  rows: { en: string[][]; hi: string[][] };
}

export interface ArticleCalculationBlock {
  title: LocalizedText;
  note: LocalizedText;
  lines: Array<{
    label: LocalizedText;
    amount: string;
    highlight?: boolean;
  }>;
}

export interface ArticleSourceReference {
  label: string;
  url: string;
  checkedDate: string;
  caveat?: LocalizedText;
}

export interface ArticleFaqEntry {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface ArticleRecord {
  id: string; // B01 .. B20
  slug: string;
  hiSlug: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  directAnswer: LocalizedText;
  summary: LocalizedText;
  keyTakeaways: { en: string[]; hi: string[] };
  topicCluster: TopicClusterId;
  topicClusterLabel: LocalizedText;
  priority: 'P1' | 'P2' | 'P3';
  intendedReader: LocalizedText;
  searchIntent: LocalizedText;
  courseMappings: string[];
  relatedArticleIds: string[];
  primaryCta: {
    label: LocalizedText;
    path: string;
  };
  sections: ArticleSection[];
  calculationBlock?: ArticleCalculationBlock;
  comparisonTable?: ArticleComparisonTable;
  worksheetSummary?: {
    title: LocalizedText;
    fields: { en: string[]; hi: string[] };
  };
  faqEntries: ArticleFaqEntry[];
  primarySources: ArticleSourceReference[];
  author: LocalizedText;
  reviewer: LocalizedText | null;
  sourceCheckedDate: string | null;
  publicationDate: string | null;
  lastSubstantiveUpdateDate: string | null;
  editorialStatus: EditorialStatus;
  subjectReviewStatus: SubjectReviewStatus;
  translationStatus: TranslationStatus;
  seoTitle: LocalizedText;
  metaDescription: LocalizedText;
  canonicalPath: string;
  schemaType: 'Article' | 'BlogPosting';
  contentVersion: string;
  readingTimeMinutes: number;
}

export type AnalyticsEventName =
  | 'page_view'
  | 'webinar_view'
  | 'session_selected'
  | 'registration_started'
  | 'checkout_started'
  | 'ticket_purchase_verified'
  | 'programme_view'
  | 'course_view'
  | 'resource_download'
  | 'blog_article_view'
  | 'blog_cta_clicked'
  | 'contact_form_started'
  | 'contact_form_submitted';

export interface SeoMetadataInput {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  alternateEnPath?: string;
  alternateHiPath?: string;
  allowIndex?: boolean;
  ogType?: 'website' | 'article';
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}
