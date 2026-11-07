import assert from 'node:assert/strict';import {readFile,writeFile,copyFile,unlink} from 'node:fs/promises';import {spawnSync} from 'node:child_process';
const source='src/content/products/classic.json',fixture='src/assets/products/audit-fixture.png';const original=await readFile(source,'utf8');const data=JSON.parse(original);const results=[];
function run(args){const r=spawnSync(process.execPath,args,{encoding:'utf8',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'}});return r;}
function rejected(label,entry){return writeFile(source,JSON.stringify(entry,null,2)).then(()=>{const r=run(['--experimental-strip-types','scripts/check-placeholders.mjs']);assert.notEqual(r.status,0,label);results.push(label+': rejected as required');});}
let fixtureBuilt=false;
try{
 const prod=run(['scripts/build.mjs','--prod']);assert.notEqual(prod.status,0);assert(prod.stderr.includes('Confirmation required'));results.push('Production with missing facts: rejected as required');
 await rejected('Missing Arabic alt',{...data,alt:{fr:data.alt.fr,ar:''}});
 await rejected('Missing photo permissions',{...data,image:'../../assets/products/audit-fixture.png',isPlaceholder:false,credit:'',rights:''});
 await copyFile('public/icon-512.png',fixture);
 await writeFile(source,JSON.stringify({...data,image:'../../assets/products/audit-fixture.png',isPlaceholder:false,credit:'Temporary local test asset',rights:'Original site monogram, used only by the automated image pipeline check'},null,2));
 const build=run(['scripts/build.mjs']);assert.equal(build.status,0,build.stderr+'\n'+build.stdout);fixtureBuilt=true;
 const html=await readFile('dist/index.html','utf8');
 for(const value of ['<picture>','type="image/avif"','type="image/webp"','loading="eager"','fetchpriority="high"','loading="lazy"','decoding="async"'])assert(html.includes(value),'image pipeline: '+value);
 results.push('Photo added through JSON only: AVIF, WebP, responsive preload, eager hero and lazy collection generated');
}finally{
 await writeFile(source,original);await unlink(fixture).catch(error=>{if(error.code!=='ENOENT')throw error;});
 const restore=run(['scripts/build.mjs']);assert.equal(restore.status,0,'Restored build failed: '+restore.stderr);
}
assert(fixtureBuilt);await writeFile('docs/build-guards-report.md','# Build guard verification\n\n'+results.map(x=>'- '+x).join('\n')+'\n\nThe temporary monogram fixture was removed and the six original illustration entries restored and rebuilt. No test photograph is in the final site.\n');console.log(results.join('\n'));
