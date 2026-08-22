import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAdminFromToken } from "@/lib/auth";
import SystemSettings from "@/models/SystemSettings";

// GET global commission rates
export async function GET() {
    try {
        await connectDB();
        let settings = await SystemSettings.findOne();
        if (!settings) {
            settings = await SystemSettings.create({
                loansCommissionRate: 2.0,
                cardsCommissionRate: 3.0,
                insuranceCommissionRate: 5.0,
                investmentsCommissionRate: 1.5,
                productRates: {
                    "Home Loan": 2.0,
                    "Personal Loan": 2.5,
                    "Business Loan": 2.5,
                    "Loan Against Property": 1.75,
                    "Car Loan": 1.5,
                    "Credit Card": 3.0,
                    "Business Card": 3.5,
                    "Health Insurance": 5.0,
                    "Life Insurance": 6.0,
                    "Vehicle Insurance": 4.0,
                    "Mutual Funds": 1.5,
                    "Stocks": 1.0,
                    "Fixed Deposits": 0.75
                }
            });
        }

        return NextResponse.json({
            success: true,
            settings: {
                loansCommissionRate: settings.loansCommissionRate,
                cardsCommissionRate: settings.cardsCommissionRate,
                insuranceCommissionRate: settings.insuranceCommissionRate,
                investmentsCommissionRate: settings.investmentsCommissionRate,
                productRates: settings.productRates,
                updatedAt: settings.updatedAt
            }
        });
    } catch (error) {
        console.error("Fetch commission rates error:", error);
        return NextResponse.json({ error: "Failed to fetch commission rates" }, { status: 500 });
    }
}

// UPDATE commission rates (Admin only)
export async function PUT(req: Request) {
    try {
        const admin = await getAdminFromToken();
        if (!admin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const body = await req.json();
        const {
            loansCommissionRate,
            cardsCommissionRate,
            insuranceCommissionRate,
            investmentsCommissionRate,
            productRates
        } = body;

        let settings = await SystemSettings.findOne();
        if (!settings) {
            settings = new SystemSettings();
        }

        if (loansCommissionRate !== undefined) settings.loansCommissionRate = Number(loansCommissionRate);
        if (cardsCommissionRate !== undefined) settings.cardsCommissionRate = Number(cardsCommissionRate);
        if (insuranceCommissionRate !== undefined) settings.insuranceCommissionRate = Number(insuranceCommissionRate);
        if (investmentsCommissionRate !== undefined) settings.investmentsCommissionRate = Number(investmentsCommissionRate);
        if (productRates !== undefined) settings.productRates = productRates;
        settings.updatedBy = admin.username || "admin";

        await settings.save();

        return NextResponse.json({
            success: true,
            message: "Commission rates updated successfully across all partner dashboards!",
            settings: {
                loansCommissionRate: settings.loansCommissionRate,
                cardsCommissionRate: settings.cardsCommissionRate,
                insuranceCommissionRate: settings.insuranceCommissionRate,
                investmentsCommissionRate: settings.investmentsCommissionRate,
                productRates: settings.productRates,
                updatedAt: settings.updatedAt
            }
        });
    } catch (error) {
        console.error("Update commission rates error:", error);
        return NextResponse.json({ error: "Failed to update commission rates" }, { status: 500 });
    }
}
