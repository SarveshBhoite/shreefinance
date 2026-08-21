export type LoanTypeKey = "personal" | "home" | "car" | "business" | "lap" | "education";

export const LOAN_DOCUMENTS_MAP: Record<LoanTypeKey, string[]> = {
    personal: [
        "Aadhaar Card",
        "PAN Card",
        "Last 3 months' salary slips",
        "Last 6 months' bank statements",
        "Passport-size photo"
    ],
    home: [
        "PAN Card & Aadhaar Card",
        "Passport-size photos",
        "Co-applicant KYC",
        "Last 3 months' salary slips",
        "Registered Sale Agreement / Allotment Letter",
        "Approved Building Plan & RERA certificate"
    ],
    car: [
        "PAN Card & Aadhaar Card",
        "Passport-size photo",
        "Salaried: Last 3 months' salary slips + 6 months' bank statements + Form 16",
        "Driving Licence"
    ],
    business: [
        "PAN Card (Applicant & Business entity)",
        "Aadhaar Card / Passport / Voter ID",
        "GST Registration Certificate",
        "Passport-size photographs",
        "Last 2–3 years' ITR with computation of income",
        "Audited Balance Sheet & P&L Statement (certified by CA)",
        "Last 6 to 12 months' Current Bank Account statements",
        "Latest GST Returns (GSTR-3B / GSTR-1)"
    ],
    lap: [
        "PAN Card (Mandatory)",
        "Aadhaar Card / Passport / Voter ID",
        "Last 3 months' salary slips",
        "Last 6 months' salary bank statements",
        "GST Certificate (if business / self-employed)",
        "Passport-size photos"
    ],
    education: [
        "PAN Card & Aadhaar Card (KYC)",
        "10th, 12th, and graduation marksheets / degree",
        "Last 3 months' salary slips (if salaried)",
        "Last 6 months' bank statements",
        "Last 6 months' salary bank statements",
        "Passport-size photos"
    ]
};
