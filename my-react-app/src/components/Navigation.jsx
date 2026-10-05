import React, { useEffect, useLayoutEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Briefcase, FolderOpen, Home, Mail, Menu, Users, X } from 'lucide-react';
import logo from '../assets/logo.png';
import './Navigation.css';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/services', label: 'Services', icon: Briefcase },
  { path: '/portfolio', label: 'Work', icon: FolderOpen },
  { path: '/about', label: 'About', icon: Users },
  { path: '/contact', label: 'Contact', icon: Mail }
];

const Navigation = () => {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
      const hero = document.querySelector('.hero-section');
      setIsPastHero(!hero || window.scrollY >= hero.offsetTop + hero.offsetHeight - 120);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.body.classList.toggle('nav-open', isMobileMenuOpen);
    return () => document.body.classList.remove('nav-open');
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const handleNavClick = () => {
    closeMobileMenu();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <>
      <nav className={`navigation ${isScrolled ? 'scrolled' : ''} ${pathname !== '/' || isPastHero ? 'is-light' : ''}`} aria-label="Primary navigation">
        <div className="nav-frame">
          <Link to="/" className="nav-identity" onClick={handleNavClick} aria-label="J4 Solutions home">
            <span className="brand-mark">
              <img src={logo} alt="" />
            </span>
            <span className="brand-lockup">
              <strong>J4 Solutions</strong>
              <span>Digital studio / Sri Lanka</span>
            </span>
          </Link>

          <div className="nav-directory">
            <div id="primary-nav-links" className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
              <div className="mobile-menu-head">
                <span>Navigate</span>
                <span>J4 / Studio</span>
              </div>
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    onClick={handleNavClick}
                  >
                    <span className="nav-number">{String(index + 1).padStart(2, '0')}</span>
                    <Icon className="nav-icon" size={17} strokeWidth={1.7} />
                    <span className="nav-label">{item.label}</span>
                  </NavLink>
                );
              })}
              <div className="mobile-menu-foot">
                <span>Kaduwela, Sri Lanka</span>
                <span>UTC +05:30</span>
              </div>
            </div>
          </div>

          <div className="nav-utilities">
            <Link to="/contact" className="nav-brief" onClick={handleNavClick}>
              Let's talk <ArrowUpRight size={17} />
            </Link>
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="primary-nav-links"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && <button type="button" className="mobile-overlay" onClick={closeMobileMenu} aria-label="Close menu" />}
    </>
  );
};

export default Navigation;
