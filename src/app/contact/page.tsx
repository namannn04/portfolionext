"use client";

import type React from "react";
import { useState } from "react";
import { MessageSquare, User, Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({ type: "idle", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({ type: "success", message: "Message sent successfully! We will get back to you soon." });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", message: data.error || "Failed to send message. Please try again." });
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatus({ type: "error", message: "Network error. Please check your connection and try again." });
    }
  };

  return (
    <div className="sm:block sm:py-20 bg-t-bg">
      <div className="sm:max-w-[90%] lg:max-w-[50%] mx-auto"><Navbar /></div>
      <div
        className="relative overflow-hidden min-h-screen sm:max-w-[90%] lg:max-w-[50%] mx-auto p-6"
        style={{
          border: "none",
        }}
      >
        {/* MC Grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(var(--mc-stone) 1px, transparent 1px), linear-gradient(90deg, var(--mc-stone) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Outer MC border on desktop */}
        <div
          className="hidden sm:block absolute inset-0 pointer-events-none"
          style={{
            border: "3px solid var(--t-border)",
            boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.06), inset -2px -2px 0 rgba(0,0,0,0.2), 4px 4px 0 rgba(0,0,0,0.25)",
          }}
        />

        {/* Main form panel */}
        <div
          className="relative z-10 p-6 md:p-8"
          style={{
            background: "var(--t-surface)",
            border: "3px solid var(--t-border)",
            boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.08), inset -2px -2px 0 rgba(0,0,0,0.25), 4px 4px 0 rgba(0,0,0,0.3)",
          }}
        >
          {/* Panel header */}
          <div
            className="px-5 py-3 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6 flex items-center gap-3"
            style={{
              background: "var(--t-bg2)",
              borderBottom: "2px solid var(--t-border)",
            }}
          >
            <div className="w-2 h-2 bg-mc-redstone" />
            <div className="w-2 h-2 bg-mc-gold" />
            <div className="w-2 h-2 bg-mc-grass" />
            <span className="text-t-muted text-sm ml-2 uppercase tracking-wider font-medium">📬 Message Craft</span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-black mb-2 text-mc-grass uppercase tracking-wide"
            style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.5), 4px 4px 0 rgba(0,0,0,0.15)" }}
          >
            Get in Touch
          </h1>
          <p className="text-t-muted mb-6 leading-relaxed">
            I am always open to exploring new collaborations and exciting opportunities. Whether it is a project idea, a job opportunity, or simply a chance to connect, feel free to reach out!
          </p>

          {/* Social Links - Inventory */}
          <div className="flex justify-center mb-6">
            <div
              className="flex items-center gap-1 p-1.5"
              style={{
                background: "var(--t-bg2)",
                border: "2px solid var(--t-border)",
                boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.06), inset -1px -1px 0 rgba(0,0,0,0.2)",
              }}
            >
              {[
                { icon: "linkedin", url: "https://linkedin.com/in/namannn04", label: "LinkedIn" },
                { icon: "github", url: "https://github.com/namannn04", label: "GitHub" },
                { icon: "discord", url: "https://discord.com/users/736213483581866053", label: "Discord" },
                { icon: "twitter-x", url: "https://x.com/namannn04", label: "X" },
                { icon: "instagram", url: "https://instagram.com/namannn04", label: "Instagram" },
              ].map((social) => (
                <a
                  key={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mc-slot flex items-center justify-center w-10 h-10 transition-all hover:scale-110 text-mc-grass hover:text-mc-emerald"
                  aria-label={social.label}
                >
                  {social.icon === "linkedin" && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>}
                  {social.icon === "github" && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>}
                  {social.icon === "discord" && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.8731.8914.0766.0766 0 00-.0407.1067c.3606.698.7721 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.0204 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9746 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" /></svg>}
                  {social.icon === "twitter-x" && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" /></svg>}
                  {social.icon === "instagram" && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>}
                </a>
              ))}
            </div>
          </div>

          {/* Status alerts */}
          <AnimatePresence mode="wait">
            {status.type !== "idle" && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="my-4">
                <Alert
                  className="rounded-none"
                  style={{
                    background: status.type === "success" ? "rgba(92,184,92,0.1)" : status.type === "error" ? "rgba(192,57,43,0.1)" : "rgba(85,178,212,0.1)",
                    border: `2px solid ${status.type === "success" ? "var(--mc-grass)" : status.type === "error" ? "var(--mc-redstone)" : "var(--mc-diamond)"}`,
                    boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.05), inset -1px -1px 0 rgba(0,0,0,0.15)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    {status.type === "loading" && <Loader2 className="h-5 w-5 text-mc-diamond animate-spin" />}
                    {status.type === "success" && <CheckCircle className="h-5 w-5 text-mc-grass" />}
                    {status.type === "error" && <AlertCircle className="h-5 w-5 text-mc-redstone" />}
                    <AlertDescription className={`font-medium ${status.type === "success" ? "text-mc-grass" : status.type === "error" ? "text-mc-redstone" : "text-mc-diamond"}`}>
                      {status.message}
                    </AlertDescription>
                  </div>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block mb-2 text-mc-grass font-medium text-sm uppercase tracking-wider">⚔️ Name</label>
              <div className="relative group">
                <User className="absolute left-3 top-3 h-5 w-5 text-t-dim group-hover:text-mc-grass transition-colors" />
                <Input
                  id="name" name="name" placeholder="Steve..." value={form.name} onChange={handleChange} required
                  className="pl-10 h-12 rounded-none bg-t-input text-t-text"
                  style={{
                    border: "2px solid var(--t-border)",
                    boxShadow: "inset 1px 1px 0 rgba(0,0,0,0.2), inset -1px -1px 0 rgba(255,255,255,0.05)",
                  }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-mc-diamond font-medium text-sm uppercase tracking-wider">💎 Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-t-dim group-hover:text-mc-diamond transition-colors" />
                <Input
                  id="email" name="email" type="email" placeholder="steve@minecraft.net" value={form.email} onChange={handleChange} required
                  className="pl-10 h-12 rounded-none bg-t-input text-t-text"
                  style={{
                    border: "2px solid var(--t-border)",
                    boxShadow: "inset 1px 1px 0 rgba(0,0,0,0.2), inset -1px -1px 0 rgba(255,255,255,0.05)",
                  }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-mc-gold font-medium text-sm uppercase tracking-wider">📜 Message</label>
              <div className="relative group">
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-t-dim group-hover:text-mc-gold transition-colors" />
                <Textarea
                  id="message" name="message" placeholder="Your message on a sign..." value={form.message} onChange={handleChange} required
                  className="pl-10 min-h-[150px] rounded-none bg-t-input text-t-text"
                  style={{
                    border: "2px solid var(--t-border)",
                    boxShadow: "inset 1px 1px 0 rgba(0,0,0,0.2), inset -1px -1px 0 rgba(255,255,255,0.05)",
                  }}
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={status.type === "loading"}
              className="w-full h-12 text-white font-bold uppercase tracking-wider rounded-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:scale-[1.01] active:scale-[0.99]"
              style={{
                background: "var(--mc-grass)",
                border: "2px solid rgba(0,0,0,0.2)",
                boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.2), inset -2px -2px 0 rgba(0,0,0,0.3), 3px 3px 0 rgba(0,0,0,0.3)",
                borderRadius: "0",
              }}
            >
              {status.type === "loading" ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Crafting Message...</>) : (<>Send Message <Send className="ml-2 h-4 w-4" /></>)}
            </Button>
          </form>

          {/* Email Alt */}
          <div
            className="mt-6 p-4 text-center"
            style={{
              background: "var(--t-bg2)",
              border: "2px solid var(--t-border)",
              boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.05), inset -1px -1px 0 rgba(0,0,0,0.2)",
            }}
          >
            <p className="text-t-muted">
              or mail me at{" "}
              <span className="text-mc-diamond hover:text-mc-grass transition-colors font-medium">
                reachout2naman@gmail.com
              </span>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
