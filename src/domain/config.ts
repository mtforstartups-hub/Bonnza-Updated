export const BONNZA_CONFIG = {
  brandName: 'BONNZA',
  taglineEn: 'Start smart. Sell online.',
  taglineHi: 'स्मार्ट शुरुआत करें। ऑनलाइन बेचें।',
  siteUrl:
    (typeof import.meta !== 'undefined' &&
      import.meta.env?.VITE_PUBLIC_SITE_URL) ||
    'https://bonnza.marketingtusk.com',
  // Public search indexing enabled by default unless explicitly disabled via env
  publicIndexingEnabled:
    (typeof import.meta !== 'undefined' &&
      import.meta.env?.VITE_PUBLIC_INDEXING_ENABLED) !== 'false',
  contact: {
    email: 'bonnza@marketingtusk.com',
    phoneDisplay: '+91 8920-382016',
    phoneHref: 'tel:+918920382016',
  },
  pricing: {
    webinarTicketInr: 299,
    bundleProvisionalInr: 6999,
    standaloneCourseProvisionalInr: 2499,
  },
  programmeTotals: {
    courses: 10,
    modules: 22,
    lessons: 44,
    recordedAccessMonths: 12,
    groupSupportWeeks: 10,
  },
  presenterName: 'Shubham Chaturvedi',
  paymentProviderName: 'Razorpay',
  razorpayCheckoutUrl:
    (typeof import.meta !== 'undefined' &&
      import.meta.env?.VITE_RAZORPAY_CHECKOUT_URL?.trim()) ||
    '',
  checkoutOperational: false, // Controlled by server-side checkout feature flag
  analyticsConsentGranted: false, // Do not load third-party scripts before user consent
} as const;
