"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

interface LanguageSwitchLoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const LanguageSwitchLoadingContext = createContext<LanguageSwitchLoadingContextType | undefined>(undefined);

export const LanguageSwitchLoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const setLoading = useCallback((loading: boolean) => setIsLoading(loading), []);
  return (
    <LanguageSwitchLoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LanguageSwitchLoadingContext.Provider>
  );
};

export const useLanguageSwitchLoading = () => {
  const context = useContext(LanguageSwitchLoadingContext);
  if (!context) {
    throw new Error("useLanguageSwitchLoading must be used within LanguageSwitchLoadingProvider");
  }
  return context;
};
