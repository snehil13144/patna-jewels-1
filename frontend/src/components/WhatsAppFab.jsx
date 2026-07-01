import React from "react";
import { SHOP } from "@/constants/shop";

// Inline WhatsApp icon (avoiding lucide's brand ambiguity for this critical CTA)
const WhatsAppIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.52 3.48A11.87 11.87 0 0 0 12.05 0C5.5 0 .17 5.33.17 11.88c0 2.1.55 4.14 1.6 5.94L0 24l6.35-1.67a11.9 11.9 0 0 0 5.7 1.45h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.15-3.42-8.42Zm-8.47 18.28h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.77.99 1-3.67-.24-.38a9.87 9.87 0 1 1 18.32-5.22c0 5.44-4.43 9.87-9.91 9.87Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.19.3-.76.97-.94 1.17-.17.2-.34.22-.63.07-.3-.15-1.26-.46-2.4-1.48a9.06 9.06 0 0 1-1.67-2.08c-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.19-.24-.58-.49-.5-.66-.51h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.5.71.3 1.26.48 1.69.62.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
  </svg>
);

export default function WhatsAppFab() {
  const href = `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(
    "Hello Abhushan Nirmata, I would like to know more about your collections."
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-testid="whatsapp-fab"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping" />
      <span className="relative flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5b] text-white rounded-full pl-4 pr-5 py-3.5 shadow-2xl shadow-[#25D366]/30 transition-all">
        <WhatsAppIcon size={22} />
        <span className="hidden sm:inline text-xs tracking-[0.25em] uppercase font-medium">
          Chat
        </span>
      </span>
    </a>
  );
}
