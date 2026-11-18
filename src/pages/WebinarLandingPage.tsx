import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, UserCheck, FileSpreadsheet, Check, X } from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import { UI_COPY } from '../content/translations';
import {
  WEBINAR_SESSIONS,
  WEBINAR_AGENDA,
  WEBINAR_WORKSHEET_EXAMPLE,
  WEBINAR_FAQS,
  getUpcomingWebinarGroups,
  getPromotedWebinarGroup,
} from '../content/webinars';
import type { WebinarSessionId } from '../domain/types';
import { formatInr, formatIstDate, localizePath } from '../utilities/locale';
import { buildWebinarEventSchemas } from '../utilities/seo';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BookingCard } from '../components/BookingCard';
import { FaqAccordion } from '../components/FaqAccordion';
import { PresenterTypographicCard } from '../components/IllustrativeDiagrams';
import { AnimatedText, ScrollReveal, StaggerRevealItem } from '../components/MotionPrimitives';
import { recordAnalyticsEvent } from '../integrations/futureInterfaces';

export function WebinarLandingPage() {
  const { sessionId } = useParams<{ sessionId?: string }>();
  const { locale, selectedSessionId, selectWebinarSession, featureFlags } = useBonnza();
  const copy = UI_COPY[locale].webinar;

  const checkoutEnabled = Boolean(
    featureFlags.find((f) => f.key === 'WEBINAR_CHECKOUT_ENABLED')?.enabled
  );

  const upcomingGroups = getUpcomingWebinarGroups();
  const promotedGroup = getPromotedWebinarGroup();
  const activeSession =
    WEBINAR_SESSIONS.find((s) => s.id === selectedSessionId) || promotedGroup.enSession;
  const activeDateGroup =
    upcomingGroups.find(
      (g) => g.enSession.id === activeSession.id || g.hiSession.id === activeSession.id
    ) || promotedGroup;

  useEffect(() => {
    if (sessionId && WEBINAR_SESSIONS.some((s) => s.id === sessionId)) {
      selectWebinarSession(sessionId as WebinarSessionId);
    }
    recordAnalyticsEvent({
      event: 'webinar_view',
      locale,
      path: window.location.pathname,
      metadata: sessionId ? { sessionId } : undefined,
    });
  }, [sessionId]);

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
            ? `लाइव शुरुआती ई-कॉमर्स वर्कशॉप — ${formatIstDate(activeSession.startUtc, 'hi')} | Bonnza`
            : `First Online Business Live Workshop — ${formatIstDate(activeSession.startUtc, 'en')} | Bonnza`
        }
        description={copy.subtitle}
        path={localizePath(
          sessionId ? `/webinars/session/${sessionId}` : '/webinars/first-online-business',
          locale
        )}
        alternateEnPath={
          sessionId
            ? `/en/webinars/session/${sessionId}`
            : '/en/webinars/first-online-business'
        }
        alternateHiPath={
          sessionId
            ? `/hi/webinars/session/${sessionId}`
            : '/hi/webinars/first-online-business'
        }
        jsonLd={eventSchemas}
      />

      {/* Above-the-fold Hero + Booking Card */}
      <section className="pt-8 sm:pt-10 pb-16 border-b border-[#E6E6DF]">
        <div className="bonnza-container space-y-6">
          <Breadcrumbs
            locale={locale}
            items={[
              { label: locale === 'hi' ? 'होम' : 'Home', to: localizePath('/', locale) },
              {
                label: locale === 'hi' ? 'वेबिनार' : 'Webinars',
                to: localizePath('/webinars', locale),
              },
              { label: locale === 'hi' ? 'लाइव वर्कशॉप' : 'First Online Business Workshop' },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#666A65]">
                  {activeDateGroup.isNextUpcoming
                    ? locale === 'hi'
                      ? 'अगला आगामी शनिवार वेबिनार'
                      : 'NEXT UPCOMING SATURDAY'
                    : locale === 'hi'
                    ? 'वैकल्पिक शनिवार वेबिनार'
                    : 'ALTERNATE SATURDAY COHORT'}{' '}
                  · {copy.eyebrow}
                </p>
                <AnimatedText as="h1" className="bonnza-hero-title text-[#1A1B1A] text-balance">
                  {copy.headline}
                </AnimatedText>
                <AnimatedText
                  as="p"
                  delay={0.07}
                  className="text-base sm:text-lg text-[#666A65] leading-relaxed"
                >
                  {copy.subtitle}
                </AnimatedText>
              </div>

              <div className="border-y border-[#E6E6DF] py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-[#1A1B1A]">
                  {locale === 'hi'
                    ? 'शनिवार, 5 दिसंबर 2026 के प्राथमिक लाइव बैच के लिए:'
                    : 'Looking for the primary Saturday, 5 December 2026 cohort?'}
                </span>
                <Link
                  to={localizePath('/webinars/5-december-2026', locale)}
                  className="font-bold text-[#1A1B1A] underline underline-offset-4 whitespace-nowrap shrink-0"
                >
                  {locale === 'hi'
                    ? 'शनिवार, 5 दिसंबर 2026 पेज खोलें →'
                    : 'Open 5 December 2026 Page →'}
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-[#E6E6DF] bg-[#FFFFFF] text-sm tabular-nums">
                <div className="border-r border-b border-[#E6E6DF] p-4 flex items-start gap-2.5">
                  <Calendar
                    size={17}
                    className="shrink-0 mt-0.5 text-[#1A1B1A]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-[#1A1B1A]">
                      {activeDateGroup.dateLabel[locale]}
                    </p>
                    <p className="text-xs text-[#666A65]">
                      {locale === 'hi'
                        ? '90 मिनट लाइव · हर वैकल्पिक शनिवार'
                        : '90 minutes live · Every alternate Saturday'}
                    </p>
                  </div>
                </div>
                <div className="border-r border-b border-[#E6E6DF] p-4 flex items-start gap-2.5">
                  <Clock size={17} className="shrink-0 mt-0.5 text-[#1A1B1A]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#1A1B1A]">
                      {locale === 'hi' ? 'अंग्रेज़ी: 1:00 PM IST' : 'English: 1:00 PM IST'}
                    </p>
                    <p className="text-xs text-[#666A65]">
                      {locale === 'hi' ? 'हिंदी: 4:00 PM IST' : 'Hindi: 4:00 PM IST'}
                    </p>
                  </div>
                </div>
                <div className="border-r border-b border-[#E6E6DF] p-4 flex items-start gap-2.5">
                  <UserCheck
                    size={17}
                    className="shrink-0 mt-0.5 text-[#1A1B1A]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-[#1A1B1A]">Shubham Chaturvedi</p>
                    <p className="text-xs text-[#666A65]">
                      {locale === 'hi' ? 'प्रस्तुतकर्ता व होस्ट' : 'Presenter & host'}
                    </p>
                  </div>
                </div>
                <div className="border-r border-b border-[#E6E6DF] p-4 flex items-start gap-2.5">
                  <FileSpreadsheet
                    size={17}
                    className="shrink-0 mt-0.5 text-[#1A1B1A]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-[#1A1B1A]">
                      <span className="line-through text-[#666A65] mr-1.5 font-normal">
                        {formatInr(activeSession.originalTicketPriceInr, locale)}
                      </span>
                      <span>{formatInr(activeSession.workingTicketPriceInr, locale)}</span>{' '}
                      {locale === 'hi' ? 'वर्कशॉप टिकट' : 'workshop ticket'}
                    </p>
                    <p className="text-xs text-[#666A65]">
                      {locale === 'hi'
                        ? '1-पेज निर्णय वर्कशीट शामिल'
                        : '1-page decision worksheet included'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <BookingCard allowFutureCohorts />
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Alternate-Saturday Cohorts */}
      <ScrollReveal>
        <section className="bonnza-container py-16 space-y-6">
          <div className="max-w-3xl space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#666A65]">
              {locale === 'hi' ? 'आगामी कार्यशाला अनुसूची' : 'UPCOMING WORKSHOPS'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A]">
              {locale === 'hi'
                ? 'आगामी शनिवार लाइव कार्यशाला तिथियां'
                : 'Upcoming Live Workshop Dates'}
            </h2>
            <p className="text-sm text-[#666A65]">
              {locale === 'hi'
                ? '90-मिनट के अंग्रेज़ी (1:00 PM IST) या हिंदी (4:00 PM IST) लाइव सत्र के लिए अपनी उपयुक्त शनिवार तिथि चुनें।'
                : 'Select your preferred Saturday date for the 90-minute English (1:00 PM IST) or Hindi (4:00 PM IST) live workshop.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingGroups.map((group, idx) => {
              const isSelectedDate = group.date === activeDateGroup.date;
              return (
                <StaggerRevealItem key={group.date} index={idx}>
                  <div
                    className={`h-full rounded-[16px] border p-5 flex flex-col justify-between gap-4 ${
                      isSelectedDate
                        ? 'border-2 border-[#1A1B1A] bg-[#FAF9F5]'
                        : 'border-[#E6E6DF] bg-[#FFFFFF]'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-[#666A65]">
                          {group.isNextUpcoming
                            ? locale === 'hi'
                              ? 'प्राथमिक बैच'
                              : 'Next Upcoming Batch'
                            : locale === 'hi'
                            ? 'आगामी बैच'
                            : 'Future Cohort'}
                        </span>
                        <span className="text-sm font-extrabold text-[#1A1B1A] tabular-nums">
                          <span className="line-through text-[#666A65] font-normal mr-1.5 text-xs">
                            {formatInr(group.enSession.originalTicketPriceInr, locale)}
                          </span>
                          {formatInr(group.enSession.workingTicketPriceInr, locale)}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#1A1B1A]">
                        {group.dateLabel[locale]}
                      </h3>
                      <p className="text-xs text-[#666A65]">
                        EN 1:00 PM IST · HI 4:00 PM IST · 90 min
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E6E6DF]">
                      <button
                        type="button"
                        onClick={() => selectWebinarSession(group.enSession.id)}
                        className={`min-h-[38px] px-2.5 py-1.5 rounded-[8px] text-xs font-semibold transition-colors ${
                          activeSession.id === group.enSession.id
                            ? 'bg-[#1A1B1A] text-white'
                            : 'bg-[#F3F1E9] text-[#1A1B1A] hover:bg-[#E8EDDD]'
                        }`}
                      >
                        {locale === 'hi' ? 'अंग्रेज़ी 1 PM' : 'English 1 PM'}
                      </button>
                      <button
                        type="button"
                        onClick={() => selectWebinarSession(group.hiSession.id)}
                        className={`min-h-[38px] px-2.5 py-1.5 rounded-[8px] text-xs font-semibold transition-colors ${
                          activeSession.id === group.hiSession.id
                            ? 'bg-[#1A1B1A] text-white'
                            : 'bg-[#F3F1E9] text-[#1A1B1A] hover:bg-[#E8EDDD]'
                        }`}
                      >
                        {locale === 'hi' ? 'हिंदी 4 PM' : 'Hindi 4 PM'}
                      </button>
                    </div>
                  </div>
                </StaggerRevealItem>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* Outcomes (Unboxed Hairline Grid) */}
      <ScrollReveal>
        <section className="bonnza-container pb-16 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A]">{copy.outcomesHeading}</h2>
          <div className="border-y border-[#E6E6DF] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E6E6DF]">
            {copy.outcomes.map((outcome, idx) => (
              <StaggerRevealItem key={idx} index={idx}>
                <div className="py-6 sm:px-6 first:sm:pl-0 last:sm:pr-0 space-y-2 h-full">
                  <p className="text-xs font-mono-tabular font-semibold text-[#666A65]">
                    0{idx + 1}.
                  </p>
                  <p className="text-base font-semibold text-[#1A1B1A] leading-snug">{outcome}</p>
                </div>
              </StaggerRevealItem>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Audience Fit */}
      <ScrollReveal>
        <section className="bg-[#F3F1E9]/65 border-y border-[#E6E6DF] py-16">
          <div className="bonnza-container space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A]">
              {copy.audienceHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-[18px] border border-[#E6E6DF] bg-[#E8EDDD] p-6 sm:p-7 space-y-4">
                <h3 className="text-xl font-bold text-[#1A1B1A]">{copy.suitableForTitle}</h3>
                <ul className="space-y-2.5 text-sm text-[#1A1B1A]">
                  {copy.suitableForList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check
                        size={16}
                        className="shrink-0 mt-0.5 text-[#1A1B1A]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[18px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 sm:p-7 space-y-4">
                <h3 className="text-xl font-bold text-[#1A1B1A]">{copy.notForTitle}</h3>
                <ul className="space-y-2.5 text-sm text-[#666A65]">
                  {copy.notForList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <X
                        size={16}
                        className="shrink-0 mt-0.5 text-[#666A65]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Exact 90-Minute Agenda */}
      <ScrollReveal>
        <section className="bonnza-container py-16 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A]">{copy.agendaHeading}</h2>
          <div className="border-y border-[#E6E6DF] divide-y divide-[#E6E6DF]">
            {WEBINAR_AGENDA.map((block, idx) => (
              <div
                key={idx}
                className="py-5 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-start"
              >
                <div className="md:col-span-3">
                  <span className="text-sm font-mono-tabular font-semibold text-[#1A1B1A]">
                    {block.range[locale]}
                  </span>
                </div>
                <div className="md:col-span-9 space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#1A1B1A]">
                    {block.title[locale]}
                  </h3>
                  <p className="text-sm text-[#666A65] leading-relaxed">{block.detail[locale]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Worksheet Preview */}
      <ScrollReveal>
        <section className="bonnza-container pb-16 space-y-6">
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A]">
              {copy.worksheetHeading}
            </h2>
            <p className="text-sm text-[#666A65]">{WEBINAR_WORKSHEET_EXAMPLE.disclaimer[locale]}</p>
          </div>

          <div className="border border-[#E6E6DF] bg-[#FFFFFF] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E6E6DF]">
              <div className="divide-y divide-[#E6E6DF]">
                {WEBINAR_WORKSHEET_EXAMPLE.fields.slice(0, 5).map((f, idx) => (
                  <div key={idx} className="p-4 sm:p-5 space-y-1">
                    <p className="text-xs font-semibold text-[#666A65]">{f.label[locale]}</p>
                    <p className="text-sm font-medium text-[#1A1B1A]">{f.value[locale]}</p>
                  </div>
                ))}
              </div>
              <div className="divide-y divide-[#E6E6DF]">
                {WEBINAR_WORKSHEET_EXAMPLE.fields.slice(5).map((f, idx) => (
                  <div key={idx} className="p-4 sm:p-5 space-y-1">
                    <p className="text-xs font-semibold text-[#666A65]">{f.label[locale]}</p>
                    <p className="text-sm font-medium text-[#1A1B1A]">{f.value[locale]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Presenter Card */}
      <ScrollReveal>
        <section className="bonnza-container pb-16 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A]">
            {copy.presenterHeading}
          </h2>
          <PresenterTypographicCard
            locale={locale}
            roleLabel={copy.presenterRole}
            bio={copy.presenterBio}
          />
        </section>
      </ScrollReveal>

      {/* Ticket Inclusions vs Exclusions */}
      <ScrollReveal>
        <section className="bonnza-container pb-16 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A]">
            {copy.inclusionsHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 border-y border-[#E6E6DF] divide-y md:divide-y-0 md:divide-x divide-[#E6E6DF]">
            <div className="py-6 md:pr-8 space-y-4">
              <h3 className="text-lg font-bold text-[#1A1B1A]">{copy.includedTitle}</h3>
              <ul className="space-y-2.5 text-sm text-[#1A1B1A]">
                {copy.includedList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check size={16} className="shrink-0 mt-0.5 text-[#1A1B1A]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="py-6 md:pl-8 space-y-4">
              <h3 className="text-lg font-bold text-[#1A1B1A]">{copy.notIncludedTitle}</h3>
              <ul className="space-y-2.5 text-sm text-[#666A65]">
                {copy.notIncludedList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <X size={16} className="shrink-0 mt-0.5 text-[#666A65]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-xs text-[#666A65]">{copy.replayNote}</p>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal>
        <section className="bonnza-container pb-16 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A]">{copy.faqHeading}</h2>
          <FaqAccordion items={faqItems} locale={locale} />
        </section>
      </ScrollReveal>

      {/* Final CTA with Session Selector */}
      <ScrollReveal>
        <section className="bonnza-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A1B1A] text-balance">
                {copy.finalHeadline}
              </h2>
              <p className="text-sm text-[#666A65] leading-relaxed">
                {locale === 'hi'
                  ? 'अगले आगामी शनिवार या किसी भी आगामी वैकल्पिक शनिवार के बैच में अपना 90-मिनट का लाइव अंग्रेज़ी या हिंदी सत्र चुनें।'
                  : 'Select the promoted next upcoming Saturday or any upcoming alternate-Saturday cohort in English (1:00 PM IST) or Hindi (4:00 PM IST).'}
              </p>
            </div>
            <div className="lg:col-span-7">
              <BookingCard compact allowFutureCohorts />
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
