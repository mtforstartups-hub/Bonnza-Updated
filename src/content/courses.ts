import type { CourseRecord } from '../domain/types';

export const COURSES: CourseRecord[] = [
  {
    id: 'C01',
    slug: 'business-foundations',
    code: 'C01',
    title: {
      en: 'Business Foundations',
      hi: 'बिज़नेस फ़ाउंडेशन (व्यापार की नींव)',
    },
    outcome: {
      en: 'Choose a realistic product and buyer direction, calculate true order contribution, pick one starting channel, and structure a four-week launch test.',
      hi: 'एक व्यावहारिक उत्पाद और ग्राहक दिशा चुनें, प्रति ऑर्डर वास्तविक लागत व योगदान की गणना करें, एक पहला बिक्री चैनल तय करें और चार सप्ताह का लॉन्च परीक्षण बनाएं।',
    },
    intendedLearner: {
      en: 'First-time and home-based entrepreneurs preparing their initial ecommerce plan.',
      hi: 'पहली बार और घर से ऑनलाइन व्यापार शुरू करने की तैयारी कर रहे उद्यमी।',
    },
    prerequisites: {
      en: 'None. No prior online selling account or technical background required.',
      hi: 'कोई पूर्व शर्त नहीं। किसी पूर्व सेलर अकाउंट या तकनीकी अनुभव की आवश्यकता नहीं।',
    },
    businessPath: 'both',
    languageAvailability: {
      en: 'English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी',
    },
    releaseStatus: 'RECORDING_PENDING',
    releaseStatusLabel: {
      en: 'Available in English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी में उपलब्ध',
    },
    accessAndSupport: {
      en: 'Part of the complete programme bundle (12 months access and 10 weeks of scheduled group support).',
      hi: 'संपूर्ण प्रोग्राम बंडल का हिस्सा (12 महीने की एक्सेस और 10 सप्ताह का निर्धारित समूह सहयोग)।',
    },
    practicalAssignments: {
      en: [
        'One-page customer, product, and role brief',
        'Unit contribution & cash buffer worksheet',
        'Seven-day evidence-gathering experiment log',
      ],
      hi: [
        'एक-पृष्ठ ग्राहक, उत्पाद और भूमिका संक्षिप्त विवरण',
        'यूनिट योगदान और नकद बफर वर्कशीट',
        'सात-दिवसीय प्रमाण-संग्रह परीक्षण लॉग',
      ],
    },
    modules: [
      {
        id: 'C01-M1',
        number: 1,
        title: {
          en: 'Choose a viable starting point',
          hi: 'एक व्यावहारिक शुरुआती बिंदु चुनें',
        },
        lessons: [
          {
            id: 'C01-L01',
            title: {
              en: 'Your business route and first customer',
              hi: 'आपका व्यापार मार्ग और पहला ग्राहक',
            },
            summary: {
              en: 'Define a concrete buyer use case and clarify whether you are reselling, making, or curating crafts.',
              hi: 'स्पष्ट खरीदार उपयोग तय करें और समझें कि आप रीसेल कर रहे हैं, निर्माण कर रहे हैं या शिल्प चुन रहे हैं।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C01-L02',
            title: {
              en: 'Product research without copying',
              hi: 'बिना नकल किए उत्पाद अनुसंधान',
            },
            summary: {
              en: 'Evaluate real buyer questions, product problems, and price-band realities instead of mimicking viral items.',
              hi: 'केवल चर्चित वस्तुओं की नकल करने के बजाय वास्तविक खरीदार प्रश्नों और मूल्य सीमा का मूल्यांकन करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
      {
        id: 'C01-M2',
        number: 2,
        title: {
          en: 'Build the launch plan',
          hi: 'लॉन्च योजना तैयार करें',
        },
        lessons: [
          {
            id: 'C01-L03',
            title: {
              en: 'Choose your first selling channel',
              hi: 'अपना पहला बिक्री चैनल चुनें',
            },
            summary: {
              en: 'Assess buyer access, seller eligibility, unit economics, and weekly operational hours before picking a route.',
              hi: 'कोई भी रास्ता चुनने से पहले खरीदार पहुंच, विक्रेता पात्रता, ऑर्डर अर्थशास्त्र और साप्ताहिक समय की जांच करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C01-L04',
            title: {
              en: 'Pricing, contribution and cash',
              hi: 'मूल्य निर्धारण, योगदान और नकद प्रवाह',
            },
            summary: {
              en: 'Separate net sales, variable order costs, contribution margin, fixed expenses, and bank cash timing.',
              hi: 'नेट बिक्री, परिवर्तनीय लागत, योगदान मार्जिन, निश्चित खर्च और बैंक नकद समय को अलग-अलग समझें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
      {
        id: 'C01-M3',
        number: 3,
        title: {
          en: 'Prepare to operate',
          hi: 'संचालन की तैयारी करें',
        },
        lessons: [
          {
            id: 'C01-L05',
            title: {
              en: 'Prepare documents, ownership and records',
              hi: 'दस्तावेज़, स्वामित्व और रिकॉर्ड तैयार करें',
            },
            summary: {
              en: 'Organize basic business records, SKU naming, invoice readiness, and channel registration checks.',
              hi: 'बुनियादी व्यापार रिकॉर्ड, SKU नामकरण, चालान तैयारी और चैनल पंजीकरण जांच व्यवस्थित करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C01-L06',
            title: {
              en: 'Build a four-week launch experiment',
              hi: 'चार-सप्ताह का लॉन्च प्रयोग बनाएं',
            },
            summary: {
              en: 'Set weekly operational checkpoints, spending ceilings, and clear continue/revise/pause criteria.',
              hi: 'साप्ताहिक कार्य जांच बिंदु, खर्च सीमा और जारी/सुधार/रोकने के स्पष्ट मानदंड तय करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
    ],
    relatedArticleIds: ['B01', 'B02', 'B03'],
    relatedChannelSlugs: ['meesho', 'whatsapp-selling', 'shopify'],
  },
  {
    id: 'C02',
    slug: 'resell-source-to-sell',
    code: 'C02',
    title: {
      en: 'Resell, Source to Sell',
      hi: 'रीसेल: सोर्स टू सेल',
    },
    outcome: {
      en: 'Compare suppliers on delivered usable cost, inspect physical samples against specifications, size initial stock responsibly, and track inventory.',
      hi: 'डिलीवरी सहित उपयोगी लागत पर आपूर्तिकर्ताओं की तुलना करें, लिखित विनिर्देश के आधार पर सैंपल जांचें, पहला स्टॉक आकार तय करें और इन्वेंटरी ट्रैक करें।',
    },
    intendedLearner: {
      en: 'Aspiring resellers sourcing physical products from suppliers to sell through their own accounts.',
      hi: 'वे उद्यमी जो आपूर्तिकर्ताओं से भौतिक उत्पाद खरीदकर अपने सेलर अकाउंट से बेचना चाहते हैं।',
    },
    prerequisites: {
      en: 'Recommended after Business Foundations.',
      hi: 'बिज़नेस फ़ाउंडेशन कोर्स के बाद अनुशंसित।',
    },
    businessPath: 'resell',
    languageAvailability: {
      en: 'English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी',
    },
    releaseStatus: 'RECORDING_PENDING',
    releaseStatusLabel: {
      en: 'Available in English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी में उपलब्ध',
    },
    accessAndSupport: {
      en: 'Included in the complete programme bundle or available as a standalone track.',
      hi: 'संपूर्ण प्रोग्राम बंडल या एकल कोर्स ट्रैक में शामिल।',
    },
    practicalAssignments: {
      en: [
        'Side-by-side supplier landed-cost sheet',
        'Sample inspection log with pass/fail/clarify verdicts',
        'Cash-capped first stock purchase calculation',
      ],
      hi: [
        'तुलनात्मक आपूर्तिकर्ता लैंडेड-कॉस्ट शीट',
        'पास/फेल/स्पष्टीकरण के साथ सैंपल निरीक्षण लॉग',
        'नकद-सीमा आधारित पहली स्टॉक खरीद गणना',
      ],
    },
    modules: [
      {
        id: 'C02-M1',
        number: 1,
        title: {
          en: 'Supplier and product validation',
          hi: 'आपूर्तिकर्ता और उत्पाद सत्यापन',
        },
        lessons: [
          {
            id: 'C02-L01',
            title: {
              en: 'Compare suppliers on total cost',
              hi: 'कुल लागत के आधार पर आपूर्तिकर्ताओं की तुलना',
            },
            summary: {
              en: 'Account for freight, defects, lead times, and remedy terms rather than comparing headline unit quotes alone.',
              hi: 'केवल प्रति पीस कीमत के बजाय माल ढुलाई, खराब पीस, डिलीवरी समय और समाधान शर्तों को शामिल करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C02-L02',
            title: {
              en: 'Inspect samples and verify rights',
              hi: 'सैंपल की जांच करें और अधिकार सत्यापित करें',
            },
            summary: {
              en: 'Test function, finish, dimensions, packaging, and image/IP usage rights before paying for bulk stock.',
              hi: 'थोक ऑर्डर से पहले कार्यक्षमता, फिनिश, माप, पैकेजिंग और फोटो/ब्रांड उपयोग अधिकार जांचें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
      {
        id: 'C02-M2',
        number: 2,
        title: {
          en: 'Stock and fulfilment',
          hi: 'स्टॉक और पूर्ति (फुलफिलमेंट)',
        },
        lessons: [
          {
            id: 'C02-L03',
            title: {
              en: 'Size the first inventory purchase',
              hi: 'पहली इन्वेंटरी खरीद का सही आकार तय करें',
            },
            summary: {
              en: 'Deduct emergency cash reserve and freight from test capital before calculating maximum affordable units.',
              hi: 'अधिकतम खरीदने योग्य यूनिट निकालने से पहले परीक्षण पूंजी में से रिज़र्व और ढुलाई घटाएं।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C02-L04',
            title: {
              en: 'Receive, track and replenish stock',
              hi: 'स्टॉक प्राप्त करें, ट्रैक करें और पुनः ऑर्डर करें',
            },
            summary: {
              en: 'Separate defective, allocated, and available units with SKU codes and clear reorder triggers.',
              hi: 'SKU कोड के साथ खराब, आवंटित और उपलब्ध स्टॉक को अलग करें और रीऑर्डर सीमा तय करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
    ],
    relatedArticleIds: ['B04', 'B05', 'B06'],
    relatedChannelSlugs: ['meesho', 'amazon-india', 'whatsapp-selling'],
  },
  {
    id: 'C03',
    slug: 'craft-to-commerce',
    code: 'C03',
    title: {
      en: 'Craft to Commerce',
      hi: 'क्राफ्ट टू कॉमर्स (शिल्प से व्यापार)',
    },
    outcome: {
      en: 'Define your exact maker or sourcing role truthfully, price labour and material waste accurately, present handmade variation clearly, and plan production capacity.',
      hi: 'निर्माता या क्यूरेटर के रूप में अपनी भूमिका स्पष्ट करें, श्रम और अपव्यय की सही कीमत लगाएं, हस्तनिर्मित विविधता को ईमानदारी से दिखाएं और उत्पादन क्षमता की योजना बनाएं।',
    },
    intendedLearner: {
      en: 'Makers creating physical handmade goods and entrepreneurs responsibly sourcing finished crafts from artists.',
      hi: 'स्वयं हस्तनिर्मित उत्पाद बनाने वाले निर्माता और कलाकारों से शिल्प सोर्स करने वाले उद्यमी।',
    },
    prerequisites: {
      en: 'Recommended after Business Foundations.',
      hi: 'बिज़नेस फ़ाउंडेशन कोर्स के बाद अनुशंसित।',
    },
    businessPath: 'craft-to-commerce',
    languageAvailability: {
      en: 'English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी',
    },
    releaseStatus: 'RECORDING_PENDING',
    releaseStatusLabel: {
      en: 'Available in English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी में उपलब्ध',
    },
    accessAndSupport: {
      en: 'Included in the complete programme bundle or available as a standalone track.',
      hi: 'संपूर्ण प्रोग्राम बंडल या एकल कोर्स ट्रैक में शामिल।',
    },
    practicalAssignments: {
      en: [
        'Provenance and maker-attribution record',
        'Handmade labour, waste, and weekly capacity calculator sheet',
        'Natural-light product photography and variation checklist',
      ],
      hi: [
        'उत्पत्ति और निर्माता-श्रेय (प्रोवेनेंस) रिकॉर्ड',
        'हस्तनिर्मित श्रम, अपव्यय और साप्ताहिक क्षमता गणना शीट',
        'प्राकृतिक रोशनी उत्पाद फोटोग्राफी व विविधता चेकलिस्ट',
      ],
    },
    modules: [
      {
        id: 'C03-M1',
        number: 1,
        title: {
          en: 'Product, provenance and costing',
          hi: 'उत्पाद, स्रोत प्रमाण और लागत गणना',
        },
        lessons: [
          {
            id: 'C03-L01',
            title: {
              en: 'Define the craft and your role',
              hi: 'शिल्प और अपनी वास्तविक भूमिका परिभाषित करें',
            },
            summary: {
              en: 'Distinguish self-made items from artist-sourced crafts and verify permission, attribution, and channel rules.',
              hi: 'स्वयं बनाए उत्पादों और कलाकारों से लिए गए शिल्प में अंतर स्पष्ट करें और अनुमति व चैनल नियम जांचें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C03-L02',
            title: {
              en: 'Cost labour, waste and custom work',
              hi: 'श्रम, अपव्यय और कस्टम कार्य की लागत निकालें',
            },
            summary: {
              en: 'Price time per piece, batch setup, offcut waste, and realistic weekly output limits.',
              hi: 'प्रति पीस समय, बैच तैयारी, सामग्री की बर्बादी और व्यावहारिक साप्ताहिक उत्पादन सीमा का मूल्यांकन करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
      {
        id: 'C03-M2',
        number: 2,
        title: {
          en: 'Presentation and production',
          hi: 'प्रस्तुति और उत्पादन योजना',
        },
        lessons: [
          {
            id: 'C03-L03',
            title: {
              en: 'Photograph and describe handmade variation',
              hi: 'हस्तनिर्मित विविधता की फोटो और विवरण तैयार करें',
            },
            summary: {
              en: 'Show true texture, scale references, care details, and honest expectations around natural batch differences.',
              hi: 'प्रामाणिक बनावट, आकार संदर्भ, देखभाल निर्देश और प्राकृतिक अंतर की स्पष्ट जानकारी दें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C03-L04',
            title: {
              en: 'Plan capacity, packaging and dispatch',
              hi: 'क्षमता, पैकेजिंग और डिस्पैच की योजना बनाएं',
            },
            summary: {
              en: 'Align promised dispatch lead times with actual making hours, fragile protection, and post-order follow-through.',
              hi: 'निर्माण के वास्तविक घंटों, सुरक्षित पैकेजिंग और समयबद्ध डिस्पैच वादों में तालमेल बिठाएं।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
    ],
    relatedArticleIds: ['B07', 'B09', 'B15'],
    relatedChannelSlugs: ['etsy', 'social-selling', 'shopify'],
  },
  {
    id: 'C04',
    slug: 'social-media-and-whatsapp',
    code: 'C04',
    title: {
      en: 'Social Media and WhatsApp Selling',
      hi: 'सोशल मीडिया और WhatsApp बिक्री',
    },
    outcome: {
      en: 'Turn buyer questions into structured content, set up a clean WhatsApp product catalogue, confirm orders accurately, and measure enquiry-to-order conversion.',
      hi: 'खरीदार के प्रश्नों को उपयोगी सामग्री में बदलें, स्पष्ट WhatsApp कैटलॉग बनाएं, ऑर्डर की सटीक पुष्टि करें और पूछताछ से ऑर्डर रूपांतरण मापें।',
    },
    intendedLearner: {
      en: 'Sellers starting with direct buyer conversations before or alongside marketplace accounts.',
      hi: 'सीधे ग्राहकों से संवाद करके शुरुआत करने वाले विक्रेता।',
    },
    prerequisites: {
      en: 'Recommended after Business Foundations.',
      hi: 'बिज़नेस फ़ाउंडेशन कोर्स के बाद अनुशंसित।',
    },
    businessPath: 'both',
    languageAvailability: {
      en: 'English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी',
    },
    releaseStatus: 'RECORDING_PENDING',
    releaseStatusLabel: {
      en: 'Available in English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी में उपलब्ध',
    },
    accessAndSupport: {
      en: 'Included in the complete programme bundle or individual course track.',
      hi: 'संपूर्ण प्रोग्राम बंडल या एकल कोर्स ट्रैक में शामिल।',
    },
    practicalAssignments: {
      en: [
        'Seven-post buyer-question content mini-calendar',
        'Standardized WhatsApp order-confirmation message & register',
      ],
      hi: [
        'खरीदार-प्रश्न आधारित सात-पोस्ट सामग्री मिनी-कैलेंडर',
        'मानकीकृत WhatsApp ऑर्डर पुष्टि संदेश और रजिस्टर',
      ],
    },
    modules: [
      {
        id: 'C04-M1',
        number: 1,
        title: {
          en: 'Build the offer and enquiry path',
          hi: 'ऑफ़र और पूछताछ मार्ग तैयार करें',
        },
        lessons: [
          {
            id: 'C04-L01',
            title: {
              en: 'Create a profile and content-to-enquiry path',
              hi: 'प्रोफ़ाइल और सामग्री-से-पूछताछ मार्ग बनाएं',
            },
            summary: {
              en: 'Answer size, material, pack contents, and ordering steps clearly so prospects know how to enquire.',
              hi: 'आकार, सामग्री, पैक विवरण और ऑर्डर प्रक्रिया स्पष्ट करें ताकि ग्राहक आसानी से पूछताछ कर सकें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C04-L02',
            title: {
              en: 'Build a useful WhatsApp catalogue',
              hi: 'एक उपयोगी WhatsApp कैटलॉग तैयार करें',
            },
            summary: {
              en: 'Include product codes, dimensions, single-unit prices, delivery charges, and dispatch timelines.',
              hi: 'प्रोडक्ट कोड, माप, प्रति पीस मूल्य, डिलीवरी शुल्क और डिस्पैच समय शामिल करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
      {
        id: 'C04-M2',
        number: 2,
        title: {
          en: 'Convert and serve customers',
          hi: 'ग्राहकों को बदलें और सेवा दें',
        },
        lessons: [
          {
            id: 'C04-L03',
            title: {
              en: 'Handle enquiries and confirm orders',
              hi: 'पूछताछ संभालें और ऑर्डर की पुष्टि करें',
            },
            summary: {
              en: 'Quote total payable amounts, verify bank receipts independently of screenshots, and assign order IDs.',
              hi: 'कुल देय राशि बताएं, केवल स्क्रीनशॉट के बजाय बैंक रिकॉर्ड से भुगतान जांचें और ऑर्डर ID बनाएं।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C04-L04',
            title: {
              en: 'Serve customers and measure conversion',
              hi: 'ग्राहक सेवा दें और रूपांतरण मापें',
            },
            summary: {
              en: 'Track views, enquiries, confirmed orders, and dispatch milestones without spammy follow-ups.',
              hi: 'बिना अनावश्यक संदेशों के व्यू, पूछताछ, पुष्ट ऑर्डर और डिस्पैच स्थिति ट्रैक करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
    ],
    relatedArticleIds: ['B08', 'B10', 'B03'],
    relatedChannelSlugs: ['whatsapp-selling', 'social-selling'],
  },
  {
    id: 'C05',
    slug: 'meesho-selling',
    code: 'C05',
    title: {
      en: 'Meesho Selling',
      hi: 'Meesho पर बिक्री',
    },
    outcome: {
      en: 'Verify GSTIN or eligible non-GST registration routes accurately, audit catalogue consistency across titles, photos and pack quantities, and reconcile Meesho settlements.',
      hi: 'GSTIN या पात्र नॉन-GST पंजीकरण मार्ग की जांच करें, शीर्षक, फोटो और पैक मात्रा में कैटलॉग संगति जांचें और Meesho सेटलमेंट का मिलान करें।',
    },
    intendedLearner: {
      en: 'Value-focused Indian resellers and makers evaluating Meesho as a primary marketplace.',
      hi: 'Meesho को प्राथमिक मार्केटप्लेस के रूप में देख रहे भारतीय विक्रेता।',
    },
    prerequisites: {
      en: 'Recommended after Business Foundations.',
      hi: 'बिज़नेस फ़ाउंडेशन कोर्स के बाद अनुशंसित।',
    },
    businessPath: 'both',
    languageAvailability: {
      en: 'English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी',
    },
    releaseStatus: 'RECORDING_PENDING',
    releaseStatusLabel: {
      en: 'Available in English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी में उपलब्ध',
    },
    accessAndSupport: {
      en: 'Included in the complete programme bundle or individual course track.',
      hi: 'संपूर्ण प्रोग्राम बंडल या एकल कोर्स ट्रैक में शामिल।',
    },
    practicalAssignments: {
      en: [
        'Meesho seller route & pickup readiness verification sheet',
        'Pre-publish catalogue mismatch audit',
      ],
      hi: [
        'Meesho विक्रेता मार्ग और पिकअप तैयारी सत्यापन शीट',
        'प्रकाशन-पूर्व कैटलॉग विसंगति ऑडिट',
      ],
    },
    modules: [
      {
        id: 'C05-M1',
        number: 1,
        title: {
          en: 'Account readiness and catalogue',
          hi: 'अकाउंट तैयारी और कैटलॉग',
        },
        lessons: [
          {
            id: 'C05-L01',
            title: {
              en: 'Check eligibility and prepare onboarding',
              hi: 'पात्रता जांचें और ऑनबोर्डिंग की तैयारी करें',
            },
            summary: {
              en: 'Distinguish GSTIN routes from state-restricted Enrolment ID/UIN routes and prepare bank and pickup details.',
              hi: 'GSTIN और राज्य-सीमित Enrolment ID/UIN मार्गों में अंतर समझें और बैंक व पिकअप विवरण तैयार रखें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C05-L02',
            title: {
              en: 'Prepare and quality-check a catalogue',
              hi: 'कैटलॉग तैयार करें और गुणवत्ता जांचें',
            },
            summary: {
              en: 'Ensure title, gallery images, pack quantity, stock count, and price all describe the exact same physical offer.',
              hi: 'सुनिश्चित करें कि शीर्षक, फोटो, पैक मात्रा, स्टॉक और कीमत एक ही वास्तविक उत्पाद दर्शाते हैं।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
      {
        id: 'C05-M2',
        number: 2,
        title: {
          en: 'Orders and performance',
          hi: 'ऑर्डर और प्रदर्शन सुधार',
        },
        lessons: [
          {
            id: 'C05-L03',
            title: {
              en: 'Process an order and handle exceptions',
              hi: 'ऑर्डर प्रोसेस करें और अपवाद संभालें',
            },
            summary: {
              en: 'Pack accurately against labels, manage dispatch SLAs, and document pickup or QC issues.',
              hi: 'लेबल के अनुसार सटीक पैकिंग करें, डिस्पैच समयसीमा संभालें और पिकअप/QC समस्याओं का रिकॉर्ड रखें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C05-L04',
            title: {
              en: 'Reconcile settlements and improve one metric',
              hi: 'सेटलमेंट मिलान करें और एक मुख्य मीट्रिक सुधारें',
            },
            summary: {
              en: 'Match order payouts against return deductions and run targeted listing corrections.',
              hi: 'रिटर्न कटौती के साथ ऑर्डर भुगतान का मिलान करें और लक्षित लिस्टिंग सुधार करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
    ],
    relatedArticleIds: ['B11', 'B12', 'B19'],
    relatedChannelSlugs: ['meesho'],
  },
  {
    id: 'C06',
    slug: 'amazon-india-selling',
    code: 'C06',
    title: {
      en: 'Amazon India Selling',
      hi: 'Amazon India पर बिक्री',
    },
    outcome: {
      en: 'Decide accurately between matching an existing catalogue ASIN and creating a new product detail page, compare fulfilment options, and monitor seller health.',
      hi: 'मौजूदा कैटलॉग उत्पाद से मिलान करने और नया विवरण पृष्ठ बनाने में सही निर्णय लें, फुलफिलमेंट विकल्पों की तुलना करें और अकाउंट स्वास्थ्य ट्रैक करें।',
    },
    intendedLearner: {
      en: 'Sellers preparing compliant product listings and unit-economics models for Amazon.in.',
      hi: 'Amazon.in के लिए सटीक उत्पाद लिस्टिंग और लागत मॉडल तैयार करने वाले विक्रेता।',
    },
    prerequisites: {
      en: 'Recommended after Business Foundations.',
      hi: 'बिज़नेस फ़ाउंडेशन कोर्स के बाद अनुशंसित।',
    },
    businessPath: 'both',
    languageAvailability: {
      en: 'English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी',
    },
    releaseStatus: 'RECORDING_PENDING',
    releaseStatusLabel: {
      en: 'Available in English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी में उपलब्ध',
    },
    accessAndSupport: {
      en: 'Included in the complete programme bundle or individual course track.',
      hi: 'संपूर्ण प्रोग्राम बंडल या एकल कोर्स ट्रैक में शामिल।',
    },
    practicalAssignments: {
      en: [
        'Exact-match vs new-listing decision log',
        'Amazon India product detail page outline & fee worksheet',
      ],
      hi: [
        'एक्ज़ैक्ट-मैच बनाम नई लिस्टिंग निर्णय लॉग',
        'Amazon India उत्पाद विवरण पृष्ठ रूपरेखा और शुल्क वर्कशीट',
      ],
    },
    modules: [
      {
        id: 'C06-M1',
        number: 1,
        title: {
          en: 'Readiness and product detail',
          hi: 'तैयारी और उत्पाद विवरण पृष्ठ',
        },
        lessons: [
          {
            id: 'C06-L01',
            title: {
              en: 'Seller readiness and existing versus new products',
              hi: 'विक्रेता तैयारी और मौजूदा बनाम नया उत्पाद',
            },
            summary: {
              en: 'Verify brand, model, pack size, and GTIN/exemption rules before attaching to or creating a listing.',
              hi: 'लिस्टिंग से जुड़ने या नई बनाने से पहले ब्रांड, मॉडल, पैक संख्या और GTIN/छूट नियम जांचें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C06-L02',
            title: {
              en: 'Write a useful product detail page',
              hi: 'उपयोगी उत्पाद विवरण पृष्ठ लिखें',
            },
            summary: {
              en: 'Structure factual titles, dimension clarity, care notes, and authentic photography.',
              hi: 'तथ्यात्मक शीर्षक, स्पष्ट माप, देखभाल जानकारी और प्रामाणिक फोटो व्यवस्थित करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
      {
        id: 'C06-M2',
        number: 2,
        title: {
          en: 'Fulfilment and improvement',
          hi: 'फुलफिलमेंट और सुधार',
        },
        lessons: [
          {
            id: 'C06-L03',
            title: {
              en: 'Compare fulfilment and unit economics',
              hi: 'फुलफिलमेंट और प्रति यूनिट अर्थशास्त्र की तुलना',
            },
            summary: {
              en: 'Evaluate self-ship, Easy Ship, and FBA implications on weight slabs, fees, and cash.',
              hi: 'सेल्फ-शिप, ईज़ी शिप और FBA के वजन स्लैब, शुल्क और नकद प्रभाव का तुलनात्मक आकलन करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C06-L04',
            title: {
              en: 'Monitor orders, account health and discovery',
              hi: 'ऑर्डर, अकाउंट स्वास्थ्य और खोज योग्यता ट्रैक करें',
            },
            summary: {
              en: 'Track defect metrics, return reasons, and buyer search relevance systematically.',
              hi: 'दोष दर, रिटर्न कारण और खरीदार खोज प्रासंगिकता की नियमित निगरानी करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
    ],
    relatedArticleIds: ['B17', 'B02', 'B20'],
    relatedChannelSlugs: ['amazon-india'],
  },
  {
    id: 'C07',
    slug: 'own-store-shopify-and-wix',
    code: 'C07',
    title: {
      en: 'Own Store, Shopify and Wix',
      hi: 'अपना ऑनलाइन स्टोर: Shopify और Wix',
    },
    outcome: {
      en: 'Compare Shopify and Wix on real product setup, Indian payment gateway support, shipping rules, and recurring costs—then test a complete store before opening.',
      hi: 'उत्पाद सेटअप, भारतीय पेमेंट गेटवे उपलब्धता, शिपिंग और आवर्ती लागत पर Shopify और Wix की तुलना करें और खोलने से पहले पूरा चेकआउट टेस्ट करें।',
    },
    intendedLearner: {
      en: 'Entrepreneurs building an independent brand storefront alongside or after marketplace validation.',
      hi: 'अपना स्वतंत्र ब्रांड स्टोरफ़्रंट बनाने की तैयारी कर रहे उद्यमी।',
    },
    prerequisites: {
      en: 'Recommended after Business Foundations.',
      hi: 'बिज़नेस फ़ाउंडेशन कोर्स के बाद अनुशंसित।',
    },
    businessPath: 'both',
    languageAvailability: {
      en: 'English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी',
    },
    releaseStatus: 'RECORDING_PENDING',
    releaseStatusLabel: {
      en: 'Available in English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी में उपलब्ध',
    },
    accessAndSupport: {
      en: 'Included in the complete programme bundle or individual course track.',
      hi: 'संपूर्ण प्रोग्राम बंडल या एकल कोर्स ट्रैक में शामिल।',
    },
    practicalAssignments: {
      en: [
        'Side-by-side 6-product pilot test on candidate store platforms',
        'Pre-launch 6-case checkout & fulfilment test log',
      ],
      hi: [
        'चयनित प्लेटफ़ॉर्म पर 6-उत्पाद पायलट तुलना परीक्षण',
        'लॉन्च-पूर्व 6-चरणीय चेकआउट और पूर्ति परीक्षण लॉग',
      ],
    },
    modules: [
      {
        id: 'C07-M1',
        number: 1,
        title: {
          en: 'Plan the owned-store experience',
          hi: 'अपने स्टोर के अनुभव की योजना बनाएं',
        },
        lessons: [
          {
            id: 'C07-L01',
            title: {
              en: 'Choose a platform and map the store',
              hi: 'प्लेटफ़ॉर्म चुनें और स्टोर संरचना बनाएं',
            },
            summary: {
              en: 'Compare subscriptions, third-party payment fees, gateway availability in India, and maintenance effort.',
              hi: 'सदस्यता शुल्क, पेमेंट गेटवे उपलब्धता, लेनदेन शुल्क और रखरखाव प्रयास की तुलना करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C07-L02',
            title: {
              en: 'Write product pages and customer information',
              hi: 'उत्पाद पृष्ठ और ग्राहक जानकारी लिखें',
            },
            summary: {
              en: 'Prepare shipping timelines, return policies, contact channels, and variant clarity.',
              hi: 'शिपिंग समयसीमा, रिटर्न नीति, संपर्क विवरण और उत्पाद विकल्प स्पष्ट करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
      {
        id: 'C07-M2',
        number: 2,
        title: {
          en: 'Build on Shopify',
          hi: 'Shopify पर स्टोर निर्माण',
        },
        lessons: [
          {
            id: 'C07-L03',
            title: {
              en: 'Shopify build: product, collection and navigation',
              hi: 'Shopify निर्माण: उत्पाद, संग्रह और नेविगेशन',
            },
            summary: {
              en: 'Configure variants, inventory tracking, clean collections, and mobile navigation.',
              hi: 'वेरिएंट, इन्वेंटरी ट्रैकिंग, कलेक्शन और मोबाइल नेविगेशन सेट करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C07-L04',
            title: {
              en: 'Shopify checkout, shipping and launch test',
              hi: 'Shopify चेकआउट, शिपिंग और लॉन्च टेस्ट',
            },
            summary: {
              en: 'Run test orders covering success, failure, stock deduction, and refund simulation.',
              hi: 'सफल, असफल, स्टॉक कटौती और रिफंड सिमुलेशन सहित टेस्ट ऑर्डर चलाएं।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
      {
        id: 'C07-M3',
        number: 3,
        title: {
          en: 'Build on Wix',
          hi: 'Wix पर स्टोर निर्माण',
        },
        lessons: [
          {
            id: 'C07-L05',
            title: {
              en: 'Wix build: catalogue, pages and mobile layout',
              hi: 'Wix निर्माण: कैटलॉग, पृष्ठ और मोबाइल लेआउट',
            },
            summary: {
              en: 'Set up catalogue variants, clear product information pages, and responsive mobile checks.',
              hi: 'कैटलॉग वेरिएंट, स्पष्ट जानकारी पृष्ठ और मोबाइल लेआउट की जांच करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C07-L06',
            title: {
              en: 'Wix checkout and first-traffic launch plan',
              hi: 'Wix चेकआउट और शुरुआती ट्रैफ़िक योजना',
            },
            summary: {
              en: 'Verify payment provider test mode and plan realistic traffic sources since websites do not create visitors automatically.',
              hi: 'पेमेंट प्रोवाइडर टेस्ट मोड जांचें और वास्तविक ट्रैफ़िक स्रोतों की योजना बनाएं क्योंकि वेबसाइट अपने आप विज़िटर नहीं लाती।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
    ],
    relatedArticleIds: ['B13', 'B14', 'B03'],
    relatedChannelSlugs: ['shopify', 'wix'],
  },
  {
    id: 'C08',
    slug: 'etsy-selling',
    code: 'C08',
    title: {
      en: 'Etsy Selling',
      hi: 'Etsy पर बिक्री',
    },
    outcome: {
      en: 'Check product and maker eligibility against Etsy’s creativity categories before investing, verify India-based onboarding and payment requirements, and price international orders safely.',
      hi: 'निवेश से पहले Etsy की रचनात्मकता श्रेणियों के विरुद्ध उत्पाद व भूमिका की पात्रता जांचें, भारत-आधारित ऑनबोर्डिंग/भुगतान शर्तें सत्यापित करें और अंतर्राष्ट्रीय कीमत तय करें।',
    },
    intendedLearner: {
      en: 'Makers and designers exploring Etsy for original handmade or qualifying designed products.',
      hi: 'मूल हस्तनिर्मित या डिज़ाइन किए गए उत्पादों के लिए Etsy पर विचार कर रहे निर्माता।',
    },
    prerequisites: {
      en: 'Business Foundations and Craft to Commerce recommended.',
      hi: 'बिज़नेस फ़ाउंडेशन और क्राफ्ट टू कॉमर्स की अनुशंसा।',
    },
    businessPath: 'craft-to-commerce',
    languageAvailability: {
      en: 'English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी',
    },
    releaseStatus: 'RECORDING_PENDING',
    releaseStatusLabel: {
      en: 'Available in English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी में उपलब्ध',
    },
    accessAndSupport: {
      en: 'Included in the complete programme bundle or individual course track.',
      hi: 'संपूर्ण प्रोग्राम बंडल या एकल कोर्स ट्रैक में शामिल।',
    },
    practicalAssignments: {
      en: [
        'Etsy Made / Designed / Handpicked / Sourced go/no-go check',
        'Dated India-shop onboarding & international shipping cost sheet',
      ],
      hi: [
        'Etsy मेड / डिज़ाइन्ड / हैंडपिक्ड / सोर्स्ड पात्रता जांच शीट',
        'दिनांकित भारत-दुकान ऑनबोर्डिंग और अंतर्राष्ट्रीय शिपिंग लागत शीट',
      ],
    },
    modules: [
      {
        id: 'C08-M1',
        number: 1,
        title: {
          en: 'Eligibility and shop readiness',
          hi: 'पात्रता और शॉप तैयारी',
        },
        lessons: [
          {
            id: 'C08-L01',
            title: {
              en: 'Check product eligibility and maker role',
              hi: 'उत्पाद पात्रता और निर्माता भूमिका जांचें',
            },
            summary: {
              en: 'Verify that artist-sourced finished goods are not assumed eligible; distinguish production partners from wholesale.',
              hi: 'स्पष्ट करें कि कलाकार-निर्मित तैयार माल स्वतः पात्र नहीं होता; प्रोडक्शन पार्टनर और थोक खरीद में अंतर समझें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C08-L02',
            title: {
              en: 'Prepare an India-based shop and payments',
              hi: 'भारत-आधारित शॉप और भुगतान की तैयारी',
            },
            summary: {
              en: 'Verify current Etsy India onboarding, GSTIN, Payoneer, setup fees, and currency conversion directly against live policy.',
              hi: 'लाइव नीति से Etsy इंडिया ऑनबोर्डिंग, GSTIN, Payoneer, सेटअप शुल्क और मुद्रा रूपांतरण सत्यापित करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
      {
        id: 'C08-M2',
        number: 2,
        title: {
          en: 'Listing and international service',
          hi: 'लिस्टिंग और अंतर्राष्ट्रीय ग्राहक सेवा',
        },
        lessons: [
          {
            id: 'C08-L03',
            title: {
              en: 'Build a listing around buyer intent',
              hi: 'खरीदार के उद्देश्य के अनुसार लिस्टिंग बनाएं',
            },
            summary: {
              en: 'Write honest gift, size, material, and provenance descriptions with clear processing times.',
              hi: 'स्पष्ट प्रोसेसिंग समय के साथ उपहार, आकार, सामग्री और उत्पत्ति का प्रामाणिक विवरण लिखें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C08-L04',
            title: {
              en: 'Price and fulfil an international Etsy order',
              hi: 'अंतर्राष्ट्रीय Etsy ऑर्डर की कीमत और पूर्ति',
            },
            summary: {
              en: 'Model cross-border courier costs, FX spreads, customs expectations, and return policies.',
              hi: 'सीमा-पार कूरियर लागत, मुद्रा रूपांतरण, कस्टम जानकारी और रिटर्न नीति का मॉडल बनाएं।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
    ],
    relatedArticleIds: ['B15', 'B16', 'B09'],
    relatedChannelSlugs: ['etsy'],
  },
  {
    id: 'C09',
    slug: 'amazon-global-selling',
    code: 'C09',
    title: {
      en: 'Amazon Global Selling',
      hi: 'Amazon Global Selling (अंतर्राष्ट्रीय बिक्री)',
    },
    outcome: {
      en: 'Scope one export market and product carefully, map Indian export and destination import duties/compliance, and model international return cash exposure before piloting.',
      hi: 'एक निर्यात बाजार और उत्पाद चुनें, भारतीय निर्यात व गंतव्य आयात नियमों की पहचान करें और पायलट से पहले अंतर्राष्ट्रीय रिटर्न नकद जोखिम की गणना करें।',
    },
    intendedLearner: {
      en: 'Prepared sellers evaluating structured cross-border ecommerce after validating unit economics.',
      hi: 'सशक्त लागत मॉडल के बाद सीमा-पार ई-कॉमर्स पर विचार कर रहे विक्रेता।',
    },
    prerequisites: {
      en: 'Business Foundations and Amazon India Basics recommended; best after domestic validation.',
      hi: 'बिज़नेस फ़ाउंडेशन और अमेज़न इंडिया मूल बातें अनुशंसित; घरेलू परीक्षण के बाद उपयुक्त।',
    },
    businessPath: 'both',
    languageAvailability: {
      en: 'English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी',
    },
    releaseStatus: 'RECORDING_PENDING',
    releaseStatusLabel: {
      en: 'Available in English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी में उपलब्ध',
    },
    accessAndSupport: {
      en: 'Included in the complete programme bundle or individual course track.',
      hi: 'संपूर्ण प्रोग्राम बंडल या एकल कोर्स ट्रैक में शामिल।',
    },
    practicalAssignments: {
      en: [
        'One-market responsibility matrix (account, export, import, after-sales)',
        'International return-exposure sensitivity worksheet',
      ],
      hi: [
        'एक-बाज़ार उत्तरदायित्व मैट्रिक्स (अकाउंट, निर्यात, आयात, बिक्री-पश्चात)',
        'अंतर्राष्ट्रीय रिटर्न-जोखिम संवेदनशीलता वर्कशीट',
      ],
    },
    modules: [
      {
        id: 'C09-M1',
        number: 1,
        title: {
          en: 'Market and export readiness',
          hi: 'बाज़ार और निर्यात तैयारी',
        },
        lessons: [
          {
            id: 'C09-L01',
            title: {
              en: 'Choose one destination market',
              hi: 'एक गंतव्य बाज़ार चुनें',
            },
            summary: {
              en: 'Avoid launching across multiple countries simultaneously; pick one product, market, and route.',
              hi: 'एक साथ कई देशों में लॉन्च करने से बचें; एक उत्पाद, एक देश और एक मार्ग चुनें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C09-L02',
            title: {
              en: 'Map export, import and account requirements',
              hi: 'निर्यात, आयात और अकाउंट आवश्यकताओं का नक्शा बनाएं',
            },
            summary: {
              en: 'Check IEC rules/exemptions, destination compliance, labelling, and marketplace documentation.',
              hi: 'IEC नियम/छूट, गंतव्य अनुपालन, लेबलिंग और मार्केटप्लेस दस्तावेज़ जांचें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
      {
        id: 'C09-M2',
        number: 2,
        title: {
          en: 'International offer and operations',
          hi: 'अंतर्राष्ट्रीय ऑफ़र और संचालन',
        },
        lessons: [
          {
            id: 'C09-L03',
            title: {
              en: 'Model international fulfilment and cash exposure',
              hi: 'अंतर्राष्ट्रीय पूर्ति और नकद जोखिम का मॉडल बनाएं',
            },
            summary: {
              en: 'See how a ₹1,200 return-logistics cost can wipe out a ₹1,150 initial order contribution.',
              hi: 'समझें कि ₹1,200 की रिटर्न लॉजिस्टिक्स लागत कैसे ₹1,150 के प्रारंभिक योगदान को पार कर सकती है।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C09-L04',
            title: {
              en: 'Localise the offer and design a pilot',
              hi: 'ऑफ़र का स्थानीयकरण करें और पायलट डिज़ाइन करें',
            },
            summary: {
              en: 'Adapt sizing units, buyer expectations, and bounded pilot inventory before scaling.',
              hi: 'माप इकाइयों और खरीदार अपेक्षाओं के अनुसार ऑफ़र ढालें और सीमित पायलट चलाएं।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
    ],
    relatedArticleIds: ['B18', 'B16', 'B02'],
    relatedChannelSlugs: ['amazon-global'],
  },
  {
    id: 'C10',
    slug: 'operations-and-growth',
    code: 'C10',
    title: {
      en: 'Operations and Growth',
      hi: 'ऑपरेशंस और ग्रोथ (संचालन व विकास)',
    },
    outcome: {
      en: 'Run a disciplined daily order and stock routine, reconcile sales vs settlements vs bank cash, learn accurately from return rates, and present a 30-day operating dossier.',
      hi: 'दैनिक ऑर्डर और स्टॉक दिनचर्या चलाएं, बिक्री, सेटलमेंट और बैंक नकद का मिलान करें, रिटर्न दर से सटीक सुधार करें और 30-दिन का संचालन डोज़ियर तैयार करें।',
    },
    intendedLearner: {
      en: 'Active early-stage sellers building repeatable operational hygiene and measured improvements.',
      hi: 'नियमित संचालन अनुशासन और मापने योग्य सुधार बनाने वाले शुरुआती विक्रेता।',
    },
    prerequisites: {
      en: 'Business Foundations plus at least one selling channel track.',
      hi: 'बिज़नेस फ़ाउंडेशन और कम से कम एक बिक्री चैनल ट्रैक।',
    },
    businessPath: 'both',
    languageAvailability: {
      en: 'English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी',
    },
    releaseStatus: 'RECORDING_PENDING',
    releaseStatusLabel: {
      en: 'Available in English and Hindi',
      hi: 'अंग्रेज़ी और हिंदी में उपलब्ध',
    },
    accessAndSupport: {
      en: 'Included in the complete programme bundle or individual course track.',
      hi: 'संपूर्ण प्रोग्राम बंडल या एकल कोर्स ट्रैक में शामिल।',
    },
    practicalAssignments: {
      en: [
        'Linked weekly sales, settlement, and bank cash ledger',
        '30-day return-rate learning log and launch dossier',
      ],
      hi: [
        'लिंक्ड साप्ताहिक बिक्री, सेटलमेंट और बैंक नकद खाता',
        '30-दिवसीय रिटर्न-दर सुधार लॉग और लॉन्च डोज़ियर',
      ],
    },
    modules: [
      {
        id: 'C10-M1',
        number: 1,
        title: {
          en: 'Control orders and cash',
          hi: 'ऑर्डर और नकद नियंत्रण',
        },
        lessons: [
          {
            id: 'C10-L01',
            title: {
              en: 'Run a daily order and stock routine',
              hi: 'दैनिक ऑर्डर और स्टॉक दिनचर्या चलाएं',
            },
            summary: {
              en: 'Prevent overselling, missed dispatches, and unlogged enquiries with a 20-minute daily checklist.',
              hi: 'दैनिक चेकलिस्ट के साथ ओवरसेलिंग, देरी से डिस्पैच और छूटी पूछताछ से बचें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C10-L02',
            title: {
              en: 'Reconcile cash, refunds and business contribution',
              hi: 'नकद, रिफंड और व्यापार योगदान का मिलान करें',
            },
            summary: {
              en: 'Track why ₹5,000 gross sales can yield ₹1,000 simplified operating result yet only ₹200 uncommitted cash.',
              hi: 'समझें कि ₹5,000 सकल बिक्री और ₹1,000 परिचालन परिणाम के बावजूद बैंक में केवल ₹200 मुक्त नकद क्यों बच सकता है।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
      {
        id: 'C10-M2',
        number: 2,
        title: {
          en: 'Improve and launch responsibly',
          hi: 'जिम्मेदारी से सुधारें और आगे बढ़ें',
        },
        lessons: [
          {
            id: 'C10-L03',
            title: {
              en: 'Handle returns and run a measured improvement',
              hi: 'रिटर्न संभालें और मापा हुआ सुधार करें',
            },
            summary: {
              en: 'Compare return rates (e.g., 4/100 = 4% vs 3/50 = 6%) across comparable listing versions before changing offers.',
              hi: 'सुधार से पहले तुलनीय ऑर्डर समूहों पर रिटर्न प्रतिशत (जैसे 4/100 = 4% बनाम 3/50 = 6%) की जांच करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
          {
            id: 'C10-L04',
            title: {
              en: 'Present the launch dossier and next 30 days',
              hi: 'लॉन्च डोज़ियर और अगले 30 दिन प्रस्तुत करें',
            },
            summary: {
              en: 'Review actual evidence, margin reality, and operational capacity to choose your next 30-day priority.',
              hi: 'वास्तविक प्रमाण, मार्जिन और कार्यक्षमता के आधार पर अगले 30 दिनों की प्राथमिकता तय करें।',
            },
            formatStatus: 'WRITTEN_PREPARED',
          },
        ],
      },
    ],
    relatedArticleIds: ['B19', 'B20', 'B02'],
    relatedChannelSlugs: ['meesho', 'amazon-india', 'shopify'],
  },
];
