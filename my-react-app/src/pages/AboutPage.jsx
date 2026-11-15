import React from 'react';
import { Target, Users, Shield, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './AboutPage.css';
import SceneImage from '../components/SceneImage';

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: "Start with clarity",
      description: "We work from the business problem and the people the product needs to serve."
    },
    {
      icon: Users,
      title: "Build together",
      description: "Decisions stay visible, feedback stays welcome, and the work stays connected to your goals."
    },
    {
      icon: Shield,
      title: "Design for longevity",
      description: "Useful interfaces and maintainable technology make a better foundation for growth."
    }
  ];

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-content">
          <span className="editorial-eyebrow">03 / Our studio</span>
          <h1 className="about-title">Built with care. <em>Made for you.</em></h1>
          <p className="about-tagline">Just for you. Built with purpose.</p>
          <p className="about-description">
            Based in Kaduwela, Sri Lanka, J4 Solutions brings strategy, design, and engineering together to create digital products shaped around real needs.
          </p>
        </div>
        <div className="about-hero-visual">
          <SceneImage src="/images/j4/about/01-studio-exterior.webp" alt="Illustrative modern small software studio office entrance in Sri Lanka" width={1536} height={1024} loading="eager" />
        </div>
      </div>

      <div className="about-story">
        <div className="story-container">
          <div className="story-content">
            <span className="editorial-eyebrow">The story</span>
            <h2 className="story-title">Curious minds. <em>Clear purpose.</em></h2>
            <div className="story-text">
              <p>
                Every useful product starts with listening. We learn what needs to change, identify the constraints, and agree on a practical direction before building.
              </p>
              <p>
                From an early concept to a working release, we pair thoughtful design with dependable development. The result should be clear to use and straightforward to maintain.
              </p>
              <p>
                We stay close to the people using the product and the team running it. That keeps each decision connected to a useful outcome.
              </p>
            </div>
          </div>
          <div className="story-visual">
            <div className="visual-card card-primary">
              <SceneImage src="/images/j4/about/02-planning-together.webp" alt="Candid diverse South Asian software team planning around round table with notebooks wireframes and laptops" width={1536} height={1024} />
            </div>
            <div className="visual-card card-secondary">
              <SceneImage src="/images/j4/about/03-engineering-team.webp" alt="Three South Asian software engineers focused on pair programming and testing at shared desk" width={1536} height={1024} />
            </div>
          </div>
        </div>
      </div>

      <div className="about-values">
        <span className="editorial-eyebrow">What guides us</span>
        <h2 className="values-title">The way we <em>work together.</em></h2>
        <div className="values-grid">
          {values.map((value, index) => {
            const ValueIcon = value.icon;
            return (
              <div 
                key={index} 
                className="value-card"
                style={{ '--value-index': index }}
              >
                <div className="value-icon-wrapper">
                  <ValueIcon className="value-icon" size={32} />
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="about-team">
        <span className="eyebrow">Let us talk</span>
        <h2 className="team-title">A thoughtful partner for your <em>next digital move.</em></h2>
        <p className="team-subtitle">Share your idea, challenge, or brief and we can explore the right direction together.</p>
        <Link to="/contact" className="about-contact-link">Get in touch <ArrowUpRight size={19} /></Link>
      </div>
    </div>
  );
};

export default AboutPage;
