// Verify a Pages deployment, including Cloudflare Access protected previews.
// Usage: node scripts/verify-deployment.mjs <origin> [--staging] [--protected [--also-blocked=<other-origin>]...]
// --protected reads CF_ACCESS_CLIENT_ID and CF_ACCESS_CLIENT_SECRET from the environment; they are sent to <origin> only and never printed.
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

const css=(await readdir('dist/_astro')).find(f=>f.endsWith('.css'));
const font=(await readdir('dist/fonts')).find(f=>f.endsWith('.woff2'));
const finish=()=>{console.log(rows.join('\n'));console.log((failed?'FAILED':'ALL PASSED')+': '+rows.length+' checks against '+origin+(staging?' (staging expectations)':'')+(protectedPreview?' (Access protected)':''));process.exit(failed?1:0);};

// Cloudflare Access blocks with 401/403 (strict service-token mode) or a 302/303 to a cloudflareaccess.com login (default mode).
// Anything else, above all a 200 or the Haddar page itself, means the content is reachable.
const blocked=(r)=>{
 const where=r.h.get('location')||'';
 const gate=[401,403].includes(r.status)||([302,303,307].includes(r.status)&&/cloudflareaccess\.com|\/cdn-cgi\/access\//.test(where));
 return gate&&!/haddar/i.test(r.body);
};
const probe=async(base,path,headers={})=>{
 const r=await fetch(base+path,{redirect:'manual',headers});
 return {status:r.status,h:r.headers,body:await r.text()};
};
// Paths that carry unapproved legal text, owner photographs and indexable files: each must be blocked, not only the home page.
const sensitive=['/','/ar/','/politique-de-confidentialite/','/incoming/cordons-trio-750.avif','/sitemap-index.xml','/share-fr.jpg','/_astro/'+css,'/fonts/'+font];

if(protectedPreview){
 // Extra hostnames (the project *.pages.dev, branch aliases, custom staging host): reachable without credentials = failure.
 const bases=[origin,...process.argv.filter(a=>a.startsWith('--also-blocked=')).map(a=>a.slice(15).replace(/\/$/,''))];
 for(const base of bases){
  const host=new URL(base).host;
  for(const path of sensitive){
   const r=await probe(base,path);
   check('unauthorized blocked '+host+path,blocked(r),String(r.status));
  }
 }
 // A guessed or revoked token must be refused like no token.
 const bogus=await probe(origin,'/',{'CF-Access-Client-Id':'invalid.access','CF-Access-Client-Secret':'0'.repeat(64)});
 check('invalid service token rejected',blocked(bogus),String(bogus.status));
 if(failed){
  console.error('Cloudflare Access is not protecting this staging content. Authenticated checks were not run. Fix the Access applications first.');
  finish();
 }
 const authenticated=await request('/');
 check('Access credentials accepted',authenticated.status===200&&/haddar/i.test(authenticated.body),String(authenticated.status));
 if(authenticated.status!==200){
  console.error('Cloudflare Access rejected CF_ACCESS_CLIENT_ID / CF_ACCESS_CLIENT_SECRET (status '+authenticated.status+'). Check the token is not expired and that its Access policy action is Service Auth.');
  finish();
 }
}

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
 if(protectedPreview){
  const anon=await browser.newContext();const page=await anon.newPage();
  await page.goto(origin+'/',{waitUntil:'load'}).catch(()=>{});
  const shown=await page.content();
  check('browser without credentials sees no staging content',!/haddar/i.test(shown)&&!(await page.locator('.language-link').count()),page.url().replace(/\?.*$/,'').slice(0,80));
  await anon.close();
 }
 for(const [route,vp] of [['/',{width:390,height:844}],['/ar/',{width:1440,height:900}]]){
  const context=await browser.newContext({viewport:vp});
  // Credentials go to the staging origin only, never to any other host the page might request.
  if(protectedPreview)await context.route('**/*',route=>{const q=route.request();if(new URL(q.url()).origin===new URL(origin).origin)route.continue({headers:{...q.headers(),...accessHeaders}});else route.continue();});
  const page=await context.newPage();const errors=[];const external=new Set();
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text().slice(0,140));});
  page.on('pageerror',e=>errors.push(String(e).slice(0,140)));
  page.on('request',q=>{if(!q.url().startsWith(origin)&&!q.url().startsWith('data:'))external.add(new URL(q.url()).host);});
  const res=await page.goto(origin+route,{waitUntil:'networkidle'});
  check('browser 200 '+route,res.status()===200);
  if(protectedPreview)check('browser Access session '+route,res.status()===200&&new URL(page.url()).origin===new URL(origin).origin);
  await page.evaluate(async()=>{for(const i of document.images){i.scrollIntoView({block:'center'});await Promise.race([new Promise(r=>{if(i.complete&&i.naturalWidth)r();else{i.onload=i.onerror=r;}}),new Promise(r=>setTimeout(r,8000))]);}});
  const imgs=await page.evaluate(()=>[...document.images].filter(i=>!i.complete||!i.naturalWidth).length);
  check('no console or CSP errors '+route,!errors.length,errors.join(' ; '));check('no third-party requests '+route,!external.size,[...external].join(','));check('all images loaded '+route,imgs===0,imgs+' missing');
  const hrefs=await page.locator('a[href^="http"]').evaluateAll(a=>[...new Set(a.map(x=>x.href))]);
  check('external links are Instagram only '+route,hrefs.every(h=>/^https:\/\/(www\.instagram\.com\/haddar_bijoux\/|ig\.me\/m\/haddar_bijoux)$/.test(h)),hrefs.join(' '));
  const alt=await page.locator('.language-link').getAttribute('href');await page.locator('.language-link').click();await page.waitForLoadState('load');check('language switch '+route,new URL(page.url()).pathname===alt,page.url());await page.close();
 }
}finally{await browser.close();}
finish();
