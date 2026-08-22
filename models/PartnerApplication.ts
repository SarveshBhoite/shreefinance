import mongoose, { Schema, Document } from "mongoose";

export interface IPartnerApplication extends Document {
    name: string;
    email: string;
    mobile: string;
    city: string;
    profession?: string;
    companyName?: string;
    location?: string;
    addressProofType?: string;
    fullAddress?: string;
    experienceYears?: string;
    bankAccountType?: string;
    uploadedDocuments?: Record<string, unknown> | string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    isActive: boolean;
    referenceNo: string;
    passwordHash?: string;
    initialPasswordSent?: boolean;
    loginOtp?: string;
    loginOtpExpires?: Date;
    partnerToken?: string;
    rejectionReason?: string;
    reviewedAt?: Date;
    reviewedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}

const PartnerApplicationSchema = new Schema<IPartnerApplication>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        mobile: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        profession: { type: String, default: "Loan Agent / DSA" },
        companyName: { type: String, default: "Individual DSA" },
        location: { type: String },
        addressProofType: { type: String },
        fullAddress: { type: String },
        experienceYears: { type: String },
        bankAccountType: { type: String },
        uploadedDocuments: { type: Schema.Types.Mixed },
        status: {
            type: String,
            enum: ["PENDING", "APPROVED", "REJECTED"],
            default: "PENDING",
            index: true
        },
        isActive: { type: Boolean, default: false },
        referenceNo: { type: String, required: true, unique: true, index: true },
        passwordHash: { type: String },
        initialPasswordSent: { type: Boolean, default: false },
        loginOtp: { type: String },
        loginOtpExpires: { type: Date },
        partnerToken: { type: String },
        rejectionReason: { type: String },
        reviewedAt: { type: Date },
        reviewedBy: { type: String }
    },
    { timestamps: true }
);

export default mongoose.models.PartnerApplication ||
    mongoose.model<IPartnerApplication>("PartnerApplication", PartnerApplicationSchema);
