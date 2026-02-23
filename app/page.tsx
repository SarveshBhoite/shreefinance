import { HeroSection } from "@/components/home/hero-section";
import { PartnerLogos } from "@/components/home/partner-logos";
import { RateComparisonTable } from "@/components/home/rate-comparison-table";
import { ServicesSnapshot } from "@/components/home/services-snapshot";
import { EligibilityPreview } from "@/components/home/eligibility-preview";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PartnerLogos />
      <RateComparisonTable />
      <ServicesSnapshot />
      <EligibilityPreview />
    </>
  );
}
