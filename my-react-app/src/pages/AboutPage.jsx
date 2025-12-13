import React from 'react';
import { Target, Users, Award, Heart, Zap, Shield } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: "Mission Driven",
      description: "We're committed to delivering excellence in every project we undertake"
    },
    {
      icon: Users,
      title: "Client Focused",
      description: "Your success is our success. We build lasting partnerships"
    },
    {
      icon: Award,
      title: "Quality First",
      description: "We maintain the highest standards in code quality and design"
    },
    {
      icon: Heart,
      title: "Passionate Team",
      description: "Our team loves what they do and it shows in our work"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We stay ahead with the latest technologies and methodologies"
    },
    {
      icon: Shield,
      title: "Reliability",
      description: "We deliver on time, every time, with transparent communication"
    }
  ];

  const team = [
    { name: "Sarah Johnson", role: "CEO & Founder", color: "#2980b9" },
    { name: "Michael Chen", role: "CTO", color: "#3498db" },
    { name: "Emily Rodriguez", role: "Lead Designer", color: "#1e5f8c" },
    { name: "David Kim", role: "Senior Developer", color: "#2874a6" }
  ];

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-title">About J4 Solutions</h1>
          <p className="about-tagline">Just for You - Because Your Success Matters</p>
          <p className="about-description">
            We are a passionate team of developers, designers, and innovators dedicated to 
            transforming your ideas into powerful digital solutions. Founded with a vision 
            to make technology accessible and impactful, we've helped numerous businesses 
            achieve their digital transformation goals.
          </p>
        </div>
      </div>

      <div className="about-story">
        <div className="story-container">
          <div className="story-content">
            <h2 className="story-title">Our Story</h2>
            <div className="story-text">
              <p>
                J4 Solutions was born from a simple belief: every business deserves custom 
                software solutions that truly fit their needs. "Just for You" isn't just our 
                tagline - it's our commitment to personalized service and tailored solutions.
              </p>
              <p>
                Since our inception, we've grown from a small team of passionate developers 
                to a full-service software development company, but we've never lost sight 
                of what matters most - our clients and the quality of our work.
              </p>
              <p>
                Today, we continue to push boundaries, embrace new technologies, and deliver 
                solutions that exceed expectations. Every project is an opportunity to create 
                something remarkable.
              </p>
            </div>
          </div>
          <div className="story-visual">
            <div className="visual-card card-primary"></div>
            <div className="visual-card card-secondary"></div>
          </div>
        </div>
      </div>

      <div className="about-values">
        <h2 className="values-title">Our Core Values</h2>
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
        <h2 className="team-title">Meet Our Team</h2>
        <p className="team-subtitle">The talented people behind J4 Solutions</p>
        <div className="team-grid">
          {team.map((member, index) => (
            <div 
              key={index} 
              className="team-member"
              style={{ '--member-color': member.color }}
            >
              <div className="member-avatar"></div>
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;