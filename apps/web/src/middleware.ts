// apps/mini-app/src/middleware.ts

import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value

  // Protect routes
  if (request.nextUrl.pathname.startsWith('/profile') && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/stats/:path*'],
}