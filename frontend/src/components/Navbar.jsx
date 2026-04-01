import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

// Primary navigation config for quick edits.
const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/works', label: 'Our Works' },
  { path: '/volunteer', label: 'Volunteer' },
  { path: '/contact', label: 'Contact' },
  { path: '/admin', label: 'Admin' },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="navbar">
      <NavLink to="/" className="brand" onClick={closeMenu}>
        <span className="brand-name">
          <span className="brand-seva">Seva</span>
          <span className="brand-connect">Connect</span>
        </span>
      </NavLink>

      {/* Mobile hamburger toggle */}
      <button
        type="button"
        className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Primary nav links */}
      <nav id="primary-navigation" className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {item.label}
          </NavLink>
        ))}
        <Link to="/volunteer" className="join-button" onClick={closeMenu}>
          Join Us
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
