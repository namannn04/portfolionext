"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import { cn } from "@/lib/utils";

const ZOOM_STEPS = [0.75, 1, 1.25, 1.5, 2];

/**
 * Renders a PDF to canvases with PDF.js so it displays the same on every
 * device (mobile browsers can't show PDFs inline in <object>/<iframe>).
 */
export default function PdfViewer({ src, title }: { src: string; title: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(0);

  // Load the document once.
  useEffect(() => {
    let cancelled = false;
    let loaded: PDFDocumentProxy | null = null;
    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();
        loaded = await pdfjs.getDocument(src).promise;
        if (cancelled) return loaded.destroy();
        setDoc(loaded);
        setStatus("ready");
      } catch (error) {
        console.error("Failed to load PDF", error);
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
      loaded?.destroy();
    };
  }, [src]);

  // Track the available width so pages re-render crisply on resize.
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pages = doc ? Array.from({ length: doc.numPages }, (_, index) => index + 1) : [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs text-mute">
          {status === "ready" && doc ? `${doc.numPages} page${doc.numPages > 1 ? "s" : ""}` : "Loading PDF…"}
        </p>
        <div className="flex items-center gap-1 rounded-full border border-line/80 bg-ink-2/80 p-1 backdrop-blur-md">
          <ZoomButton label="Zoom out" disabled={zoom <= ZOOM_STEPS[0]} onClick={() => setZoom((z) => step(z, -1))}>
            −
          </ZoomButton>
          <button
            type="button"
            onClick={() => setZoom(1)}
            className="min-w-14 rounded-full px-2 py-1 font-mono text-xs text-fg-2 tabular-nums hover:text-fg"
            aria-label="Reset zoom"
          >
            {Math.round(zoom * 100)}%
          </button>
          <ZoomButton
            label="Zoom in"
            disabled={zoom >= ZOOM_STEPS[ZOOM_STEPS.length - 1]}
            onClick={() => setZoom((z) => step(z, 1))}
          >
            +
          </ZoomButton>
        </div>
      </div>

      <div
        ref={container}
        data-lenis-prevent
        className="relative overflow-auto rounded-[1.5rem] border border-line/70 bg-ink-3/70 p-3 sm:p-6"
        style={{ maxHeight: zoom > 1 ? "85svh" : undefined }}
      >
        {status === "loading" && (
          <div className="mx-auto aspect-[1/1.414] w-full max-w-[52rem] animate-pulse rounded-lg bg-fg/5" />
        )}
        {status === "error" && (
          <div className="grid min-h-64 place-items-center gap-3 text-center text-fg-2">
            <p>The preview couldn’t load here.</p>
            <a href={src} target="_blank" rel="noreferrer" className="link-underline text-fg">
              Open the PDF directly
            </a>
          </div>
        )}
        {doc && width > 0 && (
          <div className="mx-auto flex flex-col items-center gap-4 sm:gap-6">
            {pages.map((number) => (
              <PdfPage key={number} doc={doc} number={number} width={width} zoom={zoom} title={title} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function step(current: number, direction: 1 | -1) {
  const index = ZOOM_STEPS.indexOf(current);
  const next = Math.min(Math.max((index === -1 ? 1 : index) + direction, 0), ZOOM_STEPS.length - 1);
  return ZOOM_STEPS[next];
}

function ZoomButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-8 place-items-center rounded-full text-lg text-fg-2 transition-colors hover:bg-ink-3 hover:text-fg disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function PdfPage({
  doc,
  number,
  width,
  zoom,
  title,
}: {
  doc: PDFDocumentProxy;
  number: number;
  width: number;
  zoom: number;
  title: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [rendered, setRendered] = useState(false);

  const render = useCallback(async () => {
    const el = canvas.current;
    if (!el) return null;
    const page = await doc.getPage(number);
    const base = page.getViewport({ scale: 1 });
    // Fit the container (capped at a comfortable reading width), then zoom.
    const cssWidth = Math.min(width - 2, 832) * zoom;
    const scale = cssWidth / base.width;
    const ratio = Math.min(window.devicePixelRatio || 1, 3);
    const viewport = page.getViewport({ scale: scale * ratio });
    el.width = Math.floor(viewport.width);
    el.height = Math.floor(viewport.height);
    el.style.width = `${Math.floor(viewport.width / ratio)}px`;
    el.style.height = `${Math.floor(viewport.height / ratio)}px`;
    const task: RenderTask = page.render({ canvasContext: el.getContext("2d")!, viewport });
    return task;
  }, [doc, number, width, zoom]);

  useEffect(() => {
    let task: RenderTask | null = null;
    let cancelled = false;
    render().then((t) => {
      if (!t) return;
      if (cancelled) return t.cancel();
      task = t;
      t.promise.then(() => !cancelled && setRendered(true)).catch(() => undefined);
    });
    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [render]);

  return (
    <canvas
      ref={canvas}
      role="img"
      aria-label={`${title}, page ${number}`}
      className={cn(
        "max-w-none rounded-md bg-white shadow-[0_20px_60px_-20px_rgb(0_0_0/0.7)] transition-opacity duration-500",
        rendered ? "opacity-100" : "opacity-0",
      )}
    />
  );
}
