"use client";
import { useState } from "react";
import Link from "next/link";
import { MOCK_SELLS, MOCK_BUYS } from "@/lib/mockData";
import { Badge, Button, Alert } from "@/components/ui";
import { fmtVol } from "@/types";
import { cn } from "@/lib/utils";
import { ArrowRight, Lock, Info } from "lucide-react";

// ---- Stat bar ----
function StatBar() {
  const totalSellVol = MOCK_SELLS.reduce((s, l) => s + l.volumeLitres, 0);
  const totalBuyVol  = MOCK_BUYS.reduce((s, l)  => s + l.volumeLitres, 0);
  const lowestSell   = Math.min(...MOCK_SELLS.map(s => s.pricePerLitre));
  const highestBuy   = Math.max(...MOCK_BUYS.map(b => b.pricePerLitre));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink-10 rounded-xl overflow-hidden border border-ink-10 mb-5">
      {[
        { label:"Lowest Sell Offer",  val:`R ${lowestSell.toFixed(2)}`, cls:"text-red-600" },
        { label:"Highest Buy Bid",    val:`R ${highestBuy.toFixed(2)}`, cls:"text-green-700" },
        { label:"Total Sell Volume",  val:fmtVol(totalSellVol) },
        { label:"Total Buy Volume",   val:fmtVol(totalBuyVol) },
      ].map(s => (
        <div key={s.label} className="bg-white px-4 py-3.5">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-40 mb-1.5">{s.label}</div>
          <div className={cn("font-mono text-xl font-bold", s.cls || "text-ink")}>{s.val}</div>
        </div>
      ))}
    </div>
  );
}

// ---- Reveal stages ----
const REVEAL_STAGES = [
  { stage:1, label:"Public View",
    fields:[
      { key:"Company",    masked:true,  val:"—" },
      { key:"Region",     masked:false, val:"KZN", partial:true },
      { key:"Volume",     masked:false, val:"5.0M L" },
      { key:"Price",      masked:false, val:"R 24.20" },
      { key:"Method",     masked:false, val:"CoC" },
    ]},
  { stage:2, label:"After Interest",
    fields:[
      { key:"Company",    masked:true,  val:"—" },
      { key:"City",       masked:false, val:"Durban, KZN" },
      { key:"Volume",     masked:false, val:"5.0M L" },
      { key:"Price",      masked:false, val:"R 24.20" },
      { key:"Method",     masked:false, val:"CoC" },
    ]},
  { stage:3, label:"After Admin Approval",
    fields:[
      { key:"Company",    masked:false, val:"Petrolink SA" },
      { key:"Location",   masked:false, val:"Vopak Durban" },
      { key:"Contact",    masked:false, val:"J. Dlamini" },
      { key:"Phone",      masked:false, val:"+27 31 555 1234" },
      { key:"Price",      masked:false, val:"R 24.00 (agreed)" },
    ]},
  { stage:4, label:"Direct Doc Exchange",
    fields:[
      { key:"POP / POF",  masked:false, val:"Direct between parties" },
      { key:"Dip Test",   masked:false, val:"Party responsibility" },
      { key:"ICPO",       masked:false, val:"Buyer → Seller" },
      { key:"Platform",   masked:false, val:"No liability on docs" },
    ]},
];

// ---- Order row ----
function OrderRow({ item, type, onInterest }: {
  item: typeof MOCK_SELLS[0] | typeof MOCK_BUYS[0];
  type: "sell" | "buy";
  onInterest: () => void;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,.8fr)_minmax(0,.8fr)_minmax(0,.7fr)_28px]
                    items-center px-4 py-2.5 border-b border-ink-5 last:border-0
                    hover:bg-ink-5 transition-colors cursor-pointer group">
      <div>
        <div className="font-mono text-[12px] font-semibold text-ink-60">{item.anonymousId}</div>
        <div className="text-[11px] text-ink-40 mt-0.5">{item.region}</div>
      </div>
      <div className="text-right">
        <div className="font-mono text-[12px] font-semibold text-ink">{fmtVol(item.volumeLitres)}</div>
        <div className="text-[10px] text-ink-40">
          {"minVolumeLitres" in item ? `min ${fmtVol(item.minVolumeLitres)}` : item.dealPeriod}
        </div>
      </div>
      <div className="text-right">
        <div className={cn("font-mono text-[13px] font-bold",
          type === "sell" ? "text-red-600" : "text-green-700")}>
          R {item.pricePerLitre.toFixed(2)}
        </div>
      </div>
      <div className="text-center">
        <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded",
          item.dealMethod === "CoC" ? "bg-blue-100 text-blue-700" : "bg-purple-50 text-purple-700")}>
          {item.dealMethod === "CoC" ? "CoC" : "ITT"}
        </span>
      </div>
      <button onClick={onInterest}
        className="w-6 h-6 rounded flex items-center justify-center border border-ink-10 text-ink-40
                   hover:bg-green-100 hover:border-green-200 hover:text-green-700 transition-all
                   opacity-0 group-hover:opacity-100">
        <ArrowRight size={12} />
      </button>
    </div>
  );
}

// ---- Board panel ----
function BoardPanel({ title, items, type, accent, onInterest }: {
  title: string;
  items: typeof MOCK_SELLS | typeof MOCK_BUYS;
  type: "sell" | "buy";
  accent: string;
  onInterest: () => void;
}) {
  return (
    <div className="border border-ink-10 rounded-xl overflow-hidden">
      <div className={cn("px-4 py-3 flex items-center justify-between border-b border-ink-10", accent)}>
        <div className="text-[13px] font-semibold text-ink">{title}</div>
        <Badge variant={type === "sell" ? "red" : "green"}>
          {items.filter(i => i.status === "verified").length} verified
        </Badge>
      </div>
      <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,.8fr)_minmax(0,.8fr)_minmax(0,.7fr)_28px]
                      px-4 py-1.5 border-b border-ink-5">
        {["ID / Region", "Volume", "Price", "Method", ""].map((h, i) => (
          <div key={i} className={cn("text-[10px] font-semibold uppercase tracking-widest text-ink-40",
            i > 0 && i < 4 ? "text-right" : "")}>
            {h}
          </div>
        ))}
      </div>
      {items.map(item => (
        <OrderRow key={item.id} item={item} type={type} onInterest={onInterest} />
      ))}
    </div>
  );
}

// ---- Interest Modal ----
function InterestModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-5" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-5">
          <h3>Express Interest</h3>
          <button onClick={onClose} className="text-ink-40 hover:text-ink text-xl leading-none">✕</button>
        </div>
        <Alert variant="blue" icon={<Info size={14}/>} className="mb-4">
          You must be a verified platform member.{" "}
          <Link href="/register" className="font-semibold text-blue-600">Register here</Link> if you haven&apos;t already.
        </Alert>
        <div className="flex flex-col gap-4 mb-5">
          <div>
            <label className="text-[12px] font-medium text-ink-60 block mb-1">Your Listing ID</label>
            <input className="w-full px-3 py-2 text-[13px] border border-ink-10 rounded-lg focus:outline-none focus:border-green-600"
              placeholder="e.g. BUY-0087" />
          </div>
          <div>
            <label className="text-[12px] font-medium text-ink-60 block mb-1">Message (optional)</label>
            <textarea className="w-full px-3 py-2 text-[13px] border border-ink-10 rounded-lg resize-none" rows={3} />
          </div>
        </div>
        <Alert variant="amber" icon="⚠️" className="mb-5">
          Commission obligation applies if a deal is introduced through this platform.
        </Alert>
        <Button className="w-full justify-center" onClick={onClose}>Submit Interest</Button>
      </div>
    </div>
  );
}

// ---- Main export ----
export default function MarketBoard() {
  const [modalOpen,    setModalOpen]    = useState(false);
  const [activeReveal, setActiveReveal] = useState(1);

  return (
    <>
      {/* Page header */}
      <div className="pb-6 border-b border-ink-10 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-green-600 mb-1">Live Market</div>
            <h1 className="text-3xl mb-1">EN590 Market Board</h1>
            <p className="text-[15px] text-ink-60">
              Verified listings · Identities protected until admin-approved IMFPA signed
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="green">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse2 inline-block mr-1" />
              Live
            </Badge>
            <Button asChild><Link href="/register">Post a Listing</Link></Button>
          </div>
        </div>
      </div>

      <StatBar />

      {/* Reveal stages */}
      <div className="border border-ink-10 rounded-xl overflow-hidden mb-6">
        <div className="px-4 py-2.5 bg-ink-5 border-b border-ink-10 flex items-center gap-2">
          <Lock size={13} className="text-ink-40" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-ink-60">
            Information Reveal Stages — click to preview
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {REVEAL_STAGES.map(rs => (
            <div key={rs.stage} onClick={() => setActiveReveal(rs.stage)}
              className={cn("p-3 border-r border-ink-10 last:border-0 cursor-pointer transition-colors",
                activeReveal === rs.stage ? "bg-green-50" : "hover:bg-ink-5")}>
              <div className="font-mono text-[10px] text-ink-40 mb-1">STAGE {rs.stage}</div>
              <div className="text-[11px] font-semibold text-ink mb-2">{rs.label}</div>
              {rs.fields.map(f => (
                <div key={f.key} className="text-[10px] text-ink-40 mb-1">
                  {f.key}:&nbsp;
                  {f.masked
                    ? <span className="inline-block bg-ink-10 rounded w-14 h-3 align-middle" />
                    : <span className={cn("font-medium",
                        "partial" in f && f.partial ? "text-ink-60" : "text-ink")}>{f.val}</span>
                  }
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Boards — full width, two columns, no sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <BoardPanel
          title="🏭 Sell Offers"
          items={MOCK_SELLS} type="sell"
          accent="bg-red-50/60"
          onInterest={() => setModalOpen(true)}
        />
        <BoardPanel
          title="💼 Buy Bids"
          items={MOCK_BUYS} type="buy"
          accent="bg-green-50/60"
          onInterest={() => setModalOpen(true)}
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-[12px] text-ink-60 pb-4">
        <span className="flex items-center gap-1.5">
          <Badge variant="green">V</Badge> Verified — docs confirmed
        </span>
        <span className="flex items-center gap-1.5">
          <Badge variant="amber">P</Badge> Pending — under review
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">CoC</span>
          Certificate of Conformity
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-purple-50 text-purple-700">ITT</span>
          In-Tank Transfer
        </span>
        <span className="flex items-center gap-1.5">
          <Lock size={13}/> Names revealed only after admin-approved IMFPA
        </span>
      </div>

      <InterestModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
