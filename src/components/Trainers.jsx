import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const trainers = [
  { name: 'Marcus Rivera', role: 'Strength & Conditioning', bio: '12+ years of elite coaching. Former competitive powerlifter with NSCA certification.', image: '/assets/images/trainer-1.png' },
  { name: 'Sarah Chen', role: 'HIIT & Functional Training', bio: 'Certified CrossFit L3 trainer specializing in metabolic conditioning and mobility.', image: '/assets/images/trainer-2.png' },
  { name: 'James Walker', role: 'Sports Performance', bio: 'Former D1 athlete. Specializes in athletic performance and injury prevention.', image: '/assets/images/trainer-3.png' }
]

export default function Trainers() {
  const scope = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.to('.trainers__header', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: scope.current, start: 'top 80%', toggleActions: 'play none none none' }
      })
      gsap.to('.trainer-card', {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.trainers__grid', start: 'top 85%', toggleActions: 'play none none none' }
      })
    }, scope)
    return () => ctx.revert()
  }, { scope })

  return (
    <section ref={scope} className="trainers" id="trainers">
      <div className="trainers__inner">
        <div className="trainers__header">
          <p className="section-eyebrow">The Team</p>
          <h2 className="section-title">Elite Trainers</h2>
          <p>World-class coaches dedicated to your transformation.</p>
        </div>
        <div className="trainers__grid">
          {trainers.map((t, i) => (
            <div className="trainer-card" key={i}>
              <img className="trainer-card__image" src={t.image} alt={t.name} />
              <div className="trainer-card__info">
                <h3 className="trainer-card__name">{t.name}</h3>
                <p className="trainer-card__role">{t.role}</p>
                <p className="trainer-card__bio">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
