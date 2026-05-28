export default function CommissionSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Commission Structure</h2>
        <p className="text-gray-600 mb-8 italic">Transparent. Fair. Protected.</p>

        {/* 데이터 테이블 구조 */}
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
              <tr>
                <th className="px-6 py-4">Volume Tier</th>
                <th className="px-6 py-4">Intermediation Fee</th>
                <th className="px-6 py-4">Referral Commission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium text-gray-900">
              <tr>
                <td className="px-6 py-4">Below 10M Liters</td>
                <td className="px-6 py-4">R 0.20 / L</td>
                <td className="px-6 py-4">R 0.05 / L</td>
              </tr>
              <tr>
                <td className="px-6 py-4">10M Liters & Above</td>
                <td className="px-6 py-4">R 0.10 / L</td>
                <td className="px-6 py-4">R 0.03 / L</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 하단 법적 고지 */}
        <div className="mt-6 text-[13px] text-gray-500 leading-relaxed border-t pt-4">
          <p>• Commissions settled within 3 business days of platform fee receipt.</p>
          <p>• All obligations are legally binding via executed IMFPA.</p>
        </div>
      </div>
    </section>
  );
}
