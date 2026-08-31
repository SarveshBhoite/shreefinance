const fs = require('fs');
const mongoose = require('mongoose');

async function updateIds() {
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

        const userUpdates = [
            {
                email: "aakasharunjadhav@gmail.com",
                name: "Akash Arun Jadhav",
                appId: "Shree_Finence_01",
                partnerRef: "SHREE-DIRECT",
                partnerName: "Direct Online Portal"
            },
            {
                email: "bhoitesiddhi87@gmail.com",
                name: "Siddhi Bhoite",
                appId: "Shree_Finence_02",
                partnerRef: "SHREE-DIRECT",
                partnerName: "Direct Online Portal"
            },
            {
                email: "sulagadleaishwarya@gmail.com",
                name: "Aishwarya Sulagadle",
                appId: "Shree_Finence_03",
                partnerRef: "SHREE-DIRECT",
                partnerName: "Direct Online Portal"
            }
        ];

        for (const u of userUpdates) {
            await db.collection('partnerleads').updateOne(
                { customerEmail: u.email },
                {
                    $set: {
                        referenceNo: u.appId,
                        partnerReferenceNo: u.partnerRef,
                        partnerName: u.partnerName,
                        updatedAt: new Date()
                    }
                }
            );
            console.log(`Updated Lead ${u.name} -> Application ID: #${u.appId}, Partner: ${u.partnerName} (#${u.partnerRef})`);

            await db.collection('partnerapplications').updateOne(
                { email: u.email },
                {
                    $set: {
                        referenceNo: u.appId,
                        companyName: u.partnerName,
                        updatedAt: new Date()
                    }
                }
            );
        }

        console.log('Successfully updated application IDs to Shree_Finence_01, Shree_Finence_02, Shree_Finence_03!');
    } catch (e) {
        console.error('Error updating IDs:', e);
    } finally {
        await mongoose.disconnect();
    }
}

updateIds();
