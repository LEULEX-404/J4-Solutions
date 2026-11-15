import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { contactDetails } from '../contactDetails';

export default function ProjectInvitation({ className = '', title, description, subject }) {
  return (
    <section className={`project-invitation ${className}`}>
      <div><span className="eyebrow">Your next move</span><h2>{title}</h2><p>{description}</p></div>
      <div className="project-invitation-actions">
        <Link to="/contact" state={subject ? { subject } : undefined} className="button button-light">Start a project <ArrowUpRight size={18} aria-hidden="true" /></Link>
        <a href={contactDetails.whatsappUrl} target="_blank" rel="noopener noreferrer" className="button button-outline-light">Talk on WhatsApp <MessageCircle size={18} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
