import Link from "next/link";
import { Button, Alert } from "@/components/ui";

// ---- How It Works ----
const HOW_STEPS = [
  { n:"01", title:"Register & Verify",
    body:"Submit your DMRE wholesale licence and CIPC registration. Platform review within 48 hours." },
  { n:"02", title:"Post Anonymously",
    body:"List your volume, price, and preferred deal method (CoC or In-Tank Transfer). Displayed as an anonymous ID until introduction contract is signed." },
  { n:"03", title:"Negotiate & Agree",
    body:"Price negotiation within the platform. Once both sides accept, the platform administrator is notified and facilitates the IMFPA signing." },
  { n:"04", title:"Close the Deal",
    body:"Upon admin approval, identities are revealed. Parties exchange verification documents directly and proceed to settlement." },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold tracking-[.12em] uppercase text-green-600 mb-3">How It Works</p>
          <h2 className="mb-3">From listing to deal closure</h2>
          <p className="text-ink-60 text-[16px] leading-relaxed max-w-xl mx-auto">
            Structured stages, legally protected at every step.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-10 rounded-xl overflow-hidden border border-ink-10">
          {HOW_STEPS.map(s => (
            <div key={s.n} className="bg-white p-7">
              <div className="flex items-center gap-2 mb-4">
                <span className="block w-5 h-px bg-green-600" />
                <span className="font-mono text-[11px] font-bold text-green-600 tracking-widest">{s.n}</span>
              </div>
              <h4 className="mb-2 text-[15px]">{s.title}</h4>
              <p className="text-[13px] text-ink-60 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Commission ---- (scenario table removed per request)
export function CommissionSection() {
  return (
    <section className="py-20 bg-ink-5" id="commission">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] font-semibold tracking-[.12em] uppercase text-green-600 mb-3">Commission Structure</p>
            <h2 className="mb-3">Transparent. Fair. Protected.</h2>
            <p className="text-ink-60 text-[16px] leading-relaxed max-w-lg">
              R 0.10 per litre, paid by the seller at deal close.
              Referrals earn R 0.02/L for each verified party they introduce.
            </p>
          </div>
          <Button variant="secondary" asChild>
            <Link href="/register?role=intermediary">Become an Intermediary</Link>
          </Button>
        </div>

        {/* Visual flow — no scenario table */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_32px_1fr_32px_1fr] gap-4 items-center">
          <div className="bg-white border border-ink-10 rounded-xl p-5 text-center shadow-sm">
            <div className="text-[10px] uppercase tracking-widest text-ink-40 mb-2">Seller Pays</div>
            <div className="font-mono text-2xl font-bold text-green-800">R 0.10/L</div>
            <div className="text-[11px] text-ink-40 mt-1">Total commission</div>
          </div>
          <div className="text-center text-2xl text-ink-20 hidden md:block">→</div>
          <div className="bg-white border border-ink-10 rounded-xl p-5 text-center shadow-sm">
            <div className="text-[10px] uppercase tracking-widest text-ink-40 mb-2">Platform</div>
            <div className="font-mono text-2xl font-bold text-blue-600">R 0.06/L</div>
            <div className="text-[11px] text-ink-40 mt-1">Base platform fee</div>
          </div>
          <div className="text-center text-2xl text-ink-20 hidden md:block">+</div>
          <div className="flex flex-col gap-3">
            {["Seller-side Referral","Buyer-side Referral"].map(t => (
              <div key={t} className="bg-white border border-ink-10 rounded-xl p-4 text-center shadow-sm">
                <div className="text-[10px] uppercase tracking-widest text-ink-40 mb-1">{t}</div>
                <div className="font-mono text-xl font-bold text-gold-500">R 0.02/L</div>
                <div className="text-[11px] text-ink-40 mt-0.5">If party was introduced</div>
              </div>
            ))}
          </div>
        </div>

        <Alert variant="amber" icon="💡" className="mt-6">
          <strong>No referral on a side?</strong> That R 0.02/L flows back to the platform.
          Referral commission is paid within 3 business days of platform fee receipt.
          IMFPA signatures lock all commission obligations legally.
        </Alert>
      </div>
    </section>
  );
}

// ---- Trust ----
const TRUST_ITEMS = [
  { icon:"🏛️", title:"DMRE Licensed Only",
    body:"Every participant must hold a valid DMRE Wholesale Licence, verified against CIPC registration before any listing goes live." },
  { icon:"📄", title:"NCNDA / IMFPA Protected",
    body:"Introductions are legally bound. The platform administrator facilitates IMFPA signing before identities are revealed. Off-platform trades breach signed contracts." },
  { icon:"🔒", title:"Anonymous Until Approved",
    body:"Company names and contacts are never exposed before the administrator approves the introduction. Only anonymous IDs and broad regions are visible on the public board." },
  { icon:"📋", title:"Platform as Introducer",
    body:"FuelBridge is an introduction platform only — not a principal to any transaction. All liability for product quality, payment, and delivery rests with the contracting parties." },
  { icon:"⚠️", title:"Document Disclaimer",
    body:"Parties exchange verification documents (POP, POF, Dip Test, etc.) directly between themselves. The platform does not verify the authenticity of those documents and accepts no liability." },
  { icon:"🛡️", title:"POPIA Compliant",
    body:"All personal and company data is stored and processed in accordance with South Africa's Protection of Personal Information Act (POPIA)." },
];

export function TrustSection() {
  return (
    <section className="py-20 bg-ink-80 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold tracking-[.12em] uppercase text-green-400 mb-3">Compliance &amp; Legal Protection</p>
          <h2 className="text-white mb-3">Built for South Africa&apos;s fuel trade</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TRUST_ITEMS.map(t => (
            <div key={t.title} className="bg-white/6 border border-white/10 rounded-xl p-6">
              <div className="text-3xl mb-4">{t.icon}</div>
              <h4 className="text-white mb-2">{t.title}</h4>
              <p className="text-[13px] text-ink-40 leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- CTA ----
const CTA_CARDS = [
  { icon:"🏭", title:"I have fuel to sell",
    desc:"List your EN590 volume, price, and deal method. Reach verified buyers.", href:"/register?role=seller" },
  { icon:"💼", title:"I want to buy fuel",
    desc:"Post your volume, bid price, and deal method. Get matched with DMRE-verified sellers.", href:"/register?role=buyer" },
  { icon:"🤝", title:"I know a buyer or seller",
    desc:"Register their details, earn R 0.02/litre referral commission when a deal closes.", href:"/register?role=intermediary" },
];

export function CTASection() {
  return (
    <section className="py-20 bg-green-800 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-white mb-3">Ready to trade?</h2>
        <p className="text-green-200 text-[17px] mb-10">Register in minutes. Listed within 48 hours.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
          {CTA_CARDS.map(c => (
            <Link key={c.title} href={c.href}
              className="block bg-white/10 border border-white/15 rounded-xl p-5 hover:bg-white/18 transition-all hover:-translate-y-0.5 no-underline">
              <div className="text-2xl mb-3">{c.icon}</div>
              <div className="text-[14px] font-semibold text-white mb-2">{c.title}</div>
              <div className="text-[12px] text-green-200 leading-relaxed">{c.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
