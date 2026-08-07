import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useInView, animate } from 'framer-motion';
import { ArrowRight, Code, Smartphone, Globe, Zap, Shield, TrendingUp, Users } from 'lucide-react';
import './HomePage.css';
import teamCollaborationImg from '../assets/attractive_team.png';
import professionalMeetingImg from '../assets/stunning_meeting.png';
import globalReachImg from '../assets/team_collaboration.png';
import visionaryStrategyImg from '../assets/professional_meeting.png';

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

// ---- Network canvas data (hero background) ----
const NETWORK_NODES = [
  [90, 120], [260, 70], [430, 150], [130, 290],
  [610, 90], [790, 170], [960, 110], [1080, 270],
  [180, 440], [360, 520], [540, 580], [700, 460],
  [880, 520], [1040, 430], [300, 610], [660, 650]
];

const NETWORK_LINES = [
  [0, 1], [1, 2], [2, 4], [4, 5], [5, 6], [6, 7], [3, 1], [3, 8],
  [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [9, 14], [10, 15]
];

const NETWORK_SPARKS = [
  { from: [430, 150], to: [540, 580], dur: '6s', begin: '0s', className: 'spark-a' },
  { from: [610, 90], to: [700, 460], dur: '7s', begin: '1.5s', className: 'spark-b' },
  { from: [1040, 430], to: [960, 110], dur: '5.5s', begin: '3s', className: 'spark-c' }
];

const NetworkCanvas = () => (
  <svg
    className="network-canvas"
    viewBox="0 0 1200 700"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    {NETWORK_LINES.map(([a, b], i) => {
      const [x1, y1] = NETWORK_NODES[a];
      const [x2, y2] = NETWORK_NODES[b];
      return (
        <line
          key={`line-${i}`}
          x1={x1} y1={y1} x2={x2} y2={y2}
          className="net-line"
          style={{ animationDelay: `${(i % 6) * 0.4}s` }}
        />
      );
    })}
    {NETWORK_NODES.map(([x, y], i) => (
      <circle
        key={`node-${i}`}
        cx={x}
        cy={y}
        r={i % 3 === 0 ? 3.5 : 2.5}
        className={`net-node ${i % 2 === 0 ? 'net-node-blue' : 'net-node-violet'}`}
        style={{ animationDelay: `${(i % 5) * 0.5}s` }}
      />
    ))}
    {NETWORK_SPARKS.map((s, i) => (
      <circle key={`spark-${i}`} r="3.5" className={`net-spark ${s.className}`}>
        <animate attributeName="cx" values={`${s.from[0]};${s.to[0]}`} dur={s.dur} begin={s.begin} repeatCount="indefinite" />
        <animate attributeName="cy" values={`${s.from[1]};${s.to[1]}`} dur={s.dur} begin={s.begin} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" dur={s.dur} begin={s.begin} repeatCount="indefinite" />
      </circle>
    ))}
  </svg>
);

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
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Transform Your Vision Into Reality",
      subtitle: "Enterprise-grade software solutions designed just for you",
      icon: Code
    },
    {
      title: "Mobile-First Development",
      subtitle: "Responsive, scalable apps that work seamlessly everywhere",
      icon: Smartphone
    },
    {
      title: "Global Digital Solutions",
      subtitle: "Connecting modern businesses to the rest of the world",
      icon: Globe
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const CurrentIcon = heroSlides[currentSlide].icon;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <NetworkCanvas />
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.div
            className="hero-icon-wrapper glass-panel"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <CurrentIcon className="hero-icon" size={52} />
          </motion.div>

          <div className="hero-text">
            <motion.h1
              key={currentSlide}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-title"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
            <motion.p
              key={`sub-${currentSlide}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hero-subtitle"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-button"
          >
            Start a Project
            <ArrowRight className="cta-icon" size={20} />
          </motion.button>

          <div className="slider-dots">
            {heroSlides.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* About / Culture Section */}
      <section className="culture-section">
        <motion.div
          className="culture-container glass-panel"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="culture-text">
            <span className="eyebrow"><span className="eyebrow-dot" />Collaboration</span>
            <h2 className="section-title text-gradient">Driving Innovation Through Collaboration</h2>
            <p className="culture-desc">
              At J4-Solutions, we believe that the best products are built by diverse, collaborative teams.
              Our engineers and designers work hand-in-hand to craft digital experiences that not only meet
              technical requirements but exceed user expectations.
            </p>
            <ul className="culture-bullets">
              <li><Users size={18} /> Cross-functional expertise</li>
              <li><TrendingUp size={18} /> Agile and iterative delivery</li>
              <li><Shield size={18} /> Commitment to quality and trust</li>
            </ul>
          </div>
          <motion.div
            className="culture-image-wrapper"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img src={teamCollaborationImg} alt="Team Collaboration" className="culture-image" />
          </motion.div>
        </motion.div>

        <motion.div
          className="culture-container glass-panel reverse"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <motion.div
            className="culture-image-wrapper"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img src={professionalMeetingImg} alt="Professional Meeting" className="culture-image" />
          </motion.div>
          <div className="culture-text">
            <span className="eyebrow"><span className="eyebrow-dot" />Partnership</span>
            <h2 className="section-title text-gradient">Your Trusted Digital Partner</h2>
            <p className="culture-desc">
              We forge lasting relationships with our clients. From the initial handshake to deployment and
              beyond, we operate with utter transparency and a relentless focus on delivering high-value solutions.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="secondary-btn"
            >
              Partner With Us
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="culture-container glass-panel"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="culture-text">
            <span className="eyebrow"><span className="eyebrow-dot" />Strategy</span>
            <h2 className="section-title text-gradient">Global Scale Visionary Strategy</h2>
            <p className="culture-desc">
              We design roadmaps that launch startups into enterprise-grade competitors. Leverage our unparalleled domain knowledge to execute a hyper-growth strategy with precision.
            </p>
            <ul className="culture-bullets">
              <li><Globe size={18} /> International Launch Strategy</li>
              <li><Zap size={18} /> High-Octane Rapid Market Deployments</li>
            </ul>
          </div>
          <motion.div
            className="culture-image-wrapper"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img src={globalReachImg} alt="Strategic IT Collaboration" className="culture-image" />
          </motion.div>
        </motion.div>

        <motion.div
          className="culture-container glass-panel reverse"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <motion.div
            className="culture-image-wrapper"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img src={visionaryStrategyImg} alt="Corporate Executive Meeting" className="culture-image" />
          </motion.div>
          <div className="culture-text">
            <span className="eyebrow"><span className="eyebrow-dot" />Execution</span>
            <h2 className="section-title text-gradient">State-of-the-Art Execution</h2>
            <p className="culture-desc">
              When the stakes are high, you need absolute perfection. Our boardroom features industry veterans who dictate architectural excellence down to the very last byte of code.
            </p>
          </div>
        </motion.div>
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