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

interface DynamicHeroWrapperProps {
    page: string;
    children: React.ReactNode;
}

/**
 * Wraps any page's hero section. If banners exist for this page,
 * shows a full-width fade-in slider. Otherwise, renders the original hero children.
 */
export function DynamicHeroWrapper({ page, children }: DynamicHeroWrapperProps) {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch(`/api/banners?page=${encodeURIComponent(page)}`)
            .then((res) => res.json())
            .then((data) => {
                setBanners(data.banners || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [page]);

    // Auto-advance every 4 seconds
    useEffect(() => {
        if (banners.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [banners.length]);

    const goTo = useCallback((index: number) => setCurrentIndex(index), []);

    // Still loading — show original hero to avoid flash
    if (loading) return <>{children}</>;

    // No banners for this page — show original hero
    if (banners.length === 0) return <>{children}</>;

    // Banners exist — show full-width slider
    const current = banners[currentIndex];

    return (
        <section className="relative w-full overflow-hidden bg-slate-950">
            {/* Full-width banner slider */}
            <div className="relative w-full aspect-[21/9] md:aspect-[3/1] lg:aspect-[3.5/1]">
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
                                    sizes="100vw"
                                    priority
                                />
                            </a>
                        ) : (
                            <Image
                                src={current.imageUrl}
                                alt={current.title}
                                fill
                                className="object-cover"
                                sizes="100vw"
                                priority
                            />
                        )}
                        {/* Title overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 md:p-8">
                            <div className="container mx-auto px-4">
                                <p className="text-white font-bold text-lg md:text-2xl drop-shadow-lg">{current.title}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dot indicators */}
            {banners.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? "w-8 bg-white"
                                    : "w-2.5 bg-white/50 hover:bg-white/70"
                                }`}
                            onClick={() => goTo(index)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
