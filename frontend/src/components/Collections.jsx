import React from "react";
import { COLLECTIONS, SHOP } from "@/constants/shop";
import { ArrowUpRight } from "lucide-react";

export default function Collections() {
  const waHref = (title) =>
    `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(
      `Hello Abhushan Nirmata, I am interested in your ${title} collection. Please share more details.`
    )}`;

  return (
    <section
      id="collections"
      data-testid="collections-section"
      className="relative py-24 md:py-32 bg-[#110A0C]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 md:mb-20 gap-6">
          <div className="reveal">
            <p className="text-[#D4AF37] text-xs md:text-sm tracking-[0.4em] uppercase mb-4">
              Curated Selections
            </p>
            <h2 className="font-serif-luxe text-4xl md:text-6xl font-light tracking-tight text-[#FDFBF7] leading-none">
              Our <span className="italic text-[#D4AF37]">Collections</span>
            </h2>
          </div>
          <p className="max-w-md text-[#D9C8B4] font-light text-base md:text-lg reveal">
            Four distinct expressions of Indian jewellery — each with its own
            character, story and craft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 auto-rows-[minmax(260px,auto)]">
          {COLLECTIONS.map((c, i) => (
            <a
              key={c.key}
              href={waHref(c.title)}
              target="_blank"
              rel="noreferrer"
              data-testid={`collection-card-${c.key}`}
              className={`group relative overflow-hidden bg-[#2B171D] border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 transition-all duration-500 reveal ${c.span}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`relative w-full h-full ${c.ratio}`}>
                <img
                  src={c.image}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#110A0C] via-[#110A0C]/50 to-transparent" />
              </div>

              <div className="absolute inset-0 p-7 md:p-9 flex flex-col justify-end">
                <p className="text-[10px] md:text-xs text-[#D4AF37] tracking-[0.4em] uppercase mb-2">
                  {c.subtitle}
                </p>
                <h3 className="font-serif-luxe text-3xl md:text-5xl text-[#FDFBF7] leading-none">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm md:text-base text-[#D9C8B4] font-light max-w-md">
                  {c.tagline}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-[#D4AF37] text-[11px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  Enquire on WhatsApp
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
