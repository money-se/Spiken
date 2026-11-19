#!/usr/bin/env node
import {readFileSync,existsSync} from 'node:fs';
const registry=JSON.parse(readFileSync(new URL('../src/data/recensioner.json',import.meta.url),'utf8'));
if(!Array.isArray(registry.works))throw Error('Recensionsregistret saknar works');
const safe=v=>typeof v==='string'?v.trim():'';
const validSlug=v=>/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v||'');
const errors=[],ids=new Set(),slugs={sv:new Set(),en:new Set()},published=[];
for(const work of registry.works){
 const id=safe(work.id);
 if(!id||ids.has(id))errors.push('Saknat eller duplicerat ID: '+id);
 ids.add(id);
 if(work.type!=='recension')errors.push(id+': type ska vara recension');
 const rating=work.rating;
 if(rating!==undefined&&rating!==null&&(!Number.isInteger(rating)||rating<1||rating>5))errors.push(id+': betyg ska vara heltal 1–5 eller saknas');
 for(const lang of ['sv','en']){
  const t=work.translations?.[lang];
  if(t?.status!=='published')continue;
  if(!safe(t.title)||!validSlug(t.slug)||!safe(t.text))errors.push(id+' ('+lang+'): titel, slug eller recensionstext saknas');
  if(!safe(work.subject?.title))errors.push(id+' ('+lang+'): det recenserade verkets titel saknas');
  if(!safe(t.meta_description))errors.push(id+' ('+lang+'): SEO-beskrivning saknas');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(t.published_at||''))errors.push(id+' ('+lang+'): publiceringsdatum saknas');
  if(slugs[lang].has(t.slug))errors.push(id+' ('+lang+'): slug används redan');
  slugs[lang].add(t.slug);
  if(work.image?.path&&!/^[a-z0-9][a-z0-9-]*\.webp$/.test(work.image.path))errors.push(id+' ('+lang+'): ogiltig WebP-fil');
  published.push({lang,slug:t.slug,image:work.image?.path});
 }
}
if(process.argv.includes('--dist')){
 for(const path of ['dist/varldar/recensioner/index.html','dist/en/worlds/recensioner/index.html'])
  if(!existsSync(path))errors.push('Recensionsarkivet saknar HTML: '+path);
 for(const item of published){
  const prefix=item.lang==='sv'?'varldar/recensioner/':'en/worlds/recensioner/';
  if(!existsSync('dist/'+prefix+item.slug+'/index.html'))errors.push('Recensionssida saknas: '+item.slug);
  if(item.image&&!existsSync('dist/images/'+item.image))errors.push('Recensionsbild saknas: '+item.image);
 }
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log('Recensionsregister OK: '+registry.works.length+' verk, '+published.length+' publicerade språkversioner.');
