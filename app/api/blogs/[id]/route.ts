import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { getAdminFromToken } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

// GET /api/blogs/[id] — Public fetch single blog post by slug or ID
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();

        // Search by slug first, then fallback to _id
        let blog = await Blog.findOne({ slug: id });
        if (!blog && id.match(/^[0-9a-fA-F]{24}$/)) {
            blog = await Blog.findById(id);
        }

        if (!blog) {
            return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
        }

        // Increment view count
        blog.views = (blog.views || 0) + 1;
        await blog.save();

        return NextResponse.json({ success: true, blog });
    } catch (error) {
        console.error("Error fetching single blog:", error);
        return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
    }
}

// PATCH /api/blogs/[id] — Admin only update
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = await getAdminFromToken();
        if (!admin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await connectDB();

        const formData = await req.formData();
        const title = formData.get("title") as string | null;
        const excerpt = formData.get("excerpt") as string | null;
        const content = formData.get("content") as string | null;
        const category = formData.get("category") as string | null;
        const author = formData.get("author") as string | null;
        const authorRole = formData.get("authorRole") as string | null;
        const readTime = formData.get("readTime") as string | null;
        const tagsRaw = formData.get("tags") as string | null;
        const published = formData.get("published") !== null ? formData.get("published") === "true" : undefined;
        const imageFile = formData.get("image") as File | null;
        const coverImageUrl = formData.get("coverImageUrl") as string | null;

        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
        }

        if (title) blog.title = title;
        if (excerpt) blog.excerpt = excerpt;
        if (content) blog.content = content;
        if (category) blog.category = category;
        if (author) blog.author = author;
        if (authorRole) blog.authorRole = authorRole;
        if (readTime) blog.readTime = readTime;
        if (published !== undefined) blog.published = published;
        if (coverImageUrl !== null) blog.coverImage = coverImageUrl;

        if (tagsRaw !== null) {
            blog.tags = tagsRaw.split(",").map(t => t.trim()).filter(Boolean);
        }

        if (imageFile && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const uploadResult = await uploadToCloudinary(buffer, imageFile.name);
            blog.coverImage = uploadResult.url;
        }

        await blog.save();

        return NextResponse.json({ success: true, message: "Blog updated successfully", blog });
    } catch (error) {
        console.error("Error updating blog:", error);
        return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
    }
}

// DELETE /api/blogs/[id] — Admin only delete
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = await getAdminFromToken();
        if (!admin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await connectDB();

        const deleted = await Blog.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
    }
}
