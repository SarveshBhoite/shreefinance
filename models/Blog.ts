import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    coverImage?: string;
    author: string;
    authorRole?: string;
    readTime?: string;
    tags: string[];
    published: boolean;
    views: number;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, index: true },
        excerpt: { type: String, required: true, trim: true },
        content: { type: String, required: true },
        category: {
            type: String,
            required: true,
            enum: ["Loans", "Cards", "Insurance", "Investments", "Financial Planning", "Credit Score", "General"],
            default: "Loans",
            index: true
        },
        coverImage: { type: String, default: "" },
        author: { type: String, default: "Shree Finance Advisory Desk" },
        authorRole: { type: String, default: "Senior Financial Research Team" },
        readTime: { type: String, default: "4 min read" },
        tags: [{ type: String, trim: true }],
        published: { type: Boolean, default: true, index: true },
        views: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

if (mongoose.models.Blog) {
    delete mongoose.models.Blog;
}

export default mongoose.model<IBlog>("Blog", BlogSchema);
