import React from "react";
import { SHOP, NAV_LINKS } from "@/constants/shop";
import { Mail, Facebook, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative bg-[#110A0C] border-t border-[#D4AF37]/20 pt-20 pb-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <h3 className="font-serif-luxe text-3xl md:text-4xl text-[#FDFBF7]">
            Abhushan <span className="italic text-[#D4AF37]">Nirmata</span>
          </h3>
          <p className="mt-4 text-[#D9C8B4] font-light max-w-sm">
            Crafting heirloom jewellery on Bailey Road, Patna since 1975.
            Curated by {SHOP.owner}.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <SocialIcon href={`mailto:${SHOP.email}`} label="Email">
              <Mail size={16} />
            </SocialIcon>
            <SocialIcon href={SHOP.facebook} label="Facebook">
              <Facebook size={16} />
            </SocialIcon>
            <SocialIcon href={`tel:+91${SHOP.phone}`} label="Call">
              <Phone size={16} />
            </SocialIcon>
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] mb-6">
            Explore
          </p>
          <ul className="space-y-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[#D9C8B4] hover:text-[#D4AF37] tracking-wide font-light"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] mb-6">
            Visit
          </p>
          <p className="flex items-start gap-3 text-[#D9C8B4] font-light">
            <MapPin size={16} className="text-[#D4AF37] mt-1" />
            {SHOP.address}
          </p>
          <p className="mt-4 text-[#D9C8B4] font-light">Open: {SHOP.hours}</p>
          <a
            href={`tel:+91${SHOP.phone}`}
            className="mt-4 inline-block font-serif-luxe text-2xl text-[#FDFBF7] hover:text-[#D4AF37] transition-colors"
          >
            {SHOP.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-16 pt-8 border-t border-[#D4AF37]/15 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs tracking-widest text-[#D9C8B4]/70 uppercase">
          © {new Date().getFullYear()} Abhushan Nirmata · All rights reserved
        </p>
        <p className="text-xs tracking-widest text-[#D9C8B4]/60 uppercase">
          Rajabazar · Bailey Road · Patna
        </p>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="w-10 h-10 flex items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#110A0C] transition-all"
    >
      {children}
    </a>
  );
}
