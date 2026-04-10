import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Get user role and authentication status from cookies
  // In a real app, you would verify a JWT token from the cookie
  const userRole = request.cookies.get('user-role')?.value;
  const isAuthenticated = request.cookies.get('session')?.value;

  const { pathname } = request.nextUrl;

  // 2. Protect Admin Routes
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated || userRole !== 'admin') {
      // Redirect unauthorized users to the client dashboard or home
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 3. Protect Staff Routes
  if (pathname.startsWith('/staff')) {
    if (!isAuthenticated || userRole !== 'staff') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 4. Protect Client Dashboard
  if (pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      // Redirect unauthenticated users to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 5. Redirect visitors away from Login/Signup if already authenticated
  if ((pathname === '/login' || pathname === '/signup') && isAuthenticated) {
    if (userRole === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    if (userRole === 'staff') {
      return NextResponse.redirect(new URL('/staff', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/staff/:path*', '/login', '/signup'],
};
