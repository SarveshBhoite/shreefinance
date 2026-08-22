const fs = require('fs');
const mongoose = require('mongoose');

async function updateDbLeads() {
  try {
    const envFile = fs.readFileSync('.env.local', 'utf8');
    const match = envFile.match(/MONGODB_URI=(.*)/);
    const uri = match ? match[1].trim().replace(/^["']|["']$/g, '') : null;
    if (!uri) {
      console.log('No MONGODB_URI found');
      return;
    }
    await mongoose.connect(uri);
    const db = mongoose.connection.db;
    const leads = await db.collection('partnerleads').find({}).toArray();
    for (const lead of leads) {
      const rate = Number(lead.commissionRate) || 2.0;
      const exactCommission = Number(((Number(lead.applicationAmount) || 0) * (rate / 100)).toFixed(2));
      await db.collection('partnerleads').updateOne(
        { _id: lead._id },
        { $set: { commissionAmount: exactCommission } }
      );
      console.log(`Updated lead ${lead.referenceNo}: amount=${lead.applicationAmount}, rate=${rate}%, exactCommission=${exactCommission}`);
    }
    console.log('Finished updating existing lead records.');
  } catch (err) {
    console.error('Error updating records:', err);
  } finally {
    await mongoose.disconnect();
  }
}

updateDbLeads();
