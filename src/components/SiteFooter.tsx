import { Link } from 'react-router-dom';
import { useBonnza } from '../context/BonnzaContext';
import { UI_COPY } from '../content/translations';
import { BONNZA_CONFIG } from '../domain/config';
import { localizePath } from '../utilities/locale';
import { openConsentPreferencesModal } from '../utilities/analyticsAndConsent';
import { BonnzaWordmark } from './BrandWordmark';

export function SiteFooter() {
  const { locale, switchLocale } = useBonnza();
  const copy = UI_COPY[locale].footer;
  const navCopy = UI_COPY[locale].nav;
  const isHi = locale === 'hi';

  return (
    <footer className="border-t border-[#E6E6DF] bg-[#1A1B1A] text-[#FAF9F5] pt-16 pb-24 sm:pb-14">
      <div className="bonnza-container space-y-12">
        {/* Top Directory Strip */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-white/10">
          {/* Brand & Bilingual Toggle Column */}
          <div className="lg:col-span-4 space-y-5 pr-4">
            <Link to={localizePath('/', locale)} className="inline-block">
              <BonnzaWordmark light />
            </Link>
            <div className="space-y-2">
              <p className="text-base font-bold text-[#F4C940]">{copy.tagline}</p>
              <p className="text-sm text-[#FAF9F5]/80 max-w-sm leading-relaxed">
                {copy.descriptor}
              </p>
            </div>

            <div className="pt-1 flex items-center gap-2.5">
              <span className="text-xs text-[#FAF9F5]/65">
                {isHi ? 'भाषा:' : 'Language:'}
              </span>
              <button
                type="button"
                onClick={() => switchLocale('en')}
                className={`min-h-[34px] px-3 text-xs font-semibold rounded-[8px] border transition-colors whitespace-nowrap ${
                  locale === 'en'
                    ? 'border-[#F4C940] text-[#F4C940] bg-white/[0.04]'
                    : 'border-white/20 text-[#FAF9F5]/80 hover:text-white hover:border-white/40'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => switchLocale('hi')}
                className={`min-h-[34px] px-3 text-xs font-semibold rounded-[8px] border transition-colors whitespace-nowrap ${
                  locale === 'hi'
                    ? 'border-[#F4C940] text-[#F4C940] bg-white/[0.04]'
                    : 'border-white/20 text-[#FAF9F5]/80 hover:text-white hover:border-white/40'
                }`}
              >
                हिंदी
              </button>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs text-[#FAF9F5]/80">
              <p className="font-semibold text-white">{copy.contactCol}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <a
                  href={`mailto:${BONNZA_CONFIG.contact.email}`}
                  className="hover:text-[#F4C940] underline decoration-white/20 underline-offset-4"
                >
                  {BONNZA_CONFIG.contact.email}
                </a>
                <a
                  href={BONNZA_CONFIG.contact.phoneHref}
                  className="tabular-nums hover:text-[#F4C940] underline decoration-white/20 underline-offset-4"
                >
                  {BONNZA_CONFIG.contact.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* 4 Structured Directory Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="space-y-3.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                {copy.programmesCol}
              </h2>
              <ul className="space-y-2.5 text-sm text-[#FAF9F5]/75">
                <li>
                  <Link
                    to={localizePath('/webinars/5-december-2026', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    {isHi ? '5 दिसंबर 2026 वर्कशॉप' : '5 Dec 2026 Workshop'}
                  </Link>
                </li>
                <li>
                  <Link
                    to={localizePath('/webinars/first-online-business', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    {isHi ? '90-मिनट लाइव वर्कशॉप' : '90-Minute Workshop'}
                  </Link>
                </li>
                <li>
                  <Link
                    to={localizePath('/webinars', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    {isHi ? 'वेबिनार निर्देशिका' : 'Webinar Directory'}
                  </Link>
                </li>
                <li>
                  <Link
                    to={localizePath('/programme', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    {navCopy.programmes}
                  </Link>
                </li>
                <li>
                  <Link
                    to={localizePath('/courses', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    {isHi ? 'कोर्स कैटलॉग' : 'Course Catalogue'}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                {copy.pathsCol}
              </h2>
              <ul className="space-y-2.5 text-sm text-[#FAF9F5]/75">
                <li>
                  <Link
                    to={localizePath('/learning-paths/resell', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    {isHi ? 'रीसेल: सोर्स टू सेल' : 'Resell: Source to Sell'}
                  </Link>
                </li>
                <li>
                  <Link
                    to={localizePath('/learning-paths/craft-to-commerce', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    {isHi ? 'क्राफ्ट टू कॉमर्स' : 'Craft to Commerce'}
                  </Link>
                </li>
                <li>
                  <Link
                    to={localizePath('/learn/meesho', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    Meesho
                  </Link>
                </li>
                <li>
                  <Link
                    to={localizePath('/learn/amazon-india', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    Amazon India & Global
                  </Link>
                </li>
                <li>
                  <Link
                    to={localizePath('/learn/shopify', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    Shopify, Wix & Etsy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                {copy.resourcesCol}
              </h2>
              <ul className="space-y-2.5 text-sm text-[#FAF9F5]/75">
                <li>
                  <Link
                    to={localizePath('/ecommerce-guides', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    {isHi ? 'ई-कॉमर्स गाइड' : 'Ecommerce Guides'}
                  </Link>
                </li>
                <li>
                  <Link
                    to={localizePath('/business-ideas', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    {isHi ? 'बिज़नेस आइडिया फ़ाइंडर' : 'Business Idea Finder'}
                  </Link>
                </li>
                <li>
                  <Link
                    to={localizePath('/resources', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    {isHi ? 'कैलकुलेटर व वर्कशीट' : 'Calculators & Tools'}
                  </Link>
                </li>
                <li>
                  <Link
                    to={localizePath('/faq', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    {isHi ? 'सामान्य प्रश्न (FAQ)' : 'FAQ'}
                  </Link>
                </li>
                <li>
                  <Link
                    to={localizePath('/about', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    {navCopy.about}
                  </Link>
                </li>
                <li>
                  <Link
                    to={localizePath('/contact', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    {navCopy.contact}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                {copy.policiesCol}
              </h2>
              <ul className="space-y-2.5 text-sm text-[#FAF9F5]/75">
                <li>
                  <Link
                    to={localizePath('/privacy', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    {isHi ? 'गोपनीयता नीति' : 'Privacy Policy'}
                  </Link>
                </li>
                <li>
                  <Link
                    to={localizePath('/terms', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    {isHi ? 'नियम व शर्तें' : 'Terms & Conditions'}
                  </Link>
                </li>
                <li>
                  <Link
                    to={localizePath('/refund-policy', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    {isHi ? 'रिफंड व ट्रांसफर नीति' : 'Refund & Transfer'}
                  </Link>
                </li>
                <li>
                  <Link
                    to={localizePath('/legal/accessibility', locale)}
                    className="hover:text-[#F4C940] transition-colors"
                  >
                    {isHi ? 'सुलभता जानकारी' : 'Accessibility'}
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={openConsentPreferencesModal}
                    className="text-left text-xs underline decoration-white/30 underline-offset-4 text-[#FAF9F5]/75 hover:text-[#F4C940] transition-colors"
                  >
                    {isHi ? 'कुकी प्राथमिकताएं' : 'Cookie Preferences'}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#FAF9F5]/60">
          <p>{copy.bottomNote}</p>
          <p className="font-mono-tabular">bonnza.marketingtusk.com</p>
        </div>
      </div>
    </footer>
  );
}
