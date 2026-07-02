import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function DoorScene() {
  const scope = useRef(null)
  const closedRef = useRef(null)
  const openRef = useRef(null)
  const bgRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: 'top top',
        end: '+=180%',
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    })

    tl.fromTo(closedRef.current, { opacity: 1, scale: 1 }, { opacity: 0, scale: 1.04, ease: 'none' }, 0)
      .fromTo(openRef.current, { opacity: 0, scale: 1.02 }, { opacity: 1, scale: 1, ease: 'none' }, 0.35)
      .fromTo(bgRef.current, { scale: 1 }, { scale: 1.08, ease: 'none' }, 0.15)
  }, { scope })

  return (
    <section ref={scope} className="door-scene">
      <img
        ref={bgRef}
        className="door-scene__bg"
        src="/assets/door/gym-entrance-bg.png"
        alt="Gym entrance background"
      />
      <img
        ref={closedRef}
        className="door-scene__layer door-scene__closed"
        src="/assets/door/door-closed.png"
        alt="Closed gym door"
      />
      <img
        ref={openRef}
        className="door-scene__layer door-scene__open"
        src="/assets/door/door-open.png"
        alt="Open gym door"
      />
      <div className="door-scene__text">
        <p>Scroll to enter</p>
      </div>
    </section>
  )
}