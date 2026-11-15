import { createCanvas, loadImage } from '@napi-rs/canvas';
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const assets = [
  'contact/communication-workspace',
  'services/developer-toolkit',
  'work/digital-product-showcase',
];

async function resize(source, target, width) {
  const image = await loadImage(source);
  const canvas = createCanvas(width, Math.round(image.height * width / image.width));
  const context = canvas.getContext('2d');
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  await writeFile(target, await canvas.encode('webp', 86));
}

for (const asset of assets) {
  const source = `public/images/j4/${asset}.png`;
  for (const width of [480, 768, 1280]) {
    const target = `public/images/j4/${asset}${width === 1280 ? '' : `-${width}`}.webp`;
    const input = await stat(source);
    const output = await stat(target).catch(() => null);
    if (output && output.mtimeMs >= input.mtimeMs) continue;
    await resize(source, target, width);
  }
}

// Keep original pack files intact, and serve smaller derivatives where useful.
for (const page of ['home', 'services', 'work', 'about', 'contact']) {
  await mkdir(`public/images/j4/responsive/${page}`, { recursive: true });
  const scenes = (await readdir(`public/images/j4/${page}`)).filter((name) => /^\d{2}-.*\.webp$/.test(name));
  for (const scene of scenes) {
    const source = `public/images/j4/${page}/${scene}`;
    const input = await stat(source);
    for (const width of [640, 960]) {
      const target = `public/images/j4/responsive/${page}/${scene.replace('.webp', '')}-${width}.webp`;
      const output = await stat(target).catch(() => null);
      if (!output || output.mtimeMs < input.mtimeMs) await resize(source, target, width);
    }
  }
}

await mkdir('public/images/brand', { recursive: true });
for (const width of [96, 192, 384, 768]) {
  await resize('src/assets/logo.png', `public/images/brand/logo-${width}.webp`, width);
}
const logo = await loadImage('src/assets/logo.png');
const favicon = createCanvas(48, 48);
const iconContext = favicon.getContext('2d');
const iconScale = Math.min(48 / logo.width, 48 / logo.height);
iconContext.drawImage(logo, (48 - logo.width * iconScale) / 2, (48 - logo.height * iconScale) / 2, logo.width * iconScale, logo.height * iconScale);
await writeFile('public/images/brand/favicon.png', await favicon.encode('png'));

const card = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#10283f"/><path d="M72 98H1128" stroke="#45637a"/><text x="72" y="180" fill="#8bc9f1" font-family="Arial,sans-serif" font-size="20" letter-spacing="5">INDEPENDENT DIGITAL STUDIO</text><text x="72" y="300" fill="white" font-family="Georgia,serif" font-size="92">J4 Solutions</text><text x="72" y="380" fill="#d6e4ef" font-family="Arial,sans-serif" font-size="28">Thoughtful strategy, design and engineering.</text><path d="M72 496H1128" stroke="#45637a"/><text x="72" y="550" fill="#8bc9f1" font-family="Arial,sans-serif" font-size="20">Sri Lanka / Worldwide</text></svg>`;
const social = createCanvas(1200, 630);
social.getContext('2d').drawImage(await loadImage(Buffer.from(card)), 0, 0);
await writeFile('public/images/brand/social-preview.jpg', await social.encode('jpeg', 88));
console.log(`Prepared responsive WebP artwork, small logos and social preview in ${path.resolve('public/images')}`);
