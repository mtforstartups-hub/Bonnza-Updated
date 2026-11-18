import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, CheckSquare, ArrowRight } from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import { COURSES } from '../content/courses';
import { SELLING_CHANNELS } from '../content/pathsAndChannels';
import { getArticleById } from '../content/articles';
import type { ArticleRecord } from '../domain/types';
import { localizePath } from '../utilities/locale';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { AnimatedText, ScrollReveal } from '../components/MotionPrimitives';
import { ChannelLogo } from '../components/ChannelLogo';
import { UI_COPY } from '../content/translations';
import { recordAnalyticsEvent } from '../integrations/futureInterfaces';

export function CourseDetailPage() {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const { locale } = useBonnza();
  const common = UI_COPY[locale].common;
  const [interestEmail, setInterestEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [interestError, setInterestError] = useState<string | null>(null);
  const [interestNoted, setInterestNoted] = useState(false);
  const courseContainerRef = useRef<HTMLDivElement>(null);

  const course = COURSES.find((c) => c.slug === courseSlug);

  useEffect(() => {
    if (course) {
      recordAnalyticsEvent({
        event: 'course_view',
        locale,
        path: window.location.pathname,
        metadata: { courseId: course.id },
      });
    }
  }, [course?.id]);

  if (!course) {
    return (
      <div className="bonnza-container py-16 space-y-4">
        <h1 className="text-2xl font-bold text-[#1A1B1A]">
          {locale === 'hi' ? 'कोर्स नहीं मिला' : 'Course not found'}
        </h1>
        <Link
          to={localizePath('/courses', locale)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A1B1A] underline"
        >
          {common.backToAll}
        </Link>
      </div>
    );
  }

  const relatedArticles = course.relatedArticleIds
    .map((id) => getArticleById(id))
    .filter((a): a is ArticleRecord => Boolean(a));

  const relatedChannels = course.relatedChannelSlugs
    .map((slug) => SELLING_CHANNELS.find((ch) => ch.slug === slug))
    .filter((ch): ch is (typeof SELLING_CHANNELS)[number] => Boolean(ch));

  const pathLabel =
    course.businessPath === 'resell'
      ? locale === 'hi'
        ? 'रीसेल: सोर्स टू सेल'
        : 'Resell: Source to Sell'
      : course.businessPath === 'craft-to-commerce'
      ? locale === 'hi'
        ? 'क्राफ्ट टू कॉमर्स'
        : 'Craft to Commerce'
      : locale === 'hi'
      ? 'रीसेल और क्राफ्ट टू कॉमर्स दोनों'
      : 'Both Resell and Craft to Commerce';

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title[locale],
    description: course.outcome[locale],
    provider: {
      '@type': 'Organization',
      name: 'Bonnza',
    },
  };

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
          preferredPath: course.businessPath,
          preferredLanguage: locale,
          courseCode: course.code,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setInterestError(data.message || 'Could not save your request.');
        return;
      }
      setInterestNoted(true);
      setInterestEmail('');
    } catch {
      setInterestError(
        locale === 'hi'
          ? 'अनुरोध सहेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।'
          : 'Could not reach server. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bonnza-container py-10 sm:py-14 space-y-12">
      <ReadingProgressBar
        label={locale === 'hi' ? 'कोर्स पाठ्यक्रम पठन प्रगति' : 'Course syllabus reading progress'}
        targetRef={courseContainerRef}
      />
      <SeoHead
        locale={locale}
        title={`${course.title[locale]} | Bonnza`}
        description={course.outcome[locale]}
        path={localizePath(`/courses/${course.slug}`, locale)}
        alternateEnPath={`/en/courses/${course.slug}`}
        alternateHiPath={`/hi/courses/${course.slug}`}
        jsonLd={courseSchema}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: locale === 'hi' ? 'होम' : 'Home', to: localizePath('/', locale) },
          { label: locale === 'hi' ? 'कोर्स' : 'Courses', to: localizePath('/courses', locale) },
          { label: course.title[locale] },
        ]}
      />

      <div ref={courseContainerRef} className="space-y-14">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-10 border-b border-[#E6E6DF]">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#666A65]">
              {pathLabel} · {course.releaseStatusLabel[locale]}
            </p>
            <AnimatedText
              as="h1"
              className="text-3xl sm:text-4xl font-extrabold text-[#1A1B1A] text-balance"
            >
              {course.title[locale]}
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.07}
              className="text-base sm:text-lg text-[#666A65] leading-relaxed"
            >
              {course.outcome[locale]}
            </AnimatedText>

            <ScrollReveal delay={0.08}>
              <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-[#E6E6DF] bg-[#FFFFFF] mt-2">
                <div className="border-r border-b border-[#E6E6DF] p-4 space-y-1">
                  <p className="text-xs font-semibold text-[#666A65]">
                    {locale === 'hi' ? 'लक्षित शिक्षार्थी' : 'Intended learner'}
                  </p>
                  <p className="text-sm text-[#1A1B1A]">{course.intendedLearner[locale]}</p>
                </div>
                <div className="border-r border-b border-[#E6E6DF] p-4 space-y-1">
                  <p className="text-xs font-semibold text-[#666A65]">
                    {locale === 'hi' ? 'पूर्व आवश्यकताएं' : 'Prerequisites'}
                  </p>
                  <p className="text-sm text-[#1A1B1A]">{course.prerequisites[locale]}</p>
                </div>
                <div className="border-r border-b border-[#E6E6DF] p-4 space-y-1">
                  <p className="text-xs font-semibold text-[#666A65]">
                    {locale === 'hi' ? 'भाषा उपलब्धता' : 'Language availability'}
                  </p>
                  <p className="text-sm text-[#1A1B1A]">{course.languageAvailability[locale]}</p>
                </div>
                <div className="border-r border-b border-[#E6E6DF] p-4 space-y-1">
                  <p className="text-xs font-semibold text-[#666A65]">
                    {locale === 'hi' ? 'प्रवेश व सहायता' : 'Access & support'}
                  </p>
                  <p className="text-sm text-[#1A1B1A]">{course.accessAndSupport[locale]}</p>
                </div>
              </div>

              {relatedChannels.length > 0 && (
                <div className="pt-5 space-y-2.5">
                  <p className="text-xs font-semibold text-[#666A65]">
                    {locale === 'hi' ? 'इस कोर्स में शामिल बिक्री चैनल' : 'Selling channels covered'}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {relatedChannels.map((ch) => (
                      <Link
                        key={ch.slug}
                        to={localizePath(`/learn/${ch.slug}`, locale)}
                        className="inline-flex items-center gap-2.5 min-h-[42px] px-3 py-1.5 rounded-[10px] border border-[#E6E6DF] bg-[#FFFFFF] hover:border-[#1A1B1A] transition-colors text-xs font-semibold text-[#1A1B1A] whitespace-nowrap shrink-0"
                      >
                        <ChannelLogo slug={ch.slug} size="sm" />
                        <span>{ch.name[locale]}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </ScrollReveal>
          </div>

          <aside className="lg:col-span-5 rounded-[20px] border border-white/10 bg-[#202220] text-[#FAF9F5] p-6 sm:p-8 space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#F4C940]">
              {course.releaseStatusLabel[locale]}
            </p>
            <h2 className="text-xl font-bold text-white">
              {locale === 'hi'
                ? 'कोर्स अपडेट और नामांकन सूचना प्राप्त करें'
                : 'Register interest for this course'}
            </h2>
            <p className="text-xs text-[#FAF9F5]/80 leading-relaxed">
              {common.checkoutDisabledNotice}
            </p>
            <form onSubmit={handleInterestSubmit} noValidate className="space-y-3 pt-2">
              <input
                type="email"
                required
                value={interestEmail}
                onChange={(e) => setInterestEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label={locale === 'hi' ? 'ईमेल पता' : 'Email address'}
                className="w-full min-h-[44px] rounded-[10px] border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/45 focus:border-[#F4C940] focus:outline-none"
              />
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
                  ? 'सूचना सूची में जुड़ें'
                  : 'Notify me when enrolment opens'}
              </button>
              {interestError && (
                <p role="alert" className="text-xs text-[#F4C940]">
                  {interestError}
                </p>
              )}
              {interestNoted && (
                <p className="text-xs text-[#F4C940]">
                  {locale === 'hi'
                    ? 'आपका अनुरोध सुरक्षित हो गया है। बैच खुलने पर हम आपको ईमेल से सूचित करेंगे।'
                    : 'Thank you — your interest is saved. We will notify you by email when enrolment opens.'}
                </p>
              )}
            </form>
          </aside>
        </header>

        {/* Modules & Lessons */}
        <ScrollReveal>
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-[#1A1B1A]">
              {locale === 'hi' ? 'मॉड्यूल और पाठ पाठ्यक्रम' : 'Modules and lessons'}
            </h2>

            <div className="space-y-6">
              {course.modules.map((mod) => (
                <div
                  key={mod.id}
                  className="border-t border-[#E6E6DF] pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                  <div className="lg:col-span-4 space-y-1">
                    <p className="text-xs font-mono-tabular font-semibold uppercase tracking-wider text-[#666A65]">
                      {locale === 'hi' ? `मॉड्यूल 0${mod.number}` : `Module 0${mod.number}`}
                    </p>
                    <h3 className="text-lg font-bold text-[#1A1B1A]">{mod.title[locale]}</h3>
                  </div>
                  <div className="lg:col-span-8 divide-y divide-[#E6E6DF] border-b border-[#E6E6DF] bg-[#FFFFFF] border-x border-t rounded-[12px] overflow-hidden">
                    {mod.lessons.map((lesson, lIdx) => (
                      <div
                        key={lesson.id}
                        className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-2"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-[#1A1B1A]">
                            <span className="font-mono-tabular text-[#666A65] mr-2">
                              {String(lIdx + 1).padStart(2, '0')}.
                            </span>
                            {lesson.title[locale]}
                          </p>
                          <p className="text-sm text-[#666A65]">{lesson.summary[locale]}</p>
                        </div>
                        <span className="text-xs font-medium text-[#666A65] whitespace-nowrap shrink-0">
                          {locale === 'hi' ? 'अंग्रेज़ी व हिंदी' : 'EN & HI'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Practical Assignments & Related Articles */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-[#E6E6DF]">
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-[#1A1B1A]">
                <CheckSquare size={18} aria-hidden="true" />
                <h2 className="text-xl font-bold">
                  {locale === 'hi' ? 'व्यावहारिक अभ्यास' : 'Practical assignments'}
                </h2>
              </div>
              <ul className="space-y-2.5 list-disc pl-5 text-sm text-[#1A1B1A]">
                {course.practicalAssignments[locale].map((assn, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {assn}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2 text-[#1A1B1A]">
                <BookOpen size={18} aria-hidden="true" />
                <h2 className="text-xl font-bold">
                  {locale === 'hi' ? 'संबंधित ई-कॉमर्स गाइड' : 'Related ecommerce guides'}
                </h2>
              </div>
              <div className="border-y border-[#E6E6DF] divide-y divide-[#E6E6DF] bg-[#FFFFFF]">
                {relatedArticles.map((art) => (
                  <Link
                    key={art.id}
                    to={localizePath(`/blog/${art.slug}`, locale)}
                    className="block p-4 hover:bg-[#FAF9F5] transition-colors"
                  >
                    <p className="text-xs text-[#666A65]">{art.topicClusterLabel[locale]}</p>
                    <p className="text-sm font-bold text-[#1A1B1A] mt-0.5 flex items-center justify-between gap-2">
                      <span>{art.title[locale]}</span>
                      <ArrowRight size={14} className="shrink-0" aria-hidden="true" />
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
