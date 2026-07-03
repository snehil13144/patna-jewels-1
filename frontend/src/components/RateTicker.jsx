import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrendingUp } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Math.round(n));

export default function RateTicker() {
  const [rates, setRates] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const { data } = await axios.get(`${API}/rates`);
        if (mounted) setRates(data);
      } catch {
        /* silent */
      }
    };
    load();
    const t = setInterval(load, 5 * 60 * 1000);
    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, []);

  if (!rates) return null;

  const items = [
    { label: "Gold 24K", value: `₹${fmt(rates.gold_24k_per_gram_inr)}/g` },
    { label: "Gold 22K", value: `₹${fmt(rates.gold_22k_per_gram_inr)}/g` },
    { label: "Silver", value: `₹${fmt(rates.silver_per_gram_inr)}/g` },
  ];

  return (
    <div
      data-testid="rate-ticker"
      className="fixed top-20 left-0 right-0 z-40 bg-[#110A0C]/95 backdrop-blur-md border-b border-[#D4AF37]/25"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-11 flex items-center justify-between gap-6">
        <div className="hidden sm:flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase text-[#D4AF37]">
          <TrendingUp size={12} />
          <span>Today&apos;s Rates</span>
        </div>
        <div className="flex-1 flex items-center justify-center sm:justify-end gap-6 md:gap-10 overflow-hidden">
          {items.map((it) => (
            <div
              key={it.label}
              data-testid={`rate-${it.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex items-baseline gap-2 whitespace-nowrap"
            >
              <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#D9C8B4]/80">
                {it.label}
              </span>
              <span className="font-serif-luxe text-base md:text-lg text-[#FDFBF7]">
                {it.value}
              </span>
            </div>
          ))}
        </div>
        <div className="hidden md:block text-[9px] tracking-[0.3em] uppercase text-[#D9C8B4]/50">
          indicative · live spot
        </div>
      </div>
    </div>
  );
}
