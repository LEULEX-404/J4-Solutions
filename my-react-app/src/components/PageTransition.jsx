import { useEffect, useLayoutEffect, useState } from 'react';
import { Code2, FolderOpen, MessageCircle, Users } from 'lucide-react';
import './PageTransition.css';

const pageDetails = {
  '/services': { name: 'Services', index: '01', label: 'What we do', description: 'Thoughtful solutions. Built around you.', icon: Code2 },
  '/portfolio': { name: 'Work', index: '02', label: 'Project directions', description: 'Ideas shaped into digital experiences.', icon: FolderOpen },
  '/about': { name: 'About', index: '03', label: 'Our studio', description: 'The people, purpose and care behind the work.', icon: Users },
  '/contact': { name: 'Contact', index: '04', label: 'Start a conversation', description: 'A good next step starts with a conversation.', icon: MessageCircle },
};

function DestinationTransition({ page, children }) {
  const [phase, setPhase] = useState('loading');
  const isLoading = phase !== 'ready';
  const PageIcon = page.icon;

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setPhase('exiting'), 900);
    const readyTimer = window.setTimeout(() => setPhase('ready'), 1100);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(readyTimer);
    };
  }, []);

  useLayoutEffect(() => {
    if (!isLoading) return undefined;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.classList.add('is-route-loading');
    document.body.classList.add('is-route-loading');
    return () => {
      document.documentElement.classList.remove('is-route-loading');
      document.body.classList.remove('is-route-loading');
    };
  }, [isLoading]);

  // Mount the destination only after the loader has fully exited. Its images
  // and entrance animations cannot start behind the loading screen.
  if (!isLoading) return children;

  return (
    <div className={`route-loader${phase === 'exiting' ? ' is-exiting' : ''}`} role="status" aria-live="polite" aria-label={`Opening ${page.name}`}>
      <div className="route-loader-brand" aria-hidden="true">
        <span>J4 Solutions</span>
        <span>Independent digital studio</span>
      </div>
      <div className="route-loader-content">
        <div className="route-loader-eyebrow"><span>{page.index}</span><i />{page.label}</div>
        <div className="route-loader-title-row">
          <h1 className="route-loader-title">{page.name}</h1>
          <span className="route-loader-icon" aria-hidden="true"><PageIcon size={30} strokeWidth={1.3} /></span>
        </div>
        <p className="route-loader-description">{page.description}</p>
        <div className="route-loader-track" aria-hidden="true"><span /></div>
        <span className="route-loader-caption">Opening {page.name}<span aria-hidden="true">…</span></span>
      </div>
      <div className="route-loader-footer" aria-hidden="true"><span>Strategy. Design. Engineering.</span><span>Sri Lanka / Worldwide</span></div>
    </div>
  );
}

export default function PageTransition({ pathname, children }) {
  const normalizedPath = pathname.replace(/\/+$/, '').toLowerCase() || '/';
  const page = pageDetails[normalizedPath];

  // Home retains its original startup experience. Search/state-only changes
  // stay on the current page; each different destination gets a fresh timer.
  return page ? <DestinationTransition key={normalizedPath} page={page}>{children}</DestinationTransition> : children;
}
