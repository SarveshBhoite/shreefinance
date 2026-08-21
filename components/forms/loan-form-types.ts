import { LucideIcon, Coins, Home as HomeIcon, Car, Briefcase, Building, GraduationCap } from "lucide-react";

export type LoanCategoryType = "personal" | "home" | "car" | "business" | "lap" | "education";

export interface LoanCategoryConfig {
    id: LoanCategoryType;
    name: string;
    headline: string;
    rate: string;
    rateNum: number;
    defaultAmount: number;
    tenureYears: number;
    icon: LucideIcon;
    amountPresets: number[];
    requiredDocuments: string[];
}

export const LOAN_CATEGORIES: Record<LoanCategoryType, LoanCategoryConfig> = {
    personal: {
        id: "personal",
        name: "Personal Loan",
        headline: "Compare Personal Loan Offers from Top Banks & get e-Approved & your Free CIBIL score Instantly.",
        rate: "10.25%",
        rateNum: 10.25,
        defaultAmount: 500000,
        tenureYears: 5,
        icon: Coins,
        amountPresets: [100000, 300000, 500000, 1000000, 2000000],
        requiredDocuments: [
            "Aadhaar Card",
            "PAN Card",
            "Last 3 months' salary slips",
            "Last 6 months' bank statements",
            "Passport-size photo"
        ]
    },
    home: {
        id: "home",
        name: "Home Loan",
        headline: "Compare Home Loan Offers from Top Banks & get e-Approved & your Free CIBIL score Instantly.",
        rate: "8.35%",
        rateNum: 8.35,
        defaultAmount: 4500000,
        tenureYears: 20,
        icon: HomeIcon,
        amountPresets: [2000000, 3500000, 5000000, 7500000, 15000000],
        requiredDocuments: [
            "PAN Card & Aadhaar Card",
            "Passport-size photos",
            "Co-applicant KYC",
            "Last 3 months' salary slips",
            "Registered Sale Agreement / Allotment Letter",
            "Approved Building Plan & RERA certificate"
        ]
    },
    car: {
        id: "car",
        name: "Car Loan",
        headline: "Compare Car Loan Offers from Top Banks & get e-Approved & your Free CIBIL score Instantly.",
        rate: "8.75%",
        rateNum: 8.75,
        defaultAmount: 800000,
        tenureYears: 5,
        icon: Car,
        amountPresets: [400000, 800000, 1200000, 1800000, 2500000],
        requiredDocuments: [
            "PAN Card & Aadhaar Card",
            "Passport-size photo",
            "Salaried: Last 3 months' salary slips + 6 months' bank statements + Form 16",
            "Driving Licence"
        ]
    },
    business: {
        id: "business",
        name: "Business Loan",
        headline: "Compare Business Loan Offers from Top Banks & get e-Approved & your Free CIBIL score Instantly.",
        rate: "13.99%",
        rateNum: 13.99,
        defaultAmount: 2000000,
        tenureYears: 5,
        icon: Briefcase,
        amountPresets: [500000, 1000000, 2000000, 3500000, 5000000],
        requiredDocuments: [
            "PAN Card (Applicant & Business entity)",
            "Aadhaar Card / Passport / Voter ID",
            "GST Registration Certificate",
            "Passport-size photographs",
            "Last 2–3 years' ITR with computation of income",
            "Audited Balance Sheet & P&L Statement (certified by CA)",
            "Last 6 to 12 months' Current Bank Account statements",
            "Latest GST Returns (GSTR-3B / GSTR-1)"
        ]
    },
    lap: {
        id: "lap",
        name: "Loan Against Property",
        headline: "Compare Loan Against Property Offers from Top Banks & get e-Approved & your Free CIBIL score Instantly.",
        rate: "9.25%",
        rateNum: 9.25,
        defaultAmount: 6000000,
        tenureYears: 15,
        icon: Building,
        amountPresets: [2500000, 5000000, 10000000, 20000000, 50000000],
        requiredDocuments: [
            "PAN Card (Mandatory)",
            "Aadhaar Card / Passport / Voter ID",
            "Last 3 months' salary slips",
            "Last 6 months' salary bank statements",
            "GST Certificate (if business / self-employed)",
            "Passport-size photos"
        ]
    },
    education: {
        id: "education",
        name: "Education Loan",
        headline: "Compare Education Loan Offers from Top Banks & get e-Approved & your Free CIBIL score Instantly.",
        rate: "9.50%",
        rateNum: 9.50,
        defaultAmount: 1500000,
        tenureYears: 10,
        icon: GraduationCap,
        amountPresets: [500000, 1000000, 2000000, 3500000, 5000000],
        requiredDocuments: [
            "PAN Card & Aadhaar Card (KYC)",
            "10th, 12th, and graduation marksheets / degree",
            "Last 3 months' salary slips (if salaried)",
            "Last 6 months' bank statements",
            "Last 6 months' salary bank statements",
            "Passport-size photos"
        ]
    }
};

export interface Step1BasicInfo {
    loanAmount: number;
    employmentStatus: "Salaried" | "Self-Employed";
    city: string;
    firstName: string;
    mobile: string;
    email: string;
}

export function formatIndianCurrencyWords(num: number): string {
    if (!num || isNaN(num)) return "Rs. Zero";
    if (num >= 10000000) return `Rs. ${(num / 10000000).toFixed(2)} Crore(s)`;
    if (num >= 100000) return `Rs. ${(num / 100000).toFixed(2)} Lakh(s)`;
    return `Rs. ${num.toLocaleString("en-IN")}`;
}
