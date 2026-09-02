import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useInView, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Globe, Zap, Shield, TrendingUp, Users } from 'lucide-react';
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
            <div className="hero-frame-label"><span>J4</span> / Scene 01</div>
            <div className="hero-image-wrap">
              <img src={teamCollaborationImg} alt="J4 Solutions team collaborating on a digital product" className="hero-image" />
              <div className="hero-image-wash" aria-hidden="true" />
            </div>
            <div className="hero-visual-caption">
              <span>One team.</span>
              <strong>From first sketch<br />to final release.</strong>
            </div>
            <span className="hero-corner hero-corner-top" aria-hidden="true" />
            <span className="hero-corner hero-corner-bottom" aria-hidden="true" />
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
