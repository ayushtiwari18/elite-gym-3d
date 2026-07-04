import { useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

/*
  "Discipline Showcase" — each instance is a cinematic 3-frame
  scroll sequence for a specific training discipline.
  Smooth crossfade + Ken Burns zoom + animated text + stat counters.
*/

const disciplineMap = {
  rack: {
    tag: '01',
    title: 'The Lift',
    subtitle: 'Raw strength. Heavy iron. No shortcuts.',
    description: 'Master the foundational lifts that build real-world power. Our dedicated powerlifting zone features competition-grade equipment and calibrated plates.',
    stats: [
      { value: '500+', label: 'lbs max rack' },
      { value: '12', label: 'platforms' },
      { value: '24/7', label: 'access' }
    ],
    frames: [
      { src: '/assets/disciplines/lift-1.png', alt: 'Deadlift setup' },
      { src: '/assets/disciplines/lift-2.png', alt: 'Mid pull' },
      { src: '/assets/disciplines/lift-3.png', alt: 'Lockout triumph' }
    ]
  },
  cable: {
    tag: '02',
    title: 'The Flow',
    subtitle: 'Dynamic movement. Explosive power.',
    description: 'Functional training that builds athletic performance. Battle ropes, kettlebells, plyometrics — train like an athlete, move like one.',
    stats: [
      { value: '30+', label: 'stations' },
      { value: '200+', label: 'classes/mo' },
      { value: '5★', label: 'rated' }
    ],
    frames: [
      { src: '/assets/disciplines/flow-1.png', alt: 'HIIT training' },
      { src: '/assets/disciplines/flow-2.png', alt: 'Kettlebell work' },
      { src: '/assets/disciplines/flow-3.png', alt: 'Boxing intensity' }
    ]
  },
  treadmill: {
    tag: '03',
    title: 'The Grind',
    subtitle: 'Endurance forged in darkness.',
    description: 'Push your limits in our premium cardio zone. State-of-the-art equipment, immersive atmosphere, and the mental fortitude that sets champions apart.',
    stats: [
      { value: '40+', label: 'machines' },
      { value: '∞', label: 'motivation' },
      { value: '0', label: 'excuses' }
    ],
    frames: [
      { src: '/assets/disciplines/endurance-1.png', alt: 'Dark gym atmosphere' },
      { src: '/assets/disciplines/endurance-2.png', alt: 'Athlete approaching' },
      { src: '/assets/disciplines/endurance-3.png', alt: 'Power stance' }
    ]
  }
}

export default function MachineSection({ type = 'rack' }) {
  const scope = useRef(null)
  const imgRefs = useRef([])
  const textRef = useRef(null)
  const statsRef = useRef(null)
  const lineRef = useRef(null)
  const cfg = useMemo(() => disciplineMap[type], [type])

  useGSAP(() => {
    const imgs = imgRefs.current.filter(Boolean)
    const totalFrames = imgs.length
    const text = textRef.current
    const stats = statsRef.current
    const line = lineRef.current

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(imgs, { autoAlpha: 0, scale: 1.15, transformOrigin: 'center center' })
      gsap.set(imgs[0], { autoAlpha: 1, scale: 1.05 })
      gsap.set(text, { autoAlpha: 0, x: -60 })
      gsap.set(stats, { autoAlpha: 0, y: 40 })
      gsap.set(line, { scaleX: 0 })

      // Master scroll timeline
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: 'top top',
          end: '+=400%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(line, { scaleX: self.progress })
          }
        }
      })

      // Phase 1 (0-0.15): Text & stats reveal while first image holds
      master.to(text, {
        autoAlpha: 1, x: 0, duration: 0.1, ease: 'power2.out'
      }, 0.02)

      master.to(stats, {
        autoAlpha: 1, y: 0, duration: 0.1, ease: 'power2.out'
      }, 0.06)

      // First image Ken Burns zoom during text reveal
      master.to(imgs[0], {
        scale: 1.12, duration: 0.3, ease: 'none'
      }, 0)

      // Phase 2 (0.2-0.55): Crossfade frame 1 → 2
      master.to(imgs[0], {
        autoAlpha: 0, duration: 0.12, ease: 'power1.inOut'
      }, 0.25)

      master.fromTo(imgs[1],
        { autoAlpha: 0, scale: 1.15 },
        { autoAlpha: 1, scale: 1.05, duration: 0.15, ease: 'power1.inOut' },
        0.2
      )

      master.to(imgs[1], {
        scale: 1.12, duration: 0.3, ease: 'none'
      }, 0.3)

      // Phase 3 (0.55-0.85): Crossfade frame 2 → 3
      master.to(imgs[1], {
        autoAlpha: 0, duration: 0.12, ease: 'power1.inOut'
      }, 0.58)

      master.fromTo(imgs[2],
        { autoAlpha: 0, scale: 1.15 },
        { autoAlpha: 1, scale: 1.05, duration: 0.15, ease: 'power1.inOut' },
        0.53
      )

      master.to(imgs[2], {
        scale: 1.12, duration: 0.2, ease: 'none'
      }, 0.65)

      // Phase 4 (0.85-1.0): Text fades out as we exit
      master.to(text, {
        autoAlpha: 0, x: 40, duration: 0.1, ease: 'power2.in'
      }, 0.88)

      master.to(stats, {
        autoAlpha: 0, y: -20, duration: 0.08, ease: 'power2.in'
      }, 0.9)
    }, scope)

    return () => ctx.revert()
  }, { scope })

  return (
    <section ref={scope} className="discipline-scene">
      {/* Image layers */}
      {cfg.frames.map((frame, i) => (
        <img
          key={frame.src}
          ref={(el) => (imgRefs.current[i] = el)}
          className="discipline-scene__frame"
          src={frame.src}
          alt={frame.alt}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {/* Overlay */}
      <div className="discipline-scene__overlay" />

      {/* Text content — left side */}
      <div ref={textRef} className="discipline-scene__content">
        <span className="discipline-scene__tag">{cfg.tag}</span>
        <h2 className="discipline-scene__title">{cfg.title}</h2>
        <p className="discipline-scene__subtitle">{cfg.subtitle}</p>
        <p className="discipline-scene__desc">{cfg.description}</p>
      </div>

      {/* Stats — bottom */}
      <div ref={statsRef} className="discipline-scene__stats">
        {cfg.stats.map((s, i) => (
          <div className="discipline-scene__stat" key={i}>
            <span className="discipline-scene__stat-value">{s.value}</span>
            <span className="discipline-scene__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Progress line */}
      <div className="discipline-scene__progress">
        <div ref={lineRef} className="discipline-scene__progress-bar" />
      </div>
    </section>
  )
}