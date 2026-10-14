import securityHeaders from '../src/data/security-headers.json';
interface Context {request:Request;next:()=>Promise<Response>;env:{ASSETS:{fetch:(request:Request)=>Promise<Response>}}}
function secured(response:Response):Response {
 const headers=new Headers(response.headers);
 for(const [name,value] of Object.entries(securityHeaders))headers.set(name,value);
 if(response.status===404){headers.set('X-Robots-Tag','noindex');headers.set('Cache-Control','no-store');}
 return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}
export async function onRequest(context:Context):Promise<Response> {
 const url=new URL(context.request.url);
 if(url.hostname.startsWith('www.')){url.hostname=url.hostname.slice(4);url.protocol='https:';return secured(Response.redirect(url.toString(),301));}
 const response=await context.next();
 const explicit=/\/(?:ar\/)?404(?:\.html)?\/?$/.test(url.pathname);
 if(response.status!==404&&!explicit)return secured(response);
 url.pathname=url.pathname.startsWith('/ar/')?'/ar/404/':'/404/';
 const page=await context.env.ASSETS.fetch(new Request(url,{method:'GET'}));
 return secured(new Response(context.request.method==='HEAD'?null:page.body,{status:404,headers:page.headers}));
}
