import mongoose, { Schema, Document } from "mongoose";

export interface ISystemSettings extends Document {
    loansCommissionRate: number; // e.g. 2.0 (%)
    cardsCommissionRate: number; // e.g. 3.0 (%)
    insuranceCommissionRate: number; // e.g. 5.0 (%)
    investmentsCommissionRate: number; // e.g. 1.5 (%)
    productRates?: Record<string, number>;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}

const SystemSettingsSchema = new Schema<ISystemSettings>(
    {
        loansCommissionRate: { type: Number, required: true, default: 2.0 },
        cardsCommissionRate: { type: Number, required: true, default: 3.0 },
        insuranceCommissionRate: { type: Number, required: true, default: 5.0 },
        investmentsCommissionRate: { type: Number, required: true, default: 1.5 },
        productRates: { type: Schema.Types.Mixed, default: {} },
        updatedBy: { type: String, default: "admin" }
    },
    { timestamps: true }
);

export default mongoose.models.SystemSettings ||
    mongoose.model<ISystemSettings>("SystemSettings", SystemSettingsSchema);
