"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    Search,
    ShieldCheck,
    CheckCircle2,
    Clock,
    FileText,
    Key,
    PhoneCall,
    Building2,
    Sparkles,
    AlertCircle,
    ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function TrackStatusPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusResult, setStatusResult] = useState<any | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setHasSearched(true);
        // Simulated tracking lookup for demo ref ID or mobile number
        const refId = searchQuery.trim().toUpperCase();
        
        setStatusResult({
            refId: refId.startsWith("SF-") ? refId : `SF-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            applicantName: "Rahul Sharma",
            loanType: "Home Loan (PMAY Eligible)",
            loanAmount: "₹55,00,000",
            partnerBank: "YES Bank & Shree Finance Direct",
            currentStage: 3, // Stage 3: Sanctioned
            appliedDate: "10 Aug 2026",
            estimatedDisbursal: "14 Aug 2026",
            stages: [
                { title: "Application Submitted", date: "10 Aug 2026", desc: "Online lead submitted successfully", status: "completed" },
                { title: "Document Verification", date: "11 Aug 2026", desc: "KYC & Income tax documents verified", status: "completed" },
                { title: "Property Legal Search", date: "12 Aug 2026", desc: "Technical valuation & legal title verified", status: "completed" },
                { title: "Loan Sanctioned", date: "12 Aug 2026", desc: "Sanction letter generated at 8.35% p.a.", status: "completed" },
                { title: "Final Disbursal", date: "14 Aug 2026", desc: "Bank account transfer initiated", status: "pending" },
            ]
        });
    };

    return (
        <div className="min-h-screen bg-white text-white font-sans py-16 px-4 md:px-6 relative overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container max-w-4xl mx-auto space-y-12 relative z-10">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-1.5 text-xs font-black text-sky-400 uppercase tracking-widest">
                        <Sparkles className="h-3.5 w-3.5" />
                        24/7 Digital Tracking Portal
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                        Track Loan Application
                    </h1>
                    <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto">
                        Enter your Application Reference ID (e.g. SF-2026-8942) or registered 10-digit mobile number.
                    </p>
                </div>

                {/* Search Bar Box */}
                <Card className="bg-slate-950/80 border-sky-800/50 backdrop-blur-2xl rounded-3xl p-4 md:p-6 shadow-2xl">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input
                                placeholder="Enter Application Ref ID or Mobile No..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-14 pl-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-2xl font-bold text-base focus:ring-primary"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="h-14 px-8 bg-primary hover:bg-sky-600 text-white font-black rounded-2xl text-base shadow-lg shadow-primary/20 uppercase tracking-wider"
                        >
                            Track Status <ArrowRight className="h-5 w-5 ml-2" />
                        </Button>
                    </form>

                    <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-wider">
                        <span>Sample Ref ID: <button onClick={() => setSearchQuery("SF-2026-8942")} className="text-primary hover:underline ml-1 font-mono">SF-2026-8942</button></span>
                    </div>
                </Card>

                {/* Status Result Timeline */}
                <AnimatePresence>
                    {hasSearched && statusResult && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                            {/* Summary Card */}
                            <Card className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-950 border border-sky-800/50 rounded-3xl p-6 md:p-8 text-white shadow-xl">
                                <div className="grid md:grid-cols-4 gap-6 text-center md:text-left border-b border-white/10 pb-6">
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Ref ID</p>
                                        <p className="text-xl font-mono font-black text-primary mt-1">{statusResult.refId}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Applicant</p>
                                        <p className="text-lg font-black text-white mt-1">{statusResult.applicantName}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Loan Type & Amount</p>
                                        <p className="text-lg font-black text-sky-400 mt-1">{statusResult.loanAmount}</p>
                                        <p className="text-[10px] text-slate-300 font-bold">{statusResult.loanType}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Current Status</p>
                                        <span className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full text-xs font-black bg-sky-500/20 border border-sky-500/40 text-sky-400 uppercase tracking-wider">
                                            <CheckCircle2 className="h-3.5 w-3.5 text-sky-400" />
                                            Sanction Letter Issued
                                        </span>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="pt-8 space-y-6">
                                    <h3 className="text-lg font-black text-white mb-4">Application Approval Roadmap</h3>
                                    <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                                        {statusResult.stages.map((stage: any, idx: number) => (
                                            <div key={idx} className="relative flex items-start gap-4 pl-10">
                                                <div className={`absolute left-1 top-1 h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs ${
                                                    stage.status === 'completed'
                                                        ? 'bg-emerald-500 text-slate-950 ring-4 ring-sky-500/20'
                                                        : 'bg-slate-800 text-slate-400 border border-white/20'
                                                }`}>
                                                    {stage.status === 'completed' ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-3">
                                                        <h4 className="text-base font-extrabold text-white">{stage.title}</h4>
                                                        <span className="text-xs text-slate-400 font-mono">{stage.date}</span>
                                                    </div>
                                                    <p className="text-xs text-slate-300 font-medium">{stage.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
