import { useState } from 'react';
import { Printer, Download } from 'lucide-react';
import type { Locale } from '../../domain/types';

interface StartingPlanState {
  targetCustomer: string;
  productIdea: string;
  makeOrSourceRoute: string;
  costAssumptions: string;
  firstChannel: string;
  unresolvedQuestions: string;
  sevenDayActionPlan: string;
  timeAndSpendingCeiling: string;
}

export function BusinessStartingWorksheet({ locale }: { locale: Locale }) {
  const [plan, setPlan] = useState<StartingPlanState>({
    targetCustomer: '',
    productIdea: '',
    makeOrSourceRoute: 'Resell: Source to Sell',
    costAssumptions: '',
    firstChannel: 'WhatsApp Selling Pilot',
    unresolvedQuestions: '',
    sevenDayActionPlan: '',
    timeAndSpendingCeiling: '',
  });

  const handleDownload = () => {
    const content = [
      'BONNZA — BUSINESS STARTING WORKSHEET (LOCAL COPY)',
      `Generated locally: ${new Date().toISOString()}`,
      '',
      `1. Target Customer & Use Case:\n${plan.targetCustomer || '-'}`,
      '',
      `2. Product Idea & Specification:\n${plan.productIdea || '-'}`,
      '',
      `3. Make / Source Role:\n${plan.makeOrSourceRoute || '-'}`,
      '',
      `4. Cost Assumptions:\n${plan.costAssumptions || '-'}`,
      '',
      `5. Candidate First Channel:\n${plan.firstChannel || '-'}`,
      '',
      `6. Unresolved Questions to Verify:\n${plan.unresolvedQuestions || '-'}`,
      '',
      `7. Seven-Day Action Plan:\n${plan.sevenDayActionPlan || '-'}`,
      '',
      `8. Weekly Time & Spending Ceiling:\n${plan.timeAndSpendingCeiling || '-'}`,
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bonnza-starting-worksheet.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const inputCls =
    'w-full min-h-[44px] rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] px-3 py-2 text-sm text-[#1A1B1A] transition-colors focus:border-[#1A1B1A] focus:bg-[#FFFFFF] focus:outline-none';
  const textareaCls =
    'w-full rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] p-3 text-sm text-[#1A1B1A] transition-colors focus:border-[#1A1B1A] focus:bg-[#FFFFFF] focus:outline-none';

  return (
    <section
      aria-labelledby="starting-worksheet-heading"
      className="rounded-[20px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[#E6E6DF]">
        <div className="space-y-1.5 max-w-2xl">
          <h2 id="starting-worksheet-heading" className="text-2xl font-bold text-[#1A1B1A]">
            {locale === 'hi' ? '3. बिज़नेस शुरुआती प्लानिंग वर्कशीट' : '3. Business Starting Worksheet'}
          </h2>
          <p className="text-sm text-[#666A65]">
            {locale === 'hi'
              ? 'अपनी योजना भरें और अपने डिवाइस पर प्रिंट या डाउनलोड करें। कोई भी व्यक्तिगत डेटा सर्वर पर नहीं भेजा जाता।'
              : 'Build your starting plan and print or download a local copy. Nothing you type here is transmitted to any server.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 no-print">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 text-xs font-semibold rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] hover:bg-[#F3F1E9] text-[#1A1B1A] transition-colors"
          >
            <Printer size={15} aria-hidden="true" />
            {locale === 'hi' ? 'प्रिंट करें' : 'Print locally'}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 text-xs font-semibold rounded-[10px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] transition-colors"
          >
            <Download size={15} aria-hidden="true" />
            {locale === 'hi' ? 'TXT डाउनलोड करें' : 'Download TXT'}
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="block space-y-1.5">
          <span className="block text-xs font-semibold text-[#1A1B1A]">
            {locale === 'hi' ? 'लक्षित ग्राहक और उपयोग' : 'Target customer & specific use case'}
          </span>
          <input
            type="text"
            value={plan.targetCustomer}
            onChange={(e) => setPlan({ ...plan, targetCustomer: e.target.value })}
            placeholder={
              locale === 'hi'
                ? 'उदा. सप्ताहांत यात्री जिन्हें चार्जर ऑर्गनाइज़र चाहिए'
                : 'e.g., Weekend rail/flight travellers needing cable organizers'
            }
            className={inputCls}
          />
        </label>

        <label className="block space-y-1.5">
          <span className="block text-xs font-semibold text-[#1A1B1A]">
            {locale === 'hi' ? 'उत्पाद विचार और विनिर्देश' : 'Product idea & specification'}
          </span>
          <input
            type="text"
            value={plan.productIdea}
            onChange={(e) => setPlan({ ...plan, productIdea: e.target.value })}
            placeholder={
              locale === 'hi'
                ? 'उदा. 20cm × 14cm कॉटन ट्रैवल पाउच'
                : 'e.g., 20cm × 14cm stitched cotton travel pouch'
            }
            className={inputCls}
          />
        </label>

        <label className="block space-y-1.5">
          <span className="block text-xs font-semibold text-[#1A1B1A]">
            {locale === 'hi' ? 'निर्माण / सोर्सिंग मार्ग' : 'Make / source route'}
          </span>
          <select
            value={plan.makeOrSourceRoute}
            onChange={(e) => setPlan({ ...plan, makeOrSourceRoute: e.target.value })}
            className={inputCls}
          >
            <option value="Resell: Source to Sell">
              {locale === 'hi' ? 'रीसेल: आपूर्तिकर्ता से सोर्स कर बेचना' : 'Resell: Source to Sell'}
            </option>
            <option value="Craft to Commerce (Self-Made)">
              {locale === 'hi' ? 'क्राफ्ट टू कॉमर्स (स्वयं निर्माण)' : 'Craft to Commerce (Self-Made)'}
            </option>
            <option value="Craft to Commerce (Artist-Sourced)">
              {locale === 'hi'
                ? 'क्राफ्ट टू कॉमर्स (कलाकार से सोर्स किया गया)'
                : 'Craft to Commerce (Artist-Sourced)'}
            </option>
          </select>
        </label>

        <label className="block space-y-1.5">
          <span className="block text-xs font-semibold text-[#1A1B1A]">
            {locale === 'hi' ? 'पहला संभावित चैनल' : 'Candidate first selling channel'}
          </span>
          <select
            value={plan.firstChannel}
            onChange={(e) => setPlan({ ...plan, firstChannel: e.target.value })}
            className={inputCls}
          >
            <option value="WhatsApp Selling Pilot">WhatsApp / Social Pilot</option>
            <option value="Meesho">Meesho</option>
            <option value="Amazon India">Amazon India</option>
            <option value="Etsy">Etsy</option>
            <option value="Shopify / Wix">Shopify / Wix</option>
          </select>
        </label>

        <label className="block space-y-1.5 md:col-span-2">
          <span className="block text-xs font-semibold text-[#1A1B1A]">
            {locale === 'hi' ? 'लागत मान्यताएं (प्रति ऑर्डर)' : 'Cost assumptions (per order)'}
          </span>
          <textarea
            rows={2}
            value={plan.costAssumptions}
            onChange={(e) => setPlan({ ...plan, costAssumptions: e.target.value })}
            placeholder={
              locale === 'hi'
                ? 'बिक्री मूल्य, उत्पाद लागत, पैकेजिंग, शिपिंग, शुल्क और रिटर्न प्रावधान लिखें'
                : 'List expected net selling price, product cost, packaging, shipping, fees, and return allowance'
            }
            className={textareaCls}
          />
        </label>

        <label className="block space-y-1.5">
          <span className="block text-xs font-semibold text-[#1A1B1A]">
            {locale === 'hi' ? 'सत्यापन के लिए अनसुलझे प्रश्न' : 'Unresolved questions to verify'}
          </span>
          <textarea
            rows={3}
            value={plan.unresolvedQuestions}
            onChange={(e) => setPlan({ ...plan, unresolvedQuestions: e.target.value })}
            placeholder={
              locale === 'hi'
                ? 'उदा. सैंपल गुणवत्ता, GST/Enrolment पात्रता, वास्तविक कूरियर दर'
                : 'e.g., Sample zip durability, GST/route eligibility, live courier quote'
            }
            className={textareaCls}
          />
        </label>

        <label className="block space-y-1.5">
          <span className="block text-xs font-semibold text-[#1A1B1A]">
            {locale === 'hi' ? 'सात-दिवसीय कार्य योजना व सीमा' : 'Seven-day action plan & spending ceiling'}
          </span>
          <textarea
            rows={3}
            value={plan.sevenDayActionPlan}
            onChange={(e) => setPlan({ ...plan, sevenDayActionPlan: e.target.value })}
            placeholder={
              locale === 'hi'
                ? 'इस सप्ताह के 3 ठोस कदम और अधिकतम परीक्षण खर्च/समय सीमा'
                : 'Next 3 concrete actions this week plus weekly hours and cash ceiling'
            }
            className={textareaCls}
          />
        </label>
      </div>
    </section>
  );
}
