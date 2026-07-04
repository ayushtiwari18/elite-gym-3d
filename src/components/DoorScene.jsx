import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

/*
  "Athlete Reveal" — a cinematic 6-frame scroll sequence.
  As the user scrolls, each frame smoothly crossfades into the next
  with a Ken-Burns zoom, text reveals, and a progress indicator.
*/

const frames = [
  { src: '/assets/athlete/frame-1.png', alt: 'Dark gym silhouette', caption: 'The Darkness', sub: 'Where it all begins' },
  { src: '/assets/athlete/frame-2.png', alt: 'Athlete emerging from smoke', caption: 'The Walk', sub: 'Step into the fire' },
  { src: '/assets/athlete/frame-3.png', alt: 'Athlete power stance', caption: 'The Stance', sub: 'Own the floor' },
  { src: '/assets/athlete/frame-4.png', alt: 'Heavy deadlift', caption: 'The Grind', sub: 'Where legends are forged' },
  { src: '/assets/athlete/frame-5.png', alt: 'Intense face close-up', caption: 'The Focus', sub: 'Nothing else exists' },
  { src: '/assets/athlete/frame-6.png', alt: 'Victory pose', caption: 'The Triumph', sub: 'Rise above it all' }
]

export default function DoorScene() {
  const scope = useRef(null)
  const imgRefs = useRef([])
  const captionRef = useRef(null)
  const subRef = useRef(null)
  const progressRef = useRef(null)
  const counterRef = useRef(null)

  useGSAP(() => {
    const imgs = imgRefs.current.filter(Boolean)
    const totalFrames = imgs.length
    const caption = captionRef.current
    const sub = subRef.current
    const progress = progressRef.current
    const counter = counterRef.current

    const ctx = gsap.context(() => {
      // Initial state: all frames hidden, first one visible
      gsap.set(imgs, { autoAlpha: 0, scale: 1.15, transformOrigin: 'center center' })
      gsap.set(imgs[0], { autoAlpha: 1, scale: 1.05 })

      // Track current frame for text updates
      let currentFrame = 0

      const updateCaption = (index) => {
        if (index === currentFrame) return
        currentFrame = index
        const frame = frames[index]

        gsap.to(caption, {
          autoAlpha: 0, y: -15, duration: 0.25, ease: 'power2.in',
          onComplete: () => {
            caption.textContent = frame.caption
            gsap.to(caption, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' })
          }
        })

        gsap.to(sub, {
          autoAlpha: 0, y: 10, duration: 0.2, ease: 'power2.in',
          onComplete: () => {
            sub.textContent = frame.sub
            gsap.to(sub, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out', delay: 0.1 })
          }
        })
      }

      // Master scroll timeline
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: 'top top',
          end: '+=500%',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update progress bar
            gsap.set(progress, { scaleX: self.progress })

            // Update counter
            const frameIndex = Math.min(
              totalFrames - 1,
              Math.floor(self.progress * totalFrames)
            )
            counter.textContent = `${String(frameIndex + 1).padStart(2, '0')} / ${String(totalFrames).padStart(2, '0')}`

            // Update caption text
            updateCaption(frameIndex)
          }
        }
      })

      // Build smooth crossfade transitions between each frame
      // Each transition: current frame zooms in + fades out, next frame fades in from slightly zoomed
      for (let i = 0; i < totalFrames - 1; i++) {
        const segmentDuration = 1
        const startTime = i * segmentDuration

        // Current frame: slow zoom in (Ken Burns) during its visible period
        master.to(imgs[i], {
          scale: 1.2,
          ease: 'none',
          duration: segmentDuration
        }, startTime)

        // Crossfade: fade out current
        master.to(imgs[i], {
          autoAlpha: 0,
          duration: segmentDuration * 0.4,
          ease: 'power1.inOut'
        }, startTime + segmentDuration * 0.6)

        // Crossfade: fade in next (starts slightly before current fades)
        master.fromTo(imgs[i + 1],
          { autoAlpha: 0, scale: 1.15 },
          {
            autoAlpha: 1,
            scale: 1.05,
            duration: segmentDuration * 0.5,
            ease: 'power1.inOut'
          },
          startTime + segmentDuration * 0.5)
      }

      // Last frame: hold with subtle zoom
      const lastStart = (totalFrames - 1) * 1
      master.to(imgs[totalFrames - 1], {
        scale: 1.12,
        duration: 0.5,
        ease: 'none'
      }, lastStart)

      // Initialize caption
      caption.textContent = frames[0].caption
      sub.textContent = frames[0].sub
    }, scope)

    return () => ctx.revert()
  }, { scope })

  return (
    <section ref={scope} className="reveal-scene">
      {/* Image layers */}
      {frames.map((frame, i) => (
        <img
          key={i}
          ref={(el) => (imgRefs.current[i] = el)}
          className="reveal-scene__frame"
          src={frame.src}
          alt={frame.alt}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {/* Dark vignette overlay */}
      <div className="reveal-scene__vignette" />

      {/* Bottom text overlay */}
      <div className="reveal-scene__content">
        <div className="reveal-scene__text-group">
          <h2 ref={captionRef} className="reveal-scene__caption">The Darkness</h2>
          <p ref={subRef} className="reveal-scene__sub">Where it all begins</p>
        </div>

        {/* Progress bar */}
        <div className="reveal-scene__progress-wrap">
          <div ref={counterRef} className="reveal-scene__counter">01 / 06</div>
          <div className="reveal-scene__progress-track">
            <div ref={progressRef} className="reveal-scene__progress-bar" />
          </div>
        </div>
      </div>

      {/* Side label */}
      <div className="reveal-scene__side-label">
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}