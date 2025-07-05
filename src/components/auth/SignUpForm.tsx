'use client'

import React from "react";
import Link from "next/link";
import { RegisterFrom } from "@/components/RegisterForm";
import Image from "next/image";
import { useTheme } from "next-themes";

const Register: React.FC = () => {
    const { resolvedTheme } = useTheme();

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href={"/"}>
                        <div className={`flex items-center justify-start flex-row space-x-3 ml-2 my-2`}>
                            <Image src={`${resolvedTheme === 'light' ? '/logo-black.svg' : '/logo.svg'}`} alt={`logo`} width={25} height={25} />
                            <h1 className="text-lg font-bold text-black dark:text-white">
                                Dimasc AI
                            </h1>
                        </div>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <RegisterFrom />
                    </div>
                </div>
            </div>
            <div className="relative hidden lg:flex items-center justify-center bg-[#27272A]">
                <div className="relative w-[50vw] h-[50vh]">
                    <Image
                        src={resolvedTheme === 'light' ? '/logo-black.svg' : '/logo.svg'}
                        alt="Logo Background"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
