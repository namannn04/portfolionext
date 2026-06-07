"use client";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const borderBoxStyle = {
  border: "3px solid var(--t-border)",
  boxShadow:
    "inset 2px 2px 0 rgba(255,255,255,0.06), inset -2px -2px 0 rgba(0,0,0,0.2), 4px 4px 0 rgba(0,0,0,0.25)",
  padding: "1.5rem",
} as const;

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-t-bg min-h-screen">
      <div className="sm:py-20">
        <div className="sm:max-w-[90%] lg:max-w-[50%] mx-auto">
          <Navbar />
        </div>
        <div className="mx-auto px-4 sm:px-0">
          <div className="sm:max-w-[90%] lg:max-w-[50%] mx-auto p-6">
            <div className="hidden sm:block" style={borderBoxStyle}>
              {children}
              <Footer />
            </div>
            <div className="sm:hidden">
              {children}
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
