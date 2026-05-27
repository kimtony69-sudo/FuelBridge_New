// src/app/page.tsx 전체 코드
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* 이 태그가 소스보기에 안 나오면 SEO가 안 된 것입니다 */}
      <h1 className="sr-only">FuelBridge ZA: Verified EN590 Bulk Diesel Trading Platform in South Africa</h1>
      
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Trusted EN590 Bulk Diesel Trading in South Africa
        </h2>
        {/* 이하 생략 (이전과 동일) */}
      </section>
    </main>
  );
}
