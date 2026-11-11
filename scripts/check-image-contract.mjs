import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

// Originals in incoming/ are read only: AI files are checked against SHA256SUMS.txt, owner photos against the hashes recorded below.
const sums = Object.fromEntries((await readFile('SHA256SUMS.txt', 'utf8')).trim().split('\n').map(l => l.trim().split(/\s+/)).map(([h, f]) => [f, h]));
Object.assign(sums, {
  'incoming/ananas.jpeg': 'd6e2dd783ed76e55bd4fdd2005052be4e65cf62cb6b27fdb4baedd9d0cc5c8af',
  'incoming/coeur_yed.jpeg': '8bc4abf2d75d54c19ec3c89ce0be681d8406552d6b28120ea2f71d6d4f1a2dd6',
  'incoming/fruit.jpeg': 'bdd7b89fce09c0a262671b7f00df0f6f4a7ab892233f84e13f9d32ffaa5f1487',
  'incoming/fruit2.jpeg': 'f4c341d1ccc2c4785c29b1c8bbd3fd68a5693ff00bd0fc09bf5184a0ae147e3d',
  'incoming/houta.jpeg': '342c5092721d9a05e87ce78d55604b87fba61bc03fadb55a146e6202c570f8ec',
  'incoming/houta_zoom.jpeg': 'fb70188d2c5103dffe486c6fb42212f4681a3eb1d1715b71363a90ec5109ab44',
  'incoming/khomsa.jpeg': '23296d58d744a6154442b12ebf9e8385b69abfc4496d4cb530f654a9ad545325',
  'incoming/lock.jpeg': '88571876296e2838fb6e5f82cb2fb8a8c1d7654b315e170863a9c2a7ae631f63',
  'incoming/mais.jpeg': '5f3b1ae6e296a659382bf30acd9c2ce8ca1360eb3e679874db22ce0627fa4d46',
});
for (const [file, hash] of Object.entries(sums)) assert.equal(createHash('sha256').update(await readFile(file)).digest('hex'), hash, `${file} changed`);

// Five AI illustrations stay in use: four families and the custom service. hero.jpg is deliberately unused (IMAGE-CREDITS.md).
const illustrations = ['bracelets', 'bracelets-personnalises', 'boucles-oreilles', 'colliers', 'bracelets-assortis'];
for (const id of [...illustrations, 'hero']) {
  const { width, height } = await sharp(`incoming/${id}.jpg`).metadata();
  assert.equal(`${width}x${height}`, '1200x1200', `${id}.jpg size`);
}

const pages = { French: await readFile('dist/index.html', 'utf8'), Arabic: await readFile('dist/ar/index.html', 'utf8') };
// Real pieces: the hero crop plus six plates, on both locales.
const photos = ['cordons-trio', 'cordon-cadenas', 'cordon-ananas', 'cordon-poisson', 'cordon-khomsa', 'cordon-coeur-rose', 'cordon-coeur-rouge'];
for (const [name, html] of Object.entries(pages)) {
  for (const id of illustrations) {
    assert(html.includes(`/incoming/${id}.jpg`), `${name} missing ${id}`);
    assert(html.includes(`/incoming/${id}-480.avif`) && html.includes(`/incoming/${id}-480.webp`), `${name} derivatives missing ${id}`);
  }
  for (const id of photos) {
    assert(html.includes(`/incoming/${id}-480.avif`), `${name} missing ${id}`);
    assert(html.includes(`/incoming/${id}.jpg`), `${name} JPG fallback missing ${id}`);
  }
  assert(!html.includes('/incoming/hero'), `${name}: the AI hero illustration must not be presented as a piece`);
  assert.equal((html.match(/class="collection-card"/g) || []).length, 4, `${name} collection cards`);
  assert.equal((html.match(/<figure class="plate"/g) || []).length, 6, `${name} plates`);
  // The gold liner marks real photographs only; illustrations are never framed by it.
  for (const liner of html.split('class="liner"').slice(1)) assert(!/incoming\/(bracelets|boucles|colliers)/.test(liner.split('</figure>')[0]), `${name}: illustration inside a liner`);
  const eager = html.match(/<img[^>]*fetchpriority="high"[^>]*>/g) || [];
  assert(eager.length === 1 && eager[0].includes('cordons-trio'), `${name}: the hero photo must be the only high-priority image`);
}
console.log('Image contract passed: originals unchanged, five illustrations labelled, seven owner photo crops, both locales.');
