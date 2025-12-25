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
import { createSessionAction } from "@/lib/auth-actions";

const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const idToken = await userCredential.user.getIdToken();
      
      const result = await createSessionAction(idToken);

      if (result.success) {
        router.push("/dashboard");
      } else {
         toast({
          variant: "destructive",
          title: "Sign in failed",
          description: result.error,
        });
      }
    } catch (error: any) {
      let description = "An unexpected error occurred. Please try again.";
      if (error.code === 'auth/invalid-credential') {
        description = "Invalid email or password. Please try again.";
      }
       toast({
        variant: "destructive",
        title: "Sign in failed",
        description: description,
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-full">
      <Card className="mx-auto max-w-sm border-2 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Sign In</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" className="transition-all focus:ring-2 focus:ring-primary/50" {...field} />
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
                      <Input type="password" className="transition-all focus:ring-2 focus:ring-primary/50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full btn-gradient shadow-md hover:shadow-lg" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="underline text-primary hover:text-accent transition-colors">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
