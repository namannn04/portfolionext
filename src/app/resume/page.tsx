import type { Metadata } from "next";
import { profile } from "@/content/data";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name}, ${profile.role}.`,
};

export default function ResumePage() {
  return (
    <main className="relative z-10 min-h-svh pt-28 pb-24 md:pt-36">
      <div className="shell">
        <div className="flex flex-col gap-8 border-b border-line/60 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Resume</p>
            <h1 className="display mt-4 text-[clamp(3rem,9vw,7.5rem)]">Curriculum vitae</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/Resume.pdf"
              download="Naman-Dadhich-Resume.pdf"
              className="inline-flex h-12 items-center gap-3 rounded-full bg-accent px-6 font-medium text-accent-ink transition-transform active:scale-[0.97]"
            >
              Download PDF <span aria-hidden="true">↓</span>
            </a>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-6 font-medium transition-colors hover:border-fg"
            >
              Open in new tab <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-line/70 bg-ink-2">
          <object
            data="/Resume.pdf#view=FitH"
            type="application/pdf"
            className="block h-[82svh] w-full"
            aria-label="Resume PDF"
          >
            <div className="grid place-items-center gap-4 p-10 text-center text-fg-2">
              <p>Your browser can’t preview PDFs inline.</p>
              <a href="/Resume.pdf" className="link-underline text-fg">
                Open the resume
              </a>
            </div>
          </object>
        </div>
      </div>
    </main>
  );
}
