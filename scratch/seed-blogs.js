const fs = require('fs');
const mongoose = require('mongoose');

async function seedInitialBlogs() {
    try {
        const envFile = fs.readFileSync('.env.local', 'utf8');
        const match = envFile.match(/MONGODB_URI=(.*)/);
        const uri = match ? match[1].trim().replace(/^["']|["']$/g, '') : null;
        if (!uri) return;

        await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
        const db = mongoose.connection.db;

        const count = await db.collection('blogs').countDocuments();
        if (count > 0) {
            console.log(`Blogs collection already has ${count} articles.`);
            return;
        }

        const sampleBlogs = [
            {
                title: "How to Secure Lowest Home Loan Rates in Pune: Complete 2026 Guide",
                slug: "how-to-secure-lowest-home-loan-rates-pune-2026",
                excerpt: "Explore proven tactics to get interest rates starting from 8.35% across leading national banks like SBI, HDFC, and ICICI.",
                content: `Securing a home loan in Pune with the lowest possible interest rate can save you lakhs of rupees in long-term EMI outflow. Here is the step-by-step master plan curated by Shree Finance advisors:

1. Maintain a CIBIL Score Above 750:
Banks reserve their best interest brackets (e.g. 8.35% - 8.50%) for applicants with high creditworthiness and flawless repayment track records.

2. Compare Live Bank Offers:
Never settle for the first bank sanction letter. At Shree Finance, we compare live interest rates, processing fees, and pre-closure terms across 40+ partner banks.

3. Opt for Maximum Down Payment:
Higher down payments reduce the Loan-to-Value (LTV) ratio, lowering risk for the lender and unlocking preferential rate tiers.

4. Check Co-applicant Benefits:
Adding a woman co-applicant (spouse or mother) can fetch an additional concession of 0.05% on home loan interest rates with major PSU lenders.`,
                category: "Loans",
                coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
                author: "Sarvesh Bhoite",
                authorRole: "Principal Financial Consultant",
                readTime: "5 min read",
                tags: ["Home Loan", "Pune Real Estate", "Interest Rates", "SBI Bank"],
                published: true,
                views: 124,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: "7 Guaranteed Ways to Boost Your CIBIL Score Above 750 Within 60 Days",
                slug: "boost-cibil-score-above-750-within-60-days",
                excerpt: "Step-by-step actionable advice to resolve credit report discrepancies, optimize utilization, and qualify for instant approvals.",
                content: `Your CIBIL score is the digital passport to hassle-free loan sanctions and premium lifetime-free credit cards. If your credit score is below 700, follow these 7 actionable steps:

1. Keep Credit Card Utilization Below 30%:
Maxing out credit limits signals high credit hunger. Spread expenses across cards or request a credit limit enhancement.

2. Clear Overdue Dues & Settle Disputes:
Ensure all late payment penalties or small unresolved balances are paid in full with No Due Certificates (NDC).

3. Avoid Multiple Simultaneous Loan Applications:
Each loan application triggers a hard inquiry. Instead, use Shree Finance soft eligibility assessment tools to check approval chances without impacting your score.

4. Mix Secured and Unsecured Credit:
A balanced portfolio of secured loans (home/car) and unsecured lines (credit cards/personal loans) demonstrates responsible financial management.`,
                category: "Credit Score",
                coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
                author: "Shree Finance Advisory Desk",
                authorRole: "Credit Risk Analysis Team",
                readTime: "4 min read",
                tags: ["CIBIL", "Credit Score", "Financial Planning", "Credit Cards"],
                published: true,
                views: 298,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: "Business Loan vs Overdraft Facility: Which One Should You Pick for Working Capital?",
                slug: "business-loan-vs-overdraft-facility-working-capital",
                excerpt: "Discover whether a term business loan or a revolving overdraft (OD) facility is best suited for your SME liquidity requirements.",
                content: `Small and Medium Enterprises (SMEs) in PCMC and Pune often struggle to choose between a Term Business Loan and an Overdraft (OD/CC) facility.

Key Differences:
• Term Business Loan: Lump sum sanction repaid via fixed monthly EMIs. Best for long-term machinery purchase, office expansion, and heavy capital investments.
• Overdraft (OD) Limit: Credit line where interest is charged ONLY on the actual amount utilized and for the specific number of days used. Ideal for inventory cycles and seasonal cash flow gaps.

How Shree Finance Helps:
We evaluate your firm's GST returns, ITR filings, and banking turnover to negotiate collateral-free business loans up to ₹75 Lakhs with same-week disbursal.`,
                category: "Loans",
                coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                author: "Atharva Patharkar",
                authorRole: "Senior Financial Advisor",
                readTime: "6 min read",
                tags: ["Business Loan", "SME", "Overdraft", "Working Capital"],
                published: true,
                views: 89,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        const res = await db.collection('blogs').insertMany(sampleBlogs);
        console.log(`Successfully seeded ${res.insertedCount} initial articles into MongoDB.`);
    } finally {
        await mongoose.disconnect();
    }
}

seedInitialBlogs();
