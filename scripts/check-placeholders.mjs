import {business} from '../src/data/business.ts';
import {images} from '../src/data/images.ts';
import {imageProblems} from './image-rules.mjs';
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
// Every image the site publishes comes from the manifest; its alt, credit and rights rules apply to preview and production alike.
const imageIssues=imageProblems(Object.values(images));if(imageIssues.length)throw new Error('Image manifest:'+String.fromCharCode(10)+imageIssues.join(String.fromCharCode(10)));
if(missing.length){console.warn('Confirmation required:\n'+missing.map(x=>' - '+x).join('\n'));if(production)process.exit(1);}
