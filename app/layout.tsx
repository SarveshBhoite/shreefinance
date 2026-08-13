import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeBackground } from "@/components/ui/theme-background";
import { AIChatWidget } from "@/components/ai-chat-widget";
import { GlobalEligibilityButton } from "@/components/global-eligibility-button";
import { headers } from "next/headers";

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
    <html lang="en">
      <body className={cn("antialiased font-sans bg-[#181a1d] text-white min-h-screen flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300 relative")}>
        <ThemeBackground />
        {!isAdmin && <SiteHeader />}
        <main className="flex-1">
          {children}
        </main>
        {!isAdmin && <SiteFooter />}
        {!isAdmin && <AIChatWidget />}
        {!isAdmin && <GlobalEligibilityButton />}
      </body>
    </html>
  );
}
