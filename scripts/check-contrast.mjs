import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';

const luminance=hex=>{
 const rgb=hex.replace('#','').match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
 return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
};
const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
const palette={bg:'#F7F5F1',panel:'#FFFFFF',gold:'#B68A4E',goldDeep:'#8F6B39',goldPale:'#EAE0CB',ink:'#2A241E',inkSoft:'#6E6459',line:'#E4DCCB'};
const css=await readFile('src/styles/global.css','utf8');
const expectedTokens={bg:palette.bg,panel:palette.panel,gold:palette.gold,'gold-deep':palette.goldDeep,'gold-pale':palette.goldPale,ink:palette.ink,'ink-soft':palette.inkSoft,line:palette.line};
for(const [token,value] of Object.entries(expectedTokens))assert(css.includes(`--${token}:${value}`),`Palette token --${token} must be ${value}`);
assert(!css.includes('prefers-color-scheme:dark'),'The approved palette is light-only.');
for(const extra of ['#7A5A2B','#1C1814','#221D18','#F3ECE1','#B8AC9D','#C9A46B','#E4C793','#3A3024'])assert(!css.toUpperCase().includes(extra),'Unapproved theme color remains: '+extra);

const combinations=[['ink','bg'],['ink','panel'],['ink','goldPale'],['inkSoft','bg'],['inkSoft','panel'],['ink','gold'],['panel','goldDeep']];
const rows=combinations.map(([foreground,background])=>[foreground,background,contrast(palette[foreground],palette[background])]);
for(const [foreground,background,ratio] of rows)assert(ratio>=4.5,`${foreground}/${background} ${ratio}`);
const largeDisplay=[['goldDeep','bg'],['goldDeep','panel']].map(([foreground,background])=>[foreground,background,contrast(palette[foreground],palette[background])]);
for(const [foreground,background,ratio] of largeDisplay)assert(ratio>=3,`${foreground}/${background} large display ${ratio}`);
const softOnPale=contrast(palette.inkSoft,palette.goldPale);
const deepOnPale=contrast(palette.goldDeep,palette.goldPale);
await writeFile('docs/contrast-report.md',`# Palette and contrast audit

Source of truth: \`Haddar Bijoux — Palette.html\`.

| Foreground | Background | Contrast |
|---|---|---:|
${rows.map(r=>`| ${r[0]} | ${r[1]} | ${r[2].toFixed(2)}:1 |`).join('\n')}

Large display text uses deep gold on ivory at ${largeDisplay[0][2].toFixed(2)}:1 and on white at ${largeDisplay[1][2].toFixed(2)}:1, above the 3:1 AA threshold for large text.

All combinations used for normal text meet 4.5:1. Muted ink on pale gold is ${softOnPale.toFixed(2)}:1 and deep gold on pale gold is ${deepOnPale.toFixed(2)}:1, so neither is used for small text on pale-gold surfaces. Those captions use ink. Deep gold remains available for large display text, line art, decorative rules, icons, and the accessible white-on-deep-gold hover state.

The site deliberately uses this single light palette even when the device requests dark mode. No unapproved dark palette or extra gold-text color remains.
`);
console.log('Palette matches the supplied HTML; normal text meets 4.5:1 and large display text meets 3:1.');
