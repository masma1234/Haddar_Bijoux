// Full-page and first-view screenshots of both home pages at the review widths.
// Usage: node scripts/screens.mjs before|after  (needs the preview server running)
import {chromium} from 'playwright';import {mkdir} from 'node:fs/promises';import {origin,freshOrigin} from './routes.mjs';await freshOrigin();
const phase=process.argv[2]||'after';const dir='docs/screens/'+phase;await mkdir(dir,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
try{for(const [locale,route] of [['fr','/'],['ar','/ar/']])for(const width of [320,375,768,1024,1440]){
 const height=width<768?Math.round(width*16/9):width<1440?Math.round(width*.75):900;
 const page=await browser.newPage({viewport:{width,height}});await page.goto(origin+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 // Lazy images: scroll through once so the full-page capture shows them.
 await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=innerHeight){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,120));}scrollTo({top:0,behavior:'instant'});});
 await page.waitForLoadState('networkidle');
 await page.screenshot({path:`${dir}/${locale}-${width}-view.png`});
 // content-visibility:auto skips off-screen sections; a full-page capture must render them all.
 // content-visibility skips offscreen pictures, and a full-page capture does not scroll: render and load every image first.
 await page.evaluate(()=>document.querySelectorAll('main .section, main picture').forEach(s=>{s.style.contentVisibility='visible';}));
 await page.evaluate(()=>Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{});})));
 const empty=await page.evaluate(()=>[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src));if(empty.length)throw new Error(locale+' '+width+': images not loaded, capture refused: '+empty.join(', '));
 await page.waitForLoadState('networkidle');
 await page.screenshot({path:`${dir}/${locale}-${width}-full.png`,fullPage:true});
 await page.close();console.log(locale,width);
}}finally{await browser.close();}
