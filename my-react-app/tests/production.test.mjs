import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile, readdir, stat, access, mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { createStaticServer } from '../server/index.mjs';
import { sitePages, normalizeSiteUrl } from '../src/siteMetadata.js';
import { contactDraftUrl, contactDraftText } from '../src/contactDraft.js';

test('contact draft safely encodes Unicode and special characters without sending', () => {
  const fields = { name: '  A & B  ', email: 'hello@example.test', subject: 'App & website?\r\nNew line', message: 'සිංහල / தமிழ் # & +\nAnother line' };
  const url = new URL(contactDraftUrl(fields));
  assert.equal(url.searchParams.get('subject'), 'App & website? New line');
  assert.ok(url.searchParams.get('body').includes(fields.message));
  assert.ok(contactDraftText(fields).includes('From: A & B'));
});

test('site origin is explicit and rejects invalid protocols or paths', () => {
  assert.equal(normalizeSiteUrl(''), null);
  assert.equal(normalizeSiteUrl('https://example.test/'), 'https://example.test');
  for (const value of ['javascript:alert(1)', 'https://example.test/subpath', 'https://user:password@example.test', 'https://example.test/?query=x']) assert.throws(() => normalizeSiteUrl(value));
});

test('responsive artwork keeps transparency while substantially reducing file sizes', async () => {
  for (const asset of ['contact/communication-workspace', 'services/developer-toolkit', 'work/digital-product-showcase']) {
    const source = await stat(`public/images/j4/${asset}.png`);
    const optimized = await stat(`public/images/j4/${asset}.webp`);
    assert.ok(optimized.size < source.size * .15);
    for (const width of [480, 768, 1280]) {
      const image = await loadImage(`public/images/j4/${asset}${width === 1280 ? '' : `-${width}`}.webp`);
      assert.equal(image.width, width);
      const canvas = createCanvas(image.width, image.height);
      const context = canvas.getContext('2d'); context.drawImage(image, 0, 0);
      assert.equal(context.getImageData(0, 0, 1, 1).data[3], 0);
      assert.ok(context.getImageData(Math.floor(image.width / 2), Math.floor(image.height / 2), 1, 1).data[3] > 200);
    }
    await assert.rejects(access(`dist/images/j4/${asset}.png`));
  }
});

test('all 22 original scenes have smaller responsive derivatives without replacing the originals', async () => {
  let count = 0;
  for (const page of ['home', 'services', 'work', 'about', 'contact']) {
    for (const name of (await readdir(`public/images/j4/${page}`)).filter((name) => /^\d{2}-.*\.webp$/.test(name))) {
      const original = await stat(`public/images/j4/${page}/${name}`);
      for (const width of [640, 960]) {
        const file = `dist/images/j4/responsive/${page}/${name.replace('.webp', '')}-${width}.webp`;
        const image = await loadImage(file);
        assert.equal(image.width, width);
        assert.ok((await stat(file)).size < original.size);
      }
      count++;
    }
  }
  assert.equal(count, 22);
});

test('production stays inside the improved JavaScript, CSS and font-request budgets', async () => {
  const files = await readdir('dist/assets');
  const compressedSize = async (extension) => (await Promise.all(files.filter((name) => name.endsWith(extension)).map(async (name) => gzipSync(await readFile(`dist/assets/${name}`)).length))).reduce((sum, value) => sum + value, 0);
  assert.ok(await compressedSize('.js') < 105000, 'Keep JavaScript well below the previous 133 KB gzip baseline');
  assert.ok(await compressedSize('.css') < 16202, 'Keep CSS below its previous gzip baseline');
  const html = await readFile('dist/index.html', 'utf8');
  assert.equal((html.match(/fonts.googleapis.com\/css2/g) || []).length, 1);
  const css = await Promise.all(files.filter((name) => name.endsWith('.css')).map((name) => readFile(`dist/assets/${name}`, 'utf8')));
  assert.ok(css.every((value) => !value.includes('@import')));
});

test('built pages expose distinct titles and social metadata without JavaScript', async () => {
  const titles = new Set();
  for (const [route, metadata] of Object.entries(sitePages)) {
    const html = await readFile(`dist${route === '/' ? '' : route}/index.html`, 'utf8');
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    titles.add(title); assert.ok(title.includes(metadata.title.split('|')[0].trim().replaceAll('&', '&amp;')));
    assert.equal((html.match(/name="description"/g) || []).length, 1);
    assert.ok(html.includes('property="og:image"'));
    assert.ok(html.includes('name="twitter:card"'));
  }
  assert.equal(titles.size, 5);
  assert.ok((await readFile('dist/404.html', 'utf8')).includes('noindex,follow'));
  assert.ok((await stat('dist/images/brand/favicon.png')).size < 10000);
});

test('production server supports deep links, genuine 404s, asset MIME types and video ranges', async () => {
  const server = createStaticServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  try {
    for (const route of Object.keys(sitePages)) {
      const response = await fetch(origin + route); assert.equal(response.status, 200); await response.text();
    }
    const unknown = await fetch(origin + '/missing-page'); assert.equal(unknown.status, 404); assert.ok((await unknown.text()).includes('Page Not Found'));
    const explicit404 = await fetch(origin + '/404'); assert.equal(explicit404.status, 404); await explicit404.text();
    const image = await fetch(origin + '/images/j4/services/developer-toolkit-480.webp'); assert.equal(image.headers.get('content-type'), 'image/webp'); await image.arrayBuffer();
    assert.equal((await fetch(origin + '/images/missing.webp')).status, 404);
    assert.equal((await fetch(origin + '/contact', { method: 'POST' })).status, 405);
    const home = await (await fetch(origin)).text();
    const jsUrl = home.match(/src="(\/assets\/[^"]+\.js)"/)[1];
    const javascript = await (await fetch(origin + jsUrl)).text();
    const video = javascript.match(/\/assets\/Intro[^"\s]+\.mp4/)[0];
    const partial = await fetch(origin + video, { headers: { Range: 'bytes=0-99' } });
    assert.equal(partial.status, 206); assert.equal((await partial.arrayBuffer()).byteLength, 100);
    assert.ok(partial.headers.get('content-range').startsWith('bytes 0-99/'));
    const invalidRange = await fetch(origin + video, { headers: { Range: 'bytes=999999999-' } }); assert.equal(invalidRange.status, 416);
    const head = await fetch(origin + '/contact', { method: 'HEAD' }); assert.equal(head.status, 200); assert.equal(await head.text(), '');
    const brotli = await fetch(origin + jsUrl, { headers: { 'Accept-Encoding': 'br' } });
    assert.equal(brotli.headers.get('content-encoding'), 'br');
    assert.equal(brotli.headers.get('vary'), 'Accept-Encoding');
    assert.equal(await brotli.text(), javascript);
    const gzip = await fetch(origin + '/contact', { headers: { 'Accept-Encoding': 'br;q=0,gzip' } });
    assert.equal(gzip.headers.get('content-encoding'), 'gzip');
    assert.ok((await gzip.text()).includes('Contact J4 Solutions'));
    const identity = await fetch(origin + '/contact', { headers: { 'Accept-Encoding': 'br;q=0,gzip;q=0,identity' } });
    assert.equal(identity.headers.get('content-encoding'), null);
    assert.ok((await identity.text()).includes('Contact J4 Solutions'));
  } finally { await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())); }
});

test('domain-aware build generates absolute social URLs and a sitemap without duplicating canonical tags', async () => {
  const fixture = await mkdtemp(path.join(tmpdir(), 'j4-metadata-'));
  const run = promisify(execFile);
  try {
    await mkdir(path.join(fixture, 'dist'));
    await writeFile(path.join(fixture, 'dist/index.html'), await readFile('dist/index.html', 'utf8'));
    const args = [path.resolve('scripts/build-pages.mjs')];
    await run(process.execPath, args, { cwd: fixture, env: { ...process.env, VITE_SITE_URL: 'https://site.example.test' } });
    const contact = await readFile(path.join(fixture, 'dist/contact/index.html'), 'utf8');
    assert.ok(contact.includes('content="https://site.example.test/images/brand/social-preview.jpg"'));
    assert.equal((contact.match(/rel="canonical"/g) || []).length, 1);
    assert.ok(contact.includes('href="https://site.example.test/contact"'));
    const sitemap = await readFile(path.join(fixture, 'dist/sitemap.xml'), 'utf8');
    assert.equal((sitemap.match(/<loc>/g) || []).length, 5);
    assert.ok((await readFile(path.join(fixture, 'dist/robots.txt'), 'utf8')).includes('Sitemap: https://site.example.test/sitemap.xml'));
    await run(process.execPath, args, { cwd: fixture, env: { ...process.env, VITE_SITE_URL: '' } });
    assert.equal((await readFile(path.join(fixture, 'dist/index.html'), 'utf8')).includes('rel="canonical"'), false);
    await assert.rejects(access(path.join(fixture, 'dist/sitemap.xml')));
  } finally {
    assert.ok(path.resolve(fixture).startsWith(path.resolve(tmpdir()) + path.sep + 'j4-metadata-'));
    await rm(fixture, { recursive: true, force: true });
  }
});
