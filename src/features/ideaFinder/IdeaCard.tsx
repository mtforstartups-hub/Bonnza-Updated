import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Bookmark, Check, Columns3, Share2 } from 'lucide-react';
import type { Locale } from '../../domain/types';
import { BonnzaImage } from '../../components/IllustrativeDiagrams';
import {
  FIT_LABEL_STYLES,
  getBusinessModelLabel,
  getCapitalShortLabel,
  getCategoryName,
  getComplexityLabel,
  getDepartmentName,
  getFitLabelText,
  getIdeaText,
  getStorageLabel,
  getSubcategoryName,
} from './labels';
import { copySingleIdeaToClipboard } from './storage';
import type { EnrichedIdeaItem, RankedIdeaMatch } from './types';

interface IdeaCardProps {
  item: EnrichedIdeaItem;
  locale: Locale;
  match?: RankedIdeaMatch;
  isSaved: boolean;
  isCompared: boolean;
  compareDisabled: boolean;
  onToggleSave: (ideaId: string) => void;
  onToggleCompare: (ideaId: string) => void;
  onOpenDetail: (item: EnrichedIdeaItem, match?: RankedIdeaMatch) => void;
}

export function IdeaCard({
  item,
  locale,
  match,
  isSaved,
  isCompared,
  compareDisabled,
  onToggleSave,
  onToggleCompare,
  onOpenDetail,
}: IdeaCardProps) {
  const isHi = locale === 'hi';
  const { idea, category, department } = item;
  const deptName = getDepartmentName(department, locale);
  const catName = getCategoryName(category, locale);
  const ideaText = getIdeaText(idea, locale);
  const productDirections = category.subcategories.map((s) =>
    getSubcategoryName(s, locale)
  );
  const routesText = category.business_models_to_explore
    .map((m) => getBusinessModelLabel(m, locale))
    .join(' · ');

  const fitStyle = match ? FIT_LABEL_STYLES[match.fitLabel] : null;
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const shareTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (shareTimerRef.current !== null) {
        window.clearTimeout(shareTimerRef.current);
      }
    };
  }, []);

  const handleShare = async () => {
    const result = await copySingleIdeaToClipboard(item, locale, match);
    setShareStatus(result.ok ? 'copied' : 'error');
    if (shareTimerRef.current !== null) {
      window.clearTimeout(shareTimerRef.current);
    }
    shareTimerRef.current = window.setTimeout(() => {
      setShareStatus('idle');
      shareTimerRef.current = null;
    }, 2500);
  };

  return (
    <article
      data-testid={`idea-card-${category.id}`}
      className="rounded-[20px] border border-[#E6E6DF] bg-[#FFFFFF] flex flex-col justify-between transition-colors hover:border-[#1A1B1A]"
    >
      <div>
        {/* Business Idea Image Space */}
        <div
          data-testid={`idea-image-${idea.id}`}
          className="relative overflow-hidden rounded-t-[19px] border-b border-[#E6E6DF] bg-[#F4C940] aspect-[16/10]"
        >
          <BonnzaImage
            src={item.ideaImage}
            alt={
              isHi
                ? `${ideaText.title} — ई-कॉमर्स आइडिया प्लेसहोल्डर चित्र`
                : `${ideaText.title} — ecommerce idea placeholder image`
            }
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 space-y-4">
          {/* Top Metadata Row: Category image + quiet editorial metadata + single Fit indicator when in quiz results */}
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div
                data-testid={`category-image-${category.id}`}
                className="w-11 h-11 rounded-[10px] border border-[#E6E6DF] bg-[#F4C940] overflow-hidden shrink-0"
              >
                <BonnzaImage
                  src={item.categoryImage}
                  alt={
                    isHi
                      ? `${catName} — श्रेणी प्लेसहोल्डर चित्र`
                      : `${catName} — category placeholder image`
                  }
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1 min-w-0">
                <p className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#666A65]">
                  {deptName}
                </p>
                <p className="text-xs font-semibold text-[#1A1B1A]">{catName}</p>
              </div>
            </div>
            {match && fitStyle && (
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-[8px] border text-[11px] font-semibold whitespace-nowrap shrink-0 ${fitStyle.border} ${fitStyle.bg} ${fitStyle.text}`}
              >
                {getFitLabelText(match.fitLabel, locale)}
              </span>
            )}
          </div>

        {/* Business Idea Title & Offer Angle */}
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-[#1A1B1A] leading-snug">
            {ideaText.title}
          </h3>
          <p className="text-sm text-[#666A65] leading-relaxed">
            <span className="font-semibold text-[#1A1B1A]">
              {isHi ? 'ऑफ़र दृष्टिकोण:' : 'Offer angle:'}
            </span>{' '}
            {ideaText.angle}
          </p>
        </div>

        {/* Key Structured Metadata */}
        <dl className="grid grid-cols-1 gap-2 pt-2 border-t border-[#E6E6DF]/80 text-xs">
          <div>
            <dt className="inline font-semibold text-[#1A1B1A]">
              {isHi ? 'संभावित ग्राहक: ' : 'Potential customer: '}
            </dt>
            <dd className="inline text-[#666A65]">{ideaText.customer}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-[#1A1B1A]">
              {isHi ? 'उत्पाद दिशाएँ: ' : 'Product directions: '}
            </dt>
            <dd className="inline text-[#666A65]">{productDirections.join(' · ')}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-[#1A1B1A]">
              {isHi ? 'काम करने का तरीका: ' : 'Way of working: '}
            </dt>
            <dd className="inline text-[#666A65]">{routesText}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-[#1A1B1A]">
              {isHi ? 'प्रारंभिक उन्मुखता: ' : 'Orientation: '}
            </dt>
            <dd className="inline font-mono-tabular text-[#666A65]">
              {getCapitalShortLabel(category.capital_orientation, locale)} ·{' '}
              {getComplexityLabel(category.operating_complexity, locale)} ·{' '}
              {getStorageLabel(category.storage_profile, locale)}
            </dd>
          </div>
        </dl>

        {/* Match Reasons & Consideration when shown from Questionnaire */}
        {match && (
          <div className="rounded-[14px] bg-[#FAF9F5] border border-[#E6E6DF] p-3.5 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#1A1B1A]">
              {isHi ? 'यह आपके उत्तरों से क्यों मेल खाता है' : 'Why this matches your answers'}
            </p>
            <ul className="space-y-1 text-xs text-[#666A65] list-disc pl-4">
              {match.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
            <p className="text-xs text-[#666A65] pt-1 border-t border-[#E6E6DF]">
              <span className="font-semibold text-[#1A1B1A]">
                {isHi ? 'संचालन जांच:' : 'Operating check:'}
              </span>{' '}
              {match.operatingConsideration}
            </p>
            {match.channelCaveat && (
              <p className="text-xs text-[#666A65]">
                <span className="font-semibold text-[#1A1B1A]">
                  {isHi ? 'चैनल जांच:' : 'Channel check:'}
                </span>{' '}
                {match.channelCaveat}
              </p>
            )}
          </div>
        )}
        </div>
      </div>

      {/* Actions Footer */}
      <div className="px-6 py-4 border-t border-[#E6E6DF] bg-[#FAF9F5]/60 rounded-b-[20px] flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleSave(idea.id)}
            aria-pressed={isSaved}
            className={`min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
              isSaved
                ? 'bg-[#1A1B1A] border-[#1A1B1A] text-[#FAF9F5]'
                : 'bg-[#FFFFFF] border-[#E6E6DF] text-[#1A1B1A] hover:border-[#1A1B1A]'
            }`}
          >
            {isSaved ? (
              <Check size={14} aria-hidden="true" />
            ) : (
              <Bookmark size={14} aria-hidden="true" />
            )}
            <span>
              {isSaved ? (isHi ? 'सहेजा गया' : 'Saved') : isHi ? 'सहेजें' : 'Save'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onToggleCompare(idea.id)}
            aria-pressed={isCompared}
            disabled={!isCompared && compareDisabled}
            title={
              !isCompared && compareDisabled
                ? isHi
                  ? 'आप एक साथ अधिकतम 3 आइडिया की तुलना कर सकते हैं'
                  : 'You can compare up to 3 ideas at a time'
                : undefined
            }
            className={`min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
              isCompared
                ? 'bg-[#F4C940] border-[#1A1B1A] text-[#1A1B1A]'
                : compareDisabled
                  ? 'bg-[#F3F1E9] border-[#E6E6DF] text-[#666A65] opacity-60 cursor-not-allowed'
                  : 'bg-[#FFFFFF] border-[#E6E6DF] text-[#1A1B1A] hover:border-[#1A1B1A]'
            }`}
          >
            <Columns3 size={14} aria-hidden="true" />
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
            onClick={handleShare}
            data-testid={`share-idea-${category.id}`}
            aria-label={
              shareStatus === 'copied'
                ? isHi
                  ? `${ideaText.title} क्लिपबोर्ड पर कॉपी हो गया`
                  : `${ideaText.title} copied to clipboard`
                : isHi
                  ? `${ideaText.title} साझा करें`
                  : `Share ${ideaText.title}`
            }
            className={`min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
              shareStatus === 'copied'
                ? 'bg-[#1A1B1A] border-[#1A1B1A] text-[#FAF9F5]'
                : shareStatus === 'error'
                  ? 'bg-[#F3F1E9] border-[#1A1B1A] text-[#1A1B1A]'
                  : 'bg-[#FFFFFF] border-[#E6E6DF] text-[#1A1B1A] hover:border-[#1A1B1A]'
            }`}
          >
            {shareStatus === 'copied' ? (
              <Check size={14} aria-hidden="true" />
            ) : (
              <Share2 size={14} aria-hidden="true" />
            )}
            <span>
              {shareStatus === 'copied'
                ? isHi
                  ? 'कॉपी हो गया'
                  : 'Copied'
                : shareStatus === 'error'
                  ? isHi
                    ? 'कॉपी विफल'
                    : 'Copy failed'
                  : isHi
                    ? 'साझा करें'
                    : 'Share'}
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => onOpenDetail(item, match)}
          className="min-h-[40px] inline-flex items-center gap-1 px-3 py-1.5 rounded-[10px] text-xs font-semibold text-[#1A1B1A] hover:bg-[#F3F1E9] transition-colors whitespace-nowrap shrink-0"
        >
          <span>{isHi ? 'विस्तार से देखें' : 'Explore idea'}</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
