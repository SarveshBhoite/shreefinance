"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

    // Form state
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [page, setPage] = useState("home");
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

    // Fetch banners
    const fetchBanners = async () => {
        try {
            const res = await fetch("/api/banners");
            const data = await res.json();
            setBanners(data.banners || []);
        } catch (err) {
            console.error("Failed to fetch banners", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    // Show toast
    const showToast = (type: "success" | "error", message: string) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3000);
    };

    // Handle file select
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    // Upload banner
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

            const res = await fetch("/api/banners", {
                method: "POST",
                body: formData,
            });

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

    // Delete banner
    const handleDelete = async (id: string) => {
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
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border ${toast.type === "success"
                            ? "bg-green-900/80 border-green-700 text-green-200"
                            : "bg-red-900/80 border-red-700 text-red-200"
                            } backdrop-blur-lg`}
                    >
                        {toast.type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                        <span className="text-sm font-medium">{toast.message}</span>
                        <button onClick={() => setToast(null)}>
                            <X className="h-4 w-4 opacity-60 hover:opacity-100" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40">
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                            <LayoutDashboard className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg">ShreeFinance Admin</h1>
                            <p className="text-xs text-slate-400">Banner Management</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm transition-all"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            </header>

            <div className="container mx-auto px-4 md:px-6 py-8 space-y-10">
                {/* Upload Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-xl"
                >
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <ImagePlus className="h-5 w-5 text-blue-400" />
                        Upload New Banner
                    </h2>

                    <form onSubmit={handleUpload} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* File Drop Zone */}
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="relative border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors group min-h-[200px]"
                            >
                                {preview ? (
                                    <div className="relative w-full h-48">
                                        <Image src={preview} alt="Preview" fill className="object-contain rounded-lg" />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPreview(null);
                                                setSelectedFile(null);
                                                if (fileInputRef.current) fileInputRef.current.value = "";
                                            }}
                                            className="absolute top-2 right-2 h-8 w-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="h-10 w-10 text-slate-500 group-hover:text-blue-400 transition-colors mb-3" />
                                        <p className="text-slate-400 text-sm text-center">
                                            Click to select an image<br />
                                            <span className="text-xs text-slate-500">PNG, JPG, WEBP up to 10MB</span>
                                        </p>
                                    </>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                            </div>

                            {/* Title & Link */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Banner Title *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Diwali Special Offers"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        className="w-full h-11 px-4 bg-sky-900/10 border border-sky-800 rounded-xl text-white placeholder:text-sky-500 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Target Page *</label>
                                    <select
                                        value={page}
                                        onChange={(e) => setPage(e.target.value)}
                                        className="w-full h-11 px-4 bg-sky-900/10 border border-sky-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    >
                                        {PAGE_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Link (optional)</label>
                                    <input
                                        type="url"
                                        placeholder="https://example.com"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        className="w-full h-11 px-4 bg-sky-900/10 border border-sky-800 rounded-xl text-white placeholder:text-sky-500 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={uploading || !selectedFile}
                                    className="w-full h-12 bg-primary hover:bg-sky-600 text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-white/10"
                                >
                                    {uploading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="h-4 w-4" />
                                            Upload Banner
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </motion.div>

                {/* Banner Grid */}
                <div>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <ImagePlus className="h-5 w-5 text-purple-400" />
                        Uploaded Banners
                        <span className="text-sm font-normal text-slate-500 ml-2">({banners.length})</span>
                    </h2>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                        </div>
                    ) : banners.length === 0 ? (
                        <div className="text-center py-20 text-slate-500">
                            <ImagePlus className="h-12 w-12 mx-auto mb-3 opacity-40" />
                            <p>No banners uploaded yet</p>
                            <p className="text-sm mt-1">Upload your first banner above</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {banners.map((banner) => (
                                    <motion.div
                                        key={banner._id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-600 transition-all"
                                    >
                                        <div className="relative aspect-[16/9]">
                                            <Image
                                                src={banner.imageUrl}
                                                alt={banner.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    onClick={() => handleDelete(banner._id)}
                                                    disabled={deleting === banner._id}
                                                    className="h-12 w-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transition-all"
                                                >
                                                    {deleting === banner._id ? (
                                                        <Loader2 className="h-5 w-5 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <p className="font-semibold text-sm truncate">{banner.title}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-300 border border-blue-800">
                                                    {PAGE_OPTIONS.find(p => p.value === banner.page)?.label || banner.page}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1">
                                                {new Date(banner.createdAt).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
