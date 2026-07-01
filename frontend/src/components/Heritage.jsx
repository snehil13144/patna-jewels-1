import React from "react";
import { ABOUT_IMAGE, SHOP } from "@/constants/shop";

export default function Heritage() {
  return (
    <section
      id="heritage"
      data-testid="heritage-section"
      className="relative py-24 md:py-32 bg-[#1C0F13]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="md:col-span-5 relative reveal">
          <div className="relative overflow-hidden border border-[#D4AF37]/20 aspect-[4/5]">
            <img
              src={ABOUT_IMAGE}
              alt="Abhushan Nirmata store interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#110A0C]/50 to-transparent" />
          </div>
          <div className="hidden md:block absolute -bottom-8 -right-8 w-40 h-40 bg-[#D4AF37] text-[#110A0C] flex items-center justify-center">
            <div className="text-center leading-tight">
              <div className="font-serif-luxe text-4xl">25+</div>
              <div className="text-[10px] tracking-[0.3em] uppercase mt-1">
                Years of Craft
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 reveal">
          <p className="text-[#D4AF37] text-xs md:text-sm tracking-[0.4em] uppercase mb-5">
            Our Heritage
          </p>
          <h2 className="font-serif-luxe text-4xl md:text-6xl font-light tracking-tight text-[#FDFBF7] leading-[1.05]">
            A quarter century of
            <br />
            <span className="italic text-[#D4AF37]">devotion</span> to the craft.
          </h2>
          <div className="gold-divider my-8 md:my-10 max-w-xs" />
          <p className="text-[#D9C8B4] font-light text-base md:text-lg leading-relaxed max-w-2xl">
            Nestled on Bailey Road’s legendary Rajabazar, Abhushan Nirmata was
            founded on a simple belief — that jewellery is not merely worn, but
            inherited. Every ornament is a signature moment, cast in gold and
            memory.
          </p>
          <p className="text-[#D9C8B4] font-light text-base md:text-lg leading-relaxed max-w-2xl mt-5">
            Under the guidance of{" "}
            <span className="text-[#FDFBF7]">{SHOP.owner}</span>, our karigars
            balance centuries-old techniques with contemporary silhouettes —
            producing pieces that honour tradition without ever feeling dated.
          </p>

          <div className="mt-10 flex items-center gap-6">
            <div>
              <p className="font-serif-luxe italic text-[#D4AF37] text-2xl md:text-3xl">
                — {SHOP.owner}
              </p>
              <p className="text-xs tracking-[0.3em] uppercase text-[#D9C8B4]/80 mt-1">
                Founder & Curator
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
