const fs = require('fs');
const mongoose = require('mongoose');

async function listLeads() {
    try {
        const envFile = fs.readFileSync('.env.local', 'utf8');
        const match = envFile.match(/MONGODB_URI=(.*)/);
        const uri = match ? match[1].trim().replace(/^["']|["']$/g, '') : null;
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
        const db = mongoose.connection.db;
        const leads = await db.collection('partnerleads').find({}).toArray();
        console.log("All leads in DB:", leads.map(l => ({
            id: l.referenceNo,
            name: l.customerName,
            status: l.leadStatus,
            amount: l.applicationAmount,
            commissionRate: l.commissionRate,
            commissionAmount: l.commissionAmount
        })));
    } finally {
        await mongoose.disconnect();
    }
}
listLeads();
