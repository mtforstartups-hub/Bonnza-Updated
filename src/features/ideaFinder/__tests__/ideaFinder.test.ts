import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  CATEGORY_IMAGES_BY_ID,
  DEFAULT_CATEGORY_PLACEHOLDER_IMAGE,
  DEFAULT_IDEA_PLACEHOLDER_IMAGE,
  ENRICHED_IDEA_ITEMS,
  getCategoryImageUrl,
  getIdeaImageUrl,
  IDEA_FINDER_DATASET,
  IDEA_IMAGES_BY_ID,
} from '../data';
import { evaluateQuizMatches, INITIAL_QUIZ_ANSWERS } from '../matcher';
import {
  getActiveFilterChips,
  filterAndSortDirectory,
  INITIAL_DIRECTORY_FILTERS,
  parseDirectoryStateFromSearchParams,
  sanitizeDirectoryHierarchy,
  serializeDirectoryStateToSearchParams,
} from '../directoryFilter';
import {
  getBonnzaLearningLinksForCategory,
  getCategoryName,
  getDepartmentName,
  getIdeaText,
  getQuizOptionLabel,
  getQuizQuestionText,
  getSourceReferenceText,
  getSubcategoryName,
  getSubcategoryNotes,
} from '../labels';
import {
  buildShortlistTextExport,
  buildSingleIdeaShareText,
  copySingleIdeaToClipboard,
  IDEA_FINDER_STORAGE_KEY,
  loadIdeaFinderStorage,
  MAX_COMPARE_IDEAS,
  persistIdeaFinderStorage,
} from '../storage';

describe('Bonnza Ecommerce Business Idea Finder', () => {
  it('preserves the exact canonical counts and relationships from the seed JSON', () => {
    const rawJson = JSON.parse(
      fs.readFileSync(
        path.resolve(
          process.cwd(),
          'public/assets/aistudio/Bonnza_100_Category_Idea_Finder_2a40d409.json'
        ),
        'utf8'
      )
    );

    expect(IDEA_FINDER_DATASET).toEqual(rawJson);
    expect(IDEA_FINDER_DATASET.departments).toHaveLength(15);
    expect(IDEA_FINDER_DATASET.categories).toHaveLength(100);
    expect(IDEA_FINDER_DATASET.ideas).toHaveLength(100);

    const totalSubcategories = IDEA_FINDER_DATASET.categories.reduce(
      (sum, cat) => sum + cat.subcategories.length,
      0
    );
    expect(totalSubcategories).toBe(500);
    expect(ENRICHED_IDEA_ITEMS).toHaveLength(100);

    // Check critical variant notes are preserved
    const jewellery = IDEA_FINDER_DATASET.categories.find((c) => c.id === 'C023');
    const precious = jewellery?.subcategories.find((s) => s.id === 'C023-S05');
    expect(precious?.name).toBe('Precious-metal jewellery');
    expect(precious?.notes.length).toBeGreaterThan(0);

    const digitalCat = IDEA_FINDER_DATASET.categories.find((c) => c.id === 'C100');
    const authSoftware = digitalCat?.subcategories.find((s) => s.id === 'C100-S01');
    expect(authSoftware?.notes[0]).toContain('Verify resale rights');
  });

  it('never returns physical stockholding categories when visitor needs a route without physical stock', () => {
    const result = evaluateQuizMatches({
      ...INITIAL_QUIZ_ANSWERS,
      budget: 'Under INR 10000',
      interests: ['NO_PREFERENCE'],
      model: 'Create original digital products',
      strengths: ['I am starting from the basics'],
      storage: 'I need a route without physical stock',
      time: 'Under 5 hours',
      avoid: ['None of these'],
      channel: 'My own online store',
    });

    expect(result.matches.length).toBe(1);
    expect(result.matches[0].item.category.id).toBe('C100');
    expect(result.matches[0].item.category.storage_profile).toBe('no_physical_stock');
    // Uniform own_social_or_store channel is excluded from scoring denominator
    expect(result.channelInvestigationNote).toContain('excluded from scoring');
  });

  it('explains zero matches clearly when no-stock storage is combined with physical sourcing', () => {
    const result = evaluateQuizMatches({
      ...INITIAL_QUIZ_ANSWERS,
      budget: 'Under INR 10000',
      interests: ['D08'],
      model: 'Source products and sell through my own account',
      strengths: ['Sourcing and negotiation'],
      storage: 'I need a route without physical stock',
      time: '5 to 10 hours',
      avoid: ['None of these'],
      channel: 'Amazon India Flipkart or Meesho',
    });

    expect(result.totalCompatibleCount).toBe(0);
    expect(result.matches).toHaveLength(0);
    expect(result.eliminatedSummaries.length).toBeGreaterThan(0);
    expect(result.eliminatedSummaries.some((e) => e.stepId === 'storage')).toBe(true);
  });

  it('excludes larger_space categories even if the visitor selects Furniture department for a shelf', () => {
    const result = evaluateQuizMatches({
      ...INITIAL_QUIZ_ANSWERS,
      budget: 'Under INR 10000',
      interests: ['D07'], // Furniture and Home Furnishing
      model: 'I am open to options',
      strengths: ['I am starting from the basics'],
      storage: 'A shelf or cupboard',
      time: '5 to 10 hours',
      avoid: ['None of these'],
      channel: 'I need help choosing',
    });

    expect(result.matches.length).toBeGreaterThanOrEqual(3);
    for (const match of result.matches) {
      expect(match.item.category.storage_profile).not.toBe('larger_space');
    }
  });

  it('strictly enforces Q7 explicit avoidances and respects max-2-per-department diversity', () => {
    const result = evaluateQuizMatches({
      ...INITIAL_QUIZ_ANSWERS,
      budget: 'INR 10000 to 25000',
      interests: ['D08', 'D09'], // Kitchen & Decor
      model: 'Source products and sell through my own account',
      strengths: ['Design and styling'],
      storage: 'A small dedicated room',
      time: '10 to 20 hours',
      avoid: [
        'Fragile goods',
        'Large or heavy parcels',
        'Size and fit returns',
        'Expiry and controlled storage',
        'Electrical and battery products',
        'Products needing specialist checks',
      ],
      channel: 'I need help choosing',
    });

    expect(result.matches.length).toBeGreaterThanOrEqual(3);
    expect(result.matches.length).toBeLessThanOrEqual(5);

    const deptCounts: Record<string, number> = {};
    for (const match of result.matches) {
      expect(match.item.category.operating_tags).toEqual([]);
      const d = match.item.department.id;
      deptCounts[d] = (deptCounts[d] || 0) + 1;
      expect(deptCounts[d]).toBeLessThanOrEqual(2);
      expect(['Strong alignment', 'Worth exploring', 'Needs more preparation']).toContain(
        match.fitLabel
      );
    }
  });

  it('removes skipped factor weights cleanly from active denominator and breaks ties stably', () => {
    const openResult = evaluateQuizMatches({
      ...INITIAL_QUIZ_ANSWERS,
      budget: 'I need help working this out', // -25
      interests: ['NO_PREFERENCE'], // -20
      model: 'I am open to options', // -15
      strengths: ['I am starting from the basics'], // -10
      storage: 'A shelf or cupboard', // +10
      time: '5 to 10 hours', // +10
      avoid: ['None of these'], // 0
      channel: 'I need help choosing', // -10
    });

    expect(openResult.activeWeightTotal).toBe(20);
    expect(openResult.matches.length).toBe(5);

    // Deterministic repeatability
    const openResultRepeat = evaluateQuizMatches({
      ...INITIAL_QUIZ_ANSWERS,
      budget: 'I need help working this out',
      interests: ['NO_PREFERENCE'],
      model: 'I am open to options',
      strengths: ['I am starting from the basics'],
      storage: 'A shelf or cupboard',
      time: '5 to 10 hours',
      avoid: ['None of these'],
      channel: 'I need help choosing',
    });

    expect(openResult.matches.map((m) => m.item.category.id)).toEqual(
      openResultRepeat.matches.map((m) => m.item.category.id)
    );
  });

  it('filters directory accurately across search synonyms, hierarchy sanitization, and exclusions', () => {
    // Search synonym check: "jewelry" matches Jewellery (C023)
    const jewelrySearch = filterAndSortDirectory({
      ...INITIAL_DIRECTORY_FILTERS,
      search: 'jewelry',
    });
    expect(jewelrySearch.items.some((i) => i.category.id === 'C023')).toBe(true);

    // Subcategory text search: "spice jars" matches Kitchen storage and organisation (C056)
    const spiceSearch = filterAndSortDirectory({
      ...INITIAL_DIRECTORY_FILTERS,
      search: 'spice jars',
    });
    expect(spiceSearch.items[0].category.id).toBe('C056');

    // Hierarchy reset: changing department prunes child category and subcategory
    const cleaned = sanitizeDirectoryHierarchy({
      ...INITIAL_DIRECTORY_FILTERS,
      departmentIds: ['D01'], // Electronics
      categoryIds: ['C056'], // Belongs to D08
      subcategoryIds: ['C056-S01'],
    });
    expect(cleaned.categoryIds).toEqual([]);
    expect(cleaned.subcategoryIds).toEqual([]);

    // URL query round-trip excludes PII/quiz params
    const serialized = serializeDirectoryStateToSearchParams('browse', {
      ...INITIAL_DIRECTORY_FILTERS,
      search: 'organiser',
      departmentIds: ['D08'],
      capitalOrientations: ['lower'],
      sort: 'simpler_operations',
    });
    const parsed = parseDirectoryStateFromSearchParams(serialized);
    expect(parsed.search).toBe('organiser');
    expect(parsed.departmentIds).toEqual(['D08']);
    expect(parsed.capitalOrientations).toEqual(['lower']);
    expect(parsed.sort).toBe('simpler_operations');
  });

  it('handles shortlist storage, 3-item comparison limit, unavailable storage fallback, and text export', () => {
    const storeMap = new Map<string, string>();
    const mockLocalStorage = {
      getItem: vi.fn((k: string) => storeMap.get(k) ?? null),
      setItem: vi.fn((k: string, v: string) => {
        storeMap.set(k, v);
      }),
      removeItem: vi.fn(),
      clear: vi.fn(),
      key: vi.fn(),
      length: 0,
    };

    Object.defineProperty(globalThis, 'window', {
      value: { localStorage: mockLocalStorage },
      configurable: true,
      writable: true,
    });

    persistIdeaFinderStorage({
      savedIdeaIds: ['I059', 'I060', 'I061', 'I100'],
      compareIdeaIds: ['I059', 'I060', 'I061', 'I100'],
    });

    const loaded = loadIdeaFinderStorage();
    expect(loaded.storageAvailable).toBe(true);
    expect(loaded.state.compareIdeaIds).toHaveLength(MAX_COMPARE_IDEAS);
    expect(loaded.state.savedIdeaIds).toHaveLength(4);

    // Corrupted JSON fallback must not throw
    storeMap.set(IDEA_FINDER_STORAGE_KEY, '{invalid-json');
    const corrupted = loadIdeaFinderStorage();
    expect(corrupted.storageAvailable).toBe(false);
    expect(corrupted.state.savedIdeaIds).toEqual([]);

    // Text export includes idea titles and links while omitting internal IDs and validation steps
    const exported = buildShortlistTextExport(['I059', 'I100']);
    expect(exported).toContain('Wall art frames and personalised prints');
    expect(exported).toContain('Original printable planning products');
    expect(exported).not.toContain('I059');
    expect(exported).not.toContain('C059');
    expect(exported).not.toContain('I100');
    expect(exported).not.toContain('C100');
    expect(exported).not.toContain('First Validation Step:');
    expect(exported).toContain('/courses/business-foundations');
  });

  it('maps every category to verified existing Bonnza learning routes', () => {
    const allowedPrefixes = [
      '/courses/',
      '/resources',
      '/webinars/',
      '/contact',
      '/programme',
      '/learning-paths/',
      '/learn/',
    ];

    for (const cat of IDEA_FINDER_DATASET.categories) {
      const links = getBonnzaLearningLinksForCategory(cat);
      expect(links.length).toBeGreaterThanOrEqual(4);
      for (const link of links) {
        expect(allowedPrefixes.some((p) => link.to.startsWith(p))).toBe(true);
      }

      const hiLinks = getBonnzaLearningLinksForCategory(cat, 'hi');
      expect(hiLinks.length).toBe(links.length);
      expect(hiLinks[0].label).not.toBe(links[0].label);
    }
  });

  it('provides complete Hindi translations across departments, categories, subcategories, ideas, quiz, and sources', () => {
    for (const dept of IDEA_FINDER_DATASET.departments) {
      const hiName = getDepartmentName(dept, 'hi');
      expect(hiName).toBeTruthy();
      expect(hiName).not.toBe(dept.name);
    }

    for (const cat of IDEA_FINDER_DATASET.categories) {
      const hiCat = getCategoryName(cat, 'hi');
      expect(hiCat).toBeTruthy();
      expect(hiCat).not.toBe(cat.name);

      for (const sub of cat.subcategories) {
        const hiSub = getSubcategoryName(sub, 'hi');
        expect(hiSub).toBeTruthy();
        expect(hiSub).not.toBe(sub.name);

        if (sub.notes.length > 0) {
          const hiNotes = getSubcategoryNotes(sub, 'hi');
          expect(hiNotes).toHaveLength(sub.notes.length);
          expect(hiNotes[0]).not.toBe(sub.notes[0]);
        }
      }
    }

    for (const idea of IDEA_FINDER_DATASET.ideas) {
      const hiIdea = getIdeaText(idea, 'hi');
      expect(hiIdea.title).toBeTruthy();
      expect(hiIdea.customer).toBeTruthy();
      expect(hiIdea.angle).toBeTruthy();
      expect(hiIdea.title).not.toBe(idea.title);
    }

    for (const q of IDEA_FINDER_DATASET.quiz) {
      const hiQ = getQuizQuestionText(q, 'hi');
      expect(hiQ.question).toBeTruthy();
      expect(hiQ.question).not.toBe(q.question);
      for (const opt of q.options || []) {
        const hiOpt = getQuizOptionLabel(q.id, opt, 'hi');
        expect(hiOpt).toBeTruthy();
        expect(hiOpt).not.toBe(opt);
      }
    }

    for (const src of IDEA_FINDER_DATASET.sources) {
      const hiSrc = getSourceReferenceText(src, 'hi');
      expect(hiSrc.name).toBeTruthy();
      expect(hiSrc.use).toBeTruthy();
      expect(hiSrc.use).not.toBe(src.use);
    }
  });

  it('supports Hindi Devanagari search, Hindi quiz evaluation, Hindi filter chips, and Hindi shortlist export', () => {
    // Devanagari search with vowel matras preserved
    const hindiSpiceSearch = filterAndSortDirectory(
      { ...INITIAL_DIRECTORY_FILTERS, search: 'मसाला जार' },
      'hi'
    );
    expect(hindiSpiceSearch.totalCount).toBeGreaterThan(0);
    expect(hindiSpiceSearch.items.some((i) => i.category.id === 'C056')).toBe(true);

    const hindiSareeSearch = filterAndSortDirectory(
      { ...INITIAL_DIRECTORY_FILTERS, search: 'साड़ियाँ' },
      'hi'
    );
    expect(hindiSareeSearch.items[0].category.id).toBe('C017');

    // Localized filter chips
    const hiChips = getActiveFilterChips(
      {
        ...INITIAL_DIRECTORY_FILTERS,
        departmentIds: ['D08'],
        capitalOrientations: ['lower'],
      },
      'hi'
    );
    expect(hiChips[0].label).toContain('विभाग:');
    expect(hiChips[0].label).toContain('किचन और डाइनिंग');
    expect(hiChips[1].label).toContain('कम प्रारंभिक परीक्षण पूंजी');

    // Hindi quiz evaluation
    const hiMatchResult = evaluateQuizMatches(
      {
        ...INITIAL_QUIZ_ANSWERS,
        budget: 'Under INR 10000',
        interests: ['D08'],
        model: 'Source products and sell through my own account',
        strengths: ['Sourcing and negotiation'],
        storage: 'A shelf or cupboard',
        time: '5 to 10 hours',
        avoid: ['None of these'],
        channel: 'Amazon India Flipkart or Meesho',
      },
      'hi'
    );
    expect(hiMatchResult.matches.length).toBeGreaterThan(0);
    expect(hiMatchResult.budgetEditorialNote).toContain('परीक्षण बजट');
    expect(hiMatchResult.matches[0].reasons.length).toBeGreaterThanOrEqual(2);
    expect(hiMatchResult.matches[0].reasons[0]).toMatch(/[\u0900-\u097F]/);

    // Hindi zero-match explanation
    const hiZero = evaluateQuizMatches(
      {
        ...INITIAL_QUIZ_ANSWERS,
        budget: 'Under INR 10000',
        interests: ['D08'],
        model: 'Source products and sell through my own account',
        strengths: ['Sourcing and negotiation'],
        storage: 'I need a route without physical stock',
        time: '5 to 10 hours',
        avoid: ['None of these'],
        channel: 'Amazon India Flipkart or Meesho',
      },
      'hi'
    );
    expect(hiZero.eliminatedSummaries[0].constraintLabel).toContain('स्टोरेज:');

    // Hindi text shortlist export
    const hiExport = buildShortlistTextExport(['I059', 'I100'], 'hi');
    expect(hiExport).toContain('ई-कॉमर्स बिज़नेस आइडिया शॉर्टलिस्ट');
    expect(hiExport).toContain('/hi/courses/business-foundations');
    expect(hiExport).not.toContain('I059');
    expect(hiExport).not.toContain('C059');
    expect(hiExport).not.toContain('C100');
  });

  it('formats and copies individual business idea content for sharing in EN and HI', async () => {
    const sampleItem = ENRICHED_IDEA_ITEMS.find((entry) => entry.category.id === 'C059')!;
    const enShare = buildSingleIdeaShareText(sampleItem, 'en');

    expect(enShare).toContain(sampleItem.idea.title);
    expect(enShare).toContain(`Offer angle: ${sampleItem.idea.angle}`);
    expect(enShare).toContain(`Potential customer: ${sampleItem.idea.customer}`);
    expect(enShare).toContain('Product directions:');
    expect(enShare).toContain('Way of working:');
    expect(enShare).toContain('(/business-ideas)');
    expect(enShare).not.toContain(sampleItem.idea.id);
    expect(enShare).not.toContain(sampleItem.category.id);

    const hiShare = buildSingleIdeaShareText(sampleItem, 'hi');
    expect(hiShare).toContain('ऑफ़र दृष्टिकोण:');
    expect(hiShare).toContain('संभावित ग्राहक:');
    expect(hiShare).toContain('(/hi/business-ideas)');
    expect(hiShare).not.toContain(sampleItem.idea.id);
    expect(hiShare).not.toContain(sampleItem.category.id);

    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    try {
      const okRes = await copySingleIdeaToClipboard(sampleItem, 'en');
      expect(okRes.ok).toBe(true);
      expect(okRes.message).toBe('Copied');
      expect(writeText).toHaveBeenCalledTimes(1);
      expect(writeText).toHaveBeenCalledWith(enShare);

      vi.stubGlobal('navigator', {});
      const unavailableRes = await copySingleIdeaToClipboard(sampleItem, 'hi');
      expect(unavailableRes.ok).toBe(false);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('attaches a yellow placeholder image to every category and every business idea', () => {
    const categoryAssetPath = path.resolve(
      process.cwd(),
      DEFAULT_CATEGORY_PLACEHOLDER_IMAGE.replace(/^\//, '')
    );
    const ideaAssetPath = path.resolve(
      process.cwd(),
      DEFAULT_IDEA_PLACEHOLDER_IMAGE.replace(/^\//, '')
    );

    expect(fs.existsSync(categoryAssetPath)).toBe(true);
    expect(fs.existsSync(ideaAssetPath)).toBe(true);

    for (const category of IDEA_FINDER_DATASET.categories) {
      expect(CATEGORY_IMAGES_BY_ID[category.id]).toBe(DEFAULT_CATEGORY_PLACEHOLDER_IMAGE);
      expect(getCategoryImageUrl(category.id)).toBe(DEFAULT_CATEGORY_PLACEHOLDER_IMAGE);
    }

    for (const idea of IDEA_FINDER_DATASET.ideas) {
      expect(IDEA_IMAGES_BY_ID[idea.id]).toBe(DEFAULT_IDEA_PLACEHOLDER_IMAGE);
      expect(getIdeaImageUrl(idea.id)).toBe(DEFAULT_IDEA_PLACEHOLDER_IMAGE);
    }

    expect(ENRICHED_IDEA_ITEMS).toHaveLength(100);
    for (const item of ENRICHED_IDEA_ITEMS) {
      expect(item.categoryImage).toBe(DEFAULT_CATEGORY_PLACEHOLDER_IMAGE);
      expect(item.ideaImage).toBe(DEFAULT_IDEA_PLACEHOLDER_IMAGE);
    }
  });
});
