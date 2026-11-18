import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Locale } from '../domain/types';

export interface FaqEntry {
  question: { en: string; hi: string };
  answer: { en: string; hi: string };
}

export function FaqAccordion({
  items,
  locale,
}: {
  items: FaqEntry[];
  locale: Locale;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-y border-[#E6E6DF] divide-y divide-[#E6E6DF]">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="py-5 sm:py-6">
            <h3 className="text-base sm:text-lg font-bold text-[#1A1B1A]">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-start justify-between gap-4 text-left min-h-[44px] py-1 group"
              >
                <span className="leading-snug group-hover:text-black">
                  {item.question[locale]}
                </span>
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className={`shrink-0 mt-0.5 text-[#666A65] transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#1A1B1A]' : 'group-hover:text-[#1A1B1A]'
                  }`}
                />
              </button>
            </h3>
            {isOpen && (
              <p className="mt-3 text-sm sm:text-base text-[#666A65] leading-relaxed max-w-[68ch] pr-8">
                {item.answer[locale]}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
