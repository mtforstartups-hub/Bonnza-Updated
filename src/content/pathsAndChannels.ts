import type { SellingChannelRecord } from '../domain/types';

export interface LearningPathRecord {
  id: 'resell' | 'craft-to-commerce';
  slug: string;
  title: { en: string; hi: string };
  subtitle: { en: string; hi: string };
  summary: { en: string; hi: string };
  imageSrc: string;
  imageAlt: { en: string; hi: string };
  keyTopics: { en: string[]; hi: string[] };
  importantDistinction: { en: string; hi: string };
  courseIds: string[];
  articleIds: string[];
}

export const LEARNING_PATHS: LearningPathRecord[] = [
  {
    id: 'resell',
    slug: 'resell',
    title: {
      en: 'Resell: Source to Sell',
      hi: 'रीसेल: सोर्स टू सेल',
    },
    subtitle: {
      en: 'Source physical products from suppliers and sell responsibly through your own seller accounts.',
      hi: 'आपूर्तिकर्ताओं से भौतिक उत्पाद सोर्स करें और अपने सेलर अकाउंट से बेचें।',
    },
    summary: {
      en: 'Learn how to evaluate suppliers on total delivered usable cost, inspect physical samples against written specifications, calculate unit contribution, size an affordable first inventory order, and manage fulfilment and returns.',
      hi: 'आपूर्तिकर्ताओं की कुल उपयोगी लागत पर तुलना करना, लिखित विनिर्देश पर सैंपल जांचना, प्रति यूनिट योगदान निकालना, पहला स्टॉक आकार तय करना और पूर्ति व रिटर्न संभालना सीखें।',
    },
    imageSrc: '/src/assets/images/path_resell_sourcing_1794821603920.jpg',
    imageAlt: {
      en: 'Stacked canvas and blue cotton pouches with fabric swatch cards, ruler, and kraft mailer box for supplier sample inspection',
      hi: 'सैंपल जांच के लिए रखे कैनवास व नीले कॉटन पाउच, फैब्रिक स्वैच, स्केल और क्राफ्ट बॉक्स',
    },
    keyTopics: {
      en: [
        'Supplier selection on total landed & usable-unit cost',
        'Physical sample inspection & written defect-remedy terms',
        'Cash-reserve-first initial inventory sizing',
        'Product costing, pricing, listings, fulfilment and returns',
      ],
      hi: [
        'डिलीवरी व उपयोगी पीस के आधार पर आपूर्तिकर्ता चयन',
        'भौतिक सैंपल निरीक्षण और दोष-समाधान शर्तें',
        'नकद रिज़र्व के बाद पहले स्टॉक की मात्रा तय करना',
        'लागत गणना, मूल्य निर्धारण, लिस्टिंग, डिस्पैच और रिटर्न प्रबंधन',
      ],
    },
    importantDistinction: {
      en: 'This is not automatically a no-stock reselling or dropshipping business. You inspect real products, verify rights, and manage stock accountability.',
      hi: 'यह स्वतः बिना-स्टॉक रीसेलिंग या ड्रॉपशिपिंग नहीं है। आप वास्तविक उत्पाद जांचते हैं, अधिकार सत्यापित करते हैं और स्टॉक की जिम्मेदारी संभालते हैं।',
    },
    courseIds: ['C01', 'C02', 'C04', 'C05', 'C06', 'C10'],
    articleIds: ['B01', 'B04', 'B05', 'B06', 'B11', 'B17'],
  },
  {
    id: 'craft-to-commerce',
    slug: 'craft-to-commerce',
    title: {
      en: 'Craft to Commerce',
      hi: 'क्राफ्ट टू कॉमर्स',
    },
    subtitle: {
      en: 'Prepare handmade goods you make yourself or physical crafts responsibly sourced from artists.',
      hi: 'स्वयं बनाए हस्तनिर्मित उत्पाद या कलाकारों से जिम्मेदारी से सोर्स किए गए शिल्प ऑनलाइन बेचने के लिए तैयार करें।',
    },
    summary: {
      en: 'Learn how to document provenance and maker attribution truthfully, price your own making hours and waste without undercharging, photograph natural handmade variation clearly, and plan production capacity, packaging, and dispatch.',
      hi: 'स्रोत प्रमाण और निर्माता श्रेय ईमानदारी से दर्ज करना, अपने समय व सामग्री अपव्यय का सही मूल्य लगाना, हस्तनिर्मित विविधता दिखाना और उत्पादन क्षमता व पैकेजिंग की योजना बनाना सीखें।',
    },
    imageSrc: '/src/assets/images/path_craft_commerce_1794821603774.jpg',
    imageAlt: {
      en: 'Handcrafted natural cotton pouches tied with twine alongside wooden thread spools, brass shears, and kraft packaging',
      hi: 'लकड़ी की रील, पीतल की कैंची और क्राफ्ट पैकेजिंग के साथ रखे हस्तनिर्मित कॉटन पाउच',
    },
    keyTopics: {
      en: [
        'Distinguishing self-made items from artist-sourced finished crafts',
        'Truthful provenance records, photo permissions & maker attribution',
        'Costing materials, making time, setup, waste & weekly capacity',
        'Presenting handmade variation, protective packaging & channel fit',
      ],
      hi: [
        'स्व-निर्मित और कलाकार-निर्मित उत्पादों के बीच स्पष्ट अंतर',
        'सत्य स्रोत प्रमाण, फोटो अनुमति और निर्माता का नामोल्लेख',
        'सामग्री, श्रम घंटे, अपव्यय और साप्ताहिक उत्पादन क्षमता की गणना',
        'हस्तनिर्मित विविधता की प्रस्तुति, सुरक्षित पैकेजिंग और चैनल उपयुक्तता',
      ],
    },
    importantDistinction: {
      en: 'A maker’s role and a curator/reseller’s role are distinct. Buying finished handmade goods from artists does not automatically qualify an item for Etsy.',
      hi: 'निर्माता और क्यूरेटर/विक्रेता की भूमिकाएं अलग हैं। केवल हस्तनिर्मित होने से कलाकार-निर्मित तैयार उत्पाद स्वतः Etsy के लिए पात्र नहीं हो जाता।',
    },
    courseIds: ['C01', 'C03', 'C04', 'C07', 'C08', 'C10'],
    articleIds: ['B07', 'B09', 'B15', 'B16', 'B10', 'B19'],
  },
];

export const SELLING_CHANNELS: SellingChannelRecord[] = [
  {
    slug: 'meesho',
    name: { en: 'Meesho', hi: 'Meesho (मीशो)' },
    learningPurpose: {
      en: 'Understand Indian value-marketplace onboarding routes, catalogue consistency checks, order processing, and settlement reconciliation.',
      hi: 'भारतीय वैल्यू मार्केटप्लेस ऑनबोर्डिंग मार्ग, कैटलॉग संगति जांच, ऑर्डर प्रक्रिया और सेटलमेंट मिलान सीखें।',
    },
    bestSuitedFor: {
      en: 'Price-competitive everyday physical products with clear pack quantities and GSTIN or applicable state-specific route readiness.',
      hi: 'स्पष्ट पैक मात्रा और लागू GSTIN या राज्य-विशिष्ट पात्रता वाले दैनिक उपयोग के उत्पाद।',
    },
    importantCaveat: {
      en: 'Non-GST Enrolment ID/UIN routes may carry state-specific selling limitations. Bonnza has no official partnership with Meesho.',
      hi: 'नॉन-GST Enrolment ID/UIN मार्गों में राज्य-सीमित बिक्री शर्तें हो सकती हैं। Bonnza का Meesho से कोई आधिकारिक साझेदारी नहीं है।',
    },
    readinessChecks: {
      en: [
        'Verify applicable GSTIN or Enrolment ID/UIN eligibility directly with Meesho Supplier Hub',
        'Align title, gallery images, pack quantity, and stock count before publishing',
        'Model shipping and return deductions before setting offer price',
      ],
      hi: [
        'Meesho सप्लायर हब से लागू GSTIN या Enrolment ID/UIN पात्रता जांचें',
        'प्रकाशन से पहले शीर्षक, फोटो, पैक संख्या और स्टॉक का मिलान करें',
        'मूल्य तय करने से पहले शिपिंग और रिटर्न प्रभाव का मॉडल बनाएं',
      ],
    },
    courseIds: ['C05', 'C01', 'C10'],
    relatedArticleIds: ['B11', 'B12', 'B03'],
  },
  {
    slug: 'amazon-india',
    name: { en: 'Amazon India', hi: 'Amazon India (अमेज़न इंडिया)' },
    learningPurpose: {
      en: 'Learn exact-match vs new-listing rules, accurate detail-page structure, fulfilment comparison, and seller health monitoring.',
      hi: 'एक्ज़ैक्ट-मैच बनाम नई लिस्टिंग नियम, सटीक विवरण पृष्ठ, फुलफिलमेंट तुलना और अकाउंट स्वास्थ्य निगरानी समझें।',
    },
    bestSuitedFor: {
      en: 'Standardized branded or private-spec physical goods where clear dimensions, GTIN/exemptions, and reliable dispatch matter.',
      hi: 'मानकीकृत या स्पष्ट माप, GTIN/छूट और विश्वसनीय डिस्पैच वाले भौतिक उत्पाद।',
    },
    importantCaveat: {
      en: 'GTIN exemptions and category approvals are conditional on Amazon’s live process. Bonnza is an independent education platform.',
      hi: 'GTIN छूट और श्रेणी अनुमोदन Amazon की लाइव प्रक्रिया के अधीन हैं। Bonnza एक स्वतंत्र शिक्षा प्लेटफ़ॉर्म है।',
    },
    readinessChecks: {
      en: [
        'Check whether brand, model, size, colour, and pack count match an existing ASIN exactly',
        'Compare self-ship, Easy Ship, and FBA fees against your product weight slab',
        'Confirm tax registration and brand/GTIN requirements for your category',
      ],
      hi: [
        'जांचें कि ब्रांड, मॉडल, माप, रंग और पैक संख्या किसी मौजूदा उत्पाद से सटीक मेल खाते हैं या नहीं',
        'अपने उत्पाद के वजन स्लैब पर सेल्फ-शिप, ईज़ी शिप और FBA शुल्क की तुलना करें',
        'श्रेणी के अनुसार कर पंजीकरण व ब्रांड/GTIN शर्तें सत्यापित करें',
      ],
    },
    courseIds: ['C06', 'C01', 'C10'],
    relatedArticleIds: ['B17', 'B02', 'B20'],
  },
  {
    slug: 'etsy',
    name: { en: 'Etsy', hi: 'Etsy (एट्सी)' },
    learningPurpose: {
      en: 'Assess whether your product and creator role qualify under Etsy’s creativity policy, check India onboarding steps, and price cross-border orders.',
      hi: 'जांचें कि आपका उत्पाद और भूमिका Etsy की रचनात्मक नीति में आते हैं या नहीं, भारत ऑनबोर्डिंग शर्तें देखें और अंतर्राष्ट्रीय मूल्य तय करें।',
    },
    bestSuitedFor: {
      en: 'Original items genuinely made or designed by the seller in compliance with Etsy’s current rules.',
      hi: 'विक्रेता द्वारा स्वयं बनाए या मूल रूप से डिज़ाइन किए गए पात्र उत्पाद।',
    },
    importantCaveat: {
      en: 'Artist-sourced finished crafts purchased unchanged for resale do not automatically qualify for Etsy. Always recheck current India fees and GSTIN/Payoneer requirements.',
      hi: 'कलाकारों से तैयार रूप में खरीदकर बेचे जाने वाले शिल्प स्वतः Etsy के पात्र नहीं होते। वर्तमान शुल्क व GSTIN/Payoneer शर्तें हमेशा लाइव जांचें।',
    },
    readinessChecks: {
      en: [
        'Verify your item fits Made, Designed, Handpicked, or Sourced rules truthfully',
        'Confirm current India shop onboarding, GSTIN, Payoneer, and fee terms',
        'Model international courier cost and return handling before listing',
      ],
      hi: [
        'जांचें कि उत्पाद Made, Designed, Handpicked या Sourced नियमों में सटीक बैठता है',
        'वर्तमान भारत शॉप ऑनबोर्डिंग, GSTIN, Payoneer और शुल्क शर्तें सत्यापित करें',
        'लिस्टिंग से पहले अंतर्राष्ट्रीय कूरियर व रिटर्न लागत जोड़ें',
      ],
    },
    courseIds: ['C08', 'C03'],
    relatedArticleIds: ['B15', 'B16', 'B09'],
  },
  {
    slug: 'amazon-global',
    name: { en: 'Amazon Global', hi: 'Amazon Global (अंतर्राष्ट्रीय बिक्री)' },
    learningPurpose: {
      en: 'Learn to evaluate one export destination, map export/import responsibilities, and calculate international return cash risk.',
      hi: 'एक निर्यात गंतव्य चुनना, निर्यात/आयात दायित्व समझना और अंतर्राष्ट्रीय रिटर्न नकद जोखिम की गणना सीखें।',
    },
    bestSuitedFor: {
      en: 'Sellers who have validated unit economics and are prepared for export documentation, compliance, and cross-border logistics.',
      hi: 'वे विक्रेता जिन्होंने यूनिट अर्थशास्त्र सत्यापित कर लिया है और निर्यात दस्तावेज़ व लॉजिस्टिक्स के लिए तैयार हैं।',
    },
    importantCaveat: {
      en: 'International return logistics can easily exceed a single order’s initial contribution. Verify IEC rules and exemptions for your exact route.',
      hi: 'अंतर्राष्ट्रीय रिटर्न लॉजिस्टिक्स लागत एक ऑर्डर के प्रारंभिक योगदान से अधिक हो सकती है। अपने मार्ग के लिए IEC नियम व छूट जांचें।',
    },
    readinessChecks: {
      en: [
        'Select one product, one destination country, and one fulfilment model first',
        'Verify Indian IEC requirements/exemptions and destination product compliance',
        'Stress-test contribution against outbound shipping and reverse-logistics cost',
      ],
      hi: [
        'पहले एक उत्पाद, एक गंतव्य देश और एक पूर्ति मॉडल तय करें',
        'भारतीय IEC आवश्यकताएं/छूट और गंतव्य देश के उत्पाद मानक जांचें',
        'आउटबाउंड शिपिंग और रिटर्न लॉजिस्टिक्स के साथ योगदान का तनाव-परीक्षण करें',
      ],
    },
    courseIds: ['C09', 'C06'],
    relatedArticleIds: ['B18', 'B02'],
  },
  {
    slug: 'whatsapp-selling',
    name: { en: 'WhatsApp Selling', hi: 'WhatsApp बिक्री' },
    learningPurpose: {
      en: 'Structure product catalogues, convert enquiries into written order confirmations, verify bank receipts, and log dispatch records.',
      hi: 'उत्पाद कैटलॉग बनाना, पूछताछ को लिखित ऑर्डर पुष्टि में बदलना, बैंक भुगतान जांचना और डिस्पैच रिकॉर्ड रखना सीखें।',
    },
    bestSuitedFor: {
      en: 'Small-batch pilots, repeat community buyers, custom craft orders, and low-overhead direct customer conversations.',
      hi: 'छोटे बैच के पायलट, परिचित ग्राहक नेटवर्क, कस्टम शिल्प और सीधे ग्राहक संवाद।',
    },
    importantCaveat: {
      en: 'WhatsApp does not bring strangers to you automatically—you need an ethical enquiry source and independent payment verification beyond screenshots.',
      hi: 'WhatsApp स्वतः नए ग्राहक नहीं लाता—आपको पूछताछ का वास्तविक स्रोत और स्क्रीनशॉट से परे स्वतंत्र भुगतान जांच रखनी होगी।',
    },
    readinessChecks: {
      en: [
        'Set up clear product codes, dimensions, single-unit pricing, and delivery quotes',
        'Confirm bank credit in your own account statement before dispatching goods',
        'Keep a simple order register with confirmation references and dispatch status',
      ],
      hi: [
        'प्रोडक्ट कोड, माप, कीमत और डिलीवरी शुल्क की स्पष्ट सूची तैयार रखें',
        'सामान भेजने से पहले अपने बैंक खाते में राशि की पुष्टि अवश्य करें',
        'ऑर्डर संदर्भ संख्या और डिस्पैच स्थिति का एक सरल रजिस्टर बनाए रखें',
      ],
    },
    courseIds: ['C04', 'C01'],
    relatedArticleIds: ['B08', 'B03', 'B10'],
  },
  {
    slug: 'social-selling',
    name: { en: 'Social Media Selling', hi: 'सोशल मीडिया बिक्री' },
    learningPurpose: {
      en: 'Create honest buying-question product posts that educate buyers on size, material, usage, and ordering steps.',
      hi: 'आकार, सामग्री, उपयोग और ऑर्डर प्रक्रिया समझाने वाले व्यावहारिक उत्पाद पोस्ट बनाना सीखें।',
    },
    bestSuitedFor: {
      en: 'Visual products, handmade crafts, and curated collections where showing real usage and scale builds buyer confidence.',
      hi: 'दृश्य उत्पाद, हस्तनिर्मित शिल्प और वे संग्रह जहाँ वास्तविक उपयोग व आकार दिखाना भरोसा बनाता है।',
    },
    importantCaveat: {
      en: 'Engagement metrics such as views and likes do not automatically translate into sales, so it helps to track genuine buyer enquiries and confirmed orders separately.',
      hi: 'व्यू और लाइक जैसे एंगेजमेंट आंकड़े अपने आप बिक्री में नहीं बदलते, इसलिए वास्तविक ग्राहक पूछताछ और पुष्ट ऑर्डर को अलग से ट्रैक करना उपयोगी रहता है।',
    },
    readinessChecks: {
      en: [
        'Answer the seven buyer questions across photos and short videos',
        'Make ordering route (WhatsApp or store link) unmistakable in profile and captions',
        'Track weekly views, enquiries, and confirmed orders in one log',
      ],
      hi: [
        'फोटो और छोटे वीडियो में खरीदार के सात मुख्य प्रश्नों के उत्तर दें',
        'प्रोफ़ाइल और कैप्शन में ऑर्डर करने का तरीका (WhatsApp या स्टोर लिंक) स्पष्ट रखें',
        'साप्ताहिक व्यू, पूछताछ और पुष्ट ऑर्डर एक लॉग में ट्रैक करें',
      ],
    },
    courseIds: ['C04', 'C03'],
    relatedArticleIds: ['B10', 'B08', 'B03'],
  },
  {
    slug: 'shopify',
    name: { en: 'Shopify', hi: 'Shopify (शॉपिफ़ाई)' },
    learningPurpose: {
      en: 'Build a clean owned storefront with product variants, shipping rules, Indian payment gateway checks, and full end-to-end launch testing.',
      hi: 'वेरिएंट, शिपिंग नियम, भारतीय पेमेंट गेटवे जांच और पूर्ण लॉन्च परीक्षण के साथ अपना ऑनलाइन स्टोर बनाएं।',
    },
    bestSuitedFor: {
      en: 'Entrepreneurs ready to invest in recurring platform fees and drive their own traffic to an independent store.',
      hi: 'नियमित प्लेटफ़ॉर्म शुल्क और अपने ट्रैफ़िक स्रोतों के साथ स्वतंत्र ब्रांड स्टोर बनाने के इच्छुक उद्यमी।',
    },
    importantCaveat: {
      en: 'A website does not generate visitors automatically. Verify Indian payment-provider availability and third-party transaction charges before committing.',
      hi: 'वेबसाइट अपने आप ट्रैफ़िक नहीं लाती। शुरू करने से पहले भारत में पेमेंट प्रोवाइडर उपलब्धता और लेनदेन शुल्क अवश्य जांचें।',
    },
    readinessChecks: {
      en: [
        'Model monthly subscription, payment gateway fees, and third-party transaction fees',
        'Verify supported delivery zones and shipping rates on mobile checkout',
        'Execute test orders for success, failure, stock deduction, and refunds',
      ],
      hi: [
        'मासिक शुल्क, पेमेंट गेटवे और थर्ड-पार्टी लेनदेन शुल्क का आकलन करें',
        'मोबाइल चेकआउट पर डिलीवरी पिनकोड और शिपिंग दरें जांचें',
        'सफल, असफल, स्टॉक कटौती और रिफंड के लिए टेस्ट ऑर्डर चलाएं',
      ],
    },
    courseIds: ['C07', 'C10'],
    relatedArticleIds: ['B13', 'B14', 'B03'],
  },
  {
    slug: 'wix',
    name: { en: 'Wix', hi: 'Wix (विक्स)' },
    learningPurpose: {
      en: 'Compare Wix catalogue setup, mobile page layout, payment provider options in India, and checkout verification alongside alternatives.',
      hi: 'भारत में कैटलॉग सेटअप, मोबाइल लेआउट, पेमेंट प्रोवाइडर विकल्प और चेकआउट परीक्षण की तुलनात्मक प्रक्रिया सीखें।',
    },
    bestSuitedFor: {
      en: 'Small product catalogues combining informational storytelling pages with straightforward checkout needs.',
      hi: 'वे छोटे उत्पाद कैटलॉग जहाँ जानकारीपूर्ण पृष्ठों के साथ सरल चेकआउट की आवश्यकता हो।',
    },
    importantCaveat: {
      en: 'Confirm current country-specific payment gateway options and renewal pricing directly before migrating or opening.',
      hi: 'स्टोर खोलने से पहले वर्तमान देश-विशिष्ट पेमेंट गेटवे विकल्प और नवीनीकरण शुल्क सीधे जांचें।',
    },
    readinessChecks: {
      en: [
        'Test a six-product multi-variant buying journey on mobile before choosing a plan',
        'Verify available Indian payment gateways and settlement timelines',
        'Document customer policy pages (shipping, returns, contact) prior to launch',
      ],
      hi: [
        'प्लान चुनने से पहले मोबाइल पर छह उत्पादों का परीक्षण खरीदारी प्रवाह जांचें',
        'उपलब्ध भारतीय पेमेंट गेटवे और सेटलमेंट समयसीमा सत्यापित करें',
        'लॉन्च से पहले शिपिंग, रिटर्न और संपर्क पृष्ठ पूरा करें',
      ],
    },
    courseIds: ['C07', 'C10'],
    relatedArticleIds: ['B13', 'B14', 'B03'],
  },
];
