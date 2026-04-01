"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEmailForm } from "@/hooks/use-email-form";
import { CheckCircle2, ShieldCheck, PieChart, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

type LeadType = "general" | "cibil";

interface LeadFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: LeadType;
}

export function LeadFormModal({ isOpen, onClose, type }: LeadFormModalProps) {
    const { sendEmail, isSubmitting, isSuccess, error, resetForm } = useEmailForm();
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        pan: "",
    });

    const isCibil = type === "cibil";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await sendEmail({
            title: isCibil ? "Free CIBIL Score Request" : "General Loan Inquiry",
            ...formData
        });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={isCibil ? "Check Your CIBIL Score" : "Get a Quick Loan Quote"}
            className="max-w-md"
        >
            {isSuccess ? (
                <div className="text-center py-6 space-y-4">
                    <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-in zoom-in spin-in-12">
                        <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {isCibil ? "Report Generated!" : "Request Received!"}
                        </h3>
                        <p className="text-muted-foreground mt-2">
                            {isCibil
                                ? "We have sent your detailed credit report to your email."
                                : "Our expert financial advisor will call you within 30 minutes."}
                        </p>
                    </div>
                    <Button onClick={handleClose} className="w-full mt-4" size="lg">
                        Done
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Visual Header */}
                    <div className={cn(
                        "rounded-xl p-4 flex items-center gap-3",
                        isCibil ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                    )}>
                        <div className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                            isCibil ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
                        )}>
                            {isCibil ? <PieChart className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
                        </div>
                        <div>
                            <p className="font-bold text-sm">
                                {isCibil ? "No impact on your score" : "Lowest Interest Rates"}
                            </p>
                            <p className="text-xs opacity-80">
                                {isCibil ? "Safe & Secure check via RBI partners" : "Compare offers from 15+ banks"}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <Input
                                required
                                placeholder="As per PAN Card"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Mobile Number</label>
                                <Input
                                    required
                                    type="tel"
                                    placeholder="98765 XXXXX"
                                    pattern="[0-9]{10}"
                                    value={formData.mobile}
                                    onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                />
                            </div>
                            {isCibil && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">PAN Number</label>
                                    <Input
                                        required
                                        placeholder="ABCDE1234F"
                                        className="uppercase"
                                        maxLength={10}
                                        value={formData.pan}
                                        onChange={e => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <Input
                                required
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <Button
                            className={cn(
                                "w-full h-12 font-bold text-lg shadow-lg hover:translate-y-[-1px] transition-transform",
                                isCibil ? "bg-amber-500 hover:bg-amber-600" : "bg-blue-600 hover:bg-blue-700"
                            )}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Processing..." : (isCibil ? "Get Score Now" : "Check Offers")}
                        </Button>

                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                            <ShieldCheck className="h-3 w-3" />
                            <span>256-bit Encryption • Data stays private</span>
                        </div>
                    </form>
                    {error && <p className="text-xs text-red-500 text-center bg-red-50 p-2 rounded">{error}</p>}
                </div>
            )}
        </Modal>
    );
}
