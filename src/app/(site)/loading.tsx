export default function Loading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center gap-1.5">
      {["var(--mc-grass)", "var(--mc-diamond)", "var(--mc-gold)", "var(--mc-redstone)"].map(
        (color, i) => (
          <div
            key={color}
            className="h-4 w-4 animate-bounce"
            style={{
              background: color,
              animationDelay: `${i * 0.1}s`,
              boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.2), inset -1px -1px 0 rgba(0,0,0,0.3)",
            }}
          />
        )
      )}
    </div>
  );
}
