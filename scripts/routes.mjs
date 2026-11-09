export const routes=['/','/ar/','/politique-de-confidentialite/','/cookies/','/conditions-generales/','/retours-et-remboursement/','/404/','/ar/404/'];
export const routeFile=route=>route==='/404/'?'dist/404.html':'dist'+route+'index.html';
export const origin=process.env.AUDIT_URL||'http://127.0.0.1:4321';
// Refuse to audit a preview started before the current build (stale headers and CSP hashes).
export async function freshOrigin(){const {stat}=await import('node:fs/promises');const want=String(Math.trunc((await stat('dist/_headers')).mtimeMs));const got=(await fetch(origin+'/',{method:'HEAD'})).headers.get('x-preview-build');if(got!==want)throw new Error('Preview at '+origin+' is not serving the current build (stamp '+got+', expected '+want+'). Restart scripts/serve.mjs.');}
