import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import { WEBINAR_FAQS } from '../content/webinars';
import { localizePath } from '../utilities/locale';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FaqAccordion } from '../components/FaqAccordion';
import { AnimatedText, ScrollReveal } from '../components/MotionPrimitives';

export function FaqPage() {
  const { locale } = useBonnza();

  const items = WEBINAR_FAQS.map((f) => ({
    question: f.q,
    answer: f.a,
  }));

  return (
    <div className="bonnza-container py-10 sm:py-14 space-y-10">
      <SeoHead
        locale={locale}
        title={
          locale === 'hi' ? 'सामान्य प्रश्न (FAQ) | Bonnza' : 'Frequently Asked Questions | Bonnza'
        }
        description={
          locale === 'hi'
            ? 'Bonnza वर्कशॉप, अंग्रेज़ी/हिंदी सत्र, कोर्स उपलब्धता और रिफंड नीति से जुड़े सामान्य प्रश्न।'
            : 'Answers about starting without experience, English and Hindi sessions, Resell vs Craft to Commerce, and course release status.'
        }
        path={localizePath('/faq', locale)}
        alternateEnPath="/en/faq"
        alternateHiPath="/hi/faq"
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: locale === 'hi' ? 'होम' : 'Home', to: localizePath('/', locale) },
          { label: locale === 'hi' ? 'सामान्य प्रश्न' : 'FAQ' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <header className="lg:col-span-4 space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#666A65]">FAQ</p>
          <AnimatedText
            as="h1"
            className="text-3xl sm:text-4xl font-extrabold text-[#1A1B1A] text-balance"
          >
            {locale === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently asked questions'}
          </AnimatedText>
          <p className="text-sm text-[#666A65] leading-relaxed">
            {locale === 'hi'
              ? 'लाइव कार्यशाला, भाषा विकल्प, लागत मॉडल, प्रोग्राम और रिफंड से जुड़े स्पष्ट उत्तर।'
              : 'Clear answers about the 5 December workshop, English & Hindi batches, unit economics tools, and cancellation policy.'}
          </p>
          <Link
            to={localizePath('/contact', locale)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1B1A] underline underline-offset-4 pt-1"
          >
            <span>
              {locale === 'hi' ? 'कोई अन्य प्रश्न पूछें' : 'Have another question? Contact us'}
            </span>
            <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </header>

        <ScrollReveal className="lg:col-span-8">
          <FaqAccordion items={items} locale={locale} />
        </ScrollReveal>
      </div>
    </div>
  );
}
