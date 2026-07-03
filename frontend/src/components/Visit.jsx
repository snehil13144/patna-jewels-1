import React from "react";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { SHOP } from "@/constants/shop";

export default function Visit() {
  const mapQuery = encodeURIComponent(
    "Rajabazar Pal Market Bailey Road Patna"
  );
  return (
    <section
      id="visit"
      data-testid="visit-section"
      className="relative py-24 md:py-32 bg-[#110A0C]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-8">
        <div className="md:col-span-5 reveal">
          <p className="text-[#D4AF37] text-xs md:text-sm tracking-[0.4em] uppercase mb-5">
            Come Say Namaste
          </p>
          <h2 className="font-serif-luxe text-4xl md:text-6xl font-light tracking-tight text-[#FDFBF7] leading-none">
            Visit our
            <br />
            <span className="italic text-[#D4AF37]">showroom.</span>
          </h2>
          <p className="mt-8 text-[#D9C8B4] font-light text-base md:text-lg max-w-md leading-relaxed">
            Step in for a personal viewing. Try, discuss, customise — over a
            warm cup of chai.
          </p>

          <div className="mt-12 space-y-8">
            <InfoRow
              icon={<MapPin size={18} />}
              title="Address"
              value={SHOP.address}
              testId="visit-address"
            />
            <InfoRow
              icon={<Clock size={18} />}
              title="Opening Hours"
              value={SHOP.hours}
              testId="visit-hours"
            />
            <InfoRow
              icon={<Phone size={18} />}
              title="Call Us"
              value={SHOP.phoneDisplay}
              href={`tel:+91${SHOP.phone}`}
              testId="visit-phone"
            />
            <InfoRow
              icon={<Mail size={18} />}
              title="Email"
              value={SHOP.email}
              href={`mailto:${SHOP.email}`}
              testId="visit-email"
            />
          </div>
        </div>

        <div className="md:col-span-7 reveal">
          <div className="relative w-full h-[440px] md:h-[560px] border border-[#D4AF37]/20 overflow-hidden bg-[#1C0F13]">
            <iframe
              title="Abhushan Nirmata Location"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="w-full h-full grayscale contrast-125 opacity-90 hover:opacity-100 transition-opacity duration-500"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              data-testid="visit-map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon, title, value, href, testId }) {
  const inner = (
    <div className="flex items-start gap-5 group">
      <div className="mt-1 w-10 h-10 flex items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#110A0C] transition-all duration-300">
        {icon}
      </div>
      <div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#D9C8B4]/70">
          {title}
        </p>
        <p className="mt-2 font-serif-luxe text-xl md:text-2xl text-[#FDFBF7]">
          {value}
        </p>
      </div>
    </div>
  );
  return href ? (
    <a
      href={href}
      data-testid={testId}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="block"
    >
      {inner}
    </a>
  ) : (
    <div data-testid={testId}>{inner}</div>
  );
}
