import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Language routing disabled - default to English only
// To re-enable multi-language support, uncomment the code below

// const locales = ['en', 'uz'];
// const defaultLocale = 'en';

// function getLocale(request: NextRequest) {
//   // Check if there's a cookie first
//   const cookieLocale = request.cookies.get('language')?.value;
//   if (cookieLocale && locales.includes(cookieLocale)) {
//     return cookieLocale;
//   }

//   // Then check Accept-Language header
//   const acceptLanguage = request.headers.get('accept-language');
//   if (acceptLanguage) {
//     if (acceptLanguage.includes('uz')) return 'uz';
//   }

//   return defaultLocale;
// }

// Rate limiting for admin routes
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimit.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 5) { // Max 5 attempts per minute
    return false;
  }

  limit.count++;
  return true;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Block the obvious /admin path
    return new NextResponse('Not Found', { status: 404 });
  }

  // Rate limit the secret admin path
  const secretPath = process.env.ADMIN_SECRET_PATH || 'dashboard-zx9k2m4p';
  if (pathname.startsWith(`/${secretPath}`)) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    if (!checkRateLimit(ip)) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
