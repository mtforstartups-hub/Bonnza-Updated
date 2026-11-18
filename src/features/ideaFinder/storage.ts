import type { Locale } from '../../domain/types';
import { IDEAS_BY_ID, ENRICHED_IDEA_ITEMS } from './data';
import {
  getBusinessModelLabel,
  getCapitalOrientationLabel,
  getCategoryName,
  getComplexityLabel,
  getDepartmentName,
  getIdeaText,
  getOperatingTagLabel,
  getStorageLabel,
  getSubcategoryName,
  getSubcategoryNotes,
} from './labels';
import type {
  EnrichedIdeaItem,
  IdeaFinderStorageState,
  RankedIdeaMatch,
} from './types';

export const IDEA_FINDER_STORAGE_KEY = 'bonnza.ideaFinder.v1';
export const MAX_COMPARE_IDEAS = 3;

const DEFAULT_STORAGE_STATE: IdeaFinderStorageState = {
  savedIdeaIds: [],
  compareIdeaIds: [],
};

const ENRICHED_BY_IDEA_ID: Record<string, EnrichedIdeaItem> = Object.fromEntries(
  ENRICHED_IDEA_ITEMS.map((entry) => [entry.idea.id, entry])
);

export function loadIdeaFinderStorage(): {
  state: IdeaFinderStorageState;
  storageAvailable: boolean;
} {
  if (typeof window === 'undefined') {
    return { state: DEFAULT_STORAGE_STATE, storageAvailable: false };
  }

  try {
    const raw = window.localStorage.getItem(IDEA_FINDER_STORAGE_KEY);
    if (!raw) {
      return { state: DEFAULT_STORAGE_STATE, storageAvailable: true };
    }
    const parsed = JSON.parse(raw) as Partial<IdeaFinderStorageState> | null;
    const saved = Array.isArray(parsed?.savedIdeaIds)
      ? parsed!.savedIdeaIds.filter(
          (id): id is string => typeof id === 'string' && Boolean(IDEAS_BY_ID[id])
        )
      : [];
    const compare = Array.isArray(parsed?.compareIdeaIds)
      ? parsed!.compareIdeaIds
          .filter((id): id is string => typeof id === 'string' && Boolean(IDEAS_BY_ID[id]))
          .slice(0, MAX_COMPARE_IDEAS)
      : [];

    // Ensure every compared idea is also saved
    const mergedSaved = [...new Set([...saved, ...compare])];

    return {
      state: {
        savedIdeaIds: mergedSaved,
        compareIdeaIds: [...new Set(compare)].slice(0, MAX_COMPARE_IDEAS),
      },
      storageAvailable: true,
    };
  } catch {
    return { state: DEFAULT_STORAGE_STATE, storageAvailable: false };
  }
}

export function persistIdeaFinderStorage(state: IdeaFinderStorageState): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const normalized: IdeaFinderStorageState = {
      savedIdeaIds: [...new Set(state.savedIdeaIds)].filter((id) => Boolean(IDEAS_BY_ID[id])),
      compareIdeaIds: [...new Set(state.compareIdeaIds)]
        .filter((id) => Boolean(IDEAS_BY_ID[id]))
        .slice(0, MAX_COMPARE_IDEAS),
    };
    window.localStorage.setItem(IDEA_FINDER_STORAGE_KEY, JSON.stringify(normalized));
    return true;
  } catch {
    return false;
  }
}

export function buildShortlistTextExport(
  ideaIds: string[],
  locale: Locale = 'en'
): string {
  const items = ideaIds
    .map((id) => ENRICHED_BY_IDEA_ID[id])
    .filter((entry): entry is EnrichedIdeaItem => Boolean(entry));

  if (items.length === 0) {
    return '';
  }

  const today = new Date().toISOString().slice(0, 10);
  const isHi = locale === 'hi';

  const lines: string[] = isHi
    ? [
        'BONNZA — ई-कॉमर्स बिज़नेस आइडिया शॉर्टलिस्ट',
        'स्रोत: Bonnza ई-कॉमर्स बिज़नेस आइडिया फ़ाइंडर (/hi/business-ideas)',
        `निर्यात तिथि: ${today}`,
        `शॉर्टलिस्ट में कुल आइडिया: ${items.length}`,
        '',
        'संपादकीय टिप्पणी: स्टार्टर आइडिया और वर्गीकरण प्रारंभिक योजना मार्गदर्शन हैं—ये सत्यापित बिक्री पूर्वानुमान, बाज़ार मांग स्कोर या मार्केटप्लेस अनुमोदन नहीं हैं।',
        '='.repeat(72),
        '',
      ]
    : [
        'BONNZA — ECOMMERCE BUSINESS IDEA SHORTLIST',
        'Prepared from: Bonnza Ecommerce Business Idea Finder (/business-ideas)',
        `Exported on: ${today}`,
        `Ideas in shortlist: ${items.length}`,
        '',
        'Editorial note: Starter ideas and classifications are planning orientations rather than validated sales forecasts, market demand scores, or marketplace approvals.',
        '='.repeat(72),
        '',
      ];

  items.forEach((entry, index) => {
    const { idea, category, department } = entry;
    const ideaText = getIdeaText(idea, locale);
    const deptName = getDepartmentName(department, locale);
    const catName = getCategoryName(category, locale);
    const directions = category.subcategories
      .map((s) => getSubcategoryName(s, locale))
      .join(', ');
    const models = category.business_models_to_explore
      .map((m) => getBusinessModelLabel(m, locale))
      .join(' | ');
    const cap = getCapitalOrientationLabel(category.capital_orientation, locale);
    const stor = getStorageLabel(category.storage_profile, locale);
    const comp = getComplexityLabel(category.operating_complexity, locale);

    if (isHi) {
      lines.push(`${index + 1}. ${ideaText.title}`);
      lines.push(`विभाग: ${deptName}`);
      lines.push(`बिक्री श्रेणी: ${catName}`);
      lines.push(`उत्पाद दिशाएँ: ${directions}`);
      lines.push(`संभावित ग्राहक: ${ideaText.customer}`);
      lines.push(`ऑफ़र दृष्टिकोण: ${ideaText.angle}`);
      lines.push(`काम करने के तरीके: ${models}`);
      lines.push(
        `परीक्षण पूंजी उन्मुखता: ${cap} (केवल गुणात्मक मार्गदर्शन; वास्तविक सैंपल कोटेशन से पुष्टि करें)`
      );
      lines.push(`स्थान आवश्यकता: ${stor}`);
      lines.push(`संचालन जटिलता: ${comp}`);
      if (category.operating_tags.length > 0) {
        lines.push(
          `संचालन विचारणीय बिंदु: ${category.operating_tags
            .map((t) => getOperatingTagLabel(t, locale))
            .join('; ')}`
        );
      }
      const notedSubs = category.subcategories.filter((s) => s.notes && s.notes.length > 0);
      if (notedSubs.length > 0) {
        lines.push(
          `वेरिएंट नोट्स: ${notedSubs
            .map((s) => `${getSubcategoryName(s, locale)}: ${getSubcategoryNotes(s, locale).join(' ')}`)
            .join(' | ')}`
        );
      }
    } else {
      lines.push(`${index + 1}. ${ideaText.title}`);
      lines.push(`Department: ${deptName}`);
      lines.push(`Selling Category: ${catName}`);
      lines.push(`Product Directions: ${directions}`);
      lines.push(`Potential Customer: ${ideaText.customer}`);
      lines.push(`Offer Angle: ${ideaText.angle}`);
      lines.push(`Way of Working Options: ${models}`);
      lines.push(
        `Test Capital Orientation: ${cap} (qualitative orientation only; obtain real sample quotes)`
      );
      lines.push(`Space Needed: ${stor}`);
      lines.push(`Operating Complexity: ${comp}`);
      if (category.operating_tags.length > 0) {
        lines.push(
          `Operating Considerations: ${category.operating_tags
            .map((t) => getOperatingTagLabel(t, locale))
            .join('; ')}`
        );
      }
      const notedSubs = category.subcategories.filter((s) => s.notes && s.notes.length > 0);
      if (notedSubs.length > 0) {
        lines.push(
          `Variant Notes: ${notedSubs
            .map((s) => `${getSubcategoryName(s, locale)}: ${getSubcategoryNotes(s, locale).join(' ')}`)
            .join(' | ')}`
        );
      }
    }
    lines.push('-'.repeat(72));
    lines.push('');
  });

  if (isHi) {
    lines.push('BONNZA पर अगले उपयोगी शिक्षण चरण');
    lines.push('- बिज़नेस फ़ाउंडेशन कोर्स: /hi/courses/business-foundations');
    lines.push('- रीसेल: सोर्स टू सेल कोर्स: /hi/courses/resell-source-to-sell');
    lines.push('- क्राफ़्ट टू कॉमर्स कोर्स: /hi/courses/craft-to-commerce');
    lines.push('- ऑर्डर कॉस्ट कैलकुलेटर और वर्कशीट: /hi/resources');
    lines.push('- शुरुआती लाइव वेबिनार: /hi/webinars/first-online-business');
    lines.push('');
  } else {
    lines.push('SUGGESTED NEXT LEARNING STEPS ON BONNZA');
    lines.push('- Business Foundations Course: /courses/business-foundations');
    lines.push('- Resell: Source to Sell Course: /courses/resell-source-to-sell');
    lines.push('- Craft to Commerce Course: /courses/craft-to-commerce');
    lines.push('- Order Cost Calculator & Worksheets: /resources');
    lines.push('- Beginner Live Webinar: /webinars/first-online-business');
    lines.push('');
  }

  return lines.join('\n');
}

export function triggerShortlistDownload(
  ideaIds: string[],
  locale: Locale = 'en'
): {
  ok: boolean;
  filename?: string;
  reason?: string;
} {
  const isHi = locale === 'hi';
  const content = buildShortlistTextExport(ideaIds, locale);
  if (!content) {
    return {
      ok: false,
      reason: isHi ? 'डाउनलोड करने के लिए कोई सहेजे गए आइडिया नहीं हैं।' : 'No saved ideas to download.',
    };
  }
  if (typeof document === 'undefined' || typeof URL === 'undefined') {
    return {
      ok: false,
      reason: isHi ? 'ब्राउज़र डाउनलोड API उपलब्ध नहीं है।' : 'Browser download API is unavailable.',
    };
  }

  try {
    const filename = `bonnza-idea-shortlist-${new Date().toISOString().slice(0, 10)}.txt`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    return { ok: true, filename };
  } catch {
    return {
      ok: false,
      reason: isHi
        ? 'इस ब्राउज़र संदर्भ में डाउनलोड शुरू नहीं हो सका। कृपया शॉर्टलिस्ट कॉपी करें।'
        : 'Download could not start in this browser context. Try copying the shortlist instead.',
    };
  }
}

export async function copyShortlistToClipboard(
  ideaIds: string[],
  locale: Locale = 'en'
): Promise<{ ok: boolean; message: string }> {
  const isHi = locale === 'hi';
  const content = buildShortlistTextExport(ideaIds, locale);
  if (!content) {
    return {
      ok: false,
      message: isHi
        ? 'कॉपी करने से पहले कम से कम एक आइडिया सहेजें।'
        : 'Save at least one idea before copying.',
    };
  }

  if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
    return {
      ok: false,
      message: isHi
        ? 'यहाँ क्लिपबोर्ड एक्सेस उपलब्ध नहीं है। कृपया शॉर्टलिस्ट डाउनलोड करें।'
        : 'Clipboard access is unavailable here. Use Download shortlist instead.',
    };
  }

  try {
    await navigator.clipboard.writeText(content);
    return {
      ok: true,
      message: isHi ? 'शॉर्टलिस्ट क्लिपबोर्ड पर कॉपी हो गई।' : 'Shortlist copied to clipboard.',
    };
  } catch {
    return {
      ok: false,
      message: isHi
        ? 'क्लिपबोर्ड अनुमति अवरुद्ध थी। कृपया शॉर्टलिस्ट डाउनलोड करें।'
        : 'Clipboard permission was blocked. Use Download shortlist instead.',
    };
  }
}

export function buildSingleIdeaShareText(
  item: EnrichedIdeaItem,
  locale: Locale = 'en',
  match?: RankedIdeaMatch
): string {
  const isHi = locale === 'hi';
  const { idea, category, department } = item;
  const ideaText = getIdeaText(idea, locale);
  const deptName = getDepartmentName(department, locale);
  const catName = getCategoryName(category, locale);
  const directions = category.subcategories
    .map((s) => getSubcategoryName(s, locale))
    .join(' · ');
  const models = category.business_models_to_explore
    .map((m) => getBusinessModelLabel(m, locale))
    .join(' · ');
  const cap = getCapitalOrientationLabel(category.capital_orientation, locale);
  const stor = getStorageLabel(category.storage_profile, locale);
  const comp = getComplexityLabel(category.operating_complexity, locale);

  const lines: string[] = isHi
    ? [
        ideaText.title,
        `${deptName} — ${catName}`,
        '',
        `ऑफ़र दृष्टिकोण: ${ideaText.angle}`,
        `संभावित ग्राहक: ${ideaText.customer}`,
        `उत्पाद दिशाएँ: ${directions}`,
        `काम करने का तरीका: ${models}`,
        `प्रारंभिक उन्मुखता: ${cap} · ${comp} · ${stor}`,
      ]
    : [
        ideaText.title,
        `${deptName} — ${catName}`,
        '',
        `Offer angle: ${ideaText.angle}`,
        `Potential customer: ${ideaText.customer}`,
        `Product directions: ${directions}`,
        `Way of working: ${models}`,
        `Orientation: ${cap} · ${comp} · ${stor}`,
      ];

  if (category.operating_tags.length > 0) {
    const tags = category.operating_tags
      .map((t) => getOperatingTagLabel(t, locale))
      .join('; ');
    lines.push(
      isHi ? `संचालन विचारणीय बिंदु: ${tags}` : `Operating considerations: ${tags}`
    );
  }

  const notedSubs = category.subcategories.filter((s) => s.notes && s.notes.length > 0);
  if (notedSubs.length > 0) {
    const notesText = notedSubs
      .map(
        (s) => `${getSubcategoryName(s, locale)}: ${getSubcategoryNotes(s, locale).join(' ')}`
      )
      .join(' | ');
    lines.push(isHi ? `वेरिएंट नोट्स: ${notesText}` : `Variant notes: ${notesText}`);
  }

  if (match) {
    if (match.reasons.length > 0) {
      lines.push(
        isHi
          ? `मिलान कारण: ${match.reasons.join('; ')}`
          : `Match reasons: ${match.reasons.join('; ')}`
      );
    }
    if (match.operatingConsideration) {
      lines.push(
        isHi
          ? `संचालन जांच: ${match.operatingConsideration}`
          : `Operating check: ${match.operatingConsideration}`
      );
    }
    if (match.channelCaveat) {
      lines.push(
        isHi
          ? `चैनल जांच: ${match.channelCaveat}`
          : `Channel check: ${match.channelCaveat}`
      );
    }
  }

  lines.push('');
  lines.push(
    isHi
      ? 'स्रोत: Bonnza ई-कॉमर्स बिज़नेस आइडिया फ़ाइंडर (/hi/business-ideas)'
      : 'From: Bonnza Ecommerce Business Idea Finder (/business-ideas)'
  );

  return lines.join('\n');
}

export async function copySingleIdeaToClipboard(
  item: EnrichedIdeaItem,
  locale: Locale = 'en',
  match?: RankedIdeaMatch
): Promise<{ ok: boolean; message: string }> {
  const isHi = locale === 'hi';
  const content = buildSingleIdeaShareText(item, locale, match);

  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(content);
      return {
        ok: true,
        message: isHi ? 'कॉपी हो गया' : 'Copied',
      };
    } catch {
      // Fall through to execCommand fallback if available
    }
  }

  if (typeof document !== 'undefined' && document.body) {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = content;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      textarea.style.pointerEvents = 'none';
      document.body.appendChild(textarea);
      textarea.select();
      const copied =
        typeof document.execCommand === 'function' && document.execCommand('copy');
      document.body.removeChild(textarea);
      if (copied) {
        return {
          ok: true,
          message: isHi ? 'कॉपी हो गया' : 'Copied',
        };
      }
    } catch {
      // Ignore and return fallback error below
    }
  }

  return {
    ok: false,
    message: isHi
      ? 'क्लिपबोर्ड एक्सेस उपलब्ध नहीं है।'
      : 'Clipboard access is unavailable here.',
  };
}

