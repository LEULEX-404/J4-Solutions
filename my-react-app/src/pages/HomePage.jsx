import React, { useState, useEffect } from 'react';
import { ArrowRight, Code, Smartphone, Globe, Zap, Shield, TrendingUp } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Transform Your Vision Into Reality",
      subtitle: "Custom software solutions designed just for you",
      icon: Code
    },
    {
      title: "Mobile-First Development",
      subtitle: "Responsive apps that work seamlessly everywhere",
      icon: Smartphone
    },
    {
      title: "Global Digital Solutions",
      subtitle: "Connecting businesses to the world",
      icon: Globe
    }
  ];

  const features = [
    { icon: Zap, title: "Lightning Fast", desc: "Optimized performance for speed" },
    { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security" },
    { icon: TrendingUp, title: "Scalable Growth", desc: "Solutions that grow with you" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = heroSlides[currentSlide].icon;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-icon-wrapper">
            <CurrentIcon className="hero-icon" size={80} />
          </div>
          
          <div className="hero-text">
            <h1 className="hero-title">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="hero-subtitle">
              {heroSlides[currentSlide].subtitle}
            </p>
          </div>

          <button className="cta-button">
            Get Started
            <ArrowRight className="cta-icon" size={20} />
          </button>

          <div className="slider-dots">
            {heroSlides.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="hero-decoration">
          <div className="floating-card card-1"></div>
          <div className="floating-card card-2"></div>
          <div className="floating-card card-3"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose J4 Solutions?</h2>
        <div className="features-grid">
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <div 
                key={index} 
                className="feature-card"
                style={{ '--card-index': index }}
              >
                <div className="feature-icon-wrapper">
                  <FeatureIcon className="feature-icon" size={32} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">30+</div>
            <div className="stat-label">Happy Clients</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;