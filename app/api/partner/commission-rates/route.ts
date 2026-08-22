import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SystemSettings from "@/models/SystemSettings";

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
            rates: {
                loans: settings.loansCommissionRate || 2.0,
                cards: settings.cardsCommissionRate || 3.0,
                insurance: settings.insuranceCommissionRate || 5.0,
                investments: settings.investmentsCommissionRate || 1.5,
                productRates: settings.productRates || {}
            }
        });
    } catch (error) {
        console.error("Partner get rates error:", error);
        return NextResponse.json({
            success: true,
            rates: {
                loans: 2.0,
                cards: 3.0,
                insurance: 5.0,
                investments: 1.5,
                productRates: {}
            }
        });
    }
}
