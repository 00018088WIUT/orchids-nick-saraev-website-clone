import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'uz'];
const defaultLocale = 'en';

function getLocale(request: NextRequest) {
  // Check if there's a cookie first
  const cookieLocale = request.cookies.get('language')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // Then check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    if (acceptLanguage.includes('uz')) return 'uz';
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname starts with any of the locales
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  // Create a response and set the cookie if it wasn't there
  const response = NextResponse.redirect(request.nextUrl);
  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
