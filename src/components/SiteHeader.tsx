import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useBonnza } from '../context/BonnzaContext';
import { UI_COPY } from '../content/translations';
import { localizePath, stripLocalePrefix } from '../utilities/locale';
import { BonnzaWordmark } from './BrandWordmark';

export function SiteHeader() {
  const { locale, switchLocale } = useBonnza();
  const location = useLocation();
  const copy = UI_COPY[locale].nav;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const strippedPath = stripLocalePrefix(location.pathname);

  const navItems = [
    {
      label: copy.workshop,
      to: localizePath('/webinars/5-december-2026', locale),
      activeMatch: () => strippedPath.startsWith('/webinars'),
    },
    {
      label: copy.paths,
      to: localizePath('/paths/resell', locale),
      activeMatch: () =>
        strippedPath.startsWith('/paths') ||
        strippedPath.startsWith('/learning-paths') ||
        strippedPath.startsWith('/learn/'),
    },
    {
      label: copy.ecommerceGuides,
      to: localizePath('/ecommerce-guides', locale),
      activeMatch: () =>
        strippedPath.startsWith('/ecommerce-guides') || strippedPath.startsWith('/blog'),
    },
    {
      label: copy.ideas,
      to: localizePath('/business-ideas', locale),
      activeMatch: () => strippedPath.startsWith('/business-ideas'),
    },
  ];

  const mobileSecondaryLinks = [
    {
      label: locale === 'hi' ? 'पूर्ण प्रोग्राम' : 'Complete Programme',
      to: localizePath('/programme', locale),
    },
    {
      label: locale === 'hi' ? 'कोर्स कैटलॉग' : 'Courses',
      to: localizePath('/courses', locale),
    },
    {
      label: copy.resources,
      to: localizePath('/resources', locale),
    },
    {
      label: copy.about,
      to: localizePath('/about', locale),
    },
    {
      label: copy.contact,
      to: localizePath('/contact', locale),
    },
  ];

  const workshopCtaPath = localizePath('/webinars/register', locale);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E6E6DF] bg-[#FAF9F5]/95 backdrop-blur-sm">
      <div className="bonnza-container flex h-16 items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to={localizePath('/', locale)}
          className="inline-flex items-center whitespace-nowrap shrink-0 rounded-lg focus-visible:outline-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          <BonnzaWordmark />
        </Link>

        {/* Zone 2: Minimal 4-Link Single-Line Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-[#1A1B1A]"
        >
          {navItems.map((item) => {
            const active = item.activeMatch();
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`whitespace-nowrap shrink-0 py-1.5 transition-colors border-b-2 ${
                  active
                    ? 'border-[#1A1B1A] text-[#1A1B1A] font-semibold'
                    : 'border-transparent text-[#666A65] hover:text-[#1A1B1A] hover:border-[#E6E6DF]'
                }`}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Zone 3: Compact Locale Control + Primary Workshop CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            role="group"
            aria-label={copy.languageLabel}
            className="inline-flex items-center rounded-[10px] border border-[#E6E6DF] bg-[#F3F1E9] p-0.5"
          >
            <button
              type="button"
              onClick={() => switchLocale('en')}
              aria-pressed={locale === 'en'}
              className={`min-h-[34px] px-2.5 text-xs font-semibold rounded-[8px] transition-colors whitespace-nowrap shrink-0 ${
                locale === 'en'
                  ? 'bg-[#FFFFFF] text-[#1A1B1A]'
                  : 'text-[#666A65] hover:text-[#1A1B1A]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => switchLocale('hi')}
              aria-pressed={locale === 'hi'}
              className={`min-h-[34px] px-2.5 text-xs font-semibold rounded-[8px] transition-colors whitespace-nowrap shrink-0 ${
                locale === 'hi'
                  ? 'bg-[#FFFFFF] text-[#1A1B1A]'
                  : 'text-[#666A65] hover:text-[#1A1B1A]'
              }`}
            >
              हिंदी
            </button>
          </div>

          <Link
            to={workshopCtaPath}
            className="hidden sm:inline-flex items-center justify-center min-h-[40px] px-4 py-2 text-xs font-bold rounded-[10px] bg-[#F4C940] text-[#1A1B1A] hover:bg-[#eab924] transition-colors whitespace-nowrap shrink-0"
          >
            {copy.bookWorkshop}
          </Link>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center min-h-[42px] min-w-[42px] rounded-[10px] border border-[#E6E6DF] bg-[#FFFFFF] text-[#1A1B1A]"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? copy.menuClose : copy.menuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden border-t border-[#E6E6DF] bg-[#FAF9F5] py-5"
        >
          <div className="bonnza-container flex flex-col gap-1.5">
            {navItems.map((item) => {
              const active = item.activeMatch();
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`min-h-[44px] flex items-center px-3 rounded-[10px] text-base font-medium ${
                    active
                      ? 'bg-[#F3F1E9] text-[#1A1B1A] font-semibold'
                      : 'text-[#1A1B1A] hover:bg-[#F3F1E9]'
                  }`}
                >
                  {item.label}
                </NavLink>
              );
            })}

            <div className="my-2 pt-3 border-t border-[#E6E6DF] grid grid-cols-2 gap-1.5">
              {mobileSecondaryLinks.map((sec) => (
                <Link
                  key={sec.to}
                  to={sec.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[40px] flex items-center px-3 rounded-[8px] text-xs font-medium text-[#666A65] hover:text-[#1A1B1A] hover:bg-[#F3F1E9]"
                >
                  {sec.label}
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to={workshopCtaPath}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center min-h-[46px] px-5 py-3 text-sm font-bold rounded-[12px] bg-[#F4C940] text-[#1A1B1A] hover:bg-[#eab924]"
              >
                {copy.bookWorkshop}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
