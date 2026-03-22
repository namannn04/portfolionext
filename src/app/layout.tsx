import type { Metadata } from "next";
import { Geist, Geist_Mono, Silkscreen } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
// import NotificationBanner from "@/components/NotificationBanner";
import CelestialBody from "@/components/CelestialBody";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  variable: "--font-mc",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Naman Dadhich",
  description: "Full Stack Developer portfolio — crafted with a Minecraft-inspired design. Explore projects, skills, and experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link id="favicon" rel="icon" href="/NDLight.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/profile.jpg" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {/* Prevent flash of wrong theme + dynamic favicon */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                  var fav = document.getElementById('favicon');
                  if (fav) fav.href = theme === 'light' ? '/NDLight.png' : '/NDDark.png';
                  new MutationObserver(function(m) {
                    m.forEach(function(mut) {
                      if (mut.attributeName === 'data-theme') {
                        var t = document.documentElement.getAttribute('data-theme');
                        var f = document.getElementById('favicon');
                        if (f) f.href = t === 'light' ? '/NDLight.png' : '/NDDark.png';
                      }
                    });
                  }).observe(document.documentElement, { attributes: true });
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${silkscreen.variable} antialiased`}
      >
        <ThemeProvider>
          <CelestialBody />
          {/* <NotificationBanner /> */}
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
