import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect dashboard routes - allow public API and auth routes
  // Only protect truly sensitive routes. Keep dashboard, locations, analytics and maps public.
  if (pathname.startsWith('/settings') || pathname.startsWith('/api/protected')) {
    const token = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      // preserve the intended path so user can be redirected after login
      url.searchParams.set('next', req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/settings/:path*', '/api/protected/:path*'],
};
