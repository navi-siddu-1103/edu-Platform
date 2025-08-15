import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const url = request.nextUrl.clone();

  // If there's no session cookie, handle redirection for protected routes
  if (!session) {
    if (url.pathname.startsWith('/dashboard')) {
      url.pathname = '/auth/signin';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // If there is a session, verify it by calling our API route
  const response = await fetch(`${url.origin}/api/auth/verify`, {
    headers: {
      'Cookie': `session=${session}`
    }
  });

  const { isAuthenticated } = await response.json();

  // If authenticated and trying to access auth pages, redirect to dashboard
  if (isAuthenticated && url.pathname.startsWith('/auth')) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // If not authenticated and trying to access protected dashboard, redirect to sign-in
  if (!isAuthenticated && url.pathname.startsWith('/dashboard')) {
    url.pathname = '/auth/signin';
    // Clear the invalid session cookie
    const redirectResponse = NextResponse.redirect(url);
    redirectResponse.cookies.delete("session");
    return redirectResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
