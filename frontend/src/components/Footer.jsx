import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  const links = {
    Services: [
      { label: 'Washing Plans', to: '/plans' },
      { label: 'Locations', to: '/washing-points' },
      { label: 'Book a Wash', to: '/booking/add' },
      { label: 'Search Bookings', to: '/search' },
    ],
    Company: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Admin Panel', to: '/admin' },
    ],
  };

  return (
    <footer className="footer" role="contentinfo">
      {/* Glow Bar */}
      <div className="footer__glow-bar" aria-hidden="true" />

      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span>💧</span>
              <span className="gradient-text">CWMS</span>
            </Link>
            <p className="footer__tagline">
              Premium car wash management — book, track, and enjoy a spotless vehicle.
            </p>
            <div className="footer__socials">
              <a href="tel:+1234567890" className="footer__social-btn" aria-label="Call us">📞</a>
              <a href="mailto:info@cwms.lk" className="footer__social-btn" aria-label="Email us">📧</a>
              <a href="#" className="footer__social-btn" aria-label="Facebook">🌐</a>
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="footer__col">
              <h4 className="footer__col-title">{title}</h4>
              <ul className="footer__col-links">
                {items.map(({ label, to }) => (
                  <li key={to}>
                    <Link to={to} className="footer__link">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <ul className="footer__contact-list">
              <li>📍 123 Wash Street, Colombo</li>
              <li>📞 +94 77 123 4567</li>
              <li>📧 info@cwms.lk</li>
              <li>🕐 Mon–Sat, 7am–7pm</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p>© {year} <span className="gradient-text">CWMS</span>. All rights reserved.</p>
          <p className="footer__built">Built with 💧 & ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
