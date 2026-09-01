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
        const partnerId = searchParams.get("partnerId");
        const partnerRef = searchParams.get("partnerRef");
        const district = searchParams.get("district") || searchParams.get("city");

        const query: Record<string, unknown> = {};

        if (partnerId && partnerId !== "ALL") {
            query.partnerId = partnerId;
        } else if (partnerRef && partnerRef !== "ALL") {
            query.partnerReferenceNo = partnerRef;
        }

        if (status && status !== "ALL") {
            query.leadStatus = status;
        }

        if (category && category !== "ALL") {
            query.category = category;
        }

        if (district && district !== "ALL") {
            query.customerCity = { $regex: new RegExp(`^${district.trim()}$`, "i") };
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

        const rawQueryLeads = await PartnerLead.find(query).sort({ createdAt: -1 });
        const leads = rawQueryLeads.map(lead => {
            const l = lead.toObject ? lead.toObject() : lead;
            const exactCommission = Number(((Number(l.applicationAmount) || 0) * ((Number(l.commissionRate) || 2.0) / 100)).toFixed(2));
            return { ...l, commissionAmount: exactCommission };
        });

        // Overall Global Aggregate Metrics (All Partners)
        const rawAllLeads = await PartnerLead.find({});
        const allLeads = rawAllLeads.map(lead => {
            const l = lead.toObject ? lead.toObject() : lead;
            const exactCommission = Number(((Number(l.applicationAmount) || 0) * ((Number(l.commissionRate) || 2.0) / 100)).toFixed(2));
            return { ...l, commissionAmount: exactCommission };
        });

        const globalTotalCount = allLeads.length;
        const globalInProcessCount = allLeads.filter(l => ["IN_PROCESS", "DOCS_SUBMITTED", "BANK_LOGIN", "SANCTIONED"].includes(l.leadStatus)).length;
        const globalDisbursedCount = allLeads.filter(l => l.leadStatus === "DISBURSED").length;
        const globalTotalFiledVolume = allLeads.reduce((sum, l) => sum + (l.applicationAmount || 0), 0);
        const globalTotalDisbursedVolume = allLeads.filter(l => l.leadStatus === "DISBURSED").reduce((sum, l) => sum + (l.applicationAmount || 0), 0);
        const globalTotalCommissions = Number(allLeads.filter(l => l.leadStatus === "DISBURSED").reduce((sum, l) => sum + (l.commissionAmount || 0), 0).toFixed(2));
        const globalPendingPayoutCommissions = Number(allLeads
            .filter(l => l.leadStatus === "DISBURSED" && l.payoutStatus !== "PAID")
            .reduce((sum, l) => sum + (l.commissionAmount || 0), 0).toFixed(2));

        // Filtered / Selected Partner Specific Metrics
        const targetLeads = (partnerId && partnerId !== "ALL") || (partnerRef && partnerRef !== "ALL")
            ? allLeads.filter(l => (partnerId && partnerId !== "ALL" ? String(l.partnerId) === String(partnerId) || l.partnerReferenceNo === partnerId : l.partnerReferenceNo === partnerRef))
            : allLeads;

        const totalCount = targetLeads.length;
        const inProcessCount = targetLeads.filter(l => ["IN_PROCESS", "DOCS_SUBMITTED", "BANK_LOGIN", "SANCTIONED"].includes(l.leadStatus)).length;
        const disbursedCount = targetLeads.filter(l => l.leadStatus === "DISBURSED").length;
        const totalFiledVolume = targetLeads.reduce((sum, l) => sum + (l.applicationAmount || 0), 0);
        const totalDisbursedVolume = targetLeads.filter(l => l.leadStatus === "DISBURSED").reduce((sum, l) => sum + (l.applicationAmount || 0), 0);
        const totalCommissions = Number(targetLeads.filter(l => l.leadStatus === "DISBURSED").reduce((sum, l) => sum + (l.commissionAmount || 0), 0).toFixed(2));
        const pendingPayoutCommissions = Number(targetLeads
            .filter(l => l.leadStatus === "DISBURSED" && l.payoutStatus !== "PAID")
            .reduce((sum, l) => sum + (l.commissionAmount || 0), 0).toFixed(2));

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
                pendingPayoutCommissions,
                globalTotalCount,
                globalInProcessCount,
                globalDisbursedCount,
                globalTotalFiledVolume,
                globalTotalDisbursedVolume,
                globalTotalCommissions,
                globalPendingPayoutCommissions
            }
        });
    } catch (error) {
        console.error("Admin fetch leads error:", error);
        return NextResponse.json({ error: "Failed to fetch submitted files" }, { status: 500 });
    }
}
