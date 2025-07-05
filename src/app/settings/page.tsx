"use client";

import React from "react";
import SubscriptionSection from "@/components/settings/SubscriptionSection";
import ThemeToggle from "@/components/settings/ThemeToggle";
import UserInfoCard from "@/components/settings/UserInfoCard";

export default function Settings() {
  return (
    <div>
      <div className="dark-mode-bg rounded-2xl p-5 lg:p-6 bg-background">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 lg:mb-7 dark:text-white/90">
          Settings
        </h3>
        <div className="space-y-6">
          <UserInfoCard />
          <SubscriptionSection />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
