import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, cp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

test('importerar flera utkast utan att ändra befintlig publicerad dikt', async () => {
  const root = await mkdtemp(join(tmpdir(), 'spiken-import-'));
  try {
    await mkdir(join(root,'scripts'), {recursive:true});
    await mkdir(join(root,'textbank','inkorg'), {recursive:true});
    await mkdir(join(root,'src','data'), {recursive:true});
    await cp(new URL('./importera-dikter.mjs',import.meta.url),join(root,'scripts','importera-dikter.mjs'));
    const original = {version:2,works:[{
      id:'spiken-000001',type:'dikt',original_language:'sv',original_text:'Originaltexten',
      translations:{sv:{title:'Befintlig',slug:'befintlig',text:'Originaltexten',status:'published',published_at:'2026-11-16'}}
    }]};
    const registryPath = join(root,'src','data','publiceringsregister.json');
    await writeFile(registryPath,JSON.stringify(original));
    await writeFile(join(root,'textbank','inkorg','a.txt'),'En ny dikt\n\nRad ett\nRad två');
    await writeFile(join(root,'textbank','inkorg','b.md'),'# En annan dikt\n\nFörsta strofen\n\nAndra strofen');
    const script=join(root,'scripts','importera-dikter.mjs');
    const preview=execFileSync(process.execPath,[script,'--dry-run'],{encoding:'utf8'});
    assert.match(preview,/Nya utkast: 2/);
    assert.equal((JSON.parse(await readFile(registryPath,'utf8'))).works.length,1);
    execFileSync(process.execPath,[script]);
    const after=JSON.parse(await readFile(registryPath,'utf8'));
    assert.equal(after.works.length,3);
    assert.deepEqual(after.works[0],original.works[0]);
    assert.equal(after.works[1].translations.sv.status,'draft');
    assert.equal(after.works[2].translations.en.status,'draft');
    assert.equal(after.works[2].original_text,'Första strofen\n\nAndra strofen');
    execFileSync(process.execPath,[script]);
    assert.equal((JSON.parse(await readFile(registryPath,'utf8'))).works.length,3);
  } finally { await rm(root,{recursive:true,force:true}); }
});


test('samling.txt med flera dikter importeras som separata utkast, med bevarade strofer',async()=>{
 const root=await mkdtemp(join(tmpdir(),'spiken-samling-'));
 try {
  await mkdir(join(root,'scripts'),{recursive:true});
  await mkdir(join(root,'textbank','inkorg'),{recursive:true});
  await mkdir(join(root,'src','data'),{recursive:true});
  await cp(new URL('./importera-dikter.mjs',import.meta.url),join(root,'scripts','importera-dikter.mjs'));
  const reg=join(root,'src','data','publiceringsregister.json');
  await writeFile(reg,JSON.stringify({version:2,works:[]}));
  const body='=== DIKT ===\nFörsta dikten\n\nRad ett\n\nRad två\n\n=== DIKT ===\nÖver havet\n\nJag väntar\nI natt\n\n=== DIKT ===\nSista dikten\n\nTredje texten\n';
  await writeFile(join(root,'textbank','inkorg','samling.txt'),body);
  const script=join(root,'scripts','importera-dikter.mjs');
  const preview=execFileSync(process.execPath,[script,'--dry-run'],{encoding:'utf8'});
  assert.match(preview,/Identifierade dikter: 3 Nya utkast: 3/);
  assert.equal((JSON.parse(await readFile(reg,'utf8'))).works.length,0);
  execFileSync(process.execPath,[script]);
  const works=(JSON.parse(await readFile(reg,'utf8'))).works;
  assert.equal(works.length,3);
  assert.deepEqual(works.map(w=>w.translations.sv.slug),['forsta-dikten','over-havet','sista-dikten']);
  assert.equal(works[0].original_text,'Rad ett\n\nRad två');
  assert.ok(works.every(w=>w.translations.sv.status==='draft' && w.translations.en.status==='draft'));
  execFileSync(process.execPath,[script]);
  assert.equal((JSON.parse(await readFile(reg,'utf8'))).works.length,3);
 }finally{await rm(root,{recursive:true,force:true})}
});

test('felaktig dikt i samlingen avbryter hela importen',async()=>{
 const root=await mkdtemp(join(tmpdir(),'spiken-fel-'));
 try {
  await mkdir(join(root,'scripts'),{recursive:true});
  await mkdir(join(root,'textbank','inkorg'),{recursive:true});
  await mkdir(join(root,'src','data'),{recursive:true});
  await cp(new URL('./importera-dikter.mjs',import.meta.url),join(root,'scripts','importera-dikter.mjs'));
  const reg=join(root,'src','data','publiceringsregister.json');
  const data=JSON.stringify({version:2,works:[]});
  await writeFile(reg,data);
  await writeFile(join(root,'textbank','inkorg','samling.txt'),'=== DIKT ===\nBra dikt\n\nText\n=== DIKT ===\nTrasig dikt\n');
  let thrown=false;
  try{execFileSync(process.execPath,[join(root,'scripts','importera-dikter.mjs')],{stdio:'pipe'})}catch{thrown=true}
  assert.equal(thrown,true);
  assert.equal(await readFile(reg,'utf8'),data);
 }finally{await rm(root,{recursive:true,force:true})}
});
