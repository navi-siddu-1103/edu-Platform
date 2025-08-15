
"use server";

import { z } from "zod";
import { auth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import clientPromise from "./mongodb";
import type { UserRecord } from "firebase-admin/auth";

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type FormState = {
  error?: string;
  success?: boolean;
}

async function addUserToDatabase(user: UserRecord) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    const newUser = {
      uid: user.uid,
      email: user.email,
      createdAt: new Date(),
    };

    await usersCollection.insertOne(newUser);
    console.log(`User ${user.email} added to MongoDB.`);
  } catch (error) {
    console.error("Error adding user to MongoDB:", error);
    // Depending on the use case, you might want to handle this error more gracefully
    // For example, by deleting the user from Firebase Auth if the DB insert fails.
    throw new Error("Failed to save user data.");
  }
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
    const userRecord = await auth.createUser({
      email,
      password,
    });
    
    // After creating the user in Firebase Auth, add them to MongoDB
    await addUserToDatabase(userRecord);

    return { success: true };
  } catch (error: any) {
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
