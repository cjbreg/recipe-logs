// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import type { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log('middleware bb');

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/user'
};
