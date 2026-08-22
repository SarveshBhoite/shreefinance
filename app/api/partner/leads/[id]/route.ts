import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getPartnerFromToken } from "@/lib/auth";
import PartnerLead from "@/models/PartnerLead";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const partnerPayload = await getPartnerFromToken();
        if (!partnerPayload) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        const { leadStatus, leadNotes, bankReferenceNo, applicationAmount } = body;

        await connectDB();

        const lead = await PartnerLead.findOne({
            _id: id,
            partnerId: partnerPayload.partnerId
        });

        if (!lead) {
            return NextResponse.json({ error: "File record not found" }, { status: 404 });
        }

        if (leadStatus) {
            lead.leadStatus = leadStatus;
            if (leadStatus === "DISBURSED") {
                lead.disbursedAt = new Date();
            }
        }

        if (applicationAmount !== undefined && !isNaN(Number(applicationAmount))) {
            lead.applicationAmount = Number(applicationAmount);
            lead.commissionAmount = Math.round(lead.applicationAmount * (lead.commissionRate / 100));
        }

        if (leadNotes !== undefined) lead.leadNotes = leadNotes;
        if (bankReferenceNo !== undefined) lead.bankReferenceNo = bankReferenceNo;

        await lead.save();

        return NextResponse.json({
            success: true,
            message: `File status updated to ${lead.leadStatus}`,
            lead
        });
    } catch (error) {
        console.error("Partner update lead status error:", error);
        return NextResponse.json({ error: "Failed to update file status" }, { status: 500 });
    }
}
