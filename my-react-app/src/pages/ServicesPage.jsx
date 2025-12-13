import React from 'react';
import { Code2, Smartphone, Globe, Database, Cloud, Palette, Lock, Cpu } from 'lucide-react';
import './ServicesPage.css';

const ServicesPage = () => {
  const services = [
    {
      icon: Code2,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies and best practices.",
      features: ["Responsive Design", "SEO Optimized", "Fast Performance"]
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android devices.",
      features: ["Cross-Platform", "Native Performance", "App Store Ready"]
    },
    {
      icon: Database,
      title: "Database Solutions",
      description: "Robust database design, optimization, and management for your applications.",
      features: ["Scalable Architecture", "Data Security", "Performance Tuning"]
    },
    {
      icon: Cloud,
      title: "Cloud Services",
      description: "Cloud infrastructure setup, migration, and management on AWS, Azure, or Google Cloud.",
      features: ["Cloud Migration", "Auto Scaling", "Cost Optimization"]
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that provide exceptional user experiences.",
      features: ["User Research", "Prototyping", "Usability Testing"]
    },
    {
      icon: Lock,
      title: "Security Solutions",
      description: "Comprehensive security audits, implementation, and ongoing protection.",
      features: ["Security Audits", "Penetration Testing", "Compliance"]
    },
    {
      icon: Cpu,
      title: "AI & Machine Learning",
      description: "Intelligent solutions powered by artificial intelligence and machine learning.",
      features: ["Predictive Analytics", "Automation", "Data Insights"]
    },
    {
      icon: Globe,
      title: "Digital Transformation",
      description: "Complete digital transformation services to modernize your business operations.",
      features: ["Process Automation", "Legacy Modernization", "Integration"]
    }
  ];

  return (
    <div className="services-page">
      <div className="services-header">
        <h1 className="services-title">Our Services</h1>
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
                <div className="service-icon-container">
                  <ServiceIcon className="service-icon" size={40} />
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
                <button className="service-btn">Learn More</button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="services-cta">
        <h2 className="cta-title">Ready to Start Your Project?</h2>
        <p className="cta-text">Let's discuss how we can help transform your ideas into reality</p>
        <button className="cta-primary-btn">Get In Touch</button>
      </div>
    </div>
  );
};

export default ServicesPage;