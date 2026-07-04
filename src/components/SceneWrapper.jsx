import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import CinematicCanvas from './CinematicCanvas'
import Navigation from './Navigation'

gsap.registerPlugin(ScrollTrigger)

export default function SceneWrapper() {
  const containerRef = useRef(null)
  const [activeScene, setActiveScene] = useState(1)

  useGSAP(() => {
    const panels = gsap.utils.toArray('.scene-panel')
    const bgLayers = gsap.utils.toArray('.bg-layer')
    const modelContainer = document.querySelector('.model-foreground-container')

    const ctx = gsap.context(() => {
      // Create master scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=700%', // 8 scenes = 7 transition segments
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress
            const sceneIndex = Math.min(8, Math.floor(progress * 8) + 1)
            setActiveScene(sceneIndex)
          }
        }
      })

      // Setup initial states
      gsap.set(bgLayers, { opacity: 0, scale: 1.1 })
      gsap.set(bgLayers[0], { opacity: 1.0, scale: 1.0 }) // Scene 1 background starts fully visible
      
      // Setup model elements initially
      gsap.set('.model-layer', { opacity: 0 })
      gsap.set('.model-stand', { opacity: 1 }) // Start with stand pose
      gsap.set(modelContainer, { xPercent: -50, yPercent: -50, scale: 0.8, x: 0, y: 30 })

      // --- SCENE 1 -> 2 TRANSITION ---
      tl.to(bgLayers[0], { opacity: 0, scale: 1.1, duration: 1 }, 0)
        .to(bgLayers[1], { opacity: 1.0, scale: 1.0, duration: 1 }, 0)
        .to(modelContainer, {
          scale: 0.95,
          x: 120, // Shift model right, text will be left-aligned
          y: 40,
          duration: 1
        }, 0)

      // --- SCENE 2 -> 3 TRANSITION ---
      tl.to(bgLayers[1], { opacity: 0, scale: 1.1, duration: 1 }, 1)
        .to(bgLayers[2], { opacity: 1.0, scale: 1.0, duration: 1 }, 1)
        .to('.model-stand', { opacity: 0, duration: 0.35 }, 1)
        .to('.model-lift', { opacity: 1, duration: 0.35 }, 1)
        .to(modelContainer, {
          scale: 0.85,
          x: -140, // Shift model left, text will be right-aligned
          y: 20,
          duration: 1
        }, 1)

      // --- SCENE 3 -> 4 TRANSITION ---
      tl.to(bgLayers[2], { opacity: 0, scale: 1.1, duration: 1 }, 2)
        .to(bgLayers[3], { opacity: 1.0, scale: 1.0, duration: 1 }, 2)
        .to('.model-lift', { opacity: 0, duration: 0.35 }, 2)
        .to('.model-run', { opacity: 1, duration: 0.35 }, 2)
        .to(modelContainer, {
          scale: 1.0,
          x: 130, // Shift model right, text will be left-aligned
          y: 10,
          duration: 1
        }, 2)

      // --- SCENE 4 -> 5 TRANSITION ---
      tl.to(bgLayers[3], { opacity: 0, scale: 1.1, duration: 1 }, 3)
        .to(bgLayers[4], { opacity: 1.0, scale: 1.0, duration: 1 }, 3)
        .to('.model-run', { opacity: 0, duration: 0.35 }, 3)
        .to('.model-lift', { opacity: 1, duration: 0.35 }, 3) // Reuse lift pose for peak action
        .to(modelContainer, {
          scale: 1.15,
          x: 0, // Zoom center-stage for power room stats display
          y: 50,
          duration: 1
        }, 3)

      // --- SCENE 5 -> 6 TRANSITION ---
      tl.to(bgLayers[4], { opacity: 0, scale: 1.1, duration: 1 }, 4)
        .to(bgLayers[5], { opacity: 1.0, scale: 1.0, duration: 1 }, 4)
        .to('.model-lift', { opacity: 0, duration: 0.35 }, 4)
        .to('.model-recover', { opacity: 1, duration: 0.35 }, 4)
        .to(modelContainer, {
          scale: 0.85,
          x: -150, // Shift model left, recovery grid will be right-aligned
          y: 10,
          duration: 1
        }, 4)

      // --- SCENE 6 -> 7 TRANSITION ---
      tl.to(bgLayers[5], { opacity: 0, scale: 1.1, duration: 1 }, 5)
        .to(bgLayers[6], { opacity: 1.0, scale: 1.0, duration: 1 }, 5)
        .to('.model-recover', { opacity: 0, duration: 0.35 }, 5)
        .to('.model-triumph', { opacity: 1, duration: 0.35 }, 5)
        .to(modelContainer, {
          scale: 1.0,
          x: 120, // Shift model right, quote text will be left-aligned
          y: 30,
          duration: 1
        }, 5)

      // --- SCENE 7 -> 8 TRANSITION ---
      tl.to(bgLayers[6], { opacity: 0, scale: 1.1, duration: 1 }, 6)
        .to(bgLayers[7], { opacity: 1.0, scale: 1.0, duration: 1 }, 6)
        .to(modelContainer, {
          scale: 1.35,
          x: 0, // Center full focus triumph zoom
          y: -10,
          duration: 1
        }, 6)

      // Animate text sections matching the timeline segments
      panels.forEach((panel, i) => {
        gsap.fromTo(panel,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            scrollTrigger: {
              trigger: containerRef.current,
              start: () => `top+=${(i / 8) * 100}% top`,
              end: () => `top+=${((i + 1) / 8) * 100}% top`,
              scrub: true,
              toggleActions: 'play reverse play reverse'
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="scene-container">
      <Navigation activeScene={activeScene} />

      {/* Cinematic Particle Canvas Layer */}
      <CinematicCanvas particlesCount={90} />

      {/* Parallax Background Layers */}
      <div className="scene-bg">
        <img className="bg-layer" src="/assets/atmosphere/gym-floor-dark.png" alt="S1 bg" />
        <img className="bg-layer" src="/assets/door/gym-entrance-bg.png" alt="S2 bg" />
        <img className="bg-layer" src="/assets/machines/rack-far.png" alt="S3 bg" />
        <img className="bg-layer" src="/assets/machines/treadmill-far.png" alt="S4 bg" />
        <img className="bg-layer" src="/assets/images/class-strength.png" alt="S5 bg" />
        <img className="bg-layer" src="/assets/images/class-yoga.png" alt="S6 bg" />
        <img className="bg-layer" src="/assets/images/class-hiit.png" alt="S7 bg" />
        <img className="bg-layer" src="/assets/images/hero-banner.png" alt="S8 bg" />
      </div>

      {/* Cinematic Foreground Model Layer */}
      <div className="model-foreground-container">
        <img className="model-layer model-stand" src="/assets/model/cutouts/model-stand.png" alt="Model Standing" />
        <img className="model-layer model-lift" src="/assets/model/cutouts/model-lift.png" alt="Model Lifting" />
        <img className="model-layer model-run" src="/assets/model/cutouts/model-run.png" alt="Model Running" />
        <img className="model-layer model-recover" src="/assets/model/cutouts/model-recover.png" alt="Model Recovering" />
        <img className="model-layer model-triumph" src="/assets/model/cutouts/model-triumph.png" alt="Model Triumphant" />
      </div>

      {/* Overlay Vignette */}
      <div className="scene-overlay" />

      {/* Text Panels Layer */}
      <div className="scene-content">
        
        {/* Scene 1: Beginning */}
        <div className="scene-panel align-center">
          <span className="scene-panel__phase">Phase 01 — THE GROUNDWORK</span>
          <h2 className="scene-panel__title">
            Awaken Your<br /><span className="text-sky">Potential</span>
          </h2>
          <p className="scene-panel__desc">
            Deep in the shadows of preparation, the path to performance begins. Scroll to trigger the awakening.
          </p>
        </div>

        {/* Scene 2: Enter Gym */}
        <div className="scene-panel align-left">
          <span className="scene-panel__phase">Phase 02 — THE ARENA</span>
          <h2 className="scene-panel__title">
            Cross The<br /><span className="text-orange">Threshold</span>
          </h2>
          <p className="scene-panel__desc">
            Step through the entrance gates where excuses die and absolute focus takes over. Feel the environment charge.
          </p>
        </div>

        {/* Scene 3: First Workout */}
        <div className="scene-panel align-right">
          <span className="scene-panel__phase">Phase 03 — THE IRON DECK</span>
          <h2 className="scene-panel__title">
            Load The<br /><span className="text-red">Heavy Steel</span>
          </h2>
          <p className="scene-panel__desc">
            Grip the iron. Fusing muscle fibers under the load of heavy plates. Hypertrophy starts under mechanical tension.
          </p>
        </div>

        {/* Scene 4: Cardio Engine */}
        <div className="scene-panel align-left">
          <span className="scene-panel__phase">Phase 04 — THE ENGINE</span>
          <h2 className="scene-panel__title">
            Outrun Your<br /><span className="text-pink">Limits</span>
          </h2>
          <p className="scene-panel__desc">
            Max out your VO2 max and cardio thresholds. A high-speed sprint built to outrun yesterday's limitations.
          </p>
        </div>

        {/* Scene 5: Power Room */}
        <div className="scene-panel align-center">
          <span className="scene-panel__phase">Phase 05 — PEAK PERFORMANCE</span>
          <h2 className="scene-panel__title">
            Enter The<br /><span className="text-red">Red Line</span>
          </h2>
          <div className="scene-panel__stats">
            <div className="stat-item">
              <span className="stat-val">98%</span>
              <span className="stat-label">Strength</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">100%</span>
              <span className="stat-label">Focus</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">MAX</span>
              <span className="stat-label">Power</span>
            </div>
          </div>
        </div>

        {/* Scene 6: Recovery */}
        <div className="scene-panel align-right">
          <span className="scene-panel__phase">Phase 06 — SYSTEM RECOVERY</span>
          <h2 className="scene-panel__title">
            Bio-Metric<br /><span className="text-emerald">Reconstruction</span>
          </h2>
          <div className="scene-panel__grid">
            <div className="grid-card">
              <span className="card-label">Recovery</span>
              <p className="card-val">Oxygen Max & Sleep Sync</p>
            </div>
            <div className="grid-card">
              <span className="card-label">Nutrition</span>
              <p className="card-val">Caloric Target Calibration</p>
            </div>
          </div>
        </div>

        {/* Scene 7: Community */}
        <div className="scene-panel align-left">
          <span className="scene-panel__phase">Phase 07 — COHESIVE FORCE</span>
          <h2 className="scene-panel__title">
            Forge In<br /><span className="text-amber">Unity</span>
          </h2>
          <p className="scene-panel__desc quote">
            "The energy here is infectious. You are surrounded by a community focused on absolute growth."
          </p>
          <span className="quote-author">— Collective Athlete Review</span>
        </div>

        {/* Scene 8: Final */}
        <div className="scene-panel align-center final-scene">
          <span className="scene-panel__phase gold">Ascended Protocol</span>
          <h2 className="scene-panel__title massive">
            Unstoppable<br /><span className="text-gold">Legacy</span>
          </h2>
          <button className="cta-btn">
            Start Your Legacy Now
          </button>
        </div>

      </div>
    </div>
  )
}
