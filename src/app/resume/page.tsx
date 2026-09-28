import type { Metadata } from "next";
import { profile } from "@/content/data";
import ResumeViewer from "./ResumeViewer";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name}, ${profile.role}.`,
};

const RESUME = "/Resume.pdf";

export default function ResumePage() {
  return (
    <main className="relative z-10 min-h-svh pt-28 pb-24 md:pt-36">
      <div className="shell">
        <div className="flex flex-col gap-8 border-b border-line/60 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-accent" />
              Resume
            </p>
            <h1 className="display mt-4 text-[clamp(3rem,9vw,7.5rem)]">Curriculum vitae</h1>
            <p className="mt-4 max-w-[46ch] text-fg-2">
              {profile.role} based in {profile.location}. Always happy to walk through any of it on a call.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={RESUME}
              download="Naman-Dadhich-Resume.pdf"
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-accent pr-2 pl-6 font-medium text-accent-ink transition-transform active:scale-[0.97]"
            >
              Download PDF
              <span className="grid size-8 place-items-center rounded-full bg-accent-ink text-accent transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
            <a
              href={RESUME}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-6 font-medium transition-colors hover:border-fg"
            >
              Open in new tab <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="mt-10">
          <ResumeViewer src={RESUME} />
        </div>
      </div>
    </main>
  );
}
