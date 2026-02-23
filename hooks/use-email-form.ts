"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

interface EmailFormProps {
    serviceId?: string;
    templateId?: string;
    publicKey?: string;
}

export function useEmailForm({
    serviceId = "default_service", // Replace with env var in production
    templateId = "template_id",   // Replace with env var in production
    publicKey = "public_key"      // Replace with env var in production
}: EmailFormProps = {}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendEmail = async (data: Record<string, any>) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Simulation mode if keys are default (to prevent crashes during demo)
            if (serviceId === "default_service") {
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
                console.log("EmailJS Simulation: Form submitted", data);
                setIsSuccess(true);
                return;
            }

            await emailjs.send(serviceId, templateId, data, publicKey);
            setIsSuccess(true);
        } catch (err: any) {
            console.error("EmailJS Error:", err);
            setError(err.text || "Failed to send application. Please try again.");
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
