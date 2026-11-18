import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  Clock,
  Compass,
  Layers,
} from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import { UI_COPY } from '../content/translations';
import { LEARNING_PATHS, SELLING_CHANNELS } from '../content/pathsAndChannels';
import { DEC5_WEBINAR_SESSIONS, WEBINAR_FAQS } from '../content/webinars';
import { formatInr, formatIstDate, localizePath } from '../utilities/locale';
import { SeoHead } from '../components/SeoHead';
import { BookingCard } from '../components/BookingCard';
import { FaqAccordion } from '../components/FaqAccordion';
import { BonnzaImage, ProductJourneyDiagram } from '../components/IllustrativeDiagrams';
import { AnimatedText, ScrollReveal, StaggerRevealItem } from '../components/MotionPrimitives';
import { ChannelLogo } from '../components/ChannelLogo';

export function HomePage() {
  const { locale, liveArticles } = useBonnza();
  const copy = UI_COPY[locale].home;
  const featuredGuides = liveArticles.slice(0, 3);
  const dec5EnSession = DEC5_WEBINAR_SESSIONS[0];

  const resellPath = LEARNING_PATHS[0];
  const craftPath = LEARNING_PATHS[1];

  const homeFaqs = WEBINAR_FAQS.slice(0, 7).map((item) => ({
    question: item.q,
    answer: item.a,
  }));

  return (
    <div className="pb-20">
      <SeoHead
        locale={locale}
        title={
          locale === 'hi'
            ? 'Bonnza — अपने पहले ऑनलाइन उत्पाद बिज़नेस की स्पष्ट योजना बनाएं'
            : 'Bonnza — Practical Ecommerce Education | Start smart. Sell online.'
        }
        description={copy.heroSubtitle}
        path={localizePath('/', locale)}
        alternateEnPath="/en"
        alternateHiPath="/hi"
      />

      {/* Section 1: Workshop-First Editorial Hero + Above-the-Fold 5 Dec Booking */}
      <section className="pt-8 sm:pt-12 pb-14 sm:pb-16 border-b border-[#E6E6DF]">
        <div className="bonnza-container space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Editorial Narrative + 5 Dec Context + Hero Photography */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#666A65]">
                  {copy.eyebrow}
                </p>
                <AnimatedText
                  as="h1"
                  className="bonnza-hero-title text-[#1A1B1A] text-balance"
                >
                  {copy.heroHeadline}
                </AnimatedText>
                <AnimatedText
                  as="p"
                  delay={0.05}
                  className="text-base sm:text-lg text-[#666A65] leading-relaxed max-w-xl"
                >
                  {copy.heroSubtitle}
                </AnimatedText>
              </div>

              {/* Compact Unboxed 5 December Schedule Strip */}
              <div className="border-y border-[#E6E6DF] py-3.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#1A1B1A] tabular-nums">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <Calendar size={14} className="text-[#666A65]" aria-hidden="true" />
                  {formatIstDate(dec5EnSession.startUtc, locale)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[#666A65]">
                  <Clock size={14} aria-hidden="true" />
                  {locale === 'hi'
                    ? 'EN 1:00 PM · HI 4:00 PM IST (90 मिनट)'
                    : 'EN 1:00 PM · HI 4:00 PM IST (90 min)'}
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <span>{locale === 'hi' ? 'टिकट:' : 'Ticket:'}</span>
                  <span className="line-through text-[#666A65] font-normal">
                    {formatInr(dec5EnSession.originalTicketPriceInr, locale)}
                  </span>
                  <span>{formatInr(dec5EnSession.workingTicketPriceInr, locale)}</span>
                </span>
              </div>

              {/* Secondary Editorial Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={localizePath('/webinars/5-december-2026', locale)}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-[12px] border border-[#1A1B1A] bg-[#FFFFFF] hover:bg-[#F3F1E9] text-[#1A1B1A] font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
                >
                  <span>
                    {locale === 'hi'
                      ? '5 दिसंबर कार्यशाला विवरण'
                      : '5 Dec Workshop Details'}
                  </span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <Link
                  to={localizePath('/paths/resell', locale)}
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-2 text-sm font-semibold text-[#1A1B1A] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                >
                  <span>{copy.heroSecondaryCta}</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>

              {/* Editorial Workshop Craft Photograph */}
              <div className="overflow-hidden rounded-[18px] border border-[#E6E6DF] bg-[#F3F1E9] aspect-[16/9]">
                <BonnzaImage
                  src="/src/assets/images/hero_product_journey_1794821603248.jpg"
                  alt={
                    locale === 'hi'
                      ? 'घर से ऑनलाइन उत्पाद व्यवसाय की तैयारी: कॉटन ट्रैवल पाउच, क्राफ्ट बॉक्स, मापने का टेप और नोटबुक'
                      : 'Preparing a first online product business: cotton travel pouches, kraft shipping box, measuring tape, and planning notebook'
                  }
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Direct Above-the-Fold 5 December 2026 Booking Funnel */}
            <div className="lg:col-span-6 lg:sticky lg:top-24">
              <BookingCard allowFutureCohorts={false} />
            </div>
          </div>

          {/* Hairline 4-Step Product Journey Bar */}
          <ProductJourneyDiagram locale={locale} />
        </div>
      </section>

      {/* Section 2: Practical Outcomes (01–04 Unboxed Hairline Grid) */}
      <ScrollReveal>
        <section className="bonnza-container py-16 sm:py-20 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#666A65]">
                {locale === 'hi' ? 'सत्र और सीखने का परिणाम' : 'WORKSHOP OUTCOMES'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A] text-balance">
                {copy.outcomesHeading}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#666A65] max-w-md">
              {copy.outcomesSubheading}
            </p>
          </div>

          <div className="border-y border-[#E6E6DF] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E6E6DF]">
            {copy.outcomes.map((item, idx) => (
              <StaggerRevealItem key={idx} index={idx}>
                <div className="py-6 md:px-6 first:md:pl-0 last:md:pr-0 space-y-3 h-full">
                  <p className="text-xs font-mono-tabular font-semibold text-[#666A65]">
                    0{idx + 1}.
                  </p>
                  <h3 className="text-lg font-bold text-[#1A1B1A] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#666A65] leading-relaxed">{item.detail}</p>
                </div>
              </StaggerRevealItem>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 3: Who Bonnza Is For + Idea Finder & Tools Discovery Bridge */}
      <ScrollReveal>
        <section className="bg-[#F3F1E9]/65 border-y border-[#E6E6DF] py-16 sm:py-20">
          <div className="bonnza-container space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="max-w-2xl space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#666A65]">
                  {locale === 'hi' ? 'किसके लिए बनाया गया है' : 'BUILT FOR BEGINNER FOUNDERS'}
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A] text-balance">
                  {copy.audienceHeading}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#666A65] max-w-md">
                {copy.audienceSubheading}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#E6E6DF] bg-[#FFFFFF]">
              {copy.audiences.map((aud, idx) => (
                <StaggerRevealItem key={idx} index={idx}>
                  <div className="h-full border-r border-b border-[#E6E6DF] p-6 sm:p-7 space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#1A1B1A]">
                      {aud.title}
                    </h3>
                    <p className="text-sm text-[#666A65] leading-relaxed">{aud.detail}</p>
                  </div>
                </StaggerRevealItem>
              ))}
            </div>

            {/* Concise Discovery Bridge -> Business Idea Finder & Order Cost Calculator */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pt-2">
              <div className="flex items-start gap-3 max-w-2xl">
                <Compass size={20} className="shrink-0 mt-0.5 text-[#1A1B1A]" aria-hidden="true" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-[#1A1B1A]">
                    {locale === 'hi'
                      ? 'अभी तक तय नहीं किया कि कौन-सा उत्पाद बेचना है?'
                      : 'Not sure which product category fits your starting budget yet?'}
                  </p>
                  <p className="text-xs sm:text-sm text-[#666A65]">
                    {locale === 'hi'
                      ? 'अपना बजट, कौशल और काम करने का तरीका चुनकर उपयुक्त ई-कॉमर्स बिज़नेस आइडिया खोजें या प्रति-ऑर्डर लागत जांचें।'
                      : 'Use our Ecommerce Business Idea Finder or test your numbers in the interactive Order Cost Calculator before Saturday.'}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  to={localizePath('/business-ideas', locale)}
                  className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 rounded-[10px] bg-[#1A1B1A] hover:bg-black text-[#FAF9F5] text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  <span>{locale === 'hi' ? 'बिज़नेस आइडिया खोजें' : 'Open Idea Finder'}</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <Link
                  to={localizePath('/resources', locale)}
                  className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 rounded-[10px] border border-[#1A1B1A]/25 bg-[#FFFFFF] hover:bg-[#FAF9F5] text-[#1A1B1A] text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  <span>{copy.openResources}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 4: Choose Your Business Path (Resell vs Craft to Commerce) & 8 Channels */}
      <ScrollReveal>
        <section className="bonnza-container py-16 sm:py-20 space-y-14">
          <div className="space-y-8">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#666A65]">
                {locale === 'hi' ? 'दो संरचित शुरुआत पथ' : 'TWO STRUCTURED STARTING PATHS'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A] text-balance">
                {copy.pathsHeading}
              </h2>
              <p className="text-base text-[#666A65]">{copy.pathsSubheading}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Path A: Resell */}
              <StaggerRevealItem index={0}>
                <div className="h-full rounded-[20px] border border-[#E6E6DF] bg-[#E8EDDD] p-6 sm:p-8 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="overflow-hidden rounded-[12px] border border-[#1A1B1A]/10 aspect-[16/10] bg-[#FAF9F5]">
                      <BonnzaImage
                        src={resellPath.imageSrc}
                        alt={resellPath.imageAlt[locale]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#1A1B1A]/70">
                        {locale === 'hi' ? 'पथ 01 · सोर्सिंग व ट्रेडिंग' : 'PATH 01 · PRODUCT SOURCING'}
                      </p>
                      <h3 className="text-2xl font-bold text-[#1A1B1A]">
                        {resellPath.title[locale]}
                      </h3>
                      <p className="text-sm sm:text-base text-[#1A1B1A]/85 leading-relaxed">
                        {locale === 'hi'
                          ? 'सीखें कि आपूर्तिकर्ताओं की तुलना कैसे करें, उत्पाद सैंपल कैसे जांचें, लागत की गणना कैसे करें, स्टॉक कैसे संभालें और अपना पहला बिक्री ऑफ़र कैसे तैयार करें।'
                          : 'Learn how to evaluate suppliers, inspect products, calculate costs, manage stock and prepare your first selling offer.'}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Link
                      to={localizePath('/paths/resell', locale)}
                      className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-[12px] bg-[#1A1B1A] text-[#FAF9F5] font-semibold text-sm hover:bg-black transition-colors"
                    >
                      <span>{copy.exploreResell}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </StaggerRevealItem>

              {/* Path B: Craft to Commerce */}
              <StaggerRevealItem index={1}>
                <div className="h-full rounded-[20px] border border-[#E6E6DF] bg-[#F4E6D4] p-6 sm:p-8 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="overflow-hidden rounded-[12px] border border-[#1A1B1A]/10 aspect-[16/10] bg-[#FAF9F5]">
                      <BonnzaImage
                        src={craftPath.imageSrc}
                        alt={craftPath.imageAlt[locale]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#1A1B1A]/70">
                        {locale === 'hi' ? 'पथ 02 · हस्तनिर्मित व शिल्प' : 'PATH 02 · HANDMADE & CRAFT'}
                      </p>
                      <h3 className="text-2xl font-bold text-[#1A1B1A]">
                        {craftPath.title[locale]}
                      </h3>
                      <p className="text-sm sm:text-base text-[#1A1B1A]/85 leading-relaxed">
                        {locale === 'hi'
                          ? 'सीखें कि हस्तनिर्मित या कलाकारों से लिए गए भौतिक उत्पादों को ऑनलाइन बेचने के लिए कैसे तैयार करें—लागत, प्रस्तुति, स्रोत प्रमाण और पूर्ति सहित।'
                          : 'Learn how to prepare handmade or artist-sourced physical products for online selling, including costing, presentation, provenance and fulfilment.'}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Link
                      to={localizePath('/paths/craft-to-commerce', locale)}
                      className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-[12px] bg-[#1A1B1A] text-[#FAF9F5] font-semibold text-sm hover:bg-black transition-colors"
                    >
                      <span>{copy.exploreCraft}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </StaggerRevealItem>
            </div>
          </div>

          {/* 8 Selling Channels Clean Hairline Matrix */}
          <div className="space-y-6 pt-4 border-t border-[#E6E6DF]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-2xl space-y-1.5">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A]">
                  {copy.channelsHeading}
                </h2>
                <p className="text-sm sm:text-base text-[#666A65]">{copy.channelsSubheading}</p>
              </div>
              <p className="text-xs text-[#666A65] max-w-xs">{copy.channelsNote}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#E6E6DF] bg-[#FFFFFF]">
              {SELLING_CHANNELS.map((ch, idx) => (
                <StaggerRevealItem key={ch.slug} index={idx}>
                  <Link
                    to={localizePath(`/learn/${ch.slug}`, locale)}
                    className="group h-full border-r border-b border-[#E6E6DF] p-5 sm:p-6 hover:bg-[#FAF9F5] transition-colors flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <ChannelLogo
                          slug={ch.slug}
                          size="md"
                          className="group-hover:scale-[1.03] transition-transform duration-150"
                        />
                        <h3 className="text-base font-bold text-[#1A1B1A] leading-snug">
                          {ch.name[locale]}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#666A65] leading-relaxed">
                        {ch.learningPurpose[locale]}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A1B1A] group-hover:underline underline-offset-4">
                      {UI_COPY[locale].common.learnMore}
                      <ArrowRight size={13} aria-hidden="true" />
                    </span>
                  </Link>
                </StaggerRevealItem>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 5: 5 December Workshop Snapshot + Complete Programme Overview */}
      <ScrollReveal>
        <section className="bonnza-container pb-16 sm:pb-20 space-y-12">
          {/* Focused 5 December Workshop Strip */}
          <div className="border-y border-[#E6E6DF] py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#666A65]">
                {locale === 'hi'
                  ? 'प्रमुख लाइव वर्कशॉप · शनिवार, 5 दिसंबर 2026'
                  : 'FEATURED LIVE WORKSHOP · SATURDAY, 5 DECEMBER 2026'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A]">
                {copy.featuredWebinarHeading}
              </h2>
              <p className="text-sm sm:text-base text-[#666A65] leading-relaxed max-w-2xl">
                {copy.featuredWebinarSubheading}
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4">
              <div className="space-y-1 text-sm text-[#1A1B1A] tabular-nums lg:text-right">
                <p className="font-bold inline-flex items-center gap-2">
                  <Layers size={15} className="text-[#666A65]" aria-hidden="true" />
                  <span>
                    {locale === 'hi'
                      ? 'प्रस्तुतकर्ता: शुभम चतुर्वेदी · '
                      : 'Presenter: Shubham Chaturvedi · '}
                    <span className="line-through text-[#666A65] font-normal mr-1">
                      {formatInr(dec5EnSession.originalTicketPriceInr, locale)}
                    </span>
                    <span>{formatInr(dec5EnSession.workingTicketPriceInr, locale)}</span>
                  </span>
                </p>
                <p className="text-xs text-[#666A65]">
                  {locale === 'hi'
                    ? 'अंग्रेज़ी: 1:00 PM IST · हिंदी: 4:00 PM IST'
                    : 'English: 1:00 PM IST · Hindi: 4:00 PM IST'}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={localizePath('/webinars/5-december-2026', locale)}
                  className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-[12px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  <span>
                    {locale === 'hi' ? '5 दिसंबर सत्र पेज' : 'Explore 5 Dec Session'}
                  </span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <Link
                  to={localizePath('/webinars/first-online-business', locale)}
                  className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-[12px] border border-[#1A1B1A]/25 text-sm font-semibold text-[#1A1B1A] hover:bg-[#F3F1E9] transition-colors whitespace-nowrap"
                >
                  {copy.viewWorkshopDetails}
                </Link>
              </div>
            </div>
          </div>

          {/* Complete Programme Clarification (Counts stay strictly on /programme) */}
          <div className="rounded-[20px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#666A65]">
                {locale === 'hi' ? 'पूर्ण पाठ्यक्रम' : 'COMPLETE LEARNING PROGRAMME'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A]">
                {copy.programmeHeading}
              </h2>
              <p className="text-base text-[#666A65] leading-relaxed">
                {copy.programmeSubheading}
              </p>
              <ul className="space-y-2.5 pt-2">
                {copy.programmeHighlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#1A1B1A]">
                    <Check
                      size={16}
                      className="shrink-0 mt-1 text-[#1A1B1A]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-[#E6E6DF] lg:pl-8 space-y-5">
              <div className="grid grid-cols-3 gap-3 text-center py-4 border-y border-[#E6E6DF]">
                <div>
                  <p className="text-xl font-extrabold font-mono-tabular text-[#1A1B1A]">
                    EN + HI
                  </p>
                  <p className="text-xs text-[#666A65]">
                    {locale === 'hi' ? 'द्विभाषी माध्यम' : 'Bilingual Access'}
                  </p>
                </div>
                <div>
                  <p className="text-xl font-extrabold font-mono-tabular text-[#1A1B1A]">
                    {locale === 'hi' ? '12 माह' : '12 Mos'}
                  </p>
                  <p className="text-xs text-[#666A65]">
                    {locale === 'hi' ? 'रिकॉर्डेड एक्सेस' : 'Learning Access'}
                  </p>
                </div>
                <div>
                  <p className="text-xl font-extrabold font-mono-tabular text-[#1A1B1A]">
                    {locale === 'hi' ? '10 सप्ताह' : '10 Wks'}
                  </p>
                  <p className="text-xs text-[#666A65]">
                    {locale === 'hi' ? 'समूह सहयोग' : 'Group Support'}
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#666A65] leading-relaxed">
                {copy.programmeScheduleNote}
              </p>
              <Link
                to={localizePath('/programme', locale)}
                className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-[12px] bg-[#1A1B1A] text-[#FAF9F5] font-semibold text-sm hover:bg-black transition-colors"
              >
                <span>{copy.exploreProgramme}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 6: Full-Bleed Dark Ecommerce Guides & Resources Band */}
      <ScrollReveal>
        <section className="bg-[#1A1B1A] text-[#FAF9F5] py-16 sm:py-20">
          <div className="bonnza-container space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-2.5 max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F4C940]">
                  {locale === 'hi'
                    ? 'ई-कॉमर्स गाइड और प्लानिंग उपकरण'
                    : 'ECOMMERCE GUIDES & PLANNING TOOLS'}
                </p>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white text-balance">
                  {locale === 'hi' ? 'ई-कॉमर्स गाइड' : 'Ecommerce Guides'}
                </h2>
                <p className="text-sm sm:text-base text-[#FAF9F5]/80 leading-relaxed">
                  {locale === 'hi'
                    ? 'उत्पाद चयन, प्रति ऑर्डर लागत गणना, सप्लायर सैंपल जांच और Meesho, Amazon India, Etsy, WhatsApp व Shopify से जुड़े व्यावहारिक ई-कॉमर्स गाइड पढ़ें।'
                    : 'Read practical Ecommerce Guides covering product selection, unit costing, supplier sample inspection, and Meesho, Amazon India, Etsy, WhatsApp, and Shopify basics.'}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  to={localizePath('/ecommerce-guides', locale)}
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-[12px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] font-semibold text-sm transition-colors"
                >
                  <BookOpen size={16} aria-hidden="true" />
                  <span>{copy.openEditorialPreview}</span>
                </Link>
                <Link
                  to={localizePath('/resources', locale)}
                  className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-[12px] border border-white/25 hover:bg-white/10 text-[#FAF9F5] font-semibold text-sm transition-colors"
                >
                  <span>{copy.openResources}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="border-t border-white/15 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/15">
              {featuredGuides.map((guide, idx) => (
                <StaggerRevealItem key={guide.id} index={idx}>
                  <Link
                    to={localizePath(`/blog/${guide.slug}`, locale)}
                    className="group h-full py-6 md:px-7 first:md:pl-0 last:md:pr-0 flex flex-col justify-between gap-5"
                  >
                    <div className="space-y-2.5">
                      <p className="text-xs text-[#FAF9F5]/65">
                        {guide.topicClusterLabel[locale]} · {guide.readingTimeMinutes}{' '}
                        {locale === 'hi' ? 'मिनट पठन' : 'min read'}
                      </p>
                      <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#F4C940] transition-colors">
                        {guide.title[locale]}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#FAF9F5]/70 line-clamp-2 leading-relaxed">
                        {guide.shortDescription[locale]}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F4C940]">
                      <span>{locale === 'hi' ? 'गाइड पढ़ें' : 'Read guide'}</span>
                      <ArrowRight
                        size={13}
                        className="group-hover:translate-x-0.5 transition-transform"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </StaggerRevealItem>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 7: Split FAQ Accordion */}
      <ScrollReveal>
        <section className="bonnza-container py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#666A65]">
                {locale === 'hi' ? 'स्पष्ट उत्तर' : 'COMMON QUESTIONS'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A] text-balance">
                {copy.faqHeading}
              </h2>
              <p className="text-sm text-[#666A65] leading-relaxed">
                {locale === 'hi'
                  ? 'कार्यशाला भाषा, शुल्क, रिफंड और शुरुआती आवश्यकताओं से जुड़े प्रश्न।'
                  : 'Clear answers about session language, worksheet tools, refund timing, and starting requirements.'}
              </p>
              <Link
                to={localizePath('/faq', locale)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1B1A] underline underline-offset-4 pt-1"
              >
                <span>{locale === 'hi' ? 'सभी सामान्य प्रश्न देखें' : 'View all FAQs'}</span>
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordion items={homeFaqs} locale={locale} />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 8: Final Conversion CTA */}
      <ScrollReveal>
        <section className="bonnza-container">
          <div className="rounded-[20px] bg-[#202220] text-[#FAF9F5] p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#F4C940]">
                {locale === 'hi'
                  ? 'शनिवार, 5 दिसंबर 2026 · अंग्रेज़ी 1:00 PM / हिंदी 4:00 PM IST'
                  : 'SATURDAY, 5 DECEMBER 2026 · ENGLISH 1:00 PM / HINDI 4:00 PM IST'}
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight text-balance">
                {copy.finalHeadline}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to={localizePath('/webinars/register', locale)}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-[12px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] font-semibold text-sm transition-colors"
              >
                <span>{copy.finalPrimaryCta}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                to={localizePath('/contact', locale)}
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-[12px] border border-white/25 text-white hover:bg-white/10 font-semibold text-sm transition-colors"
              >
                {copy.finalSecondaryCta}
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
