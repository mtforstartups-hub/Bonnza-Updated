import { BONNZA_CONFIG } from '../domain/config';
import type { Locale, SeoMetadataInput } from '../domain/types';

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) {
      el.setAttribute('hreflang', hreflang);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function cleanCanonicalPath(rawPath: string): string {
  const withoutHash = rawPath.split('#')[0] || '/';
  const withoutQuery = withoutHash.split('?')[0] || '/';
  const prefixed = withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`;
  if (prefixed.length > 1 && prefixed.endsWith('/')) {
    return prefixed.replace(/\/+$/, '');
  }
  return prefixed;
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bonnza',
    url: BONNZA_CONFIG.siteUrl,
    description:
      'Practical ecommerce education for first-time and home-based entrepreneurs in India.',
    email: BONNZA_CONFIG.contact.email,
    telephone: BONNZA_CONFIG.contact.phoneDisplay,
    contactPoint: {
      '@type': 'ContactPoint',
      email: BONNZA_CONFIG.contact.email,
      telephone: BONNZA_CONFIG.contact.phoneDisplay,
      contactType: 'customer support',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  };
}

export function buildWebSiteSchema(locale: Locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bonnza',
    url: BONNZA_CONFIG.siteUrl,
    inLanguage: locale === 'hi' ? 'hi-IN' : 'en-IN',
    description:
      locale === 'hi'
        ? 'भारत के नए और घर-आधारित उद्यमियों के लिए व्यावहारिक ई-कॉमर्स शिक्षा।'
        : 'Practical ecommerce education for first-time and home-based entrepreneurs in India.',
  };
}

export function buildWebinarEventSchemas(checkoutEnabled: boolean = false) {
  const baseUrl = BONNZA_CONFIG.siteUrl.replace(/\/$/, '');
  const availability = checkoutEnabled
    ? 'https://schema.org/InStock'
    : 'https://schema.org/PreOrder';

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'EducationEvent',
      name: 'Launch Your First Online Business in 2026: From Zero to First Order (English Session)',
      description:
        '90-minute live online workshop covering the Resell Path, Craft to Commerce Path, Indian selling channels, and first-order unit economics.',
      startDate: '2026-12-05T13:00:00+05:30',
      endDate: '2026-12-05T14:30:00+05:30',
      duration: 'PT90M',
      inLanguage: 'en-IN',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      location: {
        '@type': 'VirtualLocation',
        url: `${baseUrl}/en/webinars/first-online-business`,
      },
      organizer: {
        '@type': 'Organization',
        name: 'Bonnza',
        url: baseUrl,
      },
      performer: {
        '@type': 'Organization',
        name: 'Bonnza Ecommerce Faculty',
      },
      offers: {
        '@type': 'Offer',
        price: '299',
        priceCurrency: 'INR',
        availability,
        validFrom: '2026-11-01T00:00:00+05:30',
        url: `${baseUrl}/en/webinars/register?session=bonnza-2026-12-05-en-1300`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'EducationEvent',
      name: '2026 में अपना पहला ऑनलाइन बिज़नेस शुरू करें: शून्य से पहले ऑर्डर तक (हिंदी सत्र)',
      description:
        '90-मिनट की लाइव ऑनलाइन कार्यशाला: रीसेल पथ, क्राफ्ट टू कॉमर्स पथ, भारतीय ई-कॉमर्स चैनल और प्रति-ऑर्डर मार्जिन गणना।',
      startDate: '2026-12-05T16:00:00+05:30',
      endDate: '2026-12-05T17:30:00+05:30',
      duration: 'PT90M',
      inLanguage: 'hi-IN',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      location: {
        '@type': 'VirtualLocation',
        url: `${baseUrl}/hi/webinars/first-online-business`,
      },
      organizer: {
        '@type': 'Organization',
        name: 'Bonnza',
        url: baseUrl,
      },
      performer: {
        '@type': 'Organization',
        name: 'Bonnza ई-कॉमर्स संकाय',
      },
      offers: {
        '@type': 'Offer',
        price: '299',
        priceCurrency: 'INR',
        availability,
        validFrom: '2026-11-01T00:00:00+05:30',
        url: `${baseUrl}/hi/webinars/register?session=bonnza-2026-12-05-hi-1600`,
      },
    },
  ];
}

export function applySeoMetadata(input: SeoMetadataInput): void {
  if (typeof document === 'undefined') return;

  document.documentElement.lang = input.locale;
  document.title = input.title;

  const baseUrl = BONNZA_CONFIG.siteUrl.replace(/\/$/, '');
  const cleanPath = cleanCanonicalPath(input.path);
  const canonicalHref = `${baseUrl}${cleanPath}`;

  const shouldIndex = BONNZA_CONFIG.publicIndexingEnabled && input.allowIndex !== false;
  const robotsValue = shouldIndex ? 'index, follow' : 'noindex, nofollow';

  upsertMeta('meta[name="description"]', 'name', 'description', input.description);
  upsertMeta('meta[name="robots"]', 'name', 'robots', robotsValue);
  upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', BONNZA_CONFIG.brandName);
  upsertMeta('meta[property="og:type"]', 'property', 'og:type', input.ogType || 'website');
  upsertMeta('meta[property="og:title"]', 'property', 'og:title', input.title);
  upsertMeta('meta[property="og:description"]', 'property', 'og:description', input.description);
  upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalHref);
  upsertMeta(
    'meta[property="og:locale"]',
    'property',
    'og:locale',
    input.locale === 'hi' ? 'hi_IN' : 'en_IN'
  );
  upsertMeta(
    'meta[property="og:locale:alternate"]',
    'property',
    'og:locale:alternate',
    input.locale === 'hi' ? 'en_IN' : 'hi_IN'
  );
  upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', input.title);
  upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', input.description);

  // Optional Search Console & Bing Webmaster verification tokens if configured
  const gscToken = (import.meta.env.VITE_GSC_VERIFICATION_TOKEN || '').trim();
  if (gscToken) {
    upsertMeta('meta[name="google-site-verification"]', 'name', 'google-site-verification', gscToken);
  }
  const bingToken = (import.meta.env.VITE_BING_VERIFICATION_TOKEN || '').trim();
  if (bingToken) {
    upsertMeta('meta[name="msvalidate.01"]', 'name', 'msvalidate.01', bingToken);
  }

  upsertLink('canonical', canonicalHref);

  // Clear previous alternate hreflang links first so unpublished translations never leak
  const oldHreflang = document.head.querySelectorAll('link[rel="alternate"][hreflang]');
  oldHreflang.forEach((node) => node.remove());

  if (shouldIndex) {
    if (input.alternateEnPath) {
      const enClean = cleanCanonicalPath(input.alternateEnPath);
      upsertLink('alternate', `${baseUrl}${enClean}`, 'en-IN');
      upsertLink('alternate', `${baseUrl}${enClean}`, 'x-default');
    }
    if (input.alternateHiPath) {
      const hiClean = cleanCanonicalPath(input.alternateHiPath);
      upsertLink('alternate', `${baseUrl}${hiClean}`, 'hi-IN');
    }
  }

  // Replace dynamic JSON-LD script
  const existingJsonLd = document.head.querySelectorAll('script[data-bonnza-jsonld="true"]');
  existingJsonLd.forEach((node) => node.remove());

  const schemas: Array<Record<string, unknown>> = [
    buildOrganizationSchema(),
    buildWebSiteSchema(input.locale),
  ];
  if (input.jsonLd) {
    if (Array.isArray(input.jsonLd)) {
      schemas.push(...input.jsonLd);
    } else {
      schemas.push(input.jsonLd);
    }
  }

  schemas.forEach((schemaObj) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-bonnza-jsonld', 'true');
    script.textContent = JSON.stringify(schemaObj);
    document.head.appendChild(script);
  });
}
