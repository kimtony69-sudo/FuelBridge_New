"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button, Alert, Card, UploadBox } from "@/components/ui";
import { cn } from "@/lib/utils";
import { MIN_VOLUME, fmtRand, fmtVol, type DealMethod } from "@/types";

type Role = "seller" | "buyer" | "intermediary";
type IntTarget = "sell" | "buy";

const REGIONS = [
  "Gauteng","KwaZulu-Natal","Western Cape","Eastern Cape",
  "Limpopo","Mpumalanga","North West","Free State","Northern Cape",
];
const PERIODS = [
  "Spot (immediate)","Within 7 days","Within 30 days",
  "Q2 2026","Q3 2026","Negotiable",
];
const DEAL_METHODS: DealMethod[] = ["CoC", "In-Tank Transfer"];
const BANKS = ["FNB","ABSA","Standard Bank","Nedbank","Capitec","Investec","Other"];

// ---- Small reusable components ----
function Field({ label, req, hint, children }: {
  label: string; req?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[12px] font-medium text-ink-60">
        {label}{req && <span className="text-red-600 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-ink-40">{hint}</p>}
    </div>
  );
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input className={cn(
      "px-3 py-2 text-[13px] border border-ink-10 rounded-lg bg-white",
      "focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 w-full",
      className
    )} {...props} />
  );
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className="px-3 py-2 text-[13px] border border-ink-10 rounded-lg bg-white focus:outline-none focus:border-green-600 w-full" {...props}>
      {children}
    </select>
  );
}

function PriceInput({ value, onChange, placeholder = "23.20" }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-ink-40">R</span>
      <Input className="pl-6 pr-12" type="number" step="0.01"
        placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-ink-40">/L</span>
    </div>
  );
}

function VolInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const num = parseInt(value);
  return (
    <div>
      <div className="relative">
        <Input className="pr-8" type="number" min={MIN_VOLUME} step={100_000}
          placeholder="5000000" value={value} onChange={e => onChange(e.target.value)} />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-ink-40">L</span>
      </div>
      {!isNaN(num) && num > 0 && (
        <span className="text-[11px] text-ink-40 mt-0.5 block">= {fmtVol(num)}</span>
      )}
      {!isNaN(num) && num > 0 && num < MIN_VOLUME && (
        <span className="text-[11px] text-red-600 mt-0.5 block">Minimum 1,000,000 litres</span>
      )}
    </div>
  );
}

function DealMethodSelect({ value, onChange }: {
  value: DealMethod | ""; onChange: (v: DealMethod) => void;
}) {
  return (
    <Select value={value} onChange={e => onChange(e.target.value as DealMethod)} required>
      <option value="">Select deal method</option>
      {DEAL_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
    </Select>
  );
}

function CommPreview({ volume, rate = 0.02, label, colorCls = "bg-green-100 border-green-200" }: {
  volume: string; rate?: number; label: string; colorCls?: string;
}) {
  const vol = parseInt(volume);
  if (isNaN(vol) || vol < MIN_VOLUME) return null;
  return (
    <div className={cn("flex items-center justify-between px-4 py-3 rounded-lg border text-[13px] mt-2", colorCls)}>
      <div>
        <div className="font-medium text-green-800">{label}</div>
        <div className="text-[11px] text-green-700 mt-0.5">Paid after deal close</div>
      </div>
      <div className="font-mono font-bold text-green-800 text-[16px]">{fmtRand(vol * rate)}</div>
    </div>
  );
}

// ---- SELLER FORM ----
function SellerForm() {
  const [vol,    setVol]    = useState("");
  const [minVol, setMinVol] = useState("");
  const [price,  setPrice]  = useState("");
  const [method, setMethod] = useState<DealMethod | "">("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <Alert variant="green" icon="✅" className="mt-4">
      <strong>Seller registration submitted!</strong> Platform review within 48 hours.
      Your listing will appear on the Market Board as an anonymous ID once verified.
    </Alert>
  );

  const totalFee = parseInt(vol) * 0.10;

  return (
    <form onSubmit={e => { e.preventDefault(); setSubmitted(true); toast.success("Seller registration submitted!"); }}
      className="flex flex-col gap-5">

      {/* Required trading info */}
      <Card className="border-l-4 border-l-red-500 rounded-l-none">
        <div className="flex items-center gap-2 mb-4 text-red-700 font-semibold text-[13px]">
          ⚠️ Required Trading Information
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Volume Available (litres)" req>
            <VolInput value={vol} onChange={setVol} />
          </Field>
          <Field label="Minimum Deal Volume (litres)" req>
            <VolInput value={minVol} onChange={setMinVol} />
          </Field>
          <Field label="Asking Price (R/litre)" req hint="Current market ~R23 range">
            <PriceInput value={price} onChange={setPrice} placeholder="23.20" />
          </Field>
          <Field label="Deal Method" req>
            <DealMethodSelect value={method} onChange={setMethod} />
          </Field>
          <Field label="Deal Period" req>
            <Select required>
              <option value="">Select period</option>
              {PERIODS.map(p => <option key={p}>{p}</option>)}
            </Select>
          </Field>
        </div>
        {!isNaN(parseInt(vol)) && parseInt(vol) >= MIN_VOLUME && (
          <div className="mt-3 flex items-center justify-between px-4 py-3 rounded-lg border border-red-200 bg-red-50">
            <div>
              <div className="font-medium text-red-700 text-[13px]">
                Estimated Commission Payable (R 0.10/L — seller pays)
              </div>
              <div className="text-[11px] text-red-600 mt-0.5">Due within 7 days of Title Transfer</div>
            </div>
            <div className="font-mono font-bold text-red-700 text-[16px]">{fmtRand(totalFee)}</div>
          </div>
        )}
      </Card>

      {/* Company info */}
      <Card>
        <h4 className="mb-4 text-[15px]">🏢 Company Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Company Name" req>
            <Input required placeholder="Registered company name" />
          </Field>
          <Field label="CIPC Registration No." req hint="e.g. 2015/123456/07">
            <Input required placeholder="2015/XXXXXX/07" />
          </Field>
          <Field label="DMRE Wholesale Licence No." req>
            <Input required placeholder="WL-20XX-XXXXX" />
          </Field>
          <Field label="Region (shown on board)" req hint="Broad region only — city shown after admin approval">
            <Select required>
              <option value="">Select region</option>
              {REGIONS.map(r => <option key={r}>{r}</option>)}
            </Select>
          </Field>
          <Field label="Storage Type" req>
            <Select required>
              <option value="">Select</option>
              <option>Vopak</option>
              <option>Own Depot</option>
              <option>Third-party Depot</option>
            </Select>
          </Field>
          <Field label="Contact Person" req>
            <Input required placeholder="Full name" />
          </Field>
          <Field label="Email Address" req>
            <Input required type="email" placeholder="contact@company.co.za" />
          </Field>
          <Field label="Phone Number" req>
            <Input required placeholder="+27 XX XXXX XXXX" />
          </Field>
        </div>
      </Card>

      {/* Documents — DMRE and CIPC only */}
      <Card>
        <h4 className="mb-2 text-[15px]">📁 Required Documents</h4>
        <p className="text-[12px] text-ink-60 mb-4">
          Upload your DMRE licence and CIPC registration for platform verification.
          All other trade documents (Dip Test, POP, etc.) are exchanged directly
          between parties after deal approval — the platform takes no responsibility
          for their authenticity.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <UploadBox label="DMRE Wholesale Licence" required />
          <UploadBox label="CIPC Company Registration" required />
        </div>
      </Card>

      <Alert variant="blue" icon="🔒">
        Your company name and contact details will <strong>not</strong> be visible to other parties
        until the platform administrator approves the IMFPA signing.
      </Alert>

      <Button type="submit" size="lg" className="justify-center">Submit Seller Registration</Button>
    </form>
  );
}

// ---- BUYER FORM ----
function BuyerForm() {
  const [vol,    setVol]    = useState("");
  const [price,  setPrice]  = useState("");
  const [method, setMethod] = useState<DealMethod | "">("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <Alert variant="green" icon="✅" className="mt-4">
      <strong>Buyer registration submitted!</strong> Platform review within 48 hours.
    </Alert>
  );

  return (
    <form onSubmit={e => { e.preventDefault(); setSubmitted(true); toast.success("Buyer registration submitted!"); }}
      className="flex flex-col gap-5">

      {/* Required trading info */}
      <Card className="border-l-4 border-l-green-600 rounded-l-none">
        <div className="flex items-center gap-2 mb-4 text-green-800 font-semibold text-[13px]">
          ✅ Required Trading Information
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Volume Required (litres)" req>
            <VolInput value={vol} onChange={setVol} />
          </Field>
          <Field label="Bid Price (R/litre)" req hint="Current market ~R22 range">
            <PriceInput value={price} onChange={setPrice} placeholder="22.80" />
          </Field>
          <Field label="Deal Method" req>
            <DealMethodSelect value={method} onChange={setMethod} />
          </Field>
          <Field label="Delivery Region" req>
            <Select required>
              <option value="">Select region</option>
              {REGIONS.map(r => <option key={r}>{r}</option>)}
            </Select>
          </Field>
          <Field label="Purchase Period" req>
            <Select required>
              <option value="">Select period</option>
              {PERIODS.map(p => <option key={p}>{p}</option>)}
            </Select>
          </Field>
        </div>
      </Card>

      {/* Company info */}
      <Card>
        <h4 className="mb-4 text-[15px]">🏢 Company Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Company Name" req>
            <Input required placeholder="Registered company name" />
          </Field>
          <Field label="CIPC Registration No." req>
            <Input required placeholder="2015/XXXXXX/07" />
          </Field>
          <Field label="DMRE Wholesale Licence No." req>
            <Input required placeholder="WL-20XX-XXXXX" />
          </Field>
          <Field label="Region" req>
            <Select required>
              <option value="">Select region</option>
              {REGIONS.map(r => <option key={r}>{r}</option>)}
            </Select>
          </Field>
          <Field label="Contact Person" req>
            <Input required placeholder="Full name" />
          </Field>
          <Field label="Email Address" req>
            <Input required type="email" placeholder="contact@company.co.za" />
          </Field>
          <Field label="Phone Number" req>
            <Input required placeholder="+27 XX XXXX XXXX" />
          </Field>
        </div>
      </Card>

      {/* Documents — DMRE and CIPC only */}
      <Card>
        <h4 className="mb-2 text-[15px]">📁 Required Documents</h4>
        <p className="text-[12px] text-ink-60 mb-4">
          Upload your DMRE licence and CIPC registration for platform verification.
          POF and all other verification documents are exchanged directly with the
          seller after admin approval — the platform takes no responsibility for
          their authenticity.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <UploadBox label="DMRE Wholesale Licence" required />
          <UploadBox label="CIPC Company Registration" required />
        </div>
      </Card>

      <Alert variant="blue" icon="🔒">
        Your identity is protected. <strong>Commission is paid entirely by the seller</strong> — no cost to the buyer.
        Identities are revealed only after the platform administrator approves the IMFPA signing.
      </Alert>

      <Button type="submit" size="lg" className="justify-center">Submit Buyer Registration</Button>
    </form>
  );
}

// ---- INTERMEDIARY FORM ----
function IntermediaryForm() {
  const [target, setTarget] = useState<IntTarget | null>(null);
  const [vol,    setVol]    = useState("");
  const [price,  setPrice]  = useState("");
  const [method, setMethod] = useState<DealMethod | "">("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <Alert variant="green" icon="✅" className="mt-4">
      <strong>Intermediary registration submitted!</strong> After IMFPA signature your referral code
      will be issued. Commission is paid within 3 business days of deal close.
    </Alert>
  );

  return (
    <form onSubmit={e => { e.preventDefault(); setSubmitted(true); toast.success("Intermediary registration submitted!"); }}
      className="flex flex-col gap-5">

      <Alert variant="amber" icon="💡">
        As an Intermediary you register a seller or buyer you know personally.
        When a deal closes, you earn <strong>R 0.02/litre</strong> referral commission.
        You must sign the IMFPA to lock this in legally.
      </Alert>

      {/* Intermediary own details */}
      <Card>
        <h4 className="mb-4 text-[15px]">🤝 Your Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Full Name" req><Input required placeholder="Full legal name" /></Field>
          <Field label="ID / Passport No." req><Input required placeholder="RSA ID or Passport" /></Field>
          <Field label="Email Address" req><Input required type="email" placeholder="you@example.com" /></Field>
          <Field label="Phone Number" req><Input required placeholder="+27 XX XXXX XXXX" /></Field>
          <Field label="Bank Name" req hint="Commission paid to this account">
            <Select required>
              <option value="">Select bank</option>
              {BANKS.map(b => <option key={b}>{b}</option>)}
            </Select>
          </Field>
          <Field label="Account Number" req>
            <Input required placeholder="Commission deposit account" />
          </Field>
        </div>
      </Card>

      {/* Who are you registering? */}
      <Card>
        <h4 className="mb-4 text-[15px]">Who are you registering?</h4>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {([
            ["sell","🏭","A Seller","I know a party with EN590 to sell"],
            ["buy", "💼","A Buyer", "I know a party wanting to buy EN590"],
          ] as [IntTarget, string, string, string][]).map(([t, icon, title, desc]) => (
            <button type="button" key={t} onClick={() => setTarget(t)}
              className={cn("p-4 rounded-xl border text-left transition-all",
                target === t
                  ? (t === "sell" ? "border-red-300 bg-red-50" : "border-green-300 bg-green-50")
                  : "border-ink-10 bg-ink-5 hover:border-ink-20")}>
              <div className="text-2xl mb-2">{icon}</div>
              <div className="font-semibold text-[14px] text-ink">{title}</div>
              <div className="text-[12px] text-ink-60 mt-1">{desc}</div>
            </button>
          ))}
        </div>

        {target === "sell" && (
          <div className="flex flex-col gap-4 border-t border-ink-10 pt-4">
            <h4 className="text-[14px]">🏭 Seller Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Seller Company Name" req><Input required placeholder="Company name" /></Field>
              <Field label="Seller CIPC No." req><Input required placeholder="2015/XXXXXX/07" /></Field>
              <Field label="Seller DMRE Licence" req><Input required placeholder="WL-20XX-XXXXX" /></Field>
              <Field label="Region" req>
                <Select required>
                  <option value="">Select</option>
                  {REGIONS.map(r => <option key={r}>{r}</option>)}
                </Select>
              </Field>
              <Field label="Volume Available (litres)" req>
                <VolInput value={vol} onChange={setVol} />
              </Field>
              <Field label="Asking Price" req hint="~R23 range">
                <PriceInput value={price} onChange={setPrice} placeholder="23.20" />
              </Field>
              <Field label="Deal Method" req>
                <DealMethodSelect value={method} onChange={setMethod} />
              </Field>
            </div>
            <CommPreview volume={vol} label="Your Estimated Referral Commission (R 0.02/L)" />
          </div>
        )}

        {target === "buy" && (
          <div className="flex flex-col gap-4 border-t border-ink-10 pt-4">
            <h4 className="text-[14px]">💼 Buyer Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Buyer Company Name" req><Input required placeholder="Company name" /></Field>
              <Field label="Buyer CIPC No." req><Input required placeholder="2015/XXXXXX/07" /></Field>
              <Field label="Buyer DMRE Licence" req><Input required placeholder="WL-20XX-XXXXX" /></Field>
              <Field label="Delivery Region" req>
                <Select required>
                  <option value="">Select</option>
                  {REGIONS.map(r => <option key={r}>{r}</option>)}
                </Select>
              </Field>
              <Field label="Volume Required (litres)" req>
                <VolInput value={vol} onChange={setVol} />
              </Field>
              <Field label="Bid Price" req hint="~R22 range">
                <PriceInput value={price} onChange={setPrice} placeholder="22.80" />
              </Field>
              <Field label="Deal Method" req>
                <DealMethodSelect value={method} onChange={setMethod} />
              </Field>
            </div>
            <CommPreview volume={vol} label="Your Estimated Referral Commission (R 0.02/L)" />
          </div>
        )}
      </Card>

      <Alert variant="blue" icon="📄">
        Signing the <strong>IMFPA (International Master Fee Protection Agreement)</strong> legally
        secures your R 0.02/L commission. Your referral code will be issued upon IMFPA signing.
      </Alert>

      <Button type="submit" size="lg" className="justify-center">
        Sign IMFPA &amp; Submit Registration
      </Button>
    </form>
  );
}

// ---- Role selector + form ----
const ROLES: { id: Role; icon: string; label: string; desc: string }[] = [
  { id:"seller",       icon:"🏭", label:"I'm a Seller",   desc:"I have EN590 to sell" },
  { id:"buyer",        icon:"💼", label:"I'm a Buyer",    desc:"I want to buy EN590" },
  { id:"intermediary", icon:"🤝", label:"Intermediary",   desc:"Earn R 0.02/L referral" },
];

export default function RegisterForm() {
  const [role, setRole] = useState<Role>("seller");
  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {ROLES.map(r => (
          <button key={r.id} type="button" onClick={() => setRole(r.id)}
            className={cn("p-4 rounded-xl border text-center transition-all",
              role === r.id
                ? "border-green-600 bg-green-50 shadow-sm"
                : "border-ink-10 bg-white hover:border-ink-20 hover:bg-ink-5")}>
            <div className="text-3xl mb-2">{r.icon}</div>
            <div className={cn("font-semibold text-[14px]", role === r.id ? "text-green-800" : "text-ink")}>
              {r.label}
            </div>
            <div className="text-[12px] text-ink-60 mt-1">{r.desc}</div>
          </button>
        ))}
      </div>
      {role === "seller"       && <SellerForm />}
      {role === "buyer"        && <BuyerForm />}
      {role === "intermediary" && <IntermediaryForm />}
    </div>
  );
}
