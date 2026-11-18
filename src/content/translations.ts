import type { Locale } from '../domain/types';

export interface UiCopy {
  nav: {
    home: string;
    workshop: string;
    programmes: string;
    paths: string;
    resources: string;
    ecommerceGuides: string;
    ideas: string;
    about: string;
    contact: string;
    bookWorkshop: string;
    menuOpen: string;
    menuClose: string;
    languageLabel: string;
  };
  home: {
    eyebrow: string;
    heroHeadline: string;
    heroSubtitle: string;
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    outcomesHeading: string;
    outcomesSubheading: string;
    outcomes: Array<{ title: string; detail: string }>;
    audienceHeading: string;
    audienceSubheading: string;
    audiences: Array<{ title: string; detail: string }>;
    pathsHeading: string;
    pathsSubheading: string;
    exploreResell: string;
    exploreCraft: string;
    channelsHeading: string;
    channelsSubheading: string;
    channelsNote: string;
    featuredWebinarHeading: string;
    featuredWebinarSubheading: string;
    viewWorkshopDetails: string;
    programmeHeading: string;
    programmeSubheading: string;
    programmeHighlights: string[];
    programmeScheduleNote: string;
    exploreProgramme: string;
    resourcesHeading: string;
    resourcesSubheading: string;
    openResources: string;
    openEditorialPreview: string;
    faqHeading: string;
    finalHeadline: string;
    finalPrimaryCta: string;
    finalSecondaryCta: string;
  };
  webinar: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    primaryCta: string;
    continueToRegistration: string;
    bookingTitle: string;
    selectSessionPrompt: string;
    englishSessionLabel: string;
    hindiSessionLabel: string;
    selectedSessionBadge: string;
    displayLanguageNote: string;
    paymentPendingNotice: string;
    noMeetingLinkNotice: string;
    outcomesHeading: string;
    outcomes: string[];
    audienceHeading: string;
    suitableForTitle: string;
    suitableForList: string[];
    notForTitle: string;
    notForList: string[];
    agendaHeading: string;
    worksheetHeading: string;
    presenterHeading: string;
    presenterRole: string;
    presenterBio: string;
    inclusionsHeading: string;
    includedTitle: string;
    includedList: string[];
    notIncludedTitle: string;
    notIncludedList: string[];
    replayNote: string;
    faqHeading: string;
    finalHeadline: string;
  };
  common: {
    minutes: string;
    presenter: string;
    workingTicketPrice: string;
    learnMore: string;
    viewCourse: string;
    backToAll: string;
    editorialDraftNotice: string;
    hindiDraftReviewNotice: string;
    provisionalPriceNotice: string;
    checkoutDisabledNotice: string;
    noPublishedArticlesYet: string;
    inspectEditorialDrafts: string;
  };
  footer: {
    tagline: string;
    descriptor: string;
    programmesCol: string;
    pathsCol: string;
    resourcesCol: string;
    policiesCol: string;
    contactCol: string;
    bottomNote: string;
  };
}

export const UI_COPY: Record<Locale, UiCopy> = {
  en: {
    nav: {
      home: 'Home',
      workshop: 'Workshop',
      programmes: 'Programmes',
      paths: 'Paths',
      resources: 'Resources',
      ecommerceGuides: 'Guides',
      ideas: 'Ideas',
      about: 'About',
      contact: 'Contact',
      bookWorkshop: 'Book Workshop',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      languageLabel: 'Website language',
    },
    home: {
      eyebrow: 'PRACTICAL ECOMMERCE EDUCATION',
      heroHeadline: 'Your first online business starts with a clear plan.',
      heroSubtitle:
        'From choosing a product to understanding costs and selling channels, Bonnza helps you make practical decisions before taking your first step into ecommerce.',
      heroPrimaryCta: 'Register Now',
      heroSecondaryCta: 'Explore Learning Paths',
      outcomesHeading: 'Start with clarity, not guesswork.',
      outcomesSubheading:
        'Practical ecommerce education built around real cost math, product readiness, and focused first steps.',
      outcomes: [
        {
          title: 'Identify a product and customer direction',
          detail:
            'Define a specific buyer need and test whether making, reselling, or artist-sourced craft fits your resources.',
        },
        {
          title: 'Understand the real costs of selling',
          detail:
            'Account for product cost, packaging, outbound shipping, channel fees, return losses, and customer acquisition.',
        },
        {
          title: 'Choose a suitable first sales channel',
          detail:
            'Compare marketplaces, WhatsApp/Social, and owned websites honestly—and start with one route you can operate well.',
        },
        {
          title: 'Create an actionable starting plan',
          detail:
            'Leave with concrete seven-day verification steps instead of committing savings to blind bulk inventory.',
        },
      ],
      audienceHeading: 'Built for people starting their first online business.',
      audienceSubheading:
        'Designed for everyday entrepreneurs taking practical steps—without hype, fake guarantees, or confusing jargon.',
      audiences: [
        {
          title: 'First-time entrepreneurs',
          detail: 'Need a structured, honest starting point before spending on stock or tools.',
        },
        {
          title: 'Home-based entrepreneurs',
          detail: 'Balancing limited weekly hours, storage space, and initial test capital.',
        },
        {
          title: 'Aspiring resellers',
          detail: 'Evaluating suppliers, checking physical samples, and selling through their own accounts.',
        },
        {
          title: 'Makers and craft entrepreneurs',
          detail: 'Creating handmade physical goods and pricing materials, making hours, and capacity accurately.',
        },
        {
          title: 'Artist-sourced craft businesses',
          detail: 'Sourcing finished crafts from artists responsibly with clear provenance and channel verification.',
        },
      ],
      pathsHeading: 'Two ways to begin. One practical learning journey.',
      pathsSubheading:
        'Choose the business route that reflects how your physical products reach customers.',
      exploreResell: 'Explore Resell',
      exploreCraft: 'Explore Craft to Commerce',
      channelsHeading: 'Learn where and how to sell online.',
      channelsSubheading:
        'The complete curriculum covers all eight routes below—while guiding you to execute one suitable channel well first.',
      channelsNote:
        'Bonnza is an independent education platform and claims no official partnership with any marketplace or software provider.',
      featuredWebinarHeading: 'Make your first ecommerce decisions in 90 minutes.',
      featuredWebinarSubheading:
        'Join Shubham Chaturvedi live on Saturday, 5 December 2026 in English (1:00 PM IST) or Hindi (4:00 PM IST).',
      viewWorkshopDetails: 'View Live Workshop Details',
      programmeHeading: 'Go from your first idea to practical ecommerce execution.',
      programmeSubheading:
        'A structured written curriculum covering business foundations, sourcing, craft pricing, marketplaces, owned stores, and daily operations in English and Hindi.',
      programmeHighlights: [
        'Step-by-step curriculum available in both English and Hindi',
        'Practical worksheets for costing, supplier quotes, sample checks, and launch testing',
        'Marketplace and owned-store coverage across 8 Indian and global selling channels',
        '12 months of recorded learning access upon cohort enrolment',
        '10 weeks of scheduled group support when the cohort intake opens',
      ],
      programmeScheduleNote:
        'Recorded access and 10 weeks of group support follow the published cohort intake calendar.',
      exploreProgramme: 'Explore the Programme',
      resourcesHeading: 'Learn and plan before you enrol.',
      resourcesSubheading:
        'Explore our Ecommerce Guides for step-by-step product, costing, and channel decisions, or open our standalone interactive calculators and worksheets.',
      openResources: 'Open Calculators & Worksheets',
      openEditorialPreview: 'Explore Ecommerce Guides',
      faqHeading: 'Common questions before you start',
      finalHeadline: 'Start smart. Build your plan. Take your next step.',
      finalPrimaryCta: 'Register Now',
      finalSecondaryCta: 'Contact Bonnza',
    },
    webinar: {
      eyebrow: 'LIVE BEGINNER ECOMMERCE WORKSHOP',
      headline: 'Build a clear plan for your first online product business.',
      subtitle:
        'Choose a product direction, check the costs and identify a suitable first selling channel in a practical 90-minute live workshop with Bonnza.',
      primaryCta: 'Register Now',
      continueToRegistration: 'Register Now',
      bookingTitle: 'Select your live workshop session',
      selectSessionPrompt: 'Choose your preferred session language:',
      englishSessionLabel: 'English Live Session',
      hindiSessionLabel: 'Hindi Live Session',
      selectedSessionBadge: 'Selected session',
      displayLanguageNote: '',
      paymentPendingNotice: '',
      noMeetingLinkNotice: '',
      outcomesHeading: 'What will you leave with?',
      outcomes: [
        'A starting product and buyer direction.',
        'A simple cost model with assumptions to verify.',
        'A first-channel decision based on fit and readiness.',
        'Three practical actions for the following week.',
      ],
      audienceHeading: 'Who this workshop is built for',
      suitableForTitle: 'Suitable for you if',
      suitableForList: [
        'You are planning your first home-based or beginner online product business.',
        'You want to check unit economics and return risks before buying stock.',
        'You want an honest comparison across marketplaces, WhatsApp, and owned websites.',
        'You do not have an active seller account yet (none is required to follow).',
      ],
      notForTitle: 'Not designed for you if',
      notForList: [
        'You expect complete step-by-step account setup for all eight channels in 90 minutes.',
        'You want advanced ad-scaling tactics for an established high-volume brand.',
        'You are looking for guaranteed income, assured marketplace approval, or get-rich-quick shortcuts.',
      ],
      agendaHeading: 'Exact 90-minute live agenda',
      worksheetHeading: 'Practical planning worksheet example',
      presenterHeading: 'Presented and hosted by',
      presenterRole: 'Workshop Presenter & Host',
      presenterBio:
        'Shubham Chaturvedi hosts Bonnza’s 90-minute live beginner ecommerce workshops in English and Hindi, guiding first-time entrepreneurs through product selection, unit costing, and channel decisions.',
      inclusionsHeading: 'Ticket scope and transparency',
      includedTitle: 'Included with your ₹299 workshop ticket',
      includedList: [
        '90-minute live interactive workshop (English 1:00 PM IST or Hindi 4:00 PM IST)',
        'Practical planning worksheet for product, cost, and first-channel decisions',
        'Structured group Q&A within the 90-minute session',
      ],
      notIncludedTitle: 'Not included',
      notIncludedList: [
        'Complete programme enrolment',
        'Full marketplace onboarding or step-by-step listing execution',
        'Personal one-on-one business implementation services',
        'Guaranteed sales, marketplace approval, or income',
      ],
      replayNote:
        'Replay access note: If seven-day replay access is made available for this session, viewing details will be shared with registered attendees by email. Plan to join live for interactive Q&A.',
      faqHeading: 'Workshop frequently asked questions',
      finalHeadline: 'Ready to build your starting plan?',
    },
    common: {
      minutes: '90 minutes',
      presenter: 'Shubham Chaturvedi',
      workingTicketPrice: '₹299 workshop ticket',
      learnMore: 'Learn more',
      viewCourse: 'View course syllabus',
      backToAll: 'Back to overview',
      editorialDraftNotice: 'Verified Bonnza Ecommerce Guide',
      hindiDraftReviewNotice: 'Available in English and Hindi',
      provisionalPriceNotice:
        'Cohort pricing shown in INR. Applicable taxes and final invoice details are confirmed at checkout.',
      checkoutDisabledNotice:
        'Cohort enrolment opens shortly. Leave your email below to be notified as soon as registrations open.',
      noPublishedArticlesYet:
        'Browse practical Ecommerce Guides across key product, costing, and channel topics.',
      inspectEditorialDrafts: 'Ecommerce Guides',
    },
    footer: {
      tagline: 'Start smart. Sell online.',
      descriptor: 'Practical ecommerce education for your first online business.',
      programmesCol: 'Programmes',
      pathsCol: 'Learning Paths & Channels',
      resourcesCol: 'Resources & Guides',
      policiesCol: 'Policies',
      contactCol: 'Support & Contact',
      bottomNote:
        '© 2026 Bonnza. Practical ecommerce education for your first online business.',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      workshop: 'वर्कशॉप',
      programmes: 'प्रोग्राम',
      paths: 'बिज़नेस पथ',
      resources: 'संसाधन',
      ecommerceGuides: 'गाइड',
      ideas: 'आइडिया',
      about: 'हमारे बारे में',
      contact: 'संपर्क',
      bookWorkshop: 'सीट बुक करें',
      menuOpen: 'मेनू खोलें',
      menuClose: 'मेनू बंद करें',
      languageLabel: 'वेबसाइट भाषा',
    },
    home: {
      eyebrow: 'व्यावहारिक ई-कॉमर्स शिक्षा',
      heroHeadline: 'अपने पहले ऑनलाइन उत्पाद बिज़नेस की स्पष्ट योजना बनाएं।',
      heroSubtitle:
        'Bonnza के साथ सीखें कि सही उत्पाद कैसे चुनें, खर्चों को कैसे समझें और ऑनलाइन बिक्री शुरू करने के लिए उपयुक्त चैनल कैसे तय करें।',
      heroPrimaryCta: 'अभी पंजीकरण करें',
      heroSecondaryCta: 'पूरा प्रोग्राम देखें',
      outcomesHeading: 'अनुमान नहीं, स्पष्टता से शुरुआत करें।',
      outcomesSubheading:
        'वास्तविक लागत गणित, उत्पाद तैयारी और व्यावहारिक शुरुआती निर्णयों पर केंद्रित शिक्षा।',
      outcomes: [
        {
          title: 'उत्पाद और ग्राहक दिशा तय करें',
          detail:
            'स्पष्ट खरीदार आवश्यकता पहचानें और तय करें कि निर्माण, रीसेलिंग या शिल्प-स्रोत में से क्या उपयुक्त है।',
        },
        {
          title: 'ऑनलाइन बिक्री की वास्तविक लागत समझें',
          detail:
            'उत्पाद, पैकेजिंग, शिपिंग, चैनल शुल्क, रिटर्न हानि और ग्राहक-प्राप्ति लागत का पूरा हिसाब जोड़ें।',
        },
        {
          title: 'पहला उपयुक्त बिक्री चैनल चुनें',
          detail:
            'मार्केटप्लेस, WhatsApp/सोशल और अपनी वेबसाइट की निष्पक्ष तुलना करें और पहले एक सही रास्ता चुनें।',
        },
        {
          title: 'कार्यान्वयन योग्य शुरुआती योजना बनाएं',
          detail:
            'बिना सोचे-समझे बड़ा स्टॉक खरीदने से पहले सात-दिवसीय परीक्षण के ठोस कदम तय करें।',
        },
      ],
      audienceHeading: 'पहली बार ऑनलाइन बिज़नेस शुरू करने वालों के लिए निर्मित।',
      audienceSubheading:
        'व्यावहारिक मार्गदर्शन—बिना किसी झूठे आय के वादे या जटिल तकनीकी शब्दावली के।',
      audiences: [
        {
          title: 'पहली बार उद्यम करने वाले',
          detail: 'जो स्टॉक या टूल पर खर्च करने से पहले स्पष्ट और ईमानदार शुरुआत चाहते हैं।',
        },
        {
          title: 'घर से काम करने वाले उद्यमी',
          detail: 'जो सीमित समय, जगह और शुरुआती बजट के साथ संतुलन बनाकर शुरुआत कर रहे हैं।',
        },
        {
          title: 'नए रीसेलर्स',
          detail: 'जो आपूर्तिकर्ताओं की तुलना, सैंपल जांच और अपने सेलर अकाउंट से बिक्री करना चाहते हैं।',
        },
        {
          title: 'निर्माता और शिल्प उद्यमी',
          detail: 'जो स्वयं हस्तनिर्मित वस्तुएं बनाते हैं और सामग्री, श्रम घंटे व क्षमता का सही मूल्य चाहते हैं।',
        },
        {
          title: 'कलाकार-स्रोत शिल्प व्यवसाय',
          detail: 'जो कलाकारों से तैयार शिल्प जिम्मेदारी, सत्य प्रमाण और चैनल पात्रता के साथ सोर्स करते हैं।',
        },
      ],
      pathsHeading: 'शुरुआत के दो रास्ते। एक व्यावहारिक सीखने की यात्रा।',
      pathsSubheading:
        'वह मार्ग चुनें जो बताता है कि आपका भौतिक उत्पाद ग्राहकों तक कैसे पहुंचेगा।',
      exploreResell: 'रीसेल पथ देखें',
      exploreCraft: 'क्राफ्ट टू कॉमर्स देखें',
      channelsHeading: 'सीखें कि ऑनलाइन कहाँ और कैसे बेचें।',
      channelsSubheading:
        'पूर्ण पाठ्यक्रम में सभी आठ चैनल शामिल हैं—जबकि शुरुआत में एक उपयुक्त चैनल को अच्छी तरह लागू करने पर ध्यान दिया जाता है।',
      channelsNote:
        'Bonnza एक स्वतंत्र शिक्षा मंच है और किसी भी मार्केटप्लेस या प्लेटफ़ॉर्म के साथ आधिकारिक साझेदारी का दावा नहीं करता।',
      featuredWebinarHeading: '90 मिनट में अपने पहले ई-कॉमर्स निर्णय लें।',
      featuredWebinarSubheading:
        'शनिवार, 5 दिसंबर 2026 को शुभम चतुर्वेदी के साथ जुड़ें—अंग्रेज़ी (1:00 PM IST) और हिंदी (4:00 PM IST) में अलग-अलग लाइव सत्र।',
      viewWorkshopDetails: 'लाइव वर्कशॉप विवरण देखें',
      programmeHeading: 'पहले विचार से व्यावहारिक ई-कॉमर्स संचालन तक।',
      programmeSubheading:
        'अंग्रेज़ी और हिंदी में संरचित लिखित पाठ्यक्रम—नींव, सोर्सिंग, शिल्प लागत, मार्केटप्लेस, अपना स्टोर और दैनिक संचालन सहित।',
      programmeHighlights: [
        'अंग्रेज़ी और हिंदी दोनों में चरण-दर-चरण संरचित पाठ्यक्रम',
        'लागत गणना, आपूर्तिकर्ता तुलना, सैंपल जांच और लॉन्च परीक्षण वर्कशीट',
        '8 भारतीय व अंतर्राष्ट्रीय बिक्री चैनलों का व्यावहारिक कवरेज',
        'बैच नामांकन पर 12 महीने की रिकॉर्डेड एक्सेस',
        'बैच खुलने पर 10 सप्ताह का निर्धारित समूह सहयोग',
      ],
      programmeScheduleNote:
        'रिकॉर्डेड एक्सेस और 10 सप्ताह का समूह सहयोग प्रकाशित बैच कैलेंडर के अनुसार प्रदान किया जाता है।',
      exploreProgramme: 'पूरा प्रोग्राम देखें',
      resourcesHeading: 'नामांकन से पहले सीखें और अपनी योजना बनाएं।',
      resourcesSubheading:
        'उत्पाद चयन, लागत गणित और बिक्री चैनलों पर हमारे व्यावहारिक ई-कॉमर्स गाइड पढ़ें, या अपने ब्राउज़र में अलग से इंटरैक्टिव कैलकुलेटर व वर्कशीट खोलें।',
      openResources: 'कैलकुलेटर व वर्कशीट खोलें',
      openEditorialPreview: 'ई-कॉमर्स गाइड देखें',
      faqHeading: 'शुरू करने से पहले सामान्य प्रश्न',
      finalHeadline: 'समझदारी से शुरुआत करें। योजना बनाएं। अगला कदम उठाएं।',
      finalPrimaryCta: 'अभी पंजीकरण करें',
      finalSecondaryCta: 'Bonnza से संपर्क करें',
    },
    webinar: {
      eyebrow: 'लाइव शुरुआती ई-कॉमर्स वर्कशॉप',
      headline: 'अपने पहले ऑनलाइन उत्पाद बिज़नेस की स्पष्ट योजना बनाएं।',
      subtitle:
        'Bonnza की 90-मिनट की व्यावहारिक लाइव वर्कशॉप में उत्पाद दिशा चुनें, लागत जांचें और पहला उपयुक्त बिक्री चैनल तय करें।',
      primaryCta: 'अभी पंजीकरण करें',
      continueToRegistration: 'अभी पंजीकरण करें',
      bookingTitle: 'अपना लाइव वर्कशॉप सत्र चुनें',
      selectSessionPrompt: 'अपनी पसंदीदा सत्र भाषा चुनें:',
      englishSessionLabel: 'अंग्रेज़ी लाइव सत्र',
      hindiSessionLabel: 'हिंदी लाइव सत्र',
      selectedSessionBadge: 'चयनित सत्र',
      displayLanguageNote: '',
      paymentPendingNotice: '',
      noMeetingLinkNotice: '',
      outcomesHeading: 'इस वर्कशॉप से आप क्या लेकर जाएंगे?',
      outcomes: [
        'शुरुआती उत्पाद और खरीदार की स्पष्ट दिशा।',
        'सत्यापन योग्य मान्यताओं के साथ एक सरल लागत मॉडल।',
        'उपयुक्तता और तैयारी के आधार पर पहले चैनल का निर्णय।',
        'आने वाले सप्ताह के लिए तीन व्यावहारिक कदम।',
      ],
      audienceHeading: 'यह वर्कशॉप किसके लिए है',
      suitableForTitle: 'यह आपके लिए उपयुक्त है यदि',
      suitableForList: [
        'आप घर से या पहली बार अपना ऑनलाइन उत्पाद व्यापार शुरू कर रहे हैं।',
        'आप स्टॉक खरीदने से पहले लागत और रिटर्न जोखिम समझना चाहते हैं।',
        'आप मार्केटप्लेस, WhatsApp और अपनी वेबसाइट की ईमानदार तुलना चाहते हैं।',
        'आपके पास अभी कोई सेलर अकाउंट नहीं है (शामिल होने के लिए आवश्यक नहीं)।',
      ],
      notForTitle: 'यह आपके लिए नहीं है यदि',
      notForList: [
        'आप 90 मिनट में सभी आठ चैनलों का पूरा अकाउंट सेटअप सीखने की उम्मीद रखते हैं।',
        'आप किसी बड़े ब्रांड के लिए उन्नत विज्ञापन स्केलिंग खोज रहे हैं।',
        'आप सुनिश्चित कमाई, गारंटीड मार्केटप्लेस स्वीकृति या शॉर्टकट खोज रहे हैं।',
      ],
      agendaHeading: '90-मिनट का सटीक लाइव एजेंडा',
      worksheetHeading: 'व्यावहारिक प्लानिंग वर्कशीट उदाहरण',
      presenterHeading: 'प्रस्तुतकर्ता एवं होस्ट',
      presenterRole: 'वर्कशॉप प्रस्तुतकर्ता व होस्ट',
      presenterBio:
        'शुभम चतुर्वेदी अंग्रेज़ी और हिंदी में Bonnza की 90-मिनट लाइव शुरुआती ई-कॉमर्स वर्कशॉप प्रस्तुत करते हैं, जिसमें उत्पाद चयन, लागत गणित और पहले चैनल के निर्णय सिखाए जाते हैं।',
      inclusionsHeading: 'टिकट का दायरा और पारदर्शिता',
      includedTitle: '₹299 वर्कशॉप टिकट में शामिल',
      includedList: [
        '90-मिनट की लाइव वर्कशॉप (अंग्रेज़ी 1:00 PM IST या हिंदी 4:00 PM IST)',
        'उत्पाद, लागत और पहले चैनल निर्णय के लिए प्लानिंग वर्कशीट',
        'सत्र के भीतर समूह प्रश्नोत्तर (Q&A)',
      ],
      notIncludedTitle: 'शामिल नहीं है',
      notIncludedList: [
        'पूर्ण प्रोग्राम में नामांकन',
        'प्रत्येक मार्केटप्लेस का पूर्ण तकनीकी सेटअप प्रशिक्षण',
        'व्यक्तिगत व्यावसायिक कार्यान्वयन सेवाएं',
        'बिक्री, मार्केटप्लेस स्वीकृति या आय की कोई गारंटी',
      ],
      replayNote:
        'रीप्ले सूचना: यदि किसी सत्र के लिए सात दिन की रीप्ले सुविधा उपलब्ध कराई जाती है, तो विवरण पंजीकृत प्रतिभागियों को ईमेल द्वारा साझा किया जाएगा। लाइव प्रश्नोत्तर के लिए कृपया समय पर जुड़ें।',
      faqHeading: 'वर्कशॉप से जुड़े सामान्य प्रश्न',
      finalHeadline: 'अपनी शुरुआती योजना बनाने के लिए तैयार हैं?',
    },
    common: {
      minutes: '90 मिनट',
      presenter: 'शुभम चतुर्वेदी',
      workingTicketPrice: '₹299 वर्कशॉप टिकट',
      learnMore: 'विस्तार से जानें',
      viewCourse: 'कोर्स पाठ्यक्रम देखें',
      backToAll: 'मुख्य सूची पर लौटें',
      editorialDraftNotice: 'Bonnza सत्यापित ई-कॉमर्स गाइड',
      hindiDraftReviewNotice: 'अंग्रेज़ी और हिंदी में उपलब्ध',
      provisionalPriceNotice:
        'प्रोग्राम मूल्य INR में प्रदर्शित हैं। लागू कर और अंतिम चालान विवरण चेकआउट पर स्पष्ट किए जाते हैं।',
      checkoutDisabledNotice:
        'नए बैच के लिए नामांकन शीघ्र खुलेगा। खुलते ही सूचना पाने के लिए नीचे अपना ईमेल दर्ज करें।',
      noPublishedArticlesYet: 'उत्पाद चयन, लागत और बिक्री चैनलों पर ई-कॉमर्स गाइड पढ़ें।',
      inspectEditorialDrafts: 'ई-कॉमर्स गाइड',
    },
    footer: {
      tagline: 'स्मार्ट शुरुआत करें। ऑनलाइन बेचें।',
      descriptor: 'आपके पहले ऑनलाइन बिज़नेस के लिए व्यावहारिक ई-कॉमर्स शिक्षा।',
      programmesCol: 'प्रोग्राम',
      pathsCol: 'लर्निंग पाथ और चैनल',
      resourcesCol: 'संसाधन व गाइड',
      policiesCol: 'नीतियाँ',
      contactCol: 'सहायता और संपर्क',
      bottomNote:
        '© 2026 Bonnza। आपके पहले ऑनलाइन बिज़नेस के लिए व्यावहारिक ई-कॉमर्स शिक्षा।',
    },
  },
};
