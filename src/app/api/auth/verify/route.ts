import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { auth } from '@/lib/firebase-admin';

export async function GET() {
  const session = cookies().get('session')?.value;

  if (!auth) {
    // If Firebase Admin is not initialized, we cannot verify the session.
    // We'll treat the user as unauthenticated in this case.
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }

  if (!session) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  try {
    await auth.verifySessionCookie(session, true);
    return NextResponse.json({ isAuthenticated: true });
  } catch (error) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
