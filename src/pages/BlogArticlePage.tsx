import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useBonnza } from '../context/BonnzaContext';
import { localizePath } from '../utilities/locale';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { EditorialArticleView } from '../features/blog/EditorialArticleView';
import { recordAnalyticsEvent } from '../integrations/futureInterfaces';

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale, liveArticles } = useBonnza();
  const articleContainerRef = useRef<HTMLDivElement>(null);

  const article = slug
    ? liveArticles.find((a) => a.slug === slug || a.hiSlug === slug)
    : undefined;

  useEffect(() => {
    if (article) {
      recordAnalyticsEvent({
        event: 'blog_article_view',
        locale,
        path: window.location.pathname,
        metadata: { articleId: article.id, status: article.editorialStatus },
      });
    }
  }, [article?.id]);

  if (!article) {
    return (
      <div className="bonnza-container py-16 space-y-4">
        <h1 className="text-2xl font-bold text-[#1A1B1A]">
          {locale === 'hi' ? 'लेख नहीं मिला' : 'Article not found'}
        </h1>
        <Link
          to={localizePath('/blog', locale)}
          className="text-sm font-semibold underline text-[#1A1B1A]"
        >
          {locale === 'hi' ? 'सभी गाइड पर लौटें' : 'Back to all guides'}
        </Link>
      </div>
    );
  }

  const anyArt = article as unknown as {
    locales?: Record<'en' | 'hi', { editorialStatus: string; subjectReviewStatus: string }>;
  };
  const isEnPublished = anyArt.locales?.en
    ? anyArt.locales.en.editorialStatus === 'PUBLISHED' &&
      anyArt.locales.en.subjectReviewStatus === 'VERIFIED'
    : article.editorialStatus === 'PUBLISHED' && article.subjectReviewStatus === 'VERIFIED';

  const isHiPublished = anyArt.locales?.hi
    ? anyArt.locales.hi.editorialStatus === 'PUBLISHED' &&
      anyArt.locales.hi.subjectReviewStatus === 'VERIFIED'
    : article.editorialStatus === 'PUBLISHED' && article.subjectReviewStatus === 'VERIFIED';

  const isPublishedForLocale = locale === 'hi' ? isHiPublished : isEnPublished;

  if (!isPublishedForLocale) {
    return (
      <div className="bonnza-container py-14 space-y-6 max-w-2xl">
        <SeoHead
          locale={locale}
          title={`${article.title[locale]} | Bonnza`}
          description={article.metaDescription[locale]}
          path={localizePath(`/blog/${article.slug}`, locale)}
          allowIndex={false}
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A]">
          {locale === 'hi'
            ? 'यह गाइड अभी संपादन के लिए अस्थायी रूप से अनुपलब्ध है'
            : 'This guide is currently unavailable'}
        </h1>
        <p className="text-base text-[#666A65] leading-relaxed">
          {locale === 'hi'
            ? 'इस गाइड को अद्यतन किया जा रहा है। कृपया अन्य प्रकाशित ई-कॉमर्स गाइड देखें।'
            : 'This guide is currently undergoing updates. Please browse our other published ecommerce guides.'}
        </p>
        <Link
          to={localizePath('/blog', locale)}
          className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-[12px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] font-semibold text-sm"
        >
          {locale === 'hi' ? 'सभी गाइड देखें' : 'Browse all guides'}
        </Link>
      </div>
    );
  }

  const schemas: Array<Record<string, unknown>> = [
    {
      '@context': 'https://schema.org',
      '@type': article.schemaType,
      headline: article.title[locale],
      description: article.metaDescription[locale],
      inLanguage: locale === 'hi' ? 'hi-IN' : 'en-IN',
      author: {
        '@type': 'Organization',
        name: article.author[locale],
      },
      publisher: {
        '@type': 'Organization',
        name: 'Bonnza',
      },
    },
  ];

  if (article.faqEntries.length > 0 && isPublishedForLocale) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faqEntries.map((f) => ({
        '@type': 'Question',
        name: f.question[locale],
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer[locale],
        },
      })),
    });
  }

  return (
    <div className="bonnza-container py-10 sm:py-14 space-y-6">
      <ReadingProgressBar
        label={locale === 'hi' ? 'लेख पठन प्रगति' : 'Article reading progress'}
        targetRef={articleContainerRef}
      />
      <SeoHead
        locale={locale}
        title={article.seoTitle[locale]}
        description={article.metaDescription[locale]}
        path={localizePath(`/blog/${article.slug}`, locale)}
        alternateEnPath={isEnPublished ? `/en/blog/${article.slug}` : undefined}
        alternateHiPath={isHiPublished ? `/hi/blog/${article.slug}` : undefined}
        allowIndex={isPublishedForLocale}
        ogType="article"
        jsonLd={schemas}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: locale === 'hi' ? 'होम' : 'Home', to: localizePath('/', locale) },
          {
            label: locale === 'hi' ? 'ई-कॉमर्स गाइड' : 'Ecommerce Guides',
            to: localizePath('/ecommerce-guides', locale),
          },
          { label: article.title[locale] },
        ]}
      />

      <EditorialArticleView
        article={article}
        locale={locale}
        contentRef={articleContainerRef}
      />
    </div>
  );
}
