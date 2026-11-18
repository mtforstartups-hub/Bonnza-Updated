import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { Locale } from '../domain/types';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumbs({
  items,
  locale,
}: {
  items: BreadcrumbItem[];
  locale: Locale;
}) {
  return (
    <nav aria-label={locale === 'hi' ? 'ब्रेडक्रंब' : 'Breadcrumb'} className="mb-5">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[#666A65]">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5 min-w-0">
              {idx > 0 && (
                <ChevronRight
                  size={12}
                  aria-hidden="true"
                  className="text-[#666A65]/60 shrink-0"
                />
              )}
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="hover:text-[#1A1B1A] transition-colors truncate max-w-[200px]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={isLast ? 'text-[#1A1B1A] font-semibold truncate' : ''}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
