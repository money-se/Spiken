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
