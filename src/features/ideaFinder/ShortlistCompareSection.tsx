import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bookmark,
  Check,
  Columns3,
  Copy,
  Download,
  Trash2,
  X,
} from 'lucide-react';
import type { Locale } from '../../domain/types';
import { localizePath } from '../../utilities/locale';
import { BonnzaImage } from '../../components/IllustrativeDiagrams';
import { ENRICHED_IDEA_ITEMS } from './data';
import {
  getBusinessModelLabel,
  getCapitalOrientationLabel,
  getCategoryName,
  getComplexityLabel,
  getDepartmentName,
  getIdeaText,
  getOperatingTagLabel,
  getSkillTagLabel,
  getStorageLabel,
  getSubcategoryName,
} from './labels';
import {
  copyShortlistToClipboard,
  MAX_COMPARE_IDEAS,
  triggerShortlistDownload,
} from './storage';
import type { EnrichedIdeaItem } from './types';

interface ShortlistCompareSectionProps {
  locale: Locale;
  savedIdeaIds: string[];
  compareIdeaIds: string[];
  storageAvailable: boolean;
  onRemoveSaved: (ideaId: string) => void;
  onToggleCompare: (ideaId: string) => void;
  onClearAllSaved: () => void;
  onOpenDetail: (item: EnrichedIdeaItem) => void;
}

const ENRICHED_BY_IDEA_ID: Record<string, EnrichedIdeaItem> = Object.fromEntries(
  ENRICHED_IDEA_ITEMS.map((entry) => [entry.idea.id, entry])
);

export function ShortlistCompareSection({
  locale,
  savedIdeaIds,
  compareIdeaIds,
  storageAvailable,
  onRemoveSaved,
  onToggleCompare,
  onClearAllSaved,
  onOpenDetail,
}: ShortlistCompareSectionProps) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const isHi = locale === 'hi';

  const savedItems = savedIdeaIds
    .map((id) => ENRICHED_BY_IDEA_ID[id])
    .filter((x): x is EnrichedIdeaItem => Boolean(x));

  const comparedItems = compareIdeaIds
    .map((id) => ENRICHED_BY_IDEA_ID[id])
    .filter((x): x is EnrichedIdeaItem => Boolean(x));

  const handleDownload = () => {
    const res = triggerShortlistDownload(savedIdeaIds, locale);
    setFeedback(
      res.ok
        ? isHi
          ? `${res.filename} डाउनलोड हो गई।`
          : `Downloaded ${res.filename}.`
        : res.reason ||
            (isHi ? 'डाउनलोड शुरू नहीं हो सका।' : 'Download could not start.')
    );
  };

  const handleCopy = async () => {
    const res = await copyShortlistToClipboard(savedIdeaIds, locale);
    setFeedback(res.message);
  };

  return (
    <section
      id="shortlist-workspace"
      aria-label={
        isHi
          ? 'सहेजी गई शॉर्टलिस्ट और तुलना तालिका'
          : 'Saved shortlist and side-by-side comparison'
      }
      className="rounded-[24px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 sm:p-8 space-y-6"
    >
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#666A65]">
            {isHi
              ? `शॉर्टलिस्ट और तुलना · ${savedItems.length} सहेजे गए · ${comparedItems.length}/${MAX_COMPARE_IDEAS} तुलना में`
              : `SHORTLIST & COMPARISON · ${savedItems.length} SAVED · ${comparedItems.length}/${MAX_COMPARE_IDEAS} COMPARED`}
          </p>
          <h2 className="text-2xl font-extrabold text-[#1A1B1A]">
            {isHi
              ? 'आपकी शॉर्टलिस्ट और तुलना तालिका'
              : 'Your shortlist & side-by-side comparison'}
          </h2>
          {!storageAvailable && (
            <p className="text-xs text-[#666A65]">
              {isHi
                ? 'इस सत्र में ब्राउज़र स्टोरेज उपलब्ध नहीं है; टैब बंद करने से पहले अपनी शॉर्टलिस्ट डाउनलोड कर लें।'
                : 'Browser storage is currently unavailable in this session; download your shortlist before closing this tab.'}
            </p>
          )}
        </div>

        {savedItems.length > 0 && (
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleDownload}
              className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-[12px] bg-[#F4C940] hover:bg-[#EAB924] text-xs font-semibold text-[#1A1B1A] transition-colors whitespace-nowrap"
            >
              <Download size={15} aria-hidden="true" />
              <span>{isHi ? 'शॉर्टलिस्ट डाउनलोड करें' : 'Download shortlist'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] hover:border-[#1A1B1A] text-xs font-semibold text-[#1A1B1A] transition-colors whitespace-nowrap"
            >
              <Copy size={15} aria-hidden="true" />
              <span>{isHi ? 'शॉर्टलिस्ट कॉपी करें' : 'Copy shortlist'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setFeedback(null);
                onClearAllSaved();
              }}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[12px] border border-[#E6E6DF] bg-[#FFFFFF] hover:border-[#1A1B1A] text-xs font-semibold text-[#666A65] hover:text-[#1A1B1A] transition-colors whitespace-nowrap"
            >
              <Trash2 size={14} aria-hidden="true" />
              <span>{isHi ? 'शॉर्टलिस्ट साफ़ करें' : 'Clear shortlist'}</span>
            </button>
          </div>
        )}
      </div>

      {feedback && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-[12px] bg-[#F3F1E9] border border-[#E6E6DF] px-4 py-2.5 text-xs font-medium text-[#1A1B1A] flex items-center justify-between gap-2"
        >
          <span className="inline-flex items-center gap-2">
            <Check size={14} aria-hidden="true" />
            <span>{feedback}</span>
          </span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            aria-label={isHi ? 'स्थिति संदेश हटाएँ' : 'Dismiss status message'}
            className="text-[#666A65] hover:text-[#1A1B1A]"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      )}

      {savedItems.length === 0 ? (
        <div className="rounded-[16px] border border-dashed border-[#E6E6DF] bg-[#FAF9F5] p-6 sm:p-8 text-center space-y-2">
          <Bookmark size={22} className="mx-auto text-[#666A65]" aria-hidden="true" />
          <p className="text-sm font-semibold text-[#1A1B1A]">
            {isHi ? 'अभी कोई आइडिया सहेजा नहीं गया है' : 'No ideas saved yet'}
          </p>
          <p className="text-xs text-[#666A65] max-w-lg mx-auto">
            {isHi
              ? 'प्रश्नावली या पूर्ण श्रेणी कैटलॉग में किसी भी कार्ड पर "सहेजें" या "तुलना करें" चुनें। दृश्य बदलने पर भी सहेजे गए आइडिया बने रहेंगे।'
              : 'Use “Save” or “Compare” on any card from either the questionnaire or the full category catalogue. Saved choices persist as you switch between views.'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Saved Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {savedItems.map((entry) => {
              const isCompared = compareIdeaIds.includes(entry.idea.id);
              const compareLimitReached =
                compareIdeaIds.length >= MAX_COMPARE_IDEAS && !isCompared;
              const ideaText = getIdeaText(entry.idea, locale);
              const deptName = getDepartmentName(entry.department, locale);
              const catName = getCategoryName(entry.category, locale);

              return (
                <div
                  key={entry.idea.id}
                  className="rounded-[16px] border border-[#E6E6DF] bg-[#FAF9F5] p-4 flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-12 rounded-[10px] border border-[#E6E6DF] bg-[#F4C940] overflow-hidden shrink-0">
                      <BonnzaImage
                        src={entry.ideaImage}
                        alt={
                          isHi
                            ? `${ideaText.title} — आइडिया प्लेसहोल्डर चित्र`
                            : `${ideaText.title} — idea placeholder image`
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <p className="text-[11px] font-mono-tabular text-[#666A65]">
                        {deptName}
                      </p>
                      <button
                        type="button"
                        onClick={() => onOpenDetail(entry)}
                        className="text-left text-sm font-bold text-[#1A1B1A] hover:underline underline-offset-4"
                      >
                        {ideaText.title}
                      </button>
                      <div className="flex items-center gap-1.5 text-xs text-[#666A65]">
                        <span className="w-4 h-4 rounded-[4px] border border-[#E6E6DF] bg-[#F4C940] overflow-hidden shrink-0">
                          <BonnzaImage
                            src={entry.categoryImage}
                            alt={catName}
                            className="w-full h-full object-cover"
                          />
                        </span>
                        <span className="truncate">{catName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E6E6DF]">
                    <button
                      type="button"
                      onClick={() => onToggleCompare(entry.idea.id)}
                      disabled={compareLimitReached}
                      className={`min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1 rounded-[9px] text-xs font-semibold border transition-colors ${
                        isCompared
                          ? 'bg-[#F4C940] border-[#1A1B1A] text-[#1A1B1A]'
                          : compareLimitReached
                            ? 'bg-[#F3F1E9] border-[#E6E6DF] text-[#666A65] opacity-60 cursor-not-allowed'
                            : 'bg-[#FFFFFF] border-[#E6E6DF] text-[#1A1B1A] hover:border-[#1A1B1A]'
                      }`}
                    >
                      <Columns3 size={13} aria-hidden="true" />
                      <span>
                        {isCompared
                          ? isHi
                            ? 'तुलना में'
                            : 'Comparing'
                          : isHi
                            ? 'तुलना करें'
                            : 'Compare'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemoveSaved(entry.idea.id)}
                      aria-label={
                        isHi
                          ? `${ideaText.title} को शॉर्टलिस्ट से हटाएँ`
                          : `Remove ${ideaText.title} from shortlist`
                      }
                      className="min-h-[36px] inline-flex items-center gap-1 px-2.5 py-1 rounded-[9px] text-xs font-medium text-[#666A65] hover:text-[#1A1B1A]"
                    >
                      <X size={13} aria-hidden="true" />
                      <span>{isHi ? 'हटाएँ' : 'Remove'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side-by-Side Comparison Matrix (Up to 3 ideas) */}
          {comparedItems.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-[#E6E6DF]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-[#1A1B1A]">
                  {isHi
                    ? `साथ-साथ तुलना (${comparedItems.length} / ${MAX_COMPARE_IDEAS})`
                    : `Side-by-side comparison (${comparedItems.length} of ${MAX_COMPARE_IDEAS})`}
                </h3>
                <p className="text-xs text-[#666A65]">
                  {isHi
                    ? 'कैटलॉग मार्गदर्शन पर आधारित—निवेश से पहले सप्लायर सैंपल और चैनल नियम अवश्य जांचें।'
                    : 'Based on stored catalogue orientations—verify supplier samples and channel rules before investing.'}
                </p>
              </div>

              <div className="overflow-x-auto rounded-[16px] border border-[#E6E6DF]">
                <table className="w-full min-w-[640px] border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-[#F3F1E9] border-b border-[#E6E6DF]">
                      <th className="p-3.5 font-bold uppercase tracking-wider text-[#666A65] w-44">
                        {isHi ? 'तुलना बिंदु' : 'Comparison factor'}
                      </th>
                      {comparedItems.map((entry) => {
                        const ideaText = getIdeaText(entry.idea, locale);
                        return (
                          <th key={entry.idea.id} className="p-3.5 align-top">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="w-20 h-14 rounded-[8px] border border-[#E6E6DF] bg-[#F4C940] overflow-hidden mb-2">
                                  <BonnzaImage
                                    src={entry.ideaImage}
                                    alt={ideaText.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span className="block font-mono-tabular text-[11px] text-[#666A65]">
                                  {getDepartmentName(entry.department, locale)}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onOpenDetail(entry)}
                                  className="text-sm font-bold text-[#1A1B1A] hover:underline underline-offset-4 text-left mt-0.5"
                                >
                                  {ideaText.title}
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => onToggleCompare(entry.idea.id)}
                                aria-label={
                                  isHi
                                    ? `${ideaText.title} को तुलना से हटाएँ`
                                    : `Remove ${ideaText.title} from comparison`
                                }
                                className="p-1 text-[#666A65] hover:text-[#1A1B1A] shrink-0"
                              >
                                <X size={14} aria-hidden="true" />
                              </button>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6E6DF] bg-[#FFFFFF]">
                    <tr>
                      <th scope="row" className="p-3.5 font-semibold text-[#1A1B1A] bg-[#FAF9F5]">
                        {isHi ? 'उत्पाद दिशाएँ' : 'Product directions'}
                      </th>
                      {comparedItems.map((entry) => (
                        <td key={entry.idea.id} className="p-3.5 text-[#666A65] align-top">
                          {entry.category.subcategories
                            .map((s) => getSubcategoryName(s, locale))
                            .join(' · ')}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row" className="p-3.5 font-semibold text-[#1A1B1A] bg-[#FAF9F5]">
                        {isHi ? 'संभावित ग्राहक' : 'Potential customer'}
                      </th>
                      {comparedItems.map((entry) => (
                        <td key={entry.idea.id} className="p-3.5 text-[#666A65] align-top">
                          {getIdeaText(entry.idea, locale).customer}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row" className="p-3.5 font-semibold text-[#1A1B1A] bg-[#FAF9F5]">
                        {isHi ? 'ऑफ़र दृष्टिकोण' : 'Offer angle'}
                      </th>
                      {comparedItems.map((entry) => (
                        <td key={entry.idea.id} className="p-3.5 text-[#666A65] align-top">
                          {getIdeaText(entry.idea, locale).angle}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row" className="p-3.5 font-semibold text-[#1A1B1A] bg-[#FAF9F5]">
                        {isHi ? 'काम करने के तरीके' : 'Ways of working'}
                      </th>
                      {comparedItems.map((entry) => (
                        <td key={entry.idea.id} className="p-3.5 text-[#666A65] align-top">
                          {entry.category.business_models_to_explore
                            .map((m) => getBusinessModelLabel(m, locale))
                            .join(' · ')}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row" className="p-3.5 font-semibold text-[#1A1B1A] bg-[#FAF9F5]">
                        {isHi ? 'पूंजी उन्मुखता' : 'Capital orientation'}
                      </th>
                      {comparedItems.map((entry) => (
                        <td key={entry.idea.id} className="p-3.5 text-[#1A1B1A] font-medium align-top">
                          {getCapitalOrientationLabel(entry.category.capital_orientation, locale)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row" className="p-3.5 font-semibold text-[#1A1B1A] bg-[#FAF9F5]">
                        {isHi ? 'भौतिक स्थान' : 'Physical space'}
                      </th>
                      {comparedItems.map((entry) => (
                        <td key={entry.idea.id} className="p-3.5 text-[#666A65] align-top">
                          {getStorageLabel(entry.category.storage_profile, locale)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row" className="p-3.5 font-semibold text-[#1A1B1A] bg-[#FAF9F5]">
                        {isHi ? 'जटिलता और जांच' : 'Complexity & checks'}
                      </th>
                      {comparedItems.map((entry) => (
                        <td key={entry.idea.id} className="p-3.5 text-[#666A65] align-top space-y-1">
                          <span className="block font-medium text-[#1A1B1A]">
                            {getComplexityLabel(entry.category.operating_complexity, locale)}
                          </span>
                          {entry.category.operating_tags.length > 0 && (
                            <span className="block">
                              {entry.category.operating_tags
                                .map((t) => getOperatingTagLabel(t, locale))
                                .join('; ')}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row" className="p-3.5 font-semibold text-[#1A1B1A] bg-[#FAF9F5]">
                        {isHi ? 'उपयोगी कौशल' : 'Relevant skills'}
                      </th>
                      {comparedItems.map((entry) => (
                        <td key={entry.idea.id} className="p-3.5 text-[#666A65] align-top">
                          {entry.category.skill_tags
                            .map((s) => getSkillTagLabel(s, locale))
                            .join(', ')}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Post-Shortlist Relevant Learning Steps */}
          <div className="rounded-[16px] border border-[#E6E6DF] bg-[#F3F1E9]/60 p-5 space-y-3">
            <h3 className="text-sm font-bold text-[#1A1B1A]">
              {isHi
                ? 'अपने शॉर्टलिस्ट आइडिया को व्यावहारिक सत्यापन योजना में बदलें'
                : 'Turn your shortlisted ideas into a practical validation plan'}
            </h3>
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                to={localizePath('/courses/business-foundations', locale)}
                className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-[#1A1B1A] text-xs font-semibold text-[#FAF9F5] hover:bg-black transition-colors"
              >
                <span>
                  {isHi ? 'इस आइडिया का मूल्यांकन करना सीखें' : 'Learn how to evaluate this idea'}
                </span>
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
              <Link
                to={localizePath('/resources#starting-worksheet-heading', locale)}
                className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] border border-[#E6E6DF] bg-[#FFFFFF] text-xs font-semibold text-[#1A1B1A] hover:border-[#1A1B1A] transition-colors"
              >
                <span>{isHi ? 'लॉन्च योजना बनाएँ' : 'Build a launch plan'}</span>
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
              <Link
                to={localizePath('/courses', locale)}
                className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] border border-[#E6E6DF] bg-[#FFFFFF] text-xs font-semibold text-[#1A1B1A] hover:border-[#1A1B1A] transition-colors"
              >
                <span>{isHi ? 'Bonnza कोर्स देखें' : 'Explore Bonnza courses'}</span>
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
              <Link
                to={localizePath('/webinars/first-online-business', locale)}
                className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] border border-[#E6E6DF] bg-[#FFFFFF] text-xs font-semibold text-[#1A1B1A] hover:border-[#1A1B1A] transition-colors"
              >
                <span>
                  {isHi
                    ? 'आगामी शुरुआती लाइव वेबिनार से जुड़ें'
                    : 'Join an upcoming beginner webinar'}
                </span>
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
              <Link
                to={localizePath('/contact', locale)}
                className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] border border-[#E6E6DF] bg-[#FFFFFF] text-xs font-semibold text-[#1A1B1A] hover:border-[#1A1B1A] transition-colors"
              >
                <span>
                  {isHi ? 'आइडिया समीक्षा में मदद लें' : 'Get help reviewing the idea'}
                </span>
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
