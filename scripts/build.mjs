import {spawnSync} from 'node:child_process';
// Cloudflare Pages has one build command for every environment, so the target can also come from the environment:
// BUILD_TARGET=production (set only on the Production environment) runs the gated production build;
// any other build on Pages (CF_PAGES=1) is a staging build and is never indexable.
const prod=process.argv.includes('--prod')||process.env.BUILD_TARGET==='production';
// --staging: a draft build for a protected preview. Same content as the default build, but never indexable.
const staging=process.argv.includes('--staging')||(!prod&&process.env.CF_PAGES==='1');if(prod&&staging){console.error('Choose --prod or --staging, not both.');process.exit(1);}
function run(args){const r=spawnSync(process.execPath,args,{stdio:'inherit',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'}});if(r.status!==0)process.exit(r.status||1);}
console.log('Build target: '+(prod?'production (gated)':staging?'staging (noindex)':'local preview'));
run(['--experimental-strip-types','scripts/check-placeholders.mjs',...(prod?['--prod']:[])]);
run(['--experimental-strip-types','--disable-warning=ExperimentalWarning','scripts/generate-assets.mjs']);
run(['node_modules/astro/bin/astro.mjs','build']);
run(['scripts/postbuild.mjs',...(prod?['--prod']:[]),...(staging?['--staging']:[])]);
run(['scripts/check-prerender.mjs']);
run(['scripts/check-budgets.mjs']);
