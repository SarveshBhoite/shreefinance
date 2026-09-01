const fs = require('fs');
const mongoose = require('mongoose');

async function updateDefaultContactPhone() {
    try {
        const envFile = fs.readFileSync('.env.local', 'utf8');
        const match = envFile.match(/MONGODB_URI=(.*)/);
        const uri = match ? match[1].trim().replace(/^["']|["']$/g, '') : null;
        if (!uri) return;

        await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
        const db = mongoose.connection.db;

        const res = await db.collection('partnerapplications').updateMany(
            { mobile: '7709936965' },
            { $set: { mobile: '8830434945' } }
        );
        console.log('Updated partner applications default phone count:', res.modifiedCount);
    } finally {
        await mongoose.disconnect();
    }
}

updateDefaultContactPhone();
