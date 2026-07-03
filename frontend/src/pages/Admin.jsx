import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { LogOut, Lock, Mail, Phone, MessageSquare, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const STORAGE_KEY = "abhushan_admin_pw";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enquiries, setEnquiries] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPassword(saved);
      verifyAndLoad(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyAndLoad = async (pw) => {
    setRefreshing(true);
    try {
      const { data } = await axios.get(`${API}/admin/enquiries`, {
        headers: { "X-Admin-Password": pw },
      });
      setEnquiries(data);
      setAuthed(true);
    } catch (err) {
      if (err?.response?.status === 401) {
        sessionStorage.removeItem(STORAGE_KEY);
        setAuthed(false);
      }
    } finally {
      setRefreshing(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    try {
      await axios.post(`${API}/admin/login`, { password });
      sessionStorage.setItem(STORAGE_KEY, password);
      setAuthed(true);
      await verifyAndLoad(password);
      toast.success("Welcome back, Anjan ji.");
    } catch {
      toast.error("Invalid password.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setPassword("");
    setAuthed(false);
    setEnquiries([]);
  };

  if (!authed) {
    return (
      <div
        data-testid="admin-login-page"
        className="min-h-screen bg-[#110A0C] flex items-center justify-center p-6"
      >
        <form
          onSubmit={login}
          data-testid="admin-login-form"
          className="w-full max-w-md bg-[#1C0F13] border border-[#D4AF37]/25 p-10"
        >
          <Link
            to="/"
            className="text-[10px] tracking-[0.35em] uppercase text-[#D9C8B4]/70 hover:text-[#D4AF37]"
          >
            ← Back to site
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <Lock className="text-[#D4AF37]" size={20} />
            <h1 className="font-serif-luxe text-3xl md:text-4xl text-[#FDFBF7]">
              Admin <span className="italic text-[#D4AF37]">Panel</span>
            </h1>
          </div>
          <p className="text-[#D9C8B4] mt-3 text-sm font-light">
            Enter password to view customer enquiries.
          </p>

          <div className="mt-8">
            <label className="block text-[10px] tracking-[0.35em] uppercase text-[#D9C8B4]/80 mb-3">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="admin-password-input"
              autoFocus
              className="w-full bg-transparent border-b border-[#D4AF37]/30 focus:border-[#D4AF37] outline-none py-3 text-[#FDFBF7]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            data-testid="admin-login-submit"
            className="mt-8 w-full bg-[#D4AF37] hover:bg-[#C5A059] disabled:opacity-60 text-[#110A0C] px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium transition-all"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div
      data-testid="admin-dashboard"
      className="min-h-screen bg-[#110A0C] text-[#FDFBF7] pb-20"
    >
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#1C0F13]/90 border-b border-[#D4AF37]/25">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-serif-luxe text-2xl text-[#FDFBF7]">
              Abhushan <span className="italic text-[#D4AF37]">Nirmata</span>
            </span>
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#D9C8B4]/70 mt-1">
              Enquiries Console
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => verifyAndLoad(password)}
              data-testid="admin-refresh-btn"
              className="hidden sm:inline text-xs tracking-[0.25em] uppercase text-[#D9C8B4] hover:text-[#D4AF37]"
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
            <button
              onClick={logout}
              data-testid="admin-logout-btn"
              className="inline-flex items-center gap-2 border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#110A0C] px-5 py-2.5 text-xs tracking-[0.25em] uppercase transition-all"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-10 pt-14">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase mb-3">
              Customer Enquiries
            </p>
            <h2 className="font-serif-luxe text-4xl md:text-5xl font-light text-[#FDFBF7] leading-none">
              {enquiries.length}{" "}
              <span className="italic text-[#D4AF37]">total</span>
            </h2>
          </div>
        </div>

        {enquiries.length === 0 ? (
          <div
            data-testid="admin-empty-state"
            className="bg-[#1C0F13] border border-[#D4AF37]/20 p-16 text-center"
          >
            <p className="font-serif-luxe text-2xl text-[#D9C8B4]">
              No enquiries yet.
            </p>
            <p className="text-[#D9C8B4]/70 mt-2 text-sm">
              When customers submit the contact form, they will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4" data-testid="admin-enquiries-list">
            {enquiries.map((e) => (
              <EnquiryRow key={e.id} enquiry={e} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function EnquiryRow({ enquiry }) {
  const created = new Date(enquiry.created_at);
  const dateStr = created.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return (
    <div
      data-testid={`enquiry-row-${enquiry.id}`}
      className="bg-[#1C0F13] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-colors p-6 md:p-8 grid md:grid-cols-12 gap-6"
    >
      <div className="md:col-span-3">
        <p className="font-serif-luxe text-2xl text-[#FDFBF7]">
          {enquiry.name}
        </p>
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#D9C8B4]/60 mt-2">
          {dateStr}
        </p>
      </div>

      <div className="md:col-span-4 space-y-2 text-sm">
        <p className="flex items-center gap-2 text-[#D9C8B4]">
          <Phone size={13} className="text-[#D4AF37]" />
          <a
            href={`tel:${enquiry.phone}`}
            className="hover:text-[#D4AF37] transition-colors"
          >
            {enquiry.phone}
          </a>
        </p>
        {enquiry.email && (
          <p className="flex items-center gap-2 text-[#D9C8B4]">
            <Mail size={13} className="text-[#D4AF37]" />
            <a
              href={`mailto:${enquiry.email}`}
              className="hover:text-[#D4AF37] transition-colors"
            >
              {enquiry.email}
            </a>
          </p>
        )}
        {enquiry.interest && (
          <p className="flex items-center gap-2 text-[#D9C8B4]">
            <Tag size={13} className="text-[#D4AF37]" />
            {enquiry.interest}
          </p>
        )}
      </div>

      <div className="md:col-span-5">
        <p className="flex items-start gap-2 text-[#D9C8B4] font-light leading-relaxed text-sm">
          <MessageSquare size={13} className="text-[#D4AF37] mt-1 shrink-0" />
          {enquiry.message}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={`https://wa.me/91${enquiry.phone.replace(/\D/g, "").slice(-10)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#25D366] hover:text-[#FDFBF7] transition-colors"
          >
            WhatsApp →
          </a>
          <a
            href={`tel:${enquiry.phone}`}
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] hover:text-[#FDFBF7] transition-colors"
          >
            Call →
          </a>
        </div>
      </div>
    </div>
  );
}
