"use client";
import Link from "next/link";
import { Button } from "@/components/ui";
import { useState } from "react";
import { Send } from "lucide-react";
import { MOCK_SELLS, MOCK_BUYS } from "@/lib/mockData"; // NEGO_HISTORY는 이제 안 씁니다
import { cn } from "@/lib/utils";

function PriceNegotiationWidget() {
  const sellerData = MOCK_SELLS.find(s => s.anonymousId === "SELL-0041");
  const buyerData = MOCK_BUYS.find(b => b.anonymousId === "BUY-0087");

  // 가격이 바뀔 때마다 하단 내역도 자동으로 업데이트됩니다.
  const history = [
    { timestamp: "09:00", actor: "seller", message: `SELL-0041 listed at R ${sellerData?.pricePerLitre.toFixed(2)}/L` },
    { timestamp: "09:14", actor: "buyer", message: "BUY-0087 expressed interest" },
    { timestamp: "09:41", actor: "platform", message: "System synced with live market board" }
  ];

  const [inputPrice, setInputPrice] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [adminNotified, setAdminNotified] = useState(false);

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
              R {sellerData?.pricePerLitre.toFixed(2)}
            </div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-2.5">
            <div className="text-[10px] uppercase tracking-widest text-ink-40 mb-1">Buyer Bid</div>
            <div className="font-mono text-[16px] font-bold text-green-700">
              R {buyerData?.pricePerLitre.toFixed(2)}
            </div>
          </div>
        </div>

        {/* 이제 하단 내역도 위의 데이터와 실시간으로 연동됩니다 */}
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

// ... (하단 HeroSection 컴포넌트는 기존과 동일하게 유지)