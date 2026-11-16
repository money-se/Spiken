import legacyPoems from '../data/dikter.json';
import registry from '../data/publiceringsregister.json';

/**
 * Publikt innehåll. Utelämnar uttryckligen utkast och opublicerade översättningar.
 * Behåller kompatibiliteten med det äldre src/data/dikter.json-formatet.
 */
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
      image:safe(work.image?.path),
      imageAlt:safe(localized.image_alt),
      translatedSlug:isPublished(companion) ? safe(companion.slug) : '',
    }];
  });
  if(isEnglish) return modern.sort(sortRecent);

  const known = new Set(modern.map(poem => poem.slug));
  const old = (Array.isArray(legacyPoems) ? legacyPoems : []).flatMap((d,index)=>{
    const slug=safe(d.slug), title=safe(d.titel), text=safe(d.text);
    if(!slug || !title || !text || known.has(slug)) return [];
    return [{
      id:'legacy-'+slug,slug,title,text,theme:safe(d.tema)||'Poesi',
      category:safe(d.tema),tags:[],published:safe(d.datum),
      description:excerpt(text),image:'',imageAlt:'',translatedSlug:'',
      legacyIndex:index
    }];
  });
  return [...modern,...old].sort(sortRecent);
}
function sortRecent(a,b){
  const timeA=Date.parse(a.published)||0;
  const timeB=Date.parse(b.published)||0;
  return timeB-timeA || (b.legacyIndex ?? 0)-(a.legacyIndex ?? 0);
}
export function getPoem(lang,slug) {
  return getPoems(lang).find(poem=>poem.slug===slug);
}
export function getRelatedPoems(lang,poem,limit=3) {
  return getPoems(lang).filter(other=>other.slug!==poem.slug && other.theme===poem.theme).slice(0,limit);
}
export function poemExcerpt(text,max=175){ return excerpt(text,max); }
