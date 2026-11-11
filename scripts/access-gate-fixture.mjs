// Test fixture, not shipped: a fake Cloudflare Access in front of the local preview (pnpm preview on :4321).
// GATE_ID and GATE_SECRET are the only accepted service token. STRICT=1 answers 403 (strict service-token mode), otherwise 302 to cloudflareaccess.com.
// Usage: GATE_ID=t.access GATE_SECRET=x node scripts/access-gate-fixture.mjs   (listens on :4400)
import {createServer,request} from 'node:http';
const id=process.env.GATE_ID,secret=process.env.GATE_SECRET,strict=process.env.STRICT==='1';
if(!id||!secret){console.error('Set GATE_ID and GATE_SECRET.');process.exit(2);}
createServer((req,res)=>{
 if(req.headers['cf-access-client-id']!==id||req.headers['cf-access-client-secret']!==secret){
  if(strict){res.writeHead(403);res.end('forbidden');return;}
  res.writeHead(302,{Location:'https://fixture.cloudflareaccess.com/cdn-cgi/access/login/x'});res.end();return;
 }
 const up=request({host:'127.0.0.1',port:4321,path:req.url,method:req.method,headers:req.headers},r=>{res.writeHead(r.statusCode,r.headers);r.pipe(res);});
 up.on('error',()=>{res.writeHead(502);res.end();});req.pipe(up);
}).listen(4400,'127.0.0.1',()=>console.log('Access fixture: http://127.0.0.1:4400'));
