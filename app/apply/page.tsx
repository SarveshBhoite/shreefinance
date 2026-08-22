import { Deal4LoansDynamicForm } from "@/components/forms/deal4loans-dynamic-form";
import { Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Direct Bank Facility Loan Application | Shree Finance",
    description: "Complete your multi-bank direct facility loan application online with Shree Finance. Compare live quotes and sanction offers from 40+ partner banks."
};

export default function ApplyPage() {
    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-900 py-12 md:py-16">
            <div className="container px-4 sm:px-6 mx-auto max-w-5xl space-y-8">
                {/* Top Banner Header */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-sky-500/10 text-[#38bdf8] text-xs font-black uppercase tracking-wider border border-sky-500/30">
                        <Sparkles className="h-4 w-4" /> Official Bank Underwriting Portal
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                        Shree Finance Direct Bank Facility Application
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-medium">
                        Complete your application below to compare live sanction letters and lock in lowest benchmark interest rates across 40+ partner banks.
                    </p>
                </div>

                {/* Main Dynamic Deal4Loans Modular Form */}
                <div id="application-form" className="scroll-mt-24">
                    <Deal4LoansDynamicForm
                        showCategorySwitcher={true}
                        initialLoanType="personal"
                    />
                </div>

                {/* Bottom Trust & Security Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-slate-400 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                        <ShieldCheck className="h-6 w-6 text-[#0284c7] shrink-0" />
                        <div>
                            <p className="font-bold text-white">256-Bit SSL Encrypted</p>
                            <p className="text-[11px]">Bank-grade 100% data protection</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-amber-400 shrink-0" />
                        <div>
                            <p className="font-bold text-white">Zero Processing Fee Deals</p>
                            <p className="text-[11px]">Direct bank portal concession</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                        <Sparkles className="h-6 w-6 text-sky-400 shrink-0" />
                        <div>
                            <p className="font-bold text-white">40+ Partner Banks</p>
                            <p className="text-[11px]">SBI, HDFC, ICICI, Axis, YES Bank</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
