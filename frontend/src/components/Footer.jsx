import { Link } from 'react-router-dom'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/works', label: 'Our Works' },
  { to: '/volunteer', label: 'Volunteer' },
  { to: '/contact', label: 'Contact' },
]

const socialLinks = [
  { href: 'https://twitter.com', label: 'Twitter' },
  { href: 'https://www.instagram.com', label: 'Instagram' },
  { href: 'https://www.linkedin.com', label: 'LinkedIn' },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-column footer-brand">
          <p className="footer-logo">
            Seva<span>Connect</span>
          </p>
          <p className="muted">
            Community-powered NGO connecting volunteers, donors, and local leaders to create lasting
            change across India.
          </p>
        </div>
        <div className="footer-column">
          <p className="footer-label">Quick links</p>
          <ul className="footer-links">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-column">
          <p className="footer-label">Contact</p>
          <a href="mailto:hello@seva-connect.org">hello@seva-connect.org</a>
          <p>+91-90000-00000</p>
          <p className="muted">123 Hope Street, Hyderabad</p>
        </div>
        <div className="footer-column">
          <p className="footer-label">Follow</p>
          <div className="footer-social">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="muted">© {year} SevaConnect. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
