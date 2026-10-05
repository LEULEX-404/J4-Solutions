import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './PortfolioPage.css';
import mobileImg from '../assets/photos/mobile-creative.jpg';
import developerImg from '../assets/photos/developer-work.jpg';
import analyticsImg from '../assets/photos/analytics.jpg';
import designImg from '../assets/photos/design-work.jpg';
import workshopImg from '../assets/photos/team-workshop.jpg';
import colomboImg from '../assets/photos/colombo-skyline.jpg';

const categories = [
  { id: 'all', label: 'All ideas' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'design', label: 'Design' },
  { id: 'systems', label: 'Business systems' },
];

const concepts = [
  { title: 'Commerce that feels effortless', category: 'web', description: 'A shopping experience shaped around easy discovery, clear checkout, and practical store management.', image: developerImg, alt: 'Developer working on a laptop', tags: ['Online stores', 'Payments', 'Inventory'] },
  { title: 'Useful services in your pocket', category: 'mobile', description: 'A mobile product that helps people complete everyday tasks quickly and confidently.', image: mobileImg, alt: 'Person using a mobile application', tags: ['Mobile apps', 'User journeys', 'Notifications'] },
  { title: 'A clearer view of your business', category: 'systems', description: 'One place to understand operations, spot changes, and make informed decisions.', image: analyticsImg, alt: 'Business analytics on a laptop', tags: ['Dashboards', 'Reporting', 'Integrations'] },
  { title: 'Digital experiences with character', category: 'design', description: 'A distinct visual language paired with simple, accessible paths through the product.', image: designImg, alt: 'People discussing creative work', tags: ['Brand systems', 'UI design', 'Prototypes'] },
  { title: 'Smarter day-to-day workflows', category: 'systems', description: 'Connected tools that reduce manual work and make important processes easier to manage.', image: workshopImg, alt: 'People planning work together', tags: ['Automation', 'Operations', 'Data'] },
  { title: 'A stronger online presence', category: 'web', description: 'A fast, responsive website that presents your business clearly to local and global audiences.', image: colomboImg, alt: 'Colombo skyline in Sri Lanka', tags: ['Websites', 'Content', 'Performance'] },
];

const PortfolioPage = () => {
  const [currentCategory, setCurrentCategory] = useState('all');
  const visibleConcepts = currentCategory === 'all'
    ? concepts
    : concepts.filter((concept) => concept.category === currentCategory);

  return (
    <div className="portfolio-page">
      <header className="portfolio-header">
        <span className="editorial-eyebrow">02 / Project directions</span>
        <h1 className="portfolio-title">What could we <em>build together?</em></h1>
        <p className="portfolio-subtitle">Explore a few ways strategy, design, and engineering can solve real business needs.</p>
        <p className="portfolio-note">These are illustrative ideas. Client case studies can be added when approved for publication.</p>
      </header>

      <div className="portfolio-filters" role="group" aria-label="Filter project ideas">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`filter-btn ${currentCategory === category.id ? 'active' : ''}`}
            onClick={() => setCurrentCategory(category.id)}
            aria-pressed={currentCategory === category.id}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="portfolio-grid">
        {visibleConcepts.map((concept, index) => (
          <article className="project-card" key={concept.title}>
            <div className="project-image"><img src={concept.image} alt={concept.alt} loading="lazy" /><span className="project-index">{String(index + 1).padStart(2, '0')}</span></div>
            <div className="project-content">
              <span className="project-category">{categories.find((category) => category.id === concept.category)?.label}</span>
              <h2 className="project-title">{concept.title}</h2>
              <p className="project-description">{concept.description}</p>
              <div className="project-tech">{concept.tags.map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}</div>
              <Link className="project-btn" to="/contact" state={{ subject: `Let's discuss ${concept.title.toLowerCase()}` }}>
                Discuss a similar idea <ArrowUpRight size={18} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
