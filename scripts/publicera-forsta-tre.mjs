#!/usr/bin/env node
/**
 * Publicerar ENDAST de tre i förväg godkända dikterna när tillhörande ZIP
 * har kontrollerats av GitHub Actions. Ändrar aldrig originaltexter.
 */
import { readFile,writeFile } from 'node:fs/promises';
const register=new URL('../src/data/publiceringsregister.json',import.meta.url);
const targets=new Map([
 ['spiken-000002','dikt-i-din-sotma.webp'],
 ['spiken-000005','dikt-under-ditt-sken.webp'],
 ['spiken-000019','dikt-vid-brytgransen-mellan-tid-och-rum.webp']
]);
const data=JSON.parse(await readFile(register,'utf8'));
const date=process.env.SPIKEN_PUBLICATION_DATE;
if(!/^\d{4}-\d{2}-\d{2}$/.test(date||'') || Number.isNaN(Date.parse(date)))throw Error('Ogiltigt publiceringsdatum');
if(!Array.isArray(data.works))throw Error('Ogiltigt diktregister');
for(const [id,image] of targets){
 const entries=data.works.filter(w=>w.id===id);
 if(entries.length!==1)throw Error('Saknad eller duplicerad dikt: '+id);
 const work=entries[0];
 const sv=work.translations?.sv;
 if(work.image?.path!==image || !sv?.title || !sv?.slug || !sv?.text ||
    !sv.meta_title || !sv.meta_description || !sv.image_alt)throw Error('Ofärdig dikt: '+id);
 if(sv.status!=='draft' && sv.status!=='published')throw Error('Oväntad status: '+id);
 if(sv.status==='published' && !sv.published_at)throw Error('Publicerad utan datum: '+id);
 if(work.original_text!==sv.text)throw Error('Originalet skiljer sig från svensk text: '+id);
}
for(const w of data.works){
 if(!targets.has(w.id))continue;
 const sv=w.translations.sv;
 if(sv.status==='draft'){sv.status='published';sv.published_at=date;}
 console.log(w.id,sv.title,sv.status,sv.published_at);
}
await writeFile(register,JSON.stringify(data,null,2)+'\n');
