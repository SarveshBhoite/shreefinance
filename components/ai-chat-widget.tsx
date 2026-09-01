"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send, Bot, Sparkles, User, ShieldCheck, PhoneCall, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LeadFormModal } from "@/components/dialogs/lead-form-modal";

interface Message {
    id: string;
    sender: "bot" | "user";
    text: string;
    quickReplies?: string[];
}

export function AIChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            sender: "bot",
            text: "Hello! 👋 I am your Shree Finance AI Advisor (2026). How can I assist your financial journey today?",
            quickReplies: [
                "Home Loan Interest Rates",
                "Calculate Loan Eligibility",
                "Balance Transfer Savings",
                "Apply for Instant Loan"
            ]
        }
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (textToSend?: string) => {
        const text = textToSend || input.trim();
        if (!text) return;

        const userMsg: Message = { id: Date.now().toString(), sender: "user", text };
        setMessages(prev => [...prev, userMsg]);
        if (!textToSend) setInput("");

        // Simulated AI Bot response logic
        setTimeout(() => {
            let botReply = "";
            let quickReplies: string[] = [];

            const query = text.toLowerCase();
            if (query.includes("home loan") || query.includes("rate")) {
                botReply = "🏡 Our Home Loan interest rates start at just 8.35% p.a. with funding up to 90% of property value and flexible tenure up to 30 years. We also partner with YES Bank, SBI, HDFC, and ICICI for competitive multi-bank quotes!";
                quickReplies = ["Check Eligibility", "Balance Transfer Calculator", "Speak to Advisor"];
            } else if (query.includes("eligibility") || query.includes("salary") || query.includes("borrow")) {
                botReply = "📊 On a net monthly salary of ₹75,000 with minimal existing EMIs, you can typically qualify for up to ₹45 - ₹55 Lakhs in Home Loan funding. Would you like a detailed multi-bank breakdown?";
                quickReplies = ["Get Multi-Bank Quotes", "PMAY Tax Subsidy", "Apply Now"];
            } else if (query.includes("balance transfer") || query.includes("transfer")) {
                botReply = "🔄 Switching your existing home loan to a lower interest rate (e.g., from 9.8% to 8.35%) can save you up to ₹5 - ₹8 Lakhs over your remaining tenure. Plus zero processing fee offers!";
                quickReplies = ["Open Savings Calculator", "Transfer My Loan"];
            } else if (query.includes("apply") || query.includes("advisor") || query.includes("call")) {
                botReply = "⚡ Great choice! Click below to request an instant callback or complete your 100% paperless application in 3 minutes.";
                setIsLeadModalOpen(true);
            } else {
                botReply = "I can help you compare interest rates, calculate EMIs, check CIBIL eligibility, or submit a paperless loan application. How can I guide you?";
                quickReplies = ["Home Loan Rates", "Personal Loan Rates", "Track Loan Status"];
            }

            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: "bot", text: botReply, quickReplies }]);
        }, 600);
    };

    return (
        <>
            {/* Floating Trigger Button: Icon only, compact, glowing */}
            <div className="fixed bottom-6 right-6 z-50">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => setIsOpen(true)}
                            title="Chat with Shree AI Finance Advisor"
                            className="group relative flex items-center justify-center h-10 w-10 rounded-full bg-[#0b1329] hover:bg-[#1e293b] text-[#38bdf8] shadow-2xl transition-all duration-300 border border-sky-500/40 cursor-pointer"
                        >
                            <div className="relative flex items-center justify-center">
                                <Bot className="h-5 w-5 text-[#38bdf8] group-hover:rotate-12 transition-transform duration-300" />
                                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                </span>
                            </div>
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Expanded Full-Size Chat Box */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, scale: 0.92 }}
                            className="w-[92vw] sm:w-[400px] h-[540px] max-h-[85vh] bg-white border border-slate-700/80 backdrop-blur-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white font-sans"
                        >
                            {/* Chat Header */}
                            <div className="bg-gradient-to-r from-primary to-sky-700 p-4 flex items-center justify-between shadow-md">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-md">
                                        <Bot className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-sm text-white">Shree AI Financial Assistant</h4>
                                        <div className="flex items-center gap-1.5 text-[10px] text-sky-300 font-bold uppercase tracking-wider">
                                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Live Support 24/7
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Message List */}
                            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                                {messages.map((m) => (
                                    <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed font-medium ${
                                            m.sender === 'user'
                                                ? 'bg-primary text-white rounded-br-none shadow-md'
                                                : 'bg-slate-800/90 text-slate-100 border border-white/10 rounded-bl-none shadow-sm'
                                        }`}>
                                            {m.text}
                                        </div>

                                        {/* Quick Replies */}
                                        {m.quickReplies && m.quickReplies.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {m.quickReplies.map((qr) => (
                                                    <button
                                                        key={qr}
                                                        onClick={() => handleSend(qr)}
                                                        className="text-[10px] font-black uppercase tracking-wider bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 px-3 py-1.5 rounded-xl transition-all hover:scale-105 active:scale-95"
                                                    >
                                                        {qr}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Chat Input */}
                            <div className="p-3 bg-slate-950 border-t border-white/10 flex items-center gap-2">
                                <Input
                                    placeholder="Type your loan question..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-xl text-xs font-bold focus:ring-primary"
                                />
                                <Button
                                    size="icon"
                                    onClick={() => handleSend()}
                                    className="bg-primary hover:bg-sky-600 text-white rounded-xl h-11 w-11 shrink-0"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <LeadFormModal
                isOpen={isLeadModalOpen}
                onClose={() => setIsLeadModalOpen(false)}
                type="general"
            />
        </>
    );
}
