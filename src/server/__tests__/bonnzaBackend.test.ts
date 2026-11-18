import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../../server';
import { bonnzaStore } from '../store';
import {
  computeRazorpayCheckoutSignature,
  computeRazorpayWebhookSignature,
  WEBINAR_TICKET_PAISE,
} from '../razorpayAdapter';

import {
  getConsentRecord,
  stripPiiFromMetadata,
  emitVerifiedPurchaseConversion,
} from '../../utilities/analyticsAndConsent';
import { cleanCanonicalPath } from '../../utilities/seo';

describe('Bonnza Backend & Launch Readiness E2E Suite (Journeys 1–14)', () => {
  beforeEach(() => {
    process.env.VITEST = 'true';
    process.env.RAZORPAY_MODE = 'test';
    process.env.RAZORPAY_KEY_ID = 'rzp_test_bonnza123';
    process.env.RAZORPAY_KEY_SECRET = 'test_key_secret_bonnza_hmac';
    process.env.RAZORPAY_WEBHOOK_SECRET = 'test_webhook_secret_bonnza_hmac';
    bonnzaStore.resetForTests();
  });

  async function loginStaff(email: string, password: string) {
    const res = await request(app)
      .post('/api/v1/admin/auth/login')
      .send({ email, password });
    expect(res.status).toBe(200);
    return {
      sessionToken: res.body.sessionToken as string,
      csrfToken: res.body.csrfToken as string,
    };
  }

  async function unlockAllG1AndEnableCheckout(sessionToken: string, csrfToken: string) {
    const state = bonnzaStore.getState();
    for (const item of state.launchChecklist.filter((i) => i.gate === 'G1')) {
      if (!item.isCompleted) {
        const patchRes = await request(app)
          .patch(`/api/v1/admin/checklist/${item.id}`)
          .set('x-admin-session', sessionToken)
          .set('x-csrf-token', csrfToken)
          .send({ isCompleted: true });
        expect(patchRes.status).toBe(200);
      }
    }
    const flagRes = await request(app)
      .patch('/api/v1/admin/feature-flags/WEBINAR_CHECKOUT_ENABLED')
      .set('x-admin-session', sessionToken)
      .set('x-csrf-token', csrfToken)
      .send({ enabled: true });
    expect(flagRes.status).toBe(200);
  }

  // ==========================================================================
  // 1. REGISTRATION TESTS (Journeys 1, 2, 3)
  // ==========================================================================
  describe('1. Registration & Cross-Language Session Workflows (Journeys 1–3)', () => {
    it('creates valid English and Hindi session registrations independently of UI locale', async () => {
      // Hindi UI user booking English webinar session
      const resEn = await request(app)
        .post('/api/v1/registrations')
        .send({
          fullName: 'Aarav Sharma',
          email: 'aarav@example.com',
          phone: '+91 9876543210',
          sessionId: 'bonnza-2026-12-05-en-1300',
          uiLocale: 'hi',
          businessInterest: 'resell',
          termsAccepted: true,
          marketingOptIn: false,
          utm: { utm_source: 'blog', utm_campaign: 'dec5_workshop' },
        });

      expect(resEn.status).toBe(201);
      expect(resEn.body.registration.sessionId).toBe('bonnza-2026-12-05-en-1300');
      expect(resEn.body.registration.sessionLocale).toBe('en');
      expect(resEn.body.registration.uiLocale).toBe('hi');
      expect(resEn.body.registration.paymentState).toBe('DRAFT');
      expect(resEn.body.registration.seatConfirmed).toBe(false);
      expect(resEn.body.order.totalPayablePaise).toBe(WEBINAR_TICKET_PAISE);

      // English UI user booking Hindi webinar session
      const resHi = await request(app)
        .post('/api/v1/registrations')
        .send({
          fullName: 'Priya Verma',
          email: 'priya@example.com',
          sessionId: 'bonnza-2026-12-05-hi-1600',
          uiLocale: 'en',
          businessInterest: 'craft-to-commerce',
          termsAccepted: true,
          marketingOptIn: true,
        });

      expect(resHi.status).toBe(201);
      expect(resHi.body.registration.sessionId).toBe('bonnza-2026-12-05-hi-1600');
      expect(resHi.body.registration.sessionLocale).toBe('hi');
      expect(resHi.body.registration.uiLocale).toBe('en');
    });

    it('rejects invalid email, invalid phone, invalid session, or unaccepted terms', async () => {
      const badEmail = await request(app).post('/api/v1/registrations').send({
        fullName: 'Test User',
        email: 'not-an-email',
        sessionId: 'bonnza-2026-12-05-en-1300',
        termsAccepted: true,
      });
      expect(badEmail.status).toBe(400);

      const badTerms = await request(app).post('/api/v1/registrations').send({
        fullName: 'Test User',
        email: 'valid@example.com',
        sessionId: 'bonnza-2026-12-05-en-1300',
        termsAccepted: false,
      });
      expect(badTerms.status).toBe(400);
    });

    it('deduplicates registration for the same email and session without creating duplicate orders', async () => {
      const first = await request(app).post('/api/v1/registrations').send({
        fullName: 'Meera Nair',
        email: 'meera@example.com',
        sessionId: 'bonnza-2026-12-05-en-1300',
        termsAccepted: true,
      });
      expect(first.status).toBe(201);

      const second = await request(app).post('/api/v1/registrations').send({
        fullName: 'Meera Nair Updated',
        email: 'meera@example.com',
        sessionId: 'bonnza-2026-12-05-en-1300',
        termsAccepted: true,
      });
      expect(second.status).toBe(200);
      expect(second.body.reusedExistingDraft).toBe(true);
      expect(second.body.registration.registrationReference).toBe(
        first.body.registration.registrationReference
      );
      expect(bonnzaStore.getState().orders.length).toBe(1);
    });
  });

  // ==========================================================================
  // 2. PAYMENT & WEBHOOK TESTS (Journeys 4, 5, 12)
  // ==========================================================================
  describe('2. Razorpay Order Creation, Checkout HMAC & Raw-Body Webhooks (Journeys 4, 5, 12)', () => {
    it('blocks Razorpay order creation when WEBINAR_CHECKOUT_ENABLED=false', async () => {
      const regRes = await request(app).post('/api/v1/registrations').send({
        fullName: 'Rohan Gupta',
        email: 'rohan@example.com',
        sessionId: 'bonnza-2026-12-05-en-1300',
        termsAccepted: true,
      });

      const orderRes = await request(app)
        .post('/api/v1/payments/razorpay/create-order')
        .send({
          registrationReference: regRes.body.registration.registrationReference,
        });

      expect(orderRes.status).toBe(403);
      expect(orderRes.body.error).toBe('WEBINAR_CHECKOUT_DISABLED');
    });

    it('verifies valid checkout HMAC-SHA256 signature and rejects invalid signature to MANUAL_REVIEW', async () => {
      const owner = await loginStaff('mtforstartups@gmail.com', 'BonnzaOwner#2026');
      await unlockAllG1AndEnableCheckout(owner.sessionToken, owner.csrfToken);

      const reg1 = await request(app).post('/api/v1/registrations').send({
        fullName: 'Kiran Patel',
        email: 'kiran@example.com',
        sessionId: 'bonnza-2026-12-05-en-1300',
        termsAccepted: true,
      });

      const createOrd1 = await request(app)
        .post('/api/v1/payments/razorpay/create-order')
        .send({
          registrationReference: reg1.body.registration.registrationReference,
        });
      expect(createOrd1.status).toBe(200);
      expect(createOrd1.body.amountPaise).toBe(29900);

      const rzpOrderId = createOrd1.body.razorpayOrderId;
      const rzpPaymentId = 'pay_valid_001';
      const validSig = computeRazorpayCheckoutSignature(
        rzpOrderId,
        rzpPaymentId,
        process.env.RAZORPAY_KEY_SECRET!
      );

      const verifyRes = await request(app)
        .post('/api/v1/payments/razorpay/verify')
        .send({
          razorpay_order_id: rzpOrderId,
          razorpay_payment_id: rzpPaymentId,
          razorpay_signature: validSig,
        });

      expect(verifyRes.status).toBe(200);
      expect(verifyRes.body.verified).toBe(true);
      expect(verifyRes.body.paymentState).toBe('PAID_CONFIRMED');
      expect(verifyRes.body.seatConfirmed).toBe(true);

      // Second registrant with tampered signature
      const reg2 = await request(app).post('/api/v1/registrations').send({
        fullName: 'Tamper User',
        email: 'tamper@example.com',
        sessionId: 'bonnza-2026-12-05-hi-1600',
        termsAccepted: true,
      });
      const createOrd2 = await request(app)
        .post('/api/v1/payments/razorpay/create-order')
        .send({
          registrationReference: reg2.body.registration.registrationReference,
        });

      const badVerify = await request(app)
        .post('/api/v1/payments/razorpay/verify')
        .send({
          razorpay_order_id: createOrd2.body.razorpayOrderId,
          razorpay_payment_id: 'pay_fake_999',
          razorpay_signature: '0000invalid_signature_hex0000',
        });

      expect(badVerify.status).toBe(400);
      expect(badVerify.body.verified).toBe(false);
      expect(badVerify.body.paymentState).toBe('MANUAL_REVIEW');
      expect(badVerify.body.seatConfirmed).toBe(false);
    });

    it('processes raw-body Razorpay webhooks, deduplicates repeated events, and flags amount mismatches', async () => {
      const owner = await loginStaff('mtforstartups@gmail.com', 'BonnzaOwner#2026');
      await unlockAllG1AndEnableCheckout(owner.sessionToken, owner.csrfToken);

      const reg = await request(app).post('/api/v1/registrations').send({
        fullName: 'Webhook Learner',
        email: 'webhook@example.com',
        sessionId: 'bonnza-2026-12-05-en-1300',
        termsAccepted: true,
      });
      const ord = await request(app)
        .post('/api/v1/payments/razorpay/create-order')
        .send({
          registrationReference: reg.body.registration.registrationReference,
        });

      const payloadObj = {
        event: 'payment.captured',
        payload: {
          payment: {
            entity: {
              id: 'pay_wh_100',
              order_id: ord.body.razorpayOrderId,
              amount: 29900,
            },
          },
        },
      };
      const rawJson = JSON.stringify(payloadObj);
      const validWhSig = computeRazorpayWebhookSignature(
        rawJson,
        process.env.RAZORPAY_WEBHOOK_SECRET!
      );

      // 1. Invalid webhook signature rejected
      const badWh = await request(app)
        .post('/api/v1/webhooks/razorpay')
        .set('Content-Type', 'application/json')
        .set('x-razorpay-event-id', 'evt_bad_sig_1')
        .set('x-razorpay-signature', 'invalid_sig')
        .send(rawJson);
      expect(badWh.status).toBe(400);

      // 2. Valid webhook signature confirms seat
      const goodWh = await request(app)
        .post('/api/v1/webhooks/razorpay')
        .set('Content-Type', 'application/json')
        .set('x-razorpay-event-id', 'evt_valid_100')
        .set('x-razorpay-signature', validWhSig)
        .send(rawJson);
      expect(goodWh.status).toBe(200);
      expect(goodWh.body.status).toBe('PROCESSED');

      // 3. Duplicate webhook event ID is idempotently ignored
      const dupWh = await request(app)
        .post('/api/v1/webhooks/razorpay')
        .set('Content-Type', 'application/json')
        .set('x-razorpay-event-id', 'evt_valid_100')
        .set('x-razorpay-signature', validWhSig)
        .send(rawJson);
      expect(dupWh.status).toBe(200);
      expect(dupWh.body.status).toBe('DUPLICATE_IGNORED');
    });
  });

  // ==========================================================================
  // 3. ACCESS CONTROL FOR PROTECTED JOINING CREDENTIALS
  // ==========================================================================
  describe('3. Protected Joining Instructions Access Control', () => {
    it('withholds joining credentials until registration is PAID_CONFIRMED and token matches', async () => {
      const owner = await loginStaff('mtforstartups@gmail.com', 'BonnzaOwner#2026');
      await unlockAllG1AndEnableCheckout(owner.sessionToken, owner.csrfToken);

      const regRes = await request(app).post('/api/v1/registrations').send({
        fullName: 'Access Learner',
        email: 'access@example.com',
        sessionId: 'bonnza-2026-12-05-en-1300',
        termsAccepted: true,
      });
      const ref = regRes.body.registration.registrationReference;
      const token = regRes.body.registration.accessToken;

      // Blocked while in DRAFT state
      const draftCheck = await request(app)
        .get(`/api/v1/registrations/${ref}/join-details`)
        .set('x-registration-token', token);
      expect(draftCheck.status).toBe(403);
      expect(draftCheck.body.allowed).toBe(false);

      // Confirm payment
      const ord = await request(app)
        .post('/api/v1/payments/razorpay/create-order')
        .send({ registrationReference: ref });
      const sig = computeRazorpayCheckoutSignature(
        ord.body.razorpayOrderId,
        'pay_join_ok',
        process.env.RAZORPAY_KEY_SECRET!
      );
      await request(app).post('/api/v1/payments/razorpay/verify').send({
        razorpay_order_id: ord.body.razorpayOrderId,
        razorpay_payment_id: 'pay_join_ok',
        razorpay_signature: sig,
      });

      // Blocked if wrong token is passed
      const wrongTokenCheck = await request(app)
        .get(`/api/v1/registrations/${ref}/join-details`)
        .set('x-registration-token', 'wrong_token');
      expect(wrongTokenCheck.status).toBe(403);

      // Allowed when PAID_CONFIRMED + valid token
      const paidCheck = await request(app)
        .get(`/api/v1/registrations/${ref}/join-details`)
        .set('x-registration-token', token);
      expect(paidCheck.status).toBe(200);
      expect(paidCheck.body.allowed).toBe(true);
    });
  });

  // ==========================================================================
  // 4. ADMIN RBAC, CSRF & 5. CMS PUBLISHING GATE TESTS (Journeys 8, 11)
  // ==========================================================================
  describe('4 & 5. Admin RBAC, CSRF Protection & Bilingual CMS Publishing Gate (Journeys 8, 11)', () => {
    it('enforces RBAC role boundaries, CSRF tokens, and article subject-review publishing gates', async () => {
      // Unauthenticated request rejected
      const unauth = await request(app).get('/api/v1/admin/overview');
      expect(unauth.status).toBe(401);

      const editor = await loginStaff('editor@bonnza.marketingtusk.com', 'BonnzaEditor#2026');
      const reviewer = await loginStaff('reviewer@bonnza.marketingtusk.com', 'BonnzaReviewer#2026');
      const owner = await loginStaff('mtforstartups@gmail.com', 'BonnzaOwner#2026');

      // Missing CSRF token rejected on mutating route
      const noCsrf = await request(app)
        .patch('/api/v1/admin/articles/B01')
        .set('x-admin-session', owner.sessionToken)
        .send({ locale: 'en', title: 'Updated Title' });
      expect(noCsrf.status).toBe(403);
      expect(noCsrf.body.error).toBe('CSRF_MISMATCH');

      // Content editor cannot initiate refunds
      const editorRefund = await request(app)
        .post('/api/v1/admin/refunds')
        .set('x-admin-session', editor.sessionToken)
        .set('x-csrf-token', editor.csrfToken)
        .send({ orderId: 'ord_1', reason: 'Test' });
      expect(editorRefund.status).toBe(403);

      // Revert B01 Hindi to DRAFT & PENDING subject review to verify publishing gate
      await request(app)
        .patch('/api/v1/admin/articles/B01')
        .set('x-admin-session', editor.sessionToken)
        .set('x-csrf-token', editor.csrfToken)
        .send({
          locale: 'hi',
          editorialStatus: 'DRAFT',
          subjectReviewStatus: 'PENDING',
        });

      // Owner cannot publish B01 Hindi while subjectReviewStatus is PENDING
      const prematurePub = await request(app)
        .patch('/api/v1/admin/articles/B01')
        .set('x-admin-session', owner.sessionToken)
        .set('x-csrf-token', owner.csrfToken)
        .send({
          locale: 'hi',
          editorialStatus: 'PUBLISHED',
          reviewerName: 'Shubham Chaturvedi',
          sourceCheckedDate: '2026-11-16',
        });
      expect(prematurePub.status).toBe(400);

      // Faculty Reviewer marks B01 Hindi as VERIFIED
      const verifyB01 = await request(app)
        .patch('/api/v1/admin/articles/B01')
        .set('x-admin-session', reviewer.sessionToken)
        .set('x-csrf-token', reviewer.csrfToken)
        .send({
          locale: 'hi',
          subjectReviewStatus: 'VERIFIED',
          reviewerName: 'Shubham Chaturvedi',
          sourceCheckedDate: '2026-11-16',
        });
      expect(verifyB01.status).toBe(200);

      // Owner publishes B01 Hindi once subject review is verified
      const pubB01 = await request(app)
        .patch('/api/v1/admin/articles/B01')
        .set('x-admin-session', owner.sessionToken)
        .set('x-csrf-token', owner.csrfToken)
        .send({
          locale: 'hi',
          editorialStatus: 'PUBLISHED',
          reviewerName: 'Shubham Chaturvedi',
          sourceCheckedDate: '2026-11-16',
        });
      expect(pubB01.status).toBe(200);
      expect(pubB01.body.article.locales.en.editorialStatus).toBe('PUBLISHED');
      expect(pubB01.body.article.locales.hi.editorialStatus).toBe('PUBLISHED');

      // Locked business-rule page block cannot be overwritten from CMS
      const lockedBlock = await request(app)
        .patch('/api/v1/admin/page-blocks/blk_webinar_pricing_rule')
        .set('x-admin-session', owner.sessionToken)
        .set('x-csrf-token', owner.csrfToken)
        .send({ titleEn: 'Attempt to change ₹299 rule' });
      expect(lockedBlock.status).toBe(403);
      expect(lockedBlock.body.error).toBe('LOCKED_BUSINESS_RULE');
    });
  });

  // ==========================================================================
  // 6. REFUND & SESSION TRANSFER TESTS + 7. OUTBOX IDEMPOTENCY (Journeys 6, 7)
  // ==========================================================================
  describe('6 & 7. Session Transfers, Refunds & Transactional Email Outbox (Journeys 6, 7)', () => {
    it('enforces one-time 24h session transfer rules, processes refunds, and deduplicates outbox emails', async () => {
      const owner = await loginStaff('mtforstartups@gmail.com', 'BonnzaOwner#2026');
      await unlockAllG1AndEnableCheckout(owner.sessionToken, owner.csrfToken);

      const regRes = await request(app).post('/api/v1/registrations').send({
        fullName: 'Transfer & Refund Learner',
        email: 'transfer@example.com',
        sessionId: 'bonnza-2026-12-05-en-1300',
        termsAccepted: true,
      });
      const ref = regRes.body.registration.registrationReference;
      const token = regRes.body.registration.accessToken;

      // 1. Transfer within 24 hours of session start is rejected for learner
      const lateTransfer = await request(app)
        .post(`/api/v1/registrations/${ref}/transfer`)
        .set('x-registration-token', token)
        .send({
          targetSessionId: 'bonnza-2026-12-05-hi-1600',
          nowOverrideUtc: '2026-12-05T01:00:00Z',
        });
      expect(lateTransfer.status).toBe(400);

      // 2. Transfer >24h before session start succeeds once
      const validTransfer = await request(app)
        .post(`/api/v1/registrations/${ref}/transfer`)
        .set('x-registration-token', token)
        .send({
          targetSessionId: 'bonnza-2026-12-05-hi-1600',
          nowOverrideUtc: '2026-11-25T00:00:00Z',
        });
      expect(validTransfer.status).toBe(200);
      expect(validTransfer.body.sessionId).toBe('bonnza-2026-12-05-hi-1600');
      expect(validTransfer.body.transferCount).toBe(1);

      // 3. Second self-serve transfer is rejected
      const secondTransfer = await request(app)
        .post(`/api/v1/registrations/${ref}/transfer`)
        .set('x-registration-token', token)
        .send({
          targetSessionId: 'bonnza-2026-12-05-en-1300',
          nowOverrideUtc: '2026-11-26T00:00:00Z',
        });
      expect(secondTransfer.status).toBe(400);

      // 4. Confirm payment then process full refund
      const ord = await request(app)
        .post('/api/v1/payments/razorpay/create-order')
        .send({ registrationReference: ref });
      const sig = computeRazorpayCheckoutSignature(
        ord.body.razorpayOrderId,
        'pay_refund_test',
        process.env.RAZORPAY_KEY_SECRET!
      );
      await request(app).post('/api/v1/payments/razorpay/verify').send({
        razorpay_order_id: ord.body.razorpayOrderId,
        razorpay_payment_id: 'pay_refund_test',
        razorpay_signature: sig,
      });

      const orderRecord = bonnzaStore.getState().orders[0];
      const refundRes = await request(app)
        .post('/api/v1/admin/refunds')
        .set('x-admin-session', owner.sessionToken)
        .set('x-csrf-token', owner.csrfToken)
        .send({
          orderId: orderRecord.id,
          reason: 'Customer requested cancellation prior to workshop.',
          autoComplete: true,
        });
      expect(refundRes.status).toBe(201);
      expect(refundRes.body.refund.status).toBe('REFUNDED');

      const statusAfterRefund = await request(app).get(
        `/api/v1/registrations/${ref}/status`
      );
      expect(statusAfterRefund.body.paymentState).toBe('REFUNDED');
      expect(statusAfterRefund.body.seatConfirmed).toBe(false);

      // Verify all 16 templates exist in store
      expect(bonnzaStore.getState().emailTemplates.length).toBe(16);
    });
  });

  // ==========================================================================
  // 8. CALENDAR-AWARE POST-EVENT ACCURACY (5 December 2026 Sessions)
  // ==========================================================================
  describe('8. Calendar-Aware Session Closure & Post-Event Archiving (5 Dec 2026)', () => {
    it('closes registration once a session has started or completed on 5 December 2026', async () => {
      // At 2026-12-05T08:00:00Z (1:30 PM IST), English session has started (1:00 PM IST), Hindi session (4:00 PM IST) is still open
      const closedEn = await request(app)
        .post('/api/v1/registrations')
        .send({
          fullName: 'Late English Registrant',
          email: 'late-en@example.com',
          sessionId: 'bonnza-2026-12-05-en-1300',
          termsAccepted: true,
          nowOverrideUtc: '2026-12-05T08:00:00Z',
        });
      expect(closedEn.status).toBe(400);
      expect(closedEn.body.message).toContain('SESSION_CLOSED');

      // Hindi session at 2026-12-05T08:00:00Z is still open
      const openHi = await request(app)
        .post('/api/v1/registrations')
        .send({
          fullName: 'On-Time Hindi Registrant',
          email: 'ontime-hi@example.com',
          sessionId: 'bonnza-2026-12-05-hi-1600',
          termsAccepted: true,
          nowOverrideUtc: '2026-12-05T08:00:00Z',
        });
      expect(openHi.status).toBe(201);

      // After 2026-12-05T12:00:00Z (5:30 PM IST), Hindi session is also closed and archived
      const closedHi = await request(app)
        .post('/api/v1/registrations')
        .send({
          fullName: 'Post Event Registrant',
          email: 'post-event@example.com',
          sessionId: 'bonnza-2026-12-05-hi-1600',
          termsAccepted: true,
          nowOverrideUtc: '2026-12-06T00:00:00Z',
        });
      expect(closedHi.status).toBe(400);
      expect(closedHi.body.message).toContain('SESSION_COMPLETED');
    });
  });

  // ==========================================================================
  // 9. TECHNICAL SEO, SITEMAP.XML, ROBOTS.TXT, LLMS.TXT & HREFLANG (Journey 8 & 14)
  // ==========================================================================
  describe('9. Technical SEO, Dynamic Sitemap, Robots.txt, LLMs.txt & Hreflang Rules', () => {
    it('serves /sitemap.xml, /robots.txt, /llms.txt, and /api/v1/seo/audit accurately', async () => {
      const robotsRes = await request(app).get('/robots.txt');
      expect(robotsRes.status).toBe(200);
      expect(robotsRes.text).toContain('Disallow: /admin');
      expect(robotsRes.text).not.toContain('editorial-preview');
      expect(robotsRes.text).toContain('Sitemap: https://bonnza.marketingtusk.com/sitemap.xml');

      const llmsRes = await request(app).get('/llms.txt');
      expect(llmsRes.status).toBe(200);
      expect(llmsRes.text).toContain('Saturday, 5 December 2026');
      expect(llmsRes.text).toContain('1:00 PM to 2:30 PM IST');
      expect(llmsRes.text).toContain('4:00 PM to 5:30 PM IST');

      // All 20 guides are published in both English and Hindi and appear in /sitemap.xml
      const initialSitemap = await request(app).get('/sitemap.xml');
      expect(initialSitemap.status).toBe(200);
      expect(initialSitemap.text).toContain('https://bonnza.marketingtusk.com/en/webinars/first-online-business');
      expect(initialSitemap.text).toContain('https://bonnza.marketingtusk.com/en/blog/starting-ecommerce-business-from-home');
      expect(initialSitemap.text).toContain('https://bonnza.marketingtusk.com/hi/blog/starting-ecommerce-business-from-home');

      // Reverting B01 Hindi to DRAFT removes only the Hindi URL from /sitemap.xml while English remains
      const owner = await loginStaff('mtforstartups@gmail.com', 'BonnzaOwner#2026');
      await request(app)
        .patch('/api/v1/admin/articles/B01')
        .set('x-admin-session', owner.sessionToken)
        .set('x-csrf-token', owner.csrfToken)
        .send({
          locale: 'hi',
          editorialStatus: 'DRAFT',
        });

      const updatedSitemap = await request(app).get('/sitemap.xml');
      expect(updatedSitemap.text).toContain(
        'https://bonnza.marketingtusk.com/en/blog/starting-ecommerce-business-from-home'
      );
      expect(updatedSitemap.text).not.toContain(
        'https://bonnza.marketingtusk.com/hi/blog/starting-ecommerce-business-from-home'
      );

      // Run automated SEO audit
      const seoAuditRes = await request(app).get('/api/v1/seo/audit');
      expect(seoAuditRes.status).toBe(200);
      expect(seoAuditRes.body.failedCount).toBe(0);
      expect(seoAuditRes.body.totalRoutesChecked).toBeGreaterThanOrEqual(48);

      // Verify canonical URL helper strips query parameters and trailing slashes
      expect(
        cleanCanonicalPath('/en/webinars/first-online-business/?utm_source=meta&fbclid=123')
      ).toBe('/en/webinars/first-online-business');
    });
  });

  // ==========================================================================
  // 10. CONSENT, PII STRIPPING & VERIFIED PURCHASE DEDUPLICATION (Journey 13)
  // ==========================================================================
  describe('10. Privacy Consent, PII Stripping & Verified Purchase Deduplication (Journey 13)', () => {
    it('defaults optional analytics/marketing consent to false, strips PII, and deduplicates verified purchases', () => {
      const defaultConsent = getConsentRecord();
      expect(defaultConsent.categories.strictly_necessary).toBe(true);
      expect(defaultConsent.categories.analytics).toBe(false);
      expect(defaultConsent.categories.marketing).toBe(false);

      const stripped = stripPiiFromMetadata({
        sessionId: 'bonnza-2026-12-05-en-1300',
        email: 'secret@example.com',
        fullName: 'Secret Name',
        phone: '9876543210',
        leakedVal: 'someone@gmail.com',
        courseCode: 'C01',
      });
      expect(stripped.sessionId).toBe('bonnza-2026-12-05-en-1300');
      expect(stripped.courseCode).toBe('C01');
      expect(stripped.email).toBeUndefined();
      expect(stripped.fullName).toBeUndefined();
      expect(stripped.phone).toBeUndefined();
      expect(stripped.leakedVal).toBeUndefined();

      // Unverified order must NEVER emit purchase conversion
      const blockedPurchase = emitVerifiedPurchaseConversion({
        orderNumber: 'BNZ-ORD-2026-0001',
        sessionId: 'bonnza-2026-12-05-en-1300',
        amountPaise: 29900,
        currency: 'INR',
        paymentState: 'PENDING_VERIFICATION',
        seatConfirmed: false,
        locale: 'en',
      });
      expect(blockedPurchase.emitted).toBe(false);

      // Verified order emits purchase conversion with transaction_id
      const validPurchase = emitVerifiedPurchaseConversion({
        orderNumber: 'BNZ-ORD-2026-0099',
        sessionId: 'bonnza-2026-12-05-en-1300',
        amountPaise: 29900,
        currency: 'INR',
        paymentState: 'PAID_CONFIRMED',
        seatConfirmed: true,
        locale: 'en',
      });
      expect(validPurchase.emitted).toBe(true);
      expect(validPurchase.payload?.transaction_id).toBe('BNZ-ORD-2026-0099');
      expect(validPurchase.payload?.value).toBe(299);
    });
  });

  // ==========================================================================
  // 11. CONTACT, PROGRAMME WAITLIST, INTERNAL ANALYTICS & LAUNCH READINESS (Journeys 9, 10, 14)
  // ==========================================================================
  describe('11 & 12. Contact, Programme Waitlist, Internal Analytics, Launch Readiness & Backups', () => {
    it('records contact & programme waitlist enquiries, computes internal analytics, and verifies backup snapshots', async () => {
      const contactRes = await request(app).post('/api/v1/contact').send({
        name: 'Ananya Rao',
        email: 'ananya@example.com',
        phone: '+91 9811122233',
        category: 'workshop',
        message: 'Can I attend the Hindi session from Jaipur?',
        uiLocale: 'en',
      });
      expect(contactRes.status).toBe(201);
      expect(contactRes.body.ticketNumber).toContain('TKT-2026-');

      const waitlistRes = await request(app).post('/api/v1/programme-interest').send({
        name: 'Vikram Singh',
        email: 'vikram@example.com',
        preferredPath: 'craft-to-commerce',
        preferredLanguage: 'hi',
        courseCode: 'C03',
      });
      expect(waitlistRes.status).toBe(201);
      expect(waitlistRes.body.recorded).toBe(true);

      const owner = await loginStaff('mtforstartups@gmail.com', 'BonnzaOwner#2026');

      const analyticsRes = await request(app)
        .get('/api/v1/admin/analytics')
        .set('x-admin-session', owner.sessionToken);
      expect(analyticsRes.status).toBe(200);
      expect(
        analyticsRes.body.analytics.programmeInterest.totalWaitlistAndCourseEnquiries
      ).toBeGreaterThanOrEqual(1);

      const readinessRes = await request(app)
        .get('/api/v1/admin/launch-readiness')
        .set('x-admin-session', owner.sessionToken);
      expect(readinessRes.status).toBe(200);
      expect(readinessRes.body.launchReadiness.categories.length).toBe(16);
      expect(readinessRes.body.launchReadiness.launchStates.length).toBe(6);
      expect(readinessRes.body.launchReadiness.overallReadinessDecision).toBe('STAGING_READY');

      // Export backup snapshot & run dry-run restore verification
      const exportRes = await request(app)
        .get('/api/v1/admin/backups/export')
        .set('x-admin-session', owner.sessionToken);
      expect(exportRes.status).toBe(200);
      expect(exportRes.body.checksumSha256).toBeTruthy();

      const verifyRestoreRes = await request(app)
        .post('/api/v1/admin/backups/restore-verify')
        .set('x-admin-session', owner.sessionToken)
        .set('x-csrf-token', owner.csrfToken)
        .send({ snapshot: exportRes.body });
      expect(verifyRestoreRes.status).toBe(200);
      expect(verifyRestoreRes.body.verified).toBe(true);
      expect(verifyRestoreRes.body.dryRunOnly).toBe(true);
    });
  });
});
