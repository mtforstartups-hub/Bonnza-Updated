import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { Locale, WebinarSessionId, WebinarSessionRecord } from '../domain/types';
import { BONNZA_CONFIG } from '../domain/config';
import { formatInr, formatIstDate, formatIstTimeRange, localizePath } from '../utilities/locale';
import { recordAnalyticsEvent } from '../integrations/futureInterfaces';

export interface SubmittedRegistrationPayload {
  registration: {
    registrationReference: string;
    sessionId: WebinarSessionId;
    sessionLocale: 'en' | 'hi';
    uiLocale: 'en' | 'hi';
    fullName: string;
    email: string;
    phone: string;
    businessInterest: string;
    paymentState: string;
    seatConfirmed: boolean;
    accessToken: string;
    createdAt: string;
  };
  order: {
    orderNumber: string;
    currency: 'INR';
    subtotalPaise: number;
    taxPaise: number;
    totalPayablePaise: number;
    totalPayableInr: number;
    status: string;
    razorpayOrderId: string | null;
  };
  reusedExistingDraft?: boolean;
  alreadyPaidConfirmed?: boolean;
  checkoutEnabled?: boolean;
  razorpayCheckoutUrl?: string | null;
}

export function WebinarRegistrationForm({
  locale,
  session,
  source = 'registration_page',
  onSuccess,
}: {
  locale: Locale;
  session: WebinarSessionRecord;
  source?: string;
  onSuccess?: (result: SubmittedRegistrationPayload) => void;
}) {
  const [searchParams] = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [validationMsg, setValidationMsg] = useState<string | null>(null);
  const [submittedResult, setSubmittedResult] = useState<SubmittedRegistrationPayload | null>(null);
  const [redirectingToRazorpay, setRedirectingToRazorpay] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationMsg(null);

    if (!fullName.trim() || fullName.trim().length < 2) {
      setValidationMsg(
        locale === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.'
      );
      return;
    }

    const trimmedEmail = email.trim();
    if (trimmedEmail.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setValidationMsg(
        locale === 'hi'
          ? 'कृपया एक मान्य ईमेल पता दर्ज करें या इसे खाली छोड़ दें।'
          : 'Please enter a valid email address or leave it blank.'
      );
      return;
    }

    const trimmedPhone = phone.trim();
    const cleanedDigits = trimmedPhone.replace(/[\s\-+()]/g, '');
    if (!trimmedPhone || !/^\d{8,15}$/.test(cleanedDigits)) {
      setValidationMsg(
        locale === 'hi'
          ? 'कृपया एक मान्य मोबाइल / WhatsApp नंबर दर्ज करें।'
          : 'Please enter a valid 10-digit Mobile / WhatsApp number.'
      );
      return;
    }

    setSubmitting(true);
    recordAnalyticsEvent({
      event: 'registration_started',
      locale,
      path: window.location.pathname,
      metadata: { sessionId: session.id, source },
    });

    try {
      const res = await fetch('/api/v1/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: trimmedEmail,
          phone: trimmedPhone,
          sessionId: session.id,
          uiLocale: locale,
          businessInterest: 'unsure',
          termsAccepted: true,
          marketingOptIn: false,
          utm: {
            utm_source: searchParams.get('utm_source') || source,
            utm_medium: searchParams.get('utm_medium') || undefined,
            utm_campaign: searchParams.get('utm_campaign') || 'dec_5_2026_cohort',
            utm_content: searchParams.get('utm_content') || undefined,
            utm_term: searchParams.get('utm_term') || undefined,
            landing_path: window.location.pathname,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setValidationMsg(
          data.message ||
            (locale === 'hi'
              ? 'पंजीकरण पूरा नहीं हो सका। कृपया विवरण जांचें।'
              : 'Could not complete registration. Please check your details.')
        );
        setSubmitting(false);
        return;
      }

      const payload = data as SubmittedRegistrationPayload;
      onSuccess?.(payload);

      const targetCheckoutUrl =
        (payload.razorpayCheckoutUrl || '').trim() || BONNZA_CONFIG.razorpayCheckoutUrl;

      if (targetCheckoutUrl && /^https?:\/\//i.test(targetCheckoutUrl)) {
        setRedirectingToRazorpay(true);
        window.location.assign(targetCheckoutUrl);
        return;
      }

      setSubmittedResult(payload);
    } catch {
      setValidationMsg(
        locale === 'hi'
          ? 'सर्वर से जुड़ने में समस्या हुई। कृपया पुनः प्रयास करें।'
          : 'Could not reach registration server. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (redirectingToRazorpay) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[18px] border border-[#1A1B1A] bg-[#FAF9F5] p-6 sm:p-8 text-center space-y-4"
      >
        <div className="mx-auto h-11 w-11 rounded-full border-2 border-[#1A1B1A] border-t-transparent animate-spin" />
        <h3 className="text-lg font-bold text-[#1A1B1A]">
          {locale === 'hi'
            ? 'Razorpay चेकआउट पर ले जाया जा रहा है...'
            : 'Redirecting to Razorpay Checkout...'}
        </h3>
        <p className="text-sm text-[#666A65]">
          {locale === 'hi'
            ? 'कृपया प्रतीक्षा करें, हम आपका भुगतान पृष्ठ खोल रहे हैं।'
            : 'Please wait while we open your secure payment page.'}
        </p>
      </div>
    );
  }

  if (submittedResult) {
    return (
      <motion.div
        role="status"
        aria-live="polite"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[18px] border-2 border-[#1A1B1A] bg-[#FAF9F5] p-6 sm:p-8 space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex items-center justify-center h-14 w-14 shrink-0">
            {!shouldReduceMotion && (
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0.75, opacity: 0.65 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-[#F4C940]"
              />
            )}
            <div className="relative h-12 w-12 rounded-full bg-[#1A1B1A] text-[#F4C940] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-mono-tabular font-bold text-[#666A65]">
              {locale === 'hi' ? 'आवेदन संदर्भ:' : 'Application Reference:'}{' '}
              <span className="text-[#1A1B1A]">
                {submittedResult.registration.registrationReference}
              </span>
            </p>
            <h3 className="text-xl font-extrabold text-[#1A1B1A] leading-snug">
              {locale === 'hi'
                ? 'हमें आपका आवेदन प्राप्त हो गया है; हमारी टीम ऑनबोर्डिंग के लिए आपसे संपर्क करेगी।'
                : 'We have received your application; our team will get in touch to onboard you.'}
            </h3>
          </div>
        </div>

        <div className="border-y border-[#E6E6DF] py-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs tabular-nums">
          <div>
            <p className="text-[#666A65]">
              {locale === 'hi' ? 'चयनित सत्र' : 'Selected Session'}
            </p>
            <p className="font-bold text-[#1A1B1A] mt-0.5">
              {formatIstDate(session.startUtc, locale)} ·{' '}
              {formatIstTimeRange(session.startUtc, session.endUtc, locale)}
            </p>
          </div>
          <div>
            <p className="text-[#666A65]">
              {locale === 'hi' ? 'प्रतिभागी विवरण' : 'Applicant'}
            </p>
            <p className="font-bold text-[#1A1B1A] mt-0.5">
              {submittedResult.registration.fullName} · {submittedResult.registration.phone}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <Link
            to={`${localizePath('/webinars/payment-status', locale)}?ref=${encodeURIComponent(
              submittedResult.registration.registrationReference
            )}&token=${encodeURIComponent(submittedResult.registration.accessToken)}`}
            className="text-xs font-semibold text-[#1A1B1A] underline underline-offset-4 hover:text-black"
          >
            {locale === 'hi'
              ? 'आवेदन व भुगतान स्थिति देखें →'
              : 'View application & status lookup →'}
          </Link>

          <button
            type="button"
            onClick={() => {
              setSubmittedResult(null);
              setFullName('');
              setEmail('');
              setPhone('');
            }}
            className="text-xs font-semibold text-[#666A65] hover:text-[#1A1B1A] underline underline-offset-4"
          >
            {locale === 'hi' ? 'नया आवेदन दर्ज करें' : 'Submit another application'}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <label className="block space-y-1.5">
        <span className="block text-xs font-semibold text-[#1A1B1A]">
          {locale === 'hi' ? 'पूरा नाम (आवश्यक)' : 'Full name (required)'}
        </span>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder={locale === 'hi' ? 'अपना पूरा नाम दर्ज करें' : 'Enter your full name'}
          className="w-full min-h-[46px] rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] px-3.5 py-2 text-sm text-[#1A1B1A] transition-colors focus:border-[#1A1B1A] focus:bg-[#FFFFFF] focus:outline-none"
        />
      </label>

      <label className="block space-y-1.5">
        <span className="block text-xs font-semibold text-[#1A1B1A]">
          {locale === 'hi' ? 'ईमेल पता (वैकल्पिक)' : 'Email address (optional)'}
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full min-h-[46px] rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] px-3.5 py-2 text-sm text-[#1A1B1A] transition-colors focus:border-[#1A1B1A] focus:bg-[#FFFFFF] focus:outline-none"
        />
      </label>

      <label className="block space-y-1.5">
        <span className="block text-xs font-semibold text-[#1A1B1A]">
          {locale === 'hi'
            ? 'मोबाइल / WhatsApp नंबर (आवश्यक)'
            : 'Mobile / WhatsApp number (required)'}
        </span>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91 98XXXXXXXX"
          className="w-full min-h-[46px] rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] px-3.5 py-2 text-sm text-[#1A1B1A] transition-colors focus:border-[#1A1B1A] focus:bg-[#FFFFFF] focus:outline-none"
        />
      </label>

      {validationMsg && (
        <p
          role="alert"
          className="rounded-[8px] border border-[#1A1B1A]/30 bg-[#F4E6D4] px-3.5 py-2 text-xs font-semibold text-[#1A1B1A]"
        >
          {validationMsg}
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 min-h-[50px] px-6 py-3 rounded-[12px] bg-[#F4C940] hover:bg-[#eab924] text-sm font-bold text-[#1A1B1A] transition-colors whitespace-nowrap shrink-0 tabular-nums"
        >
          {submitting ? (
            <span>
              {locale === 'hi' ? 'पंजीकरण सहेजा जा रहा है...' : 'Submitting application...'}
            </span>
          ) : (
            <>
              <span>{locale === 'hi' ? 'अभी पंजीकरण करें —' : 'Register Now —'}</span>
              <span className="line-through opacity-60 font-medium">
                {formatInr(session.originalTicketPriceInr, locale)}
              </span>
              <span>{formatInr(session.workingTicketPriceInr, locale)}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
