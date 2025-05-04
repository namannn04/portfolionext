"use client";

import { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { DownloadCloud, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Navbar from "@/component/Navbar";

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="sm:block sm:pt-20 bg-black min-h-screen text-white">
      {/* Navbar section */}
      <div className="sm:max-w-[50%] mx-auto">
        <Navbar />
      </div>

      {/* Main content section */}
      <div className="relative overflow-hidden sm:max-w-[50%] mx-auto sm:border sm:border-teal-500 rounded-xl p-4 sm:p-6 mt-6">
        {/* Background blobs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-teal-900/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyan-900/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <FileText className="h-8 w-8 text-teal-400" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                My Resume
              </h1>
            </div>
            <p className="text-gray-300 mb-4 max-w-xl mx-auto">
              View and download my professional resume to learn more about my
              skills and experience.
            </p>
            <Button
              variant="outline"
              className="border-teal-500/50 text-teal-400 hover:bg-teal-500/20 hover:text-teal-300 transition-all duration-300"
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
            </Button>
          </div>

          {/* PDF Viewer */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-teal-400 animate-spin"></div>
                <div
                  className="absolute inset-2 rounded-full border-b-2 border-l-2 border-cyan-400 animate-spin"
                  style={{
                    animationDirection: "reverse",
                    animationDuration: "1.5s",
                  }}
                ></div>
              </div>
              <p className="mt-4 text-teal-400 animate-pulse">
                Loading your resume...
              </p>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden border border-teal-500/30 shadow-lg shadow-teal-500/10 backdrop-blur-sm bg-black/40 transition-all duration-500 hover:shadow-teal-500/20 w-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl"></div>

              <div className="relative z-10 w-full min-h-[100vh] pdf-viewer-container">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl="/Resume.pdf"
                    plugins={[defaultLayoutPluginInstance]}
                    theme={{
                      theme: "dark",
                    }}
                  />
                </Worker>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
