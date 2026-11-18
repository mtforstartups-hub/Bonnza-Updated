import type { WebinarSessionId, WebinarSessionRecord } from '../domain/types';

const ALTERNATE_SATURDAY_DATES: Array<{
  date: string;
  enId: WebinarSessionId;
  hiId: WebinarSessionId;
}> = [
  {
    date: '2026-12-05',
    enId: 'bonnza-2026-12-05-en-1300',
    hiId: 'bonnza-2026-12-05-hi-1600',
  },
  {
    date: '2026-12-19',
    enId: 'bonnza-2026-12-19-en-1300',
    hiId: 'bonnza-2026-12-19-hi-1600',
  },
  {
    date: '2027-01-02',
    enId: 'bonnza-2027-01-02-en-1300',
    hiId: 'bonnza-2027-01-02-hi-1600',
  },
  {
    date: '2027-01-16',
    enId: 'bonnza-2027-01-16-en-1300',
    hiId: 'bonnza-2027-01-16-hi-1600',
  },
  {
    date: '2027-01-30',
    enId: 'bonnza-2027-01-30-en-1300',
    hiId: 'bonnza-2027-01-30-hi-1600',
  },
  {
    date: '2027-02-13',
    enId: 'bonnza-2027-02-13-en-1300',
    hiId: 'bonnza-2027-02-13-hi-1600',
  },
];

export const WEBINAR_SESSIONS: WebinarSessionRecord[] = ALTERNATE_SATURDAY_DATES.flatMap(
  ({ date, enId, hiId }, idx) => {
    const ticketPriceInr = 299 + idx * 100;
    const originalPriceInr = 1999;
    return [
      {
        id: enId,
        instructionLocale: 'en',
        date,
        // 1:00 PM IST (UTC+05:30) = 07:30 UTC
        startUtc: `${date}T07:30:00Z`,
        // 2:30 PM IST (UTC+05:30) = 09:00 UTC
        endUtc: `${date}T09:00:00Z`,
        timezone: 'Asia/Kolkata',
        durationMinutes: 90,
        title: {
          en: 'First Online Business — English Live Workshop',
          hi: 'पहला ऑनलाइन बिज़नेस — अंग्रेज़ी लाइव वर्कशॉप',
        },
        presenter: 'Shubham Chaturvedi',
        originalTicketPriceInr: originalPriceInr,
        workingTicketPriceInr: ticketPriceInr,
        taxNote: {
          en: `₹${ticketPriceInr} per person (regular ₹1,999). Applicable taxes and final invoice details are shown at checkout.`,
          hi: `₹${ticketPriceInr} प्रति व्यक्ति (नियमित ₹1,999)। लागू कर और अंतिम चालान विवरण चेकआउट पर दिखाए जाते हैं।`,
        },
        paymentProvider: 'Razorpay',
        paymentIntegrationActive: false,
        meetingUrlExposed: false,
      },
      {
        id: hiId,
        instructionLocale: 'hi',
        date,
        // 4:00 PM IST (UTC+05:30) = 10:30 UTC
        startUtc: `${date}T10:30:00Z`,
        // 5:30 PM IST (UTC+05:30) = 12:00 UTC
        endUtc: `${date}T12:00:00Z`,
        timezone: 'Asia/Kolkata',
        durationMinutes: 90,
        title: {
          en: 'First Online Business — Hindi Live Workshop',
          hi: 'पहला ऑनलाइन बिज़नेस — हिंदी लाइव वर्कशॉप',
        },
        presenter: 'Shubham Chaturvedi',
        originalTicketPriceInr: originalPriceInr,
        workingTicketPriceInr: ticketPriceInr,
        taxNote: {
          en: `₹${ticketPriceInr} per person (regular ₹1,999). Applicable taxes and final invoice details are shown at checkout.`,
          hi: `₹${ticketPriceInr} प्रति व्यक्ति (नियमित ₹1,999)। लागू कर और अंतिम चालान विवरण चेकआउट पर दिखाए जाते हैं।`,
        },
        paymentProvider: 'Razorpay',
        paymentIntegrationActive: false,
        meetingUrlExposed: false,
      },
    ];
  }
);

export const DEC5_WEBINAR_SESSIONS = WEBINAR_SESSIONS.filter((s) => s.date === '2026-12-05');

export interface WebinarDateGroup {
  date: string;
  dateIso: string;
  dateLabel: { en: string; hi: string };
  shortDateLabel: { en: string; hi: string };
  startUtc: string;
  endUtc: string;
  isNextUpcoming: boolean;
  enSession: WebinarSessionRecord;
  hiSession: WebinarSessionRecord;
}

function buildDateLabels(startUtc: string): {
  dateLabel: { en: string; hi: string };
  shortDateLabel: { en: string; hi: string };
} {
  const dt = new Date(startUtc);
  const enFull = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(dt);
  const hiFull = new Intl.DateTimeFormat('hi-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(dt);
  const enShort = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(dt);
  const hiShort = new Intl.DateTimeFormat('hi-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(dt);
  return {
    dateLabel: { en: enFull, hi: hiFull },
    shortDateLabel: { en: enShort, hi: hiShort },
  };
}

/**
  * Returns all alternate-Saturday webinar date groups sorted so that the nearest
  * upcoming Saturday webinar is always promoted first (index 0, isNextUpcoming: true).
  */
export function getUpcomingWebinarGroups(nowMs: number = Date.now()): WebinarDateGroup[] {
  const rawGroups = ALTERNATE_SATURDAY_DATES.map(({ date, enId, hiId }) => {
    const enSession = WEBINAR_SESSIONS.find((s) => s.id === enId)!;
    const hiSession = WEBINAR_SESSIONS.find((s) => s.id === hiId)!;
    const labels = buildDateLabels(enSession.startUtc);
    return {
      date,
      dateIso: date,
      dateLabel: labels.dateLabel,
      shortDateLabel: labels.shortDateLabel,
      startUtc: enSession.startUtc,
      endUtc: hiSession.endUtc,
      isNextUpcoming: false,
      enSession,
      hiSession,
    };
  });

  const futureGroups = rawGroups.filter((g) => new Date(g.endUtc).getTime() > nowMs);
  const activeList = futureGroups.length > 0 ? futureGroups : rawGroups;

  return activeList.map((group, idx) => ({
    ...group,
    isNextUpcoming: idx === 0,
  }));
}

/**
  * Returns the single next upcoming Saturday webinar group that should be promoted first.
  */
export function getPromotedWebinarGroup(nowMs: number = Date.now()): WebinarDateGroup {
  return getUpcomingWebinarGroups(nowMs)[0];
}

export const WEBINAR_AGENDA = [
  {
    range: { en: '0–10 min', hi: '0–10 मिनट' },
    title: {
      en: 'Welcome, goals and scope',
      hi: 'स्वागत, लक्ष्य और वर्कशॉप का दायरा',
    },
    detail: {
      en: 'What this 90-minute workshop covers, what it does not cover, and how to use your planning worksheet.',
      hi: 'यह 90 मिनट की वर्कशॉप क्या कवर करती है, क्या नहीं, और अपनी प्लानिंग वर्कशीट का उपयोग कैसे करें।',
    },
  },
  {
    range: { en: '10–25 min', hi: '10–25 मिनट' },
    title: {
      en: 'Understand the buyer and product opportunity',
      hi: 'खरीदार और उत्पाद के अवसर को समझें',
    },
    detail: {
      en: 'Define a concrete buyer use case instead of broad guesswork before picking inventory or making goods.',
      hi: 'सामान खरीदने या बनाने से पहले सामान्य अनुमान के बजाय एक स्पष्ट खरीदार और उपयोग तय करें।',
    },
  },
  {
    range: { en: '25–45 min', hi: '25–45 मिनट' },
    title: {
      en: 'Choose between sourcing, making and artist-sourced crafts',
      hi: 'सोर्सिंग, स्वयं निर्माण और कलाकार-निर्मित शिल्प के बीच चुनाव',
    },
    detail: {
      en: 'Compare Resell (Source to Sell) with Craft to Commerce—including sample checks, provenance, and labour.',
      hi: 'रीसेल (सोर्स टू सेल) और क्राफ्ट टू कॉमर्स की तुलना—सैंपल जांच, स्रोत प्रमाण और श्रम लागत सहित।',
    },
  },
  {
    range: { en: '45–60 min', hi: '45–60 मिनट' },
    title: {
      en: 'Work through a product cost example',
      hi: 'एक उत्पाद की लागत का उदाहरण हल करें',
    },
    detail: {
      en: 'Step through net sales, product cost, packaging, shipping, channel fees, return losses, and contribution.',
      hi: 'नेट बिक्री, उत्पाद लागत, पैकेजिंग, शिपिंग, चैनल शुल्क, रिटर्न हानि और योगदान का व्यावहारिक गणित समझें।',
    },
  },
  {
    range: { en: '60–72 min', hi: '60–72 मिनट' },
    title: {
      en: 'Compare first selling channels',
      hi: 'पहले बिक्री चैनल की तुलना करें',
    },
    detail: {
      en: 'Assess marketplaces (Meesho, Amazon India, Etsy), WhatsApp/Social, and owned stores (Shopify/Wix) by fit.',
      hi: 'मार्केटप्लेस (Meesho, Amazon India, Etsy), WhatsApp/सोशल और अपनी वेबसाइट (Shopify/Wix) की उपयुक्तता जांचें।',
    },
  },
  {
    range: { en: '72–82 min', hi: '72–82 मिनट' },
    title: {
      en: 'Group questions',
      hi: 'समूह प्रश्नोत्तर (Q&A)',
    },
    detail: {
      en: 'Structured group Q&A focused on early product, costing, and channel decisions within the live session.',
      hi: 'लाइव सत्र के भीतर शुरुआती उत्पाद, लागत और चैनल निर्णयों पर केंद्रित समूह प्रश्नोत्तर।',
    },
  },
  {
    range: { en: '82–90 min', hi: '82–90 मिनट' },
    title: {
      en: 'Action-plan recap and optional programme introduction',
      hi: 'एक्शन प्लान सारांश और वैकल्पिक पूर्ण प्रोग्राम परिचय',
    },
    detail: {
      en: 'Lock in three practical next actions for the coming week, plus a brief overview of the complete curriculum.',
      hi: 'आने वाले सप्ताह के लिए तीन व्यावहारिक कदम तय करें और संपूर्ण प्रोग्राम का संक्षिप्त परिचय देखें।',
    },
  },
];

export const WEBINAR_WORKSHEET_EXAMPLE = {
  disclaimer: {
    en: 'Sample planning worksheet entry for workshop demonstration — figures are illustrative; always verify live quotes for your own product.',
    hi: 'वर्कशॉप प्रदर्शन के लिए नमूना प्लानिंग वर्कशीट उदाहरण — ये केवल उदाहरण के आंकड़े हैं; अपने उत्पाद के लिए हमेशा वास्तविक दरें जांचें।',
  },
  fields: [
    {
      label: { en: 'Target customer', hi: 'लक्षित ग्राहक' },
      value: {
        en: 'Weekend train & flight travellers organizing chargers and toiletries',
        hi: 'सप्ताहांत ट्रेन/फ़्लाइट यात्री जो चार्जर और टॉयलेटरीज़ व्यवस्थित रखते हैं',
      },
    },
    {
      label: { en: 'Product idea', hi: 'उत्पाद विचार' },
      value: {
        en: '20cm × 14cm stitched cotton canvas travel pouch (Single unit)',
        hi: '20cm × 14cm सिला हुआ कॉटन कैनवास ट्रैवल पाउच (सिंगल यूनिट)',
      },
    },
    {
      label: { en: 'Business path', hi: 'बिज़नेस पथ' },
      value: {
        en: 'Resell: Source to Sell (10-unit sample & pilot test)',
        hi: 'रीसेल: सोर्स टू सेल (10-यूनिट सैंपल और पायलट टेस्ट)',
      },
    },
    {
      label: { en: 'Product cost (delivered)', hi: 'उत्पाद लागत (डिलीवरी सहित)' },
      value: { en: '₹200 (illustrative unit cost)', hi: '₹200 (उदाहरणात्मक प्रति यूनिट लागत)' },
    },
    {
      label: { en: 'Packaging', hi: 'पैकेजिंग' },
      value: { en: '₹20 per order', hi: '₹20 प्रति ऑर्डर' },
    },
    {
      label: { en: 'Shipping', hi: 'शिपिंग' },
      value: { en: '₹60 per order', hi: '₹60 प्रति ऑर्डर' },
    },
    {
      label: { en: 'Channel & payment charges', hi: 'चैनल व भुगतान शुल्क' },
      value: { en: '₹50 per order (assumptions to verify)', hi: '₹50 प्रति ऑर्डर (सत्यापन योग्य अनुमान)' },
    },
    {
      label: { en: 'Expected return costs', hi: 'अनुमानित रिटर्न हानि' },
      value: { en: '₹20 allowance per order', hi: '₹20 प्रति ऑर्डर प्रावधान' },
    },
    {
      label: { en: 'Preferred selling channel', hi: 'प्राथमिक बिक्री चैनल' },
      value: {
        en: 'WhatsApp enquiry pilot first, or single marketplace test once eligible',
        hi: 'पहले WhatsApp पूछताछ पायलट, या पात्रता होने पर एक मार्केटप्लेस टेस्ट',
      },
    },
    {
      label: { en: 'Next three actions', hi: 'अगले तीन कदम' },
      value: {
        en: '1) Request two samples with spec sheet  2) Inspect zip & seams  3) Verify real shipping quote before buying stock',
        hi: '1) स्पेक शीट के साथ दो सैंपल मंगवाएं  2) ज़िप व सिलाई जांचें  3) स्टॉक खरीदने से पहले वास्तविक शिपिंग दर जांचें',
      },
    },
  ],
};

export const WEBINAR_FAQS = [
  {
    q: {
      en: 'Do I need an existing product idea before attending?',
      hi: 'क्या शामिल होने से पहले मेरे पास उत्पाद का विचार होना ज़रूरी है?',
    },
    a: {
      en: 'No. The workshop walks through how to define a buyer need and evaluate whether sourcing, making, or sourcing finished crafts fits your situation.',
      hi: 'नहीं। वर्कशॉप में सिखाया जाता है कि खरीदार की ज़रूरत कैसे तय करें और सोर्सिंग, निर्माण या शिल्प-स्रोत में से आपके लिए क्या सही है।',
    },
  },
  {
    q: {
      en: 'Do I need an active seller account on Meesho, Amazon or Shopify?',
      hi: 'क्या मुझे Meesho, Amazon या Shopify पर सक्रिय सेलर अकाउंट की आवश्यकता है?',
    },
    a: {
      en: 'No seller account is required to follow the workshop. In fact, the session helps you decide which channel to prepare for before opening accounts.',
      hi: 'वर्कशॉप समझने के लिए किसी सेलर अकाउंट की आवश्यकता नहीं है। यह सत्र अकाउंट खोलने से पहले सही चैनल चुनने में मदद करता है।',
    },
  },
  {
    q: {
      en: 'Can I attend in Hindi?',
      hi: 'क्या मैं हिंदी में शामिल हो सकता/सकती हूँ?',
    },
    a: {
      en: 'Yes. On every alternate Saturday workshop date, the Hindi live session runs from 4:00 PM to 5:30 PM IST.',
      hi: 'हाँ। प्रत्येक एकांतर शनिवार (Alternate Saturday) को हिंदी लाइव सत्र शाम 4:00 बजे से 5:30 बजे IST तक आयोजित होता है।',
    },
  },
  {
    q: {
      en: 'Are the English and Hindi workshops separate sessions?',
      hi: 'क्या अंग्रेज़ी और हिंदी वर्कशॉप अलग-अलग सत्र हैं?',
    },
    a: {
      en: 'Yes. On each workshop Saturday, English runs from 1:00 PM to 2:30 PM IST and Hindi runs from 4:00 PM to 5:30 PM IST.',
      hi: 'हाँ। प्रत्येक वर्कशॉप शनिवार को अंग्रेज़ी सत्र दोपहर 1:00 से 2:30 IST और हिंदी सत्र शाम 4:00 से 5:30 IST तक होता है।',
    },
  },
  {
    q: {
      en: 'Is this workshop suitable for complete beginners?',
      hi: 'क्या यह वर्कशॉप बिल्कुल नए लोगों के लिए उपयुक्त है?',
    },
    a: {
      en: 'Yes. It is specifically built for first-time and home-based entrepreneurs who want clear decision steps instead of scattered jargon.',
      hi: 'हाँ। यह विशेष रूप से पहली बार शुरू करने वाले और घर-आधारित उद्यमियों के लिए बनाई गई है।',
    },
  },
  {
    q: {
      en: 'Will I learn every marketplace step-by-step in 90 minutes?',
      hi: 'क्या मैं 90 मिनट में हर मार्केटप्लेस का पूरा सेटअप सीख लूँगा?',
    },
    a: {
      en: 'No. Ninety minutes focuses on your product direction, cost logic, and choosing one suitable starting channel. Detailed marketplace onboarding and listing execution belong in the complete Bonnza programme.',
      hi: 'नहीं। 90 मिनट का फोकस उत्पाद दिशा, लागत के गणित और पहला उपयुक्त चैनल चुनने पर है। प्रत्येक मार्केटप्लेस का विस्तृत प्रशिक्षण संपूर्ण Bonnza प्रोग्राम का हिस्सा है।',
    },
  },
  {
    q: {
      en: 'Does the ₹299 webinar ticket include the full Bonnza programme?',
      hi: 'क्या ₹299 के वर्कशॉप टिकट में पूरा Bonnza प्रोग्राम शामिल है?',
    },
    a: {
      en: 'No. The ₹299 ticket covers the 90-minute live workshop, practical planning worksheet, and group Q&A. Any bundle credit offers are announced separately at cohort enrolment.',
      hi: 'नहीं। ₹299 का टिकट केवल 90 मिनट की लाइव वर्कशॉप, प्लानिंग वर्कशीट और समूह प्रश्नोत्तर के लिए है। बंडल क्रेडिट प्रस्ताव बैच नामांकन के समय अलग से घोषित किए जाते हैं।',
    },
  },
  {
    q: {
      en: 'Is a replay recording included with the ticket?',
      hi: 'क्या टिकट के साथ रिकॉर्डेड रीप्ले मिलेगा?',
    },
    a: {
      en: 'When seven-day replay access is provided for a cohort, details are shared with registered attendees via email. Please plan to attend live for the best experience.',
      hi: 'जब किसी सत्र के लिए सात दिन की रीप्ले सुविधा उपलब्ध होती है, तो पंजीकृत प्रतिभागियों को ईमेल द्वारा सूचित किया जाता है। सर्वोत्तम अनुभव के लिए कृपया लाइव जुड़ने की योजना बनाएं।',
    },
  },
  {
    q: {
      en: 'Can I transfer my registration to another date or person?',
      hi: 'क्या मैं अपना पंजीकरण किसी अन्य तिथि या व्यक्ति को ट्रांसफर कर सकता/सकती हूँ?',
    },
    a: {
      en: 'Yes. Registered attendees can request a one-time transfer to another scheduled live session at least 24 hours before the session start time.',
      hi: 'हाँ। पंजीकृत प्रतिभागी सत्र शुरू होने से कम से कम 24 घंटे पहले एक बार किसी अन्य निर्धारित लाइव सत्र में स्थानांतरण का अनुरोध कर सकते हैं।',
    },
  },
  {
    q: {
      en: 'Can I request a refund if I cannot attend?',
      hi: 'यदि मैं शामिल न हो पाऊँ तो क्या रिफंड मिल सकता है?',
    },
    a: {
      en: 'Cancellation requests submitted at least 24 hours before the session start time qualify for a full refund. If Bonnza cancels or materially reschedules a session, you receive a full refund or an alternative session.',
      hi: 'सत्र शुरू होने से कम से कम 24 घंटे पहले रद्दीकरण अनुरोध करने पर पूर्ण रिफंड मिलता है। यदि Bonnza किसी सत्र को रद्द या पुनर्निर्धारित करता है, तो पूर्ण रिफंड या वैकल्पिक सत्र दिया जाता है।',
    },
  },
  {
    q: {
      en: 'Will I automatically start earning money after attending?',
      hi: 'क्या वर्कशॉप में शामिल होने के बाद मेरी कमाई शुरू हो जाएगी?',
    },
    a: {
      en: 'No. Bonnza provides practical education, frameworks, and cost clarity. Sales, marketplace approval, and profitability depend on your execution, product, market demand, and actual costs.',
      hi: 'नहीं। Bonnza केवल व्यावहारिक शिक्षा और निर्णय ढांचा प्रदान करता है। बिक्री, मार्केटप्लेस स्वीकृति और लाभ आपके उत्पाद, बाजार मांग और वास्तविक कार्य पर निर्भर करते हैं।',
    },
  },
];
