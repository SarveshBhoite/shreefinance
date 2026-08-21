import { NextResponse } from "next/server";
import { analyzeEmail, sendEmailOTP } from "@/lib/email-otp-service";

// In-memory OTP storage: key (email or phone) -> { otp, expiresAt }
// Global store across hot reloads in development
declare global {
    var _otpStore: Map<string, { otp: string; expiresAt: number }> | undefined;
}

export const otpStore = globalThis._otpStore || new Map<string, { otp: string; expiresAt: number }>();
if (process.env.NODE_ENV !== "production") {
    globalThis._otpStore = otpStore;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name, phone } = body;

        // Support Mail OTP (Primary)
        const targetEmail = (email || "").trim().toLowerCase();

        if (targetEmail) {
            // Perform Email Analysis
            const analysis = analyzeEmail(targetEmail);
            if (!analysis.isValid) {
                return NextResponse.json(
                    { success: false, message: analysis.reason || "Invalid email address format." },
                    { status: 400 }
                );
            }

            // Generate dynamic 6-digit random Mail OTP
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
            const expiresAt = Date.now() + 5 * 60 * 1000; // Valid for 5 minutes

            // Save in OTP store keyed by email
            otpStore.set(targetEmail, { otp: generatedOtp, expiresAt });

            // Dispatch Real Mail OTP
            const result = await sendEmailOTP({ email: targetEmail, name, otp: generatedOtp });

            return NextResponse.json({
                success: true,
                message: `OTP verification code sent to ${targetEmail}`,
                otp: generatedOtp,
                email: targetEmail
            });
        }

        // Fallback for phone number
        const cleanPhone = (phone || "").replace(/\D/g, "").slice(-10);
        if (!cleanPhone || cleanPhone.length !== 10) {
            return NextResponse.json(
                { success: false, message: "Please enter a valid email address to receive Mail OTP." },
                { status: 400 }
            );
        }

        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 5 * 60 * 1000;
        otpStore.set(cleanPhone, { otp: generatedOtp, expiresAt });

        return NextResponse.json({
            success: true,
            message: `OTP sent to ${cleanPhone}`,
            otp: generatedOtp
        });
    } catch (error) {
        console.error("Error sending OTP:", error);
        return NextResponse.json(
            { success: false, message: "Failed to send OTP. Please try again." },
            { status: 500 }
        );
    }
}
