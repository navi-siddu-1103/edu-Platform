"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { signUpAction } from "@/lib/auth-actions";
import { useEffect, useState } from "react";

const SignUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const initialState = {
  error: undefined,
  success: undefined,
};

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [state, formAction] = useFormState(signUpAction, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsSubmitting(false);
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: state.error,
      });
    }
    if (state?.success) {
      toast({
        title: "Sign up successful!",
        description: "Please sign in with your new account.",
      });
      router.push("/auth/signin");
    }
  }, [state, toast, router]);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const onSubmit = (formData: FormData) => {
    setIsSubmitting(true);
    formAction(formData);
  };


  return (
    <div className="flex items-center justify-center min-h-full">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={onSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Create an account"}
              </Button>
            </div>
          </form>
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

// Dummy Label component to satisfy TS until we can resolve module issue
const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label {...props} />
);
