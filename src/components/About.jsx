import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: '🏋️', text: 'Premium Equipment' },
  { icon: '🔥', text: 'HIIT Zones' },
  { icon: '🧘', text: 'Recovery Studio' },
  { icon: '💪', text: 'Personal Training' }
]

export default function About() {
  const scope = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.to('.about__image-wrap', {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: scope.current, start: 'top 75%', toggleActions: 'play none none none' }
      })
      gsap.to('.about__content', {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: scope.current, start: 'top 75%', toggleActions: 'play none none none' }
      })
    }, scope)
    return () => ctx.revert()
  }, { scope })

  return (
    <section ref={scope} className="about" id="about">
      <div className="about__image-wrap">
        <img src="/assets/images/about-gym.png" alt="Elite Gym Interior" />
      </div>
      <div className="about__content">
        <p className="section-eyebrow">About Us</p>
        <h2 className="section-title">More Than<br />A Gym</h2>
        <p className="about__text">
          Elite Gym is where ambition meets action. Our 25,000 sq ft facility houses world-class
          equipment, dedicated training zones, and a community of athletes committed to excellence.
          Every detail is engineered for your peak performance.
        </p>
        <div className="about__features">
          {features.map((f, i) => (
            <div className="about__feature" key={i}>
              <div className="about__feature-icon">{f.icon}</div>
              <span className="about__feature-text">{f.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
