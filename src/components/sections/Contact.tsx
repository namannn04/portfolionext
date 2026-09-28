"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { profile } from "@/content/data";
import { Magnetic, Reveal, SplitText, ease } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

type Status = { type: "idle" | "sending" | "success" | "error"; message?: string };

function Field({
  label,
  name,
  type = "text",
  multiline = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
}) {
  const shared =
    "peer w-full rounded-none border-0 border-b border-line bg-transparent pt-7 pb-3 text-lg text-fg outline-none transition-colors placeholder:text-transparent focus:border-accent focus-visible:outline-none";
  return (
    <label className="relative block">
      {multiline ? (
        <textarea name={name} required rows={4} placeholder={label} className={cn(shared, "resize-none")} />
      ) : (
        <input name={name} type={type} required placeholder={label} autoComplete={autoComplete} className={shared} />
      )}
      <span className="pointer-events-none absolute top-7 left-0 origin-left text-lg text-mute transition-all duration-300 ease-out-expo peer-focus:top-0 peer-focus:text-xs peer-focus:tracking-wide peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:tracking-wide">
        {label}
      </span>
    </label>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [copied, setCopied] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ type: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Something went wrong.");
      form.reset();
      setStatus({ type: "success", message: "Thanks, your message is on its way. I’ll reply soon." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Couldn’t send your message. Please try again.",
      });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative py-28 md:py-40">
      <div className="shell">
        <Reveal className="flex items-center gap-3">
          <span className="font-mono text-xs text-accent">06</span>
          <span className="h-px w-8 bg-line" />
          <span className="eyebrow">Contact</span>
        </Reveal>

        <h2 className="display mt-6 text-[clamp(3.25rem,11vw,10.5rem)] leading-[0.88]">
          <SplitText text="Let’s build" />
          <br />
          <span className="text-fg-2">
            <SplitText text="something good." delay={0.12} />
          </span>
        </h2>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-10 md:col-span-5">
            <Reveal>
              <p className="max-w-[38ch] text-lg leading-relaxed text-fg-2">
                Have a role, a project or a hackathon in mind? Send a note. I usually reply within a day or two.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="eyebrow mb-3">Email</p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={`mailto:${profile.email}`} className="link-underline text-lg break-all text-fg md:text-xl">
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="rounded-full border border-line px-3 py-1 font-mono text-xs text-fg-2 transition-colors hover:border-fg hover:text-fg"
                  aria-live="polite"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow mb-3">Elsewhere</p>
              <ul className="flex flex-wrap gap-2">
                {profile.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-fg-2 transition-colors hover:border-fg hover:text-fg"
                    >
                      {social.label} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="md:col-span-7 md:col-start-6" delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-[1.75rem] border border-line/70 bg-ink-2/85 p-6 backdrop-blur-md md:p-10"
            >
              <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                <Field label="Your name" name="name" autoComplete="name" />
                <Field label="Email address" name="email" type="email" autoComplete="email" />
              </div>
              <div className="mt-6 md:mt-8">
                <Field label="What are you working on?" name="message" multiline />
              </div>
              <div className="mt-10 flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
                <AnimatePresence mode="wait">
                  {status.message ? (
                    <motion.p
                      key={status.type}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      role={status.type === "error" ? "alert" : "status"}
                      className={cn("text-sm", status.type === "error" ? "text-red-300" : "text-accent")}
                    >
                      {status.message}
                    </motion.p>
                  ) : (
                    <span className="text-sm text-mute">All fields are required.</span>
                  )}
                </AnimatePresence>
                <Magnetic>
                  <button
                    type="submit"
                    disabled={status.type === "sending"}
                    className="group inline-flex h-13 items-center gap-3 rounded-full bg-accent pr-2 pl-7 font-medium text-accent-ink transition-[transform,opacity] duration-300 active:scale-[0.97] disabled:opacity-60"
                  >
                    {status.type === "sending" ? "Sending…" : "Send message"}
                    <span className="grid size-9 place-items-center rounded-full bg-accent-ink text-accent transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]">
                      →
                    </span>
                  </button>
                </Magnetic>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
