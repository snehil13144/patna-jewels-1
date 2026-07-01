# Abhushan Nirmata — Product Requirements Document

## Problem Statement
Build a website for a jewellery shop named "Abhushan Nirmata" in Rajabazar, Bailey Road, Patna.

## User Choices (2026-01-01)
- Type: Showcase/catalog website — no online payments
- Categories: Gold, Diamond, Silver, Bridal collections
- Features: Contact/enquiry form, WhatsApp integration, testimonials, Instagram/social
- Design: Luxury & elegant (dark maroon + metallic gold, editorial serif)
- Owner: Anjan Kumar
- Phone: 9113777874  ·  WhatsApp: 919113777874
- Address: Rajabazar Pal Market, opposite Pillar No. 65, Bailey Road, Patna
- Hours: 12:00 PM – 8:30 PM (All days)

## Architecture
- Frontend: React 19 + Tailwind + shadcn/ui + sonner (toasts) + lucide-react
- Backend: FastAPI + Motor + MongoDB (single collection `enquiries`)
- Fonts: Cormorant Garamond (headings), Outfit (body)
- Palette: #110A0C bg · #1C0F13 secondary · #2B171D cards · #D4AF37 gold · #FDFBF7 text

## Backend Routes
- GET  `/api/` — health check
- POST `/api/enquiries` — create enquiry {name, phone, message, email?, interest?}
- GET  `/api/enquiries` — list, newest first (admin/testing)

## User Personas
- Bride-to-be / family shopping for wedding jewellery
- Local Patna resident looking for gold investment / gifting
- Diamond / silver buyer browsing before store visit

## Implemented (v1 — 2026-01-01)
- Hero with brand story + dual CTAs
- Auto-scrolling assurances marquee (BIS, hallmark, etc.)
- Bento-grid Collections (Gold / Bridal / Diamond / Silver) → each links to prefilled WhatsApp
- Heritage / About with owner spotlight
- 25+ years / 10k families highlights strip
- 4 customer testimonials with 5-star ratings
- Visit section: address, hours, phone, Instagram + embedded Google Map
- Contact/enquiry form → saves to MongoDB, sonner toast feedback
- Floating WhatsApp CTA (pulse ring)
- Responsive luxury footer

## Backlog (P1)
- Actual product photography catalog (grid + lightbox) per category
- Real Instagram feed integration (Instagram Basic Display API)
- Store timings dynamic + festival announcements banner
- Simple admin panel to view enquiries (auth)

## Backlog (P2)
- Multi-language (Hindi + English)
- Certificate/hallmark explainer content
- Gold rate ticker (live daily rate for Patna)
- Appointment booking calendar

## Next Action Items
- Replace stock photography with real product shots when available
- Configure real Instagram + Facebook links (currently placeholder)
- Optional: hook a WhatsApp/Email notification when a new enquiry arrives
