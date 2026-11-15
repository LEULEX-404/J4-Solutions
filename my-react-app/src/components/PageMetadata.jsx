import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sitePages, notFoundMetadata, normalizePath, normalizeSiteUrl } from '../siteMetadata';

function setMeta(key, content, property = false) {
  const attribute = property ? 'property' : 'name';
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attribute, key); document.head.append(tag); }
  tag.content = content;
}

export default function PageMetadata() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    const path = normalizePath(pathname);
    const known = Boolean(sitePages[path]);
    const page = sitePages[path] || notFoundMetadata;
    const configured = normalizeSiteUrl(import.meta.env?.VITE_SITE_URL);
    const origin = configured || window.location.origin;
    const url = `${origin}${path === '/' ? '/' : path}`;
    document.title = page.title;
    setMeta('description', page.description);
    setMeta('robots', known ? 'index,follow' : 'noindex,follow');
    setMeta('og:title', page.title, true);
    setMeta('og:description', page.description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', 'J4 Solutions', true);
    setMeta('og:url', url, true);
    setMeta('og:image', `${origin}/images/brand/social-preview.jpg`, true);
    setMeta('og:image:alt', 'J4 Solutions — Thoughtful strategy, design and engineering', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', page.title);
    setMeta('twitter:description', page.description);
    setMeta('twitter:image', `${origin}/images/brand/social-preview.jpg`);
    document.head.querySelector('link[rel="canonical"]')?.remove();
    if (known) { const canonical = document.createElement('link'); canonical.rel = 'canonical'; canonical.href = url; document.head.append(canonical); }
  }, [pathname]);
  return null;
}
