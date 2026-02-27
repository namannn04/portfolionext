"use client"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [show, setShow] = useState(false)
  const router = useRouter()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const animationDuration = 0.7

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
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

  return (
    <div
      id="notification-banner"
      onClick={handleBannerClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 50,
        cursor: "pointer",
        padding: "0.65rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--t-notification-bg)",
        borderBottom: "2px solid var(--t-border)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        transform: show ? "translateY(0)" : "translateY(-100%)",
        opacity: show ? 1 : 0,
        transition: `transform ${animationDuration}s cubic-bezier(0.16, 1, 0.3, 1), opacity ${animationDuration}s cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1 }} />
        <p
          style={{
            textAlign: "center",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "var(--mc-grass)",
            textShadow: "1px 1px 0 rgba(0,0,0,0.3)",
            letterSpacing: "0.05em",
          }}
        >
          ⚔️ Would you like to collab with me or hire me? ⚔️
        </p>
        <div
          style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
        >
          <button
            onClick={handleDismiss}
            style={{
              color: "var(--t-dim)",
              padding: "0.25rem",
              transition: "color 0.2s",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Dismiss notification"
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--mc-grass)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--t-dim)")
            }
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}