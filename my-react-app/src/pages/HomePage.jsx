import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Globe, Zap, Shield, TrendingUp, Users, ListChecks, MessagesSquare, FolderCheck } from 'lucide-react';
import './HomePage.css';
import SceneImage from '../components/SceneImage';
import useReducedMotion from '../hooks/useReducedMotion';
import useScrollReveal from '../hooks/useScrollReveal';
import { HomeCapabilities, HomeFeaturedConcept } from '../components/HomeHighlights';
import ProjectInvitation from '../components/ProjectInvitation';

const heroPosterLogo = '/images/brand/logo-768.webp';
const introVideoUrl = new URL('../assets/Intro video.mp4', import.meta.url).href;

const studioMoments = [
  {
    kicker: '01 / Intent',
    title: 'Start with the real business problem.',
    description: 'Before design or code, we map the goal, users, constraints, and the fastest path to a useful first release.',
    image: '/images/j4/home/01-intent-discovery-workshop.webp',
    imageAlt: 'Candid South Asian software product discovery workshop',
    tone: 'cyan',
    points: [
      { icon: Users, text: 'Stakeholder alignment' },
      { icon: Shield, text: 'Risk mapped early' }
    ]
  },
  {
    kicker: '02 / Craft',
    title: 'Design and engineering move together.',
    description: 'Interfaces, data and integrations move together, keeping the product clear to use and practical to build.',
    image: '/images/j4/home/02-craft-design-engineering.webp',
    imageAlt: 'Two South Asian product designer and developer collaborating at dual monitors',
    tone: 'violet',
    points: [
      { icon: Zap, text: 'Rapid working prototypes' },
      { icon: TrendingUp, text: 'Measured iteration' }
    ]
  },
  {
    kicker: '03 / Scale',
    title: 'Launch clean, then grow with control.',
    description: 'Maintainable architecture, useful automation and a practical release plan leave room to grow after launch.',
    image: '/images/j4/home/03-scale-cloud-delivery.webp',
    imageAlt: 'DevOps engineer at professional workstation monitoring cloud deployment pipelines and system performance graphs',
    tone: 'green',
    points: [
      { icon: Globe, text: 'Cloud-ready delivery' },
      { icon: Shield, text: 'Security by default' }
    ]
  },
  {
    kicker: '04 / Intelligence',
    title: 'Use AI where it earns its place.',
    description: 'We add automation and intelligence only when it improves the workflow, protects time, or reveals decisions faster.',
    image: '/images/j4/home/04-intelligence-ai-automation.webp',
    imageAlt: 'Business analyst and software engineer inspecting an automated document processing workflow on desktop screen',
    tone: 'amber',
    points: [
      { icon: Zap, text: 'Useful automation' },
      { icon: TrendingUp, text: 'Decision support' }
    ]
  }
];

const features = [
  { icon: ListChecks, title: 'Clear scope', desc: 'Agree the goal, deliverables and review milestones before the build grows.' },
  { icon: MessagesSquare, title: 'Visible progress', desc: 'Review working releases and make decisions with the product in front of you.' },
  { icon: FolderCheck, title: 'Thoughtful handover', desc: 'Plan deployment, documentation and any ongoing support as part of the project.' }
];


const HomePage = () => {
  const shouldReduceMotion = useReducedMotion();
  const [saveData] = useState(() => Boolean(navigator.connection?.saveData));
  const [isHeroVideoReady, setIsHeroVideoReady] = useState(false);
  const [hasHeroVideoError, setHasHeroVideoError] = useState(false);
  const videoRef = useRef(null);
  const pageRef = useScrollReveal(shouldReduceMotion);
  const showVideo = !shouldReduceMotion && !saveData;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    let inView = true;
    const updatePlayback = () => {
      if (document.hidden || !inView) video.pause();
      else video.play()?.catch(() => {});
    };
    const observer = window.IntersectionObserver ? new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; updatePlayback(); }, { threshold: 0.02 }) : null;
    observer?.observe(video);
    document.addEventListener('visibilitychange', updatePlayback);
    return () => { observer?.disconnect(); document.removeEventListener('visibilitychange', updatePlayback); video.pause(); };
  }, [showVideo]);

  const exploreStudio = (event) => {
    const section = document.getElementById('studio-method');
    if (!section) return;
    event.preventDefault();
    section.focus({ preventScroll: true });
    section.scrollIntoView({ behavior: shouldReduceMotion ? 'instant' : 'smooth', block: 'start' });
  };

  return (
    <div className="home-page" ref={pageRef}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow hero-glow-blue" aria-hidden="true" />
        <div className="hero-glow hero-glow-violet" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />

        <div
          className={`hero-video-stage ${isHeroVideoReady ? 'is-ready' : ''} ${hasHeroVideoError ? 'has-error' : ''} ${!showVideo ? 'is-static' : ''}`}
          aria-hidden="true"
        >
          <div className="hero-video-poster">
            <div className="hero-poster-orbit" />
            <img src={heroPosterLogo} srcSet="/images/brand/logo-384.webp 384w, /images/brand/logo-768.webp 768w" sizes="(max-width: 650px) 80vw, 600px" alt="" width={768} height={512} />
          </div>
          {showVideo && <video
            ref={videoRef}
            className="hero-video"
            src={introVideoUrl}
            poster={heroPosterLogo}
            autoPlay={!shouldReduceMotion}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setIsHeroVideoReady(true)}
            onError={() => setHasHeroVideoError(true)}
          />}
          <div className="hero-video-loader">
            <span>Preparing the experience</span>
            <i><b /></i>
          </div>
        </div>

        <div className="hero-shell">
          <div
            className="hero-copy"
          >
            <div className="hero-kicker">
              <span>Independent digital studio</span>
              <span className="hero-kicker-line" />
              <span>Colombo · Worldwide</span>
            </div>

            <h1 className="hero-title">
              We build digital<br />
              products with <span>impact.</span>
            </h1>

            <div className="hero-copy-footer">
              <p className="hero-subtitle">
                Websites, mobile apps and business systems shaped around your goals, with strategy, design and engineering working together.
              </p>
              <div className="hero-actions">
                <Link to="/contact" className="hero-primary-action button button-primary">
                  Start a project <ArrowUpRight size={19} />
                </Link>
                <Link to="/portfolio" className="hero-text-action button button-outline-light">
                  Explore our work <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>

          <div
            className="hero-visual"
          >
            <div className="hero-visual-empty" aria-hidden="true" />
          </div>
        </div>

        <div className="hero-reel">
          <a href="#studio-method" className="hero-scroll-cue" onClick={exploreStudio}>Scroll to explore <ArrowDown size={17} aria-hidden="true" /></a>
          <div className="hero-reel-services">
            <Link to="/services">Product strategy</Link><Link to="/services">Experience design</Link><Link to="/services">Software engineering</Link>
          </div>
        </div>
      </section>

      <HomeCapabilities />
      <HomeFeaturedConcept />

      {/* About / Culture Section */}
      <section className="culture-section" id="studio-method" tabIndex={-1}>
        <div
          className="culture-intro"
          data-reveal
        >
          <span className="eyebrow"><span className="eyebrow-dot" />Studio Method</span>
          <h2 className="section-title">A calmer way to build <em>ambitious software.</em></h2>
          <p className="culture-desc">
            J4 works like a small senior product crew: focused discovery, sharp design decisions, careful engineering, and practical release planning.
          </p>
        </div>

        <div className="culture-timeline">
          {studioMoments.map((moment, index) => {
            const isReverse = index % 2 === 1;

            return (
              <article
                className={`culture-moment ${isReverse ? 'reverse' : ''}`}
                data-tone={moment.tone}
                key={moment.kicker}
                data-reveal
              >
                <div className="culture-copy">
                  <span className="culture-kicker">{moment.kicker}</span>
                  <h3>{moment.title}</h3>
                  <p>{moment.description}</p>
                  <ul className="culture-points">
                    {moment.points.map((point) => {
                      const PointIcon = point.icon;
                      return (
                        <li key={point.text}>
                          <PointIcon size={18} />
                          <span>{point.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div
                  className="culture-art"
                >
                  <SceneImage src={moment.image} alt={moment.imageAlt} width={1536} height={1024} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2
          className="section-header"
          data-reveal
        >
          The details make the <em>difference.</em>
        </h2>

        <div
          className="features-grid"
        >
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <div
                key={index}
                className="feature-card glass-panel"
                data-reveal
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

      <ProjectInvitation className="home-close" title={<>Good ideas deserve a <em>clear path forward.</em></>} description="Tell us what you are building. We will help you shape the right first step." />
    </div>
  );
};

export default HomePage;
