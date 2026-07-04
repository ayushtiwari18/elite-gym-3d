import { useEffect } from 'react'
import Lenis from 'lenis'
import SceneWrapper from './components/SceneWrapper'
import AudioController from './components/AudioController'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical'
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <div className="app bg-black w-full min-h-screen">
      <SceneWrapper />
      <AudioController />
    </div>
  )
}