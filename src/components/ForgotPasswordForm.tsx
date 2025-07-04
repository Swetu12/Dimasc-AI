"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { Loader } from "lucide-react";
import { FormValuesForgotPassword } from "@/types/AuthTypes";
import { useAuthStore } from "@/stores/AuthStore";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormValuesForgotPassword>();
  const { loading, errors, resetEmailSent, forgotPassword } = useAuthStore();

  useEffect(() => {
    if (resetEmailSent) {
      toast.success("Reset password email sent successfully");
    }
  }, [resetEmailSent]);

  useEffect(() => {
    if (errors.reset) {
      toast.error(errors.reset);
    }
  }, [errors.reset]);

  const onSubmit = async (data: FormValuesForgotPassword) => {
    await forgotPassword(data.email);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Toaster position={`top-center`} richColors />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forgot your Password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to receive a reset password email
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

        <Button type="submit" className="w-full">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="h-4 w-4 animate-spin" />
              Loading...
            </span>
          ) : (
            "Send Email"
          )}
        </Button>
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
