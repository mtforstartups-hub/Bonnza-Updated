import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import { localizePath } from '../utilities/locale';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PresenterTypographicCard } from '../components/IllustrativeDiagrams';
import { AnimatedText, ScrollReveal, StaggerRevealItem } from '../components/MotionPrimitives';
import { UI_COPY } from '../content/translations';

export function AboutPage() {
  const { locale } = useBonnza();
  const webCopy = UI_COPY[locale].webinar;

  return (
    <div className="bonnza-container py-10 sm:py-14 space-y-14">
      <SeoHead
        locale={locale}
        title={
          locale === 'hi'
            ? 'Bonnza के बारे में | व्यावहारिक ई-कॉमर्स शिक्षा'
            : 'About Bonnza | Practical Ecommerce Education'
        }
        description={
          locale === 'hi'
            ? 'Bonnza का उद्देश्य पहली बार और घर से ऑनलाइन उत्पाद बिज़नेस शुरू करने वालों के लिए निर्णय लेना आसान बनाना है।'
            : 'Bonnza helps first-time and home-based entrepreneurs understand how to start and operate an online product business.'
        }
        path={localizePath('/about', locale)}
        alternateEnPath="/en/about"
        alternateHiPath="/hi/about"
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: locale === 'hi' ? 'होम' : 'Home', to: localizePath('/', locale) },
          { label: locale === 'hi' ? 'हमारे बारे में' : 'About Bonnza' },
        ]}
      />

      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#666A65]">
          {locale === 'hi' ? 'BONNZA के बारे में' : 'ABOUT BONNZA'}
        </p>
        <AnimatedText
          as="h1"
          className="text-3xl sm:text-4xl font-extrabold text-[#1A1B1A] text-balance"
        >
          {locale === 'hi'
            ? 'आपके पहले ऑनलाइन उत्पाद बिज़नेस के लिए व्यावहारिक शिक्षा।'
            : 'Practical ecommerce education for your first online business.'}
        </AnimatedText>
        <AnimatedText
          as="p"
          delay={0.07}
          className="text-base sm:text-lg text-[#666A65] leading-relaxed"
        >
          {locale === 'hi'
            ? 'Bonnza पहली बार शुरुआत करने वाले और घर-आधारित उद्यमियों को सिखाता है कि उत्पाद कैसे परखें, सामान कैसे बनाएं या सोर्स करें, बिक्री लागत कैसे गिनें, ऑनलाइन लिस्टिंग कैसे तैयार करें और दैनिक संचालन कैसे चलाएं।'
            : 'Bonnza helps first-time and home-based entrepreneurs understand how to start and operate an online product business—combining practical instruction, product and channel decisions, assignments, useful worksheets, and scheduled group support.'}
        </AnimatedText>
      </header>

      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 border-y border-[#E6E6DF] divide-y md:divide-y-0 md:divide-x divide-[#E6E6DF]">
          <StaggerRevealItem index={0}>
            <section className="h-full py-8 md:pr-10 space-y-3">
              <h2 className="text-xl font-bold text-[#1A1B1A]">
                {locale === 'hi' ? 'हमारा मिशन' : 'Our mission'}
              </h2>
              <p className="text-sm sm:text-base text-[#666A65] leading-relaxed">
                {locale === 'hi'
                  ? 'शुरुआती कदम उठा रहे लोगों के लिए ऑनलाइन उत्पाद बिज़नेस को समझना और उस पर अमल करना आसान बनाना।'
                  : 'Make starting an online product business easier to understand and act on for people taking their first entrepreneurial steps.'}
              </p>
            </section>
          </StaggerRevealItem>

          <StaggerRevealItem index={1}>
            <section className="h-full py-8 md:pl-10 space-y-3">
              <h2 className="text-xl font-bold text-[#1A1B1A]">
                {locale === 'hi' ? 'जो हम कभी नहीं करते' : 'What Bonnza never promises'}
              </h2>
              <p className="text-sm sm:text-base text-[#666A65] leading-relaxed">
                {locale === 'hi'
                  ? 'हम कभी भी सुनिश्चित बिक्री, गारंटीड आय, निश्चित लाभ या स्वतः मार्केटप्लेस स्वीकृति का वादा नहीं करते। न ही हम काल्पनिक छात्र संख्या या नकली समीक्षाएं दिखाते हैं।'
                  : 'Bonnza never promises guaranteed sales, income, profitability, or marketplace approval, and never publishes fabricated testimonials, student counts, or unverified claims.'}
              </p>
            </section>
          </StaggerRevealItem>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#1A1B1A]">{webCopy.presenterHeading}</h2>
          <PresenterTypographicCard
            locale={locale}
            roleLabel={webCopy.presenterRole}
            bio={webCopy.presenterBio}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <div className="flex flex-wrap gap-3">
          <Link
            to={localizePath('/webinars/5-december-2026', locale)}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-[12px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] font-semibold text-sm transition-colors"
          >
            <span>{locale === 'hi' ? 'लाइव वर्कशॉप देखें' : 'Explore the Live Workshop'}</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <Link
            to={localizePath('/contact', locale)}
            className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-[12px] border border-[#E6E6DF] bg-[#FFFFFF] hover:bg-[#F3F1E9] text-[#1A1B1A] font-semibold text-sm transition-colors"
          >
            {locale === 'hi' ? 'संपर्क करें' : 'Contact Bonnza'}
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
