"use client";

import { useState } from "react";

export function useEmailForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendEmail = async (data: Record<string, any>) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch("/api/application/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            if (res.ok && result.success) {
                setIsSuccess(true);
            } else {
                setError(result.message || "Failed to submit form.");
            }
        } catch (err: any) {
            console.error("Form submission error:", err);
            setError("Failed to send application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setIsSuccess(false);
        setError(null);
    };

    return { sendEmail, isSubmitting, isSuccess, error, resetForm };
}
