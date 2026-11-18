import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Info, ArrowRight } from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import { COURSES } from '../content/courses';
import { SELLING_CHANNELS } from '../content/pathsAndChannels';
import { BONNZA_CONFIG } from '../domain/config';
import { UI_COPY } from '../content/translations';
import { formatInr, localizePath } from '../utilities/locale';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnimatedText, ScrollReveal, StaggerRevealItem } from '../components/MotionPrimitives';
import { ChannelLogo } from '../components/ChannelLogo';

export function ProgrammeOverviewPage() {
  const { locale } = useBonnza();
  const common = UI_COPY[locale].common;
  const [interestEmail, setInterestEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [interestError, setInterestError] = useState<string | null>(null);
  const [interestSaved, setInterestSaved] = useState(false);

  const handleInterestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInterestError(null);
    if (!interestEmail.trim() || !interestEmail.includes('@')) {
      setInterestError(
        locale === 'hi'
          ? 'कृपया एक मान्य ईमेल पता दर्ज करें।'
          : 'Please enter a valid email address.'
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/v1/programme-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: interestEmail.trim(),
          preferredPath: 'both',
          preferredLanguage: locale,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setInterestError(data.message || 'Could not save your request.');
        return;
      }
      setInterestSaved(true);
      setInterestEmail('');
    } catch {
      setInterestError(
        locale === 'hi'
          ? 'सर्वर से संपर्क करने में समस्या हुई। कृपया पुनः प्रयास करें।'
          : 'Could not reach server. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bonnza-container py-10 sm:py-14 space-y-14">
      <SeoHead
        locale={locale}
        title={
          locale === 'hi'
            ? 'पूर्ण 10-कोर्स ई-कॉमर्स प्रोग्राम | Bonnza'
            : 'Complete 10-Course Ecommerce Programme | Bonnza'
        }
        description={
          locale === 'hi'
            ? '10 कोर्स, 22 मॉड्यूल, 44 पाठ, 12 महीने की एक्सेस और 10 सप्ताह का निर्धारित समूह सहयोग।'
            : '10 courses, 22 modules, 44 practical lessons, 12 months access, and 10 weeks of scheduled group support.'
        }
        path={localizePath('/programme', locale)}
        alternateEnPath="/en/programme"
        alternateHiPath="/hi/programme"
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: locale === 'hi' ? 'होम' : 'Home', to: localizePath('/', locale) },
          { label: locale === 'hi' ? 'पूरा प्रोग्राम' : 'Complete Programme' },
        ]}
      />

      <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-10 border-b border-[#E6E6DF]">
        <div className="lg:col-span-7 space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#666A65]">
            {locale === 'hi' ? 'पूर्ण शिक्षण कार्यक्रम' : 'COMPLETE LEARNING PROGRAMME'}
          </p>
          <AnimatedText
            as="h1"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1B1A] leading-tight text-balance"
          >
            {locale === 'hi'
              ? '10 कोर्स। 22 मॉड्यूल। 44 व्यावहारिक पाठ।'
              : '10 courses. 22 modules. 44 practical lessons.'}
          </AnimatedText>
          <p className="text-base sm:text-lg text-[#666A65] leading-relaxed">
            {locale === 'hi'
              ? 'नींव, रीसेल सोर्सिंग, शिल्प लागत, सोशल/WhatsApp, Meesho, Amazon India, Shopify/Wix, Etsy, Amazon Global और दैनिक संचालन। सभी 10 कोर्स अंग्रेज़ी और हिंदी में संरचित हैं।'
              : 'Covering business foundations, Resell sourcing, Craft to Commerce, Social/WhatsApp, Meesho, Amazon India, Shopify/Wix, Etsy, Amazon Global, and daily operations in both English and Hindi.'}
          </p>

          <ul className="space-y-2.5 pt-2 border-t border-[#E6E6DF] text-sm text-[#1A1B1A]">
            <li className="flex items-start gap-2.5 pt-2">
              <Check size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                {locale === 'hi'
                  ? 'नामांकन के बाद 12 महीने की रिकॉर्डेड एक्सेस'
                  : '12 months of learning access from enrolment'}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                {locale === 'hi'
                  ? '10 सप्ताह का निर्धारित समूह सहयोग'
                  : '10 weeks of scheduled group support'}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                {locale === 'hi'
                  ? 'अंग्रेज़ी और हिंदी शिक्षण सामग्री शामिल'
                  : 'English and Hindi learning materials included'}
              </span>
            </li>
          </ul>
        </div>

        <aside className="lg:col-span-5 rounded-[20px] border border-white/10 bg-[#202220] text-[#FAF9F5] p-6 sm:p-8 space-y-5">
          <div className="space-y-1 pb-4 border-b border-white/10">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#F4C940]">
              {locale === 'hi' ? 'प्रोग्राम शुल्क संरचना' : 'PROGRAMME PRICING'}
            </p>
            <div className="flex items-baseline justify-between pt-2">
              <span className="text-sm text-[#FAF9F5]/80">
                {locale === 'hi' ? 'पूर्ण 10-कोर्स बंडल' : 'Complete 10-course bundle'}
              </span>
              <span className="text-2xl font-extrabold font-mono-tabular text-[#F4C940]">
                {formatInr(BONNZA_CONFIG.pricing.bundleProvisionalInr, locale)}
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <span className="text-sm text-[#FAF9F5]/80">
                {locale === 'hi' ? 'एकल कोर्स' : 'Standalone course'}
              </span>
              <span className="text-lg font-bold font-mono-tabular text-white">
                {formatInr(BONNZA_CONFIG.pricing.standaloneCourseProvisionalInr, locale)}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-[#FAF9F5]/80 leading-relaxed">
            <p>{common.provisionalPriceNotice}</p>
            <p>{common.checkoutDisabledNotice}</p>
            <p>
              {locale === 'hi'
                ? 'लाइव कार्यशाला में भाग लेने वाले ₹299 शुल्क को 7 दिनों के भीतर पूर्ण बंडल में समायोजित कर सकते हैं।'
                : 'Workshop attendees can credit the ₹299 ticket fee toward the complete 10-course bundle within seven days after attending.'}
            </p>
            <p>
              {locale === 'hi'
                ? 'कार्यान्वयन सहायता (Implementation assistance) अलग से तय और मूल्यबद्ध है—यह कोर्स शुल्क में शामिल नहीं है।'
                : 'Implementation assistance is separately scoped and priced and is not included in course tuition.'}
            </p>
          </div>

          <form
            onSubmit={handleInterestSubmit}
            noValidate
            className="space-y-3 pt-4 border-t border-white/10"
          >
            <label className="block space-y-1.5">
              <span className="block text-xs font-semibold text-white">
                {locale === 'hi'
                  ? 'प्रोग्राम सूचना के लिए ईमेल दर्ज करें'
                  : 'Register for programme release updates'}
              </span>
              <input
                type="email"
                required
                value={interestEmail}
                onChange={(e) => setInterestEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full min-h-[44px] rounded-[10px] border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/45 focus:border-[#F4C940] focus:outline-none"
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="w-full min-h-[48px] px-5 py-3 rounded-[12px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] text-sm font-semibold transition-colors"
            >
              {submitting
                ? locale === 'hi'
                  ? 'सहेजा जा रहा है...'
                  : 'Submitting...'
                : locale === 'hi'
                ? 'प्रोग्राम सूचना सूची में जुड़ें'
                : 'Notify me when enrolment opens'}
            </button>
            {interestError && (
              <p role="alert" className="text-xs text-[#F4C940]">
                {interestError}
              </p>
            )}
            {interestSaved && (
              <p className="text-xs text-[#F4C940]">
                {locale === 'hi'
                  ? 'आपका ईमेल सुरक्षित हो गया है। नया बैच खुलने पर हम आपको सूचित करेंगे।'
                  : 'Your interest has been registered. We will notify you by email when the cohort opens.'}
              </p>
            )}
          </form>
        </aside>
      </header>

      {/* All 10 Courses Overview */}
      <ScrollReveal>
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A]">
              {locale === 'hi' ? 'सभी 10 कोर्स की संरचना' : 'All 10 courses in the curriculum'}
            </h2>
            <Link
              to={localizePath('/courses', locale)}
              className="text-sm font-semibold text-[#1A1B1A] underline underline-offset-4"
            >
              {locale === 'hi' ? 'पूर्ण कोर्स कैटलॉग खोलें' : 'Open full course catalogue'}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#E6E6DF] bg-[#FFFFFF]">
            {COURSES.map((course, idx) => {
              const lessonCount = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
              const courseChannels = course.relatedChannelSlugs
                .map((slug) => SELLING_CHANNELS.find((ch) => ch.slug === slug))
                .filter((ch): ch is (typeof SELLING_CHANNELS)[number] => Boolean(ch));

              return (
                <StaggerRevealItem key={course.id} index={idx}>
                  <div className="h-full border-r border-b border-[#E6E6DF] hover:bg-[#FAF9F5] transition-colors flex flex-col justify-between">
                    <Link
                      to={localizePath(`/courses/${course.slug}`, locale)}
                      className="p-6 pb-4 space-y-2 flex-1 block"
                    >
                      <p className="text-xs font-mono-tabular text-[#666A65]">
                        {course.modules.length} {locale === 'hi' ? 'मॉड्यूल' : 'modules'} ·{' '}
                        {lessonCount} {locale === 'hi' ? 'पाठ' : 'lessons'} ·{' '}
                        {course.releaseStatusLabel[locale]}
                      </p>
                      <h3 className="text-xl font-bold text-[#1A1B1A]">{course.title[locale]}</h3>
                      <p className="text-sm text-[#666A65] leading-relaxed">
                        {course.outcome[locale]}
                      </p>
                    </Link>

                    <div className="px-6 py-3.5 border-t border-[#E6E6DF] flex items-center justify-between gap-3">
                      <div
                        className="flex items-center gap-1.5"
                        aria-label={locale === 'hi' ? 'संबंधित चैनल' : 'Covered channels'}
                      >
                        {courseChannels.map((ch) => (
                          <Link
                            key={ch.slug}
                            to={localizePath(`/learn/${ch.slug}`, locale)}
                            title={ch.name[locale]}
                            aria-label={`${ch.name[locale]} ${locale === 'hi' ? 'चैनल गाइड' : 'channel guide'}`}
                            className="inline-flex rounded-[8px] hover:scale-105 transition-transform duration-150"
                          >
                            <ChannelLogo slug={ch.slug} size="sm" />
                          </Link>
                        ))}
                      </div>
                      <Link
                        to={localizePath(`/courses/${course.slug}`, locale)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1B1A] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                      >
                        {UI_COPY[locale].common.viewCourse}
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </StaggerRevealItem>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      <div className="border-t border-[#E6E6DF] pt-6 flex items-start gap-2.5 text-xs text-[#666A65]">
        <Info size={16} className="shrink-0 mt-0.5 text-[#1A1B1A]" aria-hidden="true" />
        <p>
          {locale === 'hi'
            ? 'शुरुआती उद्यमी 90-मिनट की लाइव वर्कशॉप से शुरुआत कर सकते हैं या 10-कोर्स प्रोग्राम की सूचना सूची में शामिल हो सकते हैं।'
            : 'First-time entrepreneurs can start with the 90-minute live workshop or register above for upcoming 10-course cohort dates.'}
        </p>
      </div>
    </div>
  );
}
