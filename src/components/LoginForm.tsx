"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { Github, Loader } from "lucide-react";
import { IconBrandApple, IconBrandGoogle } from "@tabler/icons-react";
import { FormValuesSignIn } from "@/types/AuthTypes";
import { useAuthStore } from "@/stores/AuthStore";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { loading, errors, login, isAuthenticated } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormValuesSignIn>();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: FormValuesSignIn) => {
    await login(data);
  };

  useEffect(() => {
    if (errors.auth) {
      toast.error(errors.auth);
    }
  }, [errors.auth]);

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Toaster position={`top-center`} richColors />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {formErrors.email && (
            <p className={`text-sm text-red-500`}>{formErrors.email.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href={"/forgot-password"}
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                message:
                  "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
              },
            })}
          />
          {formErrors.password && (
            <p className={`text-sm text-red-500`}>
              {formErrors.password.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="h-4 w-4 animate-spin" />
              Loading...
            </span>
          ) : (
            "Login"
          )}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Button variant="outline" className="w-full">
            <IconBrandApple />
            <span className="sr-only">Login with Apple</span>
          </Button>
          <Button variant="outline" className="w-full">
            <IconBrandGoogle />
            <span className="sr-only">Login with Google</span>
          </Button>
          <Button variant="outline" className="w-full">
            <Github />
            <span className="sr-only">Login with Github</span>
          </Button>
        </div>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
