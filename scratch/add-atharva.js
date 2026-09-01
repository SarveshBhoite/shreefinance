const fs = require('fs');
const mongoose = require('mongoose');

async function addAtharva() {
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

        // Get default partner
        let defaultPartner = await db.collection('partnerapplications').findOne({ referenceNo: 'SHREE-PTR-1001' }) ||
            await db.collection('partnerapplications').findOne({});

        const user = {
            name: "Atharva Patharkar",
            email: "atharva@gmail.com",
            mobile: "9420467377",
            city: "Pune",
            loanType: "Car Loan",
            category: "loans",
            subProduct: "Car Loan",
            bankName: "HDFC Bank",
            applicationAmount: 600000,
            rate: 2.0,
            appId: "Shree_Finence_04",
            partnerRef: "SHREE-DIRECT",
            partnerName: "Direct Online Portal"
        };

        const commission = Number((user.applicationAmount * (user.rate / 100)).toFixed(2));

        // 1. Partner Applications Table
        await db.collection('partnerapplications').updateOne(
            { email: user.email },
            {
                $set: {
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    city: user.city,
                    profession: "Car Loan Applicant",
                    companyName: user.partnerName,
                    location: user.city,
                    fullAddress: `${user.city}, Maharashtra`,
                    status: "PENDING",
                    isActive: false,
                    referenceNo: user.appId,
                    updatedAt: new Date()
                },
                $setOnInsert: {
                    createdAt: new Date()
                }
            },
            { upsert: true }
        );

        // 2. Partner Leads / Submitted Files Table
        await db.collection('partnerleads').updateOne(
            { customerEmail: user.email },
            {
                $set: {
                    partnerId: defaultPartner ? defaultPartner._id : new mongoose.Types.ObjectId(),
                    partnerReferenceNo: user.partnerRef,
                    partnerName: user.partnerName,
                    partnerEmail: defaultPartner ? defaultPartner.email : "care@shreefinance.com",
                    category: user.category,
                    subProduct: user.subProduct,
                    customerName: user.name,
                    customerMobile: user.mobile,
                    customerEmail: user.email,
                    customerCity: user.city,
                    bankName: user.bankName,
                    applicationAmount: user.applicationAmount,
                    commissionRate: user.rate,
                    commissionAmount: commission,
                    leadStatus: "DISBURSED",
                    payoutStatus: "PROCESSED",
                    referenceNo: user.appId,
                    leadNotes: `Online Application for ${user.loanType}`,
                    disbursedAt: new Date(),
                    updatedAt: new Date()
                },
                $setOnInsert: {
                    createdAt: new Date()
                }
            },
            { upsert: true }
        );

        console.log(`Successfully added ${user.name} (${user.appId}) with amount ₹${user.applicationAmount} and commission ₹${commission}`);
    } catch (e) {
        console.error('Error adding user:', e);
    } finally {
        await mongoose.disconnect();
    }
}

addAtharva();
