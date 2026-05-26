import Link from "next/link";

function BridgeLogo() {
  return (
    <img 
      src="/logo-symbol.jpg" 
      alt="FuelBridge Logo" 
      className="h-10 w-auto object-contain" 
    />
  );
}
const LINKS = {
  Platform:   [["Market Board","/market"],["Register","/register"],["Commission Structure","/#commission"]],
  Compliance: [["DMRE Requirements","#"],["NCNDA / IMFPA","#"],["POPIA Policy","#"],["Dispute Process","#"]],
  Contact:    [["info@fuelbridge.co.za","mailto:info@fuelbridge.co.za"],["+27 10 XXX XXXX","#"],["Johannesburg, RSA","#"]],
};

export default function Footer() {
  return (
    <footer className="bg-ink-80 text-ink-20 pt-12 pb-7">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-green-800 rounded-lg flex items-center justify-center">
                <BridgeLogo />
              </div>
              <span className="font-display text-lg font-bold text-white">FuelBridge ZA</span>
            </div>
            <p className="text-[13px] text-ink-40 leading-relaxed">
              South Africa&apos;s verified EN590 bulk fuel trading platform.
              DMRE-compliant, NCNDA-protected, with transparent referral commissions.
            </p>
            
            {/* 여기에 추가하신 신뢰 문구를 넣었습니다 */}
            <div className="mt-4 text-[12px] text-ink-50">
              <p>FuelBridge ZA (Pty) Ltd</p>
              <p>Sandton, Johannesburg, South Africa</p>
              <p className="font-semibold text-green-400">DMRE Wholesale Licence Verified Platform</p>
            </div>
          </div>
          
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <div className="text-[12px] font-semibold text-white tracking-wide mb-4">{title}</div>
              <div className="flex flex-col gap-2">
                {links.map(([label, href]) => (
                  <Link key={label} href={href}
                    className="text-[13px] text-ink-40 hover:text-green-200 transition-colors no-underline">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-ink-60 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[12px] text-ink-60">© 2026 FuelBridge ZA (Pty) Ltd. All rights reserved.</p>
          <div className="flex gap-5">
            {["Terms of Use","Privacy Policy","Platform Disclaimer"].map(t => (
              <Link key={t} href="#" className="text-[12px] text-ink-60 hover:text-green-200 transition-colors no-underline">{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}