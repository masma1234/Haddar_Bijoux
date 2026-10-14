export const routes=['/','/ar/','/politique-de-confidentialite/','/cookies/','/conditions-generales/','/retours-et-remboursement/','/404/','/ar/404/'];
export const routeFile=route=>route==='/404/'?'dist/404.html':'dist'+route+'index.html';
export const origin=process.env.AUDIT_URL||'http://127.0.0.1:4321';
