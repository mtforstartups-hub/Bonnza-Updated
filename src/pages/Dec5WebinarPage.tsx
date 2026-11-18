import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  HelpCircle,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  Quote,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import { UI_COPY } from '../content/translations';
import {
  WEBINAR_SESSIONS,
  WEBINAR_AGENDA,
  WEBINAR_FAQS,
} from '../content/webinars';
import { SELLING_CHANNELS } from '../content/pathsAndChannels';
import type { WebinarSessionId } from '../domain/types';
import { formatInr, localizePath } from '../utilities/locale';
import { buildWebinarEventSchemas } from '../utilities/seo';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FaqAccordion } from '../components/FaqAccordion';
import { BonnzaImage, PresenterTypographicCard } from '../components/IllustrativeDiagrams';
import { ChannelLogo } from '../components/ChannelLogo';
import { AnimatedText, ScrollReveal, StaggerRevealItem } from '../components/MotionPrimitives';
import { WebinarRegistrationForm } from '../components/WebinarRegistrationForm';
import { recordAnalyticsEvent } from '../integrations/futureInterfaces';

const AGENDA_CLOCK_SLOTS = [
  { enSlot: '1:00 – 1:10 PM', hiSlot: '4:00 – 4:10 PM' },
  { enSlot: '1:10 – 1:25 PM', hiSlot: '4:10 – 4:25 PM' },
  { enSlot: '1:25 – 1:45 PM', hiSlot: '4:25 – 4:45 PM' },
  { enSlot: '1:45 – 2:00 PM', hiSlot: '4:45 – 5:00 PM' },
  { enSlot: '2:00 – 2:12 PM', hiSlot: '5:00 – 5:12 PM' },
  { enSlot: '2:12 – 2:22 PM', hiSlot: '5:12 – 5:22 PM' },
  { enSlot: '2:22 – 2:30 PM', hiSlot: '5:22 – 5:30 PM' },
];

const TESTIMONIALS = [
  {
    initials: 'AD',
    name: { en: 'Ananya Deshmukh', hi: 'अनन्या देशमुख' },
    role: {
      en: 'Home-Based Soy Candle Maker · Pune',
      hi: 'होम-बेस्ड सोया कैंडल निर्माता · पुणे',
    },
    outcomeTag: {
      en: 'Fixed Unit Pricing Before Bulk Purchase',
      hi: 'बल्क खरीद से पहले सही यूनिट मूल्य तय किया',
    },
    quote: {
      en: 'Before joining, I was pricing my soy candles just by looking at marketplace competitors and completely forgot packaging cartons and return losses. Working through the per-order math during the live workshop showed me why two-pack bundles made much better sense before ordering bulk jars.',
      hi: 'सत्र से पहले मैं केवल अन्य लिस्टिंग देखकर कीमत तय कर रही थी और पैकेजिंग व रिटर्न खर्च जोड़ना भूल गई थी। लाइव लागत मॉडल ने मुझे बल्क जार खरीदने से पहले ही सही बंडल कीमत तय करना सिखाया।',
    },
  },
  {
    initials: 'RK',
    name: { en: 'Rohit Kulkarni', hi: 'रोहित कुलकर्णी' },
    role: {
      en: 'First-Time Kitchen Utility Reseller · Jaipur',
      hi: 'नए किचन यूटिलिटी रीसेलर · जयपुर',
    },
    outcomeTag: {
      en: 'Sample Tested 15 Units Before Committing Capital',
      hi: 'पूंजी लगाने से पहले 15 सैंपल यूनिट पर परीक्षण',
    },
    quote: {
      en: 'I was close to locking ₹40,000 into wholesale inventory without checking freight and breakage rates. The supplier quote checklist and first-channel scorecard helped me test a small 15-unit batch on WhatsApp and local buyers first, saving me from an unreliable vendor.',
      hi: 'मैं बिना शिपिंग और टूट-फूट दर जांचे ₹40,000 का स्टॉक खरीदने वाला था। सैंपल और पहले-चैनल चेकलिस्ट से मैंने पहले 15 यूनिट पर परीक्षण किया और एक गलत सप्लायर से बच गया।',
    },
  },
  {
    initials: 'MI',
    name: { en: 'Meenakshi Iyer', hi: 'मीनाक्षी अय्यर' },
    role: {
      en: 'Handloom Textile Craft Seller · Coimbatore',
      hi: 'हैंडलूम टेक्सटाइल शिल्प विक्रेता · कोयंबटूर',
    },
    outcomeTag: {
      en: 'Chose One Focused First Selling Channel',
      hi: 'एक स्पष्ट पहला बिक्री चैनल चुना',
    },
    quote: {
      en: 'I sourced cotton table runners from local weavers but kept procrastinating between starting a website, Instagram, or marketplaces all at once. Comparing all eight channels side by side in 90 minutes gave me a realistic 7-day plan for one channel I can run from home.',
      hi: 'मेरे पास स्थानीय बुनकरों से कॉटन टेबल रनर थे, पर वेबसाइट, इंस्टाग्राम और मार्केटप्लेस के बीच मैं उलझी हुई थी। 90 मिनट में आठ चैनलों की तुलना ने मुझे घर से शुरू करने की स्पष्ट 7-दिन की योजना दी।',
    },
  },
];

export function Dec5WebinarPage() {
  const { locale, selectedSessionId, selectWebinarSession, featureFlags } = useBonnza();
  const navigate = useNavigate();
  const copy = UI_COPY[locale].webinar;

  const dec5EnSession =
    WEBINAR_SESSIONS.find((s) => s.id === 'bonnza-2026-12-05-en-1300') || WEBINAR_SESSIONS[0];
  const dec5HiSession =
    WEBINAR_SESSIONS.find((s) => s.id === 'bonnza-2026-12-05-hi-1600') || WEBINAR_SESSIONS[1];

  const activeDec5Session =
    selectedSessionId === 'bonnza-2026-12-05-hi-1600' ? dec5HiSession : dec5EnSession;

  const checkoutEnabled = Boolean(
    featureFlags.find((f) => f.key === 'WEBINAR_CHECKOUT_ENABLED')?.enabled
  );

  // Lock default selection to a 5 December 2026 cohort on visit
  useEffect(() => {
    if (
      selectedSessionId !== 'bonnza-2026-12-05-en-1300' &&
      selectedSessionId !== 'bonnza-2026-12-05-hi-1600'
    ) {
      selectWebinarSession(
        locale === 'hi' ? 'bonnza-2026-12-05-hi-1600' : 'bonnza-2026-12-05-en-1300'
      );
    }
    recordAnalyticsEvent({
      event: 'webinar_view',
      locale,
      path: window.location.pathname,
      metadata: { cohortDate: '2026-12-05', pageType: 'dec5_high_converting_v4' },
    });
  }, []);

  const targetStartMs = new Date(activeDec5Session.startUtc).getTime();
  const [remainingMs, setRemainingMs] = useState(() => Math.max(0, targetStartMs - Date.now()));

  useEffect(() => {
    setRemainingMs(Math.max(0, targetStartMs - Date.now()));
    const timer = window.setInterval(() => {
      setRemainingMs(Math.max(0, targetStartMs - Date.now()));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [targetStartMs]);

  const countdownDays = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
  const countdownHours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);
  const countdownMinutes = Math.floor((remainingMs / (1000 * 60)) % 60);
  const countdownSeconds = Math.floor((remainingMs / 1000) % 60);

  const handleRedirectToRegistration = (sessionToSelect?: WebinarSessionId) => {
    const targetSession = sessionToSelect || activeDec5Session.id;
    selectWebinarSession(targetSession);
    recordAnalyticsEvent({
      event: 'registration_started',
      locale,
      path: window.location.pathname,
      metadata: { sessionId: targetSession, source: 'dec5_landing_page_cta' },
    });
    navigate(localizePath('/webinars/register', locale));
  };

  const faqItems = WEBINAR_FAQS.map((item) => ({
    question: item.q,
    answer: item.a,
  }));

  const eventSchemas: Array<Record<string, unknown>> = [
    ...buildWebinarEventSchemas(checkoutEnabled),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: WEBINAR_FAQS.map((item) => ({
        '@type': 'Question',
        name: item.q[locale],
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a[locale],
        },
      })),
    },
  ];

  return (
    <div className="pb-20">
      <SeoHead
        locale={locale}
        title={
          locale === 'hi'
            ? 'अपना पहला लाभदायक ऑनलाइन उत्पाद प्लान करें — 5 दिसंबर 2026 | Bonnza'
            : 'Plan Your First Profitable Online Product — 5 December 2026 | Bonnza'
        }
        description={
          locale === 'hi'
            ? 'शनिवार, 5 दिसंबर 2026 को शुभम चतुर्वेदी के साथ 90-मिनट की लाइव कार्यशाला में अपने पहले ऑनलाइन उत्पाद, प्रति-ऑर्डर लागत और बिक्री चैनल की ठोस योजना बनाएं।'
            : 'Join Shubham Chaturvedi live on Saturday, 5 December 2026 for a 90-minute hands-on workshop to choose your first product, calculate unit economics, and pick your first selling channel.'
        }
        path={localizePath('/webinars/5-december-2026', locale)}
        alternateEnPath="/en/webinars/5-december-2026"
        alternateHiPath="/hi/webinars/5-december-2026"
        jsonLd={eventSchemas}
      />

      {/* 1. UNBOXED EDITORIAL HERO SECTION */}
      <section className="pt-8 sm:pt-10 pb-14 border-b border-[#E6E6DF]">
        <div className="bonnza-container space-y-8">
          <Breadcrumbs
            locale={locale}
            items={[
              { label: locale === 'hi' ? 'होम' : 'Home', to: localizePath('/', locale) },
              {
                label: locale === 'hi' ? 'वेबिनार' : 'Webinars',
                to: localizePath('/webinars', locale),
              },
              {
                label: locale === 'hi' ? '5 दिसंबर 2026' : '5 December 2026',
              },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Hero Left Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#666A65] flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#F4C940]" aria-hidden="true" />
                  <span>
                    {locale === 'hi'
                      ? 'सीमित सीटें · शनिवार, 5 दिसंबर 2026 लाइव सत्र'
                      : 'LIMITED SPOTS · SATURDAY, 5 DECEMBER 2026 LIVE WORKSHOP'}
                  </span>
                </p>

                <AnimatedText
                  as="h1"
                  className="bonnza-hero-title text-[#1A1B1A] max-w-xl text-balance"
                >
                  {locale === 'hi'
                    ? 'अपना पहला लाभदायक ऑनलाइन उत्पाद प्लान करें'
                    : 'Plan Your First Profitable Online Product'}
                </AnimatedText>

                <AnimatedText
                  as="p"
                  delay={0.05}
                  className="text-base sm:text-lg text-[#666A65] leading-relaxed max-w-xl"
                >
                  {locale === 'hi'
                    ? 'पहली बार शुरू करने वाले और घर-आधारित भारतीय उद्यमियों के लिए 90 मिनट का व्यावहारिक सत्र। एक स्पष्ट उत्पाद दिशा चुनें, प्रति-ऑर्डर वास्तविक लाभ निकालें और अपना पहला बिक्री चैनल तय करें।'
                    : 'A focused 90-minute live session for first-time and home-based Indian founders. Leave with one validated product direction, exact unit profit math in ₹, and your first selling channel.'}
                </AnimatedText>
              </div>

              {/* Live Session Selector & Hairline Countdown Strip */}
              <div className="space-y-5 pt-4 border-t border-[#E6E6DF]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-[#666A65]">
                    {activeDec5Session.instructionLocale === 'hi'
                      ? locale === 'hi'
                        ? 'प्रारंभ काउंटडाउन · शाम 4:00 PM IST (हिंदी)'
                        : 'Session Starts In · 4:00 PM IST (Hindi)'
                      : locale === 'hi'
                      ? 'प्रारंभ काउंटडाउन · दोपहर 1:00 PM IST (अंग्रेज़ी)'
                      : 'Session Starts In · 1:00 PM IST (English)'}
                  </span>

                  <div
                    role="group"
                    aria-label={locale === 'hi' ? 'सत्र भाषा समय चुनें' : 'Choose session slot'}
                    className="inline-flex items-center gap-1 bg-[#F3F1E9] p-1 rounded-[10px]"
                  >
                    <button
                      type="button"
                      onClick={() => selectWebinarSession(dec5EnSession.id)}
                      className={`px-3 py-1.5 rounded-[7px] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                        activeDec5Session.instructionLocale === 'en'
                          ? 'bg-[#FFFFFF] text-[#1A1B1A] shadow-xs'
                          : 'text-[#666A65] hover:text-[#1A1B1A]'
                      }`}
                    >
                      {locale === 'hi' ? 'अंग्रेज़ी · 1:00 PM' : 'English · 1:00 PM'}
                    </button>
                    <button
                      type="button"
                      onClick={() => selectWebinarSession(dec5HiSession.id)}
                      className={`px-3 py-1.5 rounded-[7px] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                        activeDec5Session.instructionLocale === 'hi'
                          ? 'bg-[#FFFFFF] text-[#1A1B1A] shadow-xs'
                          : 'text-[#666A65] hover:text-[#1A1B1A]'
                      }`}
                    >
                      {locale === 'hi' ? 'हिंदी · 4:00 PM' : 'Hindi · 4:00 PM'}
                    </button>
                  </div>
                </div>

                {remainingMs > 0 ? (
                  <div
                    aria-label={
                      locale === 'hi'
                        ? '5 दिसंबर 2026 वेबिनार शुरू होने का काउंटडाउन'
                        : 'Countdown to 5 December 2026 workshop start'
                    }
                    className="grid grid-cols-4 border-y border-[#E6E6DF] divide-x divide-[#E6E6DF] bg-[#FFFFFF] text-center tabular-nums"
                  >
                    <div className="py-3 px-2">
                      <p className="text-2xl sm:text-3xl font-extrabold text-[#1A1B1A]">
                        {String(countdownDays).padStart(2, '0')}
                      </p>
                      <p className="text-[11px] font-medium text-[#666A65]">
                        {locale === 'hi' ? 'दिन' : 'Days'}
                      </p>
                    </div>
                    <div className="py-3 px-2">
                      <p className="text-2xl sm:text-3xl font-extrabold text-[#1A1B1A]">
                        {String(countdownHours).padStart(2, '0')}
                      </p>
                      <p className="text-[11px] font-medium text-[#666A65]">
                        {locale === 'hi' ? 'घंटे' : 'Hours'}
                      </p>
                    </div>
                    <div className="py-3 px-2">
                      <p className="text-2xl sm:text-3xl font-extrabold text-[#1A1B1A]">
                        {String(countdownMinutes).padStart(2, '0')}
                      </p>
                      <p className="text-[11px] font-medium text-[#666A65]">
                        {locale === 'hi' ? 'मिनट' : 'Minutes'}
                      </p>
                    </div>
                    <div className="py-3 px-2">
                      <p className="text-2xl sm:text-3xl font-extrabold text-[#1A1B1A]">
                        {String(countdownSeconds).padStart(2, '0')}
                      </p>
                      <p className="text-[11px] font-medium text-[#666A65]">
                        {locale === 'hi' ? 'सेकंड' : 'Seconds'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-[#1A1B1A]">
                    {locale === 'hi'
                      ? '5 दिसंबर 2026 का सत्र समय आ गया है।'
                      : 'Saturday, 5 December 2026 session window has arrived.'}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleRedirectToRegistration(activeDec5Session.id)}
                    className="inline-flex items-center justify-center gap-2 min-h-[50px] px-6 py-3 rounded-[12px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] font-bold text-base transition-colors whitespace-nowrap shrink-0 tabular-nums"
                  >
                    <span>
                      {locale === 'hi' ? 'अभी पंजीकरण करें —' : 'Register Now —'}
                    </span>
                    <span className="line-through opacity-60 font-medium">₹1,999</span>
                    <span>₹299</span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>

                  <a
                    href="#workshop-agenda"
                    className="inline-flex items-center justify-center min-h-[50px] px-5 py-3 rounded-[12px] border border-[#1A1B1A]/20 bg-[#FFFFFF] hover:bg-[#F3F1E9] text-[#1A1B1A] font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
                  >
                    {locale === 'hi' ? '90-मिनट कार्यक्रम देखें' : 'View 90-Min Agenda'}
                  </a>
                </div>
              </div>
            </div>

            {/* Hero Right Column */}
            <div className="lg:col-span-6">
              <div className="rounded-[20px] border border-[#E6E6DF] bg-[#FFFFFF] overflow-hidden">
                <div className="aspect-[16/10] w-full bg-[#F3F1E9]">
                  <BonnzaImage
                    src="/src/assets/images/webinar_dec5_workshop_1794919118029.jpg"
                    alt={
                      locale === 'hi'
                        ? 'ई-कॉमर्स उत्पाद योजना, यूनिट कॉस्टिंग वर्कशीट और सैंपल परीक्षण सेटअप'
                        : 'Unit costing worksheet in INR, cotton travel pouch sample, and margin breakdown chart for planning your first profitable online product'
                    }
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 bg-[#1A1B1A] text-[#FAF9F5] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs tabular-nums">
                  <div>
                    <p className="text-[#FAF9F5]/65">
                      {locale === 'hi' ? 'दिनांक' : 'Session Date'}
                    </p>
                    <p className="font-bold text-white mt-0.5">
                      {locale === 'hi' ? 'शनिवार, 5 दिसंबर 2026' : 'Sat, 5 Dec 2026'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#FAF9F5]/65">
                      {locale === 'hi' ? 'लाइव समय (IST)' : 'Live Cohorts (IST)'}
                    </p>
                    <p className="font-bold text-white mt-0.5">EN 1:00 PM · HI 4:00 PM</p>
                  </div>
                  <div>
                    <p className="text-[#FAF9F5]/65">
                      {locale === 'hi' ? 'वर्कशॉप टिकट' : 'Workshop Ticket'}
                    </p>
                    <p className="font-bold text-[#F4C940] mt-0.5">
                      <span className="line-through text-[#FAF9F5]/55 font-normal mr-1.5">
                        ₹1,999
                      </span>
                      <span>₹299</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 8 Indian & Global Selling Channels Hairline Bar */}
          <div className="pt-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#666A65]">
              <p className="font-semibold text-[#1A1B1A]">
                {locale === 'hi'
                  ? 'सत्र के दौरान मूल्यांकित 8 भारतीय व वैश्विक बिक्री चैनल:'
                  : '8 Indian & global selling channels covered during the session:'}
              </p>
              <p className="tabular-nums">
                {locale === 'hi'
                  ? 'अंग्रेज़ी व हिंदी में अलग-अलग लाइव बैच'
                  : 'Separate English & Hindi live cohorts · 5 December 2026'}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 border-t border-l border-[#E6E6DF] bg-[#FFFFFF]">
              {SELLING_CHANNELS.map((ch) => (
                <Link
                  key={ch.slug}
                  to={localizePath(`/learn/${ch.slug}`, locale)}
                  className="border-r border-b border-[#E6E6DF] px-3 py-2.5 hover:bg-[#FAF9F5] transition-colors flex items-center gap-2"
                >
                  <ChannelLogo slug={ch.slug} size="sm" />
                  <span className="text-xs font-semibold text-[#1A1B1A] truncate">
                    {ch.name[locale]}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. 90-MINUTE WORKSHOP AGENDA + PRESENTER CREDENTIALS */}
      <ScrollReveal>
        <section id="workshop-agenda" className="bonnza-container py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#666A65]">
                  {locale === 'hi'
                    ? 'शनिवार, 5 दिसंबर 2026 · 90-मिनट संरचना'
                    : 'Saturday, 5 December 2026 · 90-Minute Structure'}
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1B1A]">
                  {copy.agendaHeading}
                </h2>
              </div>

              <div className="border-y border-[#E6E6DF] divide-y divide-[#E6E6DF]">
                {WEBINAR_AGENDA.map((block, idx) => {
                  const clock = AGENDA_CLOCK_SLOTS[idx];
                  return (
                    <div
                      key={idx}
                      className="py-4 sm:py-5 flex items-start justify-between gap-4 text-sm"
                    >
                      <div className="space-y-1">
                        <p className="font-bold text-[#1A1B1A]">{block.title[locale]}</p>
                        <p className="text-xs sm:text-sm text-[#666A65] leading-relaxed">
                          {block.detail[locale]}
                        </p>
                      </div>
                      <span className="font-mono-tabular text-xs font-semibold text-[#1A1B1A] whitespace-nowrap shrink-0 pt-0.5">
                        {activeDec5Session.instructionLocale === 'hi'
                          ? clock.hiSlot
                          : clock.enSlot}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#666A65]">
                  {locale === 'hi' ? 'प्रस्तुतकर्ता व प्रशिक्षक' : 'Workshop Instructor'}
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1B1A]">
                  {copy.presenterHeading}
                </h2>
              </div>

              <PresenterTypographicCard
                locale={locale}
                roleLabel={copy.presenterRole}
                bio={copy.presenterBio}
              />

              <div className="rounded-[18px] border border-[#E6E6DF] bg-[#E8EDDD] p-6 space-y-3 text-xs text-[#1A1B1A]">
                <p className="font-bold text-sm">
                  {locale === 'hi'
                    ? 'शामिल सामग्री और नीति सुरक्षा'
                    : 'Included Material & Attendee Safeguards'}
                </p>
                <ul className="space-y-2 text-[#1A1B1A]/90">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      {locale === 'hi'
                        ? 'लाइव 1-पेज उत्पाद और प्रति-ऑर्डर लागत वर्कशीट'
                        : '1-page product & per-order unit costing worksheet'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      {locale === 'hi'
                        ? 'सत्र शुरू होने से 24 घंटे पहले एक बार निःशुल्क बैच बदलाव'
                        : 'Free one-time session transfer up to 24 hours before start'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      {locale === 'hi'
                        ? '24 घंटे पहले रद्दीकरण पर 100% रिफंड नीति'
                        : 'Full refund available on cancellations 24+ hours prior'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 2B. WHAT OTHERS SAY (Clean Unboxed Hairline Columns, No Pills) */}
      <ScrollReveal>
        <section
          id="what-others-say"
          className="bg-[#F3F1E9]/65 border-y border-[#E6E6DF] py-16 sm:py-20"
        >
          <div className="bonnza-container space-y-10">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#666A65]">
                {locale === 'hi' ? 'प्रतिभागी अनुभव' : 'ATTENDEE EXPERIENCES'}
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1B1A]">
                {locale === 'hi' ? 'अन्य प्रतिभागी क्या कहते हैं' : 'What Others Say'}
              </h2>
              <p className="text-sm sm:text-base text-[#666A65]">
                {locale === 'hi'
                  ? 'पहली बार ऑनलाइन उत्पाद शुरू करने वाले निर्माताओं और रीसेलर्स ने लागत गणित और चैनल स्पष्टता के बारे में क्या साझा किया।'
                  : 'How first-time makers and resellers applied the costing model and first-channel checklist before buying stock.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#E6E6DF] bg-[#FFFFFF]">
              {TESTIMONIALS.map((item, idx) => (
                <StaggerRevealItem key={item.initials} index={idx}>
                  <article className="h-full border-r border-b border-[#E6E6DF] p-6 sm:p-7 flex flex-col justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#666A65]">
                          {item.outcomeTag[locale]}
                        </p>
                        <Quote
                          size={18}
                          className="text-[#1A1B1A]/25 shrink-0"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="text-sm text-[#1A1B1A] leading-relaxed">
                        “{item.quote[locale]}”
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E6E6DF] flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="inline-flex items-center justify-center h-9 w-9 rounded-[8px] bg-[#1A1B1A] text-[#F4C940] text-xs font-extrabold tracking-wider shrink-0"
                      >
                        {item.initials}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-[#1A1B1A]">{item.name[locale]}</p>
                        <p className="text-xs text-[#666A65]">{item.role[locale]}</p>
                      </div>
                    </div>
                  </article>
                </StaggerRevealItem>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 3. TRANSPARENT 3-COLUMN PRICING COMPARISON + EMBEDDED REGISTRATION */}
      <ScrollReveal>
        <section id="reserve-dec5-seat" className="bonnza-container py-16 sm:py-20 space-y-10">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#666A65]">
              {locale === 'hi'
                ? 'पारदर्शी मूल्य और बैच तुलना'
                : 'Transparent Pricing · Saturday, 5 December 2026'}
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1B1A] text-balance">
              {locale === 'hi'
                ? 'अपना 5 दिसंबर लाइव सत्र चुनें या निःशुल्क उपकरणों से शुरुआत करें'
                : 'Compare Your Options & Reserve Your 5 December Seat'}
            </h2>
          </div>

          {/* 3-Column Pricing Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Option 1: 5 Dec English Live */}
            <div
              className={`rounded-[20px] border p-6 sm:p-7 flex flex-col justify-between gap-6 ${
                activeDec5Session.id === dec5EnSession.id
                  ? 'border-2 border-[#1A1B1A] bg-[#FFFFFF]'
                  : 'border-[#E6E6DF] bg-[#FFFFFF]'
              }`}
            >
              <div className="space-y-4">
                <p className="text-xs font-semibold text-[#666A65]">
                  {locale === 'hi'
                    ? 'शनिवार, 5 दिसंबर · 1:00 PM – 2:30 PM IST'
                    : 'Sat, 5 Dec 2026 · 1:00 PM – 2:30 PM IST'}
                </p>
                <div>
                  <h3 className="text-xl font-bold text-[#1A1B1A]">
                    {locale === 'hi' ? 'अंग्रेज़ी लाइव वर्कशॉप' : 'English Live Workshop'}
                  </h3>
                  <p className="text-3xl font-extrabold text-[#1A1B1A] mt-2 tabular-nums flex items-baseline gap-2 flex-wrap">
                    <span className="text-base font-medium text-[#666A65] line-through">
                      ₹1,999
                    </span>
                    <span>₹299</span>
                    <span className="text-xs font-normal text-[#666A65]">
                      {locale === 'hi' ? '/ प्रति व्यक्ति' : '/ per person'}
                    </span>
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-[#1A1B1A]">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      {locale === 'hi'
                        ? '90 मिनट का लाइव अंग्रेज़ी शिक्षण सत्र'
                        : '90 minutes live in English with Shubham Chaturvedi'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      {locale === 'hi'
                        ? '1-पेज उत्पाद और यूनिट कॉस्टिंग वर्कशीट'
                        : '1-page product & unit-costing worksheet included'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      {locale === 'hi'
                        ? 'लाइव समूह Q&A + 24 घंटे पहले बैच बदलाव विकल्प'
                        : 'Live group Q&A + 24-hour one-time session transfer'}
                    </span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleRedirectToRegistration(dec5EnSession.id)}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-[12px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] text-sm font-bold transition-colors whitespace-nowrap shrink-0"
              >
                {locale === 'hi' ? 'अभी पंजीकरण करें — ₹299' : 'Register Now — ₹299'}
              </button>
            </div>

            {/* Option 2: 5 Dec Hindi Live (Recommended Highlighted Card) */}
            <div
              className={`rounded-[20px] border p-6 sm:p-7 flex flex-col justify-between gap-6 ${
                activeDec5Session.id === dec5HiSession.id
                  ? 'border-2 border-[#F4C940] bg-[#202220] text-[#FAF9F5]'
                  : 'border-[#1A1B1A] bg-[#202220] text-[#FAF9F5]'
              }`}
            >
              <div className="space-y-4">
                <p className="text-xs font-semibold text-[#F4C940]">
                  {locale === 'hi'
                    ? 'शनिवार, 5 दिसंबर · 4:00 PM – 5:30 PM IST'
                    : 'Sat, 5 Dec 2026 · 4:00 PM – 5:30 PM IST'}
                </p>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {locale === 'hi' ? 'हिंदी लाइव वर्कशॉप' : 'Hindi Live Workshop'}
                  </h3>
                  <p className="text-3xl font-extrabold text-[#F4C940] mt-2 tabular-nums flex items-baseline gap-2 flex-wrap">
                    <span className="text-base font-medium text-[#FAF9F5]/55 line-through">
                      ₹1,999
                    </span>
                    <span>₹299</span>
                    <span className="text-xs font-normal text-[#FAF9F5]/70">
                      {locale === 'hi' ? '/ प्रति व्यक्ति' : '/ per person'}
                    </span>
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-[#FAF9F5]/90">
                  <li className="flex items-start gap-2">
                    <Check
                      size={14}
                      className="shrink-0 mt-0.5 text-[#F4C940]"
                      aria-hidden="true"
                    />
                    <span>
                      {locale === 'hi'
                        ? '90 मिनट का पूरा लाइव हिंदी शिक्षण सत्र'
                        : '90 minutes live in Hindi with Shubham Chaturvedi'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      size={14}
                      className="shrink-0 mt-0.5 text-[#F4C940]"
                      aria-hidden="true"
                    />
                    <span>
                      {locale === 'hi'
                        ? 'सरल हिंदी व अंग्रेज़ी लागत मॉडल अभ्यास'
                        : 'Hands-on unit-costing & channel decision framework'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check
                      size={14}
                      className="shrink-0 mt-0.5 text-[#F4C940]"
                      aria-hidden="true"
                    />
                    <span>
                      {locale === 'hi'
                        ? 'शाम का सुविधाजनक समय · लाइव समूह प्रश्नोत्तर'
                        : 'Evening 4:00 PM IST slot · Live group Q&A included'}
                    </span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleRedirectToRegistration(dec5HiSession.id)}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-[12px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] text-sm font-bold transition-colors whitespace-nowrap shrink-0"
              >
                {locale === 'hi' ? 'अभी पंजीकरण करें — ₹299' : 'Register Now — ₹299'}
              </button>
            </div>

            {/* Option 3: Free Calculators & Guides */}
            <div className="rounded-[20px] border border-[#E6E6DF] bg-[#F3F1E9] p-6 sm:p-7 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <p className="text-xs font-semibold text-[#666A65]">
                  {locale === 'hi'
                    ? 'निःशुल्क तैयारी संसाधन · कोई खाता आवश्यक नहीं'
                    : 'Free Pre-Workshop Tools · Zero Sign-Up Required'}
                </p>
                <div>
                  <h3 className="text-xl font-bold text-[#1A1B1A]">
                    {locale === 'hi'
                      ? 'ऑर्डर कैलकुलेटर और ई-कॉमर्स गाइड'
                      : 'Free Worksheets & Ecommerce Guides'}
                  </h3>
                  <p className="text-3xl font-extrabold text-[#1A1B1A] mt-2 tabular-nums">
                    ₹0{' '}
                    <span className="text-xs font-normal text-[#666A65]">
                      {locale === 'hi' ? 'तुरंत ब्राउज़र एक्सेस' : 'instant browser access'}
                    </span>
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-[#1A1B1A]">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      {locale === 'hi'
                        ? '1. ऑर्डर लागत कैलकुलेटर (Order Cost Calculator)'
                        : '1. Interactive Order Cost Calculator'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      {locale === 'hi'
                        ? '2. पहला चैनल व 3. बिज़नेस शुरुआती वर्कशीट'
                        : '2. First-Channel & 3. Business Starting Worksheets'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      {locale === 'hi'
                        ? 'संपूर्ण ई-कॉमर्स गाइड लाइब्रेरी पढ़ें'
                        : 'Read full Ecommerce Guides before joining'}
                    </span>
                  </li>
                </ul>
              </div>
              <Link
                to={localizePath('/resources', locale)}
                className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-[12px] border border-[#1A1B1A] bg-[#FFFFFF] hover:bg-[#FAF9F5] text-sm font-bold text-[#1A1B1A] transition-colors whitespace-nowrap shrink-0"
              >
                {locale === 'hi' ? 'निःशुल्क संसाधन खोलें' : 'Open Free Tools & Guides'}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Embedded Seat Reservation Form */}
          <div className="rounded-[20px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#666A65]">
                  {locale === 'hi'
                    ? 'सीट आरक्षण फॉर्म · शनिवार, 5 दिसंबर 2026'
                    : 'Seat Reservation · Saturday, 5 December 2026'}
                </p>
                <h3 className="text-2xl font-extrabold text-[#1A1B1A]">
                  {locale === 'hi'
                    ? 'अपना पंजीकरण विवरण यहीं सहेजें'
                    : 'Complete Your 5 December Workshop Registration'}
                </h3>
                <p className="text-sm text-[#666A65] leading-relaxed">
                  {locale === 'hi'
                    ? 'आपका पंजीकरण संदर्भ और टिकट विवरण सुरक्षित रूप से सहेजे जाते हैं। भुगतान सत्यापन पूर्ण होने के बाद आपकी सीट पुष्ट होती है।'
                    : 'Your registration details and ₹299 booking order are saved securely. Private session joining access unlocks immediately once payment verification completes.'}
                </p>
              </div>

              <div className="border-y border-[#E6E6DF] py-3.5 space-y-1.5 text-xs text-[#1A1B1A] tabular-nums">
                <p className="font-bold">
                  {activeDec5Session.instructionLocale === 'hi'
                    ? locale === 'hi'
                      ? 'चयनित सत्र: हिंदी (शाम 4:00 – 5:30 PM IST)'
                      : 'Selected Slot: Hindi Session (4:00 PM – 5:30 PM IST)'
                    : locale === 'hi'
                    ? 'चयनित सत्र: अंग्रेज़ी (दोपहर 1:00 – 2:30 PM IST)'
                    : 'Selected Slot: English Session (1:00 PM – 2:30 PM IST)'}
                </p>
                <p className="text-[#666A65]">
                  {locale === 'hi' ? 'शनिवार, 5 दिसंबर 2026' : 'Saturday, 5 December 2026'} ·{' '}
                  <span className="line-through text-[#666A65]/75">
                    {formatInr(activeDec5Session.originalTicketPriceInr, locale)}
                  </span>{' '}
                  <span className="font-bold text-[#1A1B1A]">
                    {formatInr(activeDec5Session.workingTicketPriceInr, locale)}
                  </span>
                </p>
                <p className="text-[#666A65]">{activeDec5Session.taxNote[locale]}</p>
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-bold text-[#1A1B1A] flex items-center gap-1.5">
                  <MessageSquare size={14} aria-hidden="true" />
                  {locale === 'hi'
                    ? 'क्या आपको सहायता या सलाह चाहिए?'
                    : 'Questions Before Booking? Real Support Available'}
                </p>
                <p className="text-[#666A65]">
                  {locale === 'hi'
                    ? 'सत्र चयन या पंजीकरण सहायता के लिए हमारी टीम से सीधे संपर्क करें।'
                    : 'Reach the Bonnza team directly for cohort, Hindi/English session, or invoice questions.'}
                </p>
                <div className="flex flex-wrap gap-4 pt-1">
                  <Link
                    to={localizePath('/contact', locale)}
                    className="inline-flex items-center gap-1 font-semibold text-[#1A1B1A] underline underline-offset-4"
                  >
                    <Phone size={12} aria-hidden="true" />
                    {locale === 'hi' ? 'संपर्क पृष्ठ' : 'Contact Support'}
                  </Link>
                  <a
                    href="mailto:bonnza@marketingtusk.com"
                    className="inline-flex items-center gap-1 font-semibold text-[#1A1B1A] underline underline-offset-4"
                  >
                    <Mail size={12} aria-hidden="true" />
                    bonnza@marketingtusk.com
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => selectWebinarSession(dec5EnSession.id)}
                  className={`p-3 rounded-[10px] border text-left text-xs transition-colors ${
                    activeDec5Session.id === dec5EnSession.id
                      ? 'border-[#1A1B1A] bg-[#FAF9F5] font-bold text-[#1A1B1A]'
                      : 'border-[#E6E6DF] bg-[#FFFFFF] text-[#666A65] hover:border-[#1A1B1A]/40'
                  }`}
                >
                  {locale === 'hi'
                    ? 'अंग्रेज़ी सत्र · 1:00 PM IST'
                    : 'English Slot · 1:00 PM IST'}
                </button>
                <button
                  type="button"
                  onClick={() => selectWebinarSession(dec5HiSession.id)}
                  className={`p-3 rounded-[10px] border text-left text-xs transition-colors ${
                    activeDec5Session.id === dec5HiSession.id
                      ? 'border-[#1A1B1A] bg-[#FAF9F5] font-bold text-[#1A1B1A]'
                      : 'border-[#E6E6DF] bg-[#FFFFFF] text-[#666A65] hover:border-[#1A1B1A]/40'
                  }`}
                >
                  {locale === 'hi' ? 'हिंदी सत्र · 4:00 PM IST' : 'Hindi Slot · 4:00 PM IST'}
                </button>
              </div>

              <WebinarRegistrationForm
                locale={locale}
                session={activeDec5Session}
                source="dec5_landing_page"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <ScrollReveal>
        <section id="frequently-asked-questions" className="bonnza-container pb-16 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#666A65] flex items-center gap-1.5">
                <HelpCircle size={13} aria-hidden="true" />
                {locale === 'hi' ? 'संदेह निवारण' : 'STUDENT CONCERNS & DETAILS'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1B1A]">
                {locale === 'hi' ? 'सामान्य प्रश्न (FAQ)' : 'Frequently Asked Questions'}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordion items={faqItems} locale={locale} />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 5. FINAL CTA BLOCK */}
      <ScrollReveal>
        <section className="bonnza-container">
          <div className="rounded-[20px] bg-[#202220] text-[#FAF9F5] p-6 sm:p-10 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#F4C940] tabular-nums flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#F4C940]" aria-hidden="true" />
                <span>
                  {locale === 'hi'
                    ? `सीमित सीटें · शनिवार, 5 दिसंबर 2026 (${countdownDays} दिन ${String(countdownHours).padStart(2, '0')} घंटे शेष)`
                    : `LIMITED SPOTS · SAT, 5 DEC 2026 (${countdownDays}d ${String(countdownHours).padStart(2, '0')}h ${String(countdownMinutes).padStart(2, '0')}m LEFT)`}
                </span>
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white text-balance">
                {locale === 'hi'
                  ? 'शनिवार, 5 दिसंबर 2026 की कार्यशाला में अभी पंजीकरण करें'
                  : 'Lock In Your Saturday, 5 December 2026 Seat'}
              </h2>
              <p className="text-sm text-[#FAF9F5]/80 leading-relaxed max-w-xl">
                {locale === 'hi'
                  ? 'दोपहर 1:00 PM IST (अंग्रेज़ी) या शाम 4:00 PM IST (हिंदी) में से अपना सत्र चुनें और ₹299 में लाइव कार्यशाला में शामिल हों।'
                  : 'Choose the 1:00 PM IST English cohort or 4:00 PM IST Hindi cohort and walk away with your completed unit-costing & channel plan.'}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#FAF9F5]/75 pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#F4C940]" aria-hidden="true" />
                  {locale === 'hi' ? 'शनिवार, 5 दिसंबर 2026' : 'Saturday, 5 December 2026'}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} className="text-[#F4C940]" aria-hidden="true" />
                  {locale === 'hi' ? '90 मिनट लाइव' : '90 minutes live'}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <UserCheck size={14} className="text-[#F4C940]" aria-hidden="true" />
                  Shubham Chaturvedi
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#F4C940]" aria-hidden="true" />
                  {locale === 'hi' ? '24-घंटे पूर्व सत्र स्थानांतरण' : '24-hr session transfer'}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Lock size={14} className="text-[#F4C940]" aria-hidden="true" />
                  Razorpay
                </span>
                <span className="inline-flex items-center gap-1.5 tabular-nums">
                  <CheckCircle2 size={14} className="text-[#F4C940]" aria-hidden="true" />
                  <span className="line-through text-[#FAF9F5]/55">₹1,999</span>
                  <span className="font-bold text-[#F4C940]">₹299</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => handleRedirectToRegistration('bonnza-2026-12-05-en-1300')}
                className="w-full min-h-[48px] px-5 py-3 rounded-[12px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] font-bold text-sm transition-colors whitespace-nowrap shrink-0 tabular-nums"
              >
                {locale === 'hi'
                  ? 'अभी पंजीकरण करें (अंग्रेज़ी 1:00 PM IST) —'
                  : 'Register Now (English 1:00 PM IST) —'}{' '}
                <span className="line-through opacity-60 font-medium">₹1,999</span> ₹299
              </button>
              <button
                type="button"
                onClick={() => handleRedirectToRegistration('bonnza-2026-12-05-hi-1600')}
                className="w-full min-h-[48px] px-5 py-3 rounded-[12px] border border-[#F4C940] bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-sm transition-colors whitespace-nowrap shrink-0 tabular-nums"
              >
                {locale === 'hi'
                  ? 'अभी पंजीकरण करें (हिंदी 4:00 PM IST) —'
                  : 'Register Now (Hindi 4:00 PM IST) —'}{' '}
                <span className="line-through opacity-65 font-medium">₹1,999</span> ₹299
              </button>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
