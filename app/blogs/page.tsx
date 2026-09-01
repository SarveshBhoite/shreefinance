"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    Search,
    Calendar,
    Clock,
    User,
    ArrowRight,
    Sparkles,
    Tag,
    Share2,
    Check,
    ChevronRight,
    TrendingUp,
    Shield,
    CreditCard,
    Building2,
    DollarSign,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogItem {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    coverImage?: string;
    author: string;
    authorRole?: string;
    readTime?: string;
    tags: string[];
    views: number;
    createdAt: string;
}

const CATEGORIES = [
    { name: "ALL", label: "All Insights", icon: Sparkles },
    { name: "Loans", label: "Loans & Mortgages", icon: Building2 },
    { name: "Cards", label: "Credit Cards", icon: CreditCard },
    { name: "Insurance", label: "Insurance & Safety", icon: Shield },
    { name: "Investments", label: "Investments & Wealth", icon: TrendingUp },
    { name: "Credit Score", label: "CIBIL & Credit Score", icon: DollarSign },
];

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<BlogItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBlogs() {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (selectedCategory !== "ALL") params.append("category", selectedCategory);
                if (searchQuery.trim()) params.append("search", searchQuery.trim());

                const res = await fetch(`/api/blogs?${params.toString()}`);
                if (res.ok) {
                    const data = await res.json();
                    setBlogs(data.blogs || []);
                }
            } catch (err) {
                console.error("Failed to load blogs:", err);
            } finally {
                setLoading(false);
            }
        }

        const timeout = setTimeout(fetchBlogs, 250);
        return () => clearTimeout(timeout);
    }, [selectedCategory, searchQuery]);

    const handleShare = (slug: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const url = `${window.location.origin}/blogs/${slug}`;
        navigator.clipboard.writeText(url);
        setCopiedSlug(slug);
        setTimeout(() => setCopiedSlug(null), 2500);
    };

    const featuredBlog = blogs.length > 0 ? blogs[0] : null;
    const remainingBlogs = blogs.length > 1 ? blogs.slice(1) : [];

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-24">
            {/* 1. HERO BANNER */}
            <section className="relative overflow-hidden bg-gradient-to-b from-sky-950 via-slate-900 to-slate-900 text-white pt-24 pb-20 border-b border-sky-800/40">
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#0284c7] rounded-full blur-[140px]" />
                </div>

                <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-5xl text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 text-xs font-black text-[#38bdf8] uppercase tracking-wider mx-auto backdrop-blur-md"
                    >
                        <BookOpen className="h-3.5 w-3.5 text-[#38bdf8]" />
                        Shree Finance Knowledge & Intelligence Desk
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 }}
                        className="text-4xl md:text-6xl font-black tracking-tight text-white"
                    >
                        Financial Wisdom, <span className="text-[#38bdf8]">Made Simple</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Expert guides, banking updates, loan comparison tactics, and wealth strategies curated by senior financial advisors.
                    </motion.p>

                    {/* Search Bar in Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto relative pt-4"
                    >
                        <div className="relative flex items-center">
                            <Search className="h-5 w-5 text-slate-400 absolute left-4 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search articles on Home Loans, CIBIL tips, Interest Rates..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-14 pl-12 pr-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0284c7] focus:bg-slate-900/90 transition-all shadow-xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. CATEGORY FILTER CHIPS */}
            <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200 py-4 shadow-xs">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
                        {CATEGORIES.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = selectedCategory === cat.name;
                            return (
                                <button
                                    key={cat.name}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                                        isActive
                                            ? "bg-[#0284c7] text-white shadow-md shadow-sky-500/20 scale-102"
                                            : "bg-[#f8fafc] text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                                    }`}
                                >
                                    <Icon className="h-3.5 w-3.5" />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 3. MAIN CONTENT */}
            <main className="container mx-auto px-4 md:px-6 pt-12 space-y-16">
                {loading ? (
                    <div className="py-24 text-center space-y-4">
                        <Loader2 className="h-10 w-10 text-[#0284c7] animate-spin mx-auto" />
                        <p className="text-slate-500 text-sm font-bold">Fetching latest articles...</p>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="py-24 text-center bg-white border border-slate-200 rounded-3xl p-12 space-y-4 max-w-xl mx-auto shadow-sm">
                        <BookOpen className="h-12 w-12 text-slate-300 mx-auto" />
                        <h3 className="text-xl font-black text-slate-900">No Articles Found</h3>
                        <p className="text-slate-500 text-xs leading-relaxed">
                            We could not find any blog posts matching your search criteria. Try a different query or category filter.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("ALL");
                            }}
                            className="rounded-xl font-bold text-xs"
                        >
                            Reset All Filters
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* FEATURED BLOG POST (Full width top hero card) */}
                        {featuredBlog && selectedCategory === "ALL" && !searchQuery && (
                            <div className="space-y-4">
                                <span className="text-xs font-black uppercase text-[#0284c7] tracking-wider flex items-center gap-1.5">
                                    <Sparkles className="h-3.5 w-3.5" /> Featured Spotlight
                                </span>

                                <Link href={`/blogs/${featuredBlog.slug}`} className="block group">
                                    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:border-sky-500/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
                                        <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-900">
                                            {featuredBlog.coverImage ? (
                                                <Image
                                                    src={featuredBlog.coverImage}
                                                    alt={featuredBlog.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full min-h-[280px] bg-gradient-to-br from-sky-900 to-slate-900 flex items-center justify-center p-8 text-center">
                                                    <BookOpen className="h-16 w-16 text-sky-400/40" />
                                                </div>
                                            )}
                                            <span className="absolute top-4 left-4 bg-[#0284c7] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                                                {featuredBlog.category}
                                            </span>
                                        </div>

                                        <div className="lg:col-span-6 p-8 lg:p-10 flex flex-col justify-between space-y-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-4 text-xs text-slate-500 font-bold">
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar className="h-3.5 w-3.5 text-[#0284c7]" />
                                                        {new Date(featuredBlog.createdAt).toLocaleDateString("en-IN", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric"
                                                        })}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                                                        {featuredBlog.readTime || "4 min read"}
                                                    </span>
                                                </div>

                                                <h2 className="text-2xl lg:text-3xl font-black text-slate-900 group-hover:text-[#0284c7] transition-colors leading-tight">
                                                    {featuredBlog.title}
                                                </h2>

                                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                                                    {featuredBlog.excerpt}
                                                </p>
                                            </div>

                                            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-sky-100 text-[#0284c7] font-black text-xs flex items-center justify-center border border-sky-300">
                                                        {featuredBlog.author ? featuredBlog.author[0] : "S"}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-black text-slate-900">{featuredBlog.author}</p>
                                                        <p className="text-[10px] text-slate-500">{featuredBlog.authorRole || "Financial Analyst"}</p>
                                                    </div>
                                                </div>

                                                <span className="inline-flex items-center gap-1 text-xs font-black text-[#0284c7] group-hover:translate-x-1 transition-transform">
                                                    Read Full Story <ChevronRight className="h-4 w-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}

                        {/* GRID OF BLOG POSTS */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl md:text-2xl font-black text-slate-900">
                                    {selectedCategory === "ALL" && !searchQuery
                                        ? "Latest Articles & Guides"
                                        : `Found ${blogs.length} Article${blogs.length > 1 ? "s" : ""}`}
                                </h3>
                                <span className="text-xs font-bold text-slate-500">
                                    Sorted by newest first
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {(selectedCategory === "ALL" && !searchQuery ? remainingBlogs : blogs).map((blog, idx) => (
                                    <motion.div
                                        key={blog._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <Link href={`/blogs/${blog.slug}`} className="block h-full group">
                                            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between h-full">
                                                <div>
                                                    {/* Card Cover Image */}
                                                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                                                        {blog.coverImage ? (
                                                            <Image
                                                                src={blog.coverImage}
                                                                alt={blog.title}
                                                                fill
                                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-sky-900 to-slate-900 flex items-center justify-center p-4">
                                                                <BookOpen className="h-10 w-10 text-sky-400/40" />
                                                            </div>
                                                        )}
                                                        <span className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-xs border border-slate-200">
                                                            {blog.category}
                                                        </span>
                                                        <button
                                                            onClick={(e) => handleShare(blog.slug, e)}
                                                            className="absolute top-3.5 right-3.5 h-8 w-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-[#0284c7] transition-colors shadow-md"
                                                            title="Copy Link"
                                                        >
                                                            {copiedSlug === blog.slug ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
                                                        </button>
                                                    </div>

                                                    {/* Card Content */}
                                                    <div className="p-6 space-y-3">
                                                        <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
                                                            <span className="flex items-center gap-1">
                                                                <Calendar className="h-3 w-3 text-[#0284c7]" />
                                                                {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                                                                    day: "numeric",
                                                                    month: "short",
                                                                    year: "numeric"
                                                                })}
                                                            </span>
                                                            <span>•</span>
                                                            <span className="flex items-center gap-1">
                                                                <Clock className="h-3 w-3 text-slate-400" />
                                                                {blog.readTime || "4 min read"}
                                                            </span>
                                                        </div>

                                                        <h4 className="text-lg font-black text-slate-900 group-hover:text-[#0284c7] transition-colors leading-snug line-clamp-2">
                                                            {blog.title}
                                                        </h4>

                                                        <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                                                            {blog.excerpt}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Card Footer */}
                                                <div className="px-6 py-4 border-t border-slate-100 bg-[#f8fafc]/50 flex items-center justify-between mt-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-7 w-7 rounded-full bg-sky-100 text-[#0284c7] font-black text-[10px] flex items-center justify-center border border-sky-300">
                                                            {blog.author ? blog.author[0] : "S"}
                                                        </div>
                                                        <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">
                                                            {blog.author}
                                                        </span>
                                                    </div>

                                                    <span className="text-xs font-black text-[#0284c7] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                        Read <ChevronRight className="h-3.5 w-3.5" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
