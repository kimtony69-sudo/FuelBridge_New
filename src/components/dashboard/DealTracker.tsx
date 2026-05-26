"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button, Alert, Badge, Card, Divider } from "@/components/ui";
import { cn } from "@/lib/utils";
import { fmtRand, fmtVol, calcCommission, ADMIN_EMAIL, type DealStage } from "@/types";
import { MOCK_DEAL } from "@/lib/mockData";
import { Check, ChevronLeft, ChevronRight, Mail } from "lucide-react";

const STAGES: { id: DealStage; label: string; short: string }[] = [
  { id:"negotiation",    label:"Price Negotiation",        short:"Negotiate" },
  { id:"admin_review",   label:"Admin Notified",           short:"Admin" },
  { id:"imfpa_signing",  label:"IMFPA Sent to Seller",     short:"IMFPA" },
  { id:"admin_approval", label:"Admin Approves",           short:"Approve" },
  { id:"identity_reveal",label:"Identities Revealed",      short:"Reveal" },
  { id:"doc_exchange",   label:"Direct Doc Exchange",      short:"Docs" },
  { id:"payment",        label:"Invoice & Payment",        short:"Payment" },
  { id:"title_transfer", label:"Title Transfer",           short:"Title" },
  { id:"fee_settlement", label:"Fee Settlement",           short:"Fee" },
];

function StageNav({ current }: { current: number }) {
  return (
    <div className="grid gap-px bg-ink-10 rounded-xl overflow-hidden border border-ink-10 mb-6"
      style={{ gridTemplateColumns: `repeat(${STAGES.length}, 1fr)` }}>
      {STAGES.map((s, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <div key={s.id} className={cn("px-1 py-3 text-center",
            done ? "bg-green-50" : active ? "bg-green-800" : "bg-white opacity-60")}>
            <div className={cn(
              "w-5 h-5 rounded-full mx-auto mb-1 flex items-center justify-center text-[10px] font-bold",
              done ? "bg-green-600 text-white" :
              active ? "bg-green-200 text-green-900" : "bg-ink-10 text-ink-40")}>
              {done ? <Check size={10}/> : i+1}
            </div>
            <div className={cn("text-[9px] font-medium leading-tight",
              active ? "text-green-200" : done ? "text-green-700" : "text-ink-40")}>
              {s.short}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---- Stage 1: Negotiation ----
function StageNegotiation({ agreedPrice }: { agreedPrice: number }) {
  return (
    <div className="flex flex-col gap-4">
      <ResponsibilityBar
        platform="Provides negotiation channel · logs all events"
        parties="All price decisions are between buyer and seller"
        admin="Notified when price is agreed"
      />
      <div className="grid grid-cols-2 gap-4">
        <InfoBox label="Agreed Price" val={`R ${agreedPrice.toFixed(2)}/L`} cls="text-red-600" />
        <InfoBox label="Volume" val={fmtVol(MOCK_DEAL.agreedVolume)} />
      </div>
      <Alert variant="green" icon="✅">
        <strong>Price agreed at R {agreedPrice.toFixed(2)}/L.</strong> Both parties confirmed via platform.
        Proceed to notify admin.
      </Alert>
      <Disclaimer>
        Platform provides negotiation channel only. Price decisions rest with the parties.
        Commission obligation is triggered upon IMFPA signature.
      </Disclaimer>
    </div>
  );
}

// ---- Stage 2: Admin Review ----
function StageAdminReview({ onNext }: { onNext: () => void }) {
  const [sent, setSent] = useState(false);
  const send = () => {
    setSent(true);
    toast.success(`Deal notification sent to ${ADMIN_EMAIL}`);
    setTimeout(onNext, 1200);
  };
  return (
    <div className="flex flex-col gap-4">
      <Alert variant="amber" icon="📧">
        Both buyer and seller have agreed on a price. The platform has automatically
        notified the administrator at <strong>{ADMIN_EMAIL}</strong>.
      </Alert>
      <Card>
        <h4 className="mb-3 text-[14px]">📋 Notification to Administrator</h4>
        <div className="bg-ink-5 border border-ink-10 rounded-lg p-4 font-mono text-[12px] text-ink-60 mb-4">
          <div><strong>To:</strong> {ADMIN_EMAIL}</div>
          <div><strong>Subject:</strong> FuelBridge — Price Agreed: FB-2026-0041</div>
          <div className="mt-2 text-[11px] leading-relaxed">
            Deal FB-2026-0041 has reached price agreement.<br/>
            SELL-0041 × BUY-0087 · R {MOCK_DEAL.agreedPrice.toFixed(2)}/L · {fmtVol(MOCK_DEAL.agreedVolume)}<br/>
            Please send the IMFPA to the seller to proceed.
          </div>
        </div>
        {!sent ? (
          <Button className="gap-2" onClick={send}>
            <Mail size={14}/> Confirm Admin Notified
          </Button>
        ) : (
          <Badge variant="green">✓ Admin notified</Badge>
        )}
      </Card>
      <Disclaimer>
        The administrator is responsible for sending the IMFPA to the seller and
        approving the identity reveal. Platform does not automate this step.
      </Disclaimer>
    </div>
  );
}

// ---- Stage 3: IMFPA Signing ----
function StageImfpaSigning({ onNext }: { onNext: () => void }) {
  const [imfpaSent, setImfpaSent] = useState(false);
  const [imfpaSigned, setImfpaSigned] = useState(false);

  const sendImfpa = () => {
    setImfpaSent(true);
    toast.success("IMFPA sent to seller: j.dlamini@petrolink.co.za");
  };
  const confirmSign = () => {
    setImfpaSigned(true);
    toast.success("IMFPA signature confirmed — ready for admin approval");
    setTimeout(onNext, 1200);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <SignStep num={1} done={imfpaSent} active={!imfpaSent}
          title="Admin sends IMFPA to Seller"
          desc="Administrator emails IMFPA document to seller for signature"
          action={!imfpaSent
            ? <Button size="sm" className="gap-1" onClick={sendImfpa}><Mail size={12}/>Send IMFPA</Button>
            : <Badge variant="green">✓ Sent</Badge>}
        />
        <SignStep num={2} done={imfpaSigned} active={imfpaSent && !imfpaSigned}
          title="Seller signs IMFPA"
          desc="Seller reviews and signs — confirms R 0.10/L commission obligation"
          action={imfpaSent && !imfpaSigned
            ? <Button size="sm" variant="secondary" onClick={confirmSign}>Confirm Signed</Button>
            : imfpaSigned ? <Badge variant="green">✓ Signed</Badge>
            : <Badge variant="gray">Waiting</Badge>}
        />
      </div>
      <Alert variant="amber" icon="⚠️">
        <strong>Commission locked:</strong> Once the seller signs the IMFPA, the R 0.10/L
        commission obligation is legally binding — regardless of where the final
        transaction occurs.
      </Alert>
      <Disclaimer>
        IMFPA is an International Master Fee Protection Agreement. The administrator
        is responsible for obtaining a valid signature. Platform records the confirmation.
      </Disclaimer>
    </div>
  );
}

// ---- Stage 4: Admin Approval ----
function StageAdminApproval({ onNext }: { onNext: () => void }) {
  const [approved, setApproved] = useState(false);
  const approve = () => {
    setApproved(true);
    toast.success("Identity reveal approved — both parties will now see each other's details");
    setTimeout(onNext, 1200);
  };
  return (
    <div className="flex flex-col gap-4">
      <Alert variant="blue" icon="🔐">
        IMFPA has been signed. As the administrator, you can now approve the identity reveal.
        Both buyer and seller will immediately see each other&apos;s full contact details.
      </Alert>
      <Card>
        <h4 className="mb-3 text-[14px]">Deal Summary</h4>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <InfoBox label="Deal ID" val="FB-2026-0041" />
          <InfoBox label="Agreed Price" val={`R ${MOCK_DEAL.agreedPrice.toFixed(2)}/L`} cls="text-green-700" />
          <InfoBox label="Volume" val={fmtVol(MOCK_DEAL.agreedVolume)} />
          <InfoBox label="Commission Due" val={fmtRand(MOCK_DEAL.agreedVolume * 0.10)} cls="text-blue-600" />
        </div>
        {!approved ? (
          <Button className="w-full justify-center gap-2 bg-green-700 hover:bg-green-800 text-white" onClick={approve}>
            ✅ Approve — Reveal Identities
          </Button>
        ) : (
          <Alert variant="green" icon="✅">Identities revealed to both parties.</Alert>
        )}
      </Card>
      <Disclaimer>
        Admin approval is the final gate before identity disclosure. Ensure IMFPA
        is properly signed before approving.
      </Disclaimer>
    </div>
  );
}

// ---- Stage 5: Identity Reveal ----
function StageIdentityReveal() {
  return (
    <div className="flex flex-col gap-4">
      <Alert variant="green" icon="✅">
        <strong>Admin approved.</strong> Both parties can now see each other&apos;s full details.
      </Alert>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RevealCard title="Seller" color="red" rows={[
          { label:"Company",      val:"Petrolink SA (Pty) Ltd" },
          { label:"Ref Code",     val:"Intermediary A · REF-0041", highlight:true },
          { label:"DMRE Licence", val:"WL-2021-04412" },
          { label:"Storage",      val:"Vopak Durban Terminal" },
          { label:"Contact",      val:"John Dlamini (Director)" },
          { label:"Phone",        val:"+27 31 5550 1234" },
          { label:"Email",        val:"j.dlamini@petrolink.co.za" },
        ]}/>
        <RevealCard title="Buyer" color="green" rows={[
          { label:"Company",      val:"Meridian Trade (Pty) Ltd" },
          { label:"Ref Code",     val:"Intermediary B · REF-0087", highlight:true },
          { label:"DMRE Licence", val:"WL-2020-03318" },
          { label:"Region",       val:"Sandton, Gauteng" },
          { label:"Contact",      val:"Sipho Ndlovu (MD)" },
          { label:"Phone",        val:"+27 11 5550 9876" },
          { label:"Email",        val:"s.ndlovu@meridiantrade.co.za" },
        ]}/>
      </div>
      <Disclaimer>
        Platform has completed its introduction role. From this point, all
        further negotiations, document exchange, and transactions are between
        the parties directly.
      </Disclaimer>
    </div>
  );
}

// ---- Stage 6: Direct Doc Exchange ----
function StageDocExchange() {
  return (
    <div className="flex flex-col gap-4">
      <Alert variant="amber" icon="⚠️">
        <strong>Platform Disclaimer:</strong> All documents below are exchanged <em>directly between
        buyer and seller</em>. The platform does not receive, verify, or take any responsibility
        for the authenticity of these documents.
      </Alert>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-ink-10 rounded-xl p-4">
          <div className="text-[11px] font-bold text-red-600 mb-3">Seller provides to Buyer</div>
          {["Dip Test Report (EN590 spec)","Vopak Verification Code","SGS / Intertek Quality Certificate","Proof of Product (POP)"].map(d => (
            <div key={d} className="flex items-center gap-2 bg-ink-5 border border-ink-10 rounded-lg px-3 py-2 mb-1.5 text-[12px]">
              📄 {d}
            </div>
          ))}
        </div>
        <div className="border border-ink-10 rounded-xl p-4">
          <div className="text-[11px] font-bold text-green-700 mb-3">Buyer provides to Seller</div>
          {["Proof of Funds (POF)","Bank Confirmation Letter / Statement","FICA / KYC Documentation","ICPO (Irrevocable Corporate Purchase Order)"].map(d => (
            <div key={d} className="flex items-center gap-2 bg-ink-5 border border-ink-10 rounded-lg px-3 py-2 mb-1.5 text-[12px]">
              📄 {d}
            </div>
          ))}
        </div>
      </div>
      <Disclaimer>
        The platform is not liable for document fraud, misrepresentation, or
        any loss arising from documents exchanged between parties. Each party
        is solely responsible for verifying documents they receive.
      </Disclaimer>
    </div>
  );
}

// ---- Stage 7: Payment ----
function StagePayment({ agreedPrice, volume }: { agreedPrice: number; volume: number }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        <InfoBox label="Agreed Price" val={`R ${agreedPrice.toFixed(2)}/L`} />
        <InfoBox label="Volume" val={fmtVol(volume)} />
        <InfoBox label="Deal Total" val={fmtRand(agreedPrice * volume)} cls="text-green-700" />
      </div>
      {[
        { icon:"🧾", title:"Seller issues Commercial Invoice", desc:`${fmtRand(agreedPrice * volume)} · payment terms: COD / LC / TT`, tag:"Seller" },
        { icon:"🏦", title:"Buyer settles via L/C or TT",      desc:"Bank-to-bank payment. Platform not involved.", tag:"Buyer" },
        { icon:"📤", title:"Both upload payment confirmation", desc:"Unlocks Title Transfer stage.",                tag:"Platform logs" },
      ].map(s => (
        <div key={s.title} className="flex gap-3 bg-ink-5 border border-ink-10 rounded-lg p-3">
          <span className="text-xl">{s.icon}</span>
          <div>
            <div className="font-semibold text-[13px] mb-0.5">{s.title}</div>
            <div className="text-[12px] text-ink-60">{s.desc}</div>
            <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded mt-1 bg-blue-100 text-blue-700">{s.tag}</span>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3 bg-green-100 border border-green-200 rounded-lg px-4 py-3">
        <span className="text-xl">🔒</span>
        <div>
          <div className="font-semibold text-green-800 text-[13px]">
            Platform Commission Invoice — {fmtRand(volume * 0.10)} due on payment confirmation
          </div>
          <div className="text-[12px] text-green-700">R 0.10/L × {fmtVol(volume)} · 7 days to settle</div>
        </div>
      </div>
      <Disclaimer>Payment methods, terms, and non-payment are solely between the parties. Platform does not escrow or guarantee funds.</Disclaimer>
    </div>
  );
}

// ---- Stage 8: Title Transfer ----
function StageTitleTransfer() {
  return (
    <div className="flex flex-col gap-4">
      {[
        { n:1, title:"Seller instructs Vopak Title Transfer", desc:"Seller instructs Vopak to re-register product in buyer's name." },
        { n:2, title:"Bill of Lading / Delivery Order issued", desc:"Vopak or carrier issues B/L. Buyer confirms receipt." },
        { n:3, title:"Completion confirmation uploaded", desc:"Both parties upload confirmation. Platform switches to Fee Settlement." },
      ].map(s => (
        <div key={s.n} className="flex gap-3 items-start bg-ink-5 border border-ink-10 rounded-lg p-3">
          <div className="w-6 h-6 rounded-full bg-green-800 text-green-200 flex items-center justify-center text-[11px] font-bold flex-shrink-0">{s.n}</div>
          <div>
            <div className="font-semibold text-[13px] mb-0.5">{s.title}</div>
            <div className="text-[12px] text-ink-60">{s.desc}</div>
          </div>
        </div>
      ))}
      <Disclaimer>Legal validity of the title transfer is the responsibility of the parties and their attorneys.</Disclaimer>
    </div>
  );
}

// ---- Stage 9: Fee Settlement ----
function StageFeeSettlement({ volume }: { volume: number }) {
  const comm = calcCommission(volume, true, true);
  const rows = [
    { name:"Intermediary A", role:"Seller-side Referral (REF-0041)", rate:"R 0.02/L", amt:fmtRand(comm.sellerRefAmount) },
    { name:"Intermediary B", role:"Buyer-side Referral (REF-0087)",  rate:"R 0.02/L", amt:fmtRand(comm.buyerRefAmount) },
    { name:"FuelBridge ZA",  role:"Platform",                        rate:"R 0.06/L", amt:fmtRand(comm.platformAmount) },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        <InfoBox label="Volume" val={fmtVol(volume)} />
        <InfoBox label="Rate" val="R 0.10/L" />
        <InfoBox label="Total" val={fmtRand(comm.totalAmount)} cls="text-green-700" />
      </div>
      <div className="border border-ink-10 rounded-xl overflow-hidden">
        <div className="bg-ink-5 border-b border-ink-10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-ink-60">
          Commission Ledger
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-ink-10">
              {["Recipient","Role","Rate","Amount","Status"].map(h => (
                <th key={h} className={cn("px-4 py-2 text-[10px] uppercase tracking-widest font-semibold text-ink-40",
                  h==="Amount"||h==="Status" ? "text-right" : "text-left")}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.name} className="border-b border-ink-5 hover:bg-ink-5">
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="px-4 py-3 text-ink-60 text-[12px]">{r.role}</td>
                <td className="px-4 py-3 font-mono font-semibold text-ink-60">{r.rate}</td>
                <td className="px-4 py-3 font-mono font-bold text-right">{r.amt}</td>
                <td className="px-4 py-3 text-right"><Badge variant="amber">Pending</Badge></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-green-800">
              <td colSpan={3} className="px-4 py-3 font-semibold text-green-200 text-[13px]">Seller Total Payment</td>
              <td className="px-4 py-3 font-mono font-bold text-white text-right text-[15px]">{fmtRand(comm.totalAmount)}</td>
              <td className="px-4 py-3 text-right"><Badge variant="dark">7 days</Badge></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <Alert variant="green" icon="📊">
        Referral commissions transferred within <strong>3 business days</strong> of platform fee receipt.
        Deal completion certificates issued automatically.
      </Alert>
    </div>
  );
}

// ---- Shared helpers ----
function ResponsibilityBar({ platform, parties, admin }: { platform:string; parties:string; admin:string }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[
        { label:"Platform Role", desc:platform, bg:"bg-blue-50 border-blue-100", lbl:"text-blue-700" },
        { label:"Party Liability", desc:parties, bg:"bg-gold-100 border-gold-400/30", lbl:"text-gold-700" },
        { label:"Admin Role", desc:admin,       bg:"bg-green-50 border-green-200", lbl:"text-green-700" },
      ].map(b => (
        <div key={b.label} className={cn("border rounded-lg px-3 py-2.5", b.bg)}>
          <div className={cn("text-[10px] font-bold uppercase tracking-wider mb-1", b.lbl)}>{b.label}</div>
          <div className="text-[11px] text-ink-60">{b.desc}</div>
        </div>
      ))}
    </div>
  );
}

function InfoBox({ label, val, cls }: { label:string; val:string; cls?:string }) {
  return (
    <div className="bg-ink-5 border border-ink-10 rounded-lg px-4 py-3 text-center">
      <div className="text-[10px] uppercase tracking-widest text-ink-40 mb-1">{label}</div>
      <div className={cn("font-mono text-[17px] font-bold text-ink", cls)}>{val}</div>
    </div>
  );
}

function Disclaimer({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[12px] text-ink-60 px-4 py-3 bg-ink-5 border border-ink-10 rounded-lg border-l-2 border-l-blue-400 leading-relaxed">
      <strong className="text-ink">Platform disclaimer: </strong>{children}
    </div>
  );
}

function SignStep({ num, done, active, title, desc, action }: {
  num:number; done:boolean; active?:boolean; title:string; desc:string; action?:React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 bg-white border border-ink-10 rounded-lg px-3 py-2.5">
      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0",
        done ? "bg-green-600 text-white" : active ? "bg-green-800 text-green-200" : "bg-ink-10 text-ink-40")}>
        {done ? <Check size={11}/> : num}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-[12px]">{title}</div>
        <div className="text-[11px] text-ink-40">{desc}</div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

function RevealCard({ title, color, rows }: {
  title: string; color: "red"|"green";
  rows: { label:string; val:string; highlight?:boolean }[];
}) {
  const hdCls = color === "red" ? "text-red-700" : "text-green-700";
  return (
    <div className="border border-ink-10 rounded-xl overflow-hidden">
      <div className={cn("px-4 py-2.5 bg-green-100 border-b border-ink-10 text-[12px] font-semibold", hdCls)}>
        ✅ {title} Details Revealed
      </div>
      <div className="p-4">
        {rows.map(r => (
          <div key={r.label} className="flex gap-2 text-[12px] py-1.5 border-b border-ink-5 last:border-0">
            <span className="text-ink-40 w-28 flex-shrink-0">{r.label}</span>
            <span className={cn("font-medium", r.highlight ? "text-gold-700" : "text-ink")}>{r.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Main export ----
export default function DealTracker() {
  const [stageIdx, setStageIdx] = useState(0);
  const agreedPrice = MOCK_DEAL.agreedPrice;
  const volume      = MOCK_DEAL.agreedVolume;

  const goTo  = (i: number) => { if (i >= 0 && i < STAGES.length) setStageIdx(i); };
  const stageId = STAGES[stageIdx].id;

  return (
    <div>
      {/* Deal header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-[12px] text-ink-40 uppercase tracking-widest font-semibold mb-1">Deal · FB-2026-0041</div>
          <div className="text-xl font-bold font-display">SELL-0041 × BUY-0087</div>
          <div className="text-[13px] text-ink-60 mt-0.5">
            {fmtVol(volume)} · KZN → Gauteng · Commission {fmtRand(volume * 0.10)}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="amber">{STAGES[stageIdx].label}</Badge>
          <span className="text-[12px] text-ink-40">Stage {stageIdx+1} / {STAGES.length}</span>
        </div>
      </div>

      <StageNav current={stageIdx} />

      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-5 pb-4 border-b border-ink-10">
          <span className="text-[14px] font-semibold">{STAGES[stageIdx].label}</span>
        </div>
        {stageId === "negotiation"    && <StageNegotiation agreedPrice={agreedPrice} />}
        {stageId === "admin_review"   && <StageAdminReview onNext={() => goTo(stageIdx+1)} />}
        {stageId === "imfpa_signing"  && <StageImfpaSigning onNext={() => goTo(stageIdx+1)} />}
        {stageId === "admin_approval" && <StageAdminApproval onNext={() => goTo(stageIdx+1)} />}
        {stageId === "identity_reveal"&& <StageIdentityReveal />}
        {stageId === "doc_exchange"   && <StageDocExchange />}
        {stageId === "payment"        && <StagePayment agreedPrice={agreedPrice} volume={volume} />}
        {stageId === "title_transfer" && <StageTitleTransfer />}
        {stageId === "fee_settlement" && <StageFeeSettlement volume={volume} />}
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => goTo(stageIdx-1)} disabled={stageIdx===0}>
          <ChevronLeft size={16}/> Previous
        </Button>
        {stageIdx < STAGES.length-1 ? (
          <Button onClick={() => goTo(stageIdx+1)}>
            {STAGES[stageIdx+1].label} <ChevronRight size={16}/>
          </Button>
        ) : (
          <Button variant="gold">✅ Deal Complete</Button>
        )}
      </div>
    </div>
  );
}
