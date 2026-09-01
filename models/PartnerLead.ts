import mongoose, { Schema, Document } from "mongoose";

export interface IPartnerLead extends Document {
    partnerId: mongoose.Types.ObjectId;
    partnerReferenceNo: string;
    partnerName: string;
    partnerEmail?: string;
    category: "loans" | "cards" | "insurance" | "investments";
    subProduct: string; // e.g. Home Loan, Personal Loan, Credit Card, Health Insurance, Mutual Funds, etc.
    customerName: string;
    customerMobile: string;
    customerEmail?: string;
    customerCity: string;
    bankName: string; // e.g. HDFC Bank, SBI, ICICI, Star Health, etc.
    applicationAmount: number; // e.g. 2500000 (25 Lakhs)
    disbursedAmount?: number; // e.g. 2500000
    bankReferenceNo?: string; // Bank Application Number / LAN
    commissionRate: number; // e.g. 2.0 (%)
    commissionAmount: number; // e.g. 25000 (Calculated: applicationAmount * (commissionRate / 100))
    leadStatus: "IN_PROCESS" | "DOCS_SUBMITTED" | "BANK_LOGIN" | "SANCTIONED" | "DISBURSED" | "REJECTED";
    payoutStatus: "PENDING" | "PROCESSED" | "PAID";
    rmName?: string; // Relationship Manager Name
    leadNotes?: string;
    disbursedAt?: Date;
    referenceNo: string;
    createdAt: Date;
    updatedAt: Date;
}

const PartnerLeadSchema = new Schema<IPartnerLead>(
    {
        partnerId: { type: Schema.Types.ObjectId, ref: "PartnerApplication", required: true, index: true },
        partnerReferenceNo: { type: String, required: true },
        partnerName: { type: String, required: true },
        partnerEmail: { type: String, lowercase: true, trim: true },
        category: {
            type: String,
            enum: ["loans", "cards", "insurance", "investments"],
            default: "loans",
            index: true
        },
        subProduct: { type: String, required: true, default: "Home Loan" },
        customerName: { type: String, required: true, trim: true },
        customerMobile: { type: String, required: true, trim: true },
        customerEmail: { type: String, trim: true, lowercase: true },
        customerCity: { type: String, required: true },
        bankName: { type: String, required: true, default: "HDFC Bank" },
        rmName: { type: String, trim: true, default: "Sarvesh Bhoite" },
        applicationAmount: { type: Number, required: true },
        disbursedAmount: { type: Number },
        bankReferenceNo: { type: String, trim: true },
        commissionRate: { type: Number, default: 2.0 },
        commissionAmount: { type: Number, default: 0 },
        leadStatus: {
            type: String,
            enum: ["IN_PROCESS", "DOCS_SUBMITTED", "BANK_LOGIN", "SANCTIONED", "DISBURSED", "REJECTED"],
            default: "IN_PROCESS",
            index: true
        },
        payoutStatus: {
            type: String,
            enum: ["PENDING", "PROCESSED", "PAID"],
            default: "PENDING"
        },
        leadNotes: { type: String },
        disbursedAt: { type: Date },
        referenceNo: { type: String, required: true, unique: true, index: true }
    },
    { timestamps: true }
);

export default mongoose.models.PartnerLead ||
    mongoose.model<IPartnerLead>("PartnerLead", PartnerLeadSchema);
