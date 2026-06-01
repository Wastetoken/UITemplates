import React, { useRef, useState } from "react"
import { gsap } from "gsap"

export default function TemplateZoom({ templates, initialTemplate, initialCardRect, onClose }) {
  const containerRef = useRef(null)
  const iframeRef = useRef(null)
  const [activeTemplate, setActiveTemplate] = useState(null)
  const [showIframe, setShowIframe] = useState(false)
  const [iframeStyle, setIframeStyle] = useState({})
  const hasAutoZoomed = useRef(false)

  const triggerZoom = (template, cardRect) => {
    // Prevent scroll during zoom
    document.body.style.overflow = 'hidden'
    
    // Set iframe to card position and size initially
    setIframeStyle({
      position: 'fixed',
      top: cardRect.top,
      left: cardRect.left,
      width: cardRect.width,
      height: cardRect.height,
      zIndex: 1000,
      opacity: 1,
      transform: 'scale(1)'
    })

    setActiveTemplate(template)
    setShowIframe(true)

    // Animate iframe to full screen using ref instead of querySelector
    setTimeout(() => {
      if (iframeRef.current) {
        gsap.to(iframeRef.current, {
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          duration: 0.6,
          ease: 'power3.inOut'
        })
      }
    }, 50)
  }

  const handleCardClick = (template, e) => {
    const card = e.currentTarget
    const container = containerRef.current
    
    if (!container || !card) return

    const cardRect = card.getBoundingClientRect()
    triggerZoom(template, cardRect)
  }

  // Auto-zoom on mount if initialTemplate and initialCardRect are provided
  React.useEffect(() => {
    if (initialTemplate && initialCardRect && !hasAutoZoomed.current) {
      hasAutoZoomed.current = true
      triggerZoom(initialTemplate, initialCardRect)
    }
  }, [])

  const handleClose = () => {
    if (!activeTemplate) return

    if (iframeRef.current) {
      gsap.to(iframeRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setShowIframe(false)
          setActiveTemplate(null)
          setIframeStyle({})
          document.body.style.overflow = ''
        }
      })
    }

    if (onClose) onClose()
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', minHeight: '600px' }}>
      {/* Template Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', padding: '2rem' }}>
        {templates.map((template) => (
          <div
            key={template.id}
            data-template-id={template.id}
            onClick={(e) => handleCardClick(template, e)}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              aspectRatio: '16/10',
              boxShadow: '8px 10px 20px rgba(0, 0, 0, 0.08), -8px -10px 20px rgba(255, 255, 255, 0.8), inset 2px 2px 5px rgba(255, 255, 255, 0.6), inset -2px -2px 5px rgba(0, 0, 0, 0.04)',
              border: '3px solid rgba(255, 255, 255, 0.6)',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <img
              src={template.screenshot}
              alt={template.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              loading="lazy"
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              {template.name}
            </div>
          </div>
        ))}
      </div>

      {/* Zoomed iframe */}
      {activeTemplate && showIframe && (
        <iframe
          ref={iframeRef}
          src={`/templates/${encodeURIComponent(activeTemplate.folder)}/index.html`}
          style={{
            ...iframeStyle,
            border: 'none',
            backgroundColor: '#fff'
          }}
          title={activeTemplate.name}
          sandbox="allow-scripts allow-same-origin"
        />
      )}

      {/* Close button overlay */}
      {activeTemplate && showIframe && (
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
    </div>
  )
}
