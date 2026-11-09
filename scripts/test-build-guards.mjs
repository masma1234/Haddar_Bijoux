import assert from 'node:assert/strict';import {writeFile} from 'node:fs/promises';import {spawnSync} from 'node:child_process';
import {images} from '../src/data/images.ts';import {imageProblems} from './image-rules.mjs';
// Proves the publishing guards reject what they must. Run with --experimental-strip-types (images.ts is TypeScript).
const results=[];
const prod=spawnSync(process.execPath,['scripts/build.mjs','--prod'],{encoding:'utf8',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'}});
assert.notEqual(prod.status,0,'production build must fail while facts are unconfirmed');assert(prod.stderr.includes('Confirmation required'));results.push('Production build with missing facts: rejected as required');
assert.deepEqual(imageProblems(Object.values(images)),[],'the current manifest must pass');results.push('Current image manifest ('+Object.keys(images).length+' images): accepted');
const photo=images.lock;
for(const [label,entry] of [
 ['Missing Arabic alt',{...photo,alt:{fr:photo.alt.fr,ar:' '}}],
 ['Missing French alt',{...photo,alt:{fr:'',ar:photo.alt.ar}}],
 ['Missing rights statement',{...photo,rights:''}],
 ['Credit still marked [CONFIRMER]',{...photo,credit:'[CONFIRMER]'}],
 ['Real photo without Arabic caption',{...photo,caption:{fr:'Cadenas cœur',ar:''}}],
])assert(imageProblems([entry]).length,label),results.push(label+': rejected as required');
await writeFile('docs/build-guards-report.md','# Build guard verification\n\n'+results.map(x=>'- '+x).join('\n')+'\n\nThe image rules (scripts/image-rules.mjs) run inside scripts/check-placeholders.mjs on every build, preview and production. They cover every image in src/data/images.ts, which is the only image source the pages use.\n');console.log(results.join('\n'));
