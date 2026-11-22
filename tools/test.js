const fs=require('fs'),vm=require('vm');
const S='src/';
const data=['core.js','mathe.js','eng.js','deu.js'].map(f=>fs.readFileSync(S+f,'utf8')).join('\n');
const tail=`
const _all=[];
for(const L of [MATHE,ENG,DEU])for(const c of L)for(const t of c.tp)_all.push(t);
module.exports={_all,G,checkAns,ansText:(q)=>{let a=Array.isArray(q.a)?q.a[0]:q.a;if(q.kind==='num')return fmt(a);a=String(a);if(q.rest)a=a.replace('r',' R ');return a},solveExpr,fmt};
`;
const m={exports:{}};vm.runInNewContext('(function(module){'+data+tail+'})(m)',{m,console,Math,Number,String,Array,Object,JSON,RegExp,isFinite});
const {_all,checkAns,ansText,solveExpr}=m.exports;
let bad=0,cnt=0;const fail=(...a)=>{bad++;if(bad<40)console.log('FAIL',...a)};
const ids=new Set();
for(const t of _all){ if(ids.has(t.id))fail('dup id',t.id);ids.add(t.id);
  if(!t.s||!t.s.length)fail('no slides',t.id);
  const g=t.vgen||(t.gen&&m.exports.G[t.gen]); if(t.gen&&!m.exports.G[t.gen])fail('missing gen',t.id,t.gen);
  const qs=[];if(g)for(let i=0;i<400;i++){try{qs.push(g())}catch(e){fail('gen throws',t.id,e.message);break}}
  for(const q of (t.ex||[]))qs.push(q);
  for(const q of qs){cnt++;
    const txt=JSON.stringify(q);if(/undefined|NaN|Infinity/.test(txt))fail('bad text',t.id,txt.slice(0,150));
    const ans=ansText(q);
    if(checkAns(q,ans)!==true)fail('own answer rejected',t.id,JSON.stringify(q.q).slice(0,80),'->',ans);
    if(q.kind==='choice'&&!q.opts.includes(String(Array.isArray(q.a)?q.a[0]:q.a)))fail('opts miss answer',t.id,q.a,q.opts);
    if(q.kind==='choice'&&new Set(q.opts).size!==q.opts.length)fail('dup opts',t.id,q.opts);
    if(q.kind==='num'&&checkAns(q,'abc')!==false)fail('abc accepted',t.id);
    if(q.kind==='num'&&checkAns(q,String(Number(Array.isArray(q.a)?q.a[0]:q.a)+1))===true)fail('wrong accepted',t.id,q.a);
  }
}
console.log('topics',_all.length,'questions checked',cnt,'failures',bad);
for(const e of ['345 + 278','1203 − 457','47 · 6','156 : 12','3 + 4 · 5','(3 + 4) · 5','3/4 von 20','teiler 36','4372 runden auf 100','48 · 11','2,5 + 1,25','7 : 0','foo','12-5','1000 - 1','(2+3)*(4+1)']){
  const r=solveExpr(e);console.log(e,'=>',r.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').slice(0,140));}
