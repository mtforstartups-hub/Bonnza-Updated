import { Link, useParams } from 'react-router-dom';
import { useBonnza } from '../context/BonnzaContext';
import { BONNZA_CONFIG } from '../domain/config';
import { localizePath } from '../utilities/locale';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AnimatedText, ScrollReveal } from '../components/MotionPrimitives';

interface PolicyDoc {
  slug: string;
  title: { en: string; hi: string };
  summary: { en: string; hi: string };
  sections: Array<{
    heading: { en: string; hi: string };
    body: { en: string; hi: string };
  }>;
}

const LEGAL_POLICIES: PolicyDoc[] = [
  {
    slug: 'privacy',
    title: {
      en: 'Privacy Policy',
      hi: 'गोपनीयता नीति',
    },
    summary: {
      en: 'How Bonnza handles your browser preferences, interactive worksheets, workshop registration details, and privacy consent choices.',
      hi: 'Bonnza आपकी ब्राउज़र प्राथमिकताओं, इंटरैक्टिव वर्कशीट, वर्कशॉप पंजीकरण विवरण और गोपनीयता सहमति को कैसे संभालता है।',
    },
    sections: [
      {
        heading: {
          en: '1. Interactive worksheets and browser preferences',
          hi: '1. इंटरैक्टिव वर्कशीट और ब्राउज़र प्राथमिकताएं',
        },
        body: {
          en: 'Interactive planning tools—such as the Order Cost Calculator, First-Channel Worksheet, and Business Starting Worksheet—run locally in your browser without transmitting worksheet inputs to a server. Your display language and selected session preferences remain stored locally in your browser.',
          hi: 'ऑर्डर लागत कैलकुलेटर, पहला चैनल वर्कशीट और बिज़नेस प्लान वर्कशीट जैसे इंटरैक्टिव उपकरण सीधे आपके ब्राउज़र में स्थानीय रूप से चलते हैं और किसी सर्वर पर आपका वर्कशीट डेटा नहीं भेजते।',
        },
      },
      {
        heading: {
          en: '2. Registration, enquiries, and privacy controls',
          hi: '2. पंजीकरण, पूछताछ और गोपनीयता नियंत्रण',
        },
        body: {
          en: `When you submit a workshop registration, programme release request, or support enquiry, Bonnza stores only the details needed to manage your session, issue status updates, or respond to your question. Optional analytics are disabled unless explicitly accepted in Cookie & Privacy Preferences. For privacy or data deletion requests, write to ${BONNZA_CONFIG.contact.email}.`,
          hi: `जब आप वर्कशॉप पंजीकरण, प्रोग्राम सूचना अनुरोध या सहायता पूछताछ भेजते हैं, तो Bonnza केवल आपके सत्र प्रबंधन, स्थिति अपडेट या उत्तर देने के लिए आवश्यक विवरण सुरक्षित रखता है। वैकल्पिक एनालिटिक्स आपकी स्पष्ट सहमति के बिना सक्रिय नहीं होता। किसी भी डेटा या गोपनीयता अनुरोध के लिए ${BONNZA_CONFIG.contact.email} पर लिखें।`,
        },
      },
    ],
  },
  {
    slug: 'terms',
    title: {
      en: 'Terms and Conditions',
      hi: 'नियम और शर्तें',
    },
    summary: {
      en: 'Educational scope, transparent workshop and programme pricing, and acceptable use of Bonnza resources.',
      hi: 'Bonnza के शैक्षिक दायरे, पारदर्शी शुल्क संरचना और शिक्षण सामग्री के उपयोग की शर्तें।',
    },
    sections: [
      {
        heading: {
          en: '1. Educational scope — no earnings guarantees',
          hi: '1. शैक्षिक दायरा — आय की कोई गारंटी नहीं',
        },
        body: {
          en: 'Bonnza provides practical ecommerce education, structured decision frameworks, and illustrative calculations. Attending a live workshop or using our curriculum materials does not guarantee customer orders, marketplace seller approval, or business profitability.',
          hi: 'Bonnza केवल व्यावहारिक ई-कॉमर्स शिक्षा, निर्णय रूपरेखा और उदाहरण आधारित गणनाएं प्रदान करता है। किसी कार्यशाला या पाठ्यक्रम से बिक्री, मार्केटप्लेस स्वीकृति या लाभ की कोई गारंटी नहीं मिलती।',
        },
      },
      {
        heading: {
          en: '2. Transparent pricing and session terms',
          hi: '2. पारदर्शी मूल्य और सत्र नियम',
        },
        body: {
          en: 'The live 90-minute Founding Workshop ticket is ₹299 per attendee. The complete programme bundle is priced at ₹6,999 and individual standalone courses at ₹2,499, with applicability and tax details shown clearly before payment. Joining links are issued only for verified confirmed seats.',
          hi: '90-मिनट की लाइव वर्कशॉप का टिकट ₹299 प्रति प्रतिभागी है। संपूर्ण प्रोग्राम बंडल ₹6,999 और एकल कोर्स ₹2,499 निर्धारित हैं, तथा भुगतान से पहले लागू कर विवरण स्पष्ट दिखाया जाता है। मीटिंग लिंक केवल पुष्ट सीट वाले प्रतिभागियों को दिया जाता है।',
        },
      },
    ],
  },
  {
    slug: 'refund-and-transfer',
    title: {
      en: 'Refund, Transfer & Replay Policy',
      hi: 'रिफंड, ट्रांसफर व रीप्ले नीति',
    },
    summary: {
      en: 'Clear rules for workshop cancellations, one-time session transfers, Bonnza schedule changes, and conditional session replays.',
      hi: 'वर्कशॉप रद्दीकरण, एक-बार सत्र स्थानांतरण, समय परिवर्तन और रीप्ले से जुड़े स्पष्ट नियम।',
    },
    sections: [
      {
        heading: {
          en: '1. Cancellation at least 24 hours before the session',
          hi: '1. सत्र से कम से कम 24 घंटे पहले रद्दीकरण',
        },
        body: {
          en: 'A cancellation request submitted at least 24 hours prior to the scheduled live workshop start time qualifies for a full ticket refund to the original payment method.',
          hi: 'निर्धारित लाइव वर्कशॉप शुरू होने से कम से कम 24 घंटे पहले प्राप्त रद्दीकरण अनुरोध पर मूल भुगतान माध्यम में पूर्ण टिकट रिफंड किया जाता है।',
        },
      },
      {
        heading: {
          en: '2. Later cancellations or session transfers',
          hi: '2. देर से रद्दीकरण या सत्र स्थानांतरण',
        },
        body: {
          en: 'Confirmed attendees may request a one-time transfer between equivalent English and Hindi sessions up to 24 hours before the session starts. Late cancellations or no-shows may qualify for a one-time transfer to an equivalent future live session when scheduled, subject to applicable consumer rights.',
          hi: 'पुष्ट प्रतिभागी सत्र शुरू होने से 24 घंटे पहले तक अंग्रेज़ी और हिंदी सत्रों के बीच एक बार स्थानांतरण का अनुरोध कर सकते हैं। देर से रद्दीकरण या अनुपस्थिति पर उपलब्ध होने पर एक आगामी समान सत्र में स्थानांतरण दिया जा सकता है।',
        },
      },
      {
        heading: {
          en: '3. Cancellation or material reschedule by Bonnza',
          hi: '3. Bonnza द्वारा रद्दीकरण या बड़े बदलाव',
        },
        body: {
          en: 'If Bonnza cancels or materially reschedules a workshop session, registered attendees are offered a full refund or an alternative session date.',
          hi: 'यदि Bonnza किसी सत्र को रद्द करता है या समय में बड़ा बदलाव करता है, तो पंजीकृत प्रतिभागियों को पूर्ण रिफंड या वैकल्पिक सत्र दिया जाता है।',
        },
      },
      {
        heading: {
          en: '4. Seven-day replay availability',
          hi: '4. सात-दिवसीय रीप्ले उपलब्धता',
        },
        body: {
          en: 'Seven-day replay access is provided strictly where recording quality, hosting, and delivery permissions are verified for that session.',
          hi: 'सात-दिवसीय रीप्ले एक्सेस उस सत्र की रिकॉर्डिंग गुणवत्ता, सुरक्षित होस्टिंग और वितरण अनुमतियों के सत्यापन के अनुसार प्रदान किया जाता है।',
        },
      },
    ],
  },
  {
    slug: 'accessibility',
    title: {
      en: 'Accessibility Information',
      hi: 'सुलभता जानकारी',
    },
    summary: {
      en: 'Our ongoing commitment to keyboard navigation, bilingual Devanagari legibility, WCAG AA contrast, and reduced-motion support.',
      hi: 'कीबोर्ड नेविगेशन, देवनागरी पठनीयता, उच्च कंट्रास्ट और कम-गति समर्थन के प्रति हमारी प्रतिबद्धता।',
    },
    sections: [
      {
        heading: {
          en: '1. Accessible navigation and bilingual typography',
          hi: '1. सुलभ नेविगेशन और द्विभाषी टाइपोग्राफी',
        },
        body: {
          en: `Bonnza provides keyboard-operable selectors, WCAG AA contrast across light and dark surfaces, Noto Sans Devanagari typography for Hindi, and reduced-motion support. For assistance or accessibility feedback, contact ${BONNZA_CONFIG.contact.email} or ${BONNZA_CONFIG.contact.phoneDisplay}.`,
          hi: `Bonnza कीबोर्ड-सुलभ चयन, उच्च कंट्रास्ट, देवनागरी पठनीयता और कम-गति प्राथमिकता का पालन करता है। सहायता या सुझाव के लिए ${BONNZA_CONFIG.contact.email} या ${BONNZA_CONFIG.contact.phoneDisplay} पर संपर्क करें।`,
        },
      },
    ],
  },
];

export function LegalPage({ defaultSlug }: { defaultSlug?: string }) {
  const { policySlug } = useParams<{ policySlug?: string }>();
  const { locale } = useBonnza();

  const rawSlug = policySlug || defaultSlug || 'privacy';
  const normalizedSlug = rawSlug === 'refund-policy' ? 'refund-and-transfer' : rawSlug;

  const policy = LEGAL_POLICIES.find((p) => p.slug === normalizedSlug) || LEGAL_POLICIES[0];

  const canonicalSubpath =
    policy.slug === 'privacy'
      ? '/privacy'
      : policy.slug === 'terms'
      ? '/terms'
      : policy.slug === 'refund-and-transfer'
      ? '/refund-policy'
      : `/legal/${policy.slug}`;

  return (
    <div className="bonnza-container py-10 sm:py-14 space-y-10 max-w-4xl">
      <SeoHead
        locale={locale}
        title={`${policy.title[locale]} | Bonnza`}
        description={policy.summary[locale]}
        path={localizePath(canonicalSubpath, locale)}
        alternateEnPath={`/en${canonicalSubpath}`}
        alternateHiPath={`/hi${canonicalSubpath}`}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: locale === 'hi' ? 'होम' : 'Home', to: localizePath('/', locale) },
          { label: policy.title[locale] },
        ]}
      />

      <header className="space-y-3 pb-6 border-b border-[#E6E6DF]">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#666A65]">
          {locale === 'hi' ? 'नीति और कानूनी दस्तावेज़' : 'POLICIES & LEGAL'}
        </p>
        <AnimatedText as="h1" className="text-3xl sm:text-4xl font-extrabold text-[#1A1B1A]">
          {policy.title[locale]}
        </AnimatedText>
        <AnimatedText as="p" delay={0.07} className="text-base text-[#666A65] leading-relaxed">
          {policy.summary[locale]}
        </AnimatedText>
      </header>

      <ScrollReveal>
        <div className="divide-y divide-[#E6E6DF] border-b border-[#E6E6DF]">
          {policy.sections.map((sec, idx) => (
            <section key={idx} className="py-6 first:pt-2 space-y-2">
              <h2 className="text-lg font-bold text-[#1A1B1A]">{sec.heading[locale]}</h2>
              <p className="text-sm sm:text-base text-[#666A65] leading-relaxed max-w-[70ch]">
                {sec.body[locale]}
              </p>
            </section>
          ))}
        </div>
      </ScrollReveal>

      <div className="flex flex-wrap gap-2 pt-2">
        {LEGAL_POLICIES.map((p) => (
          <Link
            key={p.slug}
            to={localizePath(`/legal/${p.slug}`, locale)}
            className={`min-h-[40px] inline-flex items-center px-4 py-2 rounded-[10px] border text-xs font-semibold transition-colors ${
              p.slug === policy.slug
                ? 'border-[#1A1B1A] bg-[#1A1B1A] text-white'
                : 'border-[#E6E6DF] bg-[#FFFFFF] text-[#1A1B1A] hover:border-[#1A1B1A]'
            }`}
          >
            {p.title[locale]}
          </Link>
        ))}
      </div>
    </div>
  );
}
