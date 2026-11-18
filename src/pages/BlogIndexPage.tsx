import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Search, ArrowRight, Calculator } from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import { TOPIC_CLUSTERS } from '../content/articles';
import { COURSES } from '../content/courses';
import type { TopicClusterId } from '../domain/types';
import { localizePath, stripLocalePrefix } from '../utilities/locale';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnimatedText, StaggerRevealItem } from '../components/MotionPrimitives';

export function BlogIndexPage() {
  const { clusterSlug } = useParams<{ clusterSlug?: string }>();
  const location = useLocation();
  const { locale, liveArticles } = useBonnza();

  const strippedPath = stripLocalePrefix(location.pathname);
  const isGuidesRoute = strippedPath.startsWith('/ecommerce-guides');
  const indexBase = isGuidesRoute ? '/ecommerce-guides' : '/blog';
  const seoCanonicalBase = clusterSlug ? `${indexBase}/cluster/${clusterSlug}` : indexBase;

  const [query, setQuery] = useState('');
  const [selectedCluster, setSelectedCluster] = useState<'all' | TopicClusterId>(
    (clusterSlug as TopicClusterId) || 'all'
  );
  const [visibleCount, setVisibleCount] = useState(10);

  const publishedForLocale = liveArticles.filter((a) => {
    const anyArt = a as unknown as {
      locales?: Record<'en' | 'hi', { editorialStatus: string; subjectReviewStatus: string }>;
    };
    if (anyArt.locales && anyArt.locales[locale]) {
      return (
        anyArt.locales[locale].editorialStatus === 'PUBLISHED' &&
        anyArt.locales[locale].subjectReviewStatus === 'VERIFIED'
      );
    }
    return a.editorialStatus === 'PUBLISHED' && a.subjectReviewStatus === 'VERIFIED';
  });

  const filtered = publishedForLocale.filter((article) => {
    const matchesCluster =
      selectedCluster === 'all' || article.topicCluster === selectedCluster;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      article.title[locale].toLowerCase().includes(q) ||
      article.shortDescription[locale].toLowerCase().includes(q) ||
      article.id.toLowerCase().includes(q);
    return matchesCluster && matchesQuery;
  });

  const displayed = filtered.slice(0, visibleCount);

  return (
    <div className="bonnza-container py-10 sm:py-14 space-y-10">
      <SeoHead
        locale={locale}
        title={
          locale === 'hi'
            ? 'ई-कॉमर्स गाइड | Bonnza'
            : 'Ecommerce Guides | Bonnza'
        }
        description={
          locale === 'hi'
            ? 'उत्पाद चयन, प्रति ऑर्डर लागत, Meesho, Amazon India, Etsy, WhatsApp, Shopify और Wix पर ई-कॉमर्स गाइड।'
            : 'Ecommerce Guides covering product research, unit costing, Meesho, Amazon India, Etsy, WhatsApp, Shopify, and Wix.'
        }
        path={localizePath(seoCanonicalBase, locale)}
        alternateEnPath={`/en${seoCanonicalBase}`}
        alternateHiPath={`/hi${seoCanonicalBase}`}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: locale === 'hi' ? 'होम' : 'Home', to: localizePath('/', locale) },
          { label: locale === 'hi' ? 'ई-कॉमर्स गाइड' : 'Ecommerce Guides' },
        ]}
      />

      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E6E6DF]">
        <div className="space-y-4 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#666A65]">
            {locale === 'hi' ? 'BONNZA लर्निंग लाइब्रेरी' : 'BONNZA LEARNING LIBRARY'}
          </p>
          <AnimatedText
            as="h1"
            className="text-3xl sm:text-4xl font-extrabold text-[#1A1B1A] text-balance"
          >
            {locale === 'hi' ? 'ई-कॉमर्स गाइड' : 'Ecommerce Guides'}
          </AnimatedText>
          <AnimatedText as="p" delay={0.07} className="text-base text-[#666A65] leading-relaxed">
            {locale === 'hi'
              ? 'पहली बार ऑनलाइन उत्पाद बिज़नेस शुरू करने वालों के लिए विषय-सत्यापित ई-कॉमर्स गाइड, वास्तविक गणना उदाहरण और प्राथमिक स्रोत संदर्भ।'
              : 'Topic-verified Ecommerce Guides with real order-cost examples, checklists, and primary source references for first-time online sellers.'}
          </AnimatedText>
        </div>

        <Link
          to={localizePath('/resources', locale)}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-[12px] border border-[#1A1B1A] bg-[#FFFFFF] hover:bg-[#F3F1E9] text-xs font-semibold text-[#1A1B1A] transition-colors whitespace-nowrap shrink-0 self-start lg:self-end"
        >
          <Calculator size={15} className="text-[#666A65]" aria-hidden="true" />
          <span>
            {locale === 'hi'
              ? 'कैलकुलेटर व प्लानिंग वर्कशीट खोलें'
              : 'Open Calculators & Planning Worksheets'}
          </span>
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </header>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666A65]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                locale === 'hi'
                  ? 'गाइड शीर्षक या विषय खोजें...'
                  : 'Search guide titles or topics...'
              }
              aria-label={locale === 'hi' ? 'गाइड खोजें' : 'Search guides'}
              className="w-full min-h-[44px] rounded-[10px] border border-[#E6E6DF] bg-[#FFFFFF] pl-10 pr-4 py-2 text-sm text-[#1A1B1A] focus:border-[#1A1B1A] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => {
                setSelectedCluster('all');
                setVisibleCount(20);
              }}
              className={`min-h-[36px] px-3 py-1.5 text-xs font-semibold rounded-[8px] border transition-colors ${
                selectedCluster === 'all'
                  ? 'border-[#1A1B1A] bg-[#1A1B1A] text-white'
                  : 'border-[#E6E6DF] bg-[#FFFFFF] text-[#666A65] hover:text-[#1A1B1A]'
              }`}
            >
              {locale === 'hi' ? 'सभी विषय' : 'All topics'}
            </button>
            {TOPIC_CLUSTERS.map((cl) => (
              <button
                key={cl.id}
                type="button"
                onClick={() => {
                  setSelectedCluster(cl.id);
                  setVisibleCount(20);
                }}
                className={`min-h-[36px] px-3 py-1.5 text-xs font-semibold rounded-[8px] border transition-colors ${
                  selectedCluster === cl.id
                    ? 'border-[#1A1B1A] bg-[#1A1B1A] text-white'
                    : 'border-[#E6E6DF] bg-[#FFFFFF] text-[#666A65] hover:text-[#1A1B1A]'
                }`}
              >
                {cl.name[locale]}
              </button>
            ))}
          </div>
        </div>

        {displayed.length === 0 ? (
          <div className="border-y border-[#E6E6DF] bg-[#FFFFFF] p-10 text-center space-y-2">
            <p className="text-base font-semibold text-[#1A1B1A]">
              {locale === 'hi' ? 'कोई मेल खाता लेख नहीं मिला' : 'No matching articles found'}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedCluster('all');
              }}
              className="text-xs font-semibold underline text-[#1A1B1A]"
            >
              {locale === 'hi' ? 'फ़िल्टर साफ़ करें' : 'Reset filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#E6E6DF] bg-[#FFFFFF]">
            {displayed.map((article, idx) => {
              const primaryCode = article.courseMappings[0]?.split('-')[0];
              const mappedCourse = COURSES.find((c) => c.code === primaryCode) || COURSES[0];
              return (
                <StaggerRevealItem key={article.id} index={idx}>
                  <Link
                    to={localizePath(`/blog/${article.slug}`, locale)}
                    className="h-full border-r border-b border-[#E6E6DF] p-6 sm:p-7 hover:bg-[#FAF9F5] transition-colors flex flex-col justify-between gap-5"
                  >
                    <div className="space-y-2">
                      <p className="text-xs text-[#666A65]">
                        {article.topicClusterLabel[locale]} · {article.readingTimeMinutes}{' '}
                        {locale === 'hi' ? 'मिनट पठन' : 'min read'}
                      </p>
                      <h2 className="text-xl font-bold text-[#1A1B1A] leading-snug">
                        {article.title[locale]}
                      </h2>
                      <p className="text-sm text-[#666A65] leading-relaxed">
                        {article.shortDescription[locale]}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-xs text-[#666A65] pt-3 border-t border-[#E6E6DF]">
                      <span className="truncate">
                        {locale === 'hi' ? 'संबंधित कोर्स:' : 'Course:'}{' '}
                        {mappedCourse.title[locale]}
                      </span>
                      <span className="font-semibold text-[#1A1B1A] inline-flex items-center gap-1 whitespace-nowrap shrink-0">
                        {locale === 'hi' ? 'गाइड पढ़ें' : 'Read guide'}
                        <ArrowRight size={13} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </StaggerRevealItem>
              );
            })}
          </div>
        )}

        {visibleCount < filtered.length && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 10)}
              className="min-h-[44px] px-5 py-2.5 rounded-[12px] border border-[#1A1B1A] bg-[#FFFFFF] hover:bg-[#F3F1E9] text-sm font-semibold text-[#1A1B1A] transition-colors"
            >
              {locale === 'hi'
                ? `शेष लेख दिखाएं (${filtered.length - visibleCount})`
                : `Load remaining (${filtered.length - visibleCount})`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
