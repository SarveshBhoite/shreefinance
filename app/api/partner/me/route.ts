import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getPartnerFromToken } from "@/lib/auth";
import PartnerApplication from "@/models/PartnerApplication";

export async function GET() {
    try {
        const partnerPayload = await getPartnerFromToken();
        if (!partnerPayload) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const partner = await PartnerApplication.findById(partnerPayload.partnerId);
        if (!partner || partner.status !== "APPROVED" || !partner.isActive) {
            return NextResponse.json({ error: "Partner account is not approved or active" }, { status: 403 });
        }

        return NextResponse.json({
            success: true,
            partner: {
                id: partner._id,
                name: partner.name,
                email: partner.email,
                mobile: partner.mobile,
                city: partner.city,
                profession: partner.profession,
                companyName: partner.companyName,
                location: partner.location,
                fullAddress: partner.fullAddress,
                experienceYears: partner.experienceYears,
                bankAccountType: partner.bankAccountType,
                referenceNo: partner.referenceNo,
                status: partner.status,
                isActive: partner.isActive,
                createdAt: partner.createdAt
            }
        });
    } catch (error) {
        console.error("Partner me error:", error);
        return NextResponse.json({ error: "Failed to get partner details" }, { status: 500 });
    }
}
