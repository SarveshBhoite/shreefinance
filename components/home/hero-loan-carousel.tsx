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
        id: "vehicle-loan",
        category: "Vehicle Loan",
        rate: "8.75%",
        image: "/banners/urban-vehicle-loan.jpg",
        alt: "Your Dream Car with Simpler Faster Friendlier Vehicle Loans",
        defaultAmount: 1500000,
        tenure: "7 Years"
    },
    {
        id: "home-loan",
        category: "Home Loan",
        rate: "8.35%",
        image: "/banners/urban-home-loan.jpg",
        alt: "Your Dream Home with Simpler Faster Friendlier Home Loans",
        defaultAmount: 5000000,
        tenure: "25 Years"
    },
    {
        id: "personal-loan",
        category: "Personal Loan",
        rate: "10.25%",
        image: "/banners/urban-personal-loan.jpg",
        alt: "Your Personal Loan with Simpler Faster Friendlier Instant Cash",
        defaultAmount: 1000000,
        tenure: "5 Years"
    },
    {
        id: "property-loan",
        category: "Loan Against Property",
        rate: "9.25%",
        image: "/banners/urban-property-loan.jpg",
        alt: "Your Property Loan with Simpler Faster Friendlier LAP Capital",
        defaultAmount: 7500000,
        tenure: "15 Years"
    }
];

interface HeroLoanCarouselProps {
    onSelectLoan: (loan: LoanSlideData) => void;
}

export function HeroLoanCarousel({ onSelectLoan }: HeroLoanCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto rotate every 4.5 seconds (pauses on hover)
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % LOAN_SLIDER_ITEMS.length);
        }, 4500);
        return () => clearInterval(timer);
    }, [isHovered]);

    const currentSlide = LOAN_SLIDER_ITEMS[currentIndex];

    return (
        <div 
            className="w-full flex flex-col items-center select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 1. Main Unified Banner Card (Single Seamless Graphic - Zero Image Seams) */}
            <div 
                onClick={() => onSelectLoan(currentSlide)}
                className="relative w-full aspect-[16/9] rounded-[1.5rem] sm:rounded-[1.75rem] md:rounded-[2rem] overflow-hidden shadow-2xl bg-[#ffcd00] cursor-pointer group transition-all duration-300 hover:scale-[1.01] hover:shadow-[#ffcd00]/20"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="relative w-full h-full"
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
                                    ? "w-2.5 h-2.5 bg-[#00c985] shadow-[0_0_8px_#00c985] scale-125"
                                    : "w-2 h-2 bg-slate-500/60 hover:bg-slate-400"
                            }`}
                        />
                    );
                })}
            </div>
        </div>
    );
}
