import React from "react";
import { RegisterFrom } from "@/components/RegisterForm";

const Register: React.FC = () => {
  return (
    <div className="grid min-h-svh dark:bg-[#1a1a1a] lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterFrom />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-[#27272A] lg:block">
      </div>
    </div>
  );
};

export default Register;
