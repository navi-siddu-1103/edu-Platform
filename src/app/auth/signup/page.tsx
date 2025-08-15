
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInWithEmailAndPassword } from "firebase/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { createInitialUserAction, createSessionAction } from "@/lib/auth-actions";

const SignUpSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  college: z.string().min(1, { message: "College name is required." }),
  place: z.string().min(1, { message: "Place is required." }),
});

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      college: "",
      place: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    try {
      // First, create user on the server to handle auth records properly
      const userCreationResult = await createInitialUserAction(values);
      if (!userCreationResult.success) {
        throw new Error(userCreationResult.error || "Failed to create user.");
      }
      
      // Then, attempt to sign in the newly created user on the client to get the ID token
      // We add a retry mechanism to handle potential replication delays in Firebase Auth.
      let userCredential;
      for (let i = 0; i < 3; i++) {
        try {
          await delay(1000 * (i + 1)); // Wait 1s, then 2s
          userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
          break; // If sign-in is successful, break the loop
        } catch (error) {
          if (i === 2) throw error; // If it fails on the last attempt, re-throw the error
        }
      }

      if (!userCredential) {
        throw new Error("Could not sign in the new user.");
      }

      const idToken = await userCredential.user.getIdToken();

      // Create a session cookie
      const sessionResult = await createSessionAction(idToken);
      if (sessionResult.success) {
        toast({
          title: "Sign up successful!",
          description: "Welcome! You're now logged in.",
        });
        router.push("/dashboard");
      } else {
        throw new Error(sessionResult.error || "Failed to create session.");
      }
    } catch (error: any) {
      let description = "An unexpected error occurred. Please try again.";
      if (error.code === 'auth/email-already-in-use' || error.message?.includes('EMAIL_EXISTS')) {
        description = "This email is already in use. Please sign in.";
      } else if (error.code === 'auth/invalid-credential') {
        description = "Sign-up failed after user creation. Please try signing in.";
      }
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: description,
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-full py-8">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
               <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
               <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="college"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College</FormLabel>
                    <FormControl>
                      <Input placeholder="University of Example" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="place"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Place</FormLabel>
                    <FormControl>
                      <Input placeholder="City, Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Creating account..." : "Create an account"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/signin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
