import { useState, type RefObject } from 'react';
import { Link } from 'react-router-dom';
import { Share2, Check, ExternalLink, BookOpen } from 'lucide-react';
import type { ArticleRecord, Locale } from '../../domain/types';
import { getArticleById } from '../../content/articles';
import { COURSES } from '../../content/courses';
import { localizePath } from '../../utilities/locale';
import { FaqAccordion } from '../../components/FaqAccordion';
import { AnimatedText, ScrollReveal } from '../../components/MotionPrimitives';
import { UI_COPY } from '../../content/translations';

export function EditorialArticleView({
  article,
  locale,
  contentRef,
}: {
  article: ArticleRecord;
  locale: Locale;
  contentRef?: RefObject<HTMLDivElement | null>;
}) {
  const [copied, setCopied] = useState(false);
  const common = UI_COPY[locale].common;

  const relatedArticles = article.relatedArticleIds
    .map((id) => getArticleById(id))
    .filter((a): a is ArticleRecord => Boolean(a));

  const primaryCourseCode = article.courseMappings[0]?.split('-')[0];
  const relatedCourse = COURSES.find((c) => c.code === primaryCourseCode);
  const relatedLessonTitles = relatedCourse
    ? relatedCourse.modules
        .flatMap((m) => m.lessons)
        .filter((l) => article.courseMappings.includes(l.id))
        .map((l) => l.title[locale])
    : [];

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <article className="space-y-12">
      <div ref={contentRef} className="space-y-10">
        {/* 1. Article Hero + Byline */}
        <header className="space-y-4 pb-8 border-b border-[#E6E6DF]">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#666A65]">
            <span className="font-bold uppercase tracking-wider text-[#1A1B1A]">
              {article.topicClusterLabel[locale]}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {article.readingTimeMinutes} {locale === 'hi' ? 'मिनट पठन' : 'min read'}
            </span>
          </div>

          <AnimatedText
            as="h1"
            className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#1A1B1A] leading-tight text-balance max-w-4xl"
          >
            {article.title[locale]}
          </AnimatedText>

          <AnimatedText
            as="p"
            delay={0.07}
            className="text-base sm:text-lg text-[#666A65] leading-relaxed max-w-3xl"
          >
            {article.shortDescription[locale]}
          </AnimatedText>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-[#666A65]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>
                <strong className="text-[#1A1B1A]">
                  {locale === 'hi' ? 'लेखक:' : 'Author:'}
                </strong>{' '}
                {article.author[locale]}
              </span>
              <span>
                <strong className="text-[#1A1B1A]">
                  {locale === 'hi' ? 'समीक्षक:' : 'Reviewed by:'}
                </strong>{' '}
                {article.reviewer
                  ? article.reviewer[locale]
                  : locale === 'hi'
                  ? 'शुभम चतुर्वेदी'
                  : 'Shubham Chaturvedi'}
              </span>
              {article.sourceCheckedDate && (
                <span className="tabular-nums">
                  <strong className="text-[#1A1B1A]">
                    {locale === 'hi' ? 'स्रोत जांच तिथि:' : 'Sources checked:'}
                  </strong>{' '}
                  {article.sourceCheckedDate}
                </span>
              )}
              <span>
                <strong className="text-[#1A1B1A]">
                  {locale === 'hi' ? 'प्रकाशन:' : 'Published:'}
                </strong>{' '}
                {article.publicationDate || '2026-11-16'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-[8px] border border-[#E6E6DF] bg-[#FFFFFF] text-[#1A1B1A] hover:bg-[#F3F1E9] text-xs font-medium transition-colors"
            >
              {copied ? (
                <Check size={14} aria-hidden="true" />
              ) : (
                <Share2 size={14} aria-hidden="true" />
              )}
              {copied
                ? locale === 'hi'
                  ? 'लिंक कॉपी हुआ'
                  : 'Link copied'
                : locale === 'hi'
                ? 'लिंक कॉपी करें'
                : 'Copy link'}
            </button>
          </div>
        </header>

        {/* Direct Answer Callout */}
        <section
          aria-label={locale === 'hi' ? 'सीधा उत्तर' : 'Direct answer'}
          className="rounded-[18px] bg-[#202220] text-[#FAF9F5] p-6 sm:p-8 space-y-2"
        >
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#F4C940]">
            {locale === 'hi' ? 'संक्षिप्त सीधा उत्तर' : 'Direct answer'}
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-white max-w-4xl">
            {article.directAnswer[locale]}
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Editorial Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Key Takeaways (Unboxed Hairline Band) */}
            <section className="border-y border-[#E6E6DF] py-6 space-y-3">
              <h2 className="text-lg font-bold text-[#1A1B1A]">
                {locale === 'hi' ? 'मुख्य निष्कर्ष' : 'Key takeaways'}
              </h2>
              <ul className="space-y-2 text-sm sm:text-base text-[#1A1B1A] list-disc pl-5">
                {article.keyTakeaways[locale].map((point, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            </section>

            {/* Question-led H2 Sections */}
            {article.sections.map((section) => (
              <ScrollReveal key={section.id}>
                <section id={section.id} className="space-y-4 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-[#1A1B1A]">{section.heading[locale]}</h2>
                  {section.paragraphs[locale].map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-base text-[#1A1B1A]/90 leading-relaxed max-w-[68ch]"
                    >
                      {para}
                    </p>
                  ))}
                  {section.bulletPoints && (
                    <ul className="space-y-2 list-disc pl-5 text-base text-[#1A1B1A]/90 max-w-[68ch]">
                      {section.bulletPoints[locale].map((bp, bIdx) => (
                        <li key={bIdx}>{bp}</li>
                      ))}
                    </ul>
                  )}
                  {section.extractableStatement && (
                    <p className="border-y border-[#E6E6DF] bg-[#F3F1E9]/70 px-5 py-4 text-sm font-medium text-[#1A1B1A] max-w-[68ch]">
                      {section.extractableStatement[locale]}
                    </p>
                  )}
                </section>
              </ScrollReveal>
            ))}

            {/* Original Calculation Ledger */}
            {article.calculationBlock && (
              <ScrollReveal>
                <section className="rounded-[16px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-[#1A1B1A]">
                      {article.calculationBlock.title[locale]}
                    </h2>
                    <p className="text-xs text-[#666A65] mt-1">
                      {article.calculationBlock.note[locale]}
                    </p>
                  </div>
                  <div className="divide-y divide-[#E6E6DF] border-t border-[#E6E6DF]">
                    {article.calculationBlock.lines.map((line, idx) => (
                      <div
                        key={idx}
                        className={`py-2.5 flex items-center justify-between gap-4 text-sm ${
                          line.highlight ? 'font-bold text-[#1A1B1A]' : 'text-[#666A65]'
                        }`}
                      >
                        <span>{line.label[locale]}</span>
                        <span className="font-mono-tabular text-[#1A1B1A]">{line.amount}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </ScrollReveal>
            )}

            {/* Semantic Comparison Table */}
            {article.comparisonTable && (
              <ScrollReveal>
                <section className="rounded-[16px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 space-y-4 overflow-x-auto">
                  <h2 className="text-xl font-bold text-[#1A1B1A]">
                    {article.comparisonTable.caption[locale]}
                  </h2>
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-[#E6E6DF] text-xs font-semibold text-[#666A65]">
                        {article.comparisonTable.headers[locale].map((hdr, idx) => (
                          <th key={idx} className="py-2.5 pr-4">
                            {hdr}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6E6DF]">
                      {article.comparisonTable.rows[locale].map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`py-3 pr-4 align-top ${
                                cIdx === 0 ? 'font-medium text-[#1A1B1A]' : 'text-[#666A65]'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </ScrollReveal>
            )}

            {/* Worksheet Structure Summary */}
            {article.worksheetSummary && (
              <ScrollReveal>
                <section className="rounded-[16px] border border-[#E6E6DF] bg-[#F3F1E9] p-6 space-y-3">
                  <h2 className="text-xl font-bold text-[#1A1B1A]">
                    {article.worksheetSummary.title[locale]}
                  </h2>
                  <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#1A1B1A] list-decimal pl-5">
                    {article.worksheetSummary.fields[locale].map((field, idx) => (
                      <li key={idx}>{field}</li>
                    ))}
                  </ol>
                </section>
              </ScrollReveal>
            )}

            {/* Official Primary Sources */}
            <ScrollReveal>
              <section className="border-t border-[#E6E6DF] pt-6 space-y-3">
                <h2 className="text-xl font-bold text-[#1A1B1A]">
                  {locale === 'hi' ? 'संदर्भ और आधिकारिक स्रोत' : 'Primary sources & references'}
                </h2>
                <ul className="space-y-3 text-sm">
                  {article.primarySources.map((src, idx) => (
                    <li key={idx} className="space-y-1">
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-[#1A1B1A] underline decoration-[#E6E6DF] underline-offset-4 hover:decoration-[#1A1B1A]"
                      >
                        {src.label}
                        <ExternalLink size={13} aria-hidden="true" />
                      </a>
                      <p className="text-xs text-[#666A65] tabular-nums">
                        {locale === 'hi' ? 'जांचा गया:' : 'Checked:'} {src.checkedDate}
                        {src.caveat ? ` · ${src.caveat[locale]}` : ''}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>

            {/* Distinct Article FAQs */}
            {article.faqEntries.length > 0 && (
              <ScrollReveal>
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-[#1A1B1A]">
                    {locale === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently asked questions'}
                  </h2>
                  <FaqAccordion items={article.faqEntries} locale={locale} />
                </section>
              </ScrollReveal>
            )}
          </div>

          {/* Sticky Sidebar: TOC, Related Course, Contextual CTA */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="border-y border-[#E6E6DF] py-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#666A65]">
                {locale === 'hi' ? 'इस लेख में' : 'On this page'}
              </p>
              <ul className="space-y-2 text-sm">
                {article.sections.map((sec) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className="text-[#666A65] hover:text-[#1A1B1A] leading-snug block transition-colors"
                    >
                      {sec.heading[locale]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {relatedCourse && (
              <div className="rounded-[16px] border border-[#E6E6DF] bg-[#FFFFFF] p-5 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#666A65]">
                  <BookOpen size={14} aria-hidden="true" />
                  <span>{locale === 'hi' ? 'संबंधित कोर्स' : 'Related course'}</span>
                </div>
                <h3 className="text-base font-bold text-[#1A1B1A]">
                  {relatedCourse.title[locale]}
                </h3>
                {relatedLessonTitles.length > 0 && (
                  <p className="text-xs text-[#666A65] leading-relaxed">
                    {locale === 'hi' ? 'मुख्य पाठ:' : 'Covered in:'}{' '}
                    {relatedLessonTitles.join(' · ')}
                  </p>
                )}
                <Link
                  to={localizePath(`/courses/${relatedCourse.slug}`, locale)}
                  className="inline-flex items-center justify-center w-full min-h-[40px] px-4 py-2 rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] hover:bg-[#F3F1E9] text-xs font-semibold text-[#1A1B1A] transition-colors"
                >
                  {common.viewCourse}
                </Link>
              </div>
            )}

            <div className="rounded-[18px] bg-[#202220] text-[#FAF9F5] p-6 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#F4C940]">
                {locale === 'hi' ? 'अगला व्यावहारिक कदम' : 'Practical next step'}
              </p>
              <p className="text-base font-bold text-white leading-snug">
                {article.primaryCta.label[locale]}
              </p>
              <Link
                to={localizePath(article.primaryCta.path, locale)}
                className="inline-flex items-center justify-center w-full min-h-[44px] px-4 py-2.5 rounded-[12px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] text-sm font-semibold transition-colors"
              >
                {locale === 'hi' ? 'आगे बढ़ें' : 'Explore now'}
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="pt-8 border-t border-[#E6E6DF] space-y-5">
          <h2 className="text-2xl font-bold text-[#1A1B1A]">
            {locale === 'hi' ? 'संबंधित ई-कॉमर्स गाइड' : 'Related ecommerce guides'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#E6E6DF] bg-[#FFFFFF]">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                to={localizePath(`/blog/${rel.slug}`, locale)}
                className="border-r border-b border-[#E6E6DF] p-5 hover:bg-[#FAF9F5] transition-colors flex flex-col justify-between gap-3"
              >
                <div className="space-y-2">
                  <p className="text-xs text-[#666A65]">{rel.topicClusterLabel[locale]}</p>
                  <h3 className="text-base font-bold text-[#1A1B1A] leading-snug">
                    {rel.title[locale]}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[#1A1B1A] underline underline-offset-4">
                  {common.learnMore}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
