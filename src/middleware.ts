import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/firebase-admin";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  // If no session cookie, redirect to sign-in for protected routes
  if (!session) {
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    return NextResponse.next();
  }

  // Verify the session cookie.
  try {
    const decodedIdToken = await auth.verifySessionCookie(session, true);
    
    // If user is authenticated and tries to access auth pages, redirect to dashboard
    if (request.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    // Attach user to request headers for server components
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('X-User-Id', decodedIdToken.uid);
    requestHeaders.set('X-User-Email', decodedIdToken.email!);
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (error) {
    // Session cookie is invalid. Clear it and redirect to sign-in for protected routes.
    const response = NextResponse.next();
    response.cookies.delete("session");
    
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
  unstable_allowDynamic: [
    // Using a glob pattern to allow paths like following to be resolved:
    // "**/node_modules/firebase-admin/lib/auth/auth-api-request.js",
    "**/node_modules/firebase-admin/**",
  ],
};
