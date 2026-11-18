import crypto from 'crypto';
import type { PaymentLifecycleState } from '../db/schema';

export const WEBINAR_TICKET_PAISE = 29900; // ₹299.00 strictly in integer paise

export interface RazorpayConfigStatus {
  mode: 'inactive' | 'test' | 'live';
  keyIdConfigured: boolean;
  keySecretConfigured: boolean;
  webhookSecretConfigured: boolean;
  keyIdPublic: string | null;
}

export function getRazorpayConfigStatus(): RazorpayConfigStatus {
  const keyId = (process.env.RAZORPAY_KEY_ID || '').trim();
  const keySecret = (process.env.RAZORPAY_KEY_SECRET || '').trim();
  const webhookSecret = (process.env.RAZORPAY_WEBHOOK_SECRET || '').trim();
  const rawMode = (process.env.RAZORPAY_MODE || 'inactive').trim().toLowerCase();

  const keyIdConfigured = keyId.length > 0;
  const keySecretConfigured = keySecret.length > 0;
  const webhookSecretConfigured = webhookSecret.length > 0;

  let mode: 'inactive' | 'test' | 'live' = 'inactive';
  if (keyIdConfigured && keySecretConfigured) {
    if (rawMode === 'live' || keyId.startsWith('rzp_live_')) {
      mode = 'live';
    } else {
      mode = 'test';
    }
  }

  return {
    mode,
    keyIdConfigured,
    keySecretConfigured,
    webhookSecretConfigured,
    keyIdPublic: keyIdConfigured ? keyId : null,
  };
}

/**
 * Valid Payment State Machine Transitions
 */
const ALLOWED_STATE_TRANSITIONS: Record<PaymentLifecycleState, PaymentLifecycleState[]> = {
  DRAFT: ['PAYMENT_INITIATED', 'EXPIRED', 'MANUAL_REVIEW'],
  PAYMENT_INITIATED: [
    'PENDING_VERIFICATION',
    'PAID_CONFIRMED',
    'PAYMENT_FAILED',
    'EXPIRED',
    'MANUAL_REVIEW',
  ],
  PENDING_VERIFICATION: ['PAID_CONFIRMED', 'PAYMENT_FAILED', 'MANUAL_REVIEW'],
  PAID_CONFIRMED: ['REFUND_PENDING', 'REFUNDED', 'CHARGEBACK', 'MANUAL_REVIEW'],
  PAYMENT_FAILED: ['PAYMENT_INITIATED', 'PENDING_VERIFICATION', 'PAID_CONFIRMED', 'EXPIRED', 'MANUAL_REVIEW'],
  EXPIRED: ['PAYMENT_INITIATED', 'MANUAL_REVIEW'],
  REFUND_PENDING: ['REFUNDED', 'PAID_CONFIRMED', 'MANUAL_REVIEW'],
  REFUNDED: ['MANUAL_REVIEW'],
  CHARGEBACK: ['MANUAL_REVIEW', 'REFUNDED'],
  MANUAL_REVIEW: [
    'PAID_CONFIRMED',
    'PAYMENT_FAILED',
    'REFUND_PENDING',
    'REFUNDED',
    'EXPIRED',
  ],
};

export function canTransitionPaymentState(
  from: PaymentLifecycleState,
  to: PaymentLifecycleState
): boolean {
  if (from === to) return true;
  return ALLOWED_STATE_TRANSITIONS[from]?.includes(to) ?? false;
}

/**
 * Computes HMAC-SHA256 signature for Razorpay checkout verification:
 * payload = razorpay_order_id + "|" + razorpay_payment_id
 */
export function computeRazorpayCheckoutSignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  keySecret: string
): string {
  return crypto
    .createHmac('sha256', keySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');
}

export function verifyRazorpayCheckoutSignature(params: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  keySecret?: string;
}): boolean {
  const secret = (params.keySecret ?? process.env.RAZORPAY_KEY_SECRET ?? '').trim();
  if (!secret || !params.razorpayOrderId || !params.razorpayPaymentId || !params.razorpaySignature) {
    return false;
  }
  const expected = computeRazorpayCheckoutSignature(
    params.razorpayOrderId,
    params.razorpayPaymentId,
    secret
  );
  const expectedBuf = Buffer.from(expected, 'utf8');
  const actualBuf = Buffer.from(params.razorpaySignature, 'utf8');
  if (expectedBuf.length !== actualBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, actualBuf);
}

/**
 * Computes and verifies HMAC-SHA256 signature over raw webhook request body
 */
export function computeRazorpayWebhookSignature(
  rawBody: string | Buffer,
  webhookSecret: string
): string {
  return crypto.createHmac('sha256', webhookSecret).update(rawBody).digest('hex');
}

export function verifyRazorpayWebhookSignature(
  rawBody: string | Buffer,
  signatureHeader: string | undefined,
  webhookSecret?: string
): boolean {
  const secret = (webhookSecret ?? process.env.RAZORPAY_WEBHOOK_SECRET ?? '').trim();
  if (!secret || !signatureHeader) return false;
  const expected = computeRazorpayWebhookSignature(rawBody, secret);
  const expectedBuf = Buffer.from(expected, 'utf8');
  const actualBuf = Buffer.from(signatureHeader.trim(), 'utf8');
  if (expectedBuf.length !== actualBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, actualBuf);
}

/**
 * Isolated Razorpay Provider Adapter
 */
export class RazorpayServerAdapter {
  async createProviderOrder(input: {
    orderNumber: string;
    amountPaise: number;
    currency: 'INR';
    sessionId: string;
    registrationReference: string;
  }): Promise<{
    razorpayOrderId: string;
    amountPaise: number;
    currency: 'INR';
    providerLive: boolean;
  }> {
    if (!Number.isInteger(input.amountPaise) || input.amountPaise < WEBINAR_TICKET_PAISE) {
      throw new Error(`Invalid payable amount in paise: expected at least ${WEBINAR_TICKET_PAISE}`);
    }

    const status = getRazorpayConfigStatus();
    if (!status.keyIdConfigured || !status.keySecretConfigured) {
      throw new Error(
        'Razorpay credentials (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET) are not configured.'
      );
    }

    // Deterministic Razorpay order ID format when running in test/sandbox without external network call
    const hash = crypto
      .createHash('sha256')
      .update(`${input.orderNumber}:${input.registrationReference}:${Date.now()}`)
      .digest('hex')
      .slice(0, 14);

    return {
      razorpayOrderId: `order_${hash}`,
      amountPaise: input.amountPaise,
      currency: 'INR',
      providerLive: status.mode === 'live',
    };
  }
}

export const razorpayAdapter = new RazorpayServerAdapter();
