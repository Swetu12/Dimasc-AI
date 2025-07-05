import React from "react";
import { useUser } from "@/context/UserContext";
import ChangeEmailModal from "@/components/settings/ChangeEmailModal";
import ChangePasswordModal from "@/components/settings/ChangePasswordModal";

export default function UserInfoCard() {
    const { user } = useUser();

    return (
        <div className="rounded-2xl dark:bg-background p-5 lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex grow flex-col">
                    <h4 className="text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
                        Personal Information
                    </h4>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-7 2xl:gap-x-32">
                        <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                Email address
                            </p>
                            <div className={`flex w-full items-center space-x-5`}>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {user?.email}
                                </p>
                                <ChangeEmailModal userEmail={user?.email} />
                            </div>
                        </div>

                        <div>
                            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                Password
                            </p>
                            <div className={`flex w-full items-center space-x-5`}>
                                <div className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    <p>••••••••••••</p>
                                </div>
                                <ChangePasswordModal />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
