import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getPartnerFromToken } from "@/lib/auth";
import PartnerApplication from "@/models/PartnerApplication";
import PartnerLead from "@/models/PartnerLead";
import SystemSettings from "@/models/SystemSettings";
import { getMailTransporter, getMailConfig } from "@/lib/mail";

// GET all leads submitted by this partner
export async function GET() {
    try {
        const partnerPayload = await getPartnerFromToken();
        if (!partnerPayload) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const leads = await PartnerLead.find({ partnerId: partnerPayload.partnerId }).sort({ createdAt: -1 });

        // Calculate partner metrics
        const totalLeads = leads.length;
        const totalDisbursed = leads
            .filter(l => l.leadStatus === "DISBURSED")
            .reduce((sum, l) => sum + (l.applicationAmount || 0), 0);
        const totalCommissionsEarned = leads
            .filter(l => l.leadStatus === "DISBURSED")
            .reduce((sum, l) => sum + (l.commissionAmount || 0), 0);
        const inProcessCount = leads
            .filter(l => ["IN_PROCESS", "DOCS_SUBMITTED", "BANK_LOGIN", "SANCTIONED"].includes(l.leadStatus)).length;

        return NextResponse.json({
            success: true,
            leads,
            metrics: {
                totalLeads,
                totalDisbursed,
                totalCommissionsEarned,
                inProcessCount
            }
        });
    } catch (error) {
        console.error("Fetch partner leads error:", error);
        return NextResponse.json({ error: "Failed to fetch partner leads" }, { status: 500 });
    }
}

// POST new file submission by partner (Loans, Cards, Insurance, Investments)
export async function POST(req: Request) {
    try {
        const partnerPayload = await getPartnerFromToken();
        if (!partnerPayload) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const partner = await PartnerApplication.findById(partnerPayload.partnerId);
        if (!partner || partner.status !== "APPROVED" || !partner.isActive) {
            return NextResponse.json({ error: "Partner account is not approved or inactive" }, { status: 403 });
        }

        const body = await req.json();
        const {
            category = "loans",
            subProduct = "Home Loan",
            customerName,
            customerMobile,
            customerEmail,
            customerCity,
            bankName,
            applicationAmount,
            bankReferenceNo,
            leadNotes
        } = body;

        if (!customerName || !customerMobile || !applicationAmount || !customerCity || !bankName) {
            return NextResponse.json(
                { error: "Customer name, mobile, filed application amount, city, and bank name are required." },
                { status: 400 }
            );
        }

        // Fetch current active commission rates from SystemSettings
        let settings = await SystemSettings.findOne();
        if (!settings) {
            settings = await SystemSettings.create({});
        }

        let applicableRate = 2.0;
        if (category === "loans") applicableRate = settings.loansCommissionRate || 2.0;
        else if (category === "cards") applicableRate = settings.cardsCommissionRate || 3.0;
        else if (category === "insurance") applicableRate = settings.insuranceCommissionRate || 5.0;
        else if (category === "investments") applicableRate = settings.investmentsCommissionRate || 1.5;

        // Check if there is a specific subproduct rate override
        if (settings.productRates && settings.productRates[subProduct]) {
            applicableRate = settings.productRates[subProduct];
        }

        const amountNum = Number(applicationAmount);
        const calculatedCommission = Math.round(amountNum * (applicableRate / 100));
        const refNo = `SHREE-FIL-${Math.floor(100000 + Math.random() * 900000)}`;

        const newLead = await PartnerLead.create({
            partnerId: partner._id,
            partnerReferenceNo: partner.referenceNo,
            partnerName: partner.name,
            partnerEmail: partner.email,
            category,
            subProduct,
            customerName: customerName.trim(),
            customerMobile: customerMobile.trim(),
            customerEmail: customerEmail ? customerEmail.trim().toLowerCase() : undefined,
            customerCity: customerCity.trim(),
            bankName: bankName.trim(),
            applicationAmount: amountNum,
            bankReferenceNo: bankReferenceNo ? bankReferenceNo.trim() : undefined,
            commissionRate: applicableRate,
            commissionAmount: calculatedCommission,
            leadStatus: "IN_PROCESS",
            payoutStatus: "PENDING",
            leadNotes: leadNotes ? leadNotes.trim() : undefined,
            referenceNo: refNo
        });

        // Email Alert to Admin Desk
        try {
            const { adminEmail, senderName, senderEmail } = getMailConfig();
            const transporter = getMailTransporter();

            await transporter.sendMail({
                from: `"${senderName} Partner Desk" <${senderEmail}>`,
                to: adminEmail,
                subject: `💼 [Partner File Filed] ${partner.name} submitted ${subProduct} to ${bankName} (₹${amountNum.toLocaleString("en-IN")})`,
                html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #ffffff;">
                    <div style="background: #0f172a; padding: 20px 24px; border-bottom: 4px solid #0284c7;">
                        <h2 style="color: #0284c7; margin: 0;">SHREE FINANCE - NEW PARTNER FILE FILED</h2>
                        <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0 0;">File Ref: #${refNo} • Category: ${category.toUpperCase()}</p>
                    </div>
                    <div style="padding: 24px;">
                        <p style="font-size: 14px; color: #0f172a; font-weight: 700;">Partner: ${partner.name} (#${partner.referenceNo})</p>
                        <table width="100%" style="font-size: 13px; margin: 16px 0; border: 1px solid #e2e8f0; border-radius: 8px;">
                            <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-weight: 700;">Client Name:</td><td style="padding: 8px 12px;">${customerName}</td></tr>
                            <tr><td style="padding: 8px 12px; font-weight: 700;">Client Mobile:</td><td style="padding: 8px 12px;">+91 ${customerMobile}</td></tr>
                            <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-weight: 700;">Product / File Type:</td><td style="padding: 8px 12px;">${subProduct}</td></tr>
                            <tr><td style="padding: 8px 12px; font-weight: 700;">Bank / Entity Submitted To:</td><td style="padding: 8px 12px; font-weight: 700; color: #0369a1;">${bankName}</td></tr>
                            <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-weight: 700;">Filed Amount:</td><td style="padding: 8px 12px; font-weight: 800; color: #0284c7;">₹${amountNum.toLocaleString("en-IN")}</td></tr>
                            <tr><td style="padding: 8px 12px; font-weight: 700;">Commission Rate / Amount:</td><td style="padding: 8px 12px; font-weight: 800; color: #0284c7;">${applicableRate}% (₹${calculatedCommission.toLocaleString("en-IN")})</td></tr>
                            <tr style="background: #f8fafc;"><td style="padding: 8px 12px; font-weight: 700;">Status:</td><td style="padding: 8px 12px;"><span style="background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px; font-weight: 700;">IN PROCESS</span></td></tr>
                        </table>
                    </div>
                </div>
                `
            });
        } catch (mailErr) {
            console.error("[PARTNER FILE MAIL ERROR]", mailErr);
        }

        return NextResponse.json({
            success: true,
            message: "File submission logged successfully! Status: In Process",
            lead: newLead
        });
    } catch (error) {
        console.error("Partner submit file error:", error);
        return NextResponse.json({ error: "Failed to submit partner file" }, { status: 500 });
    }
}
