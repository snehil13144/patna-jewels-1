import React, { useEffect, useState, useCallback } from "react";
import { SHOWROOM_GALLERY } from "@/constants/shop";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

// Bento-style span classes for a rich desktop layout; collapses to single column on mobile.
const SPANS = [
  "md:col-span-8 md:row-span-2 aspect-[16/11] md:aspect-auto",
  "md:col-span-4 aspect-[4/3]",
  "md:col-span-4 aspect-[4/3]",
  "md:col-span-4 md:row-span-2 aspect-[4/5] md:aspect-auto",
  "md:col-span-4 aspect-[4/3]",
  "md:col-span-4 aspect-[4/3]",
];

export default function Showroom() {
  const [active, setActive] = useState(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? null : (i - 1 + SHOWROOM_GALLERY.length) % SHOWROOM_GALLERY.length
      ),
    []
  );
  const next = useCallback(
    () =>
      setActive((i) =>
        i === null ? null : (i + 1) % SHOWROOM_GALLERY.length
      ),
    []
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  return (
    <section
      id="showroom"
      data-testid="showroom-section"
      className="relative py-24 md:py-32 bg-[#110A0C]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 md:mb-20 gap-6">
          <div className="reveal">
            <p className="text-[#D4AF37] text-xs md:text-sm tracking-[0.4em] uppercase mb-4">
              Step Inside
            </p>
            <h2 className="font-serif-luxe text-4xl md:text-6xl font-light tracking-tight text-[#FDFBF7] leading-none">
              Our <span className="italic text-[#D4AF37]">Showroom</span>
            </h2>
          </div>
          <p className="max-w-md text-[#D9C8B4] font-light text-base md:text-lg reveal">
            More than a store — a curated space of warm light, hand-polished
            wood and cabinets of gold. Sit, sip chai, and discover heirlooms up
            close.
          </p>
        </div>

        <div
          data-testid="showroom-gallery"
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 auto-rows-[minmax(220px,auto)]"
        >
          {SHOWROOM_GALLERY.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              data-testid={`showroom-image-${i}`}
              aria-label={`Open ${img.caption}`}
              className={`group relative overflow-hidden bg-[#2B171D] border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 transition-all duration-500 reveal text-left ${SPANS[i % SPANS.length]}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1400ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#110A0C] via-[#110A0C]/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

              <div className="absolute inset-0 p-6 md:p-7 flex flex-col justify-end">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37]">
                      Gallery · {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="font-serif-luxe text-xl md:text-2xl text-[#FDFBF7] mt-1">
                      {img.caption}
                    </p>
                  </div>
                  <span className="w-10 h-10 flex items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <Maximize2 size={14} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-10 text-center text-[10px] tracking-[0.35em] uppercase text-[#D9C8B4]/60">
          Tap any image to view fullscreen
        </p>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          data-testid="showroom-lightbox"
          className="fixed inset-0 z-[70] bg-[#110A0C]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          onClick={close}
        >
          <button
            data-testid="lightbox-close"
            className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#110A0C] transition-all"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <button
            data-testid="lightbox-prev"
            className="absolute left-4 md:left-8 w-11 h-11 flex items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#110A0C] transition-all"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            data-testid="lightbox-next"
            className="absolute right-4 md:right-8 w-11 h-11 flex items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#110A0C] transition-all"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>

          <div
            className="relative max-w-6xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={SHOWROOM_GALLERY[active].src}
              alt={SHOWROOM_GALLERY[active].alt}
              className="max-h-[75vh] w-auto object-contain border border-[#D4AF37]/20"
            />
            <div className="mt-5 text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37]">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(SHOWROOM_GALLERY.length).padStart(2, "0")}
              </p>
              <p className="font-serif-luxe text-2xl md:text-3xl text-[#FDFBF7] mt-2">
                {SHOWROOM_GALLERY[active].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
