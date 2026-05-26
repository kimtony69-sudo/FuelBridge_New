import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RegisterForm from "@/components/register/RegisterForm";

export const metadata = { title: "Register — FuelBridge ZA" };
export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-green-600 mb-2">Get Started</div>
          <h1 className="text-3xl mb-2">Register on FuelBridge</h1>
          <p className="text-ink-60 text-[15px]">Choose your role below. All listings are reviewed within 48 hours.</p>
        </div>
        <RegisterForm />
      </main>
      <Footer />
    </>
  );
}
