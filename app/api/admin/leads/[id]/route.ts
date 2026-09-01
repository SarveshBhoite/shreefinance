import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAdminFromToken } from "@/lib/auth";
import PartnerLead from "@/models/PartnerLead";

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
        const { leadStatus, payoutStatus, commissionRate, applicationAmount, disbursedAmount, leadNotes } = body;

        await connectDB();
        const lead = await PartnerLead.findById(id);
        if (!lead) {
            return NextResponse.json({ error: "File record not found" }, { status: 404 });
        }

        if (leadStatus) {
            lead.leadStatus = leadStatus;
            if (leadStatus === "DISBURSED" && !lead.disbursedAt) {
                lead.disbursedAt = new Date();
            }
        }

        if (payoutStatus) {
            lead.payoutStatus = payoutStatus;
        }

        if (applicationAmount !== undefined && !isNaN(Number(applicationAmount))) {
            lead.applicationAmount = Number(applicationAmount);
        }

        if (disbursedAmount !== undefined && !isNaN(Number(disbursedAmount))) {
            lead.disbursedAmount = Number(disbursedAmount);
        }

        if (commissionRate !== undefined && !isNaN(Number(commissionRate))) {
            lead.commissionRate = Number(commissionRate);
        }

        // Recalculate commission amount
        const baseAmount = lead.disbursedAmount || lead.applicationAmount;
        lead.commissionAmount = Number((baseAmount * (lead.commissionRate / 100)).toFixed(2));

        if (leadNotes !== undefined) {
            lead.leadNotes = leadNotes;
        }

        await lead.save();

        return NextResponse.json({
            success: true,
            message: "Partner file status and commission updated successfully",
            lead
        });
    } catch (error) {
        console.error("Admin update lead error:", error);
        return NextResponse.json({ error: "Failed to update partner file" }, { status: 500 });
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

        const deleted = await PartnerLead.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ error: "File record not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Partner file deleted successfully"
        });
    } catch (error) {
        console.error("Admin delete lead error:", error);
        return NextResponse.json({ error: "Failed to delete partner file" }, { status: 500 });
    }
}
