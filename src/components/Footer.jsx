export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__brand-name">Elite<span>Gym</span></div>
          <p>Where ambition meets action. Premium fitness for those who demand excellence.</p>
        </div>
        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#classes">Classes</a></li>
            <li><a href="#trainers">Trainers</a></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Programs</h4>
          <ul>
            <li><a href="#classes">Strength Training</a></li>
            <li><a href="#classes">HIIT Blitz</a></li>
            <li><a href="#classes">Power Yoga</a></li>
            <li><a href="#classes">Fight Club</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:info@elitegym.com">info@elitegym.com</a></li>
            <li><a href="tel:+15551234567">+1 (555) 123-4567</a></li>
            <li><a href="#contact">123 Iron Street, NY</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 EliteGym. All rights reserved.</span>
        <span>Forged with 🔥</span>
      </div>
    </footer>
  )
}
