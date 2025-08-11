import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "nl-NL", "nl"];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) {
    return locales[0]; // Default to the first locale if no header is present
  }

  const acceptedLocales = acceptLanguage.split(",").map((lang) => lang.split(";")[0].trim());

  for (const locale of acceptedLocales) {
    if (locales.includes(locale)) {
      return locale; // Return the first matching locale
    }
  }

  return locales[0]; // Default to the first locale if no match is found
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  if (pathname?.startsWith("/api/")) {
    return;
  }
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
