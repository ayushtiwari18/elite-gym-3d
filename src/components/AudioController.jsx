import { useState, useRef } from 'react'

export default function AudioController() {
  const [muted, setMuted] = useState(true)
  const oscRef = useRef(null)
  const audioCtxRef = useRef(null)

  const toggleMute = () => {
    if (muted) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        const ctx = new AudioContext()
        audioCtxRef.current = ctx

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sawtooth'
        osc.frequency.value = 55 
        gain.gain.value = 0.02 

        const filter = ctx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.value = 120

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)

        osc.start()
        oscRef.current = { osc, gain }
        setMuted(false)
      } catch (err) {
        console.error('AudioContext not supported or blocked', err)
      }
    } else {
      if (oscRef.current) {
        oscRef.current.osc.stop()
        oscRef.current = null
      }
      setMuted(true)
    }
  }

  return (
    <div className="audio-control">
      <button onClick={toggleMute} className="audio-control__btn">
        <div className="audio-control__bars">
          <div className={`audio-control__bar ${muted ? '' : 'active animate-pulse'}`} />
          <div className={`audio-control__bar ${muted ? '' : 'active animate-pulse'}`} style={{ animationDelay: '0.1s' }} />
          <div className={`audio-control__bar ${muted ? '' : 'active animate-pulse'}`} style={{ animationDelay: '0.2s' }} />
        </div>
        <span className="audio-control__text">
          {muted ? 'Ambient Synth Off' : 'Ambient Synth On'}
        </span>
      </button>
    </div>
  )
}
