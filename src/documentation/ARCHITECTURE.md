# BONNZA Architecture, Database, Razorpay, RBAC, CRM, CMS & Release Governance

## 1. Full-Stack Runtime & Database Architecture
- **Frontend**: React 19 + TypeScript + Tailwind CSS v4 + React Router v7 (`/` resolves directly to English homepage, `/en/*` and `/hi/*` localized public route trees, `/admin/*` protected staff operations console).
- **Backend**: Express server (`server.ts`) mounting versioned `/api/v1/*` routes and raw-body Razorpay webhook verification (`/api/v1/webhooks/razorpay`).
- **Database & Persistence**:
  - Portable PostgreSQL DDL migration at `/src/db/migrations/0001_bonnza_core.sql` (33 normalized tables with primary keys, foreign keys, unique constraints, indexes, and integer paise columns).
  - Persistent transactional relational engine at `/src/server/store.ts` (`data/bonnza-db.json` atomic write-through) plus Firebase Firestore & Auth integration (`/src/firebase.ts`, `/firebase-blueprint.json`, `/firestore.rules`, `/security_spec.md`).

## 2. Razorpay Payment State Machine & Verification
- **Integer Paise Arithmetic**: Working ticket price is stored and verified strictly in integer paise (`29900` paise = `₹299.00`).
- **10 Payment States**: `DRAFT`, `PAYMENT_INITIATED`, `PENDING_VERIFICATION`, `PAID_CONFIRMED`, `PAYMENT_FAILED`, `EXPIRED`, `REFUND_PENDING`, `REFUNDED`, `CHARGEBACK`, `MANUAL_REVIEW`.
- **Dual Cryptographic Verification**:
  1. Checkout callback verifies HMAC-SHA256 over `razorpay_order_id + "|" + razorpay_payment_id` using `RAZORPAY_KEY_SECRET`.
  2. Webhook endpoint (`/api/v1/webhooks/razorpay`) verifies HMAC-SHA256 over the raw request body using `RAZORPAY_WEBHOOK_SECRET` and deduplicates events by `x-razorpay-event-id`.

## 3. Role-Based Access Control (RBAC)
Seven roles enforced on `/api/v1/admin/*` with CSRF token verification and immutable audit logging:
1. `OWNER`
2. `ADMIN`
3. `CONTENT_EDITOR`
4. `WEBINAR_OPERATOR`
5. `FACULTY_REVIEWER`
6. `SUPPORT_AGENT`
7. `LEARNER`

## 4. Release Readiness Gates
- **Gate G1 (Paid Webinar Launch — 17 items)**: Controls `WEBINAR_CHECKOUT_ENABLED` (default `false`).
- **Gate G2 (Course & Bundle Sales — 8 items)**: Controls `COURSE_CHECKOUT_ENABLED` and `BUNDLE_CHECKOUT_ENABLED` (default `false`).
