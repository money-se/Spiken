#!/usr/bin/env node
/**
 * Spikens textbank.
 * En fil per dikt eller en samlingsfil med === DIKT === mellan dikterna.
 * Alla poster importeras som UTKAST, aldrig direkt som publicerade.
 */
import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { join, resolve, extname } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const inbox = join(root, 'textbank', 'inkorg');
const registerFile = join(root, 'src', 'data', 'publiceringsregister.json');
const dryRun = process.argv.includes('--dry-run');
const normalize = value => String(value || '').trim().toLocaleLowerCase('sv');
const normalizeText = value => normalize(String(value || '').replace(/\r\n?/g, '\n'));
const slugify = value => normalize(value)
  .replace(/å/g,'a').replace(/ä/g,'a').replace(/ö/g,'o')
  .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g,'').slice(0,80).replace(/-$/,'');
const separator = /^===\s*DIKT\s*===$/i;

function parsePoem(source, raw) {
  const lines = raw.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split('\n');
  const first = lines.findIndex(line=>line.trim());
  if (first < 0) throw Error('Tom dikt');
  const title = lines[first].trim().replace(/^#\s+/,'').trim();
  const text = lines.slice(first+1).join('\n').replace(/^\n+|\n+$/g,'');
  if (title.length < 2 || title.length > 170) throw Error('Titeln måste ha 2–170 tecken');
  if (!text.trim()) throw Error('Ingen dikttext efter titeln');
  if (text.length > 150000) throw Error('Dikttexten är för lång för en post');
  const slug = slugify(title);
  if (!slug) throw Error('Titeln kan inte bli en URL');
  // Om filen innehåller flera rubriker utan avgränsare: stoppa hellre än feltolka.
  if (lines.slice(first+1).some(line=>/^#{1,2}\s+\S/.test(line))) {
    throw Error('Flera Markdown-rubriker utan === DIKT ===; kontrollera gränserna');
  }
  return {source,title,text,slug};
}
function parseFile(file, content) {
  const normalized = content.replace(/^\uFEFF/,'').replace(/\r\n?/g,'\n');
  const lines = normalized.split('\n');
  const malformed = lines.map((line,i)=>({line:line.trim(),number:i+1})).filter(x=>/^={2,}\s*DIKT\s*={1,}\s*$/i.test(x.line) && !separator.test(x.line));
  if (malformed.length) throw Error('Felaktig diktavgränsare på rad '+malformed.map(x=>x.number).join(', ')+'. Använd exakt === DIKT ===');
  const sections = []; let current = []; let hasSeparator = false;
  for (const line of lines) {
    if (separator.test(line.trim())) {
      hasSeparator = true;
      if (current.some(x=>x.trim())) sections.push(current.join('\n'));
      current=[];
    } else current.push(line);
  }
  if (current.some(x=>x.trim())) sections.push(current.join('\n'));
  if (!sections.length) throw Error('Filen innehåller inga dikter');
  if (!hasSeparator && /^\s*===/m.test(normalized)) throw Error('Okänd avgränsare. Använd exakt === DIKT ===');
  return sections.map((part,index)=>parsePoem(file+(hasSeparator ? ' #'+(index+1) : ''),part));
}
function nextId(works) {
  return Math.max(0,...works.map(w=>/^spiken-(\d+)$/.exec(w.id||'')).filter(Boolean).map(m=>Number(m[1])))+1;
}
const result={imported:[],skipped:[],errors:[],poems:0,files:0};
await mkdir(inbox,{recursive:true});
const registry=JSON.parse(await readFile(registerFile,'utf8'));
if(!Array.isArray(registry.works)) throw Error('Registret saknar works-array');
const filenames=(await readdir(inbox)).filter(name=>['.txt','.md'].includes(extname(name).toLowerCase())).sort((a,b)=>a.localeCompare(b,'sv'));
result.files=filenames.length;
const knownSlugs=new Set(), knownTexts=new Set();
for(const work of registry.works){
  for(const t of Object.values(work.translations||{})) if(t?.slug)knownSlugs.add(normalize(t.slug));
  if(work.original_language==='sv' && typeof work.original_text==='string') knownTexts.add(normalizeText(work.original_text));
}
let next=nextId(registry.works);
for(const file of filenames){
  let entries;
  try{ entries=parseFile(file,await readFile(join(inbox,file),'utf8')); }
  catch(error){ result.errors.push(file+': '+error.message); continue; }
  result.poems+=entries.length;
  // All-or-nothing per file if one section is malformed.
  for(const entry of entries){
    if(knownTexts.has(normalizeText(entry.text))) { result.skipped.push(entry.source+': originaltexten finns redan'); continue; }
    if(knownSlugs.has(normalize(entry.slug))) { result.skipped.push(entry.source+': URL upptagen ('+entry.slug+')'); continue; }
    const id='spiken-'+String(next++).padStart(6,'0');
    registry.works.push({
      id,type:'dikt',channel:'under-huden',category:'',tags:[],
      original_language:'sv',original_text:entry.text,
      image:{path:null,credit:null},
      translations:{
        sv:{title:entry.title,slug:entry.slug,text:entry.text,
          meta_title:entry.title+' – Spiken',meta_description:'',image_alt:'',
          status:'draft',published_at:null},
        en:{title:'',slug:'',text:'',meta_title:'',meta_description:'',image_alt:'',
          status:'draft',published_at:null}
      }
    });
    knownSlugs.add(normalize(entry.slug));knownTexts.add(normalizeText(entry.text));
    result.imported.push(entry.source+' → '+id+' ('+entry.slug+')');
  }
}
console.log(dryRun?'FÖRHANDSGRANSKNING – inga ändringar':'IMPORT AV TEXTBANK');
console.log('Filer:',result.files,'Identifierade dikter:',result.poems,'Nya utkast:',result.imported.length);
for(const s of result.imported)console.log('  +',s);
for(const s of result.skipped)console.log('  =',s);
for(const s of result.errors)console.error('  !',s);
// Vid ett enda fel skrivs INGENTING, för att undvika delvis importerade samlingar.
if(result.errors.length){
  console.error('Import avbruten: korrigera fel innan några ändringar sparas.');
  process.exitCode=1;
} else if(!dryRun && result.imported.length){
  await writeFile(registerFile,JSON.stringify(registry,null,2)+'\n','utf8');
}
console.log('Alla nya dikter förblir UTKAST. Ingen automatisk publicering.');
