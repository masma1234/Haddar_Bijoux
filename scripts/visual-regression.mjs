// Visual regression: first views of both home pages at phone and desktop size, plus the pieces section, compared
// pixel by pixel with approved baselines in docs/visual-baseline/. Usage: node scripts/visual-regression.mjs [--update]
import {chromium} from 'playwright';import sharp from 'sharp';import {mkdir,writeFile,access} from 'node:fs/promises';import {origin,freshOrigin} from './routes.mjs';await freshOrigin();
const update=process.argv.includes('--update');const dir='docs/visual-baseline';const out='.audit/visual';await mkdir(dir,{recursive:true});await mkdir(out,{recursive:true});
// A pixel differs when any channel moves by more than 24/255; a view fails above 0.3% differing pixels (anti-aliasing noise stays well under it).
const CHANNEL=24,LIMIT=0.003;
const views=[['fr-375','/',375,667,null],['ar-375','/ar/',375,667,null],['fr-1440','/',1440,900,null],['ar-1440','/ar/',1440,900,null],['fr-1440-pieces','/',1440,900,'#pieces'],['ar-375-order','/ar/',375,667,'#commander'],['fr-768-band','/',768,1000,'.cloth']];
const browser=await chromium.launch({channel:'chrome',headless:true});const warm=await browser.newPage();await warm.goto('about:blank');
const results=[];let failed=false;
try{for(const [name,route,width,height,section] of views){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce',bypassCSP:!!section});await page.goto(origin+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 const target=section?page.locator(section):page;if(section){await page.locator(section).scrollIntoViewIfNeeded();await page.waitForLoadState('networkidle');await page.evaluate(sel=>{const imgs=[...document.querySelector(sel).querySelectorAll('img')];imgs.forEach(i=>{i.loading='eager';});return Promise.race([Promise.all(imgs.map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,15000))]);},section);}
 // Fixed chrome (sticky header, skip link, order bar) would land mid-image in a tall element capture; hide it there.
 const shot=await target.screenshot({animations:'disabled',caret:'hide',...(section?{style:'.site-header,.skip-link,.mobile-cta{visibility:hidden!important}'}:{})});await page.close();
 const base=`${dir}/${name}.png`;let exists=true;try{await access(base);}catch{exists=false;}
 if(update||!exists){await writeFile(base,shot);results.push({name,status:'baseline written'});continue;}
 const [a,b]=await Promise.all([sharp(base).raw().toBuffer({resolveWithObject:true}),sharp(shot).raw().toBuffer({resolveWithObject:true})]);
 if(a.info.width!==b.info.width||a.info.height!==b.info.height){failed=true;results.push({name,status:'FAIL size '+a.info.width+'x'+a.info.height+' -> '+b.info.width+'x'+b.info.height});await writeFile(`${out}/${name}-actual.png`,shot);continue;}
 const ch=a.info.channels,px=a.info.width*a.info.height,mask=Buffer.alloc(px*3);let diff=0;
 for(let i=0;i<px;i++){let d=0;for(let c=0;c<3;c++)d=Math.max(d,Math.abs(a.data[i*ch+c]-b.data[i*ch+c]));if(d>CHANNEL){diff++;mask[i*3]=255;}else{const v=a.data[i*ch]*.2;mask[i*3]=mask[i*3+1]=mask[i*3+2]=v;}}
 const ratio=diff/px;const ok=ratio<=LIMIT;if(!ok){failed=true;await writeFile(`${out}/${name}-actual.png`,shot);await sharp(mask,{raw:{width:a.info.width,height:a.info.height,channels:3}}).png().toFile(`${out}/${name}-diff.png`);}
 results.push({name,status:(ok?'pass':'FAIL')+' '+(ratio*100).toFixed(3)+'% pixels differ'});
}}finally{await browser.close();}
for(const r of results)console.log(r.name.padEnd(16),r.status);if(failed){console.error('Visual regression: differences above '+LIMIT*100+'%. Diff masks in '+out+'/');process.exit(1);}
