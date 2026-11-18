import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { ArticleRecord, Locale, SeoMetadataInput } from '../domain/types';
import { BONNZA_CONFIG } from '../domain/config';
import { applySeoMetadata, buildWebinarEventSchemas, cleanCanonicalPath } from '../utilities/seo';
import { useBonnza } from '../context/BonnzaContext';
import { localizePath, stripLocalePrefix } from '../utilities/locale';
import { COURSES } from '../content/courses';
import { LEARNING_PATHS, SELLING_CHANNELS } from '../content/pathsAndChannels';
import { TOPIC_CLUSTERS, type TopicClusterDefinition } from '../content/articles';
import { WEBINAR_SESSIONS } from '../content/webinars';

interface RouteSeoDefault {
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  allowIndex?: boolean;
  ogType?: 'website' | 'article';
}

const ROUTE_SEO_DEFAULTS: Record<string, RouteSeoDefault> = {
  '/': {
    title: {
      en: 'Bonnza — Practical Ecommerce Education | Start smart. Sell online.',
      hi: 'Bonnza — अपने पहले ऑनलाइन उत्पाद बिज़नेस की स्पष्ट योजना बनाएं',
    },
    description: {
      en: 'From choosing a product to understanding costs and selling channels, Bonnza helps first-time and home-based entrepreneurs start smart online.',
      hi: 'Bonnza के साथ सीखें कि सही उत्पाद कैसे चुनें, खर्चों को कैसे समझें और ऑनलाइन बिक्री शुरू करने के लिए उपयुक्त चैनल कैसे तय करें।',
    },
  },
  '/webinars': {
    title: {
      en: 'Live Workshops & Webinars Directory | Bonnza',
      hi: 'लाइव वर्कशॉप और वेबिनार निर्देशिका | Bonnza',
    },
    description: {
      en: 'Explore Bonnza live beginner ecommerce workshops on 5 December 2026 in English (1:00 PM IST) and Hindi (4:00 PM IST).',
      hi: '5 दिसंबर 2026 को होने वाली 90-मिनट की लाइव अंग्रेज़ी और हिंदी ई-कॉमर्स वर्कशॉप चुनें।',
    },
  },
  '/webinars/first-online-business': {
    title: {
      en: 'First Online Business Live Workshop — 5 December 2026 | Bonnza',
      hi: 'लाइव शुरुआती ई-कॉमर्स वर्कशॉप — 5 दिसंबर 2026 | Bonnza',
    },
    description: {
      en: 'Choose a product direction, check unit costs and identify a suitable first selling channel in a practical 90-minute live workshop with Bonnza.',
      hi: 'Bonnza की 90-मिनट की व्यावहारिक लाइव वर्कशॉप में उत्पाद दिशा चुनें, लागत जांचें और पहला उपयुक्त बिक्री चैनल तय करें।',
    },
  },
  '/webinars/5-december-2026': {
    title: {
      en: 'Saturday, 5 December 2026 Live Ecommerce Workshop — ₹299 | Bonnza',
      hi: 'शनिवार, 5 दिसंबर 2026 लाइव ई-कॉमर्स वर्कशॉप — ₹299 | Bonnza',
    },
    description: {
      en: 'Join Shubham Chaturvedi live on Saturday, 5 December 2026 for a 90-minute hands-on workshop to choose your first product, calculate unit economics, and pick your first selling channel.',
      hi: 'शनिवार, 5 दिसंबर 2026 को शुभम चतुर्वेदी के साथ 90-मिनट की लाइव वर्कशॉप में अपने पहले ऑनलाइन उत्पाद, प्रति-ऑर्डर लागत और बिक्री चैनल की ठोस योजना बनाएं।',
    },
  },
  '/webinars/2026-12-05': {
    title: {
      en: 'Saturday, 5 December 2026 Live Ecommerce Workshop — ₹299 | Bonnza',
      hi: 'शनिवार, 5 दिसंबर 2026 लाइव ई-कॉमर्स वर्कशॉप — ₹299 | Bonnza',
    },
    description: {
      en: 'Join Shubham Chaturvedi live on Saturday, 5 December 2026 for a 90-minute hands-on workshop to choose your first product, calculate unit economics, and pick your first selling channel.',
      hi: 'शनिवार, 5 दिसंबर 2026 को शुभम चतुर्वेदी के साथ 90-मिनट की लाइव वर्कशॉप में अपने पहले ऑनलाइन उत्पाद, प्रति-ऑर्डर लागत और बिक्री चैनल की ठोस योजना बनाएं।',
    },
  },
  '/webinars/register': {
    title: {
      en: 'Workshop Registration | Bonnza',
      hi: 'वर्कशॉप पंजीकरण | Bonnza',
    },
    description: {
      en: 'Complete your registration details for the Bonnza 90-minute live beginner ecommerce workshop.',
      hi: 'Bonnza की 90-मिनट की लाइव शुरुआती ई-कॉमर्स वर्कशॉप के लिए अपना पंजीकरण पूरा करें।',
    },
    allowIndex: false,
  },
  '/webinars/payment-status': {
    title: {
      en: 'Registration & Payment Status | Bonnza',
      hi: 'पंजीकरण और भुगतान स्थिति | Bonnza',
    },
    description: {
      en: 'Check your Bonnza workshop registration status, session details, or one-time session transfer options.',
      hi: 'अपने Bonnza वर्कशॉप पंजीकरण की स्थिति, सत्र विवरण या सत्र स्थानांतरण विकल्प जांचें।',
    },
    allowIndex: false,
  },
  '/programme': {
    title: {
      en: 'Complete 10-Course Ecommerce Programme | Bonnza',
      hi: 'पूर्ण 10-कोर्स ई-कॉमर्स प्रोग्राम | Bonnza',
    },
    description: {
      en: '10 courses, 22 modules, 44 practical lessons, 12 months learning access, and 10 weeks of scheduled group support.',
      hi: '10 कोर्स, 22 मॉड्यूल, 44 पाठ, 12 महीने की एक्सेस और 10 सप्ताह का निर्धारित समूह सहयोग।',
    },
  },
  '/courses': {
    title: {
      en: 'Course Catalogue — Practical Ecommerce Curriculum | Bonnza',
      hi: 'कोर्स कैटलॉग — व्यावहारिक ई-कॉमर्स पाठ्यक्रम | Bonnza',
    },
    description: {
      en: 'Browse the complete Bonnza ecommerce course catalogue across Resell and Craft to Commerce in English and Hindi.',
      hi: 'रीसेल और क्राफ्ट टू कॉमर्स के लिए अंग्रेज़ी और हिंदी में Bonnza का संपूर्ण ई-कॉमर्स कोर्स कैटलॉग देखें।',
    },
  },
  '/ecommerce-guides': {
    title: {
      en: 'Ecommerce Guides | Bonnza',
      hi: 'ई-कॉमर्स गाइड | Bonnza',
    },
    description: {
      en: 'Practical Ecommerce Guides covering product research, unit costing, supplier evaluation, Meesho, Amazon India, Etsy, WhatsApp, Shopify, and Wix.',
      hi: 'उत्पाद चयन, प्रति ऑर्डर लागत, आपूर्तिकर्ता तुलना, Meesho, Amazon India, Etsy, WhatsApp, Shopify और Wix पर व्यावहारिक ई-कॉमर्स गाइड।',
    },
  },
  '/blog': {
    title: {
      en: 'Ecommerce Guides | Bonnza',
      hi: 'ई-कॉमर्स गाइड | Bonnza',
    },
    description: {
      en: 'Ecommerce Guides covering product research, unit costing, Meesho, Amazon India, Etsy, WhatsApp, Shopify, and Wix.',
      hi: 'उत्पाद चयन, प्रति ऑर्डर लागत, Meesho, Amazon India, Etsy, WhatsApp, Shopify और Wix पर ई-कॉमर्स गाइड।',
    },
  },
  '/resources': {
    title: {
      en: 'Interactive Order Cost Calculator & Planning Worksheets | Bonnza',
      hi: 'इंटरैक्टिव ऑर्डर लागत कैलकुलेटर और प्लानिंग वर्कशीट | Bonnza',
    },
    description: {
      en: 'Use 1. Order Cost Calculator, 2. First-Channel Worksheet, and 3. Business Starting Worksheet directly in your browser.',
      hi: 'अपने ब्राउज़र में 1. ऑर्डर लागत कैलकुलेटर, 2. पहला चैनल वर्कशीट और 3. बिज़नेस शुरुआती वर्कशीट का उपयोग करें।',
    },
  },
  '/about': {
    title: {
      en: 'About Bonnza | Practical Ecommerce Education',
      hi: 'Bonnza के बारे में | व्यावहारिक ई-कॉमर्स शिक्षा',
    },
    description: {
      en: 'Bonnza helps first-time and home-based entrepreneurs understand how to start and operate an online product business.',
      hi: 'Bonnza का उद्देश्य पहली बार और घर से ऑनलाइन उत्पाद बिज़नेस शुरू करने वालों के लिए निर्णय लेना आसान बनाना है।',
    },
  },
  '/contact': {
    title: {
      en: 'Contact & Support | Bonnza',
      hi: 'संपर्क और सहायता | Bonnza',
    },
    description: {
      en: 'Reach out to Bonnza support by email at bonnza@marketingtusk.com or phone for workshop, programme, or policy enquiries.',
      hi: 'वर्कशॉप, प्रोग्राम या नीति से जुड़े प्रश्नों के लिए Bonnza सहायता टीम से ईमेल या फ़ोन द्वारा संपर्क करें।',
    },
  },
  '/faq': {
    title: {
      en: 'Frequently Asked Questions | Bonnza',
      hi: 'सामान्य प्रश्न (FAQ) | Bonnza',
    },
    description: {
      en: 'Answers about starting without experience, English and Hindi workshop sessions, Resell vs Craft to Commerce, and programme details.',
      hi: 'Bonnza वर्कशॉप, अंग्रेज़ी/हिंदी सत्र, कोर्स उपलब्धता और रिफंड नीति से जुड़े सामान्य प्रश्न।',
    },
  },
  '/privacy': {
    title: {
      en: 'Privacy Policy | Bonnza',
      hi: 'गोपनीयता नीति | Bonnza',
    },
    description: {
      en: 'How Bonnza handles browser preferences, local planning worksheets, workshop registrations, and consent controls.',
      hi: 'Bonnza आपकी ब्राउज़र प्राथमिकताओं, इंटरैक्टिव वर्कशीट, वर्कशॉप पंजीकरण विवरण और गोपनीयता सहमति को कैसे संभालता है।',
    },
  },
  '/terms': {
    title: {
      en: 'Terms and Conditions | Bonnza',
      hi: 'नियम और शर्तें | Bonnza',
    },
    description: {
      en: 'Educational scope, transparent workshop and programme pricing, and terms of use for Bonnza.',
      hi: 'Bonnza के शैक्षिक दायरे, पारदर्शी शुल्क संरचना और शिक्षण सामग्री के उपयोग की शर्तें।',
    },
  },
  '/refund-policy': {
    title: {
      en: 'Refund, Transfer & Replay Policy | Bonnza',
      hi: 'रिफंड, ट्रांसफर व रीप्ले नीति | Bonnza',
    },
    description: {
      en: 'Clear rules for workshop cancellations, one-time session transfers, schedule updates, and session replays.',
      hi: 'वर्कशॉप रद्दीकरण, एक-बार सत्र स्थानांतरण, समय परिवर्तन और रीप्ले से जुड़े स्पष्ट नियम।',
    },
  },
};

const LEGAL_SEO_MAP: Record<string, RouteSeoDefault> = {
  privacy: ROUTE_SEO_DEFAULTS['/privacy'],
  terms: ROUTE_SEO_DEFAULTS['/terms'],
  'refund-policy': ROUTE_SEO_DEFAULTS['/refund-policy'],
  'refund-and-transfer': ROUTE_SEO_DEFAULTS['/refund-policy'],
  accessibility: {
    title: {
      en: 'Accessibility Information | Bonnza',
      hi: 'सुलभता जानकारी | Bonnza',
    },
    description: {
      en: 'Our ongoing commitment to keyboard navigation, bilingual Devanagari legibility, WCAG AA contrast, and reduced-motion support.',
      hi: 'कीबोर्ड नेविगेशन, देवनागरी पठनीयता, उच्च कंट्रास्ट और कम-गति समर्थन के प्रति हमारी प्रतिबद्धता।',
    },
  },
};

function isArticlePublishedForLocale(article: ArticleRecord, targetLocale: Locale): boolean {
  const anyArt = article as unknown as {
    locales?: Record<
      'en' | 'hi',
      { editorialStatus: string; subjectReviewStatus: string; translationStatus?: string }
    >;
  };
  if (anyArt.locales?.[targetLocale]) {
    const loc = anyArt.locales[targetLocale];
    const translationOk = targetLocale === 'hi' ? loc.translationStatus === 'APPROVED' : true;
    return loc.editorialStatus === 'PUBLISHED' && loc.subjectReviewStatus === 'VERIFIED' && translationOk;
  }
  return article.editorialStatus === 'PUBLISHED' && article.subjectReviewStatus === 'VERIFIED';
}

function isGuidesCollectionRoute(strippedPath: string): boolean {
  return (
    strippedPath === '/ecommerce-guides' ||
    strippedPath === '/blog' ||
    strippedPath.startsWith('/ecommerce-guides/cluster/') ||
    strippedPath.startsWith('/blog/cluster/')
  );
}

function buildGuidesCollectionSchemas(params: {
  locale: Locale;
  articles: ArticleRecord[];
  canonicalPath: string;
  pageTitle: string;
  pageDescription: string;
  cluster?: TopicClusterDefinition;
}): Array<Record<string, unknown>> {
  const { locale, articles, canonicalPath, pageTitle, pageDescription, cluster } = params;
  const baseUrl = BONNZA_CONFIG.siteUrl.replace(/\/$/, '');
  const cleanPath = cleanCanonicalPath(canonicalPath);
  const pageUrl = `${baseUrl}${cleanPath}`;
  const isCluster = Boolean(cluster);
  const indexBase = cleanPath.includes('/ecommerce-guides') ? '/ecommerce-guides' : '/blog';

  const publishedGuides = articles.filter((art) => {
    if (!isArticlePublishedForLocale(art, locale)) return false;
    return cluster ? art.topicCluster === cluster.id : true;
  });

  const collectionSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#collection`,
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    inLanguage: locale === 'hi' ? 'hi-IN' : 'en-IN',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Bonnza',
      url: baseUrl,
    },
    about: cluster
      ? {
          '@type': 'Thing',
          name: cluster.name[locale],
          description: cluster.description[locale],
        }
      : {
          '@type': 'Thing',
          name: locale === 'hi' ? 'ई-कॉमर्स गाइड' : 'Ecommerce Guides',
          description: pageDescription,
        },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: publishedGuides.length,
      itemListElement: publishedGuides.map((art, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${baseUrl}${localizePath(`/blog/${art.slug}`, locale)}`,
        name: art.title[locale],
        description: art.shortDescription[locale],
      })),
    },
  };

  const breadcrumbItems: Array<Record<string, unknown>> = [
    {
      '@type': 'ListItem',
      position: 1,
      name: locale === 'hi' ? 'होम' : 'Home',
      item: `${baseUrl}${localizePath('/', locale)}`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: locale === 'hi' ? 'ई-कॉमर्स गाइड' : 'Ecommerce Guides',
      item: `${baseUrl}${localizePath(indexBase, locale)}`,
    },
  ];

  if (isCluster && cluster) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: cluster.name[locale],
      item: pageUrl,
    });
  }

  const breadcrumbSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };

  return [collectionSchema, breadcrumbSchema];
}

export function resolveDynamicRouteSeo(
  pathname: string,
  locale: Locale,
  articles: ArticleRecord[]
): SeoMetadataInput {
  const clean = cleanCanonicalPath(pathname);

  if (clean.startsWith('/admin')) {
    return {
      locale: 'en',
      title: 'Operations Console | Bonnza',
      description: 'Internal Bonnza operations and webinar administration console.',
      path: clean,
      allowIndex: false,
    };
  }

  const stripped = cleanCanonicalPath(stripLocalePrefix(clean));

  // 1. Static exact route defaults
  const staticMatch = ROUTE_SEO_DEFAULTS[stripped];
  if (staticMatch) {
    const isPrivate = staticMatch.allowIndex === false;
    const canonicalPath = localizePath(stripped, locale);
    const isGuidesIndex = stripped === '/ecommerce-guides' || stripped === '/blog';

    return {
      locale,
      title: staticMatch.title[locale],
      description: staticMatch.description[locale],
      path: canonicalPath,
      alternateEnPath: isPrivate ? undefined : localizePath(stripped, 'en'),
      alternateHiPath: isPrivate ? undefined : localizePath(stripped, 'hi'),
      allowIndex: !isPrivate,
      ogType: staticMatch.ogType || 'website',
      jsonLd:
        stripped === '/webinars/first-online-business' ||
        stripped === '/webinars/5-december-2026' ||
        stripped === '/webinars/2026-12-05' ||
        stripped === '/webinars'
          ? buildWebinarEventSchemas(false)
          : isGuidesIndex
          ? buildGuidesCollectionSchemas({
              locale,
              articles,
              canonicalPath,
              pageTitle: staticMatch.title[locale],
              pageDescription: staticMatch.description[locale],
            })
          : undefined,
    };
  }

  // 2. Dynamic Course Detail: /courses/:courseSlug
  if (stripped.startsWith('/courses/')) {
    const courseSlug = stripped.replace('/courses/', '');
    const course = COURSES.find((c) => c.slug === courseSlug);
    if (course) {
      return {
        locale,
        title: `${course.title[locale]} | Bonnza`,
        description: course.outcome[locale],
        path: localizePath(`/courses/${course.slug}`, locale),
        alternateEnPath: `/en/courses/${course.slug}`,
        alternateHiPath: `/hi/courses/${course.slug}`,
        allowIndex: true,
        ogType: 'website',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: course.title[locale],
          description: course.outcome[locale],
          provider: {
            '@type': 'Organization',
            name: 'Bonnza',
          },
        },
      };
    }
  }

  // 3. Dynamic Topic Cluster Guides Index: /blog/cluster/:clusterSlug or /ecommerce-guides/cluster/:clusterSlug
  if (
    stripped.startsWith('/blog/cluster/') ||
    stripped.startsWith('/ecommerce-guides/cluster/')
  ) {
    const basePrefix = stripped.startsWith('/ecommerce-guides/cluster/')
      ? '/ecommerce-guides/cluster/'
      : '/blog/cluster/';
    const clusterSlug = stripped.replace(basePrefix, '');
    const cluster = TOPIC_CLUSTERS.find((c) => c.id === clusterSlug);
    if (cluster) {
      const canonicalPath = localizePath(`${basePrefix}${cluster.id}`, locale);
      const pageTitle = `${cluster.name[locale]} — ${locale === 'hi' ? 'ई-कॉमर्स गाइड' : 'Ecommerce Guides'} | Bonnza`;
      const pageDescription =
        locale === 'hi'
          ? `${cluster.name.hi} से जुड़े व्यावहारिक ई-कॉमर्स गाइड और लागत उदाहरण पढ़ें।`
          : `Practical ecommerce guides and real order examples covering ${cluster.name.en}.`;

      return {
        locale,
        title: pageTitle,
        description: pageDescription,
        path: canonicalPath,
        alternateEnPath: `/en${basePrefix}${cluster.id}`,
        alternateHiPath: `/hi${basePrefix}${cluster.id}`,
        allowIndex: true,
        ogType: 'website',
        jsonLd: buildGuidesCollectionSchemas({
          locale,
          articles,
          canonicalPath,
          pageTitle,
          pageDescription,
          cluster,
        }),
      };
    }
  }

  // 4. Dynamic Blog Article: /blog/:slug
  if (stripped.startsWith('/blog/')) {
    const slug = stripped.replace('/blog/', '');
    const article = articles.find((a) => a.slug === slug || a.hiSlug === slug);
    if (article) {
      const isEnPublished = isArticlePublishedForLocale(article, 'en');
      const isHiPublished = isArticlePublishedForLocale(article, 'hi');
      const isPublishedForLocale = locale === 'hi' ? isHiPublished : isEnPublished;

      const schemas: Array<Record<string, unknown>> = [
        {
          '@context': 'https://schema.org',
          '@type': article.schemaType,
          headline: article.title[locale],
          description: article.metaDescription[locale],
          inLanguage: locale === 'hi' ? 'hi-IN' : 'en-IN',
          author: {
            '@type': 'Organization',
            name: article.author[locale],
          },
          publisher: {
            '@type': 'Organization',
            name: 'Bonnza',
          },
        },
      ];

      if (article.faqEntries.length > 0 && isPublishedForLocale) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: article.faqEntries.map((f) => ({
            '@type': 'Question',
            name: f.question[locale],
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer[locale],
            },
          })),
        });
      }

      return {
        locale,
        title: isPublishedForLocale ? article.seoTitle[locale] : `${article.title[locale]} | Bonnza`,
        description: article.metaDescription[locale],
        path: localizePath(`/blog/${article.slug}`, locale),
        alternateEnPath: isEnPublished ? `/en/blog/${article.slug}` : undefined,
        alternateHiPath: isHiPublished ? `/hi/blog/${article.slug}` : undefined,
        allowIndex: isPublishedForLocale,
        ogType: 'article',
        jsonLd: isPublishedForLocale ? schemas : undefined,
      };
    }
  }

  // 5. Dynamic Selling Channel Guide: /learn/:channelSlug
  if (stripped.startsWith('/learn/')) {
    const channelSlug = stripped.replace('/learn/', '');
    const channel = SELLING_CHANNELS.find((ch) => ch.slug === channelSlug);
    if (channel) {
      return {
        locale,
        title: `${channel.name[locale]} — ${locale === 'hi' ? 'चैनल गाइड' : 'Channel Learning Guide'} | Bonnza`,
        description: channel.learningPurpose[locale],
        path: localizePath(`/learn/${channel.slug}`, locale),
        alternateEnPath: `/en/learn/${channel.slug}`,
        alternateHiPath: `/hi/learn/${channel.slug}`,
        allowIndex: true,
        ogType: 'website',
      };
    }
  }

  // 6. Dynamic Learning Path: /learning-paths/:pathSlug or /paths/:pathSlug
  if (stripped.startsWith('/learning-paths/') || stripped.startsWith('/paths/')) {
    const pathSlug = stripped.replace(/^\/(learning-paths|paths)\//, '');
    const pathRecord = LEARNING_PATHS.find((p) => p.slug === pathSlug) || LEARNING_PATHS[0];
    return {
      locale,
      title: `${pathRecord.title[locale]} | Bonnza`,
      description: pathRecord.subtitle[locale],
      path: localizePath(`/learning-paths/${pathRecord.slug}`, locale),
      alternateEnPath: `/en/learning-paths/${pathRecord.slug}`,
      alternateHiPath: `/hi/learning-paths/${pathRecord.slug}`,
      allowIndex: true,
    };
  }

  // 7. Dynamic Webinar Session: /webinars/session/:sessionId
  if (stripped.startsWith('/webinars/session/')) {
    const sessionId = stripped.replace('/webinars/session/', '');
    const session = WEBINAR_SESSIONS.find((s) => s.id === sessionId);
    if (session) {
      const sessionTimeLabel =
        session.instructionLocale === 'hi' ? '4:00 PM IST' : '1:00 PM IST';
      return {
        locale,
        title: `${session.title[locale]} (${sessionTimeLabel}) | Bonnza`,
        description: ROUTE_SEO_DEFAULTS['/webinars/first-online-business'].description[locale],
        path: localizePath(`/webinars/session/${session.id}`, locale),
        alternateEnPath: `/en/webinars/session/${session.id}`,
        alternateHiPath: `/hi/webinars/session/${session.id}`,
        allowIndex: true,
        jsonLd: buildWebinarEventSchemas(false),
      };
    }
  }

  // 8. Dynamic Legal Route: /legal/:policySlug
  if (stripped.startsWith('/legal/')) {
    const policySlug = stripped.replace('/legal/', '');
    const legalMatch = LEGAL_SEO_MAP[policySlug] || LEGAL_SEO_MAP.privacy;
    const canonicalSubpath =
      policySlug === 'privacy'
        ? '/privacy'
        : policySlug === 'terms'
        ? '/terms'
        : policySlug === 'refund-and-transfer' || policySlug === 'refund-policy'
        ? '/refund-policy'
        : `/legal/${policySlug}`;

    return {
      locale,
      title: legalMatch.title[locale],
      description: legalMatch.description[locale],
      path: localizePath(canonicalSubpath, locale),
      alternateEnPath: `/en${canonicalSubpath}`,
      alternateHiPath: `/hi${canonicalSubpath}`,
      allowIndex: true,
    };
  }

  // 9. Unknown / Not Found fallback
  return {
    locale,
    title:
      locale === 'hi'
        ? 'Bonnza — व्यावहारिक ई-कॉमर्स शिक्षा'
        : 'Bonnza — Practical Ecommerce Education',
    description:
      locale === 'hi'
        ? 'पहली बार और घर से ऑनलाइन उत्पाद बिज़नेस शुरू करने वालों के लिए व्यावहारिक ई-कॉमर्स शिक्षा।'
        : 'Practical ecommerce education for first-time and home-based entrepreneurs in India.',
    path: clean,
    alternateEnPath: undefined,
    alternateHiPath: undefined,
    allowIndex: false,
  };
}

let lastExplicitKey = '';

/**
 * Dynamically resolves route metadata (fetching remote CMS updates when needed)
 * and injects document <title>, <meta name="description">, OpenGraph/Twitter tags,
 * canonical URL, reciprocal hreflang alternates, robots policy, and JSON-LD
 * into document.head based on the current route data and active locale.
 */
export function useRouteSeo(explicitInput?: SeoMetadataInput): void {
  const location = useLocation();
  const { locale, liveArticles } = useBonnza();
  const [fetchedArticles, setFetchedArticles] = useState<ArticleRecord[] | null>(null);

  const activeArticles = fetchedArticles && fetchedArticles.length > 0 ? fetchedArticles : liveArticles;

  // Dynamic remote fetch fallback if navigating to a blog article route not yet in local state
  useEffect(() => {
    if (explicitInput) return;

    const stripped = cleanCanonicalPath(stripLocalePrefix(cleanCanonicalPath(location.pathname)));
    if (!stripped.startsWith('/blog/') || stripped.startsWith('/blog/cluster/')) {
      return;
    }

    const slug = stripped.replace('/blog/', '');
    const alreadyPresent = activeArticles.some((a) => a.slug === slug || a.hiSlug === slug);
    if (alreadyPresent) return;

    let cancelled = false;
    fetch('/api/v1/public/bootstrap')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && Array.isArray(data.articles)) {
          setFetchedArticles(data.articles);
        }
      })
      .catch(() => {
        // Ignore network errors and rely on local dataset
      });

    return () => {
      cancelled = true;
    };
  }, [location.pathname, explicitInput, activeArticles]);

  useEffect(() => {
    const currentKey = `${location.pathname}::${explicitInput?.locale || locale}`;

    if (explicitInput) {
      lastExplicitKey = currentKey;
      const stripped = cleanCanonicalPath(stripLocalePrefix(cleanCanonicalPath(location.pathname)));
      if (isGuidesCollectionRoute(stripped)) {
        const dynamicGuidesSeo = resolveDynamicRouteSeo(
          location.pathname,
          explicitInput.locale || locale,
          activeArticles
        );
        applySeoMetadata({
          ...dynamicGuidesSeo,
          ...explicitInput,
          path: cleanCanonicalPath(explicitInput.path || dynamicGuidesSeo.path),
          alternateEnPath: explicitInput.alternateEnPath ?? dynamicGuidesSeo.alternateEnPath,
          alternateHiPath: explicitInput.alternateHiPath ?? dynamicGuidesSeo.alternateHiPath,
          jsonLd: explicitInput.jsonLd ?? dynamicGuidesSeo.jsonLd,
        });
      } else {
        applySeoMetadata(explicitInput);
      }
      return () => {
        if (lastExplicitKey === currentKey) {
          lastExplicitKey = '';
        }
      };
    }

    const handle = window.requestAnimationFrame(() => {
      if (lastExplicitKey !== currentKey) {
        applySeoMetadata(resolveDynamicRouteSeo(location.pathname, locale, activeArticles));
      }
    });

    return () => window.cancelAnimationFrame(handle);
  }, [
    location.pathname,
    locale,
    activeArticles,
    explicitInput?.locale,
    explicitInput?.title,
    explicitInput?.description,
    explicitInput?.path,
    explicitInput?.alternateEnPath,
    explicitInput?.alternateHiPath,
    explicitInput?.allowIndex,
    explicitInput?.ogType,
    explicitInput?.jsonLd,
  ]);
}
