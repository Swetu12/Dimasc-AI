'use client'

import React from "react";
import { LoginForm } from "@/components/LoginForm";
import { useTheme } from "next-themes";

const SignInForm = () => {
  return (
    <div className="grid dark:bg-[#1a1a1a] min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-[#27272A] lg:block">
      </div>
    </div>
  );
};
export default SignInForm;
