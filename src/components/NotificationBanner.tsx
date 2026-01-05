"use client"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export default function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [show, setShow] = useState(false)
  const router = useRouter()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Animation timing configuration - you can adjust these values
  const animationDuration = 0.85 // seconds (increased from 0.45)
  const animationDelay = 100 // milliseconds (increased from 10)

  // Mount par enter animation
  useEffect(() => {
    const t = setTimeout(() => setShow(true), animationDelay)
    return () => clearTimeout(t)
  }, [])

  // Dismiss handler
  const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setShow(false)
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, animationDuration * 1000) // Automatically convert seconds to milliseconds
  }

  const handleBannerClick = () => {
    router.push("/contact")
  }

  if (!isVisible) return null

  // Animation styles
  const animationStyles: React.CSSProperties = {
    transform: show ? "translateY(0)" : "translateY(-100%)",
    opacity: show ? 1 : 0,
    transition: `transform ${animationDuration}s cubic-bezier(0.16, 1, 0.3, 1), opacity ${animationDuration}s cubic-bezier(0.16, 1, 0.3, 1)`, // Smoother easing
    zIndex: 50,
    // Enhanced shadow with more prominence at the bottom
    boxShadow: "0 2px 20px 0 rgba(20,184,166,0.3), 0 2px 12px 0 rgba(34,211,238,0.25), 0 4px 16px 2px rgba(45,212,191,0.2)",
  }

  return (
    <div
      id="notification-banner"
      onClick={handleBannerClick}
      style={{
        ...animationStyles,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        background: "linear-gradient(90deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,1) 100%)",
        borderBottom: "1px solid rgba(45,212,191,0.3)",
        cursor: "pointer",
        padding: "0.75rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={cn("group")}
    >
      <div style={{
        maxWidth: "1280px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ flex: 1 }}></div>
        <p
          style={{
            textAlign: "center",
            fontSize: "1rem",
            fontWeight: 500,
            background: "linear-gradient(to right, #22d3ee, #14b8a6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transition: "background 0.3s",
          }}
        >
          Would you like to collab with me or hire me?
        </p>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={handleDismiss}
            style={{
              color: "#9ca3af",
              padding: "0.25rem",
              transition: "color 0.3s",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
            aria-label="Dismiss notification"
            onMouseEnter={e => (e.currentTarget.style.color = "#2dd4bf")}
            onMouseLeave={e => (e.currentTarget.style.color = "#9ca3af")}
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}