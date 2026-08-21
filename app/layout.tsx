import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeBackground } from "@/components/ui/theme-background";
import { AIChatWidget } from "@/components/ai-chat-widget";
import { GlobalEligibilityButton } from "@/components/global-eligibility-button";
import { headers } from "next/headers";

import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "ShreeFinance - Digital Loans & Multi-Bank Aggregator",
  description: "Compare Home Loans, Personal Loans & Business Loans across YES Bank, SBI, HDFC, ICICI, and Shree Finance Direct. 100% digital paperless approval.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-next-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased font-sans bg-[#f8fafc] dark:bg-[#121417] text-slate-900 dark:text-white min-h-screen flex flex-col selection:bg-emerald-500/20 selection:text-emerald-800 relative transition-colors duration-300")}>
        <ThemeProvider>
          <ThemeBackground />
          {!isAdmin && <SiteHeader />}
          <main className="flex-1">
            {children}
          </main>
          {!isAdmin && <SiteFooter />}
          {!isAdmin && <AIChatWidget />}
          {!isAdmin && <GlobalEligibilityButton />}
        </ThemeProvider>
      </body>
    </html>
  );
}
