"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Banner {
    _id: string;
    imageUrl: string;
    title: string;
    link?: string;
}

export function HeroBannerCarousel() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch("/api/banners?page=home")
            .then((res) => res.json())
            .then((data) => {
                setBanners(data.banners || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Auto-advance every 4 seconds
    useEffect(() => {
        if (banners.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [banners.length]);

    const goTo = useCallback(
        (index: number) => setCurrentIndex(index),
        []
    );

    if (loading) {
        return (
            <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/5 to-primary/20 dark:from-sky-900/40 dark:to-sky-800/20 animate-pulse flex items-center justify-center border border-primary/10">
                <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (banners.length === 0) {
        return (
            <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary via-sky-600 to-sky-900 flex items-center justify-center text-white p-8 text-center border border-primary/20 shadow-xl">
                <div className="space-y-4">
                    <div className="text-6xl text-white/90 animate-bounce">🌊</div>
                    <h3 className="text-2xl font-bold">Premium Offers Coming Soon!</h3>
                    <p className="text-sky-100 text-sm italic">Stay tuned for exclusive financial deals and festive offers.</p>
                </div>
            </div>
        );
    }

    const current = banners[currentIndex];

    return (
        <div className="w-full relative">
            {/* Image container */}
            <div className="relative aspect-[4/3] w-full rounded-2xl shadow-2xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        {current.link ? (
                            <a href={current.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                                <Image
                                    src={current.imageUrl}
                                    alt={current.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </a>
                        ) : (
                            <Image
                                src={current.imageUrl}
                                alt={current.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        )}
                        {/* Title overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white font-semibold text-sm md:text-base">{current.title}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dot indicators */}
            {banners.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                ? "w-8 bg-blue-600"
                                : "w-2.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400"
                                }`}
                            onClick={() => goTo(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
