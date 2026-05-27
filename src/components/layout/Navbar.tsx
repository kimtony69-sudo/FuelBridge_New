"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="sticky top-0 z-50 bg-white/92 backdrop-blur-lg border-b border-ink-10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* 로고와 이름 부분 */}
        <div className="flex items-center gap-3">
          <img 
            src="/logo-symbol.png" 
            alt="FuelBridge Logo" 
            className="h-12 w-auto object-contain" 
          />
          <span className="text-xl font-bold text-ink-800">FuelBridge ZA</span>
        </div>

        {/* 메뉴 탭 부분 */}
        <div className="flex items-center gap-8">
          <Link href="/" className={`text-sm font-medium ${pathname === '/' ? 'text-green-800' : 'text-ink-60'}`}>Home</Link>
          <Link href="/market" className={`text-sm font-medium ${pathname === '/market' ? 'text-green-800' : 'text-ink-60'}`}>Market Board</Link>
          <Link href="/register" className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-bold">Register</Link>
        </div>
      </div>
    </nav>
  );
}
          
        