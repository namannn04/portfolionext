"use client";

import { useState, useEffect } from "react";
import { Calendar, Trophy, Users, Lightbulb, MapPin } from "lucide-react";
import type { JSX } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

type EventType = "attended" | "organized" | "mentored" | "organized+attended";

const events: { id: number; title: string; date: string; location: string; description: string; image: string; type: EventType }[] = [
  { id: 1, title: "Code Cubicle 3.0", date: "Sep 15-21, 2024", location: "Hybrid, Microsoft Office, Gurugram", description: "Organized and led Code Cubicle 3.0, a large-scale coding contest focused on problem-solving and teamwork. Oversaw event planning, question setting, and participant engagement.", image: "/events/codecubicle.jpg", type: "organized" },
  { id: 2, title: "Code Kshetra 2.0", date: "Feb 21-23, 2025", location: "JIMS, Rohini", description: "Coordinated Code Kshetra 2.0, a competitive programming event designed to challenge participants with real-world coding problems. Managed logistics and ensured a smooth contest experience.", image: "/events/codekshetra.jpg", type: "organized" },
  { id: 3, title: "Pears Hackathon", date: "March 2-10, 2025", location: "Online", description: "Participated in Pears Hackathon, collaborating with a diverse team to develop an innovative tech solution under time constraints. Contributed to both backend and frontend development.", image: "/events/pearshackathon.jpg", type: "organized" },
  { id: 4, title: "Code Manipal", date: "March 21-22, 2025", location: "Manipal University, Jaipur", description: "Took part in Code Manipal, a national-level hackathon, where I worked on building scalable web applications and presented solutions to industry experts.", image: "/events/codemanipal.jpg", type: "organized+attended" },
];

const typeIcons: Record<EventType, JSX.Element> = {
  attended: <Trophy className="w-5 h-5" />,
  organized: <Users className="w-5 h-5" />,
  mentored: <Lightbulb className="w-5 h-5" />,
  "organized+attended": (<div className="flex space-x-1"><Users className="w-4 h-4" /><Trophy className="w-4 h-4" /></div>),
};

const typeLabels: Record<EventType, string> = { attended: "Attended", organized: "Organized", mentored: "Mentored", "organized+attended": "Organized & Attended" };
const typeEmojis: Record<EventType, string> = { attended: "🏆", organized: "⚔️", mentored: "📖", "organized+attended": "👑" };
const typeColors: Record<EventType, string> = { attended: "var(--mc-diamond)", organized: "var(--mc-grass)", mentored: "var(--mc-gold)", "organized+attended": "var(--mc-emerald)" };

export default function EventsPage() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { setMounted(true); setTimeout(() => setIsVisible(true), 200); }, []);
  if (!mounted) return null;

  return (
    <div className="sm:block sm:py-20 bg-t-bg">
      <div className="sm:max-w-[90%] lg:max-w-[50%] mx-auto"><Navbar /></div>
      <div
        className="relative overflow-hidden min-h-screen sm:max-w-[90%] lg:max-w-[50%] mx-auto p-6"
      >
        {/* MC Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(var(--mc-stone) 1px, transparent 1px), linear-gradient(90deg, var(--mc-stone) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="hidden sm:block absolute inset-0 pointer-events-none" style={{ border: "3px solid var(--t-border)", boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.06), inset -2px -2px 0 rgba(0,0,0,0.2), 4px 4px 0 rgba(0,0,0,0.25)" }} />

        {/* Header */}
        <div className={`mb-16 relative z-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-mc-xp text-sm font-medium tracking-[0.3em] uppercase mb-3 block" style={{ textShadow: "0 0 10px var(--mc-xp)" }}>
            🗡️ Quest Log 🗡️
          </span>
          <h1
            className="text-4xl md:text-5xl font-black text-mc-grass uppercase tracking-wider mb-4"
            style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.5), 4px 4px 0 rgba(0,0,0,0.15)" }}
          >
            Professional Journey
          </h1>
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-5 h-1" style={{ background: "var(--mc-grass)", boxShadow: "0 0 4px var(--mc-grass)" }} />
            ))}
          </div>
          <p className="text-t-muted max-w-2xl">
            A showcase of major events I have attended, hackathons I have organized, and programs where I have served as a mentor. Each experience has shaped my professional growth.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-6 relative z-10">
          {[...events].sort((a, b) => b.id - a.id).map((event, index) => (
            <div
              key={event.id}
              className={`group relative transition-all duration-700 hover:translate-x-[-2px] hover:translate-y-[-2px] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              <div
                style={{
                  background: "var(--t-surface)",
                  border: "3px solid var(--t-border)",
                  boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.08), inset -2px -2px 0 rgba(0,0,0,0.25), 4px 4px 0 rgba(0,0,0,0.3)",
                  transition: "box-shadow 0.3s, transform 0.3s",
                }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Icon side */}
                  <div className="md:w-1/4 p-6 flex items-center justify-center">
                    <div
                      className="w-16 h-16 flex items-center justify-center text-white transition-all duration-300"
                      style={{
                        background: typeColors[event.type],
                        boxShadow: `inset 2px 2px 0 rgba(255,255,255,0.2), inset -2px -2px 0 rgba(0,0,0,0.3), 3px 3px 0 rgba(0,0,0,0.3), 0 0 15px ${typeColors[event.type]}40`,
                      }}
                    >
                      {typeIcons[event.type]}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-3/4 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-xs font-bold px-3 py-1 text-white uppercase tracking-wider"
                        style={{
                          background: typeColors[event.type],
                          boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.2), inset -1px -1px 0 rgba(0,0,0,0.2)",
                        }}
                      >
                        {typeEmojis[event.type]} {typeLabels[event.type]}
                      </span>
                    </div>
                    <h3
                      className="text-xl font-bold text-t-text mb-3 group-hover:text-mc-grass transition-colors"
                      style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.3)" }}
                    >
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center text-t-muted text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-mc-gold" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-t-muted text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-mc-redstone" />
                        {event.location}
                      </div>
                    </div>
                    <p className="text-t-muted text-sm">{event.description}</p>
                  </div>
                </div>

                {/* Bottom accent */}
                <div
                  className="h-[3px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: typeColors[event.type] }}
                />
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
}
