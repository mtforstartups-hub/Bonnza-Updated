import type { Locale } from '../../domain/types';
import { ENRICHED_IDEA_ITEMS, DEPARTMENTS_BY_ID } from './data';
import {
  AVOID_OPTION_TO_TAGS,
  getBusinessModelLabel,
  getCapitalOrientationLabel,
  getDepartmentName,
  getGeneralCopyText,
  getIdeaText,
  getOperatingTagLabel,
  getQuizOptionLabel,
  getSkillTagLabel,
  getStorageLabel,
  QUIZ_AVOID_NONE_VALUE,
  QUIZ_BUDGET_HELP_VALUE,
  QUIZ_CHANNEL_HELP_VALUE,
  QUIZ_MODEL_OPEN_VALUE,
  QUIZ_NO_PREFERENCE_VALUE,
  QUIZ_STRENGTH_BASICS_VALUE,
  STRENGTH_OPTION_TO_SKILLS,
} from './labels';
import type {
  BusinessModelKey,
  EliminationSummaryItem,
  EnrichedIdeaItem,
  FitLabel,
  OperatingTag,
  QuizAnswersState,
  QuizEvaluationResult,
  RankedIdeaMatch,
  SkillTag,
} from './types';

export const INITIAL_QUIZ_ANSWERS: QuizAnswersState = {
  budget: null,
  interests: [],
  model: null,
  strengths: [],
  storage: null,
  time: null,
  avoid: [],
  channel: null,
};

const WEIGHTS = {
  budget: 25,
  interests: 20,
  model: 15,
  strengths: 10,
  storage: 10,
  time: 10,
  channel: 10,
} as const;

function mapModelOptionToKey(option: string | null): BusinessModelKey | null {
  switch (option) {
    case 'Source products and sell through my own account':
      return 'source_and_sell_own_account';
    case 'Make my own products':
      return 'make_own_product';
    case 'Personalise products to order':
      return 'personalise_to_order';
    case 'Create original digital products':
      return 'original_digital_product';
    default:
      return null;
  }
}

function getAvoidedTagsFromAnswer(avoidAnswer: string[]): Set<OperatingTag> {
  const tags = new Set<OperatingTag>();
  if (avoidAnswer.includes(QUIZ_AVOID_NONE_VALUE)) {
    return tags;
  }
  for (const choice of avoidAnswer) {
    const mapped = AVOID_OPTION_TO_TAGS[choice];
    if (mapped) {
      for (const tag of mapped) tags.add(tag);
    }
  }
  return tags;
}

function getPreferredSkillTags(strengths: string[]): {
  skillTags: Set<SkillTag>;
  prefersSourcing: boolean;
} {
  const skillTags = new Set<SkillTag>();
  let prefersSourcing = false;

  if (strengths.includes(QUIZ_STRENGTH_BASICS_VALUE)) {
    return { skillTags, prefersSourcing };
  }

  for (const choice of strengths) {
    if (choice === 'Sourcing and negotiation') {
      prefersSourcing = true;
    }
    const mapped = STRENGTH_OPTION_TO_SKILLS[choice];
    if (mapped) {
      for (const s of mapped) skillTags.add(s);
    }
  }
  return { skillTags, prefersSourcing };
}

function scoreBudgetFactor(
  budgetAnswer: string,
  capitalOrientation: 'lower' | 'moderate' | 'higher'
): number {
  switch (budgetAnswer) {
    case 'Under INR 10000':
      if (capitalOrientation === 'lower') return 1.0;
      if (capitalOrientation === 'moderate') return 0.45;
      return 0.1;
    case 'INR 10000 to 25000':
      if (capitalOrientation === 'moderate') return 1.0;
      if (capitalOrientation === 'lower') return 0.9;
      return 0.25;
    case 'INR 25000 to 50000':
      if (capitalOrientation === 'moderate') return 1.0;
      if (capitalOrientation === 'lower') return 0.85;
      return 0.6;
    case 'Above INR 50000':
      if (capitalOrientation === 'higher') return 1.0;
      if (capitalOrientation === 'moderate') return 0.95;
      return 0.8;
    default:
      return 0;
  }
}

function scoreTimeFactor(
  timeAnswer: string,
  timeProfile: 'flexible_blocks' | 'scheduled_operations',
  complexity: 'simpler' | 'guided' | 'specialist'
): number {
  switch (timeAnswer) {
    case 'Under 5 hours':
      if (timeProfile === 'flexible_blocks' && complexity === 'simpler') return 1.0;
      if (timeProfile === 'flexible_blocks' && complexity === 'guided') return 0.72;
      if (timeProfile === 'flexible_blocks') return 0.45;
      if (complexity === 'simpler') return 0.4;
      return 0.18;
    case '5 to 10 hours':
      if (timeProfile === 'flexible_blocks') {
        return complexity === 'specialist' ? 0.65 : 1.0;
      }
      return complexity === 'specialist' ? 0.45 : 0.75;
    case '10 to 20 hours':
      if (timeProfile === 'flexible_blocks') return 1.0;
      return complexity === 'specialist' ? 0.8 : 0.92;
    case 'More than 20 hours':
      return timeProfile === 'scheduled_operations' ? 1.0 : 0.95;
    default:
      return 0;
  }
}

function scoreStorageFactor(
  storageAnswer: string,
  item: EnrichedIdeaItem
): number {
  const { storage_profile, operating_complexity } = item.category;
  switch (storageAnswer) {
    case 'I need a route without physical stock':
      return storage_profile === 'no_physical_stock' ? 1.0 : 0;
    case 'A shelf or cupboard':
      if (storage_profile === 'small_dedicated_storage') {
        return operating_complexity === 'simpler' ? 1.0 : 0.86;
      }
      if (storage_profile === 'no_physical_stock') {
        return 0.95;
      }
      return 0;
    case 'A small dedicated room':
      if (storage_profile === 'small_dedicated_storage') return 1.0;
      if (storage_profile === 'no_physical_stock') return 0.9;
      return 0;
    case 'A larger storage or work area':
      if (storage_profile === 'larger_space') return 1.0;
      if (storage_profile === 'small_dedicated_storage') return 0.85;
      return 0.75;
    default:
      return 0;
  }
}

function getFitLabel(normalizedScore: number): FitLabel {
  if (normalizedScore >= 72) return 'Strong alignment';
  if (normalizedScore >= 48) return 'Worth exploring';
  return 'Needs more preparation';
}

function buildOperatingConsideration(item: EnrichedIdeaItem, locale: Locale): string {
  const { operating_tags, subcategories, storage_profile } = item.category;
  const general = getGeneralCopyText(locale);

  const subWithNotes = subcategories.filter((s) => s.notes && s.notes.length > 0);
  if (subWithNotes.length > 0 && item.category.id === 'C023') {
    return locale === 'hi'
      ? 'मिश्रित श्रेणी: फ़ैशन एक्सेसरीज़ कीमती धातु वाले आभूषणों से काफ़ी अलग हैं, जिनके लिए अलग पूंजी, हॉलमार्किंग और प्रामाणिकता जांच आवश्यक होती है।'
      : 'Mixed category: fashion accessories differ significantly from precious-metal variants, which require separate capital, hallmarking, and authenticity checks.';
  }
  if (item.category.id === 'C100') {
    return locale === 'hi'
      ? 'अपने बनाए गए मूल डिजिटल उत्पादों और अधिकृत सॉफ़्टवेयर/सब्सक्रिप्शन लाइसेंस के बीच अंतर स्पष्ट रखें—रीसेल के लिए लिखित अधिकार और प्लेटफ़ॉर्म अनुमति ज़रूरी है।'
      : 'Distinguish original digital products you create yourself from authorised software/subscription licences, which require written resale rights and platform permission.';
  }

  if (operating_tags.length > 0) {
    const readable = operating_tags
      .slice(0, 2)
      .map((t) => getOperatingTagLabel(t, locale))
      .join('; ');
    return locale === 'hi'
      ? `ध्यान देने योग्य संचालन कारक: ${readable}।`
      : `Operating factor to plan for: ${readable}.`;
  }

  if (storage_profile === 'larger_space') {
    return locale === 'hi'
      ? 'स्टॉक मंगाने से पहले बड़े स्टोरेज या पैकिंग क्षेत्र और भारी पार्सल शिपिंग की योजना आवश्यक है।'
      : 'Requires a larger storage or packing area and bulk parcel planning before ordering stock.';
  }

  return general.classificationNote;
}

function buildMatchReasons(
  answers: QuizAnswersState,
  item: EnrichedIdeaItem,
  matchedBudget: number,
  matchedInterest: boolean,
  matchedModelKey: BusinessModelKey | null,
  matchedSkills: string[],
  avoidedTagCount: number,
  channelUsedInScoring: boolean,
  matchedChannelEtsy: boolean,
  locale: Locale
): string[] {
  const reasons: string[] = [];
  const deptName = getDepartmentName(item.department, locale);
  const capitalLabel = getCapitalOrientationLabel(item.category.capital_orientation, locale);
  const storageLabel = getStorageLabel(item.category.storage_profile, locale);
  const ideaText = getIdeaText(item.idea, locale);

  if (matchedInterest) {
    reasons.push(
      locale === 'hi'
        ? `आपकी चुनी गई विभाग रुचि से मेल खाता है: ${deptName}`
        : `Matches your department interest: ${deptName}`
    );
  }

  if (matchedModelKey && item.category.business_models_to_explore.includes(matchedModelKey)) {
    const modelLabel = getBusinessModelLabel(matchedModelKey, locale);
    reasons.push(
      locale === 'hi'
        ? `आपके चुने हुए कार्य-तरीके का समर्थन करता है: ${modelLabel}`
        : `Supports your chosen approach: ${modelLabel}`
    );
  }

  if (
    answers.storage === 'I need a route without physical stock' &&
    item.category.storage_profile === 'no_physical_stock'
  ) {
    reasons.push(
      locale === 'hi'
        ? 'मूल डिजिटल उत्पादों के लिए भौतिक स्टॉक रखे बिना काम करने की सुविधा'
        : 'Operates without physical inventory storage for original digital deliverables'
    );
  } else if (
    (answers.storage === 'A shelf or cupboard' ||
      answers.storage === 'A small dedicated room') &&
    item.category.storage_profile === 'small_dedicated_storage'
  ) {
    reasons.push(
      locale === 'hi'
        ? `सीमित समर्पित स्टोरेज स्थान के अनुकूल (${storageLabel})`
        : `Fits small dedicated storage (${storageLabel})`
    );
  } else if (
    answers.storage === 'A larger storage or work area' &&
    item.category.storage_profile === 'larger_space'
  ) {
    reasons.push(
      locale === 'hi'
        ? 'बड़े स्टोरेज या तैयारी कार्यक्षेत्र का सही उपयोग कर सकता है'
        : 'Can utilise a larger storage or preparation workspace'
    );
  }

  if (
    answers.budget &&
    answers.budget !== QUIZ_BUDGET_HELP_VALUE &&
    matchedBudget >= 0.85
  ) {
    reasons.push(
      locale === 'hi'
        ? `${capitalLabel} के साथ गुणात्मक तालमेल (सैंपल कोटेशन से पुष्टि करें)`
        : `Qualitative alignment with ${capitalLabel.toLowerCase()} (confirm via sample quotes)`
    );
  }

  if (matchedSkills.length > 0) {
    reasons.push(
      locale === 'hi'
        ? `आपकी इस क्षमता का उपयोग करता है: ${matchedSkills.slice(0, 2).join(' और ')}`
        : `Draws on your strength in ${matchedSkills.slice(0, 2).join(' and ').toLowerCase()}`
    );
  }

  if (
    answers.time === 'Under 5 hours' &&
    item.category.operating_complexity === 'simpler'
  ) {
    reasons.push(
      locale === 'hi'
        ? 'सरल संचालन संरचना छोटे साप्ताहिक परीक्षण को संभालने में मदद करती है'
        : 'Simpler operating structure helps frame a smaller weekly test'
    );
  }

  if (channelUsedInScoring && matchedChannelEtsy) {
    reasons.push(
      locale === 'hi'
        ? 'रचनात्मक बिक्री नियमों के साथ परीक्षण में उपयुक्त (Etsy क्रिएटिविटी मानक जांचें)'
        : 'Supports exploring creative selling rules (verify Etsy Creativity Standards)'
    );
  }

  if (avoidedTagCount > 0) {
    reasons.push(
      locale === 'hi'
        ? 'आपकी छोड़ी गई सभी जटिलताओं और बाधाओं से मुक्त'
        : 'Passes all operating demands you chose to avoid'
    );
  }

  // Ensure 2-3 clear grounded reasons even if many quiz inputs were skipped
  if (reasons.length < 2) {
    const compWord =
      locale === 'hi'
        ? item.category.operating_complexity === 'simpler'
          ? 'सरल संचालन'
          : item.category.operating_complexity === 'guided'
            ? 'मार्गदर्शित संचालन'
            : 'विशेषज्ञ संचालन'
        : `${item.category.operating_complexity} operations`;
    reasons.push(
      locale === 'hi'
        ? `संपादकीय प्रोफ़ाइल: ${capitalLabel} · ${compWord}`
        : `Editorial profile: ${capitalLabel} · ${compWord}`
    );
  }
  if (reasons.length < 2) {
    reasons.push(
      locale === 'hi'
        ? `स्पष्ट शुरुआती ग्राहक वर्ग: ${ideaText.customer}`
        : `Clear starter buyer focus: ${ideaText.customer}`
    );
  }

  return reasons.slice(0, 3);
}

/**
 * Deterministic rules-based matcher adhering strictly to Bonnza Idea Finder rules.
 * Weights total 100 when all 7 scored factors apply; skipped/uniform factors are excluded from denominator.
 */
export function evaluateQuizMatches(
  answers: QuizAnswersState,
  locale: Locale = 'en'
): QuizEvaluationResult {
  const eliminatedSummaries: EliminationSummaryItem[] = [];
  let candidates = [...ENRICHED_IDEA_ITEMS];

  // 1. Apply hard storage constraints
  if (answers.storage === 'I need a route without physical stock') {
    const before = candidates.length;
    candidates = candidates.filter(
      (item) => item.category.storage_profile === 'no_physical_stock'
    );
    const removed = before - candidates.length;
    if (removed > 0) {
      const storageChoiceLabel = getQuizOptionLabel(
        'storage',
        'I need a route without physical stock',
        locale
      );
      eliminatedSummaries.push({
        constraintLabel:
          locale === 'hi'
            ? `स्टोरेज: "${storageChoiceLabel}" चुनने से भौतिक इन्वेंटरी वाली श्रेणियाँ हटा दी गईं`
            : 'Storage: "I need a route without physical stock" excluded categories requiring physical inventory',
        removedCount: removed,
        stepId: 'storage',
      });
    }
  } else if (
    answers.storage === 'A shelf or cupboard' ||
    answers.storage === 'A small dedicated room'
  ) {
    const before = candidates.length;
    candidates = candidates.filter(
      (item) => item.category.storage_profile !== 'larger_space'
    );
    const removed = before - candidates.length;
    if (removed > 0) {
      const storageChoiceLabel = getQuizOptionLabel('storage', answers.storage, locale);
      eliminatedSummaries.push({
        constraintLabel:
          locale === 'hi'
            ? `स्टोरेज: "${storageChoiceLabel}" ने बड़े स्टोरेज या कार्यक्षेत्र वाली श्रेणियाँ हटा दीं`
            : `Storage: "${answers.storage}" excluded categories needing a larger storage or work area`,
        removedCount: removed,
        stepId: 'storage',
      });
    }
  }

  // 2. Apply hard business-model incompatibilities
  const selectedModelKey =
    answers.model && answers.model !== QUIZ_MODEL_OPEN_VALUE
      ? mapModelOptionToKey(answers.model)
      : null;

  if (selectedModelKey && answers.model) {
    const before = candidates.length;
    candidates = candidates.filter((item) =>
      item.category.business_models_to_explore.includes(selectedModelKey)
    );
    const removed = before - candidates.length;
    if (removed > 0) {
      const modelChoiceLabel = getQuizOptionLabel('model', answers.model, locale);
      eliminatedSummaries.push({
        constraintLabel:
          locale === 'hi'
            ? `काम करने का तरीका: "${modelChoiceLabel}" ने असंगत उत्पाद मार्ग हटा दिए`
            : `Way of working: "${answers.model}" excluded incompatible product routes`,
        removedCount: removed,
        stepId: 'model',
      });
    }
  }

  // 3. Apply Q7 explicit operating avoidances before ranking (hard exclusions)
  const avoidedTags = getAvoidedTagsFromAnswer(answers.avoid);
  if (avoidedTags.size > 0) {
    const selectedAvoidLabels = answers.avoid.filter((a) => a !== QUIZ_AVOID_NONE_VALUE);
    for (const label of selectedAvoidLabels) {
      const mapped = AVOID_OPTION_TO_TAGS[label] || [];
      const before = candidates.length;
      candidates = candidates.filter(
        (item) => !mapped.some((tag) => item.category.operating_tags.includes(tag))
      );
      const removed = before - candidates.length;
      if (removed > 0) {
        const displayAvoid = getQuizOptionLabel('avoid', label, locale);
        eliminatedSummaries.push({
          constraintLabel:
            locale === 'hi'
              ? `बची हुई संचालन मांग: "${displayAvoid}"`
              : `Avoided demand: "${label}"`,
          removedCount: removed,
          stepId: 'avoid',
        });
      }
    }
  }

  // Determine active factors and whether channel preference supports meaningful attribute differentiation
  const skippedFactors: string[] = [];
  const budgetActive = Boolean(answers.budget && answers.budget !== QUIZ_BUDGET_HELP_VALUE);
  if (!budgetActive) {
    skippedFactors.push(
      locale === 'hi'
        ? 'प्रारंभिक परीक्षण बजट (तय करने में मदद चाहिए)'
        : 'Initial test budget (need help working this out)'
    );
  }

  const selectedDepts = answers.interests.filter(
    (id) => id !== QUIZ_NO_PREFERENCE_VALUE && Boolean(DEPARTMENTS_BY_ID[id])
  );
  const interestsActive =
    selectedDepts.length > 0 && !answers.interests.includes(QUIZ_NO_PREFERENCE_VALUE);
  if (!interestsActive) {
    skippedFactors.push(
      locale === 'hi'
        ? 'उत्पाद विभाग रुचि (कोई विशेष प्राथमिकता नहीं)'
        : 'Product department interest (No preference)'
    );
  }

  const modelActive = Boolean(selectedModelKey);
  if (!modelActive) {
    skippedFactors.push(
      locale === 'hi'
        ? 'ऑफ़र बनाने का तरीका (सभी विकल्प खुले)'
        : 'Way of creating your offer (Open to options)'
    );
  }

  const { skillTags: preferredSkills, prefersSourcing } = getPreferredSkillTags(answers.strengths);
  const strengthsActive =
    (preferredSkills.size > 0 || prefersSourcing) &&
    !answers.strengths.includes(QUIZ_STRENGTH_BASICS_VALUE);
  if (!strengthsActive) {
    skippedFactors.push(
      locale === 'hi'
        ? 'क्षमताएं या पहुँच (बिल्कुल शुरुआत से)'
        : 'Strengths or access (Starting from the basics / none chosen)'
    );
  }

  const storageActive = Boolean(answers.storage);
  const timeActive = Boolean(answers.time);

  // Evaluate channel differentiation strictly using supplied possible_channel_research attributes
  let channelActive = false;
  let channelInvestigationNote: string | null = null;
  let etsyCaveatSelected = false;

  if (!answers.channel || answers.channel === QUIZ_CHANNEL_HELP_VALUE) {
    skippedFactors.push(
      locale === 'hi'
        ? 'पसंदीदा बिक्री चैनल (चुनने में मदद चाहिए)'
        : 'Preferred selling channel (Need help choosing)'
    );
    channelInvestigationNote =
      locale === 'hi'
        ? 'चैनल चयन खुला रखा गया है। कोई उत्पाद दिशा चुनने के बाद सीधे सोशल माध्यम, मार्केटप्लेस और अपने ऑनलाइन स्टोर के बीच यूनिट अर्थशास्त्र व विक्रेता नियमों की तुलना करें।'
        : 'Channel selection was kept open. Compare unit economics and seller rules across direct social, marketplaces, or your own store after picking a product direction.';
  } else if (answers.channel === 'Handmade or creative international selling') {
    const etsyYesCount = candidates.filter((c) =>
      c.category.possible_channel_research.includes('Etsy_creativity_rules')
    ).length;
    if (etsyYesCount > 0 && etsyYesCount < candidates.length) {
      channelActive = true;
    } else {
      skippedFactors.push(
        locale === 'hi'
          ? 'चैनल प्राथमिकता (फ़िल्टर किए गए विकल्पों में समान)'
          : 'Channel preference (uniform across filtered candidates)'
      );
    }
    etsyCaveatSelected = true;
    channelInvestigationNote =
      locale === 'hi'
        ? 'क्रिएटिव अंतर्राष्ट्रीय बिक्री में Etsy क्रिएटिविटी मानक केवल शोध संकेत के रूप में दिखाए गए हैं। किसी कलाकार या आपूर्तिकर्ता से तैयार उत्पाद खरीदकर बेचना Etsy पर स्वतः पात्रता नहीं देता।'
        : 'Creative international selling uses Etsy Creativity Standards flags as a research signal only. Buying ready-made items from artists or commercial suppliers does not automatically qualify a shop on Etsy.';
  } else if (answers.channel === 'Amazon India Flipkart or Meesho') {
    const yesCount = candidates.filter((c) =>
      c.category.possible_channel_research.includes('domestic_marketplaces')
    ).length;
    if (yesCount > 0 && yesCount < candidates.length) {
      channelActive = true;
    } else {
      skippedFactors.push(
        locale === 'hi'
          ? 'चैनल प्राथमिकता (घरेलू मार्केटप्लेस व्यापक रूप से लागू हैं; विक्रेता व ब्रांड अनुमोदन SKU पर निर्भर)'
          : 'Channel preference (domestic marketplaces apply broadly; seller & brand approval varies per SKU)'
      );
    }
    channelInvestigationNote =
      locale === 'hi'
        ? 'सभी घरेलू भौतिक श्रेणियों में मार्केटप्लेस शोध विकल्प मौजूद है, इसलिए इस चयन ने भौतिक वस्तुओं में अंतर नहीं किया। इन्वेंटरी खरीदने से पहले श्रेणी अनुमोदन, GTIN/ब्रांड नियम और शुल्क स्लैब अवश्य जांचें।'
        : 'All domestic physical categories show marketplace research as an option, so this choice did not differentiate physical goods. Always verify category approval, GTIN/brand rules, and fee slabs before buying inventory.';
  } else {
    const localizedChannel = getQuizOptionLabel('channel', answers.channel, locale);
    skippedFactors.push(
      locale === 'hi'
        ? `चैनल प्राथमिकता ("${localizedChannel}" कैटलॉग की सभी श्रेणियों में लागू)`
        : `Channel preference ("${answers.channel}" is compatible across all categories in this catalogue)`
    );
    channelInvestigationNote =
      locale === 'hi'
        ? `यह कैटलॉग "${localizedChannel}" को सभी श्रेणियों में शोध योग्य मानता है, इसलिए कृत्रिम रैंकिंग पक्षपात से बचने हेतु इसे स्कोरिंग से बाहर रखा गया। उत्पाद के शिपिंग वज़न और पूछताछ लागत की जांच अभी भी ज़रूरी है।`
        : `The supplied catalogue marks "${answers.channel}" as researchable across all categories, so this preference was excluded from scoring to avoid artificial ranking bias. Product-level shipping weight and enquiry economics still require investigation.`;
  }

  const budgetEditorialNote =
    answers.budget === QUIZ_BUDGET_HELP_VALUE || answers.budget
      ? locale === 'hi'
        ? 'परीक्षण बजट विकल्प Bonnza कोर्स शुल्क और घरेलू बचत से अलग रखे जाते हैं। पूंजी स्तर ("कम", "मध्यम", "अधिक") केवल प्रारंभिक मार्गदर्शन हैं—हमेशा वास्तविक सप्लायर सैंपल और कोटेशन से पुष्टि करें।'
        : 'Test budget choices are kept separate from Bonnza course fees and household reserves. Qualitative capital levels ("lower", "moderate", "higher") are editorial starting guides—always confirm with real supplier samples and quotations.'
      : null;

  const storageEditorialNote =
    answers.storage === 'I need a route without physical stock'
      ? locale === 'hi'
        ? 'भौतिक उत्पादों की सोर्सिंग और पर्सनलाइज़ेशन में सैंपल जांच, पैकिंग सामग्री और डिस्पैच की ज़िम्मेदारी होती है; केवल डिजिटल/लाइसेंस्ड सॉफ़्टवेयर मार्ग ही बिना भौतिक स्टॉक के वर्गीकृत हैं।'
        : 'Physical-product sourcing and customising require sample inspection, packing materials, and dispatch responsibility; only digital/licensed software routes are classified without physical stock.'
      : null;

  // Calculate active weight denominator dynamically
  const activeWeightTotal =
    (budgetActive ? WEIGHTS.budget : 0) +
    (interestsActive ? WEIGHTS.interests : 0) +
    (modelActive ? WEIGHTS.model : 0) +
    (strengthsActive ? WEIGHTS.strengths : 0) +
    (storageActive ? WEIGHTS.storage : 0) +
    (timeActive ? WEIGHTS.time : 0) +
    (channelActive ? WEIGHTS.channel : 0);

  if (candidates.length === 0) {
    return {
      matches: [],
      totalCompatibleCount: 0,
      eliminatedSummaries,
      activeWeightTotal,
      skippedFactors,
      channelInvestigationNote,
      budgetEditorialNote,
      storageEditorialNote,
      diversityApplied: false,
    };
  }

  // Score each remaining compatible candidate deterministically
  const scored: RankedIdeaMatch[] = candidates.map((item) => {
    let earned = 0;

    const budgetRatio = budgetActive
      ? scoreBudgetFactor(answers.budget!, item.category.capital_orientation)
      : 0;
    if (budgetActive) earned += budgetRatio * WEIGHTS.budget;

    const matchedInterest = interestsActive && selectedDepts.includes(item.department.id);
    if (interestsActive) {
      earned += (matchedInterest ? 1.0 : 0) * WEIGHTS.interests;
    }

    if (modelActive && selectedModelKey) {
      const idx = item.category.business_models_to_explore.indexOf(selectedModelKey);
      const modelRatio = idx === 0 ? 1.0 : 0.85;
      earned += modelRatio * WEIGHTS.model;
    }

    const matchedSkillLabels: string[] = [];
    if (strengthsActive) {
      const overlappingSkills = item.category.skill_tags.filter((s) =>
        preferredSkills.has(s)
      );
      for (const s of overlappingSkills) {
        matchedSkillLabels.push(getSkillTagLabel(s, locale));
      }
      const sourcingMatch =
        prefersSourcing &&
        (item.category.business_models_to_explore.includes('source_and_sell_own_account') ||
          item.category.business_models_to_explore.includes('authorised_licence_resale'));
      const sourcingLabel = getQuizOptionLabel('strengths', 'Sourcing and negotiation', locale);
      if (sourcingMatch && !matchedSkillLabels.includes(sourcingLabel)) {
        matchedSkillLabels.push(sourcingLabel);
      }

      const matchCount = overlappingSkills.length + (sourcingMatch ? 1 : 0);
      const strengthRatio = matchCount >= 2 ? 1.0 : matchCount === 1 ? 0.85 : 0.15;
      earned += strengthRatio * WEIGHTS.strengths;
    }

    if (storageActive && answers.storage) {
      earned += scoreStorageFactor(answers.storage, item) * WEIGHTS.storage;
    }

    if (timeActive && answers.time) {
      earned +=
        scoreTimeFactor(
          answers.time,
          item.category.time_profile,
          item.category.operating_complexity
        ) * WEIGHTS.time;
    }

    const matchedChannelEtsy =
      answers.channel === 'Handmade or creative international selling' &&
      item.category.possible_channel_research.includes('Etsy_creativity_rules');

    if (channelActive) {
      if (answers.channel === 'Handmade or creative international selling') {
        earned += (matchedChannelEtsy ? 1.0 : 0) * WEIGHTS.channel;
      } else if (answers.channel === 'Amazon India Flipkart or Meesho') {
        earned +=
          (item.category.possible_channel_research.includes('domestic_marketplaces')
            ? 1.0
            : 0.1) * WEIGHTS.channel;
      }
    }

    const normalizedScore =
      activeWeightTotal > 0
        ? Math.round(((earned / activeWeightTotal) * 100) * 100) / 100
        : 75;

    let channelCaveat: string | null = null;
    if (etsyCaveatSelected && matchedChannelEtsy) {
      channelCaveat =
        locale === 'hi'
          ? 'मार्केटप्लेस पात्रता मानने से पहले Etsy क्रिएटिविटी मानक पढ़ें और पुष्टि करें कि आप स्वयं इस वस्तु को डिज़ाइन/निर्मित कर रहे हैं।'
          : 'Review Etsy Creativity Standards and confirm whether you are personally making/designing this item before assuming marketplace eligibility.';
    } else if (answers.channel === 'Amazon India Flipkart or Meesho') {
      channelCaveat = getGeneralCopyText(locale).channelResearchStatus;
    }

    return {
      item,
      fitLabel: getFitLabel(normalizedScore),
      normalizedScore,
      reasons: buildMatchReasons(
        answers,
        item,
        budgetRatio,
        matchedInterest,
        selectedModelKey,
        matchedSkillLabels,
        avoidedTags.size,
        channelActive,
        matchedChannelEtsy,
        locale
      ),
      operatingConsideration: buildOperatingConsideration(item, locale),
      channelCaveat,
      firstValidationStep: item.idea.first_validation_step,
    };
  });

  // Deterministic sort: descending normalizedScore, tie-break strictly ascending by stable category ID
  scored.sort((a, b) => {
    if (b.normalizedScore !== a.normalizedScore) {
      return b.normalizedScore - a.normalizedScore;
    }
    return a.item.category.id.localeCompare(b.item.category.id);
  });

  // Enforce max 2 results per department in top 5 when other compatible ideas exist
  const targetCount = Math.min(5, scored.length);
  const selected: RankedIdeaMatch[] = [];
  const selectedIds = new Set<string>();
  const deptCounts: Record<string, number> = {};
  let diversityApplied = false;

  for (const candidate of scored) {
    if (selected.length >= targetCount) break;
    const deptId = candidate.item.department.id;
    const currentDeptCount = deptCounts[deptId] || 0;
    if (currentDeptCount < 2) {
      selected.push(candidate);
      selectedIds.add(candidate.item.category.id);
      deptCounts[deptId] = currentDeptCount + 1;
    } else {
      diversityApplied = true;
    }
  }

  // Fallback pass only if total compatible items are concentrated in <= 2 departments
  if (selected.length < targetCount) {
    for (const candidate of scored) {
      if (selected.length >= targetCount) break;
      if (!selectedIds.has(candidate.item.category.id)) {
        selected.push(candidate);
        selectedIds.add(candidate.item.category.id);
      }
    }
  }

  return {
    matches: selected,
    totalCompatibleCount: scored.length,
    eliminatedSummaries,
    activeWeightTotal,
    skippedFactors,
    channelInvestigationNote,
    budgetEditorialNote,
    storageEditorialNote,
    diversityApplied,
  };
}
