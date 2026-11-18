# BONNZA Operations, Incident Response, Backup & Release Runbook

**Domain:** `https://bonnza.marketingtusk.com`  
**Founding Webinar Date:** Saturday, 5 December 2026 (`90 minutes` per session)  
- **English Session (`bonnza-2026-12-05-en-1300`):** `1:00 PM to 2:30 PM IST` (`07:30–09:00 UTC`)  
- **Hindi Session (`bonnza-2026-12-05-hi-1600`):** `4:00 PM to 5:30 PM IST` (`10:30–12:00 UTC`)  

---

## 1. Deployment & Rollback Procedure

### 1.1 Pre-Deployment Verification
1. Run automated unit/integration tests and Firestore rules lint:
   ```bash
   npm test
   npx eslint firestore.rules
   npm run build
   ```
2. Verify `/api/v1/health` returns `status: "ok"` and `/api/v1/seo/audit` reports `failedCount: 0`.
3. Confirm `WEBINAR_CHECKOUT_ENABLED=false` remains locked until all 17 Gate G1 items are verified and approved by the Founder.

### 1.2 Zero-Downtime Rollback
- **Feature Flag Rollback (Immediate, < 10 seconds):**
  - Sign into `/admin/settings` as `OWNER` or `ADMIN` and toggle `WEBINAR_CHECKOUT_ENABLED` to `DISABLED`, or set `WEBINAR_CHECKOUT_ENABLED=false` in environment variables.
  - This immediately halts new Razorpay order creation while preserving registration capture (`DRAFT`) and existing `PAID_CONFIRMED` attendee access.
- **Container / Revision Rollback (< 2 minutes):**
  - Revert the Cloud Run / container service traffic to the previous immutable image digest.
  - Database migrations in `/src/db/migrations/0001_bonnza_core.sql` are additive and backward-compatible.

---

## 2. Incident Response Playbooks

### 2.1 Payment Callback Failure / Delayed Webhook
1. Open `/admin/payments` and click **Run Payment & Webhook Reconciliation** (`POST /api/v1/admin/payments/reconcile`).
2. Inspect orders in `PENDING_VERIFICATION` or `MANUAL_REVIEW`.
3. Cross-check the `razorpay_order_id` in the Razorpay Merchant Dashboard.
4. Never manually mark an order `PAID_CONFIRMED` without a verified Razorpay payment ID (`pay_*`) and captured status.

### 2.2 Transactional Email Delivery Failure
1. Open `/admin/notifications` (`Transactional Email Outbox`).
2. Inspect records in `Failed` or `Retry scheduled` status.
3. Verify `EMAIL_API_KEY`, `EMAIL_FROM_ADDRESS`, and SPF/DKIM records.
4. Click **Retry** (`POST /api/v1/admin/outbox/:outboxId/action`) — idempotency keys prevent duplicate sends to already-delivered recipients.

### 2.3 Webinar Room Link / Live Session Emergency
1. Open `/admin/webinars`.
2. Update `privateMeetingUrl` and `privatePasscode` for `bonnza-2026-12-05-en-1300` or `bonnza-2026-12-05-hi-1600`.
3. Verified `PAID_CONFIRMED` attendees immediately see the updated room URL on `/en/webinars/payment-status` when supplying their attendee access token, and the operator can trigger the `15_MINUTES_BEFORE` reminder job (`POST /api/v1/admin/reminders/:reminderId/trigger`).

---

## 3. Backup & Restore Verification

1. **Automated & On-Demand Snapshot Export:**
   - Endpoint: `GET /api/v1/admin/backups/export` (requires `settings:write` role: `OWNER` or `ADMIN`).
   - Produces a SHA-256 checksummed JSON snapshot of all `webinarSessions`, `customers`, `registrations`, `orders`, `payments`, `refunds`, `supportTickets`, `featureFlags`, and `launchChecklist` records.
2. **Non-Destructive Restore Verification:**
   - Endpoint: `POST /api/v1/admin/backups/restore-verify`.
   - Validates schema version, collection integrity, and record counts without overwriting live production data, and logs an immutable `BACKUP_RESTORE_DRY_RUN_VERIFIED` entry in the Audit Log.
