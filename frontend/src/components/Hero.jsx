import React from "react";
import { HERO_IMAGE, SHOP } from "@/constants/shop";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Traditional Indian bridal jewellery"
          className="w-full h-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#110A0C] via-[#110A0C]/70 to-[#110A0C]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#110A0C]/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 min-h-screen flex flex-col justify-end pb-24 md:pb-32 pt-32">
        <div className="max-w-3xl">
          <p
            data-testid="hero-eyebrow"
            className="text-[#D4AF37] text-xs md:text-sm tracking-[0.4em] uppercase mb-6 reveal"
          >
            {SHOP.established} · Bailey Road, Patna
          </p>
          <h1
            data-testid="hero-title"
            className="font-serif-luxe text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-tight text-[#FDFBF7] reveal"
          >
            Crafting Legacy,
            <br />
            <span className="italic text-[#D4AF37]">One Jewel</span> at a Time.
          </h1>
          <p
            data-testid="hero-subtitle"
            className="mt-8 md:mt-10 text-base md:text-lg text-[#D9C8B4] font-light leading-relaxed max-w-xl reveal"
          >
            Welcome to <span className="text-[#FDFBF7]">Abhushan Nirmata</span>{" "}
            — Patna’s premier destination for exquisite gold, certified
            diamonds, sterling silver and heirloom bridal collections.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 reveal">
            <a
              href="#collections"
              data-testid="hero-explore-btn"
              className="group inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C5A059] text-[#110A0C] px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300"
            >
              Explore Collections
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#visit"
              data-testid="hero-visit-btn"
              className="inline-flex items-center gap-2 text-[#D9C8B4] hover:text-[#D4AF37] text-xs tracking-[0.3em] uppercase transition-colors link-underline"
            >
              Visit Our Store
            </a>
          </div>
        </div>
      </div>

      {/* Bottom badge */}
      <div className="absolute bottom-8 right-6 md:right-10 z-10 hidden md:flex flex-col items-end gap-1 text-right">
        <span className="text-[10px] tracking-[0.4em] uppercase text-[#D9C8B4]/80">
          Curated by
        </span>
        <span className="font-serif-luxe italic text-[#D4AF37] text-xl">
          {SHOP.owner}
        </span>
      </div>
    </section>
  );
}
