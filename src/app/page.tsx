import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/shared/HeroSection";
import HowItWorks from "@/components/shared/HowItWorks";
import CommissionSection from "@/components/shared/CommissionSection";
import TrustSection from "@/components/shared/TrustSection";
import CTASection from "@/components/shared/CTASection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <CommissionSection />
        <section className="my-12 p-8 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Why Choose FuelBridge?</h2>
          <p className="text-gray-700 leading-relaxed">
            Unlike traditional fuel trading, FuelBridge eliminates counterparty risk by enforcing 
            strict DMRE verification for every participant. We provide a transparent, legally 
            protected ecosystem for bulk diesel transactions in Gauteng and across South Africa.
          </p>
        </section>
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}