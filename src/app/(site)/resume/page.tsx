"use client";

import dynamic from "next/dynamic";
import { DownloadCloud, FileText } from "lucide-react";

const ResumeViewer = dynamic(() => import("@/components/ResumeViewer"), {
  loading: () => (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div className="flex gap-1.5">
        {["var(--mc-grass)", "var(--mc-diamond)", "var(--mc-gold)", "var(--mc-redstone)"].map(
          (color, i) => (
            <div
              key={color}
              className="h-4 w-4 animate-bounce"
              style={{
                background: color,
                animationDelay: `${i * 0.1}s`,
                boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.2), inset -1px -1px 0 rgba(0,0,0,0.3)",
              }}
            />
          )
        )}
      </div>
      <p className="text-sm font-medium uppercase tracking-wider text-mc-grass" style={{ textShadow: "0 0 8px var(--mc-grass)" }}>
        ⛏️ Loading resume...
      </p>
    </div>
  ),
  ssr: false,
});

export default function ResumePage() {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(var(--mc-stone) 1px, transparent 1px), linear-gradient(90deg, var(--mc-stone) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10">
        <div className="mb-6 text-center">
          <div className="mb-4 flex items-center justify-center space-x-3">
            <div
              className="p-2"
              style={{
                background: "var(--mc-gold)",
                boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.2), inset -1px -1px 0 rgba(0,0,0,0.3), 2px 2px 0 rgba(0,0,0,0.3)",
              }}
            >
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h1
              className="text-3xl font-black uppercase tracking-wider text-mc-grass"
              style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.5)" }}
            >
              My Resume
            </h1>
          </div>
          <p className="mx-auto mb-4 max-w-xl text-t-text2">
            View and download my professional resume to learn more about my skills and experience.
          </p>
          <button
            className="inline-flex cursor-pointer items-center px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "var(--mc-grass)",
              border: "2px solid rgba(0,0,0,0.2)",
              boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.2), inset -2px -2px 0 rgba(0,0,0,0.3), 3px 3px 0 rgba(0,0,0,0.3)",
            }}
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/Resume.pdf";
              link.download = "Resume.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <DownloadCloud className="mr-2 h-4 w-4" /> Download Resume
          </button>
        </div>

        <ResumeViewer />
      </div>
    </div>
  );
}
