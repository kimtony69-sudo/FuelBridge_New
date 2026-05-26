"use client";
import Link from "next/link";
import { Button } from "@/components/ui";
import { useState } from "react";
import { Send } from "lucide-react";
import { MOCK_SELLS, MOCK_BUYS, MOCK_NEGO_HISTORY } from "@/lib/mockData";
import type { NegoEvent } from "@/types";
import { cn } from "@/lib/utils";

const HERO_STATS = [
  { val: "1M+",    label: "Min. transaction (litres)" },
  { val: "R 0.10", label: "Commission per litre" },
  { val: "DMRE",   label: "Licensed parties only" },
  { val: "NCNDA",  label: "Legally protected intro" },
];

function PriceNegotiationWidget() {
  const [history, setHistory] = useState<NegoEvent[]>(MOCK_NEGO_HISTORY);
  const [inputPrice, setInputPrice] = useState("");
  const [showSellerResponse, setShowSellerResponse] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [adminNotified, setAdminNotified] = useState(false);
  const [negoPrice, setNegoPrice] = useState<number | null>(null);

  const sendCounter = () => {
    const val = parseFloat(inputPrice);
    if (!val || val <= 0) return;
    setNegoPrice(val);
    const t = new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" });
    setHistory(h => [...h, { timestamp: t, actor: "buyer", message: `Counter-offer: R ${val.toFixed(2)}/L`, price: val }]);
    setShowSellerResponse(true);
    setInputPrice("");
  };
  const accept = () => {
    setShowSellerResponse(false);
    setAgreed(true);
    const t = new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" });
    setHistory(h => [...h, { timestamp: t, actor: "seller", message: `✅ Accepted R ${negoPrice?.toFixed(2)}/L`, price: negoPrice ?? undefined }]);
  };
  const refuse = () => { setShowSellerResponse(false); setNegoPrice(null); };
  const notifyAdmin = () => {
    setAdminNotified(true);
    const t = new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" });
    setHistory(h => [...h, { timestamp: t, actor: "platform", message: "📧 Admin notified — IMFPA process initiated" }]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="px-5 py-3.5 bg-green-800 flex items-center justify-between">
        <span className="text-[13px] font-semibold text-green-100">💬 Price Negotiation</span>
        <span className="text-[11px] text-green-300">SELL-0041 × BUY-0087</span>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
            <div className="text-[10px] uppercase tracking-widest text-ink-40 mb-1">Seller Ask</div>
            <div className="font-mono text-[16px] font-bold text-red-600">
              R {agreed && negoPrice ? negoPrice.toFixed(2) : "23.20"}
            </div>
            <div className="text-[10px] text-ink-40 mt-0.5">5.0M L · CoC</div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-2.5">
            <div className="text-[10px] uppercase tracking-widest text-ink-40 mb-1">Buyer Bid</div>
            <div className="font-mono text-[16px] font-bold text-green-700">R 22.80</div>
            <div className="text-[10px] text-ink-40 mt-0.5">3.0M L</div>
          </div>
        </div>

        <div className="max-h-32 overflow-y-auto flex flex-col gap-1 mb-3 scrollbar-hide">
          {history.map((e, i) => (
            <div key={i} className="flex items-center gap-2 bg-ink-5 rounded px-2 py-1.5 text-[11px]">
              <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0",
                e.actor === "seller" ? "bg-red-500" : e.actor === "buyer" ? "bg-green-600" : "bg-blue-600")} />
              <span className="text-ink-60 flex-1">{e.message}</span>
              <span className="font-mono text-ink-40 text-[10px] flex-shrink-0">{e.timestamp}</span>
            </div>
          ))}
        </div>

        {!agreed && !adminNotified && (
          <>
            <div className="relative mb-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-ink-40">R</span>
              <input
                className="w-full pl-6 pr-10 py-2 text-[13px] border border-ink-10 rounded-lg focus:outline-none focus:border-green-600"
                type="number" step="0.01" placeholder="22.90"
                value={inputPrice} onChange={e => setInputPrice(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-ink-40">/L</span>
            </div>
            <button onClick={sendCounter}
              className="w-full flex items-center justify-center gap-2 bg-green-800 text-green-100 py-2 rounded-lg text-[13px] font-semibold hover:bg-green-700 transition-colors">
              <Send size={13}/> Send Counter-Offer
            </button>
            {showSellerResponse && (
              <div className="mt-2 flex gap-2">
                <button onClick={accept} className="flex-1 bg-green-700 text-white py-1.5 rounded-lg text-[12px] font-semibold hover:bg-green-800">✓ Accept</button>
                <button onClick={refuse} className="flex-1 bg-red-600 text-white py-1.5 rounded-lg text-[12px] font-semibold hover:bg-red-800">✗ Refuse</button>
              </div>
            )}
          </>
        )}
        {agreed && !adminNotified && (
          <div className="flex flex-col gap-2 mt-1">
            <div className="text-[12px] text-green-700 font-semibold bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              ✅ Price agreed at R {negoPrice?.toFixed(2)}/L
            </div>
            <button onClick={notifyAdmin}
              className="w-full flex items-center justify-center gap-2 bg-green-800 text-green-100 py-2 rounded-lg text-[12px] font-semibold hover:bg-green-700">
              📧 Notify Admin
            </button>
          </div>
        )}
        {adminNotified && (
          <div className="text-[12px] text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mt-1">
            ⏳ Admin notified — awaiting IMFPA signing & approval
          </div>
        )}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="bg-ink-80 text-white pt-20 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(29,110,74,.18) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
          {/* Left */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-green-600/15 border border-green-200/25 rounded-full px-4 py-1.5 mb-6">
              <span className="text-[12px] font-semibold tracking-widest uppercase text-green-200">
                South Africa&apos;s EN590 Bulk Fuel Platform
              </span>
            </div>
            <h1 className="text-white mb-5 leading-[1.12]">
              Trade EN590 Fuel<br />With{" "}
              <span className="text-green-400">Verified</span>{" "}
              Confidence
            </h1>
            <p className="text-ink-20 text-[17px] leading-[1.75] mb-8 max-w-[520px]">
              FuelBridge connects DMRE-licensed sellers and buyers for bulk EN590
              transactions of 1M+ litres. Anonymous matching, NCNDA-protected
              introductions, transparent referral commissions.
            </p>
            <div className="flex gap-3 flex-wrap mb-10">
              <Button size="lg" asChild>
                <Link href="/market">View Market Board</Link>
              </Button>
              <Button size="lg" className="bg-white/12 text-white border border-white/20 hover:bg-white/20" asChild>
                <Link href="/register">Register Now</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {HERO_STATS.map(s => (
                <div key={s.val} className="bg-white/6 border border-white/10 rounded-lg px-4 py-3">
                  <div className="font-mono text-[22px] font-bold text-white">{s.val}</div>
                  <div className="text-[11px] text-ink-40 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Price Negotiation widget */}
          <div className="hidden lg:block animate-fade-up-2 pt-4">
            <PriceNegotiationWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
