import React from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import Image from "next/image";

const ForgotPassword: React.FC = () => {
  return (
    <div className="dark:bg-[#1a1a1a] grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-[#27272A] lg:block">
      </div>
    </div>
  );
};

export default ForgotPassword;
