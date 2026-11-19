#!/usr/bin/env node
import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';

const registry=JSON.parse(readFileSync(new URL('../src/data/noveller.json',import.meta.url),'utf8'));
if(!Array.isArray(registry.works))throw Error('Novellregistret saknar works');
const seenIds=new Set(), seenSlugs={sv:new Set(),en:new Set()};
const errors=[], published=[];
const clean=v=>typeof v==='string'?v.trim():'';
const validSlug=slug=>/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug||'');
for(const work of registry.works){
  const id=clean(work.id);
  if(!id||seenIds.has(id))errors.push('Saknat eller duplicerat ID: '+id);
  seenIds.add(id);
  if(work.type!=='novell')errors.push(id+': type måste vara novell');
  for(const lang of ['sv','en']){
    const t=work.translations?.[lang];
    if(!t||t.status!=='published')continue;
    if(!clean(t.title)||!validSlug(t.slug))errors.push(id+' ('+lang+'): titel eller slug saknas');
    if(seenSlugs[lang].has(t.slug))errors.push(id+' ('+lang+'): duplicerad slug '+t.slug);
    seenSlugs[lang].add(t.slug);
    if(!clean(t.summary)||!clean(t.meta_description))errors.push(id+' ('+lang+'): sammanfattning eller SEO-beskrivning saknas');
    if(!/^[a-z0-9][a-z0-9-]*\.webp$/.test(work.image?.path||''))errors.push(id+' ('+lang+'): giltig WebP-omslagsbild saknas');
    const chapters=Array.isArray(t.chapters)?t.chapters.filter(ch=>ch.status==='published'):[];
    if(!chapters.length)errors.push(id+' ('+lang+'): saknar publicerat kapitel');
    const chapterSlugs=new Set();
    for(const ch of chapters){
      if(!clean(ch.title)||!validSlug(ch.slug)||!clean(ch.text))errors.push(id+' ('+lang+'): ett publicerat kapitel saknar titel, slug eller text');
      if(chapterSlugs.has(ch.slug))errors.push(id+' ('+lang+'): duplicerat kapitel '+ch.slug);
      chapterSlugs.add(ch.slug);
    }
    published.push({lang,slug:t.slug,chapters,image:work.image?.path});
  }
}
if(process.argv.includes('--dist')){
  for(const n of published){
    const prefix=n.lang==='sv'?'varldar/noveller/':'en/worlds/noveller/';
    const parent='dist/'+prefix+n.slug+'/index.html';
    if(!existsSync(parent))errors.push('Saknad publicerad novellsida: '+parent);
    for(const ch of n.chapters){
      const chapter='dist/'+prefix+n.slug+'/'+ch.slug+'/index.html';
      if(!existsSync(chapter))errors.push('Saknad publicerad kapitelsida: '+chapter);
    }
    if(n.image&&!existsSync(join('dist/images',n.image)))errors.push('Saknad novellbild: '+n.image);
  }
  for(const path of ['dist/varldar/noveller/index.html','dist/en/worlds/noveller/index.html'])
    if(!existsSync(path))errors.push('Novellarkivet saknar HTML: '+path);
  for(const path of ['dist/varldar/min-bibel/index.html','dist/en/worlds/min-bibel/index.html'])
    if(existsSync(path))errors.push('Min Bibel ska inte publiceras: '+path);
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log('Novellregister OK: '+registry.works.length+' verk, '+published.length+' publicerade språkversioner. Min Bibel kontrolleras vid bygge.');
