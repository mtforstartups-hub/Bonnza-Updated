import { useMemo, useState } from 'react';
import {
  ChevronDown,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import type { Locale } from '../../domain/types';
import { BonnzaImage } from '../../components/IllustrativeDiagrams';
import { getCategoryImageUrl, IDEA_FINDER_DATASET } from './data';
import {
  filterAndSortDirectory,
  getActiveFilterChips,
  INITIAL_DIRECTORY_FILTERS,
  sanitizeDirectoryHierarchy,
} from './directoryFilter';
import {
  BUSINESS_MODEL_LABELS,
  DIRECTORY_AVOID_OPTIONS,
  getBusinessModelLabel,
  getCapitalOrientationLabel,
  getCategoryName,
  getChannelResearchShortLabel,
  getComplexityLabel,
  getDepartmentName,
  getStorageLabel,
  getSubcategoryName,
} from './labels';
import { IdeaCard } from './IdeaCard';
import type {
  BusinessModelKey,
  CapitalOrientation,
  ChannelResearchTag,
  DirectoryFilterState,
  DirectorySortOption,
  EnrichedIdeaItem,
  OperatingComplexity,
  OperatingTag,
  RankedIdeaMatch,
  StorageProfile,
} from './types';

interface DirectoryExplorerProps {
  locale: Locale;
  filters: DirectoryFilterState;
  savedIdeaIds: string[];
  compareIdeaIds: string[];
  onChangeFilters: (next: DirectoryFilterState) => void;
  onResetFilters: () => void;
  onToggleSave: (ideaId: string) => void;
  onToggleCompare: (ideaId: string) => void;
  onOpenDetail: (item: EnrichedIdeaItem, match?: RankedIdeaMatch) => void;
}

const PAGE_BATCH_SIZE = 12;

function toggleInArray<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function DirectoryExplorer({
  locale,
  filters,
  savedIdeaIds,
  compareIdeaIds,
  onChangeFilters,
  onResetFilters,
  onToggleSave,
  onToggleCompare,
  onOpenDetail,
}: DirectoryExplorerProps) {
  const [visibleLimit, setVisibleLimit] = useState(PAGE_BATCH_SIZE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileDraftFilters, setMobileDraftFilters] =
    useState<DirectoryFilterState>(filters);

  const isHi = locale === 'hi';

  const result = useMemo(
    () => filterAndSortDirectory(filters, locale),
    [filters, locale]
  );
  const mobileDraftResult = useMemo(
    () => filterAndSortDirectory(mobileDraftFilters, locale),
    [mobileDraftFilters, locale]
  );
  const activeChips = useMemo(
    () => getActiveFilterChips(filters, locale),
    [filters, locale]
  );

  const displayedItems = result.items.slice(0, visibleLimit);
  const hasMore = displayedItems.length < result.items.length;

  const openMobileDrawer = () => {
    setMobileDraftFilters(filters);
    setMobileFiltersOpen(true);
  };

  const applyMobileDrawer = () => {
    onChangeFilters(sanitizeDirectoryHierarchy(mobileDraftFilters));
    setVisibleLimit(PAGE_BATCH_SIZE);
    setMobileFiltersOpen(false);
  };

  const updateFilterAndResetPage = (
    updater: (prev: DirectoryFilterState) => DirectoryFilterState
  ) => {
    setVisibleLimit(PAGE_BATCH_SIZE);
    onChangeFilters(sanitizeDirectoryHierarchy(updater(filters)));
  };

  const renderFilterSections = (
    targetFilters: DirectoryFilterState,
    setTargetFilters: (next: DirectoryFilterState) => void,
    idPrefix: string
  ) => {
    // Scoped selling categories based on selected departments
    const scopedCategories =
      targetFilters.departmentIds.length > 0
        ? IDEA_FINDER_DATASET.categories.filter((c) =>
            targetFilters.departmentIds.includes(c.department_id)
          )
        : IDEA_FINDER_DATASET.categories;

    // Scoped product subcategories based on selected categories (or selected department)
    const scopedSubcategories =
      targetFilters.categoryIds.length > 0
        ? IDEA_FINDER_DATASET.categories
            .filter((c) => targetFilters.categoryIds.includes(c.id))
            .flatMap((c) =>
              c.subcategories.map((s) => ({
                ...s,
                categoryName: getCategoryName(c, locale),
              }))
            )
        : targetFilters.departmentIds.length > 0
          ? scopedCategories.flatMap((c) =>
              c.subcategories.map((s) => ({
                ...s,
                categoryName: getCategoryName(c, locale),
              }))
            )
          : [];

    const updateTarget = (
      updater: (prev: DirectoryFilterState) => DirectoryFilterState
    ) => {
      setTargetFilters(sanitizeDirectoryHierarchy(updater(targetFilters)));
    };

    return (
      <div className="space-y-6 text-xs">
        {/* 1. Department */}
        <fieldset className="space-y-2">
          <legend className="text-xs font-bold uppercase tracking-wider text-[#1A1B1A]">
            {isHi ? 'विभाग' : 'Department'}
          </legend>
          <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
            {IDEA_FINDER_DATASET.departments.map((dept) => {
              const checked = targetFilters.departmentIds.includes(dept.id);
              return (
                <label
                  key={dept.id}
                  htmlFor={`${idPrefix}-dept-${dept.id}`}
                  className="flex items-start gap-2.5 py-1 cursor-pointer text-[#1A1B1A] hover:text-black"
                >
                  <input
                    id={`${idPrefix}-dept-${dept.id}`}
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      updateTarget((prev) => ({
                        ...prev,
                        departmentIds: toggleInArray(prev.departmentIds, dept.id),
                      }))
                    }
                    className="mt-0.5 h-4 w-4 rounded border-[#666A65] accent-[#1A1B1A]"
                  />
                  <span className="leading-snug flex-1">
                    {getDepartmentName(dept, locale)}{' '}
                    <span className="font-mono-tabular text-[#666A65]">
                      ({dept.category_ids.length})
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* 2. Selling Category (visible cleanly with parent context) */}
        <fieldset className="space-y-2 pt-4 border-t border-[#E6E6DF]">
          <legend className="text-xs font-bold uppercase tracking-wider text-[#1A1B1A]">
            {isHi ? 'बिक्री श्रेणी' : 'Selling category'}
          </legend>
          <p className="text-[11px] text-[#666A65]">
            {targetFilters.departmentIds.length > 0
              ? isHi
                ? 'चयनित विभाग के अनुसार फ़िल्टर किया गया'
                : `Filtered to selected ${
                    targetFilters.departmentIds.length === 1 ? 'department' : 'departments'
                  }`
              : isHi
                ? 'सूची सीमित करने के लिए ऊपर विभाग चुनें, या सीधे चुनें'
                : 'Choose a department above to narrow this list, or pick directly'}
          </p>
          <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
            {scopedCategories.map((cat) => {
              const checked = targetFilters.categoryIds.includes(cat.id);
              const catLabel = getCategoryName(cat, locale);
              return (
                <label
                  key={cat.id}
                  htmlFor={`${idPrefix}-cat-${cat.id}`}
                  className="flex items-start gap-2.5 py-1 cursor-pointer text-[#1A1B1A]"
                >
                  <input
                    id={`${idPrefix}-cat-${cat.id}`}
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      updateTarget((prev) => ({
                        ...prev,
                        categoryIds: toggleInArray(prev.categoryIds, cat.id),
                      }))
                    }
                    className="mt-0.5 h-4 w-4 rounded border-[#666A65] accent-[#1A1B1A]"
                  />
                  <span className="w-5 h-5 rounded-[5px] border border-[#E6E6DF] bg-[#F4C940] overflow-hidden shrink-0 mt-0.5">
                    <BonnzaImage
                      src={getCategoryImageUrl(cat.id)}
                      alt={catLabel}
                      className="w-full h-full object-cover"
                    />
                  </span>
                  <span className="leading-snug flex-1">
                    {catLabel}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* 3. Product Subcategory (active when parent department or category chosen) */}
        {scopedSubcategories.length > 0 && (
          <fieldset className="space-y-2 pt-4 border-t border-[#E6E6DF]">
            <legend className="text-xs font-bold uppercase tracking-wider text-[#1A1B1A]">
              {isHi ? 'उत्पाद उप-श्रेणी' : 'Product subcategory'}
            </legend>
            <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
              {scopedSubcategories.map((sub) => {
                const checked = targetFilters.subcategoryIds.includes(sub.id);
                return (
                  <label
                    key={sub.id}
                    htmlFor={`${idPrefix}-sub-${sub.id}`}
                    className="flex items-start gap-2.5 py-1 cursor-pointer text-[#1A1B1A]"
                  >
                    <input
                      id={`${idPrefix}-sub-${sub.id}`}
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        updateTarget((prev) => ({
                          ...prev,
                          subcategoryIds: toggleInArray(prev.subcategoryIds, sub.id),
                        }))
                      }
                      className="mt-0.5 h-4 w-4 rounded border-[#666A65] accent-[#1A1B1A]"
                    />
                    <span className="leading-snug flex-1">
                      {getSubcategoryName(sub, locale)}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        {/* 4. Capital Orientation */}
        <fieldset className="space-y-2 pt-4 border-t border-[#E6E6DF]">
          <legend className="text-xs font-bold uppercase tracking-wider text-[#1A1B1A]">
            {isHi ? 'परीक्षण पूंजी उन्मुखता' : 'Test capital orientation'}
          </legend>
          <div className="space-y-1.5">
            {(['lower', 'moderate', 'higher'] as CapitalOrientation[]).map((cap) => (
              <label
                key={cap}
                htmlFor={`${idPrefix}-cap-${cap}`}
                className="flex items-start gap-2.5 py-1 cursor-pointer text-[#1A1B1A]"
              >
                <input
                  id={`${idPrefix}-cap-${cap}`}
                  type="checkbox"
                  checked={targetFilters.capitalOrientations.includes(cap)}
                  onChange={() =>
                    updateTarget((prev) => ({
                      ...prev,
                      capitalOrientations: toggleInArray(prev.capitalOrientations, cap),
                    }))
                  }
                  className="mt-0.5 h-4 w-4 rounded border-[#666A65] accent-[#1A1B1A]"
                />
                <span>{getCapitalOrientationLabel(cap, locale)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* 5. Way of Working */}
        <fieldset className="space-y-2 pt-4 border-t border-[#E6E6DF]">
          <legend className="text-xs font-bold uppercase tracking-wider text-[#1A1B1A]">
            {isHi ? 'काम करने का तरीका' : 'Way of working'}
          </legend>
          <div className="space-y-1.5">
            {(Object.keys(BUSINESS_MODEL_LABELS) as BusinessModelKey[]).map((model) => (
              <label
                key={model}
                htmlFor={`${idPrefix}-model-${model}`}
                className="flex items-start gap-2.5 py-1 cursor-pointer text-[#1A1B1A]"
              >
                <input
                  id={`${idPrefix}-model-${model}`}
                  type="checkbox"
                  checked={targetFilters.businessModels.includes(model)}
                  onChange={() =>
                    updateTarget((prev) => ({
                      ...prev,
                      businessModels: toggleInArray(prev.businessModels, model),
                    }))
                  }
                  className="mt-0.5 h-4 w-4 rounded border-[#666A65] accent-[#1A1B1A]"
                />
                <span>{getBusinessModelLabel(model, locale)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* 6. Operating Complexity */}
        <fieldset className="space-y-2 pt-4 border-t border-[#E6E6DF]">
          <legend className="text-xs font-bold uppercase tracking-wider text-[#1A1B1A]">
            {isHi ? 'संचालन जटिलता' : 'Operating complexity'}
          </legend>
          <div className="space-y-1.5">
            {(['simpler', 'guided', 'specialist'] as OperatingComplexity[]).map(
              (comp) => (
                <label
                  key={comp}
                  htmlFor={`${idPrefix}-comp-${comp}`}
                  className="flex items-start gap-2.5 py-1 cursor-pointer text-[#1A1B1A]"
                >
                  <input
                    id={`${idPrefix}-comp-${comp}`}
                    type="checkbox"
                    checked={targetFilters.operatingComplexities.includes(comp)}
                    onChange={() =>
                      updateTarget((prev) => ({
                        ...prev,
                        operatingComplexities: toggleInArray(
                          prev.operatingComplexities,
                          comp
                        ),
                      }))
                    }
                    className="mt-0.5 h-4 w-4 rounded border-[#666A65] accent-[#1A1B1A]"
                  />
                  <span>{getComplexityLabel(comp, locale)}</span>
                </label>
              )
            )}
          </div>
        </fieldset>

        {/* 7. Storage Needs */}
        <fieldset className="space-y-2 pt-4 border-t border-[#E6E6DF]">
          <legend className="text-xs font-bold uppercase tracking-wider text-[#1A1B1A]">
            {isHi ? 'स्टोरेज और पैकिंग स्थान' : 'Storage & packing space'}
          </legend>
          <div className="space-y-1.5">
            {(
              [
                'no_physical_stock',
                'small_dedicated_storage',
                'larger_space',
              ] as StorageProfile[]
            ).map((stor) => (
              <label
                key={stor}
                htmlFor={`${idPrefix}-stor-${stor}`}
                className="flex items-start gap-2.5 py-1 cursor-pointer text-[#1A1B1A]"
              >
                <input
                  id={`${idPrefix}-stor-${stor}`}
                  type="checkbox"
                  checked={targetFilters.storageProfiles.includes(stor)}
                  onChange={() =>
                    updateTarget((prev) => ({
                      ...prev,
                      storageProfiles: toggleInArray(prev.storageProfiles, stor),
                    }))
                  }
                  className="mt-0.5 h-4 w-4 rounded border-[#666A65] accent-[#1A1B1A]"
                />
                <span>{getStorageLabel(stor, locale)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* 8. Channels to Research */}
        <fieldset className="space-y-2 pt-4 border-t border-[#E6E6DF]">
          <legend className="text-xs font-bold uppercase tracking-wider text-[#1A1B1A]">
            {isHi ? 'शोध करने योग्य चैनल' : 'Channels to research'}
          </legend>
          <div className="space-y-1.5">
            {(
              [
                'domestic_marketplaces',
                'own_social_or_store',
                'Etsy_creativity_rules',
              ] as ChannelResearchTag[]
            ).map((ch) => (
              <label
                key={ch}
                htmlFor={`${idPrefix}-ch-${ch}`}
                className="flex items-start gap-2.5 py-1 cursor-pointer text-[#1A1B1A]"
              >
                <input
                  id={`${idPrefix}-ch-${ch}`}
                  type="checkbox"
                  checked={targetFilters.channelsToResearch.includes(ch)}
                  onChange={() =>
                    updateTarget((prev) => ({
                      ...prev,
                      channelsToResearch: toggleInArray(prev.channelsToResearch, ch),
                    }))
                  }
                  className="mt-0.5 h-4 w-4 rounded border-[#666A65] accent-[#1A1B1A]"
                />
                <span>{getChannelResearchShortLabel(ch, locale)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* 9. Avoid Operating Demands (Exclusion Logic) */}
        <fieldset className="space-y-2 pt-4 border-t border-[#E6E6DF]">
          <legend className="text-xs font-bold uppercase tracking-wider text-[#1A1B1A]">
            {isHi ? 'संचालन बाधाएँ हटाएँ' : 'Exclude operating demands'}
          </legend>
          <div className="space-y-1.5">
            {DIRECTORY_AVOID_OPTIONS.map(({ tag, label, hiLabel }) => (
              <label
                key={tag}
                htmlFor={`${idPrefix}-avoid-${tag}`}
                className="flex items-start gap-2.5 py-1 cursor-pointer text-[#1A1B1A]"
              >
                <input
                  id={`${idPrefix}-avoid-${tag}`}
                  type="checkbox"
                  checked={targetFilters.avoidTags.includes(tag)}
                  onChange={() =>
                    updateTarget((prev) => ({
                      ...prev,
                      avoidTags: toggleInArray<OperatingTag>(prev.avoidTags, tag),
                    }))
                  }
                  className="mt-0.5 h-4 w-4 rounded border-[#666A65] accent-[#1A1B1A]"
                />
                <span>{isHi ? hiLabel : label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    );
  };

  return (
    <section
      aria-label={isHi ? 'सभी ई-कॉमर्स श्रेणियाँ देखें' : 'Explore all ecommerce categories'}
      className="space-y-6"
    >
      {/* Top Search & Sort Toolbar (visible on mobile & desktop) */}
      <div className="rounded-[20px] border border-[#E6E6DF] bg-[#FFFFFF] p-4 sm:p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666A65]"
              aria-hidden="true"
            />
            <label htmlFor="idea-directory-search" className="sr-only">
              {isHi
                ? 'श्रेणियाँ, उत्पाद दिशाएँ या स्टार्टर आइडिया खोजें'
                : 'Search categories, product directions, or starter ideas'}
            </label>
            <input
              id="idea-directory-search"
              type="search"
              value={filters.search}
              onChange={(e) =>
                updateFilterAndResetPage((prev) => ({
                  ...prev,
                  search: e.target.value,
                }))
              }
              placeholder={
                isHi
                  ? 'श्रेणियाँ, उप-श्रेणियाँ, ग्राहक या आइडिया खोजें (जैसे मसाला जार, साड़ी, डिजिटल)...'
                  : 'Search categories, subcategories, customers, or ideas (e.g. spice jars, jewellery, printable)...'
              }
              className="w-full min-h-[44px] pl-10 pr-9 py-2 rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] text-sm text-[#1A1B1A] placeholder:text-[#666A65] focus:outline-2 focus:outline-[#1A1B1A]"
            />
            {filters.search && (
              <button
                type="button"
                aria-label={isHi ? 'खोज साफ़ करें' : 'Clear search query'}
                onClick={() =>
                  updateFilterAndResetPage((prev) => ({ ...prev, search: '' }))
                }
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#666A65] hover:text-[#1A1B1A]"
              >
                <X size={15} aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Mobile Filter Drawer Trigger */}
            <button
              type="button"
              onClick={openMobileDrawer}
              className="lg:hidden min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] text-xs font-semibold text-[#1A1B1A] hover:border-[#1A1B1A]"
            >
              <SlidersHorizontal size={15} aria-hidden="true" />
              <span>
                {isHi ? 'फ़िल्टर' : 'Filters'}
                {result.activeFilterCount > 0 ? ` (${result.activeFilterCount})` : ''}
              </span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="idea-directory-sort"
                className="text-xs font-semibold text-[#666A65] whitespace-nowrap"
              >
                {isHi ? 'क्रम:' : 'Sort:'}
              </label>
              <div className="relative">
                <select
                  id="idea-directory-sort"
                  value={filters.sort}
                  onChange={(e) =>
                    updateFilterAndResetPage((prev) => ({
                      ...prev,
                      sort: e.target.value as DirectorySortOption,
                    }))
                  }
                  className="appearance-none min-h-[44px] pl-3.5 pr-9 py-2 rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] text-xs font-semibold text-[#1A1B1A] focus:outline-2 focus:outline-[#1A1B1A]"
                >
                  <option value="relevance">{isHi ? 'प्रासंगिकता' : 'Relevance'}</option>
                  <option value="simpler_operations">
                    {isHi ? 'सरल संचालन पहले' : 'Simpler operations first'}
                  </option>
                  <option value="alphabetical">
                    {isHi ? 'वर्णक्रमानुसार' : 'Alphabetical (A–Z)'}
                  </option>
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#666A65]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Result Count & Active Filter Chips */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E6E6DF]">
          <p
            aria-live="polite"
            className="text-xs font-mono-tabular font-semibold text-[#1A1B1A]"
          >
            {isHi
              ? `कुल ${result.totalCount} उपयुक्त श्रेणियों में से ${displayedItems.length} दिखाई जा रही हैं`
              : `Showing ${displayedItems.length} of ${result.totalCount} matching ${
                  result.totalCount === 1 ? 'category' : 'categories'
                }`}
          </p>

          {result.activeFilterCount > 0 && (
            <button
              type="button"
              onClick={() => {
                setVisibleLimit(PAGE_BATCH_SIZE);
                onResetFilters();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1B1A] underline underline-offset-4 hover:opacity-80"
            >
              <RotateCcw size={12} aria-hidden="true" />
              <span>{isHi ? 'सभी फ़िल्टर हटाएँ' : 'Clear all filters'}</span>
            </button>
          )}
        </div>

        {activeChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {activeChips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={() =>
                  updateFilterAndResetPage((prev) => chip.remove(prev))
                }
                className="min-h-[34px] inline-flex items-center gap-1.5 px-3 py-1 rounded-[10px] border border-[#E6E6DF] bg-[#F3F1E9] text-xs font-medium text-[#1A1B1A] hover:border-[#1A1B1A] transition-colors"
              >
                <span>{chip.label}</span>
                <X size={13} className="text-[#666A65]" aria-hidden="true" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Layout: Desktop Filter Sidebar + Catalogue Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <aside
          aria-label={isHi ? 'श्रेणी फ़िल्टर' : 'Category filters'}
          className="hidden lg:block lg:col-span-3 rounded-[20px] border border-[#E6E6DF] bg-[#FFFFFF] p-5 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E6E6DF]">
            <h2 className="text-sm font-bold text-[#1A1B1A]">
              {isHi ? 'कैटलॉग फ़िल्टर करें' : 'Filter catalogue'}
            </h2>
            {result.activeFilterCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setVisibleLimit(PAGE_BATCH_SIZE);
                  onResetFilters();
                }}
                className="text-xs font-semibold text-[#666A65] hover:text-[#1A1B1A] underline underline-offset-4"
              >
                {isHi ? 'सभी हटाएँ' : 'Clear all'}
              </button>
            )}
          </div>
          {renderFilterSections(
            filters,
            (next) => {
              setVisibleLimit(PAGE_BATCH_SIZE);
              onChangeFilters(next);
            },
            'desktop'
          )}
        </aside>

        {/* Results Column */}
        <div className="lg:col-span-9 space-y-6">
          {result.totalCount === 0 ? (
            <div className="rounded-[20px] border border-[#E6E6DF] bg-[#FFFFFF] p-8 text-center space-y-4">
              <h3 className="text-xl font-bold text-[#1A1B1A]">
                {isHi
                  ? 'सक्रिय फ़िल्टर से मेल खाने वाली कोई श्रेणी नहीं मिली'
                  : 'No selling categories match all active filters'}
              </h3>
              <p className="text-sm text-[#666A65] max-w-lg mx-auto">
                {isHi
                  ? 'अलग-अलग फ़िल्टर समूह एक साथ लागू होते हैं, जबकि एक ही समूह के भीतर चुने गए विकल्पों में से कोई भी मेल खने पर परिणाम दिखता है। सभी श्रेणियाँ देखने के लिए फ़िल्टर या खोज शब्द हटाएँ।'
                  : 'Different filter groups combine together, while selections inside one group match any checked option. Clear one or more filters or reset your search term to explore all categories.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setVisibleLimit(PAGE_BATCH_SIZE);
                  onResetFilters();
                }}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-[#F4C940] hover:bg-[#EAB924] text-sm font-semibold text-[#1A1B1A] transition-colors"
              >
                <RotateCcw size={15} aria-hidden="true" />
                <span>{isHi ? 'सभी फ़िल्टर हटाएँ' : 'Clear all filters'}</span>
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {displayedItems.map((item) => (
                  <IdeaCard
                    key={item.idea.id}
                    item={item}
                    locale={locale}
                    isSaved={savedIdeaIds.includes(item.idea.id)}
                    isCompared={compareIdeaIds.includes(item.idea.id)}
                    compareDisabled={
                      compareIdeaIds.length >= 3 &&
                      !compareIdeaIds.includes(item.idea.id)
                    }
                    onToggleSave={onToggleSave}
                    onToggleCompare={onToggleCompare}
                    onOpenDetail={onOpenDetail}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setVisibleLimit((prev) => prev + PAGE_BATCH_SIZE)}
                    className="min-h-[44px] inline-flex items-center justify-center px-6 py-2.5 rounded-[12px] border border-[#1A1B1A] bg-[#FFFFFF] hover:bg-[#F3F1E9] text-sm font-semibold text-[#1A1B1A] transition-colors"
                  >
                    {isHi
                      ? `${Math.min(PAGE_BATCH_SIZE, result.items.length - displayedItems.length)} और श्रेणियाँ लोड करें (${result.items.length - displayedItems.length} शेष)`
                      : `Load ${Math.min(PAGE_BATCH_SIZE, result.items.length - displayedItems.length)} more categories (${result.items.length - displayedItems.length} remaining)`}
                  </button>
                  {result.items.length - displayedItems.length > PAGE_BATCH_SIZE && (
                    <button
                      type="button"
                      onClick={() => setVisibleLimit(result.items.length)}
                      className="min-h-[44px] inline-flex items-center justify-center px-4 py-2.5 rounded-[12px] text-xs font-semibold text-[#666A65] hover:text-[#1A1B1A] underline underline-offset-4"
                    >
                      {isHi
                        ? `सभी ${result.items.length} परिणाम दिखाएँ`
                        : `Show all ${result.items.length} results`}
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Slide-Over Filter Sheet */}
      {mobileFiltersOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isHi ? 'कैटलॉग फ़िल्टर' : 'Catalogue filters'}
          className="fixed inset-0 z-50 lg:hidden flex justify-end bg-[#1A1B1A]/60 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileFiltersOpen(false);
          }}
        >
          <div className="w-full max-w-md h-full bg-[#FAF9F5] flex flex-col border-l border-[#E6E6DF] shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 bg-[#FFFFFF] border-b border-[#E6E6DF]">
              <div>
                <h2 className="text-base font-bold text-[#1A1B1A]">
                  {isHi ? 'श्रेणियाँ फ़िल्टर करें' : 'Filter categories'}
                </h2>
                <p className="text-xs font-mono-tabular text-[#666A65]">
                  {isHi
                    ? `${mobileDraftResult.totalCount} उपयुक्त श्रेणियाँ`
                    : `${mobileDraftResult.totalCount} matching categories`}
                </p>
              </div>
              <button
                type="button"
                aria-label={isHi ? 'फ़िल्टर बंद करें' : 'Close filters'}
                onClick={() => setMobileFiltersOpen(false)}
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] text-[#1A1B1A]"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {renderFilterSections(mobileDraftFilters, setMobileDraftFilters, 'mobile')}
            </div>

            <div className="p-4 bg-[#FFFFFF] border-t border-[#E6E6DF] flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setMobileDraftFilters({
                    ...INITIAL_DIRECTORY_FILTERS,
                    search: mobileDraftFilters.search,
                  })
                }
                className="min-h-[44px] px-4 py-2.5 rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] text-xs font-semibold text-[#1A1B1A]"
              >
                {isHi ? 'सभी हटाएँ' : 'Clear all'}
              </button>
              <button
                type="button"
                onClick={applyMobileDrawer}
                className="flex-1 min-h-[44px] px-4 py-2.5 rounded-[12px] bg-[#F4C940] hover:bg-[#EAB924] text-sm font-semibold text-[#1A1B1A]"
              >
                {isHi
                  ? `फ़िल्टर लागू करें (${mobileDraftResult.totalCount})`
                  : `Apply filters (${mobileDraftResult.totalCount})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
