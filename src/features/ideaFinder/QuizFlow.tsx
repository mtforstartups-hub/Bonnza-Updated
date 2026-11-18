import { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Edit3,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import type { Locale } from '../../domain/types';
import { IDEA_FINDER_DATASET } from './data';
import {
  getDepartmentName,
  getQuizOptionLabel,
  getQuizQuestionText,
  QUIZ_AVOID_NONE_VALUE,
  QUIZ_NO_PREFERENCE_VALUE,
  QUIZ_STRENGTH_BASICS_VALUE,
} from './labels';
import { evaluateQuizMatches } from './matcher';
import { IdeaCard } from './IdeaCard';
import type {
  EnrichedIdeaItem,
  QuizAnswersState,
  QuizQuestionRecord,
  RankedIdeaMatch,
} from './types';

interface QuizFlowProps {
  locale: Locale;
  answers: QuizAnswersState;
  currentStepIndex: number;
  showResults: boolean;
  savedIdeaIds: string[];
  compareIdeaIds: string[];
  onChangeAnswers: (next: QuizAnswersState) => void;
  onChangeStep: (stepIndex: number) => void;
  onShowResults: (visible: boolean) => void;
  onResetQuiz: () => void;
  onSwitchToBrowse: () => void;
  onToggleSave: (ideaId: string) => void;
  onToggleCompare: (ideaId: string) => void;
  onOpenDetail: (item: EnrichedIdeaItem, match?: RankedIdeaMatch) => void;
}

const QUESTIONS = IDEA_FINDER_DATASET.quiz;

function getOptionHelperNote(
  questionId: string,
  option: string,
  locale: Locale
): string | null {
  const isHi = locale === 'hi';
  if (
    questionId === 'model' &&
    option === 'Source products and sell through my own account'
  ) {
    return isHi
      ? 'उत्पाद सोर्स करें और अपने सेलर अकाउंट से बेचें। सामान्य भौतिक रीसेलिंग में स्टॉक की ज़िम्मेदारी और सैंपल जांच होती है—यह स्वतः बिना इन्वेंटरी वाला मॉडल नहीं है।'
      : 'Source products and sell through your own seller account. Ordinary physical reselling requires stock accountability and sample checks, and is not automatically inventory-free.';
  }
  if (questionId === 'model' && option === 'Create original digital products') {
    return isHi
      ? 'आपके द्वारा बनाए गए मूल डिजिटल डाउनलोड—बिना भौतिक स्टॉक रखे या पार्सल डिस्पैच किए।'
      : 'Original downloads created by you without physical stock holding or parcel dispatch.';
  }
  if (
    questionId === 'storage' &&
    option === 'I need a route without physical stock'
  ) {
    return isHi
      ? 'भौतिक स्टॉक रीसेलिंग को इन्वेंटरी-मुक्त मानने के बजाय केवल गैर-भौतिक डिजिटल मार्गों तक सुझाव सीमित रखता है।'
      : 'Restricts suggestions to non-physical routes rather than treating physical stock reselling as inventory-free.';
  }
  return null;
}

function isStepAnswered(
  question: QuizQuestionRecord,
  answers: QuizAnswersState
): boolean {
  switch (question.id) {
    case 'budget':
      return Boolean(answers.budget);
    case 'interests':
      return answers.interests.length > 0;
    case 'model':
      return Boolean(answers.model);
    case 'strengths':
      return answers.strengths.length > 0;
    case 'storage':
      return Boolean(answers.storage);
    case 'time':
      return Boolean(answers.time);
    case 'avoid':
      return answers.avoid.length > 0;
    case 'channel':
      return Boolean(answers.channel);
    default:
      return false;
  }
}

export function QuizFlow({
  locale,
  answers,
  currentStepIndex,
  showResults,
  savedIdeaIds,
  compareIdeaIds,
  onChangeAnswers,
  onChangeStep,
  onShowResults,
  onResetQuiz,
  onSwitchToBrowse,
  onToggleSave,
  onToggleCompare,
  onOpenDetail,
}: QuizFlowProps) {
  const [validationError, setValidationError] = useState<string | null>(null);
  const isHi = locale === 'hi';

  const safeStepIndex = Math.max(0, Math.min(currentStepIndex, QUESTIONS.length - 1));
  const activeQuestion = QUESTIONS[safeStepIndex];
  const localizedQ = getQuizQuestionText(activeQuestion, locale);
  const progressPercent = Math.round(((safeStepIndex + 1) / QUESTIONS.length) * 100);

  const handleSingleSelect = (questionId: QuizQuestionRecord['id'], value: string) => {
    setValidationError(null);
    onChangeAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleInterestToggle = (value: string) => {
    setValidationError(null);
    if (value === QUIZ_NO_PREFERENCE_VALUE) {
      const alreadySelected = answers.interests.includes(QUIZ_NO_PREFERENCE_VALUE);
      onChangeAnswers({
        ...answers,
        interests: alreadySelected ? [] : [QUIZ_NO_PREFERENCE_VALUE],
      });
      return;
    }

    const withoutNoPref = answers.interests.filter(
      (id) => id !== QUIZ_NO_PREFERENCE_VALUE
    );
    if (withoutNoPref.includes(value)) {
      onChangeAnswers({
        ...answers,
        interests: withoutNoPref.filter((id) => id !== value),
      });
      return;
    }

    if (withoutNoPref.length >= 3) {
      setValidationError(
        isHi
          ? 'आप अधिकतम तीन विभाग चुन सकते हैं, या दूसरा चुनने से पहले किसी एक को हटाएँ।'
          : 'You can choose up to three departments, or uncheck one before picking another.'
      );
      return;
    }

    onChangeAnswers({
      ...answers,
      interests: [...withoutNoPref, value],
    });
  };

  const handleMultiExclusiveToggle = (
    field: 'strengths' | 'avoid',
    exclusiveOption: string,
    value: string
  ) => {
    setValidationError(null);
    const current = answers[field];

    if (value === exclusiveOption) {
      const already = current.includes(exclusiveOption);
      onChangeAnswers({
        ...answers,
        [field]: already ? [] : [exclusiveOption],
      });
      return;
    }

    const withoutExclusive = current.filter((v) => v !== exclusiveOption);
    const next = withoutExclusive.includes(value)
      ? withoutExclusive.filter((v) => v !== value)
      : [...withoutExclusive, value];

    onChangeAnswers({
      ...answers,
      [field]: next,
    });
  };

  const handleContinue = () => {
    if (!isStepAnswered(activeQuestion, answers)) {
      setValidationError(
        isHi
          ? 'आगे बढ़ने के लिए कृपया एक विकल्प चुनें, या सूचीबद्ध होने पर खुला/कोई प्राथमिकता नहीं विकल्प चुनें।'
          : 'Please choose an option to continue, or select the open/no-preference choice if listed.'
      );
      return;
    }
    setValidationError(null);

    if (safeStepIndex < QUESTIONS.length - 1) {
      onChangeStep(safeStepIndex + 1);
    } else {
      onShowResults(true);
    }
  };

  const handleBack = () => {
    setValidationError(null);
    if (safeStepIndex > 0) {
      onChangeStep(safeStepIndex - 1);
    }
  };

  if (showResults) {
    const evaluation = evaluateQuizMatches(answers, locale);

    return (
      <section
        aria-label={isHi ? 'प्रश्नावली परिणाम' : 'Questionnaire results'}
        className="space-y-8"
      >
        {/* Results Header Bar */}
        <div className="rounded-[20px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 sm:p-8 space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#666A65]">
                {isHi
                  ? `प्रश्नावली परिणाम · ${evaluation.totalCompatibleCount} उपयुक्त ${
                      evaluation.totalCompatibleCount === 1 ? 'श्रेणी' : 'श्रेणियाँ'
                    }`
                  : `QUESTIONNAIRE RESULTS · ${evaluation.totalCompatibleCount} COMPATIBLE ${
                      evaluation.totalCompatibleCount === 1 ? 'CATEGORY' : 'CATEGORIES'
                    }`}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1B1A]">
                {evaluation.matches.length > 0
                  ? isHi
                    ? `आपके उत्तरों के अनुरूप ${evaluation.matches.length} शुरुआती दिशाएँ`
                    : `Showing ${evaluation.matches.length} starting ${
                        evaluation.matches.length === 1 ? 'direction' : 'directions'
                      } aligned with your answers`
                  : isHi
                    ? 'आपकी सभी मौजूदा शर्तों से मेल खाने वाली कोई श्रेणी नहीं मिली'
                    : 'No categories match every current constraint'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setValidationError(null);
                  onShowResults(false);
                }}
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] text-xs font-semibold text-[#1A1B1A] hover:border-[#1A1B1A] transition-colors whitespace-nowrap"
              >
                <Edit3 size={14} aria-hidden="true" />
                <span>{isHi ? 'उत्तर संपादित करें' : 'Edit answers'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setValidationError(null);
                  onResetQuiz();
                }}
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-[12px] border border-[#E6E6DF] bg-[#FFFFFF] text-xs font-semibold text-[#1A1B1A] hover:border-[#1A1B1A] transition-colors whitespace-nowrap"
              >
                <RotateCcw size={14} aria-hidden="true" />
                <span>{isHi ? 'फिर से शुरू करें' : 'Start again'}</span>
              </button>

              <button
                type="button"
                onClick={onSwitchToBrowse}
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-[12px] bg-[#1A1B1A] text-xs font-semibold text-[#FAF9F5] hover:bg-black transition-colors whitespace-nowrap"
              >
                <SlidersHorizontal size={14} aria-hidden="true" />
                <span>{isHi ? 'सभी श्रेणियाँ देखें' : 'Explore all categories'}</span>
              </button>
            </div>
          </div>

          {/* Transparent Match Basis & Important Guidance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-[#E6E6DF] text-xs text-[#666A65] leading-relaxed">
            {evaluation.budgetEditorialNote && (
              <p className="rounded-[12px] bg-[#FAF9F5] border border-[#E6E6DF] p-3.5">
                <span className="font-semibold text-[#1A1B1A]">
                  {isHi ? 'बजट व्याख्या:' : 'Budget interpretation:'}{' '}
                </span>
                {evaluation.budgetEditorialNote}
              </p>
            )}
            {evaluation.channelInvestigationNote && (
              <p className="rounded-[12px] bg-[#FAF9F5] border border-[#E6E6DF] p-3.5">
                <span className="font-semibold text-[#1A1B1A]">
                  {isHi ? 'चैनल प्राथमिकता नोट:' : 'Channel preference note:'}{' '}
                </span>
                {evaluation.channelInvestigationNote}
              </p>
            )}
            {evaluation.storageEditorialNote && (
              <p className="rounded-[12px] bg-[#F3F1E9] border border-[#E6E6DF] p-3.5 md:col-span-2 text-[#1A1B1A]">
                <span className="font-semibold">
                  {isHi ? 'लागू स्टोरेज शर्त:' : 'Storage constraint applied:'}{' '}
                </span>
                {evaluation.storageEditorialNote}
              </p>
            )}
            {evaluation.skippedFactors.length > 0 && (
              <p className="rounded-[12px] bg-[#FAF9F5] border border-[#E6E6DF] p-3.5 md:col-span-2">
                <span className="font-semibold text-[#1A1B1A]">
                  {isHi
                    ? 'स्कोरिंग से बाहर रखे गए कारक (खुला / समान): '
                    : 'Excluded from scoring (open / uniform): '}
                </span>
                {evaluation.skippedFactors.join(' · ')}
                {isHi ? '। सक्रिय संपादकीय भार योग: ' : '. Active editorial weighting total: '}
                <span className="font-mono-tabular font-semibold text-[#1A1B1A]">
                  {evaluation.activeWeightTotal}/100
                </span>
                {isHi ? '।' : '.'}
              </p>
            )}
          </div>
        </div>

        {/* Zero-Match Transparent Explanation OR Results Grid */}
        {evaluation.matches.length === 0 ? (
          <div className="rounded-[20px] border border-[#1A1B1A]/20 bg-[#FFFFFF] p-6 sm:p-8 space-y-5">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#1A1B1A]">
                {isHi
                  ? 'कोई स्टार्टर आइडिया क्यों नहीं दिख रहा है'
                  : 'Why no starter ideas are shown'}
              </h3>
              <p className="text-sm text-[#666A65] leading-relaxed">
                {isHi
                  ? 'चुपचाप शर्तें ढीली करने के बजाय आपकी चुनी हुई सीमाओं और बाधाओं को सख़्ती से लागू रखा गया है। इन विकल्पों ने कैटलॉग की सभी श्रेणियों को फ़िल्टर कर दिया:'
                  : 'Your explicit constraints and avoidances are kept intact rather than silently relaxed. These choices eliminated all categories from the catalogue:'}
              </p>
            </div>

            <ul className="space-y-2 text-sm">
              {evaluation.eliminatedSummaries.map((item) => (
                <li
                  key={item.constraintLabel}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] px-4 py-3"
                >
                  <span className="text-[#1A1B1A] font-medium">{item.constraintLabel}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono-tabular text-[#666A65]">
                      {isHi
                        ? `${item.removedCount} ${item.removedCount === 1 ? 'श्रेणी' : 'श्रेणियाँ'} हटीं`
                        : `Removed ${item.removedCount} ${
                            item.removedCount === 1 ? 'category' : 'categories'
                          }`}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const targetIdx = QUESTIONS.findIndex((q) => q.id === item.stepId);
                        onShowResults(false);
                        if (targetIdx >= 0) onChangeStep(targetIdx);
                      }}
                      className="text-xs font-semibold text-[#1A1B1A] underline underline-offset-4 hover:opacity-80"
                    >
                      {isHi ? 'इस उत्तर को बदलें' : 'Adjust this answer'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onShowResults(false)}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-[#F4C940] hover:bg-[#EAB924] text-sm font-semibold text-[#1A1B1A] transition-colors"
              >
                <Edit3 size={15} aria-hidden="true" />
                <span>
                  {isHi ? 'मेरे उत्तर देखें और बदलें' : 'Review and edit my answers'}
                </span>
              </button>
              <button
                type="button"
                onClick={onSwitchToBrowse}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] border border-[#E6E6DF] bg-[#FFFFFF] hover:border-[#1A1B1A] text-sm font-semibold text-[#1A1B1A] transition-colors"
              >
                <span>{isHi ? 'सभी श्रेणियाँ ब्राउज़ करें' : 'Browse all categories'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {evaluation.matches.map((match) => (
              <IdeaCard
                key={match.item.idea.id}
                item={match.item}
                locale={locale}
                match={match}
                isSaved={savedIdeaIds.includes(match.item.idea.id)}
                isCompared={compareIdeaIds.includes(match.item.idea.id)}
                compareDisabled={
                  compareIdeaIds.length >= 3 &&
                  !compareIdeaIds.includes(match.item.idea.id)
                }
                onToggleSave={onToggleSave}
                onToggleCompare={onToggleCompare}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <section
      aria-label={isHi ? 'मार्गदर्शित बिज़नेस आइडिया प्रश्नावली' : 'Guided business idea questionnaire'}
      className="rounded-[24px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 sm:p-10 space-y-6 max-w-4xl mx-auto"
    >
      {/* Progress Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-mono-tabular font-semibold text-[#1A1B1A]">
            {isHi
              ? `प्रश्न ${safeStepIndex + 1} / ${QUESTIONS.length}`
              : `Question ${safeStepIndex + 1} of ${QUESTIONS.length}`}
          </span>
          <button
            type="button"
            onClick={() => {
              setValidationError(null);
              onResetQuiz();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#666A65] hover:text-[#1A1B1A] transition-colors"
          >
            <RotateCcw size={13} aria-hidden="true" />
            <span>{isHi ? 'फिर से शुरू करें' : 'Start again'}</span>
          </button>
        </div>

        <div
          role="progressbar"
          aria-label={isHi ? 'प्रश्नावली प्रगति' : 'Questionnaire progress'}
          aria-valuemin={1}
          aria-valuemax={QUESTIONS.length}
          aria-valuenow={safeStepIndex + 1}
          className="h-2 w-full rounded-full bg-[#F3F1E9] overflow-hidden"
        >
          <div
            className="h-full bg-[#1A1B1A] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Prompt & Contextual Note */}
      <div className="space-y-2 pt-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1B1A] leading-snug">
          {localizedQ.question}
        </h2>

        {activeQuestion.id === 'budget' && (
          <p className="text-sm text-[#666A65] leading-relaxed">
            {isHi
              ? 'यह प्रश्न आपके पहले उत्पाद परीक्षण के लिए अलग रखे गए बजट के बारे में है—यह Bonnza कोर्स शुल्क या घरेलू आपात बचत से पूरी तरह अलग है। आपका उत्तर लागत कोटेशन नहीं, बल्कि शुरुआती योजना मार्गदर्शन देता है।'
              : 'This asks about the money set aside for your initial product experiment—completely separate from any Bonnza course fees or household emergency reserves. Your answer is used as an editorial orientation rather than a verified startup cost quote.'}
          </p>
        )}

        {activeQuestion.id === 'interests' && (
          <p className="text-sm text-[#666A65] leading-relaxed">
            {isHi
              ? `अधिकतम 3 विभाग चुनें जिन्हें आप देखना चाहते हैं, या सभी विभाग खुले रखने के लिए "कोई विशेष प्राथमिकता नहीं" चुनें। (${
                  answers.interests.includes(QUIZ_NO_PREFERENCE_VALUE)
                    ? 'कोई प्राथमिकता नहीं चयनित'
                    : `${answers.interests.length}/3 चयनित`
                })`
              : `Choose up to 3 departments you are curious to explore, or select “No preference” to keep all departments open. (${
                  answers.interests.includes(QUIZ_NO_PREFERENCE_VALUE)
                    ? 'No preference selected'
                    : `${answers.interests.length}/3 selected`
                })`}
          </p>
        )}

        {activeQuestion.id === 'model' && (
          <p className="text-sm text-[#666A65] leading-relaxed">
            {isHi
              ? 'Bonnza की पद्धति में, सोर्सिंग और बिक्री का अर्थ वास्तविक उत्पाद मंगाकर अपने सेलर अकाउंट से बेचना है—यह एफिलिएट लिंक, नेटवर्क भर्ती या स्वतः इन्वेंटरी-मुक्त दावों से अलग है।'
              : 'In Bonnza’s framework, sourcing and selling means sourcing real products and selling through your own seller account—distinct from affiliate links, recruiting, or automatic inventory-free claims.'}
          </p>
        )}

        {activeQuestion.id === 'strengths' && (
          <p className="text-sm text-[#666A65] leading-relaxed">
            {isHi
              ? 'अपने पास मौजूद किसी भी प्रासंगिक अनुभव या पहुँच को चुनें, या "मैं बिल्कुल शुरुआत से सीख रहा/रही हूँ" चुनें। ये सुझावों के लिए दिशा दिखाते हैं और किसी औपचारिक डिग्री की मांग नहीं करते।'
              : 'Select any relevant experience or access you already have, or select “I am starting from the basics”. These guide starting-point suggestions and do not assume formal qualifications.'}
          </p>
        )}

        {activeQuestion.id === 'avoid' && (
          <p className="text-sm text-[#666A65] leading-relaxed">
            {isHi
              ? 'यहाँ चुनी गई जटिलताओं को रैंकिंग से पहले सख़्ती से बाहर रखा जाता है, या "इनमें से कोई नहीं" चुनें।'
              : 'Selected avoidances are treated as strict exclusions before results are ranked, or select “None of these”.'}
          </p>
        )}

        {localizedQ.note && activeQuestion.id !== 'budget' && (
          <p className="text-sm text-[#666A65] leading-relaxed">{localizedQ.note}</p>
        )}
      </div>

      {/* Answer Options */}
      <div className="space-y-2.5">
        {activeQuestion.id === 'interests' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {IDEA_FINDER_DATASET.departments.map((dept) => {
              const selected = answers.interests.includes(dept.id);
              const noPrefActive = answers.interests.includes(QUIZ_NO_PREFERENCE_VALUE);
              const atCap =
                !selected && !noPrefActive && answers.interests.length >= 3;
              return (
                <button
                  key={dept.id}
                  type="button"
                  role="checkbox"
                  aria-checked={selected}
                  disabled={atCap}
                  onClick={() => handleInterestToggle(dept.id)}
                  className={`min-h-[48px] text-left rounded-[14px] border px-4 py-3 transition-colors flex items-center justify-between gap-3 ${
                    selected
                      ? 'border-[#1A1B1A] bg-[#F4C940]/20 text-[#1A1B1A]'
                      : atCap
                        ? 'border-[#E6E6DF] bg-[#F3F1E9]/60 text-[#666A65] opacity-60 cursor-not-allowed'
                        : 'border-[#E6E6DF] bg-[#FAF9F5] text-[#1A1B1A] hover:border-[#1A1B1A]'
                  }`}
                >
                  <span className="text-sm font-medium">
                    {getDepartmentName(dept, locale)}
                  </span>
                  <span
                    className={`h-5 w-5 rounded-[6px] border flex items-center justify-center shrink-0 ${
                      selected
                        ? 'border-[#1A1B1A] bg-[#1A1B1A] text-[#FAF9F5]'
                        : 'border-[#666A65]/50 bg-[#FFFFFF]'
                    }`}
                  >
                    {selected && <Check size={13} aria-hidden="true" />}
                  </span>
                </button>
              );
            })}

            <button
              type="button"
              role="checkbox"
              aria-checked={answers.interests.includes(QUIZ_NO_PREFERENCE_VALUE)}
              onClick={() => handleInterestToggle(QUIZ_NO_PREFERENCE_VALUE)}
              className={`sm:col-span-2 min-h-[48px] text-left rounded-[14px] border px-4 py-3 transition-colors flex items-center justify-between gap-3 ${
                answers.interests.includes(QUIZ_NO_PREFERENCE_VALUE)
                  ? 'border-[#1A1B1A] bg-[#1A1B1A] text-[#FAF9F5]'
                  : 'border-[#E6E6DF] bg-[#FFFFFF] text-[#1A1B1A] hover:border-[#1A1B1A]'
              }`}
            >
              <span className="text-sm font-semibold">
                {isHi
                  ? 'कोई विशेष प्राथमिकता नहीं — सभी विभागों में से सुझाव देखें'
                  : 'No preference — explore across all departments'}
              </span>
              <span
                className={`h-5 w-5 rounded-[6px] border flex items-center justify-center shrink-0 ${
                  answers.interests.includes(QUIZ_NO_PREFERENCE_VALUE)
                    ? 'border-[#FAF9F5] bg-[#F4C940] text-[#1A1B1A]'
                    : 'border-[#666A65]/50 bg-[#FAF9F5]'
                }`}
              >
                {answers.interests.includes(QUIZ_NO_PREFERENCE_VALUE) && (
                  <Check size={13} aria-hidden="true" />
                )}
              </span>
            </button>
          </div>
        ) : activeQuestion.type === 'multiple' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {(activeQuestion.options || []).map((option) => {
              const field =
                activeQuestion.id === 'strengths' ? 'strengths' : 'avoid';
              const exclusiveValue =
                field === 'strengths'
                  ? QUIZ_STRENGTH_BASICS_VALUE
                  : QUIZ_AVOID_NONE_VALUE;
              const selected = answers[field].includes(option);
              const isExclusive = option === exclusiveValue;
              const displayOption = getQuizOptionLabel(
                activeQuestion.id,
                option,
                locale
              );

              return (
                <button
                  key={option}
                  type="button"
                  role="checkbox"
                  aria-checked={selected}
                  onClick={() =>
                    handleMultiExclusiveToggle(field, exclusiveValue, option)
                  }
                  className={`${
                    isExclusive ? 'sm:col-span-2' : ''
                  } min-h-[48px] text-left rounded-[14px] border px-4 py-3 transition-colors flex items-center justify-between gap-3 ${
                    selected
                      ? isExclusive
                        ? 'border-[#1A1B1A] bg-[#1A1B1A] text-[#FAF9F5]'
                        : 'border-[#1A1B1A] bg-[#F4C940]/20 text-[#1A1B1A]'
                      : 'border-[#E6E6DF] bg-[#FAF9F5] text-[#1A1B1A] hover:border-[#1A1B1A]'
                  }`}
                >
                  <span className="text-sm font-medium">{displayOption}</span>
                  <span
                    className={`h-5 w-5 rounded-[6px] border flex items-center justify-center shrink-0 ${
                      selected
                        ? isExclusive
                          ? 'border-[#FAF9F5] bg-[#F4C940] text-[#1A1B1A]'
                          : 'border-[#1A1B1A] bg-[#1A1B1A] text-[#FAF9F5]'
                        : 'border-[#666A65]/50 bg-[#FFFFFF]'
                    }`}
                  >
                    {selected && <Check size={13} aria-hidden="true" />}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div role="radiogroup" aria-label={localizedQ.question} className="space-y-2.5">
            {(activeQuestion.options || []).map((option) => {
              const currentSingle = answers[activeQuestion.id] as string | null;
              const selected = currentSingle === option;
              const displayOption = getQuizOptionLabel(
                activeQuestion.id,
                option,
                locale
              );
              const helper = getOptionHelperNote(activeQuestion.id, option, locale);

              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => handleSingleSelect(activeQuestion.id, option)}
                  className={`w-full min-h-[52px] text-left rounded-[14px] border px-4 py-3.5 transition-colors flex items-start justify-between gap-3 ${
                    selected
                      ? 'border-[#1A1B1A] bg-[#F4C940]/20 text-[#1A1B1A]'
                      : 'border-[#E6E6DF] bg-[#FAF9F5] text-[#1A1B1A] hover:border-[#1A1B1A]'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="block text-sm font-semibold">{displayOption}</span>
                    {helper && (
                      <span className="block text-xs text-[#666A65] leading-relaxed">
                        {helper}
                      </span>
                    )}
                  </div>
                  <span
                    className={`mt-0.5 h-5 w-5 rounded-full border flex items-center justify-center shrink-0 ${
                      selected
                        ? 'border-[#1A1B1A] bg-[#1A1B1A]'
                        : 'border-[#666A65]/50 bg-[#FFFFFF]'
                    }`}
                  >
                    {selected && (
                      <span className="h-2 w-2 rounded-full bg-[#F4C940]" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Required Answer Validation Message */}
      {validationError && (
        <div
          role="alert"
          className="rounded-[12px] border border-[#1A1B1A]/30 bg-[#F3F1E9] px-4 py-3 text-xs font-medium text-[#1A1B1A] flex items-center gap-2"
        >
          <AlertCircle size={15} className="shrink-0" aria-hidden="true" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="pt-4 border-t border-[#E6E6DF] flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleBack}
          disabled={safeStepIndex === 0}
          className={`min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] border text-sm font-semibold transition-colors ${
            safeStepIndex === 0
              ? 'border-[#E6E6DF] bg-[#FAF9F5] text-[#666A65] opacity-50 cursor-not-allowed'
              : 'border-[#E6E6DF] bg-[#FFFFFF] text-[#1A1B1A] hover:border-[#1A1B1A]'
          }`}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>{isHi ? 'पीछे' : 'Back'}</span>
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="min-h-[44px] inline-flex items-center gap-2 px-6 py-2.5 rounded-[12px] bg-[#F4C940] hover:bg-[#EAB924] text-sm font-semibold text-[#1A1B1A] transition-colors"
        >
          <span>
            {safeStepIndex === QUESTIONS.length - 1
              ? isHi
                ? 'मेरे आइडिया देखें'
                : 'See my ideas'
              : isHi
                ? 'आगे बढ़ें'
                : 'Continue'}
          </span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
