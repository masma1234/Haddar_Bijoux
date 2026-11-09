import {readFile,writeFile,mkdir,copyFile,readdir,unlink} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
import {stat} from 'node:fs/promises';
import {images} from '../src/data/images.ts';
const hash=b=>createHash('sha256').update(b).digest('hex').slice(0,12);
await mkdir('public/fonts/licenses',{recursive:true});await mkdir('src/data',{recursive:true});
const specs={fr:[['italiana','Italiana','latin',400],...['latin','latin-ext'].flatMap(subset=>[300,400,500].map(w=>['jost','Jost',subset,w]))],ar:[['italiana','Italiana','latin',400],['amiri','Amiri','arabic',400],['tajawal','Tajawal','arabic',400],['tajawal','Tajawal','arabic',500]]};
const manifest={};
for(const [locale,list]of Object.entries(specs)){
 let css='';const preload=[];
 for(const [slug,family,subset,weight] of list){
  const filename=slug+'-'+subset+'-'+weight+'-normal.woff2';const bytes=await readFile('node_modules/@fontsource/'+slug+'/files/'+filename);
  const dest=slug+'-'+subset+'-'+weight+'-'+hash(bytes)+'.woff2';await writeFile('public/fonts/'+dest,bytes);
  const unicode=JSON.parse(await readFile('node_modules/@fontsource/'+slug+'/unicode.json','utf8'));
  css+='@font-face{font-family:"'+family+'";font-style:normal;font-weight:'+weight+';font-display:swap;src:url("/fonts/'+dest+'") format("woff2");'+(unicode[subset]?'unicode-range:'+unicode[subset]+';':'')+'}\n';
  // Amiri only sets below-fold Arabic headings: not worth preloading its 108KB.
  if(weight===400&&subset!=='latin-ext'&&slug!=='amiri')preload.push('/fonts/'+dest);
  await copyFile('node_modules/@fontsource/'+slug+'/LICENSE','public/fonts/licenses/'+slug+'-LICENSE.txt');
 }
 css+=locale==='fr'?'@font-face{font-family:"Jost Fallback";src:local("Arial");size-adjust:100%;ascent-override:100%;descent-override:25%;line-gap-override:0%}@font-face{font-family:"Italiana Fallback";src:local("Georgia");size-adjust:98%;ascent-override:95%;descent-override:25%;line-gap-override:0%}':'@font-face{font-family:"Tajawal Fallback";src:local("Arial");size-adjust:100%;ascent-override:100%;descent-override:30%;line-gap-override:0%}@font-face{font-family:"Amiri Fallback";src:local("Times New Roman");size-adjust:100%;ascent-override:110%;descent-override:45%;line-gap-override:0%}';
 const cssName=locale+'-'+hash(css)+'.css';await writeFile('public/fonts/'+cssName,css);manifest[locale]={css:'/fonts/'+cssName,preload:preload.slice(0,2)};
}
await writeFile('src/data/font-manifest.json',JSON.stringify(manifest,null,2));
const icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#FFFFFF"/><g fill="none" stroke="#7A5A2B" stroke-width="3"><path d="M23 24v52M49 24v52M23 49h26M59 24v52h9c22 0 22-28 0-28H59h9c19 0 19-24 0-24z"/></g></svg>';
await writeFile('public/favicon.svg',icon);
for(const [name,size]of [['apple-touch-icon',180],['icon-192',192],['icon-512',512]])await sharp(Buffer.from(icon)).resize(size,size).png().toFile('public/'+name+'.png');
const png=await sharp(Buffer.from(icon)).resize(32,32).png().toBuffer();const header=Buffer.alloc(22);header.writeUInt16LE(1,2);header.writeUInt16LE(1,4);header[6]=32;header[7]=32;header.writeUInt16LE(1,10);header.writeUInt16LE(32,12);header.writeUInt32LE(png.length,14);header.writeUInt32LE(22,18);await writeFile('public/favicon.ico',Buffer.concat([header,png]));
for(const locale of ['fr','ar']){
 const caption=locale==='fr'?'BIJOUX EN OR 18 CARATS':'مجوهرات دهب عيار 18';
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#FFFFFF"/><text x="70" y="285" font-family="Georgia,serif" font-size="82" fill="#2A241E">Haddar Bijoux</text><text x="70" y="355" font-family="Arial,sans-serif" font-size="30" fill="#7A5A2B">'+caption+'</text><text x="70" y="472" font-family="Arial,sans-serif" font-size="23" fill="#6E6459">@haddar_bijoux</text></svg>';
 // Real pieces on the share card: the hero crop of the trio photo, framed by the gold liner.
 const t=images.trio;const piece=await sharp('incoming/'+t.file).rotate().extract(t.extract).resize(510,510).png().toBuffer();
 const liner=Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="532" height="532"><rect x=".5" y=".5" width="531" height="531" fill="#FFFFFF" stroke="#B68A4E"/></svg>');
 await sharp(Buffer.from(svg)).composite([{input:liner,left:620,top:49},{input:piece,left:631,top:60}]).jpeg({quality:84,mozjpeg:true}).toFile('public/share-'+locale+'.jpg');
 // JPEG keeps the card small enough for messaging-app link previews; drop the older PNG.
 await unlink('public/share-'+locale+'.png').catch(()=>{});
}
await writeFile('public/site.webmanifest',JSON.stringify({name:'Haddar Bijoux',short_name:'Haddar',lang:'fr',start_url:'/',display:'browser',background_color:'#FFFFFF',theme_color:'#FFFFFF',icons:[{src:'/icon-192.png',sizes:'192x192',type:'image/png'},{src:'/icon-512.png',sizes:'512x512',type:'image/png'}]},null,2));
// Responsive derivatives for every manifest image. Originals in incoming/ are read only.
await mkdir('public/incoming',{recursive:true});
// A derivative is stale when the original or the manifest (crops, widths) changed after it was written.
const manifestTime=(await stat('src/data/images.ts')).mtimeMs;
const fresh=async(src,dest)=>{try{const t=(await stat(dest)).mtimeMs;return t>=(await stat(src)).mtimeMs&&t>=manifestTime;}catch{return false;}};
const expected=new Set();
for(const img of Object.values(images)){
 const src='incoming/'+img.file;
 const base=()=>{let p=sharp(src).rotate();if(img.extract)p=p.extract(img.extract);return p;};
 const size=w=>({width:w,height:Math.round(w*img.height/img.width),fit:'cover',position:'centre'});
 const jobs=[['public/incoming/'+img.id+'.jpg',p=>p.resize(size(img.width)).jpeg({quality:82,mozjpeg:true})]];
 for(const w of img.widths){jobs.push(['public/incoming/'+img.id+'-'+w+'.avif',p=>p.resize(size(w)).avif({quality:52,effort:6})]);jobs.push(['public/incoming/'+img.id+'-'+w+'.webp',p=>p.resize(size(w)).webp({quality:78})]);}
 for(const [dest,encode] of jobs){expected.add(dest.split('/').pop());if(!(await fresh(src,dest)))await encode(base()).toFile(dest);}
}
// Remove derivatives no manifest entry produces any more (generated files only; originals live in incoming/).
for(const name of await readdir('public/incoming'))if(!expected.has(name))await unlink('public/incoming/'+name);
console.log('Generated local font assets, licenses, flat brand cards, and favicon set.');
