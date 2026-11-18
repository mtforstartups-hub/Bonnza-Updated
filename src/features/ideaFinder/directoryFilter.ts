import type { Locale } from '../../domain/types';
import { CATEGORIES_BY_ID, DEPARTMENTS_BY_ID, ENRICHED_IDEA_ITEMS } from './data';
import {
  getBusinessModelLabel,
  getCapitalOrientationLabel,
  getCategoryName,
  getChannelResearchShortLabel,
  getComplexityLabel,
  getDepartmentName,
  getIdeaText,
  getOperatingTagLabel,
  getStorageLabel,
  getSubcategoryName,
} from './labels';
import type {
  BusinessModelKey,
  CapitalOrientation,
  ChannelResearchTag,
  DirectoryFilterState,
  DirectorySortOption,
  EnrichedIdeaItem,
  OperatingComplexity,
  OperatingTag,
  StorageProfile,
} from './types';

export const INITIAL_DIRECTORY_FILTERS: DirectoryFilterState = {
  search: '',
  departmentIds: [],
  categoryIds: [],
  subcategoryIds: [],
  capitalOrientations: [],
  businessModels: [],
  operatingComplexities: [],
  storageProfiles: [],
  channelsToResearch: [],
  avoidTags: [],
  sort: 'relevance',
};

const VALID_CAPITAL = new Set<CapitalOrientation>(['lower', 'moderate', 'higher']);
const VALID_MODELS = new Set<BusinessModelKey>([
  'source_and_sell_own_account',
  'make_own_product',
  'personalise_to_order',
  'original_digital_product',
  'authorised_licence_resale',
]);
const VALID_COMPLEXITY = new Set<OperatingComplexity>(['simpler', 'guided', 'specialist']);
const VALID_STORAGE = new Set<StorageProfile>([
  'no_physical_stock',
  'small_dedicated_storage',
  'larger_space',
]);
const VALID_CHANNELS = new Set<ChannelResearchTag>([
  'own_social_or_store',
  'domestic_marketplaces',
  'Etsy_creativity_rules',
]);
const VALID_AVOID = new Set<OperatingTag>([
  'fragile_items',
  'bulky_storage_or_shipping',
  'size_or_fit_variants',
  'expiry_or_storage_control',
  'electrical_or_battery_variants',
  'specialist_product_checks',
  'safety_critical_variants',
  'health_or_personal_wellness',
]);
const VALID_SORTS = new Set<DirectorySortOption>([
  'relevance',
  'simpler_operations',
  'alphabetical',
]);

const SEARCH_SYNONYMS: Record<string, string[]> = {
  jewelry: ['jewellery', 'earrings', 'bangles'],
  jewellery: ['jewelry', 'earrings', 'bangles'],
  custom: ['personalise', 'personalised', 'customised'],
  customise: ['personalise', 'personalised'],
  customize: ['personalise', 'personalised'],
  handmade: ['craft', 'crafting', 'artisan'],
  mobile: ['phone', 'phones', 'smartphone'],
  phone: ['mobile', 'phones'],
  printable: ['digital', 'planners', 'templates'],
  digital: ['printable', 'software', 'downloads'],
  organic: ['natural', 'herbal'],
  resell: ['source', 'supplier'],
  dropship: ['source', 'account'],
  ज्वेलरी: ['आभूषण', 'चूड़ियाँ', 'ईयररिंग्स'],
  आभूषण: ['ज्वेलरी', 'चूड़ियाँ', 'ईयररिंग्स'],
  साड़ी: ['साड़ियाँ', 'ब्लाउज़'],
  साड़ियाँ: ['साड़ी', 'ब्लाउज़'],
  मसाला: ['मसाले', 'अचार', 'जार'],
  मसाले: ['मसाला', 'अचार', 'जार'],
  डिजिटल: ['प्रिंटेबल', 'प्लानर', 'टेम्पलेट'],
  प्रिंटेबल: ['डिजिटल', 'प्लानर', 'टेम्पलेट'],
  गिफ्ट: ['उपहार', 'गिफ़्टिंग'],
  उपहार: ['गिफ्ट', 'गिफ़्टिंग'],
};

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\s]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function expandSearchTerms(query: string): string[] {
  const normalized = normalizeText(query);
  if (!normalized) return [];
  const tokens = normalized.split(' ').filter(Boolean);
  const groups: string[] = [normalized];
  for (const token of tokens) {
    groups.push(token);
    const synonyms = SEARCH_SYNONYMS[token];
    if (synonyms) {
      for (const s of synonyms) groups.push(s);
    }
  }
  return [...new Set(groups)];
}

/**
 * Ensures hierarchical consistency: changing parent departments prunes incompatible child categories
 * and subcategories; changing selected categories prunes incompatible child subcategories.
 */
export function sanitizeDirectoryHierarchy(
  state: DirectoryFilterState
): DirectoryFilterState {
  const validDepts = state.departmentIds.filter((id) => Boolean(DEPARTMENTS_BY_ID[id]));

  const validCats = state.categoryIds.filter((catId) => {
    const cat = CATEGORIES_BY_ID[catId];
    if (!cat) return false;
    if (validDepts.length > 0 && !validDepts.includes(cat.department_id)) {
      return false;
    }
    return true;
  });

  const validSubs = state.subcategoryIds.filter((subId) => {
    const parentCatId = subId.split('-')[0];
    const cat = CATEGORIES_BY_ID[parentCatId];
    if (!cat) return false;
    if (!cat.subcategories.some((s) => s.id === subId)) return false;
    if (validDepts.length > 0 && !validDepts.includes(cat.department_id)) {
      return false;
    }
    if (validCats.length > 0 && !validCats.includes(cat.id)) {
      return false;
    }
    return true;
  });

  return {
    ...state,
    departmentIds: validDepts,
    categoryIds: validCats,
    subcategoryIds: validSubs,
  };
}

function computeSearchRelevance(item: EnrichedIdeaItem, query: string): number {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return 0;

  const catNameEn = normalizeText(item.category.name);
  const catNameHi = normalizeText(getCategoryName(item.category, 'hi'));
  const hiIdea = getIdeaText(item.idea, 'hi');
  const ideaTitleEn = normalizeText(item.idea.title);
  const ideaTitleHi = normalizeText(hiIdea.title);
  const deptNameEn = normalizeText(item.department.name);
  const deptNameHi = normalizeText(getDepartmentName(item.department, 'hi'));
  const subNamesEn = item.category.subcategories.map((s) => normalizeText(s.name));
  const subNamesHi = item.category.subcategories.map((s) =>
    normalizeText(getSubcategoryName(s, 'hi'))
  );
  const customerEn = normalizeText(item.idea.customer);
  const customerHi = normalizeText(hiIdea.customer);
  const angleEn = normalizeText(item.idea.angle);
  const angleHi = normalizeText(hiIdea.angle);
  const catId = item.category.id.toLowerCase();

  let score = 0;

  if (
    catId === normalizedQuery ||
    catNameEn === normalizedQuery ||
    catNameHi === normalizedQuery
  ) {
    score += 120;
  }
  if (catNameEn.includes(normalizedQuery) || catNameHi.includes(normalizedQuery)) score += 90;
  if (ideaTitleEn.includes(normalizedQuery) || ideaTitleHi.includes(normalizedQuery)) score += 75;
  if (
    subNamesEn.some((s) => s.includes(normalizedQuery)) ||
    subNamesHi.some((s) => s.includes(normalizedQuery))
  ) {
    score += 65;
  }
  if (deptNameEn.includes(normalizedQuery) || deptNameHi.includes(normalizedQuery)) score += 40;
  if (
    customerEn.includes(normalizedQuery) ||
    customerHi.includes(normalizedQuery) ||
    angleEn.includes(normalizedQuery) ||
    angleHi.includes(normalizedQuery)
  ) {
    score += 30;
  }

  const tokens = normalizedQuery.split(' ').filter(Boolean);
  const expandedAll = expandSearchTerms(query);
  const fullCorpus = [
    catNameEn,
    catNameHi,
    ideaTitleEn,
    ideaTitleHi,
    deptNameEn,
    deptNameHi,
    customerEn,
    customerHi,
    angleEn,
    angleHi,
    ...subNamesEn,
    ...subNamesHi,
  ].join(' ');

  // Must match every typed token (or at least one of its synonyms) to match multi-word search queries
  const allTokensSatisfied = tokens.every((token) => {
    if (fullCorpus.includes(token)) return true;
    const syns = SEARCH_SYNONYMS[token];
    return Boolean(syns && syns.some((syn) => fullCorpus.includes(syn)));
  });

  if (!allTokensSatisfied) {
    return -1;
  }

  for (const term of expandedAll) {
    if (catNameEn.includes(term) || catNameHi.includes(term)) score += 20;
    if (subNamesEn.some((s) => s.includes(term)) || subNamesHi.some((s) => s.includes(term))) {
      score += 15;
    }
    if (ideaTitleEn.includes(term) || ideaTitleHi.includes(term)) score += 12;
  }

  return Math.max(score, 10);
}

const COMPLEXITY_RANK: Record<OperatingComplexity, number> = {
  simpler: 0,
  guided: 1,
  specialist: 2,
};

export interface FilteredDirectoryResult {
  items: EnrichedIdeaItem[];
  totalCount: number;
  activeFilterCount: number;
}

export function filterAndSortDirectory(
  rawState: DirectoryFilterState,
  locale: Locale = 'en'
): FilteredDirectoryResult {
  const state = sanitizeDirectoryHierarchy(rawState);
  const hasSearch = Boolean(normalizeText(state.search));

  const matchedWithScore: Array<{ item: EnrichedIdeaItem; relevance: number }> = [];

  for (const item of ENRICHED_IDEA_ITEMS) {
    // 1. Search filter
    let relevance = 0;
    if (hasSearch) {
      relevance = computeSearchRelevance(item, state.search);
      if (relevance < 0) continue;
    }

    // 2. Department filter (OR within group)
    if (
      state.departmentIds.length > 0 &&
      !state.departmentIds.includes(item.department.id)
    ) {
      continue;
    }

    // 3. Selling category filter (OR within group)
    if (
      state.categoryIds.length > 0 &&
      !state.categoryIds.includes(item.category.id)
    ) {
      continue;
    }

    // 4. Product subcategory filter (OR within group)
    if (
      state.subcategoryIds.length > 0 &&
      !item.category.subcategories.some((s) => state.subcategoryIds.includes(s.id))
    ) {
      continue;
    }

    // 5. Capital orientation filter (OR within group)
    if (
      state.capitalOrientations.length > 0 &&
      !state.capitalOrientations.includes(item.category.capital_orientation)
    ) {
      continue;
    }

    // 6. Business model filter (OR within group)
    if (
      state.businessModels.length > 0 &&
      !state.businessModels.some((m) =>
        item.category.business_models_to_explore.includes(m)
      )
    ) {
      continue;
    }

    // 7. Operating complexity filter (OR within group)
    if (
      state.operatingComplexities.length > 0 &&
      !state.operatingComplexities.includes(item.category.operating_complexity)
    ) {
      continue;
    }

    // 8. Storage profile filter (OR within group)
    if (
      state.storageProfiles.length > 0 &&
      !state.storageProfiles.includes(item.category.storage_profile)
    ) {
      continue;
    }

    // 9. Channel to research filter (OR within group)
    if (
      state.channelsToResearch.length > 0 &&
      !state.channelsToResearch.some((ch) =>
        item.category.possible_channel_research.includes(ch)
      )
    ) {
      continue;
    }

    // 10. Operating considerations exclusion (exclude ANY matching avoided tag)
    if (state.avoidTags.length > 0) {
      const hasAvoidedTag = state.avoidTags.some((tag) => {
        if (tag === 'specialist_product_checks') {
          return (
            item.category.operating_tags.includes('specialist_product_checks') ||
            item.category.operating_tags.includes('safety_critical_variants') ||
            item.category.operating_tags.includes('health_or_personal_wellness')
          );
        }
        return item.category.operating_tags.includes(tag);
      });
      if (hasAvoidedTag) continue;
    }

    matchedWithScore.push({ item, relevance });
  }

  // Deterministic sort according to selected sort option
  matchedWithScore.sort((a, b) => {
    if (state.sort === 'alphabetical') {
      const nameA = getCategoryName(a.item.category, locale);
      const nameB = getCategoryName(b.item.category, locale);
      const cmp = nameA.localeCompare(nameB, locale === 'hi' ? 'hi' : 'en');
      return cmp !== 0 ? cmp : a.item.category.id.localeCompare(b.item.category.id);
    }
    if (state.sort === 'simpler_operations') {
      const compCmp =
        COMPLEXITY_RANK[a.item.category.operating_complexity] -
        COMPLEXITY_RANK[b.item.category.operating_complexity];
      if (compCmp !== 0) return compCmp;
      const tagsCmp =
        a.item.category.operating_tags.length - b.item.category.operating_tags.length;
      if (tagsCmp !== 0) return tagsCmp;
      return a.item.category.id.localeCompare(b.item.category.id);
    }
    // Relevance: highest search score first, then stable category ID
    if (b.relevance !== a.relevance) {
      return b.relevance - a.relevance;
    }
    return a.item.category.id.localeCompare(b.item.category.id);
  });

  const activeFilterCount =
    (hasSearch ? 1 : 0) +
    state.departmentIds.length +
    state.categoryIds.length +
    state.subcategoryIds.length +
    state.capitalOrientations.length +
    state.businessModels.length +
    state.operatingComplexities.length +
    state.storageProfiles.length +
    state.channelsToResearch.length +
    state.avoidTags.length;

  return {
    items: matchedWithScore.map((m) => m.item),
    totalCount: matchedWithScore.length,
    activeFilterCount,
  };
}

export interface ActiveFilterChip {
  key: string;
  label: string;
  remove: (current: DirectoryFilterState) => DirectoryFilterState;
}

export function getActiveFilterChips(
  state: DirectoryFilterState,
  locale: Locale = 'en'
): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = [];

  if (state.search.trim()) {
    chips.push({
      key: `search:${state.search}`,
      label:
        locale === 'hi'
          ? `खोज: "${state.search.trim()}"`
          : `Search: "${state.search.trim()}"`,
      remove: (c) => ({ ...c, search: '' }),
    });
  }

  for (const id of state.departmentIds) {
    const dept = DEPARTMENTS_BY_ID[id];
    if (dept) {
      const deptLabel = getDepartmentName(dept, locale);
      chips.push({
        key: `dept:${id}`,
        label: locale === 'hi' ? `विभाग: ${deptLabel}` : `Department: ${deptLabel}`,
        remove: (c) =>
          sanitizeDirectoryHierarchy({
            ...c,
            departmentIds: c.departmentIds.filter((d) => d !== id),
          }),
      });
    }
  }

  for (const id of state.categoryIds) {
    const cat = CATEGORIES_BY_ID[id];
    if (cat) {
      const catLabel = getCategoryName(cat, locale);
      chips.push({
        key: `cat:${id}`,
        label: locale === 'hi' ? `श्रेणी: ${catLabel}` : `Category: ${catLabel}`,
        remove: (c) =>
          sanitizeDirectoryHierarchy({
            ...c,
            categoryIds: c.categoryIds.filter((x) => x !== id),
          }),
      });
    }
  }

  for (const subId of state.subcategoryIds) {
    const cat = CATEGORIES_BY_ID[subId.split('-')[0]];
    const sub = cat?.subcategories.find((s) => s.id === subId);
    if (sub) {
      const subLabel = getSubcategoryName(sub, locale);
      chips.push({
        key: `sub:${subId}`,
        label: locale === 'hi' ? `दिशा: ${subLabel}` : `Direction: ${subLabel}`,
        remove: (c) => ({
          ...c,
          subcategoryIds: c.subcategoryIds.filter((x) => x !== subId),
        }),
      });
    }
  }

  for (const cap of state.capitalOrientations) {
    chips.push({
      key: `cap:${cap}`,
      label: getCapitalOrientationLabel(cap, locale),
      remove: (c) => ({
        ...c,
        capitalOrientations: c.capitalOrientations.filter((x) => x !== cap),
      }),
    });
  }

  for (const model of state.businessModels) {
    chips.push({
      key: `model:${model}`,
      label: getBusinessModelLabel(model, locale),
      remove: (c) => ({
        ...c,
        businessModels: c.businessModels.filter((x) => x !== model),
      }),
    });
  }

  for (const comp of state.operatingComplexities) {
    chips.push({
      key: `comp:${comp}`,
      label: getComplexityLabel(comp, locale),
      remove: (c) => ({
        ...c,
        operatingComplexities: c.operatingComplexities.filter((x) => x !== comp),
      }),
    });
  }

  for (const stor of state.storageProfiles) {
    chips.push({
      key: `stor:${stor}`,
      label: getStorageLabel(stor, locale),
      remove: (c) => ({
        ...c,
        storageProfiles: c.storageProfiles.filter((x) => x !== stor),
      }),
    });
  }

  for (const ch of state.channelsToResearch) {
    const chLabel = getChannelResearchShortLabel(ch, locale);
    chips.push({
      key: `ch:${ch}`,
      label: locale === 'hi' ? `चैनल: ${chLabel}` : `Channel: ${chLabel}`,
      remove: (c) => ({
        ...c,
        channelsToResearch: c.channelsToResearch.filter((x) => x !== ch),
      }),
    });
  }

  for (const avoid of state.avoidTags) {
    const avoidLabel = getOperatingTagLabel(avoid, locale);
    chips.push({
      key: `avoid:${avoid}`,
      label: locale === 'hi' ? `बचें: ${avoidLabel}` : `Avoid: ${avoidLabel}`,
      remove: (c) => ({
        ...c,
        avoidTags: c.avoidTags.filter((x) => x !== avoid),
      }),
    });
  }

  return chips;
}

function parseListParam(params: URLSearchParams, key: string): string[] {
  const raw = params.get(key);
  if (!raw) return [];
  return raw
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

/**
 * Parses shareable browse filter parameters from URLSearchParams while ignoring any
 * unknown/personal keys (quiz answers & contact details are never stored in URL).
 */
export function parseDirectoryStateFromSearchParams(
  params: URLSearchParams
): DirectoryFilterState {
  const sortRaw = params.get('sort') as DirectorySortOption | null;

  return sanitizeDirectoryHierarchy({
    search: params.get('q') || '',
    departmentIds: parseListParam(params, 'dept'),
    categoryIds: parseListParam(params, 'cat'),
    subcategoryIds: parseListParam(params, 'sub'),
    capitalOrientations: parseListParam(params, 'cap').filter((v): v is CapitalOrientation =>
      VALID_CAPITAL.has(v as CapitalOrientation)
    ),
    businessModels: parseListParam(params, 'model').filter((v): v is BusinessModelKey =>
      VALID_MODELS.has(v as BusinessModelKey)
    ),
    operatingComplexities: parseListParam(params, 'comp').filter(
      (v): v is OperatingComplexity => VALID_COMPLEXITY.has(v as OperatingComplexity)
    ),
    storageProfiles: parseListParam(params, 'stor').filter((v): v is StorageProfile =>
      VALID_STORAGE.has(v as StorageProfile)
    ),
    channelsToResearch: parseListParam(params, 'ch').filter((v): v is ChannelResearchTag =>
      VALID_CHANNELS.has(v as ChannelResearchTag)
    ),
    avoidTags: parseListParam(params, 'avoid').filter((v): v is OperatingTag =>
      VALID_AVOID.has(v as OperatingTag)
    ),
    sort: sortRaw && VALID_SORTS.has(sortRaw) ? sortRaw : 'relevance',
  });
}

export function serializeDirectoryStateToSearchParams(
  mode: 'quiz' | 'browse',
  rawState: DirectoryFilterState
): URLSearchParams {
  const state = sanitizeDirectoryHierarchy(rawState);
  const params = new URLSearchParams();

  if (mode === 'browse') {
    params.set('mode', 'browse');
  }

  if (state.search.trim()) params.set('q', state.search.trim());
  if (state.departmentIds.length > 0) params.set('dept', state.departmentIds.join(','));
  if (state.categoryIds.length > 0) params.set('cat', state.categoryIds.join(','));
  if (state.subcategoryIds.length > 0) params.set('sub', state.subcategoryIds.join(','));
  if (state.capitalOrientations.length > 0) {
    params.set('cap', state.capitalOrientations.join(','));
  }
  if (state.businessModels.length > 0) params.set('model', state.businessModels.join(','));
  if (state.operatingComplexities.length > 0) {
    params.set('comp', state.operatingComplexities.join(','));
  }
  if (state.storageProfiles.length > 0) params.set('stor', state.storageProfiles.join(','));
  if (state.channelsToResearch.length > 0) {
    params.set('ch', state.channelsToResearch.join(','));
  }
  if (state.avoidTags.length > 0) params.set('avoid', state.avoidTags.join(','));
  if (state.sort !== 'relevance') params.set('sort', state.sort);

  return params;
}
