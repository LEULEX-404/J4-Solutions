import React, { useState, useEffect } from 'react';
import { Home, Briefcase, FolderOpen, Users, Mail, Menu, X } from 'lucide-react';
import logo from '../assets/logo1.png';
import './Navigation.css';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'portfolio', label: 'Portfolio', icon: FolderOpen },
    { id: 'about', label: 'About', icon: Users },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo" onClick={() => handleNavClick('home')}>
            <div className="logo-icon">
              <img src={logo} alt="J4 Solutions Logo" />
            </div>
            <div className="logo-text">
              <span className="logo-main">J4 Solutions</span>
              <span className="logo-sub">Just for You</span>
            </div>
          </div>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <ul className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li 
                  key={item.id}
                  className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                  style={{ '--item-index': index }}
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon className="nav-icon" size={18} />
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;