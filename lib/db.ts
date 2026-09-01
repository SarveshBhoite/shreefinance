import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;


interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };

if (!global.mongooseCache) {
    global.mongooseCache = cached;
}

export async function connectDB() {
    if (cached.conn) return cached.conn;

    let uri = process.env.MONGODB_URI || MONGODB_URI || "";
    uri = uri.trim();
    if (uri.startsWith("MONGO_URI=")) {
        uri = uri.replace("MONGO_URI=", "").trim();
    }
    if (uri.startsWith('"') && uri.endsWith('"')) {
        uri = uri.slice(1, -1);
    }
    if (uri.startsWith("'") && uri.endsWith("'")) {
        uri = uri.slice(1, -1);
    }

    if (!uri || (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://"))) {
        throw new Error("Please define a valid MONGODB_URI (starting with mongodb:// or mongodb+srv://) in .env.local");
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(uri);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
