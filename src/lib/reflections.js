import registry from '../data/reflektioner.json';

const safe=value=>typeof value==='string'?value.trim():'';
const slugOK=value=>/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value||'');
const words=text=>safe(text).split(/\s+/).filter(Boolean).length;
const excerpt=(text,max=180)=>{
 const value=safe(text).replace(/\s+/g,' ');
 return value.length>max?value.slice(0,max).replace(/\s+\S*$/,'').trim()+'…':value;
};
const cache=new Map();
export function getReflections(lang='sv'){
 if(cache.has(lang))return cache.get(lang);
 const works=Array.isArray(registry.works)?registry.works:[];
 const result=works.flatMap(work=>{
  if(work.type!=='reflektion')return [];
  const t=work.translations?.[lang];
  if(t?.status!=='published'||!safe(t.title)||!slugOK(t.slug)||!safe(t.text))return [];
  const companion=work.translations?.[lang==='sv'?'en':'sv'];
  const companionOK=companion?.status==='published'&&slugOK(companion.slug)&&safe(companion.title)&&safe(companion.text);
  return [{
   id:safe(work.id),slug:t.slug,title:safe(t.title),text:safe(t.text),
   topic:safe(t.topic)||safe(work.topic)|| (lang==='sv'?'Livsfrågor':'Life'),
   tags:Array.isArray(work.tags)?work.tags.map(safe).filter(Boolean):[],
   description:safe(t.meta_description)||excerpt(t.text),
   summary:safe(t.summary)||excerpt(t.text),
   metaTitle:safe(t.meta_title)||safe(t.title)+' – Spiken',
   published:safe(t.published_at),minutes:Math.max(1,Math.ceil(words(t.text)/190)),
   image:safe(work.image?.path)||'spiken-varld-reflektioner-20261119.webp',
   imageAlt:safe(t.image_alt)||safe(t.title),
   companionSlug:companionOK?companion.slug:''
  }];
 });
 result.sort((a,b)=>(b.published||'').localeCompare(a.published||'')||a.title.localeCompare(b.title,lang));
 cache.set(lang,result);
 return result;
}
export const getReflection=(lang,slug)=>getReflections(lang).find(item=>item.slug===slug);
export const getRelatedReflections=(lang,item,limit=3)=>getReflections(lang)
 .filter(x=>x.slug!==item.slug)
 .map((x,index)=>({x,index,score:(x.topic===item.topic?3:0)+x.tags.filter(tag=>item.tags.includes(tag)).length*2}))
 .sort((a,b)=>b.score-a.score||a.index-b.index)
 .slice(0,limit).map(v=>v.x);
