import registry from '../data/noveller.json';

// Publicera aldrig utkast. Både språkversion och enskilda kapitel måste ha
// status "published". Översättningar och kapitel är oberoende per språk.
const safe=value=>typeof value==='string'?value.trim():'';
const validSlug=value=>/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value||'');
export const novelExcerpt=(text,max=180)=>{
  const clean=safe(text).replace(/\s+/g,' ');
  return clean.length>max?clean.slice(0,max).replace(/\s+\S*$/,'').trim()+'…':clean;
};
export const readingMinutes=text=>Math.max(1,Math.ceil(safe(text).split(/\s+/).filter(Boolean).length/190));
const cache=new Map();
export function getNovels(lang='sv'){
  if(cache.has(lang))return cache.get(lang);
  const works=Array.isArray(registry.works)?registry.works:[];
  const novels=works.flatMap(work=>{
    const localized=work.translations?.[lang];
    if(work.type!=='novell'||localized?.status!=='published'||!safe(localized.title)||!validSlug(localized.slug))return [];
    const chapters=(Array.isArray(localized.chapters)?localized.chapters:[])
      .filter(ch=>ch.status==='published' && safe(ch.title) && validSlug(ch.slug) && safe(ch.text))
      .map((ch,index)=>({
        number:index+1,slug:ch.slug,title:safe(ch.title),text:safe(ch.text),
        description:safe(ch.description)||novelExcerpt(ch.text),
        minutes:readingMinutes(ch.text)
      }));
    // Utan minst ett godkänt kapitel finns ingen publicerbar novell.
    if(!chapters.length)return [];
    const companion=work.translations?.[lang==='sv'?'en':'sv'];
    const companionReady=companion?.status==='published' && validSlug(companion.slug) &&
      (companion.chapters||[]).some(ch=>ch.status==='published' && safe(ch.title) && validSlug(ch.slug) && safe(ch.text));
    return [{
      id:safe(work.id),slug:localized.slug,title:safe(localized.title),
      genre:safe(localized.genre)||safe(work.genre)|| (lang==='sv'?'Skönlitteratur':'Fiction'),
      summary:safe(localized.summary)||novelExcerpt(chapters[0].text),
      description:safe(localized.meta_description)||safe(localized.summary)||novelExcerpt(chapters[0].text),
      metaTitle:safe(localized.meta_title)||safe(localized.title)+' – Spiken',
      cover:safe(work.image?.path),coverAlt:safe(localized.image_alt)||safe(localized.title),
      published:safe(localized.published_at),chapters,
      minutes:chapters.reduce((sum,ch)=>sum+ch.minutes,0),
      companionSlug:companionReady?companion.slug:''
    }];
  });
  novels.sort((a,b)=>(b.published||'').localeCompare(a.published||'')||a.title.localeCompare(b.title,lang));
  cache.set(lang,novels);
  return novels;
}
export const getNovel=(lang,slug)=>getNovels(lang).find(novel=>novel.slug===slug);
