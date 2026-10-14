import {business} from '../src/data/business.ts';
import {readFile,readdir} from 'node:fs/promises';
import {existsSync} from 'node:fs';
if(existsSync('.env'))process.loadEnvFile('.env');
const production=process.argv.includes('--prod');const missing=[];
function walk(value,path){for(const [key,item]of Object.entries(value)){const name=path?path+'.'+key:key;if(typeof item==='string'&&item.includes('[CONFIRMER]'))missing.push(name);else if(item&&typeof item==='object')walk(item,name);}}
walk(business,'business');
if(!business.frenchLegalApproved)missing.push('French legal approval');
if(!business.derjaReviewed)missing.push('Native derja review');
const site=process.env.PUBLIC_SITE_URL||'https://haddar-bijoux.invalid';
if(!/^https:\/\//.test(site)||new URL(site).hostname.endsWith('.invalid'))missing.push('Confirmed HTTPS PUBLIC_SITE_URL');
if(process.env.ENABLE_CONTACT_FORM==='true')throw new Error('Contact form is not implemented. Keep ENABLE_CONTACT_FORM=false until a secure server handler is commissioned.');
for(const file of await readdir('src/content/products')){if(!file.endsWith('.json'))continue;const p=JSON.parse(await readFile('src/content/products/'+file,'utf8'));
 if(!p.alt?.fr?.trim()||!p.alt?.ar?.trim())throw new Error(file+': both image alt translations required.');
 if(p.image&&(!p.credit?.trim()||!p.rights?.trim()||/CONFIRMER/.test(p.credit+p.rights)))throw new Error(file+': real photo requires confirmed credit and rights.');
 if(!p.image)console.warn('PHOTO PLACEHOLDER: '+file);
}
if(missing.length){console.warn('Confirmation required:\n'+missing.map(x=>' - '+x).join('\n'));if(production)process.exit(1);}
