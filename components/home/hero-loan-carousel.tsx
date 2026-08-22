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

export function HeroLoanCarousel({ onSelectLoan }: HeroLoanCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Smooth auto-slide every 3.5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % LOAN_SLIDER_ITEMS.length);
        }, 3500);
        return () => clearInterval(timer);
    }, []);

    const currentSlide = LOAN_SLIDER_ITEMS[currentIndex];

    return (
        <div className="w-full flex flex-col items-center select-none">
            {/* 1. Main Unified Banner Card (Navy Blue & Crisp White Theme) */}
            <div 
                onClick={() => onSelectLoan(currentSlide)}
                className="relative w-full aspect-[16/9] rounded-[1.5rem] sm:rounded-[1.75rem] md:rounded-[2rem] overflow-hidden shadow-xl border border-slate-200/80 bg-white cursor-pointer group transition-all duration-300 hover:scale-[1.01] hover:shadow-sky-500/20"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
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
            </div>

            {/* 2. Pagination Dots (Centered below card: grey dots with active green dot matching reference) */}
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
                            className={`rounded-full transition-all duration-200 cursor-pointer ${
                                isActive
                                    ? "w-2.5 h-2.5 bg-[#0284c7] shadow-[0_0_8px_#0284c7] scale-125"
                                    : "w-2 h-2 bg-slate-500/60 hover:bg-slate-400"
                            }`}
                        />
                    );
                })}
            </div>
        </div>
    );
}
