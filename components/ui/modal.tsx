"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export function Modal({ isOpen, onClose, children, className, title }: ModalProps) {
    // Prevent scrolling when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md transition-opacity"
                    />

                    {/* Modal Content */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={cn(
                                "relative w-full max-w-lg overflow-hidden rounded-3xl bg-[#24272c] text-white border border-slate-800 shadow-2xl px-2",
                                className
                            )}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 pb-2">
                                {title && <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>}
                                <button
                                    onClick={onClose}
                                    className="rounded-full p-2 bg-slate-800 hover:bg-slate-700 transition-colors"
                                >
                                    <X className="h-4 w-4 text-slate-400" />
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 pt-2">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
