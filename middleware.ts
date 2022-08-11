// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const authCookie: any = request.cookies.get('auth');
  if (authCookie === undefined) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/profile', '/favorites', '/recipe/:path*']
};
