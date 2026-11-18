import { useState } from 'react';
import { Mail, Phone, Info } from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import { BONNZA_CONFIG } from '../domain/config';
import { localizePath } from '../utilities/locale';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnimatedText, ScrollReveal } from '../components/MotionPrimitives';
import { recordAnalyticsEvent } from '../integrations/futureInterfaces';

export function ContactPage() {
  const { locale, contactDraft, setContactDraft } = useBonnza();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [ticketResult, setTicketResult] = useState<{
    ticketNumber: string;
    status: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !contactDraft.name.trim() ||
      !contactDraft.email.includes('@') ||
      !contactDraft.message.trim()
    ) {
      setErrorMsg(
        locale === 'hi'
          ? 'कृपया नाम, मान्य ईमेल और अपना संदेश दर्ज करें।'
          : 'Please enter your name, a valid email address, and your enquiry message.'
      );
      setTicketResult(null);
      return;
    }

    setErrorMsg(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactDraft.name.trim(),
          email: contactDraft.email.trim(),
          phone: contactDraft.phone.trim(),
          category: contactDraft.category,
          message: contactDraft.message.trim(),
          uiLocale: locale,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || 'Could not submit enquiry.');
        setSubmitting(false);
        return;
      }
      setTicketResult(data);
      recordAnalyticsEvent({
        event: 'contact_form_submitted',
        locale,
        path: window.location.pathname,
        metadata: { category: contactDraft.category, ticketNumber: data.ticketNumber },
      });
    } catch {
      setErrorMsg(
        locale === 'hi'
          ? 'सर्वर से संपर्क नहीं हो सका। कृपया पुनः प्रयास करें।'
          : 'Could not reach server. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    'w-full min-h-[44px] rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] px-3 py-2 text-sm text-[#1A1B1A] transition-colors focus:border-[#1A1B1A] focus:bg-[#FFFFFF] focus:outline-none';

  return (
    <div className="bonnza-container py-10 sm:py-14 space-y-12">
      <SeoHead
        locale={locale}
        title={locale === 'hi' ? 'संपर्क और सहायता | Bonnza' : 'Contact & Support | Bonnza'}
        description={`Contact Bonnza at ${BONNZA_CONFIG.contact.email} or ${BONNZA_CONFIG.contact.phoneDisplay}.`}
        path={localizePath('/contact', locale)}
        alternateEnPath="/en/contact"
        alternateHiPath="/hi/contact"
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: locale === 'hi' ? 'होम' : 'Home', to: localizePath('/', locale) },
          { label: locale === 'hi' ? 'संपर्क' : 'Contact' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#666A65]">
              {locale === 'hi' ? 'संपर्क और सहायता' : 'SUPPORT & CONTACT'}
            </p>
            <AnimatedText
              as="h1"
              className="text-3xl sm:text-4xl font-extrabold text-[#1A1B1A] text-balance"
            >
              {locale === 'hi' ? 'Bonnza से संपर्क करें' : 'Contact Bonnza'}
            </AnimatedText>
            <p className="text-base text-[#666A65] leading-relaxed">
              {locale === 'hi'
                ? 'वर्कशॉप सत्रों, प्रोग्राम संरचना या नीति प्रश्नों के लिए नीचे दिए गए ईमेल या फ़ोन पर संपर्क करें।'
                : 'Reach out using the confirmed support email or phone below for questions about the workshop, curriculum, or policies.'}
            </p>
          </div>

          <ScrollReveal delay={0.05}>
            <div className="border-y border-[#E6E6DF] divide-y divide-[#E6E6DF]">
              <div className="py-5 flex items-start gap-3">
                <Mail size={18} className="shrink-0 mt-1 text-[#1A1B1A]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-[#666A65]">
                    {locale === 'hi' ? 'सहायता ईमेल' : 'Support email'}
                  </p>
                  <a
                    href={`mailto:${BONNZA_CONFIG.contact.email}`}
                    className="text-base font-bold text-[#1A1B1A] underline decoration-[#E6E6DF] underline-offset-4 hover:decoration-[#1A1B1A]"
                  >
                    {BONNZA_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              <div className="py-5 flex items-start gap-3">
                <Phone size={18} className="shrink-0 mt-1 text-[#1A1B1A]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-[#666A65]">
                    {locale === 'hi' ? 'फ़ोन सहायता' : 'Phone support'}
                  </p>
                  <a
                    href={BONNZA_CONFIG.contact.phoneHref}
                    className="text-base font-bold font-mono-tabular text-[#1A1B1A] underline decoration-[#E6E6DF] underline-offset-4 hover:decoration-[#1A1B1A]"
                  >
                    {BONNZA_CONFIG.contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex items-start gap-2.5 text-xs text-[#666A65]">
              <Info size={16} className="shrink-0 mt-0.5 text-[#1A1B1A]" aria-hidden="true" />
              <p>
                {locale === 'hi'
                  ? 'कार्यालय का भौतिक पता, जीएसटीआईएन या निश्चित उत्तर-समय की गारंटी स्वीकृति से पहले यहाँ नहीं जोड़ी गई है।'
                  : 'Physical office hours and turnaround guarantees are omitted until formally established.'}
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="lg:col-span-7" delay={0.08}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-[20px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 sm:p-8 space-y-5"
          >
            <h2 className="text-xl font-bold text-[#1A1B1A]">
              {locale === 'hi' ? 'सहायता और पूछताछ फ़ॉर्म' : 'Support & enquiry form'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block space-y-1.5">
                <span className="block text-xs font-semibold text-[#1A1B1A]">
                  {locale === 'hi' ? 'आपका नाम' : 'Full name'}
                </span>
                <input
                  type="text"
                  required
                  value={contactDraft.name}
                  onChange={(e) => setContactDraft((d) => ({ ...d, name: e.target.value }))}
                  className={inputCls}
                />
              </label>
              <label className="block space-y-1.5">
                <span className="block text-xs font-semibold text-[#1A1B1A]">
                  {locale === 'hi' ? 'ईमेल पता' : 'Email address'}
                </span>
                <input
                  type="email"
                  required
                  value={contactDraft.email}
                  onChange={(e) => setContactDraft((d) => ({ ...d, email: e.target.value }))}
                  className={inputCls}
                />
              </label>
              <label className="block space-y-1.5">
                <span className="block text-xs font-semibold text-[#1A1B1A]">
                  {locale === 'hi' ? 'फ़ोन (वैकल्पिक)' : 'Phone (optional)'}
                </span>
                <input
                  type="tel"
                  value={contactDraft.phone}
                  onChange={(e) => setContactDraft((d) => ({ ...d, phone: e.target.value }))}
                  className={inputCls}
                />
              </label>
              <label className="block space-y-1.5">
                <span className="block text-xs font-semibold text-[#1A1B1A]">
                  {locale === 'hi' ? 'पूछताछ श्रेणी' : 'Enquiry category'}
                </span>
                <select
                  value={contactDraft.category}
                  onChange={(e) => setContactDraft((d) => ({ ...d, category: e.target.value }))}
                  className={inputCls}
                >
                  <option value="workshop">
                    {locale === 'hi' ? 'लाइव वर्कशॉप (5 दिसंबर 2026)' : 'Live Workshop (5 Dec 2026)'}
                  </option>
                  <option value="programme">
                    {locale === 'hi' ? 'पूर्ण प्रोग्राम' : 'Complete Programme'}
                  </option>
                  <option value="paths">
                    {locale === 'hi' ? 'रीसेल / क्राफ्ट टू कॉमर्स' : 'Resell / Craft to Commerce'}
                  </option>
                  <option value="support">
                    {locale === 'hi' ? 'सहायता या नीति प्रश्न' : 'Support or Policy Question'}
                  </option>
                </select>
              </label>
            </div>

            <label className="block space-y-1.5">
              <span className="block text-xs font-semibold text-[#1A1B1A]">
                {locale === 'hi' ? 'आपका संदेश' : 'Your message'}
              </span>
              <textarea
                rows={4}
                required
                value={contactDraft.message}
                onChange={(e) => setContactDraft((d) => ({ ...d, message: e.target.value }))}
                className="w-full rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] p-3 text-sm text-[#1A1B1A] transition-colors focus:border-[#1A1B1A] focus:bg-[#FFFFFF] focus:outline-none"
              />
            </label>

            {errorMsg && (
              <p
                role="alert"
                className="rounded-[8px] border border-[#1A1B1A]/30 bg-[#F4E6D4] px-3.5 py-2 text-xs font-semibold text-[#1A1B1A]"
              >
                {errorMsg}
              </p>
            )}

            {ticketResult && (
              <div className="rounded-[12px] border border-[#E6E6DF] bg-[#E8EDDD] p-4 text-xs text-[#1A1B1A] space-y-1">
                <p className="font-bold">
                  {locale === 'hi'
                    ? `आपका सहायता टिकट (${ticketResult.ticketNumber}) दर्ज कर लिया गया है`
                    : `Your support ticket (${ticketResult.ticketNumber}) has been logged`}
                </p>
                <p>
                  {locale === 'hi'
                    ? `स्थिति: ${ticketResult.status}। आपकी पावती दर्ज कर ली गई है या आप सीधे ${BONNZA_CONFIG.contact.email} पर भी लिख सकते हैं।`
                    : `Status: ${ticketResult.status}. An acknowledgement confirmation is on record, or you may write directly to ${BONNZA_CONFIG.contact.email}.`}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="min-h-[48px] px-6 py-3 rounded-[12px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] font-semibold text-sm transition-colors"
            >
              {submitting
                ? locale === 'hi'
                  ? 'भेजा जा रहा है...'
                  : 'Submitting...'
                : locale === 'hi'
                ? 'पूछताछ दर्ज करें'
                : 'Submit enquiry'}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </div>
  );
}
