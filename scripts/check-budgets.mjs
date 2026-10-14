import {readdir,readFile,writeFile} from 'node:fs/promises';import {gzipSync} from 'node:zlib';import assert from 'node:assert/strict';
async function files(dir){const out=[];for(const e of await readdir(dir,{withFileTypes:true})){const path=dir+'/'+e.name;if(e.isDirectory())out.push(...await files(path));else out.push(path);}return out;}
const result={javascriptGzipBytes:0,cssGzipBytes:0,inlineJavaScriptGzipBytes:0};const inline=new Set();
for(const path of await files('dist')){const bytes=await readFile(path);if(path.endsWith('.js'))result.javascriptGzipBytes+=gzipSync(bytes).length;else if(path.endsWith('.css'))result.cssGzipBytes+=gzipSync(bytes).length;else if(path.endsWith('.html')){for(const m of bytes.toString().matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)){if(!m[1].includes('application/ld+json')&&m[2].trim())inline.add(m[2]);}}}
for(const script of inline)result.inlineJavaScriptGzipBytes+=gzipSync(script).length;
result.javascriptGzipBytes+=result.inlineJavaScriptGzipBytes;
assert(result.javascriptGzipBytes<20*1024,'JavaScript budget exceeded');assert(result.cssGzipBytes<30*1024,'CSS budget exceeded');await writeFile('docs/budgets.json',JSON.stringify(result,null,2));console.log(result);
