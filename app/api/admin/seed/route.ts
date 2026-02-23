import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST() {
    try {
        await connectDB();

        const username = process.env.ADMIN_USERNAME || "admin";
        const password = process.env.ADMIN_PASSWORD || "admin123";

        // Check if admin already exists
        const existing = await Admin.findOne({ username });
        if (existing) {
            return NextResponse.json({ message: "Admin already exists" }, { status: 200 });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        await Admin.create({ username, passwordHash });

        return NextResponse.json({ message: "Admin user created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Seed error:", error);
        return NextResponse.json({ error: "Failed to seed admin" }, { status: 500 });
    }
}
