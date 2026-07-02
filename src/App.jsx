import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import Hero from './components/Hero'
import DoorScene from './components/DoorScene'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function App() {
  const appRef = useRef(null)
  const [lenisReady, setLenisReady] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      lerp: 0.08
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)

    setLenisReady(true)

    return () => {
      lenis.destroy()
    }
  }, [])

  useGSAP(
    () => {
      ScrollTrigger.refresh()
    },
    { scope: appRef, dependencies: [lenisReady] }
  )

  return (
    <div ref={appRef} className="app">
      <Hero />
      <DoorScene />
      <section className="section placeholder">
        <h2>Next Scene: Machine Zoom</h2>
        <p>This is where rack, cable, and treadmill sequences will go.</p>
      </section>
    </div>
  )
}