import { HeroSection } from "@/components/home/hero-section";
import { RateComparisonTable } from "@/components/home/rate-comparison-table";
import { PartnerLogos } from "@/components/home/partner-logos";
import { UniversalCalculator } from "@/components/home/universal-calculator";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { FloatingCTA } from "@/components/home/floating-cta";
import { HomeEligibilityForm } from "@/components/home/home-eligibility-form";
import { Deal4LoansQuickHub } from "@/components/home/deal4loans-quick-hub";

export default function Home() {
  return (
    <>
      <HeroSection />
      <section className="py-12 container px-4 mx-auto scroll-mt-24" id="eligibility-check">
        <HomeEligibilityForm />
      </section>
      <UniversalCalculator />
      <Deal4LoansQuickHub />
      <RateComparisonTable />
      <WhyChooseUs />
      <PartnerLogos />
      <FloatingCTA />
    </>
  );
}
