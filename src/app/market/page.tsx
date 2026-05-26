import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MarketBoard from "@/components/market/MarketBoard";

export const metadata = { title: "Market Board — FuelBridge ZA" };

export default function MarketPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <MarketBoard />
      </main>
      <Footer />
    </>
  );
}
