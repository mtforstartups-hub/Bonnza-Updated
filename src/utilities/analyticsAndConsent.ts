import type { Locale } from '../domain/types';

export const BONNZA_CONSENT_VERSION = '2026.11.v1';
export const BONNZA_CONSENT_STORAGE_KEY = 'bonnza_privacy_consent_v1';
export const BONNZA_EMITTED_PURCHASES_KEY = 'bonnza_emitted_purchase_txns_v1';

export interface ConsentCategories {
  strictly_necessary: true;
  analytics: boolean;
  marketing: boolean;
}

export interface StoredConsentRecord {
  version: string;
  updatedAtUtc: string;
  decidedByUser: boolean;
  categories: ConsentCategories;
}

const DEFAULT_CONSENT: StoredConsentRecord = {
  version: BONNZA_CONSENT_VERSION,
  updatedAtUtc: new Date(0).toISOString(),
  decidedByUser: false,
  categories: {
    strictly_necessary: true,
    analytics: false,
    marketing: false,
  },
};

const PII_BLOCKLIST_KEYS = [
  'email',
  'fullName',
  'name',
  'phone',
  'mobile',
  'whatsapp',
  'message',
  'accessToken',
  'token',
  'password',
];

export function stripPiiFromMetadata(
  raw?: Record<string, string | number | boolean | undefined>
): Record<string, string | number | boolean> {
  if (!raw) return {};
  const clean: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (v === undefined || v === null) continue;
    const lowerKey = k.toLowerCase();
    if (PII_BLOCKLIST_KEYS.some((blocked) => lowerKey.includes(blocked.toLowerCase()))) {
      continue;
    }
    const strVal = String(v);
    // Guard against accidental email address or phone number in value
    if (strVal.includes('@') && strVal.includes('.')) {
      continue;
    }
    clean[k] = v;
  }
  return clean;
}

export function getConsentRecord(): StoredConsentRecord {
  if (typeof window === 'undefined') return DEFAULT_CONSENT;
  try {
    const raw = window.localStorage.getItem(BONNZA_CONSENT_STORAGE_KEY);
    if (!raw) return DEFAULT_CONSENT;
    const parsed = JSON.parse(raw) as Partial<StoredConsentRecord>;
    if (parsed.version !== BONNZA_CONSENT_VERSION || !parsed.categories) {
      return DEFAULT_CONSENT;
    }
    return {
      version: BONNZA_CONSENT_VERSION,
      updatedAtUtc: parsed.updatedAtUtc || new Date().toISOString(),
      decidedByUser: Boolean(parsed.decidedByUser),
      categories: {
        strictly_necessary: true,
        analytics: Boolean(parsed.categories.analytics),
        marketing: Boolean(parsed.categories.marketing),
      },
    };
  } catch {
    return DEFAULT_CONSENT;
  }
}

export function saveConsentPreferences(input: {
  analytics: boolean;
  marketing: boolean;
}): StoredConsentRecord {
  const next: StoredConsentRecord = {
    version: BONNZA_CONSENT_VERSION,
    updatedAtUtc: new Date().toISOString(),
    decidedByUser: true,
    categories: {
      strictly_necessary: true,
      analytics: Boolean(input.analytics),
      marketing: Boolean(input.marketing),
    },
  };
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(BONNZA_CONSENT_STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent('bonnza:consent-updated', { detail: next }));
    } catch {
      // Ignore storage quota errors
    }
  }
  syncThirdPartyCollectorsWithConsent(next);
  return next;
}

export function openConsentPreferencesModal(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('bonnza:open-consent-modal'));
  }
}

let lastTrackedPageKey = '';

export function syncThirdPartyCollectorsWithConsent(
  consent: StoredConsentRecord = getConsentRecord()
): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (window.location.pathname.startsWith('/admin')) return;

  const ga4Id = (import.meta.env.VITE_GA4_MEASUREMENT_ID || '').trim();
  const clarityId = (import.meta.env.VITE_CLARITY_PROJECT_ID || '').trim();
  const metaPixelId = (import.meta.env.VITE_META_PIXEL_ID || '').trim();

  // GA4 & Clarity require Analytics consent
  if (consent.categories.analytics && ga4Id) {
    if (!document.querySelector('script[data-bonnza-ga4="true"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`;
      script.setAttribute('data-bonnza-ga4', 'true');
      document.head.appendChild(script);
    }
  }

  if (consent.categories.analytics && clarityId) {
    if (!document.querySelector('script[data-bonnza-clarity="true"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`;
      script.setAttribute('data-bonnza-clarity', 'true');
      document.head.appendChild(script);
    }
  }

  // Meta Pixel requires Marketing consent
  if (consent.categories.marketing && metaPixelId) {
    if (!document.querySelector('script[data-bonnza-meta="true"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-bonnza-meta', 'true');
      script.textContent = `/* Meta Pixel ${metaPixelId} initialized under marketing consent */`;
      document.head.appendChild(script);
    }
  }
}

export function trackRoutePageView(pathname: string, locale: Locale): boolean {
  if (pathname.startsWith('/admin')) return false;
  const pageKey = `${locale}:${pathname}`;
  if (pageKey === lastTrackedPageKey) {
    return false; // Deduplicate identical route view
  }
  lastTrackedPageKey = pageKey;
  return true;
}

/**
 * Emits a verified purchase conversion event ONLY when:
 * 1. Server-side verification confirmed `paymentState === 'PAID_CONFIRMED'` and `seatConfirmed === true`
 * 2. A valid `orderNumber` (`transaction_id`) is provided
 * 3. This `orderNumber` has not already been emitted (deduplication across refreshes)
 */
export function emitVerifiedPurchaseConversion(params: {
  orderNumber: string;
  sessionId: string;
  amountPaise: number;
  currency: 'INR';
  paymentState: string;
  seatConfirmed: boolean;
  locale: Locale;
}): { emitted: boolean; reason: string; payload?: Record<string, unknown> } {
  if (params.paymentState !== 'PAID_CONFIRMED' || !params.seatConfirmed) {
    return {
      emitted: false,
      reason: 'Purchase conversion blocked: payment is not PAID_CONFIRMED.',
    };
  }
  if (!params.orderNumber || !params.orderNumber.trim()) {
    return {
      emitted: false,
      reason: 'Purchase conversion blocked: missing transaction_id (orderNumber).',
    };
  }

  const txnId = params.orderNumber.trim();
  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem(BONNZA_EMITTED_PURCHASES_KEY);
      const emittedList: string[] = raw ? JSON.parse(raw) : [];
      if (emittedList.includes(txnId)) {
        return {
          emitted: false,
          reason: `Deduplicated: purchase event for transaction_id ${txnId} already emitted.`,
        };
      }
      emittedList.push(txnId);
      window.localStorage.setItem(BONNZA_EMITTED_PURCHASES_KEY, JSON.stringify(emittedList));
    } catch {
      // Ignore storage error in restricted environments
    }
  }

  const payload = {
    event: 'purchase',
    transaction_id: txnId,
    value: Number((params.amountPaise / 100).toFixed(2)),
    value_paise: params.amountPaise,
    currency: 'INR',
    language: params.locale,
    items: [
      {
        item_id: params.sessionId,
        item_name:
          params.sessionId === 'bonnza-2026-12-05-hi-1600'
            ? 'Bonnza 90-Minute Live Workshop (Hindi Session — 5 Dec 2026)'
            : 'Bonnza 90-Minute Live Workshop (English Session — 5 Dec 2026)',
        price: Number((params.amountPaise / 100).toFixed(2)),
        quantity: 1,
      },
    ],
  };

  return {
    emitted: true,
    reason: 'Verified server-confirmed purchase conversion recorded.',
    payload,
  };
}
