import { Link } from 'react-router-dom';
import { ArrowUpRight, Code2, Layers, Cloud } from 'lucide-react';
import SceneImage from './SceneImage';
import { featuredConcept } from '../featuredConcept';

const capabilities = [
  { icon: Code2, title: 'Web & Mobile', description: 'Clear, useful experiences across browsers and phones.', to: '/services#service-1' },
  { icon: Layers, title: 'Business Systems', description: 'Connected tools that make everyday operations simpler.', to: '/services#service-3' },
  { icon: Cloud, title: 'Cloud & AI', description: 'Reliable delivery and automation with a practical purpose.', to: '/services#service-4' },
];

export function HomeCapabilities() {
  return (
    <section className="home-capabilities" aria-labelledby="home-capabilities-title">
      <div className="home-section-heading">
        <span className="eyebrow">What we can build</span>
        <h2 id="home-capabilities-title">Digital tools. <em>Real purpose.</em></h2>
        <Link to="/services" className="text-action">Explore all services <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
      <div className="home-capability-grid">
        {capabilities.map((capability, index) => {
          const Icon = capability.icon;
          return (
            <Link key={capability.title} to={capability.to} className="home-capability" data-reveal>
              <span className="capability-top"><Icon size={26} strokeWidth={1.5} aria-hidden="true" /><span>0{index + 1}</span></span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <span className="capability-link">Explore this direction <ArrowUpRight size={17} aria-hidden="true" /></span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function HomeFeaturedConcept() {
  return (
    <section className="home-featured" aria-labelledby="home-featured-title" data-reveal>
      <div className="home-featured-media">
        <SceneImage src={featuredConcept.image} alt={featuredConcept.alt} width={1536} height={1024} sizes="(max-width: 900px) calc(100vw - 40px), 700px" />
      </div>
      <div className="home-featured-copy">
        <span className="eyebrow">Featured direction / Illustrative concept</span>
        <h2 id="home-featured-title">Commerce that feels <em>effortless.</em></h2>
        <p>{featuredConcept.description}</p>
        <ul>{featuredConcept.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        <Link to="/portfolio#featured-concept" className="button button-primary">Explore the concept <ArrowUpRight size={18} aria-hidden="true" /></Link>
        <span className="home-featured-note">A proposed product direction, not a delivered client project.</span>
      </div>
    </section>
  );
}
