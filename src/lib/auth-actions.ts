"use server";

import { z } from "zod";
import { auth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
});

export type SignUpState = {
  error?: string;
  success?: boolean;
}

export async function signUpAction(prevState: SignUpState, formData: FormData): Promise<SignUpState> {
  const validatedFields = SignUpSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  try {
    await auth.createUser({
      email,
      password,
    });
    // Note: In a real app, you might want to send a verification email.
    // For this prototype, we'll consider the user signed up.
    
    // To complete the flow, we will sign the user in. We need a custom token for that.
    // This is a simplified version. A real app would handle this more robustly.
    return { success: true };
  } catch (error: any) {
    if (error.code === 'auth/email-already-exists') {
        return { error: "Email already in use." };
    }
    return { error: "An unknown error occurred." };
  }
}

export type SignInState = {
  error?: string;
  success?: boolean;
}

export async function signInAction(prevState: SignInState, formData: FormData): Promise<SignInState> {
  // This function is not directly used by the client-side sign in form
  // but is here for server-side logic if needed.
  // The client will handle sign-in and then send the ID token.
  return { error: "Use client-side sign-in." };
}

export async function createSessionAction(idToken: string) {
    try {
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
        cookies().set("session", sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });
        return { success: true };
    } catch (error) {
        return { error: "Failed to create session." };
    }
}


export async function signOutAction() {
  cookies().delete("session");
  redirect("/");
}
