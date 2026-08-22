import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import PartnerApplication from "@/models/PartnerApplication";
import { getMailTransporter, getMailConfig } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { identifier } = await req.json(); // identifier can be email or referenceNo or mobile

        if (!identifier || typeof identifier !== "string") {
            return NextResponse.json({ error: "Email or Application Reference # is required" }, { status: 400 });
        }

        const trimmed = identifier.trim().toLowerCase();

        const partner = await PartnerApplication.findOne({
            $or: [
                { email: trimmed },
                { referenceNo: identifier.trim().toUpperCase() },
                { mobile: identifier.trim() }
            ]
        });

        if (!partner) {
            return NextResponse.json(
                { error: "No partner account found with this email or reference number." },
                { status: 404 }
            );
        }

        if (partner.status !== "APPROVED" || !partner.isActive) {
            return NextResponse.json(
                {
                    error: `Your application status is ${partner.status}. Access is granted only after Admin Approval.`,
                    status: partner.status
                },
                { status: 403 }
            );
        }

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        partner.loginOtp = otp;
        partner.loginOtpExpires = otpExpires;
        await partner.save();

        // Send OTP via Email
        try {
            const { senderName, senderEmail } = getMailConfig();
            const transporter = getMailTransporter();

            await transporter.sendMail({
                from: `"${senderName} Partner Security" <${senderEmail}>`,
                to: partner.email,
                subject: `🔐 Your Shree Finance Partner Portal Login OTP: ${otp}`,
                html: `
                <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background: #ffffff;">
                    <div style="background: #0f172a; padding: 16px; border-radius: 8px; text-align: center;">
                        <h2 style="color: #0284c7; margin: 0;">SHREE FINANCE PARTNER PORTAL</h2>
                    </div>
                    <div style="padding: 20px 0; text-align: center;">
                        <p style="font-size: 14px; color: #475569;">Hello <strong>${partner.name}</strong>,</p>
                        <p style="font-size: 13px; color: #475569;">Use the one-time passcode below to log in to your Channel Partner Dashboard:</p>
                        <div style="background: #f0fdf4; border: 2px dashed #0284c7; padding: 14px; border-radius: 8px; margin: 20px auto; display: inline-block;">
                            <span style="font-size: 28px; font-weight: 900; letter-spacing: 6px; color: #0f172a;">${otp}</span>
                        </div>
                        <p style="font-size: 11px; color: #94a3b8; margin: 0;">This OTP is valid for 10 minutes. Do not share this with anyone.</p>
                    </div>
                    <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; text-align: center; font-size: 11px; color: #64748b;">
                        Shree Finance Advisory Services Pvt. Ltd. • Ref: #${partner.referenceNo}
                    </div>
                </div>
                `
            });
        } catch (mailErr) {
            console.error("[OTP MAIL ERROR]", mailErr);
        }

        return NextResponse.json({
            success: true,
            message: `Login OTP sent to ${partner.email}`,
            email: partner.email,
            referenceNo: partner.referenceNo
        });
    } catch (error) {
        console.error("Partner send OTP error:", error);
        return NextResponse.json({ error: "Failed to send login OTP" }, { status: 500 });
    }
}
