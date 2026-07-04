import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: 'per month',
    features: ['Full gym access', 'Locker room', 'Free WiFi', 'Open gym hours'],
    featured: false
  },
  {
    name: 'Pro',
    price: '$59',
    period: 'per month',
    features: ['Everything in Starter', 'All group classes', '1 PT session/month', 'Sauna & recovery', 'Nutrition guide'],
    featured: true,
    badge: 'Most Popular'
  },
  {
    name: 'Elite',
    price: '$99',
    period: 'per month',
    features: ['Everything in Pro', '4 PT sessions/month', 'Priority booking', 'Guest passes', 'Meal plan'],
    featured: false
  }
]

export default function Pricing() {
  const scope = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.to('.pricing__header', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: scope.current, start: 'top 80%', toggleActions: 'play none none none' }
      })
      gsap.to('.pricing-card', {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.pricing__grid', start: 'top 85%', toggleActions: 'play none none none' }
      })
    }, scope)
    return () => ctx.revert()
  }, { scope })

  return (
    <section ref={scope} className="pricing" id="pricing">
      <div className="pricing__header">
        <p className="section-eyebrow">Membership</p>
        <h2 className="section-title">Choose Your Plan</h2>
        <p>Invest in yourself. No contracts, cancel anytime.</p>
      </div>
      <div className="pricing__grid">
        {plans.map((p, i) => (
          <div className={`pricing-card${p.featured ? ' pricing-card--featured' : ''}`} key={i}>
            {p.badge && <div className="pricing-card__badge">{p.badge}</div>}
            <div className="pricing-card__name">{p.name}</div>
            <div className="pricing-card__price">{p.price}<span>/mo</span></div>
            <div className="pricing-card__period">{p.period}</div>
            <ul className="pricing-card__features">
              {p.features.map((f, j) => <li key={j}>{f}</li>)}
            </ul>
            <button className="pricing-card__btn">Get Started</button>
          </div>
        ))}
      </div>
    </section>
  )
}
