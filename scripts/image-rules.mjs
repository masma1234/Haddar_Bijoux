// Publishing rules for every image in src/data/images.ts: both alt texts, a credit and a rights statement with no
// [CONFIRMER] marker, and FR/AR captions on real photographs. Used by the build gate and by its test.
export function imageProblems(list){
 const out=[];
 for(const i of list){
  const id=i.id||'(no id)';
  if(!i.alt?.fr?.trim()||!i.alt?.ar?.trim())out.push(id+': both alt translations are required');
  if(!i.credit?.trim()||!i.rights?.trim()||/CONFIRMER/.test((i.credit||'')+(i.rights||'')))out.push(id+': a confirmed credit and rights statement are required');
  if(i.source==='photo'&&(!i.caption?.fr?.trim()||!i.caption?.ar?.trim()))out.push(id+': a real photograph needs FR and AR captions');
 }
 return out;
}
