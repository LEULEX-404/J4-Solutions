import React, { useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import './PortfolioPage.css';

const PortfolioPage = () => {
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentProject, setCurrentProject] = useState(0);

  const categories = ['all', 'web', 'mobile', 'design', 'enterprise'];

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web",
      description: "Modern online shopping platform with real-time inventory and payment integration",
      tech: ["React", "Node.js", "MongoDB"],
      color: "#2980b9"
    },
    {
      id: 2,
      title: "Fitness Tracking App",
      category: "mobile",
      description: "Cross-platform mobile app for tracking workouts and nutrition",
      tech: ["React Native", "Firebase", "Redux"],
      color: "#3498db"
    },
    {
      id: 3,
      title: "Brand Identity Design",
      category: "design",
      description: "Complete brand identity and UI/UX design for tech startup",
      tech: ["Figma", "Adobe Suite", "Prototyping"],
      color: "#2c3e50"
    },
    {
      id: 4,
      title: "Enterprise CRM System",
      category: "enterprise",
      description: "Custom CRM solution for managing customer relationships and sales",
      tech: ["Angular", "Java", "PostgreSQL"],
      color: "#1e5f8c"
    },
    {
      id: 5,
      title: "Real Estate Portal",
      category: "web",
      description: "Property listing platform with advanced search and virtual tours",
      tech: ["Vue.js", "Python", "AWS"],
      color: "#2874a6"
    },
    {
      id: 6,
      title: "Healthcare App",
      category: "mobile",
      description: "Telemedicine application connecting patients with doctors",
      tech: ["Flutter", "Node.js", "WebRTC"],
      color: "#1f618d"
    }
  ];

  const filteredProjects = currentCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === currentCategory);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <h1 className="portfolio-title">Our Portfolio</h1>
        <p className="portfolio-subtitle">
          Explore our latest projects and success stories
        </p>
      </div>

      <div className="portfolio-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${currentCategory === cat ? 'active' : ''}`}
            onClick={() => {
              setCurrentCategory(cat);
              setCurrentProject(0);
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="portfolio-carousel">
        <button className="carousel-btn prev" onClick={prevProject}>
          <ChevronLeft size={28} />
        </button>

        <div className="carousel-container">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card ${index === currentProject ? 'active' : ''} ${
                index < currentProject ? 'prev' : index > currentProject ? 'next' : ''
              }`}
              style={{ '--project-color': project.color }}
            >
              <div className="project-image-placeholder">
                <div className="project-overlay">
                  <ExternalLink className="external-icon" size={40} />
                </div>
              </div>
              <div className="project-content">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <button className="project-btn">View Project</button>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-btn next" onClick={nextProject}>
          <ChevronRight size={28} />
        </button>
      </div>

      <div className="carousel-indicators">
        {filteredProjects.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentProject ? 'active' : ''}`}
            onClick={() => setCurrentProject(index)}
          />
        ))}
      </div>

      <div className="portfolio-stats">
        <div className="stat-box">
          <div className="stat-num">50+</div>
          <div className="stat-text">Completed Projects</div>
        </div>
        <div className="stat-box">
          <div className="stat-num">30+</div>
          <div className="stat-text">Happy Clients</div>
        </div>
        <div className="stat-box">
          <div className="stat-num">15+</div>
          <div className="stat-text">Industries Served</div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;