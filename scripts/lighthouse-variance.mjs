// Lighthouse variance probe: runs one route N times cold (cache and storage reset, Lighthouse default) and N times warm
// (storage kept, after a priming load), and records Lighthouse's own CPU benchmark per run. Separates machine load from
// page cost. Usage: node scripts/lighthouse-variance.mjs [route without leading slash, e.g. cookies/] [runs] [mobile|desktop]   (preview server running)
import {createRequire} from 'node:module';import {pathToFileURL} from 'node:url';import {writeFile,mkdir} from 'node:fs/promises';import {origin,freshOrigin} from './routes.mjs';await freshOrigin();
const require=createRequire(import.meta.url);const lhRequire=createRequire(require.resolve('@lhci/cli/package.json'));
const {default:lighthouse}=await import(pathToFileURL(lhRequire.resolve('lighthouse')).href);const {launch}=lhRequire('chrome-launcher');
const {default:desktopConfig}=await import(pathToFileURL(lhRequire.resolve('lighthouse/core/config/desktop-config.js')).href);
const route='/'+(process.argv[2]||'cookies/').replace(/^\/+/,''),runs=Number(process.argv[3]||5),profile=process.argv[4]||'mobile';
const chrome=await launch({chromePath:process.env.CHROME_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',chromeFlags:['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check']});
const rows=[];
try{for(const mode of ['cold','warm'])for(let i=0;i<runs;i++){
 const flags={port:chrome.port,output:'json',logLevel:'error',onlyCategories:['performance'],disableStorageReset:mode==='warm',...(profile==='desktop'?{preset:'desktop'}:{})};
 if(mode==='warm'&&i===0)await lighthouse(origin+route,flags,profile==='desktop'?desktopConfig:undefined);
 const {lhr}=await lighthouse(origin+route,flags,profile==='desktop'?desktopConfig:undefined);const m=id=>lhr.audits[id]?.numericValue;
 const longest=Math.max(0,...(lhr.audits['long-tasks']?.details?.items||[]).map(t=>t.duration||0));
 rows.push({mode,run:i+1,perf:Math.round(lhr.categories.performance.score*100),benchmarkIndex:Math.round(lhr.environment.benchmarkIndex),tbt:Math.round(m('total-blocking-time')),lcp:Math.round(m('largest-contentful-paint')),longestTaskMs:Math.round(longest)});
 console.log(JSON.stringify(rows.at(-1)));
}}finally{await chrome.kill();}
const stat=(mode,k)=>{const v=rows.filter(r=>r.mode===mode).map(r=>r[k]).sort((a,b)=>a-b);return {min:v[0],median:v[v.length>>1],max:v.at(-1)};};
const summary=Object.fromEntries(['cold','warm'].map(m=>[m,Object.fromEntries(['perf','benchmarkIndex','tbt','lcp'].map(k=>[k,stat(m,k)]))]));
await mkdir('docs/perf',{recursive:true});await writeFile('docs/perf/variance.json',JSON.stringify({route,profile,runs,origin,date:new Date().toISOString(),rows,summary},null,2));console.log(JSON.stringify(summary));
