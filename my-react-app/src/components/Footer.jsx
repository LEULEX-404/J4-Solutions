/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, MessageCircle, Mail, MapPin, Phone, ArrowUp } from 'lucide-react';
import { contactDetails } from '../contactDetails';
import './Footer.css';

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: contactDetails.facebookUrl },
  { icon: Linkedin, label: 'LinkedIn', href: contactDetails.linkedinUrl },
  { icon: MessageCircle, label: 'WhatsApp', href: contactDetails.whatsappUrl }
];

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' }
];

const Footer = () => {
  const handleLinkClick = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container glass-panel">
      <svg className="footer-rail" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="1" x2="1200" y2="1" className="rail-line" />
        {[80, 260, 470, 640, 820, 1010, 1150].map((x, i) => (
          <circle key={x} cx={x} cy="1" r={i % 3 === 0 ? 3 : 2} className={`rail-node ${i % 2 === 0 ? 'blue' : 'violet'}`} style={{ animationDelay: `${i * 0.4}s` }} />
        ))}
      </svg>

      <div className="footer-content">
        <div className="footer-section company-info">
          <h3 className="footer-brand text-gradient">J4 Solutions</h3>
          <p className="footer-description">
            Thoughtful strategy, design, and engineering for digital products people enjoy using.
          </p>
          <div className="social-links">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} className="social-icon" aria-label={label} target="_blank" rel="noopener noreferrer">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-section quick-links">
          <h4 className="footer-heading">Quick Links</h4>
          <ul>
            {quickLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} onClick={handleLinkClick}>
                  <span className="link-node" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section contact-info">
          <h4 className="footer-heading">Contact Us</h4>
          <ul>
            <li><MapPin size={18} className="contact-icon" /><a href={contactDetails.mapsUrl} target="_blank" rel="noopener noreferrer">{contactDetails.location}</a></li>
            <li><Phone size={18} className="contact-icon" /><a href={contactDetails.phoneHref}>{contactDetails.phoneDisplay}</a></li>
            <li><Mail size={18} className="contact-icon" /><a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright-text">&copy; {new Date().getFullYear()} J4-Solutions. All rights reserved.</p>

        <div className="footer-bottom-right">
          <span className="status-pill">
            Based in Sri Lanka
          </span>
          <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
