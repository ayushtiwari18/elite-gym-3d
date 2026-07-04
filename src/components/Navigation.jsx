export default function Navigation({ activeScene = 1 }) {
  const sceneNames = [
    'The Beginning',
    'Enter the Gym',
    'First Workout',
    'The Transformation',
    'The Power Room',
    'The Science',
    'Community',
    'Unstoppable'
  ]

  return (
    <nav className="hud-header">
      {/* Brand HUD Logo */}
      <div className="hud-logo">
        <div className="hud-logo__icon">Ω</div>
        <div className="hud-logo__text">
          <span className="hud-logo__brand">Apex</span>
          <span className="hud-logo__sub">Protocol</span>
        </div>
      </div>

      {/* Active Scene Tracker (Center) */}
      <div className="hud-tracker">
        {sceneNames.map((name, i) => {
          const index = i + 1
          const isActive = index === activeScene
          return (
            <div key={i} className={`hud-tracker__item ${isActive ? 'active' : ''}`}>
              <span className="hud-tracker__num">
                {String(index).padStart(2, '0')}
              </span>
              {isActive && <span className="hud-tracker__name">{name}</span>}
            </div>
          )
        })}
      </div>

      {/* Access Button */}
      <div className="hud-action">
        <button className="hud-btn">
          Access Portal
        </button>
      </div>
    </nav>
  )
}
