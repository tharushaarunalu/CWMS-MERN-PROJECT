import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/plans', label: 'Plans' },
    { to: '/washing-points', label: 'Locations' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner container">
        {/* Brand */}
        <Link to="/" className="navbar__brand">
          <span className="navbar__logo-icon">💧</span>
          <span className="navbar__brand-text">
            <span className="gradient-text">CWMS</span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`navbar__link ${location.pathname === to ? 'navbar__link--active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="navbar__actions">
          <Link to="/booking/add" className="btn btn-primary navbar__cta">
            Book Now
          </Link>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`} aria-hidden={!menuOpen}>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`navbar__mobile-link ${location.pathname === to ? 'navbar__mobile-link--active' : ''}`}
          >
            {label}
          </Link>
        ))}
        <Link to="/booking/add" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
          Book Now
        </Link>
      </div>
    </header>
  );
};

export default Nav;
