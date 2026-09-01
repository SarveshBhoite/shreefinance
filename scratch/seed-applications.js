const fs = require('fs');
const mongoose = require('mongoose');

async function seedData() {
    try {
        const envFile = fs.readFileSync('.env.local', 'utf8');
        const match = envFile.match(/MONGODB_URI=(.*)/);
        const uri = match ? match[1].trim().replace(/^["']|["']$/g, '') : null;
        if (!uri) {
            console.error('No MONGODB_URI found in .env.local');
            return;
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
        console.log('Successfully connected to MongoDB!');

        const db = mongoose.connection.db;

        // Ensure Admin exists or create default partner if needed
        let defaultPartner = await db.collection('partnerapplications').findOne({});
        if (!defaultPartner) {
            const newPartner = {
                name: 'Direct Web Application Desk',
                email: 'shreefinancec@gmail.com',
                mobile: '8830434945',
                city: 'Pune',
                profession: 'Admin / Web Lead Desk',
                companyName: 'Shree Finance Direct',
                status: 'APPROVED',
                isActive: true,
                referenceNo: 'SHREE-PTR-1001',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            const result = await db.collection('partnerapplications').insertOne(newPartner);
            defaultPartner = { _id: result.insertedId, ...newPartner };
            console.log('Created default partner desk:', defaultPartner.referenceNo);
        }

        // Also add them as Partner Applications if user requested partner applications
        const applicationsToAdd = [
            {
                name: "Akash Arun Jadhav",
                email: "aakasharunjadhav@gmail.com",
                mobile: "9325174465",
                city: "Pune",
                loanType: "Personal Loan",
                category: "loans",
                subProduct: "Personal Loan",
                bankName: "HDFC Bank",
                applicationAmount: 500000,
                status: "PENDING"
            },
            {
                name: "Siddhi Bhoite",
                email: "bhoitesiddhi87@gmail.com",
                mobile: "8530241573",
                city: "Pune",
                loanType: "Car Loan",
                category: "loans",
                subProduct: "Car Loan",
                bankName: "SBI Bank",
                applicationAmount: 850000,
                status: "PENDING"
            },
            {
                name: "Aishwarya Sulagadle",
                email: "sulagadleaishwarya@gmail.com",
                mobile: "8087631421",
                city: "Pune",
                loanType: "Education Loan",
                category: "loans",
                subProduct: "Education Loan",
                bankName: "ICICI Bank",
                applicationAmount: 1500000,
                status: "PENDING"
            }
        ];

        // 1. Add as PartnerApplications (Visible in Partner Approvals tab)
        for (const app of applicationsToAdd) {
            const existingPartner = await db.collection('partnerapplications').findOne({ email: app.email });
            const refNo = existingPartner?.referenceNo || `SHREE-PTR-${Math.floor(1000 + Math.random() * 9000)}`;
            
            await db.collection('partnerapplications').updateOne(
                { email: app.email },
                {
                    $set: {
                        name: app.name,
                        email: app.email,
                        mobile: app.mobile,
                        city: app.city,
                        profession: `${app.loanType} Applicant`,
                        companyName: "Individual Applicant",
                        location: app.city,
                        fullAddress: `${app.city}, Maharashtra`,
                        status: "PENDING",
                        isActive: false,
                        referenceNo: refNo,
                        updatedAt: new Date()
                    },
                    $setOnInsert: {
                        createdAt: new Date()
                    }
                },
                { upsert: true }
            );
            console.log(`Saved Partner Application for ${app.name} (${app.email}) -> Ref: ${refNo}`);
        }

        // 2. Add as PartnerLead / Submitted Loan Files (Visible in Submitted Files & Pipeline tab)
        for (const app of applicationsToAdd) {
            const existingLead = await db.collection('partnerleads').findOne({ customerEmail: app.email });
            const fileRefNo = existingLead?.referenceNo || `SHREE-FIL-${Math.floor(100000 + Math.random() * 900000)}`;
            const rate = 2.0;
            const commission = Number((app.applicationAmount * (rate / 100)).toFixed(2));

            await db.collection('partnerleads').updateOne(
                { customerEmail: app.email },
                {
                    $set: {
                        partnerId: defaultPartner._id,
                        partnerReferenceNo: defaultPartner.referenceNo,
                        partnerName: defaultPartner.name,
                        partnerEmail: defaultPartner.email,
                        category: app.category,
                        subProduct: app.subProduct,
                        customerName: app.name,
                        customerMobile: app.mobile,
                        customerEmail: app.email,
                        customerCity: app.city,
                        bankName: app.bankName,
                        applicationAmount: app.applicationAmount,
                        commissionRate: rate,
                        commissionAmount: commission,
                        leadStatus: "IN_PROCESS",
                        payoutStatus: "PENDING",
                        referenceNo: fileRefNo,
                        leadNotes: `Online Application for ${app.loanType}`,
                        updatedAt: new Date()
                    },
                    $setOnInsert: {
                        createdAt: new Date()
                    }
                },
                { upsert: true }
            );
            console.log(`Saved Submitted Loan File for ${app.name} (${app.subProduct}) -> Ref: ${fileRefNo}`);
        }

        console.log('Successfully inserted/updated all 3 applications in both Partner and Submitted Files tables!');

    } catch (err) {
        console.error('Error during seeding:', err);
    } finally {
        await mongoose.disconnect();
    }
}

seedData();
