export default function Home() {
  return (
    <main>
      {/* 여기에 기존의 상단 코드들이 있을 텐데, 
          전체 다 지우고 아래 섹션만 넣으면 일단 화면이 바뀝니다. 
          나머지 부분은 그대로 두셔도 됩니다. */}

      <section className="py-16 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            FuelBridge ZA: Commission & Referral Structure
          </h3>
          <p className="text-lg text-gray-700 mb-8">
            FuelBridge ZA operates on a transparent, performance-based fee model to ensure fairness for all stakeholders.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-xl mb-2 text-green-900">Bulk Orders (10M+ Litres)</h4>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">Platform Fee:</span> 10c per litre<br />
                <span className="font-semibold text-gray-900">Referral Fee:</span> 3c per litre
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-xl mb-2 text-green-900">Standard Orders (Below 10M Litres)</h4>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">Platform Fee:</span> 20c per litre<br />
                <span className="font-semibold text-gray-900">Referral Fee:</span> 5c per litre
              </p>
            </div>
          </div>

          <p className="mt-8 text-sm text-gray-500 italic">
            * All commissions are NCNDA-protected and transparently disclosed to all parties, ensuring full compliance and trust.
          </p>
        </div>
      </section>
    </main>
  );
}