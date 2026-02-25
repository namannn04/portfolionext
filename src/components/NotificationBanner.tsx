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

  const animationDuration = 0.85
  const animationDelay = 100

  useEffect(() => {
    const t = setTimeout(() => setShow(true), animationDelay)
    return () => clearTimeout(t)
  }, [])

  const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setShow(false)
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, animationDuration * 1000)
  }

  const handleBannerClick = () => {
    router.push("/contact")
  }

  if (!isVisible) return null

  const animationStyles: React.CSSProperties = {
    transform: show ? "translateY(0)" : "translateY(-100%)",
    opacity: show ? 1 : 0,
    transition: `transform ${animationDuration}s cubic-bezier(0.16, 1, 0.3, 1), opacity ${animationDuration}s cubic-bezier(0.16, 1, 0.3, 1)`,
    zIndex: 50,
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
        background: "var(--t-notification-bg)",
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
              color: "var(--t-dim)",
              padding: "0.25rem",
              transition: "color 0.3s",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
            aria-label="Dismiss notification"
            onMouseEnter={e => (e.currentTarget.style.color = "#2dd4bf")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--t-dim)")}
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}