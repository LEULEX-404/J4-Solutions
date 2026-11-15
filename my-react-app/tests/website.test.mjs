import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { JSDOM, VirtualConsole } from 'jsdom';

const output = path.resolve('node_modules/.cache/j4-quality/app.mjs');
await mkdir(path.dirname(output), { recursive: true });
await build({ entryPoints: ['src/App.jsx'], outfile: output, bundle: true, platform: 'node', format: 'esm', packages: 'external', jsx: 'automatic', loader: { '.css': 'empty' }, define: { 'import.meta.env': '{}' }, logLevel: 'silent' });
const virtualConsole = new VirtualConsole();
const unexpectedErrors = [];
virtualConsole.on('jsdomError', (error) => { if (!error.message.includes('Not implemented: navigation')) unexpectedErrors.push(error); });
const dom = new JSDOM('<!doctype html><html><head></head><body><div id="root"></div></body></html>', { url: 'http://localhost/services', pretendToBeVisual: true, virtualConsole });
for (const name of ['window', 'document', 'HTMLElement', 'Element', 'SVGElement', 'Node', 'Event', 'MouseEvent', 'PopStateEvent', 'KeyboardEvent']) globalThis[name] = dom.window[name];
Object.defineProperty(globalThis, 'navigator', { configurable: true, value: window.navigator });
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
window.scrollTo = () => {};
window.HTMLElement.prototype.scrollIntoView = () => {};
let reducedMotion = false;
const motionSubscribers = new Set();
window.matchMedia = (query) => ({ matches: query.includes('prefers-reduced-motion') ? reducedMotion : false, addEventListener(_type, listener) { motionSubscribers.add(listener); }, removeEventListener(_type, listener) { motionSubscribers.delete(listener); } });
const observers = [];
window.IntersectionObserver = globalThis.IntersectionObserver = class {
  constructor(callback) { this.callback = callback; this.observed = new Set(); this.disconnected = false; observers.push(this); }
  observe(target) { this.observed.add(target); }
  unobserve(target) { this.observed.delete(target); }
  disconnect() { this.disconnected = true; this.observed.clear(); }
};
globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
window.requestAnimationFrame = globalThis.requestAnimationFrame = () => 1;
window.cancelAnimationFrame = globalThis.cancelAnimationFrame = () => {};
window.HTMLCanvasElement.prototype.getContext = () => null;
const mediaEvents = [];
window.HTMLMediaElement.prototype.play = function () { mediaEvents.push({ type: 'play', target: this }); return Promise.resolve(); };
window.HTMLMediaElement.prototype.pause = function () { mediaEvents.push({ type: 'pause', target: this }); };
const originalError = console.error;
console.error = (...args) => { if (args[0] !== 'OrbBurst: 2D context unavailable') { unexpectedErrors.push(args); originalError(...args); } };
let now = 0;
let timerId = 0;
const timers = new Map();
window.setTimeout = (callback, delay = 0) => { const id = ++timerId; timers.set(id, { callback, at: now + delay }); return id; };
window.clearTimeout = (id) => timers.delete(id);
const React = await import('react');
const { act } = React;
const { createRoot } = await import('react-dom/client');
const { default: App } = await import(pathToFileURL(output));
let root = createRoot(document.getElementById('root'));
const query = (selector) => document.querySelector(selector);
const render = () => act(() => root.render(React.createElement(React.StrictMode, null, React.createElement(App))));
const tick = async (duration) => {
  const end = now + duration;
  while (true) {
    const next = [...timers.entries()].filter(([, timer]) => timer.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
    if (!next) break;
    now = next[1].at; timers.delete(next[0]); await act(() => next[1].callback());
  }
  now = end;
};
const click = async (selector) => { const element = query(selector); assert.ok(element, selector); await act(async () => { element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 })); }); };
const visit = async (url) => act(() => { window.history.pushState({ key: `${url}-${now}` }, '', url); window.dispatchEvent(new PopStateEvent('popstate')); });
const ensureRoute = async (url) => {
  if (!query('.app') && !query('.route-loader') && !query('.app-loader')) await render();
  await visit(url);
  await tick(1100);
};
const expectLoader = (name) => { assert.equal(query('.route-loader')?.getAttribute('aria-label'), `Opening ${name}`); assert.equal(query('main'), null); assert.equal(query('img'), null); };
const input = async (selector, value) => {
  const element = query(selector);
  const prototype = element instanceof window.HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
  await act(() => { Object.getOwnPropertyDescriptor(prototype, 'value').set.call(element, value); element.dispatchEvent(new Event('input', { bubbles: true })); element.dispatchEvent(new Event('change', { bubbles: true })); });
};
after(async () => { await act(() => root.unmount()); dom.window.close(); console.error = originalError; assert.deepEqual(unexpectedErrors, []); });

test('page loader gates image mounting and artwork starts only on load', async () => {
  await render(); expectLoader('Services');
  await tick(899); expectLoader('Services');
  await tick(1); assert.ok(query('.route-loader.is-exiting'));
  await tick(199); expectLoader('Services');
  await tick(1); assert.ok(query('.services-page')); assert.equal(query('.route-loader'), null);
  assert.equal(document.body.classList.contains('is-route-loading'), false);
  assert.equal(document.activeElement.id, 'main-content');
  assert.equal(query('.header-artwork.is-loaded'), null);
  assert.ok(query('.header-artwork img').srcset.includes('-480.webp'));
  await act(() => query('.header-artwork img').dispatchEvent(new Event('load')));
  assert.ok(query('.header-artwork.is-loaded'));
});

test('Services includes delivery stages and keyboard-native FAQ disclosures', async () => {
  assert.equal(document.querySelectorAll('.services-process-grid article').length, 4);
  assert.equal(document.querySelectorAll('.services-faq-list details').length, 4);
  assert.ok(query('.services-faq-list summary').textContent.includes('first conversation'));
  await click('.services-faq-list summary');
  assert.equal(query('.services-faq-list details').open, true);
  await click('.services-faq-list summary');
  assert.equal(query('.services-faq-list details').open, false);
});

test('mobile disclosure focuses first link, Escape restores toggle, outside focus and resize close it', async () => {
  window.innerWidth = 375;
  await click('.mobile-menu-toggle');
  assert.equal(document.activeElement.getAttribute('href'), '/');
  assert.ok(document.body.classList.contains('nav-open'));
  await act(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })));
  assert.equal(query('.mobile-menu-toggle').getAttribute('aria-expanded'), 'false');
  assert.equal(document.activeElement, query('.mobile-menu-toggle'));
  await click('.mobile-menu-toggle');
  await act(() => query('.footer-quick-link').focus());
  assert.equal(query('.mobile-menu-toggle').getAttribute('aria-expanded'), 'false');
  await click('.mobile-menu-toggle');
  window.innerWidth = 1280;
  await act(() => window.dispatchEvent(new Event('resize')));
  assert.equal(document.body.classList.contains('nav-open'), false);
});

test('Work concept scopes remain illustrative and filters preserve navigation state', async () => {
  await click('.nav-item[href="/portfolio"]'); expectLoader('Work'); await tick(1100);
  assert.equal(document.querySelectorAll('.project-details').length, 6);
  assert.ok(query('.portfolio-note').textContent.includes('illustrative ideas'));
  assert.ok(query('.project-details').textContent.includes('Possible deliverables'));
  assert.equal(query('.project-card--featured').id, 'featured-concept');
  await click('.project-details summary');
  assert.equal(query('.project-details').open, true);
  await click('.filter-btn:nth-child(3)');
  assert.equal(document.querySelectorAll('.project-card').length, 1);
  assert.equal(query('.route-loader'), null);
  await click('.project-btn'); expectLoader('Contact'); await tick(1100);
  assert.equal(query('#contact-subject').value, "Let's discuss useful services in your pocket");
  await click('.nav-item[href="/contact"]'); assert.equal(query('.route-loader'), null);
});

test('contact draft feedback, copy fallback, native labels and whitespace validation', async () => {
  await input('#contact-name', '  Test Visitor  ');
  await input('#contact-email', 'visitor@example.test');
  await input('#contact-message', 'A website for my business.');
  let copied = '';
  Object.defineProperty(window.navigator, 'clipboard', { configurable: true, value: { writeText: async (value) => { copied = value; } } });
  await click('.contact-draft-actions button');
  assert.ok(copied.includes('From: Test Visitor'));
  assert.ok(query('.contact-draft-feedback').textContent.includes('Message copied'));
  Object.defineProperty(window.navigator, 'clipboard', { configurable: true, value: undefined });
  await click('.contact-draft-actions button');
  assert.ok(query('#contact-draft-preview').value.includes('A website for my business.'));
  await act(() => query('.contact-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  assert.ok(query('.contact-draft-feedback').textContent.includes('Send the email from your email app'));
  await input('#contact-name', '   ');
  await act(() => query('.contact-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  assert.equal(query('.contact-draft-feedback').getAttribute('role'), 'alert');
  assert.equal(query('#contact-email').getAttribute('autocomplete'), 'email');
});

test('failed artwork and content images have visible accessible fallbacks', async () => {
  await act(() => query('.header-artwork img').dispatchEvent(new Event('error')));
  assert.ok(query('.header-artwork-fallback'));
  await act(() => query('.contact-visual img').dispatchEvent(new Event('error')));
  assert.ok(query('.scene-image-fallback').getAttribute('aria-label').includes('meeting space'));
});

test('metadata updates per route and unknown URLs show noindex 404 instead of Home', async () => {
  assert.ok(document.title.includes('Contact J4 Solutions'));
  assert.equal(document.head.querySelectorAll('link[rel="canonical"]').length, 1);
  await visit('/no-such-page');
  assert.ok(query('.not-found-page'));
  assert.equal(query('.hero-section'), null);
  assert.ok(document.title.includes('Page Not Found'));
  assert.equal(query('meta[name="robots"]').content, 'noindex,follow');
  assert.equal(query('link[rel="canonical"]'), null);
});

test('rapid route changes cancel previous timers; malformed hashes do not crash', async () => {
  await visit('/about'); expectLoader('About'); await tick(400);
  await visit('/services'); expectLoader('Services'); await tick(700); expectLoader('Services');
  await tick(400); assert.ok(query('.services-page')); assert.equal(query('.about-page'), null);
  await visit('/contact#%zz'); expectLoader('Contact'); await tick(1100); assert.ok(query('.contact-page'));
  assert.equal(document.body.classList.contains('is-route-loading'), false);
});

test('Home return is immediate, while a fresh Home visit retains the initial loader', async () => {
  await click('.nav-item[href="/"]'); assert.ok(query('.hero-section')); assert.equal(query('.app-loader'), null);
  await act(() => root.unmount()); assert.equal(timers.size, 0);
  window.history.replaceState({}, '', '/');
  root = createRoot(document.getElementById('root'));
  reducedMotion = true;
  await render(); assert.ok(query('.app-loader')); await tick(1800); assert.ok(query('.hero-section'));
});

test('Home exposes capability links, an honest featured concept and useful benefits', async () => {
  await ensureRoute('/');
  assert.equal(document.querySelectorAll('.home-capability').length, 3);
  assert.equal(query('.home-capability').getAttribute('href'), '/services#service-1');
  assert.ok(query('.home-featured-note').textContent.includes('not a delivered client project'));
  assert.equal(query('.home-featured img').getAttribute('loading'), 'lazy');
  assert.ok(query('.home-featured img').srcset.includes('-640.webp'));
  assert.deepEqual([...document.querySelectorAll('.feature-title')].map((node) => node.textContent), ['Clear scope', 'Visible progress', 'Thoughtful handover']);
  await click('.hero-scroll-cue');
  assert.equal(document.activeElement.id, 'studio-method');
  assert.equal(query('.route-loader'), null);
  assert.ok(query('.home-close .button-outline-light').href.includes('wa.me/94710145739'));
});

test('native reveals use one observer, and ambient video pauses offscreen or when hidden', async () => {
  await ensureRoute('/');
  await act(() => { reducedMotion = false; motionSubscribers.forEach((callback) => callback()); });
  const video = query('.hero-video');
  assert.ok(video);
  const active = observers.filter((observer) => !observer.disconnected);
  const reveal = active.find((observer) => [...observer.observed].some((target) => target.hasAttribute('data-reveal')));
  assert.ok(reveal);
  const elements = [...reveal.observed];
  await act(() => reveal.callback(elements.map((target) => ({ target, isIntersecting: true }))));
  assert.equal(query('.reveal-pending'), null);
  assert.equal(reveal.observed.size, 0);
  const ambient = active.find((observer) => observer.observed.has(video));
  assert.ok(ambient);
  await act(() => ambient.callback([{ target: video, isIntersecting: false }]));
  assert.equal(mediaEvents.at(-1).type, 'pause');
  await act(() => ambient.callback([{ target: video, isIntersecting: true }]));
  assert.equal(mediaEvents.at(-1).type, 'play');
  Object.defineProperty(document, 'hidden', { configurable: true, value: true });
  await act(() => document.dispatchEvent(new Event('visibilitychange')));
  assert.equal(mediaEvents.at(-1).type, 'pause');
  Object.defineProperty(document, 'hidden', { configurable: true, value: false });
  await act(() => document.dispatchEvent(new Event('visibilitychange')));
  assert.equal(mediaEvents.at(-1).type, 'play');
  await act(() => { reducedMotion = true; motionSubscribers.forEach((callback) => callback()); });
  assert.equal(query('.hero-video'), null);
  assert.ok(query('.hero-video-stage.is-static'));
  assert.equal(query('.reveal-pending'), null);
});

test('Home showcase links to the Work feature and the closing invitation carries inquiry state', async () => {
  await ensureRoute('/');
  await click('.home-featured .button-primary'); expectLoader('Work'); await tick(1100);
  assert.ok(query('#featured-concept.project-card--featured'));
  assert.equal(document.activeElement.id, 'featured-concept');
  assert.ok(query('.work-close').textContent.includes('similar in mind'));
  await click('.work-close .button-light'); expectLoader('Contact'); await tick(1100);
  assert.equal(query('#contact-subject').value, "Let's explore a project direction");
});

test('Home capability navigation focuses the matching Services section after its loader', async () => {
  await ensureRoute('/');
  await click('.home-capability:nth-child(2)');
  expectLoader('Services');
  await tick(1100);
  assert.equal(document.activeElement.id, 'service-3');
  assert.ok(document.activeElement.textContent.includes('Database Solutions'));
});

test('Save-Data avoids downloading ambient video and unsupported observers leave Home visible', async () => {
  await ensureRoute('/contact');
  const Observer = window.IntersectionObserver;
  try {
    reducedMotion = false;
    Object.defineProperty(window.navigator, 'connection', { configurable: true, value: { saveData: true } });
    window.IntersectionObserver = undefined;
    await ensureRoute('/');
    assert.equal(query('.hero-video'), null);
    assert.ok(query('.hero-video-stage.is-static'));
    assert.equal(query('.reveal-pending'), null);
    assert.equal(document.querySelectorAll('.home-capability').length, 3);
  } finally {
    window.IntersectionObserver = Observer;
    Object.defineProperty(window.navigator, 'connection', { configurable: true, value: undefined });
  }
});

test('premium Services cards retain all eight offerings, responsive images and inquiry subjects', async () => {
  await ensureRoute('/services');
  const cards = [...document.querySelectorAll('article.service-card')];
  assert.equal(cards.length, 8);
  for (const card of cards) {
    assert.ok(card.querySelector('.service-category').textContent.trim());
    assert.equal(card.querySelectorAll('.service-feature-item').length, 3);
    assert.ok(card.querySelector('.service-media img').srcset.includes('-640.webp'));
    assert.ok(card.querySelector('.service-btn .service-link-arrow'));
  }
  assert.notEqual(cards[3].querySelector('img').getAttribute('src'), cards[5].querySelector('img').getAttribute('src'));
  await click('#service-1 .service-btn'); expectLoader('Contact'); await tick(1100);
  assert.equal(query('#contact-subject').value, 'Inquiry about Web Development');
});

test('premium About keeps its illustrative images, values and working contact action', async () => {
  await visit('/about'); expectLoader('About'); await tick(1100);
  assert.ok(query('.studio-about h1').textContent.includes('Built with care.'));
  assert.ok(query('.about-visual-caption').textContent.includes('Illustrative studio setting'));
  assert.equal(document.querySelectorAll('.story-visual img').length, 2);
  assert.equal(document.querySelectorAll('.about-values article.value-card').length, 3);
  assert.equal(query('.about-values').getAttribute('aria-labelledby'), 'about-values-title');
  assert.ok(query('.about-hero-visual img').srcset.includes('-640.webp'));
  await click('.about-contact-link'); expectLoader('Contact'); await tick(1100);
  assert.ok(query('.contact-form'));
});
