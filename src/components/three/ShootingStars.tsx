"use client";

import { useEffect, useState } from "react";

type Meteor = { id: number; top: number; left: number; angle: number; length: number; duration: number };

/** Occasional meteors streaking across the sky, drawn in CSS above the canvas. */
export default function ShootingStars() {
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    let id = 0;
    let timer = 0;
    const spawn = () => {
      if (!document.hidden) {
        const meteor: Meteor = {
          id: id++,
          top: Math.random() * 45,
          left: 20 + Math.random() * 75,
          // Tail direction; the head (at the origin) flies the opposite way.
          angle: 325 + Math.random() * 20,
          length: 120 + Math.random() * 160,
          duration: 0.9 + Math.random() * 0.7,
        };
        setMeteors((current) => [...current.slice(-3), meteor]);
        window.setTimeout(
          () => setMeteors((current) => current.filter((item) => item.id !== meteor.id)),
          meteor.duration * 1000 + 100,
        );
      }
      timer = window.setTimeout(spawn, 3500 + Math.random() * 6000);
    };
    timer = window.setTimeout(spawn, 2500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="meteor absolute block h-px"
          style={
            {
              top: `${meteor.top}%`,
              left: `${meteor.left}%`,
              width: meteor.length,
              rotate: `${meteor.angle}deg`,
              "--dx": `${-Math.cos((meteor.angle * Math.PI) / 180) * 42}vw`,
              "--dy": `${-Math.sin((meteor.angle * Math.PI) / 180) * 42}vw`,
              animationDuration: `${meteor.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
