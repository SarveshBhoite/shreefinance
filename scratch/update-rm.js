const fs = require('fs');
const mongoose = require('mongoose');

async function setRmNames() {
    try {
        const envFile = fs.readFileSync('.env.local', 'utf8');
        const match = envFile.match(/MONGODB_URI=(.*)/);
        const uri = match ? match[1].trim().replace(/^["']|["']$/g, '') : null;
        if (!uri) return;

        await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
        const db = mongoose.connection.db;

        await db.collection('partnerleads').updateMany(
            { rmName: { $exists: false } },
            { $set: { rmName: "Sarvesh Bhoite" } }
        );
        console.log("Updated rmName default on existing lead records");
    } finally {
        await mongoose.disconnect();
    }
}

setRmNames();
