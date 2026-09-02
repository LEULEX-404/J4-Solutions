import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import OrbBurst from './components/OrbBurst';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', isLoading);
    document.body.classList.toggle('is-loading', isLoading);

    return () => {
      document.documentElement.classList.remove('is-loading');
      document.body.classList.remove('is-loading');
    };
  }, [isLoading]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <Router>
      {isLoading ? (
        <div className="app-loader" role="status" aria-live="polite" aria-label="Loading J4 Solutions">
          <div className="app-loader-inner">
            <div className="loader-orb-wrap">
              <OrbBurst
                dotColor="#F4F1EA"
                accentColor="#00FFE5"
                density={220}
                dotSize={150}
                speed={55}
                spinTurns={1}
                ball={{ spread: 110, turn: 0, tilt: 0.35 }}
                pointer={{ drag: 0, damping: 18 }}
              />
            </div>
            <div className="loader-meta">
              <span className="loader-brand">J4 Solutions</span>
              <div className="loading-bar" aria-hidden="true">
                <span />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="app">
          <ParticleBackground isDarkMode={isDarkMode} />
          <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;
