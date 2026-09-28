"use client";

import { useEffect, useState } from "react";

/** Current time in `timeZone` as HH:MM, refreshed every 15s. Empty until mounted. */
export function useLocalTime(timeZone: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, [timeZone]);
  return time;
}
