import {readFile,writeFile,readdir} from 'node:fs/promises';import {createHash} from 'node:crypto';import {existsSync} from 'node:fs';
if(existsSync('.env'))process.loadEnvFile('.env');
const staging=process.argv.includes('--staging');
async function files(dir){let all=[];for(const item of await readdir(dir,{withFileTypes:true})){const p=dir+'/'+item.name;if(item.isDirectory())all.push(...await files(p));else if(p.endsWith('.html'))all.push(p);}return all;}
const hashes=new Set();for(const path of await files('dist')){const html=await readFile(path,'utf8');for(const preload of html.matchAll(/<link[^>]*as="image"[^>]*>/g)){for(const asset of new Set(preload[0].match(/\/_astro\/[^\s,"<>]+\.avif/g)||[])){if((await readFile('dist'+asset)).length>150*1024)throw Error('Hero AVIF exceeds 150KB: '+asset);}}for(const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)){if(match[1])hashes.add("'sha256-"+createHash('sha256').update(match[1]).digest('base64')+"'");}}
const headers=(await readFile('public/_headers','utf8')).replace("script-src 'self';","script-src 'self' "+[...hashes].join(' ')+';')
 // Staging: every response (static and Function, via security-headers.json) tells crawlers to stay out.
 .replace(/^\/\*\r?\n/,m=>staging?m+'  X-Robots-Tag: noindex, nofollow\n':m);await writeFile('dist/_headers',headers);
const site=process.env.PUBLIC_SITE_URL||'https://haddar-bijoux.invalid';await writeFile('dist/robots.txt',staging?'User-agent: *\nDisallow: /\n':'User-agent: *\nAllow: /\nSitemap: '+site.replace(/\/$/,'')+'/sitemap-index.xml\n');
const shared={};let global=false;for(const line of headers.split('\n')){if(!line.startsWith(' ')){global=line.trim()==='/*';continue;}if(global){const i=line.indexOf(':');if(i>0)shared[line.slice(0,i).trim()]=line.slice(i+1).trim();}}
await writeFile('src/data/security-headers.json',JSON.stringify(shared,null,2));
if(process.argv.includes('--prod'))for(const path of await files('dist'))if((await readFile(path,'utf8')).includes('[CONFIRMER]'))throw Error('Production HTML still contains a confirmation marker: '+path);
console.log('Generated CSP hashes and robots.txt for the configured origin.');
