import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const classes = [
  { title: 'Strength Training', tag: 'Build', desc: 'Build raw power with progressive overload programs.', image: '/assets/images/class-strength.png' },
  { title: 'HIIT Blitz', tag: 'Burn', desc: 'High-intensity intervals to torch calories and boost endurance.', image: '/assets/images/class-hiit.png' },
  { title: 'Power Yoga', tag: 'Flow', desc: 'Flexibility, balance, and mental clarity in one session.', image: '/assets/images/class-yoga.png' },
  { title: 'Fight Club', tag: 'Strike', desc: 'Boxing fundamentals with full-body conditioning.', image: '/assets/images/class-boxing.png' }
]

export default function Classes() {
  const scope = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.to('.classes__header', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: scope.current, start: 'top 80%', toggleActions: 'play none none none' }
      })
      gsap.to('.class-card', {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.classes__grid', start: 'top 85%', toggleActions: 'play none none none' }
      })
    }, scope)
    return () => ctx.revert()
  }, { scope })

  return (
    <section ref={scope} className="classes" id="classes">
      <div className="classes__header">
        <p className="section-eyebrow">Programs</p>
        <h2 className="section-title">Our Classes</h2>
        <p>From raw strength to mindful flow — find your discipline.</p>
      </div>
      <div className="classes__grid">
        {classes.map((c, i) => (
          <div className="class-card" key={i}>
            <img className="class-card__image" src={c.image} alt={c.title} />
            <div className="class-card__overlay" />
            <div className="class-card__content">
              <span className="class-card__tag">{c.tag}</span>
              <h3 className="class-card__title">{c.title}</h3>
              <p className="class-card__desc">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
