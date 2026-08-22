import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAdminFromToken } from "@/lib/auth";
import PartnerApplication, { IPartnerApplication } from "@/models/PartnerApplication";

export async function GET(req: Request) {
    try {
        const admin = await getAdminFromToken();
        if (!admin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");
        const search = searchParams.get("search");

        const query: Record<string, unknown> = {};

        if (status && status !== "ALL") {
            query.status = status.toUpperCase();
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { mobile: { $regex: search, $options: "i" } },
                { companyName: { $regex: search, $options: "i" } },
                { referenceNo: { $regex: search, $options: "i" } },
                { city: { $regex: search, $options: "i" } }
            ];
        }

        const partners = await PartnerApplication.find(query).sort({ createdAt: -1 });

        // Calculate summary counts for admin metrics
        const total = await PartnerApplication.countDocuments();
        const pending = await PartnerApplication.countDocuments({ status: "PENDING" });
        const approved = await PartnerApplication.countDocuments({ status: "APPROVED" });
        const rejected = await PartnerApplication.countDocuments({ status: "REJECTED" });

        return NextResponse.json({
            success: true,
            partners,
            counts: {
                total,
                pending,
                approved,
                rejected
            }
        });
    } catch (error) {
        console.error("Error fetching partner applications:", error);
        return NextResponse.json(
            { error: "Failed to fetch partner applications" },
            { status: 500 }
        );
    }
}
