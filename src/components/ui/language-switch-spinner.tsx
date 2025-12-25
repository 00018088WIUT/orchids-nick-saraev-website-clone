"use client";
import React from "react";
import { useLanguageSwitchLoading } from "@/components/language-switch-loading-provider";
import { Spinner } from "@/components/ui/spinner";

export default function LanguageSwitchSpinner() {
  const { isLoading } = useLanguageSwitchLoading();
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-white/80 dark:bg-black/80 transition-colors">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="w-12 h-12 text-primary" />
        <span className="text-lg font-medium text-primary">Switching language...</span>
      </div>
    </div>
  );
}
