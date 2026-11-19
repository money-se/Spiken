import legacyPoems from '../data/dikter.json';
import registry from '../data/publiceringsregister.json';

/**
 * Publikt innehåll. Utelämnar uttryckligen utkast och opublicerade översättningar.
 * Behåller kompatibiliteten med det äldre src/data/dikter.json-formatet.
 */
// Under Astro-bygget används samma publicerade samling för många statiska sidor.
const poemCache = new Map();
const poemLookupCache = new Map();

const categories = {
  karlek:'Kärlek', langtan:'Längtan', begar:'Begär',
  hjartesorg:'Hjärtesorg', saknad:'Saknad', sarbarhet:'Sårbarhet',
  existens:'Existens', sorg:'Sorg', ensamhet:'Ensamhet'
};
const safe = value => typeof value === 'string' ? value.trim() : '';
const excerpt = (text, max = 175) => {
  const plain = safe(text).replace(/\s+/g,' ');
  return plain.length > max ? plain.slice(0,max).replace(/\s+\S*$/,'').trim() + '…' : plain;
};
const isPublished = translation =>
  translation && translation.status === 'published' &&
  safe(translation.title) && safe(translation.slug) && safe(translation.text);

export function getPoems(lang = 'sv') {
  if(poemCache.has(lang)) return poemCache.get(lang);
  const isEnglish = lang === 'en';
  const works = Array.isArray(registry.works) ? registry.works : [];
  const modern = works.flatMap(work => {
    if (work.type !== 'dikt' || !isPublished(work.translations?.[lang])) return [];
    const localized = work.translations[lang];
    const companion = work.translations[isEnglish ? 'sv' : 'en'];
    return [{
      id:safe(work.id) || safe(localized.slug),
      slug:safe(localized.slug),
      title:safe(localized.title),
      text:safe(localized.text),
      theme:isEnglish
        ? ({karlek:'Love',langtan:'Longing',begar:'Desire',hjartesorg:'Heartbreak',saknad:'Missing',sarbarhet:'Vulnerability',existens:'Existence'}[work.category] || safe(work.category) || 'Poetry')
        : (categories[work.category] || safe(work.category) || 'Poesi'),
      category:safe(work.category),
      tags:Array.isArray(work.tags) ? work.tags.map(safe).filter(Boolean) : [],
      published:safe(localized.published_at),
      description:safe(localized.meta_description) || excerpt(localized.text),
      metaTitle:safe(localized.meta_title) || (safe(localized.title)+' – Spiken'),
      image:safe(work.image?.path),
      imageAlt:safe(localized.image_alt),
      translatedSlug:isPublished(companion) ? safe(companion.slug) : '',
    }];
  });
  if(isEnglish){
    const published = modern.sort(sortRecent);
    poemCache.set(lang,published);
    return published;
  }

  const known = new Set(modern.map(poem => poem.slug));
  const old = (Array.isArray(legacyPoems) ? legacyPoems : []).flatMap((d,index)=>{
    const slug=safe(d.slug), title=safe(d.titel), text=safe(d.text);
    if(!slug || !title || !text || known.has(slug)) return [];
    return [{
      id:'legacy-'+slug,slug,title,text,theme:safe(d.tema)||'Poesi',
      category:safe(d.tema),tags:[],published:safe(d.datum),
      description:excerpt(text),metaTitle:title+' – Spiken',image:'',imageAlt:'',translatedSlug:'',
      legacyIndex:index
    }];
  });
  const published = [...modern,...old].sort(sortRecent);
  poemCache.set(lang,published);
  return published;
}
function sortRecent(a,b){
  const timeA=Date.parse(a.published)||0;
  const timeB=Date.parse(b.published)||0;
  return timeB-timeA || (b.legacyIndex ?? 0)-(a.legacyIndex ?? 0);
}
export function getPoem(lang,slug) {
  if(!poemLookupCache.has(lang)){
    poemLookupCache.set(lang,new Map(getPoems(lang).map(poem=>[poem.slug,poem])));
  }
  return poemLookupCache.get(lang).get(slug);
}

/**
 * Föreslå publicerade dikter efter gemensamma ämnesord och känslokategori.
 * Fyll på med andra dikter när kategorin är liten. Undvik samma dikt.
 * Slump används inte här, så rekommendationerna är stabila för statisk SEO.
 */
export function getRelatedPoems(lang,poem,limit=3) {
  if(limit<=0) return [];
  const tags = new Set((poem.tags||[]).map(tag=>tag.toLocaleLowerCase(lang)));
  const candidates = getPoems(lang).filter(other=>other.slug!==poem.slug);
  const scored = candidates.map((other,index)=>{
    const matchingTags = (other.tags||[]).filter(tag=>tags.has(tag.toLocaleLowerCase(lang))).length;
    const matchingCategory = Boolean(poem.category && other.category && poem.category===other.category);
    return {other,index,score:matchingTags*4+(matchingCategory?3:0)};
  });
  // Samlingens ursprungliga nyaste-först-ordning är tie-breaker.
  scored.sort((a,b)=>b.score-a.score || a.index-b.index);
  return scored.slice(0,limit).map(item=>item.other);
}
export function poemExcerpt(text,max=175){ return excerpt(text,max); }
