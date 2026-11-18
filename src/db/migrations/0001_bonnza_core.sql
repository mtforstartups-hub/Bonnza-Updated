-- =============================================================================
-- BONNZA CORE RELATIONAL SCHEMA & MIGRATION (0001_bonnza_core.sql)
-- Portable PostgreSQL DDL for Identity, Webinars, Orders, Razorpay Payments,
-- Customer CRM, Bilingual CMS, Transactional Email Outbox, and Release Gates.
-- All monetary amounts are stored strictly as integer paise (INR * 100).
-- =============================================================================

CREATE TABLE IF NOT EXISTS roles (
  id VARCHAR(64) PRIMARY KEY,
  code VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  email VARCHAR(254) NOT NULL UNIQUE,
  full_name VARCHAR(160) NOT NULL,
  password_hash TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_code VARCHAR(64) NOT NULL REFERENCES roles(code) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, role_code)
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id VARCHAR(128) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  csrf_token VARCHAR(128) NOT NULL,
  ip_address VARCHAR(64),
  user_agent TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_user_id ON admin_sessions(user_id);

CREATE TABLE IF NOT EXISTS audit_logs (
  id VARCHAR(64) PRIMARY KEY,
  actor_user_id VARCHAR(64),
  actor_email VARCHAR(254) NOT NULL,
  actor_role VARCHAR(64) NOT NULL,
  action VARCHAR(120) NOT NULL,
  target_type VARCHAR(80) NOT NULL,
  target_id VARCHAR(128) NOT NULL,
  summary TEXT NOT NULL,
  before_snapshot JSONB,
  after_snapshot JSONB,
  ip_address VARCHAR(64),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_target ON audit_logs(target_type, target_id);

CREATE TABLE IF NOT EXISTS webinars (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) NOT NULL UNIQUE,
  title_en TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  presenter_name VARCHAR(160) NOT NULL,
  description_en TEXT NOT NULL,
  description_hi TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS webinar_sessions (
  id VARCHAR(64) PRIMARY KEY,
  webinar_id VARCHAR(64) NOT NULL REFERENCES webinars(id) ON DELETE RESTRICT,
  instruction_locale VARCHAR(8) NOT NULL CHECK (instruction_locale IN ('en', 'hi')),
  session_date DATE NOT NULL,
  start_utc TIMESTAMPTZ NOT NULL,
  end_utc TIMESTAMPTZ NOT NULL,
  timezone VARCHAR(64) NOT NULL DEFAULT 'Asia/Kolkata',
  duration_minutes INTEGER NOT NULL DEFAULT 90,
  title_en TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  presenter VARCHAR(160) NOT NULL,
  status VARCHAR(32) NOT NULL CHECK (status IN (
    'DRAFT',
    'SCHEDULED',
    'OPEN_FOR_REGISTRATION',
    'REGISTRATION_CLOSED',
    'LIVE',
    'COMPLETED',
    'CANCELLED',
    'RESCHEDULED'
  )),
  capacity INTEGER,
  reserved_seats INTEGER NOT NULL DEFAULT 0,
  confirmed_paid_seats INTEGER NOT NULL DEFAULT 0,
  private_meeting_platform VARCHAR(64),
  private_meeting_url TEXT,
  private_passcode VARCHAR(64),
  joining_instructions_en TEXT,
  joining_instructions_hi TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS webinar_session_pricing (
  id VARCHAR(64) PRIMARY KEY,
  session_id VARCHAR(64) NOT NULL UNIQUE REFERENCES webinar_sessions(id) ON DELETE CASCADE,
  currency VARCHAR(8) NOT NULL DEFAULT 'INR',
  base_amount_paise INTEGER NOT NULL CHECK (base_amount_paise > 0),
  tax_amount_paise INTEGER NOT NULL DEFAULT 0 CHECK (tax_amount_paise >= 0),
  total_payable_paise INTEGER NOT NULL CHECK (total_payable_paise > 0),
  tax_treatment_status VARCHAR(32) NOT NULL DEFAULT 'PROVISIONAL_PENDING_TAX_SIGN_OFF',
  tax_note_en TEXT NOT NULL,
  tax_note_hi TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customers (
  id VARCHAR(64) PRIMARY KEY,
  primary_email VARCHAR(254) NOT NULL UNIQUE,
  full_name VARCHAR(160) NOT NULL,
  phone VARCHAR(32),
  preferred_ui_locale VARCHAR(8) NOT NULL DEFAULT 'en',
  preferred_webinar_locale VARCHAR(8) NOT NULL DEFAULT 'en',
  business_interest VARCHAR(32) NOT NULL DEFAULT 'unsure',
  lifecycle_stages JSONB NOT NULL DEFAULT '["VISITOR"]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(primary_email);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);

CREATE TABLE IF NOT EXISTS customer_contacts (
  id VARCHAR(64) PRIMARY KEY,
  customer_id VARCHAR(64) NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  channel VARCHAR(32) NOT NULL,
  value VARCHAR(254) NOT NULL,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customer_tags (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(64) NOT NULL UNIQUE,
  label VARCHAR(80) NOT NULL,
  color VARCHAR(32) NOT NULL DEFAULT '#F4C940',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customer_tag_assignments (
  customer_id VARCHAR(64) NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  tag_id VARCHAR(64) NOT NULL REFERENCES customer_tags(id) ON DELETE CASCADE,
  assigned_by VARCHAR(160) NOT NULL,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (customer_id, tag_id)
);

CREATE TABLE IF NOT EXISTS customer_notes (
  id VARCHAR(64) PRIMARY KEY,
  customer_id VARCHAR(64) NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  author_email VARCHAR(254) NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customer_activities (
  id VARCHAR(64) PRIMARY KEY,
  customer_id VARCHAR(64) NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  activity_type VARCHAR(64) NOT NULL,
  summary TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_customer_activities_customer ON customer_activities(customer_id, created_at DESC);

CREATE TABLE IF NOT EXISTS consent_records (
  id VARCHAR(64) PRIMARY KEY,
  customer_id VARCHAR(64) NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  terms_accepted BOOLEAN NOT NULL,
  marketing_opt_in BOOLEAN NOT NULL DEFAULT FALSE,
  source_route VARCHAR(255) NOT NULL,
  ip_address VARCHAR(64),
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS utm_attributions (
  id VARCHAR(64) PRIMARY KEY,
  customer_id VARCHAR(64) NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  utm_source VARCHAR(120),
  utm_medium VARCHAR(120),
  utm_campaign VARCHAR(120),
  utm_content VARCHAR(120),
  utm_term VARCHAR(120),
  landing_path VARCHAR(255),
  captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS webinar_registrations (
  id VARCHAR(64) PRIMARY KEY,
  registration_reference VARCHAR(64) NOT NULL UNIQUE,
  customer_id VARCHAR(64) NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  session_id VARCHAR(64) NOT NULL REFERENCES webinar_sessions(id) ON DELETE RESTRICT,
  full_name VARCHAR(160) NOT NULL,
  email VARCHAR(254) NOT NULL,
  phone VARCHAR(32),
  ui_locale VARCHAR(8) NOT NULL DEFAULT 'en',
  session_locale VARCHAR(8) NOT NULL DEFAULT 'en',
  business_interest VARCHAR(32) NOT NULL DEFAULT 'unsure',
  terms_accepted BOOLEAN NOT NULL DEFAULT TRUE,
  marketing_opt_in BOOLEAN NOT NULL DEFAULT FALSE,
  payment_state VARCHAR(32) NOT NULL CHECK (payment_state IN (
    'DRAFT',
    'PAYMENT_INITIATED',
    'PENDING_VERIFICATION',
    'PAID_CONFIRMED',
    'PAYMENT_FAILED',
    'EXPIRED',
    'REFUND_PENDING',
    'REFUNDED',
    'CHARGEBACK',
    'MANUAL_REVIEW'
  )),
  seat_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
  transfer_count INTEGER NOT NULL DEFAULT 0,
  transferred_from_session_id VARCHAR(64),
  access_token VARCHAR(128) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_registrations_email_session ON webinar_registrations(email, session_id);
CREATE INDEX IF NOT EXISTS idx_registrations_state ON webinar_registrations(payment_state);

CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(64) PRIMARY KEY,
  order_number VARCHAR(64) NOT NULL UNIQUE,
  customer_id VARCHAR(64) NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  registration_id VARCHAR(64) NOT NULL REFERENCES webinar_registrations(id) ON DELETE RESTRICT,
  currency VARCHAR(8) NOT NULL DEFAULT 'INR',
  subtotal_paise INTEGER NOT NULL CHECK (subtotal_paise > 0),
  tax_paise INTEGER NOT NULL DEFAULT 0 CHECK (tax_paise >= 0),
  total_payable_paise INTEGER NOT NULL CHECK (total_payable_paise > 0),
  status VARCHAR(32) NOT NULL,
  razorpay_order_id VARCHAR(128) UNIQUE,
  receipt_number VARCHAR(64),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);

CREATE TABLE IF NOT EXISTS order_items (
  id VARCHAR(64) PRIMARY KEY,
  order_id VARCHAR(64) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  item_type VARCHAR(32) NOT NULL DEFAULT 'WEBINAR_TICKET',
  item_ref_id VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price_paise INTEGER NOT NULL,
  total_price_paise INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS payments (
  id VARCHAR(64) PRIMARY KEY,
  order_id VARCHAR(64) NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
  registration_id VARCHAR(64) NOT NULL REFERENCES webinar_registrations(id) ON DELETE RESTRICT,
  provider VARCHAR(32) NOT NULL DEFAULT 'Razorpay',
  razorpay_order_id VARCHAR(128) NOT NULL,
  razorpay_payment_id VARCHAR(128) UNIQUE,
  razorpay_signature TEXT,
  amount_paise INTEGER NOT NULL CHECK (amount_paise > 0),
  currency VARCHAR(8) NOT NULL DEFAULT 'INR',
  state VARCHAR(32) NOT NULL,
  signature_verified BOOLEAN NOT NULL DEFAULT FALSE,
  webhook_verified BOOLEAN NOT NULL DEFAULT FALSE,
  captured_at TIMESTAMPTZ,
  failure_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payment_attempts (
  id VARCHAR(64) PRIMARY KEY,
  order_id VARCHAR(64) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  attempt_number INTEGER NOT NULL,
  razorpay_order_id VARCHAR(128) NOT NULL,
  status VARCHAR(32) NOT NULL,
  error_code VARCHAR(64),
  error_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payment_webhook_events (
  id VARCHAR(64) PRIMARY KEY,
  provider_event_id VARCHAR(128) NOT NULL UNIQUE,
  event_type VARCHAR(80) NOT NULL,
  razorpay_order_id VARCHAR(128),
  razorpay_payment_id VARCHAR(128),
  signature_valid BOOLEAN NOT NULL,
  payload JSONB NOT NULL,
  processed_status VARCHAR(32) NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS refunds (
  id VARCHAR(64) PRIMARY KEY,
  payment_id VARCHAR(64) NOT NULL REFERENCES payments(id) ON DELETE RESTRICT,
  order_id VARCHAR(64) NOT NULL REFERENCES orders(id) ON DELETE RESTRICT,
  registration_id VARCHAR(64) NOT NULL REFERENCES webinar_registrations(id) ON DELETE RESTRICT,
  razorpay_refund_id VARCHAR(128) UNIQUE,
  amount_paise INTEGER NOT NULL CHECK (amount_paise > 0),
  reason TEXT NOT NULL,
  status VARCHAR(32) NOT NULL CHECK (status IN ('REFUND_PENDING', 'REFUNDED', 'REJECTED')),
  initiated_by_email VARCHAR(254) NOT NULL,
  approved_by_email VARCHAR(254),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reconciliation_runs (
  id VARCHAR(64) PRIMARY KEY,
  triggered_by_email VARCHAR(254) NOT NULL,
  checked_orders_count INTEGER NOT NULL DEFAULT 0,
  resolved_count INTEGER NOT NULL DEFAULT 0,
  flagged_manual_review_count INTEGER NOT NULL DEFAULT 0,
  summary TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS webinar_attendance (
  id VARCHAR(64) PRIMARY KEY,
  session_id VARCHAR(64) NOT NULL REFERENCES webinar_sessions(id) ON DELETE CASCADE,
  registration_id VARCHAR(64) NOT NULL REFERENCES webinar_registrations(id) ON DELETE CASCADE,
  customer_id VARCHAR(64) NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  status VARCHAR(32) NOT NULL CHECK (status IN ('ATTENDED', 'NO_SHOW', 'PARTIAL')),
  join_time_utc TIMESTAMPTZ,
  leave_time_utc TIMESTAMPTZ,
  duration_minutes INTEGER DEFAULT 0,
  marked_by_email VARCHAR(254) NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (session_id, registration_id)
);

CREATE TABLE IF NOT EXISTS webinar_reminder_jobs (
  id VARCHAR(64) PRIMARY KEY,
  session_id VARCHAR(64) NOT NULL REFERENCES webinar_sessions(id) ON DELETE CASCADE,
  reminder_type VARCHAR(32) NOT NULL CHECK (reminder_type IN ('24_HOURS_BEFORE', '2_HOURS_BEFORE', '15_MINUTES_BEFORE', 'POST_SESSION_FOLLOWUP')),
  scheduled_for_utc TIMESTAMPTZ NOT NULL,
  status VARCHAR(32) NOT NULL CHECK (status IN ('SCHEDULED', 'TRIGGERED', 'CANCELLED')),
  recipients_queued INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS support_tickets (
  id VARCHAR(64) PRIMARY KEY,
  ticket_number VARCHAR(64) NOT NULL UNIQUE,
  customer_id VARCHAR(64) NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(254) NOT NULL,
  phone VARCHAR(32),
  category VARCHAR(64) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(32) NOT NULL CHECK (status IN ('OPEN', 'IN_PROGRESS', 'WAITING_FOR_CUSTOMER', 'RESOLVED', 'CLOSED')),
  assigned_to_email VARCHAR(254),
  resolution_notes TEXT,
  linked_registration_id VARCHAR(64),
  linked_order_id VARCHAR(64),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS courses (
  id VARCHAR(32) PRIMARY KEY,
  slug VARCHAR(128) NOT NULL UNIQUE,
  code VARCHAR(32) NOT NULL UNIQUE,
  title_en TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  business_path VARCHAR(32) NOT NULL,
  release_status VARCHAR(32) NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_modules (
  id VARCHAR(64) PRIMARY KEY,
  course_id VARCHAR(32) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  module_number INTEGER NOT NULL,
  title_en TEXT NOT NULL,
  title_hi TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS course_lessons (
  id VARCHAR(64) PRIMARY KEY,
  module_id VARCHAR(64) NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
  course_id VARCHAR(32) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title_en TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  format_status VARCHAR(32) NOT NULL DEFAULT 'WRITTEN_PREPARED'
);

CREATE TABLE IF NOT EXISTS learning_paths (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(64) NOT NULL UNIQUE,
  name_en TEXT NOT NULL,
  name_hi TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS selling_channels (
  slug VARCHAR(64) PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_hi TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS topic_clusters (
  id VARCHAR(64) PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_hi TEXT NOT NULL,
  course_slug VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS authors (
  id VARCHAR(64) PRIMARY KEY,
  name_en VARCHAR(160) NOT NULL,
  name_hi VARCHAR(160) NOT NULL,
  role_title VARCHAR(160) NOT NULL
);

CREATE TABLE IF NOT EXISTS reviewers (
  id VARCHAR(64) PRIMARY KEY,
  name_en VARCHAR(160) NOT NULL,
  name_hi VARCHAR(160) NOT NULL,
  credentials VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
  id VARCHAR(32) PRIMARY KEY,
  topic_cluster_id VARCHAR(64) NOT NULL REFERENCES topic_clusters(id),
  priority VARCHAR(8) NOT NULL,
  course_mappings JSONB NOT NULL,
  related_article_ids JSONB NOT NULL,
  editorial_status VARCHAR(32) NOT NULL,
  subject_review_status VARCHAR(32) NOT NULL,
  author_id VARCHAR(64),
  reviewer_id VARCHAR(64),
  source_checked_date DATE,
  publication_date TIMESTAMPTZ,
  last_substantive_update_date DATE,
  content_version VARCHAR(32) NOT NULL DEFAULT '1.0',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS article_translations (
  id VARCHAR(64) PRIMARY KEY,
  article_id VARCHAR(32) NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  locale VARCHAR(8) NOT NULL CHECK (locale IN ('en', 'hi')),
  slug VARCHAR(160) NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  direct_answer TEXT NOT NULL,
  summary TEXT NOT NULL,
  key_takeaways JSONB NOT NULL,
  sections JSONB NOT NULL,
  seo_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  translation_status VARCHAR(32) NOT NULL,
  editorial_status VARCHAR(32) NOT NULL,
  subject_review_status VARCHAR(32) NOT NULL,
  reviewer_name VARCHAR(160),
  source_checked_date VARCHAR(32),
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (article_id, locale),
  UNIQUE (locale, slug)
);

CREATE TABLE IF NOT EXISTS article_versions (
  id VARCHAR(64) PRIMARY KEY,
  article_id VARCHAR(32) NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  locale VARCHAR(8) NOT NULL,
  version_label VARCHAR(32) NOT NULL,
  editor_email VARCHAR(254) NOT NULL,
  change_note TEXT NOT NULL,
  snapshot JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS article_sources (
  id VARCHAR(64) PRIMARY KEY,
  article_id VARCHAR(32) NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  checked_date VARCHAR(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS article_faqs (
  id VARCHAR(64) PRIMARY KEY,
  article_id VARCHAR(32) NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  question_en TEXT NOT NULL,
  question_hi TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_hi TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS media_assets (
  id VARCHAR(64) PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(80) NOT NULL,
  size_bytes INTEGER NOT NULL,
  alt_text_en TEXT NOT NULL,
  alt_text_hi TEXT NOT NULL,
  uploaded_by_email VARCHAR(254) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS downloadable_resources (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) NOT NULL UNIQUE,
  title_en TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_hi TEXT NOT NULL,
  resource_type VARCHAR(32) NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  download_count INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS page_content_blocks (
  id VARCHAR(64) PRIMARY KEY,
  page_key VARCHAR(64) NOT NULL,
  block_key VARCHAR(64) NOT NULL,
  title_en TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  body_en TEXT NOT NULL,
  body_hi TEXT NOT NULL,
  cta_label_en TEXT,
  cta_label_hi TEXT,
  is_locked_business_rule BOOLEAN NOT NULL DEFAULT FALSE,
  updated_by_email VARCHAR(254) NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (page_key, block_key)
);

CREATE TABLE IF NOT EXISTS email_templates (
  id VARCHAR(64) PRIMARY KEY,
  code VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(160) NOT NULL,
  subject_en TEXT NOT NULL,
  subject_hi TEXT NOT NULL,
  body_en TEXT NOT NULL,
  body_hi TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS email_outbox (
  id VARCHAR(64) PRIMARY KEY,
  idempotency_key VARCHAR(160) NOT NULL UNIQUE,
  template_code VARCHAR(64) NOT NULL REFERENCES email_templates(code),
  recipient_email VARCHAR(254) NOT NULL,
  recipient_name VARCHAR(160) NOT NULL,
  locale VARCHAR(8) NOT NULL CHECK (locale IN ('en', 'hi')),
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  status VARCHAR(32) NOT NULL CHECK (status IN ('Queued', 'Sending', 'Sent', 'Failed', 'Retry scheduled', 'Cancelled')),
  attempts INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  related_entity_type VARCHAR(64),
  related_entity_id VARCHAR(64),
  scheduled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sent_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_email_outbox_status ON email_outbox(status, scheduled_at);

CREATE TABLE IF NOT EXISTS notification_logs (
  id VARCHAR(64) PRIMARY KEY,
  outbox_id VARCHAR(64) NOT NULL REFERENCES email_outbox(id) ON DELETE CASCADE,
  event VARCHAR(64) NOT NULL,
  details TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS feature_flags (
  key VARCHAR(64) PRIMARY KEY,
  enabled BOOLEAN NOT NULL DEFAULT FALSE,
  description TEXT NOT NULL,
  gated_by VARCHAR(16) NOT NULL,
  updated_by_email VARCHAR(254) NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS launch_checklist_items (
  id VARCHAR(64) PRIMARY KEY,
  gate VARCHAR(8) NOT NULL CHECK (gate IN ('G1', 'G2')),
  code VARCHAR(64) NOT NULL UNIQUE,
  label TEXT NOT NULL,
  category VARCHAR(64) NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  verification_note TEXT NOT NULL,
  verified_by_email VARCHAR(254),
  verified_at TIMESTAMPTZ
);
