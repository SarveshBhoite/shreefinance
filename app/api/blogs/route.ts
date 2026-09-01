import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { getAdminFromToken } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

// GET /api/blogs — Public list with category, search & tag filtering
export async function GET(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");
        const search = searchParams.get("search");
        const tag = searchParams.get("tag");
        const adminMode = searchParams.get("admin") === "true";

        const filter: Record<string, unknown> = {};

        // If not requesting from admin desk, only show published articles
        if (!adminMode) {
            filter.published = true;
        }

        if (category && category !== "ALL") {
            filter.category = category;
        }

        if (tag) {
            filter.tags = tag;
        }

        if (search && search.trim()) {
            const regex = { $regex: search.trim(), $options: "i" };
            filter.$or = [
                { title: regex },
                { excerpt: regex },
                { category: regex },
                { tags: regex },
                { author: regex }
            ];
        }

        const blogs = await Blog.find(filter).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, blogs });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
}

// POST /api/blogs — Admin only: Create new blog article
export async function POST(req: Request) {
    try {
        const admin = await getAdminFromToken();
        if (!admin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const formData = await req.formData();
        const title = formData.get("title") as string;
        const excerpt = formData.get("excerpt") as string;
        const content = formData.get("content") as string;
        const category = (formData.get("category") as string) || "Loans";
        const author = (formData.get("author") as string) || "Shree Finance Advisory Desk";
        const authorRole = (formData.get("authorRole") as string) || "Senior Financial Research Team";
        const readTime = (formData.get("readTime") as string) || "4 min read";
        const tagsRaw = (formData.get("tags") as string) || "";
        const published = formData.get("published") !== "false";
        const imageFile = formData.get("image") as File | null;
        let coverImage = (formData.get("coverImageUrl") as string) || "";

        if (!title || !excerpt || !content) {
            return NextResponse.json({ error: "Title, excerpt, and content are required." }, { status: 400 });
        }

        // If an image file is uploaded, upload to Cloudinary
        if (imageFile && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const uploadResult = await uploadToCloudinary(buffer, imageFile.name);
            coverImage = uploadResult.url;
        }

        // Generate base unique slug
        let baseSlug = generateSlug(title);
        if (!baseSlug) baseSlug = `post-${Date.now()}`;
        let uniqueSlug = baseSlug;
        let counter = 1;

        while (await Blog.findOne({ slug: uniqueSlug })) {
            uniqueSlug = `${baseSlug}-${counter}`;
            counter++;
        }

        const tags = tagsRaw
            .split(",")
            .map(t => t.trim())
            .filter(Boolean);

        const newBlog = await Blog.create({
            title,
            slug: uniqueSlug,
            excerpt,
            content,
            category,
            coverImage,
            author,
            authorRole,
            readTime,
            tags,
            published,
            views: 0
        });

        return NextResponse.json({ success: true, message: "Blog published successfully", blog: newBlog }, { status: 201 });
    } catch (error) {
        console.error("Error creating blog:", error);
        return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
    }
}
