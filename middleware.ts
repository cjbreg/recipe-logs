// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import type { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';
import { verifyToken } from 'src/web/token';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const authCookie: any = request.cookies.get('auth');
  if (authCookie === undefined) {
    return NextResponse.redirect(`${request.url}auth`);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/'
};
