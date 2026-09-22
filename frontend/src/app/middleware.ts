import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes accessible without authentication
const PUBLIC_AUTH_ROUTES = ['/login', '/register'];

// Role-based route access boundaries
const ROLE_ROUTE_MAP: Record<string, string> = {
  patient: '/patient',
  doctor: '/doctor',
  admin: '/admin',
};

/**
 * Next.js Edge Middleware for CareFlow Route Protection & RBAC
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Retrieve auth credentials from cookies
  const tokenCookie = request.cookies.get('token')?.value;
  const userCookie = request.cookies.get('user')?.value;

  let userRole: string | null = null;

  if (userCookie) {
    try {
      const parsedUser = JSON.parse(userCookie);
      userRole = parsedUser?.role || null;
    } catch {
      // If cookie JSON parsing fails, fall back to checking role-specific cookies
      userRole = request.cookies.get('userRole')?.value || null;
    }
  }

  const isAuthenticated = Boolean(tokenCookie);

  // 1. Unauthenticated users attempting to access protected dashboard routes
  const isDashboardRoute =
    pathname.startsWith('/patient') ||
    pathname.startsWith('/doctor') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard');

  if (isDashboardRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Authenticated users attempting to access /login or /register
  const isAuthRoute = PUBLIC_AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isAuthRoute && isAuthenticated) {
    const targetDashboard =
      userRole && ROLE_ROUTE_MAP[userRole]
        ? ROLE_ROUTE_MAP[userRole]
        : '/patient';
    return NextResponse.redirect(new URL(targetDashboard, request.url));
  }

  // 3. Role-Based Access Control (RBAC) Enforcement for logged-in users
  if (isAuthenticated && userRole) {
    if (pathname.startsWith('/patient') && userRole !== 'patient') {
      const correctPortal = ROLE_ROUTE_MAP[userRole] || '/login';
      return NextResponse.redirect(new URL(correctPortal, request.url));
    }

    if (pathname.startsWith('/doctor') && userRole !== 'doctor') {
      const correctPortal = ROLE_ROUTE_MAP[userRole] || '/login';
      return NextResponse.redirect(new URL(correctPortal, request.url));
    }

    if (pathname.startsWith('/admin') && userRole !== 'admin') {
      const correctPortal = ROLE_ROUTE_MAP[userRole] || '/login';
      return NextResponse.redirect(new URL(correctPortal, request.url));
    }
  }

  // Allow request to proceed normally
  return NextResponse.next();
}

/**
 * Configure Matcher to exclude static assets, api routes, and Next.js internals
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes (/api/*)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public asset extensions (.png, .jpg, .svg, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};