import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import OrbBurst from './components/OrbBurst';
import PageTransition from './components/PageTransition';
import PageMetadata from './components/PageMetadata';

function RouteScroll() {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    const main = document.getElementById('main-content');
    main?.focus({ preventScroll: true });
    if (hash) {
      let targetId;
      try { targetId = decodeURIComponent(hash.slice(1)); } catch { targetId = hash.slice(1); }
      const target = document.getElementById(targetId);
      if (target) {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.scrollIntoView({ block: 'start', behavior: 'instant' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search, hash]);

  return null;
}

function PageRoutes() {
  const { pathname } = useLocation();

  return (
    <div className="page-entry" key={pathname}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

function AppShell() {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(() => pathname === '/');

  useEffect(() => {
    if (!isLoading) return undefined;
    const timer = window.setTimeout(() => setIsLoading(false), 1800);
    return () => window.clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', isLoading);
    document.body.classList.toggle('is-loading', isLoading);

    return () => {
      document.documentElement.classList.remove('is-loading');
      document.body.classList.remove('is-loading');
    };
  }, [isLoading]);

  return (
    <>
      <PageMetadata />
      {isLoading ? (
        <div className="app-loader" role="status" aria-live="polite" aria-label="Loading J4 Solutions">
          <div className="app-loader-inner">
            <div className="loader-orb-wrap">
              <OrbBurst
                dotColor="#12355b"
                accentColor="#1476cf"
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
        <PageTransition pathname={pathname}>
          <div className="app">
            <a className="skip-link" href="#main-content">Skip to content</a>
            <Navigation />
            <RouteScroll />
            <main className="main-content" id="main-content" tabIndex={-1}>
              <PageRoutes />
            </main>
            <Footer />
          </div>
        </PageTransition>
      )}
    </>
  );
}

function App() {
  return <Router><AppShell /></Router>;
}

export default App;
