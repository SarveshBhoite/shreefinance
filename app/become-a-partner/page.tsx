import PartnerProgramPage from "@/app/partner/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Become a Partner (DSA) | Shree Finance",
    description: "Join Shree Finance Channel Partner Program. Earn highest commission payouts up to 2.5% on home loans, personal loans, and business loans across 40+ partner banks."
};

export default function BecomeAPartnerPage() {
    return <PartnerProgramPage />;
}
