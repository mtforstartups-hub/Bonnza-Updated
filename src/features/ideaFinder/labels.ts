import type { Locale } from '../../domain/types';
import { IDEA_FINDER_DATASET } from './data';
import {
  HI_CAPITAL_DEFINITIONS,
  HI_CATEGORIES,
  HI_DEPARTMENTS,
  HI_GENERAL_STRINGS,
  HI_IDEAS,
  HI_QUIZ_QUESTIONS,
  HI_SOURCES,
  HI_SUBCATEGORIES,
  HI_SUBCATEGORY_NOTES,
} from './hiCatalog';
import type {
  BusinessModelKey,
  CapitalOrientation,
  CategoryRecord,
  ChannelResearchTag,
  DepartmentRecord,
  FitLabel,
  OperatingComplexity,
  OperatingTag,
  QuizQuestionRecord,
  SkillTag,
  SourceReferenceRecord,
  StarterIdeaRecord,
  StorageProfile,
  SubcategoryRecord,
  TimeProfile,
} from './types';

export const BUSINESS_MODEL_LABELS: Record<BusinessModelKey, string> = {
  source_and_sell_own_account: 'Source & sell (own seller account)',
  make_own_product: 'Make your own products',
  personalise_to_order: 'Personalise to order',
  original_digital_product: 'Original digital product',
  authorised_licence_resale: 'Authorised licence resale',
};

const HI_BUSINESS_MODEL_LABELS: Record<BusinessModelKey, string> = {
  source_and_sell_own_account: 'सोर्स और सेल (अपने सेलर अकाउंट से)',
  make_own_product: 'अपने उत्पाद स्वयं बनाएँ',
  personalise_to_order: 'ऑर्डर पर पर्सनलाइज़ करें',
  original_digital_product: 'मूल डिजिटल उत्पाद',
  authorised_licence_resale: 'अधिकृत लाइसेंस रीसेल',
};

export function getBusinessModelLabel(
  key: BusinessModelKey,
  locale: Locale = 'en'
): string {
  return locale === 'hi'
    ? HI_BUSINESS_MODEL_LABELS[key]
    : BUSINESS_MODEL_LABELS[key];
}

export const CAPITAL_ORIENTATION_LABELS: Record<CapitalOrientation, string> = {
  lower: 'Lower initial test capital',
  moderate: 'Moderate initial test capital',
  higher: 'Higher initial test capital',
};

const HI_CAPITAL_ORIENTATION_LABELS: Record<CapitalOrientation, string> = {
  lower: 'कम प्रारंभिक परीक्षण पूंजी',
  moderate: 'मध्यम प्रारंभिक परीक्षण पूंजी',
  higher: 'अधिक प्रारंभिक परीक्षण पूंजी',
};

export function getCapitalOrientationLabel(
  level: CapitalOrientation,
  locale: Locale = 'en'
): string {
  return locale === 'hi'
    ? HI_CAPITAL_ORIENTATION_LABELS[level]
    : CAPITAL_ORIENTATION_LABELS[level];
}

export const CAPITAL_SHORT_LABELS: Record<CapitalOrientation, string> = {
  lower: 'Lower capital orientation',
  moderate: 'Moderate capital orientation',
  higher: 'Higher capital orientation',
};

const HI_CAPITAL_SHORT_LABELS: Record<CapitalOrientation, string> = {
  lower: 'कम पूंजी उन्मुख',
  moderate: 'मध्यम पूंजी उन्मुख',
  higher: 'अधिक पूंजी उन्मुख',
};

export function getCapitalShortLabel(
  level: CapitalOrientation,
  locale: Locale = 'en'
): string {
  return locale === 'hi'
    ? HI_CAPITAL_SHORT_LABELS[level]
    : CAPITAL_SHORT_LABELS[level];
}

export const COMPLEXITY_LABELS: Record<OperatingComplexity, string> = {
  simpler: 'Simpler operations',
  guided: 'Guided operations',
  specialist: 'Specialist operations',
};

const HI_COMPLEXITY_LABELS: Record<OperatingComplexity, string> = {
  simpler: 'सरल संचालन',
  guided: 'मार्गदर्शित संचालन',
  specialist: 'विशेषज्ञ संचालन',
};

export function getComplexityLabel(
  level: OperatingComplexity,
  locale: Locale = 'en'
): string {
  return locale === 'hi' ? HI_COMPLEXITY_LABELS[level] : COMPLEXITY_LABELS[level];
}

export const STORAGE_LABELS: Record<StorageProfile, string> = {
  no_physical_stock: 'No physical stock required',
  small_dedicated_storage: 'Small dedicated storage (shelf / small room)',
  larger_space: 'Larger storage or work area',
};

const HI_STORAGE_LABELS: Record<StorageProfile, string> = {
  no_physical_stock: 'भौतिक स्टॉक की आवश्यकता नहीं',
  small_dedicated_storage: 'छोटा समर्पित स्टोरेज (शेल्फ़ / छोटा कमरा)',
  larger_space: 'बड़ा स्टोरेज या कार्यक्षेत्र',
};

export function getStorageLabel(
  profile: StorageProfile,
  locale: Locale = 'en'
): string {
  return locale === 'hi' ? HI_STORAGE_LABELS[profile] : STORAGE_LABELS[profile];
}

export const TIME_LABELS: Record<TimeProfile, string> = {
  flexible_blocks: 'Flexible time blocks',
  scheduled_operations: 'Scheduled operations needed',
};

const HI_TIME_LABELS: Record<TimeProfile, string> = {
  flexible_blocks: 'लचीले समय ब्लॉक',
  scheduled_operations: 'निर्धारित संचालन समय आवश्यक',
};

export function getTimeLabel(profile: TimeProfile, locale: Locale = 'en'): string {
  return locale === 'hi' ? HI_TIME_LABELS[profile] : TIME_LABELS[profile];
}

export const OPERATING_TAG_LABELS: Record<OperatingTag, string> = {
  fragile_items: 'Fragile items / breakable packing',
  bulky_storage_or_shipping: 'Large or heavy parcels',
  size_or_fit_variants: 'Size and fit variants / returns',
  expiry_or_storage_control: 'Expiry and controlled storage',
  electrical_or_battery_variants: 'Electrical or battery checks',
  specialist_product_checks: 'Specialist product & compliance checks',
  safety_critical_variants: 'Safety-critical product verification',
  health_or_personal_wellness: 'Health or personal-wellness rules',
};

const HI_OPERATING_TAG_LABELS: Record<OperatingTag, string> = {
  fragile_items: 'नाज़ुक वस्तुएं / सुरक्षित पैकिंग',
  bulky_storage_or_shipping: 'बड़े या भारी पार्सल',
  size_or_fit_variants: 'साइज और फ़िट विकल्प / रिटर्न',
  expiry_or_storage_control: 'एक्सपायरी और नियंत्रित स्टोरेज',
  electrical_or_battery_variants: 'इलेक्ट्रिकल या बैटरी जांच',
  specialist_product_checks: 'विशेषज्ञ उत्पाद और अनुपालन जांच',
  safety_critical_variants: 'सुरक्षा-संवेदनशील उत्पाद सत्यापन',
  health_or_personal_wellness: 'स्वास्थ्य या पर्सनल-वेलनेस नियम',
};

export function getOperatingTagLabel(
  tag: OperatingTag,
  locale: Locale = 'en'
): string {
  return locale === 'hi' ? HI_OPERATING_TAG_LABELS[tag] : OPERATING_TAG_LABELS[tag];
}

export const SKILL_TAG_LABELS: Record<SkillTag, string> = {
  technical: 'Technical product knowledge',
  styling: 'Design and styling',
  product_care: 'Product care and customer support',
  home_styling: 'Home styling and presentation',
  crafting: 'Making and crafting',
  practical: 'Practical hands-on assembly',
  food_preparation: 'Food preparation and hygiene',
  fitness: 'Fitness & activity guidance',
  creative: 'Original creative work',
};

const HI_SKILL_TAG_LABELS: Record<SkillTag, string> = {
  technical: 'तकनीकी उत्पाद ज्ञान',
  styling: 'डिज़ाइन और स्टाइलिंग',
  product_care: 'उत्पाद देखभाल और ग्राहक सहायता',
  home_styling: 'होम स्टाइलिंग और प्रस्तुति',
  crafting: 'निर्माण और शिल्प कला',
  practical: 'व्यावहारिक असेंबली कौशल',
  food_preparation: 'खाद्य तैयारी और स्वच्छता',
  fitness: 'फ़िटनेस और गतिविधि मार्गदर्शन',
  creative: 'मूल रचनात्मक कार्य',
};

export function getSkillTagLabel(tag: SkillTag, locale: Locale = 'en'): string {
  return locale === 'hi' ? HI_SKILL_TAG_LABELS[tag] : SKILL_TAG_LABELS[tag];
}

export const CHANNEL_RESEARCH_LABELS: Record<ChannelResearchTag, string> = {
  own_social_or_store: 'Own social media, WhatsApp, or online store',
  domestic_marketplaces: 'Domestic marketplaces (e.g. Amazon India / Flipkart / Meesho)',
  Etsy_creativity_rules: 'Creative international selling (subject to Etsy Creativity Standards)',
};

const HI_CHANNEL_RESEARCH_LABELS: Record<ChannelResearchTag, string> = {
  own_social_or_store: 'अपना सोशल मीडिया, WhatsApp या ऑनलाइन स्टोर',
  domestic_marketplaces: 'घरेलू मार्केटप्लेस (जैसे Amazon India / Flipkart / Meesho)',
  Etsy_creativity_rules: 'क्रिएटिव अंतर्राष्ट्रीय बिक्री (Etsy क्रिएटिविटी मानकों के अधीन)',
};

export function getChannelResearchLabel(
  tag: ChannelResearchTag,
  locale: Locale = 'en'
): string {
  return locale === 'hi'
    ? HI_CHANNEL_RESEARCH_LABELS[tag]
    : CHANNEL_RESEARCH_LABELS[tag];
}

export const CHANNEL_RESEARCH_SHORT_LABELS: Record<ChannelResearchTag, string> = {
  own_social_or_store: 'Direct social / WhatsApp / store',
  domestic_marketplaces: 'Domestic marketplaces',
  Etsy_creativity_rules: 'Etsy (creativity rules check)',
};

const HI_CHANNEL_RESEARCH_SHORT_LABELS: Record<ChannelResearchTag, string> = {
  own_social_or_store: 'सोशल / WhatsApp / अपना स्टोर',
  domestic_marketplaces: 'घरेलू मार्केटप्लेस',
  Etsy_creativity_rules: 'Etsy (रचनात्मक नियम जांच)',
};

export function getChannelResearchShortLabel(
  tag: ChannelResearchTag,
  locale: Locale = 'en'
): string {
  return locale === 'hi'
    ? HI_CHANNEL_RESEARCH_SHORT_LABELS[tag]
    : CHANNEL_RESEARCH_SHORT_LABELS[tag];
}

export const QUIZ_NO_PREFERENCE_VALUE = 'NO_PREFERENCE';
export const QUIZ_BUDGET_HELP_VALUE = 'I need help working this out';
export const QUIZ_MODEL_OPEN_VALUE = 'I am open to options';
export const QUIZ_STRENGTH_BASICS_VALUE = 'I am starting from the basics';
export const QUIZ_AVOID_NONE_VALUE = 'None of these';
export const QUIZ_CHANNEL_HELP_VALUE = 'I need help choosing';

// Normalized mapping from Quiz Q4 options to category attributes
export const STRENGTH_OPTION_TO_SKILLS: Record<string, SkillTag[]> = {
  'Sourcing and negotiation': [], // Aligns directly with source_and_sell_own_account / authorised_licence_resale
  'Making and crafting': ['crafting', 'creative'],
  'Design and styling': ['styling', 'home_styling', 'creative'],
  'Technical product knowledge': ['technical', 'practical'],
  'Food preparation': ['food_preparation'],
  'Product care and customer support': ['product_care', 'fitness'],
};

// Normalized mapping from Quiz Q7 avoidance options to operating_tags
export const AVOID_OPTION_TO_TAGS: Record<string, OperatingTag[]> = {
  'Fragile goods': ['fragile_items'],
  'Large or heavy parcels': ['bulky_storage_or_shipping'],
  'Size and fit returns': ['size_or_fit_variants'],
  'Expiry and controlled storage': ['expiry_or_storage_control'],
  'Electrical and battery products': ['electrical_or_battery_variants'],
  'Products needing specialist checks': [
    'specialist_product_checks',
    'safety_critical_variants',
    'health_or_personal_wellness',
  ],
};

export const DIRECTORY_AVOID_OPTIONS: Array<{
  tag: OperatingTag;
  label: string;
  hiLabel: string;
}> = [
  {
    tag: 'fragile_items',
    label: 'Avoid fragile goods',
    hiLabel: 'नाज़ुक वस्तुओं से बचें',
  },
  {
    tag: 'bulky_storage_or_shipping',
    label: 'Avoid large or heavy parcels',
    hiLabel: 'बड़े या भारी पार्सल से बचें',
  },
  {
    tag: 'size_or_fit_variants',
    label: 'Avoid size & fit returns',
    hiLabel: 'साइज और फ़िट रिटर्न से बचें',
  },
  {
    tag: 'expiry_or_storage_control',
    label: 'Avoid expiry & controlled storage',
    hiLabel: 'एक्सपायरी व नियंत्रित स्टोरेज से बचें',
  },
  {
    tag: 'electrical_or_battery_variants',
    label: 'Avoid electrical & battery items',
    hiLabel: 'इलेक्ट्रिकल व बैटरी उत्पादों से बचें',
  },
  {
    tag: 'specialist_product_checks',
    label: 'Avoid specialist product checks',
    hiLabel: 'विशेषज्ञ जांच वाले उत्पादों से बचें',
  },
];

export const FIT_LABEL_STYLES: Record<FitLabel, { border: string; bg: string; text: string }> = {
  'Strong alignment': {
    border: 'border-[#1A1B1A]',
    bg: 'bg-[#F4C940]/30',
    text: 'text-[#1A1B1A]',
  },
  'Worth exploring': {
    border: 'border-[#E6E6DF]',
    bg: 'bg-[#F3F1E9]',
    text: 'text-[#1A1B1A]',
  },
  'Needs more preparation': {
    border: 'border-[#E6E6DF]',
    bg: 'bg-[#FAF9F5]',
    text: 'text-[#666A65]',
  },
};

const HI_FIT_LABELS: Record<FitLabel, string> = {
  'Strong alignment': 'मजबूत उपयुक्तता',
  'Worth exploring': 'विचार करने योग्य',
  'Needs more preparation': 'अधिक तैयारी आवश्यक',
};

export function getFitLabelText(fitLabel: FitLabel, locale: Locale = 'en'): string {
  return locale === 'hi' ? HI_FIT_LABELS[fitLabel] : fitLabel;
}

export function getDepartmentName(
  dept: DepartmentRecord,
  locale: Locale = 'en'
): string {
  return locale === 'hi' ? HI_DEPARTMENTS[dept.id] || dept.name : dept.name;
}

export function getCategoryName(
  cat: CategoryRecord,
  locale: Locale = 'en'
): string {
  return locale === 'hi' ? HI_CATEGORIES[cat.id] || cat.name : cat.name;
}

export function getSubcategoryName(
  sub: SubcategoryRecord,
  locale: Locale = 'en'
): string {
  return locale === 'hi' ? HI_SUBCATEGORIES[sub.id] || sub.name : sub.name;
}

export function getSubcategoryNotes(
  sub: SubcategoryRecord,
  locale: Locale = 'en'
): string[] {
  if (locale !== 'hi') return sub.notes;
  return sub.notes.map((n) => HI_SUBCATEGORY_NOTES[n] || n);
}

export function getIdeaText(
  idea: StarterIdeaRecord,
  locale: Locale = 'en'
): { title: string; customer: string; angle: string } {
  if (locale === 'hi' && HI_IDEAS[idea.id]) {
    return HI_IDEAS[idea.id];
  }
  return {
    title: idea.title,
    customer: idea.customer,
    angle: idea.angle,
  };
}

export function getQuizQuestionText(
  question: QuizQuestionRecord,
  locale: Locale = 'en'
): { question: string; note?: string } {
  if (locale !== 'hi') {
    return { question: question.question, note: question.note };
  }
  const hiQ = HI_QUIZ_QUESTIONS[question.id];
  return {
    question: hiQ?.question || question.question,
    note: hiQ?.note ?? question.note,
  };
}

export function getQuizOptionLabel(
  questionId: QuizQuestionRecord['id'],
  option: string,
  locale: Locale = 'en'
): string {
  if (locale !== 'hi') return option;
  return HI_QUIZ_QUESTIONS[questionId]?.options?.[option] || option;
}

export function getSourceReferenceText(
  src: SourceReferenceRecord,
  locale: Locale = 'en'
): { name: string; use: string } {
  if (locale === 'hi' && HI_SOURCES[src.name]) {
    return HI_SOURCES[src.name];
  }
  return { name: src.name, use: src.use };
}

export function getGeneralCopyText(locale: Locale = 'en') {
  if (locale === 'hi') {
    return HI_GENERAL_STRINGS;
  }
  return {
    authority: IDEA_FINDER_DATASET.authority,
    channelResearchStatus:
      'Product and seller eligibility must be checked before publishing channel suitability',
    classificationNote:
      'Orientation for choosing a small test, not a supplier quote, verified starting budget, demand score or platform approval. Some variants have different needs.',
    sourceStatus:
      'Bonnza editorial starter idea; not validated customer demand',
  };
}

export interface LearningLinkTarget {
  label: string;
  description: string;
  to: string;
  kind: 'primary' | 'secondary';
}

/**
 * Maps any category to existing Bonnza learning paths, courses, tools, and live webinars.
 * Every route strictly matches an existing route registered in App.tsx without inventing prices or dates.
 */
export function getBonnzaLearningLinksForCategory(
  category: CategoryRecord,
  locale: Locale = 'en'
): LearningLinkTarget[] {
  const models = category.business_models_to_explore;

  if (locale === 'hi') {
    const links: LearningLinkTarget[] = [
      {
        label: 'इस आइडिया का मूल्यांकन करना सीखें',
        description:
          'बिज़नेस फ़ाउंडेशन कोर्स: ग्राहक मांग, योगदान मार्जिन और पहला परीक्षण जांचें।',
        to: '/courses/business-foundations',
        kind: 'primary',
      },
      {
        label: 'लॉन्च योजना बनाएँ',
        description:
          'परीक्षण बजट और डिस्पैच सेटअप की योजना के लिए ब्राउज़र-स्थानीय वर्कशीट खोलें।',
        to: '/resources#starting-worksheet-heading',
        kind: 'secondary',
      },
    ];

    if (models.includes('make_own_product') || models.includes('personalise_to_order')) {
      links.push({
        label: 'क्राफ़्ट टू कॉमर्स कोर्स देखें',
        description:
          'सामग्री लागत, बनाने का समय, कस्टम वेरिएंट और स्रोत प्रमाण दर्ज करना सीखें।',
        to: '/courses/craft-to-commerce',
        kind: 'secondary',
      });
    } else if (models.includes('source_and_sell_own_account')) {
      links.push({
        label: 'रीसेल: सोर्स टू सेल कोर्स देखें',
        description:
          'आपूर्तिकर्ता मूल्यांकन, सैंपल जांच और प्रति-ऑर्डर यूनिट अर्थशास्त्र सीखें।',
        to: '/courses/resell-source-to-sell',
        kind: 'secondary',
      });
    }

    if (category.possible_channel_research.includes('Etsy_creativity_rules')) {
      links.push({
        label: 'Etsy क्रिएटिविटी नियम कोर्स देखें',
        description:
          'लिस्टिंग से पहले निर्माता बनाम क्यूरेटर पात्रता नियम जांचें।',
        to: '/courses/etsy-selling',
        kind: 'secondary',
      });
    } else if (models.includes('original_digital_product')) {
      links.push({
        label: 'अपना ऑनलाइन स्टोर कोर्स देखें',
        description:
          'सीधे डिजिटल डिलीवरी और चेकआउट के लिए Shopify व Wix की तुलना करें।',
        to: '/courses/own-store-shopify-and-wix',
        kind: 'secondary',
      });
    } else {
      links.push({
        label: 'सोशल और WhatsApp बिक्री कोर्स देखें',
        description:
          'प्रारंभिक निश्चित खर्चों के बिना छोटे बैच में उत्पाद परीक्षण और पूछताछ प्रबंधन सीखें।',
        to: '/courses/social-media-and-whatsapp',
        kind: 'secondary',
      });
    }

    links.push({
      label: 'आगामी शुरुआती लाइव वेबिनार से जुड़ें',
      description:
        'अपना पहला उत्पाद, लागत संरचना और उपयुक्त चैनल चुनने पर लाइव मार्गदर्शन।',
      to: '/webinars/first-online-business',
      kind: 'secondary',
    });

    links.push({
      label: 'आइडिया समीक्षा में मदद लें',
      description:
        'अपने सहेजे गए आइडिया और कोर्स मार्गदर्शन के लिए Bonnza टीम से संपर्क करें।',
      to: '/contact',
      kind: 'secondary',
    });

    return links;
  }

  const links: LearningLinkTarget[] = [
    {
      label: 'Learn how to evaluate this idea',
      description:
        'Business Foundations course: validate demand, contribution margin, and first experiment.',
      to: '/courses/business-foundations',
      kind: 'primary',
    },
    {
      label: 'Build a launch plan',
      description:
        'Open the browser-local Business Starting Worksheet to map test budget and dispatch setup.',
      to: '/resources#starting-worksheet-heading',
      kind: 'secondary',
    },
  ];

  if (models.includes('make_own_product') || models.includes('personalise_to_order')) {
    links.push({
      label: 'Explore Craft to Commerce course',
      description:
        'Cost materials, making time, custom variants, and truthful provenance.',
      to: '/courses/craft-to-commerce',
      kind: 'secondary',
    });
  } else if (models.includes('source_and_sell_own_account')) {
    links.push({
      label: 'Explore Resell: Source to Sell course',
      description:
        'Evaluate suppliers, inspect physical samples, and structure unit economics.',
      to: '/courses/resell-source-to-sell',
      kind: 'secondary',
    });
  }

  if (category.possible_channel_research.includes('Etsy_creativity_rules')) {
    links.push({
      label: 'Review Etsy Creativity Standards course',
      description: 'Check maker vs. curator eligibility rules before listing.',
      to: '/courses/etsy-selling',
      kind: 'secondary',
    });
  } else if (models.includes('original_digital_product')) {
    links.push({
      label: 'Explore Owned Storefront course',
      description:
        'Compare Shopify and Wix flows for direct digital delivery and checkout.',
      to: '/courses/own-store-shopify-and-wix',
      kind: 'secondary',
    });
  } else {
    links.push({
      label: 'Explore Social & WhatsApp selling course',
      description:
        'Run small-batch product testing and enquiry handling without early fixed overheads.',
      to: '/courses/social-media-and-whatsapp',
      kind: 'secondary',
    });
  }

  links.push({
    label: 'Join an upcoming beginner webinar',
    description:
      'Live walkthrough on choosing your starting product, channel, and cost structure.',
    to: '/webinars/first-online-business',
    kind: 'secondary',
  });

  links.push({
    label: 'Get help reviewing the idea',
    description:
      'Contact the Bonnza team with your saved category shortlist for course guidance.',
    to: '/contact',
    kind: 'secondary',
  });

  return links;
}

export function getCapitalDefinitionText(
  level: CapitalOrientation,
  locale: Locale = 'en'
): string {
  return locale === 'hi'
    ? HI_CAPITAL_DEFINITIONS[level]
    : IDEA_FINDER_DATASET.capital_definition[level];
}

export interface IdeaFinderUiCopy {
  seoTitle: string;
  seoDescription: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  kicker: string;
  headline: string;
  supportingCopy: string;
  primaryAction: string;
  secondaryAction: string;
  tabQuiz: string;
  tabBrowse: string;
  savedShortlistPill: (count: number) => string;
  compareLimitWarning: string;
  aboutCatalogueHeading: string;
  aboutCatalogueBody: string;
  checkedPrefix: string;
}

export function getIdeaFinderUiCopy(locale: Locale): IdeaFinderUiCopy {
  if (locale === 'hi') {
    return {
      seoTitle: 'ई-कॉमर्स बिज़नेस आइडिया फ़ाइंडर — श्रेणियाँ और उत्पाद दिशाएँ देखें | Bonnza',
      seoDescription:
        'बिक्री श्रेणियाँ एक्सप्लोर करें या अपने बजट, स्टोरेज स्थान, समय और काम करने के तरीके पर 8 प्रश्नों के उत्तर देकर व्यावहारिक ई-कॉमर्स बिज़नेस आइडिया चुनें।',
      breadcrumbHome: 'होम',
      breadcrumbCurrent: 'ई-कॉमर्स बिज़नेस आइडिया फ़ाइंडर',
      kicker: 'निःशुल्क डिस्कवरी टूल · बिना लॉगिन उपयोग करें',
      headline: 'अपनी शुरुआत के अनुकूल सही ई-कॉमर्स आइडिया खोजें।',
      supportingCopy:
        'विभिन्न बिक्री श्रेणियों को एक्सप्लोर करें या अपनी रुचियों, संसाधनों और काम करने के पसंदीदा तरीके के बारे में कुछ प्रश्नों के उत्तर दें। शॉर्टलिस्ट बनाएँ, फिर तय करें कि पहले किसका परीक्षण करना है।',
      primaryAction: 'मेरे आइडिया खोजें',
      secondaryAction: 'सभी श्रेणियाँ देखें',
      tabQuiz: 'मेरे आइडिया खोजें (8 प्रश्न)',
      tabBrowse: 'सभी श्रेणियाँ देखें',
      savedShortlistPill: (count) => `सहेजी गई शॉर्टलिस्ट (${count})`,
      compareLimitWarning:
        'आप एक साथ अधिकतम तीन आइडिया की तुलना कर सकते हैं। नया जोड़ने के लिए पहले किसी एक को तुलना से हटाएँ।',
      aboutCatalogueHeading: 'इस डिस्कवरी कैटलॉग और आधिकारिक चैनल जांच के बारे में',
      aboutCatalogueBody:
        'पूंजी वर्गीकरण ("कम", "मध्यम", "अधिक") और संचालन जटिलता लेबल शुरुआती योजना मार्गदर्शन हैं (तैयार: ' +
        IDEA_FINDER_DATASET.prepared +
        ')—ये सप्लायर कोटेशन, सत्यापित लाभ अनुमान, डिमांड स्कोर या मार्केटप्लेस श्रेणी अनुमोदन नहीं हैं।',
      checkedPrefix: 'जांचा गया',
    };
  }

  return {
    seoTitle: 'Ecommerce Business Idea Finder — Explore Categories & Product Directions | Bonnza',
    seoDescription:
      'Explore selling categories or answer 8 guided questions about your budget, storage space, time, and preferred way of working to shortlist practical ecommerce business ideas.',
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Ecommerce Business Idea Finder',
    kicker: 'FREE DISCOVERY WORKSPACE · NO SIGN-IN REQUIRED',
    headline: 'Find an ecommerce idea that fits your starting point.',
    supportingCopy:
      'Explore selling categories or answer a few questions about your interests, resources, and preferred way of working. Build a shortlist, then decide what to test first.',
    primaryAction: 'Find my ideas',
    secondaryAction: 'Explore all categories',
    tabQuiz: 'Find my ideas (8 questions)',
    tabBrowse: 'Explore all categories',
    savedShortlistPill: (count) => `Saved shortlist (${count})`,
    compareLimitWarning:
      'You can compare up to three ideas side by side. Remove one from comparison to add another.',
    aboutCatalogueHeading: 'About this discovery catalogue & official channel checks',
    aboutCatalogueBody: `Capital classifications (“lower”, “moderate”, “higher”) and operating complexity labels are starting-point planning orientations prepared ${IDEA_FINDER_DATASET.prepared}—not supplier quotations, verified profit projections, demand scores, or marketplace category approvals.`,
    checkedPrefix: 'Checked',
  };
}
