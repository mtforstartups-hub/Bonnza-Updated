import { Link, useParams } from 'react-router-dom';
import { Check, AlertCircle, ArrowRight } from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import { SELLING_CHANNELS } from '../content/pathsAndChannels';
import { COURSES } from '../content/courses';
import { getArticleById } from '../content/articles';
import type { ArticleRecord } from '../domain/types';
import { localizePath } from '../utilities/locale';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnimatedText, ScrollReveal } from '../components/MotionPrimitives';
import { ChannelLogo } from '../components/ChannelLogo';

export function ChannelDetailPage() {
  const { channelSlug } = useParams<{ channelSlug: string }>();
  const { locale } = useBonnza();

  const channel = SELLING_CHANNELS.find((ch) => ch.slug === channelSlug);

  if (!channel) {
    return (
      <div className="bonnza-container py-16 space-y-4">
        <h1 className="text-2xl font-bold text-[#1A1B1A]">
          {locale === 'hi' ? 'चैनल पृष्ठ नहीं मिला' : 'Selling channel not found'}
        </h1>
        <Link to={localizePath('/', locale)} className="underline text-sm font-semibold">
          {locale === 'hi' ? 'होम पर लौटें' : 'Back to home'}
        </Link>
      </div>
    );
  }

  const relatedCourses = COURSES.filter((c) => channel.courseIds.includes(c.id));
  const relatedArticles = channel.relatedArticleIds
    .map((id) => getArticleById(id))
    .filter((a): a is ArticleRecord => Boolean(a));

  return (
    <div className="bonnza-container py-10 sm:py-14 space-y-12">
      <SeoHead
        locale={locale}
        title={`${channel.name[locale]} — ${locale === 'hi' ? 'चैनल गाइड' : 'Channel Learning Guide'} | Bonnza`}
        description={channel.learningPurpose[locale]}
        path={localizePath(`/learn/${channel.slug}`, locale)}
        alternateEnPath={`/en/learn/${channel.slug}`}
        alternateHiPath={`/hi/learn/${channel.slug}`}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: locale === 'hi' ? 'होम' : 'Home', to: localizePath('/', locale) },
          { label: channel.name[locale] },
        ]}
      />

      <header className="max-w-3xl space-y-4">
        <div className="flex items-center gap-4">
          <ChannelLogo
            slug={channel.slug}
            size="lg"
            decorative={false}
            label={`${channel.name[locale]} logo`}
          />
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#666A65]">
              {locale === 'hi' ? 'बिक्री चैनल शिक्षा' : 'SELLING CHANNEL GUIDE'}
            </p>
            <AnimatedText as="h1" className="text-3xl sm:text-4xl font-extrabold text-[#1A1B1A]">
              {channel.name[locale]}
            </AnimatedText>
          </div>
        </div>
        <AnimatedText
          as="p"
          delay={0.07}
          className="text-base sm:text-lg text-[#666A65] leading-relaxed"
        >
          {channel.learningPurpose[locale]}
        </AnimatedText>
      </header>

      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-y border-[#E6E6DF] py-8">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#1A1B1A]">
                {locale === 'hi' ? 'किसके लिए अधिक उपयुक्त' : 'Best suited for'}
              </h2>
              <p className="mt-1.5 text-sm sm:text-base text-[#666A65] leading-relaxed">
                {channel.bestSuitedFor[locale]}
              </p>
            </div>

            <div className="pt-5 border-t border-[#E6E6DF] space-y-3">
              <h2 className="text-lg font-bold text-[#1A1B1A]">
                {locale === 'hi' ? 'शुरुआती तैयारी जांच बिंदु' : 'Readiness checks'}
              </h2>
              <ul className="space-y-2.5 text-sm text-[#1A1B1A]">
                {channel.readinessChecks[locale].map((chk, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{chk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-5">
            <div className="rounded-[18px] border border-[#E6E6DF] bg-[#F3F1E9] p-6 space-y-2.5">
              <div className="flex items-center gap-2 text-[#1A1B1A]">
                <AlertCircle size={17} aria-hidden="true" />
                <h2 className="text-base font-bold">
                  {locale === 'hi' ? 'मुख्य बातें व व्यावहारिक सुझाव' : 'Key Considerations'}
                </h2>
              </div>
              <p className="text-sm text-[#1A1B1A]/85 leading-relaxed">
                {channel.importantCaveat[locale]}
              </p>
            </div>

            <div className="rounded-[18px] bg-[#202220] text-[#FAF9F5] p-6 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#F4C940]">
                {locale === 'hi' ? 'चैनल निर्णय सहायता' : 'CHANNEL DECISION SUPPORT'}
              </p>
              <p className="text-base font-bold text-white leading-snug">
                {locale === 'hi'
                  ? 'क्या यह आपका पहला उपयुक्त चैनल है? वर्कशॉप में परखें।'
                  : 'Not sure if this should be your first channel? Compare all options in our 90-minute workshop.'}
              </p>
              <Link
                to={localizePath('/webinars/5-december-2026', locale)}
                className="inline-flex items-center justify-center w-full min-h-[44px] px-4 py-2.5 rounded-[12px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] font-semibold text-sm transition-colors"
              >
                {locale === 'hi' ? 'लाइव वर्कशॉप देखें' : 'Explore Live Workshop'}
              </Link>
            </div>
          </aside>
        </div>
      </ScrollReveal>

      {/* Related Courses & Articles */}
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#1A1B1A]">
              {locale === 'hi' ? 'संबंधित कोर्स' : 'Related courses'}
            </h2>
            <div className="border-y border-[#E6E6DF] divide-y divide-[#E6E6DF] bg-[#FFFFFF]">
              {relatedCourses.map((c) => {
                const lessonsCount = c.modules.reduce((acc, m) => acc + m.lessons.length, 0);
                return (
                  <Link
                    key={c.id}
                    to={localizePath(`/courses/${c.slug}`, locale)}
                    className="block p-4 hover:bg-[#FAF9F5] transition-colors"
                  >
                    <p className="text-xs font-mono-tabular text-[#666A65]">
                      {c.modules.length} {locale === 'hi' ? 'मॉड्यूल' : 'modules'} · {lessonsCount}{' '}
                      {locale === 'hi' ? 'पाठ' : 'lessons'}
                    </p>
                    <p className="text-base font-bold text-[#1A1B1A] mt-0.5 flex items-center justify-between">
                      <span>{c.title[locale]}</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-[#1A1B1A]">
              {locale === 'hi' ? 'संबंधित ई-कॉमर्स गाइड' : 'Related ecommerce guides'}
            </h2>
            <div className="border-y border-[#E6E6DF] divide-y divide-[#E6E6DF] bg-[#FFFFFF]">
              {relatedArticles.map((art) => (
                <Link
                  key={art.id}
                  to={localizePath(`/blog/${art.slug}`, locale)}
                  className="block p-4 hover:bg-[#FAF9F5] transition-colors"
                >
                  <p className="text-xs text-[#666A65]">{art.topicClusterLabel[locale]}</p>
                  <p className="text-base font-bold text-[#1A1B1A] mt-0.5 flex items-center justify-between">
                    <span>{art.title[locale]}</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </ScrollReveal>

      {/* All 8 channels quick switcher */}
      <ScrollReveal>
        <section className="pt-8 border-t border-[#E6E6DF] space-y-4">
          <h2 className="text-lg font-bold text-[#1A1B1A]">
            {locale === 'hi' ? 'अन्य बिक्री चैनल देखें' : 'Explore all 8 selling channels'}
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {SELLING_CHANNELS.map((ch) => (
              <Link
                key={ch.slug}
                to={localizePath(`/learn/${ch.slug}`, locale)}
                className={`min-h-[44px] inline-flex items-center gap-2.5 px-3.5 py-2 rounded-[10px] border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  ch.slug === channel.slug
                    ? 'border-[#1A1B1A] bg-[#1A1B1A] text-white'
                    : 'border-[#E6E6DF] bg-[#FFFFFF] text-[#1A1B1A] hover:border-[#1A1B1A]'
                }`}
              >
                <ChannelLogo slug={ch.slug} size="sm" />
                <span>{ch.name[locale]}</span>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
