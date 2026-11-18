import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import { DEC5_WEBINAR_SESSIONS } from '../content/webinars';
import { formatInr, formatIstDate, formatIstTimeRange, localizePath } from '../utilities/locale';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnimatedText, StaggerRevealItem } from '../components/MotionPrimitives';

export function WebinarsDirectoryPage() {
  const { locale, selectedSessionId, selectWebinarSession } = useBonnza();

  return (
    <div className="bonnza-container py-10 sm:py-14 space-y-10">
      <SeoHead
        locale={locale}
        title={
          locale === 'hi'
            ? 'शनिवार, 5 दिसंबर 2026 लाइव वर्कशॉप और सत्र | Bonnza'
            : 'Saturday, 5 December 2026 Live Workshop Sessions | Bonnza'
        }
        description={
          locale === 'hi'
            ? 'शनिवार, 5 दिसंबर 2026 को होने वाली 90-मिनट की लाइव अंग्रेज़ी (1:00 PM IST) और हिंदी (4:00 PM IST) ई-कॉमर्स वर्कशॉप चुनें।'
            : 'Explore Saturday, 5 December 2026 live beginner ecommerce workshop sessions in English (1:00 PM IST) and Hindi (4:00 PM IST).'
        }
        path={localizePath('/webinars', locale)}
        alternateEnPath="/en/webinars"
        alternateHiPath="/hi/webinars"
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: locale === 'hi' ? 'होम' : 'Home', to: localizePath('/', locale) },
          { label: locale === 'hi' ? 'वेबिनार' : 'Webinars' },
        ]}
      />

      <header className="max-w-3xl space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#666A65]">
          {locale === 'hi'
            ? 'लाइव सत्र · शनिवार, 5 दिसंबर 2026'
            : 'LIVE WORKSHOPS · SATURDAY, 5 DECEMBER 2026'}
        </p>
        <AnimatedText
          as="h1"
          className="text-3xl sm:text-4xl font-extrabold text-[#1A1B1A] text-balance"
        >
          {locale === 'hi'
            ? 'शनिवार, 5 दिसंबर 2026 के लाइव वर्कशॉप सत्र'
            : 'Saturday, 5 December 2026 Live Workshop Sessions'}
        </AnimatedText>
        <p className="text-base text-[#666A65] leading-relaxed">
          {locale === 'hi'
            ? 'शनिवार, 5 दिसंबर 2026 को अंग्रेज़ी (1:00 PM IST) और हिंदी (4:00 PM IST) में अलग-अलग 90-मिनट के लाइव सत्र आयोजित किए जाएंगे।'
            : 'Join Shubham Chaturvedi live on Saturday, 5 December 2026 in either English (1:00 PM IST) or Hindi (4:00 PM IST).'}
        </p>
      </header>

      {/* Promoted 5 December 2026 Workshop Spotlight */}
      <section className="rounded-[20px] bg-[#202220] text-[#FAF9F5] p-6 sm:p-10 space-y-8 border border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1.5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F4C940]">
              {locale === 'hi'
                ? 'शनिवार, 5 दिसंबर 2026 · लाइव कार्यशाला'
                : 'SATURDAY, 5 DECEMBER 2026 · LIVE COHORTS'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {locale === 'hi' ? 'शनिवार, 5 दिसंबर 2026' : 'Saturday, 5 December 2026'}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={localizePath('/webinars/5-december-2026', locale)}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-[12px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
            >
              {locale === 'hi'
                ? 'शनिवार, 5 दिसंबर 2026 विशेष पेज खोलें'
                : 'Open Saturday, 5 Dec 2026 Page'}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link
              to={localizePath('/webinars/first-online-business', locale)}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-[12px] border border-white/25 text-white hover:bg-white/10 font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
            >
              {locale === 'hi'
                ? 'लाइव वर्कशॉप और भविष्य की तिथियां देखें'
                : 'Live Workshop Page & Future Dates'}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/15">
          {DEC5_WEBINAR_SESSIONS.map((session, idx) => (
            <StaggerRevealItem key={session.id} index={idx}>
              <div className="h-full py-6 md:px-7 first:md:pl-0 last:md:pr-0 flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#F4C940]">
                      {session.instructionLocale === 'en'
                        ? locale === 'hi'
                          ? 'अंग्रेज़ी शिक्षण सत्र'
                          : 'English Instruction'
                        : locale === 'hi'
                        ? 'हिंदी शिक्षण सत्र'
                        : 'Hindi Instruction'}
                    </p>
                    {selectedSessionId === session.id && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#F4C940]">
                        <CheckCircle2 size={14} aria-hidden="true" />
                        {locale === 'hi' ? 'चयनित' : 'Selected'}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white">{session.title[locale]}</h3>
                  <div className="space-y-1.5 text-sm text-[#FAF9F5]/80 tabular-nums">
                    <p className="flex items-center gap-2">
                      <Calendar size={15} className="text-[#F4C940]" aria-hidden="true" />
                      {formatIstDate(session.startUtc, locale)}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock size={15} className="text-[#F4C940]" aria-hidden="true" />
                      {formatIstTimeRange(session.startUtc, session.endUtc, locale)} ·{' '}
                      {session.durationMinutes} {locale === 'hi' ? 'मिनट' : 'minutes'}
                    </p>
                  </div>
                  <p className="text-sm text-white font-medium pt-1 tabular-nums">
                    {locale === 'hi' ? 'प्रस्तुतकर्ता:' : 'Presenter:'} {session.presenter} ·{' '}
                    <span className="line-through text-white/50 mr-1.5">
                      {formatInr(session.originalTicketPriceInr, locale)}
                    </span>
                    <span className="font-bold text-[#F4C940]">
                      {formatInr(session.workingTicketPriceInr, locale)}
                    </span>{' '}
                    {locale === 'hi' ? 'वर्कशॉप टिकट' : 'workshop ticket'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={localizePath('/webinars/register', locale)}
                    onClick={() => selectWebinarSession(session.id)}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-[12px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] font-semibold text-sm transition-colors"
                  >
                    {locale === 'hi' ? 'अभी पंजीकरण करें' : 'Register Now'}
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                  <Link
                    to={localizePath('/webinars/5-december-2026', locale)}
                    onClick={() => selectWebinarSession(session.id)}
                    className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-[12px] border border-white/25 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    {locale === 'hi' ? 'सत्र विवरण देखें' : 'View Session Details'}
                  </Link>
                </div>
              </div>
            </StaggerRevealItem>
          ))}
        </div>
      </section>
    </div>
  );
}
