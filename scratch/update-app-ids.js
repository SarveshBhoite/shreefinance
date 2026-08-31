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

        // The 3 users with requested Application IDs: 01, 02, 03 and clean Partner Reference: #SHREE-DIRECT / Direct Online Portal
        const userUpdates = [
            {
                email: "aakasharunjadhav@gmail.com",
                name: "Akash Arun Jadhav",
                appId: "01",
                partnerRef: "SHREE-DIRECT",
                partnerName: "Direct Online Portal"
            },
            {
                email: "bhoitesiddhi87@gmail.com",
                name: "Siddhi Bhoite",
                appId: "02",
                partnerRef: "SHREE-DIRECT",
                partnerName: "Direct Online Portal"
            },
            {
                email: "sulagadleaishwarya@gmail.com",
                name: "Aishwarya Sulagadle",
                appId: "03",
                partnerRef: "SHREE-DIRECT",
                partnerName: "Direct Online Portal"
            }
        ];

        for (const u of userUpdates) {
            // Update in partnerleads collection (The Application Table in Admin Panel)
            const res = await db.collection('partnerleads').updateOne(
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
            console.log(`Updated Lead ${u.name} -> Application ID: #${u.appId}, Partner: ${u.partnerName} (#${u.partnerRef}) (Matched: ${res.matchedCount})`);

            // Also update partnerapplications table if present
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

        console.log('Successfully updated application IDs to 01, 02, 03 and Partner to Direct Online Portal (#SHREE-DIRECT)!');
    } catch (e) {
        console.error('Error updating IDs:', e);
    } finally {
        await mongoose.disconnect();
    }
}

updateIds();
