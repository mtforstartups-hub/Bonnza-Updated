import type { AnalyticsEventName, Locale, WebinarSessionId } from '../domain/types';
import {
  getConsentRecord,
  stripPiiFromMetadata,
} from '../utilities/analyticsAndConsent';

/**
 * Future integration contracts reserved for Prompt 2+ backend implementation.
 * No live payment, database, email, or tracking scripts are active in Prompt 1.
 */

export interface RegistrationDraftInput {
  fullName: string;
  email: string;
  phone: string;
  city?: string;
  sessionId: WebinarSessionId;
  displayLocale: Locale;
}

export interface PaymentOrderRequest {
  registrationId: string;
  sessionId: WebinarSessionId;
  amountInr: number;
  currency: 'INR';
}

export interface PaymentOrderResponse {
  provider: 'razorpay';
  orderId: string;
  amountSubunits: number;
  currency: 'INR';
}

export interface PaymentGatewayAdapter {
  createOrder(input: PaymentOrderRequest): Promise<PaymentOrderResponse>;
  verifyWebhookSignature(payload: string, signature: string): Promise<boolean>;
}

export interface RegistrationService {
  createPendingRegistration(input: RegistrationDraftInput): Promise<{ registrationId: string }>;
  getVerifiedStatus(registrationId: string): Promise<'PENDING' | 'VERIFIED' | 'FAILED'>;
}

export interface TransactionalEmailService {
  sendRegistrationConfirmation(params: {
    to: string;
    locale: Locale;
    sessionId: WebinarSessionId;
    registrationId: string;
  }): Promise<void>;
}

export interface WebinarHostingProvider {
  provisionJoiningInstruction(params: {
    sessionId: WebinarSessionId;
    attendeeEmail: string;
  }): Promise<{ referenceId: string }>;
}

export interface CrmService {
  recordEnquiry(params: {
    name: string;
    email: string;
    phone?: string;
    category: string;
    message: string;
    locale: Locale;
  }): Promise<{ enquiryId: string }>;
  recordProgrammeInterest(params: {
    email: string;
    name?: string;
    courseId?: string;
    locale: Locale;
  }): Promise<void>;
}

export interface EntitlementService {
  hasCourseAccess(userId: string, courseId: string): Promise<boolean>;
}

export interface CmsPublishingService {
  isPublishedPublicly(articleId: string): boolean;
}

export interface AnalyticsEventPayload {
  event: AnalyticsEventName;
  locale: Locale;
  path: string;
  timestampUtc: string;
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Client-side analytics layer with strict PII stripping and consent gating.
 * CRITICAL: `ticket_purchase_verified` must NEVER be emitted from client clicks or redirects;
 * verified purchases are handled exclusively via server-confirmed `emitVerifiedPurchaseConversion`.
 */
export function recordAnalyticsEvent(
  payload: Omit<AnalyticsEventPayload, 'timestampUtc'>
): AnalyticsEventPayload | null {
  if (payload.event === 'ticket_purchase_verified') {
    console.warn(
      '[Bonnza Analytics Guard] ticket_purchase_verified cannot be emitted from client-side UI.'
    );
    return null;
  }

  const sanitizedMetadata = stripPiiFromMetadata(payload.metadata);
  const consent = getConsentRecord();

  const eventRecord: AnalyticsEventPayload = {
    event: payload.event,
    locale: payload.locale,
    path: payload.path,
    timestampUtc: new Date().toISOString(),
    metadata: {
      ...sanitizedMetadata,
      analyticsConsentGranted: consent.categories.analytics,
    },
  };

  return eventRecord;
}
