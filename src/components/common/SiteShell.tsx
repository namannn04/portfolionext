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
    <div className="bg-t-bg">
      <div className="pt-8 pb-6 sm:pt-20 sm:pb-8">
        <div className="site-column mx-auto w-full max-w-[960px] px-4 sm:px-0">
          <Navbar />
        </div>
        <div className="mx-auto px-4 sm:px-0">
          <div className="site-column mx-auto w-full max-w-[960px] p-4 sm:p-6">
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
