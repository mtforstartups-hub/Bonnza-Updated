import { Link, useLocation } from 'react-router-dom';
import { useBonnza } from '../context/BonnzaContext';
import { localizePath } from '../utilities/locale';
import { BONNZA_CONFIG } from '../domain/config';

export function StickyMobileCta() {
  const { locale } = useBonnza();
  const location = useLocation();

  // Never show sticky mobile CTA on registration, checkout, or payment status screens
  const isCheckoutOrStatus =
    location.pathname.includes('/register') ||
    location.pathname.includes('/payment-status');

  if (isCheckoutOrStatus) {
    return null;
  }

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 border-t border-[#E6E6DF] bg-[#FAF9F5]/95 backdrop-blur-sm px-4 py-1.5 no-print">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 leading-tight">
          <p className="text-[11px] font-bold text-[#1A1B1A] truncate tabular-nums">
            {locale === 'hi' ? '5 दिसंबर 2026 · 90 मिनट' : 'Sat, 5 Dec 2026 · 90 min'}
          </p>
          <p className="text-[11px] text-[#666A65] truncate tabular-nums">
            <span className="line-through mr-1">₹1,999</span>
            <span className="font-bold text-[#1A1B1A]">
              ₹{BONNZA_CONFIG.pricing.webinarTicketInr}
            </span>{' '}
            {locale === 'hi' ? 'वर्कशॉप' : 'live ticket'}
          </p>
        </div>
        <Link
          to={localizePath('/webinars/register', locale)}
          className="inline-flex items-center justify-center min-h-[40px] px-4 py-1.5 text-xs font-bold rounded-[10px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] whitespace-nowrap shrink-0"
        >
          {locale === 'hi' ? 'सीट बुक करें' : 'Book Seat'}
        </Link>
      </div>
    </div>
  );
}
