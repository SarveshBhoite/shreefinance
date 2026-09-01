const fs = require('fs');
const mongoose = require('mongoose');

async function updatePartnerEmailInDB() {
    try {
        const envFile = fs.readFileSync('.env.local', 'utf8');
        const match = envFile.match(/MONGODB_URI=(.*)/);
        const uri = match ? match[1].trim().replace(/^["']|["']$/g, '') : null;
        if (!uri) return;

        await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
        const db = mongoose.connection.db;

        const res1 = await db.collection('partnerapplications').updateMany(
            { email: 'care@shreefinance.com' },
            { $set: { email: 'shreefinancec@gmail.com' } }
        );
        console.log('Updated partnerapplications email count:', res1.modifiedCount);

        const res2 = await db.collection('partnerleads').updateMany(
            { partnerEmail: 'care@shreefinance.com' },
            { $set: { partnerEmail: 'shreefinancec@gmail.com' } }
        );
        console.log('Updated partnerleads partnerEmail count:', res2.modifiedCount);

    } finally {
        await mongoose.disconnect();
    }
}

updatePartnerEmailInDB();
