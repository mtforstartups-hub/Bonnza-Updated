import { useEffect, useState } from 'react';
import { ShieldCheck, SlidersHorizontal, X } from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import {
  BONNZA_CONSENT_VERSION,
  getConsentRecord,
  saveConsentPreferences,
  syncThirdPartyCollectorsWithConsent,
} from '../utilities/analyticsAndConsent';

export function ConsentBannerModal() {
  const { locale } = useBonnza();
  const [consent, setConsent] = useState(() => getConsentRecord());
  const [modalOpen, setModalOpen] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(consent.categories.analytics);
  const [marketingChecked, setMarketingChecked] = useState(consent.categories.marketing);

  useEffect(() => {
    syncThirdPartyCollectorsWithConsent(consent);

    const handleOpenModal = () => {
      const latest = getConsentRecord();
      setConsent(latest);
      setAnalyticsChecked(latest.categories.analytics);
      setMarketingChecked(latest.categories.marketing);
      setModalOpen(true);
    };

    const handleConsentUpdated = () => {
      const latest = getConsentRecord();
      setConsent(latest);
      setAnalyticsChecked(latest.categories.analytics);
      setMarketingChecked(latest.categories.marketing);
    };

    window.addEventListener('bonnza:open-consent-modal', handleOpenModal);
    window.addEventListener('bonnza:consent-updated', handleConsentUpdated);
    return () => {
      window.removeEventListener('bonnza:open-consent-modal', handleOpenModal);
      window.removeEventListener('bonnza:consent-updated', handleConsentUpdated);
    };
  }, []);

  const handleAcceptAll = () => {
    const updated = saveConsentPreferences({ analytics: true, marketing: true });
    setConsent(updated);
    setModalOpen(false);
  };

  const handleRejectNonEssential = () => {
    const updated = saveConsentPreferences({ analytics: false, marketing: false });
    setConsent(updated);
    setModalOpen(false);
  };

  const handleSaveCustom = () => {
    const updated = saveConsentPreferences({
      analytics: analyticsChecked,
      marketing: marketingChecked,
    });
    setConsent(updated);
    setModalOpen(false);
  };

  if (consent.decidedByUser && !modalOpen) {
    return null;
  }

  return (
    <>
      {/* Non-intrusive bottom consent banner when user hasn't decided yet */}
      {!consent.decidedByUser && !modalOpen && (
        <aside
          aria-label={
            locale === 'hi' ? 'कुकी और गोपनीयता प्राथमिकताएं' : 'Cookie and privacy preferences'
          }
          className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-4xl rounded-[18px] border border-[#1A1B1A]/20 bg-[#1A1B1A] text-[#FAF9F5] p-4 sm:p-5 shadow-xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 text-xs sm:text-sm max-w-2xl">
              <p className="font-bold text-[#F4C940] flex items-center gap-2">
                <ShieldCheck size={16} aria-hidden="true" />
                {locale === 'hi'
                  ? 'डेटा गोपनीयता और एनालिटिक्स सहमति'
                  : 'Privacy-first cookie & analytics controls'}
              </p>
              <p className="text-[#FAF9F5]/85 leading-relaxed">
                {locale === 'hi'
                  ? 'हम भाषा और सत्र चयन के लिए केवल आवश्यक कुकीज़ का उपयोग करते हैं। वैकल्पिक एनालिटिक्स (GA4, Clarity) और मार्केटिंग (Meta Pixel) आपकी स्पष्ट अनुमति के बिना बंद रहते हैं।'
                  : 'We use strictly necessary storage for your language and workshop session selection. Optional analytics (GA4, Clarity) and advertising attribution (Meta Pixel) remain disabled unless you opt in.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="min-h-[40px] px-3.5 py-2 rounded-[10px] border border-white/25 text-xs font-semibold text-[#FAF9F5] hover:bg-white/10"
              >
                {locale === 'hi' ? 'गैर-आवश्यक अस्वीकार करें' : 'Reject non-essential'}
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="min-h-[40px] px-3.5 py-2 rounded-[10px] border border-white/25 text-xs font-semibold text-[#FAF9F5] hover:bg-white/10 inline-flex items-center gap-1.5"
              >
                <SlidersHorizontal size={13} aria-hidden="true" />
                {locale === 'hi' ? 'प्राथमिकताएं चुनें' : 'Manage preferences'}
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="min-h-[40px] px-4 py-2 rounded-[10px] bg-[#F4C940] hover:bg-[#eab924] text-xs font-semibold text-[#1A1B1A]"
              >
                {locale === 'hi' ? 'सभी स्वीकार करें' : 'Accept all'}
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Granular Preferences Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="consent-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <div className="w-full max-w-lg rounded-[20px] border border-[#E6E6DF] bg-[#FAF9F5] text-[#1A1B1A] p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#666A65]">
                  Consent Schema v{BONNZA_CONSENT_VERSION}
                </p>
                <h2 id="consent-modal-title" className="text-xl font-bold text-[#1A1B1A]">
                  {locale === 'hi'
                    ? 'गोपनीयता और कुकी प्राथमिकताएं'
                    : 'Privacy & Cookie Preferences'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close preferences"
                className="p-1.5 rounded-lg border border-[#E6E6DF] bg-white text-[#1A1B1A]"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Category 1: Strictly Necessary */}
              <div className="rounded-[12px] border border-[#E6E6DF] bg-white p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1A1B1A]">
                    {locale === 'hi'
                      ? '1. अत्यंत आवश्यक (Strictly necessary)'
                      : '1. Strictly necessary'}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#E8EDDD] font-mono-tabular font-semibold text-[11px]">
                    {locale === 'hi' ? 'हमेशा सक्रिय' : 'Always active'}
                  </span>
                </div>
                <p className="text-[#666A65] leading-relaxed">
                  {locale === 'hi'
                    ? 'अंग्रेज़ी/हिंदी भाषा चयन, वर्कशॉप सत्र चयन, सुरक्षा (CSRF) और कुकी सहमति स्थिति संग्रहीत करता है।'
                    : 'Stores your English/Hindi language selection, selected workshop session, CSRF security tokens, and consent state.'}
                </p>
              </div>

              {/* Category 2: Analytics */}
              <label className="block rounded-[12px] border border-[#E6E6DF] bg-white p-4 space-y-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1A1B1A]">
                    {locale === 'hi'
                      ? '2. एनालिटिक्स और UX सुधार (Analytics)'
                      : '2. Analytics & UX measurement'}
                  </span>
                  <input
                    type="checkbox"
                    checked={analyticsChecked}
                    onChange={(e) => setAnalyticsChecked(e.target.checked)}
                    className="h-4 w-4 rounded border-[#1A1B1A]"
                  />
                </div>
                <p className="text-[#666A65] leading-relaxed">
                  {locale === 'hi'
                    ? 'Google Analytics 4 और Microsoft Clarity को बिना किसी व्यक्तिगत जानकारी (नाम/ईमेल/फ़ोन रहित) के पृष्ठ प्रदर्शन मापने की अनुमति देता है।'
                    : 'Allows Google Analytics 4 and Microsoft Clarity to measure page performance and funnel steps with all PII (name, email, phone) stripped.'}
                </p>
              </label>

              {/* Category 3: Advertising / Marketing */}
              <label className="block rounded-[12px] border border-[#E6E6DF] bg-white p-4 space-y-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1A1B1A]">
                    {locale === 'hi'
                      ? '3. विज्ञापन और अभियान एट्रिब्यूशन (Marketing)'
                      : '3. Advertising & campaign attribution'}
                  </span>
                  <input
                    type="checkbox"
                    checked={marketingChecked}
                    onChange={(e) => setMarketingChecked(e.target.checked)}
                    className="h-4 w-4 rounded border-[#1A1B1A]"
                  />
                </div>
                <p className="text-[#666A65] leading-relaxed">
                  {locale === 'hi'
                    ? 'जब कॉन्फ़िगर किया गया हो, तो अभियान प्रदर्शन मापने के लिए Meta Pixel को सक्षम करता है।'
                    : 'Enables Meta Pixel campaign attribution when configured. Unchecked by default.'}
                </p>
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E6E6DF]">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="min-h-[40px] px-3.5 py-2 rounded-[10px] border border-[#E6E6DF] bg-white text-xs font-semibold text-[#1A1B1A]"
              >
                {locale === 'hi' ? 'केवल आवश्यक रखें' : 'Reject non-essential'}
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="min-h-[40px] px-4 py-2 rounded-[10px] bg-[#1A1B1A] text-white text-xs font-semibold"
                >
                  {locale === 'hi' ? 'प्राथमिकताएं सहेजें' : 'Save preferences'}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="min-h-[40px] px-4 py-2 rounded-[10px] bg-[#F4C940] text-[#1A1B1A] text-xs font-semibold"
                >
                  {locale === 'hi' ? 'सभी स्वीकार करें' : 'Accept all'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
