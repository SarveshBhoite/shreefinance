import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAdminFromToken } from "@/lib/auth";
import PartnerLead from "@/models/PartnerLead";

export async function GET(req: Request) {
    try {
        const admin = await getAdminFromToken();
        if (!admin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");
        const category = searchParams.get("category");
        const search = searchParams.get("search");

        const query: Record<string, unknown> = {};

        if (status && status !== "ALL") {
            query.leadStatus = status;
        }

        if (category && category !== "ALL") {
            query.category = category;
        }

        if (search && search.trim()) {
            const searchRegex = { $regex: search.trim(), $options: "i" };
            query.$or = [
                { customerName: searchRegex },
                { customerMobile: searchRegex },
                { partnerName: searchRegex },
                { partnerReferenceNo: searchRegex },
                { bankName: searchRegex },
                { referenceNo: searchRegex },
                { subProduct: searchRegex }
            ];
        }

        const leads = await PartnerLead.find(query).sort({ createdAt: -1 });

        // Overall Aggregate Metrics
        const allLeads = await PartnerLead.find({});
        const totalCount = allLeads.length;
        const inProcessCount = allLeads.filter(l => ["IN_PROCESS", "DOCS_SUBMITTED", "BANK_LOGIN", "SANCTIONED"].includes(l.leadStatus)).length;
        const disbursedCount = allLeads.filter(l => l.leadStatus === "DISBURSED").length;
        const totalFiledVolume = allLeads.reduce((sum, l) => sum + (l.applicationAmount || 0), 0);
        const totalDisbursedVolume = allLeads.filter(l => l.leadStatus === "DISBURSED").reduce((sum, l) => sum + (l.applicationAmount || 0), 0);
        const totalCommissions = allLeads.filter(l => l.leadStatus === "DISBURSED").reduce((sum, l) => sum + (l.commissionAmount || 0), 0);
        const pendingPayoutCommissions = allLeads
            .filter(l => l.leadStatus === "DISBURSED" && l.payoutStatus !== "PAID")
            .reduce((sum, l) => sum + (l.commissionAmount || 0), 0);

        return NextResponse.json({
            success: true,
            leads,
            metrics: {
                totalCount,
                inProcessCount,
                disbursedCount,
                totalFiledVolume,
                totalDisbursedVolume,
                totalCommissions,
                pendingPayoutCommissions
            }
        });
    } catch (error) {
        console.error("Admin fetch leads error:", error);
        return NextResponse.json({ error: "Failed to fetch submitted files" }, { status: 500 });
    }
}
