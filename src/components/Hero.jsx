import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const scope = useRef(null)
  const bgRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.8 }, 0.3)
        .to('.hero h1', { opacity: 1, y: 0, duration: 1 }, 0.5)
        .to('.hero__sub', { opacity: 1, y: 0, duration: 0.8 }, 0.8)
        .to('.hero__buttons', { opacity: 1, y: 0, duration: 0.8 }, 1)

      // Parallax on hero bg
      gsap.to(bgRef.current, {
        yPercent: 30,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: scope.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })
    }, scope)

    return () => ctx.revert()
  }, { scope })

  return (
    <section ref={scope} className="hero" id="hero">
      <img
        ref={bgRef}
        className="hero__bg"
        src="/assets/images/hero-banner.png"
        alt="Elite Gym hero"
      />
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="hero__eyebrow">Premium Fitness Experience</p>
        <h1>Forge Your<br /><span>Legacy</span></h1>
        <p className="hero__sub">
          Step into a world of elite training, cutting-edge equipment, and relentless dedication. Your transformation starts here.
        </p>
        <div className="hero__buttons">
          <button className="btn-primary">Start Free Trial</button>
          <button className="btn-outline">Explore Programs</button>
        </div>
      </div>
      <div className="hero__scroll-indicator">
        <span>Scroll</span>
        <div className="arrow" />
      </div>
    </section>
  )
}