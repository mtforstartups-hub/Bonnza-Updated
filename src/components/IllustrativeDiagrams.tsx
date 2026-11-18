import { useState } from 'react';
import { Package } from 'lucide-react';
import type { Locale } from '../domain/types';

export function BonnzaImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-[#F3F1E9] text-[#666A65] p-6 text-center ${className}`}
      >
        <Package size={28} aria-hidden="true" className="text-[#1A1B1A]" />
        <p className="text-xs max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

export function ProductJourneyDiagram({ locale }: { locale: Locale }) {
  const steps =
    locale === 'hi'
      ? [
          { num: '01', label: 'उत्पाद व खरीदार', sub: 'स्पष्ट उपयोग और भूमिका' },
          { num: '02', label: 'सैंपल व लागत', sub: 'पैकिंग, भाड़ा व रिटर्न' },
          { num: '03', label: 'पहला चैनल', sub: 'मार्केटप्लेस, WhatsApp या स्टोर' },
          { num: '04', label: 'ऑर्डर व नकद', sub: 'दैनिक डिस्पैच व मिलान' },
        ]
      : [
          { num: '01', label: 'Product & Buyer', sub: 'Use case & making/sourcing role' },
          { num: '02', label: 'Sample & Costing', sub: 'Packaging, shipping & returns' },
          { num: '03', label: 'First Channel', sub: 'Marketplace, WhatsApp or store' },
          { num: '04', label: 'Orders & Cash', sub: 'Daily routine & reconciliation' },
        ];

  return (
    <div
      aria-label={
        locale === 'hi'
          ? 'उत्पाद विचार से ऑनलाइन बिक्री तक की चार चरण यात्रा'
          : 'Four-stage journey from product idea to online selling'
      }
      className="border-t border-b border-[#E6E6DF] bg-[#FFFFFF]/70"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E6E6DF]">
        {steps.map((step) => (
          <div key={step.num} className="py-4 sm:px-5 first:sm:pl-0 last:sm:pr-0 space-y-1">
            <p className="text-[11px] font-mono-tabular font-bold text-[#666A65]">{step.num}</p>
            <p className="text-sm font-bold text-[#1A1B1A]">{step.label}</p>
            <p className="text-xs text-[#666A65] leading-snug">{step.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PresenterTypographicCard({
  locale,
  roleLabel,
  bio,
}: {
  locale: Locale;
  roleLabel: string;
  bio: string;
}) {
  return (
    <div className="border-y border-[#E6E6DF] py-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
      <div
        aria-hidden="true"
        className="h-20 w-20 shrink-0 rounded-[16px] bg-[#1A1B1A] text-[#F4C940] flex items-center justify-center font-display text-2xl font-extrabold tracking-tight"
      >
        SC
      </div>
      <div className="space-y-2 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#666A65]">
          {roleLabel}
        </p>
        <h3 className="text-2xl font-extrabold text-[#1A1B1A]">
          {locale === 'hi' ? 'शुभम चतुर्वेदी (Shubham Chaturvedi)' : 'Shubham Chaturvedi'}
        </h3>
        <p className="text-sm sm:text-base text-[#666A65] leading-relaxed">{bio}</p>
      </div>
    </div>
  );
}
