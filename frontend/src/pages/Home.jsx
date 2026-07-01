import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Collections from "@/components/Collections";
import Heritage from "@/components/Heritage";
import Highlights from "@/components/Highlights";
import Testimonials from "@/components/Testimonials";
import Visit from "@/components/Visit";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

export default function Home() {
  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      data-testid="home-page"
      className="min-h-screen bg-[#110A0C] text-[#FDFBF7] font-body"
    >
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Collections />
        <Heritage />
        <Highlights />
        <Testimonials />
        <Visit />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
