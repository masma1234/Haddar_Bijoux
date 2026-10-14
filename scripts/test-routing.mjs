import assert from 'node:assert/strict';import ts from 'typescript';import {readFile,writeFile} from 'node:fs/promises';
const headers=JSON.parse(await readFile('src/data/security-headers.json','utf8'));
assert(headers['Content-Security-Policy']?.includes("'sha256-"),'Generated CSP hashes missing');
let source=await readFile('functions/_middleware.ts','utf8');source=source.replace(/import securityHeaders[^;]+;/,'const securityHeaders='+JSON.stringify(headers)+';');
const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {onRequest}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
const results=[];
for(const [route,status,asset] of [['/',200,null],['/ar/',200,null],['/unknown/',404,'/404/'],['/ar/unknown/',404,'/ar/404/'],['/404/',200,'/404/'],['/ar/404/',200,'/ar/404/']]){
 const response=await onRequest({request:new Request('https://example.test'+route),next:async()=>new Response('existing page',{status}),env:{ASSETS:{fetch:async request=>{assert.equal(new URL(request.url).pathname,asset);return new Response('static error page',{headers:{'Content-Type':'text/html'}});}}}});
 assert.equal(response.status,asset?404:status);assert.equal(response.headers.get('Content-Security-Policy'),headers['Content-Security-Policy']);if(asset){assert.equal(await response.text(),'static error page');assert.equal(response.headers.get('X-Robots-Tag'),'noindex');}results.push(route+': passed');
}
const redirect=await onRequest({request:new Request('https://www.example.test/ar/?a=1'),next:async()=>{throw Error('must redirect first');},env:{ASSETS:{fetch:async()=>{throw Error('must redirect first');}}}});
assert.equal(redirect.status,301);assert.equal(redirect.headers.get('Location'),'https://example.test/ar/?a=1');results.push('www apex redirect preserves path and query: passed');
await writeFile('docs/routing-report.md','# Static routing checks\n\n'+results.map(r=>'- '+r).join('\n')+'\n\nThese tests exercise the actual middleware with mocked Pages assets. Browser checks independently verify local HTTP behavior. An actual Cloudflare Pages staging deployment remains required before launch.\n');console.log(results.join('\n'));
