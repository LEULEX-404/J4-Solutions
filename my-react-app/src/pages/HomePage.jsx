import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Globe, Zap, Shield, TrendingUp, Users } from 'lucide-react';
import './HomePage.css';
import SceneImage from '../components/SceneImage';

const heroPosterLogo = '/images/brand/logo-768.webp';

const introVideoUrl = new URL('../assets/Intro video.mp4', import.meta.url).href;

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const HomePage = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isHeroVideoReady, setIsHeroVideoReady] = useState(false);
  const [hasHeroVideoError, setHasHeroVideoError] = useState(false);

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
      description: 'Interfaces, data models, and integrations are shaped in one loop, so the product feels polished without slowing delivery.',
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
      description: 'We keep the system practical after launch with maintainable architecture, thoughtful automation, and room for expansion.',
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
    { icon: Zap, title: "Lightning Fast", desc: "Optimized architecture and performance for absolute speed." },
    { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security standards to protect your assets." },
    { icon: TrendingUp, title: "Scalable Growth", desc: "Cloud-native solutions designed to grow infinitely with you." }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow hero-glow-blue" aria-hidden="true" />
        <div className="hero-glow hero-glow-violet" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />

        <div
          className={`hero-video-stage ${isHeroVideoReady ? 'is-ready' : ''} ${hasHeroVideoError ? 'has-error' : ''}`}
          aria-hidden="true"
        >
          <div className="hero-video-poster">
            <div className="hero-poster-orbit" />
            <img src={heroPosterLogo} srcSet="/images/brand/logo-384.webp 384w, /images/brand/logo-768.webp 768w" sizes="(max-width: 650px) 80vw, 600px" alt="" width={768} height={512} />
          </div>
          <video
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
          />
          <div className="hero-video-loader">
            <span>Preparing the experience</span>
            <i><b /></i>
          </div>
        </div>

        <div className="hero-shell">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
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
                Strategy, design and engineering brought together to turn ambitious ideas into software people choose to use.
              </p>
              <div className="hero-actions">
                <Link to="/contact" className="hero-primary-action">
                  Start a project <ArrowUpRight size={19} />
                </Link>
                <Link to="/portfolio" className="hero-text-action">
                  Explore our work <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 36, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.05, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-visual-empty" aria-hidden="true" />
          </motion.div>
        </div>

        <motion.div
          className="hero-reel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
        >
          <span className="hero-reel-index">01 / 04</span>
          <div className="hero-reel-track"><span /></div>
          <div className="hero-reel-services">
            <span>Product strategy</span><span>Experience design</span><span>Software engineering</span>
          </div>
        </motion.div>
      </section>

      {/* About / Culture Section */}
      <section className="culture-section">
        <motion.div
          className="culture-intro"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={fadeIn}
        >
          <span className="eyebrow"><span className="eyebrow-dot" />Studio Method</span>
          <h2 className="section-title">A calmer way to build <em>ambitious software.</em></h2>
          <p className="culture-desc">
            J4 works like a small senior product crew: focused discovery, sharp design decisions, careful engineering, and practical release planning.
          </p>
        </motion.div>

        <div className="culture-timeline">
          {studioMoments.map((moment, index) => {
            const isReverse = index % 2 === 1;

            return (
              <motion.article
                className={`culture-moment ${isReverse ? 'reverse' : ''}`}
                data-tone={moment.tone}
                key={moment.kicker}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.22 }}
                variants={fadeIn}
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

                <motion.div
                  className="culture-art"
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ duration: 0.35 }}
                >
                  <SceneImage src={moment.image} alt={moment.imageAlt} width={1536} height={1024} />
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <motion.h2
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The details make the <em>difference.</em>
        </motion.h2>

        <motion.div
          className="features-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <motion.div
                key={index}
                className="feature-card glass-panel"
                variants={fadeIn}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(41, 128, 185, 0.2)" }}
              >
                <div className="feature-icon-wrapper">
                  <FeatureIcon className="feature-icon" size={32} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section className="home-close">
        <div>
          <span className="eyebrow">Your next move</span>
          <h2>Good ideas deserve a <em>clear path forward.</em></h2>
          <p>Tell us what you are building. We will help you shape the right first step.</p>
        </div>
        <Link to="/contact" className="home-close-link">Start a conversation <ArrowUpRight size={20} /></Link>
      </section>
    </div>
  );
};

export default HomePage;
