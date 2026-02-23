/**
 * Backfill script: sets the `page` field to "home" for all banners missing it.
 * Run this once: npx tsx scripts/backfill-banner-page.ts
 */
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI not found in .env.local");
        process.exit(1);
    }

    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    const result = await mongoose.connection.db!.collection("banners").updateMany(
        { page: { $exists: false } },
        { $set: { page: "home" } }
    );

    console.log(`Updated ${result.modifiedCount} banners (set page="home")`);

    await mongoose.disconnect();
    console.log("Done");
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
