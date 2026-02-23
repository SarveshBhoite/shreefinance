import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Banner from "@/models/Banner";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { getAdminFromToken } from "@/lib/auth";

// DELETE /api/banners/[id]
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = await getAdminFromToken();
        if (!admin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const { id } = await params;

        const banner = await Banner.findById(id);
        if (!banner) {
            return NextResponse.json({ error: "Banner not found" }, { status: 404 });
        }

        // Delete from Cloudinary
        await deleteFromCloudinary(banner.publicId);

        // Delete from MongoDB
        await Banner.findByIdAndDelete(id);

        return NextResponse.json({ message: "Banner deleted successfully" });
    } catch (error) {
        console.error("Error deleting banner:", error);
        return NextResponse.json({ error: "Failed to delete banner" }, { status: 500 });
    }
}
