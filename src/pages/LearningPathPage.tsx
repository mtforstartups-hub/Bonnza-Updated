import { Link, useParams } from 'react-router-dom';
import { Check, AlertCircle, ArrowRight } from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import { LEARNING_PATHS } from '../content/pathsAndChannels';
import { COURSES } from '../content/courses';
import { getArticleById } from '../content/articles';
import type { ArticleRecord } from '../domain/types';
import { localizePath } from '../utilities/locale';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BonnzaImage } from '../components/IllustrativeDiagrams';
import { AnimatedText, ScrollReveal, StaggerRevealItem } from '../components/MotionPrimitives';

export function LearningPathPage() {
  const { pathSlug } = useParams<{ pathSlug: string }>();
  const { locale } = useBonnza();

  const pathRecord =
    LEARNING_PATHS.find((p) => p.slug === pathSlug) || LEARNING_PATHS[0];
  const otherPath = LEARNING_PATHS.find((p) => p.id !== pathRecord.id)!;

  const coursesInPath = COURSES.filter((c) => pathRecord.courseIds.includes(c.id));
  const articlesInPath = pathRecord.articleIds
    .map((id) => getArticleById(id))
    .filter((a): a is ArticleRecord => Boolean(a));

  const bgSurface = pathRecord.id === 'resell' ? 'bg-[#E8EDDD]' : 'bg-[#F4E6D4]';

  return (
    <div className="bonnza-container py-10 sm:py-14 space-y-14">
      <SeoHead
        locale={locale}
        title={`${pathRecord.title[locale]} | Bonnza`}
        description={pathRecord.subtitle[locale]}
        path={localizePath(`/learning-paths/${pathRecord.slug}`, locale)}
        alternateEnPath={`/en/learning-paths/${pathRecord.slug}`}
        alternateHiPath={`/hi/learning-paths/${pathRecord.slug}`}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: locale === 'hi' ? 'होम' : 'Home', to: localizePath('/', locale) },
          { label: pathRecord.title[locale] },
        ]}
      />

      <header className={`rounded-[20px] border border-[#E6E6DF] ${bgSurface} p-6 sm:p-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1A1B1A]/70">
              {locale === 'hi' ? 'लर्निंग पाथ' : 'LEARNING PATH'}
            </p>
            <AnimatedText
              as="h1"
              className="text-3xl sm:text-4xl font-extrabold text-[#1A1B1A] text-balance"
            >
              {pathRecord.title[locale]}
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.07}
              className="text-base sm:text-lg text-[#1A1B1A]/90 leading-relaxed"
            >
              {pathRecord.subtitle[locale]}
            </AnimatedText>
            <p className="text-sm text-[#1A1B1A]/80 leading-relaxed">
              {pathRecord.summary[locale]}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to={localizePath('/webinars/5-december-2026', locale)}
                className="inline-flex items-center justify-center min-h-[46px] px-5 py-2.5 rounded-[12px] bg-[#1A1B1A] text-[#FAF9F5] font-semibold text-sm hover:bg-black transition-colors"
              >
                {locale === 'hi' ? '90-मिनट लाइव वर्कशॉप देखें' : 'Join the 90-minute workshop'}
              </Link>
              <Link
                to={localizePath(`/paths/${otherPath.slug}`, locale)}
                className="inline-flex items-center justify-center min-h-[46px] px-5 py-2.5 rounded-[12px] border border-[#1A1B1A]/25 bg-[#FFFFFF]/80 text-[#1A1B1A] font-semibold text-sm hover:bg-[#FFFFFF] transition-colors"
              >
                {locale === 'hi'
                  ? `दूसरा पथ: ${otherPath.title.hi}`
                  : `Switch to ${otherPath.title.en}`}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 overflow-hidden rounded-[14px] border border-[#1A1B1A]/10 aspect-[4/3] bg-[#FFFFFF]">
            <BonnzaImage
              src={pathRecord.imageSrc}
              alt={pathRecord.imageAlt[locale]}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 border-y border-[#E6E6DF] divide-y lg:divide-y-0 lg:divide-x divide-[#E6E6DF]">
          <section className="lg:col-span-7 py-8 lg:pr-10 space-y-4">
            <h2 className="text-2xl font-bold text-[#1A1B1A]">
              {locale === 'hi' ? 'इस पथ में आप क्या सीखते हैं' : 'What this learning path covers'}
            </h2>
            <ul className="space-y-3">
              {pathRecord.keyTopics[locale].map((topic, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-[#1A1B1A]">
                  <Check size={17} className="shrink-0 mt-1" aria-hidden="true" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="lg:col-span-5 py-8 lg:pl-10 space-y-3">
            <div className="flex items-center gap-2 text-[#1A1B1A]">
              <AlertCircle size={18} aria-hidden="true" />
              <h2 className="text-lg font-bold">
                {locale === 'hi' ? 'ध्यान रखने योग्य मुख्य बातें' : 'What to Keep in Mind'}
              </h2>
            </div>
            <p className="text-sm text-[#666A65] leading-relaxed">
              {pathRecord.importantDistinction[locale]}
            </p>
          </section>
        </div>
      </ScrollReveal>

      {/* Courses in this path */}
      <ScrollReveal>
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-[#1A1B1A]">
            {locale === 'hi' ? 'इस पथ के प्रमुख कोर्स' : 'Relevant courses in this path'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#E6E6DF] bg-[#FFFFFF]">
            {coursesInPath.map((c, idx) => {
              const lessonCount = c.modules.reduce((acc, m) => acc + m.lessons.length, 0);
              return (
                <StaggerRevealItem key={c.id} index={idx}>
                  <Link
                    to={localizePath(`/courses/${c.slug}`, locale)}
                    className="h-full block border-r border-b border-[#E6E6DF] p-6 hover:bg-[#FAF9F5] transition-colors space-y-2"
                  >
                    <p className="text-xs font-mono-tabular text-[#666A65]">
                      {c.modules.length} {locale === 'hi' ? 'मॉड्यूल' : 'modules'} · {lessonCount}{' '}
                      {locale === 'hi' ? 'पाठ' : 'lessons'}
                    </p>
                    <h3 className="text-lg font-bold text-[#1A1B1A]">{c.title[locale]}</h3>
                    <p className="text-xs text-[#666A65]">{c.releaseStatusLabel[locale]}</p>
                  </Link>
                </StaggerRevealItem>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* Related Guides */}
      <ScrollReveal>
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-[#1A1B1A]">
            {locale === 'hi' ? 'संबंधित ई-कॉमर्स गाइड' : 'Related ecommerce guides'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#E6E6DF] bg-[#FFFFFF]">
            {articlesInPath.map((art, idx) => (
              <StaggerRevealItem key={art.id} index={idx}>
                <Link
                  to={localizePath(`/blog/${art.slug}`, locale)}
                  className="h-full border-r border-b border-[#E6E6DF] p-6 hover:bg-[#FAF9F5] transition-colors flex flex-col justify-between gap-3"
                >
                  <div>
                    <p className="text-xs text-[#666A65]">{art.topicClusterLabel[locale]}</p>
                    <h3 className="text-base font-bold text-[#1A1B1A] mt-1">
                      {art.title[locale]}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A1B1A]">
                    {locale === 'hi' ? 'गाइड पढ़ें' : 'Read guide'}
                    <ArrowRight size={13} aria-hidden="true" />
                  </span>
                </Link>
              </StaggerRevealItem>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
