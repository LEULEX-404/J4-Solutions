import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ArrowUpRight, Briefcase, FolderOpen, Home, Mail, Menu, Moon, Sun, Users, X } from 'lucide-react';
import logo from '../assets/logo.png';
import './Navigation.css';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/services', label: 'Services', icon: Briefcase },
  { path: '/portfolio', label: 'Work', icon: FolderOpen },
  { path: '/about', label: 'About', icon: Users },
  { path: '/contact', label: 'Contact', icon: Mail }
];

const Navigation = ({ isDarkMode, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 36);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', isMobileMenuOpen);
    return () => document.body.classList.remove('nav-open');
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`} aria-label="Primary navigation">
        <div className="nav-frame">
          <Link to="/" className="nav-identity" onClick={closeMobileMenu} aria-label="J4 Solutions home">
            <span className="brand-mark">
              <img src={logo} alt="J4 Solutions" />
            </span>
            <span className="brand-lockup">
              <strong>J4 Solutions</strong>
              <span>Digital studio / Colombo</span>
            </span>
          </Link>

          <div className="nav-directory">
            <span className="directory-label" aria-hidden="true">Index</span>
            <div className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
              <div className="mobile-menu-head">
                <span>Navigate</span>
                <span>J4 / 2026</span>
              </div>
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    <span className="nav-number">{String(index + 1).padStart(2, '0')}</span>
                    <Icon className="nav-icon" size={17} strokeWidth={1.7} />
                    <span className="nav-label">{item.label}</span>
                  </NavLink>
                );
              })}
              <div className="mobile-menu-foot">
                <span><i /> Available for selected projects</span>
                <span>UTC +05:30</span>
              </div>
            </div>
          </div>

          <div className="nav-utilities">
            <span className="nav-availability" aria-label="Available for selected projects">
              <i /> Available
            </span>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Light mode' : 'Dark mode'}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/contact" className="nav-brief" onClick={closeMobileMenu}>
              Brief us <ArrowUpRight size={17} />
            </Link>
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && <button className="mobile-overlay" onClick={closeMobileMenu} aria-label="Close menu" />}
    </>
  );
};

export default Navigation;
