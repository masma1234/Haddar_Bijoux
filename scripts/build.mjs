import {spawnSync} from 'node:child_process';
const prod=process.argv.includes('--prod');
function run(args){const r=spawnSync(process.execPath,args,{stdio:'inherit',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'}});if(r.status!==0)process.exit(r.status||1);}
run(['--experimental-strip-types','scripts/check-placeholders.mjs',...(prod?['--prod']:[])]);
run(['scripts/generate-assets.mjs']);
run(['node_modules/astro/bin/astro.mjs','build']);
run(['scripts/postbuild.mjs',...(prod?['--prod']:[])]);
run(['scripts/check-prerender.mjs']);
run(['scripts/check-budgets.mjs']);
