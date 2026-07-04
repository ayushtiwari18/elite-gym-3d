import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const scope = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.to('.cta__content', {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: scope.current, start: 'top 80%', toggleActions: 'play none none none' }
      })
    }, scope)
    return () => ctx.revert()
  }, { scope })

  return (
    <section ref={scope} className="cta" id="contact">
      <div className="cta__content">
        <p className="section-eyebrow">Ready?</p>
        <h2 className="section-title">Start Your<br /><span>Transformation</span></h2>
        <p>Join the elite. Your first week is on us — no strings attached.</p>
        <button className="btn-primary">Claim Free Trial</button>
      </div>
    </section>
  )
}
