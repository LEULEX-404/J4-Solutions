import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useInView, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Globe, Zap, Shield, TrendingUp, Users } from 'lucide-react';
import './HomePage.css';
import teamworkImg from '../assets/Holographic Teamwork Around a Glowing Table.png';
import heroPosterLogo from '../assets/logo.png';

const introVideoUrl = new URL('../assets/Intro video.mp4', import.meta.url).href;
import webBlueprintImg from '../assets/Floating web development blueprint.png';
import transformationImg from '../assets/Glowing digital transformation ecosystem.png';
import aiNetworkImg from '../assets/Transparent AI Neural Network Illustration.png';

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

// ---- Count-up stat ----
const StatNumber = ({ value, suffix = '', duration = 1.6 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v))
    });
    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="stat-number text-gradient">
      {display}{suffix}
    </div>
  );
};

const HomePage = () => {
  const [isHeroVideoReady, setIsHeroVideoReady] = useState(false);
  const [hasHeroVideoError, setHasHeroVideoError] = useState(false);

  const studioMoments = [
    {
      kicker: '01 / Intent',
      title: 'Start with the real business problem.',
      description: 'Before design or code, we map the goal, users, constraints, and the fastest path to a useful first release.',
      image: webBlueprintImg,
      imageAlt: 'Floating web development blueprint',
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
      image: teamworkImg,
      imageAlt: 'Holographic teamwork around a glowing planning table',
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
      image: transformationImg,
      imageAlt: 'Glowing digital transformation ecosystem',
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
      image: aiNetworkImg,
      imageAlt: 'Transparent artificial intelligence neural network',
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

  const stats = [
    { value: 50, suffix: '+', label: 'Projects Completed' },
    { value: 30, suffix: '+', label: 'Enterprise Clients' },
    { value: 99, suffix: '%', label: 'Satisfaction Rate' }
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
            <img src={heroPosterLogo} alt="" />
          </div>
          <video
            className="hero-video"
            src={introVideoUrl}
            poster={heroPosterLogo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
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
          <h2 className="section-title">A calmer way to build ambitious software.</h2>
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
                  <img src={moment.image} alt={moment.imageAlt} />
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
          Why Choose J4 Solutions?
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

      {/* Stats Section */}
      <motion.section
        className="stats-section glass-panel"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="stats-grid">
          {stats.map((stat) => (
            <div className="stat-item" key={stat.label}>
              <StatNumber value={stat.value} suffix={stat.suffix} />
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
