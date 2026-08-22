"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Upload,
    Trash2,
    ImagePlus,
    LogOut,
    Loader2,
    CheckCircle2,
    AlertCircle,
    X,
    LayoutDashboard,
    Users,
    Check,
    XCircle,
    Building2,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Briefcase,
    FileText,
    Search,
    Clock,
    RefreshCw,
    Percent,
    DollarSign,
    TrendingUp,
    Shield,
    CreditCard,
    PieChart,
    Banknote,
    Edit3,
    Sparkles,
    Save
} from "lucide-react";

interface Banner {
    _id: string;
    imageUrl: string;
    publicId: string;
    title: string;
    link?: string;
    page: string;
    createdAt: string;
}

interface PartnerApplication {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    city: string;
    profession?: string;
    companyName?: string;
    location?: string;
    addressProofType?: string;
    fullAddress?: string;
    experienceYears?: string;
    bankAccountType?: string;
    uploadedDocuments?: Record<string, unknown> | string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    isActive: boolean;
    referenceNo: string;
    rejectionReason?: string;
    reviewedAt?: string;
    reviewedBy?: string;
    createdAt: string;
}

interface PartnerSubmittedFile {
    _id: string;
    referenceNo: string;
    partnerId: string;
    partnerName: string;
    partnerReferenceNo: string;
    partnerEmail?: string;
    category: "loans" | "cards" | "insurance" | "investments";
    subProduct: string;
    customerName: string;
    customerMobile: string;
    customerEmail?: string;
    customerCity: string;
    bankName: string;
    applicationAmount: number;
    bankReferenceNo?: string;
    commissionRate: number;
    commissionAmount: number;
    leadStatus: "IN_PROCESS" | "DOCS_SUBMITTED" | "BANK_LOGIN" | "SANCTIONED" | "DISBURSED" | "REJECTED";
    payoutStatus: "PENDING" | "PROCESSED" | "PAID";
    leadNotes?: string;
    disbursedAt?: string;
    createdAt: string;
}

interface SystemCommissionRates {
    loansCommissionRate: number;
    cardsCommissionRate: number;
    insuranceCommissionRate: number;
    investmentsCommissionRate: number;
    productRates?: Record<string, number>;
}

const PAGE_OPTIONS = [
    { value: "home", label: "Home Page" },
    { value: "personal-loan", label: "Personal Loan" },
    { value: "home-loan", label: "Home Loan" },
    { value: "business-loan", label: "Business Loan" },
    { value: "car-loan", label: "Car Loan" },
    { value: "education-loan", label: "Education Loan" },
    { value: "mudra-loan", label: "Mudra Loan" },
    { value: "pmay", label: "PMAY" },
    { value: "government-schemes", label: "Government Schemes" },
    { value: "credit-cards", label: "Credit Cards" },
    { value: "business-cards", label: "Business Cards" },
    { value: "health-insurance", label: "Health Insurance" },
    { value: "life-insurance", label: "Life Insurance" },
    { value: "vehicle-insurance", label: "Vehicle Insurance" },
    { value: "mutual-funds", label: "Mutual Funds" },
    { value: "stocks", label: "Stocks" },
];

export default function AdminDashboardPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [activeTab, setActiveTab] = useState<"partners" | "files" | "rates" | "banners">("partners");
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

    // =========================================================================
    // 1. PARTNER APPLICATIONS STATE
    // =========================================================================
    const [partners, setPartners] = useState<PartnerApplication[]>([]);
    const [partnerCounts, setPartnerCounts] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
    const [partnerLoading, setPartnerLoading] = useState(true);
    const [partnerFilter, setPartnerFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("ALL");
    const [partnerSearch, setPartnerSearch] = useState("");
    const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
    const [selectedPartner, setSelectedPartner] = useState<PartnerApplication | null>(null);
    const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
    const [rejectingPartnerId, setRejectingPartnerId] = useState<string | null>(null);
    const [rejectionReason, setRejectionReason] = useState("");

    // =========================================================================
    // 2. PARTNER SUBMITTED FILES (LEADS / PIPELINE) STATE
    // =========================================================================
    const [partnerFiles, setPartnerFiles] = useState<PartnerSubmittedFile[]>([]);
    const [filesMetrics, setFilesMetrics] = useState({
        totalCount: 0,
        inProcessCount: 0,
        disbursedCount: 0,
        totalFiledVolume: 0,
        totalDisbursedVolume: 0,
        totalCommissions: 0,
        pendingPayoutCommissions: 0
    });
    const [filesLoading, setFilesLoading] = useState(false);
    const [fileCategoryFilter, setFileCategoryFilter] = useState("ALL");
    const [fileStatusFilter, setFileStatusFilter] = useState("ALL");
    const [fileSearch, setFileSearch] = useState("");
    const [selectedFileItem, setSelectedFileItem] = useState<PartnerSubmittedFile | null>(null);
    const [fileUpdateModalOpen, setFileUpdateModalOpen] = useState(false);
    const [updateFileStatus, setUpdateFileStatus] = useState<string>("IN_PROCESS");
    const [updatePayoutStatus, setUpdatePayoutStatus] = useState<string>("PENDING");
    const [updateCommissionRate, setUpdateCommissionRate] = useState<number>(2.0);

    // =========================================================================
    // 3. COMMISSION RATES & SETTINGS STATE
    // =========================================================================
    const [commissionRates, setCommissionRates] = useState<SystemCommissionRates>({
        loansCommissionRate: 2.0,
        cardsCommissionRate: 3.0,
        insuranceCommissionRate: 5.0,
        investmentsCommissionRate: 1.5,
        productRates: {}
    });
    const [ratesSaving, setRatesSaving] = useState(false);

    // =========================================================================
    // 4. BANNERS STATE
    // =========================================================================
    const [banners, setBanners] = useState<Banner[]>([]);
    const [bannerLoading, setBannerLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [page, setPage] = useState("home");
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const showToast = (type: "success" | "error", message: string) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 4000);
    };

    // Auth check
    useEffect(() => {
        fetch("/api/admin/me")
            .then((res) => {
                if (!res.ok) throw new Error();
            })
            .catch(() => {
                router.push("/admin/login");
            });
    }, [router]);

    // Handle query param tab / ref search
    useEffect(() => {
        const tabParam = searchParams.get("tab");
        const refParam = searchParams.get("ref");
        if (tabParam === "banners") setActiveTab("banners");
        else if (tabParam === "partners") setActiveTab("partners");
        else if (tabParam === "files") setActiveTab("files");
        else if (tabParam === "rates") setActiveTab("rates");

        if (refParam) setPartnerSearch(refParam);
    }, [searchParams]);

    // Fetch Partners
    const fetchPartners = useCallback(async () => {
        setPartnerLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (partnerFilter !== "ALL") queryParams.append("status", partnerFilter);
            if (partnerSearch.trim()) queryParams.append("search", partnerSearch.trim());

            const res = await fetch(`/api/admin/partners?${queryParams.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setPartners(data.partners || []);
                if (data.counts) setPartnerCounts(data.counts);
            }
        } catch (err) {
            console.error("Failed to fetch partner applications", err);
        } finally {
            setPartnerLoading(false);
        }
    }, [partnerFilter, partnerSearch]);

    // Fetch Submitted Partner Files
    const fetchPartnerFiles = useCallback(async () => {
        setFilesLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (fileCategoryFilter !== "ALL") queryParams.append("category", fileCategoryFilter);
            if (fileStatusFilter !== "ALL") queryParams.append("status", fileStatusFilter);
            if (fileSearch.trim()) queryParams.append("search", fileSearch.trim());

            const res = await fetch(`/api/admin/leads?${queryParams.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setPartnerFiles(data.leads || []);
                if (data.metrics) setFilesMetrics(data.metrics);
            }
        } catch (err) {
            console.error("Failed to fetch partner files", err);
        } finally {
            setFilesLoading(false);
        }
    }, [fileCategoryFilter, fileStatusFilter, fileSearch]);

    // Fetch Commission Rates
    const fetchCommissionRates = async () => {
        try {
            const res = await fetch("/api/admin/commission-rates");
            if (res.ok) {
                const data = await res.json();
                if (data.settings) setCommissionRates(data.settings);
            }
        } catch (err) {
            console.error("Failed to fetch commission rates", err);
        }
    };

    // Fetch Banners
    const fetchBanners = async () => {
        setBannerLoading(true);
        try {
            const res = await fetch("/api/banners");
            const data = await res.json();
            setBanners(data.banners || []);
        } catch (err) {
            console.error("Failed to fetch banners", err);
        } finally {
            setBannerLoading(false);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, [fetchPartners]);

    useEffect(() => {
        if (activeTab === "files") fetchPartnerFiles();
        if (activeTab === "rates") fetchCommissionRates();
        if (activeTab === "banners") fetchBanners();
    }, [activeTab, fetchPartnerFiles]);

    // =========================================================================
    // PARTNER APPROVAL & PASSWORD GENERATION HANDLER
    // =========================================================================
    const handleApprovePartner = async (partnerId: string) => {
        setActionLoadingId(partnerId);
        try {
            const res = await fetch(`/api/admin/partners/${partnerId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "APPROVE" })
            });

            const data = await res.json();
            if (res.ok) {
                showToast("success", "Partner approved! Login credentials & temporary password sent via email.");
                fetchPartners();
                if (selectedPartner?._id === partnerId) {
                    setSelectedPartner(data.partner || { ...selectedPartner, status: "APPROVED", isActive: true });
                }
            } else {
                showToast("error", data.error || "Failed to approve partner.");
            }
        } catch {
            showToast("error", "Error approving partner application.");
        } finally {
            setActionLoadingId(null);
        }
    };

    // Rejection Handler
    const handleRejectPartner = async () => {
        if (!rejectingPartnerId) return;

        setActionLoadingId(rejectingPartnerId);
        try {
            const res = await fetch(`/api/admin/partners/${rejectingPartnerId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "REJECT", rejectionReason: rejectionReason.trim() })
            });

            const data = await res.json();
            if (res.ok) {
                showToast("success", "Partner application rejected.");
                setRejectionModalOpen(false);
                setRejectingPartnerId(null);
                fetchPartners();
                if (selectedPartner?._id === rejectingPartnerId) {
                    setSelectedPartner(data.partner || { ...selectedPartner, status: "REJECTED", isActive: false, rejectionReason });
                }
            } else {
                showToast("error", data.error || "Failed to reject partner.");
            }
        } catch {
            showToast("error", "Error rejecting partner application.");
        } finally {
            setActionLoadingId(null);
        }
    };

    // Delete Partner
    const handleDeletePartner = async (partnerId: string) => {
        if (!confirm("Are you sure you want to permanently delete this application record?")) return;

        setActionLoadingId(partnerId);
        try {
            const res = await fetch(`/api/admin/partners/${partnerId}`, { method: "DELETE" });
            if (res.ok) {
                showToast("success", "Application record deleted.");
                if (selectedPartner?._id === partnerId) setSelectedPartner(null);
                fetchPartners();
            } else {
                showToast("error", "Failed to delete partner record.");
            }
        } catch {
            showToast("error", "Error deleting partner application.");
        } finally {
            setActionLoadingId(null);
        }
    };

    // =========================================================================
    // PARTNER FILE STATUS UPDATE (ADMIN)
    // =========================================================================
    const handleSaveFileUpdate = async () => {
        if (!selectedFileItem) return;
        setActionLoadingId(selectedFileItem._id);

        try {
            const res = await fetch(`/api/admin/leads/${selectedFileItem._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    leadStatus: updateFileStatus,
                    payoutStatus: updatePayoutStatus,
                    commissionRate: updateCommissionRate
                })
            });

            const data = await res.json();
            if (res.ok) {
                showToast("success", "Partner file status & calculated commission updated successfully!");
                setFileUpdateModalOpen(false);
                setSelectedFileItem(null);
                fetchPartnerFiles();
            } else {
                showToast("error", data.error || "Failed to update file.");
            }
        } catch {
            showToast("error", "Error updating partner file.");
        } finally {
            setActionLoadingId(null);
        }
    };

    // Delete Partner File
    const handleDeleteFile = async (fileId: string) => {
        if (!confirm("Are you sure you want to delete this file record?")) return;
        try {
            const res = await fetch(`/api/admin/leads/${fileId}`, { method: "DELETE" });
            if (res.ok) {
                showToast("success", "File record deleted.");
                fetchPartnerFiles();
            } else {
                showToast("error", "Failed to delete file.");
            }
        } catch {
            showToast("error", "Error deleting file.");
        }
    };

    // =========================================================================
    // COMMISSION RATES SAVE (ADMIN)
    // =========================================================================
    const handleSaveCommissionRates = async (e: React.FormEvent) => {
        e.preventDefault();
        setRatesSaving(true);
        try {
            const res = await fetch("/api/admin/commission-rates", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(commissionRates)
            });

            const data = await res.json();
            if (res.ok) {
                showToast("success", "Commission rates updated across all partner dashboards!");
                if (data.settings) setCommissionRates(data.settings);
            } else {
                showToast("error", data.error || "Failed to update rates.");
            }
        } catch {
            showToast("error", "Error saving commission rates.");
        } finally {
            setRatesSaving(false);
        }
    };

    // Banner File Select
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    // Upload Banner
    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile || !title.trim()) {
            showToast("error", "Please select an image and enter a title");
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("image", selectedFile);
            formData.append("title", title.trim());
            formData.append("link", link.trim());
            formData.append("page", page);

            const res = await fetch("/api/banners", { method: "POST", body: formData });
            if (!res.ok) throw new Error("Upload failed");

            showToast("success", "Banner uploaded successfully!");
            setTitle("");
            setLink("");
            setPage("home");
            setPreview(null);
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            fetchBanners();
        } catch {
            showToast("error", "Failed to upload banner");
        } finally {
            setUploading(false);
        }
    };

    // Delete Banner
    const handleDeleteBanner = async (id: string) => {
        if (!confirm("Are you sure you want to delete this banner?")) return;
        setDeleting(id);
        try {
            const res = await fetch(`/api/banners/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            showToast("success", "Banner deleted");
            fetchBanners();
        } catch {
            showToast("error", "Failed to delete banner");
        } finally {
            setDeleting(null);
        }
    };

    // Logout
    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans">
            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border ${
                            toast.type === "success"
                                ? "bg-emerald-950/90 border-emerald-500 text-emerald-100"
                                : "bg-rose-950/90 border-rose-500 text-rose-100"
                        } backdrop-blur-xl`}
                    >
                        {toast.type === "success" ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : <AlertCircle className="h-5 w-5 text-rose-400" />}
                        <span className="text-sm font-bold">{toast.message}</span>
                        <button onClick={() => setToast(null)} className="ml-2 hover:opacity-70">
                            <X className="h-4 w-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40">
                <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <LayoutDashboard className="h-6 w-6 text-slate-950" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg font-black text-white">Shree Finance Admin Desk</h1>
                                <span className="bg-emerald-500/20 text-[#00e699] text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase">
                                    Live Master Portal
                                </span>
                            </div>
                            <p className="text-xs text-slate-400">Partner Approvals • Submitted Files • Dynamic Commissions • Banners</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Tab Switchers */}
                        <div className="hidden lg:flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                            <button
                                onClick={() => setActiveTab("partners")}
                                className={`px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                                    activeTab === "partners"
                                        ? "bg-[#00c985] text-slate-950 shadow-md"
                                        : "text-slate-400 hover:text-white"
                                }`}
                            >
                                <Users className="h-3.5 w-3.5" />
                                <span>Partner Approvals</span>
                                {partnerCounts.pending > 0 && (
                                    <span className="ml-1 bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full text-[10px] font-black">
                                        {partnerCounts.pending}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => setActiveTab("files")}
                                className={`px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                                    activeTab === "files"
                                        ? "bg-[#00c985] text-slate-950 shadow-md"
                                        : "text-slate-400 hover:text-white"
                                }`}
                            >
                                <Briefcase className="h-3.5 w-3.5" />
                                <span>Submitted Files & Pipeline</span>
                            </button>

                            <button
                                onClick={() => setActiveTab("rates")}
                                className={`px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                                    activeTab === "rates"
                                        ? "bg-[#00c985] text-slate-950 shadow-md"
                                        : "text-slate-400 hover:text-white"
                                }`}
                            >
                                <Percent className="h-3.5 w-3.5" />
                                <span>Commission Rates</span>
                            </button>

                            <button
                                onClick={() => setActiveTab("banners")}
                                className={`px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                                    activeTab === "banners"
                                        ? "bg-[#00c985] text-slate-950 shadow-md"
                                        : "text-slate-400 hover:text-white"
                                }`}
                            >
                                <ImagePlus className="h-3.5 w-3.5" />
                                <span>Banners</span>
                            </button>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                            title="Logout"
                        >
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Mobile / Tablet Tab Switcher */}
                <div className="lg:hidden flex overflow-x-auto gap-2 p-2 bg-slate-950/60 border-t border-slate-800">
                    <button
                        onClick={() => setActiveTab("partners")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                            activeTab === "partners" ? "bg-[#00c985] text-slate-950" : "text-slate-400"
                        }`}
                    >
                        Partner Approvals ({partnerCounts.pending})
                    </button>
                    <button
                        onClick={() => setActiveTab("files")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                            activeTab === "files" ? "bg-[#00c985] text-slate-950" : "text-slate-400"
                        }`}
                    >
                        Submitted Files
                    </button>
                    <button
                        onClick={() => setActiveTab("rates")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                            activeTab === "rates" ? "bg-[#00c985] text-slate-950" : "text-slate-400"
                        }`}
                    >
                        Commission Rates
                    </button>
                    <button
                        onClick={() => setActiveTab("banners")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                            activeTab === "banners" ? "bg-[#00c985] text-slate-950" : "text-slate-400"
                        }`}
                    >
                        Banners
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-4 md:px-6 py-8">
                {/* ========================================================================= */}
                {/* TAB 1: PARTNER APPLICATIONS & APPROVALS */}
                {/* ========================================================================= */}
                {activeTab === "partners" && (
                    <div className="space-y-6">
                        {/* Summary Metrics */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                                <span className="text-xs font-bold text-slate-400 uppercase">Total Applications</span>
                                <p className="text-2xl font-black text-white">{partnerCounts.total}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-1">
                                <span className="text-xs font-bold text-amber-300 uppercase">Pending Review</span>
                                <p className="text-2xl font-black text-amber-400">{partnerCounts.pending}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
                                <span className="text-xs font-bold text-emerald-300 uppercase">Approved Partners</span>
                                <p className="text-2xl font-black text-[#00e699]">{partnerCounts.approved}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-1">
                                <span className="text-xs font-bold text-rose-300 uppercase">Declined</span>
                                <p className="text-2xl font-black text-rose-400">{partnerCounts.rejected}</p>
                            </div>
                        </div>

                        {/* Search & Filter Header */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setPartnerFilter(status)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                            partnerFilter === status
                                                ? "bg-[#00c985] text-slate-950"
                                                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        {status === "ALL" ? "All" : status}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <div className="relative flex-1 sm:w-72">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by name, email, phone, ref..."
                                        value={partnerSearch}
                                        onChange={e => setPartnerSearch(e.target.value)}
                                        className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00c985]"
                                    />
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={fetchPartners}
                                    className="h-10 px-3 bg-slate-900 border-slate-800 text-slate-300 hover:text-white cursor-pointer"
                                >
                                    <RefreshCw className={`h-3.5 w-3.5 ${partnerLoading ? "animate-spin" : ""}`} />
                                </Button>
                            </div>
                        </div>

                        {/* Partner List Table */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                            {partnerLoading ? (
                                <div className="py-20 text-center space-y-3">
                                    <Loader2 className="h-8 w-8 text-[#00c985] animate-spin mx-auto" />
                                    <p className="text-xs text-slate-400">Loading partner applications...</p>
                                </div>
                            ) : partners.length === 0 ? (
                                <div className="py-16 text-center text-slate-500 text-xs space-y-2">
                                    <Users className="h-10 w-10 mx-auto text-slate-600" />
                                    <p>No partner applications found in this view.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase font-black tracking-wider text-[10px]">
                                                <th className="py-4 px-5">Ref # / Date</th>
                                                <th className="py-4 px-5">Applicant Details</th>
                                                <th className="py-4 px-5">Company / Profession</th>
                                                <th className="py-4 px-5">City & Address</th>
                                                <th className="py-4 px-5">Status</th>
                                                <th className="py-4 px-5 text-right">Approval Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800/60">
                                            {partners.map(p => {
                                                const isPending = p.status === "PENDING";
                                                const isApproved = p.status === "APPROVED";
                                                const isRejected = p.status === "REJECTED";
                                                const isLoading = actionLoadingId === p._id;

                                                return (
                                                    <tr key={p._id} className="hover:bg-slate-800/30 transition-colors">
                                                        <td className="py-4 px-5 align-top">
                                                            <span className="font-mono text-[#00e699] font-bold block">
                                                                #{p.referenceNo}
                                                            </span>
                                                            <span className="text-[10px] text-slate-500 block mt-0.5">
                                                                {new Date(p.createdAt).toLocaleDateString("en-IN", {
                                                                    day: "numeric",
                                                                    month: "short",
                                                                    year: "numeric"
                                                                })}
                                                            </span>
                                                        </td>

                                                        <td className="py-4 px-5 align-top">
                                                            <p className="font-bold text-white text-sm">{p.name}</p>
                                                            <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                                                                <Mail className="h-3 w-3 text-slate-400" />
                                                                {p.email}
                                                            </p>
                                                            <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                                                                <Phone className="h-3 w-3 text-emerald-400" />
                                                                +91 {p.mobile}
                                                            </p>
                                                        </td>

                                                        <td className="py-4 px-5 align-top">
                                                            <p className="font-bold text-slate-200">{p.companyName || "Individual DSA"}</p>
                                                            <p className="text-slate-400 text-[11px] mt-0.5">{p.profession}</p>
                                                            {p.experienceYears && (
                                                                <span className="text-[10px] text-slate-500">Exp: {p.experienceYears}</span>
                                                            )}
                                                        </td>

                                                        <td className="py-4 px-5 align-top">
                                                            <p className="font-bold text-slate-300">{p.city}</p>
                                                            <p className="text-slate-400 text-[11px] line-clamp-1 mt-0.5">{p.fullAddress || p.location || "N/A"}</p>
                                                        </td>

                                                        <td className="py-4 px-5 align-top">
                                                            {isPending && (
                                                                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase flex items-center gap-1 w-fit">
                                                                    <Clock className="h-3 w-3" /> Pending
                                                                </span>
                                                            )}
                                                            {isApproved && (
                                                                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase flex items-center gap-1 w-fit">
                                                                    <Check className="h-3 w-3" /> Approved
                                                                </span>
                                                            )}
                                                            {isRejected && (
                                                                <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-black uppercase flex items-center gap-1 w-fit">
                                                                    <X className="h-3 w-3" /> Rejected
                                                                </span>
                                                            )}
                                                        </td>

                                                        <td className="py-4 px-5 align-top text-right space-x-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => setSelectedPartner(p)}
                                                                className="h-8 px-2.5 rounded-lg border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs cursor-pointer"
                                                            >
                                                                View KYC
                                                            </Button>

                                                            {isPending ? (
                                                                <>
                                                                    <Button
                                                                        size="sm"
                                                                        disabled={isLoading}
                                                                        onClick={() => handleApprovePartner(p._id)}
                                                                        className="h-8 px-3 rounded-lg bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black text-xs uppercase cursor-pointer"
                                                                    >
                                                                        {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : "✓ Approve"}
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline"
                                                                        disabled={isLoading}
                                                                        onClick={() => {
                                                                            setRejectingPartnerId(p._id);
                                                                            setRejectionModalOpen(true);
                                                                        }}
                                                                        className="h-8 px-2.5 rounded-lg border-rose-500/40 text-rose-300 hover:bg-rose-950 hover:text-white text-xs cursor-pointer"
                                                                    >
                                                                        Decline
                                                                    </Button>
                                                                </>
                                                            ) : (
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    onClick={() => handleDeletePartner(p._id)}
                                                                    className="h-8 px-2 text-slate-500 hover:text-rose-400 cursor-pointer"
                                                                    title="Delete record"
                                                                >
                                                                    <Trash2 className="h-3.5 w-3.5" />
                                                                </Button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ========================================================================= */}
                {/* TAB 2: PARTNER SUBMITTED FILES & PIPELINE */}
                {/* ========================================================================= */}
                {activeTab === "files" && (
                    <div className="space-y-6">
                        {/* Files Overview Metrics */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                                <span className="text-xs font-bold text-slate-400 uppercase">Total Files Filed</span>
                                <p className="text-2xl font-black text-white">{filesMetrics.totalCount}</p>
                                <p className="text-[10px] text-slate-500">Volume: ₹{(filesMetrics.totalFiledVolume / 100000).toFixed(1)}L</p>
                            </div>

                            <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/40 space-y-1">
                                <span className="text-xs font-bold text-sky-300 uppercase">In Process Cases</span>
                                <p className="text-2xl font-black text-sky-400">{filesMetrics.inProcessCount}</p>
                                <p className="text-[10px] text-sky-300/80">Active in bank underwriting</p>
                            </div>

                            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
                                <span className="text-xs font-bold text-emerald-300 uppercase">Disbursed Volume</span>
                                <p className="text-2xl font-black text-[#00e699]">
                                    ₹{(filesMetrics.totalDisbursedVolume / 100000).toFixed(1)} Lakhs
                                </p>
                                <p className="text-[10px] text-emerald-300/80">{filesMetrics.disbursedCount} cases completed</p>
                            </div>

                            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/40 space-y-1">
                                <span className="text-xs font-bold text-emerald-400 uppercase">Total Commissions</span>
                                <p className="text-2xl font-black text-[#00e699]">
                                    ₹{filesMetrics.totalCommissions.toLocaleString("en-IN")}
                                </p>
                                <p className="text-[10px] text-slate-400">Calculated on disbursed amounts</p>
                            </div>
                        </div>

                        {/* Search & Category Filter */}
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-2">
                                {(["ALL", "loans", "cards", "insurance", "investments"] as const).map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFileCategoryFilter(cat)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer uppercase ${
                                            fileCategoryFilter === cat
                                                ? "bg-[#00c985] text-slate-950"
                                                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                                        }`}
                                    >
                                        {cat === "ALL" ? "All Categories" : cat}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-3 w-full lg:w-auto">
                                <select
                                    value={fileStatusFilter}
                                    onChange={e => setFileStatusFilter(e.target.value)}
                                    className="h-10 px-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-white focus:ring-2 focus:ring-[#00c985]"
                                >
                                    <option value="ALL">All File Statuses</option>
                                    <option value="IN_PROCESS">In Process</option>
                                    <option value="DOCS_SUBMITTED">Docs Submitted</option>
                                    <option value="BANK_LOGIN">Bank Login</option>
                                    <option value="SANCTIONED">Sanctioned</option>
                                    <option value="DISBURSED">Disbursed</option>
                                    <option value="REJECTED">Declined</option>
                                </select>

                                <div className="relative flex-1 sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search partner, bank, client..."
                                        value={fileSearch}
                                        onChange={e => setFileSearch(e.target.value)}
                                        className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00c985]"
                                    />
                                </div>

                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={fetchPartnerFiles}
                                    className="h-10 px-3 bg-slate-900 border-slate-800 text-slate-300 hover:text-white cursor-pointer"
                                >
                                    <RefreshCw className={`h-3.5 w-3.5 ${filesLoading ? "animate-spin" : ""}`} />
                                </Button>
                            </div>
                        </div>

                        {/* Files Table */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                            {filesLoading ? (
                                <div className="py-20 text-center space-y-3">
                                    <Loader2 className="h-8 w-8 text-[#00c985] animate-spin mx-auto" />
                                    <p className="text-xs text-slate-400">Loading partner submitted files...</p>
                                </div>
                            ) : partnerFiles.length === 0 ? (
                                <div className="py-16 text-center text-slate-500 text-xs space-y-2">
                                    <Briefcase className="h-10 w-10 mx-auto text-slate-600" />
                                    <p>No submitted files found in this filter.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase font-black tracking-wider text-[10px]">
                                                <th className="py-4 px-5">File Ref / Partner</th>
                                                <th className="py-4 px-5">Client Acquire Details</th>
                                                <th className="py-4 px-5">Category & Bank</th>
                                                <th className="py-4 px-5">Filed Amount</th>
                                                <th className="py-4 px-5">Commission Rate & Amount</th>
                                                <th className="py-4 px-5">Status</th>
                                                <th className="py-4 px-5 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800/60">
                                            {partnerFiles.map(file => {
                                                const isDisbursed = file.leadStatus === "DISBURSED";

                                                return (
                                                    <tr key={file._id} className="hover:bg-slate-800/30 transition-colors">
                                                        <td className="py-4 px-5 align-top">
                                                            <span className="font-mono text-[#00e699] font-bold block">
                                                                #{file.referenceNo}
                                                            </span>
                                                            <p className="text-white font-bold text-xs mt-0.5">{file.partnerName}</p>
                                                            <span className="text-[10px] text-slate-400 font-mono">#{file.partnerReferenceNo}</span>
                                                        </td>

                                                        <td className="py-4 px-5 align-top">
                                                            <p className="font-bold text-white text-sm">{file.customerName}</p>
                                                            <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                                                                <Phone className="h-3 w-3 text-emerald-400" />
                                                                +91 {file.customerMobile}
                                                            </p>
                                                            <p className="text-slate-500 text-[11px]">{file.customerCity}</p>
                                                        </td>

                                                        <td className="py-4 px-5 align-top">
                                                            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-slate-800 text-sky-300 border border-slate-700 inline-block mb-1">
                                                                {file.category}
                                                            </span>
                                                            <p className="font-bold text-slate-200">{file.subProduct}</p>
                                                            <p className="text-sky-400 text-[11px] mt-0.5 font-medium">🏦 {file.bankName}</p>
                                                        </td>

                                                        <td className="py-4 px-5 align-top">
                                                            <span className="font-black text-sm text-white block">
                                                                ₹{file.applicationAmount.toLocaleString("en-IN")}
                                                            </span>
                                                            <span className="text-[10px] text-slate-500">Filed to Bank</span>
                                                        </td>

                                                        <td className="py-4 px-5 align-top">
                                                            <span className="font-black text-[#00e699] text-sm block">
                                                                ₹{file.commissionAmount ? file.commissionAmount.toLocaleString("en-IN") : "0"}
                                                            </span>
                                                            <span className="text-[10px] text-slate-400 font-medium">
                                                                ({file.commissionRate}% of ₹{(file.applicationAmount / 100000).toFixed(1)}L)
                                                            </span>
                                                        </td>

                                                        <td className="py-4 px-5 align-top">
                                                            {file.leadStatus === "IN_PROCESS" && (
                                                                <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-black uppercase">
                                                                    In Process
                                                                </span>
                                                            )}
                                                            {file.leadStatus === "DOCS_SUBMITTED" && (
                                                                <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-black uppercase">
                                                                    Docs Submitted
                                                                </span>
                                                            )}
                                                            {file.leadStatus === "BANK_LOGIN" && (
                                                                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase">
                                                                    Bank Login Done
                                                                </span>
                                                            )}
                                                            {file.leadStatus === "SANCTIONED" && (
                                                                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase">
                                                                    Sanction Issued
                                                                </span>
                                                            )}
                                                            {isDisbursed && (
                                                                <span className="px-2.5 py-1 rounded-full bg-[#00c985] text-slate-950 text-[10px] font-black uppercase">
                                                                    ✅ Disbursed
                                                                </span>
                                                            )}
                                                            {file.leadStatus === "REJECTED" && (
                                                                <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-black uppercase">
                                                                    Declined
                                                                </span>
                                                            )}
                                                        </td>

                                                        <td className="py-4 px-5 align-top text-right space-x-1.5">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => {
                                                                    setSelectedFileItem(file);
                                                                    setUpdateFileStatus(file.leadStatus);
                                                                    setUpdatePayoutStatus(file.payoutStatus || "PENDING");
                                                                    setUpdateCommissionRate(file.commissionRate || 2.0);
                                                                    setFileUpdateModalOpen(true);
                                                                }}
                                                                className="h-8 px-2.5 rounded-lg border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs cursor-pointer"
                                                            >
                                                                <Edit3 className="h-3 w-3 mr-1" /> Edit / Status
                                                            </Button>

                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => handleDeleteFile(file._id)}
                                                                className="h-8 px-2 text-slate-500 hover:text-rose-400 cursor-pointer"
                                                            >
                                                                <Trash2 className="h-3.5 w-3.5" />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ========================================================================= */}
                {/* TAB 3: COMMISSION RATES & SETTINGS */}
                {/* ========================================================================= */}
                {activeTab === "rates" && (
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                                <div>
                                    <h3 className="text-xl font-black text-white flex items-center gap-2">
                                        <Percent className="h-5 w-5 text-[#00c985]" /> Master Partner Commission Rates Configuration
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-1">
                                        Rates defined here will dynamically update across all partner dashboards, file submission calculations, and disbursal payouts.
                                    </p>
                                </div>
                                <span className="text-xs font-black text-[#00e699] bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                                    Instant Sync
                                </span>
                            </div>

                            <form onSubmit={handleSaveCommissionRates} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {/* Loans Rate */}
                                    <div className="p-5 rounded-2xl bg-slate-950/60 border border-emerald-500/30 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black text-emerald-400 uppercase flex items-center gap-1.5">
                                                <Banknote className="h-4 w-4" /> 1. Loans Commission Rate (%)
                                            </span>
                                            <span className="text-xs font-bold text-slate-400">Default: 2.0%</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                step="0.05"
                                                value={commissionRates.loansCommissionRate}
                                                onChange={e => setCommissionRates({ ...commissionRates, loansCommissionRate: parseFloat(e.target.value) || 0 })}
                                                className="w-full h-12 bg-slate-900 border border-slate-700 rounded-xl px-4 text-lg font-black text-white focus:ring-2 focus:ring-[#00c985]"
                                                required
                                            />
                                            <span className="text-lg font-black text-slate-400">%</span>
                                        </div>
                                        <p className="text-[11px] text-slate-400">Applied to Home Loans, Personal Loans, Business Loans & LAP</p>
                                    </div>

                                    {/* Cards Rate */}
                                    <div className="p-5 rounded-2xl bg-slate-950/60 border border-sky-500/30 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black text-sky-400 uppercase flex items-center gap-1.5">
                                                <CreditCard className="h-4 w-4" /> 2. Cards Commission Rate (%)
                                            </span>
                                            <span className="text-xs font-bold text-slate-400">Default: 3.0%</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                step="0.05"
                                                value={commissionRates.cardsCommissionRate}
                                                onChange={e => setCommissionRates({ ...commissionRates, cardsCommissionRate: parseFloat(e.target.value) || 0 })}
                                                className="w-full h-12 bg-slate-900 border border-slate-700 rounded-xl px-4 text-lg font-black text-white focus:ring-2 focus:ring-sky-500"
                                                required
                                            />
                                            <span className="text-lg font-black text-slate-400">%</span>
                                        </div>
                                        <p className="text-[11px] text-slate-400">Applied to Retail & Corporate Credit Cards</p>
                                    </div>

                                    {/* Insurance Rate */}
                                    <div className="p-5 rounded-2xl bg-slate-950/60 border border-purple-500/30 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black text-purple-400 uppercase flex items-center gap-1.5">
                                                <Shield className="h-4 w-4" /> 3. Insurance Commission Rate (%)
                                            </span>
                                            <span className="text-xs font-bold text-slate-400">Default: 5.0%</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                step="0.05"
                                                value={commissionRates.insuranceCommissionRate}
                                                onChange={e => setCommissionRates({ ...commissionRates, insuranceCommissionRate: parseFloat(e.target.value) || 0 })}
                                                className="w-full h-12 bg-slate-900 border border-slate-700 rounded-xl px-4 text-lg font-black text-white focus:ring-2 focus:ring-purple-500"
                                                required
                                            />
                                            <span className="text-lg font-black text-slate-400">%</span>
                                        </div>
                                        <p className="text-[11px] text-slate-400">Applied to Health, Life, and Vehicle Insurance policies</p>
                                    </div>

                                    {/* Investments Rate */}
                                    <div className="p-5 rounded-2xl bg-slate-950/60 border border-amber-500/30 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black text-amber-400 uppercase flex items-center gap-1.5">
                                                <PieChart className="h-4 w-4" /> 4. Investments Commission Rate (%)
                                            </span>
                                            <span className="text-xs font-bold text-slate-400">Default: 1.5%</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                step="0.05"
                                                value={commissionRates.investmentsCommissionRate}
                                                onChange={e => setCommissionRates({ ...commissionRates, investmentsCommissionRate: parseFloat(e.target.value) || 0 })}
                                                className="w-full h-12 bg-slate-900 border border-slate-700 rounded-xl px-4 text-lg font-black text-white focus:ring-2 focus:ring-amber-500"
                                                required
                                            />
                                            <span className="text-lg font-black text-slate-400">%</span>
                                        </div>
                                        <p className="text-[11px] text-slate-400">Applied to Mutual Funds, Corporate Fixed Deposits & Pre-IPO</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end pt-4 border-t border-slate-800">
                                    <Button
                                        type="submit"
                                        disabled={ratesSaving}
                                        className="h-12 px-8 rounded-2xl bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black text-xs uppercase tracking-wider cursor-pointer shadow-xl shadow-emerald-500/20 flex items-center gap-2"
                                    >
                                        {ratesSaving ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                <span>Updating Global Rates...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4" />
                                                <span>Save & Push Rates to All Partner Dashboards</span>
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* ========================================================================= */}
                {/* TAB 4: BANNER MANAGEMENT */}
                {/* ========================================================================= */}
                {activeTab === "banners" && (
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        {/* Upload Form */}
                        <div className="lg:col-span-1 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
                            <div>
                                <h3 className="text-lg font-black text-white flex items-center gap-2">
                                    <ImagePlus className="h-5 w-5 text-[#00c985]" /> Upload Dynamic Banner
                                </h3>
                                <p className="text-xs text-slate-400 mt-1">Upload high-res promotional banners for any page</p>
                            </div>

                            <form onSubmit={handleUpload} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-slate-400">Banner Title *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Lowest Home Loan 8.35%"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        required
                                        className="w-full h-11 bg-slate-950 border border-slate-800 rounded-xl px-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00c985]"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-slate-400">Target Page *</label>
                                    <select
                                        value={page}
                                        onChange={e => setPage(e.target.value)}
                                        className="w-full h-11 bg-slate-950 border border-slate-800 rounded-xl px-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#00c985]"
                                    >
                                        {PAGE_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-slate-400">CTA Link (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. /home-loan"
                                        value={link}
                                        onChange={e => setLink(e.target.value)}
                                        className="w-full h-11 bg-slate-950 border border-slate-800 rounded-xl px-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00c985]"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-slate-400">Banner Image (JPG, PNG, WebP) *</label>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-slate-700 hover:border-[#00c985] rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-950/60 space-y-2"
                                    >
                                        {preview ? (
                                            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden">
                                                <Image src={preview} alt="Preview" fill className="object-cover" />
                                            </div>
                                        ) : (
                                            <div className="py-4 space-y-2">
                                                <Upload className="h-8 w-8 mx-auto text-slate-500" />
                                                <p className="text-xs text-slate-400">Click to select banner image</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={uploading || !selectedFile || !title.trim()}
                                    className="w-full h-12 rounded-xl bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-emerald-500/20"
                                >
                                    {uploading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Upload Banner"}
                                </Button>
                            </form>
                        </div>

                        {/* Banner Grid */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-black text-white">Active Banners ({banners.length})</h3>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={fetchBanners}
                                    className="h-8 px-3 bg-slate-900 border-slate-800 text-slate-300 hover:text-white cursor-pointer"
                                >
                                    <RefreshCw className={`h-3 w-3 ${bannerLoading ? "animate-spin" : ""}`} />
                                </Button>
                            </div>

                            {banners.length === 0 ? (
                                <div className="p-12 text-center text-slate-500 bg-slate-900/40 rounded-3xl border border-slate-800 text-xs">
                                    No banners uploaded yet.
                                </div>
                            ) : (
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {banners.map(banner => (
                                        <div
                                            key={banner._id}
                                            className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg space-y-3 p-3 group"
                                        >
                                            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-950">
                                                <Image src={banner.imageUrl} alt={banner.title} fill className="object-cover" />
                                                <button
                                                    onClick={() => handleDeleteBanner(banner._id)}
                                                    disabled={deleting === banner._id}
                                                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-950/80 text-rose-300 hover:bg-rose-900 cursor-pointer transition-colors"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-xs truncate">{banner.title}</p>
                                                <p className="text-[10px] text-emerald-400 uppercase font-black">Page: {banner.page}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* ========================================================================= */}
            {/* PARTNER KYC & DETAILS MODAL */}
            {/* ========================================================================= */}
            <AnimatePresence>
                {selectedPartner && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#1f2328] border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                <div>
                                    <h3 className="text-xl font-black text-white">{selectedPartner.name}</h3>
                                    <p className="text-xs text-slate-400 font-mono">Ref: #{selectedPartner.referenceNo}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedPartner(null)}
                                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                                    <span className="text-slate-400 font-bold uppercase text-[10px]">Email Address</span>
                                    <p className="font-bold text-white">{selectedPartner.email}</p>
                                </div>
                                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                                    <span className="text-slate-400 font-bold uppercase text-[10px]">Mobile</span>
                                    <p className="font-bold text-white">+91 {selectedPartner.mobile}</p>
                                </div>
                                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                                    <span className="text-slate-400 font-bold uppercase text-[10px]">Company / Firm</span>
                                    <p className="font-bold text-white">{selectedPartner.companyName || "Individual DSA"}</p>
                                </div>
                                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                                    <span className="text-slate-400 font-bold uppercase text-[10px]">Profession & Exp</span>
                                    <p className="font-bold text-white">{selectedPartner.profession} ({selectedPartner.experienceYears || "N/A"})</p>
                                </div>
                            </div>

                            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2 text-xs">
                                <p className="font-black text-emerald-400 uppercase text-[10px]">Operating & Address Details</p>
                                <p className="text-slate-300"><strong>City:</strong> {selectedPartner.city}</p>
                                <p className="text-slate-300"><strong>Full Address:</strong> {selectedPartner.fullAddress || selectedPartner.location || "N/A"}</p>
                                <p className="text-slate-300"><strong>Address Proof Type:</strong> {selectedPartner.addressProofType || "Aadhaar"}</p>
                            </div>

                            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2 text-xs">
                                <p className="font-black text-emerald-400 uppercase text-[10px]">Uploaded Documents Summary</p>
                                <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                                    {typeof selectedPartner.uploadedDocuments === "string"
                                        ? selectedPartner.uploadedDocuments
                                        : JSON.stringify(selectedPartner.uploadedDocuments || "Standard KYC documents submitted")}
                                </p>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setSelectedPartner(null)}
                                    className="h-10 px-4 rounded-xl border-slate-700 bg-slate-800 text-white text-xs cursor-pointer"
                                >
                                    Close
                                </Button>
                                {selectedPartner.status === "PENDING" && (
                                    <Button
                                        onClick={() => handleApprovePartner(selectedPartner._id)}
                                        className="h-10 px-5 rounded-xl bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black text-xs uppercase cursor-pointer"
                                    >
                                        ✓ Approve & Issue Password
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ========================================================================= */}
            {/* PARTNER FILE EDIT & STATUS UPDATE MODAL (ADMIN) */}
            {/* ========================================================================= */}
            <AnimatePresence>
                {fileUpdateModalOpen && selectedFileItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#1f2328] border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6"
                        >
                            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                <div>
                                    <h3 className="text-lg font-black text-white">Edit File Status & Commission</h3>
                                    <p className="text-xs text-slate-400">File Ref: #{selectedFileItem.referenceNo}</p>
                                </div>
                                <button
                                    onClick={() => setFileUpdateModalOpen(false)}
                                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-slate-400 font-bold">Partner:</span>
                                    <span className="text-white font-bold">{selectedFileItem.partnerName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400 font-bold">Client:</span>
                                    <span className="text-white font-bold">{selectedFileItem.customerName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400 font-bold">Bank Submitted To:</span>
                                    <span className="text-sky-400 font-bold">{selectedFileItem.bankName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400 font-bold">Filed Amount:</span>
                                    <span className="text-white font-black">₹{selectedFileItem.applicationAmount.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex justify-between border-t border-slate-800 pt-2">
                                    <span className="text-emerald-400 font-bold">Calculated Commission:</span>
                                    <span className="text-[#00e699] font-black">
                                        ₹{Math.round(selectedFileItem.applicationAmount * (updateCommissionRate / 100)).toLocaleString("en-IN")}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-slate-400">File Workflow Status *</label>
                                    <select
                                        value={updateFileStatus}
                                        onChange={e => setUpdateFileStatus(e.target.value)}
                                        className="w-full h-11 bg-[#15171a] border border-white/10 rounded-xl px-3 text-xs font-bold text-white focus:ring-2 focus:ring-[#00c985]"
                                    >
                                        <option value="IN_PROCESS">In Process (Under Review)</option>
                                        <option value="DOCS_SUBMITTED">Docs Submitted to Bank</option>
                                        <option value="BANK_LOGIN">Bank Login Done</option>
                                        <option value="SANCTIONED">Sanction Letter Issued</option>
                                        <option value="DISBURSED">🎉 DISBURSED (Bank Disbursal Completed)</option>
                                        <option value="REJECTED">Declined / Closed</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-slate-400">Commission Rate (%) *</label>
                                        <input
                                            type="number"
                                            step="0.05"
                                            value={updateCommissionRate}
                                            onChange={e => setUpdateCommissionRate(parseFloat(e.target.value) || 0)}
                                            className="w-full h-11 bg-[#15171a] border border-white/10 rounded-xl px-3 text-xs font-bold text-white focus:ring-2 focus:ring-[#00c985]"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-black uppercase text-slate-400">Partner Payout Status *</label>
                                        <select
                                            value={updatePayoutStatus}
                                            onChange={e => setUpdatePayoutStatus(e.target.value)}
                                            className="w-full h-11 bg-[#15171a] border border-white/10 rounded-xl px-3 text-xs font-bold text-white focus:ring-2 focus:ring-[#00c985]"
                                        >
                                            <option value="PENDING">Pending Settlement</option>
                                            <option value="PROCESSED">Processed / In Queue</option>
                                            <option value="PAID">✅ Paid to Partner</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setFileUpdateModalOpen(false)}
                                    className="h-10 px-4 rounded-xl border-slate-700 bg-slate-800 text-white text-xs cursor-pointer"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSaveFileUpdate}
                                    className="h-10 px-5 rounded-xl bg-[#00c985] hover:bg-[#00b074] text-slate-950 font-black text-xs uppercase cursor-pointer"
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ========================================================================= */}
            {/* REJECTION REASON MODAL */}
            {/* ========================================================================= */}
            <AnimatePresence>
                {rejectionModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#1f2328] border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4"
                        >
                            <h3 className="text-lg font-black text-white">Decline Partner Application</h3>
                            <p className="text-xs text-slate-400">
                                Provide an optional feedback reason. An email notification will be dispatched to the applicant.
                            </p>
                            <textarea
                                rows={3}
                                placeholder="e.g. Incomplete KYC documentation or unverified contact number..."
                                value={rejectionReason}
                                onChange={e => setRejectionReason(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
                            />
                            <div className="flex items-center justify-end gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setRejectionModalOpen(false)}
                                    className="h-10 px-4 rounded-xl border-slate-700 bg-slate-800 text-white text-xs cursor-pointer"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleRejectPartner}
                                    className="h-10 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase cursor-pointer"
                                >
                                    Confirm Decline
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
