"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Trophy, Users, Lightbulb, MapPin, Star } from "lucide-react";
import type { JSX } from "react";
import Navbar from "@/component/Navbar";

// Define EventType type
type EventType = "attended" | "organized" | "mentored" | "organized+attended";

// Sample event data - replace with your actual events
const events: {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  type: EventType;
}[] = [
  {
    id: 1,
    title: "Code Cubicle 3.0",
    date: "Sep 15-21, 2024",
    location: "Hybrid, Microsoft Office, Gurugram",
    description:
      "Organized and led Code Cubicle 3.0, a large-scale coding contest focused on problem-solving and teamwork. Oversaw event planning, question setting, and participant engagement.",
    image: "/events/codecubicle.jpg",
    type: "organized",
  },
  {
    id: 2,
    title: "Code Kshetra 2.0",
    date: "Feb 21-23, 2025",
    location: "JIMS, Rohini",
    description:
      "Coordinated Code Kshetra 2.0, a competitive programming event designed to challenge participants with real-world coding problems. Managed logistics and ensured a smooth contest experience.",
    image: "/events/codekshetra.jpg",
    type: "organized",
  },
  {
    id: 3,
    title: "Pears Hackathon",
    date: "March 2-10, 2025",
    location: "Online",
    description:
      "Participated in Pears Hackathon, collaborating with a diverse team to develop an innovative tech solution under time constraints. Contributed to both backend and frontend development.",
    image: "/events/pearshackathon.jpg",
    type: "organized",
  },
  {
    id: 4,
    title: "Code Manipal",
    date: "March 21-22, 2025",
    location: "Manipal University, Jaipur",
    description:
      "Took part in Code Manipal, a national-level hackathon, where I worked on building scalable web applications and presented solutions to industry experts.",
    image: "/events/codemanipal.jpg",
    type: "organized+attended",
  },
];

// Icon mapping for event types
const typeIcons: Record<EventType, JSX.Element> = {
  attended: <Trophy className="w-5 h-5" />,
  organized: <Users className="w-5 h-5" />,
  mentored: <Lightbulb className="w-5 h-5" />,
  "organized+attended": (
    <div className="flex space-x-1">
      <Users className="w-4 h-4" />
      <Trophy className="w-4 h-4" />
    </div>
  ),
};

// Label mapping for event types
const typeLabels: Record<EventType, string> = {
  attended: "Attended",
  organized: "Organized",
  mentored: "Mentored",
  "organized+attended": "Organized & Attended",
};

// Color mapping for event types
const typeColors: Record<EventType, string> = {
  attended: "from-teal-500 to-teal-400",
  organized: "from-cyan-500 to-cyan-400",
  mentored: "from-teal-400 to-cyan-500",
  "organized+attended": "from-teal-500 to-cyan-500",
};

export default function EventsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="sm:block sm:py-20 bg-black">
      <div className="sm:max-w-[50%] mx-auto">
        <Navbar />
      </div>
      <div className="relative overflow-hidden min-h-screen sm:max-w-[50%] mx-auto sm:border sm:border-teal-500 rounded-xl p-6">
        {/* Enhanced Header Section */}
        <div className="mb-16 relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute -top-5 -right-5 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl" />

          <div className="relative">
            {/* Stars decoration */}
            <motion.div
              className="absolute -top-6 left-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Star className="w-5 h-5 text-cyan-400/30" />
            </motion.div>
            <motion.div
              className="absolute -top-2 left-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <Star className="w-3 h-3 text-teal-400/40" />
            </motion.div>
            <motion.div
              className="absolute top-10 right-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <Star className="w-4 h-4 text-cyan-400/30" />
            </motion.div>

            {/* Main heading with enhanced design */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-16 text-center">
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 mt-5 mb-2 py-5">
                  Professional Journey
                </h1>
                {/* <div className="h-1 w-24 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto mb-6"></div> */}
                <motion.div
                  className="h-1 w-32 mx-auto bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mb-4"
                  initial={{ width: 0 }}
                  animate={{ width: 128 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                <p className="text-zinc-400 max-w-2xl mx-auto">
                  A showcase of major events I have attended, hackathons I have
                  organized, and programs where I have served as a mentor. Each
                  experience has shaped my professional growth in the tech
                  industry.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Event Cards */}
        <div className="grid grid-cols-1 gap-8">
          {[...events]
            .sort((a, b) => b.id - a.id)
            .map((event, index) => (
              <motion.div
                key={event.id}
                className="group relative bg-black border border-teal-500/20 rounded-xl overflow-hidden transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 0 25px 2px rgba(20, 184, 166, 0.3), 0 0 10px 0px rgba(6, 182, 212, 0.2)`,
                }}
              >
                {/* Enhanced background effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-teal-500/50 to-transparent" />
                <div className="absolute -bottom-1 right-0 w-1/3 h-1 bg-gradient-to-r from-transparent to-cyan-500/50" />
                <div className="absolute -top-1 right-0 w-1/4 h-1 bg-gradient-to-l from-transparent to-teal-500/50" />

                <div className="flex flex-col md:flex-row">
                  {/* Left side with icon */}
                  <div className="md:w-1/3 p-6 flex items-center justify-center relative">
                    {/* Decorative circle behind icon */}
                    <div className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-teal-500/5 to-cyan-500/5 opacity-50 group-hover:opacity-80 transition-opacity duration-300" />

                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-r ${
                        typeColors[event.type]
                      } flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-all duration-300 z-10`}
                    >
                      {typeIcons[event.type]}
                    </div>
                  </div>

                  {/* Right side with content */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center mb-3">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r ${
                          typeColors[event.type]
                        } text-black`}
                      >
                        {typeLabels[event.type]}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                      {event.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center text-gray-400">
                        <Calendar className="w-4 h-4 mr-2 text-teal-500" />
                        <span className="text-sm">{event.date}</span>
                      </div>

                      <div className="flex items-center text-gray-400">
                        <MapPin className="w-4 h-4 mr-2 text-teal-500" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Enhanced hover underline effect */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
