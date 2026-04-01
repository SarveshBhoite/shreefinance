import type { Metadata } from "next";
import { Sora, Urbanist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { headers } from "next/headers";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" });

export const metadata: Metadata = {
  title: "ShreeFinance",
  description: "Your Trusted Financial Partner - Loans, Cards, Insurance & Investments",
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
      <body className={cn(sora.variable, urbanist.variable, "antialiased font-sans bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-50 min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary-foreground")}>
        {!isAdmin && <SiteHeader />}
        <main className="flex-1">
          {children}
        </main>
        {!isAdmin && <SiteFooter />}
      </body>
    </html>
  );
}
