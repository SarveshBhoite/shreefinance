import mongoose, { Schema, Document } from "mongoose";

export interface IBanner extends Document {
    imageUrl: string;
    publicId: string;
    title: string;
    link?: string;
    page: string;
    order: number;
    active: boolean;
    createdAt: Date;
}

const BannerSchema = new Schema<IBanner>({
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    title: { type: String, required: true },
    link: { type: String, default: "" },
    page: { type: String, required: true, default: "home", index: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

// Delete cached model to ensure schema changes take effect in dev hot-reload
if (mongoose.models.Banner) {
    delete mongoose.models.Banner;
}

export default mongoose.model<IBanner>("Banner", BannerSchema);
