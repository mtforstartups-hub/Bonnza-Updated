import type { ArticleRecord, TopicClusterId } from '../domain/types';
import { ARTICLES_PART_1 } from './articlesPart1';
import { ARTICLES_PART_2 } from './articlesPart2';

export const ARTICLES: ArticleRecord[] = [...ARTICLES_PART_1, ...ARTICLES_PART_2];

export interface TopicClusterDefinition {
  id: TopicClusterId;
  name: { en: string; hi: string };
  description: { en: string; hi: string };
  courseSlug: string;
}

export const TOPIC_CLUSTERS: TopicClusterDefinition[] = [
  {
    id: 'business-foundations',
    name: { en: 'Business Foundations', hi: 'बिज़नेस फ़ाउंडेशन' },
    description: {
      en: 'Buyer selection, cost calculations, and choosing a practical first channel.',
      hi: 'खरीदार चयन, लागत गणना और पहला व्यावहारिक चैनल चुनना।',
    },
    courseSlug: 'business-foundations',
  },
  {
    id: 'resell',
    name: { en: 'Resell', hi: 'रीसेल' },
    description: {
      en: 'Supplier comparisons, sample inspection, and cash-capped initial stock.',
      hi: 'आपूर्तिकर्ता तुलना, सैंपल निरीक्षण और नकद-सीमित पहला स्टॉक।',
    },
    courseSlug: 'resell-source-to-sell',
  },
  {
    id: 'craft-to-commerce',
    name: { en: 'Craft to Commerce', hi: 'क्राफ्ट टू कॉमर्स' },
    description: {
      en: 'Labour costing, weekly capacity, provenance, and artist-sourced attribution.',
      hi: 'श्रम लागत, साप्ताहिक क्षमता, स्रोत प्रमाण और निर्माता श्रेय।',
    },
    courseSlug: 'craft-to-commerce',
  },
  {
    id: 'social-media-and-whatsapp',
    name: { en: 'Social Media and WhatsApp', hi: 'सोशल मीडिया और WhatsApp' },
    description: {
      en: 'Buyer-question product posts, order confirmation flow, and bank payment checks.',
      hi: 'खरीदार-प्रश्न पोस्ट, ऑर्डर पुष्टि प्रक्रिया और बैंक भुगतान जांच।',
    },
    courseSlug: 'social-media-and-whatsapp',
  },
  {
    id: 'meesho',
    name: { en: 'Meesho', hi: 'Meesho' },
    description: {
      en: 'Seller route eligibility and pre-publish catalogue consistency checks.',
      hi: 'विक्रेता मार्ग पात्रता और प्रकाशन-पूर्व कैटलॉग संगति जांच।',
    },
    courseSlug: 'meesho-selling',
  },
  {
    id: 'amazon-india',
    name: { en: 'Amazon India', hi: 'Amazon India' },
    description: {
      en: 'Existing ASIN match rules vs new detail pages and identifier readiness.',
      hi: 'मौजूदा ASIN मिलान बनाम नया विवरण पृष्ठ और पहचान कोड।',
    },
    courseSlug: 'amazon-india-selling',
  },
  {
    id: 'shopify-and-wix',
    name: { en: 'Shopify and Wix', hi: 'Shopify और Wix' },
    description: {
      en: 'Owned-store platform comparison and six-case pre-launch checkout testing.',
      hi: 'अपनी वेबसाइट तुलना और लॉन्च-पूर्व 6-चरणीय चेकआउट परीक्षण।',
    },
    courseSlug: 'own-store-shopify-and-wix',
  },
  {
    id: 'etsy',
    name: { en: 'Etsy', hi: 'Etsy' },
    description: {
      en: 'Item/maker eligibility checks and dated India shop readiness.',
      hi: 'उत्पाद व भूमिका पात्रता और दिनांकित भारत शॉप तैयारी।',
    },
    courseSlug: 'etsy-selling',
  },
  {
    id: 'amazon-global',
    name: { en: 'Amazon Global', hi: 'Amazon Global' },
    description: {
      en: 'One-market export scoping and international return-logistics risk.',
      hi: 'एक-बाज़ार निर्यात योजना और अंतर्राष्ट्रीय रिटर्न-लॉजिस्टिक्स जोखिम।',
    },
    courseSlug: 'amazon-global-selling',
  },
  {
    id: 'operations-and-growth',
    name: { en: 'Operations and Growth', hi: 'ऑपरेशंस और ग्रोथ' },
    description: {
      en: 'Weekly sales/settlement/cash reconciliation and measured listing improvements.',
      hi: 'साप्ताहिक बिक्री/सेटलमेंट/नकद मिलान और मापे हुए लिस्टिंग सुधार।',
    },
    courseSlug: 'operations-and-growth',
  },
];

export function getPublishedArticles(): ArticleRecord[] {
  return ARTICLES.filter((a) => a.editorialStatus === 'PUBLISHED');
}

export function getArticleBySlug(slug: string): ArticleRecord | undefined {
  return ARTICLES.find((a) => a.slug === slug || a.hiSlug === slug);
}

export function getArticleById(id: string): ArticleRecord | undefined {
  return ARTICLES.find((a) => a.id === id);
}
