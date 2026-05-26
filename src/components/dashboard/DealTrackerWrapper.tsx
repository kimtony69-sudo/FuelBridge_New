import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DealTracker from "./DealTracker";

export default function DealTrackerWrapper() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Admin-only banner */}
        <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-gold-100 border border-gold-400/40 rounded-xl">
          <span className="text-xl">🔐</span>
          <div>
            <div className="font-semibold text-[13px] text-gold-700">Administrator View</div>
            <div className="text-[12px] text-gold-700/80">
              This page is restricted to platform administrators only (kimtony.69@gmail.com).
              It is not accessible to the public.
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-green-600 mb-2">Admin Dashboard</div>
          <h1 className="text-3xl mb-2">Deal Tracker</h1>
          <p className="text-ink-60 text-[15px]">
            Manage all active deals. Send IMFPA to sellers. Approve identity reveals.
          </p>
        </div>
        <DealTracker />
      </main>
      <Footer />
    </>
  );
}
