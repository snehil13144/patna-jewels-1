import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { INTERESTS, SHOP } from "@/constants/shop";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const initialState = {
  name: "",
  phone: "",
  email: "",
  interest: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, phone and message.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/enquiries`, {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        interest: form.interest || null,
        message: form.message.trim(),
      });
      toast.success("Enquiry sent. We will get back to you shortly.");
      setForm(initialState);
    } catch (err) {
      const detail =
        err?.response?.data?.detail || "Could not send. Please try again.";
      toast.error(typeof detail === "string" ? detail : "Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-24 md:py-32 bg-[#1C0F13]"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-14 md:gap-16">
        <div className="md:col-span-5 reveal">
          <p className="text-[#D4AF37] text-xs md:text-sm tracking-[0.4em] uppercase mb-5">
            Enquire
          </p>
          <h2 className="font-serif-luxe text-4xl md:text-6xl font-light tracking-tight text-[#FDFBF7] leading-[1.05]">
            Have a piece
            <br />
            in <span className="italic text-[#D4AF37]">mind?</span>
          </h2>
          <p className="mt-8 text-[#D9C8B4] font-light text-base md:text-lg leading-relaxed max-w-md">
            Share a few details and our team will curate options that match your
            occasion, budget and style. For instant help, reach us on WhatsApp.
          </p>

          <a
            href={`https://wa.me/${SHOP.whatsapp}`}
            data-testid="contact-whatsapp-link"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-3 border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#110A0C] px-6 py-3 text-xs tracking-[0.3em] uppercase transition-all"
          >
            Chat on WhatsApp
          </a>
        </div>

        <form
          onSubmit={submit}
          data-testid="contact-form"
          className="md:col-span-7 space-y-8 reveal"
        >
          <Field
            label="Your Name"
            testId="contact-name"
            value={form.name}
            onChange={update("name")}
            required
          />
          <div className="grid md:grid-cols-2 gap-8">
            <Field
              label="Phone"
              type="tel"
              testId="contact-phone"
              value={form.phone}
              onChange={update("phone")}
              required
            />
            <Field
              label="Email (optional)"
              type="email"
              testId="contact-email"
              value={form.email}
              onChange={update("email")}
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.35em] uppercase text-[#D9C8B4]/80 mb-3">
              I&apos;m interested in
            </label>
            <select
              data-testid="contact-interest"
              value={form.interest}
              onChange={update("interest")}
              className="w-full bg-transparent border-b border-[#D4AF37]/30 focus:border-[#D4AF37] outline-none py-3 text-[#FDFBF7] tracking-wide"
            >
              <option value="" className="bg-[#1C0F13]">
                — Select category —
              </option>
              {INTERESTS.map((i) => (
                <option key={i} value={i} className="bg-[#1C0F13]">
                  {i}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.35em] uppercase text-[#D9C8B4]/80 mb-3">
              Message
            </label>
            <textarea
              data-testid="contact-message"
              value={form.message}
              onChange={update("message")}
              rows={4}
              required
              placeholder="Tell us what you have in mind..."
              className="w-full bg-transparent border-b border-[#D4AF37]/30 focus:border-[#D4AF37] outline-none py-3 text-[#FDFBF7] placeholder-[#D9C8B4]/40 resize-none"
            />
          </div>

          <button
            type="submit"
            data-testid="contact-submit"
            disabled={submitting}
            className="group inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#C5A059] disabled:opacity-60 disabled:cursor-not-allowed text-[#110A0C] px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all"
          >
            {submitting ? "Sending..." : "Send Enquiry"}
            <Send
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", testId, required }) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.35em] uppercase text-[#D9C8B4]/80 mb-3">
        {label} {required && <span className="text-[#D4AF37]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        data-testid={testId}
        required={required}
        className="w-full bg-transparent border-b border-[#D4AF37]/30 focus:border-[#D4AF37] outline-none py-3 text-[#FDFBF7] placeholder-[#D9C8B4]/40"
      />
    </div>
  );
}
