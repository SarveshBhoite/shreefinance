"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle2, ShieldCheck, Home, Briefcase, Building2, Car, ChevronRight, Download, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";

export default function DocumentsRequiredPage() {
    const [activeTab, setActiveTab] = useState<"home" | "personal" | "business" | "lap" | "car">("home");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const docCategories = {
        home: {
            title: "Home Loan Document Checklist",
            icon: Home,
            sections: [
                {
                    title: "1. Identity & Address Proof (KYC)",
                    docs: ["Aadhaar Card (Mandatory)", "PAN Card (Mandatory)", "Passport / Voter ID / Driving License", "Current Address Proof (Utility Bill / Rent Agreement)"]
                },
                {
                    title: "2. Financial & Income Proof",
                    docs: ["Latest 6 Months Salary Slips (for Salaried)", "Form 16 / ITR for last 2 Assessment Years", "Last 6 Months Bank Statement (Salary Account)", "Audited Financial Statements for last 3 Years (for Self-Employed)"]
                },
                {
                    title: "3. Property Legal Documents",
                    docs: ["Allotment Letter / Buyer Agreement", "Property Chain Title Deeds & Index II", "Approved Building Plan & Commencement Certificate", "NOC from Builder / Housing Society"]
                }
            ]
        },
        personal: {
            title: "Personal Loan Document Checklist",
            icon: Briefcase,
            sections: [
                {
                    title: "1. Identity & Address Proof (KYC)",
                    docs: ["PAN Card (Mandatory)", "Aadhaar Card", "Current Residential Address Proof"]
                },
                {
                    title: "2. Income Verification",
                    docs: ["Latest 3 Months Salary Slips", "Latest 6 Months Bank Account Statement (Salary Credit)", "Form 16 for current financial year"]
                }
            ]
        },
        business: {
            title: "Business Loan Document Checklist",
            icon: Building2,
            sections: [
                {
                    title: "1. Business Entity Registration Proof",
                    docs: ["GST Registration Certificate", "Shop & Establishment License / Udyam Certificate", "Partnership Deed / MOA & AOA for Companies"]
                },
                {
                    title: "2. Financial & Tax Statements",
                    docs: ["Audited Financials (P&L and Balance Sheet) for last 2 Years", "ITR returns with Computation of Income for last 2 Years", "Latest 12 Months Current Bank Account Statement"]
                }
            ]
        },
        lap: {
            title: "Loan Against Property Checklist",
            icon: Building2,
            sections: [
                {
                    title: "1. KYC & Property Ownership",
                    docs: ["KYC Documents of all Applicant & Co-Applicants", "Property Ownership Title Deed (Registered Sale Deed)", "Property Tax Receipts & Maintenance Bills"]
                },
                {
                    title: "2. Financial Documentation",
                    docs: ["Last 3 Years ITR with Computation", "Last 12 Months Bank Account Statement", "Existing Loan Sanction Letters & Track Records"]
                }
            ]
        },
        car: {
            title: "Car Loan Document Checklist",
            icon: Car,
            sections: [
                {
                    title: "1. Borrower KYC",
                    docs: ["PAN Card & Aadhaar Card", "Driving License", "Passport Size Photographs"]
                },
                {
                    title: "2. Vehicle & Income Proof",
                    docs: ["Vehicle Proforma Invoice from Authorized Dealer", "Last 3 Months Salary Slips / 2 Yrs ITR", "Last 6 Months Bank Statement"]
                }
            ]
        }
    };

    const currentCat = docCategories[activeTab];

    return (
        <main className="min-h-screen bg-white text-white font-sans py-16 md:py-24 relative overflow-hidden">
            {/* Background Light Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0284c7]/15 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-50 rounded-full blur-[120px] pointer-events-none" />

            <div className="container px-4 md:px-6 lg:px-8 mx-auto relative z-10 space-y-12">
                {/* Header */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 px-4 py-1.5 text-xs font-black text-[#0284c7] uppercase tracking-widest"
                    >
                        <FileText className="h-4 w-4" />
                        Complete Multi-Bank Document Guide
                    </motion.div>
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
                        Required <span className="text-[#0284c7]">Documents</span> Checklist
                    </h1>
                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
                        Keep these essential documents ready for instant 30-minute digital loan sanction and paperless disbursal.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center flex-wrap gap-2">
                    {[
                        { id: "home", label: "Home Loan" },
                        { id: "personal", label: "Personal Loan" },
                        { id: "business", label: "Business Loan" },
                        { id: "lap", label: "Loan vs Property" },
                        { id: "car", label: "Car Loan" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-6 py-3 rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider transition-all duration-300 ${
                                activeTab === tab.id
                                    ? "bg-[#0284c7] text-white shadow-sm hover:shadow-md scale-105"
                                    : "bg-white text-slate-600 hover:text-white border border-slate-200"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Documents Display Box */}
                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-2xl space-y-8 max-w-5xl mx-auto">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-6">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-2xl bg-[#0284c7]/15 border border-[#0284c7]/30 flex items-center justify-center text-[#0284c7]">
                                <currentCat.icon className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-white">{currentCat.title}</h2>
                        </div>
                        <span className="text-xs font-black uppercase text-[#0284c7] px-3 py-1.5 rounded-full bg-[#0284c7]/15 border border-[#0284c7]/30">
                            100% Digital KYC
                        </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {currentCat.sections.map((section, idx) => (
                            <div key={idx} className="space-y-4 bg-white p-6 rounded-3xl border border-slate-200">
                                <h3 className="text-lg font-black text-[#0284c7]">{section.title}</h3>
                                <ul className="space-y-3">
                                    {section.docs.map((doc, dIdx) => (
                                        <li key={dIdx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                                            <CheckCircle2 className="h-4 w-4 text-[#0284c7] shrink-0 mt-0.5" />
                                            <span>{doc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                            <ShieldCheck className="h-4 w-4 text-[#0284c7]" />
                            <span>Documents are 256-bit encrypted. Uploaded only to partner bank portals.</span>
                        </div>

                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm font-black h-14 px-8 rounded-full text-sm uppercase tracking-wider shadow-sm hover:shadow-md transition-all hover:scale-105"
                        >
                            Upload & Apply Online <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </div>

            <LeadFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type="general"
            />
        </main>
    );
}
