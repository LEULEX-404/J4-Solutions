import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, FolderOpen, Users, Mail, Menu, X, Moon, Sun } from 'lucide-react';
import logo from '../assets/logo1.png';
import './Navigation.css';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/services', label: 'Services', icon: Briefcase },
  { path: '/portfolio', label: 'Portfolio', icon: FolderOpen },
  { path: '/about', label: 'About', icon: Users },
  { path: '/contact', label: 'Contact', icon: Mail }
];

const isPathActive = (pathname, itemPath) =>
  itemPath === '/' ? pathname === '/' : pathname.startsWith(itemPath);

const Navigation = ({ isDarkMode, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [rail, setRail] = useState({ left: 0, width: 0, ready: false });

  const location = useLocation();
  const itemRefs = useRef([]);

  const activeIndex = navItems.findIndex((item) => isPathActive(location.pathname, item.path));

  const measure = useCallback((index) => {
    const el = itemRefs.current[index];
    if (!el) return;
    setRail({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
  }, []);

  useLayoutEffect(() => {
    measure(hoverIndex !== null ? hoverIndex : activeIndex);
  }, [hoverIndex, activeIndex, measure, location.pathname]);

  useLayoutEffect(() => {
    const onResize = () => measure(hoverIndex !== null ? hoverIndex : activeIndex);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [hoverIndex, activeIndex, measure]);

  useLayoutEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navigation glass-panel ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
            <div className="logo-hex">
              <span className="logo-ring" aria-hidden="true" />
              <img src={logo} alt="J4 Solutions Logo" />
            </div>
            <div className="logo-text">
              <span className="logo-main">J4 Solutions</span>
              <span className="logo-sub">Just for You</span>
            </div>
          </Link>

          <span className="status-pill" aria-hidden="true">
            <span className="status-dot" />
            Systems Online
          </span>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Dark Mode">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <ul className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`} onMouseLeave={() => setHoverIndex(null)}>
            <span
              className="nav-rail-indicator"
              style={{
                transform: `translateX(${rail.left}px)`,
                width: `${rail.width}px`,
                opacity: rail.ready ? 1 : 0
              }}
              aria-hidden="true"
            />
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  ref={(el) => (itemRefs.current[index] = el)}
                  to={item.path}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  style={{ '--item-index': index, textDecoration: 'none' }}
                  onClick={closeMobileMenu}
                  onMouseEnter={() => setHoverIndex(index)}
                >
                  <Icon className="nav-icon" size={18} />
                  <span>{item.label}</span>
                  <span className="nav-node" aria-hidden="true" />
                </NavLink>
              );
            })}
          </ul>
        </div>
      </nav>
      {isMobileMenuOpen && <div className="mobile-overlay" onClick={closeMobileMenu} />}
    </>
  );
};

export default Navigation;