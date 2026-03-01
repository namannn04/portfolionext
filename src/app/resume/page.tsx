"use client";

import { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { DownloadCloud, FileText } from "lucide-react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useTheme } from "@/context/ThemeContext";

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => { setIsLoading(false); }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="sm:block sm:pt-20 py-20 bg-t-bg min-h-screen text-t-text">
      <div className="sm:max-w-[90%] lg:max-w-[50%] mx-auto"><Navbar /></div>
      <div className="relative overflow-hidden sm:max-w-[90%] lg:max-w-[50%] mx-auto p-4 sm:p-6 mt-6">
        {/* MC Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(var(--mc-stone) 1px, transparent 1px), linear-gradient(90deg, var(--mc-stone) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="hidden sm:block absolute inset-0 pointer-events-none" style={{ border: "3px solid var(--t-border)", boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.06), inset -2px -2px 0 rgba(0,0,0,0.2), 4px 4px 0 rgba(0,0,0,0.25)" }} />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
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
                className="text-3xl font-black text-mc-grass uppercase tracking-wider"
                style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.5)" }}
              >
                My Resume
              </h1>
            </div>
            <p className="text-t-text2 mb-4 max-w-xl mx-auto">
              View and download my professional resume to learn more about my skills and experience.
            </p>
            <button
              className="cursor-pointer inline-flex items-center px-5 py-2.5 text-white font-bold uppercase text-sm tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]"
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

          {/* Loading */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="flex gap-1.5">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4"
                    style={{
                      background: ["var(--mc-grass)", "var(--mc-diamond)", "var(--mc-gold)", "var(--mc-redstone)"][i],
                      animation: `blockBuild 0.6s ease-in-out ${i * 0.15}s infinite alternate`,
                      boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.2), inset -1px -1px 0 rgba(0,0,0,0.3)",
                    }}
                  />
                ))}
              </div>
              <p className="mt-4 text-mc-grass text-sm uppercase tracking-wider font-medium" style={{ textShadow: "0 0 8px var(--mc-grass)" }}>
                ⛏️ Mining your resume...
              </p>
              <style jsx>{`
                @keyframes blockBuild {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(-12px); }
                }
              `}</style>
            </div>
          ) : (
            <div
              className="relative overflow-hidden w-full"
              style={{
                border: "3px solid var(--t-border)",
                boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.06), inset -2px -2px 0 rgba(0,0,0,0.2), 4px 4px 0 rgba(0,0,0,0.3)",
              }}
            >
              <div className="relative z-10 w-full min-h-[100vh] pdf-viewer-container">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer fileUrl="/Resume.pdf" plugins={[defaultLayoutPluginInstance]} theme={{ theme: theme === "dark" ? "dark" : "light" }} />
                </Worker>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
