import { HeroSection } from "@/components/home/hero-section";
import { RateComparisonTable } from "@/components/home/rate-comparison-table";
import { ServicesSnapshot } from "@/components/home/services-snapshot";
import { PartnerLogos } from "@/components/home/partner-logos";
import { UniversalCalculator } from "@/components/home/universal-calculator";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { FloatingCTA } from "@/components/home/floating-cta";
import { QuoteFinderWizard } from "@/components/home/quote-finder-wizard";

export default function Home() {
  return (
    <>
      <HeroSection />
      <section className="py-12 container px-4 mx-auto">
        <QuoteFinderWizard />
      </section>
      <UniversalCalculator />
      <WhyChooseUs />
      <RateComparisonTable />
      <ServicesSnapshot />
      <PartnerLogos />
      <FloatingCTA />
    </>
  );
}
