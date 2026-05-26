"use client";
import { useState, useEffect } from "react";
import { GRID_PRICE } from "@/types";

export function useGridPrice() {
  const [price, setPrice] = useState(GRID_PRICE);
  const [change, setChange] = useState(+0.07);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(prev => {
        const next = Math.round((prev + (Math.random() - 0.5) * 0.02) * 100) / 100;
        setChange(Math.round((next - GRID_PRICE) * 100) / 100);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return { price, change, isUp: change >= 0 };
}
