#!/usr/bin/env node
/**
 * Läsbar redaktionell överblick. Ändrar aldrig publiceringsregistret.
 * Använd `npm run dikter:rapport` efter en större import.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const argument=process.argv.find(arg=>arg.startsWith('--registry='));
const path=argument ? resolve(argument.slice('--registry='.length)) : new URL('../src/data/publiceringsregister.json',import.meta.url);
const registry=JSON.parse(readFileSync(path,'utf8'));
if(!Array.isArray(registry.works)) throw Error('Registret saknar works-lista');

const works=registry.works.filter(work=>work.type==='dikt');
const published=works.filter(work=>work.translations?.sv?.status==='published');
const drafts=works.filter(work=>work.translations?.sv?.status!=='published');
const clean=value=>typeof value==='string'?value.trim():'';
const safeCell=value=>String(value||'').replace(/\|/g,'\\|').replace(/[\r\n]+/g,' ').slice(0,170);
const readiness=work=>{
  const sv=work.translations?.sv||{};
  const missing=[];
  if(!clean(sv.title)) missing.push('titel');
  if(!/^[a-z0-9-]+$/.test(sv.slug||'')) missing.push('giltig slug');
  if(!clean(sv.text)) missing.push('dikttext');
  if(!clean(work.category)) missing.push('kategori');
  if(!Array.isArray(work.tags)||!work.tags.length) missing.push('taggar');
  if(!clean(sv.meta_title)) missing.push('SEO-titel');
  if(!clean(sv.meta_description)) missing.push('metabeskrivning');
  if(!/^[a-z0-9][a-z0-9-]*\.webp$/.test(work.image?.path||'')) missing.push('godkänd bild');
  if(!clean(sv.image_alt)) missing.push('bildbeskrivning');
  return missing;
};

const lines=[
  '# Spiken – redaktionell kö',
  '',
  '> Rapporten är endast en översikt. Inget publiceras eller godkänns automatiskt.',
  '',
  '- Registrerade dikter: **'+works.length+'**',
  '- Publicerade på svenska: **'+published.length+'**',
  '- Utkast på svenska: **'+drafts.length+'**',
  '- Utkast med komplett metadata (kräver ändå redaktionellt godkännande): **'+drafts.filter(w=>!readiness(w).length).length+'**',
  '',
  '## Svenska dikter att granska',
  '',
  '| ID | Titel | Kategori | Kvar att förbereda |',
  '| --- | --- | --- | --- |'
];
for(const work of drafts){
  const missing=readiness(work);
  lines.push('| '+safeCell(work.id)+' | '+safeCell(work.translations?.sv?.title)+' | '+safeCell(work.category||'Ej vald')+' | '+safeCell(missing.length?missing.join(', '):'Metadata klar – kräver godkännande')+' |');
}
if(!drafts.length)lines.push('| – | Inga väntande utkast | – | – |');
lines.push('','## Före publicering','','1. Läs och godkänn originaldikten och eventuella känsliga detaljer.','2. Kontrollera kategori, ämnesord och SEO-beskrivningar.','3. Kontrollera och godkänn bildfil, alt-text och bildpaket.','4. Publicera bara uttryckligen godkända dikter och ange faktiskt publiceringsdatum.','5. Kontrollera att GitHub Pages-bygget lyckades.','');
process.stdout.write(lines.join('\n'));
