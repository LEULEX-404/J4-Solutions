import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Briefcase, FolderOpen, Home, Mail, Menu, Users, X } from 'lucide-react';
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
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

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
    menuRef.current?.querySelector('a')?.focus();
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') { setIsMobileMenuOpen(false); toggleRef.current?.focus(); }
    };
    const closeOutsideFocus = (event) => {
      if (!menuRef.current?.contains(event.target) && event.target !== toggleRef.current) setIsMobileMenuOpen(false);
    };
    const closeOnResize = () => { if (window.innerWidth > 900) setIsMobileMenuOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    document.addEventListener('focusin', closeOutsideFocus);
    window.addEventListener('resize', closeOnResize);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('focusin', closeOutsideFocus);
      window.removeEventListener('resize', closeOnResize);
    };
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
              <img src="/images/brand/logo-192.webp" srcSet="/images/brand/logo-96.webp 96w, /images/brand/logo-192.webp 192w" sizes="96px" alt="" width={192} height={128} />
            </span>
            <span className="brand-lockup">
              <strong>J4 Solutions</strong>
              <span>Digital studio / Sri Lanka</span>
            </span>
          </Link>

          <div className="nav-directory">
            <div ref={menuRef} id="primary-nav-links" className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
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
              ref={toggleRef}
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
