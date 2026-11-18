import type { Locale } from '../domain/types';

export function formatInr(amount: number, locale: Locale = 'en'): string {
  const formatter = new Intl.NumberFormat(locale === 'hi' ? 'en-IN' : 'en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  });
  return formatter.format(amount);
}

export function formatIstDate(utcIso: string, locale: Locale): string {
  const date = new Date(utcIso);
  return new Intl.DateTimeFormat(locale === 'hi' ? 'hi-IN' : 'en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatIstTime(utcIso: string, locale: Locale): string {
  const date = new Date(utcIso);
  return new Intl.DateTimeFormat(locale === 'hi' ? 'hi-IN' : 'en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

export function formatIstTimeRange(
  startUtc: string,
  endUtc: string,
  locale: Locale
): string {
  const start = formatIstTime(startUtc, locale);
  const end = formatIstTime(endUtc, locale);
  return locale === 'hi'
    ? `${start} से ${end} IST`
    : `${start} to ${end} IST`;
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === '/en' || pathname === '/hi') {
    return '/';
  }
  if (pathname.startsWith('/en/')) {
    return pathname.slice(3);
  }
  if (pathname.startsWith('/hi/')) {
    return pathname.slice(3);
  }
  return pathname;
}

export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const withoutPrefix = stripLocalePrefix(clean);
  if (withoutPrefix === '/') {
    return `/${locale}`;
  }
  return `/${locale}${withoutPrefix}`;
}

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname === '/hi' || pathname.startsWith('/hi/')) {
    return 'hi';
  }
  return 'en';
}
