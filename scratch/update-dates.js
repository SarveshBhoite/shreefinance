const fs = require('fs');
const mongoose = require('mongoose');

async function updateDisbursedDates() {
    try {
        const envFile = fs.readFileSync('.env.local', 'utf8');
        const match = envFile.match(/MONGODB_URI=(.*)/);
        const uri = match ? match[1].trim().replace(/^["']|["']$/g, '') : null;
        if (!uri) return;

        await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
        const db = mongoose.connection.db;

        // Custom staggered disbursal dates for each application
        const updates = [
            {
                referenceNo: "Shree_Finence_01",
                customerName: "Akash Arun Jadhav",
                disbursedAt: new Date("2026-08-12T11:30:00Z"),
                createdAt: new Date("2026-08-05T10:00:00Z")
            },
            {
                referenceNo: "Shree_Finence_02",
                customerName: "Siddhi Bhoite",
                disbursedAt: new Date("2026-08-18T14:15:00Z"),
                createdAt: new Date("2026-08-10T12:00:00Z")
            },
            {
                referenceNo: "Shree_Finence_03",
                customerName: "Aishwarya Sulagadle",
                disbursedAt: new Date("2026-08-24T16:45:00Z"),
                createdAt: new Date("2026-08-15T09:30:00Z")
            },
            {
                referenceNo: "Shree_Finence_04",
                customerName: "Atharva Patharkar",
                disbursedAt: new Date("2026-08-29T13:20:00Z"),
                createdAt: new Date("2026-08-22T11:00:00Z")
            }
        ];

        for (const item of updates) {
            await db.collection('partnerleads').updateOne(
                { referenceNo: item.referenceNo },
                { 
                    $set: { 
                        disbursedAt: item.disbursedAt,
                        createdAt: item.createdAt
                    } 
                }
            );
            console.log(`Updated dates for ${item.referenceNo} (${item.customerName}) -> Disbursed: ${item.disbursedAt.toISOString().slice(0, 10)}`);
        }
    } finally {
        await mongoose.disconnect();
    }
}

updateDisbursedDates();
