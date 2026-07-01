import React from "react";

const items = [
  "22K & 24K Hallmarked Gold",
  "IGI-Style Certified Diamonds",
  "925 Sterling Silver",
  "Custom Bridal Design",
  "Repair · Polish · Exchange",
  "BIS Assured Purity",
];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div
      data-testid="marquee-strip"
      className="border-y border-[#D4AF37]/20 bg-[#1C0F13] overflow-hidden"
    >
      <div className="flex animate-marquee whitespace-nowrap py-5">
        {doubled.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-14 px-7 text-xs md:text-sm tracking-[0.35em] uppercase text-[#D9C8B4]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
