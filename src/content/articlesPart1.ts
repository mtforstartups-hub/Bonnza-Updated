import type { ArticleRecord } from '../domain/types';

export const ARTICLES_PART_1: ArticleRecord[] = [
  {
    id: 'B01',
    slug: 'starting-ecommerce-business-from-home',
    hiSlug: 'starting-ecommerce-business-from-home',
    title: {
      en: 'Start an ecommerce business from home: your first five decisions',
      hi: 'घर से ई-कॉमर्स बिज़नेस शुरू करें: आपके पहले पांच निर्णय',
    },
    shortDescription: {
      en: 'Put your buyer, product, sourcing role, unit costs, and first sales channel into a small testable plan before buying stock.',
      hi: 'बड़ा स्टॉक खरीदने से पहले ग्राहक, उत्पाद, सोर्सिंग भूमिका, प्रति ऑर्डर लागत और पहले चैनल को एक छोटी परीक्षण योजना में रखें।',
    },
    directAnswer: {
      en: 'Starting an ecommerce business from home begins with five decisions: who you want to serve, what you will sell, how you will obtain the product, what an order will cost and where you will reach customers. Put those decisions into a small, testable plan before committing to a large stock purchase.',
      hi: 'घर से ई-कॉमर्स बिज़नेस शुरू करने के लिए पांच निर्णय जरूरी हैं: आप किसकी सेवा करना चाहते हैं, आप क्या बेचेंगे, उत्पाद कैसे प्राप्त करेंगे, एक ऑर्डर की लागत क्या होगी और आप ग्राहकों तक कहां पहुंचेंगे। बड़ा स्टॉक खरीदने से पहले इन्हें एक छोटी परीक्षण योजना में रखें।',
    },
    summary: {
      en: 'A practical five-decision sequence for home-based beginners using a fictional cotton travel pouch example to verify costs and run a seven-day test.',
      hi: 'घर से शुरुआत करने वालों के लिए काल्पनिक कॉटन ट्रैवल पाउच उदाहरण के साथ लागत जांचने और सात-दिवसीय परीक्षण चलाने की पांच-चरणीय रूपरेखा।',
    },
    keyTakeaways: {
      en: [
        'Define a specific buyer and use case rather than broad labels such as anyone who needs bags.',
        'Clarify early whether you are making, reselling supplier stock, or curating artist-made crafts.',
        'Check delivered unit cost (e.g., ₹115 delivered vs ₹120 landed) and per-order contribution before ordering bulk stock.',
        'Run a bounded seven-day evidence experiment with explicit continue, revise, or pause rules.',
      ],
      hi: [
        '“बैग चाहने वाले सभी लोग” जैसे व्यापक समूह के बजाय स्पष्ट खरीदार और उपयोग तय करें।',
        'शुरुआत में तय करें कि आप स्वयं बना रहे हैं, आपूर्तिकर्ता स्टॉक रीसेल कर रहे हैं या कलाकारों के शिल्प ला रहे हैं।',
        'थोक ऑर्डर से पहले डिलीवरी सहित प्रति यूनिट लागत (जैसे ₹115 बनाम ₹120) और योगदान जांचें।',
        'जारी/सुधार/रोकने के स्पष्ट नियमों के साथ सात-दिवसीय छोटा प्रमाण परीक्षण चलाएं।',
      ],
    },
    topicCluster: 'business-foundations',
    topicClusterLabel: { en: 'Business Foundations', hi: 'बिज़नेस फ़ाउंडेशन' },
    priority: 'P1',
    intendedReader: {
      en: 'First-time and home-based entrepreneurs evaluating their initial online product plan.',
      hi: 'पहली बार और घर से ऑनलाइन उत्पाद व्यापार की योजना बना रहे उद्यमी।',
    },
    searchIntent: {
      en: 'Informational decision framework for starting ecommerce from home without blind inventory risk.',
      hi: 'बिना अनावश्यक स्टॉक जोखिम के घर से ई-कॉमर्स शुरू करने का निर्णय ढांचा।',
    },
    courseMappings: ['C01-L01', 'C01-L03', 'C01-L06'],
    relatedArticleIds: ['B02', 'B03', 'B04'],
    primaryCta: {
      label: {
        en: 'Join the product, cost and first-channel workshop',
        hi: 'उत्पाद, लागत और पहले चैनल की वर्कशॉप से जुड़ें',
      },
      path: '/webinars/first-online-business',
    },
    sections: [
      {
        id: 'decision-1-buyer',
        heading: {
          en: '1. Who is your specific buyer and what problem does the product solve?',
          hi: '1. आपका विशिष्ट खरीदार कौन है और उत्पाद कौन-सी समस्या हल करता है?',
        },
        paragraphs: {
          en: [
            'Many beginners start with an audience far too broad—such as everyone who needs bags. A home-based business with limited cash and time needs a concrete buyer and use case so photography, sizing, and pricing speak to real expectations.',
            'For example, using a fictional cotton travel pouch: instead of targeting every shopper, focus on frequent weekend train or flight travellers who want a compact washable organizer for chargers and small toiletries.',
          ],
          hi: [
            'कई नए विक्रेता “हर किसी को बैग चाहिए” जैसी व्यापक सोच से शुरुआत करते हैं। सीमित पूंजी और समय वाले घरेलू व्यवसाय को एक स्पष्ट खरीदार और उपयोग तय करना चाहिए।',
            'उदाहरण के लिए, काल्पनिक कॉटन ट्रैवल पाउच में हर किसी के बजाय उन सप्ताहांत यात्रियों को चुनें जिन्हें चार्जर और छोटे सामान रखने के लिए कॉम्पैक्ट धोने योग्य ऑर्गनाइज़र चाहिए।',
          ],
        },
        extractableStatement: {
          en: 'A specific buyer and use case lets a first-time seller test messaging, pricing, and packaging without guessing across unrelated customer groups.',
          hi: 'स्पष्ट खरीदार और उपयोग तय करने से नया विक्रेता बिना अनुमान लगाए मूल्य, पैकेजिंग और प्रस्तुति का परीक्षण कर सकता है।',
        },
      },
      {
        id: 'decision-2-role',
        heading: {
          en: '2. Will you make products, source stock to resell, or source artist crafts?',
          hi: '2. क्या आप उत्पाद बनाएंगे, स्टॉक सोर्स कर रीसेल करेंगे, या कलाकारों के शिल्प लाएंगे?',
        },
        paragraphs: {
          en: [
            'Your operating routine depends directly on how the physical item reaches your packing table. Making products yourself requires tracking material waste and making hours. Reselling supplier stock requires sample inspection, landed-cost math, and reorder planning.',
            'If you source finished crafts from artists, keep provenance records, clarify photo permissions, and check marketplace rules—buying a handmade pouch from an artist does not automatically make it eligible on platforms like Etsy.',
          ],
          hi: [
            'आपकी दैनिक कार्यशैली इस बात पर निर्भर करती है कि उत्पाद आप तक कैसे पहुंचता है। स्वयं निर्माण में समय और सामग्री अपव्यय गिनना होता है, जबकि रीसेलिंग में सैंपल जांच और लैंडेड लागत देखनी होती है।',
            'यदि आप कलाकारों से तैयार शिल्प लेते हैं, तो स्रोत प्रमाण और फोटो अनुमति सुरक्षित रखें; किसी कलाकार का हस्तनिर्मित उत्पाद खरीदने भर से वह स्वतः Etsy जैसे प्लेटफ़ॉर्म के योग्य नहीं हो जाता।',
          ],
        },
      },
      {
        id: 'decision-3-costs',
        heading: {
          en: '3. What does one delivered order actually cost?',
          hi: '3. एक डिलीवर किए गए ऑर्डर की वास्तविक लागत क्या है?',
        },
        paragraphs: {
          en: [
            'Headline supplier unit prices hide freight and wastage. Suppose one supplier quotes ten cotton travel pouches at ₹100 each plus ₹200 freight—that equals ₹120 per unit. A second quote at ₹115 delivered is cheaper per usable pouch on that measure.',
            'At the order level, suppose a pouch sells for ₹500 net. Subtract ₹200 product cost, ₹20 packaging, ₹60 shipping, ₹50 channel and payment fees, and ₹20 expected return loss. That leaves ₹150 contribution before acquisition. If acquiring that order costs ₹100, ₹50 remains toward fixed costs and business profit.',
          ],
          hi: [
            'आपूर्तिकर्ता की प्रति पीस कीमत में अक्सर माल ढुलाई शामिल नहीं होती। मान लें 10 कॉटन पाउच ₹100 प्रति पीस और ₹200 भाड़े पर मिलते हैं, तो लागत ₹120 प्रति पीस होती है। ₹115 डिलीवर वाला दूसरा विकल्प इस माप पर सस्ता है।',
            'एक ऑर्डर में ₹500 नेट बिक्री में से ₹200 उत्पाद, ₹20 पैकेजिंग, ₹60 शिपिंग, ₹50 चैनल/भुगतान शुल्क और ₹20 रिटर्न हानि घटाने पर ₹150 योगदान बचता है। ₹100 ग्राहक-प्राप्ति लागत के बाद ₹50 शेष रहता है।',
          ],
        },
      },
      {
        id: 'decision-4-5-channel-experiment',
        heading: {
          en: '4 & 5. Which channel fits first, and how do you test in seven days?',
          hi: '4 व 5. पहला चैनल कैसे चुनें और सात दिन में परीक्षण कैसे करें?',
        },
        paragraphs: {
          en: [
            'Compare marketplaces, WhatsApp/social selling, and an owned website on four practical realities: buyer access, eligibility, order economics, and your weekly operational hours. Focus on implementing one channel well first.',
            'Before placing a larger stock order, run a seven-day evidence-gathering experiment: validate sample quality, gather real shipping quotes, confirm channel eligibility, and record a pre-agreed continue, revise, or pause rule.',
          ],
          hi: [
            'मार्केटप्लेस, WhatsApp/सोशल और अपनी वेबसाइट की तुलना चार बातों पर करें: खरीदार पहुंच, पात्रता, ऑर्डर अर्थशास्त्र और आपके पास उपलब्ध साप्ताहिक घंटे। पहले एक चैनल पर ध्यान केंद्रित करें।',
            'बड़े स्टॉक से पहले सात दिन का प्रमाण परीक्षण चलाएं: सैंपल जांचें, वास्तविक शिपिंग दर लें, पात्रता सत्यापित करें और पहले से तय मानदंड के आधार पर आगे बढ़ने या सुधारने का निर्णय लें।',
          ],
        },
      },
    ],
    calculationBlock: {
      title: {
        en: 'Illustrative Cotton Travel Pouch Order Math (Fictional Example)',
        hi: 'काल्पनिक कॉटन ट्रैवल पाउच ऑर्डर गणित (उदाहरण)',
      },
      note: {
        en: 'Contribution before fixed expenses and cash timing.',
        hi: 'निश्चित खर्च और नकद समय से पहले का योगदान।',
      },
      lines: [
        { label: { en: 'Net selling amount', hi: 'नेट बिक्री राशि' }, amount: '₹500' },
        { label: { en: 'Product cost', hi: 'उत्पाद लागत' }, amount: '− ₹200' },
        { label: { en: 'Packaging', hi: 'पैकेजिंग' }, amount: '− ₹20' },
        { label: { en: 'Shipping', hi: 'शिपिंग' }, amount: '− ₹60' },
        { label: { en: 'Channel & payment fees', hi: 'चैनल व भुगतान शुल्क' }, amount: '− ₹50' },
        { label: { en: 'Expected return allowance', hi: 'अनुमानित रिटर्न प्रावधान' }, amount: '− ₹20' },
        {
          label: { en: 'Contribution before acquisition', hi: 'प्राप्ति लागत से पहले योगदान' },
          amount: '₹150',
          highlight: true,
        },
        { label: { en: 'Customer acquisition cost', hi: 'ग्राहक प्राप्ति लागत' }, amount: '− ₹100' },
        {
          label: { en: 'Contribution after acquisition', hi: 'प्राप्ति लागत के बाद योगदान' },
          amount: '₹50',
          highlight: true,
        },
      ],
    },
    worksheetSummary: {
      title: {
        en: 'One-Page Starting Worksheet (13 Fields)',
        hi: 'एक-पृष्ठ शुरुआती वर्कशीट (13 फ़ील्ड)',
      },
      fields: {
        en: [
          'Target buyer & specific use case',
          'Product specification (material, size, pack contents)',
          'Making / reselling / artist-sourcing role',
          'Evidence gathered so far',
          'Unknown assumptions to verify',
          'Supplier landed unit cost & defect allowance',
          'Per-order contribution & customer acquisition budget',
          'Candidate first selling channel (one-channel focus)',
          'Weekly available operating hours',
          'Cash ceiling & fulfilment/problem reserve',
          'Next 7-day verification actions',
          'Measurable evidence threshold to check',
          'Continue / revise / pause decision rule',
        ],
        hi: [
          'लक्षित ग्राहक व विशिष्ट उपयोग',
          'उत्पाद विनिर्देश (सामग्री, आकार, पैक विवरण)',
          'निर्माण / रीसेलिंग / कलाकार-सोर्सिंग भूमिका',
          'अब तक जुटाए गए प्रमाण',
          'जांच के लिए शेष मान्यताएं',
          'आपूर्तिकर्ता लैंडेड यूनिट लागत व दोष प्रावधान',
          'प्रति ऑर्डर योगदान व ग्राहक प्राप्ति बजट',
          'पहला संभावित बिक्री चैनल (एक-चैनल फोकस)',
          'साप्ताहिक उपलब्ध कार्य घंटे',
          'नकद सीमा व पूर्ति/समस्या रिज़र्व',
          'अगले 7 दिन के सत्यापन कार्य',
          'जांच के लिए मापने योग्य प्रमाण सीमा',
          'जारी / सुधार / रोकने का निर्णय नियम',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'How much stock should a home-based beginner buy first?',
          hi: 'घर से शुरुआत करने वाले को पहले कितना स्टॉक खरीदना चाहिए?',
        },
        answer: {
          en: 'Only what fits after setting aside a fulfilment/problem cash reserve and passing a physical sample check. Ten inspected units or a small test batch is safer than committing all savings upfront.',
          hi: 'केवल उतना ही जितना पैकिंग/रिटर्न रिज़र्व अलग रखने और भौतिक सैंपल पास होने के बाद आपके बजट में समाए।',
        },
      },
      {
        question: {
          en: 'Should I launch on multiple channels in week one?',
          hi: 'क्या मुझे पहले ही सप्ताह में कई चैनलों पर लॉन्च करना चाहिए?',
        },
        answer: {
          en: 'No. Pick one suitable first channel so you can learn listing accuracy, customer replies, and dispatch timing without splitting limited weekly hours.',
          hi: 'नहीं। पहले एक उपयुक्त चैनल चुनें ताकि सीमित समय में लिस्टिंग, ग्राहक संवाद और डिस्पैच का अनुभव पक्का हो सके।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Bonnza Editorial Source Framework — Business Foundations',
        url: 'https://bonnza.marketingtusk.com/en/courses/business-foundations',
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
      en: 'Start an Ecommerce Business from Home: Five Decisions',
      hi: 'घर से ई-कॉमर्स बिज़नेस शुरू करें: पांच निर्णय | Bonnza',
    },
    metaDescription: {
      en: 'A practical five-decision plan for first-time home-based sellers: buyer, role, unit costs, channel fit, and a seven-day test.',
      hi: 'घर से पहले ऑनलाइन उत्पाद व्यापार के लिए पांच व्यावहारिक निर्णय: ग्राहक, भूमिका, लागत, चैनल और सात-दिवसीय परीक्षण।',
    },
    canonicalPath: '/en/blog/starting-ecommerce-business-from-home',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 6,
  },
  {
    id: 'B02',
    slug: 'online-selling-cost-calculation',
    hiSlug: 'online-selling-cost-calculation',
    title: {
      en: 'How to calculate the cost of selling one product online',
      hi: 'एक उत्पाद को ऑनलाइन बेचने की लागत कैसे निकालें',
    },
    shortDescription: {
      en: 'Calculate net sales, variable order costs, contribution, and cash timing across base, higher-shipping, and problem scenarios.',
      hi: 'सामान्य, बढ़ी हुई शिपिंग और समस्या वाले ऑर्डर परिदृश्यों में नेट बिक्री, परिवर्तनीय लागत, योगदान और नकद समय की गणना करें।',
    },
    directAnswer: {
      en: 'To calculate the cost of an online order, start with net sales and subtract the product, packaging, shipping, channel, payment, expected return-loss and customer-acquisition costs. The amount left is contribution towards fixed business expenses and profit. Separately track when money is paid out and when customer receipts become available.',
      hi: 'ऑनलाइन ऑर्डर की लागत निकालने के लिए नेट बिक्री में से उत्पाद, पैकेजिंग, शिपिंग, चैनल, भुगतान, अनुमानित रिटर्न हानि और ग्राहक-प्राप्ति लागत घटाएं। शेष राशि निश्चित खर्च और लाभ के लिए योगदान होती है। भुगतान निकलने और बैंक में पैसा आने का समय अलग से ट्रैक करें।',
    },
    summary: {
      en: 'Step-by-step order unit economics with ₹500 net sale example, ₹60 vs ₹90 shipping sensitivity, and interactive cost worksheet integration.',
      hi: '₹500 नेट बिक्री उदाहरण, ₹60 बनाम ₹90 शिपिंग संवेदनशीलता और इंटरैक्टिव लागत वर्कशीट के साथ चरणबद्ध ऑर्डर अर्थशास्त्र।',
    },
    keyTakeaways: {
      en: [
        'Start from net sales (after discounts), not MRP or list price.',
        'Include expected return-loss allowance alongside product, packaging, shipping, and payment/channel fees.',
        'A ₹30 shipping increase (₹60 to ₹90) cuts ₹50 post-acquisition contribution down to ₹20.',
        'Contribution is not automatic net profit, and accounting profit does not equal cash in hand today.',
      ],
      hi: [
        'MRP के बजाय छूट के बाद की नेट बिक्री से गणना शुरू करें।',
        'उत्पाद, पैकेजिंग, शिपिंग और शुल्क के साथ अनुमानित रिटर्न हानि का प्रावधान जोड़ें।',
        'शिपिंग ₹60 से ₹90 होने पर ₹50 का योगदान घटकर ₹20 रह जाता है।',
        'योगदान अपने आप शुद्ध लाभ नहीं होता, और खाता लाभ तुरंत उपलब्ध नकदी नहीं होता।',
      ],
    },
    topicCluster: 'business-foundations',
    topicClusterLabel: { en: 'Business Foundations', hi: 'बिज़नेस फ़ाउंडेशन' },
    priority: 'P1',
    intendedReader: {
      en: 'New online sellers pricing their first physical product before listing.',
      hi: 'लिस्टिंग से पहले अपने पहले उत्पाद की कीमत तय कर रहे नए विक्रेता।',
    },
    searchIntent: {
      en: 'How-to unit economics calculation for Indian ecommerce orders.',
      hi: 'भारतीय ई-कॉमर्स ऑर्डर के लिए प्रति यूनिट लागत गणना मार्गदर्शन।',
    },
    courseMappings: ['C01-L04', 'C10-L02'],
    relatedArticleIds: ['B01', 'B06', 'B19'],
    primaryCta: {
      label: {
        en: 'Use the interactive Order Cost Calculator and review the webinar',
        hi: 'इंटरैक्टिव ऑर्डर लागत कैलकुलेटर उपयोग करें और वर्कशॉप देखें',
      },
      path: '/resources',
    },
    sections: [
      {
        id: 'net-sales-vs-variable',
        heading: {
          en: 'Which cost lines belong in a single-order calculation?',
          hi: 'एकल ऑर्डर गणना में कौन-कौन सी लागतें आती हैं?',
        },
        paragraphs: {
          en: [
            'Always start with net sales—the actual amount payable after product discounts, excluding taxes collected separately if applicable. Also keep margin and markup separate: on a ₹500 net sale with ₹400 cost, the ₹100 difference equals a 20% margin on selling price (₹100 ÷ ₹500), whereas it is a 25% markup on cost (₹100 ÷ ₹400). Next, subtract product cost per usable unit (including freight paid to bring stock to you and any damaged pieces you cannot sell).',
            'Add packaging materials, outbound shipping, marketplace or payment gateway fees, expected return losses averaged across orders, and customer acquisition spend if paid ads or promotions brought the order. Avoid double-counting refunds or labour already built into production cost.',
          ],
          hi: [
            'हमेशा नेट बिक्री से शुरुआत करें—और मार्जिन व मार्कअप को अलग रखें: ₹500 बिक्री मूल्य और ₹400 लागत पर ₹100 का अंतर बिक्री मूल्य पर 20% मार्जिन है, लेकिन लागत पर 25% मार्कअप है। इसके बाद प्रति उपयोगी पीस उत्पाद लागत (आप तक पहुंचने का भाड़ा सहित), पैकेजिंग, शिपिंग, मार्केटप्लेस या पेमेंट गेटवे शुल्क, औसत रिटर्न हानि और ग्राहक-प्राप्ति लागत घटाएं।',
            'रिफंड, शुल्क या श्रम को दो बार गिनने से बचें—यदि उत्पादन लागत में श्रम शामिल है तो उसे अलग से दोबारा न घटाएं।',
          ],
        },
      },
      {
        id: 'sensitivity-and-cash',
        heading: {
          en: 'Why does shipping sensitivity, multi-order fixed costs, and cash timing matter?',
          hi: 'शिपिंग बदलाव, निश्चित खर्च और नकद समय अलग क्यों हैं?',
        },
        paragraphs: {
          en: [
            'In the base pouch example: ₹500 − ₹200 − ₹20 − ₹60 − ₹50 − ₹20 leaves ₹150 contribution before acquisition, and ₹50 after a ₹100 acquisition cost. If shipping climbs from ₹60 to ₹90 due to weight-slab rounding or volumetric packaging, contribution after acquisition drops from ₹50 to ₹20.',
            'Across a full month, total contribution must also pay fixed overheads: for instance, 20 orders earning ₹150 contribution each generate ₹3,000 total contribution; after subtracting ₹1,000 in fixed monthly software, phone, and workspace costs, ₹2,000 remains. Furthermore, you pay suppliers and packaging upfront while marketplace settlements arrive days or weeks later.',
          ],
          hi: [
            'आधार उदाहरण में ₹500 में से लागतें घटाकर ₹150 (और ₹100 प्रचार लागत के बाद ₹50) बचते हैं। यदि वजन स्लैब के कारण शिपिंग ₹60 से ₹90 हो जाए, तो यह शेष ₹20 रह जाता है।',
            'पूरे महीने में इसी योगदान से निश्चित खर्च भी चुकाने होते हैं: जैसे ₹150 प्रति ऑर्डर के 20 ऑर्डर = ₹3,000 कुल योगदान; ₹1,000 निश्चित खर्च घटाने पर ₹2,000 बचते हैं। साथ ही आपूर्तिकर्ता भुगतान पहले और सेटलमेंट बाद में होता है।',
          ],
        },
        extractableStatement: {
          en: 'Contribution measures how much one order adds toward fixed expenses and profit—not guaranteed net profit or immediate bank cash.',
          hi: 'योगदान यह दर्शाता है कि एक ऑर्डर निश्चित खर्च और लाभ के लिए कितना जोड़ता है—यह स्वतः शुद्ध लाभ या तुरंत उपलब्ध नकद नहीं है।',
        },
      },
    ],
    comparisonTable: {
      caption: {
        en: 'Base vs Higher Shipping vs Problem Order Scenarios (Fictional Figures)',
        hi: 'सामान्य बनाम बढ़ी शिपिंग बनाम समस्या ऑर्डर परिदृश्य (काल्पनिक आंकड़े)',
      },
      headers: {
        en: ['Line Item', 'Base Order', 'Higher Shipping (₹90)', 'Problem / Return Order'],
        hi: ['मद', 'सामान्य ऑर्डर', 'बढ़ी शिपिंग (₹90)', 'समस्या / रिटर्न ऑर्डर'],
      },
      rows: {
        en: [
          ['Net Sales', '₹500', '₹500', '₹500 (refunded / lost margin)'],
          ['Product + Packaging', '₹220', '₹220', '₹220 (if damaged/unresalable)'],
          ['Outbound + Return Shipping', '₹60', '₹90', '₹120 (two-way logistics)'],
          ['Channel / Payment Fees', '₹50', '₹50', '₹30 (non-refundable portion)'],
          ['Return Loss Allowance', '₹20', '₹20', 'Included in actual loss above'],
          ['Acquisition Cost', '₹100', '₹100', '₹100'],
          ['Result After Acquisition', '+₹50', '+₹20', 'Negative cash impact'],
        ],
        hi: [
          ['नेट बिक्री', '₹500', '₹500', '₹500 (रिफंड / हानि)'],
          ['उत्पाद + पैकेजिंग', '₹220', '₹220', '₹220 (यदि पुनः बिक्री योग्य न हो)'],
          ['आउटबाउंड + रिटर्न शिपिंग', '₹60', '₹90', '₹120 (दोनों ओर का भाड़ा)'],
          ['चैनल / भुगतान शुल्क', '₹50', '₹50', '₹30 (अपरिवर्तनीय हिस्सा)'],
          ['रिटर्न हानि प्रावधान', '₹20', '₹20', 'वास्तविक हानि में शामिल'],
          ['ग्राहक प्राप्ति लागत', '₹100', '₹100', '₹100'],
          ['प्राप्ति के बाद परिणाम', '+₹50', '+₹20', 'नकारात्मक नकद प्रभाव'],
        ],
      },
    },
    worksheetSummary: {
      title: {
        en: 'Order Cost & Cash Timing Worksheet (17 Fields)',
        hi: 'ऑर्डर लागत व नकद समय वर्कशीट (17 फ़ील्ड)',
      },
      fields: {
        en: [
          'Listed selling price',
          'Discounts / coupon allowance',
          'Net sales per order',
          'Landed product cost per usable unit',
          'Packaging & insert cost',
          'Outbound courier / weight-slab shipping',
          'Marketplace commission / channel fee',
          'Payment gateway fee & tax on fees',
          'Expected return / RTO loss allowance',
          'Contribution before acquisition',
          'Customer acquisition spend per order',
          'Contribution after acquisition',
          'Expected monthly order volume',
          'Monthly fixed business overheads',
          'Estimated monthly result after fixed costs',
          'Cash-out timing (supplier & packaging)',
          'Cash-in settlement lag (channel / PG cycle)',
        ],
        hi: [
          'सूचीबद्ध बिक्री मूल्य',
          'छूट / कूपन राशि',
          'प्रति ऑर्डर नेट बिक्री',
          'प्रति उपयोगी यूनिट लैंडेड उत्पाद लागत',
          'पैकेजिंग व इंसर्ट लागत',
          'आउटबाउंड कूरियर / वजन-स्लैब शिपिंग',
          'मार्केटप्लेस कमीशन / चैनल शुल्क',
          'पेमेंट गेटवे शुल्क व कर',
          'अनुमानित रिटर्न / RTO हानि प्रावधान',
          'प्राप्ति लागत से पहले योगदान',
          'प्रति ऑर्डर ग्राहक प्राप्ति खर्च',
          'प्राप्ति लागत के बाद योगदान',
          'अनुमानित मासिक ऑर्डर संख्या',
          'मासिक निश्चित व्यवसाय खर्च',
          'निश्चित खर्च के बाद मासिक परिणाम अनुमान',
          'नकद निकासी समय (आपूर्तिकर्ता व पैकेजिंग)',
          'बैंक सेटलमेंट समय (चैनल / पेमेंट गेटवे चक्र)',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'Are illustrative fees like ₹50 equal to real Meesho or Amazon fees?',
          hi: 'क्या ₹50 जैसे उदाहरण शुल्क वास्तविक Meesho या Amazon शुल्क के बराबर हैं?',
        },
        answer: {
          en: 'No. Every marketplace category, weight slab, and payment mode has its own live fee schedule. Replace every illustrative assumption with live rate-card figures before pricing.',
          hi: 'नहीं। प्रत्येक श्रेणी, वजन और भुगतान तरीके का शुल्क अलग होता है। कीमत तय करने से पहले लाइव शुल्क तालिका से जांच करें।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Bonnza Order Cost Calculator Tool',
        url: 'https://bonnza.marketingtusk.com/en/resources',
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
      en: 'Online Selling Costs: Calculate Contribution per Order',
      hi: 'ऑनलाइन बेचने की लागत: प्रति ऑर्डर योगदान कैसे निकालें | Bonnza',
    },
    metaDescription: {
      en: 'Calculate net sales, shipping sensitivity, return allowances, and contribution per order before pricing your first online product.',
      hi: 'नेट बिक्री, शिपिंग बदलाव, रिटर्न प्रावधान और प्रति ऑर्डर योगदान की गणना सीखें।',
    },
    canonicalPath: '/en/blog/online-selling-cost-calculation',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 6,
  },
  {
    id: 'B03',
    slug: 'choose-first-online-selling-channel',
    hiSlug: 'choose-first-online-selling-channel',
    title: {
      en: 'Marketplace, WhatsApp or your own website: where should you start?',
      hi: 'मार्केटप्लेस, WhatsApp या अपनी वेबसाइट: शुरुआत कहाँ से करें?',
    },
    shortDescription: {
      en: 'Evaluate marketplaces, WhatsApp enquiries, and owned websites across buyer access, eligibility, order economics, and weekly hours.',
      hi: 'खरीदार पहुंच, पात्रता, ऑर्डर अर्थशास्त्र और साप्ताहिक समय के आधार पर मार्केटप्लेस, WhatsApp और अपनी वेबसाइट की तुलना करें।',
    },
    directAnswer: {
      en: 'Choose your first selling channel by checking four things: where your likely buyers shop, whether your product and seller role fit the channel, what each order will cost, and whether you can fulfil it reliably. A marketplace, WhatsApp conversation and independent website solve different problems. Start with the route you can test and operate well.',
      hi: 'पहला बिक्री चैनल चार बातों पर चुनें: आपके संभावित खरीदार कहाँ खरीदते हैं, आपका उत्पाद व भूमिका उस चैनल के योग्य है या नहीं, प्रति ऑर्डर लागत क्या है और क्या आप नियमित पूर्ति कर सकते हैं। मार्केटप्लेस, WhatsApp और वेबसाइट अलग समस्याएं हल करते हैं।',
    },
    summary: {
      en: 'A practical comparison using a fictional pouch seller with 10 inspected units, no audience, and 3 weekly hours.',
      hi: '10 सैंपल यूनिट, बिना पूर्व दर्शक और सप्ताह में 3 घंटे वाले काल्पनिक विक्रेता के उदाहरण के साथ चैनल निर्णय ढांचा।',
    },
    keyTakeaways: {
      en: [
        'Marketplaces offer existing shopper search, but never guarantee impressions or automatic sales.',
        'WhatsApp suits direct pilot validation, yet requires an actual source of enquiries.',
        'An independent website gives brand control, yet creates zero organic visitors on day one.',
        'Start with one channel matched to ready/uncertain/blocked checks and your weekly operating hours.',
      ],
      hi: [
        'मार्केटप्लेस में खरीदार आते हैं, पर वहां स्वतः दृश्यता या बिक्री की गारंटी नहीं होती।',
        'WhatsApp पायलट परीक्षण के लिए अच्छा है, पर पूछताछ का वास्तविक स्रोत होना जरूरी है।',
        'अपनी वेबसाइट ब्रांड नियंत्रण देती है, पर पहले दिन स्वतः ट्रैफ़िक नहीं लाती।',
        'तैयार/अनिश्चित/अवरुद्ध जांच और उपलब्ध घंटों के आधार पर एक चैनल चुनें।',
      ],
    },
    topicCluster: 'business-foundations',
    topicClusterLabel: { en: 'Business Foundations', hi: 'बिज़नेस फ़ाउंडेशन' },
    priority: 'P1',
    intendedReader: {
      en: 'First-time sellers deciding between Meesho/Amazon/Etsy, WhatsApp, and Shopify/Wix.',
      hi: 'Meesho/Amazon/Etsy, WhatsApp और Shopify/Wix में से पहला माध्यम चुन रहे नए विक्रेता।',
    },
    searchIntent: {
      en: 'Balanced comparison of first online selling channels in India.',
      hi: 'भारत में पहले ऑनलाइन बिक्री चैनल की संतुलित तुलना।',
    },
    courseMappings: ['C01-L03'],
    relatedArticleIds: ['B01', 'B08', 'B13'],
    primaryCta: {
      label: {
        en: 'Build your first-channel plan in the workshop',
        hi: 'लाइव वर्कशॉप में अपने पहले चैनल की योजना बनाएं',
      },
      path: '/webinars/first-online-business',
    },
    sections: [
      {
        id: 'four-channel-criteria',
        heading: {
          en: 'What four criteria separate a workable channel from a costly distraction?',
          hi: 'वे कौन से चार मानदंड हैं जो सही चैनल और भटकाव में अंतर करते हैं?',
        },
        paragraphs: {
          en: [
            'First, buyer access: where do people already look for an item like yours, or how will you bring them into a conversation? Second, product and seller eligibility: do you hold required tax registrations, brand/GTIN rules, or craft-origin rules?',
            'Third, order economics: check fees, shipping, and fixed platform subscriptions against realistic weekly volume. Fourth, operational capacity: consider pickup windows, enquiry reply speed, and return handling.',
          ],
          hi: [
            'पहला, खरीदार पहुंच: लोग आपका उत्पाद कहाँ खोजते हैं? दूसरा, पात्रता: क्या आपके पास आवश्यक कर पंजीकरण, ब्रांड या शिल्प नियम पूरे हैं?',
            'तीसरा, ऑर्डर अर्थशास्त्र: शुल्क और मासिक सदस्यता को संभावित ऑर्डर संख्या के विरुद्ध तौलें। चौथा, कार्यक्षमता: पिकअप, उत्तर देने और रिटर्न के लिए आपके पास कितना समय है?',
          ],
        },
      },
      {
        id: 'fictional-three-hour-case',
        heading: {
          en: 'How does this apply to a seller with 10 pouches, no audience, and 3 hours a week?',
          hi: '10 पाउच, शून्य दर्शक और सप्ताह में 3 घंटे वाले विक्रेता पर यह कैसे लागू होता है?',
        },
        paragraphs: {
          en: [
            'Suppose our fictional cotton-pouch seller holds ten inspected units, has no established social audience, and can spare three hours a week. Building an independent Shopify or Wix store immediately adds recurring subscription costs with nobody visiting the link yet.',
            'Conversely, opening a marketplace account without checking GSTIN/state rules or packaging costs can stall onboarding. With three weekly hours, the seller should mark each channel criterion as Ready, Uncertain, or Blocked before investing more cash.',
          ],
          hi: [
            'मान लें एक विक्रेता के पास 10 जांचे हुए पाउच हैं, कोई पुराना दर्शक वर्ग नहीं है और सप्ताह में केवल 3 घंटे हैं। तुरंत वेबसाइट बनाने पर मासिक खर्च शुरू हो जाएगा जबकि ग्राहक नहीं होंगे।',
            'दूसरी ओर, बिना पात्रता जांचे मार्केटप्लेस खोलना भी अटक सकता है। इस स्थिति में हर चैनल को Ready, Uncertain और Blocked में जांचकर ही अगला कदम उठाना चाहिए।',
          ],
        },
      },
    ],
    comparisonTable: {
      caption: {
        en: 'Channel Fit Snapshot (10 Inspected Units, 3 Weekly Hours Example)',
        hi: 'चैनल उपयुक्तता तुलना (10 यूनिट, 3 साप्ताहिक घंटे उदाहरण)',
      },
      headers: {
        en: ['Criterion', 'Marketplace', 'WhatsApp / Social', 'Own Website'],
        hi: ['मानदंड', 'मार्केटप्लेस', 'WhatsApp / सोशल', 'अपनी वेबसाइट'],
      },
      rows: {
        en: [
          ['Buyer discovery', 'Existing search traffic (no guaranteed views)', 'Requires outreach / local or social posts', 'Requires external traffic you bring'],
          ['Eligibility hurdles', 'Tax, category & listing rules apply', 'Low barrier; payment verification needed', 'Domain, gateway KYC & policies needed'],
          ['Fixed recurring fee', 'Typically low / none upfront', 'None on basic catalogue', 'Monthly subscription + domain'],
          ['3-hour/week fit', 'Watch strict dispatch SLA windows', 'Flexible pilot if enquiries are batched', 'Setup + traffic workload can stretch 3 hrs'],
        ],
        hi: [
          ['खरीदार खोज', 'मौजूदा खोज ट्रैफ़िक (व्यू की गारंटी नहीं)', 'पोस्ट या स्थानीय संपर्क आवश्यक', 'बाहरी ट्रैफ़िक स्वयं लाना होता है'],
          ['पात्रता शर्तें', 'कर, श्रेणी व लिस्टिंग नियम लागू', 'कम बाधा; बैंक भुगतान पुष्टि आवश्यक', 'डोमेन, पेमेंट KYC व नीति पृष्ठ आवश्यक'],
          ['मासिक निश्चित शुल्क', 'प्रायः शून्य/कम शुरुआती शुल्क', 'बेसिक कैटलॉग पर शून्य', 'मासिक सदस्यता + डोमेन शुल्क'],
          ['3 घंटे/सप्ताह फिट', 'सख्त डिस्पैच समयसीमा का ध्यान रखें', 'पूछताछ बैच करके लचीला पायलट संभव', 'सेटअप व ट्रैफ़िक 3 घंटे में भारी पड़ सकता है'],
        ],
      },
    },
    worksheetSummary: {
      title: {
        en: 'First-Channel Scoring Worksheet (Ready / Uncertain / Blocked)',
        hi: 'पहला चैनल मूल्यांकन वर्कशीट (तैयार / अनिश्चित / अवरुद्ध)',
      },
      fields: {
        en: [
          'Candidate channels compared (Marketplace, WhatsApp, Own Website)',
          'Buyer discovery access status (Ready / Uncertain / Blocked)',
          'Tax, GSTIN/Enrolment & category eligibility status',
          'Estimated contribution per order after channel fees',
          'Weekly operating hours fit (e.g., 3 hrs/week SLA realism)',
          'Primary channel chosen for next 14-day pilot',
          'Open blocker or evidence gap to resolve before launch',
        ],
        hi: [
          'तुलना किए गए चैनल (मार्केटप्लेस, WhatsApp, अपनी वेबसाइट)',
          'खरीदार पहुंच स्थिति (तैयार / अनिश्चित / अवरुद्ध)',
          'कर, GSTIN/नामांकन व श्रेणी पात्रता स्थिति',
          'चैनल शुल्क के बाद प्रति ऑर्डर अनुमानित योगदान',
          'साप्ताहिक कार्य समय उपयुक्तता (जैसे 3 घंटे/सप्ताह)',
          'अगले 14-दिन के पायलट हेतु चुना गया मुख्य चैनल',
          'लॉन्च से पहले हल की जाने वाली प्रमुख बाधा',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'Does opening an online website bring Google traffic automatically?',
          hi: 'क्या वेबसाइट खोलने से Google से स्वतः ट्रैफ़िक आने लगता है?',
        },
        answer: {
          en: 'No. A new storefront starts with zero visitors unless you actively connect search, content, social posts, or paid campaigns.',
          hi: 'नहीं। नई वेबसाइट पर जब तक आप खोज, सामग्री, सोशल मीडिया या प्रचार न जोड़ें, तब तक विज़िटर नहीं आते।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Bonnza First-Channel Decision Worksheet',
        url: 'https://bonnza.marketingtusk.com/en/resources',
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
      en: 'Where Should You Start Selling Online? | Bonnza',
      hi: 'ऑनलाइन बिक्री की शुरुआत कहाँ से करें? | Bonnza',
    },
    metaDescription: {
      en: 'Compare marketplaces, WhatsApp selling, and independent websites on buyer access, eligibility, order economics, and operational fit.',
      hi: 'खरीदार पहुंच, पात्रता, लागत और कार्यक्षमता के आधार पर पहला बिक्री चैनल चुनने का मार्गदर्शन।',
    },
    canonicalPath: '/en/blog/choose-first-online-selling-channel',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 5,
  },
  {
    id: 'B04',
    slug: 'compare-suppliers-first-stock-order',
    hiSlug: 'compare-suppliers-first-stock-order',
    title: {
      en: 'How to compare suppliers before your first stock order',
      hi: 'अपने पहले स्टॉक ऑर्डर से पहले आपूर्तिकर्ताओं की तुलना कैसे करें',
    },
    shortDescription: {
      en: 'Evaluate suppliers on identical specifications, landed cost per usable unit, sample consistency, and written problem resolution.',
      hi: 'समान विनिर्देश, प्रति उपयोगी पीस कुल लागत, सैंपल गुणवत्ता और लिखित समस्या समाधान शर्तों पर आपूर्तिकर्ताओं की तुलना करें।',
    },
    directAnswer: {
      en: 'Compare suppliers on an identical product specification, the cost of getting usable stock to you, sample quality, delivery reliability and written problem-resolution terms. The lowest quoted unit price is only one input. Before your first stock order, make sure you know exactly what will arrive and what happens if it is wrong.',
      hi: 'आपूर्तिकर्ताओं की तुलना एक समान उत्पाद विनिर्देश, आप तक उपयोगी स्टॉक पहुंचने की कुल लागत, सैंपल गुणवत्ता, डिलीवरी विश्वसनीयता और लिखित समस्या-समाधान शर्तों पर करें। सबसे कम प्रति-पीस दर केवल एक पहलू है।',
    },
    summary: {
      en: 'Landed-cost and defect-adjusted supplier comparison showing why ₹115 delivered beats ₹100 + ₹200 freight and how one defective unit lifts unit cost to ₹133.33.',
      hi: 'लैंडेड लागत और खराब पीस समायोजन तुलना, जो दिखाती है कि ₹115 डिलीवर दर ₹100 + ₹200 भाड़े से सस्ती क्यों है और 1 खराब पीस से लागत ₹133.33 कैसे हो जाती है।',
    },
    keyTakeaways: {
      en: [
        'Compare total landed cost per usable unit, not bare ex-factory unit quotes.',
        'One unusable unit in a 10-piece ₹1,200 batch raises effective cost from ₹120 to ~₹133.33.',
        'Confirm payment milestones, return freight rules, lead times, and photo/brand usage rights in writing.',
      ],
      hi: [
        'केवल प्रति पीस दर नहीं, बल्कि उपयोगी पीस की कुल डिलीवरी लागत की तुलना करें।',
        '₹1,200 के 10-पीस बैच में 1 खराब पीस होने पर प्रभावी लागत ₹120 से बढ़कर ~₹133.33 हो जाती है।',
        'भुगतान चरण, वापसी भाड़ा, डिलीवरी समय और फोटो/ब्रांड उपयोग अधिकार लिखित में तय करें।',
      ],
    },
    topicCluster: 'resell',
    topicClusterLabel: { en: 'Resell', hi: 'रीसेल' },
    priority: 'P1',
    intendedReader: {
      en: 'Aspiring resellers gathering quotes from wholesalers or manufacturers.',
      hi: 'थोक विक्रेताओं या निर्माताओं से कोटेशन ले रहे नए रीसेलर।',
    },
    searchIntent: {
      en: 'Practical supplier comparison checklist and landed cost calculation.',
      hi: 'व्यावहारिक आपूर्तिकर्ता तुलना चेकलिस्ट और लैंडेड लागत गणना।',
    },
    courseMappings: ['C02-L01', 'C02-L02'],
    relatedArticleIds: ['B02', 'B05', 'B06'],
    primaryCta: {
      label: {
        en: 'Explore Resell: Source to Sell and the supplier worksheet',
        hi: 'रीसेल: सोर्स टू सेल और आपूर्तिकर्ता वर्कशीट देखें',
      },
      path: '/paths/resell',
    },
    sections: [
      {
        id: 'landed-usable-cost',
        heading: {
          en: 'Why can a ₹100 quote cost more than a ₹115 quote?',
          hi: '₹100 का कोटेशन ₹115 के कोटेशन से महंगा कैसे पड़ सकता है?',
        },
        paragraphs: {
          en: [
            'Suppose Supplier A quotes 10 cotton travel pouches at ₹100 each plus ₹200 freight. Total cash out is ₹1,200, or ₹120 per unit. Supplier B quotes ₹115 delivered for 10 units—₹1,150 total. On delivered cost alone, Supplier B is ₹50 cheaper.',
            'Now factor defect risk: if only 9 units from Supplier A arrive usable and the supplier offers no replacement or credit, your effective cost per sellable pouch jumps to ₹1,200 ÷ 9 = ₹133.33.',
          ],
          hi: [
            'मान लें आपूर्तिकर्ता A 10 कॉटन पाउच ₹100 प्रति पीस और ₹200 भाड़े पर देता है—कुल ₹1,200, यानी ₹120 प्रति पीस। आपूर्तिकर्ता B ₹115 डिलीवर पर 10 पीस ₹1,150 में देता है।',
            'यदि आपूर्तिकर्ता A के केवल 9 पीस बेचने योग्य निकलते हैं और कोई बदलाव नहीं मिलता, तो उपयोगी पीस की वास्तविक लागत ₹1,200 ÷ 9 = लगभग ₹133.33 हो जाती है।',
          ],
        },
      },
      {
        id: 'written-terms-and-rights',
        heading: {
          en: 'What terms and rights must be verified before sending payment?',
          hi: 'भुगतान भेजने से पहले किन शर्तों और अधिकारों की पुष्टि करनी चाहिए?',
        },
        paragraphs: {
          en: [
            'Request quotes against an identical written specification (fabric GSM, dimensions, zip grade, stitching, individual poly/kraft packing). Verify sample turnaround vs bulk lead time, advance vs dispatch payment stages, and who pays freight on defective replacements.',
            'Do not use supplier catalogue photographs or branded packaging without explicit written permission and assurance that you have rights to resell the item.',
          ],
          hi: [
            'समान लिखित विनिर्देश (कपड़ा GSM, माप, ज़िप गुणवत्ता, सिलाई, पैकिंग) पर ही कोटेशन लें। सैंपल बनाम थोक समय, भुगतान चरण और खराब पीस के वापसी भाड़े की जिम्मेदारी लिखित में तय करें।',
            'लिखित अनुमति के बिना आपूर्तिकर्ता की फोटो या किसी ब्रांड नाम का उपयोग न करें।',
          ],
        },
      },
    ],
    comparisonTable: {
      caption: {
        en: 'Side-by-Side Supplier Comparison (10 Cotton Pouches Example)',
        hi: 'तुलनात्मक आपूर्तिकर्ता तालिका (10 कॉटन पाउच उदाहरण)',
      },
      headers: {
        en: ['Metric', 'Supplier A', 'Supplier B'],
        hi: ['मानक', 'आपूर्तिकर्ता A', 'आपूर्तिकर्ता B'],
      },
      rows: {
        en: [
          ['Quoted unit price', '₹100', '₹115 (delivered)'],
          ['Freight for 10 units', '₹200', '₹0 (included)'],
          ['Total batch outlay', '₹1,200', '₹1,150'],
          ['Delivered cost per unit (all 10 good)', '₹120.00', '₹115.00'],
          ['Effective cost if 9 usable & no remedy', '~₹133.33', 'Check written defect policy'],
        ],
        hi: [
          ['उद्धृत प्रति पीस दर', '₹100', '₹115 (डिलीवर सहित)'],
          ['10 पीस का भाड़ा', '₹200', '₹0 (शामिल)'],
          ['कुल बैच खर्च', '₹1,200', '₹1,150'],
          ['सभी 10 सही होने पर प्रति पीस', '₹120.00', '₹115.00'],
          ['9 सही और कोई समाधान न होने पर', '~₹133.33', 'लिखित दोष नीति जांचें'],
        ],
      },
    },
    worksheetSummary: {
      title: {
        en: 'Supplier Comparison Record (16 Fields)',
        hi: 'आपूर्तिकर्ता तुलना रिकॉर्ड (16 फ़ील्ड)',
      },
      fields: {
        en: [
          'Supplier business name & city',
          'Product name & identical spec version',
          'Quoted ex-works unit price',
          'Inbound freight & packing charge',
          'Delivered cost per unit',
          'Expected defect / unusable unit adjustment',
          'Effective cost per sellable unit',
          'Minimum order quantity (MOQ)',
          'Payment milestones (advance vs dispatch)',
          'Sample price & turnaround days',
          'Bulk production & dispatch lead time',
          'Written defective replacement & return freight policy',
          'Resale rights / brand authorization confirmation',
          'Product photograph & description usage permission',
          'Supplier verification (GST / invoice / bank match)',
          'Shortlist status & next step',
        ],
        hi: [
          'आपूर्तिकर्ता व्यवसाय नाम व शहर',
          'उत्पाद नाम व समान विनिर्देश संस्करण',
          'उद्धृत प्रति पीस आधार दर',
          'इनबाउंड भाड़ा व पैकेजिंग शुल्क',
          'डिलीवरी सहित प्रति पीस लागत',
          'संभावित खराब पीस समायोजन',
          'प्रति बेचने योग्य पीस प्रभावी लागत',
          'न्यूनतम ऑर्डर मात्रा (MOQ)',
          'भुगतान चरण (अग्रिम बनाम डिस्पैच)',
          'सैंपल मूल्य व प्राप्ति दिन',
          'थोक उत्पादन व डिस्पैच समय',
          'खराब पीस बदलने व वापसी भाड़े की लिखित नीति',
          'रीसेल अधिकार / ब्रांड अनुमति पुष्टि',
          'उत्पाद फोटो व विवरण उपयोग अनुमति',
          'आपूर्तिकर्ता सत्यापन (GST / बिल / बैंक मिलान)',
          'शॉर्टलिस्ट स्थिति व अगला कदम',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'Can I skip ordering a physical sample if the supplier sends clear photos?',
          hi: 'यदि आपूर्तिकर्ता स्पष्ट फोटो भेजे तो क्या सैंपल मंगवाना टाला जा सकता है?',
        },
        answer: {
          en: 'No. Photos rarely reveal zip smoothness, seam strength, fabric weight, or true colour accuracy under indoor light.',
          hi: 'नहीं। फोटो से ज़िप की मजबूती, सिलाई, कपड़े का वजन या असली रंग का सही पता नहीं चलता।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Bonnza Resell: Source to Sell Curriculum',
        url: 'https://bonnza.marketingtusk.com/en/courses/resell-source-to-sell',
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
      en: 'How to Compare Suppliers Before Buying Stock | Bonnza',
      hi: 'स्टॉक खरीदने से पहले आपूर्तिकर्ताओं की तुलना कैसे करें | Bonnza',
    },
    metaDescription: {
      en: 'Compare suppliers on landed usable unit cost, sample quality, lead time, and defect remedies before buying inventory.',
      hi: 'स्टॉक खरीदने से पहले लैंडेड लागत, सैंपल गुणवत्ता और दोष समाधान पर आपूर्तिकर्ताओं की तुलना सीखें।',
    },
    canonicalPath: '/en/blog/compare-suppliers-first-stock-order',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 6,
  },
  {
    id: 'B05',
    slug: 'product-sample-inspection-checklist',
    hiSlug: 'product-sample-inspection-checklist',
    title: {
      en: 'A product-sample inspection checklist for first-time resellers',
      hi: 'पहली बार रीसेल करने वालों के लिए सैंपल निरीक्षण चेकलिस्ट',
    },
    shortDescription: {
      en: 'Inspect dimensions, zips, seams, finish, weight, and contents against a written spec and log pass, fail, or clarification points.',
      hi: 'लिखित विनिर्देश के विरुद्ध माप, ज़िप, सिलाई, फिनिश, वजन और पैक सामग्री की जांच करें और पास/फेल/स्पष्टीकरण लॉग बनाएं।',
    },
    directAnswer: {
      en: 'Inspect a product sample against a written specification before approving your first stock order. Check dimensions, materials, normal function, finish and packaging, then record pass, fail or needs clarification for each point. A sample inspection helps you make a purchasing decision; it does not certify the safety or compliance of a regulated product.',
      hi: 'पहला स्टॉक ऑर्डर मंजूर करने से पहले लिखित विनिर्देश के विरुद्ध सैंपल की जांच करें। माप, सामग्री, सामान्य कार्यप्रणाली, फिनिश और पैकेजिंग परखें तथा प्रत्येक बिंदु पर पास, फेल या स्पष्टीकरण दर्ज करें। यह क्रय निर्णय में मदद करता है, न कि किसी नियामक सुरक्षा प्रमाणन का स्थान लेता है।',
    },
    summary: {
      en: 'Cotton-pouch inspection checklist distinguishing defects, buyer preferences, and unresolved specs, with batch consistency caveat.',
      hi: 'कॉटन पाउच निरीक्षण लॉग जिसमें दोष, व्यक्तिगत पसंद और अस्पष्ट विनिर्देश के अंतर को समझाया गया है।',
    },
    keyTakeaways: {
      en: [
        'Test ordinary repeated actions (e.g., zip catches at the left corner in 3 of 5 closing attempts).',
        'Separate true defects from personal preference and missing specification details.',
        'Record sample ID, spec version, photo references, and supplier response—and note that one good sample does not guarantee batch consistency.',
      ],
      hi: [
        'सामान्य दोहराव वाली क्रियाएं जांचें (जैसे 5 में से 3 बार बाएं कोने पर ज़िप अटकना)।',
        'वास्तविक दोष, व्यक्तिगत पसंद और अधूरे विनिर्देश के बीच अंतर करें।',
        'सैंपल ID, फोटो संदर्भ और आपूर्तिकर्ता जवाब दर्ज करें; एक अच्छा सैंपल पूरे बैच की गारंटी नहीं देता।',
      ],
    },
    topicCluster: 'resell',
    topicClusterLabel: { en: 'Resell', hi: 'रीसेल' },
    priority: 'P2',
    intendedReader: {
      en: 'Resellers evaluating physical samples prior to placing initial inventory orders.',
      hi: 'पहला इन्वेंटरी ऑर्डर देने से पहले सैंपल की जांच कर रहे रीसेलर।',
    },
    searchIntent: {
      en: 'Structured quality-inspection checklist for physical ecommerce samples.',
      hi: 'भौतिक ई-कॉमर्स सैंपल के लिए गुणवत्ता निरीक्षण चेकलिस्ट।',
    },
    courseMappings: ['C02-L02'],
    relatedArticleIds: ['B04', 'B06', 'B20'],
    primaryCta: {
      label: {
        en: 'Review the Resell practical assignments',
        hi: 'रीसेल व्यावहारिक अभ्यास देखें',
      },
      path: '/courses/resell-source-to-sell',
    },
    sections: [
      {
        id: 'what-to-inspect',
        heading: {
          en: 'What physical checks belong in a cotton-pouch sample inspection?',
          hi: 'कॉटन पाउच सैंपल निरीक्षण में किन भौतिक बिंदुओं की जांच करें?',
        },
        paragraphs: {
          en: [
            'Check external material and lining, measured dimensions (e.g., 20cm × 14cm), zip smoothness across repeated cycles, seam stitching density, colour consistency, outer packaging, packed shipping weight, and exact contents.',
            'Write concrete observations rather than vague impressions. For example: "Zip catches at the left corner in three of five normal closing attempts" gives a supplier an actionable defect to resolve.',
          ],
          hi: [
            'बाहरी कपड़ा और अस्तर, वास्तविक माप (जैसे 20cm × 14cm), कई बार खोलने-बंद करने पर ज़िप का चलना, सिलाई की मजबूती, रंग, पैकेजिंग, पैक वजन और अंदर के सामान की जांच करें।',
            'अस्पष्ट टिप्पणी के बजाय सटीक अवलोकन लिखें, जैसे: “सामान्य रूप से बंद करने के पांच में से तीन प्रयासों में बाएं कोने पर ज़िप अटकती है।”',
          ],
        },
      },
      {
        id: 'defects-vs-preferences',
        heading: {
          en: 'How do defects differ from preferences, and what are inspection limits?',
          hi: 'दोष, पसंद और निरीक्षण सीमाओं में क्या अंतर है?',
        },
        paragraphs: {
          en: [
            'A sticking zip or frayed seam is a functional defect. Wanting a slightly warmer cream shade is a preference unless a Pantone/swatch match was agreed. Missing lining weight is an unresolved specification.',
            'Remember two crucial limits: a home inspection evaluates commercial quality, not regulatory lab safety for cosmetics, food, electricals, or children’s items; and an approved sample does not guarantee every piece in the bulk batch will match unless you inspect incoming deliveries.',
          ],
          hi: [
            'अटकती ज़िप या खुली सिलाई दोष है; बिना पूर्व निर्धारित शेड के रंग का थोड़ा अलग लगना पसंद या अपूर्ण विनिर्देश हो सकता है।',
            'ध्यान रहे कि सैंपल जांच विनियमित उत्पादों की सुरक्षा प्रमाणित नहीं करती और न ही बिना इनकमिंग जांच के पूरे थोक बैच की एकरूपता की गारंटी देती है।',
          ],
        },
      },
    ],
    comparisonTable: {
      caption: {
        en: 'Sample Inspection Log Format (Cotton Pouch Example)',
        hi: 'सैंपल निरीक्षण लॉग प्रारूप (कॉटन पाउच उदाहरण)',
      },
      headers: {
        en: ['Check Point', 'Spec v1.0 Expected', 'Actual Observation', 'Status'],
        hi: ['जांच बिंदु', 'अपेक्षित विनिर्देश v1.0', 'वास्तविक अवलोकन', 'स्थिति'],
      },
      rows: {
        en: [
          ['Dimensions', '20cm × 14cm (±0.5cm)', '20.1cm × 13.8cm', 'Pass'],
          ['Zip function', 'Smooth 5/5 cycles', 'Catches at left corner in 3/5 attempts', 'Fail'],
          ['Inner lining', 'Cotton twill', 'Poly-cotton blend', 'Needs clarification'],
          ['Packed weight', 'Under 120g with mailer', '112g on kitchen scale', 'Pass'],
        ],
        hi: [
          ['माप', '20cm × 14cm (±0.5cm)', '20.1cm × 13.8cm', 'पास'],
          ['ज़िप कार्यक्षमता', '5/5 बार सुचारू', '5 में 3 बार बाएं कोने पर अटकती है', 'फेल'],
          ['भीतरी अस्तर', 'कॉटन ट्विल', 'पॉली-कॉटन मिश्रण', 'स्पष्टीकरण आवश्यक'],
          ['पैक वजन', 'मेलर सहित 120g से कम', '112g वजन', 'पास'],
        ],
      },
    },
    worksheetSummary: {
      title: {
        en: 'Sample Inspection Observation Log (12 Fields)',
        hi: 'सैंपल निरीक्षण अवलोकन लॉग (12 फ़ील्ड)',
      },
      fields: {
        en: [
          'Sample ID & date received',
          'Supplier name & written spec version',
          'Outer material & inner lining verification',
          'Measured length × width × depth',
          'Packed weight (for shipping-slab planning)',
          'Functional cycle test (e.g., zip open/close 5×)',
          'Seam stitching, corners & hardware finish',
          'Outer packaging & included contents check',
          'Issue type (Defect / Preference / Unresolved spec)',
          'Evidence photo reference numbers',
          'Supplier response & agreed corrective action',
          'Approval verdict (Pass / Fail / Needs clarification)',
        ],
        hi: [
          'सैंपल ID व प्राप्ति तिथि',
          'आपूर्तिकर्ता नाम व लिखित विनिर्देश संस्करण',
          'बाहरी कपड़ा व भीतरी अस्तर सत्यापन',
          'मापी गई लंबाई × चौड़ाई × गहराई',
          'पैक वजन (शिपिंग स्लैब योजना हेतु)',
          'कार्यक्षमता परीक्षण (जैसे ज़िप 5 बार चलाना)',
          'सिलाई, कोने व हार्डवेयर फिनिश जांच',
          'बाहरी पैकेजिंग व पैक सामग्री मिलान',
          'समस्या श्रेणी (दोष / पसंद / अस्पष्ट विनिर्देश)',
          'प्रमाण फोटो संदर्भ संख्या',
          'आपूर्तिकर्ता उत्तर व सुधारात्मक कार्रवाई',
          'अंतिम निर्णय (पास / फेल / स्पष्टीकरण शेष)',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'Does approving a sample guarantee the bulk shipment will be identical?',
          hi: 'क्या सैंपल पास होने का अर्थ है कि थोक माल भी वैसा ही होगा?',
        },
        answer: {
          en: 'No. Always inspect incoming stock upon receipt and agree defect replacement terms in writing before paying.',
          hi: 'नहीं। स्टॉक आने पर पुनः जांच करें और भुगतान से पहले खराब माल बदलने की लिखित शर्त रखें।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Bonnza Resell Inspection Framework',
        url: 'https://bonnza.marketingtusk.com/en/courses/resell-source-to-sell',
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
      en: 'Product Sample Inspection Checklist for Resellers | Bonnza',
      hi: 'रीसेलर्स के लिए प्रोडक्ट सैंपल निरीक्षण चेकलिस्ट | Bonnza',
    },
    metaDescription: {
      en: 'Check dimensions, function, seams, packaging, and specification gaps with a reusable product-sample inspection log.',
      hi: 'पहला स्टॉक ऑर्डर देने से पहले माप, ज़िप, सिलाई और पैकेजिंग जांचने की सैंपल निरीक्षण चेकलिस्ट।',
    },
    canonicalPath: '/en/blog/product-sample-inspection-checklist',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 5,
  },
  {
    id: 'B06',
    slug: 'first-inventory-purchase-plan',
    hiSlug: 'first-inventory-purchase-plan',
    title: {
      en: 'How much stock should you buy for your first selling test?',
      hi: 'अपने पहले बिक्री परीक्षण के लिए आपको कितना स्टॉक खरीदना चाहिए?',
    },
    shortDescription: {
      en: 'Size your initial inventory below your cash ceiling after reserving money for shipping, packaging, and unexpected issues.',
      hi: 'शिपिंग, पैकेजिंग और आकस्मिक खर्चों के लिए नकदी अलग रखने के बाद ही अपने पहले स्टॉक की मात्रा तय करें।',
    },
    directAnswer: {
      en: 'Your first stock quantity should fit the cash you can commit after reserving money for fulfilment and problems, the supplier’s minimum order, and the uncertainty around demand. Calculate a maximum affordable quantity, then decide whether a smaller test would answer your business question. Affordability is a ceiling, not a reason to spend everything.',
      hi: 'आपके पहले स्टॉक की मात्रा पूर्ति व आकस्मिक समस्याओं के लिए पैसा अलग रखने के बाद बची नकदी, आपूर्तिकर्ता की न्यूनतम मात्रा और मांग की अनिश्चितता के भीतर होनी चाहिए। सामर्थ्य एक ऊपरी सीमा है, पूरा पैसा खर्च करने का कारण नहीं।',
    },
    summary: {
      en: 'Cash-capped inventory formula ((₹2,000 − ₹500 − ₹200) / ₹100 = 13 units) plus stock allocation into defective, allocated, and available units.',
      hi: 'नकद-सीमित स्टॉक सूत्र ((₹2,000 − ₹500 − ₹200) / ₹100 = 13 यूनिट) तथा खराब, आवंटित और उपलब्ध स्टॉक का वर्गीकरण।',
    },
    keyTakeaways: {
      en: [
        'Subtract cash reserve and inbound freight before dividing by unit cost: (₹2,000 − ₹500 − ₹200) ÷ ₹100 = 13 units max.',
        'Reject supplier minimums (like 20 units requiring ₹2,200 before reserve) that breach your cash ceiling.',
        'Track received units accurately: e.g., 13 received → 1 defective, 2 allocated to confirmed orders, 10 available.',
        '₹2,000 is an illustrative test example, not a universal ecommerce startup budget.',
      ],
      hi: [
        'यूनिट कीमत से भाग देने से पहले नकद रिज़र्व और ढुलाई घटाएं: (₹2,000 − ₹500 − ₹200) ÷ ₹100 = अधिकतम 13 यूनिट।',
        'बजट सीमा तोड़ने वाले न्यूनतम ऑर्डर (जैसे 20 यूनिट पर ₹2,200) से बचें।',
        'प्राप्त स्टॉक को अलग दर्ज करें: 13 प्राप्त → 1 खराब, 2 पुष्ट ऑर्डर हेतु आवंटित, 10 उपलब्ध।',
        '₹2,000 केवल एक उदाहरण है, कोई सार्वभौमिक बिज़नेस बजट नहीं।',
      ],
    },
    topicCluster: 'resell',
    topicClusterLabel: { en: 'Resell', hi: 'रीसेल' },
    priority: 'P2',
    intendedReader: {
      en: 'First-time resellers deciding initial purchase quantities and cash buffers.',
      hi: 'पहली खरीद मात्रा और नकद बफर तय कर रहे नए रीसेलर।',
    },
    searchIntent: {
      en: 'Formula for sizing initial ecommerce inventory safely.',
      hi: 'सुरक्षित शुरुआती ई-कॉमर्स इन्वेंटरी आकार तय करने का सूत्र।',
    },
    courseMappings: ['C02-L03', 'C02-L04'],
    relatedArticleIds: ['B02', 'B04', 'B19'],
    primaryCta: {
      label: {
        en: 'Build a pilot stock plan in Resell',
        hi: 'रीसेल कोर्स में पायलट स्टॉक योजना बनाएं',
      },
      path: '/courses/resell-source-to-sell',
    },
    sections: [
      {
        id: 'affordable-ceiling-formula',
        heading: {
          en: 'How do you calculate your maximum affordable stock quantity?',
          hi: 'अधिकतम खरीदने योग्य स्टॉक मात्रा की गणना कैसे करें?',
        },
        paragraphs: {
          en: [
            'Suppose a beginner sets aside ₹2,000 for a small product test (purely an illustrative example, not a universal startup budget). First reserve ₹500 for packaging, initial shipping payouts, and unforeseen problems, plus ₹200 for inbound freight. That leaves ₹1,300 for product units.',
            'At ₹100 per unit, the maximum affordable quantity is (₹2,000 − ₹500 − ₹200) ÷ ₹100 = 13 units. If a supplier insists on a 20-unit minimum order, that costs ₹2,000 + ₹200 freight = ₹2,200 before any reserve—exceeding the ceiling and leaving zero buffer for fulfilment.',
          ],
          hi: [
            'मान लें एक शुरुआती विक्रेता परीक्षण के लिए ₹2,000 तय करता है (यह केवल उदाहरण है, सार्वभौमिक बजट नहीं)। पहले पैकेजिंग/शिपिंग व आपात स्थिति के लिए ₹500 और इनबाउंड भाड़े के लिए ₹200 अलग रखें। अब ₹1,300 बचते हैं।',
            '₹100 प्रति पीस पर अधिकतम 13 यूनिट खरीदी जा सकती हैं। यदि आपूर्तिकर्ता 20 यूनिट की शर्त रखे (₹2,200 बिना रिज़र्व), तो वह आपके बजट और सुरक्षा बफर से बाहर है।',
          ],
        },
      },
      {
        id: 'stock-allocation-tracking',
        heading: {
          en: 'What happens to inventory counts once the 13 units arrive?',
          hi: '13 यूनिट प्राप्त होने के बाद स्टॉक का हिसाब कैसे रखें?',
        },
        paragraphs: {
          en: [
            'Do not list all 13 pieces online blindly. After inspection, suppose 1 unit has a torn seam (defective) and 2 units are allocated to confirmed advance orders. Only 10 units are truly available to sell.',
            'Assign clear inventory SKU codes, distinguish casual buyer interest from confirmed paid orders, note supplier reorder lead times, and plan replenishment with a concrete reorder trigger rather than running blind to zero. For example, if tested daily sales average 1 unit/day and supplier replenishment takes 5 days lead time, your basic reorder trigger is 1/day × 5-day lead time = 5 units remaining.',
          ],
          hi: [
            'आते ही सभी 13 पीस लिस्ट न करें। जांच में यदि 1 खराब निकले और 2 पुष्ट ऑर्डर में आवंटित हों, तो बेचने योग्य केवल 10 यूनिट उपलब्ध हैं।',
            'स्पष्ट SKU कोड रखें और शून्य स्टॉक होने से पहले रीऑर्डर बिंदु तय करें: जैसे 1 यूनिट/दिन की औसत बिक्री और 5 दिन के आपूर्तिकर्ता लीड टाइम पर आपका रीऑर्डर बिंदु 1 × 5 = 5 शेष यूनिट होगा।',
          ],
        },
      },
    ],
    calculationBlock: {
      title: {
        en: 'Cash-Capped First Stock Calculation (Illustrative)',
        hi: 'नकद-सीमित पहली स्टॉक गणना (उदाहरण)',
      },
      note: {
        en: '₹2,000 is an illustrative test budget, not a general recommendation.',
        hi: '₹2,000 केवल एक उदाहरण बजट है, सार्वभौमिक सलाह नहीं।',
      },
      lines: [
        { label: { en: 'Available test cash', hi: 'उपलब्ध परीक्षण नकदी' }, amount: '₹2,000' },
        { label: { en: 'Fulfilment & problem reserve', hi: 'पूर्ति व समस्या रिज़र्व' }, amount: '− ₹500' },
        { label: { en: 'Inbound freight', hi: 'इनबाउंड माल भाड़ा' }, amount: '− ₹200' },
        { label: { en: 'Cash available for units', hi: 'यूनिट हेतु शेष नकदी' }, amount: '₹1,300', highlight: true },
        { label: { en: 'Unit price ₹100 → Max units', hi: '₹100 प्रति यूनिट → अधिकतम संख्या' }, amount: '13 units', highlight: true },
        { label: { en: 'Illustrative reorder point (1/day × 5d lead time)', hi: 'उदाहरण रीऑर्डर बिंदु (1/दिन × 5 दिन)' }, amount: '5 units' },
      ],
    },
    worksheetSummary: {
      title: {
        en: 'Pilot Stock Purchase & Allocation Plan',
        hi: 'पायलट स्टॉक खरीद व आवंटन योजना',
      },
      fields: {
        en: [
          'Total cash budgeted for pilot',
          'Fulfilment & unexpected problem reserve',
          'Inbound freight allocation',
          'Maximum affordable unit ceiling',
          'Chosen pilot quantity (≤ ceiling & MOQ fit)',
          'Units received vs rejected/defective',
          'Units allocated to confirmed orders',
          'Net sellable units available',
          'Supplier reorder lead time & reorder point',
        ],
        hi: [
          'पायलट हेतु कुल नकद बजट',
          'पूर्ति व आकस्मिक समस्या रिज़र्व',
          'इनबाउंड भाड़ा राशि',
          'अधिकतम खरीदने योग्य यूनिट सीमा',
          'चुनी गई पायलट मात्रा (सीमा व MOQ के भीतर)',
          'प्राप्त बनाम अस्वीकृत/खराब यूनिट',
          'पुष्ट ऑर्डर हेतु आवंटित यूनिट',
          'शुद्ध बेचने योग्य उपलब्ध यूनिट',
          'आपूर्तिकर्ता लीड टाइम व रीऑर्डर बिंदु',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'Should I always buy up to my maximum affordable quantity?',
          hi: 'क्या मुझे हमेशा अपनी अधिकतम बजट सीमा तक स्टॉक खरीदना चाहिए?',
        },
        answer: {
          en: 'No. If 8 or 10 units will already test sample quality, packaging, and customer response, keep the rest of your cash liquid.',
          hi: 'नहीं। यदि 8 या 10 यूनिट से ही गुणवत्ता और ग्राहक प्रतिक्रिया परखी जा सकती है, तो शेष नकदी सुरक्षित रखें।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Bonnza Inventory Sizing Guide',
        url: 'https://bonnza.marketingtusk.com/en/courses/resell-source-to-sell',
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
      en: 'How Much Stock Should You Buy First? | Bonnza',
      hi: 'पहले बिक्री परीक्षण के लिए कितना स्टॉक खरीदें | Bonnza',
    },
    metaDescription: {
      en: 'Calculate your maximum affordable stock after reserves and freight, and track defective, allocated, and available units.',
      hi: 'नकद रिज़र्व और भाड़ा घटाकर पहले स्टॉक की मात्रा तय करें और उपलब्ध स्टॉक सही ढंग से गिनें।',
    },
    canonicalPath: '/en/blog/first-inventory-purchase-plan',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 5,
  },
  {
    id: 'B07',
    slug: 'price-handmade-products',
    hiSlug: 'price-handmade-products',
    title: {
      en: 'How to price handmade products without forgetting your time',
      hi: 'अपना समय भूले बिना हस्तनिर्मित उत्पादों की कीमत कैसे तय करें',
    },
    shortDescription: {
      en: 'Include materials, making hours, waste, packaging, selling fees, and weekly production limits when pricing craft work.',
      hi: 'शिल्प उत्पाद की कीमत तय करते समय सामग्री, बनाने के घंटे, अपव्यय, पैकेजिंग, शुल्क और साप्ताहिक क्षमता शामिल करें।',
    },
    directAnswer: {
      en: 'Price a handmade product by counting materials, the time needed to make it, waste, packaging and the costs of selling and delivering it. Then check whether the resulting price is workable for both the buyer and your production capacity. Charging above the material cost does not automatically mean you are paying yourself or earning a profit.',
      hi: 'हस्तनिर्मित उत्पाद की कीमत सामग्री, बनाने में लगे समय, अपव्यय, पैकेजिंग और बेचने व पहुंचाने की लागत जोड़कर तय करें। फिर जांचें कि क्या वह कीमत खरीदार और आपकी उत्पादन क्षमता दोनों के अनुकूल है। सामग्री लागत से अधिक वसूलने भर से श्रम या लाभ की भरपाई नहीं हो जाती।',
    },
    summary: {
      en: 'Handmade costing model (₹150 materials + ₹150 labour + ₹50 packaging/waste = ₹350 subtotal; ₹600 selling price → ₹100 contribution before ₹80 acquisition) and 12-hour weekly capacity limit.',
      hi: 'हस्तनिर्मित लागत मॉडल (₹150 सामग्री + ₹150 श्रम + ₹50 पैकेजिंग/अपव्यय = ₹350; ₹600 बिक्री मूल्य पर ₹100 योगदान) और 12-घंटे साप्ताहिक क्षमता सीमा।',
    },
    keyTakeaways: {
      en: [
        'Count making time explicitly: 1.5 hours at an illustrative ₹100/hour adds ₹150 before materials.',
        'At ₹600 net price, ₹350 production + ₹70 shipping + ₹60 selling/payment + ₹20 returns leaves ₹100 contribution (₹20 after ₹80 acquisition).',
        'Out of 12 weekly hours, 4 hours go to enquiries/admin, leaving 8 making hours—fitting at most 5 complete items at 1.5 hours each.',
      ],
      hi: [
        'बनाने का समय स्पष्ट जोड़ें: ₹100/घंटा उदाहरण दर पर 1.5 घंटे = ₹150 श्रम लागत।',
        '₹600 मूल्य पर ₹350 उत्पादन + ₹70 शिपिंग + ₹60 शुल्क + ₹20 रिटर्न के बाद ₹100 योगदान (₹80 प्रचार के बाद ₹20) बचता है।',
        '12 साप्ताहिक घंटों में से 4 घंटे प्रशासन में जाते हैं; शेष 8 घंटों में 1.5 घंटे प्रति पीस के हिसाब से अधिकतम 5 उत्पाद बन सकते हैं।',
      ],
    },
    topicCluster: 'craft-to-commerce',
    topicClusterLabel: { en: 'Craft to Commerce', hi: 'क्राफ्ट टू कॉमर्स' },
    priority: 'P1',
    intendedReader: {
      en: 'Makers and craft sellers pricing handmade goods for online sales.',
      hi: 'ऑनलाइन बिक्री के लिए हस्तनिर्मित उत्पादों की कीमत तय कर रहे निर्माता।',
    },
    searchIntent: {
      en: 'Handmade pricing formula including labour hours and production capacity.',
      hi: 'श्रम घंटे और उत्पादन क्षमता सहित हस्तनिर्मित उत्पाद मूल्य निर्धारण सूत्र।',
    },
    courseMappings: ['C03-L02'],
    relatedArticleIds: ['B02', 'B09', 'B20'],
    primaryCta: {
      label: {
        en: 'Explore Craft to Commerce',
        hi: 'क्राफ्ट टू कॉमर्स पथ देखें',
      },
      path: '/paths/craft-to-commerce',
    },
    sections: [
      {
        id: 'handmade-cost-walkthrough',
        heading: {
          en: 'What happens when you include your making time in a handmade price?',
          hi: 'हस्तनिर्मित कीमत में अपना समय शामिल करने पर गणित कैसा दिखता है?',
        },
        paragraphs: {
          en: [
            'Many home makers look only at ₹150 worth of fabric, thread, and zip, sell the pouch for ₹400, and assume they made ₹250. Once you value 1.5 hours of cutting and stitching at an illustrative ₹100/hour (₹150) plus ₹50 for packaging and offcut waste, production subtotal is ₹350.',
            'Sold at ₹600 net, subtract ₹350 production, ₹70 shipping, ₹60 selling/payment fees, and ₹20 return allowance—leaving ₹100 contribution. If acquiring the customer costs ₹80, only ₹20 remains before uncounted studio or equipment costs.',
          ],
          hi: [
            'कई निर्माता केवल ₹150 की सामग्री गिनते हैं। लेकिन 1.5 घंटे के श्रम को ₹100/घंटा (₹150) और ₹50 पैकेजिंग/कतरन जोड़ने पर उत्पादन उप-योग ₹350 हो जाता है।',
            '₹600 नेट बिक्री में से ₹350 उत्पादन, ₹70 शिपिंग, ₹60 शुल्क और ₹20 रिटर्न घटाने पर ₹100 बचते हैं। ₹80 ग्राहक-प्राप्ति लागत के बाद केवल ₹20 शेष रहता है।',
          ],
        },
      },
      {
        id: 'weekly-capacity-reality',
        heading: {
          en: 'Why must weekly making hours cap your order promises?',
          hi: 'साप्ताहिक कार्य घंटों के अनुसार ऑर्डर वादे क्यों सीमित रखने चाहिए?',
        },
        paragraphs: {
          en: [
            'Suppose you have 12 hours a week for your craft business. Roughly 4 hours go to photography, replying to messages, packing, and dispatch runs, leaving 8 hours for actual making. At 1.5 hours per item, you can finish at most 5 complete pieces per week.',
            'Customisation requests and single-piece batch setups add extra time. Setting realistic dispatch timelines protects quality and prevents burnout.',
          ],
          hi: [
            'मान लें आपके पास सप्ताह में 12 घंटे हैं। लगभग 4 घंटे फोटो, ग्राहक उत्तर और पैकिंग-डिस्पैच में जाते हैं। शेष 8 घंटों में 1.5 घंटे प्रति पीस की दर से अधिकतम 5 उत्पाद तैयार हो सकते हैं।',
            'कस्टम बदलाव और बैच तैयारी में अतिरिक्त समय लगता है, इसलिए डिस्पैच समय हमेशा यथार्थवादी रखें।',
          ],
        },
      },
    ],
    calculationBlock: {
      title: {
        en: 'Fictional Handmade Cost & Capacity Breakdown',
        hi: 'काल्पनिक हस्तनिर्मित लागत व क्षमता विवरण',
      },
      note: {
        en: 'Illustrative hourly rate (₹100/hr) — adjust for your own time value and craft complexity.',
        hi: 'उदाहरणात्मक श्रम दर (₹100/घंटा) — अपने समय व कार्य के अनुसार बदलें।',
      },
      lines: [
        { label: { en: 'Materials', hi: 'सामग्री' }, amount: '₹150' },
        { label: { en: 'Labour (1.5 hrs @ ₹100/hr)', hi: 'श्रम (1.5 घंटे @ ₹100/घंटा)' }, amount: '₹150' },
        { label: { en: 'Packaging & expected waste', hi: 'पैकेजिंग व अपव्यय' }, amount: '₹50' },
        { label: { en: 'Production subtotal', hi: 'उत्पादन उप-योग' }, amount: '₹350', highlight: true },
        { label: { en: 'Net selling price', hi: 'नेट बिक्री मूल्य' }, amount: '₹600' },
        { label: { en: 'Shipping + channel fees + returns (70+60+20)', hi: 'शिपिंग + शुल्क + रिटर्न' }, amount: '− ₹150' },
        { label: { en: 'Contribution before acquisition', hi: 'प्राप्ति लागत से पहले योगदान' }, amount: '₹100', highlight: true },
        { label: { en: 'After ₹80 acquisition cost', hi: '₹80 प्राप्ति लागत के बाद' }, amount: '₹20', highlight: true },
      ],
    },
    worksheetSummary: {
      title: {
        en: 'Handmade Cost & Capacity Pricing Sheet',
        hi: 'हस्तनिर्मित लागत व क्षमता मूल्य निर्धारण शीट',
      },
      fields: {
        en: [
          'Direct materials per finished piece',
          'Active making hours per piece × hourly rate',
          'Packaging & trim/offcut waste allowance',
          'Outbound shipping, channel/payment fees & return allowance',
          'Total weekly available hours minus admin/dispatch hours',
          'Maximum weekly completed units capacity',
        ],
        hi: [
          'प्रति तैयार उत्पाद प्रत्यक्ष सामग्री लागत',
          'प्रति पीस निर्माण घंटे × प्रति घंटा श्रम दर',
          'पैकेजिंग व कतरन/अपव्यय प्रावधान',
          'शिपिंग, चैनल/पेमेंट शुल्क व रिटर्न प्रावधान',
          'कुल साप्ताहिक घंटे घटाव प्रशासन/डिस्पैच घंटे',
          'अधिकतम साप्ताहिक उत्पादन क्षमता (यूनिट)',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'What if buyers will not pay ₹600 for a simple pouch?',
          hi: 'यदि ग्राहक साधारण पाउच के लिए ₹600 देने को तैयार न हों तो क्या करें?',
        },
        answer: {
          en: 'Do not silently erase your labour pay. Instead, check whether batch cutting lowers time per piece, bundle complementary sets, or choose a product with stronger buyer willingness to pay.',
          hi: 'अपना श्रम मूल्य शून्य न करें। बैच में कटिंग करके समय घटाने, सेट बनाने या बेहतर मूल्य वाले उत्पाद चुनने पर विचार करें।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Bonnza Craft to Commerce Costing Guide',
        url: 'https://bonnza.marketingtusk.com/en/courses/craft-to-commerce',
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
      en: 'How to Price Handmade Products and Your Time | Bonnza',
      hi: 'अपना समय जोड़कर हस्तनिर्मित उत्पादों की कीमत कैसे तय करें | Bonnza',
    },
    metaDescription: {
      en: 'Calculate handmade materials, making hours, waste, shipping, and weekly capacity before setting your selling price.',
      hi: 'हस्तनिर्मित उत्पाद का सही मूल्य निकालने के लिए सामग्री, श्रम घंटे, अपव्यय और क्षमता की गणना सीखें।',
    },
    canonicalPath: '/en/blog/price-handmade-products',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 5,
  },
  {
    id: 'B08',
    slug: 'whatsapp-enquiry-to-order',
    hiSlug: 'whatsapp-enquiry-to-order',
    title: {
      en: 'How to turn a WhatsApp product enquiry into a clear order',
      hi: 'WhatsApp उत्पाद पूछताछ को स्पष्ट ऑर्डर में कैसे बदलें',
    },
    shortDescription: {
      en: 'Use SKU codes, exact dimensions, total payable quotes, independent bank payment checks, and a simple order register.',
      hi: 'SKU कोड, सटीक माप, कुल देय राशि, स्वतंत्र बैंक भुगतान जांच और सरल ऑर्डर रजिस्टर का उपयोग करें।',
    },
    directAnswer: {
      en: 'Turn a WhatsApp enquiry into an order by answering the buyer’s question, confirming the exact product and quantity, quoting the full payable amount and dispatch terms, checking payment in your own records, and creating an order entry. A friendly conversation is useful, but a clear order record is what lets you deliver consistently.',
      hi: 'WhatsApp पूछताछ को ऑर्डर में बदलने के लिए खरीदार के प्रश्न का स्पष्ट उत्तर दें, सही उत्पाद व मात्रा तय करें, कुल देय राशि व डिस्पैच समय बताएं, अपने बैंक रिकॉर्ड में भुगतान जांचें और एक ऑर्डर प्रविष्टि दर्ज करें।',
    },
    summary: {
      en: 'Order confirmation workflow using pouch P-BL-01 (20cm × 14cm), 2 × ₹250 + ₹60 delivery = ₹560, reference BZ-014, and payment-screenshot caution.',
      hi: 'पाउच P-BL-01 (20cm × 14cm), 2 × ₹250 + ₹60 डिलीवरी = ₹560, संदर्भ BZ-014 और भुगतान स्क्रीनशॉट सावधानी के साथ ऑर्डर प्रक्रिया।',
    },
    keyTakeaways: {
      en: [
        'State dimensions (20cm × 14cm), SKU code (P-BL-01), pack contents, and dispatch vs delivery dates clearly.',
        'Quote total payable upfront (e.g., 2 × ₹250 + ₹60 delivery = ₹560) and issue a confirmation reference (BZ-014).',
        'Never treat a forwarded payment screenshot as proof of receipt—verify credit inside your bank or payment app.',
      ],
      hi: [
        'माप (20cm × 14cm), कोड (P-BL-01), पैक सामग्री और डिस्पैच बनाम डिलीवरी समय स्पष्ट लिखें।',
        'कुल देय राशि पहले बताएं (जैसे 2 × ₹250 + ₹60 डिलीवरी = ₹560) और संदर्भ संख्या (BZ-014) दें।',
        'भुगतान स्क्रीनशॉट को प्रमाण न मानें—अपने बैंक या पेमेंट ऐप रिकॉर्ड में स्वयं राशि जांचें।',
      ],
    },
    topicCluster: 'social-media-and-whatsapp',
    topicClusterLabel: { en: 'Social Media and WhatsApp', hi: 'सोशल मीडिया और WhatsApp' },
    priority: 'P1',
    intendedReader: {
      en: 'Home-based sellers taking orders directly through WhatsApp chats.',
      hi: 'WhatsApp चैट के माध्यम से सीधे ऑर्डर ले रहे घरेलू विक्रेता।',
    },
    searchIntent: {
      en: 'Structured WhatsApp order confirmation workflow and register template.',
      hi: 'व्यवस्थित WhatsApp ऑर्डर पुष्टि प्रक्रिया और रजिस्टर प्रारूप।',
    },
    courseMappings: ['C04-L02', 'C04-L03'],
    relatedArticleIds: ['B03', 'B10', 'B19'],
    primaryCta: {
      label: {
        en: 'Explore Social Media and WhatsApp lessons',
        hi: 'सोशल मीडिया और WhatsApp पाठ देखें',
      },
      path: '/courses/social-media-and-whatsapp',
    },
    sections: [
      {
        id: 'enquiry-to-confirmation',
        heading: {
          en: 'What is the 5-step sequence from WhatsApp enquiry to confirmed order?',
          hi: 'WhatsApp पूछताछ से पुष्ट ऑर्डर तक की 5-चरणीय प्रक्रिया क्या है?',
        },
        paragraphs: {
          en: [
            'Follow one repeatable 5-step workflow: Step 1 — Answer the buyer’s direct question first (e.g., external dimensions 20cm × 14cm, washed cotton canvas, what is inside the pack—one pouch without props). Step 2 — Confirm the exact SKU code (P-BL-01), colour/variant, and quantity.',
            'Step 3 — Quote the complete payable total upfront (e.g., 2 × ₹250 = ₹500 + ₹60 delivery = ₹560 total), verify PIN code serviceability, and state expected dispatch window separately from courier delivery days. Step 4 — Verify payment credit independently inside your own bank or merchant app—never rely on forwarded screenshots. Step 5 — Assign an order reference such as BZ-014, allocate stock, and log the entry.',
          ],
          hi: [
            'एक व्यवस्थित 5-चरणीय प्रक्रिया अपनाएं: चरण 1 — पहले खरीदार के सवाल का स्पष्ट उत्तर दें (माप 20cm × 14cm, सामग्री व पैक में शामिल वस्तु)। चरण 2 — सटीक SKU कोड (P-BL-01), रंग और मात्रा तय करें।',
            'चरण 3 — कुल देय राशि पहले बताएं (2 × ₹250 + ₹60 डिलीवरी = ₹560) व डिस्पैच समय को डिलीवरी समय से अलग स्पष्ट करें। चरण 4 — स्क्रीनशॉट पर भरोसा किए बिना अपने बैंक/मर्चेंट ऐप में क्रेडिट जांचें। चरण 5 — संदर्भ BZ-014 देकर स्टॉक आवंटित करें व रजिस्टर में दर्ज करें।',
          ],
        },
      },
      {
        id: 'payment-verification-register',
        heading: {
          en: 'Why keep a 14-field external order register outside WhatsApp chat?',
          hi: 'WhatsApp चैट से बाहर 14-फ़ील्ड ऑर्डर रजिस्टर क्यों रखें?',
        },
        paragraphs: {
          en: [
            'WhatsApp threads scroll down quickly and bury addresses, variant choices, and payment statuses once multiple buyers message together. Logging every confirmed order into a single external register prevents missed dispatches, duplicate shipments, and overselling available stock.',
            'Track each stage cleanly—Enquiry, Quoted, Paid Verified, Packed, Dispatched, Delivered—and follow up only with buyers who opted in for updates.',
          ],
          hi: [
            'चैट थ्रेड में पते, वेरिएंट और भुगतान विवरण जल्दी दब जाते हैं। बाहरी ऑर्डर रजिस्टर रखने से डिस्पैच चूक, दोहरी पैकिंग और ओवरसेलिंग से बचाव होता है।',
            'हर स्थिति (पूछताछ, कोटेशन, भुगतान सत्यापित, पैक्ड, डिस्पैच, डिलीवर) दर्ज करें और केवल सहमत ग्राहकों को अपडेट भेजें।',
          ],
        },
      },
    ],
    comparisonTable: {
      caption: {
        en: 'Fictional WhatsApp Order Register Entry (Ref: BZ-014)',
        hi: 'काल्पनिक WhatsApp ऑर्डर रजिस्टर प्रविष्टि (संदर्भ: BZ-014)',
      },
      headers: {
        en: ['Ref ID', 'SKU & Qty', 'Total Quote', 'Payment Check', 'Dispatch Status'],
        hi: ['संदर्भ ID', 'SKU व मात्रा', 'कुल राशि', 'भुगतान जांच', 'डिस्पैच स्थिति'],
      },
      rows: {
        en: [
          ['BZ-014', 'P-BL-01 (20×14cm) × 2', '₹500 + ₹60 = ₹560', 'Verified in bank ledger', 'Packed for next dispatch'],
        ],
        hi: [
          ['BZ-014', 'P-BL-01 (20×14cm) × 2', '₹500 + ₹60 = ₹560', 'बैंक खाते में सत्यापित', 'अगले डिस्पैच हेतु पैक्ड'],
        ],
      },
    },
    worksheetSummary: {
      title: {
        en: 'External WhatsApp Order Register (14 Fields)',
        hi: 'बाहरी WhatsApp ऑर्डर रजिस्टर (14 फ़ील्ड)',
      },
      fields: {
        en: [
          'Order reference number (e.g., BZ-014)',
          'Enquiry / order confirmation date',
          'Buyer name & WhatsApp contact',
          'Delivery address & PIN code',
          'Exact SKU code & variant',
          'Order quantity',
          'Item subtotal',
          'Delivery / shipping charge',
          'Total payable quote',
          'Payment verification method & bank ref ID',
          'Promised dispatch window',
          'Courier partner & tracking ID',
          'Order lifecycle status',
          'Opt-in follow-up / delivery note',
        ],
        hi: [
          'ऑर्डर संदर्भ संख्या (जैसे BZ-014)',
          'पूछताछ / ऑर्डर पुष्टि तिथि',
          'खरीदार का नाम व WhatsApp संपर्क',
          'डिलीवरी पता व पिनकोड',
          'सटीक SKU कोड व वेरिएंट',
          'ऑर्डर मात्रा',
          'उत्पाद उप-योग',
          'डिलीवरी / शिपिंग शुल्क',
          'कुल देय राशि',
          'भुगतान सत्यापन विधि व बैंक संदर्भ ID',
          'वादा किया गया डिस्पैच समय',
          'कूरियर पार्टनर व ट्रैकिंग ID',
          'ऑर्डर स्थिति',
          'सहमति-आधारित फॉलो-अप / डिलीवरी नोट',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'What is the difference between dispatch and delivery?',
          hi: 'डिस्पैच और डिलीवरी में क्या अंतर है?',
        },
        answer: {
          en: 'Dispatch is when you hand the parcel to the courier; delivery is when the buyer receives it. Stating both prevents unnecessary confusion.',
          hi: 'डिस्पैच वह समय है जब आप कूरियर को पार्सल सौंपते हैं; डिलीवरी वह है जब खरीदार को मिलता है। दोनों स्पष्ट बताना भ्रम रोकता है।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Bonnza Social Media & WhatsApp Course',
        url: 'https://bonnza.marketingtusk.com/en/courses/social-media-and-whatsapp',
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
      en: 'WhatsApp Selling: Turn an Enquiry into an Order | Bonnza',
      hi: 'WhatsApp बिक्री: पूछताछ को स्पष्ट ऑर्डर में बदलें | Bonnza',
    },
    metaDescription: {
      en: 'Use product codes, full payable quotes, independent bank payment checks, and an order register to manage WhatsApp sales.',
      hi: 'WhatsApp बिक्री को व्यवस्थित रखने के लिए प्रोडक्ट कोड, कुल कोटेशन, बैंक जांच और ऑर्डर रजिस्टर का उपयोग सीखें।',
    },
    canonicalPath: '/en/blog/whatsapp-enquiry-to-order',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 6,
  },
  {
    id: 'B09',
    slug: 'selling-artist-sourced-crafts',
    hiSlug: 'selling-artist-sourced-crafts',
    title: {
      en: 'Selling crafts made by artists: describe your role accurately',
      hi: 'कलाकारों द्वारा बनाए शिल्प बेचना: अपनी भूमिका सटीक रूप से बताएं',
    },
    shortDescription: {
      en: 'Separate self-made goods from artist-sourced crafts using truthful provenance, permissions, and channel-eligibility checks.',
      hi: 'सत्य उत्पत्ति प्रमाण, अनुमति और चैनल पात्रता जांच के साथ स्व-निर्मित और कलाकार-निर्मित शिल्प में अंतर स्पष्ट करें।',
    },
    directAnswer: {
      en: 'If you sell crafts made by someone else, describe yourself as the seller, curator or sourcing business and explain who made the product using verified information and permission. Handmade describes how an item was produced. It does not automatically mean you made it, own its design or can sell it on every marketplace.',
      hi: 'यदि आप किसी और के बनाए शिल्प बेचते हैं, तो स्वयं को विक्रेता, क्यूरेटर या सोर्सिंग व्यवसाय बताएं और सत्यापित जानकारी व अनुमति के साथ निर्माता का उल्लेख करें। “हस्तनिर्मित” उत्पादन विधि बताता है—इसका अर्थ यह नहीं कि वह स्वतः हर मार्केटप्लेस पर बेचने योग्य है।',
    },
    summary: {
      en: 'Fictional provenance comparison between a self-made pouch and an artist-made sourced pouch, truthful attribution rules, and Etsy policy verification notice.',
      hi: 'स्व-निर्मित बनाम कलाकार-निर्मित पाउच का उत्पत्ति प्रमाण तुलनात्मक विवरण, सत्य श्रेय नियम और Etsy नीति सत्यापन सूचना।',
    },
    keyTakeaways: {
      en: [
        'Clearly distinguish a self-made cotton pouch from an artist-made pouch sourced and inspected for resale.',
        'Never fabricate artisan stories, geographic origins, charitable impact, or exclusive partnerships.',
        'Check Etsy Creativity Standards directly before assuming artist-sourced finished crafts qualify.',
      ],
      hi: [
        'स्वयं सिले गए कॉटन पाउच और कलाकार से खरीदकर बेचे जाने वाले पाउच में स्पष्ट अंतर रखें।',
        'कभी भी मनगढ़ंत कारीगर कहानियां, भौगोलिक मूल, दान दावे या विशेष साझेदारी न गढ़ें।',
        'यह मानने से पहले कि कलाकार-निर्मित माल Etsy पर चलेगा, सीधे Etsy नीति जांचें।',
      ],
    },
    topicCluster: 'craft-to-commerce',
    topicClusterLabel: { en: 'Craft to Commerce', hi: 'क्राफ्ट टू कॉमर्स' },
    priority: 'P2',
    intendedReader: {
      en: 'Entrepreneurs sourcing finished handmade items from independent artists and craftspeople.',
      hi: 'स्वतंत्र कलाकारों और शिल्पकारों से तैयार हस्तनिर्मित उत्पाद सोर्स कर रहे उद्यमी।',
    },
    searchIntent: {
      en: 'Ethical provenance, attribution, and marketplace suitability for curated crafts.',
      hi: 'कलाकार-निर्मित शिल्प के लिए सत्य उत्पत्ति, श्रेय और मार्केटप्लेस उपयुक्तता।',
    },
    courseMappings: ['C03-L01', 'C03-L03'],
    relatedArticleIds: ['B07', 'B15', 'B04'],
    primaryCta: {
      label: {
        en: 'Explore the Craft to Commerce product brief',
        hi: 'क्राफ्ट टू कॉमर्स उत्पाद संक्षिप्त विवरण देखें',
      },
      path: '/paths/craft-to-commerce',
    },
    sections: [
      {
        id: 'provenance-cards',
        heading: {
          en: 'How does self-made provenance differ from artist-sourced provenance?',
          hi: 'स्व-निर्मित और कलाकार-निर्मित स्रोत प्रमाण में क्या अंतर है?',
        },
        paragraphs: {
          en: [
            'Consider two fictional provenance cards: Card A describes a cotton pouch designed, cut, and stitched directly by the seller. Card B describes an artist-made cotton pouch purchased as a finished piece, quality-inspected, and sold by another entrepreneur.',
            'Both can be valuable businesses, but their listing claims, photography rights, and marketplace eligibility differ completely.',
          ],
          hi: [
            'दो काल्पनिक उदाहरण देखें: कार्ड A में विक्रेता स्वयं डिज़ाइन, कटिंग और सिलाई करता है। कार्ड B में विक्रेता कलाकार द्वारा तैयार पाउच खरीदता है, जांचता है और बेचता है।',
            'दोनों ईमानदार व्यापार हो सकते हैं, पर दोनों के दावे, फोटो अधिकार और मार्केटप्लेस पात्रता अलग हैं।',
          ],
        },
      },
      {
        id: 'truthful-attribution',
        heading: {
          en: 'What provenance and permission records should every sourcing business keep?',
          hi: 'हर सोर्सिंग व्यवसाय को कौन से स्रोत व अनुमति रिकॉर्ड रखने चाहिए?',
        },
        paragraphs: {
          en: [
            'Record who made the item, whether their name or workshop can be shared publicly with consent, how natural variations occur across pieces, and whether you took your own product photos or received written permission.',
            'Avoid romanticised marketing fiction: never invent artisan backstories, claim unverified regional heritage, imply charitable revenue sharing without auditable arrangements, or assume Etsy allows unchanged finished-craft resale (note: Etsy’s Creativity Standards must be verified against live policy before publication).',
          ],
          hi: [
            'दर्ज करें कि उत्पाद किसने बनाया, क्या उनका नाम साझा करने की अनुमति है, बैच में प्राकृतिक अंतर कैसे आते हैं और फोटो उपयोग की लिखित अनुमति है या नहीं।',
            'कभी भी काल्पनिक कारीगर कथाएं, अप्रमाणित दान दावे न लिखें और न ही मानें कि Etsy तैयार शिल्प की रीसेलिंग स्वतः स्वीकार करता है।',
          ],
        },
      },
    ],
    comparisonTable: {
      caption: {
        en: 'Fictional Provenance Comparison: Self-Made vs Artist-Sourced',
        hi: 'काल्पनिक उत्पत्ति तुलना: स्व-निर्मित बनाम कलाकार-निर्मित',
      },
      headers: {
        en: ['Attribute', 'Self-Made Pouch', 'Artist-Sourced Pouch'],
        hi: ['पहलू', 'स्व-निर्मित पाउच', 'कलाकार-निर्मित पाउच'],
      },
      rows: {
        en: [
          ['Seller role', 'Designer & maker', 'Curator / sourcing reseller'],
          ['Design & making', 'Executed in-house', 'Made by independent artist'],
          ['Description rule', 'Explain materials, dimensions & making care', 'Credit verified maker (with permission) & describe inspection'],
          ['Etsy suitability', 'Assess under Etsy Made rules', 'Not automatically eligible; verify live Etsy Creativity rules'],
        ],
        hi: [
          ['विक्रेता की भूमिका', 'डिज़ाइनर व निर्माता', 'क्यूरेटर / सोर्सिंग विक्रेता'],
          ['निर्माण कार्य', 'स्वयं निर्मित', 'स्वतंत्र कलाकार द्वारा निर्मित'],
          ['विवरण नियम', 'सामग्री, माप और निर्माण देखभाल बताएं', 'अनुमति से निर्माता का श्रेय व गुणवत्ता जांच बताएं'],
          ['Etsy उपयुक्तता', 'Etsy Made नियमों पर जांचें', 'स्वतः पात्र नहीं; लाइव Etsy नियम सत्यापित करें'],
        ],
      },
    },
    worksheetSummary: {
      title: {
        en: 'Artist-Craft Provenance & Evidence File',
        hi: 'कलाकार-शिल्प स्रोत व प्रमाण फ़ाइल',
      },
      fields: {
        en: [
          'Product code & physical description',
          'Exact role definition (Curator / Reseller vs Maker)',
          'Verified artist / workshop name & written naming consent',
          'Verified production location & process summary',
          'Written photo / media permission & purchase invoice',
          'Target channel rule check (e.g., Etsy Creativity Standards)',
        ],
        hi: [
          'उत्पाद कोड व भौतिक विवरण',
          'सटीक भूमिका (क्यूरेटर / रीसेलर बनाम निर्माता)',
          'सत्यापित कलाकार / कार्यशाला का नाम व लिखित सहमति',
          'सत्यापित निर्माण स्थान व प्रक्रिया विवरण',
          'फोटो / मीडिया की लिखित अनुमति व खरीद बिल',
          'लक्षित चैनल नियम जांच (जैसे Etsy Creativity Standards)',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'Can I list handmade crafts bought from local artisans directly on Etsy?',
          hi: 'क्या मैं स्थानीय कारीगरों से खरीदे तैयार शिल्प सीधे Etsy पर बेच सकता हूँ?',
        },
        answer: {
          en: 'Not automatically. Etsy distinguishes items made or designed by you from reselling finished goods made by others. Review Etsy’s current Creativity Standards carefully.',
          hi: 'स्वतः नहीं। Etsy आपके द्वारा बनाए/डिज़ाइन किए उत्पादों और दूसरों से खरीदकर बेचे जाने वाले तैयार माल में अंतर करता है। लाइव Etsy नियम जांचें।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Etsy Creativity Standards',
        url: 'https://www.etsy.com/legal/creativity/',
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
      en: 'Selling Artist-Sourced Crafts: Describe Your Role | Bonnza',
      hi: 'कलाकारों के बनाए शिल्प बेचना: अपनी भूमिका सटीक बताएं | Bonnza',
    },
    metaDescription: {
      en: 'Keep truthful provenance records, verify permissions, and check marketplace eligibility before selling artist-made crafts.',
      hi: 'कलाकारों के शिल्प बेचने से पहले सत्य स्रोत प्रमाण, अनुमति और मार्केटप्लेस पात्रता की जांच सीखें।',
    },
    canonicalPath: '/en/blog/selling-artist-sourced-crafts',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 5,
  },
  {
    id: 'B10',
    slug: 'product-content-buying-questions',
    hiSlug: 'product-content-buying-questions',
    title: {
      en: 'Seven product-content ideas that answer buying questions',
      hi: 'खरीदारी के सवालों के जवाब देने वाले सात प्रोडक्ट-कंटेंट आइडिया',
    },
    shortDescription: {
      en: 'Replace repetitive "buy now" posts with a two-week seven-post series answering size, contents, materials, care, and ordering.',
      hi: 'बार-बार “अभी खरीदें” लिखने के बजाय आकार, पैक सामग्री, देखभाल और ऑर्डर प्रक्रिया समझाने वाली दो-सप्ताह की सात-पोस्ट श्रृंखला बनाएं।',
    },
    directAnswer: {
      en: 'Useful product content answers the questions a buyer needs to resolve before ordering: what the product does, how big it is, what is included, what it is made from, how it works, how to order and when it can be dispatched. Build a small content series around these questions instead of repeating ‘buy now’ in every post.',
      hi: 'उपयोगी उत्पाद सामग्री वे सवाल हल करती है जो खरीदार ऑर्डर से पहले जानना चाहता है: उत्पाद क्या करता है, आकार कितना है, पैक में क्या शामिल है, किस सामग्री से बना है, कैसे काम करता है, ऑर्डर कैसे करें और डिस्पैच कब होगा।',
    },
    summary: {
      en: 'All seven buyer-question content prompts applied to a cotton travel pouch, two-week mini-calendar, and separation of views, enquiries, and orders.',
      hi: 'कॉटन ट्रैवल पाउच पर लागू सभी सात खरीदार-प्रश्न पोस्ट, दो-सप्ताह का मिनी-कैलेंडर और व्यू, पूछताछ व ऑर्डर मापन।',
    },
    keyTakeaways: {
      en: [
        'Cover seven concrete buyer questions: use case, scale/size, pack contents, materials/care, ordinary action, how to order, and dispatch/delivery.',
        'Schedule the seven posts across a sustainable two-week mini-calendar.',
        'Measure views, enquiries, and confirmed orders separately rather than treating likes as sales.',
      ],
      hi: [
        'सात ठोस प्रश्न हल करें: उपयोग, आकार, पैक में क्या है, सामग्री/देखभाल, सामान्य कार्य, ऑर्डर प्रक्रिया और डिस्पैच/डिलीवरी।',
        'इन सात पोस्ट को दो सप्ताह के आसान मिनी-कैलेंडर में फैलाएं।',
        'व्यू, पूछताछ और पुष्ट ऑर्डर को अलग-अलग ट्रैक करें।',
      ],
    },
    topicCluster: 'social-media-and-whatsapp',
    topicClusterLabel: { en: 'Social Media and WhatsApp', hi: 'सोशल मीडिया और WhatsApp' },
    priority: 'P2',
    intendedReader: {
      en: 'Beginners using social posts or WhatsApp statuses to introduce their product.',
      hi: 'सोशल मीडिया पोस्ट या WhatsApp स्टेटस से उत्पाद दिखाने वाले नए विक्रेता।',
    },
    searchIntent: {
      en: 'Actionable product content calendar for small ecommerce sellers.',
      hi: 'छोटे ई-कॉमर्स विक्रेताओं के लिए व्यावहारिक कंटेंट कैलेंडर।',
    },
    courseMappings: ['C04-L01', 'C04-L04'],
    relatedArticleIds: ['B08', 'B03', 'B20'],
    primaryCta: {
      label: {
        en: 'Explore social-selling lessons',
        hi: 'सोशल-सेलिंग पाठ देखें',
      },
      path: '/courses/social-media-and-whatsapp',
    },
    sections: [
      {
        id: 'seven-content-ideas',
        heading: {
          en: 'What are the seven product posts every buyer actually needs?',
          hi: 'वे सात उत्पाद पोस्ट कौन से हैं जिनकी खरीदार को वास्तव में जरूरत होती है?',
        },
        paragraphs: {
          en: [
            'Using our fictional cotton travel pouch: 1) Show a real use case (packing cables and passport in a backpack). 2) Make size understandable (hold next to a smartphone or ruler showing 20cm × 14cm). 3) Show exactly what is included (one pouch—not the props inside).',
            '4) Explain materials and care (washed cotton canvas, spot clean or gentle hand wash). 5) Demonstrate an ordinary product action (zipping smoothly with items inside). 6) Explain how to order (message SKU P-BL-01 with PIN code). 7) Clarify dispatch and delivery timing.',
          ],
          hi: [
            'कॉटन पाउच उदाहरण से: 1) वास्तविक उपयोग दिखाएं (बैकपैक में केबल/पासपोर्ट रखना)। 2) आकार समझाएं (फ़ोन या स्केल के पास 20cm × 14cm दिखाना)। 3) पैक में क्या शामिल है यह दिखाएं।',
            '4) सामग्री व धुलाई निर्देश बताएं। 5) सामान्य क्रिया दिखाएं (सामान के साथ ज़िप बंद करना)। 6) ऑर्डर प्रक्रिया बताएं (कोड P-BL-01 और पिनकोड भेजें)। 7) डिस्पैच और डिलीवरी समय स्पष्ट करें।',
          ],
        },
      },
      {
        id: 'views-vs-enquiries-vs-orders',
        heading: {
          en: 'Why must you track views, enquiries, and orders separately?',
          hi: 'व्यू, पूछताछ और ऑर्डर को अलग-अलग क्यों मापें?',
        },
        paragraphs: {
          en: [
            'High views with zero enquiries often mean buyers cannot tell how to buy or whether the product fits their need. Many enquiries with few orders often point to missing size clarity, unexpected shipping charges, or slow replies.',
          ],
          hi: [
            'अधिक व्यू पर कम पूछताछ का अर्थ है कि ऑर्डर मार्ग या उपयोग स्पष्ट नहीं है। अधिक पूछताछ पर कम ऑर्डर का अर्थ अक्सर कीमत, डिलीवरी शुल्क या उत्तर की देरी होता है।',
          ],
        },
      },
    ],
    comparisonTable: {
      caption: {
        en: 'Two-Week Seven-Post Mini-Calendar (Cotton Pouch Example)',
        hi: 'दो-सप्ताह सात-पोस्ट मिनी-कैलेंडर (कॉटन पाउच उदाहरण)',
      },
      headers: {
        en: ['Schedule', 'Buyer Question', 'Post Format'],
        hi: ['समय', 'खरीदार प्रश्न', 'पोस्ट प्रारूप'],
      },
      rows: {
        en: [
          ['Week 1 · Day 1', '1. Real use case', 'Photo packing chargers & travel essentials'],
          ['Week 1 · Day 3', '2. Size reference', 'Photo beside ruler & phone (20×14cm)'],
          ['Week 1 · Day 5', '3. What is included', 'Flat-lay showing 1 pouch only'],
          ['Week 1 · Day 7', '4. Materials & care', 'Close-up of cotton weave & wash note'],
          ['Week 2 · Day 9', '5. Ordinary action', 'Short clip opening & zipping full pouch'],
          ['Week 2 · Day 11', '6. How to order', 'Step-by-step graphic with SKU P-BL-01'],
          ['Week 2 · Day 13', '7. Dispatch & delivery', 'Packing box photo & courier lead times'],
        ],
        hi: [
          ['सप्ताह 1 · दिन 1', '1. वास्तविक उपयोग', 'चार्जर व सामान रखते हुए फोटो'],
          ['सप्ताह 1 · दिन 3', '2. आकार संदर्भ', 'स्केल व फ़ोन के साथ (20×14cm) फोटो'],
          ['सप्ताह 1 · दिन 5', '3. क्या शामिल है', 'केवल 1 पाउच का स्पष्ट फ्लैट-ले'],
          ['सप्ताह 1 · दिन 7', '4. सामग्री व देखभाल', 'कपड़े का क्लोज़-अप व धुलाई नोट'],
          ['सप्ताह 2 · दिन 9', '5. सामान्य क्रिया', 'पाउच खोलने-बंद करने की छोटी क्लिप'],
          ['सप्ताह 2 · दिन 11', '6. ऑर्डर कैसे करें', 'SKU P-BL-01 के साथ ऑर्डर चरण'],
          ['सप्ताह 2 · दिन 13', '7. डिस्पैच व डिलीवरी', 'पैक्ड बॉक्स व डिलीवरी समय जानकारी'],
        ],
      },
    },
    worksheetSummary: {
      title: {
        en: 'Two-Week Content & Conversion Tracking Sheet',
        hi: 'दो-सप्ताह कंटेंट व रूपांतरण ट्रैकिंग शीट',
      },
      fields: {
        en: [
          'Post slot (1–7) & buyer question addressed',
          'Exact SKU featured (e.g., P-BL-01)',
          'Natural-light photo / short clip status',
          'Post views / reach count',
          'Direct buyer enquiries received',
          'Confirmed orders & recurring buyer objection noted',
        ],
        hi: [
          'पोस्ट संख्या (1–7) व हल किया गया खरीदार प्रश्न',
          'प्रदर्शित सटीक SKU (जैसे P-BL-01)',
          'प्राकृतिक रोशनी फोटो / क्लिप स्थिति',
          'पोस्ट व्यू / पहुंच संख्या',
          'प्राप्त प्रत्यक्ष खरीदार पूछताछ',
          'पुष्ट ऑर्डर व बार-बार पूछा जाने वाला प्रश्न',
        ],
      },
    },
    faqEntries: [
      {
        question: {
          en: 'Do I need professional studio gear to make these seven posts?',
          hi: 'क्या इन सात पोस्ट के लिए महंगे स्टूडियो उपकरण जरूरी हैं?',
        },
        answer: {
          en: 'No. Clean window daylight, a neutral background, steady smartphone framing, and honest measurements communicate far better than heavy filters.',
          hi: 'नहीं। खिड़की की साफ प्राकृतिक रोशनी, सादा बैकग्राउंड और सटीक माप फ़िल्टर से कहीं बेहतर काम करते हैं।',
        },
      },
    ],
    primarySources: [
      {
        label: 'Bonnza Social Content Guide',
        url: 'https://bonnza.marketingtusk.com/en/courses/social-media-and-whatsapp',
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
      en: '7 Product Content Ideas That Answer Buying Questions | Bonnza',
      hi: 'खरीदारी के सवाल हल करने वाले 7 प्रोडक्ट-कंटेंट आइडिया | Bonnza',
    },
    metaDescription: {
      en: 'Build a two-week seven-post product series covering use case, scale, contents, care, action, ordering, and dispatch.',
      hi: 'उपयोग, आकार, सामग्री, ऑर्डर प्रक्रिया और डिस्पैच समझाने वाला सात-पोस्ट कंटेंट कैलेंडर।',
    },
    canonicalPath: '/en/blog/product-content-buying-questions',
    schemaType: 'Article',
    contentVersion: '2.0',
    readingTimeMinutes: 5,
  },
];
