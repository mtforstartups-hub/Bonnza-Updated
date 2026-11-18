import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import { COURSES } from '../content/courses';
import { SELLING_CHANNELS } from '../content/pathsAndChannels';
import type { BusinessPathId } from '../domain/types';
import { localizePath } from '../utilities/locale';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnimatedText, StaggerRevealItem } from '../components/MotionPrimitives';
import { ChannelLogo } from '../components/ChannelLogo';
import { UI_COPY } from '../content/translations';

export function CoursesCatalogPage() {
  const { locale } = useBonnza();
  const [pathFilter, setPathFilter] = useState<'all' | BusinessPathId>('all');

  const filteredCourses =
    pathFilter === 'all'
      ? COURSES
      : COURSES.filter((c) => c.businessPath === pathFilter || c.businessPath === 'both');

  const filterButtons: Array<{ id: 'all' | BusinessPathId; en: string; hi: string }> = [
    { id: 'all', en: 'All courses', hi: 'सभी कोर्स' },
    { id: 'resell', en: 'Resell path', hi: 'रीसेल पथ' },
    { id: 'craft-to-commerce', en: 'Craft to Commerce path', hi: 'क्राफ्ट टू कॉमर्स पथ' },
  ];

  return (
    <div className="bonnza-container py-10 sm:py-14 space-y-10">
      <SeoHead
        locale={locale}
        title={
          locale === 'hi'
            ? 'कोर्स कैटलॉग — व्यावहारिक ई-कॉमर्स पाठ्यक्रम | Bonnza'
            : 'Course Catalogue — Practical Ecommerce Curriculum | Bonnza'
        }
        description={
          locale === 'hi'
            ? 'रीसेल और क्राफ्ट टू कॉमर्स के लिए अंग्रेज़ी और हिंदी में Bonnza का संपूर्ण ई-कॉमर्स कोर्स कैटलॉग देखें।'
            : 'Browse the complete Bonnza ecommerce course catalogue across Resell and Craft to Commerce in English and Hindi.'
        }
        path={localizePath('/courses', locale)}
        alternateEnPath="/en/courses"
        alternateHiPath="/hi/courses"
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: locale === 'hi' ? 'होम' : 'Home', to: localizePath('/', locale) },
          {
            label: locale === 'hi' ? 'पूरा प्रोग्राम' : 'Programme',
            to: localizePath('/programme', locale),
          },
          { label: locale === 'hi' ? 'कोर्स कैटलॉग' : 'Courses' },
        ]}
      />

      <header className="space-y-5 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#666A65]">
          {locale === 'hi' ? 'कोर्स कैटलॉग' : 'COURSE CATALOGUE'}
        </p>
        <AnimatedText
          as="h1"
          className="text-3xl sm:text-4xl font-extrabold text-[#1A1B1A] text-balance"
        >
          {locale === 'hi'
            ? 'संपूर्ण ई-कॉमर्स कोर्स कैटलॉग'
            : 'Complete ecommerce course catalogue'}
        </AnimatedText>
        <p className="text-base text-[#666A65] leading-relaxed">
          {locale === 'hi'
            ? 'प्रत्येक कोर्स में अंग्रेज़ी और हिंदी का संरचित पाठ्यक्रम, व्यावहारिक अभ्यास और सीखने के संसाधन शामिल हैं।'
            : 'Each course includes a structured syllabus in English and Hindi, practical exercises, and guided ecommerce frameworks.'}
        </p>

        <div className="flex flex-wrap items-center gap-1 p-1 bg-[#F3F1E9] rounded-[12px] w-fit">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setPathFilter(btn.id)}
              className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-[9px] transition-colors whitespace-nowrap shrink-0 ${
                pathFilter === btn.id
                  ? 'bg-[#FFFFFF] text-[#1A1B1A] shadow-xs'
                  : 'text-[#666A65] hover:text-[#1A1B1A]'
              }`}
            >
              {locale === 'hi' ? btn.hi : btn.en}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#E6E6DF] bg-[#FFFFFF]">
        {filteredCourses.map((course, idx) => {
          const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
          const courseChannels = course.relatedChannelSlugs
            .map((slug) => SELLING_CHANNELS.find((ch) => ch.slug === slug))
            .filter((ch): ch is (typeof SELLING_CHANNELS)[number] => Boolean(ch));

          return (
            <StaggerRevealItem key={course.id} index={idx}>
              <div className="h-full border-r border-b border-[#E6E6DF] hover:bg-[#FAF9F5] transition-colors flex flex-col justify-between">
                <Link
                  to={localizePath(`/courses/${course.slug}`, locale)}
                  className="p-6 pb-4 space-y-2.5 flex-1 block"
                >
                  <p className="text-xs font-mono-tabular text-[#666A65]">
                    {course.modules.length} {locale === 'hi' ? 'मॉड्यूल' : 'modules'} ·{' '}
                    {totalLessons} {locale === 'hi' ? 'पाठ' : 'lessons'} ·{' '}
                    {course.releaseStatusLabel[locale]}
                  </p>
                  <h2 className="text-xl font-bold text-[#1A1B1A]">{course.title[locale]}</h2>
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
    </div>
  );
}
