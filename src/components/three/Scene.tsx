"use client";

import dynamic from "next/dynamic";

// WebGL only runs in the browser; keep three.js out of the server bundle.
const World = dynamic(() => import("./World"), { ssr: false });

export default function Scene() {
  return <World />;
}
