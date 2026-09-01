const fs = require('fs');
const mongoose = require('mongoose');

async function markDisbursed() {
    try {
        const envFile = fs.readFileSync('.env.local', 'utf8');
        const match = envFile.match(/MONGODB_URI=(.*)/);
        const uri = match ? match[1].trim().replace(/^["']|["']$/g, '') : null;
        if (!uri) {
            console.error('No MONGODB_URI found');
            return;
        }

        await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;

        // Update each lead to DISBURSED and calculate exact commission amount
        const leads = await db.collection('partnerleads').find({}).toArray();
        for (const lead of leads) {
            const amount = Number(lead.applicationAmount) || 0;
            const rate = Number(lead.commissionRate) || 2.0;
            const exactCommission = Number((amount * (rate / 100)).toFixed(2));

            await db.collection('partnerleads').updateOne(
                { _id: lead._id },
                {
                    $set: {
                        leadStatus: "DISBURSED",
                        payoutStatus: "PROCESSED",
                        commissionAmount: exactCommission,
                        disbursedAt: new Date(),
                        updatedAt: new Date()
                    }
                }
            );
            console.log(`Updated ${lead.customerName} (${lead.referenceNo}): Status=DISBURSED, Amount=₹${amount}, Commission=₹${exactCommission}`);
        }

        console.log('Successfully updated all user applications to DISBURSED!');
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await mongoose.disconnect();
    }
}

markDisbursed();
