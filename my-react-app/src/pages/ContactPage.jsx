import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "hello@j4solutions.com",
      link: "mailto:hello@j4solutions.com"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Location",
      content: "San Francisco, CA",
      link: null
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
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1 className="contact-title">Get In Touch</h1>
        <p className="contact-subtitle">
          Have a project in mind? Let's discuss how we can help bring your vision to life
        </p>
      </div>

      <div className="contact-container">
        <div className="contact-info-section">
          <h2 className="info-title">Contact Information</h2>
          <p className="info-description">
            Reach out to us through any of these channels. We're here to help!
          </p>
          
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
                      <a href={info.link} className="info-link">
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

          <div className="working-hours">
            <h3 className="hours-title">Working Hours</h3>
            <div className="hours-content">
              <div className="hours-item">
                <span className="hours-day">Monday - Friday</span>
                <span className="hours-time">9:00 AM - 6:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="hours-day">Weekend</span>
                <span className="hours-time">Closed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          {!isSubmitted ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2 className="form-title">Send Us a Message</h2>
              
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
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
                <label className="form-label">Email Address</label>
                <input
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
                <label className="form-label">Subject</label>
                <input
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
                <label className="form-label">Message</label>
                <textarea
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
                <span>Send Message</span>
                <Send className="submit-icon" size={18} />
              </button>
            </form>
          ) : (
            <div className="success-message">
              <CheckCircle className="success-icon" size={60} />
              <h3 className="success-title">Message Sent Successfully!</h3>
              <p className="success-text">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="map-section">
        <div className="map-placeholder">
          <MapPin className="map-icon" size={60} />
          <p className="map-text">San Francisco, California</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;