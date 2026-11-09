import {createRequire} from 'node:module';import {pathToFileURL} from 'node:url';import {mkdir,writeFile,readFile} from 'node:fs/promises';import {routes,origin,freshOrigin} from './routes.mjs';await freshOrigin();
const require=createRequire(import.meta.url);const lhRequire=createRequire(require.resolve('@lhci/cli/package.json'));
const {default:lighthouse}=await import(pathToFileURL(lhRequire.resolve('lighthouse')).href);const {launch}=lhRequire('chrome-launcher');
const desktopOnly=process.argv.includes('--desktop-only');
// --runs=N: run each route N times and keep the median by performance score (lab samples on a busy machine vary).
const runs=Number(process.argv.find(a=>a.startsWith('--runs='))?.slice(7)||1);const homesOnly=process.argv.includes('--homes-only');
const {default:desktopConfig}=await import(pathToFileURL(lhRequire.resolve('lighthouse/core/config/desktop-config.js')).href);
const phase=process.argv[2]||'before';if(!['before','after'].includes(phase))throw Error('Use before or after');
const folder='.audit/lighthouse/'+phase;await mkdir(folder,{recursive:true});await mkdir('docs/perf',{recursive:true});
const chrome=await launch({chromePath:process.env.CHROME_PATH||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',chromeFlags:['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check']});
const results=(desktopOnly||homesOnly)?JSON.parse(await readFile('docs/perf/'+phase+'.json','utf8')).filter(r=>desktopOnly?r.profile!=='desktop':!['/','/ar/'].includes(r.route)):[];
try{for(const profile of (desktopOnly?['desktop']:['mobile','desktop']))for(const route of (homesOnly?['/','/ar/']:routes)){
 const name=(route==='/'?'home':route.slice(1,-1).replaceAll('/','-'))+'-'+profile;
 const options={port:chrome.port,output:'json',logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo'],...(profile==='desktop'?{preset:'desktop'}:{})};
 try{
 const samples=[];for(let i=0;i<runs;i++)samples.push((await lighthouse(origin+route,options,profile==='desktop'?desktopConfig:undefined)).lhr);
 samples.sort((a,b)=>(a.categories.performance?.score??0)-(b.categories.performance?.score??0));const lhr=samples[Math.floor(samples.length/2)];
 await writeFile(folder+'/'+name+'.json',JSON.stringify(lhr));
 const metric=id=>lhr.audits[id]?.numericValue??null;
 const entry={route,profile,scores:Object.fromEntries(Object.entries(lhr.categories).map(([k,v])=>[k,v.score===null?null:Math.round(v.score*100)])),lcp:metric('largest-contentful-paint'),cls:metric('cumulative-layout-shift'),tbt:metric('total-blocking-time'),weight:metric('total-byte-weight'),jsBytes:(lhr.audits['resource-summary']?.details?.items||[]).find(x=>x.resourceType==='script')?.transferSize||0,runtimeError:lhr.runtimeError||null,warnings:lhr.runWarnings,failed:Object.entries(lhr.audits).filter(([,a])=>a.score!==null&&a.score<1).map(([id,a])=>({id,score:a.score,title:a.title,displayValue:a.displayValue,details:a.details})),environment:lhr.environment,config:lhr.configSettings,lighthouseVersion:lhr.lighthouseVersion,runs,performanceSamples:samples.map(x=>Math.round((x.categories.performance?.score??0)*100))};
 results.push(entry);console.log(phase,profile,route,JSON.stringify(entry.scores),'LCP',entry.lcp,'CLS',entry.cls,entry.runtimeError?.code||'');
 }catch(error){results.push({route,profile,error:String(error)});console.error(profile,route,String(error));}
 await writeFile('docs/perf/'+phase+'.json',JSON.stringify(results,null,2));
}}finally{await chrome.kill();}
const fmt=(v,places=0)=>typeof v==='number'?v.toFixed(places):'N/A';
let before=[];if(phase==='after')before=JSON.parse(await readFile('docs/perf/before.json','utf8'));
const cols=phase==='after'?'| Before P/A/B/S |':'';
let md='# Lighthouse '+phase+'\n\nMeasured against the gzip-enabled local static preview in installed Chrome. Mobile uses Lighthouse default simulated Slow 4G and 4x CPU; desktop uses its desktop preset. '+(runs>1?'Median of '+runs+' runs per route/profile (by performance score)':'One run per route/profile')+', so results are lab samples rather than field guarantees. Expected HTTP 404 documents are audited without changing their status; Lighthouse may stop without scores. INP requires field measurement and is not certified by TBT. Raw reports: .audit/lighthouse/'+phase+'.\n\n| Route | Profile | '+cols+' P/A/B/S | LCP ms | CLS | TBT ms | JS transfer bytes | Total transfer bytes |\n|---|---|'+(phase==='after'?'---|':'')+'---|---:|---:|---:|---:|---:|\n';
for(const r of results){const old=before.find(x=>x.route===r.route&&x.profile===r.profile);const score=x=>x?.scores?Object.values(x.scores).map(v=>v??'N/A').join('/'):'N/A';md+='| '+r.route+' | '+r.profile+' | '+(phase==='after'?score(old)+' | ':'')+score(r)+' | '+fmt(r.lcp)+' | '+fmt(r.cls,4)+' | '+fmt(r.tbt)+' | '+fmt(r.jsBytes)+' | '+fmt(r.weight)+' |\n';}
md+='\n404 limitations and failed metrics are retained in the JSON report. Production domain, TLS, CDN, real images, real devices, and field INP require launch-time measurement.\n';
await writeFile('docs/perf/'+phase+'.md',md);console.log('Saved docs/perf/'+phase+'.md');

if(phase==='after')await import('./perf-report.mjs');
