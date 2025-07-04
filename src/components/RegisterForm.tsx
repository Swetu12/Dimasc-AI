"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/stores/AuthStore";
import { FormValuesSignUp } from "@/types/AuthTypes";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function RegisterFrom({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const {
    step,
    loading,
    errors,
    registerEmail,
    validateEmail,
    setCredentials,
  } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    watch,
    control,
  } = useForm<FormValuesSignUp>();
  const router = useRouter();
  const password = watch("password");

  const onSubmit = async (data: FormValuesSignUp) => {
    if (step === 1) {
      await registerEmail(data.email);
    } else if (step === 2) {
      await validateEmail(data.code);
    } else if (step === 3) {
      await setCredentials(data.password);
      router.push("/sign-in");
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster position={`top-center`} richColors />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-6">
        {step === 1 && (
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
              <p className="text-sm text-red-500">{formErrors.email.message}</p>
            )}
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-2">
            <Controller
              control={control}
              name="code"
              rules={{
                required: "OTP code is required",
                minLength: {
                  value: 6,
                  message: "",
                },
              }}
              render={({ field }) => (
                <div className="flex justify-center">
                  {" "}
                  <InputOTP
                    {...field}
                    maxLength={6}
                    value={String(field.value || "")}
                    className="w-96"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} {...field} />
                      <InputOTPSlot index={1} {...field} />
                      <InputOTPSlot index={2} {...field} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} {...field} />
                      <InputOTPSlot index={4} {...field} />
                      <InputOTPSlot index={5} {...field} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              )}
            />
            {formErrors.code && (
              <p className="text-sm text-red-500">{formErrors.code.message}</p>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
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
              <p className="text-sm text-red-500">
                {formErrors.password.message}
              </p>
            )}
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}

            <Label htmlFor="confirmPassword" className="mt-4">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {formErrors.confirmPassword && (
              <p className="text-sm text-red-500">
                {formErrors.confirmPassword.message}
              </p>
            )}
          </div>
        )}

        <Button
          type="button"
          className="w-full"
          onClick={handleSubmit(onSubmit)}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="h-4 w-4 animate-spin" />
              Loading...
            </span>
          ) : (
            "Next"
          )}
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4"></div>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/sign-in" className="underline underline-offset-4">
          Sign In
        </Link>
      </div>
    </form>
  );
}
