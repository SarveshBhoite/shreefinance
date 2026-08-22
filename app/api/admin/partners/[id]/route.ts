import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAdminFromToken } from "@/lib/auth";
import PartnerApplication from "@/models/PartnerApplication";
import { sendPartnerApprovalEmail, sendPartnerRejectionEmail } from "@/lib/mail";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = await getAdminFromToken();
        if (!admin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        const { action, rejectionReason } = body;

        if (!action || !["APPROVE", "REJECT"].includes(action)) {
            return NextResponse.json(
                { error: "Invalid action. Must be 'APPROVE' or 'REJECT'" },
                { status: 400 }
            );
        }

        await connectDB();

        const application = await PartnerApplication.findById(id);
        if (!application) {
            return NextResponse.json({ error: "Partner application not found" }, { status: 404 });
        }

        const isApproved = action === "APPROVE";
        const newStatus = isApproved ? "APPROVED" : "REJECTED";

        let generatedPassword = "";
        if (isApproved) {
            // Generate a secure, memorable temporary password if not already set
            const randomDigits = Math.floor(100000 + Math.random() * 900000);
            generatedPassword = `Shree@${randomDigits}`;
            const bcrypt = (await import("bcryptjs")).default;
            const salt = await bcrypt.genSalt(10);
            application.passwordHash = await bcrypt.hash(generatedPassword, salt);
            application.initialPasswordSent = true;
        }

        application.status = newStatus;
        application.isActive = isApproved;
        application.reviewedAt = new Date();
        application.reviewedBy = admin.username || "admin";
        if (!isApproved && rejectionReason) {
            application.rejectionReason = rejectionReason;
        }

        await application.save();

        // Send Email notification to user
        try {
            if (isApproved) {
                await sendPartnerApprovalEmail({
                    name: application.name,
                    email: application.email,
                    companyName: application.companyName,
                    referenceNo: application.referenceNo,
                    password: generatedPassword
                });
                console.log(`[APPROVAL EMAIL SENT] Sent approval confirmation with password to ${application.email}`);
            } else {
                await sendPartnerRejectionEmail(
                    {
                        name: application.name,
                        email: application.email,
                        referenceNo: application.referenceNo
                    },
                    rejectionReason
                );
                console.log(`[REJECTION EMAIL SENT] Sent rejection notice to ${application.email}`);
            }
        } catch (mailErr) {
            console.error("[EMAIL ERROR] Could not dispatch user notification:", mailErr);
        }

        return NextResponse.json({
            success: true,
            message: isApproved
                ? "Partner application approved and confirmation email sent!"
                : "Partner application rejected and notification sent.",
            partner: application
        });
    } catch (error) {
        console.error("Error updating partner application:", error);
        return NextResponse.json(
            { error: "Failed to update partner application" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = await getAdminFromToken();
        if (!admin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await connectDB();

        const deleted = await PartnerApplication.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ error: "Partner application not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Partner application deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting partner application:", error);
        return NextResponse.json(
            { error: "Failed to delete partner application" },
            { status: 500 }
        );
    }
}
