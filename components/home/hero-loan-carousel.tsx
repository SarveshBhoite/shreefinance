"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface LoanSlideData {
    id: string;
    category: string;
    rate: string;
    image: string;
    alt: string;
    defaultAmount: number;
    tenure: string;
}

export const LOAN_SLIDER_ITEMS: LoanSlideData[] = [
    {
        id: "home-loan",
        category: "Home Loan",
        rate: "8.35%",
        image: "/banners/theme-home-loan.jpg",
        alt: "Dream Home Financing starting 8.35% p.a. with 40+ Partner Banks",
        defaultAmount: 5000000,
        tenure: "25 Years"
    },
    {
        id: "personal-loan",
        category: "Personal Loan",
        rate: "10.25%",
        image: "/banners/theme-personal-loan.jpg",
        alt: "Instant Cash Loan In 24 Hours Up to ₹40 Lakhs with Nil Foreclosure",
        defaultAmount: 1000000,
        tenure: "5 Years"
    },
    {
        id: "business-loan",
        category: "Business Loan",
        rate: "13.99%",
        image: "/banners/theme-business-loan.jpg",
        alt: "Scale Your Business Growth with Collateral Free Loans up to ₹75 Lakhs",
        defaultAmount: 3500000,
        tenure: "5 Years"
    },
    {
        id: "partner-program",
        category: "Partner Program",
        rate: "Up to 2.5%",
        image: "/banners/theme-partner-program.jpg",
        alt: "Become a ShreeFinance Partner and Earn Up to 2.5% Commission Across 40+ Banks",
        defaultAmount: 10000000,
        tenure: "DSA Desk"
    }
];

interface HeroLoanCarouselProps {
    onSelectLoan: (loan: LoanSlideData) => void;
}

import { ChevronLeft, ChevronRight } from "lucide-react";

export function HeroLoanCarousel({ onSelectLoan }: HeroLoanCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Smooth auto-slide every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % LOAN_SLIDER_ITEMS.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % LOAN_SLIDER_ITEMS.length);
    };

    const prevSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + LOAN_SLIDER_ITEMS.length) % LOAN_SLIDER_ITEMS.length);
    };

    const currentSlide = LOAN_SLIDER_ITEMS[currentIndex];

    return (
        <div className="w-full relative flex flex-col items-center select-none group">
            {/* 1. Main Unified Banner Card */}
            <div 
                onClick={() => onSelectLoan(currentSlide)}
                className="relative w-full aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl border border-slate-200 bg-white cursor-pointer transition-all duration-300"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="relative w-full h-full bg-white"
                    >
                        <Image
                            src={currentSlide.image}
                            alt={currentSlide.alt}
                            fill
                            priority
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Left Arrow Button */}
                <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-md"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Right Arrow Button */}
                <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-md"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>

            {/* 2. Pagination Dots & Category Pills */}
            <div className="flex items-center justify-center gap-2 mt-4">
                {LOAN_SLIDER_ITEMS.map((item, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex(idx);
                            }}
                            aria-label={`Go to slide ${idx + 1} - ${item.category}`}
                            className={`transition-all duration-200 cursor-pointer rounded-full ${
                                isActive
                                    ? "w-7 h-2 bg-[#0284c7] shadow-xs"
                                    : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                            }`}
                        />
                    );
                })}
            </div>
        </div>
    );
}
