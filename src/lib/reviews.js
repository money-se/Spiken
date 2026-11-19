import registry from '../data/recensioner.json';
const safe=v=>typeof v==='string'?v.trim():'';
const validSlug=v=>/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v||'');
const words=v=>safe(v).split(/\s+/).filter(Boolean).length;
const excerpt=(v,max=195)=>{
 const text=safe(v).replace(/\s+/g,' ');
 return text.length>max?text.slice(0,max).replace(/\s+\S*$/,'').trim()+'…':text;
};
const ready=t=>t?.status==='published'&&safe(t.title)&&validSlug(t.slug)&&safe(t.text);
const cache=new Map();
export function getReviews(lang='sv'){
 if(cache.has(lang))return cache.get(lang);
 const works=Array.isArray(registry.works)?registry.works:[];
 const reviews=works.flatMap(work=>{
  const t=work.translations?.[lang];
  if(work.type!=='recension'||!ready(t))return [];
  const companion=work.translations?.[lang==='sv'?'en':'sv'];
  // Betyg är frivilligt. Ett oanvänt fält får inte bli ett antaget nollbetyg.
  const score=Number.isInteger(work.rating)&&work.rating>=1&&work.rating<=5?work.rating:null;
  return [{
   id:safe(work.id),slug:t.slug,title:safe(t.title),text:safe(t.text),
   subjectTitle:safe(work.subject?.title),creator:safe(work.subject?.creator),
   subjectType:safe(t.subject_type)||safe(work.subject?.type)|| (lang==='sv'?'Bok':'Book'),
   genre:safe(t.genre)||safe(work.genre),
   summary:safe(t.summary)||excerpt(t.text),description:safe(t.meta_description)||safe(t.summary)||excerpt(t.text),
   verdict:safe(t.verdict),strengths:Array.isArray(t.strengths)?t.strengths.map(safe).filter(Boolean):[],
   weaknesses:Array.isArray(t.weaknesses)?t.weaknesses.map(safe).filter(Boolean):[],
   rating:score,minutes:Math.max(1,Math.ceil(words(t.text)/190)),
   image:safe(work.image?.path)||'spiken-varld-recensioner-20261119.webp',
   imageAlt:safe(t.image_alt)||safe(t.title),
   metaTitle:safe(t.meta_title)||safe(t.title)+' – Spiken',
   published:safe(t.published_at),
   companionSlug:ready(companion)?companion.slug:''
  }];
 });
 reviews.sort((a,b)=>(b.published||'').localeCompare(a.published||'')||a.title.localeCompare(b.title,lang));
 cache.set(lang,reviews);
 return reviews;
}
export const getReview=(lang,slug)=>getReviews(lang).find(r=>r.slug===slug);
