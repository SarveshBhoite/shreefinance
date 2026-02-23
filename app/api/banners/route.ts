import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Banner from "@/models/Banner";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { getAdminFromToken } from "@/lib/auth";

// GET /api/banners — public, no auth needed
export async function GET() {
    try {
        await connectDB();
        const banners = await Banner.find({ active: true }).sort({ order: 1, createdAt: -1 });
        return NextResponse.json({ banners });
    } catch (error) {
        console.error("Error fetching banners:", error);
        return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 });
    }
}

// POST /api/banners — requires admin auth
export async function POST(request: Request) {
    try {
        const admin = await getAdminFromToken();
        if (!admin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const formData = await request.formData();
        const file = formData.get("image") as File;
        const title = formData.get("title") as string;
        const link = (formData.get("link") as string) || "";

        if (!file || !title) {
            return NextResponse.json({ error: "Image and title are required" }, { status: 400 });
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const { url, publicId } = await uploadToCloudinary(buffer, file.name);

        // Get the highest order number
        const lastBanner = await Banner.findOne().sort({ order: -1 });
        const order = lastBanner ? lastBanner.order + 1 : 0;

        // Save to MongoDB
        const banner = await Banner.create({
            imageUrl: url,
            publicId,
            title,
            link,
            order,
            active: true,
        });

        return NextResponse.json({ banner }, { status: 201 });
    } catch (error) {
        console.error("Error uploading banner:", error);
        return NextResponse.json({ error: "Failed to upload banner" }, { status: 500 });
    }
}
