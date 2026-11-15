import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './PortfolioPage.css';
import HeaderArtwork from '../components/HeaderArtwork';
import SceneImage from '../components/SceneImage';

const conceptDetails = {
  'Commerce that feels effortless': { scope: 'An example direction for a store that needs clear product discovery, checkout and day-to-day administration.', deliverables: ['Product catalogue and search journeys', 'Cart and payment integration plan', 'Order and inventory administration'] },
  'Useful services in your pocket': { scope: 'An example direction for a service business that wants customers to book and manage appointments from a phone.', deliverables: ['Booking and account journeys', 'Mobile interface prototype', 'Notification and service integration plan'] },
  'A clearer view of your business': { scope: 'An example direction for an operations team working across separate tools and spreadsheets.', deliverables: ['Dashboard and reporting requirements', 'Data integration and access model', 'Reviewable analytics interface'] },
  'Digital experiences with character': { scope: 'An example direction for a business that needs a coherent visual system and clearer digital user journeys.', deliverables: ['Interface and visual direction', 'Reusable UI components', 'Interactive prototype and handoff notes'] },
  'Smarter day-to-day workflows': { scope: 'An example direction for replacing repetitive manual handoffs with clearer connected processes.', deliverables: ['Current and proposed workflow map', 'Approval and automation scope', 'Integration and exception-handling plan'] },
  'A stronger online presence': { scope: 'An example direction for a business website that explains services clearly across desktop and mobile.', deliverables: ['Content structure and responsive layouts', 'Accessible page templates', 'Launch preparation and performance review'] },
};

const categories = [
  { id: 'all', label: 'All ideas' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'design', label: 'Design' },
  { id: 'systems', label: 'Business systems' },
];

const concepts = [
  { title: 'Commerce that feels effortless', category: 'web', description: 'A shopping experience shaped around easy discovery, clear checkout, and practical store management.', image: '/images/j4/work/01-ecommerce-store.webp', alt: 'Premium real workspace photograph with desktop monitor showing polished laptop retail ecommerce storefront', tags: ['Online stores', 'Payments', 'Inventory'] },
  { title: 'Useful services in your pocket', category: 'mobile', description: 'A mobile product that helps people complete everyday tasks quickly and confidently.', image: '/images/j4/work/02-mobile-service-app.webp', alt: 'Closeup real hand holding smartphone with beautifully clear service booking app interface showing appointment cards and bottom navigation', tags: ['Mobile apps', 'User journeys', 'Notifications'] },
  { title: 'A clearer view of your business', category: 'systems', description: 'One place to understand operations, spot changes, and make informed decisions.', image: '/images/j4/work/03-business-dashboard.webp', alt: 'Real widescreen monitor on tidy business desk displaying clear professional ERP analytics dashboard', tags: ['Dashboards', 'Reporting', 'Integrations'] },
  { title: 'Digital experiences with character', category: 'design', description: 'A distinct visual language paired with simple, accessible paths through the product.', image: '/images/j4/work/04-brand-interface-design.webp', alt: 'Real designer desk with large monitor showing cohesive brand design system of color swatches buttons typography and web/mobile UI artboards', tags: ['Brand systems', 'UI design', 'Prototypes'] },
  { title: 'Smarter day-to-day workflows', category: 'systems', description: 'Connected tools that reduce manual work and make important processes easier to manage.', image: '/images/j4/work/05-workflow-automation.webp', alt: 'Operations workstation photograph of monitor displaying practical kanban operations board beside connected approval workflow and status cards', tags: ['Automation', 'Operations', 'Data'] },
  { title: 'A stronger online presence', category: 'web', description: 'A fast, responsive website that presents your business clearly to local and global audiences.', image: '/images/j4/work/06-responsive-business-website.webp', alt: 'Photographic premium desk setup with desktop laptop tablet and phone displaying consistent beautiful professional architecture business website in responsive layouts', tags: ['Websites', 'Content', 'Performance'] },
];

const PortfolioPage = () => {
  const [currentCategory, setCurrentCategory] = useState('all');
  const visibleConcepts = currentCategory === 'all'
    ? concepts
    : concepts.filter((concept) => concept.category === currentCategory);

  return (
    <div className="portfolio-page">
      <header className="portfolio-header portfolio-header--with-visual">
        <div className="portfolio-header-copy">
          <span className="editorial-eyebrow">02 / Project directions</span>
          <h1 className="portfolio-title">What could we <em>build together?</em></h1>
          <p className="portfolio-subtitle">Explore a few ways strategy, design, and engineering can solve real business needs.</p>
          <p className="portfolio-note">These are illustrative ideas. Client case studies can be added when approved for publication.</p>
        </div>
        <HeaderArtwork className="portfolio-header-art" src="/images/j4/work/digital-product-showcase.webp" />
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
            <div className="project-image"><SceneImage src={concept.image} alt={concept.alt} width={1536} height={1024} /><span className="project-index">{String(index + 1).padStart(2, '0')}</span></div>
            <div className="project-content">
              <span className="project-category">{categories.find((category) => category.id === concept.category)?.label}</span>
              <h2 className="project-title">{concept.title}</h2>
              <p className="project-description">{concept.description}</p>
              <details className="project-details"><summary>Explore the proposed scope</summary><p>{conceptDetails[concept.title].scope}</p><h3>Possible deliverables</h3><ul>{conceptDetails[concept.title].deliverables.map((item) => <li key={item}>{item}</li>)}</ul><span className="project-concept-label">Illustrative concept / Scope agreed per project</span></details>
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
