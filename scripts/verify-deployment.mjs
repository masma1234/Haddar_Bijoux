// Verify a Pages deployment, including Cloudflare Access protected previews.
// Usage: node scripts/verify-deployment.mjs <origin> [--staging] [--protected]
import {chromium} from 'playwright';
import {readdir} from 'node:fs/promises';

const origin=(process.argv[2]||'').replace(/\/$/,'');
if(!/^https?:\/\//.test(origin)){
 console.error('Usage: node scripts/verify-deployment.mjs <origin> [--staging] [--protected]');
 process.exit(2);
}
const staging=process.argv.includes('--staging');
const protectedPreview=process.argv.includes('--protected');
const rows=[];let failed=false;
const check=(name,ok,detail='')=>{rows.push((ok?'PASS ':'FAIL ')+name+(detail?'  ['+detail+']':''));if(!ok)failed=true;};

const clientId=process.env.CF_ACCESS_CLIENT_ID;
const clientSecret=process.env.CF_ACCESS_CLIENT_SECRET;
if(protectedPreview&&(!clientId||!clientSecret)){
 console.error('Protected verification requires CF_ACCESS_CLIENT_ID and CF_ACCESS_CLIENT_SECRET environment variables.');
 process.exit(2);
}
const accessHeaders=protectedPreview?{
 'CF-Access-Client-Id':clientId,
 'CF-Access-Client-Secret':clientSecret,
}:{};
const request=async(path,init={})=>{
 const r=await fetch(origin+path,{redirect:'manual',...init,headers:{...accessHeaders,...(init.headers||{})}});
 return {status:r.status,h:r.headers,body:await r.text()};
};

if(protectedPreview){
 const unauthenticated=await fetch(origin+'/',{redirect:'manual'});
 check('unauthorized visitors blocked',![200,203].includes(unauthenticated.status),String(unauthenticated.status));
 if([200,203].includes(unauthenticated.status)){
  console.error('Cloudflare Access is not protecting this staging origin; refusing authenticated checks.');
  failed=true;
 }
 const authenticated=await request('/');
 check('Access credentials accepted',authenticated.status===200,String(authenticated.status));
 if(authenticated.status!==200)console.error('Cloudflare Access credentials were rejected or the protected origin is unavailable.');
}

const css=(await readdir('dist/_astro')).find(f=>f.endsWith('.css'));
const font=(await readdir('dist/fonts')).find(f=>f.endsWith('.woff2'));
for(const path of ['/','/ar/','/politique-de-confidentialite/','/cookies/','/conditions-generales/','/retours-et-remboursement/']){
 const r=await request(path);
 check('200 '+path,r.status===200,String(r.status));
 for(const name of ['content-security-policy','strict-transport-security','x-content-type-options','x-frame-options','referrer-policy','cross-origin-opener-policy'])check(name+' on '+path,!!r.h.get(name));
 check('single Cache-Control on '+path,!(r.h.get('cache-control')||'').includes('immutable'),r.h.get('cache-control')||'none');
 if(staging)check('noindex on '+path,/noindex/.test(r.h.get('x-robots-tag')||''),r.h.get('x-robots-tag')||'none');
}
for(const [path,want] of [['/_astro/'+css,'public, max-age=31536000, immutable'],['/fonts/'+font,'public, max-age=31536000, immutable'],['/incoming/cordons-trio-750.avif','public, max-age=86400, stale-while-revalidate=604800']]){
 const r=await request(path);
 check('asset 200 + cache '+path.split('/')[1],r.status===200&&r.h.get('cache-control')===want,r.status+' '+r.h.get('cache-control'));
 check('CSP on asset '+path.split('/')[1],!!r.h.get('content-security-policy'));
}
for(const [path,lang] of [['/missing-page/','fr'],['/ar/missing-page/','ar'],['/404/','fr'],['/ar/404/','ar']]){
 const r=await request(path);
 check('404 '+path,r.status===404&&r.body.includes('lang="'+lang+'"'),String(r.status));
 check('404 headers '+path,r.h.get('cache-control')==='no-store'&&/noindex/.test(r.h.get('x-robots-tag')||'')&&!!r.h.get('content-security-policy'),r.h.get('cache-control')+' | '+r.h.get('x-robots-tag'));
}
const robots=await request('/robots.txt');
check('robots.txt '+(staging?'disallows all':'allows crawling'),staging?/Disallow: \/\s*$/m.test(robots.body):/Allow: \//.test(robots.body),robots.body.trim().replace(/\n/g,' / '));
check('sitemap served',(await request('/sitemap-index.xml')).status===200);
check('share card served',(await request('/share-fr.jpg')).status===200);

const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 for(const [route,vp] of [['/',{width:390,height:844}],['/ar/',{width:1440,height:900}]]){
  const context=await browser.newContext({extraHTTPHeaders:accessHeaders,viewport:vp});
  const page=await context.newPage();const errors=[];const external=new Set();
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text().slice(0,140));});
  page.on('pageerror',e=>errors.push(String(e).slice(0,140)));
  page.on('request',q=>{if(!q.url().startsWith(origin)&&!q.url().startsWith('data:'))external.add(new URL(q.url()).host);});
  const res=await page.goto(origin+route,{waitUntil:'networkidle'});
  check('browser 200 '+route,res.status()===200);
  if(protectedPreview)check('browser Access session '+route,res.status()===200);
  await page.evaluate(async()=>{for(const i of document.images){i.scrollIntoView({block:'center'});await Promise.race([new Promise(r=>{if(i.complete&&i.naturalWidth)r();else{i.onload=i.onerror=r;}}),new Promise(r=>setTimeout(r,8000))]);}});
  const imgs=await page.evaluate(()=>[...document.images].filter(i=>!i.complete||!i.naturalWidth).length);
  check('no console or CSP errors '+route,!errors.length,errors.join(' ; '));check('no third-party requests '+route,!external.size,[...external].join(','));check('all images loaded '+route,imgs===0,imgs+' missing');
  const hrefs=await page.locator('a[href^="http"]').evaluateAll(a=>[...new Set(a.map(x=>x.href))]);
  check('external links are Instagram only '+route,hrefs.every(h=>/^https:\/\/(www\.instagram\.com\/haddar_bijoux\/|ig\.me\/m\/haddar_bijoux)$/.test(h)),hrefs.join(' '));
  const alt=await page.locator('.language-link').getAttribute('href');await page.locator('.language-link').click();await page.waitForLoadState('load');check('language switch '+route,new URL(page.url()).pathname===alt,page.url());await page.close();
 }
}finally{await browser.close();}
console.log(rows.join('\n'));
console.log((failed?'FAILED':'ALL PASSED')+': '+rows.length+' checks against '+origin+(staging?' (staging expectations)':'')+(protectedPreview?' (Access protected)':''));
process.exit(failed?1:0);
