import { useState } from 'react';
import { CheckCircle2, HelpCircle, XCircle, AlertTriangle } from 'lucide-react';
import type { Locale } from '../../domain/types';

type ReadinessState = 'ready' | 'uncertain' | 'blocked';
type ChannelKey = 'marketplace' | 'socialWhatsapp' | 'ownWebsite';
type CriterionKey = 'buyerAccess' | 'productEligibility' | 'orderEconomics' | 'operatingCapacity';

type MatrixState = Record<ChannelKey, Record<CriterionKey, ReadinessState>>;

const INITIAL_MATRIX: MatrixState = {
  marketplace: {
    buyerAccess: 'ready',
    productEligibility: 'uncertain',
    orderEconomics: 'uncertain',
    operatingCapacity: 'ready',
  },
  socialWhatsapp: {
    buyerAccess: 'uncertain',
    productEligibility: 'ready',
    orderEconomics: 'ready',
    operatingCapacity: 'ready',
  },
  ownWebsite: {
    buyerAccess: 'blocked',
    productEligibility: 'ready',
    orderEconomics: 'uncertain',
    operatingCapacity: 'uncertain',
  },
};

export function FirstChannelWorksheet({ locale }: { locale: Locale }) {
  const [matrix, setMatrix] = useState<MatrixState>(INITIAL_MATRIX);

  const channels: Array<{ key: ChannelKey; en: string; hi: string }> = [
    { key: 'marketplace', en: 'Marketplace (Meesho / Amazon / Etsy)', hi: 'मार्केटप्लेस (Meesho / Amazon / Etsy)' },
    { key: 'socialWhatsapp', en: 'Social Media & WhatsApp', hi: 'सोशल मीडिया व WhatsApp' },
    { key: 'ownWebsite', en: 'Own Website (Shopify / Wix)', hi: 'अपनी वेबसाइट (Shopify / Wix)' },
  ];

  const criteria: Array<{ key: CriterionKey; en: string; hi: string }> = [
    { key: 'buyerAccess', en: 'Buyer access', hi: 'खरीदार पहुंच' },
    { key: 'productEligibility', en: 'Product & seller eligibility', hi: 'उत्पाद व विक्रेता पात्रता' },
    { key: 'orderEconomics', en: 'Order economics', hi: 'ऑर्डर अर्थशास्त्र' },
    { key: 'operatingCapacity', en: 'Operating capacity', hi: 'संचालन क्षमता' },
  ];

  const states: Array<{
    value: ReadinessState;
    en: string;
    hi: string;
    icon: typeof CheckCircle2;
    classes: string;
  }> = [
    {
      value: 'ready',
      en: 'Ready',
      hi: 'तैयार',
      icon: CheckCircle2,
      classes: 'border-[#1A1B1A] bg-[#E8EDDD] text-[#1A1B1A]',
    },
    {
      value: 'uncertain',
      en: 'Uncertain',
      hi: 'अनिश्चित',
      icon: HelpCircle,
      classes: 'border-[#1A1B1A] bg-[#F4E6D4] text-[#1A1B1A]',
    },
    {
      value: 'blocked',
      en: 'Blocked',
      hi: 'अवरुद्ध',
      icon: XCircle,
      classes: 'border-[#1A1B1A] bg-[#1A1B1A] text-[#FAF9F5]',
    },
  ];

  const updateCell = (ch: ChannelKey, cr: CriterionKey, next: ReadinessState) => {
    setMatrix((prev) => ({
      ...prev,
      [ch]: {
        ...prev[ch],
        [cr]: next,
      },
    }));
  };

  const countStates = (ch: ChannelKey) => {
    const row = Object.values(matrix[ch]);
    return {
      ready: row.filter((s) => s === 'ready').length,
      uncertain: row.filter((s) => s === 'uncertain').length,
      blocked: row.filter((s) => s === 'blocked').length,
    };
  };

  return (
    <section
      aria-labelledby="channel-worksheet-heading"
      className="rounded-[20px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 sm:p-8"
    >
      <div className="space-y-1.5 pb-6 border-b border-[#E6E6DF]">
        <h2 id="channel-worksheet-heading" className="text-2xl font-bold text-[#1A1B1A]">
          {locale === 'hi' ? '2. पहला चैनल वर्कशीट' : '2. First-Channel Worksheet'}
        </h2>
        <p className="text-sm text-[#666A65]">
          {locale === 'hi'
            ? 'चार मानदंडों पर मार्केटप्लेस, WhatsApp/सोशल और अपनी वेबसाइट को तैयार, अनिश्चित या अवरुद्ध के रूप में अंकित करें।'
            : 'Score Marketplace, Social/WhatsApp, and Own Website across four practical criteria using Ready, Uncertain, and Blocked states.'}
        </p>
      </div>

      <div className="divide-y divide-[#E6E6DF]">
        {channels.map((channel) => {
          const summary = countStates(channel.key);
          return (
            <div key={channel.key} className="py-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-[#1A1B1A]">
                  {locale === 'hi' ? channel.hi : channel.en}
                </h3>
                <p className="text-xs font-mono-tabular text-[#666A65]">
                  {locale === 'hi'
                    ? `तैयार: ${summary.ready} · अनिश्चित: ${summary.uncertain} · अवरुद्ध: ${summary.blocked}`
                    : `Ready: ${summary.ready} · Uncertain: ${summary.uncertain} · Blocked: ${summary.blocked}`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {criteria.map((criterion) => {
                  const current = matrix[channel.key][criterion.key];
                  return (
                    <div key={criterion.key} className="space-y-2">
                      <p className="text-xs font-semibold text-[#666A65]">
                        {locale === 'hi' ? criterion.hi : criterion.en}
                      </p>
                      <div
                        className="flex flex-wrap gap-1.5"
                        role="group"
                        aria-label={`${channel.en} ${criterion.en}`}
                      >
                        {states.map((st) => {
                          const Icon = st.icon;
                          const active = current === st.value;
                          return (
                            <button
                              key={st.value}
                              type="button"
                              aria-pressed={active}
                              onClick={() => updateCell(channel.key, criterion.key, st.value)}
                              className={`inline-flex items-center gap-1 min-h-[36px] px-2.5 py-1 text-xs font-semibold rounded-[8px] border transition-colors ${
                                active
                                  ? st.classes
                                  : 'border-[#E6E6DF] bg-[#FAF9F5] text-[#666A65] hover:text-[#1A1B1A]'
                              }`}
                            >
                              <Icon size={13} aria-hidden="true" />
                              {locale === 'hi' ? st.hi : st.en}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-[#E6E6DF] pt-4 flex items-start gap-2.5 text-xs text-[#666A65]">
        <AlertTriangle size={16} className="shrink-0 mt-0.5 text-[#1A1B1A]" aria-hidden="true" />
        <p>
          {locale === 'hi'
            ? 'सूचना: यह स्व-मूल्यांकन वर्कशीट केवल निर्णय स्पष्ट करने के लिए है—यह किसी भी मार्केटप्लेस की आधिकारिक पात्रता या अकाउंट स्वीकृति प्रमाणित नहीं करती।'
            : 'Note: This self-assessment helps clarify readiness gaps and unresolved checks. Marking criteria Ready does not prove official marketplace eligibility or approval.'}
        </p>
      </div>
    </section>
  );
}
