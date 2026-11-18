import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bookmark,
  Check,
  Columns3,
  Info,
  X,
} from 'lucide-react';
import type { Locale } from '../../domain/types';
import { localizePath } from '../../utilities/locale';
import { BonnzaImage } from '../../components/IllustrativeDiagrams';
import {
  FIT_LABEL_STYLES,
  getBonnzaLearningLinksForCategory,
  getBusinessModelLabel,
  getCapitalDefinitionText,
  getCapitalOrientationLabel,
  getCategoryName,
  getChannelResearchLabel,
  getComplexityLabel,
  getDepartmentName,
  getFitLabelText,
  getGeneralCopyText,
  getIdeaText,
  getOperatingTagLabel,
  getSkillTagLabel,
  getStorageLabel,
  getSubcategoryName,
  getSubcategoryNotes,
  getTimeLabel,
} from './labels';
import type { EnrichedIdeaItem, RankedIdeaMatch } from './types';

interface IdeaDetailModalProps {
  item: EnrichedIdeaItem | null;
  match?: RankedIdeaMatch;
  locale: Locale;
  isSaved: boolean;
  isCompared: boolean;
  compareDisabled: boolean;
  onClose: () => void;
  onToggleSave: (ideaId: string) => void;
  onToggleCompare: (ideaId: string) => void;
}

export function IdeaDetailModal({
  item,
  match,
  locale,
  isSaved,
  isCompared,
  compareDisabled,
  onClose,
  onToggleSave,
  onToggleCompare,
}: IdeaDetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!item) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 20);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [item, onClose]);

  if (!item) return null;

  const isHi = locale === 'hi';
  const { idea, category, department } = item;
  const deptName = getDepartmentName(department, locale);
  const catName = getCategoryName(category, locale);
  const ideaText = getIdeaText(idea, locale);
  const general = getGeneralCopyText(locale);
  const learningLinks = getBonnzaLearningLinksForCategory(category, locale);
  const fitStyle = match ? FIT_LABEL_STYLES[match.fitLabel] : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="idea-detail-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1A1B1A]/60 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-[24px] border border-[#E6E6DF] bg-[#FAF9F5] shadow-xl">
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 py-5 bg-[#FFFFFF]/95 backdrop-blur-sm border-b border-[#E6E6DF]">
          <div className="flex items-start gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-[12px] border border-[#E6E6DF] bg-[#F4C940] overflow-hidden shrink-0 mt-0.5">
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
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono-tabular text-[#666A65]">
                  {deptName}
                </span>
                {match && fitStyle && (
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-[6px] border text-[11px] font-semibold ${fitStyle.border} ${fitStyle.bg} ${fitStyle.text}`}
                  >
                    {getFitLabelText(match.fitLabel, locale)}
                  </span>
                )}
              </div>
              <h2
                id="idea-detail-modal-title"
                className="text-xl sm:text-2xl font-extrabold text-[#1A1B1A] leading-tight"
              >
                {ideaText.title}
              </h2>
              <p className="text-xs font-medium text-[#666A65]">
                {isHi ? `श्रेणी: ${catName}` : `Category: ${catName}`}
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={isHi ? 'आइडिया विवरण बंद करें' : 'Close idea details'}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-[12px] border border-[#E6E6DF] bg-[#FAF9F5] text-[#1A1B1A] hover:border-[#1A1B1A] transition-colors shrink-0"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6">
          {/* Business Idea Hero Image Space */}
          <div className="rounded-[16px] border border-[#E6E6DF] bg-[#F4C940] overflow-hidden aspect-[16/9] max-h-[280px] w-full">
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

          {/* Quick Save & Compare Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[16px] border border-[#E6E6DF] bg-[#FFFFFF] p-4">
            <p className="text-xs text-[#666A65]">
              {isHi
                ? 'इस शुरुआती दिशा को अपनी ब्राउज़र शॉर्टलिस्ट में सहेजें या साथ-साथ अधिकतम तीन आइडिया की तुलना करें।'
                : 'Save this starter direction to your browser shortlist or compare up to three ideas side by side.'}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleSave(idea.id)}
                aria-pressed={isSaved}
                className={`min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] text-xs font-semibold border transition-colors whitespace-nowrap ${
                  isSaved
                    ? 'bg-[#1A1B1A] border-[#1A1B1A] text-[#FAF9F5]'
                    : 'bg-[#FAF9F5] border-[#E6E6DF] text-[#1A1B1A] hover:border-[#1A1B1A]'
                }`}
              >
                {isSaved ? (
                  <Check size={14} aria-hidden="true" />
                ) : (
                  <Bookmark size={14} aria-hidden="true" />
                )}
                <span>
                  {isSaved
                    ? isHi
                      ? 'शॉर्टलिस्ट में सहेजा गया'
                      : 'Saved to shortlist'
                    : isHi
                      ? 'आइडिया सहेजें'
                      : 'Save idea'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onToggleCompare(idea.id)}
                aria-pressed={isCompared}
                disabled={!isCompared && compareDisabled}
                className={`min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] text-xs font-semibold border transition-colors whitespace-nowrap ${
                  isCompared
                    ? 'bg-[#F4C940] border-[#1A1B1A] text-[#1A1B1A]'
                    : compareDisabled
                      ? 'bg-[#F3F1E9] border-[#E6E6DF] text-[#666A65] opacity-60 cursor-not-allowed'
                      : 'bg-[#FAF9F5] border-[#E6E6DF] text-[#1A1B1A] hover:border-[#1A1B1A]'
                }`}
              >
                <Columns3 size={14} aria-hidden="true" />
                <span>
                  {isCompared
                    ? isHi
                      ? 'तुलना के लिए चयनित'
                      : 'Selected for compare'
                    : isHi
                      ? 'तुलना में जोड़ें'
                      : 'Add to compare'}
                </span>
              </button>
            </div>
          </div>

          {/* Customer, Offer Angle, and Business Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-[16px] border border-[#E6E6DF] bg-[#FFFFFF] p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#666A65]">
                {isHi ? 'ऑफ़र का सारांश' : 'Offer overview'}
              </h3>
              <dl className="space-y-2.5 text-sm">
                <div>
                  <dt className="text-xs font-semibold text-[#1A1B1A]">
                    {isHi ? 'संभावित ग्राहक' : 'Potential customer'}
                  </dt>
                  <dd className="text-[#666A65] mt-0.5">{ideaText.customer}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-[#1A1B1A]">
                    {isHi ? 'ऑफ़र दृष्टिकोण' : 'Offer angle'}
                  </dt>
                  <dd className="text-[#666A65] mt-0.5">{ideaText.angle}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-[#1A1B1A]">
                    {isHi ? 'विचारणीय कार्य-तरीके' : 'Ways of working to explore'}
                  </dt>
                  <dd className="text-[#666A65] mt-0.5">
                    {category.business_models_to_explore
                      .map((m) => getBusinessModelLabel(m, locale))
                      .join(' · ')}
                  </dd>
                </div>
              </dl>
              <p className="text-[11px] text-[#666A65] pt-2 border-t border-[#E6E6DF]">
                {isHi
                  ? `${general.sourceStatus}। इसमें बिक्री मात्रा या लाभ मार्जिन का कोई अनुमानित दावा शामिल नहीं है।`
                  : `${general.sourceStatus}. No assumed sales volume or profit margin is claimed.`}
              </p>
            </div>

            {/* Operational Profile */}
            <div className="rounded-[16px] border border-[#E6E6DF] bg-[#FFFFFF] p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#666A65]">
                {isHi ? 'संचालन और संसाधन प्रोफ़ाइल' : 'Operational & resource profile'}
              </h3>
              <dl className="space-y-2.5 text-sm">
                <div>
                  <dt className="text-xs font-semibold text-[#1A1B1A]">
                    {getCapitalOrientationLabel(category.capital_orientation, locale)}
                  </dt>
                  <dd className="text-xs text-[#666A65] mt-0.5">
                    {getCapitalDefinitionText(category.capital_orientation, locale)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-[#1A1B1A]">
                    {isHi ? 'स्थान और समय आवश्यकताएँ' : 'Space & time needs'}
                  </dt>
                  <dd className="text-xs text-[#666A65] mt-0.5">
                    {getStorageLabel(category.storage_profile, locale)} ·{' '}
                    {getTimeLabel(category.time_profile, locale)} ·{' '}
                    {getComplexityLabel(category.operating_complexity, locale)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-[#1A1B1A]">
                    {isHi ? 'उपयोगी कौशल' : 'Useful skills to draw on'}
                  </dt>
                  <dd className="text-xs text-[#666A65] mt-0.5">
                    {category.skill_tags.map((s) => getSkillTagLabel(s, locale)).join(' · ')}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Product Subcategories & Variant-Specific Caveats */}
          <div className="rounded-[16px] border border-[#E6E6DF] bg-[#FFFFFF] p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#666A65]">
              {isHi ? 'उदाहरण उत्पाद दिशाएँ' : 'Example product directions'}
            </h3>
            <div className="divide-y divide-[#E6E6DF]">
              {category.subcategories.map((sub) => {
                const subNotes = getSubcategoryNotes(sub, locale);
                return (
                  <div key={sub.id} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold text-[#1A1B1A]">
                        {getSubcategoryName(sub, locale)}
                      </span>
                    </div>
                    {subNotes.length > 0 && (
                      <div className="rounded-[10px] bg-[#F3F1E9] px-3 py-2 text-xs text-[#1A1B1A] flex items-start gap-2">
                        <Info size={14} className="text-[#666A65] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{subNotes.join(' · ')}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Likely Operating Work & What to Verify */}
          <div className="rounded-[16px] border border-[#E6E6DF] bg-[#FFFFFF] p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#666A65]">
              {isHi
                ? 'स्टॉक मंगाने से पहले योजना और जांच के बिंदु'
                : 'What to plan & verify before ordering stock'}
            </h3>
            <div className="space-y-2 text-xs text-[#666A65] leading-relaxed">
              {category.operating_tags.length > 0 ? (
                <p>
                  <span className="font-semibold text-[#1A1B1A]">
                    {isHi ? 'संचालन विचारणीय बिंदु: ' : 'Operating considerations: '}
                  </span>
                  {category.operating_tags.map((t) => getOperatingTagLabel(t, locale)).join('; ')}
                  {isHi ? '।' : '.'}
                </p>
              ) : (
                <p>
                  <span className="font-semibold text-[#1A1B1A]">
                    {isHi ? 'संचालन विचारणीय बिंदु: ' : 'Operating considerations: '}
                  </span>
                  {isHi
                    ? 'श्रेणी स्तर पर कोई विशेष हैंडलिंग चेतावनी दर्ज नहीं है, फिर भी व्यक्तिगत उत्पादों के लिए सैंपल जांच आवश्यक है।'
                    : 'No specialist handling flags recorded at the category level, though individual SKUs still require sample verification.'}
                </p>
              )}
              <p>
                <span className="font-semibold text-[#1A1B1A]">
                  {isHi ? 'शोध करने योग्य चैनल: ' : 'Channels to research: '}
                </span>
                {category.possible_channel_research
                  .map((c) => getChannelResearchLabel(c, locale))
                  .join('; ')}
                {isHi ? '।' : '.'}
              </p>
              <p className="rounded-[10px] bg-[#FAF9F5] border border-[#E6E6DF] p-3 text-[#1A1B1A]">
                <span className="font-semibold">
                  {isHi ? 'चैनल और संपादकीय टिप्पणी:' : 'Channel & editorial note:'}
                </span>{' '}
                {general.channelResearchStatus}
                {isHi ? '। ' : '. '}
                {general.classificationNote}
              </p>
            </div>
          </div>

          {/* Bonnza Next Steps */}
          <div className="rounded-[16px] border border-[#E6E6DF] bg-[#FFFFFF] p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#666A65]">
              {isHi ? 'Bonnza के साथ आगे सीखें' : 'Continue learning with Bonnza'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {learningLinks.map((link) => (
                <Link
                  key={link.to + link.label}
                  to={localizePath(link.to, locale)}
                  onClick={onClose}
                  className={`rounded-[12px] border p-3.5 transition-colors flex flex-col justify-between gap-2 ${
                    link.kind === 'primary'
                      ? 'bg-[#F4C940]/20 border-[#1A1B1A] hover:bg-[#F4C940]/35'
                      : 'bg-[#FAF9F5] border-[#E6E6DF] hover:border-[#1A1B1A]'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#1A1B1A] flex items-center justify-between gap-2">
                      <span>{link.label}</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </span>
                    <p className="text-[11px] text-[#666A65] leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
