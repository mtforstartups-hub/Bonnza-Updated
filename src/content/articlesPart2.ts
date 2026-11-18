import type { ArticleRecord } from '../domain/types';

export const ARTICLES_PART_2: ArticleRecord[] = [
  {
    id: 'B11',
    slug: 'meesho-seller-readiness-checklist',
    hiSlug: 'meesho-seller-readiness-checklist',
    title: {
      en: 'Preparing to sell on Meesho: a beginner readiness checklist',
      hi: 'Meesho पर बिक्री की तैयारी: शुरुआती तैयारी चेकलिस्ट',
    },
    shortDescription: {
      en: 'Verify GSTIN vs Enrolment ID/UIN route limitations, pickup and bank details, stock records, and product economics before signing up.',
      hi: 'साइन अप करने से पहले GSTIN बनाम Enrolment ID/UIN सीमाएं, पिकअप व बैंक विवरण, स्टॉक और लागत की जांच करें।',
    },
    directAnswer: {
      en: 'Before registering to sell on Meesho, confirm your applicable seller route, prepare the information requested for that route, check your pickup and bank readiness, and assemble accurate product data. Registration is one part of preparation. You also need an offer you can list truthfully, cost sensibly and dispatch reliably.',
      hi: 'Meesho पर पंजीकरण करने से पहले अपना लागू विक्रेता मार्ग सत्यापित करें, उस मार्ग के लिए आवश्यक जानकारी तैयार रखें, पिकअप व बैंक तैयारी जांचें और सटीक उत्पाद डेटा जुटाएं। पंजीकरण तैयारी का केवल एक हिस्सा है।',
    },
    summary: {
      en: 'Distinguishes GSTIN vs state-restricted Enrolment ID/UIN and composition-GST routes, with official Meesho references checked 15 Nov 2026.',
      hi: 'GSTIN बनाम राज्य-सीमित Enrolment ID/UIN और कंपोज़िशन-GST मार्गों में अंतर, 15 नवंबर 2026 को जांचे गए आधिकारिक संदर्भों सहित।',
    },
    keyTakeaways: {
      en: [
        'Distinguish regular GSTIN routes from Enrolment ID/UIN and composition-GST routes, which may restrict interstate sales.',
        'Do not assume all sellers can sell nationwide without GST registration.',
        'Verify official Meesho Supplier Hub requirements before onboarding.',
      ],
      hi: [
        'नियमित GSTIN मार्ग को Enrolment ID/UIN और कंपोज़िशन-GST मार्ग से अलग समझें, जिनमें राज्य-सीमित बिक्री शर्तें हो सकती हैं।',
        'यह न मानें कि बिना GST के सभी विक्रेता पूरे देश में बेच सकते हैं।',
        'ऑनबोर्डिंग से पहले आधिकारिक Meesho सप्लायर हब शर्तें सत्यापित करें।',
      ],
    },
    topicCluster: 'meesho',
    topicClusterLabel: { en: 'Meesho', hi: 'Meesho' },
    priority: 'P2',
    intendedReader: {
      en: 'New Indian sellers considering Meesho as their starting marketplace.',
      hi: 'Meesho को अपने पहले मार्केटप्लेस के रूप में देख रहे नए भारतीय विक्रेता।',
    },
    searchIntent: {
      en: 'Pre-registration checklist for Meesho supplier onboarding and tax route checks.',
      hi: 'Meesho सप्लायर ऑनबोर्डिंग व कर-मार्ग जांच के लिए पूर्व-पंजीकरण चेकलिस्ट।',
    },
    courseMappings: ['C05-L01', 'C05-L02'],
    relatedArticleIds: ['B03', 'B12', 'B04'],
    primaryCta: {
      label: {
        en: 'Review Meesho course readiness and release details',
        hi: 'Meesho कोर्स तैयारी और विवरण देखें',
      },
      path: '/courses/meesho-selling',
    },
    sections: [
      {
        id: 'tax-routes-distinction',
        heading: {
          en: 'Why must you check GSTIN versus Enrolment ID/UIN routes carefully?',
          hi: 'GSTIN बनाम Enrolment ID/UIN मार्गों की सावधानी से जांच क्यों आवश्यक है?',
        },
        paragraphs: {
          en: [
            'Meesho supports GSTIN-based seller registration as well as specific Enrolment ID/UIN routes for eligible non-GST sellers. However, non-GST and composition-GST routes generally carry intra-state or state-specific selling limitations under Indian tax rules.',
            'Never assume every category or nationwide shipping route is open without regular GST registration. Verify your exact eligibility and permitted states directly against Meesho’s live supplier guidance and tax rules.',
          ],
          hi: [
            'Meesho पर GSTIN-आधारित पंजीकरण के साथ पात्र नॉन-GST विक्रेताओं के लिए विशिष्ट Enrolment ID/UIN मार्ग भी उपलब्ध हैं। लेकिन नॉन-GST और कंपोज़िशन-GST मार्गों में प्रायः राज्य-सीमित बिक्री सीमाएं लागू होती हैं।',
            'यह कभी न मानें कि बिना नियमित GST के देश भर में बिक्री हो सकती है। हमेशा Meesho के लाइव दिशानिर्देश और कर नियम जांचें।',
          ],
        },
      },
      {
        id: 'operational-readiness',
        heading: {
          en: 'What operational data should be ready before opening your account?',
          hi: 'अकाउंट खोलने से पहले कौन-सा संचालन डेटा तैयार होना चाहिए?',
        },
        paragraphs: {
          en: [
            'Prepare verified bank account details matching your seller registration, a reliable courier pickup address with serviceable PIN code, clear stock counts, clean product photography, packed dimensions/weight, and a unit-cost model that accounts for expected returns.',
          ],
          hi: [
            'पंजीकरण से मेल खाता बैंक खाता विवरण, कूरियर-सक्षम पिकअप पता, सटीक स्टॉक गिनती, स्पष्ट फोटो, पैक वजन/माप और रिटर्न सहित लागत गणना तैयार रखें।',
          ],
        },
      },
    ],
    comparisonTable: {
      caption: {
        en: 'Meesho Registration Route & Readiness Snapshot',
        hi: 'Meesho पंजीकरण मार्ग व तैयारी तालिका',
      },
      headers: {
        en: ['Readiness Area', 'GSTIN Route', 'Enrolment ID / UIN (Non-GST) Route'],
        hi: ['तैयारी क्षेत्र', 'GSTIN मार्ग', 'Enrolment ID / UIN (नॉन-GST) मार्ग'],
      },
      rows: {
        en: [
          ['Sales reach scope', 'Supports pan-India interstate sales per tax rules', 'Generally limited to intra-state sales within your registered state'],
          ['Tax / identity docs', 'Active regular GSTIN matching PAN & bank account', 'Enrolment ID / UIN eligibility check; composition-GST restrictions apply'],
          ['Bank & pickup', 'Matching active bank account + serviceable pickup PIN', 'Matching active bank account + serviceable pickup PIN'],
          ['Pre-launch economics', 'Include shipping slabs & expected return rate before pricing', 'Include shipping slabs & expected return rate before pricing'],
        ],
        hi: [
          ['बिक्री क्षेत्र सीमा', 'कर नियमों के अनुसार अंतर-राज्यीय (पैन-इंडिया) बिक्री संभव', 'प्रायः पंजीकृत राज्य के भीतर (इंट्रा-स्टेट) बिक्री तक सीमित'],
          ['कर / पहचान दस्तावेज़', 'PAN व बैंक खाते से मेल खाता सक्रिय नियमित GSTIN', 'Enrolment ID / UIN पात्रता जांच; कंपोज़िशन-GST सीमाएं लागू'],
          ['बैंक व पिकअप', 'मेल खाता सक्रिय बैंक खाता + सेवा योग्य पिकअप पिनकोड', 'मेल खाता सक्रिय बैंक खाता + सेवा योग्य पिकअप पिनकोड'],
          ['लॉन्च-पूर्व लागत', 'कीमत तय करने से पहले शिपिंग स्लैब व रिटर्न दर जोड़ें', 'कीमत तय करने से पहले शिपिंग स्लैब व रिटर्न दर जोड़ें'],
        ],
      },
    },
    worksheetSummary: {
      title: {
        en: 'Meesho Beginner Readiness Checklist',
        hi: 'Meesho शुरुआती तैयारी चेकलिस्ट',
      },
      fields: {
        en: [
          'Confirmed tax registration route (Regular GSTIN vs Enrolment ID / UIN intra-state)',
          'Composition-GST or state selling limitations verified',
          'Active bank account matching legal seller name & PAN',
          'Reliable pickup address with serviceable courier PIN code',
          'Inspected initial stock count & SKU list ready',
          'Clean product images, packed weight & unit-cost sheet verified',
        ],
        hi: [
          'सत्यापित कर मार्ग (नियमित GSTIN बनाम Enrolment ID / UIN इंट्रा-स्टेट)',
          'कंपोज़िशन-GST या राज्य-स्तरीय बिक्री सीमाओं की पुष्टि',
          'कानूनी नाम व PAN से मेल खाता सक्रिय बैंक खाता',
          'सेवा योग्य कूरियर पिनकोड वाला विश्वसनीय पिकअप पता',
          'जांचा गया शुरुआती स्टॉक व SKU सूची तैयार',
          'स्पष्ट उत्पाद फोटो, पैक वजन व प्रति-यूनिट लागत शीट सत्यापित',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'Can every seller sell pan-India on Meesho without GST?',
          hi: 'क्या हर विक्रेता बिना GST के पूरे भारत में Meesho पर बेच सकता है?',
        },
        answer: {
          en: 'No. Non-GST Enrolment ID/UIN and composition-GST routes are subject to specific eligibility and state-level restrictions.',
          hi: 'नहीं। नॉन-GST Enrolment ID/UIN और कंपोज़िशन-GST मार्ग विशिष्ट पात्रता और राज्य-सीमित शर्तों के अधीन होते हैं।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Meesho Supplier Hub — Sell without GST guide',
        url: 'https://supplier.int.meeshogcp.in/dont-have-gst',
        checkedDate: '2026-11-15',
      },
      {
        label: 'Meesho Supplier Hub — How it works',
        url: 'https://supplier.int.meeshogcp.in/how-it-works',
        checkedDate: '2026-11-15',
      },
      {
        label: 'Meesho Learning Hub — How to start selling',
        url: 'https://supplier.int.meeshogcp.in/learning-hub/categories/how-to-start-selling',
        checkedDate: '2026-11-15',
      },
    ],
    author: { en: 'Bonnza Editorial Team', hi: 'Bonnza संपादकीय टीम' },
    reviewer: { en: 'Shubham Chaturvedi', hi: 'शुभम चतुर्वेदी' },
    sourceCheckedDate: '2026-11-16',
    publicationDate: '2026-11-16',
    lastSubstantiveUpdateDate: '2026-11-16',
    editorialStatus: 'PUBLISHED',
    subjectReviewStatus: 'VERIFIED',
    translationStatus: 'APPROVED',
    seoTitle: {
      en: 'Meesho Seller Readiness Checklist for Beginners | Bonnza',
      hi: 'शुरुआती विक्रेताओं के लिए Meesho तैयारी चेकलिस्ट | Bonnza',
    },
    metaDescription: {
      en: 'Check GSTIN vs Enrolment ID routes, pickup readiness, bank verification, and product costing before listing on Meesho.',
      hi: 'Meesho पर पंजीकरण से पहले GSTIN बनाम Enrolment ID मार्ग, पिकअप और लागत तैयारी जांचें।',
    },
    canonicalPath: '/en/blog/meesho-seller-readiness-checklist',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 5,
  },
  {
    id: 'B12',
    slug: 'meesho-catalogue-quality-check',
    hiSlug: 'meesho-catalogue-quality-check',
    title: {
      en: 'How to check a Meesho catalogue before publishing',
      hi: 'प्रकाशित करने से पहले Meesho कैटलॉग की गुणवत्ता कैसे जांचें',
    },
    shortDescription: {
      en: 'Prevent pack-quantity and stock mismatches across titles, gallery images, attributes, and SKUs before going live.',
      hi: 'लाइव होने से पहले शीर्षक, फोटो, पैक मात्रा और स्टॉक गिनती की विसंगतियां रोकें।',
    },
    directAnswer: {
      en: 'Before publishing a Meesho catalogue, check that the category, attributes, images, pack quantity, variants, stock and price all describe the same physical offer. Then confirm you can dispatch that offer. A catalogue can contain individually plausible fields that become misleading when read together.',
      hi: 'Meesho कैटलॉग प्रकाशित करने से पहले जांचें कि श्रेणी, गुण, फोटो, पैक मात्रा, वेरिएंट, स्टॉक और कीमत एक ही भौतिक उत्पाद का वर्णन करते हैं। फिर पुष्टि करें कि आप वही ऑफ़र डिस्पैच कर सकते हैं।',
    },
    summary: {
      en: 'Resolves a fictional mismatch (title says set of 2 pouches, image shows 3, pack-quantity says 1, stock counted in pieces → max 5 sets from 10 pieces).',
      hi: 'काल्पनिक कैटलॉग विसंगति का समाधान (शीर्षक में 2 का सेट, फोटो में 3, पैक फ़ील्ड में 1 → 10 पीस से अधिकतम 5 दो-पीस सेट)।',
    },
    keyTakeaways: {
      en: [
        'Align title, gallery images, pack-quantity field, price, and SKU stock around one exact physical unit or set.',
        'If you sell two-piece pouch sets and hold 10 usable pieces, list stock as at most 5 sets—not 10.',
        'Perform a second-person review to catch subtle contradictions before buyers receive the wrong quantity.',
      ],
      hi: [
        'शीर्षक, फोटो, पैक मात्रा, कीमत और SKU स्टॉक को एक ही वास्तविक ऑफ़र पर संरेखित करें।',
        'यदि 2-पीस सेट बेच रहे हैं और 10 सही पीस हैं, तो स्टॉक अधिकतम 5 सेट लिखें, 10 नहीं।',
        'खरीदार को गलत मात्रा जाने से रोकने के लिए किसी दूसरे व्यक्ति से कैटलॉग की जांच कराएं।',
      ],
    },
    topicCluster: 'meesho',
    topicClusterLabel: { en: 'Meesho', hi: 'Meesho' },
    priority: 'P3',
    intendedReader: {
      en: 'Sellers preparing single or bulk catalogue uploads on Meesho.',
      hi: 'Meesho पर सिंगल या बल्क कैटलॉग अपलोड की तैयारी कर रहे विक्रेता।',
    },
    searchIntent: {
      en: 'Pre-publish Meesho catalogue quality check and pack-count consistency guide.',
      hi: 'प्रकाशन-पूर्व Meesho कैटलॉग गुणवत्ता और पैक-संख्या संगति जांच।',
    },
    courseMappings: ['C05-L02', 'C05-L03'],
    relatedArticleIds: ['B11', 'B05', 'B20'],
    primaryCta: {
      label: {
        en: 'Practise catalogue preparation in the Meesho course',
        hi: 'Meesho कोर्स में कैटलॉग तैयारी का अभ्यास करें',
      },
      path: '/courses/meesho-selling',
    },
    sections: [
      {
        id: 'pack-mismatch-example',
        heading: {
          en: 'How do individually plausible catalogue fields create a misleading offer?',
          hi: 'अलग-अलग सही दिखने वाले फ़ील्ड मिलकर भ्रामक ऑफ़र कैसे बना देते हैं?',
        },
        paragraphs: {
          en: [
            'Consider this fictional mismatch: the listing title says "Set of 2 Cotton Travel Pouches", the main gallery image shows three pouches side by side for size comparison, the pack-quantity attribute is left at "1", and warehouse stock was entered as "10" individual pieces.',
            'A buyer sees three pouches or expects two, while the picker sees pack quantity 1 and ships a single pouch. To fix it: shoot a clean photo of exactly two pouches, set pack-quantity to 2, set price for the two-pack, and enter stock as at most 5 two-piece sets (if all 10 individual units are usable).',
          ],
          hi: [
            'यह काल्पनिक विसंगति देखें: शीर्षक में “2 कॉटन पाउच का सेट” लिखा है, मुख्य फोटो में 3 पाउच दिखते हैं, पैक-मात्रा फ़ील्ड में “1” है और स्टॉक में “10” पीस लिखे हैं।',
            'सुधार के लिए: ठीक 2 पाउच की फोटो लगाएं, पैक-मात्रा 2 सेट करें, कीमत 2-पैक की रखें और यदि सभी 10 पीस सही हैं तो स्टॉक अधिकतम 5 सेट दर्ज करें।',
          ],
        },
      },
    ],
    faqEntries: [
      {
        question: {
          en: 'Why do QC rejections or buyer returns happen on multi-pack listings?',
          hi: 'मल्टी-पैक लिस्टिंग पर QC अस्वीकृति या रिटर्न क्यों बढ़ते हैं?',
        },
        answer: {
          en: 'Mismatch between visual image counts, title wording, and pack-quantity attributes is one of the fastest ways to trigger buyer disappointment or QC flags.',
          hi: 'फोटो में दिखने वाली संख्या, शीर्षक और पैक-मात्रा फ़ील्ड में अंतर सीधे ग्राहक असंतोष और QC त्रुटि का कारण बनता है।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Meesho Learning Hub — Bulk uploads guide',
        url: 'https://supplier.int.meeshogcp.in/learning-hub/lessons/how-to-list-your-catalogs-using-bulk-uploads',
        checkedDate: '2026-11-15',
      },
      {
        label: 'Meesho Learning Hub — Find and fix QC errors',
        url: 'https://supplier.int.meeshogcp.in/learning-hub/lessons/how-to-find-and-fix-qc-errors',
        checkedDate: '2026-11-15',
      },
    ],
    author: { en: 'Bonnza Editorial Team', hi: 'Bonnza संपादकीय टीम' },
    reviewer: { en: 'Shubham Chaturvedi', hi: 'शुभम चतुर्वेदी' },
    sourceCheckedDate: '2026-11-16',
    publicationDate: '2026-11-16',
    lastSubstantiveUpdateDate: '2026-11-16',
    editorialStatus: 'PUBLISHED',
    subjectReviewStatus: 'VERIFIED',
    translationStatus: 'APPROVED',
    seoTitle: {
      en: 'How to Check a Meesho Catalogue Before Publishing | Bonnza',
      hi: 'प्रकाशन से पहले Meesho कैटलॉग कैसे जांचें | Bonnza',
    },
    metaDescription: {
      en: 'Audit titles, images, pack quantities, SKUs, and stock counts before publishing a Meesho catalogue.',
      hi: 'Meesho कैटलॉग लाइव करने से पहले शीर्षक, फोटो, पैक मात्रा और स्टॉक की जांच सीखें।',
    },
    canonicalPath: '/en/blog/meesho-catalogue-quality-check',
    schemaType: 'Article',
    contentVersion: '1.0',
    readingTimeMinutes: 4,
  },
  {
    id: 'B13',
    slug: 'shopify-wix-first-store-checklist',
    hiSlug: 'shopify-wix-first-store-checklist',
    title: {
      en: 'Shopify or Wix: a practical checklist for a first product store',
      hi: 'Shopify या Wix: पहले उत्पाद स्टोर के लिए व्यावहारिक चेकलिस्ट',
    },
    shortDescription: {
      en: 'Test a six-product, two-colour buying journey across payments, shipping, recurring costs, and mobile checkout before picking.',
      hi: 'चुनने से पहले भुगतान, शिपिंग, आवर्ती खर्च और मोबाइल चेकआउट पर छह उत्पादों व दो रंगों की खरीदारी प्रक्रिया परखें।',
    },
    directAnswer: {
      en: 'Choose between Shopify and Wix by testing the store you need to operate: your products and variants, payment route, shipping setup, total recurring costs and daily maintenance. Build the same small buying journey in each candidate platform before committing. A polished template is useful, but it does not prove that your customer can pay or that you can fulfil the order.',
      hi: 'Shopify और Wix के बीच चुनाव करने के लिए अपनी वास्तविक दुकान चलाकर परखें: आपके उत्पाद व वेरिएंट, भुगतान मार्ग, शिपिंग सेटअप, कुल आवर्ती लागत और दैनिक रखरखाव। सुंदर टेम्पलेट इस बात का प्रमाण नहीं है कि ग्राहक भुगतान कर पाएगा।',
    },
    summary: {
      en: 'Six-product × two-colour test matrix comparing Shopify and Wix neutrally across Indian payment gateways, fees, renewals, and mobile checkout.',
      hi: 'भारतीय पेमेंट गेटवे, शुल्क, नवीनीकरण और मोबाइल चेकआउट पर Shopify और Wix की निष्पक्ष तुलना।',
    },
    keyTakeaways: {
      en: [
        'Test a realistic catalogue (e.g., 6 products with 2 colours each) inside trial accounts before paying.',
        'Verify India-supported payment gateways, third-party transaction fees, and renewal pricing directly.',
        'Neither Shopify nor Wix is universally superior; pick the one whose checkout, shipping, and total cost fit your business.',
      ],
      hi: [
        'भुगतान करने से पहले ट्रायल में वास्तविक कैटलॉग (जैसे 6 उत्पाद, प्रत्येक 2 रंग) परखें।',
        'भारत में समर्थित पेमेंट गेटवे, थर्ड-पार्टी शुल्क और नवीनीकरण कीमत सीधे जांचें।',
        'कोई एक प्लेटफ़ॉर्म सभी के लिए सर्वश्रेष्ठ नहीं; अपनी लागत व संचालन फिट के अनुसार चुनें।',
      ],
    },
    topicCluster: 'shopify-and-wix',
    topicClusterLabel: { en: 'Shopify and Wix', hi: 'Shopify और Wix' },
    priority: 'P2',
    intendedReader: {
      en: 'Sellers deciding between Shopify and Wix for an owned online storefront.',
      hi: 'अपना ऑनलाइन स्टोर बनाने के लिए Shopify और Wix में से चुन रहे विक्रेता।',
    },
    searchIntent: {
      en: 'Neutral operational checklist comparing Shopify and Wix in India.',
      hi: 'भारत में Shopify और Wix की तुलना के लिए व्यावहारिक चेकलिस्ट।',
    },
    courseMappings: ['C07-L01', 'C07-L02'],
    relatedArticleIds: ['B03', 'B14', 'B02'],
    primaryCta: {
      label: {
        en: 'Review the owned-store course',
        hi: 'अपना ऑनलाइन स्टोर कोर्स देखें',
      },
      path: '/courses/own-store-shopify-and-wix',
    },
    sections: [
      {
        id: 'six-product-pilot-test',
        heading: {
          en: 'How should you compare Shopify and Wix side by side?',
          hi: 'Shopify और Wix की आमने-सामने तुलना कैसे करें?',
        },
        paragraphs: {
          en: [
            'Take a concrete pilot scope—such as six products with two colour variants each (12 SKUs total). Load them into both platforms and walk through stock updates, weight/rate shipping rules, and mobile cart-to-checkout flow.',
            'Check which Indian payment providers are currently supported on each platform—for example, Wix documentation for India lists gateways such as Razorpay, PayU, and Cashfree depending on account eligibility, while Shopify publishes country gateway availability alongside any applicable third-party transaction fees. Always compare post-introductory renewal pricing before choosing.',
          ],
          hi: [
            'एक ठोस पायलट दायरा लें—जैसे 6 उत्पाद और प्रत्येक में 2 रंग (कुल 12 SKU)। दोनों प्लेटफ़ॉर्म पर इन्हें डालकर स्टॉक अपडेट, शिपिंग नियम और मोबाइल चेकआउट परखें।',
            'जांचें कि प्रत्येक पर भारत में कौन से पेमेंट प्रोवाइडर उपलब्ध हैं—जैसे Wix की भारत सूची में Razorpay, PayU और Cashfree शामिल हैं, जबकि Shopify देश-वार गेटवे उपलब्धता व थर्ड-पार्टी लेनदेन शुल्क प्रकाशित करता है। हमेशा नवीनीकरण कीमत की तुलना करें।',
          ],
        },
      },
    ],
    comparisonTable: {
      caption: {
        en: 'Shopify vs Wix Pilot Comparison Matrix (6 Products × 2 Colours)',
        hi: 'Shopify बनाम Wix पायलट तुलना तालिका (6 उत्पाद × 2 रंग)',
      },
      headers: {
        en: ['Evaluation Factor', 'Shopify Pilot Check', 'Wix Pilot Check'],
        hi: ['मूल्यांकन मानदंड', 'Shopify पायलट जांच', 'Wix पायलट जांच'],
      },
      rows: {
        en: [
          ['6 × 2 variant catalogue', 'Test 12-SKU stock, pricing & image switching', 'Test 12-SKU product options & stock sync'],
          ['India payment gateways', 'Verify active India third-party gateway + platform fee', 'Check Razorpay / PayU / Cashfree eligibility in India'],
          ['Shipping & PIN rules', 'Test weight/flat shipping zones & COD limits', 'Test shipping regions & flat/weight rate rules'],
          ['Mobile checkout speed', 'Complete full cart-to-checkout flow on a phone', 'Complete full cart-to-checkout flow on a phone'],
          ['Total recurring cost', 'Regular post-trial renewal + apps + gateway/3P fees', 'Regular post-promo eCommerce plan renewal + gateway MDR'],
        ],
        hi: [
          ['6 × 2 वेरिएंट कैटलॉग', '12 SKU स्टॉक, मूल्य व फोटो बदलाव परखें', '12 SKU विकल्प व इन्वेंटरी सिंक परखें'],
          ['भारत पेमेंट गेटवे', 'सक्रिय भारतीय गेटवे व थर्ड-पार्टी शुल्क जांचें', 'भारत में Razorpay / PayU / Cashfree पात्रता जांचें'],
          ['शिपिंग व पिन नियम', 'वजन/समतल शिपिंग क्षेत्र व COD सीमा परखें', 'शिपिंग क्षेत्र व दर नियम परखें'],
          ['मोबाइल चेकआउट गति', 'फ़ोन पर कार्ट से चेकआउट तक पूरी यात्रा परखें', 'फ़ोन पर कार्ट से चेकआउट तक पूरी यात्रा परखें'],
          ['कुल आवर्ती लागत', 'ट्रायल के बाद नियमित नवीनीकरण + ऐप + लेनदेन शुल्क', 'प्रोमो के बाद नियमित ई-कॉमर्स प्लान + गेटवे शुल्क'],
        ],
      },
    },
    worksheetSummary: {
      title: {
        en: 'First-Store Platform Selection Sheet',
        hi: 'पहला स्टोर प्लेटफ़ॉर्म चयन शीट',
      },
      fields: {
        en: [
          '6 products × 2 colour variants uploaded & tested',
          'Confirmed India payment gateway & KYC status',
          'Combined monthly plan + app + transaction fee calculation',
          'Shipping zone & courier integration test result',
          'Mobile checkout completion test & final platform pick',
        ],
        hi: [
          '6 उत्पाद × 2 रंग वेरिएंट अपलोड व परीक्षण',
          'भारत पेमेंट गेटवे व KYC स्थिति पुष्टि',
          'कुल मासिक प्लान + ऐप + लेनदेन शुल्क गणना',
          'शिपिंग क्षेत्र व कूरियर एकीकरण परीक्षण परिणाम',
          'मोबाइल चेकआउट परीक्षण व अंतिम प्लेटफ़ॉर्म चयन',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'Is Shopify or Wix better for every Indian beginner?',
          hi: 'क्या हर भारतीय शुरुआती विक्रेता के लिए Shopify या Wix में से एक हमेशा बेहतर है?',
        },
        answer: {
          en: 'Neither is universally superior. Your choice depends on supported Indian payment gateways, total monthly + transaction cost, and which admin workflow you can maintain weekly.',
          hi: 'दोनों में से कोई एक सार्वभौमिक रूप से बेहतर नहीं है। चुनाव उपलब्ध पेमेंट गेटवे, कुल लागत और आपकी संचालन सहजता पर निर्भर करता है।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Shopify Payment Gateway Availability',
        url: 'https://help.shopify.com/en/manual/payments/third-party-providers/payment-gateway-availability',
        checkedDate: '2026-11-15',
      },
      {
        label: 'Wix Available Payment Providers by Country',
        url: 'https://support.wix.com/en/article/available-payment-providers-in-your-country',
        checkedDate: '2026-11-15',
      },
      {
        label: 'Shopify Third-Party Transaction Fees',
        url: 'https://help.shopify.com/en/manual/your-account/manage-billing/billing-charges/types-of-charges/third-party-charges/third-party-transaction-fees',
        checkedDate: '2026-11-15',
      },
    ],
    author: { en: 'Bonnza Editorial Team', hi: 'Bonnza संपादकीय टीम' },
    reviewer: { en: 'Shubham Chaturvedi', hi: 'शुभम चतुर्वेदी' },
    sourceCheckedDate: '2026-11-16',
    publicationDate: '2026-11-16',
    lastSubstantiveUpdateDate: '2026-11-16',
    editorialStatus: 'PUBLISHED',
    subjectReviewStatus: 'VERIFIED',
    translationStatus: 'APPROVED',
    seoTitle: {
      en: 'Shopify or Wix? A First-Store Checklist | Bonnza',
      hi: 'Shopify या Wix? पहले स्टोर की व्यावहारिक चेकलिस्ट | Bonnza',
    },
    metaDescription: {
      en: 'Compare Shopify and Wix on variants, Indian payment gateways, shipping setup, recurring costs, and mobile checkout.',
      hi: 'वेरिएंट, भारतीय पेमेंट गेटवे, शिपिंग और कुल लागत पर Shopify और Wix की तुलना करें।',
    },
    canonicalPath: '/en/blog/shopify-wix-first-store-checklist',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 6,
  },
  {
    id: 'B14',
    slug: 'online-store-launch-test-checklist',
    hiSlug: 'online-store-launch-test-checklist',
    title: {
      en: 'What to test before opening an online store to customers',
      hi: 'ग्राहकों के लिए ऑनलाइन स्टोर खोलने से पहले क्या टेस्ट करें',
    },
    shortDescription: {
      en: 'Run six end-to-end test cases covering variants, delivery zones, payment success/failure, stock movement, and refunds.',
      hi: 'वेरिएंट, डिलीवरी क्षेत्र, सफल/असफल भुगतान, स्टॉक कटौती और रिफंड सहित छह एंड-टू-एंड टेस्ट चलाएं।',
    },
    directAnswer: {
      en: 'Before opening an online store, test the full buying journey: correct product and variant, supported delivery, payment success and failure, stock movement, confirmation and the handling of cancellation or refunds. Record what happened and what remains untested. A store that looks finished can still accept an order the seller cannot fulfil.',
      hi: 'ऑनलाइन स्टोर खोलने से पहले पूरी खरीदारी यात्रा परखें: सही उत्पाद व वेरिएंट, समर्थित डिलीवरी, सफल व असफल भुगतान, स्टॉक में कमी, पुष्टि संदेश और रद्दीकरण/रिफंड। जो स्टोर दिखने में तैयार लगे, वह भी ऐसा ऑर्डर ले सकता है जिसे आप पूरा न कर पाएं।',
    },
    summary: {
      en: 'Six required test cases, distinction between visual preview, gateway sandbox, and live verification, plus structured pass/fail/untested log.',
      hi: 'छह आवश्यक परीक्षण मामले, विज़ुअल प्रीव्यू बनाम सैंडबॉक्स बनाम लाइव भुगतान सत्यापन में अंतर और टेस्ट लॉग।',
    },
    keyTakeaways: {
      en: [
        'Execute all 6 test cases: variant accuracy, supported vs unsupported delivery, payment success, payment failure, stock/confirmation, and cancellation/refund.',
        'Do not confuse a visual preview with a simulated gateway test or a real live verification order.',
        'Keep an explicit log with Pass, Fail, or Untested status so gaps are never assumed working.',
      ],
      hi: [
        'सभी 6 टेस्ट चलाएं: वेरिएंट सटीकता, समर्थित/असमर्थित डिलीवरी, भुगतान सफलता, भुगतान विफलता, स्टॉक/पुष्टि और रद्दीकरण/रिफंड।',
        'विज़ुअल प्रीव्यू, सैंडबॉक्स टेस्ट और लाइव भुगतान सत्यापन को एक न समझें।',
        'हर बिंदु पर Pass, Fail या Untested लॉग रखें ताकि कोई कमी अनदेखी न रहे।',
      ],
    },
    topicCluster: 'shopify-and-wix',
    topicClusterLabel: { en: 'Shopify and Wix', hi: 'Shopify और Wix' },
    priority: 'P3',
    intendedReader: {
      en: 'Store owners preparing to remove storefront passwords and accept real orders.',
      hi: 'असली ऑर्डर लेने के लिए स्टोर लाइव करने की तैयारी कर रहे स्टोर मालिक।',
    },
    searchIntent: {
      en: 'Pre-launch ecommerce QA and checkout test log.',
      hi: 'लॉन्च-पूर्व ई-कॉमर्स चेकआउट और पूर्ति परीक्षण लॉग।',
    },
    courseMappings: ['C07-L04', 'C07-L06'],
    relatedArticleIds: ['B13', 'B19', 'B20'],
    primaryCta: {
      label: {
        en: 'Use the owned-store testing assignments',
        hi: 'ऑनलाइन स्टोर परीक्षण अभ्यास देखें',
      },
      path: '/courses/own-store-shopify-and-wix',
    },
    sections: [
      {
        id: 'six-test-cases',
        heading: {
          en: 'What are the six mandatory pre-launch test cases?',
          hi: 'लॉन्च से पहले छह अनिवार्य परीक्षण मामले कौन से हैं?',
        },
        paragraphs: {
          en: [
            '1) Product & variant accuracy: select Blue vs Natural pouch and verify cart SKU, photo, and price match. 2) Supported vs unsupported delivery: confirm serviceable PIN codes calculate shipping while restricted zones block checkout cleanly.',
            '3) Successful payment confirmation. 4) Failed or cancelled payment (ensure stock is not wrongly deducted or order marked paid). 5) Stock deduction & customer confirmation email/receipt. 6) Cancellation & refund handling in admin.',
          ],
          hi: [
            '1) उत्पाद व वेरिएंट सटीकता: सही रंग व SKU कार्ट में जाएं। 2) समर्थित व असमर्थित डिलीवरी: सेवा योग्य व बाहरी क्षेत्रों पर शिपिंग नियम सही काम करें।',
            '3) सफल भुगतान पुष्टि। 4) असफल/रद्द भुगतान पर स्टॉक न घटे और ऑर्डर पेड न दिखे। 5) स्टॉक कटौती व ग्राहक रसीद। 6) रद्दीकरण और रिफंड प्रक्रिया।',
          ],
        },
      },
    ],
    comparisonTable: {
      caption: {
        en: 'Pre-Launch Store Test Log Template',
        hi: 'लॉन्च-पूर्व स्टोर परीक्षण लॉग प्रारूप',
      },
      headers: {
        en: ['Test Case', 'Expected Outcome', 'Actual Result', 'Status'],
        hi: ['परीक्षण मामला', 'अपेक्षित परिणाम', 'वास्तविक परिणाम', 'स्थिति'],
      },
      rows: {
        en: [
          ['1. Variant accuracy', 'Selected colour & SKU carry to checkout', 'Recorded on mobile & desktop', 'Pass / Fail / Untested'],
          ['2. Delivery zones', 'Unsupported PIN blocked cleanly', 'Pending courier rule check', 'Untested'],
          ['3. Payment success', 'Order ID created only after verification', 'Gateway sandbox verified', 'Pass'],
          ['4. Payment failure', 'Cart preserved; no paid order created', 'Interrupted flow checked', 'Pass'],
          ['5. Stock & confirmation', 'Available count drops by ordered qty', 'Inventory adjusted automatically', 'Pass'],
          ['6. Cancel & refund', 'Restock & refund note logged', 'Pending live admin verification', 'Untested'],
        ],
        hi: [
          ['1. वेरिएंट सटीकता', 'चुना गया रंग और SKU चेकआउट में जाएं', 'मोबाइल व डेस्कटॉप पर जांच', 'Pass / Fail / Untested'],
          ['2. डिलीवरी क्षेत्र', 'असमर्थित क्षेत्र पर चेकआउट रुके', 'कूरियर नियम जांच शेष', 'Untested'],
          ['3. भुगतान सफलता', 'सत्यापन के बाद ही ऑर्डर बने', 'सैंडबॉक्स में जांचा गया', 'Pass'],
          ['4. भुगतान विफलता', 'कार्ट बना रहे; पेड ऑर्डर न बने', 'बाधित प्रवाह जांचा गया', 'Pass'],
          ['5. स्टॉक व पुष्टि', 'ऑर्डर मात्रा से स्टॉक घटे', 'इन्वेंटरी स्वतः घटी', 'Pass'],
          ['6. रद्दीकरण व रिफंड', 'रीस्टॉक व रिफंड रिकॉर्ड दर्ज हो', 'लाइव जांच शेष', 'Untested'],
        ],
      },
    },
    worksheetSummary: {
      title: {
        en: 'Launch-Readiness QA Sign-Off Log',
        hi: 'लॉन्च-तैयारी QA हस्ताक्षर लॉग',
      },
      fields: {
        en: [
          'Visual storefront & mobile layout preview checked',
          'Gateway sandbox / test-mode success & failure tested',
          'Supported vs unsupported PIN delivery rules verified',
          'Stock deduction & confirmation email verified',
          'Real low-value live order & cancellation/refund verified',
          'Explicit Pass / Fail / Untested status recorded before public launch',
        ],
        hi: [
          'विज़ुअल स्टोरफ्रंट व मोबाइल लेआउट प्रीव्यू जांचा गया',
          'गेटवे सैंडबॉक्स / टेस्ट-मोड सफलता व विफलता परखी गई',
          'समर्थित बनाम असमर्थित पिन डिलीवरी नियम सत्यापित',
          'स्टॉक कटौती व ग्राहक पुष्टि ईमेल सत्यापित',
          'वास्तविक छोटे लाइव ऑर्डर व रद्दीकरण/रिफंड की जांच',
          'सार्वजनिक लॉन्च से पहले स्पष्ट Pass / Fail / Untested लॉग',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'Is previewing the checkout screen enough before launching?',
          hi: 'क्या लॉन्च से पहले केवल चेकआउट स्क्रीन प्रीव्यू करना पर्याप्त है?',
        },
        answer: {
          en: 'No. Visual preview only checks layout; it does not test gateway callbacks, stock locking, shipping zone rules, or failed payment handling.',
          hi: 'नहीं। विज़ुअल प्रीव्यू केवल डिज़ाइन दिखाता है; यह पेमेंट कॉलबैक, स्टॉक लॉकिंग या विफल भुगतान नहीं परखता।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Shopify Help — Placing a test order',
        url: 'https://help.shopify.com/en/manual/checkout-settings/test-orders',
        checkedDate: '2026-11-15',
      },
      {
        label: 'Wix Help — Previewing the checkout process',
        url: 'https://support.wix.com/en/article/previewing-the-checkout-process-1420066',
        checkedDate: '2026-11-15',
      },
    ],
    author: { en: 'Bonnza Editorial Team', hi: 'Bonnza संपादकीय टीम' },
    reviewer: { en: 'Shubham Chaturvedi', hi: 'शुभम चतुर्वेदी' },
    sourceCheckedDate: '2026-11-16',
    publicationDate: '2026-11-16',
    lastSubstantiveUpdateDate: '2026-11-16',
    editorialStatus: 'PUBLISHED',
    subjectReviewStatus: 'VERIFIED',
    translationStatus: 'APPROVED',
    seoTitle: {
      en: 'Online Store Launch Testing: 6 Essential Cases | Bonnza',
      hi: 'ऑनलाइन स्टोर लॉन्च परीक्षण: 6 आवश्यक मामले | Bonnza',
    },
    metaDescription: {
      en: 'Test variants, delivery zones, payment success and failure, stock updates, and refunds before launching your store.',
      hi: 'ऑनलाइन स्टोर लाइव करने से पहले वेरिएंट, डिलीवरी, भुगतान और स्टॉक टेस्ट करना सीखें।',
    },
    canonicalPath: '/en/blog/online-store-launch-test-checklist',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 5,
  },
  {
    id: 'B15',
    slug: 'etsy-product-seller-role-check',
    hiSlug: 'etsy-product-seller-role-check',
    title: {
      en: 'Can your product be sold on Etsy? Check the item and your role',
      hi: 'क्या आपका उत्पाद Etsy पर बेचा जा सकता है? उत्पाद और अपनी भूमिका जांचें',
    },
    shortDescription: {
      en: 'Compare Etsy’s made, designed, handpicked, and sourced rules before assuming a handmade craft qualifies for resale.',
      hi: 'हस्तनिर्मित उत्पाद को स्वतः योग्य मानने से पहले Etsy के made, designed, handpicked और sourced नियम जांचें।',
    },
    directAnswer: {
      en: 'To assess whether a product belongs on Etsy, check both the item and your role in creating or sourcing it. A product being handmade is not enough by itself. Identify who made and designed it, compare that relationship with Etsy’s current rules, and resolve uncertainty before buying stock or paying to list.',
      hi: 'उत्पाद Etsy के योग्य है या नहीं, इसके लिए उत्पाद और उसे बनाने/सोर्स करने में अपनी भूमिका दोनों जांचें। केवल हस्तनिर्मित होना पर्याप्त नहीं है। स्टॉक खरीदने से पहले Etsy के वर्तमान नियमों से तुलना करें।',
    },
    summary: {
      en: 'Contrasts a self-designed self-stitched pouch against an unchanged finished pouch bought from an independent artist, with Etsy creativity & production partner links.',
      hi: 'स्व-डिज़ाइन व स्व-निर्मित पाउच बनाम कलाकार से खरीदे तैयार पाउच की तुलना, Etsy पात्रता और प्रोडक्शन पार्टनर नियमों सहित।',
    },
    keyTakeaways: {
      en: [
        'Etsy evaluates items under Made, Designed, Handpicked, and Sourced categories—each with strict role requirements.',
        'An unchanged finished pouch purchased from an independent artist for resale is not automatically eligible simply because it is handmade.',
        'Production partners require genuine original design involvement and disclosure, unlike wholesale reselling.',
      ],
      hi: [
        'Etsy उत्पाद को Made, Designed, Handpicked और Sourced श्रेणियों के तहत परखता है।',
        'स्वतंत्र कलाकार से खरीदा तैयार पाउच केवल हस्तनिर्मित होने से स्वतः Etsy के योग्य नहीं होता।',
        'प्रोडक्शन पार्टनर का अर्थ आपका मूल डिज़ाइन व खुलासा होना है, सामान्य थोक रीसेलिंग नहीं।',
      ],
    },
    topicCluster: 'etsy',
    topicClusterLabel: { en: 'Etsy', hi: 'Etsy' },
    priority: 'P2',
    intendedReader: {
      en: 'Makers and craft curators assessing Etsy marketplace fit before onboarding.',
      hi: 'Etsy ऑनबोर्डिंग से पहले पात्रता जांच रहे निर्माता और शिल्प क्यूरेटर।',
    },
    searchIntent: {
      en: 'Etsy handmade vs reselling eligibility check for Indian sellers.',
      hi: 'भारतीय विक्रेताओं के लिए Etsy हस्तनिर्मित बनाम रीसेलिंग पात्रता जांच।',
    },
    courseMappings: ['C08-L01'],
    relatedArticleIds: ['B09', 'B16', 'B03'],
    primaryCta: {
      label: {
        en: 'Review Etsy eligibility lessons',
        hi: 'Etsy पात्रता पाठ देखें',
      },
      path: '/courses/etsy-selling',
    },
    sections: [
      {
        id: 'made-designed-handpicked-sourced',
        heading: {
          en: 'How does your role determine Etsy eligibility?',
          hi: 'आपकी भूमिका Etsy की पात्रता कैसे तय करती है?',
        },
        paragraphs: {
          en: [
            'Compare two scenarios: Scenario 1 is a cotton pouch you designed and stitched yourself—it aligns with Etsy’s "Made by a seller" category. Scenario 2 is a finished handmade pouch bought unchanged from an independent artist to resell.',
            'Even though Scenario 2 is genuinely handmade by an artisan, reselling finished goods you neither designed nor made does not automatically qualify under Etsy’s Creativity Standards. Likewise, working with a Production Partner applies when you design an item and hire help to produce it—not when buying existing wholesale stock.',
          ],
          hi: [
            'दो स्थितियां देखें: पहली, आपने स्वयं कॉटन पाउच डिज़ाइन किया और सिला (Etsy की Made श्रेणी)। दूसरी, आपने स्वतंत्र कलाकार से तैयार हस्तनिर्मित पाउच खरीदकर बेचने की सोची।',
            'दूसरी स्थिति में उत्पाद वास्तव में हस्तनिर्मित होने के बावजूद, जिसे आपने न बनाया न डिज़ाइन किया, वह स्वतः Etsy नियमों में फिट नहीं होता। प्रोडक्शन पार्टनर तभी लागू होता है जब डिज़ाइन आपका हो।',
          ],
        },
      },
    ],
    comparisonTable: {
      caption: {
        en: 'Etsy Go / Check / No-Go Worksheet Snapshot',
        hi: 'Etsy पात्रता जांच तालिका (Go / Check / No-Go)',
      },
      headers: {
        en: ['Scenario', 'Who Designed & Made It', 'Preliminary Check'],
        hi: ['स्थिति', 'डिज़ाइन व निर्माण किसका', 'प्रारंभिक जांच'],
      },
      rows: {
        en: [
          ['Self-stitched cotton pouch (Card A)', 'Designed and made by seller', 'Go (verify live category & India shop rules)'],
          ['Seller-designed, disclosed artisan production partner', 'Designed by seller; made by disclosed partner', 'Check (verify partner eligibility & disclosure rules)'],
          ['Finished craft supplies vs unchanged finished craft (Card B)', 'Designed & made by external supplier/artist', 'No-Go for unchanged finished crafts under reselling ban; check Craft Supplies rules separately'],
        ],
        hi: [
          ['स्वयं सिला कॉटन पाउच (कार्ड A)', 'विक्रेता द्वारा डिज़ाइन व निर्मित', 'Go (लाइव श्रेणी व भारत शॉप नियम जांचें)'],
          ['विक्रेता डिज़ाइन, घोषित प्रोडक्शन पार्टनर', 'डिज़ाइन विक्रेता का; निर्माण घोषित पार्टनर द्वारा', 'Check (पार्टनर शर्तें व खुलासा सत्यापित करें)'],
          ['तैयार शिल्प बनाम क्राफ्ट सप्लाई (कार्ड B)', 'बाहरी कलाकार/आपूर्तिकर्ता द्वारा निर्मित', 'तैयार माल रीसेलिंग पर No-Go; क्राफ्ट सप्लाई नियम अलग जांचें'],
        ],
      },
    },
    worksheetSummary: {
      title: {
        en: 'Etsy Eligibility Go / Check / No-Go Sheet',
        hi: 'Etsy पात्रता Go / Check / No-Go शीट',
      },
      fields: {
        en: [
          'Item category tested (Finished handmade / Craft supply / Vintage)',
          'Who created the original design & physical item',
          'Production partner involvement & written disclosure status',
          'Verification against Etsy Creativity Standards & Reselling Policy',
          'Final gate decision (Go / Check / No-Go before buying stock)',
        ],
        hi: [
          'परीक्षित श्रेणी (तैयार हस्तनिर्मित / क्राफ्ट सप्लाई / विंटेज)',
          'मूल डिज़ाइन व भौतिक निर्माण किसने किया',
          'प्रोडक्शन पार्टनर भागीदारी व लिखित खुलासा स्थिति',
          'Etsy Creativity Standards व रीसेलिंग नीति से सत्यापन',
          'अंतिम निर्णय (स्टॉक खरीदने से पहले Go / Check / No-Go)',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'Does disclosing the artisan’s name make finished-craft reselling allowed on Etsy?',
          hi: 'क्या कलाकार का नाम लिख देने से तैयार शिल्प रीसेलिंग Etsy पर वैध हो जाती है?',
        },
        answer: {
          en: 'Not by itself. You must satisfy Etsy’s active Creativity Standards regarding making, original design, vintage, or craft supplies.',
          hi: 'अपने आप नहीं। आपको Etsy की सक्रिय Creativity Standards की शर्तें पूरी करनी होंगी।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Etsy Creativity Standards',
        url: 'https://www.etsy.com/legal/creativity/',
        checkedDate: '2026-11-15',
      },
      {
        label: 'Etsy Help — Does Etsy allow drop shipping or reselling?',
        url: 'https://help.etsy.com/hc/en-us/articles/23948763872151-Does-Etsy-Allow-Drop-Shipping-or-Reselling',
        checkedDate: '2026-11-15',
      },
      {
        label: 'Etsy Help — Working with Production Partners',
        url: 'https://help.etsy.com/hc/en-us/articles/360000336547-Working-with-Production-Partners-on-Etsy?segment=selling',
        checkedDate: '2026-11-15',
      },
    ],
    author: { en: 'Bonnza Editorial Team', hi: 'Bonnza संपादकीय टीम' },
    reviewer: { en: 'Shubham Chaturvedi', hi: 'शुभम चतुर्वेदी' },
    sourceCheckedDate: '2026-11-16',
    publicationDate: '2026-11-16',
    lastSubstantiveUpdateDate: '2026-11-16',
    editorialStatus: 'PUBLISHED',
    subjectReviewStatus: 'VERIFIED',
    translationStatus: 'APPROVED',
    seoTitle: {
      en: 'Can You Sell Your Product on Etsy? Check Your Role | Bonnza',
      hi: 'क्या आपका उत्पाद Etsy पर बिक सकता है? उत्पाद व भूमिका जांच | Bonnza',
    },
    metaDescription: {
      en: 'Check Etsy’s Made, Designed, Handpicked, and Sourced rules before buying stock or listing artist-made crafts.',
      hi: 'स्टॉक खरीदने या कलाकार-निर्मित शिल्प लिस्ट करने से पहले Etsy पात्रता नियम जांचें।',
    },
    canonicalPath: '/en/blog/etsy-product-seller-role-check',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 5,
  },
  {
    id: 'B16',
    slug: 'etsy-india-shop-readiness',
    hiSlug: 'etsy-india-shop-readiness',
    title: {
      en: 'Opening an Etsy shop from India: what to verify first',
      hi: 'भारत से Etsy शॉप खोलना: पहले क्या सत्यापित करें',
    },
    shortDescription: {
      en: 'Verify product fit, India onboarding documents, payment routing, currency conversion, and international returns before opening.',
      hi: 'शॉप खोलने से पहले उत्पाद पात्रता, भारत ऑनबोर्डिंग दस्तावेज़, भुगतान मार्ग, मुद्रा रूपांतरण और अंतर्राष्ट्रीय रिटर्न जांचें।',
    },
    directAnswer: {
      en: 'Before opening an Etsy shop from India, check product eligibility, the current India onboarding route, supported destinations, registration evidence, payment arrangements and international order economics. Treat these as connected decisions. A product can fit Etsy’s creative standards while the proposed payment or delivery plan is still unready.',
      hi: 'भारत से Etsy शॉप खोलने से पहले उत्पाद पात्रता, वर्तमान भारत ऑनबोर्डिंग मार्ग, समर्थित देश, पंजीकरण दस्तावेज़, भुगतान व्यवस्था और अंतर्राष्ट्रीय ऑर्डर अर्थशास्त्र जांचें। इन्हें जुड़े हुए निर्णयों के रूप में देखें।',
    },
    summary: {
      en: 'Summarizes dated Etsy India onboarding documentation (international-only scope, US$10 fee, regular GSTIN, Payoneer, 5% + ₹25) alongside reminders to verify live terms.',
      hi: 'नवंबर 2026 के Etsy भारत ऑनबोर्डिंग दस्तावेज़ (केवल अंतर्राष्ट्रीय बिक्री, US$10 शुल्क, नियमित GSTIN, Payoneer, 5% + ₹25) और लाइव नियम जांचने के अनुस्मारक प्रस्तुत करता है।',
    },
    keyTakeaways: {
      en: [
        'Treat product fit, India tax/GSTIN docs, Payoneer/payment routing, and international shipping as one connected checklist.',
        'Reference documentation (Nov 2026) noted international-only selling for new Indian shops, US$10 setup fee, regular GSTIN verification, Payoneer enrolment, and 5% + ₹25 payment processing—always confirm live Etsy documentation before onboarding.',
        'Model currency conversion spreads and international return costs in advance.',
      ],
      hi: [
        'उत्पाद पात्रता, GSTIN दस्तावेज़, Payoneer भुगतान मार्ग और अंतर्राष्ट्रीय शिपिंग को एक साथ जांचें।',
        'नवंबर 2026 के संदर्भ विवरण में नए भारतीय शॉप के लिए अंतर्राष्ट्रीय बिक्री, US$10 सेटअप शुल्क, नियमित GSTIN, Payoneer और 5% + ₹25 प्रोसेसिंग दर्ज थे—ऑनबोर्डिंग से पहले लाइव Etsy नीति अवश्य जांचें।',
        'मुद्रा रूपांतरण अंतर और अंतर्राष्ट्रीय रिटर्न लागत की पहले से गणना करें।',
      ],
    },
    topicCluster: 'etsy',
    topicClusterLabel: { en: 'Etsy', hi: 'Etsy' },
    priority: 'P3',
    intendedReader: {
      en: 'India-based makers preparing documentation and economics for an Etsy shop.',
      hi: 'Etsy शॉप के लिए दस्तावेज़ व लागत तैयार कर रहे भारत-आधारित निर्माता।',
    },
    searchIntent: {
      en: 'Checklist of India-specific Etsy onboarding, payments, and cross-border readiness.',
      hi: 'भारत-विशिष्ट Etsy ऑनबोर्डिंग, भुगतान और सीमा-पार तैयारी चेकलिस्ट।',
    },
    courseMappings: ['C08-L02', 'C08-L04'],
    relatedArticleIds: ['B15', 'B18', 'B02'],
    primaryCta: {
      label: {
        en: 'Explore Etsy course readiness',
        hi: 'Etsy कोर्स तैयारी देखें',
      },
      path: '/courses/etsy-selling',
    },
    sections: [
      {
        id: 'dated-india-snapshot',
        heading: {
          en: 'What India-specific onboarding points must be rechecked live?',
          hi: 'भारत-विशिष्ट किन ऑनबोर्डिंग बिंदुओं को लाइव पुनः जांचना जरूरी है?',
        },
        paragraphs: {
          en: [
            'As recorded in November 2026 documentation, new Indian Etsy shops were structured for international-only selling, with a one-time US$10 setup fee, regular GSTIN verification, Payoneer enrolment for Etsy Payments, and payment processing listed at 5% plus ₹25.',
            'Important note: platform fees and onboarding policies change periodically. Always verify Etsy’s current India Seller Payments and Fees documentation before making financial commitments.',
          ],
          hi: [
            'नवंबर 2026 के दस्तावेज़ के अनुसार, नए भारतीय Etsy शॉप के लिए केवल अंतर्राष्ट्रीय बिक्री, US$10 एकमुश्त सेटअप शुल्क, नियमित GSTIN सत्यापन, Payoneer नामांकन और 5% + ₹25 प्रोसेसिंग का विवरण दर्ज था।',
            'महत्वपूर्ण सूचना: प्लेटफ़ॉर्म शुल्क और ऑनबोर्डिंग नियम समय-समय पर बदल सकते हैं। निर्णय लेने से पहले Etsy के लाइव दस्तावेज़ अवश्य जांचें।',
          ],
        },
      },
    ],
    comparisonTable: {
      caption: {
        en: 'Etsy India Readiness & Fee Verification Register',
        hi: 'Etsy भारत तैयारी और शुल्क सत्यापन रजिस्टर',
      },
      headers: {
        en: ['Area', 'Recorded Reference (Nov 2026)', 'Verification Action'],
        hi: ['क्षेत्र', 'नवंबर 2026 संदर्भ विवरण', 'सत्यापन कार्य'],
      },
      rows: {
        en: [
          ['Destination scope', 'Described as international only for new Indian shops', 'Verify current domestic/export rules on Etsy Help'],
          ['Shop setup fee', 'Described as US$10 one-time', 'Verify live Etsy Legal Fees page'],
          ['Tax / registration', 'Described as regular GSTIN verification', 'Confirm applicable GSTIN/IEC rules with advisor'],
          ['Payout route & processing', 'Payoneer enrolment; 5% + ₹25 described', 'Verify live Etsy India Payments guide & FX fees'],
        ],
        hi: [
          ['बिक्री क्षेत्र', 'नए भारतीय शॉप के लिए केवल अंतर्राष्ट्रीय वर्णित', 'Etsy Help पर वर्तमान नियम जांचें'],
          ['सेटअप शुल्क', 'US$10 एकमुश्त वर्णित', 'लाइव Etsy Legal Fees पृष्ठ जांचें'],
          ['कर / पंजीकरण', 'नियमित GSTIN सत्यापन वर्णित', 'सलाहकार से लागू GSTIN/IEC नियम पुष्टि करें'],
          ['भुगतान मार्ग व शुल्क', 'Payoneer नामांकन; 5% + ₹25 वर्णित', 'लाइव Etsy India Payments गाइड जांचें'],
        ],
      },
    },
    worksheetSummary: {
      title: {
        en: 'Etsy India Onboarding Verification Checklist',
        hi: 'Etsy भारत ऑनबोर्डिंग सत्यापन चेकलिस्ट',
      },
      fields: {
        en: [
          'Product & seller role verified against Creativity Standards',
          'International-only buyer scope confirmed (no domestic India sales via Etsy Payments)',
          'Active regular GSTIN & identity proof ready',
          'Payoneer account linked & live US$10 setup + 5% + ₹25 fee schedule rechecked',
          'Cross-border shipping quotes, customs docs & return economics modelled',
        ],
        hi: [
          'Creativity Standards के विरुद्ध उत्पाद व विक्रेता भूमिका सत्यापित',
          'केवल अंतर्राष्ट्रीय खरीदार क्षेत्र की पुष्टि (भारत में घरेलू Etsy Payments बिक्री नहीं)',
          'सक्रिय नियमित GSTIN व पहचान दस्तावेज़ तैयार',
          'Payoneer खाता जुड़ा व लाइव US$10 सेटअप + 5% + ₹25 शुल्क जांच',
          'सीमा-पार शिपिंग दर, कस्टम दस्तावेज़ व रिटर्न लागत मॉडल तैयार',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'Are the US$10 setup fee and 5% + ₹25 rate guaranteed current Etsy pricing?',
          hi: 'क्या US$10 सेटअप शुल्क और 5% + ₹25 दर वर्तमान में पक्की हैं?',
        },
        answer: {
          en: 'No. They reflect the November 2026 fee reference and should always be checked against Etsy’s live legal fee schedule before opening a shop.',
          hi: 'नहीं। ये नवंबर 2026 के संदर्भ शुल्क हैं और शॉप खोलने से पहले लाइव Etsy शुल्क पृष्ठ से पुनः जांचे जाने चाहिए।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Etsy Help — How to Accept Payments as a Seller in India',
        url: 'https://help.etsy.com/hc/en-in/articles/6742925359255-How-to-Accept-Payments-as-a-Seller-in-India?segment=selling',
        checkedDate: '2026-11-15',
      },
      {
        label: 'Etsy Legal — Fees & Payments Policy',
        url: 'https://www.etsy.com/legal/fees/',
        checkedDate: '2026-11-15',
      },
    ],
    author: { en: 'Bonnza Editorial Team', hi: 'Bonnza संपादकीय टीम' },
    reviewer: { en: 'Shubham Chaturvedi', hi: 'शुभम चतुर्वेदी' },
    sourceCheckedDate: '2026-11-16',
    publicationDate: '2026-11-16',
    lastSubstantiveUpdateDate: '2026-11-16',
    editorialStatus: 'PUBLISHED',
    subjectReviewStatus: 'VERIFIED',
    translationStatus: 'APPROVED',
    seoTitle: {
      en: 'Opening an Etsy Shop from India: Readiness Checklist | Bonnza',
      hi: 'भारत से Etsy शॉप खोलना: तैयारी चेकलिस्ट | Bonnza',
    },
    metaDescription: {
      en: 'Checklist of product fit, India onboarding docs, Payoneer/payment setup, and international shipping before opening an Etsy shop.',
      hi: 'भारत से Etsy शॉप खोलने से पहले दस्तावेज़, भुगतान और अंतर्राष्ट्रीय शिपिंग की जांच सूची।',
    },
    canonicalPath: '/en/blog/etsy-india-shop-readiness',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 5,
  },
  {
    id: 'B17',
    slug: 'amazon-india-listing-route',
    hiSlug: 'amazon-india-listing-route',
    title: {
      en: 'Existing product or new listing on Amazon India: how to prepare',
      hi: 'Amazon India पर मौजूदा उत्पाद या नई लिस्टिंग: तैयारी कैसे करें',
    },
    shortDescription: {
      en: 'Use an exact-match decision check across brand, model, size, colour, and pack configuration before attaching or creating an ASIN.',
      hi: 'ASIN से जुड़ने या नई लिस्टिंग बनाने से पहले ब्रांड, मॉडल, माप, रंग और पैक संख्या का सटीक मिलान जांचें।',
    },
    directAnswer: {
      en: 'Before listing on Amazon India, establish whether the exact product already exists in the catalogue. If it does, prepare an offer against the correct existing product. If it does not, prepare the information for a new detail page. Similar appearance is not enough: the brand, model, size, colour and pack configuration must describe the same item.',
      hi: 'Amazon India पर लिस्टिंग करने से पहले तय करें कि वही सटीक उत्पाद कैटलॉग में पहले से मौजूद है या नहीं। समान दिखना पर्याप्त नहीं है—ब्रांड, मॉडल, माप, रंग और पैक संख्या बिल्कुल एक होने चाहिए।',
    },
    summary: {
      en: 'Exact-match sequence contrasting 1 branded blue pouch against an existing 3-pack listing, SKU vs GTIN vs ASIN distinction, and conditional GTIN exemptions.',
      hi: '1 नीले ब्रांडेड पाउच बनाम मौजूदा 3-पैक लिस्टिंग का सटीक-मिलान निर्णय, SKU/GTIN/ASIN अंतर और सशर्त GTIN छूट।',
    },
    keyTakeaways: {
      en: [
        'A single branded blue pouch is NOT an exact match for an existing listing describing a pack of three.',
        'Separate internal warehouse SKUs, standard barcodes (GTIN/EAN/UPC), and Amazon catalogue identifiers (ASIN).',
        'GTIN exemptions are conditional and require approval under Amazon’s applicable process.',
      ],
      hi: [
        'एक नीला ब्रांडेड पाउच 3-पैक वाली मौजूदा लिस्टिंग से सटीक मेल नहीं खाता।',
        'अपने आंतरिक SKU, मानक बारकोड (GTIN) और Amazon कैटलॉग ID (ASIN) को अलग-अलग समझें।',
        'GTIN छूट सशर्त होती है और Amazon की लागू अनुमोदन प्रक्रिया के अधीन है।',
      ],
    },
    topicCluster: 'amazon-india',
    topicClusterLabel: { en: 'Amazon India', hi: 'Amazon India' },
    priority: 'P2',
    intendedReader: {
      en: 'Sellers preparing product data for Amazon.in onboarding.',
      hi: 'Amazon.in के लिए उत्पाद डेटा तैयार कर रहे विक्रेता।',
    },
    searchIntent: {
      en: 'Decision guide for matching existing ASINs vs creating new Amazon India listings.',
      hi: 'मौजूदा ASIN मिलान बनाम नई Amazon India लिस्टिंग बनाने का निर्णय मार्गदर्शक।',
    },
    courseMappings: ['C06-L01', 'C06-L02'],
    relatedArticleIds: ['B03', 'B04', 'B12'],
    primaryCta: {
      label: {
        en: 'Review Amazon India listing lessons',
        hi: 'Amazon India लिस्टिंग पाठ देखें',
      },
      path: '/courses/amazon-india-selling',
    },
    sections: [
      {
        id: 'exact-match-sequence',
        heading: {
          en: 'Why is a 1-unit pouch not an exact match for a 3-pack listing?',
          hi: '1 पीस वाला पाउच 3-पैक की लिस्टिंग से सटीक मेल क्यों नहीं खाता?',
        },
        paragraphs: {
          en: [
            'Suppose you are selling one fictional branded blue cotton travel pouch (1 unit). You search Amazon India and find a visually similar blue pouch listing—but that page sells a pack of three under another seller’s brand.',
            'Attaching your single pouch to that 3-pack ASIN breaks buyer expectations and triggers complaints or catalogue issues. Brand, model, dimensions, colour, and pack configuration must match identically—otherwise prepare documentation for a separate detail page.',
          ],
          hi: [
            'मान लें आप एक ब्रांडेड नीला कॉटन पाउच (1 पीस) बेच रहे हैं और कैटलॉग में वैसा ही दिखने वाला 3-पैक मिलता है। वहां अपनी 1-पीस लिस्टिंग जोड़ने से खरीदार को गलत संख्या मिलेगी और शिकायत बढ़ेगी।',
            'ब्रांड, मॉडल, माप, रंग और पैक संख्या बिल्कुल समान होने पर ही मौजूदा उत्पाद से जुड़ें, अन्यथा नया विवरण पृष्ठ बनाएं।',
          ],
        },
      },
      {
        id: 'sku-gtin-asin',
        heading: {
          en: 'What is the 3-step exact-match workflow and how do SKU, GTIN, and ASIN differ?',
          hi: '3-चरणीय सटीक-मिलान प्रक्रिया क्या है और SKU, GTIN व ASIN में क्या अंतर है?',
        },
        paragraphs: {
          en: [
            'Use a 3-step exact-match sequence before publishing: Step 1 — Fill a product identity card (exact brand name, model/MPN, material, dimensions, colour, and pack quantity). Step 2 — Search Amazon.in catalogue candidates and verify every attribute line by line. Step 3 — Attach your offer only if all specifications match identically; otherwise follow Amazon’s new detail-page workflow.',
            'An internal stock code (SKU) is your own tracking label (e.g., P-BL-01). A GTIN (such as EAN or UPC) is a standard product barcode when required, while an ASIN is Amazon’s catalogue identifier. If your own unbranded or private items lack a GTIN, check whether a conditional GTIN exemption applies before listing.',
          ],
          hi: [
            'प्रकाशन से पहले 3-चरणीय सटीक-मिलान प्रक्रिया अपनाएं: चरण 1 — उत्पाद पहचान कार्ड भरें (सटीक ब्रांड, मॉडल, सामग्री, माप, रंग व पैक संख्या)। चरण 2 — Amazon.in कैटलॉग में हर विवरण पंक्ति-दर-पंक्ति मिलाएं। चरण 3 — सभी बिंदु समान होने पर ही मौजूदा ऑफ़र से जुड़ें, अन्यथा नया विवरण पृष्ठ बनाएं।',
            'SKU आपका आंतरिक स्टॉक कोड (जैसे P-BL-01) है। GTIN (EAN/UPC) मानक बारकोड है, जबकि ASIN Amazon की कैटलॉग पहचान संख्या है। बारकोड न होने पर लागू श्रेणी के अनुसार सशर्त GTIN छूट की प्रक्रिया जांचें।',
          ],
        },
      },
    ],
    comparisonTable: {
      caption: {
        en: 'Exact-Match Decision Check: 1-Unit Pouch vs Existing 3-Pack Listing',
        hi: 'सटीक-मिलान निर्णय जांच: 1-पीस पाउच बनाम मौजूदा 3-पैक लिस्टिंग',
      },
      headers: {
        en: ['Identity Attribute', 'Your Product', 'Found Amazon Listing', 'Match Result'],
        hi: ['पहचान गुण', 'आपका उत्पाद', 'मिली हुई Amazon लिस्टिंग', 'मिलान परिणाम'],
      },
      rows: {
        en: [
          ['Brand & model', 'Your branded cotton pouch', 'Another seller’s brand label', 'Mismatch'],
          ['Material & size', 'Washed cotton, 20cm × 14cm', 'Blue cotton organizer ~20×14cm', 'Looks similar only'],
          ['Pack quantity', '1 pouch per unit', 'Pack of 3 pouches', 'Critical mismatch — Do not attach'],
          ['Recommended route', 'Verify GTIN / conditional GTIN exemption', 'Do not list against 3-pack ASIN', 'Prepare separate listing data'],
        ],
        hi: [
          ['ब्रांड व मॉडल', 'आपका ब्रांडेड कॉटन पाउच', 'अन्य विक्रेता का ब्रांड नाम', 'असमान'],
          ['सामग्री व माप', 'वॉश्ड कॉटन, 20cm × 14cm', 'नीला कॉटन ऑर्गनाइज़र ~20×14cm', 'केवल दिखने में समान'],
          ['पैक संख्या', '1 पाउच प्रति यूनिट', '3 पाउच का पैक', 'गंभीर अंतर — न जोड़ें'],
          ['अनुशंसित मार्ग', 'GTIN / सशर्त GTIN छूट जांचें', '3-पैक ASIN से न जोड़ें', 'अलग लिस्टिंग डेटा तैयार करें'],
        ],
      },
    },
    worksheetSummary: {
      title: {
        en: 'Amazon India Listing Route Identity Card',
        hi: 'Amazon India लिस्टिंग मार्ग पहचान कार्ड',
      },
      fields: {
        en: [
          'Internal SKU code & exact brand / unbranded status',
          'Exact dimensions, material, colour & pack quantity',
          'Existing ASIN search & attribute-by-attribute match check',
          'Selected route (Match Existing ASIN vs Create New Listing)',
          'GTIN / EAN availability or conditional GTIN exemption check',
          'Category restrictions, packed weight & fulfilment cost verified',
        ],
        hi: [
          'आंतरिक SKU कोड व सटीक ब्रांड / अनब्रांडेड स्थिति',
          'सटीक माप, सामग्री, रंग व पैक संख्या',
          'मौजूदा ASIN खोज व गुण-दर-गुण मिलान जांच',
          'चुना गया मार्ग (मौजूदा ASIN मिलान बनाम नई लिस्टिंग)',
          'GTIN / EAN उपलब्धता या सशर्त GTIN छूट जांच',
          'श्रेणी प्रतिबंध, पैक वजन व पूर्ति लागत सत्यापन',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'Can I list under an existing ASIN if my pouch looks identical in photos?',
          hi: 'यदि मेरा पाउच फोटो में बिल्कुल वैसा ही दिखता है तो क्या मैं मौजूदा ASIN पर लिस्ट कर सकता हूँ?',
        },
        answer: {
          en: 'Only if the brand, material specification, dimensions, colour, and pack quantity match identically.',
          hi: 'केवल तभी जब ब्रांड, सामग्री, माप, रंग और पैक संख्या बिल्कुल एक समान हों।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Amazon India — List Your Products',
        url: 'https://sell.amazon.in/sell-online/list-your-products?ref_=sdin_nav2_start_list',
        checkedDate: '2026-11-15',
      },
    ],
    author: { en: 'Bonnza Editorial Team', hi: 'Bonnza संपादकीय टीम' },
    reviewer: { en: 'Shubham Chaturvedi', hi: 'शुभम चतुर्वेदी' },
    sourceCheckedDate: '2026-11-16',
    publicationDate: '2026-11-16',
    lastSubstantiveUpdateDate: '2026-11-16',
    editorialStatus: 'PUBLISHED',
    subjectReviewStatus: 'VERIFIED',
    translationStatus: 'APPROVED',
    seoTitle: {
      en: 'Amazon India: Existing Product or New Listing? | Bonnza',
      hi: 'Amazon India: मौजूदा उत्पाद या नई लिस्टिंग? | Bonnza',
    },
    metaDescription: {
      en: 'Learn Amazon India exact-match criteria, SKU vs GTIN vs ASIN differences, and conditional GTIN exemption checks.',
      hi: 'Amazon India पर सटीक-मिलान जांच, SKU/GTIN/ASIN अंतर और GTIN छूट की जानकारी सीखें।',
    },
    canonicalPath: '/en/blog/amazon-india-listing-route',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 6,
  },
  {
    id: 'B18',
    slug: 'international-selling-readiness-checklist',
    hiSlug: 'international-selling-readiness-checklist',
    title: {
      en: 'Before selling internationally: a one-market readiness checklist',
      hi: 'अंतर्राष्ट्रीय बिक्री से पहले: एक-बाज़ार तैयारी चेकलिस्ट',
    },
    shortDescription: {
      en: 'Pick one product, one destination country, and one fulfilment route, then verify export/import rules and return-logistics risk.',
      hi: 'एक उत्पाद, एक देश और एक पूर्ति मार्ग चुनें, फिर निर्यात/आयात नियम और रिटर्न-लॉजिस्टिक्स जोखिम का आकलन करें।',
    },
    directAnswer: {
      en: 'Before selling internationally, choose one product, one destination market and one fulfilment route, then verify who is responsible for account requirements, export and import obligations, product compliance, delivery and returns. Build the cost model for that exact route. A foreign selling price is not enough to show that an international order will be viable.',
      hi: 'अंतर्राष्ट्रीय बिक्री से पहले एक उत्पाद, एक गंतव्य बाज़ार और एक पूर्ति मार्ग चुनें, फिर अकाउंट, निर्यात/आयात दायित्व, उत्पाद अनुपालन, डिलीवरी और रिटर्न की जिम्मेदारी सत्यापित करें। केवल विदेशी कीमत देखकर मुनाफे का अनुमान न लगाएं।',
    },
    summary: {
      en: 'Covers four responsibility buckets, IEC verification rule, and the fictional export math where ₹1,150 initial contribution turns negative by ₹50 when a ₹1,200 return logistics charge hits.',
      hi: 'चार उत्तरदायित्व श्रेणियां, IEC जांच नियम और काल्पनिक निर्यात गणित जिसमें ₹1,200 की रिटर्न लागत ₹1,150 योगदान से ₹50 अधिक पड़ती है।',
    },
    keyTakeaways: {
      en: [
        'Organize readiness across four buckets: Account & marketplace, Indian export, Destination import/compliance, and Logistics & after-sales.',
        'Check IEC requirements and exemptions specifically for your exporter status and shipping route.',
        'A ₹1,200 reverse-logistics charge can exceed a ₹1,150 initial order contribution by ₹50 before even counting refunds or lost stock.',
      ],
      hi: [
        'तैयारी को चार भागों में बांटें: अकाउंट/मार्केटप्लेस, भारतीय निर्यात, गंतव्य आयात/अनुपालन और लॉजिस्टिक्स/रिटर्न।',
        'अपने मार्ग और निर्यातक स्थिति के लिए IEC नियम व छूट अलग से सत्यापित करें।',
        '₹1,200 का रिटर्न भाड़ा ₹1,150 के प्रारंभिक योगदान से ₹50 अधिक हो सकता है।',
      ],
    },
    topicCluster: 'amazon-global',
    topicClusterLabel: { en: 'Amazon Global', hi: 'Amazon Global' },
    priority: 'P3',
    intendedReader: {
      en: 'Indian sellers evaluating cross-border ecommerce via Amazon Global Selling.',
      hi: 'Amazon Global Selling के माध्यम से सीमा-पार बिक्री पर विचार कर रहे भारतीय विक्रेता।',
    },
    searchIntent: {
      en: 'Cross-border ecommerce readiness checklist and return-logistics sensitivity.',
      hi: 'सीमा-पार ई-कॉमर्स तैयारी और रिटर्न-लॉजिस्टिक्स जोखिम गणना।',
    },
    courseMappings: ['C09-L01', 'C09-L02', 'C09-L03'],
    relatedArticleIds: ['B16', 'B02', 'B19'],
    primaryCta: {
      label: {
        en: 'Explore Amazon Global Selling preparation',
        hi: 'Amazon Global Selling तैयारी देखें',
      },
      path: '/courses/amazon-global-selling',
    },
    sections: [
      {
        id: 'four-responsibilities',
        heading: {
          en: 'What four responsibility areas must be verified for one target country?',
          hi: 'एक गंतव्य देश के लिए किन चार उत्तरदायित्व क्षेत्रों की पुष्टि जरूरी है?',
        },
        paragraphs: {
          en: [
            '1) Account & marketplace readiness (tax/KYC, payout account). 2) Indian export obligations—verify Importer-Exporter Code (IEC) requirements and applicable exemptions under Foreign Trade Policy for your exact route. 3) Destination import duties, labelling, and product safety rules. 4) Cross-border logistics and after-sales return handling.',
          ],
          hi: [
            '1) अकाउंट व मार्केटप्लेस तैयारी। 2) भारतीय निर्यात दायित्व—अपने मार्ग के लिए IEC आवश्यकताओं व छूट की पुष्टि करें। 3) गंतव्य देश के आयात शुल्क, लेबल और उत्पाद सुरक्षा नियम। 4) अंतर्राष्ट्रीय लॉजिस्टिक्स और रिटर्न प्रक्रिया।',
          ],
        },
      },
      {
        id: 'export-return-example',
        heading: {
          en: 'How fast can an international return erase initial contribution?',
          hi: 'अंतर्राष्ट्रीय रिटर्न प्रारंभिक योगदान को कितनी जल्दी समाप्त कर सकता है?',
        },
        paragraphs: {
          en: [
            'Suppose an international order yields ₹3,000 net receipt after already-deducted selling and payment charges. Subtract ₹800 product cost, ₹150 packaging, and ₹900 outbound shipping—leaving ₹1,150 contribution before other costs.',
            'If the customer returns the parcel and reverse logistics adds ₹1,200, that charge alone exceeds the ₹1,150 original contribution by ₹50—even before modelling any refund or unrecoverable stock.',
          ],
          hi: [
            'मान लें शुल्क कटने के बाद शुद्ध प्राप्ति ₹3,000 है। इसमें से ₹800 उत्पाद, ₹150 पैकेजिंग और ₹900 आउटबाउंड शिपिंग घटाने पर ₹1,150 योगदान बचता है।',
            'यदि रिटर्न लॉजिस्टिक्स पर ₹1,200 और लग जाएं, तो यह अकेला शुल्क ₹1,150 के योगदान से ₹50 अधिक हो जाता है।',
          ],
        },
      },
    ],
    calculationBlock: {
      title: {
        en: 'International Order vs Return Charge Sensitivity (Fictional Example)',
        hi: 'अंतर्राष्ट्रीय ऑर्डर बनाम रिटर्न शुल्क संवेदनशीलता (काल्पनिक उदाहरण)',
      },
      note: {
        en: 'Excludes destination duties/refund modelling to show reverse-freight sensitivity clearly.',
        hi: 'रिटर्न भाड़े के प्रभाव को स्पष्ट दिखाने के लिए सरल उदाहरण।',
      },
      lines: [
        { label: { en: 'Net receipt after channel/payment fees', hi: 'शुल्क के बाद शुद्ध प्राप्ति' }, amount: '₹3,000' },
        { label: { en: 'Product cost', hi: 'उत्पाद लागत' }, amount: '− ₹800' },
        { label: { en: 'Packaging', hi: 'पैकेजिंग' }, amount: '− ₹150' },
        { label: { en: 'Outbound shipping', hi: 'आउटबाउंड शिपिंग' }, amount: '− ₹900' },
        { label: { en: 'Contribution before other costs', hi: 'प्रारंभिक योगदान' }, amount: '₹1,150', highlight: true },
        { label: { en: 'Additional return-logistics charge', hi: 'अतिरिक्त रिटर्न-लॉजिस्टिक्स शुल्क' }, amount: '− ₹1,200' },
        { label: { en: 'Net gap vs original contribution', hi: 'मूल योगदान की तुलना में अंतर' }, amount: '− ₹50', highlight: true },
      ],
    },
    comparisonTable: {
      caption: {
        en: 'Four Cross-Border Readiness Responsibility Buckets',
        hi: 'सीमा-पार तैयारी की चार उत्तरदायित्व श्रेणियां',
      },
      headers: {
        en: ['Responsibility Bucket', 'Key Requirement to Verify', 'Owner / Verification Source'],
        hi: ['उत्तरदायित्व श्रेणी', 'सत्यापित की जाने वाली प्रमुख बात', 'सत्यापन स्रोत / जिम्मेदारी'],
      },
      rows: {
        en: [
          ['1. Account & marketplace', 'Target country seller eligibility, KYC & payout account setup', 'Marketplace Global Selling documentation'],
          ['2. Indian export rules', 'IEC eligibility/exemptions (DGFT FTP Ch. 2 para 2.05) & export invoices', 'DGFT Foreign Trade Policy & customs / CA check'],
          ['3. Destination import & compliance', 'Customs duties, HS codes, labelling & safety regulations', 'Destination country customs / category requirements'],
          ['4. Logistics & after-sales', 'Cross-border freight, volumetric weight & reverse-return exposure', 'Courier / FBA Export rate cards & return policy'],
        ],
        hi: [
          ['1. अकाउंट व मार्केटप्लेस', 'लक्षित देश में विक्रेता पात्रता, KYC व भुगतान खाता सेटअप', 'मार्केटप्लेस Global Selling दस्तावेज़'],
          ['2. भारतीय निर्यात नियम', 'IEC अनिवार्यता/छूट (DGFT FTP Ch. 2 para 2.05) व निर्यात बिल', 'DGFT विदेश व्यापार नीति व सलाहकार जांच'],
          ['3. गंतव्य आयात व अनुपालन', 'कस्टम शुल्क, HS कोड, लेबल व उत्पाद सुरक्षा नियम', 'गंतव्य देश कस्टम व श्रेणी नियम'],
          ['4. लॉजिस्टिक्स व रिटर्न', 'अंतर्राष्ट्रीय भाड़ा, वॉल्यूमेट्रिक वजन व रिटर्न लागत जोखिम', 'कूरियर / FBA Export दर व रिटर्न नीति'],
        ],
      },
    },
    worksheetSummary: {
      title: {
        en: 'One-Market International Readiness Sheet',
        hi: 'एक-बाज़ार अंतर्राष्ट्रीय तैयारी शीट',
      },
      fields: {
        en: [
          'Single target product, single country & single fulfilment route chosen',
          'Destination marketplace account & payout route verified',
          'Indian IEC (DGFT FTP Ch. 2 para 2.05) & tax export rules checked',
          'Destination customs, HS code, labelling & safety compliance checked',
          'Full landed price, duty & reverse-logistics return sensitivity modelled',
        ],
        hi: [
          'चुना गया एक उत्पाद, एक देश व एक पूर्ति मार्ग',
          'गंतव्य मार्केटप्लेस अकाउंट व भुगतान मार्ग सत्यापित',
          'भारतीय IEC (DGFT FTP Ch. 2 para 2.05) व निर्यात कर नियम जांचे गए',
          'गंतव्य कस्टम, HS कोड, लेबल व सुरक्षा अनुपालन जांचा गया',
          'कुल लैंडेड कीमत, शुल्क व रिटर्न-लॉजिस्टिक्स जोखिम मॉडल तैयार',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'Is an IEC always required or are there exemptions?',
          hi: 'क्या IEC हमेशा अनिवार्य है या कुछ छूट भी होती हैं?',
        },
        answer: {
          en: 'IEC obligations and exemptions depend on the exporter category, shipment value, and current DGFT Foreign Trade Policy. Verify directly for your exact route.',
          hi: 'IEC नियम और छूट निर्यातक प्रकार, शिपमेंट मूल्य और वर्तमान DGFT नीति पर निर्भर करते हैं। अपने मार्ग के लिए सीधे जांचें।',
        },
      },
    ],
    primarySources: [
      {
        label: 'DGFT Foreign Trade Policy 2023 — Chapter 02 (IEC & Export Provisions)',
        url: 'https://content.dgft.gov.in/Website/dgftprod/4f665d2f-20cc-4887-ae6a-5ec912bc0d44/FTP2023_Chapter02.pdf',
        checkedDate: '2026-11-15',
      },
      {
        label: 'Amazon India — Global Selling FAQs',
        url: 'https://sell.amazon.in/grow-your-business/amazon-global-selling/help/frequently-asked-questions?mons_sel_locale=en_IN',
        checkedDate: '2026-11-15',
      },
    ],
    author: { en: 'Bonnza Editorial Team', hi: 'Bonnza संपादकीय टीम' },
    reviewer: { en: 'Shubham Chaturvedi', hi: 'शुभम चतुर्वेदी' },
    sourceCheckedDate: '2026-11-16',
    publicationDate: '2026-11-16',
    lastSubstantiveUpdateDate: '2026-11-16',
    editorialStatus: 'PUBLISHED',
    subjectReviewStatus: 'VERIFIED',
    translationStatus: 'APPROVED',
    seoTitle: {
      en: 'International Selling: A One-Market Readiness Checklist | Bonnza',
      hi: 'अंतर्राष्ट्रीय बिक्री: एक-बाज़ार तैयारी चेकलिस्ट | Bonnza',
    },
    metaDescription: {
      en: 'Check account, IEC export, destination compliance, and return-logistics cash exposure before exporting online.',
      hi: 'सीमा-पार ई-कॉमर्स से पहले अकाउंट, IEC, अनुपालन और रिटर्न लागत जोखिम की जांच करें।',
    },
    canonicalPath: '/en/blog/international-selling-readiness-checklist',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 6,
  },
  {
    id: 'B19',
    slug: 'sales-settlements-cash-for-sellers',
    hiSlug: 'sales-settlements-cash-for-sellers',
    title: {
      en: 'Sales, settlements and cash: three numbers new sellers should separate',
      hi: 'बिक्री, सेटलमेंट और नकदी: तीन आंकड़े जिन्हें नए विक्रेताओं को अलग रखना चाहिए',
    },
    shortDescription: {
      en: 'Keep gross/net sales, marketplace settlements, operating result, and uncommitted bank cash connected without confusing them.',
      hi: 'सकल/नेट बिक्री, सेटलमेंट, परिचालन परिणाम और बैंक में बची मुक्त नकदी को एक-दूसरे से मिलाए बिना ट्रैक करें।',
    },
    directAnswer: {
      en: 'Sales, settlements and cash answer different questions. Sales show the value of orders or recognised sales in the report you are using. Settlements explain how a channel or payment provider moves amounts toward payout. Cash shows what has actually entered or left your bank. Keep these views connected without treating them as the same number.',
      hi: 'बिक्री, सेटलमेंट और नकदी तीन अलग सवालों के जवाब देते हैं। बिक्री ऑर्डर मूल्य दिखाती है, सेटलमेंट भुगतान प्रक्रिया समझाता है और नकदी बैंक में आए-गए पैसे बताती है। इन्हें जुड़ा रखें पर एक न समझें।',
    },
    summary: {
      en: 'Weekly ledger example reconciling ₹5,000 gross sales, ₹4,000 settlement target, ₹3,000 bank receipt, ₹1,000 simplified operating profit, and ₹200 uncommitted bank cash.',
      hi: 'साप्ताहिक खाता उदाहरण जो ₹5,000 सकल बिक्री, ₹3,000 बैंक प्राप्ति, ₹1,000 परिचालन परिणाम और ₹200 मुक्त नकदी का मिलान दिखाता है।',
    },
    keyTakeaways: {
      en: [
        '₹5,000 gross sales less ₹500 refunds and ₹500 settlement fees = ₹4,000 to reconcile (₹3,000 received + ₹1,000 unsettled).',
        'Operating result: ₹4,500 net sales − ₹500 fees − ₹2,000 COGS − ₹400 fulfilment = ₹1,600 contribution; less ₹600 fixed costs = ₹1,000.',
        'Bank cash: ₹1,000 opening + ₹3,000 receipt − ₹2,200 supplier − ₹300 packaging = ₹1,500; less ₹900 upcoming bills & ₹400 reserve = ₹200 uncommitted.',
      ],
      hi: [
        '₹5,000 सकल बिक्री में से ₹500 रिफंड व ₹500 शुल्क घटाकर ₹4,000 मिलान राशि (₹3,000 बैंक में + ₹1,000 बकाया)।',
        'परिचालन परिणाम: ₹4,500 नेट बिक्री − ₹500 शुल्क − ₹2,000 उत्पाद लागत − ₹400 पूर्ति = ₹1,600; ₹600 निश्चित खर्च घटाकर ₹1,000।',
        'बैंक नकद: ₹1,000 प्रारंभिक + ₹3,000 प्राप्ति − ₹2,200 आपूर्तिकर्ता − ₹300 पैकिंग = ₹1,500; ₹900 बकाया बिल व ₹400 रिज़र्व घटाकर ₹200 मुक्त।',
      ],
    },
    topicCluster: 'operations-and-growth',
    topicClusterLabel: { en: 'Operations and Growth', hi: 'ऑपरेशंस और ग्रोथ' },
    priority: 'P2',
    intendedReader: {
      en: 'Early-stage sellers tracking marketplace payouts alongside supplier bills.',
      hi: 'आपूर्तिकर्ता बिलों के साथ मार्केटप्लेस भुगतान ट्रैक कर रहे शुरुआती विक्रेता।',
    },
    searchIntent: {
      en: 'Simple weekly seller reconciliation across sales reports, settlements, and bank cash.',
      hi: 'बिक्री रिपोर्ट, सेटलमेंट और बैंक नकदी के बीच साप्ताहिक मिलान मार्गदर्शन।',
    },
    courseMappings: ['C10-L01', 'C10-L02'],
    relatedArticleIds: ['B02', 'B06', 'B08'],
    primaryCta: {
      label: {
        en: 'Explore operations and reconciliation exercises',
        hi: 'ऑपरेशंस और मिलान अभ्यास देखें',
      },
      path: '/courses/operations-and-growth',
    },
    sections: [
      {
        id: 'weekly-three-views',
        heading: {
          en: 'How can a seller show ₹1,000 simplified operating profit yet hold only ₹200 uncommitted cash?',
          hi: '₹1,000 परिचालन लाभ होने के बावजूद बैंक में केवल ₹200 मुक्त नकद क्यों बच सकता है?',
        },
        paragraphs: {
          en: [
            '1) Settlement view: Gross sales ₹5,000 minus ₹500 refunds and ₹500 settlement fees leave ₹4,000 to reconcile. Only ₹3,000 reached the bank this week; ₹1,000 remains unsettled.',
            '2) Operating view: Net sales ₹4,500 minus ₹500 selling fees, ₹2,000 cost of goods sold, and ₹400 fulfilment give ₹1,600 contribution. Subtract ₹600 fixed expenses for a simplified ₹1,000 operating result.',
            '3) Bank cash view: Opening balance ₹1,000 plus ₹3,000 receipt minus ₹2,200 supplier stock payment and ₹300 packaging equals ₹1,500 in the bank. Set aside ₹900 for upcoming bills and a ₹400 safety reserve, and uncommitted cash is only ₹200.',
          ],
          hi: [
            '1) सेटलमेंट दृश्य: ₹5,000 सकल बिक्री में ₹500 रिफंड व ₹500 शुल्क घटकर ₹4,000 बनते हैं—₹3,000 बैंक में आए और ₹1,000 शेष हैं।',
            '2) परिचालन दृश्य: ₹4,500 नेट बिक्री में ₹500 शुल्क, ₹2,000 COGS और ₹400 पूर्ति घटाने पर ₹1,600 योगदान व ₹600 निश्चित खर्च के बाद ₹1,000 परिणाम बचता है।',
            '3) बैंक नकद दृश्य: ₹1,000 ओपनिंग + ₹3,000 प्राप्ति − ₹2,200 स्टॉक भुगतान − ₹300 पैकिंग = ₹1,500 बैंक में। ₹900 आगामी बिल व ₹400 रिज़र्व घटाकर मुक्त नकदी केवल ₹200 है।',
          ],
        },
      },
    ],
    comparisonTable: {
      caption: {
        en: 'Weekly Reconciliation Snapshot (Fictional Ledger)',
        hi: 'साप्ताहिक मिलान तालिका (काल्पनिक खाता)',
      },
      headers: {
        en: ['View', 'Key Lines', 'Ending Figure'],
        hi: ['दृष्टिकोण', 'मुख्य मदें', 'अंतिम आंकड़ा'],
      },
      rows: {
        en: [
          ['Settlement', '₹5,000 gross − ₹500 refunds − ₹500 fees = ₹4,000 (₹3,000 paid)', '₹1,000 unsettled'],
          ['Operating', '₹4,500 net − ₹500 fees − ₹2,000 COGS − ₹400 fulf. − ₹600 fixed', '₹1,000 simplified result'],
          ['Bank Cash', '₹1,000 open + ₹3,000 in − ₹2,200 stock − ₹300 pack − ₹900 bills − ₹400 reserve', '₹200 uncommitted cash'],
        ],
        hi: [
          ['सेटलमेंट', '₹5,000 सकल − ₹500 रिफंड − ₹500 शुल्क = ₹4,000 (₹3,000 प्राप्त)', '₹1,000 बकाया'],
          ['परिचालन', '₹4,500 नेट − ₹500 शुल्क − ₹2,000 लागत − ₹400 पूर्ति − ₹600 निश्चित', '₹1,000 परिणाम'],
          ['बैंक नकदी', '₹1,000 + ₹3,000 − ₹2,200 स्टॉक − ₹300 पैकिंग − ₹900 बिल − ₹400 रिज़र्व', '₹200 मुक्त नकदी'],
        ],
      },
    },
    worksheetSummary: {
      title: {
        en: 'Weekly Seller Three-View Reconciliation Sheet',
        hi: 'साप्ताहिक विक्रेता त्रि-आयामी मिलान शीट',
      },
      fields: {
        en: [
          'Gross sales less refunds & settlement deductions = Net payable',
          'Bank payouts received vs unsettled balance remaining in transit',
          'Net sales less COGS, fees, fulfilment & fixed costs = Operating result',
          'Opening bank balance + cash receipts − stock & packaging paid = Bank balance',
          'Committed upcoming supplier/courier bills + safety reserve',
          'True uncommitted cash available before next stock purchase',
        ],
        hi: [
          'सकल बिक्री घटाव रिफंड व सेटलमेंट कटौती = शुद्ध देय राशि',
          'बैंक में प्राप्त भुगतान बनाम बकाया सेटलमेंट शेष',
          'नेट बिक्री घटाव COGS, शुल्क, पूर्ति व निश्चित खर्च = परिचालन परिणाम',
          'प्रारंभिक बैंक शेष + प्राप्ति − स्टॉक व पैकिंग भुगतान = बैंक बैलेंस',
          'आगामी देय बिल + सुरक्षा रिज़र्व',
          'अगले स्टॉक ऑर्डर से पहले उपलब्ध वास्तविक मुक्त नकदी',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'Why do marketplace payouts rarely match total weekly sales?',
          hi: 'मार्केटप्लेस से आने वाला पैसा साप्ताहिक बिक्री के बराबर क्यों नहीं होता?',
        },
        answer: {
          en: 'Because settlements deduct refunds, commissions, and shipping charges, and hold amounts in transit across payout cycles.',
          hi: 'क्योंकि सेटलमेंट में रिफंड, कमीशन और शिपिंग कटती है तथा भुगतान चक्रों में राशि बकाया रहती है।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Bonnza Operations & Cash Reconciliation Guide',
        url: 'https://bonnza.marketingtusk.com/en/courses/operations-and-growth',
        checkedDate: '2026-11-15',
      },
    ],
    author: { en: 'Bonnza Editorial Team', hi: 'Bonnza संपादकीय टीम' },
    reviewer: { en: 'Shubham Chaturvedi', hi: 'शुभम चतुर्वेदी' },
    sourceCheckedDate: '2026-11-16',
    publicationDate: '2026-11-16',
    lastSubstantiveUpdateDate: '2026-11-16',
    editorialStatus: 'PUBLISHED',
    subjectReviewStatus: 'VERIFIED',
    translationStatus: 'APPROVED',
    seoTitle: {
      en: "Sales, Settlements and Cash: A Seller's Guide | Bonnza",
      hi: 'बिक्री, सेटलमेंट और नकदी: विक्रेताओं के लिए गाइड | Bonnza',
    },
    metaDescription: {
      en: 'Reconcile gross sales, marketplace settlements, operating profit, and uncommitted bank cash using a clear weekly ledger.',
      hi: 'साप्ताहिक खाते के माध्यम से बिक्री, सेटलमेंट, परिचालन परिणाम और बैंक नकदी का मिलान समझें।',
    },
    canonicalPath: '/en/blog/sales-settlements-cash-for-sellers',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 5,
  },
  {
    id: 'B20',
    slug: 'returns-product-listing-improvement',
    hiSlug: 'returns-product-listing-improvement',
    title: {
      en: 'What customer returns can teach you about your product listing',
      hi: 'ग्राहक रिटर्न आपको आपकी उत्पाद लिस्टिंग के बारे में क्या सिखा सकते हैं',
    },
    shortDescription: {
      en: 'Compare return rates against comparable exposed orders, isolate listing mismatches, and evaluate targeted 30-day fixes.',
      hi: 'तुलनीय डिलीवर ऑर्डर के विरुद्ध रिटर्न प्रतिशत जांचें, लिस्टिंग अंतर पहचानें और 30-दिन के लक्षित सुधार का मूल्यांकन करें।',
    },
    directAnswer: {
      en: 'Customer returns can reveal gaps in a product listing, but only if you separate the reasons and compare them with the number of orders exposed to the same offer. Look for evidence of a specific mismatch, make a targeted correction and review a comparable group of later orders. Not every return is caused by the listing.',
      hi: 'ग्राहक रिटर्न आपकी लिस्टिंग की कमियां दिखा सकते हैं, लेकिन तभी जब आप कारणों को अलग करें और उसी ऑफ़र के कुल ऑर्डर से तुलना करें। हर रिटर्न लिस्टिंग की गलती से नहीं होता।',
    },
    summary: {
      en: 'Shows why 3 returns on 50 orders (6%) is worse than 4 returns on 100 orders (4%), uses a cotton-pouch size-clarity fix example, and defines a 30-day review framework.',
      hi: 'दिखाता है कि 50 ऑर्डर में 3 रिटर्न (6%), 100 ऑर्डर में 4 रिटर्न (4%) से अधिक क्यों है; कॉटन पाउच आकार-स्पष्टता सुधार और 30-दिवसीय समीक्षा ढांचा।',
    },
    keyTakeaways: {
      en: [
        'Track return rate, not raw return count: 4/100 = 4%, whereas 3/50 = 6% (fewer returns, higher rate).',
        'Separate dispatch errors, courier damage, buyer remorse, and listing-expectation gaps before editing pages.',
        'Log listing version changes (e.g., adding scale/dimension imagery on cotton pouch) and compare an equal post-edit order window.',
      ],
      hi: [
        'केवल संख्या नहीं, रिटर्न प्रतिशत देखें: 4/100 = 4%, जबकि 3/50 = 6% (संख्या कम हुई, पर दर बढ़ी)।',
        'लिस्टिंग बदलने से पहले पैकिंग गलती, ट्रांजिट क्षति और लिस्टिंग-अपेक्षा अंतर को अलग करें।',
        'सुधार के बाद (जैसे पाउच के माप की स्पष्ट फोटो जोड़ना) तुलनीय ऑर्डर समूह पर 30-दिन की समीक्षा करें।',
      ],
    },
    topicCluster: 'operations-and-growth',
    topicClusterLabel: { en: 'Operations and Growth', hi: 'ऑपरेशंस और ग्रोथ' },
    priority: 'P3',
    intendedReader: {
      en: 'Active sellers diagnosing returns across marketplaces or owned storefronts.',
      hi: 'मार्केटप्लेस या अपनी वेबसाइट पर रिटर्न कारणों को समझ रहे सक्रिय विक्रेता।',
    },
    searchIntent: {
      en: 'Framework for diagnosing return rates and improving product listings cleanly.',
      hi: 'रिटर्न दर विश्लेषण और उत्पाद लिस्टिंग सुधार ढांचा।',
    },
    courseMappings: ['C10-L03', 'C10-L04'],
    relatedArticleIds: ['B05', 'B12', 'B14'],
    primaryCta: {
      label: {
        en: 'Use the operations improvement assignment',
        hi: 'ऑपरेशंस सुधार अभ्यास देखें',
      },
      path: '/courses/operations-and-growth',
    },
    sections: [
      {
        id: 'rate-not-count',
        heading: {
          en: 'Why can a lower return count still signal a worse return rate?',
          hi: 'कम रिटर्न संख्या होने पर भी रिटर्न दर अधिक कैसे हो सकती है?',
        },
        paragraphs: {
          en: [
            'Suppose in Month 1 you had 4 returns out of 100 comparable delivered orders—a 4% return rate. In Month 2 you had 3 returns out of 50 comparable delivered orders—a 6% return rate. The raw count dropped from 4 to 3, yet the underlying rate worsened by half.',
            'Before blaming your title or photos, separate reasons: a damaged batch from stock, wrong SKU packed during dispatch, or courier refusal is not fixed by editing listing copy.',
          ],
          hi: [
            'मान लें पहले महीने 100 डिलीवर ऑर्डर में 4 रिटर्न आए (4% दर)। दूसरे महीने 50 डिलीवर ऑर्डर में 3 रिटर्न आए (6% दर)। संख्या 4 से 3 हुई, लेकिन दर बढ़ गई।',
            'शीर्षक या फोटो बदलने से पहले कारण अलग करें—खराब पैकिंग या ट्रांजिट क्षति का समाधान लिस्टिंग बदलने से नहीं होता।',
          ],
        },
      },
      {
        id: 'cotton-pouch-fix',
        heading: {
          en: 'How should you test and verify a listing fix over 30 days?',
          hi: '30 दिनों में लिस्टिंग सुधार का परीक्षण और सत्यापन कैसे करें?',
        },
        paragraphs: {
          en: [
            'In our fictional cotton-pouch example, several buyers noted "smaller than expected." Checking the listing revealed studio close-ups without any size reference. Adding a second gallery photo next to a smartphone and ruler showing 20cm × 14cm directly addressed that mismatch.',
            'Record the listing version date and review comparable delivered orders over the next 30 days without making unsupported causal claims when external factors (like seasonal gifting or discounts) also shifted.',
          ],
          hi: [
            'काल्पनिक कॉटन पाउच उदाहरण में कई खरीदारों ने “अपेक्षा से छोटा” लिखा क्योंकि फोटो में कोई आकार संदर्भ नहीं था। स्केल और फ़ोन के साथ 20cm × 14cm की फोटो जोड़ने से यह अंतर सीधे दूर हुआ।',
            'बदलाव की तिथि दर्ज करें और अगले 30 दिनों के तुलनीय ऑर्डर पर प्रभाव देखें।',
          ],
        },
      },
    ],
    comparisonTable: {
      caption: {
        en: 'Return-Learning & 30-Day Review Log (Fictional Example)',
        hi: 'रिटर्न-सीख और 30-दिवसीय समीक्षा लॉग (काल्पनिक उदाहरण)',
      },
      headers: {
        en: ['Period', 'Delivered Orders', 'Returns', 'Rate', 'Notes'],
        hi: ['अवधि', 'डिलीवर ऑर्डर', 'रिटर्न', 'दर', 'टिप्पणी'],
      },
      rows: {
        en: [
          ['Period A (Listing v1)', '100', '4', '4%', '2 cited "smaller than expected"'],
          ['Period B (Listing v1)', '50', '3', '6%', 'Smaller volume; higher rate observed'],
          ['Period C (Listing v2 + scale photo)', 'Track 30 days', 'TBD', 'Compare rate', 'Avoid premature causal claims'],
        ],
        hi: [
          ['अवधि A (लिस्टिंग v1)', '100', '4', '4%', '2 ने “अपेक्षा से छोटा” बताया'],
          ['अवधि B (लिस्टिंग v1)', '50', '3', '6%', 'कम ऑर्डर पर बढ़ी हुई दर'],
          ['अवधि C (लिस्टिंग v2 + स्केल फोटो)', '30 दिन ट्रैक', 'आगामी', 'दर तुलना करें', 'बिना पर्याप्त डेटा के पक्का दावा न करें'],
        ],
      },
    },
    worksheetSummary: {
      title: {
        en: 'Return-Learning & Listing Review Log',
        hi: 'रिटर्न-सीख व लिस्टिंग समीक्षा लॉग',
      },
      fields: {
        en: [
          'Comparable delivered orders count (denominator) vs returns count (%)',
          'Separated return category (Listing gap / Damage / Wrong SKU / Remorse)',
          'Quoted customer expectation mismatch vs live listing copy/images',
          'Targeted single-change fix & new listing version date',
          '30-day comparable post-edit order window & cautious evaluation note',
        ],
        hi: [
          'तुलनीय डिलीवर ऑर्डर संख्या बनाम रिटर्न संख्या (प्रतिशत दर)',
          'अलग की गई रिटर्न श्रेणी (लिस्टिंग अंतर / क्षति / गलत SKU / पसंद)',
          'ग्राहक प्रतिक्रिया व वर्तमान लिस्टिंग विवरण/फोटो की तुलना',
          'लक्षित एकल सुधार व नई लिस्टिंग संस्करण तिथि',
          '30-दिवसीय तुलनीय ऑर्डर समीक्षा व सावधानीपूर्ण मूल्यांकन',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'Does every customer return mean something is wrong with the listing?',
          hi: 'क्या हर ग्राहक रिटर्न का अर्थ यह है कि लिस्टिंग में कोई कमी है?',
        },
        answer: {
          en: 'No. Courier damage, wrong item packed, and non-listing buyer preferences also cause returns—log each reason separately.',
          hi: 'नहीं। ट्रांजिट क्षति, गलत पैकिंग और व्यक्तिगत पसंद भी कारण हो सकते हैं—हर कारण अलग दर्ज करें।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Bonnza Return Review Framework',
        url: 'https://bonnza.marketingtusk.com/en/courses/operations-and-growth',
        checkedDate: '2026-11-15',
      },
    ],
    author: { en: 'Bonnza Editorial Team', hi: 'Bonnza संपादकीय टीम' },
    reviewer: { en: 'Shubham Chaturvedi', hi: 'शुभम चतुर्वेदी' },
    sourceCheckedDate: '2026-11-16',
    publicationDate: '2026-11-16',
    lastSubstantiveUpdateDate: '2026-11-16',
    editorialStatus: 'PUBLISHED',
    subjectReviewStatus: 'VERIFIED',
    translationStatus: 'APPROVED',
    seoTitle: {
      en: 'Use Customer Returns to Improve Product Listings | Bonnza',
      hi: 'उत्पाद लिस्टिंग सुधारने के लिए ग्राहक रिटर्न का उपयोग करें | Bonnza',
    },
    metaDescription: {
      en: 'Compare return rates accurately, isolate listing expectation gaps, and run a disciplined 30-day review.',
      hi: 'रिटर्न दर की सही तुलना, लिस्टिंग अंतर की पहचान और 30-दिन की सुधार समीक्षा सीखें।',
    },
    canonicalPath: '/en/blog/returns-product-listing-improvement',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 5,
  },
];
