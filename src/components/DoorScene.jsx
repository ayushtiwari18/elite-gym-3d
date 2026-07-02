import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function DoorScene() {
  const scope = useRef(null)
  const doorRef = useRef(null)
  const bgRef = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: 'top top',
          end: '+=200%',
          scrub: true,
          pin: true
        }
      })

      tl.to(doorRef.current, {
        scale: 1.08,
        y: -20,
        rotateZ: -1,
        ease: 'none'
      })
        .to(doorRef.current, {
          opacity: 0.4,
          scale: 1.15,
          ease: 'none'
        }, 0.5)
        .to(bgRef.current, {
          scale: 1.1,
          ease: 'none'
        }, 0)

      ScrollTrigger.refresh()
    },
    { scope }
  )

  return (
    <section ref={scope} className="door-scene">
      <img
        ref={bgRef}
        className="door-scene__bg"
        src="/assets/door/gym-entrance-bg.png"
        alt="Gym entrance"
      />
      <img
        ref={doorRef}
        className="door-scene__door"
        src="/assets/door/door-closed.png"
        alt="Gym door"
      />
      <div className="door-scene__text">
        <p>Scroll to enter</p>
      </div>
    </section>
  )
}