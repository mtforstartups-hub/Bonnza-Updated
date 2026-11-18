import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, BookOpen, Calculator, CheckSquare, FileSpreadsheet } from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import { localizePath } from '../utilities/locale';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnimatedText, ScrollReveal } from '../components/MotionPrimitives';
import { OrderCostCalculator } from '../features/resources/OrderCostCalculator';
import { FirstChannelWorksheet } from '../features/resources/FirstChannelWorksheet';
import { BusinessStartingWorksheet } from '../features/resources/BusinessStartingWorksheet';

export function ResourcesPage() {
  const { locale } = useBonnza();
  const location = useLocation();

  // Scroll smoothly to hash anchor (#cost-calculator-heading, etc.) when arriving via deep link
  useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.replace('#', '');
    const timer = window.setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
    return () => window.clearTimeout(timer);
  }, [location.hash]);

  return (
    <div className="bonnza-container py-10 sm:py-14 space-y-12">
      <SeoHead
        locale={locale}
        title={
          locale === 'hi'
            ? 'इंटरैक्टिव ऑर्डर लागत कैलकुलेटर और प्लानिंग वर्कशीट | Bonnza'
            : 'Interactive Order Cost Calculator & Planning Worksheets | Bonnza'
        }
        description={
          locale === 'hi'
            ? 'अपने ब्राउज़र में 1. ऑर्डर लागत कैलकुलेटर, 2. पहला चैनल वर्कशीट और 3. बिज़नेस शुरुआती वर्कशीट का उपयोग करें।'
            : 'Use 1. Order Cost Calculator, 2. First-Channel Worksheet, and 3. Business Starting Worksheet directly in your browser.'
        }
        path={localizePath('/resources', locale)}
        alternateEnPath="/en/resources"
        alternateHiPath="/hi/resources"
      />

      <div className="space-y-6">
        <Breadcrumbs
          locale={locale}
          items={[
            { label: locale === 'hi' ? 'होम' : 'Home', to: localizePath('/', locale) },
            { label: locale === 'hi' ? 'संसाधन' : 'Resources' },
          ]}
        />

        {/* Unboxed Editorial Hero with Direct Jump Navigation & Cross-link to Ecommerce Guides */}
        <header className="pb-8 border-b border-[#E6E6DF] space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#666A65]">
                {locale === 'hi'
                  ? 'ब्राउज़र-स्थानीय इंटरैक्टिव उपकरण · क्रम 1, 2, 3'
                  : 'BROWSER-LOCAL INTERACTIVE TOOLS'}
              </p>
              <AnimatedText
                as="h1"
                className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#1A1B1A] leading-tight text-balance"
              >
                {locale === 'hi'
                  ? 'ऑर्डर लागत कैलकुलेटर और प्लानिंग वर्कशीट'
                  : 'Order Cost Calculator & Planning Worksheets'}
              </AnimatedText>
              <AnimatedText
                as="p"
                delay={0.07}
                className="text-base sm:text-lg text-[#666A65] leading-relaxed"
              >
                {locale === 'hi'
                  ? 'नीचे दिए गए तीनों इंटरैक्टिव उपकरण आपके ब्राउज़र में स्थानीय रूप से चलते हैं। कोई लॉगिन आवश्यक नहीं है और आपका कोई भी डेटा किसी बाहरी सर्वर पर नहीं भेजा जाता।'
                  : 'All three interactive planning tools below run locally in your browser with zero sign-up required. Nothing you enter is transmitted to a remote server.'}
              </AnimatedText>
            </div>

            <Link
              to={localizePath('/ecommerce-guides', locale)}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-[12px] bg-[#1A1B1A] hover:bg-black text-[#FAF9F5] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 self-start"
            >
              <BookOpen size={15} className="text-[#F4C940]" aria-hidden="true" />
              <span>
                {locale === 'hi' ? 'ई-कॉमर्स गाइड पढ़ें' : 'Read Ecommerce Guides'}
              </span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <a
              href="#cost-calculator-heading"
              className="min-h-[40px] inline-flex items-center gap-2 px-3.5 py-2 rounded-[10px] border border-[#E6E6DF] bg-[#FFFFFF] font-semibold text-[#1A1B1A] hover:border-[#1A1B1A] hover:bg-[#F3F1E9] transition-colors"
            >
              <Calculator size={14} className="text-[#666A65]" aria-hidden="true" />
              <span>
                {locale === 'hi' ? '1. ऑर्डर लागत कैलकुलेटर' : '1. Order Cost Calculator'}
              </span>
            </a>
            <a
              href="#channel-worksheet-heading"
              className="min-h-[40px] inline-flex items-center gap-2 px-3.5 py-2 rounded-[10px] border border-[#E6E6DF] bg-[#FFFFFF] font-semibold text-[#1A1B1A] hover:border-[#1A1B1A] hover:bg-[#F3F1E9] transition-colors"
            >
              <CheckSquare size={14} className="text-[#666A65]" aria-hidden="true" />
              <span>
                {locale === 'hi' ? '2. पहला चैनल वर्कशीट' : '2. First-Channel Worksheet'}
              </span>
            </a>
            <a
              href="#starting-worksheet-heading"
              className="min-h-[40px] inline-flex items-center gap-2 px-3.5 py-2 rounded-[10px] border border-[#E6E6DF] bg-[#FFFFFF] font-semibold text-[#1A1B1A] hover:border-[#1A1B1A] hover:bg-[#F3F1E9] transition-colors"
            >
              <FileSpreadsheet size={14} className="text-[#666A65]" aria-hidden="true" />
              <span>
                {locale === 'hi'
                  ? '3. बिज़नेस शुरुआती वर्कशीट'
                  : '3. Business Starting Worksheet'}
              </span>
            </a>
          </div>
        </header>
      </div>

      {/* Standalone Tools 1, 2, 3 */}
      <section
        id="interactive-tools-section"
        aria-label={
          locale === 'hi'
            ? 'इंटरैक्टिव लागत कैलकुलेटर व प्लानिंग वर्कशीट'
            : 'Interactive calculators and planning worksheets'
        }
        className="space-y-12"
      >
        <ScrollReveal>
          <div className="scroll-mt-24">
            <OrderCostCalculator locale={locale} />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="scroll-mt-24">
            <FirstChannelWorksheet locale={locale} />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="scroll-mt-24">
            <BusinessStartingWorksheet locale={locale} />
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
