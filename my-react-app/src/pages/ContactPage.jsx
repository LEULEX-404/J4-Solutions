import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import './ContactPage.css';
import { contactDetails } from '../contactDetails';
import contactVisualImg from '../assets/photos/colombo-skyline.jpg';

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: contactDetails.facebookUrl },
  { icon: Linkedin, label: 'LinkedIn', href: contactDetails.linkedinUrl },
  { icon: MessageCircle, label: 'WhatsApp', href: contactDetails.whatsappUrl },
];

const ContactPage = () => {
  const location = useLocation();
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name}\nReply to: ${formData.email}`);
    window.location.href = `mailto:${contactDetails.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <span className="editorial-eyebrow">04 / Start a conversation</span>
        <h1 className="contact-title">Let's make <em>something matter.</em></h1>
        <p className="contact-subtitle">
          Have a project in mind? Let's discuss how we can help bring your vision to life
        </p>
      </div>

      <div className="contact-container">
        <div className="contact-info-section">
          <h2 className="info-title">Contact Information</h2>
          <p className="info-description">
            Share an idea, ask a question, or tell us what needs to work better. We would love to hear from you.
          </p>
          <div className="contact-visual" aria-hidden="true">
            <img src={contactVisualImg} alt="Colombo skyline in Sri Lanka" />
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
              <h2 className="form-title">Send Us a Message</h2>
              <p className="form-intro">Share a little about your idea and send it through your email app.</p>
              
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
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
              <p className="form-note">Your email app will open with the message ready. You can also reach us directly by email or WhatsApp.</p>
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
