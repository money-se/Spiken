#!/usr/bin/env node
import {readFileSync,existsSync} from 'node:fs';
const registry=JSON.parse(readFileSync(new URL('../src/data/reflektioner.json',import.meta.url),'utf8'));
if(!Array.isArray(registry.works))throw Error('Reflektionsregistret saknar works');
const clean=value=>typeof value==='string'?value.trim():'';
const validSlug=value=>/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value||'');
const errors=[],ids=new Set(),slugs={sv:new Set(),en:new Set()},published=[];
for(const work of registry.works){
 const id=clean(work.id);
 if(!id||ids.has(id))errors.push('Saknat eller duplicerat reflektions-ID: '+id);
 ids.add(id);
 if(work.type!=='reflektion')errors.push(id+': type ska vara reflektion');
 for(const lang of ['sv','en']){
  const t=work.translations?.[lang];
  if(t?.status!=='published')continue;
  if(!clean(t.title)||!validSlug(t.slug)||!clean(t.text))errors.push(id+' ('+lang+'): titel, slug eller text saknas');
  if(slugs[lang].has(t.slug))errors.push(id+' ('+lang+'): duplicerad slug '+t.slug);
  slugs[lang].add(t.slug);
  if(!clean(t.meta_description)||!clean(t.topic))errors.push(id+' ('+lang+'): SEO-beskrivning eller ämne saknas');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(t.published_at||''))errors.push(id+' ('+lang+'): giltigt publiceringsdatum saknas');
  if(work.image?.path&&!/^[a-z0-9][a-z0-9-]*\.webp$/.test(work.image.path))errors.push(id+' ('+lang+'): ogiltigt WebP-omslag');
  published.push({lang,slug:t.slug,image:work.image?.path});
 }
}
if(process.argv.includes('--dist')){
 for(const path of ['dist/varldar/reflektioner/index.html','dist/en/worlds/reflektioner/index.html'])
  if(!existsSync(path))errors.push('Reflektionsarkivet saknar HTML: '+path);
 for(const item of published){
  const dir=item.lang==='sv'?'varldar/reflektioner/':'en/worlds/reflektioner/';
  if(!existsSync('dist/'+dir+item.slug+'/index.html'))errors.push('Reflektionssida saknas: '+item.slug);
  if(item.image&&!existsSync('dist/images/'+item.image))errors.push('Reflektionsbild saknas: '+item.image);
 }
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log('Reflektionsregister OK: '+registry.works.length+' verk, '+published.length+' publicerade språkversioner.');
