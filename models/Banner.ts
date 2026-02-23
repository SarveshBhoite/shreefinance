import mongoose, { Schema, Document } from "mongoose";

export interface IBanner extends Document {
    imageUrl: string;
    publicId: string;
    title: string;
    link?: string;
    order: number;
    active: boolean;
    createdAt: Date;
}

const BannerSchema = new Schema<IBanner>({
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    title: { type: String, required: true },
    link: { type: String, default: "" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Banner || mongoose.model<IBanner>("Banner", BannerSchema);
