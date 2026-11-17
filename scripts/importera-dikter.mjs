#!/usr/bin/env node
/**
 * Spiken – importera rena .txt/.md-filer till publiceringsregistret.
 * Säker grundregel: nya språkversioner importeras ENDAST som draft.
 * Kör: npm run dikter:importera (eller npm run dikter:kontrollera)
 */
import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { join, resolve, extname, basename } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const inputDir = join(root, 'textbank', 'inkorg');
const registerFile = join(root, 'src', 'data', 'publiceringsregister.json');
const dryRun = process.argv.includes('--dry-run');
const normalize = value => String(value || '').trim().toLocaleLowerCase('sv');
const slugify = value => normalize(value)
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/å/g,'a').replace(/ä/g,'a').replace(/ö/g,'o')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);

function extract(file, content) {
  const lines = content.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split('\n');
  // Tillåt första rubrikraden "Titel" eller "# Titel" (Markdown).
  const first = lines.findIndex(line => line.trim().length > 0);
  if (first < 0) throw new Error('Filen är tom');
  const title = lines[first].trim().replace(/^#\s+/, '').trim();
  const text = lines.slice(first+1).join('\n').replace(/^\n+|\n+$/g, '');
  if (title.length < 2 || title.length > 170) throw new Error('Titeln måste vara 2–170 tecken');
  if (!text.trim()) throw new Error('Ingen dikttext efter titeln');
  if (text.length > 150000) throw new Error('Dikten är oväntat lång');
  const slug = slugify(title);
  if (!slug) throw new Error('Rubriken kan inte användas som URL');
  return {title, text, slug, file};
}
function nextId(works) {
  const numbers = works.map(w => /^spiken-(\d+)$/.exec(w.id || ''))
    .filter(Boolean).map(match=>Number(match[1]));
  return Math.max(0, ...numbers) + 1;
}
const result = {imported:[], skipped:[], errors:[]};
await mkdir(inputDir, {recursive:true});
const registry = JSON.parse(await readFile(registerFile, 'utf8'));
if (!Array.isArray(registry.works)) throw new Error('Registret saknar works-array');
const sourceFiles = (await readdir(inputDir)).filter(name=>['.txt','.md'].includes(extname(name).toLowerCase())).sort((a,b)=>a.localeCompare(b,'sv'));
const knownSlugs = new Set();
const knownOriginals = new Set();
for (const work of registry.works) {
  for (const locale of Object.values(work.translations || {})) {
    if (locale?.slug) knownSlugs.add(normalize(locale.slug));
  }
  if (work.original_language === 'sv' && typeof work.original_text === 'string') knownOriginals.add(normalize(work.original_text.replace(/\r\n?/g,'\n')));
}
let counter = nextId(registry.works);
for (const file of sourceFiles) {
  try {
    const parsed = extract(file, await readFile(join(inputDir,file),'utf8'));
    if (knownOriginals.has(normalize(parsed.text))) {
      result.skipped.push(file + ': originaltexten finns redan'); continue;
    }
    if (knownSlugs.has(normalize(parsed.slug))) {
      result.skipped.push(file + ': titeln/URL:en används redan ('+parsed.slug+')'); continue;
    }
    const id = 'spiken-'+String(counter++).padStart(6,'0');
    registry.works.push({
      id, type:'dikt', channel:'under-huden', category:'', tags:[],
      original_language:'sv', original_text:parsed.text,
      image:{path:null,credit:null},
      translations:{
        sv:{
          title:parsed.title, slug:parsed.slug, text:parsed.text,
          meta_title:parsed.title+' – Spiken',
          meta_description:'', image_alt:'',
          status:'draft', published_at:null
        },
        en:{
          title:'',slug:'',text:'',meta_title:'',meta_description:'',
          image_alt:'',status:'draft',published_at:null
        }
      }
    });
    knownSlugs.add(normalize(parsed.slug));
    knownOriginals.add(normalize(parsed.text));
    result.imported.push(file+' → '+id+' ('+parsed.slug+')');
  } catch(error) {
    result.errors.push(file+': '+error.message);
  }
}
if (!dryRun && result.imported.length) {
  await writeFile(registerFile, JSON.stringify(registry,null,2)+'\n','utf8');
}
console.log(dryRun ? 'FÖRHANDSGRANSKNING – inga filer ändrade' : 'IMPORT RESULTAT');
console.log('Textfiler funna:', sourceFiles.length);
console.log('Nya utkast:', result.imported.length);
for(const message of result.imported) console.log('  +',message);
for(const message of result.skipped) console.log('  =',message);
for(const message of result.errors) console.error('  !',message);
console.log('Obs: nya dikter är UTKAST. Inget publiceras utan manuell godkänd språkversion.');
if (result.errors.length) process.exitCode=1;
