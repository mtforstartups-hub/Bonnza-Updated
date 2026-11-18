import type { EmailTemplateRecord, EmailTemplateCode } from '../db/schema';
import type { Locale } from '../domain/types';

export const SEEDED_EMAIL_TEMPLATES: EmailTemplateRecord[] = [
  {
    code: 'WEBINAR_REGISTRATION_STARTED',
    name: '1. Webinar Registration Started',
    subject: {
      en: 'Registration saved ({{registrationReference}}) — {{sessionTitle}}',
      hi: 'पंजीकरण सुरक्षित ({{registrationReference}}) — {{sessionTitle}}',
    },
    body: {
      en: 'Hello {{fullName}}, your registration draft ({{registrationReference}}) for {{sessionTitle}} on 5 December 2026 ({{sessionTimeIst}}) is saved. Your seat will be confirmed once payment verification completes.',
      hi: 'नमस्ते {{fullName}}, 5 दिसंबर 2026 ({{sessionTimeIst}}) को {{sessionTitle}} के लिए आपका पंजीकरण ड्राफ्ट ({{registrationReference}}) सुरक्षित कर लिया गया है। भुगतान सत्यापन पूरा होने पर आपकी सीट पक्की होगी।',
    },
    updatedAt: '2026-11-16T00:00:00.000Z',
  },
  {
    code: 'PAYMENT_PENDING_REMINDER',
    name: '2. Payment Pending / Verification in Progress',
    subject: {
      en: 'Payment verification pending for order {{orderNumber}}',
      hi: 'ऑर्डर {{orderNumber}} के लिए भुगतान सत्यापन प्रतीक्षारत है',
    },
    body: {
      en: 'Hello {{fullName}}, we are awaiting server-side confirmation from Razorpay for order {{orderNumber}} (₹299). Please do not pay twice while verification is in progress.',
      hi: 'नमस्ते {{fullName}}, हम ऑर्डर {{orderNumber}} (₹299) के लिए Razorpay से सर्वर-साइड पुष्टि की प्रतीक्षा कर रहे हैं। कृपया सत्यापन के दौरान दोबारा भुगतान न करें।',
    },
    updatedAt: '2026-11-16T00:00:00.000Z',
  },
  {
    code: 'PAYMENT_CONFIRMED_RECEIPT',
    name: '3. Payment Confirmed & Receipt Summary',
    subject: {
      en: 'Confirmed: Your Bonnza workshop seat ({{registrationReference}})',
      hi: 'पुष्टि की गई: आपकी Bonnza वर्कशॉप सीट ({{registrationReference}})',
    },
    body: {
      en: 'Hello {{fullName}}, your payment of ₹299 (Order {{orderNumber}}, Receipt {{receiptNumber}}) has been verified. Your seat for {{sessionTitle}} on 5 December 2026 ({{sessionTimeIst}}) is confirmed.',
      hi: 'नमस्ते {{fullName}}, ₹299 का आपका भुगतान (ऑर्डर {{orderNumber}}, रसीद {{receiptNumber}}) सत्यापित हो गया है। 5 दिसंबर 2026 ({{sessionTimeIst}}) को {{sessionTitle}} के लिए आपकी सीट पक्की हो गई है।',
    },
    updatedAt: '2026-11-16T00:00:00.000Z',
  },
  {
    code: 'WEBINAR_JOINING_INSTRUCTIONS',
    name: '4. Protected Webinar Joining Instructions',
    subject: {
      en: 'Joining instructions for {{sessionTitle}} ({{registrationReference}})',
      hi: '{{sessionTitle}} में जुड़ने के निर्देश ({{registrationReference}})',
    },
    body: {
      en: 'Hello {{fullName}}, here are your private joining details for {{sessionTitle}} on 5 December 2026 ({{sessionTimeIst}}). Please join 10 minutes early and do not share your attendee access link publicly.',
      hi: 'नमस्ते {{fullName}}, 5 दिसंबर 2026 ({{sessionTimeIst}}) को {{sessionTitle}} में शामिल होने का निजी विवरण यहाँ दिया गया है। कृपया 10 मिनट पहले जुड़ें और अपना लिंक सार्वजनिक रूप से साझा न करें।',
    },
    updatedAt: '2026-11-16T00:00:00.000Z',
  },
  {
    code: 'REMINDER_24H',
    name: '5. 24-Hour Session Reminder',
    subject: {
      en: 'Reminder: Your Bonnza live workshop is tomorrow ({{sessionTimeIst}})',
      hi: 'अनुस्मारक: आपकी Bonnza लाइव वर्कशॉप कल है ({{sessionTimeIst}})',
    },
    body: {
      en: 'Hello {{fullName}}, your live workshop {{sessionTitle}} with Shubham Chaturvedi takes place tomorrow, 5 December 2026 at {{sessionTimeIst}}. Keep a notebook ready.',
      hi: 'नमस्ते {{fullName}}, शुभम चतुर्वेदी के साथ आपकी लाइव वर्कशॉप {{sessionTitle}} कल, 5 दिसंबर 2026 को {{sessionTimeIst}} बजे होगी। कृपया एक नोटबुक तैयार रखें।',
    },
    updatedAt: '2026-11-16T00:00:00.000Z',
  },
  {
    code: 'REMINDER_2H',
    name: '6. 2-Hour Session Reminder',
    subject: {
      en: 'Starting in 2 hours: {{sessionTitle}} ({{sessionTimeIst}})',
      hi: '2 घंटे में शुरू: {{sessionTitle}} ({{sessionTimeIst}})',
    },
    body: {
      en: 'Hello {{fullName}}, we start in 2 hours ({{sessionTimeIst}}). Use your verified registration reference {{registrationReference}} to access the session.',
      hi: 'नमस्ते {{fullName}}, सत्र 2 घंटे में ({{sessionTimeIst}}) शुरू होगा। सत्र से जुड़ने के लिए अपने पंजीकरण संदर्भ {{registrationReference}} का उपयोग करें।',
    },
    updatedAt: '2026-11-16T00:00:00.000Z',
  },
  {
    code: 'REMINDER_15M',
    name: '7. 15-Minute Session Reminder',
    subject: {
      en: 'Starting in 15 minutes: Join {{sessionTitle}} now',
      hi: '15 मिनट में शुरू: अभी {{sessionTitle}} से जुड़ें',
    },
    body: {
      en: 'Hello {{fullName}}, the workshop room is open for {{sessionTitle}} ({{sessionTimeIst}}). Click your private attendee link to join.',
      hi: 'नमस्ते {{fullName}}, {{sessionTitle}} ({{sessionTimeIst}}) के लिए वर्कशॉप रूम खुल गया है। जुड़ने के लिए अपने निजी लिंक का उपयोग करें।',
    },
    updatedAt: '2026-11-16T00:00:00.000Z',
  },
  {
    code: 'SESSION_RESCHEDULED',
    name: '8. Session Rescheduled Notice',
    subject: {
      en: 'Important schedule update for {{sessionTitle}} ({{registrationReference}})',
      hi: '{{sessionTitle}} ({{registrationReference}}) के समय में महत्वपूर्ण बदलाव',
    },
    body: {
      en: 'Hello {{fullName}}, the schedule for {{sessionTitle}} has been updated. You may attend the new time or request a full refund or free transfer at bonnza@marketingtusk.com.',
      hi: 'नमस्ते {{fullName}}, {{sessionTitle}} के समय में बदलाव किया गया है। आप नए समय पर भाग ले सकते हैं या bonnza@marketingtusk.com पर पूर्ण रिफंड या निःशुल्क सत्र स्थानांतरण का अनुरोध कर सकते हैं।',
    },
    updatedAt: '2026-11-16T00:00:00.000Z',
  },
  {
    code: 'SESSION_CANCELLED',
    name: '9. Session Cancelled Notice',
    subject: {
      en: 'Cancellation & full refund notice for {{sessionTitle}}',
      hi: '{{sessionTitle}} के रद्दीकरण और पूर्ण रिफंड की सूचना',
    },
    body: {
      en: 'Hello {{fullName}}, {{sessionTitle}} has been cancelled by Bonnza. A full refund or free transfer to another scheduled session is guaranteed.',
      hi: 'नमस्ते {{fullName}}, Bonnza द्वारा {{sessionTitle}} को रद्द कर दिया गया है। आपको पूर्ण रिफंड या किसी अन्य निर्धारित सत्र में निःशुल्क स्थानांतरण प्राप्त होगा।',
    },
    updatedAt: '2026-11-16T00:00:00.000Z',
  },
  {
    code: 'SESSION_TRANSFER_CONFIRMED',
    name: '10. Session Transfer Confirmed',
    subject: {
      en: 'Session transfer confirmed ({{registrationReference}})',
      hi: 'सत्र स्थानांतरण की पुष्टि ({{registrationReference}})',
    },
    body: {
      en: 'Hello {{fullName}}, your registration {{registrationReference}} has been transferred to {{sessionTitle}} ({{sessionTimeIst}}).',
      hi: 'नमस्ते {{fullName}}, आपका पंजीकरण {{registrationReference}} अब {{sessionTitle}} ({{sessionTimeIst}}) में स्थानांतरित कर दिया गया है।',
    },
    updatedAt: '2026-11-16T00:00:00.000Z',
  },
  {
    code: 'REFUND_INITIATED',
    name: '11. Refund Initiated',
    subject: {
      en: 'Refund initiated for order {{orderNumber}}',
      hi: 'ऑर्डर {{orderNumber}} के लिए रिफंड प्रक्रिया शुरू',
    },
    body: {
      en: 'Hello {{fullName}}, a refund of ₹299 for order {{orderNumber}} ({{registrationReference}}) has been initiated.',
      hi: 'नमस्ते {{fullName}}, ऑर्डर {{orderNumber}} ({{registrationReference}}) के लिए ₹299 की रिफंड प्रक्रिया शुरू कर दी गई है।',
    },
    updatedAt: '2026-11-16T00:00:00.000Z',
  },
  {
    code: 'REFUND_COMPLETED',
    name: '12. Refund Completed',
    subject: {
      en: 'Refund completed for order {{orderNumber}}',
      hi: 'ऑर्डर {{orderNumber}} का रिफंड पूरा हो गया है',
    },
    body: {
      en: 'Hello {{fullName}}, your refund of ₹299 for order {{orderNumber}} has been completed. Your workshop seat reservation has been released.',
      hi: 'नमस्ते {{fullName}}, ऑर्डर {{orderNumber}} के लिए ₹299 का रिफंड पूरा हो गया है। आपकी वर्कशॉप सीट आरक्षण रद्द कर दी गई है।',
    },
    updatedAt: '2026-11-16T00:00:00.000Z',
  },
  {
    code: 'POST_WEBINAR_ATTENDED_FOLLOWUP',
    name: '13. Post-Webinar Attended Follow-Up & Worksheets',
    subject: {
      en: 'Thank you for attending {{sessionTitle}} — Next steps & worksheets',
      hi: '{{sessionTitle}} में भाग लेने के लिए धन्यवाद — अगले कदम और वर्कशीट',
    },
    body: {
      en: 'Hello {{fullName}}, thank you for attending the Bonnza workshop. Practice with the Order Cost & Margin Calculator and explore the 10-course curriculum at bonnza.marketingtusk.com.',
      hi: 'नमस्ते {{fullName}}, Bonnza वर्कशॉप में भाग लेने के लिए धन्यवाद। ऑर्डर लागत कैलकुलेटर का अभ्यास करें और bonnza.marketingtusk.com पर 10-कोर्स पाठ्यक्रम देखें।',
    },
    updatedAt: '2026-11-16T00:00:00.000Z',
  },
  {
    code: 'POST_WEBINAR_NOSHOW_FOLLOWUP',
    name: '14. Post-Webinar No-Show Follow-Up',
    subject: {
      en: 'We missed you at {{sessionTitle}} ({{registrationReference}})',
      hi: 'हमने {{sessionTitle}} ({{registrationReference}}) में आपकी कमी महसूस की',
    },
    body: {
      en: 'Hello {{fullName}}, we noticed you could not attend {{sessionTitle}}. You can still use the free Bonnza worksheets and contact bonnza@marketingtusk.com for future workshop dates.',
      hi: 'नमस्ते {{fullName}}, हमने देखा कि आप {{sessionTitle}} में शामिल नहीं हो सके। आप अभी भी निःशुल्क Bonnza वर्कशीट का उपयोग कर सकते हैं और आगामी तारीखों के लिए bonnza@marketingtusk.com पर संपर्क कर सकते हैं।',
    },
    updatedAt: '2026-11-16T00:00:00.000Z',
  },
  {
    code: 'CONTACT_ENQUIRY_ACKNOWLEDGEMENT',
    name: '15. Contact Enquiry Acknowledgement',
    subject: {
      en: 'We received your Bonnza enquiry ({{ticketNumber}})',
      hi: 'हमें आपकी Bonnza पूछताछ ({{ticketNumber}}) प्राप्त हुई है',
    },
    body: {
      en: 'Hello {{fullName}}, thank you for contacting Bonnza. Your support ticket reference is {{ticketNumber}}. Our team will respond from bonnza@marketingtusk.com.',
      hi: 'नमस्ते {{fullName}}, Bonnza से संपर्क करने के लिए धन्यवाद। आपका सहायता टिकट संदर्भ {{ticketNumber}} है। हमारी टीम bonnza@marketingtusk.com से उत्तर देगी।',
    },
    updatedAt: '2026-11-16T00:00:00.000Z',
  },
  {
    code: 'ADMIN_CRITICAL_PAYMENT_ALERT',
    name: '16. Admin Critical Payment / Reconciliation Alert',
    subject: {
      en: '[Bonnza Admin Alert] Payment flagged for manual review ({{orderNumber}})',
      hi: '[Bonnza एडमिन अलर्ट] भुगतान मैनुअल समीक्षा के लिए चिह्नित ({{orderNumber}})',
    },
    body: {
      en: 'Order {{orderNumber}} ({{registrationReference}}) has been moved to MANUAL_REVIEW: {{alertReason}}.',
      hi: 'ऑर्डर {{orderNumber}} ({{registrationReference}}) को MANUAL_REVIEW में भेजा गया है: {{alertReason}}।',
    },
    updatedAt: '2026-11-16T00:00:00.000Z',
  },
];

export function renderEmailTemplate(
  template: EmailTemplateRecord,
  locale: Locale,
  vars: Record<string, string>
): { subject: string; body: string } {
  let subject = template.subject[locale] || template.subject.en;
  let body = template.body[locale] || template.body.en;

  for (const [key, val] of Object.entries(vars)) {
    const token = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    subject = subject.replace(token, val);
    body = body.replace(token, val);
  }
  return { subject, body };
}

export function getTemplateByCode(
  templates: EmailTemplateRecord[],
  code: EmailTemplateCode
): EmailTemplateRecord {
  const found = templates.find((t) => t.code === code);
  if (!found) {
    throw new Error(`Missing email template: ${code}`);
  }
  return found;
}
