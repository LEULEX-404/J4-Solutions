import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { sitePages, normalizePath } from '../src/siteMetadata.js';

const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.woff2': 'font/woff2' };

function acceptedEncodings(header = '') {
  const preferences = new Map(header.toLowerCase().split(',').map((part) => {
    const [name, ...parameters] = part.trim().split(';');
    const quality = parameters.find((parameter) => parameter.trim().startsWith('q='));
    const value = quality ? Number(quality.trim().slice(2)) : 1;
    return [name, Number.isFinite(value) && value >= 0 && value <= 1 ? value : 0];
  }));
  return ['br', 'gzip'].map((name) => ({ name, quality: preferences.get(name) ?? preferences.get('*') ?? 0 })).filter((item) => item.quality > 0).sort((a, b) => b.quality - a.quality);
}

export function createStaticServer({ root = path.resolve('dist') } = {}) {
  const directory = path.resolve(root);
  return createServer(async (request, response) => {
    try {
      if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return; }
      let pathname;
      try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
      catch { response.writeHead(400); response.end('Invalid address'); return; }
      const requested = path.resolve(directory, `.${pathname}`);
      if ((!requested.startsWith(directory + path.sep) && requested !== directory) || pathname.split(/[\\/]/).some((part) => part.startsWith('.'))) {
        response.writeHead(404); response.end('Not found'); return;
      }
      const route = normalizePath(pathname);
      let file = requested;
      let status = 200;
      if (sitePages[route]) file = path.join(directory, route === '/' ? 'index.html' : `${route}/index.html`);
      let info = await stat(file).catch(() => null);
      if (!info?.isFile()) {
        if (path.extname(pathname) && path.extname(pathname) !== '.html') { response.writeHead(404); response.end('Not found'); return; }
        file = path.join(directory, '404.html');
        info = await stat(file);
        status = 404;
      }
      if (route === '/404' || pathname === '/404.html' || pathname === '/404/index.html') status = 404;
      const extension = path.extname(file);
      const headers = {
        'Content-Type': types[extension] || 'application/octet-stream',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Cache-Control': extension === '.html' ? 'no-cache' : pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'public, max-age=3600',
        'Accept-Ranges': 'bytes',
      };
      if (/\.(html|css|js|json|xml|txt|svg)$/.test(file)) {
        headers.Vary = 'Accept-Encoding';
        if (!request.headers.range) {
          for (const { name } of acceptedEncodings(request.headers['accept-encoding'])) {
            const encodedFile = `${file}.${name === 'br' ? 'br' : 'gz'}`;
            const encodedInfo = await stat(encodedFile).catch(() => null);
            if (!encodedInfo?.isFile()) continue;
            file = encodedFile;
            info = encodedInfo;
            headers['Content-Encoding'] = name;
            break;
          }
        }
      }
      let start = 0;
      let end = info.size - 1;
      if (request.headers.range && status === 200) {
        const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
        if (match && (match[1] || match[2])) {
          start = match[1] ? Number(match[1]) : Math.max(0, info.size - Number(match[2]));
          end = match[1] && match[2] ? Math.min(Number(match[2]), end) : end;
        } else start = -1;
        if (start < 0 || start >= info.size || end < start || !Number.isSafeInteger(start) || !Number.isSafeInteger(end)) {
          response.writeHead(416, { 'Content-Range': `bytes */${info.size}` }); response.end(); return;
        }
        status = 206;
        headers['Content-Range'] = `bytes ${start}-${end}/${info.size}`;
      }
      headers['Content-Length'] = end - start + 1;
      response.writeHead(status, headers);
      if (request.method === 'HEAD' || info.size === 0) { response.end(); return; }
      const stream = createReadStream(file, { start, end });
      stream.on('error', () => response.destroy());
      response.on('close', () => stream.destroy());
      stream.pipe(response);
    } catch {
      if (!response.headersSent) { response.writeHead(500); response.end('The site is temporarily unavailable.'); }
      else response.destroy();
    }
  });
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  const port = Number(process.env.PORT || 3000);
  await stat('dist/index.html').catch(() => { throw new Error('Run npm run build before npm start.'); });
  createStaticServer().listen(port, process.env.HOST || '0.0.0.0', () => console.log(`J4 Solutions is available on port ${port}`));
}
