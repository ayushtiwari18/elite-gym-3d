import { useEffect, useRef } from 'react'

export default function CinematicCanvas({
  particlesCount = 80
}) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])

  // Convert percentage inputs to pixels with smoothing
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Particle updates & canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    // Initialize dust particles
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < particlesCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.3 - 0.15, // slowly drift upwards
          alpha: Math.random() * 0.5 + 0.2
        })
      }
    }

    const draw = () => {
      // Clear with transparency to leave a subtle dust trail
      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw floating environmental dust particles
      particlesRef.current.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => cancelAnimationFrame(animId)
  }, [particlesCount])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
