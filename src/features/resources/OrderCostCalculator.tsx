import { useState } from 'react';
import { RotateCcw, Info } from 'lucide-react';
import type { Locale } from '../../domain/types';
import { formatInr } from '../../utilities/locale';

interface CostInputs {
  netSellingAmount: number;
  productCost: number;
  packagingCost: number;
  shippingCost: number;
  channelAndPaymentFees: number;
  expectedReturnLoss: number;
  acquisitionCost: number;
  otherVariableCosts: number;
}

const BASE_PRESET: CostInputs = {
  netSellingAmount: 500,
  productCost: 200,
  packagingCost: 20,
  shippingCost: 60,
  channelAndPaymentFees: 50,
  expectedReturnLoss: 20,
  acquisitionCost: 100,
  otherVariableCosts: 0,
};

const HIGHER_SHIPPING_PRESET: CostInputs = {
  ...BASE_PRESET,
  shippingCost: 90,
};

const PROBLEM_ORDER_PRESET: CostInputs = {
  netSellingAmount: 500,
  productCost: 200,
  packagingCost: 20,
  shippingCost: 120,
  channelAndPaymentFees: 30,
  expectedReturnLoss: 150,
  acquisitionCost: 100,
  otherVariableCosts: 0,
};

export function OrderCostCalculator({ locale }: { locale: Locale }) {
  const [inputs, setInputs] = useState<CostInputs>(BASE_PRESET);

  const updateField = (field: keyof CostInputs, raw: string) => {
    const parsed = Number(raw);
    setInputs((prev) => ({
      ...prev,
      [field]: Number.isFinite(parsed) && parsed >= 0 ? parsed : 0,
    }));
  };

  const preAcquisitionVariableCosts =
    inputs.productCost +
    inputs.packagingCost +
    inputs.shippingCost +
    inputs.channelAndPaymentFees +
    inputs.expectedReturnLoss +
    inputs.otherVariableCosts;

  const totalVariableCosts = preAcquisitionVariableCosts + inputs.acquisitionCost;
  const contributionBeforeAcquisition =
    inputs.netSellingAmount - preAcquisitionVariableCosts;
  const contributionAfterAcquisition =
    inputs.netSellingAmount - totalVariableCosts;
  const contributionPct =
    inputs.netSellingAmount > 0
      ? (contributionAfterAcquisition / inputs.netSellingAmount) * 100
      : 0;

  const fields: Array<{ key: keyof CostInputs; en: string; hi: string }> = [
    { key: 'netSellingAmount', en: 'Net selling amount (after discounts)', hi: 'नेट बिक्री राशि (छूट के बाद)' },
    { key: 'productCost', en: 'Product cost (per usable unit)', hi: 'उत्पाद लागत (प्रति उपयोगी यूनिट)' },
    { key: 'packagingCost', en: 'Packaging materials', hi: 'पैकेजिंग सामग्री' },
    { key: 'shippingCost', en: 'Outbound shipping', hi: 'आउटबाउंड शिपिंग' },
    { key: 'channelAndPaymentFees', en: 'Channel & payment charges', hi: 'चैनल व भुगतान शुल्क' },
    { key: 'expectedReturnLoss', en: 'Expected return-related loss', hi: 'अनुमानित रिटर्न हानि' },
    { key: 'acquisitionCost', en: 'Customer acquisition cost', hi: 'ग्राहक प्राप्ति लागत' },
    { key: 'otherVariableCosts', en: 'Other variable costs', hi: 'अन्य परिवर्तनीय लागत' },
  ];

  const breakdownBars = [
    {
      label: locale === 'hi' ? 'उत्पाद' : 'Product',
      value: inputs.productCost,
      color: '#1A1B1A',
    },
    {
      label: locale === 'hi' ? 'पैकिंग + अन्य' : 'Pack + Other',
      value: inputs.packagingCost + inputs.otherVariableCosts,
      color: '#666A65',
    },
    {
      label: locale === 'hi' ? 'शिपिंग' : 'Shipping',
      value: inputs.shippingCost,
      color: '#E8EDDD',
    },
    {
      label: locale === 'hi' ? 'शुल्क + रिटर्न' : 'Fees + Returns',
      value: inputs.channelAndPaymentFees + inputs.expectedReturnLoss,
      color: '#F4E6D4',
    },
    {
      label: locale === 'hi' ? 'ग्राहक प्राप्ति' : 'Acquisition',
      value: inputs.acquisitionCost,
      color: '#F4C940',
    },
  ];

  const calcScenario = (s: CostInputs) => {
    const pre =
      s.productCost +
      s.packagingCost +
      s.shippingCost +
      s.channelAndPaymentFees +
      s.expectedReturnLoss +
      s.otherVariableCosts;
    const before = s.netSellingAmount - pre;
    const after = before - s.acquisitionCost;
    return { pre: pre + s.acquisitionCost, before, after };
  };

  const baseRes = calcScenario(BASE_PRESET);
  const shipRes = calcScenario(HIGHER_SHIPPING_PRESET);
  const probRes = calcScenario(PROBLEM_ORDER_PRESET);

  return (
    <section
      aria-labelledby="cost-calculator-heading"
      className="rounded-[20px] border border-[#E6E6DF] bg-[#FFFFFF] p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[#E6E6DF]">
        <div className="space-y-1.5 max-w-2xl">
          <h2 id="cost-calculator-heading" className="text-2xl font-bold text-[#1A1B1A]">
            {locale === 'hi' ? '1. ऑर्डर लागत कैलकुलेटर' : '1. Order Cost Calculator'}
          </h2>
          <p className="text-sm text-[#666A65]">
            {locale === 'hi'
              ? 'अपने आंकड़े दर्ज करें या नीचे दिए गए उदाहरण परिदृश्य लोड करें। सभी गणनाएं स्थानीय रूप से आपके ब्राउज़र में होती हैं।'
              : 'Enter your own assumptions or load one of the sample cost scenarios. All calculations run locally in your browser.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setInputs(BASE_PRESET)}
            className="min-h-[40px] px-3 py-1.5 text-xs font-semibold rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] hover:bg-[#F3F1E9] text-[#1A1B1A] transition-colors"
          >
            {locale === 'hi' ? 'सामान्य उदाहरण (₹500)' : 'Base example (₹500)'}
          </button>
          <button
            type="button"
            onClick={() => setInputs(HIGHER_SHIPPING_PRESET)}
            className="min-h-[40px] px-3 py-1.5 text-xs font-semibold rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] hover:bg-[#F3F1E9] text-[#1A1B1A] transition-colors"
          >
            {locale === 'hi' ? 'बढ़ी शिपिंग (₹90)' : 'Higher shipping (₹90)'}
          </button>
          <button
            type="button"
            onClick={() => setInputs(PROBLEM_ORDER_PRESET)}
            className="min-h-[40px] px-3 py-1.5 text-xs font-semibold rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] hover:bg-[#F3F1E9] text-[#1A1B1A] transition-colors"
          >
            {locale === 'hi' ? 'समस्या ऑर्डर' : 'Problem order'}
          </button>
          <button
            type="button"
            onClick={() => setInputs(BASE_PRESET)}
            className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 text-xs font-medium rounded-[10px] text-[#666A65] hover:text-[#1A1B1A] transition-colors"
          >
            <RotateCcw size={14} aria-hidden="true" />
            {locale === 'hi' ? 'रीसेट' : 'Reset'}
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((f) => (
            <label key={f.key} className="block space-y-1.5">
              <span className="block text-xs font-semibold text-[#1A1B1A]">
                {locale === 'hi' ? f.hi : f.en}
              </span>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#666A65]">
                  ₹
                </span>
                <input
                  type="number"
                  min={0}
                  step="1"
                  value={inputs[f.key]}
                  onChange={(e) => updateField(f.key, e.target.value)}
                  className="w-full min-h-[44px] rounded-[10px] border border-[#E6E6DF] bg-[#FAF9F5] pl-7 pr-3 py-2 text-sm font-mono-tabular text-[#1A1B1A] transition-colors focus:border-[#1A1B1A] focus:bg-[#FFFFFF] focus:outline-none"
                />
              </div>
            </label>
          ))}
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between gap-6">
          <div className="rounded-[16px] bg-[#202220] text-[#FAF9F5] p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/10">
              <div>
                <p className="text-xs text-[#FAF9F5]/70">
                  {locale === 'hi' ? 'कुल परिवर्तनीय लागत' : 'Total variable costs'}
                </p>
                <p className="mt-1 text-xl font-bold font-mono-tabular text-white">
                  {formatInr(totalVariableCosts, locale)}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#FAF9F5]/70">
                  {locale === 'hi' ? 'प्राप्ति से पहले योगदान' : 'Contribution before acquisition'}
                </p>
                <p className="mt-1 text-xl font-bold font-mono-tabular text-white">
                  {formatInr(contributionBeforeAcquisition, locale)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs text-[#FAF9F5]/75">
                  {locale === 'hi' ? 'प्राप्ति लागत के बाद योगदान' : 'Contribution after acquisition'}
                </p>
                <p
                  className={`mt-1 text-3xl font-extrabold font-mono-tabular ${
                    contributionAfterAcquisition >= 0 ? 'text-[#F4C940]' : 'text-[#F4E6D4]'
                  }`}
                >
                  {formatInr(contributionAfterAcquisition, locale)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#FAF9F5]/75">
                  {locale === 'hi' ? 'योगदान प्रतिशत' : 'Contribution margin'}
                </p>
                <p className="mt-1 text-2xl font-bold font-mono-tabular text-white">
                  {contributionPct.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-[#1A1B1A]">
              {locale === 'hi' ? 'लागत विभाजन' : 'Variable cost breakdown'}
            </p>
            <div className="h-4 w-full rounded-[6px] overflow-hidden bg-[#F3F1E9] flex border border-[#E6E6DF]">
              {breakdownBars.map((bar) => {
                const denom = Math.max(inputs.netSellingAmount, totalVariableCosts, 1);
                const pct = Math.min(100, (bar.value / denom) * 100);
                if (pct <= 0) return null;
                return (
                  <div
                    key={bar.label}
                    style={{ width: `${pct}%`, backgroundColor: bar.color }}
                    title={`${bar.label}: ${formatInr(bar.value, locale)}`}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#666A65]">
              {breakdownBars.map((bar) => (
                <span key={bar.label} className="inline-flex items-center gap-1.5 tabular-nums">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-xs border border-[#E6E6DF]"
                    style={{ backgroundColor: bar.color }}
                    aria-hidden="true"
                  />
                  {bar.label}: {formatInr(bar.value, locale)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-[#E6E6DF] text-xs font-semibold text-[#666A65]">
              <th className="py-2.5 pr-4">{locale === 'hi' ? 'परिदृश्य तुलना' : 'Scenario comparison'}</th>
              <th className="py-2.5 px-4">{locale === 'hi' ? 'कुल लागत' : 'Total Variable Costs'}</th>
              <th className="py-2.5 px-4">{locale === 'hi' ? 'प्राप्ति से पहले' : 'Before Acquisition'}</th>
              <th className="py-2.5 pl-4">{locale === 'hi' ? 'प्राप्ति के बाद' : 'After Acquisition'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6E6DF] font-mono-tabular">
            <tr>
              <td className="py-2.5 pr-4 font-sans font-medium text-[#1A1B1A]">
                {locale === 'hi' ? 'आधार उदाहरण (₹60 शिपिंग)' : 'Base example (₹60 shipping)'}
              </td>
              <td className="py-2.5 px-4">{formatInr(baseRes.pre, locale)}</td>
              <td className="py-2.5 px-4">{formatInr(baseRes.before, locale)}</td>
              <td className="py-2.5 pl-4 font-semibold">{formatInr(baseRes.after, locale)}</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-sans font-medium text-[#1A1B1A]">
                {locale === 'hi' ? 'बढ़ी हुई शिपिंग (₹90)' : 'Higher shipping (₹90)'}
              </td>
              <td className="py-2.5 px-4">{formatInr(shipRes.pre, locale)}</td>
              <td className="py-2.5 px-4">{formatInr(shipRes.before, locale)}</td>
              <td className="py-2.5 pl-4 font-semibold">{formatInr(shipRes.after, locale)}</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-sans font-medium text-[#1A1B1A]">
                {locale === 'hi' ? 'रिटर्न / समस्या ऑर्डर' : 'Problem / return order'}
              </td>
              <td className="py-2.5 px-4">{formatInr(probRes.pre, locale)}</td>
              <td className="py-2.5 px-4">{formatInr(probRes.before, locale)}</td>
              <td className="py-2.5 pl-4 font-semibold text-[#1A1B1A]">
                {formatInr(probRes.after, locale)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5 border-t border-[#E6E6DF] pt-4 flex items-start gap-2.5 text-xs text-[#666A65]">
        <Info size={16} className="shrink-0 mt-0.5 text-[#1A1B1A]" aria-hidden="true" />
        <p>
          {locale === 'hi'
            ? 'महत्वपूर्ण: योगदान अपने आप शुद्ध लाभ नहीं है—निश्चित मासिक खर्च और कर इससे अलग रहते हैं। ये उदाहरण आंकड़े वास्तविक मार्केटप्लेस शुल्क दरें नहीं हैं; सूचीबद्ध करने से पहले लाइव शुल्क जांचें।'
            : 'Important note: Contribution is not automatically net profit—fixed monthly expenses and cash timing remain separate. Illustrative defaults are not official marketplace fee schedules; verify live rates before pricing.'}
        </p>
      </div>
    </section>
  );
}
