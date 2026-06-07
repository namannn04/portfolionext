"use client";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useTheme } from "@/context/ThemeContext";

export default function ResumeViewer() {
  const { theme } = useTheme();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        border: "3px solid var(--t-border)",
        boxShadow:
          "inset 2px 2px 0 rgba(255,255,255,0.06), inset -2px -2px 0 rgba(0,0,0,0.2), 4px 4px 0 rgba(0,0,0,0.3)",
      }}
    >
      <div className="pdf-viewer-container relative z-10 min-h-[100vh] w-full">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl="/Resume.pdf"
            plugins={[defaultLayoutPluginInstance]}
            theme={{ theme: theme === "dark" ? "dark" : "light" }}
          />
        </Worker>
      </div>
    </div>
  );
}
