import React, { useRef, useState } from "react"
import { gsap } from "gsap"

const defaultImages = [
  { src: "https://pub-08da4348c3374e69879a944d84f167a2.r2.dev/Glass-Displacement/AlmostCentralPurple.png", title: "Central Purple" },
  { src: "https://pub-08da4348c3374e69879a944d84f167a2.r2.dev/Glass-Displacement/BlueAndBlack.png", title: "Blue & Black" },
  { src: "https://pub-08da4348c3374e69879a944d84f167a2.r2.dev/Glass-Displacement/BlueAndRed.png", title: "Blue & Red" },
  { src: "https://pub-08da4348c3374e69879a944d84f167a2.r2.dev/Glass-Displacement/BlueHalfDome.png", title: "Blue Half Dome" },
]

export default function OsmoImageToBackgroundZoom({
  images = defaultImages,
  duration = 0.8,
  className,
  onImageClick,
  onClose,
  forceCloseZoom,
}) {
  const containerRef = useRef(null)
  const iframeRef = useRef(null)
  const [activeImage, setActiveImage] = useState(null)
  const [iframeStyle, setIframeStyle] = useState({})

  const handleImageClick = (image, e) => {
    if (!containerRef.current) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()

    // Set iframe to card position and size initially
    setIframeStyle({
      position: 'fixed',
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      zIndex: 1000,
      opacity: 1,
      border: 'none'
    })

    setActiveImage(image)

    // Animate iframe to full screen
    requestAnimationFrame(() => {
      if (iframeRef.current) {
        gsap.to(iframeRef.current, {
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          duration,
          ease: 'power3.inOut'
        })
      }
    })

    if (onImageClick) onImageClick(image)
  }

  const handleClose = () => {
    if (!iframeRef.current) return
    gsap.to(iframeRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setActiveImage(null)
        setIframeStyle({})
        if (onClose) onClose()
      }
    })
  }

  return (
    <div ref={containerRef} className={className} style={{ position: "relative", minHeight: "500px", overflow: "hidden" }}>
      {/* Zoomed iframe */}
      {activeImage && (
        <iframe
          ref={iframeRef}
          src={`/templates/${encodeURIComponent(activeImage.template.folder)}/index.html`}
          style={iframeStyle}
          title={activeImage.title}
          sandbox="allow-scripts allow-same-origin"
        />
      )}

      {/* Close button */}
      {activeImage && (
        <button
          onClick={handleClose}
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 1001,
            padding: '0.5rem',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.9)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", padding: "2rem", position: "relative", zIndex: 5 }}>
        {images.map((image, i) => (
          <div key={i} onClick={(e) => handleImageClick(image, e)} style={{ borderRadius: "16px", overflow: "hidden", cursor: "pointer", position: "relative", aspectRatio: "16/10", boxShadow: "8px 10px 20px rgba(0, 0, 0, 0.08), -8px -10px 20px rgba(255, 255, 255, 0.8), inset 2px 2px 5px rgba(255, 255, 255, 0.6), inset -2px -2px 5px rgba(0, 0, 0, 0.04)", border: "3px solid rgba(255, 255, 255, 0.6)", backgroundColor: "rgba(255, 255, 255, 0.5)", backdropFilter: "blur(10px)" }}>
            <img src={image.src} alt={image.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem", background: "linear-gradient(transparent, rgba(0,0,0,0.7))", color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>{image.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
