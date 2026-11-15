import React from 'react';
import { ArrowUpRight, Check, Code2, Smartphone, Globe, Database, Cloud, Palette, Lock, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ServicesPage.css';
import HeaderArtwork from '../components/HeaderArtwork';
import SceneImage from '../components/SceneImage';

const deliverySteps = [
  { title: 'Discover & agree', text: 'Map the business goal, users and constraints. Agree the scope, deliverables and review milestones before development.' },
  { title: 'Design & validate', text: 'Review user journeys, wireframes and working prototypes so important decisions are clear before the build grows.' },
  { title: 'Build & review', text: 'Develop in practical stages with reviewable releases, integration checks and feedback connected to the agreed goals.' },
  { title: 'Launch & hand over', text: 'Plan deployment, test the agreed workflows and prepare handover notes. Discuss ongoing support as part of the proposal.' },
];
const serviceQuestions = [
  { question: 'What should I bring to our first conversation?', answer: 'A short description of the problem, who will use the product, any existing tools and your target timeline are a useful start. A finished specification is not required.' },
  { question: 'How are price and timeline decided?', answer: 'Scope, integrations, design needs and review cycles determine the estimate. Share your requirements so the proposal can outline the cost, timeline and review milestones.' },
  { question: 'Can you improve an existing product?', answer: 'Share the current product and the changes you need. The first step is to review the existing setup and agree which improvements make sense before committing to a build.' },
  { question: 'What happens after launch?', answer: 'Handover, documentation, maintenance and additional improvements should be discussed in the project proposal. Any ongoing support scope and response expectations are agreed separately.' },
];

const ServicesPage = () => {
  const services = [
    {
      icon: Code2,
      title: "Web Development",
      category: 'Web & platforms',
      description: "Custom websites and web applications built with modern technologies and best practices.",
      features: ["Responsive Design", "SEO Optimized", "Fast Performance"],
      image: '/images/j4/services/01-web-development.webp',
      imageAlt: "Close three quarter photograph of developer hands typing at laptop with credible syntax highlighted web code"
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      category: 'Mobile experiences',
      description: "Native and cross-platform mobile applications for iOS and Android devices.",
      features: ["Cross-Platform", "Native Performance", "App Store Ready"],
      image: '/images/j4/services/02-mobile-app-development.webp',
      imageAlt: "Over shoulder mobile developer testing professional appointment booking app on physical smartphone next to laptop with mobile emulator"
    },
    {
      icon: Database,
      title: "Database Solutions",
      category: 'Data & infrastructure',
      description: "Robust database design, optimization, and management for your applications.",
      features: ["Scalable Architecture", "Data Security", "Performance Tuning"],
      image: '/images/j4/services/03-database-solutions.webp',
      imageAlt: "Database specialist workstation closeup showing credible relational entity relationship schema on large screen and SQL query editor on laptop"
    },
    {
      icon: Cloud,
      title: "Cloud Services",
      category: 'Cloud & delivery',
      description: "Cloud infrastructure setup, migration, and management on AWS, Azure, or Google Cloud.",
      features: ["Cloud Migration", "Auto Scaling", "Cost Optimization"],
      image: '/images/j4/services/04-cloud-services.webp',
      imageAlt: "Cloud infrastructure engineer inspecting tidy modern data center server rack with laptop"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      category: 'Design & experience',
      description: "Beautiful, intuitive interfaces that provide exceptional user experiences.",
      features: ["User Research", "Prototyping", "Usability Testing"],
      image: '/images/j4/services/05-ui-ux-design.webp',
      imageAlt: "Product designer hands arranging paper wireframes on desk"
    },
    {
      icon: Lock,
      title: "Security Solutions",
      category: 'Security & reliability',
      description: "Comprehensive security audits, implementation, and ongoing protection.",
      features: ["Security Audits", "Penetration Testing", "Compliance"],
      image: '/images/j4/services/06-security-solutions.webp',
      imageAlt: "Cybersecurity analyst at realistic security operations workstation with access audit events and network monitoring panels"
    },
    {
      icon: Cpu,
      title: "AI & Machine Learning",
      category: 'Intelligence & automation',
      description: "Intelligent solutions powered by artificial intelligence and machine learning.",
      features: ["Predictive Analytics", "Automation", "Data Insights"],
      image: '/images/j4/services/07-ai-machine-learning.webp',
      imageAlt: "Machine learning engineer reviewing model evaluation plots"
    },
    {
      icon: Globe,
      title: "Digital Transformation",
      category: 'Business & operations',
      description: "Complete digital transformation services to modernize your business operations.",
      features: ["Process Automation", "Legacy Modernization", "Integration"],
      image: '/images/j4/services/08-digital-transformation.webp',
      imageAlt: "Operations manager and software consultant at manufacturing office comparing paper forms with connected digital workflow on laptop"
    }
  ];

  return (
    <div className="services-page services-premium">
      <div className="services-header services-header--with-visual">
        <div className="services-header-copy">
          <span className="editorial-eyebrow">01 / What we do</span>
          <h1 className="services-title">Digital work, <em>done thoughtfully.</em></h1>
          <p className="services-subtitle">
            Comprehensive software solutions tailored to your business needs
          </p>
        </div>
        <HeaderArtwork className="services-header-art" src="/images/j4/services/developer-toolkit.webp" />
      </div>

      <div className="services-container">
        <div className="services-grid">
          {services.map((service, index) => {
            const ServiceIcon = service.icon;
            return (
              <article
                key={index} 
                id={`service-${index + 1}`}
                className="service-card"
              >
                <div className="service-media">
                  <SceneImage src={service.image} alt={service.imageAlt} width={1536} height={1024} loading={index === 0 ? 'eager' : 'lazy'} />
                  <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="service-body">
                  <div className="service-heading-row">
                    <div className="service-icon-container"><ServiceIcon className="service-icon" size={25} strokeWidth={1.5} aria-hidden="true" /></div>
                    <span className="service-category">{service.category}</span>
                  </div>
                  <h2 className="service-title">{service.title}</h2>
                  <p className="service-description">{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature) => <li key={feature} className="service-feature-item"><Check size={13} strokeWidth={1.8} aria-hidden="true" />{feature}</li>)}
                  </ul>
                  <Link className="service-btn" to="/contact" state={{ subject: `Inquiry about ${service.title}` }}>Discuss this service<span className="service-link-arrow" aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.5} /></span></Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <section className="services-process" aria-labelledby="services-process-title">
        <span className="editorial-eyebrow">From first conversation to launch</span>
        <h2 id="services-process-title">A clear path. <em>At every stage.</em></h2>
        <div className="services-process-grid">
          {deliverySteps.map((step, index) => <article key={step.title}><span className="process-step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}
        </div>
        <p className="services-delivery-note">Your proposal defines the exact deliverables: for example a scoped brief, designs, a working release, deployment and handover notes.</p>
      </section>

      <section className="services-faq" aria-labelledby="services-faq-title">
        <div><span className="editorial-eyebrow">Before we begin</span><h2 id="services-faq-title">A few useful <em>answers.</em></h2></div>
        <div className="services-faq-list">{serviceQuestions.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
      </section>

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
