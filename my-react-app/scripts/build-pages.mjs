import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { loadEnv } from 'vite';
import { sitePages, notFoundMetadata, normalizeSiteUrl } from '../src/siteMetadata.js';

const origin = normalizeSiteUrl(loadEnv('production', process.cwd(), '').VITE_SITE_URL);
const template = await readFile('dist/index.html', 'utf8');
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function pageHtml(page, route, is404 = false) {
  const image = `${origin || ''}/images/brand/social-preview.jpg`;
  const url = origin ? `${origin}${route}` : '';
  const tags = [
    `<meta name="description" content="${escape(page.description)}" />`,
    `<meta name="robots" content="${is404 ? 'noindex,follow' : 'index,follow'}" />`,
    `<meta property="og:title" content="${escape(page.title)}" />`,
    `<meta property="og:description" content="${escape(page.description)}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="J4 Solutions" />',
    `<meta property="og:image" content="${escape(image)}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta property="og:image:alt" content="J4 Solutions - Thoughtful strategy, design and engineering" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escape(page.title)}" />`,
    `<meta name="twitter:description" content="${escape(page.description)}" />`,
    `<meta name="twitter:image" content="${escape(image)}" />`,
  ];
  if (url && !is404) tags.push(`<link rel="canonical" href="${escape(url)}" />`, `<meta property="og:url" content="${escape(url)}" />`);
  return template.replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`).replace(/\s*<link rel="canonical"[^>]*>/g, '').replace(/\s*<meta (?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g, '').replace('</head>', `  ${tags.join('\n    ')}\n  </head>`);
}

for (const [route, page] of Object.entries(sitePages)) {
  const directory = `dist${route === '/' ? '' : route}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, pageHtml(page, route));
}
await writeFile('dist/404.html', pageHtml(notFoundMetadata, '/404', true));
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n${origin ? `\nSitemap: ${origin}/sitemap.xml\n` : ''}`);
if (origin) {
  const locations = Object.keys(sitePages).map((route) => `<url><loc>${escape(origin + route)}</loc></url>`).join('');
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locations}</urlset>`);
} else {
  await rm('dist/sitemap.xml', { force: true });
  console.log('Public domain not configured; static canonical URLs and sitemap will be generated when VITE_SITE_URL is set.');
}
// Keep source PNGs available for future edits, but do not ship them to visitors.
for (const asset of ['contact/communication-workspace', 'services/developer-toolkit', 'work/digital-product-showcase']) {
  await rm(`dist/images/j4/${asset}.png`, { force: true });
}
// A static host can serve these directory indexes and this genuine 404 page.
await mkdir('dist/404', { recursive: true });
await cp('dist/404.html', 'dist/404/index.html');
console.log('Generated page-specific HTML metadata, robots and 404 output.');
