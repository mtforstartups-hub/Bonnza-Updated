import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import {
  WEBINAR_SESSIONS,
  DEC5_WEBINAR_SESSIONS,
  getUpcomingWebinarGroups,
  type WebinarDateGroup,
} from '../content/webinars';
import { UI_COPY } from '../content/translations';
import { formatInr, formatIstDate, formatIstTimeRange, localizePath } from '../utilities/locale';
import { recordAnalyticsEvent } from '../integrations/futureInterfaces';

export function BookingCard({
  compact = false,
  allowFutureCohorts = false,
}: {
  compact?: boolean;
  allowFutureCohorts?: boolean;
}) {
  const { locale, selectedSessionId, selectWebinarSession } = useBonnza();
  const navigate = useNavigate();
  const copy = UI_COPY[locale].webinar;

  const upcomingGroups = getUpcomingWebinarGroups();
  const dec5Group = upcomingGroups[0];

  // Outside the Live Workshop page, always lock BookingCard strictly to Saturday, 5 December 2026
  const selectedSession = allowFutureCohorts
    ? WEBINAR_SESSIONS.find((s) => s.id === selectedSessionId) || dec5Group.enSession
    : DEC5_WEBINAR_SESSIONS.find((s) => s.id === selectedSessionId) || DEC5_WEBINAR_SESSIONS[0];

  const activeGroup: WebinarDateGroup = allowFutureCohorts
    ? upcomingGroups.find((g) => g.date === selectedSession.date) || dec5Group
    : dec5Group;

  const handleSelectSaturdayGroup = (group: WebinarDateGroup) => {
    const nextSession =
      selectedSession.instructionLocale === 'hi' ? group.hiSession : group.enSession;
    selectWebinarSession(nextSession.id);
  };

  const handleContinue = () => {
    selectWebinarSession(selectedSession.id);
    recordAnalyticsEvent({
      event: 'registration_started',
      locale,
      path: window.location.pathname,
      metadata: { sessionId: selectedSession.id },
    });
    navigate(localizePath('/webinars/register', locale));
  };

  const sessionsForActiveSaturday = allowFutureCohorts
    ? [activeGroup.enSession, activeGroup.hiSession]
    : DEC5_WEBINAR_SESSIONS;

  return (
    <div className="rounded-[20px] bg-[#202220] text-[#FAF9F5] p-6 sm:p-8 border border-white/10 space-y-6">
      {/* Header + Strikethrough ₹1,999 -> ₹299 Price */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 pb-5 border-b border-white/10">
        <div className="space-y-1">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#F4C940]">
            {allowFutureCohorts
              ? copy.bookingTitle
              : locale === 'hi'
              ? 'शनिवार, 5 दिसंबर 2026 · लाइव वर्कशॉप'
              : 'SATURDAY, 5 DECEMBER 2026 · LIVE WORKSHOP'}
          </p>
          <p className="text-sm text-[#FAF9F5]/80">{copy.selectSessionPrompt}</p>
        </div>
        <div className="text-right">
          <div className="flex items-baseline justify-end gap-2 tabular-nums">
            <span className="text-sm font-medium text-[#FAF9F5]/50 line-through">
              {formatInr(selectedSession.originalTicketPriceInr, locale)}
            </span>
            <span className="text-3xl font-extrabold text-[#F4C940]">
              {formatInr(selectedSession.workingTicketPriceInr, locale)}
            </span>
          </div>
          <p className="text-xs text-[#FAF9F5]/65">
            {locale === 'hi' ? 'प्रति व्यक्ति वर्कशॉप टिकट' : 'workshop ticket / person'}
          </p>
        </div>
      </div>

      {/* Future Alternate Saturdays Selector: ONLY rendered on the Live Workshop page */}
      {allowFutureCohorts && (
        <div className="space-y-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#FAF9F5]/75">
            {locale === 'hi' ? 'वर्कशॉप तिथि चुनें' : 'Select Workshop Date'}
          </p>

          <div
            role="group"
            aria-label={
              locale === 'hi' ? 'वर्कशॉप शनिवार तिथि चुनें' : 'Select workshop Saturday date'
            }
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
          >
            {upcomingGroups.slice(0, compact ? 4 : 6).map((group) => {
              const isDateActive = group.date === activeGroup.date;
              return (
                <button
                  key={group.date}
                  type="button"
                  aria-pressed={isDateActive}
                  onClick={() => handleSelectSaturdayGroup(group)}
                  className={`text-left rounded-[10px] px-3.5 py-2.5 min-h-[42px] border transition-colors flex items-center justify-between gap-2 ${
                    isDateActive
                      ? 'border-[#F4C940] bg-[#FAF9F5]/12 text-white'
                      : 'border-white/15 bg-white/[0.03] text-[#FAF9F5]/80 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tabular-nums">
                    <Calendar
                      size={13}
                      className={isDateActive ? 'text-[#F4C940]' : 'text-white/60'}
                      aria-hidden="true"
                    />
                    <span>{group.shortDateLabel[locale]}</span>
                  </span>
                  <span className="inline-flex items-baseline gap-1.5 text-xs tabular-nums shrink-0">
                    <span className="text-[10px] text-[#FAF9F5]/50 line-through">₹1,999</span>
                    <span className="font-bold text-[#F4C940]">
                      {formatInr(group.enSession.workingTicketPriceInr, locale)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* English & Hindi Session Radio List */}
      <div
        role="radiogroup"
        aria-label={copy.bookingTitle}
        className="grid grid-cols-1 gap-3"
      >
        {sessionsForActiveSaturday.map((session) => {
          const isSelected = session.id === selectedSession.id;
          const sessionName =
            session.instructionLocale === 'en'
              ? copy.englishSessionLabel
              : copy.hindiSessionLabel;
          return (
            <button
              key={session.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => selectWebinarSession(session.id)}
              className={`w-full text-left rounded-[14px] p-4 border transition-colors min-h-[68px] ${
                isSelected
                  ? 'border-[#F4C940] bg-[#FAF9F5]/10'
                  : 'border-white/15 bg-white/[0.03] hover:border-white/35'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex h-4 w-4 items-center justify-center rounded-full border shrink-0 ${
                        isSelected
                          ? 'border-[#F4C940] bg-[#F4C940]'
                          : 'border-white/40 bg-transparent'
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-[#1A1B1A]" />}
                    </span>
                    <span className="text-base font-semibold text-white">{sessionName}</span>
                  </div>
                  <div className="pl-6.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#FAF9F5]/75 tabular-nums">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={13} aria-hidden="true" />
                      {formatIstDate(session.startUtc, locale)}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={13} aria-hidden="true" />
                      {formatIstTimeRange(session.startUtc, session.endUtc, locale)}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#F4C940] whitespace-nowrap shrink-0">
                    <CheckCircle2 size={14} aria-hidden="true" />
                    {copy.selectedSessionBadge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Session Hairline Summary + Primary CTA */}
      <div className="pt-4 border-t border-white/10 space-y-4">
        <p className="text-xs text-[#FAF9F5]/80 tabular-nums leading-relaxed">
          <span className="font-semibold text-[#F4C940]">
            {locale === 'hi' ? 'चयनित सत्र:' : 'Selected session:'}
          </span>{' '}
          <span className="text-white">
            {formatIstDate(selectedSession.startUtc, locale)} ·{' '}
            {selectedSession.instructionLocale === 'en'
              ? copy.englishSessionLabel
              : copy.hindiSessionLabel}{' '}
            ({formatIstTimeRange(selectedSession.startUtc, selectedSession.endUtc, locale)})
          </span>
        </p>

        <button
          type="button"
          onClick={handleContinue}
          className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-[12px] bg-[#F4C940] text-[#1A1B1A] font-bold text-base hover:bg-[#eab924] transition-colors"
        >
          <span>{copy.continueToRegistration}</span>
          <ArrowRight size={17} aria-hidden="true" />
        </button>

        {!compact && (
          <p className="text-xs text-[#FAF9F5]/70">{selectedSession.taxNote[locale]}</p>
        )}
      </div>
    </div>
  );
}
