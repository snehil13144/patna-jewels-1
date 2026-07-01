import React, { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS, SHOP } from "@/constants/shop";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[#1C0F13]/80 border-b border-[#D4AF37]/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
        <a
          href="#home"
          data-testid="nav-logo"
          className="flex flex-col leading-none"
        >
          <span className="font-serif-luxe text-2xl md:text-3xl tracking-wide text-[#FDFBF7]">
            Abhushan{" "}
            <span className="text-[#D4AF37] italic font-light">Nirmata</span>
          </span>
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#D9C8B4]/70 mt-1">
            Patna · {SHOP.established}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className="text-sm tracking-[0.18em] uppercase text-[#D9C8B4] hover:text-[#D4AF37] transition-colors link-underline"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={`tel:+91${SHOP.phone}`}
          data-testid="nav-call-btn"
          className="hidden md:inline-flex items-center gap-2 border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#110A0C] px-5 py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-300"
        >
          <Phone size={14} /> Call Store
        </a>

        <button
          data-testid="nav-mobile-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-[#FDFBF7] p-2"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          data-testid="nav-mobile-menu"
          className="md:hidden bg-[#1C0F13] border-t border-[#D4AF37]/20 px-6 py-8"
        >
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={close}
                className="text-sm tracking-[0.2em] uppercase text-[#D9C8B4] hover:text-[#D4AF37]"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`tel:+91${SHOP.phone}`}
              onClick={close}
              className="inline-flex items-center gap-2 text-[#D4AF37] text-sm tracking-[0.2em] uppercase mt-2"
            >
              <Phone size={14} /> Call Store
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
