
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

async function addUserToDatabase(user: UserRecord, extraData: { firstName: string; lastName: string; college: string; place: string; }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");
    const displayName = `${extraData.firstName} ${extraData.lastName}`;

    const newUser = {
      uid: user.uid,
      email: user.email,
      firstName: extraData.firstName,
      lastName: extraData.lastName,
      displayName: displayName,
      college: extraData.college,
      place: extraData.place,
      createdAt: new Date(),
    };

    await usersCollection.insertOne(newUser);
    console.log(`User ${user.email} added to MongoDB.`);
  } catch (error) {
    console.error("Error adding user to MongoDB:", error);
    // If the database insert fails, we should delete the user from Firebase Auth to prevent orphaned accounts.
    if (auth) {
      await auth.deleteUser(user.uid);
    }
    throw new Error("Failed to save user data. User creation has been rolled back.");
  }
}

export async function createInitialUserAction(values: z.infer<typeof SignUpSchema>): Promise<FormState> {
  if (!auth) {
    return { error: "Firebase Admin SDK not initialized." };
  }
  
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    // Collect all errors into a single string.
    const errorMessage = validatedFields.error.issues.map(issue => issue.message).join(' ');
    return { error: errorMessage };
  }

  const { email, password, firstName, lastName, college, place } = validatedFields.data;
  const displayName = `${firstName} ${lastName}`;

  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName,
    });
    
    await addUserToDatabase(userRecord, { firstName, lastName, college, place });

    const customToken = await auth.createCustomToken(userRecord.uid);

    return { success: true, customToken: customToken };
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
