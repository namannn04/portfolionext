"use client";

import dynamic from "next/dynamic";
import { profile } from "@/content/data";

// PDF.js is browser-only and fairly heavy, so it loads with this page alone.
const PdfViewer = dynamic(() => import("@/components/ui/PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto aspect-[1/1.414] w-full max-w-[52rem] animate-pulse rounded-[1.5rem] bg-ink-3/60" />
  ),
});

export default function ResumeViewer({ src }: { src: string }) {
  return <PdfViewer src={src} title={`${profile.name} resume`} />;
}
