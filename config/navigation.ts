import {
    CreditCard,
    Home,
    Car,
    Briefcase,
    GraduationCap,
    Landmark,
    Shield,
    TrendingUp,
} from "lucide-react";

export const megaMenuData = {
    loans: {
        title: "Loans",
        items: [
            {
                title: "Personal Loan",
                href: "/loans/personal-loan",
                icon: Briefcase,
                rate: "10.50% p.a.",
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
                title: "Car Loan",
                href: "/loans/car-loan",
                icon: Car,
                rate: "8.85% p.a.",
                desc: "Drive home your new car today"
            },
            {
                title: "Education Loan",
                href: "/loans/education-loan",
                icon: GraduationCap,
                rate: "9.50% p.a.",
                desc: "Invest in your future"
            },
            {
                title: "Business Loan",
                href: "/loans/business-loan",
                icon: Landmark,
                rate: "15% p.a.",
                desc: "Expand your business horizons"
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
                rate: "Zero Brokrage",
                desc: "Invest in top companies"
            },
        ]
    }
};
