import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://namandadhich.me"),
  title: {
    default: "Naman Dadhich — Full Stack Developer",
    template: "%s — Naman Dadhich",
  },
  description:
    "Naman Dadhich is a full stack developer from New Delhi building scalable products with Next.js, TypeScript and Node.js, and leading developer communities.",
  icons: { icon: "/NDDark.png" },
  openGraph: {
    title: "Naman Dadhich — Full Stack Developer",
    description: "Scalable full-stack products, developer communities, and shipped experiences.",
    images: ["/profileBlack.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0f13",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable}`}>
      <body className="antialiased">
        <SmoothScroll>
          <Nav />
          {children}
          <Footer />
        </SmoothScroll>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
