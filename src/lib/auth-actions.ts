
"use server";

import { z } from "zod";
import { auth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import clientPromise from "./mongodb";
import type { UserRecord } from "firebase-admin/auth";

const SignUpSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  college: z.string().min(1, "College name is required."),
  place: z.string().min(1, "Place is required."),
});

export type FormState = {
  error?: string;
  success?: boolean;
  customToken?: string;
}

export async function createInitialUserAction(values: z.infer<typeof SignUpSchema>): Promise<FormState> {
  if (!auth) {
    return { error: "Firebase Admin SDK not initialized." };
  }
  
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    const errorMessage = validatedFields.error.issues.map(issue => issue.message).join(' ');
    return { error: errorMessage };
  }

  const { email, password, firstName, lastName, college, place } = validatedFields.data;
  const displayName = `${firstName} ${lastName}`;
  let userRecord: UserRecord | null = null;

  try {
    // Step 1: Create user in Firebase Auth
    userRecord = await auth.createUser({
      email,
      password,
      displayName,
    });
    
    // Step 2: Add user to your MongoDB database
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");
    
    const newUser = {
      uid: userRecord.uid,
      email: validatedFields.data.email,
      firstName: validatedFields.data.firstName,
      lastName: validatedFields.data.lastName,
      displayName: displayName,
      college: validatedFields.data.college,
      place: validatedFields.data.place,
      createdAt: new Date(),
    };

    await usersCollection.insertOne(newUser);
    
    // Step 3: Create a custom token for the client to sign in with.
    const customToken = await auth.createCustomToken(userRecord.uid);

    return { success: true, customToken };

  } catch (error: any) {
    // Rollback: If any step fails, delete the user from Firebase Auth if they were created
    if (userRecord) {
      await auth.deleteUser(userRecord.uid).catch(delErr => console.error("Failed to rollback Firebase user:", delErr));
    }
    
    if (error.code === 'auth/email-already-exists') {
        return { error: "EMAIL_EXISTS" };
    }
    console.error("Error in createInitialUserAction:", error);
    return { error: error.message || "An unknown error occurred during user creation." };
  }
}

export async function createSessionAction(idToken: string) {
    if (!auth) {
      return { error: "Firebase Admin SDK not initialized." };
    }
    try {
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
        cookies().set("session", sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' });
        return { success: true };
    } catch (error) {
        console.error("Error creating session cookie:", error);
        return { error: "Failed to create session." };
    }
}


export async function signOutAction() {
  cookies().delete("session");
  redirect("/");
}
