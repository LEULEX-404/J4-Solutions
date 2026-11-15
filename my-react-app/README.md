# J4 Solutions website

React 19 and Vite website for J4 Solutions. Use Node 22.12 or newer.

## Local development

From this directory, run `npm ci` and `npm run dev`. The predev step prepares responsive WebP artwork, small brand images and the social preview. Header artwork is mounted after the named page loader finishes and starts its entrance only when its own image loads.

`npm run check` runs ESLint, creates a fresh production build and runs React DOM and HTTP integration tests. The tests do not send email, open a real email client or contact external sites.

## Production

Run `npm run build`, then `npm start`. The Node server serves `dist`, page-specific HTML metadata, genuine HTTP 404 responses, static assets with caching, and byte-range video requests. Set `PORT` and optionally `HOST` for the hosting environment. Production serving uses only Node built-ins.

For a static host, upload `dist`, serve generated directory indexes for the five known routes, and configure missing pages to serve `404.html` with HTTP 404. Avoid a blanket rewrite of every URL to Home, which masks missing assets and invalid addresses. The Vite development server is not the production 404 implementation.

## Public domain and search previews

There is no public domain configured yet. When one is available, copy `.env.example` to `.env` and set `VITE_SITE_URL` to the real HTTPS origin, with no subpath. Rebuild to produce absolute social-image/canonical URLs and `sitemap.xml`. No placeholder domain is published by default. Titles, descriptions, Open Graph and Twitter metadata are generated into each page's HTML before JavaScript runs. Unknown pages are marked noindex. Client navigation also updates metadata.

## Contact and project content

As requested, there is no email backend. The contact form prepares a draft for the visitor's email app, explains that this does not send it automatically, and provides copy/manual-copy and WhatsApp alternatives. It never claims delivery or submission success.

Work entries remain labelled illustrative directions, with proposed scopes and possible deliverables. No client names, delivered projects, results or testimonials have been fabricated. See `docs/client-case-study-template.md` when approved project material becomes available.

## Assets and validation limits

`npm run prepare:assets` derives 480px, 768px and 1280px WebP artwork from the original transparent PNGs, preserving alpha. Original PNGs remain in source and are excluded from production output. The supplied 22 scene images remain unchanged. Header and content images have themed error fallbacks.

Automated checks cover loader ordering, responsive images and alpha, image errors, keyboard menu behavior, metadata, contact drafts, filtering, inquiry state, 404s and HTTP video ranges. They run in JSDOM and Node. Real-device appearance, browser performance scores and actual social-share crawlers remain unverified because no browser connection or public URL is available.
