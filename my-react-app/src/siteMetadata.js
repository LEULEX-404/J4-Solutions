export const sitePages = {
  '/': { title: 'J4 Solutions | Software, Web & Mobile Development', description: 'J4 Solutions brings strategy, design and engineering together to build useful websites, mobile apps and business software from Kaduwela, Sri Lanka.' },
  '/services': { title: 'Software Development Services | J4 Solutions', description: 'Explore web and mobile development, UI/UX, cloud, databases, security and AI services, with a clear process from discovery to launch and support.' },
  '/portfolio': { title: 'Digital Product Concepts & Project Directions | J4 Solutions', description: 'Explore illustrative directions for ecommerce, mobile apps, dashboards and business websites, including proposed scope and useful deliverables.' },
  '/about': { title: 'About Our Digital Studio | J4 Solutions', description: 'Learn how J4 Solutions in Kaduwela, Sri Lanka combines clear discovery, collaborative design and maintainable engineering around your business needs.' },
  '/contact': { title: 'Contact J4 Solutions | Start a Project', description: 'Discuss your website, mobile app or business software idea with J4 Solutions. Contact us by phone, email or WhatsApp in Kaduwela, Sri Lanka.' },
};
export const notFoundMetadata = { title: 'Page Not Found | J4 Solutions', description: 'This page could not be found. Explore J4 Solutions services, project directions or contact the studio to discuss your next digital product.' };
export const normalizePath = (value) => value.replace(/\/+$/, '').toLowerCase() || '/';

export function normalizeSiteUrl(value = '') {
  if (!value.trim()) return null;
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('VITE_SITE_URL must be the public website origin, for example https://your-domain.com');
  }
  return url.origin;
}
