import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  Clock,
  XCircle,
  ShieldCheck,
  CheckCircle2,
  ArrowRightLeft,
  Search,
} from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import {
  WEBINAR_SESSIONS,
  DEC5_WEBINAR_SESSIONS,
  getUpcomingWebinarGroups,
  getPromotedWebinarGroup,
} from '../content/webinars';
import type { WebinarSessionId } from '../domain/types';
import {
  formatInr,
  formatIstDate,
  formatIstTimeRange,
  localizePath,
} from '../utilities/locale';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { WebinarRegistrationForm } from '../components/WebinarRegistrationForm';
import { emitVerifiedPurchaseConversion } from '../utilities/analyticsAndConsent';

function formatCustomerPaymentState(state: string, locale: 'en' | 'hi'): string {
  switch (state) {
    case 'PAID_CONFIRMED':
      return locale === 'hi' ? 'सीट पुष्ट' : 'Seat Confirmed';
    case 'DRAFT':
      return locale === 'hi' ? 'सुरक्षित (भुगतान शेष)' : 'Saved (Payment Pending)';
    case 'PAYMENT_INITIATED':
    case 'PENDING_VERIFICATION':
      return locale === 'hi' ? 'भुगतान प्रतीक्षारत' : 'Payment Pending';
    case 'PAYMENT_FAILED':
      return locale === 'hi' ? 'भुगतान असफल' : 'Payment Unsuccessful';
    case 'REFUND_PENDING':
      return locale === 'hi' ? 'रिफंड प्रक्रियाधीन' : 'Refund Pending';
    case 'REFUNDED':
      return locale === 'hi' ? 'रिफंड पूर्ण' : 'Refunded';
    case 'EXPIRED':
      return locale === 'hi' ? 'समय समाप्त' : 'Expired';
    case 'MANUAL_REVIEW':
      return locale === 'hi' ? 'सत्यापन समीक्षा में' : 'Under Review';
    default:
      return state;
  }
}

export function WebinarRegistrationPage({
  mode = 'register',
}: {
  mode?: 'register' | 'status';
}) {
  const { locale, selectedSessionId, selectWebinarSession } = useBonnza();
  const [searchParams] = useSearchParams();

  const [lookupRef, setLookupRef] = useState(searchParams.get('ref') || '');
  const [lookupToken, setLookupToken] = useState(searchParams.get('token') || '');
  const [statusData, setStatusData] = useState<{
    registrationReference: string;
    fullName: string;
    email: string;
    sessionId: WebinarSessionId;
    paymentState: string;
    seatConfirmed: boolean;
    transferCount: number;
    order: {
      orderNumber: string;
      receiptNumber: string | null;
      totalPayablePaise: number;
      totalPayableInr: number;
      status: string;
    } | null;
  } | null>(null);
  const [joinCheckMessage, setJoinCheckMessage] = useState<string | null>(null);
  const [transferFeedback, setTransferFeedback] = useState<string | null>(null);

  const upcomingGroups = getUpcomingWebinarGroups();
  const dec5Group = getPromotedWebinarGroup();
  const selectedSession =
    WEBINAR_SESSIONS.find((s) => s.id === selectedSessionId) || DEC5_WEBINAR_SESSIONS[0];
  const activeDateGroup =
    upcomingGroups.find(
      (g) => g.enSession.id === selectedSession.id || g.hiSession.id === selectedSession.id
    ) || dec5Group;

  useEffect(() => {
    const refParam = searchParams.get('ref');
    if (refParam && mode === 'status') {
      handleLookupRegistration(refParam);
    }
  }, [mode, searchParams]);

  const handleLookupRegistration = async (refOverride?: string) => {
    const refToFetch = (refOverride ?? lookupRef).trim();
    if (!refToFetch) return;
    setJoinCheckMessage(null);
    setTransferFeedback(null);
    try {
      const res = await fetch(`/api/v1/registrations/${encodeURIComponent(refToFetch)}/status`);
      const data = await res.json();
      if (!res.ok) {
        setStatusData(null);
        setJoinCheckMessage(data.message || 'Registration reference not found.');
        return;
      }
      setStatusData(data);
      if (data.paymentState === 'PAID_CONFIRMED' && data.seatConfirmed && data.order?.orderNumber) {
        emitVerifiedPurchaseConversion({
          orderNumber: data.order.orderNumber,
          sessionId: data.sessionId,
          amountPaise: data.order.totalPayablePaise,
          currency: 'INR',
          paymentState: data.paymentState,
          seatConfirmed: data.seatConfirmed,
          locale,
        });
      }
    } catch {
      setJoinCheckMessage('Failed to fetch registration status.');
    }
  };

  const handleCheckJoinDetails = async () => {
    if (!statusData) return;
    setJoinCheckMessage(null);
    try {
      const res = await fetch(
        `/api/v1/registrations/${encodeURIComponent(
          statusData.registrationReference
        )}/join-details`,
        {
          headers: {
            'x-registration-token': lookupToken.trim(),
          },
        }
      );
      const data = await res.json();
      if (!res.ok || !data.allowed) {
        setJoinCheckMessage(
          data.message ||
            (locale === 'hi'
              ? 'भुगतान की पुष्टि होने के बाद ही मीटिंग लिंक अनलॉक होता है।'
              : 'Joining instructions unlock once your workshop payment is confirmed.')
        );
        return;
      }
      setJoinCheckMessage(
        `${data.joiningInstructions?.[locale] || data.joiningInstructions?.en} ${
          data.privateMeetingUrl
            ? `Room URL: ${data.privateMeetingUrl}`
            : '(Private room link will be posted by the webinar operator prior to session start.)'
        }`
      );
    } catch {
      setJoinCheckMessage('Could not verify joining instructions.');
    }
  };

  const handleRequestTransfer = async () => {
    if (!statusData) return;
    setTransferFeedback(null);
    const targetSessionId = (
      statusData.sessionId.endsWith('-en-1300')
        ? statusData.sessionId.replace('-en-1300', '-hi-1600')
        : statusData.sessionId.replace('-hi-1600', '-en-1300')
    ) as WebinarSessionId;

    try {
      const res = await fetch(
        `/api/v1/registrations/${encodeURIComponent(
          statusData.registrationReference
        )}/transfer`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-registration-token': lookupToken.trim(),
          },
          body: JSON.stringify({ targetSessionId }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setTransferFeedback(data.message || 'Transfer request rejected.');
        return;
      }
      setTransferFeedback(
        locale === 'hi'
          ? `सत्र सफलतापूर्वक ${data.sessionId} में स्थानांतरित कर दिया गया है।`
          : `Session successfully transferred to ${data.sessionId}.`
      );
      handleLookupRegistration(statusData.registrationReference);
    } catch {
      setTransferFeedback('Could not complete session transfer.');
    }
  };

  return (
    <div className="bonnza-container py-10 sm:py-14 space-y-10">
      <SeoHead
        locale={locale}
        title={
          locale === 'hi'
            ? 'वर्कशॉप पंजीकरण और चेकआउट स्थिति | Bonnza'
            : 'Workshop Registration & Checkout Status | Bonnza'
        }
        description="Register for Bonnza's 90-minute live beginner ecommerce workshop or verify your registration and payment status."
        path={localizePath(
          mode === 'status' ? '/webinars/payment-status' : '/webinars/register',
          locale
        )}
        allowIndex={false}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: locale === 'hi' ? 'होम' : 'Home', to: localizePath('/', locale) },
          {
            label: locale === 'hi' ? 'लाइव वर्कशॉप' : 'Live Workshop',
            to: localizePath('/webinars/first-online-business', locale),
          },
          {
            label:
              mode === 'status'
                ? locale === 'hi'
                  ? 'भुगतान स्थिति'
                  : 'Payment status'
                : locale === 'hi'
                ? 'पंजीकरण'
                : 'Registration',
          },
        ]}
      />

      {mode === 'register' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7 rounded-[20px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 sm:p-8 space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A]">
              {locale === 'hi'
                ? 'वर्कशॉप पंजीकरण विवरण'
                : 'Workshop registration details'}
            </h1>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-[#1A1B1A]">
                  {locale === 'hi'
                    ? `${activeDateGroup.dateLabel.hi} — सत्र भाषा चुनें:`
                    : `${activeDateGroup.dateLabel.en} — Select your session language:`}
                </p>
                {activeDateGroup.date !== '2026-12-05' ? (
                  <button
                    type="button"
                    onClick={() => selectWebinarSession(DEC5_WEBINAR_SESSIONS[0].id)}
                    className="text-xs font-semibold underline text-[#1A1B1A]"
                  >
                    {locale === 'hi'
                      ? '5 दिसंबर 2026 (₹299) पर वापस जाएं'
                      : 'Switch to 5 December 2026 (₹299)'}
                  </button>
                ) : (
                  <Link
                    to={localizePath('/webinars/first-online-business', locale)}
                    className="text-xs text-[#666A65] hover:text-[#1A1B1A] underline underline-offset-4"
                  >
                    {locale === 'hi'
                      ? 'अन्य तिथियों के लिए लाइव वर्कशॉप पृष्ठ देखें'
                      : 'Need a future date? View Live Workshop page'}
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[activeDateGroup.enSession, activeDateGroup.hiSession].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => selectWebinarSession(s.id)}
                    className={`p-3.5 rounded-[12px] border text-left text-xs transition-colors ${
                      s.id === selectedSession.id
                        ? 'border-[#1A1B1A] bg-[#FAF9F5] font-semibold'
                        : 'border-[#E6E6DF] bg-[#FFFFFF] text-[#666A65] hover:border-[#1A1B1A]/40'
                    }`}
                  >
                    <p className="text-sm text-[#1A1B1A]">
                      {s.instructionLocale === 'en'
                        ? locale === 'hi'
                          ? 'अंग्रेज़ी सत्र (1:00 PM IST)'
                          : 'English Session (1:00 PM IST)'
                        : locale === 'hi'
                        ? 'हिंदी सत्र (4:00 PM IST)'
                        : 'Hindi Session (4:00 PM IST)'}
                    </p>
                    <p className="mt-1 text-xs text-[#666A65] tabular-nums">
                      {formatIstDate(s.startUtc, locale)} ·{' '}
                      <span className="line-through mr-1">
                        {formatInr(s.originalTicketPriceInr, locale)}
                      </span>
                      <span className="font-bold text-[#1A1B1A]">
                        {formatInr(s.workingTicketPriceInr, locale)}
                      </span>
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <WebinarRegistrationForm
              locale={locale}
              session={selectedSession}
              source="webinar_registration_page"
              onSuccess={(result) => {
                setLookupRef(result.registration.registrationReference);
                setLookupToken(result.registration.accessToken);
              }}
            />
          </div>

          <aside className="lg:col-span-5 rounded-[20px] bg-[#202220] text-[#FAF9F5] p-6 sm:p-8 space-y-5 border border-white/10">
            <h2 className="text-lg font-bold text-white">
              {locale === 'hi' ? 'चयनित सत्र सारांश' : 'Selected session summary'}
            </h2>
            <div className="space-y-2 text-sm border-b border-white/10 pb-4">
              <p className="font-semibold text-[#F4C940]">{selectedSession.title[locale]}</p>
              <p className="text-[#FAF9F5]/80 tabular-nums">
                {formatIstDate(selectedSession.startUtc, locale)}
              </p>
              <p className="text-[#FAF9F5]/80 tabular-nums">
                {formatIstTimeRange(selectedSession.startUtc, selectedSession.endUtc, locale)}
              </p>
              <p className="text-xs text-[#FAF9F5]/70">
                {selectedSession.instructionLocale === 'en'
                  ? locale === 'hi'
                    ? 'अंग्रेज़ी माध्यम · 90 मिनट लाइव'
                    : 'English Language · 90 minutes live'
                  : locale === 'hi'
                  ? 'हिंदी माध्यम · 90 मिनट लाइव'
                  : 'Hindi Language · 90 minutes live'}
              </p>
            </div>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-[#FAF9F5]/80">
                {locale === 'hi' ? 'वर्कशॉप टिकट शुल्क' : 'Workshop ticket'}
              </span>
              <div className="flex items-baseline gap-2 tabular-nums">
                <span className="text-sm text-[#FAF9F5]/50 line-through">
                  {formatInr(selectedSession.originalTicketPriceInr, locale)}
                </span>
                <span className="text-xl font-bold text-[#F4C940]">
                  {formatInr(selectedSession.workingTicketPriceInr, locale)}
                </span>
              </div>
            </div>
            <p className="text-xs text-[#FAF9F5]/70">{selectedSession.taxNote[locale]}</p>
            <Link
              to={localizePath('/webinars/payment-status', locale)}
              className="inline-block text-xs text-[#F4C940] underline underline-offset-4 pt-2"
            >
              {locale === 'hi'
                ? 'पंजीकरण संदर्भ स्थिति जांचें और सत्र स्थानांतरण देखें'
                : 'Check registration status, session transfer & verification'}
            </Link>
          </aside>
        </div>
      ) : (
        <div className="space-y-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1B1A]">
            {locale === 'hi'
              ? 'पंजीकरण और भुगतान स्थिति सत्यापन'
              : 'Registration & Payment Status Verification'}
          </h1>

          {/* Live Registration Lookup & Transfer Box */}
          <div className="rounded-[20px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 sm:p-8 space-y-5">
            <h2 className="text-lg font-bold text-[#1A1B1A]">
              {locale === 'hi'
                ? 'अपना पंजीकरण संदर्भ (Registration Reference) जांचें'
                : 'Look up your registration reference'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={lookupRef}
                onChange={(e) => setLookupRef(e.target.value)}
                placeholder="e.g. BNZ-2026-0001"
                className="min-h-[44px] rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] px-3 py-2 text-sm font-mono-tabular text-[#1A1B1A] focus:border-[#1A1B1A] focus:outline-none"
              />
              <input
                type="text"
                value={lookupToken}
                onChange={(e) => setLookupToken(e.target.value)}
                placeholder={
                  locale === 'hi'
                    ? 'एक्सेस टोकन (वैकल्पिक — मीटिंग लिंक/स्थानांतरण हेतु)'
                    : 'Attendee token (for join details / transfer)'
                }
                className="min-h-[44px] rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] px-3 py-2 text-sm font-mono-tabular text-[#1A1B1A] focus:border-[#1A1B1A] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleLookupRegistration()}
                className="min-h-[44px] px-5 py-2.5 rounded-[10px] bg-[#1A1B1A] hover:bg-black text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Search size={15} aria-hidden="true" />
                {locale === 'hi' ? 'स्थिति जांचें' : 'Check status'}
              </button>
            </div>

            {statusData && (
              <div className="border-t border-[#E6E6DF] pt-5 space-y-3 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-[#1A1B1A]">
                      {statusData.fullName}
                      {statusData.email && !statusData.email.endsWith('@phone.bonnza.local')
                        ? ` (${statusData.email})`
                        : ''}
                    </p>
                    <p className="text-xs font-mono-tabular text-[#666A65]">
                      Ref: {statusData.registrationReference} ·{' '}
                      {statusData.sessionId.endsWith('-hi-1600')
                        ? locale === 'hi'
                          ? 'हिंदी लाइव सत्र (4:00 PM IST)'
                          : 'Hindi Session (4:00 PM IST)'
                        : locale === 'hi'
                        ? 'अंग्रेज़ी लाइव सत्र (1:00 PM IST)'
                        : 'English Session (1:00 PM IST)'}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#1A1B1A]">
                    {formatCustomerPaymentState(statusData.paymentState, locale)}
                  </span>
                </div>

                {statusData.order && (
                  <p className="text-xs font-mono-tabular text-[#666A65]">
                    {locale === 'hi' ? 'ऑर्डर:' : 'Order:'} {statusData.order.orderNumber} ·{' '}
                    {formatInr(statusData.order.totalPayableInr, locale)}
                    {statusData.order.receiptNumber
                      ? ` · ${locale === 'hi' ? 'रसीद:' : 'Receipt:'} ${statusData.order.receiptNumber}`
                      : ''}
                  </p>
                )}

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCheckJoinDetails}
                    className="min-h-[40px] px-4 py-2 rounded-[10px] border border-[#1A1B1A] bg-[#FFFFFF] hover:bg-[#FAF9F5] text-xs font-semibold text-[#1A1B1A]"
                  >
                    {locale === 'hi'
                      ? 'निजी मीटिंग निर्देश जांचें'
                      : 'Verify joining instructions access'}
                  </button>
                  <button
                    type="button"
                    onClick={handleRequestTransfer}
                    className="min-h-[40px] px-4 py-2 rounded-[10px] border border-[#E6E6DF] bg-[#FFFFFF] hover:bg-[#FAF9F5] text-xs font-semibold text-[#1A1B1A] inline-flex items-center gap-1.5"
                  >
                    <ArrowRightLeft size={14} aria-hidden="true" />
                    {locale === 'hi'
                      ? 'अन्य भाषा सत्र में स्थानांतरित करें (एक बार)'
                      : 'Request 1-time session transfer'}
                  </button>
                </div>
              </div>
            )}

            {joinCheckMessage && (
              <p className="text-xs text-[#1A1B1A] bg-[#F3F1E9] p-3.5 rounded-[10px] border border-[#E6E6DF]">
                {joinCheckMessage}
              </p>
            )}

            {transferFeedback && (
              <p className="text-xs text-[#1A1B1A] bg-[#E8EDDD] p-3.5 rounded-[10px] border border-[#E6E6DF]">
                {transferFeedback}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#E6E6DF] bg-[#FFFFFF]">
            <div className="border-r border-b border-[#E6E6DF] p-6 space-y-2">
              <Clock size={20} className="text-[#1A1B1A]" aria-hidden="true" />
              <h2 className="text-lg font-bold text-[#1A1B1A]">
                {locale === 'hi' ? 'भुगतान प्रतीक्षारत' : 'Payment Pending'}
              </h2>
              <p className="text-sm text-[#666A65]">
                {locale === 'hi'
                  ? 'ऑनलाइन भुगतान का सत्यापन पूरा होने तक सीट की पुष्टि नहीं होती।'
                  : 'Seat confirmation remains pending until online payment verification completes.'}
              </p>
            </div>

            <div className="border-r border-b border-[#E6E6DF] p-6 space-y-2">
              <XCircle size={20} className="text-[#666A65]" aria-hidden="true" />
              <h2 className="text-lg font-bold text-[#1A1B1A]">
                {locale === 'hi' ? 'भुगतान असफल' : 'Payment Unsuccessful'}
              </h2>
              <p className="text-sm text-[#666A65]">
                {locale === 'hi'
                  ? 'भुगतान पूरा न होने पर कोई टिकट जारी नहीं होता और आप सुरक्षित रूप से पुनः प्रयास कर सकते हैं।'
                  : 'No ticket or meeting link is issued on failed payments; you can safely retry.'}
              </p>
            </div>

            <div className="border-r border-b border-[#E6E6DF] bg-[#E8EDDD]/65 p-6 space-y-2">
              {statusData?.seatConfirmed ? (
                <CheckCircle2 size={20} className="text-[#1A1B1A]" aria-hidden="true" />
              ) : (
                <ShieldCheck size={20} className="text-[#1A1B1A]" aria-hidden="true" />
              )}
              <h2 className="text-lg font-bold text-[#1A1B1A]">
                {locale === 'hi' ? 'सीट पुष्ट' : 'Seat Confirmed'}
              </h2>
              <p className="text-sm text-[#666A65]">
                {locale === 'hi'
                  ? 'भुगतान की पुष्टि होते ही आपकी सीट सक्रिय हो जाती है और निजी सत्र लिंक उपलब्ध होता है।'
                  : 'Activated automatically after payment verification to unlock private session access.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#666A65]">
            <AlertCircle size={14} aria-hidden="true" />
            <span>
              {locale === 'hi'
                ? 'निजी सत्र लिंक केवल पुष्ट प्रतिभागियों के साथ उनके एक्सेस टोकन के माध्यम से साझा किया जाता है।'
                : 'Private workshop links are shared strictly with confirmed attendees using their registration token.'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
