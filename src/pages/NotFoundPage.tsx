import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import { localizePath } from '../utilities/locale';
import { SeoHead } from '../components/SeoHead';

export function NotFoundPage() {
  const { locale } = useBonnza();

  return (
    <div className="bonnza-container py-20 space-y-6 max-w-2xl">
      <SeoHead
        locale={locale}
        title={locale === 'hi' ? 'पृष्ठ नहीं मिला (404) | Bonnza' : 'Page not found (404) | Bonnza'}
        description="The requested Bonnza page could not be found."
        path={localizePath('/404', locale)}
        allowIndex={false}
      />

      <p className="text-xs font-mono-tabular font-bold uppercase tracking-widest text-[#666A65]">
        404 · {locale === 'hi' ? 'पृष्ठ उपलब्ध नहीं' : 'NOT FOUND'}
      </p>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1B1A] text-balance">
        {locale === 'hi' ? 'यह पृष्ठ उपलब्ध नहीं है।' : 'We could not find that page.'}
      </h1>
      <p className="text-base text-[#666A65] leading-relaxed">
        {locale === 'hi'
          ? 'हो सकता है लिंक बदल गया हो या पता गलत टाइप हुआ हो। आप नीचे दिए गए मुख्य अनुभागों पर जा सकते हैं।'
          : 'The URL may be mistyped or not yet active. Use one of the verified sections below to continue.'}
      </p>

      <div className="flex flex-wrap gap-3 pt-2">
        <Link
          to={localizePath('/', locale)}
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-[12px] bg-[#F4C940] hover:bg-[#eab924] text-[#1A1B1A] font-semibold text-sm transition-colors"
        >
          <span>{locale === 'hi' ? 'होमपेज पर जाएं' : 'Go to Homepage'}</span>
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
        <Link
          to={localizePath('/webinars/5-december-2026', locale)}
          className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-[12px] border border-[#E6E6DF] bg-[#FFFFFF] hover:bg-[#F3F1E9] text-[#1A1B1A] font-semibold text-sm transition-colors"
        >
          {locale === 'hi' ? '5 दिसंबर वर्कशॉप' : '5 Dec Workshop'}
        </Link>
        <Link
          to={localizePath('/business-ideas', locale)}
          className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-[12px] border border-[#E6E6DF] bg-[#FFFFFF] hover:bg-[#F3F1E9] text-[#1A1B1A] font-semibold text-sm transition-colors"
        >
          {locale === 'hi' ? 'बिज़नेस आइडिया खोजक' : 'Business Idea Finder'}
        </Link>
        <Link
          to={localizePath('/courses', locale)}
          className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-[12px] border border-[#E6E6DF] bg-[#FFFFFF] hover:bg-[#F3F1E9] text-[#1A1B1A] font-semibold text-sm transition-colors"
        >
          {locale === 'hi' ? 'कोर्स कैटलॉग' : 'Course Catalogue'}
        </Link>
      </div>
    </div>
  );
}
