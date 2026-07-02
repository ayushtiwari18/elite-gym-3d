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
    console.log('DoorScene mounted')

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: 'top top',
          end: '+=250%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          markers: true,
          invalidateOnRefresh: true,
          onEnter: () => console.log('DoorScene enter'),
          onLeave: () => console.log('DoorScene leave'),
          onUpdate: (self) =>
            console.log(
              'progress:',
              self.progress.toFixed(3),
              'direction:',
              self.direction,
              'velocity:',
              self.getVelocity()
            )
        }
      })

      tl.set(openRef.current, { opacity: 0 })
        .set(bgRef.current, { opacity: 1, scale: 1 })
        .set(closedRef.current, { opacity: 1, scale: 1 })
        .to(closedRef.current, { opacity: 0, ease: 'none', duration: 0.35 }, 0.15)
        .to(bgRef.current, { scale: 1.08, ease: 'none', duration: 0.7 }, 0.1)
        .to(openRef.current, { opacity: 1, ease: 'none', duration: 0.45 }, 0.45)

      console.log('Timeline created', tl)
    }, scope)

    return () => {
      ctx.revert()
      console.log('DoorScene cleanup')
    }
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
        src="/assets/door/door-ajar.png"
        alt="ajar gym door"
      />
          <img
        ref={openRef}
        className="door-scene__layer door-scene__open"
        src="/assets/door/door-half.png"
        alt="half open gym door"
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