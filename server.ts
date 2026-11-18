import express, { type Request, type Response, type NextFunction } from 'express';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import {
  bonnzaStore,
  hashPassword,
  hasRolePermission,
  sanitizeRichText,
} from './src/server/store';
import {
  getRazorpayConfigStatus,
  WEBINAR_TICKET_PAISE,
} from './src/server/razorpayAdapter';
import type {
  StaffRoleCode,
  AdminSessionRecord,
  SupportTicketStatus,
  WebinarOperationalStatus,
} from './src/db/schema';
import type {
  Locale,
  WebinarSessionId,
  EditorialStatus,
  SubjectReviewStatus,
  TranslationStatus,
} from './src/domain/types';
import {
  generateSitemapXml,
  generateRobotsTxt,
  generateLlmsTxt,
  runAutomatedSeoAudit,
  buildLaunchReadinessReport,
  buildInternalAnalyticsReport,
} from './src/server/seoAndLaunchService';

export const app = express();

// Security Headers
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '0');
  next();
});

// Simple In-Memory Rate Limiter per IP + Route Category
const rateBuckets = new Map<string, { count: number; resetAt: number }>();
function rateLimit(maxPerMinute: number, bucketPrefix: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (process.env.VITEST === 'true') return next();
    const ip = req.ip || '127.0.0.1';
    const key = `${bucketPrefix}:${ip}`;
    const now = Date.now();
    const current = rateBuckets.get(key);
    if (!current || now > current.resetAt) {
      rateBuckets.set(key, { count: 1, resetAt: now + 60_000 });
      return next();
    }
    current.count += 1;
    if (current.count > maxPerMinute) {
      res.status(429).json({
        error: 'RATE_LIMITED',
        message: 'Too many requests. Please wait a moment and try again.',
      });
      return;
    }
    next();
  };
}

// ============================================================================
// 1. RAW-BODY RAZORPAY WEBHOOK ENDPOINT (Must precede express.json())
// ============================================================================
app.post(
  '/api/v1/webhooks/razorpay',
  express.raw({ type: 'application/json' }),
  (req: Request, res: Response) => {
    try {
      const signatureHeader = req.header('x-razorpay-signature');
      const eventIdHeader = req.header('x-razorpay-event-id');
      const rawBody = Buffer.isBuffer(req.body)
        ? req.body
        : Buffer.from(
            typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {}),
            'utf8'
          );

      const outcome = bonnzaStore.processRazorpayWebhook({
        rawBody,
        signatureHeader,
        eventIdHeader,
      });

      res.status(outcome.statusCode).json({
        status: outcome.status,
        eventId: outcome.eventRecord.providerEventId,
      });
    } catch (error) {
      res.status(400).json({
        error: 'WEBHOOK_PROCESSING_ERROR',
        message: error instanceof Error ? error.message : 'Webhook failed',
      });
    }
  }
);

// Standard JSON Parser for all other routes
app.use(express.json({ limit: '1mb' }));

// ============================================================================
// 2. PUBLIC & LEARNER API ENDPOINTS (/api/v1/*)
// ============================================================================

app.get('/api/v1/public/bootstrap', (_req: Request, res: Response) => {
  const state = bonnzaStore.getState();
  const rzp = getRazorpayConfigStatus();

  const publicSessions = state.webinarSessions.map((s) => ({
    id: s.id,
    instructionLocale: s.instructionLocale,
    date: s.date,
    startUtc: s.startUtc,
    endUtc: s.endUtc,
    timezone: s.timezone,
    durationMinutes: s.durationMinutes,
    title: s.title,
    presenter: s.presenter,
    status: s.status,
    capacity: s.capacity,
    confirmedPaidSeats: s.confirmedPaidSeats,
    baseAmountPaise: s.baseAmountPaise,
    taxAmountPaise: s.taxAmountPaise,
    totalPayablePaise: s.totalPayablePaise,
    workingTicketPriceInr: Math.round(s.totalPayablePaise / 100),
    taxTreatmentStatus: s.taxTreatmentStatus,
    taxNote: s.taxNote,
    // Private meeting URL & passcode are NEVER exposed in public bootstrap
    meetingUrlExposed: false,
  }));

  const g1Items = state.launchChecklist.filter((i) => i.gate === 'G1');
  const g1Ready = g1Items.every((i) => i.isCompleted);

  res.json({
    sessions: publicSessions,
    featureFlags: state.featureFlags,
    pageBlocks: state.pageBlocks,
    resources: state.resources.filter((r) => r.isPublished),
    articles: state.articles,
    razorpayStatus: {
      mode: rzp.mode,
      keyIdPublic: rzp.keyIdPublic,
    },
    gateStatus: {
      g1CompletedCount: g1Items.filter((i) => i.isCompleted).length,
      g1TotalCount: g1Items.length,
      g1Ready,
    },
    analyticsConfig: {
      ga4MeasurementId: (process.env.GA4_MEASUREMENT_ID || '').trim() || null,
      gscVerificationToken: (process.env.GSC_VERIFICATION_TOKEN || '').trim() || null,
      bingVerificationToken: (process.env.BING_VERIFICATION_TOKEN || '').trim() || null,
      clarityProjectId: (process.env.CLARITY_PROJECT_ID || '').trim() || null,
      metaPixelId: (process.env.META_PIXEL_ID || '').trim() || null,
      publicIndexingEnabled:
        (process.env.PUBLIC_INDEXING_ENABLED || 'true').toLowerCase() !== 'false',
      analyticsConsentRequired:
        (process.env.ANALYTICS_CONSENT_REQUIRED || 'true').toLowerCase() !== 'false',
      replayEnabled: (process.env.REPLAY_ENABLED || 'false').toLowerCase() === 'true',
    },
  });
});

// ============================================================================
// 2A. TECHNICAL SEO, CRAWLER & AI DISCOVERABILITY ENDPOINTS
// ============================================================================

app.get('/sitemap.xml', (_req: Request, res: Response) => {
  const xml = generateSitemapXml(bonnzaStore.getState());
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).send(xml);
});

app.get('/robots.txt', (_req: Request, res: Response) => {
  const txt = generateRobotsTxt(bonnzaStore.getState());
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).send(txt);
});

app.get('/llms.txt', (_req: Request, res: Response) => {
  const txt = generateLlmsTxt();
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).send(txt);
});

app.get('/api/v1/health', (_req: Request, res: Response) => {
  const state = bonnzaStore.getState();
  const rzp = getRazorpayConfigStatus();
  res.status(200).json({
    status: 'ok',
    service: 'bonnza-web-commerce',
    appEnv: process.env.APP_ENV || process.env.NODE_ENV || 'development',
    timestampUtc: new Date().toISOString(),
    database: {
      engine: process.env.DATABASE_URL ? 'postgresql_configured' : 'firestore_and_local_persistence',
      sessionsLoaded: state.webinarSessions.length,
      articlesLoaded: state.articles.length,
      coursesLoaded: state.courses.length,
    },
    razorpayMode: rzp.mode,
    checkoutEnabled:
      state.featureFlags.find((f) => f.key === 'WEBINAR_CHECKOUT_ENABLED')?.enabled ?? false,
  });
});

app.get('/api/v1/seo/audit', (_req: Request, res: Response) => {
  const audit = runAutomatedSeoAudit(bonnzaStore.getState());
  res.status(200).json(audit);
});

app.post(
  '/api/v1/programme-interest',
  rateLimit(20, 'programme_interest'),
  (req: Request, res: Response) => {
    try {
      const { name, email, phone, preferredPath, preferredLanguage, courseCode, utm } =
        req.body || {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
        res.status(400).json({
          error: 'VALIDATION_ERROR',
          message: 'Please provide a valid email address to register programme interest.',
        });
        return;
      }
      const cleanName =
        typeof name === 'string' && name.trim().length >= 2
          ? name.trim()
          : email.split('@')[0];
      const uiLocale: Locale = preferredLanguage === 'hi' ? 'hi' : 'en';
      const pathTag =
        preferredPath === 'resell' || preferredPath === 'craft-to-commerce'
          ? preferredPath
          : 'both';

      const ticket = bonnzaStore.createSupportTicketFromContact({
        name: cleanName,
        email: email.trim(),
        phone: typeof phone === 'string' ? phone : '',
        category: 'programme',
        message: `Programme Waitlist / Interest Registration — Path: ${pathTag}${
          courseCode ? `, Course: ${courseCode}` : ''
        }`,
        uiLocale,
        utm:
          utm && typeof utm === 'object'
            ? { ...utm, capturedAt: new Date().toISOString() }
            : undefined,
      });

      const customer = bonnzaStore
        .getState()
        .customers.find((c) => c.primaryEmail.toLowerCase() === email.trim().toLowerCase());
      if (customer && !customer.tags.includes('programme_waitlist')) {
        customer.tags.push('programme_waitlist');
        if (courseCode && typeof courseCode === 'string') {
          customer.tags.push(`interest_${courseCode.toLowerCase()}`);
        }
        bonnzaStore.save();
      }

      res.status(201).json({
        recorded: true,
        ticketNumber: ticket.ticketNumber,
        createdAt: ticket.createdAt,
      });
    } catch (error) {
      res.status(400).json({
        error: 'PROGRAMME_INTEREST_ERROR',
        message: error instanceof Error ? error.message : 'Could not record programme interest.',
      });
    }
  }
);

app.post(
  '/api/v1/registrations',
  rateLimit(25, 'registration'),
  (req: Request, res: Response) => {
    try {
      const {
        fullName,
        email,
        phone,
        sessionId,
        uiLocale,
        businessInterest,
        termsAccepted,
        marketingOptIn,
        utm,
      } = req.body || {};

      if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
        res.status(400).json({
          error: 'VALIDATION_ERROR',
          field: 'fullName',
          message: 'Please enter your full name (at least 2 characters).',
        });
        return;
      }

      const emailTrimmed = typeof email === 'string' ? email.trim() : '';
      const phoneTrimmed = typeof phone === 'string' ? phone.trim() : '';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailTrimmed.length > 0 && !emailRegex.test(emailTrimmed)) {
        res.status(400).json({
          error: 'VALIDATION_ERROR',
          field: 'email',
          message: 'Please enter a valid email address.',
        });
        return;
      }

      if (phoneTrimmed.length > 0) {
        const cleanedPhone = phoneTrimmed.replace(/[\s\-+()]/g, '');
        if (!/^\d{8,15}$/.test(cleanedPhone)) {
          res.status(400).json({
            error: 'VALIDATION_ERROR',
            field: 'phone',
            message: 'Please enter a valid 10-digit mobile / WhatsApp number.',
          });
          return;
        }
      }

      if (emailTrimmed.length === 0 && phoneTrimmed.length === 0) {
        res.status(400).json({
          error: 'VALIDATION_ERROR',
          field: 'phone',
          message: 'Please enter your mobile / WhatsApp number.',
        });
        return;
      }

      const sessionExists = bonnzaStore
        .getState()
        .webinarSessions.some((s) => s.id === sessionId);
      if (!sessionExists) {
        res.status(400).json({
          error: 'VALIDATION_ERROR',
          field: 'sessionId',
          message: 'Please select a valid live webinar session.',
        });
        return;
      }

      if (termsAccepted === false) {
        res.status(400).json({
          error: 'VALIDATION_ERROR',
          field: 'termsAccepted',
          message: 'You must acknowledge the Terms & Refund Policy before registering.',
        });
        return;
      }

      const validInterests = ['resell', 'craft-to-commerce', 'both', 'unsure'];
      const normalizedInterest = validInterests.includes(businessInterest)
        ? businessInterest
        : 'unsure';
      const normalizedLocale: Locale = uiLocale === 'hi' ? 'hi' : 'en';

      const result = bonnzaStore.createOrReuseWebinarRegistration({
        fullName,
        email: emailTrimmed,
        phone: phoneTrimmed,
        sessionId: sessionId as WebinarSessionId,
        uiLocale: normalizedLocale,
        businessInterest: normalizedInterest,
        termsAccepted: true,
        marketingOptIn: Boolean(marketingOptIn),
        utm: utm && typeof utm === 'object' ? { ...utm, capturedAt: new Date().toISOString() } : undefined,
        nowOverrideUtc: typeof req.body?.nowOverrideUtc === 'string' ? req.body.nowOverrideUtc : undefined,
      });

      const razorpayCheckoutUrl =
        (process.env.RAZORPAY_CHECKOUT_URL || '').trim() || null;

      res.status(result.reusedExistingDraft ? 200 : 201).json({
        registration: {
          registrationReference: result.registration.registrationReference,
          sessionId: result.registration.sessionId,
          sessionLocale: result.registration.sessionLocale,
          uiLocale: result.registration.uiLocale,
          fullName: result.registration.fullName,
          email: result.registration.email,
          phone: result.registration.phone,
          businessInterest: result.registration.businessInterest,
          paymentState: result.registration.paymentState,
          seatConfirmed: result.registration.seatConfirmed,
          accessToken: result.registration.accessToken,
          createdAt: result.registration.createdAt,
        },
        order: {
          orderNumber: result.order.orderNumber,
          currency: result.order.currency,
          subtotalPaise: result.order.subtotalPaise,
          taxPaise: result.order.taxPaise,
          totalPayablePaise: result.order.totalPayablePaise,
          totalPayableInr: Math.round(result.order.totalPayablePaise / 100),
          status: result.order.status,
          razorpayOrderId: result.order.razorpayOrderId,
        },
        reusedExistingDraft: result.reusedExistingDraft,
        alreadyPaidConfirmed: result.alreadyPaidConfirmed,
        checkoutEnabled: result.checkoutEnabled,
        razorpayCheckoutUrl,
      });
    } catch (error) {
      res.status(400).json({
        error: 'REGISTRATION_ERROR',
        message: error instanceof Error ? error.message : 'Could not create registration.',
      });
    }
  }
);

app.post(
  '/api/v1/payments/razorpay/create-order',
  rateLimit(20, 'create_order'),
  async (req: Request, res: Response) => {
    try {
      const { registrationReference } = req.body || {};
      if (!registrationReference || typeof registrationReference !== 'string') {
        res.status(400).json({
          error: 'VALIDATION_ERROR',
          message: 'registrationReference is required.',
        });
        return;
      }

      const result = await bonnzaStore.initiateRazorpayOrder({
        registrationReference,
      });

      res.status(200).json({
        razorpayKeyId: result.razorpayKeyId,
        razorpayOrderId: result.order.razorpayOrderId,
        orderNumber: result.order.orderNumber,
        amountPaise: WEBINAR_TICKET_PAISE,
        currency: 'INR',
        paymentState: result.payment.state,
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to create Razorpay order.';
      const status = msg.startsWith('WEBINAR_CHECKOUT_DISABLED') ? 403 : 400;
      res.status(status).json({
        error: msg.startsWith('WEBINAR_CHECKOUT_DISABLED')
          ? 'WEBINAR_CHECKOUT_DISABLED'
          : 'ORDER_CREATION_FAILED',
        message: msg,
      });
    }
  }
);

app.post(
  '/api/v1/payments/razorpay/verify',
  rateLimit(20, 'verify_payment'),
  (req: Request, res: Response) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        res.status(400).json({
          error: 'VALIDATION_ERROR',
          message: 'razorpay_order_id, razorpay_payment_id, and razorpay_signature are required.',
        });
        return;
      }

      const result = bonnzaStore.verifyCheckoutCallback({
        razorpayOrderId: String(razorpay_order_id),
        razorpayPaymentId: String(razorpay_payment_id),
        razorpaySignature: String(razorpay_signature),
      });

      if (!result.verified) {
        res.status(400).json({
          verified: false,
          error: 'INVALID_PAYMENT_SIGNATURE',
          paymentState: result.registration.paymentState,
          seatConfirmed: false,
          message:
            'Payment signature verification failed. Order has been flagged for manual review and no seat is confirmed.',
        });
        return;
      }

      res.status(200).json({
        verified: true,
        registrationReference: result.registration.registrationReference,
        orderNumber: result.order.orderNumber,
        receiptNumber: result.order.receiptNumber,
        paymentState: result.registration.paymentState,
        seatConfirmed: result.registration.seatConfirmed,
      });
    } catch (error) {
      res.status(400).json({
        verified: false,
        error: 'PAYMENT_VERIFICATION_ERROR',
        message: error instanceof Error ? error.message : 'Verification failed.',
      });
    }
  }
);

app.get('/api/v1/registrations/:reference/status', (req: Request, res: Response) => {
  const reference = req.params.reference;
  const state = bonnzaStore.getState();
  const registration = state.registrations.find(
    (r) => r.registrationReference === reference
  );
  if (!registration) {
    res.status(404).json({
      error: 'NOT_FOUND',
      message: 'Registration reference not found.',
    });
    return;
  }
  const order = state.orders.find((o) => o.registrationId === registration.id);
  const session = state.webinarSessions.find((s) => s.id === registration.sessionId);

  res.json({
    registrationReference: registration.registrationReference,
    fullName: registration.fullName,
    email: registration.email,
    sessionId: registration.sessionId,
    sessionTitle: session?.title,
    startUtc: session?.startUtc,
    endUtc: session?.endUtc,
    paymentState: registration.paymentState,
    seatConfirmed: registration.seatConfirmed,
    transferCount: registration.transferCount,
    order: order
      ? {
          orderNumber: order.orderNumber,
          receiptNumber: order.receiptNumber,
          totalPayablePaise: order.totalPayablePaise,
          totalPayableInr: Math.round(order.totalPayablePaise / 100),
          status: order.status,
        }
      : null,
  });
});

app.get('/api/v1/registrations/:reference/join-details', (req: Request, res: Response) => {
  const reference = req.params.reference;
  const accessToken =
    (req.header('x-registration-token') || String(req.query.token || '')).trim();

  const details = bonnzaStore.getProtectedJoinDetails({
    registrationReference: reference,
    accessToken,
  });

  if (!details.allowed) {
    res.status(403).json({
      allowed: false,
      paymentState: details.paymentState,
      message: details.reason,
    });
    return;
  }

  res.json(details);
});

app.post(
  '/api/v1/registrations/:reference/transfer',
  rateLimit(10, 'transfer'),
  (req: Request, res: Response) => {
    try {
      const reference = req.params.reference;
      const accessToken = (req.header('x-registration-token') || req.body?.accessToken || '').trim();
      const targetSessionId = req.body?.targetSessionId as WebinarSessionId;

      const reg = bonnzaStore
        .getState()
        .registrations.find((r) => r.registrationReference === reference);
      if (!reg || reg.accessToken !== accessToken) {
        res.status(403).json({
          error: 'FORBIDDEN',
          message: 'Valid registration access token is required to request a session transfer.',
        });
        return;
      }

      const updated = bonnzaStore.transferRegistrationSession({
        registrationReference: reference,
        targetSessionId,
        actorEmail: reg.email,
        actorRole: 'LEARNER',
        nowOverrideUtc: req.body?.nowOverrideUtc,
      });

      res.json({
        registrationReference: updated.registrationReference,
        sessionId: updated.sessionId,
        transferCount: updated.transferCount,
        transferredFromSessionId: updated.transferredFromSessionId,
      });
    } catch (error) {
      res.status(400).json({
        error: 'TRANSFER_REJECTED',
        message: error instanceof Error ? error.message : 'Transfer could not be completed.',
      });
    }
  }
);

app.post('/api/v1/contact', rateLimit(15, 'contact'), (req: Request, res: Response) => {
  try {
    const { name, email, phone, category, message, uiLocale, utm } = req.body || {};
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Please enter your name.',
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Please enter a valid email address.',
      });
      return;
    }
    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Please enter your enquiry message.',
      });
      return;
    }

    const ticket = bonnzaStore.createSupportTicketFromContact({
      name,
      email,
      phone: typeof phone === 'string' ? phone : '',
      category: typeof category === 'string' ? category : 'workshop',
      message,
      uiLocale: uiLocale === 'hi' ? 'hi' : 'en',
      utm: utm && typeof utm === 'object' ? { ...utm, capturedAt: new Date().toISOString() } : undefined,
    });

    res.status(201).json({
      ticketNumber: ticket.ticketNumber,
      status: ticket.status,
      createdAt: ticket.createdAt,
    });
  } catch (error) {
    res.status(400).json({
      error: 'CONTACT_SUBMISSION_ERROR',
      message: error instanceof Error ? error.message : 'Could not submit enquiry.',
    });
  }
});

// ============================================================================
// 3. ADMIN AUTHENTICATION & RBAC MIDDLEWARE (/api/v1/admin/*)
// ============================================================================

interface AuthenticatedAdminRequest extends Request {
  adminSession?: AdminSessionRecord;
}

function requireAdminPermission(requiredPermission: string) {
  return (req: AuthenticatedAdminRequest, res: Response, next: NextFunction) => {
    const token = (req.header('x-admin-session') || '').trim();
    if (!token) {
      res.status(401).json({
        error: 'UNAUTHORIZED',
        message: 'Admin authentication session token is required.',
      });
      return;
    }

    const session = bonnzaStore
      .getState()
      .adminSessions.find(
        (s) =>
          s.id === token &&
          !s.revokedAt &&
          new Date(s.expiresAt).getTime() > Date.now()
      );

    if (!session) {
      res.status(401).json({
        error: 'SESSION_EXPIRED',
        message: 'Admin session is invalid or expired. Please sign in again.',
      });
      return;
    }

    // Mutating requests must supply matching CSRF token
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      const csrfHeader = (req.header('x-csrf-token') || '').trim();
      if (!csrfHeader || csrfHeader !== session.csrfToken) {
        res.status(403).json({
          error: 'CSRF_MISMATCH',
          message: 'Missing or invalid CSRF protection token.',
        });
        return;
      }
    }

    if (!hasRolePermission(session.roles, requiredPermission)) {
      res.status(403).json({
        error: 'FORBIDDEN_ROLE',
        message: `Your role (${session.roles.join(', ')}) does not have permission '${requiredPermission}'.`,
      });
      return;
    }

    req.adminSession = session;
    next();
  };
}

app.post('/api/v1/admin/auth/login', rateLimit(15, 'admin_login'), (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400).json({
      error: 'VALIDATION_ERROR',
      message: 'Email and password are required.',
    });
    return;
  }

  const normalizedEmail = String(email).toLowerCase().trim();
  const state = bonnzaStore.getState();
  const user = state.staffUsers.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.isActive
  );

  if (!user || user.passwordHash !== hashPassword(String(password))) {
    res.status(401).json({
      error: 'INVALID_CREDENTIALS',
      message: 'Invalid staff email or password.',
    });
    return;
  }

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString();
  const sessionRecord: AdminSessionRecord = {
    id: `adm_sess_${crypto.randomBytes(24).toString('hex')}`,
    userId: user.id,
    email: user.email,
    fullName: user.fullName,
    roles: user.roles,
    csrfToken: `csrf_${crypto.randomBytes(18).toString('hex')}`,
    expiresAt,
    revokedAt: null,
    createdAt: now.toISOString(),
  };

  user.lastLoginAt = now.toISOString();
  state.adminSessions.unshift(sessionRecord);
  bonnzaStore.recordAuditLog({
    actorUserId: user.id,
    actorEmail: user.email,
    actorRole: user.roles[0] || 'ADMIN',
    action: 'ADMIN_LOGIN_SUCCESS',
    targetType: 'AUTH',
    targetId: user.id,
    summary: `Staff user ${user.email} (${user.roles.join(', ')}) signed in.`,
  });

  res.json({
    sessionToken: sessionRecord.id,
    csrfToken: sessionRecord.csrfToken,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      roles: user.roles,
    },
    expiresAt: sessionRecord.expiresAt,
  });
});

app.post(
  '/api/v1/admin/auth/logout',
  requireAdminPermission('overview:read'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    if (req.adminSession) {
      req.adminSession.revokedAt = new Date().toISOString();
      bonnzaStore.save();
    }
    res.json({ loggedOut: true });
  }
);

app.get(
  '/api/v1/admin/overview',
  requireAdminPermission('overview:read'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    const state = bonnzaStore.getState();
    const rzp = getRazorpayConfigStatus();

    const paidOrders = state.orders.filter((o) => o.status === 'PAID_CONFIRMED');
    const verifiedRevenuePaise = paidOrders.reduce((acc, o) => acc + o.totalPayablePaise, 0);

    res.json({
      currentUser: {
        email: req.adminSession?.email,
        fullName: req.adminSession?.fullName,
        roles: req.adminSession?.roles,
      },
      kpis: {
        totalRegistrations: state.registrations.length,
        confirmedPaidRegistrations: state.registrations.filter((r) => r.seatConfirmed).length,
        pendingVerificationCount: state.registrations.filter(
          (r) =>
            r.paymentState === 'PAYMENT_INITIATED' ||
            r.paymentState === 'PENDING_VERIFICATION' ||
            r.paymentState === 'MANUAL_REVIEW'
        ).length,
        verifiedRevenuePaise,
        verifiedRevenueInr: Math.round(verifiedRevenuePaise / 100),
        openSupportTickets: state.supportTickets.filter(
          (t) => t.status === 'OPEN' || t.status === 'IN_PROGRESS'
        ).length,
        publishedArticlesEn: state.articles.filter(
          (a) => a.locales.en.editorialStatus === 'PUBLISHED'
        ).length,
        publishedArticlesHi: state.articles.filter(
          (a) => a.locales.hi.editorialStatus === 'PUBLISHED'
        ).length,
        totalArticles: state.articles.length,
        queuedEmailsCount: state.emailOutbox.filter((e) => e.status === 'Queued').length,
      },
      razorpayStatus: rzp,
      webinarSessions: state.webinarSessions,
      registrations: state.registrations,
      orders: state.orders,
      payments: state.payments,
      webhookEvents: state.webhookEvents,
      refunds: state.refunds,
      reconciliationRuns: state.reconciliationRuns,
      attendance: state.attendance,
      reminderJobs: state.reminderJobs,
      customers: state.customers,
      supportTickets: state.supportTickets,
      courses: state.courses,
      articles: state.articles,
      pageBlocks: state.pageBlocks,
      resources: state.resources,
      emailTemplates: state.emailTemplates,
      emailOutbox: state.emailOutbox,
      featureFlags: state.featureFlags,
      launchChecklist: state.launchChecklist,
      auditLogs: state.auditLogs.slice(0, 150),
      staffUsers: state.staffUsers.map((u) => ({
        id: u.id,
        email: u.email,
        fullName: u.fullName,
        roles: u.roles,
        isActive: u.isActive,
        lastLoginAt: u.lastLoginAt,
      })),
      seoAudit: runAutomatedSeoAudit(state),
      launchReadiness: buildLaunchReadinessReport(state),
      internalAnalytics: buildInternalAnalyticsReport(state),
    });
  }
);

app.get(
  '/api/v1/admin/analytics',
  requireAdminPermission('overview:read'),
  (_req: AuthenticatedAdminRequest, res: Response) => {
    const state = bonnzaStore.getState();
    res.json({
      analytics: buildInternalAnalyticsReport(state),
      seoAudit: runAutomatedSeoAudit(state),
    });
  }
);

app.get(
  '/api/v1/admin/launch-readiness',
  requireAdminPermission('overview:read'),
  (_req: AuthenticatedAdminRequest, res: Response) => {
    const state = bonnzaStore.getState();
    res.json({
      launchReadiness: buildLaunchReadinessReport(state),
      seoAudit: runAutomatedSeoAudit(state),
    });
  }
);

app.get(
  '/api/v1/admin/backups/export',
  requireAdminPermission('settings:write'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    const state = bonnzaStore.getState();
    const exportedAt = new Date().toISOString();
    const payload = {
      schemaVersion: '2026-11-bonnza-v3',
      exportedAt,
      exportedBy: req.adminSession!.email,
      counts: {
        customers: state.customers.length,
        registrations: state.registrations.length,
        orders: state.orders.length,
        payments: state.payments.length,
        articles: state.articles.length,
        auditLogs: state.auditLogs.length,
      },
      checksumSha256: crypto
        .createHash('sha256')
        .update(JSON.stringify({ r: state.registrations.length, o: state.orders.length, a: state.articles.length }))
        .digest('hex'),
      data: {
        webinarSessions: state.webinarSessions,
        customers: state.customers,
        registrations: state.registrations,
        orders: state.orders,
        payments: state.payments,
        refunds: state.refunds,
        supportTickets: state.supportTickets,
        featureFlags: state.featureFlags,
        launchChecklist: state.launchChecklist,
      },
    };

    bonnzaStore.recordAuditLog({
      actorUserId: req.adminSession!.userId,
      actorEmail: req.adminSession!.email,
      actorRole: req.adminSession!.roles[0],
      action: 'BACKUP_SNAPSHOT_EXPORTED',
      targetType: 'BACKUP',
      targetId: payload.checksumSha256.slice(0, 12),
      summary: `Exported operational backup snapshot (${payload.counts.registrations} registrations, ${payload.counts.orders} orders)`,
    });

    res.json(payload);
  }
);

app.post(
  '/api/v1/admin/backups/restore-verify',
  requireAdminPermission('settings:write'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    const snapshot = req.body?.snapshot || req.body;
    const hasRequiredCollections =
      snapshot &&
      snapshot.data &&
      Array.isArray(snapshot.data.webinarSessions) &&
      Array.isArray(snapshot.data.registrations) &&
      Array.isArray(snapshot.data.orders);

    if (!hasRequiredCollections) {
      res.status(400).json({
        verified: false,
        error: 'INVALID_BACKUP_SNAPSHOT',
        message: 'Snapshot is missing required webinarSessions, registrations, or orders collections.',
      });
      return;
    }

    bonnzaStore.recordAuditLog({
      actorUserId: req.adminSession!.userId,
      actorEmail: req.adminSession!.email,
      actorRole: req.adminSession!.roles[0],
      action: 'BACKUP_RESTORE_DRY_RUN_VERIFIED',
      targetType: 'BACKUP',
      targetId: String(snapshot.checksumSha256 || 'manual').slice(0, 12),
      summary: `Verified non-destructive backup restore integrity (${snapshot.data.registrations.length} registrations, ${snapshot.data.orders.length} orders).`,
    });

    res.json({
      verified: true,
      dryRunOnly: true,
      schemaVersion: snapshot.schemaVersion || '2026-11-bonnza-v3',
      restorableCounts: {
        webinarSessions: snapshot.data.webinarSessions.length,
        registrations: snapshot.data.registrations.length,
        orders: snapshot.data.orders.length,
      },
      verifiedAt: new Date().toISOString(),
    });
  }
);

// Webinar & Session Management
app.patch(
  '/api/v1/admin/sessions/:sessionId',
  requireAdminPermission('webinars:write'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    const sessionId = req.params.sessionId as WebinarSessionId;
    const state = bonnzaStore.getState();
    const session = state.webinarSessions.find((s) => s.id === sessionId);
    if (!session) {
      res.status(404).json({ error: 'NOT_FOUND', message: 'Session not found.' });
      return;
    }

    const {
      status,
      capacity,
      privateMeetingPlatform,
      privateMeetingUrl,
      privatePasscode,
      joiningInstructionsEn,
      joiningInstructionsHi,
    } = req.body || {};

    const previousStatus = session.status;
    if (status) {
      session.status = status as WebinarOperationalStatus;
    }
    if (capacity !== undefined) {
      session.capacity = capacity === null || capacity === '' ? null : Number(capacity);
    }
    if (typeof privateMeetingPlatform === 'string') {
      session.privateMeetingPlatform = sanitizeRichText(privateMeetingPlatform);
    }
    if (typeof privateMeetingUrl === 'string') {
      session.privateMeetingUrl = privateMeetingUrl.trim();
    }
    if (typeof privatePasscode === 'string') {
      session.privatePasscode = privatePasscode.trim();
    }
    if (typeof joiningInstructionsEn === 'string') {
      session.joiningInstructions.en = sanitizeRichText(joiningInstructionsEn);
    }
    if (typeof joiningInstructionsHi === 'string') {
      session.joiningInstructions.hi = sanitizeRichText(joiningInstructionsHi);
    }
    session.updatedAt = new Date().toISOString();

    // Auto-update G1 checklist item #8 if both sessions have private meeting URLs configured
    const bothConfigured = state.webinarSessions.every(
      (s) => s.privateMeetingUrl && s.privateMeetingUrl.startsWith('https://')
    );
    const g1RoomItem = state.launchChecklist.find(
      (c) => c.code === 'G1_PRIVATE_MEETING_LINKS_CONFIGURED'
    );
    if (g1RoomItem) {
      g1RoomItem.isCompleted = bothConfigured;
      g1RoomItem.verifiedByEmail = bothConfigured ? req.adminSession!.email : null;
      g1RoomItem.verifiedAt = bothConfigured ? session.updatedAt : null;
    }

    // Queue notification if rescheduled or cancelled
    if (status && status !== previousStatus && (status === 'CANCELLED' || status === 'RESCHEDULED')) {
      const affectedRegs = state.registrations.filter((r) => r.sessionId === session.id);
      for (const reg of affectedRegs) {
        bonnzaStore.queueTransactionalEmail({
          idempotencyKey: `session_${status.toLowerCase()}:${session.id}:${reg.id}`,
          templateCode: status === 'CANCELLED' ? 'SESSION_CANCELLED' : 'SESSION_RESCHEDULED',
          recipientEmail: reg.email,
          recipientName: reg.fullName,
          locale: reg.uiLocale,
          variables: {
            fullName: reg.fullName,
            registrationReference: reg.registrationReference,
            sessionTitle: session.title[reg.uiLocale],
          },
          relatedEntityType: 'WEBINAR_SESSION',
          relatedEntityId: session.id,
        });
      }
    }

    bonnzaStore.recordAuditLog({
      actorUserId: req.adminSession!.userId,
      actorEmail: req.adminSession!.email,
      actorRole: req.adminSession!.roles[0],
      action: 'WEBINAR_SESSION_UPDATED',
      targetType: 'WEBINAR_SESSION',
      targetId: session.id,
      summary: `Updated session ${session.id} (status: ${session.status}, capacity: ${session.capacity ?? 'unlimited'})`,
    });

    res.json({ session });
  }
);

// Admin Session Transfer
app.post(
  '/api/v1/admin/registrations/:reference/transfer',
  requireAdminPermission('registrations:write'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    try {
      const updated = bonnzaStore.transferRegistrationSession({
        registrationReference: req.params.reference,
        targetSessionId: req.body?.targetSessionId,
        actorEmail: req.adminSession!.email,
        actorRole: req.adminSession!.roles[0],
      });
      res.json({ registration: updated });
    } catch (error) {
      res.status(400).json({
        error: 'TRANSFER_ERROR',
        message: error instanceof Error ? error.message : 'Transfer failed',
      });
    }
  }
);

// Attendance CSV Preview & Commit
app.post(
  '/api/v1/admin/sessions/:sessionId/attendance/preview',
  requireAdminPermission('webinars:write'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    const preview = bonnzaStore.previewAttendanceCsv({
      sessionId: req.params.sessionId as WebinarSessionId,
      csvText: String(req.body?.csvText || ''),
    });
    res.json({ preview });
  }
);

app.post(
  '/api/v1/admin/sessions/:sessionId/attendance/commit',
  requireAdminPermission('webinars:write'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    try {
      const records = bonnzaStore.commitAttendanceRecords({
        sessionId: req.params.sessionId as WebinarSessionId,
        records: Array.isArray(req.body?.records) ? req.body.records : [],
        actorEmail: req.adminSession!.email,
        actorRole: req.adminSession!.roles[0],
      });
      res.json({ attendance: records });
    } catch (error) {
      res.status(400).json({
        error: 'ATTENDANCE_ERROR',
        message: error instanceof Error ? error.message : 'Attendance commit failed',
      });
    }
  }
);

// Trigger Reminder Job
app.post(
  '/api/v1/admin/reminders/:reminderId/trigger',
  requireAdminPermission('notifications:write'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    const state = bonnzaStore.getState();
    const job = state.reminderJobs.find((j) => j.id === req.params.reminderId);
    if (!job) {
      res.status(404).json({ error: 'NOT_FOUND', message: 'Reminder job not found.' });
      return;
    }
    const session = state.webinarSessions.find((s) => s.id === job.sessionId)!;
    const paidRegs = state.registrations.filter(
      (r) => r.sessionId === job.sessionId && r.paymentState === 'PAID_CONFIRMED'
    );

    const templateMap = {
      '24_HOURS_BEFORE': 'REMINDER_24H',
      '2_HOURS_BEFORE': 'REMINDER_2H',
      '15_MINUTES_BEFORE': 'REMINDER_15M',
      POST_SESSION_FOLLOWUP: 'POST_WEBINAR_ATTENDED_FOLLOWUP',
    } as const;

    const sessionTimeIst =
      session.instructionLocale === 'en' ? '1:00 PM to 2:30 PM IST' : '4:00 PM to 5:30 PM IST';

    let queued = 0;
    for (const reg of paidRegs) {
      const resEmail = bonnzaStore.queueTransactionalEmail({
        idempotencyKey: `reminder:${job.id}:${reg.id}`,
        templateCode: templateMap[job.reminderType],
        recipientEmail: reg.email,
        recipientName: reg.fullName,
        locale: reg.uiLocale,
        variables: {
          fullName: reg.fullName,
          registrationReference: reg.registrationReference,
          sessionTitle: session.title[reg.uiLocale],
          sessionTimeIst,
        },
        relatedEntityType: 'REMINDER_JOB',
        relatedEntityId: job.id,
      });
      if (!resEmail.duplicateIgnored) queued += 1;
    }

    job.status = 'TRIGGERED';
    job.recipientsQueued += queued;
    job.updatedAt = new Date().toISOString();
    bonnzaStore.save();

    res.json({ job, newlyQueuedCount: queued });
  }
);

// Reconciliation & Refunds
app.post(
  '/api/v1/admin/payments/reconcile',
  requireAdminPermission('payments:reconcile'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    const run = bonnzaStore.runReconciliation(
      req.adminSession!.email,
      req.adminSession!.roles[0]
    );
    res.json({ run });
  }
);

app.post(
  '/api/v1/admin/refunds',
  requireAdminPermission('refunds:initiate'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    try {
      const { orderId, reason, autoComplete } = req.body || {};
      if (!orderId || !reason || typeof reason !== 'string' || reason.trim().length < 3) {
        res.status(400).json({
          error: 'VALIDATION_ERROR',
          message: 'orderId and a clear refund reason are required.',
        });
        return;
      }
      const refund = bonnzaStore.initiateRefund({
        orderId,
        reason,
        actorEmail: req.adminSession!.email,
        actorRole: req.adminSession!.roles[0],
        autoComplete: Boolean(autoComplete),
      });
      res.status(201).json({ refund });
    } catch (error) {
      res.status(400).json({
        error: 'REFUND_ERROR',
        message: error instanceof Error ? error.message : 'Refund failed.',
      });
    }
  }
);

app.post(
  '/api/v1/admin/refunds/:refundId/approve',
  requireAdminPermission('refunds:approve'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    const state = bonnzaStore.getState();
    const refund = state.refunds.find((r) => r.id === req.params.refundId);
    if (!refund) {
      res.status(404).json({ error: 'NOT_FOUND', message: 'Refund not found.' });
      return;
    }
    const order = state.orders.find((o) => o.id === refund.orderId)!;
    const registration = state.registrations.find((r) => r.id === refund.registrationId)!;
    const payment = state.payments.find((p) => p.id === refund.paymentId)!;

    const now = new Date().toISOString();
    refund.status = 'REFUNDED';
    refund.approvedByEmail = req.adminSession!.email;
    refund.razorpayRefundId = `rfnd_rzp_${crypto.randomBytes(5).toString('hex')}`;
    refund.updatedAt = now;

    order.status = 'REFUNDED';
    order.updatedAt = now;
    payment.state = 'REFUNDED';
    payment.updatedAt = now;
    registration.paymentState = 'REFUNDED';
    registration.seatConfirmed = false;
    registration.updatedAt = now;

    const session = state.webinarSessions.find((s) => s.id === registration.sessionId);
    if (session) {
      session.confirmedPaidSeats = Math.max(0, session.confirmedPaidSeats - 1);
    }

    bonnzaStore.queueTransactionalEmail({
      idempotencyKey: `refund_completed:${refund.id}`,
      templateCode: 'REFUND_COMPLETED',
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

    bonnzaStore.recordAuditLog({
      actorUserId: req.adminSession!.userId,
      actorEmail: req.adminSession!.email,
      actorRole: req.adminSession!.roles[0],
      action: 'REFUND_APPROVED',
      targetType: 'REFUND',
      targetId: refund.id,
      summary: `Approved refund ${refund.id} for order ${order.orderNumber}`,
    });

    res.json({ refund });
  }
);

// Customer CRM & Support Tickets
app.post(
  '/api/v1/admin/customers/:customerId/notes',
  requireAdminPermission('crm:write'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    const state = bonnzaStore.getState();
    const customer = state.customers.find((c) => c.id === req.params.customerId);
    if (!customer) {
      res.status(404).json({ error: 'NOT_FOUND', message: 'Customer not found.' });
      return;
    }
    const { body, tag } = req.body || {};
    const now = new Date().toISOString();
    if (body && typeof body === 'string' && body.trim()) {
      customer.notes.unshift({
        id: `note_${Date.now()}`,
        authorEmail: req.adminSession!.email,
        body: sanitizeRichText(body),
        createdAt: now,
      });
    }
    if (tag && typeof tag === 'string' && tag.trim()) {
      const cleanTag = tag.trim().toLowerCase();
      if (!customer.tags.includes(cleanTag)) {
        customer.tags.push(cleanTag);
      }
    }
    customer.updatedAt = now;
    bonnzaStore.save();
    res.json({ customer });
  }
);

app.patch(
  '/api/v1/admin/tickets/:ticketId',
  requireAdminPermission('tickets:write'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    const state = bonnzaStore.getState();
    const ticket = state.supportTickets.find((t) => t.id === req.params.ticketId);
    if (!ticket) {
      res.status(404).json({ error: 'NOT_FOUND', message: 'Support ticket not found.' });
      return;
    }
    const { status, resolutionNotes, assignedToEmail } = req.body || {};
    if (status) ticket.status = status as SupportTicketStatus;
    if (typeof resolutionNotes === 'string') {
      ticket.resolutionNotes = sanitizeRichText(resolutionNotes);
    }
    if (typeof assignedToEmail === 'string') {
      ticket.assignedToEmail = assignedToEmail.trim();
    }
    ticket.updatedAt = new Date().toISOString();

    bonnzaStore.recordAuditLog({
      actorUserId: req.adminSession!.userId,
      actorEmail: req.adminSession!.email,
      actorRole: req.adminSession!.roles[0],
      action: 'SUPPORT_TICKET_UPDATED',
      targetType: 'SUPPORT_TICKET',
      targetId: ticket.id,
      summary: `Updated ticket ${ticket.ticketNumber} -> ${ticket.status}`,
    });

    res.json({ ticket });
  }
);

// CMS Article Editorial & Review Updates
app.patch(
  '/api/v1/admin/articles/:articleId',
  requireAdminPermission('overview:read'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    try {
      const roles = req.adminSession!.roles;
      const canWrite = hasRolePermission(roles, 'cms:write');
      const canReview = hasRolePermission(roles, 'cms:review');
      const canPublish = hasRolePermission(roles, 'cms:publish');

      if (!canWrite && !canReview && !canPublish) {
        res.status(403).json({
          error: 'FORBIDDEN_ROLE',
          message: 'Your role cannot modify editorial articles.',
        });
        return;
      }

      const locale: Locale = req.body?.locale === 'hi' ? 'hi' : 'en';
      const updated = bonnzaStore.updateArticleEditorialState({
        articleId: req.params.articleId,
        locale,
        updates: {
          title: req.body?.title,
          shortDescription: req.body?.shortDescription,
          directAnswer: req.body?.directAnswer,
          summary: req.body?.summary,
          editorialStatus: req.body?.editorialStatus as EditorialStatus | undefined,
          subjectReviewStatus: req.body?.subjectReviewStatus as SubjectReviewStatus | undefined,
          translationStatus: req.body?.translationStatus as TranslationStatus | undefined,
          reviewerName: req.body?.reviewerName,
          sourceCheckedDate: req.body?.sourceCheckedDate,
          seoTitle: req.body?.seoTitle,
          metaDescription: req.body?.metaDescription,
          changeNote: req.body?.changeNote,
        },
        actorEmail: req.adminSession!.email,
        actorRole: roles[0],
      });

      res.json({ article: updated });
    } catch (error) {
      res.status(400).json({
        error: 'CMS_UPDATE_REJECTED',
        message: error instanceof Error ? error.message : 'Could not update article.',
      });
    }
  }
);

// Page Content Blocks
app.patch(
  '/api/v1/admin/page-blocks/:blockId',
  requireAdminPermission('cms:write'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    const state = bonnzaStore.getState();
    const block = state.pageBlocks.find((b) => b.id === req.params.blockId);
    if (!block) {
      res.status(404).json({ error: 'NOT_FOUND', message: 'Page block not found.' });
      return;
    }
    if (block.isLockedBusinessRule) {
      res.status(403).json({
        error: 'LOCKED_BUSINESS_RULE',
        message:
          'This block contains protected business rules (session IDs / paise pricing) and cannot be overwritten from the CMS.',
      });
      return;
    }

    const { titleEn, titleHi, bodyEn, bodyHi, ctaLabelEn, ctaLabelHi } = req.body || {};
    if (typeof titleEn === 'string') block.title.en = sanitizeRichText(titleEn);
    if (typeof titleHi === 'string') block.title.hi = sanitizeRichText(titleHi);
    if (typeof bodyEn === 'string') block.body.en = sanitizeRichText(bodyEn);
    if (typeof bodyHi === 'string') block.body.hi = sanitizeRichText(bodyHi);
    if (block.ctaLabel) {
      if (typeof ctaLabelEn === 'string') block.ctaLabel.en = sanitizeRichText(ctaLabelEn);
      if (typeof ctaLabelHi === 'string') block.ctaLabel.hi = sanitizeRichText(ctaLabelHi);
    }
    block.updatedByEmail = req.adminSession!.email;
    block.updatedAt = new Date().toISOString();

    bonnzaStore.recordAuditLog({
      actorUserId: req.adminSession!.userId,
      actorEmail: req.adminSession!.email,
      actorRole: req.adminSession!.roles[0],
      action: 'PAGE_BLOCK_UPDATED',
      targetType: 'PAGE_BLOCK',
      targetId: block.id,
      summary: `Updated website page block ${block.pageKey}.${block.blockKey}`,
    });

    res.json({ block });
  }
);

// Email Outbox Retry / Cancel
app.post(
  '/api/v1/admin/outbox/:outboxId/action',
  requireAdminPermission('notifications:write'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    const state = bonnzaStore.getState();
    const item = state.emailOutbox.find((e) => e.id === req.params.outboxId);
    if (!item) {
      res.status(404).json({ error: 'NOT_FOUND', message: 'Outbox email not found.' });
      return;
    }
    const action = req.body?.action;
    const now = new Date().toISOString();
    if (action === 'cancel') {
      item.status = 'Cancelled';
      item.updatedAt = now;
    } else if (action === 'retry') {
      item.attempts += 1;
      const providerReady = Boolean((process.env.EMAIL_API_KEY || '').trim());
      item.status = providerReady ? 'Sent' : 'Retry scheduled';
      item.sentAt = providerReady ? now : null;
      item.updatedAt = now;
    }
    bonnzaStore.save();
    res.json({ item });
  }
);

// Launch Checklist & Feature Flags (Gate G1 & Gate G2 Enforcement)
app.patch(
  '/api/v1/admin/checklist/:itemId',
  requireAdminPermission('settings:write'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    const state = bonnzaStore.getState();
    const item = state.launchChecklist.find((i) => i.id === req.params.itemId);
    if (!item) {
      res.status(404).json({ error: 'NOT_FOUND', message: 'Checklist item not found.' });
      return;
    }
    const { isCompleted, verificationNote } = req.body || {};
    const now = new Date().toISOString();
    if (typeof isCompleted === 'boolean') {
      item.isCompleted = isCompleted;
      item.verifiedByEmail = isCompleted ? req.adminSession!.email : null;
      item.verifiedAt = isCompleted ? now : null;
    }
    if (typeof verificationNote === 'string') {
      item.verificationNote = sanitizeRichText(verificationNote);
    }

    bonnzaStore.recordAuditLog({
      actorUserId: req.adminSession!.userId,
      actorEmail: req.adminSession!.email,
      actorRole: req.adminSession!.roles[0],
      action: 'LAUNCH_CHECKLIST_UPDATED',
      targetType: 'CHECKLIST',
      targetId: item.code,
      summary: `Checklist ${item.code} marked ${item.isCompleted ? 'COMPLETED' : 'INCOMPLETE'}`,
    });

    res.json({ item });
  }
);

app.patch(
  '/api/v1/admin/feature-flags/:key',
  requireAdminPermission('settings:write'),
  (req: AuthenticatedAdminRequest, res: Response) => {
    const state = bonnzaStore.getState();
    const flag = state.featureFlags.find((f) => f.key === req.params.key);
    if (!flag) {
      res.status(404).json({ error: 'NOT_FOUND', message: 'Feature flag not found.' });
      return;
    }

    const wantEnabled = Boolean(req.body?.enabled);

    if (wantEnabled && flag.gatedBy === 'G1') {
      const g1Items = state.launchChecklist.filter((i) => i.gate === 'G1');
      const incompleteG1 = g1Items.filter((i) => !i.isCompleted);
      if (incompleteG1.length > 0) {
        res.status(400).json({
          error: 'GATE_G1_INCOMPLETE',
          message: `Cannot enable ${flag.key} until all 17 Gate G1 items are verified (${incompleteG1.length} remaining).`,
          incompleteCodes: incompleteG1.map((i) => i.code),
        });
        return;
      }
    }

    if (wantEnabled && flag.gatedBy === 'G2') {
      const g2Items = state.launchChecklist.filter((i) => i.gate === 'G2');
      const incompleteG2 = g2Items.filter((i) => !i.isCompleted);
      if (incompleteG2.length > 0) {
        res.status(400).json({
          error: 'GATE_G2_INCOMPLETE',
          message: `Cannot enable ${flag.key} until all 8 Gate G2 items are verified (${incompleteG2.length} remaining).`,
          incompleteCodes: incompleteG2.map((i) => i.code),
        });
        return;
      }
    }

    flag.enabled = wantEnabled;
    flag.updatedByEmail = req.adminSession!.email;
    flag.updatedAt = new Date().toISOString();

    bonnzaStore.recordAuditLog({
      actorUserId: req.adminSession!.userId,
      actorEmail: req.adminSession!.email,
      actorRole: req.adminSession!.roles[0],
      action: 'FEATURE_FLAG_TOGGLED',
      targetType: 'FEATURE_FLAG',
      targetId: flag.key,
      summary: `Set feature flag ${flag.key} = ${flag.enabled}`,
    });

    res.json({ flag });
  }
);

// ============================================================================
// 4. VITE DEV MIDDLEWARE / PRODUCTION STATIC ASSETS
// ============================================================================

async function startServer() {
  const portArgIndex = process.argv.indexOf('--port');
  const cliPort =
    portArgIndex !== -1 && process.argv[portArgIndex + 1]
      ? Number(process.argv[portArgIndex + 1])
      : NaN;
  const PORT = Number.isFinite(cliPort) && cliPort > 0 ? cliPort : Number(process.env.PORT || 3000);
  const distPath = path.resolve(process.cwd(), 'dist');

  if (process.env.NODE_ENV === 'production' && fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        allowedHosts: true,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bonnza full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

if (process.env.VITEST !== 'true') {
  startServer().catch((err) => {
    console.error('Failed to start Bonnza server:', err);
    process.exit(1);
  });
}
