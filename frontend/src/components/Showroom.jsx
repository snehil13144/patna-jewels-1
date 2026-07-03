import React, { useEffect, useState, useCallback } from "react";
import { SHOWROOM_GALLERIES } from "@/constants/shop";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

// Flatten all images across galleries so the lightbox can navigate freely
// while still knowing which gallery an image belongs to.
const buildFlatList = () => {
  const flat = [];
  SHOWROOM_GALLERIES.forEach((g) => {
    g.images.forEach((img, idx) => {
      flat.push({
        ...img,
        galleryId: g.id,
        galleryName: g.name,
        indexInGallery: idx,
        total: g.images.length,
      });
    });
  });
  return flat;
};

// A single gallery block: heading + responsive image grid.
function GalleryBlock({ gallery, flatOffset, onOpen, blockIndex }) {
  const isEven = blockIndex % 2 === 0;

  // Layout: first image large + rest as smaller tiles
  // 3 images: [big] [small] [small]
  // 4 images: [big] [small] [small] [small]
  const [first, ...rest] = gallery.images;

  return (
    <div
      data-testid={`gallery-block-${gallery.id}`}
      className="mb-24 md:mb-32 last:mb-0"
    >
      {/* Header */}
      <div
        className={`grid md:grid-cols-12 gap-6 md:gap-10 mb-10 md:mb-14 items-end ${
          isEven ? "" : "md:[direction:rtl] md:[&>*]:[direction:ltr]"
        }`}
      >
        <div className="md:col-span-7 reveal">
          <p className="text-[#D4AF37] text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4">
            Gallery · {String(blockIndex + 1).padStart(2, "0")}
          </p>
          <h3 className="font-serif-luxe text-3xl md:text-5xl font-light tracking-tight text-[#FDFBF7] leading-[1.05]">
            {gallery.name}{" "}
            <span className="italic text-[#D4AF37]">Gallery</span>
          </h3>
          <div className="gold-divider mt-6 max-w-[120px]" />
        </div>
        <div className="md:col-span-5 reveal">
          <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-[#D4AF37]/90 mb-3">
            {gallery.subtitle}
          </p>
          <p className="text-[#D9C8B4] font-light text-base md:text-lg leading-relaxed">
            {gallery.description}
          </p>
        </div>
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        {/* Big feature image */}
        <button
          type="button"
          onClick={() => onOpen(flatOffset)}
          data-testid={`gallery-${gallery.id}-image-0`}
          aria-label={`Open ${first.alt}`}
          className="group relative overflow-hidden bg-[#2B171D] border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 transition-all duration-500 reveal md:col-span-7 aspect-[16/11] md:aspect-[4/3] text-left"
        >
          <img
            src={first.src}
            alt={first.alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1400ms] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#110A0C]/80 via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
          <span className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37] bg-[#110A0C]/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <Maximize2 size={14} />
          </span>
        </button>

        {/* Right-side smaller tiles */}
        <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-5">
          {rest.slice(0, 3).map((img, i) => (
            <button
              key={img.src + i}
              type="button"
              onClick={() => onOpen(flatOffset + i + 1)}
              data-testid={`gallery-${gallery.id}-image-${i + 1}`}
              aria-label={`Open ${img.alt}`}
              className="group relative overflow-hidden bg-[#2B171D] border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 transition-all duration-500 reveal aspect-[4/3] text-left"
              style={{ transitionDelay: `${(i + 1) * 80}ms` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1400ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#110A0C]/70 via-transparent to-transparent opacity-90 group-hover:opacity-50 transition-opacity duration-500" />
              <span className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37] bg-[#110A0C]/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500">
                <Maximize2 size={12} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Showroom() {
  const flatList = buildFlatList();
  const [active, setActive] = useState(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? null : (i - 1 + flatList.length) % flatList.length
      ),
    [flatList.length]
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? null : (i + 1) % flatList.length)),
    [flatList.length]
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

  // Precompute flat offset for each gallery
  let offsetCursor = 0;
  const withOffsets = SHOWROOM_GALLERIES.map((g) => {
    const entry = { gallery: g, offset: offsetCursor };
    offsetCursor += g.images.length;
    return entry;
  });

  return (
    <section
      id="showroom"
      data-testid="showroom-section"
      className="relative py-24 md:py-32 bg-[#110A0C]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section intro */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24 gap-6">
          <div className="reveal">
            <p className="text-[#D4AF37] text-xs md:text-sm tracking-[0.4em] uppercase mb-4">
              Step Inside
            </p>
            <h2 className="font-serif-luxe text-4xl md:text-6xl font-light tracking-tight text-[#FDFBF7] leading-none">
              Our <span className="italic text-[#D4AF37]">Showroom</span>
            </h2>
          </div>
          <p className="max-w-md text-[#D9C8B4] font-light text-base md:text-lg reveal">
            Five curated spaces, each dedicated to a facet of the craft. Walk
            through our showroom, one gallery at a time.
          </p>
        </div>

        {/* Gallery jump-nav */}
        <div
          data-testid="showroom-galleries-nav"
          className="flex flex-wrap gap-x-8 gap-y-3 mb-16 md:mb-20 border-y border-[#D4AF37]/15 py-5 reveal"
        >
          {SHOWROOM_GALLERIES.map((g, i) => (
            <a
              key={g.id}
              href={`#gallery-${g.id}`}
              className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-[#D9C8B4] hover:text-[#D4AF37] transition-colors"
            >
              <span className="text-[#D4AF37] mr-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              {g.name}
            </a>
          ))}
        </div>

        {/* Stacked galleries */}
        <div>
          {withOffsets.map(({ gallery, offset }, i) => (
            <div id={`gallery-${gallery.id}`} key={gallery.id}>
              <GalleryBlock
                gallery={gallery}
                flatOffset={offset}
                onOpen={setActive}
                blockIndex={i}
              />
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-[10px] tracking-[0.35em] uppercase text-[#D9C8B4]/60">
          Tap any image to view fullscreen · Use ← → keys to navigate
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
            className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#110A0C] transition-all z-10"
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
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#110A0C] transition-all z-10"
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
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#110A0C] transition-all z-10"
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
              src={flatList[active].src}
              alt={flatList[active].alt}
              className="max-h-[75vh] w-auto object-contain border border-[#D4AF37]/20"
            />
            <div className="mt-5 text-center">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37]">
                {flatList[active].galleryName} · Gallery
              </p>
              <p className="font-serif-luxe text-2xl md:text-3xl text-[#FDFBF7] mt-2">
                {flatList[active].alt}
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#D9C8B4]/60 mt-2">
                {String(flatList[active].indexInGallery + 1).padStart(2, "0")} /{" "}
                {String(flatList[active].total).padStart(2, "0")} in gallery
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
