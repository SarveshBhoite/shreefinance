import {
    CreditCard,
    Home,
    Car,
    Briefcase,
    GraduationCap,
    Landmark,
    Shield,
    TrendingUp,
    Building2,
    Calculator,
    ArrowLeftRight,
    Users,
    Percent,
    FileText,
} from "lucide-react";

export const megaMenuData = {
    loans: {
        title: "Loans",
        items: [
            {
                title: "Personal Loan",
                href: "/loans/personal-loan",
                icon: Briefcase,
                rate: "10.25% p.a.",
                desc: "Quick funds for personal needs"
            },
            {
                title: "Home Loan",
                href: "/loans/home-loan",
                icon: Home,
                rate: "8.35% p.a.",
                desc: "Buy or construct your dream home"
            },
            {
                title: "Loan Against Property",
                href: "/loans/loan-against-property",
                icon: Building2,
                rate: "9.25% p.a.",
                desc: "High-value loan against property"
            },
            {
                title: "Car Loan",
                href: "/loans/car-loan",
                icon: Car,
                rate: "8.75% p.a.",
                desc: "Drive home your new car today"
            },
            {
                title: "Business Loan",
                href: "/loans/business-loan",
                icon: Landmark,
                rate: "13.99% p.a.",
                desc: "Expand your business horizons"
            },
            {
                title: "Education Loan",
                href: "/loans/education-loan",
                icon: GraduationCap,
                rate: "9.50% p.a.",
                desc: "Invest in higher education"
            },
            {
                title: "Government Schemes",
                href: "/loans/government-schemes",
                icon: Landmark,
                rate: "Subsidies & Grants",
                desc: "PMAY, Mudra & more"
            },
        ]
    },
    tools: {
        title: "Compare & Partner",
        items: [
            {
                title: "Compare All Loans",
                href: "/compare",
                icon: ArrowLeftRight,
                rate: "Live Rate Matrix",
                desc: "Compare 40+ top Indian banks"
            },
            {
                title: "Become a Partner (DSA)",
                href: "/partner",
                icon: Users,
                rate: "Earn 2.5% Payout",
                desc: "Join channel partner network"
            },
            {
                title: "Payout Structure",
                href: "/payout-structure",
                icon: Percent,
                rate: "Up to 2.5% Commission",
                desc: "DSA slab payouts & bonuses"
            },
            {
                title: "Required Documents",
                href: "/documents-required",
                icon: FileText,
                rate: "Check Checklist",
                desc: "KYC, Income & Bank proofs"
            },
            {
                title: "All Calculators",
                href: "/calculators",
                icon: Calculator,
                rate: "Instant EMI Tools",
                desc: "EMI, HLBT & Tax calculators"
            },
        ]
    },
    cards: {
        title: "Cards",
        items: [
            {
                title: "Credit Cards",
                href: "/cards/credit-cards",
                icon: CreditCard,
                rate: "Rewards & Cashback",
                desc: "Compare best credit cards"
            },
            {
                title: "Business Cards",
                href: "/cards/business-cards",
                icon: Briefcase,
                rate: "Premium Perks",
                desc: "For corporate expenses"
            },
        ]
    },
    insurance: {
        title: "Insurance",
        items: [
            {
                title: "Life Insurance",
                href: "/insurance/life",
                icon: Shield,
                rate: "Cover upto 1Cr",
                desc: "Secure your family's future"
            },
            {
                title: "Health Insurance",
                href: "/insurance/health",
                icon: Shield,
                rate: "Cashless Claims",
                desc: "Protect against medical bills"
            },
            {
                title: "Vehicle Insurance",
                href: "/insurance/vehicle",
                icon: Car,
                rate: "Instant Policy",
                desc: "Mandatory third-party cover"
            },
        ]
    },
    investments: {
        title: "Investments",
        items: [
            {
                title: "Mutual Funds",
                href: "/investments/mutual-funds",
                icon: TrendingUp,
                rate: "High Returns",
                desc: "SIP starting ₹500"
            },
            {
                title: "Stocks",
                href: "/investments/stocks",
                icon: TrendingUp,
                rate: "Zero Brokerage",
                desc: "Invest in top companies"
            },
        ]
    }
};
