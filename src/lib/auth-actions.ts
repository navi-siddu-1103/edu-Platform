
"use server";

import { z } from "zod";
import { auth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type FormState = {
  error?: string;
  success?: boolean;
}

export async function createInitialUserAction(values: z.infer<typeof SignUpSchema>): Promise<FormState> {
  if (!auth) {
    return { error: "Firebase Admin SDK not initialized." };
  }
  
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  try {
    await auth.createUser({
      email,
      password,
    });
    return { success: true };
  } catch (error: any) {
    if (error.code === 'auth/email-already-exists') {
        return { error: "EMAIL_EXISTS" };
    }
    return { error: "An unknown error occurred during user creation." };
  }
}

export async function createSessionAction(idToken: string) {
    if (!auth) {
      return { error: "Firebase Admin SDK not initialized." };
    }
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
