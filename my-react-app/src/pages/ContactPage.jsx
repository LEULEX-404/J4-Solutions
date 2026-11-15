import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import './ContactPage.css';
import { contactDetails } from '../contactDetails';
import HeaderArtwork from '../components/HeaderArtwork';
import SceneImage from '../components/SceneImage';
import { contactDraftText, contactDraftUrl } from '../contactDraft';

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: contactDetails.facebookUrl },
  { icon: Linkedin, label: 'LinkedIn', href: contactDetails.linkedinUrl },
  { icon: MessageCircle, label: 'WhatsApp', href: contactDetails.whatsappUrl },
];

const ContactPage = () => {
  const location = useLocation();
  const [draftStatus, setDraftStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: location.state?.subject ?? '',
    message: ''
  });
  
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: contactDetails.email,
      link: `mailto:${contactDetails.email}`
    },
    {
      icon: Phone,
      title: "Phone",
      content: contactDetails.phoneDisplay,
      link: contactDetails.phoneHref
    },
    {
      icon: MapPin,
      title: "Location",
      content: contactDetails.location,
      link: contactDetails.mapsUrl
    }
  ];

  const handleChange = (e) => {
    setDraftStatus('idle');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => !value.trim())) {
      setDraftStatus('invalid');
      return;
    }
    setDraftStatus('prepared');
    try { window.location.href = contactDraftUrl(formData); }
    catch { setDraftStatus('open-error'); }
  };

  const copyDraft = async () => {
    if (!formData.message.trim()) { setDraftStatus('invalid'); return; }
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(contactDraftText(formData));
      setDraftStatus('copied');
    } catch { setDraftStatus('copy-error'); }
  };

  const feedback = {
    prepared: 'Your draft is ready. If your email app did not open, copy the message or continue on WhatsApp. Send the email from your email app to complete your inquiry.',
    copied: 'Message copied. Paste it into your email app or WhatsApp when you are ready to send.',
    'copy-error': 'Automatic copying is unavailable. Select and copy your message below, then paste it into your email app.',
    'open-error': 'Your email app could not be opened. You can copy your message or contact us on WhatsApp instead.',
    invalid: 'Please enter your name, email, subject and a message before preparing the draft.',
  };

  return (
    <div className="contact-page">
      <div className="contact-header contact-header--with-visual">
        <div className="contact-header-copy">
          <span className="editorial-eyebrow">04 / Start a conversation</span>
          <h1 className="contact-title">Let's make <em>something matter.</em></h1>
          <p className="contact-subtitle">
            Have a project in mind? Let's discuss how we can help bring your vision to life
          </p>
        </div>
        <HeaderArtwork className="contact-header-art" src="/images/j4/contact/communication-workspace.webp" />
      </div>

      <div className="contact-container">
        <div className="contact-info-section">
          <h2 className="info-title">Contact Information</h2>
          <p className="info-description">
            Share an idea, ask a question, or tell us what needs to work better. We would love to hear from you.
          </p>
          <div className="contact-visual">
            <SceneImage src="/images/j4/contact/01-welcoming-workspace.webp" alt="Welcoming software consultancy meeting space in modern Sri Lankan office" width={1536} height={1024} loading="eager" />
          </div>
          
          <div className="contact-info-cards">
            {contactInfo.map((info, index) => {
              const InfoIcon = info.icon;
              return (
                <div 
                  key={index} 
                  className="info-card"
                  style={{ '--info-index': index }}
                >
                  <div className="info-icon-wrapper">
                    <InfoIcon className="info-icon" size={24} />
                  </div>
                  <div className="info-content">
                    <h3 className="info-card-title">{info.title}</h3>
                    {info.link ? (
                      <a href={info.link} className="info-link" target={info.title === 'Location' ? '_blank' : undefined} rel={info.title === 'Location' ? 'noopener noreferrer' : undefined}>
                        {info.content}
                      </a>
                    ) : (
                      <p className="info-text">{info.content}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="contact-socials">
            <h3>Connect with us</h3>
            <div className="contact-social-links">
              {socialLinks.map(({ icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                  {React.createElement(icon, { size: 18, 'aria-hidden': true })}
                  {label}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="contact-form-section">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2 className="form-title">Tell us about your idea</h2>
              <p className="form-intro">Share a little about your idea and send it through your email app.</p>
              
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  maxLength={120}
                  className="form-input"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  maxLength={254}
                  className="form-input"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  maxLength={180}
                  className="form-input"
                  placeholder="Project Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  maxLength={5000}
                  className="form-textarea"
                  placeholder="Tell us about your project..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                <span>Open email to send</span>
                <Send className="submit-icon" size={18} />
              </button>
              <div className="contact-draft-actions">
                <button type="button" onClick={copyDraft}>Copy message</button>
                <a href={contactDetails.whatsappUrl} target="_blank" rel="noopener noreferrer">Continue on WhatsApp</a>
              </div>
              {feedback[draftStatus] && <p className="contact-draft-feedback" role={draftStatus === 'invalid' || draftStatus === 'open-error' ? 'alert' : 'status'}>{feedback[draftStatus]}</p>}
              {draftStatus === 'copy-error' && <div className="contact-draft-preview"><label htmlFor="contact-draft-preview">Your message, ready to copy</label><textarea id="contact-draft-preview" readOnly value={contactDraftText(formData)} onFocus={(event) => event.target.select()} rows={8} /></div>}
              <p className="form-note">Preparing a draft does not send it automatically. You choose when to send it in your email app, or contact us directly on WhatsApp.</p>
            </form>
        </div>
      </div>

      <div className="map-section">
        <div className="map-heading">
          <h2>Find us in {contactDetails.location}</h2>
          <a href={contactDetails.mapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
        </div>
        <iframe
          className="location-map"
          title={`Map of ${contactDetails.location}`}
          src={contactDetails.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default ContactPage;
