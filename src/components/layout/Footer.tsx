export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6 mt-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 상단: 회사 정보 및 기본 정보 */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-2">FuelBridge ZA</h3>
            <p className="text-sm">Sandton, Johannesburg, South Africa</p>
            <p className="text-sm">Verified EN590 Bulk Diesel Trading Platform</p>
          </div>
          <div className="md:text-right text-sm">
            <p>© 2026 FuelBridge ZA (Pty) Ltd. All rights reserved.</p>
          </div>
        </div>

        {/* 하단: 법적 면책 조항 (가장 중요) */}
        <div className="border-t border-gray-800 pt-8 space-y-4 text-[11px] leading-relaxed text-gray-500">
          <p>
            <strong>Disclaimer:</strong> FuelBridge ZA is an independent connection platform and does not directly sell fuel or act as a broker. 
            All trading activities, including EN590 diesel transactions, must be conducted in strict compliance with DMRE (Department of Mineral Resources and Energy) regulations.
          </p>
          <p>
            Users are solely responsible for conducting their own due diligence, verification of licenses, and legal compliance checks. 
            FuelBridge ZA provides NCNDA-protected matching services and is not liable for the outcome of any transaction or contract between parties.
          </p>
          <p>
            By using this platform, you acknowledge that you are a professional trader, mining operator, or wholesale distributor acting within the legal framework of South Africa.
          </p>
        </div>
      </div>
    </footer>
  );
}