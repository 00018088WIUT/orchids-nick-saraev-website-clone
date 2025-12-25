import LanguageSwitchSpinner from "@/components/ui/language-switch-spinner";
import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./../globals.css";
import VisualEditsMessenger from "../../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Ziyodulla Abdullayev",
  description: "Personal blog and portfolio of Ziyodulla Abdullayev.",
  icons: {
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1766425144441.png?width=32&height=32&resize=contain",
  },
};

import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { LanguageSwitchLoadingProvider } from "@/components/language-switch-loading-provider";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${dmSans.variable} ${outfit.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageSwitchLoadingProvider>
            <LanguageProvider>
              <Script
                id="orchids-browser-logs"
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
                strategy="afterInteractive"
                data-orchids-project-id="0a11ba3b-064b-46ae-8a64-25cfaa3ed80d"
              />
              <ErrorReporter />
              <Script
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
                strategy="afterInteractive"
                data-target-origin="*"
                data-message-type="ROUTE_CHANGE"
                data-include-search-params="true"
              />
              <LanguageSwitchSpinner />
              {children}
            </LanguageProvider>
          </LanguageSwitchLoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
