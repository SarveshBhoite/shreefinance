const fs = require('fs');
const mongoose = require('mongoose');

async function findRecords() {
    try {
        const envFile = fs.readFileSync('.env.local', 'utf8');
        const match = envFile.match(/MONGODB_URI=(.*)/);
        const uri = match ? match[1].trim().replace(/^["']|["']$/g, '') : null;
        if (!uri) {
            console.log("No MongoDB URI found in .env.local");
            return;
        }

        await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
        const db = mongoose.connection.db;

        const collections = await db.listCollections().toArray();
        console.log("Collections:", collections.map(c => c.name));

        for (const col of collections) {
            const results = await db.collection(col.name).find({
                $or: [
                    { customerName: { $regex: 'Akash', $options: 'i' } },
                    { name: { $regex: 'Akash', $options: 'i' } },
                    { applicantName: { $regex: 'Akash', $options: 'i' } }
                ]
            }).toArray();

            if (results.length > 0) {
                console.log(`\n=== Found in ${col.name} (${results.length}) ===`);
                console.log(JSON.stringify(results, null, 2));
            }
        }
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await mongoose.disconnect();
    }
}

findRecords();
