const fs = require('fs');
const mongoose = require('mongoose');

async function syncDisbursedAmounts() {
    try {
        const envFile = fs.readFileSync('.env.local', 'utf8');
        const match = envFile.match(/MONGODB_URI=(.*)/);
        const uri = match ? match[1].trim().replace(/^["']|["']$/g, '') : null;
        if (!uri) return;

        await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
        const db = mongoose.connection.db;

        const leads = await db.collection('partnerleads').find({}).toArray();
        for (const lead of leads) {
            await db.collection('partnerleads').updateOne(
                { _id: lead._id },
                { $set: { disbursedAmount: lead.applicationAmount } }
            );
        }
        console.log("Updated disbursedAmount field on all lead records");
    } finally {
        await mongoose.disconnect();
    }
}

syncDisbursedAmounts();
