import React from "react";
import { HIGHLIGHTS } from "@/constants/shop";

export default function Highlights() {
  return (
    <section
      data-testid="highlights-section"
      className="relative py-20 md:py-24 bg-[#110A0C] border-y border-[#D4AF37]/15"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
        {HIGHLIGHTS.map((h, i) => (
          <div
            key={h.label}
            className="text-center md:text-left reveal"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="font-serif-luxe text-5xl md:text-6xl text-[#D4AF37] leading-none">
              {h.number}
            </div>
            <div className="mt-3 text-xs md:text-sm tracking-[0.3em] uppercase text-[#D9C8B4]">
              {h.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
