const fs = require('fs');
const mongoose = require('mongoose');

async function updateAkashDisbursedAmount() {
    try {
        const envFile = fs.readFileSync('.env.local', 'utf8');
        const match = envFile.match(/MONGODB_URI=(.*)/);
        const uri = match ? match[1].trim().replace(/^["']|["']$/g, '') : null;
        if (!uri) {
            console.error('No MONGODB_URI found in .env.local');
            return;
        }

        await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
        const db = mongoose.connection.db;

        const NEW_AMOUNT = 337240;

        // 1. Check partnerleads
        const lead = await db.collection('partnerleads').findOne({
            customerName: { $regex: 'Akash Arun Jadhav', $options: 'i' }
        });

        if (lead) {
            console.log("Current Lead Record:", lead);
            const rate = lead.commissionRate || 2.0;
            const newCommission = Number((NEW_AMOUNT * (rate / 100)).toFixed(2));

            const updateRes = await db.collection('partnerleads').updateOne(
                { _id: lead._id },
                {
                    $set: {
                        disbursedAmount: NEW_AMOUNT,
                        applicationAmount: NEW_AMOUNT,
                        commissionAmount: newCommission,
                        updatedAt: new Date()
                    }
                }
            );
            console.log("Updated partnerleads record:", updateRes);
        } else {
            console.log("No lead found for Akash Arun Jadhav");
        }

        // 2. Check partnerapplications if any
        const partnerApp = await db.collection('partnerapplications').findOne({
            name: { $regex: 'Akash Arun Jadhav', $options: 'i' }
        });

        if (partnerApp) {
            console.log("Current Partner Application Record:", partnerApp);
            const appUpdateRes = await db.collection('partnerapplications').updateOne(
                { _id: partnerApp._id },
                {
                    $set: {
                        applicationAmount: NEW_AMOUNT,
                        updatedAt: new Date()
                    }
                }
            );
            console.log("Updated partnerapplications record:", appUpdateRes);
        }

        // Verify updated record
        const updatedLead = await db.collection('partnerleads').findOne({
            customerName: { $regex: 'Akash Arun Jadhav', $options: 'i' }
        });
        console.log("\n=== VERIFIED UPDATED RECORD IN DB ===");
        console.log(JSON.stringify(updatedLead, null, 2));

    } catch (err) {
        console.error("Error updating Akash's disbursed amount:", err);
    } finally {
        await mongoose.disconnect();
    }
}

updateAkashDisbursedAmount();
