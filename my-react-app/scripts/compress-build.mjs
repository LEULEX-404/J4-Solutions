import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync, brotliCompressSync, constants } from 'node:zlib';

async function compress(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { await compress(file); continue; }
    if (!/\.(html|css|js|json|xml|txt|svg)$/.test(entry.name)) continue;
    const content = await readFile(file);
    if (content.length < 512) continue;
    await writeFile(`${file}.gz`, gzipSync(content, { level: 9 }));
    await writeFile(`${file}.br`, brotliCompressSync(content, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }));
  }
}

await compress('dist');
console.log('Prepared Brotli and gzip text assets; images and video remain in their original encodings.');
