import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: '15K+', label: 'Active Members' },
  { number: '50+', label: 'Expert Trainers' },
  { number: '200+', label: 'Classes Weekly' },
  { number: '98%', label: 'Satisfaction Rate' }
]

export default function StatsBar() {
  const scope = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.to('.stat-item', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scope.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
    }, scope)
    return () => ctx.revert()
  }, { scope })

  return (
    <section ref={scope} className="stats-bar" id="stats">
      {stats.map((s, i) => (
        <div className="stat-item" key={i}>
          <div className="stat-item__number">{s.number}</div>
          <div className="stat-item__label">{s.label}</div>
        </div>
      ))}
    </section>
  )
}
