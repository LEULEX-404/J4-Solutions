import React from 'react';
import { Code2, Smartphone, Globe, Database, Cloud, Palette, Lock, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ServicesPage.css';
import developerImg from '../assets/photos/developer-work.jpg';
import mobileImg from '../assets/photos/mobile-creative.jpg';
import analyticsImg from '../assets/photos/analytics.jpg';
import serverImg from '../assets/photos/server-room.jpg';
import designImg from '../assets/photos/design-work.jpg';
import dashboardImg from '../assets/photos/dashboard.jpg';
import workshopImg from '../assets/photos/team-workshop.jpg';

const ServicesPage = () => {
  const services = [
    {
      icon: Code2,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies and best practices.",
      features: ["Responsive Design", "SEO Optimized", "Fast Performance"],
      image: developerImg,
      imageAlt: "Software development on a laptop"
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android devices.",
      features: ["Cross-Platform", "Native Performance", "App Store Ready"],
      image: mobileImg,
      imageAlt: "Person using a mobile application"
    },
    {
      icon: Database,
      title: "Database Solutions",
      description: "Robust database design, optimization, and management for your applications.",
      features: ["Scalable Architecture", "Data Security", "Performance Tuning"],
      image: analyticsImg,
      imageAlt: "Data dashboard on a laptop"
    },
    {
      icon: Cloud,
      title: "Cloud Services",
      description: "Cloud infrastructure setup, migration, and management on AWS, Azure, or Google Cloud.",
      features: ["Cloud Migration", "Auto Scaling", "Cost Optimization"],
      image: serverImg,
      imageAlt: "Network equipment in a server room"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that provide exceptional user experiences.",
      features: ["User Research", "Prototyping", "Usability Testing"],
      image: designImg,
      imageAlt: "People reviewing ideas on laptops"
    },
    {
      icon: Lock,
      title: "Security Solutions",
      description: "Comprehensive security audits, implementation, and ongoing protection.",
      features: ["Security Audits", "Penetration Testing", "Compliance"],
      image: serverImg,
      imageAlt: "Server infrastructure"
    },
    {
      icon: Cpu,
      title: "AI & Machine Learning",
      description: "Intelligent solutions powered by artificial intelligence and machine learning.",
      features: ["Predictive Analytics", "Automation", "Data Insights"],
      image: dashboardImg,
      imageAlt: "Analytics displayed on a digital screen"
    },
    {
      icon: Globe,
      title: "Digital Transformation",
      description: "Complete digital transformation services to modernize your business operations.",
      features: ["Process Automation", "Legacy Modernization", "Integration"],
      image: workshopImg,
      imageAlt: "People planning a digital project together"
    }
  ];

  return (
    <div className="services-page">
      <div className="services-header">
        <span className="editorial-eyebrow">01 / What we do</span>
        <h1 className="services-title">Digital work, <em>done thoughtfully.</em></h1>
        <p className="services-subtitle">
          Comprehensive software solutions tailored to your business needs
        </p>
      </div>

      <div className="services-container">
        <div className="services-grid">
          {services.map((service, index) => {
            const ServiceIcon = service.icon;
            return (
              <div 
                key={index} 
                className="service-card"
                style={{ '--service-index': index }}
              >
                <div className="service-media">
                  <img src={service.image} alt={service.imageAlt} />
                  <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="service-icon-container">
                  <ServiceIcon className="service-icon" size={28} strokeWidth={1.7} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="service-feature-item">
                      <span className="feature-bullet"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link className="service-btn" to="/contact" state={{ subject: `Inquiry about ${service.title}` }}>Discuss this service</Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="services-cta">
        <span className="editorial-eyebrow">Make the next move</span>
        <h2 className="cta-title">Ready to start <em>something good?</em></h2>
        <p className="cta-text">Let's discuss how we can help transform your ideas into reality</p>
        <Link className="cta-primary-btn" to="/contact">Get In Touch</Link>
      </div>
    </div>
  );
};

export default ServicesPage;
