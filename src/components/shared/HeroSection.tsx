"use client";
import Link from "next/link";
import { Button } from "@/components/ui";
import { useState } from "react";
import { Send } from "lucide-react";
import { MOCK_SELLS, MOCK_BUYS } from "@/lib/mockData";
import { cn } from "@/lib/utils";

function PriceNegotiationWidget() {
  const sellerData = MOCK_SELLS.find(s => s.anonymousId === "SELL-0041");
  const buyerData = MOCK_BUYS.find(b => b.anonymousId === "BUY-0087");

  const history = [
    { timestamp: "09:00", actor: "seller", message: `SELL-0041 listed at R ${sellerData?.pricePerLitre.toFixed(2)}/L` },
    { timestamp: "09:14", actor: "buyer", message: "BUY-0087 expressed interest" },
    { timestamp: "09:41", actor: "platform", message: "System synced with live market board" }
  ];

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
              R {sellerData?.pricePerLitre.toFixed(2) || "0.00"}
            </div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-2.5">
            <div className="text-[10px] uppercase tracking-widest text-ink-40 mb-1">Buyer Bid</div>
            <div className="font-mono text-[16px] font-bold text-green-700">
              R {buyerData?.pricePerLitre.toFixed(2) || "0.00"}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 mb-3">
          {history.map((e, i) => (
            <div key={i} className="flex items-center gap-2 bg-ink-5 rounded px-2 py-1.5 text-[11px]">
              <span className={cn("w-1.5 h-1.5 rounded-full", e.actor === "seller" ? "bg-red-500" : "bg-blue-600")} />
              <span className="text-ink-60 flex-1">{e.message}</span>
              <span className="font-mono text-ink-40 text-[10px]">{e.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const HERO_STATS = [
  { val: "1M+",   label: "Min. transaction (litres)" },
  { val: "R 0.10", label: "Commission per litre" },
  { val: "DMRE",   label: "Licensed parties only" },
  { val: "NCNDA",  label: "Legally protected intro" },
];

export default function HeroSection() {
  return (
    <section className="bg-ink-80 text-white pt-20 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
          <div className="animate-fade-up">
            <h1 className="text-white mb-5 text-4xl font-bold">Trade EN590 Fuel</h1>
            <p className="text-ink-20 mb-8">FuelBridge connects verified parties for bulk transactions.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {HERO_STATS.map(s => (
                <div key={s.val} className="bg-white/6 border border-white/10 rounded-lg px-3 py-3">
                  <div className="font-mono text-[20px] font-bold text-white">{s.val}</div>
                  <div className="text-[10px] text-ink-40 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block pt-4">
            <PriceNegotiationWidget />
          </div>
        </div>
      </div>
    </section>
  );
}