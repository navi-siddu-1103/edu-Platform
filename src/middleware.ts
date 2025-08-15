import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const url = request.nextUrl.clone();

  // Define routes that are considered "authentication" pages
  const authRoutes = ['/auth/signin', '/auth/signup'];
  // Define routes that are protected and require authentication
  const protectedRoutes = ['/dashboard'];

  // Check if the current path starts with any of the protected routes
  const isProtectedRoute = protectedRoutes.some(route => url.pathname.startsWith(route));
  const isAuthRoute = authRoutes.includes(url.pathname);

  // If there's no session cookie
  if (!session) {
    // If trying to access a protected route without a session, redirect to sign-in
    if (isProtectedRoute) {
      url.pathname = '/auth/signin';
      return NextResponse.redirect(url);
    }
    // Otherwise, allow access
    return NextResponse.next();
  }

  // If there is a session, verify it
  const response = await fetch(`${url.origin}/api/auth/verify`, {
    headers: {
      'Cookie': `session=${session}`
    }
  });

  const { isAuthenticated } = await response.json();

  if (isAuthenticated) {
    // If authenticated and trying to access an auth page, redirect to the dashboard
    if (isAuthRoute) {
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  } else {
    // If the session is invalid (not authenticated)
    // and they are on a protected route, redirect to sign-in and clear the bad cookie
    if (isProtectedRoute) {
      url.pathname = '/auth/signin';
      const redirectResponse = NextResponse.redirect(url);
      redirectResponse.cookies.delete("session");
      return redirectResponse;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
