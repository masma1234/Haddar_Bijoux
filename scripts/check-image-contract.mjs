import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

const expected = [
  ['hero.jpg', '/', 'hero.jpg'],
  ['bracelets.jpg', '/', 'bracelets.jpg'],
  ['bracelets-personnalises.jpg', '/', 'bracelets-personnalises.jpg'],
  ['boucles-oreilles.jpg', '/', 'boucles-oreilles.jpg'],
  ['colliers.jpg', '/', 'colliers.jpg'],
  ['bracelets-assortis.jpg', '/', 'bracelets-assortis.jpg'],
];

for (const [file] of expected) {
  const metadata = await sharp(`incoming/${file}`).metadata();
  assert.equal(metadata.width, 1200, `${file}: width`);
  assert.equal(metadata.height, 1200, `${file}: height`);
}

const html = await readFile('dist/index.html', 'utf8');
const arabic = await readFile('dist/ar/index.html', 'utf8');
for (const [file] of expected) {
  const id = file.replace('.jpg', '');
  assert(html.includes(`/incoming/${file}`), `French mapping missing ${file}`);
  assert(arabic.includes(`/incoming/${file}`), `Arabic mapping missing ${file}`);
  assert(html.includes(`/incoming/${id}-480.avif`), `French AVIF missing ${file}`);
  assert(html.includes(`/incoming/${id}-480.webp`), `French WebP missing ${file}`);
}

assert.equal((html.match(/class="collection-card"/g) || []).length, 4);
assert(html.includes('/incoming/bracelets-assortis.jpg'));
console.log('Image contract passed: six 1200x1200 sources and both locale mappings verified.');
