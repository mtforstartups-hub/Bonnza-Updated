import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  Bookmark,
  Compass,
  ExternalLink,
  SlidersHorizontal,
} from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import { localizePath } from '../utilities/locale';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnimatedText } from '../components/MotionPrimitives';
import { IDEA_FINDER_DATASET } from '../features/ideaFinder/data';
import {
  INITIAL_DIRECTORY_FILTERS,
  parseDirectoryStateFromSearchParams,
  serializeDirectoryStateToSearchParams,
} from '../features/ideaFinder/directoryFilter';
import {
  getGeneralCopyText,
  getIdeaFinderUiCopy,
  getSourceReferenceText,
} from '../features/ideaFinder/labels';
import { INITIAL_QUIZ_ANSWERS } from '../features/ideaFinder/matcher';
import {
  loadIdeaFinderStorage,
  MAX_COMPARE_IDEAS,
  persistIdeaFinderStorage,
} from '../features/ideaFinder/storage';
import type {
  DirectoryFilterState,
  DiscoveryMode,
  EnrichedIdeaItem,
  QuizAnswersState,
  RankedIdeaMatch,
} from '../features/ideaFinder/types';
import { QuizFlow } from '../features/ideaFinder/QuizFlow';
import { DirectoryExplorer } from '../features/ideaFinder/DirectoryExplorer';
import { IdeaDetailModal } from '../features/ideaFinder/IdeaDetailModal';
import { ShortlistCompareSection } from '../features/ideaFinder/ShortlistCompareSection';

function hasBrowseParams(params: URLSearchParams): boolean {
  if (params.get('mode') === 'browse') return true;
  const browseKeys = [
    'q',
    'dept',
    'cat',
    'sub',
    'cap',
    'model',
    'comp',
    'stor',
    'ch',
    'avoid',
    'sort',
  ];
  return browseKeys.some((k) => params.has(k));
}

export function BusinessIdeasPage() {
  const { locale } = useBonnza();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const copy = getIdeaFinderUiCopy(locale);
  const general = getGeneralCopyText(locale);
  const isHi = locale === 'hi';

  const [mode, setMode] = useState<DiscoveryMode>(() =>
    hasBrowseParams(searchParams) ? 'browse' : 'quiz'
  );
  const [directoryFilters, setDirectoryFilters] = useState<DirectoryFilterState>(() =>
    hasBrowseParams(searchParams)
      ? parseDirectoryStateFromSearchParams(searchParams)
      : INITIAL_DIRECTORY_FILTERS
  );

  const [quizAnswers, setQuizAnswers] = useState<QuizAnswersState>(INITIAL_QUIZ_ANSWERS);
  const [quizStepIndex, setQuizStepIndex] = useState<number>(0);
  const [quizShowResults, setQuizShowResults] = useState<boolean>(false);

  const [storageState, setStorageState] = useState(() => loadIdeaFinderStorage());
  const [compareLimitNotice, setCompareLimitNotice] = useState<string | null>(null);

  const [detailSelection, setDetailSelection] = useState<{
    item: EnrichedIdeaItem;
    match?: RankedIdeaMatch;
  } | null>(null);

  useEffect(() => {
    persistIdeaFinderStorage(storageState.state);
  }, [storageState.state]);

  const syncUrlForModeAndFilters = (
    nextMode: DiscoveryMode,
    nextFilters: DirectoryFilterState
  ) => {
    if (nextMode === 'quiz') {
      if (searchParams.toString() !== '') {
        setSearchParams(new URLSearchParams(), { replace: true });
      }
      return;
    }
    const serialized = serializeDirectoryStateToSearchParams('browse', nextFilters);
    if (serialized.toString() !== searchParams.toString()) {
      setSearchParams(serialized, { replace: true });
    }
  };

  const switchMode = (nextMode: DiscoveryMode, scrollIntoWorkspace = false) => {
    setMode(nextMode);
    syncUrlForModeAndFilters(nextMode, directoryFilters);
    if (scrollIntoWorkspace) {
      const workspace = document.getElementById('idea-finder-workspace');
      if (workspace) {
        workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleDirectoryFilterChange = (nextFilters: DirectoryFilterState) => {
    setDirectoryFilters(nextFilters);
    syncUrlForModeAndFilters('browse', nextFilters);
  };

  const handleResetFilters = () => {
    setDirectoryFilters(INITIAL_DIRECTORY_FILTERS);
    syncUrlForModeAndFilters('browse', INITIAL_DIRECTORY_FILTERS);
  };

  const handleResetQuiz = () => {
    setQuizAnswers(INITIAL_QUIZ_ANSWERS);
    setQuizStepIndex(0);
    setQuizShowResults(false);
  };

  const handleToggleSave = (ideaId: string) => {
    setCompareLimitNotice(null);
    setStorageState((prev) => {
      const isSaved = prev.state.savedIdeaIds.includes(ideaId);
      const nextSaved = isSaved
        ? prev.state.savedIdeaIds.filter((id) => id !== ideaId)
        : [...prev.state.savedIdeaIds, ideaId];
      const nextCompare = isSaved
        ? prev.state.compareIdeaIds.filter((id) => id !== ideaId)
        : prev.state.compareIdeaIds;
      return {
        ...prev,
        state: {
          savedIdeaIds: nextSaved,
          compareIdeaIds: nextCompare,
        },
      };
    });
  };

  const handleToggleCompare = (ideaId: string) => {
    setCompareLimitNotice(null);
    setStorageState((prev) => {
      const isCompared = prev.state.compareIdeaIds.includes(ideaId);
      if (!isCompared && prev.state.compareIdeaIds.length >= MAX_COMPARE_IDEAS) {
        setCompareLimitNotice(copy.compareLimitWarning);
        return prev;
      }

      const nextCompare = isCompared
        ? prev.state.compareIdeaIds.filter((id) => id !== ideaId)
        : [...prev.state.compareIdeaIds, ideaId];

      const nextSaved = isCompared
        ? prev.state.savedIdeaIds
        : [...new Set([...prev.state.savedIdeaIds, ideaId])];

      return {
        ...prev,
        state: {
          savedIdeaIds: nextSaved,
          compareIdeaIds: nextCompare,
        },
      };
    });
  };

  const handleRemoveSaved = (ideaId: string) => {
    setCompareLimitNotice(null);
    setStorageState((prev) => ({
      ...prev,
      state: {
        savedIdeaIds: prev.state.savedIdeaIds.filter((id) => id !== ideaId),
        compareIdeaIds: prev.state.compareIdeaIds.filter((id) => id !== ideaId),
      },
    }));
  };

  const handleClearAllSaved = () => {
    setCompareLimitNotice(null);
    setStorageState((prev) => ({
      ...prev,
      state: {
        savedIdeaIds: [],
        compareIdeaIds: [],
      },
    }));
  };

  const canonicalPath =
    location.pathname === '/business-ideas'
      ? '/business-ideas'
      : localizePath('/business-ideas', locale);

  return (
    <div className="bonnza-container py-10 sm:py-14 space-y-10">
      <SeoHead
        locale={locale}
        title={copy.seoTitle}
        description={copy.seoDescription}
        path={canonicalPath}
        alternateEnPath="/en/business-ideas"
        alternateHiPath="/hi/business-ideas"
        allowIndex={true}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: copy.breadcrumbHome, to: localizePath('/', locale) },
          { label: copy.breadcrumbCurrent },
        ]}
      />

      {/* Opening Unboxed Editorial Hero */}
      <header className="pb-8 border-b border-[#E6E6DF] space-y-6">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#666A65]">
            {copy.kicker}
          </p>

          <AnimatedText
            as="h1"
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#1A1B1A] leading-tight text-balance"
          >
            {copy.headline}
          </AnimatedText>

          <p className="text-base sm:text-lg text-[#666A65] leading-relaxed">
            {copy.supportingCopy}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => switchMode('quiz', true)}
            aria-pressed={mode === 'quiz'}
            className={`min-h-[48px] inline-flex items-center gap-2 px-6 py-3 rounded-[12px] text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
              mode === 'quiz'
                ? 'bg-[#F4C940] hover:bg-[#EAB924] text-[#1A1B1A] border border-[#1A1B1A]'
                : 'bg-[#F4C940]/85 hover:bg-[#F4C940] text-[#1A1B1A] border border-transparent'
            }`}
          >
            <Compass size={17} aria-hidden="true" />
            <span>{copy.primaryAction}</span>
          </button>

          <button
            type="button"
            onClick={() => switchMode('browse', true)}
            aria-pressed={mode === 'browse'}
            className={`min-h-[48px] inline-flex items-center gap-2 px-6 py-3 rounded-[12px] text-sm font-semibold border transition-colors whitespace-nowrap shrink-0 ${
              mode === 'browse'
                ? 'bg-[#1A1B1A] border-[#1A1B1A] text-[#FAF9F5]'
                : 'bg-[#FFFFFF] border-[#E6E6DF] text-[#1A1B1A] hover:border-[#1A1B1A]'
            }`}
          >
            <SlidersHorizontal size={16} aria-hidden="true" />
            <span>{copy.secondaryAction}</span>
          </button>

          {storageState.state.savedIdeaIds.length > 0 && (
            <a
              href="#shortlist-workspace"
              className="min-h-[48px] inline-flex items-center gap-2 px-4 py-3 rounded-[12px] border border-[#E6E6DF] bg-[#FFFFFF] text-xs font-semibold text-[#1A1B1A] hover:border-[#1A1B1A] transition-colors whitespace-nowrap"
            >
              <Bookmark size={14} aria-hidden="true" />
              <span className="font-mono-tabular">
                {copy.savedShortlistPill(storageState.state.savedIdeaIds.length)}
              </span>
            </a>
          )}
        </div>
      </header>

      {/* Route Switcher Tabs + Compare Warning */}
      <div id="idea-finder-workspace" className="scroll-mt-20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div
            role="tablist"
            aria-label={isHi ? 'डिस्कवरी मोड स्विचर' : 'Discovery view switcher'}
            className="inline-flex items-center gap-1 p-1 rounded-[14px] bg-[#F3F1E9] border border-[#E6E6DF] w-fit"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'quiz'}
              onClick={() => switchMode('quiz')}
              className={`min-h-[40px] px-4 py-2 rounded-[10px] text-xs font-semibold transition-colors whitespace-nowrap ${
                mode === 'quiz'
                  ? 'bg-[#FFFFFF] text-[#1A1B1A] shadow-xs'
                  : 'text-[#666A65] hover:text-[#1A1B1A]'
              }`}
            >
              {copy.tabQuiz}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'browse'}
              onClick={() => switchMode('browse')}
              className={`min-h-[40px] px-4 py-2 rounded-[10px] text-xs font-semibold transition-colors whitespace-nowrap ${
                mode === 'browse'
                  ? 'bg-[#FFFFFF] text-[#1A1B1A] shadow-xs'
                  : 'text-[#666A65] hover:text-[#1A1B1A]'
              }`}
            >
              {copy.tabBrowse}
            </button>
          </div>

          {compareLimitNotice && (
            <p role="status" className="text-xs font-medium text-[#1A1B1A]">
              {compareLimitNotice}
            </p>
          )}
        </div>

        {mode === 'quiz' ? (
          <QuizFlow
            locale={locale}
            answers={quizAnswers}
            currentStepIndex={quizStepIndex}
            showResults={quizShowResults}
            savedIdeaIds={storageState.state.savedIdeaIds}
            compareIdeaIds={storageState.state.compareIdeaIds}
            onChangeAnswers={setQuizAnswers}
            onChangeStep={setQuizStepIndex}
            onShowResults={setQuizShowResults}
            onResetQuiz={handleResetQuiz}
            onSwitchToBrowse={() => switchMode('browse', true)}
            onToggleSave={handleToggleSave}
            onToggleCompare={handleToggleCompare}
            onOpenDetail={(item, match) => setDetailSelection({ item, match })}
          />
        ) : (
          <DirectoryExplorer
            locale={locale}
            filters={directoryFilters}
            savedIdeaIds={storageState.state.savedIdeaIds}
            compareIdeaIds={storageState.state.compareIdeaIds}
            onChangeFilters={handleDirectoryFilterChange}
            onResetFilters={handleResetFilters}
            onToggleSave={handleToggleSave}
            onToggleCompare={handleToggleCompare}
            onOpenDetail={(item) => setDetailSelection({ item })}
          />
        )}
      </div>

      {/* Persistent Saved Shortlist & Side-by-Side Comparison Workspace */}
      <ShortlistCompareSection
        locale={locale}
        savedIdeaIds={storageState.state.savedIdeaIds}
        compareIdeaIds={storageState.state.compareIdeaIds}
        storageAvailable={storageState.storageAvailable}
        onRemoveSaved={handleRemoveSaved}
        onToggleCompare={handleToggleCompare}
        onClearAllSaved={handleClearAllSaved}
        onOpenDetail={(item) => setDetailSelection({ item })}
      />

      {/* Editorial Scope & Policy Reference Context */}
      <section
        aria-label={
          isHi
            ? 'कैटलॉग दायरा और नीति संदर्भ'
            : 'Catalogue scope and policy references'
        }
        className="border-t border-[#E6E6DF] pt-8 space-y-5 text-xs text-[#666A65]"
      >
        <div className="space-y-1.5 max-w-3xl">
          <h2 className="text-sm font-bold text-[#1A1B1A]">
            {copy.aboutCatalogueHeading}
          </h2>
          <p className="leading-relaxed">
            {general.authority} {copy.aboutCatalogueBody}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#E6E6DF] bg-[#FFFFFF]">
          {IDEA_FINDER_DATASET.sources.map((src) => {
            const localizedSrc = getSourceReferenceText(src, locale);
            return (
              <a
                key={src.url}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-r border-b border-[#E6E6DF] p-4 hover:bg-[#FAF9F5] transition-colors flex flex-col justify-between gap-2"
              >
                <div className="space-y-1">
                  <span className="font-semibold text-[#1A1B1A] flex items-center justify-between gap-1.5">
                    <span>{localizedSrc.name}</span>
                    <ExternalLink size={12} className="text-[#666A65] shrink-0" aria-hidden="true" />
                  </span>
                  <p className="text-[11px] leading-relaxed text-[#666A65]">
                    {localizedSrc.use}
                  </p>
                </div>
                <span className="text-[10px] font-mono-tabular text-[#666A65]">
                  {copy.checkedPrefix} {src.reviewed}
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Accessible Detail Modal */}
      <IdeaDetailModal
        item={detailSelection?.item || null}
        match={detailSelection?.match}
        locale={locale}
        isSaved={
          detailSelection
            ? storageState.state.savedIdeaIds.includes(detailSelection.item.idea.id)
            : false
        }
        isCompared={
          detailSelection
            ? storageState.state.compareIdeaIds.includes(detailSelection.item.idea.id)
            : false
        }
        compareDisabled={
          detailSelection
            ? storageState.state.compareIdeaIds.length >= MAX_COMPARE_IDEAS &&
              !storageState.state.compareIdeaIds.includes(detailSelection.item.idea.id)
            : false
        }
        onClose={() => setDetailSelection(null)}
        onToggleSave={handleToggleSave}
        onToggleCompare={handleToggleCompare}
      />
    </div>
  );
}
