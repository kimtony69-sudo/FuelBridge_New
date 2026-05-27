"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        
        {/* 이미지 크기를 h-32(기존의 2배)로 키우고 텍스트는 완전히 제거 */}
        <div className="flex items-center">
          <img 
            src="/logo-symbol.png" 
            alt="FuelBridge Logo" 
            className="h-32 w-auto object-contain" 
          />
        </div>

        {/* 메뉴 탭 부분 */}
        <div className="flex items-center gap-8">
          <Link href="/" className={`text-sm font-medium ${pathname === '/' ? 'text-green-800' : 'text-gray-600'}`}>Home</Link>
          <Link href="/market" className={`text-sm font-medium ${pathname === '/market' ? 'text-green-800' : 'text-gray-600'}`}>Market Board</Link>
          <Link href="/register" className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-bold">Register</Link>
        </div>
      </div>
    </nav>
  );
}
        