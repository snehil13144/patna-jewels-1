import React from "react";
import { TESTIMONIALS } from "@/constants/shop";
import { Quote, Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section
      id="reviews"
      data-testid="testimonials-section"
      className="relative py-24 md:py-32 bg-[#1C0F13]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14 md:mb-20 reveal">
          <p className="text-[#D4AF37] text-xs md:text-sm tracking-[0.4em] uppercase mb-5">
            Kind Words
          </p>
          <h2 className="font-serif-luxe text-4xl md:text-6xl font-light tracking-tight text-[#FDFBF7] leading-none">
            Stories from
            <br />
            <span className="italic text-[#D4AF37]">our patrons.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              data-testid={`testimonial-${t.id}`}
              className="relative p-8 bg-[#2B171D] border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 transition-colors duration-500 reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Quote className="text-[#D4AF37] mb-6" size={22} />
              <p className="text-[#D9C8B4] font-light leading-relaxed text-sm md:text-base">
                “{t.text}”
              </p>
              <div className="mt-8 pt-6 border-t border-[#D4AF37]/15 flex items-center justify-between">
                <div>
                  <p className="font-serif-luxe text-lg text-[#FDFBF7]">
                    {t.name}
                  </p>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#D9C8B4]/80 mt-1">
                    {t.city} · {t.piece}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, k) => (
                    <Star
                      key={k}
                      size={11}
                      className="fill-[#D4AF37] text-[#D4AF37]"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
