"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Users,
    TrendingUp,
    ShieldCheck,
    CheckCircle2,
    DollarSign,
    Building2,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    Upload,
    Trash2,
    Building,
    Clock,
    Key,
    Lock,
    Loader2,
    AlertCircle,
    Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEmailForm } from "@/hooks/use-email-form";

export interface PartnerDocUploadState {
    [docKey: string]: {
        fileName: string;
        fileSize: string;
    };
}

export default function PartnerProgramPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { sendEmail, isSubmitting, isSuccess, referenceNo, resetForm } = useEmailForm();

    // Mode: "register" vs "login"
    const [mode, setMode] = useState<"register" | "login">("register");

    // Multi-step form: Step 1 (Basic Details) -> Step 2 (KYC, Documents & Firm Info)
    const [step, setStep] = useState<1 | 2>(1);

    // Step 1 Details
    const [basicDetails, setBasicDetails] = useState({
        name: "",
        mobile: "",
        email: "",
        city: "",
        profession: "Loan Agent / DSA",
    });

    // Step 2 Details (Location, Address Proof, KYC, Company / Firm Name & Document Uploads)
    const [extendedDetails, setExtendedDetails] = useState({
        companyName: "",
        location: "",
        addressProofType: "Aadhaar Card Address Proof",
        fullAddress: "",
        experienceYears: "2-5 Years",
        bankAccountType: "Current Account"
    });

    const [uploadedDocs, setUploadedDocs] = useState<PartnerDocUploadState>({});
    const [uploadingDocKey, setUploadingDocKey] = useState<string | null>(null);
    const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    useEffect(() => {
        const authParam = searchParams.get("auth");
        if (authParam === "login") {
            setMode("login");
        }
        // Auto-check if partner is already logged in
        fetch("/api/partner/me")
            .then(res => {
                if (res.ok) router.push("/partner/dashboard");
            })
            .catch(() => {});
    }, [searchParams, router]);

    const requiredPartnerDocs = [
        { key: "panCard", label: "PAN Card (Mandatory)", desc: "Clear front photo or PDF" },
        { key: "aadharCard", label: "Aadhaar Card", desc: "Front & Back copy or E-Aadhaar" },
        { key: "passportPhoto", label: "Passport Size Photo", desc: "Recent photograph of applicant" },
        { key: "addressProof", label: "Address Proof", desc: "Electricity Bill, Rent Agreement, or Voter ID" },
        { key: "kycDocument", label: "KYC Document", desc: "Bank passbook, cancelled cheque or GST" }
    ];

    const handleFileUpload = (docKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingDocKey(docKey);

        const reader = new FileReader();
        reader.onload = () => {
            const sizeInKb = (file.size / 1024).toFixed(1);
            const sizeDisplay = file.size > 1024 * 1024 
                ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` 
                : `${sizeInKb} KB`;

            setUploadedDocs(prev => ({
                ...prev,
                [docKey]: {
                    fileName: file.name,
                    fileSize: sizeDisplay
                }
            }));
            setUploadingDocKey(null);
        };
        reader.onerror = () => setUploadingDocKey(null);
        reader.readAsDataURL(file);
    };

    const handleRemoveDoc = (docKey: string) => {
        setUploadedDocs(prev => {
            const updated = { ...prev };
            delete updated[docKey];
            return updated;
        });
        if (fileInputRefs.current[docKey]) {
            fileInputRefs.current[docKey]!.value = "";
        }
    };

    // Step 1 -> Step 2
    const handleProceedToStep2 = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    // Final Register Submit
    const handleFinalRegister = (e: React.FormEvent) => {
        e.preventDefault();

        const docsSummary = Object.entries(uploadedDocs)
            .map(([k, v]) => `${k}: ${v.fileName} (${v.fileSize})`)
            .join(" | ") || "Documents submitted digitally via online form";

        sendEmail({
            type: "Partner Program Registration (DSA Approval Request)",
            applicationHeader: "DSA Channel Partner Onboarding Application",
            name: basicDetails.name,
            mobile: basicDetails.mobile,
            email: basicDetails.email,
            city: basicDetails.city,
            profession: basicDetails.profession,
            companyName: extendedDetails.companyName || "Proprietorship / Individual DSA",
            location: extendedDetails.location || basicDetails.city,
            addressProofType: extendedDetails.addressProofType,
            fullAddress: extendedDetails.fullAddress,
            experienceYears: extendedDetails.experienceYears,
            bankAccountType: extendedDetails.bankAccountType,
            uploadedDocuments: docsSummary,
            status: "Pending Admin Approval",
            source: "Shree Finance Become a Partner Onboarding Portal"
        });
    };

    const handleStartNewApplication = () => {
        resetForm();
        setStep(1);
        setBasicDetails({
            name: "",
            mobile: "",
            email: "",
            city: "",
            profession: "Loan Agent / DSA",
        });
        setExtendedDetails({
            companyName: "",
            location: "",
            addressProofType: "Aadhaar Card Address Proof",
            fullAddress: "",
            experienceYears: "2-5 Years",
            bankAccountType: "Current Account"
        });
        setUploadedDocs({});
    };

    // Partner Login State
    const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");
    const [loginIdentifier, setLoginIdentifier] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginOtp, setLoginOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [loginSuccessMsg, setLoginSuccessMsg] = useState<string | null>(null);

    // Password Login Handler
    const handlePasswordLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginLoading(true);
        setLoginError(null);

        try {
            const res = await fetch("/api/partner/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loginIdentifier, password: loginPassword })
            });

            const data = await res.json();
            if (res.ok) {
                router.push("/partner/dashboard");
            } else {
                setLoginError(data.error || "Invalid email or password.");
            }
        } catch {
            setLoginError("Error connecting to login server.");
        } finally {
            setLoginLoading(false);
        }
    };

    // Send Partner OTP
    const handleSendPartnerOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setOtpLoading(true);
        setLoginError(null);
        setLoginSuccessMsg(null);

        try {
            const res = await fetch("/api/partner/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier: loginIdentifier })
            });

            const data = await res.json();
            if (res.ok) {
                setOtpSent(true);
                setLoginSuccessMsg(data.message || `OTP sent to ${data.email}`);
            } else {
                setLoginError(data.error || "Failed to send OTP.");
            }
        } catch {
            setLoginError("Connection error while requesting OTP.");
        } finally {
            setOtpLoading(false);
        }
    };

    // Verify Partner OTP & Enter Dashboard
    const handleVerifyPartnerOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginLoading(true);
        setLoginError(null);

        try {
            const res = await fetch("/api/partner/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier: loginIdentifier, otp: loginOtp })
            });

            const data = await res.json();
            if (res.ok) {
                router.push("/partner/dashboard");
            } else {
                setLoginError(data.error || "Invalid OTP code.");
            }
        } catch {
            setLoginError("Error verifying OTP.");
        } finally {
            setLoginLoading(false);
        }
    };

    const benefits = [
        {
            icon: DollarSign,
            title: "Highest Commission Payouts",
            desc: "Earn up to 2.5% payout on home loans and personal loans disbursed through your link."
        },
        {
            icon: Building2,
            title: "40+ Partner Bank Access",
            desc: "Offer loans from YES Bank, SBI, HDFC, ICICI, Axis, Kotak and NBFCs with one portal."
        },
        {
            icon: TrendingUp,
            title: "Real-time Payout Tracking",
            desc: "Dedicated partner dashboard tracking lead stages, sanction letters, and instant payout credits."
        },
        {
            icon: ShieldCheck,
            title: "Zero Setup Fee & Free Training",
            desc: "Get certified as a financial loan advisor with dedicated relationship manager support."
        }
    ];

    const partnerTiers = [
        { name: "Silver Partner", volume: "₹50L - ₹2 Cr / month", payout: "1.25% - 1.50%", perks: "Standard Support, Basic Dashboard" },
        { name: "Gold Partner", volume: "₹2 Cr - ₹5 Cr / month", payout: "1.75% - 2.00%", perks: "Dedicated Relationship Manager, Priority Sanction" },
        { name: "Platinum Partner", volume: "₹5 Cr+ / month", payout: "Up to 2.50%", perks: "Co-Branding Marketing, Instant Disbursal Desk" },
    ];

    return (
        <div className="pb-20 bg-[#181a1d] text-white font-sans min-h-screen relative overflow-hidden">
            {/* Background Light Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00c985]/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00e699]/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Hero Banner */}
            <section className="pt-16 pb-20 border-b border-slate-800 relative z-10">
                <div className="container px-4 md:px-6 mx-auto grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6 pt-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1.5 text-xs font-black text-emerald-300 uppercase tracking-widest">
                            <Sparkles className="h-3.5 w-3.5" />
                            ShreeFinance Channel Partner Program
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                            Partner Portal & <span className="text-[#00e699]">Direct DSA Desk</span>
                        </h1>
                        <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                            Join 15,000+ DSAs, Real Estate Brokers, CAs, and Financial Advisors. Refer loan clients, track bank underwriting in real-time, and earn industry-leading payouts across 40+ banks.
                        </p>

                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                            <div>
                                <p className="text-3xl font-black text-[#00e699]">₹15 Cr+</p>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Payouts Credited</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-white">15,000+</p>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Active Partners</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-amber-300">40+</p>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Lending Partners</p>
                            </div>
                        </div>

                        {/* Quick Mode Toggle Info */}
                        <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-white">
                                    {mode === "register" ? "Already approved by Admin?" : "New to Shree Finance?"}
                                </p>
                                <p className="text-[11px] text-slate-400">
                                    {mode === "register"
                                        ? "Log in with your registered email or reference ID to access your dashboard."
                                        : "Fill our fast 2-step onboarding form to apply for DSA accreditation."}
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setMode(mode === "register" ? "login" : "register");
                                    setLoginError(null);
                                    setLoginSuccessMsg(null);
                                }}
                                className="h-9 px-4 rounded-xl border-[#00c985]/40 text-[#00e699] hover:bg-[#00c985] hover:text-slate-950 font-bold text-xs shrink-0 cursor-pointer"
                            >
                                {mode === "register" ? "Partner Login 🔑" : "New Registration 📝"}
                            </Button>
                        </div>
                    </div>

                    {/* Right Action Container: Registration OR Login */}
                    {mode === "login" ? (
                        /* ========================================================================= */
                        /* PARTNER LOGIN FORM */
                        /* ========================================================================= */
                        <Card className="bg-[#24272c] border border-slate-800 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-8 text-white shadow-2xl space-y-6">
                            <CardHeader className="p-0 pb-4 border-b border-white/10 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl font-black flex items-center gap-2">
                                        <Lock className="h-5 w-5 text-[#00c985]" /> Partner Portal Login
                                    </CardTitle>
                                    <p className="text-xs text-slate-400 mt-1">
                                        Access your active borrower leads, sanction desk & weekly commissions
                                    </p>
                                </div>
                                <span className="text-xs font-black px-3 py-1 rounded-full bg-[#00c985]/20 text-[#00e699] border border-[#00c985]/40 uppercase tracking-wider">
                                    DSA Login
                                </span>
                            </CardHeader>

                            <CardContent className="p-0 space-y-4">
                                {loginError && (
                                    <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-xl text-xs flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4 shrink-0" />
                                        <span>{loginError}</span>
                                    </div>
                                )}

                                {loginSuccessMsg && (
                                    <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                                        <span>{loginSuccessMsg}</span>
                                    </div>
                                )}

                                {/* Login Method Tabs */}
                                <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLoginMethod("password");
                                            setLoginError(null);
                                        }}
                                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                            loginMethod === "password"
                                                ? "bg-[#00c985] text-slate-950 shadow-md"
                                                : "text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        🔑 Email & Password
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLoginMethod("otp");
                                            setLoginError(null);
                                        }}
                                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                                            loginMethod === "otp"
                                                ? "bg-[#00c985] text-slate-950 shadow-md"
                                                : "text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        📲 Email OTP
                                    </button>
                                </div>

                                {loginMethod === "password" ? (
                                    <form onSubmit={handlePasswordLogin} className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase text-slate-400">
                                                Registered Email Address or Partner ID *
                                            </label>
                                            <Input
                                                placeholder="e.g. partner@example.com or SHREE-PTR-1234"
                                                value={loginIdentifier}
                                                onChange={e => setLoginIdentifier(e.target.value)}
                                                required
                                                className="h-12 rounded-xl font-bold bg-white/5 border-white/10 text-white placeholder:text-slate-500 text-xs"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase text-slate-400">
                                                Password (Sent in Approval Email) *
                                            </label>
                                            <Input
                                                type="password"
                                                placeholder="Enter your partner password"
                                                value={loginPassword}
                                                onChange={e => setLoginPassword(e.target.value)}
                                                required
                                                className="h-12 rounded-xl font-bold bg-white/5 border-white/10 text-white placeholder:text-slate-500 text-xs"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={loginLoading || !loginIdentifier.trim() || !loginPassword.trim()}
                                            className="w-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black h-13 rounded-2xl uppercase tracking-wider text-xs shadow-xl shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
                                        >
                                            {loginLoading ? (
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    <span>Logging in...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <span>Login to Workstation 🚀</span>
                                                    <ArrowRight className="h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                ) : !otpSent ? (
                                    <form onSubmit={handleSendPartnerOtp} className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase text-slate-400">
                                                Registered Email Address or Application Ref # *
                                            </label>
                                            <Input
                                                placeholder="e.g. partner@example.com or SHREE-PTR-1234"
                                                value={loginIdentifier}
                                                onChange={e => setLoginIdentifier(e.target.value)}
                                                required
                                                className="h-12 rounded-xl font-bold bg-white/5 border-white/10 text-white placeholder:text-slate-500 text-xs"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={otpLoading || !loginIdentifier.trim()}
                                            className="w-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black h-13 rounded-2xl uppercase tracking-wider text-xs shadow-xl shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
                                        >
                                            {otpLoading ? (
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    <span>Sending Login OTP...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <span>Send Security Login Code 🔐</span>
                                                    <ArrowRight className="h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleVerifyPartnerOtp} className="space-y-4">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] font-black uppercase text-slate-400">
                                                    Enter 6-Digit OTP Code *
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => setOtpSent(false)}
                                                    className="text-[11px] text-emerald-400 hover:underline"
                                                >
                                                    Change Email
                                                </button>
                                            </div>
                                            <Input
                                                type="text"
                                                maxLength={6}
                                                placeholder="Enter 6-digit OTP"
                                                value={loginOtp}
                                                onChange={e => setLoginOtp(e.target.value)}
                                                required
                                                className="h-13 text-center text-xl tracking-[6px] rounded-xl font-black bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={loginLoading || loginOtp.length < 6}
                                            className="w-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black h-13 rounded-2xl uppercase tracking-wider text-xs shadow-xl shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
                                        >
                                            {loginLoading ? (
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    <span>Verifying Access...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <span>Access Partner Dashboard 🚀</span>
                                                    <ArrowRight className="h-4 w-4" />
                                                </>
                                            )}
                                        </Button>

                                        <p className="text-[11px] text-slate-400 text-center">
                                            Did not receive OTP? Check spam folder or{" "}
                                            <button
                                                type="button"
                                                onClick={handleSendPartnerOtp}
                                                className="text-emerald-400 font-bold hover:underline"
                                            >
                                                Resend OTP
                                            </button>
                                        </p>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        /* ========================================================================= */
                        /* REGISTRATION MULTI-STEP CARD */
                        /* ========================================================================= */
                        <Card className="bg-[#24272c] border border-slate-800 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-8 text-white shadow-2xl">
                            <CardHeader className="p-0 pb-5 border-b border-white/10 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl font-black">
                                        {isSuccess 
                                            ? "Application Submitted" 
                                            : step === 1 
                                                ? "Register as DSA Partner" 
                                                : "Partner Verification & KYC"}
                                    </CardTitle>
                                    <p className="text-xs text-slate-400 mt-1">
                                        {isSuccess
                                            ? "Pending Admin Review & Verification"
                                            : step === 1 
                                                ? "Step 1 of 2: Basic Contact Details" 
                                                : "Step 2 of 2: Upload Documents & Company KYC"}
                                    </p>
                                </div>
                                <span className="text-xs font-black px-3 py-1 rounded-full bg-[#00c985]/20 text-[#00e699] border border-[#00c985]/40 uppercase tracking-wider">
                                    {isSuccess ? "Pending Review" : `Step ${step}/2`}
                                </span>
                            </CardHeader>

                            <CardContent className="p-0 pt-6">
                                {isSuccess ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="space-y-6"
                                    >
                                        {/* Success Popup Card Notice */}
                                        <div className="p-6 rounded-3xl bg-gradient-to-b from-emerald-950/40 via-slate-900/90 to-slate-900/90 border-2 border-emerald-500/40 text-center space-y-4 shadow-xl">
                                            <div className="h-16 w-16 bg-emerald-500/20 text-[#00e699] rounded-3xl flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
                                                <CheckCircle2 className="h-9 w-9" />
                                            </div>

                                            <div className="space-y-2">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-black uppercase tracking-wider">
                                                    <Clock className="h-3 w-3" /> Status: PENDING ADMIN REVIEW
                                                </span>
                                                <h3 className="text-xl sm:text-2xl font-black text-white">
                                                    Application Received!
                                                </h3>
                                                <p className="text-sm text-slate-200 leading-relaxed font-medium max-w-md mx-auto">
                                                    Thank you for applying! Your partner application has been submitted and is currently pending admin review. You will receive an email once approved.
                                                </p>
                                            </div>

                                            {referenceNo && (
                                                <div className="inline-block bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-emerald-400 font-bold">
                                                    Application Ref: <span className="text-white">{referenceNo}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* What happens next roadmap */}
                                        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
                                            <p className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                                                <ShieldCheck className="h-4 w-4 text-[#00c985]" /> What happens next?
                                            </p>
                                            <div className="space-y-2 text-slate-300 leading-relaxed">
                                                <div className="flex items-start gap-2.5">
                                                    <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                                                    <p>Admin verification team reviews your company details and KYC documents.</p>
                                                </div>
                                                <div className="flex items-start gap-2.5">
                                                    <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                                                    <p>Upon approval, an activation email with your portal access link is dispatched to <strong className="text-white">{basicDetails.email || "your registered email"}</strong>.</p>
                                                </div>
                                                <div className="flex items-start gap-2.5">
                                                    <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                                                    <p>Our Onboarding Lead will contact you on <strong className="text-white">+91 {basicDetails.mobile}</strong> to assign your Relationship Manager.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Button
                                                type="button"
                                                onClick={() => setMode("login")}
                                                className="flex-1 bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-bold h-12 rounded-xl text-xs cursor-pointer"
                                            >
                                                Go to Partner Login
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={handleStartNewApplication}
                                                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold h-12 rounded-xl text-xs cursor-pointer border border-slate-700"
                                            >
                                                Submit Another
                                            </Button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <AnimatePresence mode="wait">
                                        {step === 1 ? (
                                            <motion.form
                                                key="step1"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 10 }}
                                                onSubmit={handleProceedToStep2}
                                                className="space-y-4"
                                            >
                                                <div>
                                                    <label className="text-[10px] font-black uppercase text-slate-400">Full Name *</label>
                                                    <Input
                                                        placeholder="Enter your full name"
                                                        value={basicDetails.name}
                                                        onChange={e => setBasicDetails({ ...basicDetails, name: e.target.value })}
                                                        required
                                                        className="h-12 rounded-xl font-bold bg-white/5 border-white/10 text-white placeholder:text-slate-500 text-xs"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-[10px] font-black uppercase text-slate-400">Mobile Number *</label>
                                                        <Input
                                                            type="tel"
                                                            maxLength={10}
                                                            placeholder="10-digit mobile number"
                                                            value={basicDetails.mobile}
                                                            onChange={e => setBasicDetails({ ...basicDetails, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                                                            required
                                                            className="h-12 rounded-xl font-bold bg-white/5 border-white/10 text-white placeholder:text-slate-500 text-xs"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] font-black uppercase text-slate-400">City / Location *</label>
                                                        <Input
                                                            placeholder="e.g. Pune, Mumbai, Delhi"
                                                            value={basicDetails.city}
                                                            onChange={e => setBasicDetails({ ...basicDetails, city: e.target.value })}
                                                            required
                                                            className="h-12 rounded-xl font-bold bg-white/5 border-white/10 text-white placeholder:text-slate-500 text-xs"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-[10px] font-black uppercase text-slate-400">Email Address *</label>
                                                        <Input
                                                            type="email"
                                                            placeholder="partner@example.com"
                                                            value={basicDetails.email}
                                                            onChange={e => setBasicDetails({ ...basicDetails, email: e.target.value })}
                                                            required
                                                            className="h-12 rounded-xl font-bold bg-white/5 border-white/10 text-white placeholder:text-slate-500 text-xs"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="text-[10px] font-black uppercase text-slate-400">Current Profession *</label>
                                                        <select
                                                            value={basicDetails.profession}
                                                            onChange={e => setBasicDetails({ ...basicDetails, profession: e.target.value })}
                                                            required
                                                            className="w-full h-12 bg-[#1a1d21] border border-white/10 rounded-xl px-3 text-xs font-bold text-white focus:ring-2 focus:ring-[#00c985]"
                                                        >
                                                            <option value="Loan Agent / DSA">Loan Agent / DSA</option>
                                                            <option value="Real Estate Consultant / Builder">Real Estate Consultant / Builder</option>
                                                            <option value="Chartered Accountant (CA) / Tax Consultant">Chartered Accountant (CA)</option>
                                                            <option value="Insurance Agent / Financial Planner">Insurance / Financial Advisor</option>
                                                            <option value="Self-Employed / Business Owner">Self-Employed / Business</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <Button
                                                    type="submit"
                                                    className="w-full bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black h-14 rounded-2xl uppercase tracking-wider text-xs sm:text-sm shadow-xl shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2 mt-2"
                                                >
                                                    <span>Join Partner Program Now</span>
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </motion.form>
                                        ) : (
                                            <motion.form
                                                key="step2"
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                onSubmit={handleFinalRegister}
                                                className="space-y-5"
                                            >
                                                {/* Company / Firm Name & Location Fields */}
                                                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                                                    <div className="flex items-center gap-2 text-xs font-black text-emerald-400 uppercase tracking-wide">
                                                        <Building className="h-4 w-4" />
                                                        <span>Company & Operating Details</span>
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="text-[10px] font-black uppercase text-slate-400">Company / Firm Name *</label>
                                                            <Input
                                                                placeholder="e.g. Apex Financial Solutions Pvt Ltd"
                                                                value={extendedDetails.companyName}
                                                                onChange={e => setExtendedDetails({ ...extendedDetails, companyName: e.target.value })}
                                                                required
                                                                className="h-11 rounded-xl font-bold bg-white/5 border-white/10 text-white placeholder:text-slate-500 text-xs"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="text-[10px] font-black uppercase text-slate-400">Office Location / Area *</label>
                                                            <Input
                                                                placeholder="e.g. Narhe, Shivaji Nagar, Pune"
                                                                value={extendedDetails.location}
                                                                onChange={e => setExtendedDetails({ ...extendedDetails, location: e.target.value })}
                                                                required
                                                                className="h-11 rounded-xl font-bold bg-white/5 border-white/10 text-white placeholder:text-slate-500 text-xs"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="text-[10px] font-black uppercase text-slate-400">Complete Registered Address Proof Details *</label>
                                                        <Input
                                                            placeholder="Full office or residence address"
                                                            value={extendedDetails.fullAddress}
                                                            onChange={e => setExtendedDetails({ ...extendedDetails, fullAddress: e.target.value })}
                                                            required
                                                            className="h-11 rounded-xl font-bold bg-white/5 border-white/10 text-white placeholder:text-slate-500 text-xs"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Document Upload Points */}
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                                                            <ShieldCheck className="h-4 w-4 text-[#00c985]" />
                                                            Upload Verification Documents (Admin Approval)
                                                        </span>
                                                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-800">
                                                            {Object.keys(uploadedDocs).length} / {requiredPartnerDocs.length} Attached
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-2.5 max-h-60 overflow-y-auto pr-1">
                                                        {requiredPartnerDocs.map(doc => {
                                                            const isUploaded = !!uploadedDocs[doc.key];
                                                            const docInfo = uploadedDocs[doc.key];
                                                            const isCurrentlyUploading = uploadingDocKey === doc.key;

                                                            return (
                                                                <div
                                                                    key={doc.key}
                                                                    className={`p-3 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                                                                        isUploaded
                                                                            ? "bg-emerald-950/40 border-emerald-500/50"
                                                                            : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                                                                    }`}
                                                                >
                                                                    <div className="space-y-0.5 flex-1 min-w-0">
                                                                        <p className="text-xs font-bold text-white truncate">
                                                                            {doc.label}
                                                                        </p>
                                                                        {isUploaded && docInfo ? (
                                                                            <div className="flex items-center gap-1.5 text-[10px] text-emerald-300 font-bold">
                                                                                <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                                                                                <span className="truncate">{docInfo.fileName}</span>
                                                                                <span className="text-slate-400 font-normal">({docInfo.fileSize})</span>
                                                                            </div>
                                                                        ) : (
                                                                            <p className="text-[10px] text-slate-400 font-medium">{doc.desc}</p>
                                                                        )}
                                                                    </div>

                                                                    <input
                                                                        ref={el => { fileInputRefs.current[doc.key] = el; }}
                                                                        type="file"
                                                                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                                                        className="hidden"
                                                                        onChange={e => handleFileUpload(doc.key, e)}
                                                                    />

                                                                    {isUploaded ? (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleRemoveDoc(doc.key)}
                                                                            className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/50 cursor-pointer"
                                                                            title="Remove file"
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </button>
                                                                    ) : (
                                                                        <Button
                                                                            type="button"
                                                                            variant="outline"
                                                                            disabled={isCurrentlyUploading}
                                                                            onClick={() => fileInputRefs.current[doc.key]?.click()}
                                                                            className="h-8 px-3 text-[11px] font-bold rounded-lg border-emerald-500/40 text-emerald-300 bg-emerald-500/10 hover:bg-[#00c985] hover:text-slate-950 cursor-pointer transition-all shrink-0"
                                                                        >
                                                                            {isCurrentlyUploading ? (
                                                                                <div className="h-3 w-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                                                                            ) : (
                                                                                <>
                                                                                    <Upload className="h-3 w-3 mr-1" /> Upload
                                                                                </>
                                                                            )}
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                {/* Form Controls */}
                                                <div className="flex items-center gap-3 pt-2">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => setStep(1)}
                                                        className="h-12 px-5 rounded-xl border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
                                                    >
                                                        <ArrowLeft className="h-4 w-4 mr-1" /> Back
                                                    </Button>

                                                    <Button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="flex-1 bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black h-12 rounded-xl uppercase tracking-wider text-xs sm:text-sm shadow-xl shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
                                                    >
                                                        {isSubmitting ? (
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                                                <span>Sending for Admin Approval...</span>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <span>Register & Send For Approval 🚀</span>
                                                                <ArrowRight className="h-4 w-4" />
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </motion.form>
                                        )}
                                    </AnimatePresence>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-20 container px-4 md:px-6 mx-auto relative z-10 space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h2 className="text-3xl md:text-5xl font-black text-white">Why Join Shree Finance Partner Portal?</h2>
                    <p className="text-slate-400 text-sm">Everything you need to build a high-earning loan distribution business.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((b, idx) => (
                        <div key={idx} className="bg-slate-900/60 border border-sky-800/40 p-6 rounded-3xl space-y-4 backdrop-blur-md">
                            <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                                <b.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-extrabold text-white">{b.title}</h3>
                            <p className="text-xs text-slate-300 leading-relaxed">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Partner Tiers */}
            <section className="py-16 container px-4 md:px-6 mx-auto relative z-10">
                <div className="bg-slate-900/80 border border-sky-800/50 rounded-[2.5rem] p-8 space-y-8">
                    <h2 className="text-2xl font-bold text-center text-white">Partner Payout Structure & Tiers</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {partnerTiers.map((t, idx) => (
                            <div key={idx} className="bg-black/40 p-6 rounded-3xl border border-white/10 space-y-3 text-center">
                                <h3 className="text-lg font-black text-emerald-400">{t.name}</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase">{t.volume}</p>
                                <p className="text-3xl font-black text-white py-2">{t.payout}</p>
                                <p className="text-[11px] text-slate-300 font-medium">{t.perks}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
