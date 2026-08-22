"use client";

import { useState } from "react";

export function useEmailForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [referenceNo, setReferenceNo] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const sendEmail = async (data: Record<string, unknown>) => {
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
                setResponseMessage(result.message || "Application submitted successfully!");
                setReferenceNo(result.referenceNo || null);
            } else {
                setError(result.message || "Failed to submit form.");
            }
        } catch (err: unknown) {
            console.error("Form submission error:", err);
            setError("Failed to send application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setIsSuccess(false);
        setResponseMessage(null);
        setReferenceNo(null);
        setError(null);
    };

    return { sendEmail, isSubmitting, isSuccess, responseMessage, referenceNo, error, resetForm };
}
