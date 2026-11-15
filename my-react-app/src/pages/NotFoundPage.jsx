import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <section className="not-found-page">
      <span className="editorial-eyebrow">404 / A different direction</span>
      <h1>This page has <em>moved out of view.</em></h1>
      <p>The link may be out of date, or the address may have a typo. Here are a few good places to continue.</p>
      <div className="not-found-actions">
        <Link to="/"><ArrowLeft size={18} /> Back to Home</Link>
        <Link to="/services">Explore Services <ArrowUpRight size={18} /></Link>
        <Link to="/contact">Contact the studio <ArrowUpRight size={18} /></Link>
      </div>
    </section>
  );
}
