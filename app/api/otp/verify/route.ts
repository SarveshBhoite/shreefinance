import { NextResponse } from "next/server";
import { otpStore } from "../send/route";

export async function POST(req: Request) {
    try {
        const { email, phone, otp } = await req.json();
        const cleanEmail = (email || "").trim().toLowerCase();
        const cleanPhone = (phone || "").replace(/\D/g, "").slice(-10);
        const cleanOtp = (otp || "").trim();

        const lookupKey = cleanEmail || cleanPhone;

        if (!lookupKey) {
            return NextResponse.json(
                { success: false, message: "Please enter your email address." },
                { status: 400 }
            );
        }

        if (!cleanOtp || cleanOtp.length < 4) {
            return NextResponse.json(
                { success: false, message: "Please enter the 6-digit OTP code received in your email inbox." },
                { status: 400 }
            );
        }

        const storedRecord = otpStore.get(lookupKey);

        if (!storedRecord) {
            return NextResponse.json(
                { success: false, message: "OTP expired or not requested for this email. Please click Send OTP." },
                { status: 400 }
            );
        }

        if (Date.now() > storedRecord.expiresAt) {
            otpStore.delete(lookupKey);
            return NextResponse.json(
                { success: false, message: "Mail OTP code has expired. Please click Resend OTP." },
                { status: 400 }
            );
        }

        if (storedRecord.otp !== cleanOtp) {
            return NextResponse.json(
                { success: false, message: "Incorrect OTP code entered. Please check your email inbox." },
                { status: 400 }
            );
        }

        // Successfully verified! Delete spent OTP.
        otpStore.delete(lookupKey);

        return NextResponse.json({
            success: true,
            message: "Email address verified successfully!"
        });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json(
            { success: false, message: "Failed to verify OTP. Please try again." },
            { status: 500 }
        );
    }
}
