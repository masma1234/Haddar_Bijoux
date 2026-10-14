import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
const hash=b=>createHash('sha256').update(b).digest('hex').slice(0,12);
await mkdir('public/fonts/licenses',{recursive:true});await mkdir('src/data',{recursive:true});
const specs={fr:[['italiana','Italiana','latin',400],...['latin','latin-ext'].flatMap(subset=>[300,400,500].map(w=>['jost','Jost',subset,w]))],ar:[['amiri','Amiri','arabic',400],['tajawal','Tajawal','arabic',400],['tajawal','Tajawal','arabic',500]]};
const manifest={};
for(const [locale,list]of Object.entries(specs)){
 let css='';const preload=[];
 for(const [slug,family,subset,weight] of list){
  const filename=slug+'-'+subset+'-'+weight+'-normal.woff2';const bytes=await readFile('node_modules/@fontsource/'+slug+'/files/'+filename);
  const dest=slug+'-'+subset+'-'+weight+'-'+hash(bytes)+'.woff2';await writeFile('public/fonts/'+dest,bytes);
  const unicode=JSON.parse(await readFile('node_modules/@fontsource/'+slug+'/unicode.json','utf8'));
  css+='@font-face{font-family:"'+family+'";font-style:normal;font-weight:'+weight+';font-display:swap;src:url("/fonts/'+dest+'") format("woff2");'+(unicode[subset]?'unicode-range:'+unicode[subset]+';':'')+'}\n';
  if(weight===400&&subset!=='latin-ext')preload.push('/fonts/'+dest);
  await copyFile('node_modules/@fontsource/'+slug+'/LICENSE','public/fonts/licenses/'+slug+'-LICENSE.txt');
 }
 css+=locale==='fr'?'@font-face{font-family:"Jost Fallback";src:local("Arial");size-adjust:100%;ascent-override:100%;descent-override:25%;line-gap-override:0%}@font-face{font-family:"Italiana Fallback";src:local("Georgia");size-adjust:98%;ascent-override:95%;descent-override:25%;line-gap-override:0%}':'@font-face{font-family:"Tajawal Fallback";src:local("Arial");size-adjust:100%;ascent-override:100%;descent-override:30%;line-gap-override:0%}@font-face{font-family:"Amiri Fallback";src:local("Times New Roman");size-adjust:100%;ascent-override:110%;descent-override:45%;line-gap-override:0%}';
 const cssName=locale+'-'+hash(css)+'.css';await writeFile('public/fonts/'+cssName,css);manifest[locale]={css:'/fonts/'+cssName,preload:preload.slice(0,2)};
}
await writeFile('src/data/font-manifest.json',JSON.stringify(manifest,null,2));
const icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#F7F5F1"/><g fill="none" stroke="#8F6B39" stroke-width="3"><path d="M23 24v52M49 24v52M23 49h26M59 24v52h9c22 0 22-28 0-28H59h9c19 0 19-24 0-24z"/></g></svg>';
await writeFile('public/favicon.svg',icon);
for(const [name,size]of [['apple-touch-icon',180],['icon-192',192],['icon-512',512]])await sharp(Buffer.from(icon)).resize(size,size).png().toFile('public/'+name+'.png');
const png=await sharp(Buffer.from(icon)).resize(32,32).png().toBuffer();const header=Buffer.alloc(22);header.writeUInt16LE(1,2);header.writeUInt16LE(1,4);header[6]=32;header[7]=32;header.writeUInt16LE(1,10);header.writeUInt16LE(32,12);header.writeUInt32LE(png.length,14);header.writeUInt32LE(22,18);await writeFile('public/favicon.ico',Buffer.concat([header,png]));
for(const locale of ['fr','ar']){
 const caption=locale==='fr'?'BIJOUX EN OR 18 CARATS':'مجوهرات دهب عيار 18';
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#F7F5F1"/><rect x="760" width="440" height="630" fill="#EAE0CB"/><g fill="none" stroke="#8F6B39" stroke-width="2"><ellipse cx="980" cy="295" rx="160" ry="220" transform="rotate(30 980 295)"/><ellipse cx="980" cy="295" rx="148" ry="207" transform="rotate(30 980 295)"/><path d="M70 110h620M70 510h620"/></g><text x="70" y="285" font-family="Georgia,serif" font-size="82" fill="#2A241E">Haddar Bijoux</text><text x="70" y="355" font-family="Arial,sans-serif" font-size="30" fill="#8F6B39">'+caption+'</text><text x="70" y="472" font-family="Arial,sans-serif" font-size="23" fill="#6E6459">@haddar__bijoux</text></svg>';
 await sharp(Buffer.from(svg)).png().toFile('public/share-'+locale+'.png');
}
await writeFile('public/site.webmanifest',JSON.stringify({name:'Haddar Bijoux',short_name:'Haddar',lang:'fr',start_url:'/',display:'browser',background_color:'#F7F5F1',theme_color:'#F7F5F1',icons:[{src:'/icon-192.png',sizes:'192x192',type:'image/png'},{src:'/icon-512.png',sizes:'512x512',type:'image/png'}]},null,2));
console.log('Generated local font assets, licenses, flat brand cards, and favicon set.');
