"use client";
import GitHubCalendar from "react-github-calendar";
import { Calendar, Github, Code } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function GitHubContribution() {
  const username = "namannn04";
  const [selectedYear, setSelectedYear] = useState("last");

  const customTheme = {
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  const years = ["last", "2025", "2024", "2023"];

  return (
    <Card className="w-full max-w-4xl mx-auto bg-black border border-purple-500/20 shadow-lg">
      <CardHeader className="border-b border-purple-500/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5 text-teal-400" />
            <CardTitle className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
              GitHub Contributions
            </CardTitle>
          </div>
          <div className="px-3 py-1 rounded-full bg-black border border-purple-500/30 text-sm text-cyan-300">
            @{username}
          </div>
        </div>
        <CardDescription className="text-gray-400">
          Coding activity over the past year
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Year Filter */}
        <div className="mb-4 flex flex-wrap gap-2">
          {years.map((year) => (
            <button
              key={year}
              className={`px-3 py-1 text-sm rounded-full border ${
                selectedYear === year
                  ? "bg-teal-500 text-white border-teal-500"
                  : "text-cyan-300 border-cyan-400 hover:bg-cyan-700/20"
              } transition-all`}
              onClick={() => setSelectedYear(year)}
            >
              {year === "last" ? "Last Year" : year}
            </button>
          ))}
        </div>

        {/* Contribution Graph with Thin Scrollbar and Gap */}
        <div className="p-4 rounded-lg bg-[#000] border border-cyan-500 overflow-x-auto custom-scrollbar mb-6 text-white">
          <GitHubCalendar
            username={username}
            year={selectedYear !== "last" ? parseInt(selectedYear) : undefined}
            blockSize={12}
            blockMargin={4}
            fontSize={12}
            theme={customTheme}
            labels={{
              totalCount: "{{count}} contributions in the selected year",
            }}
          />

          {/* Graph bottom gap fix */}
          <style>{`
            .react-activity-calendar svg {
              margin-bottom: 12px;
            }

            .react-activity-calendar text[dy=".35em"] {
              fill: white !important;
            }

            /* 🌟 Premium custom scrollbar */
            .custom-scrollbar::-webkit-scrollbar {
              height: 6px;
            }

            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(to right, #a855f7, #3b82f6); /* purple to blue */
              border-radius: 9999px;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to right, #9333ea, #2563eb); /* darker on hover */
            }

            .custom-scrollbar {
              scrollbar-color: #00ffff #000;
              scrollbar-width: thin;
            }
          `}</style>
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-500">Less</span>
            {customTheme.dark.map((color, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: color }}
              />
            ))}
            <span className="text-xs text-gray-500">More</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>Activity</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Code className="h-3 w-3" />
              <span>{username}</span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Custom styles */}
      <style>{`
        .react-activity-calendar__month-labels text {
          fill: white !important;
        }

        /* Custom Thin Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #7e22ce;
          border-radius: 10px;
        }
      `}</style>
    </Card>
  );
}
