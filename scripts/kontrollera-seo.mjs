#!/usr/bin/env node
// Build-time SEO regression checks for Spiken's published Swedish and English pages.
import {readFileSync,existsSync,readdirSync} from 'node:fs';
const registry=JSON.parse(readFileSync('src/data/publiceringsregister.json','utf8'));
const origin=(process.env.SPIKEN_SITE_URL||'https://money-se.github.io').replace(/\/$/,'');
const base=(process.env.SPIKEN_BASE_PATH||(process.env.SPIKEN_SITE_URL?'/':'/Spiken')).replace(/\/$/,'');
const sitePath=path=>new URL(base+path,origin).toString();
const errors=[];
const sitemapFiles=readdirSync('dist').filter(name=>/^sitemap-\d+\.xml$/.test(name));
if(!sitemapFiles.length)errors.push('No generated sitemap content XML files');
const xml=sitemapFiles.map(file=>readFileSync('dist/'+file,'utf8')).join('\n');
const urlInSitemap=url=>xml.includes('<loc>'+url+'</loc>');
function checkPage(file,path,alternate){
 if(!existsSync(file)){errors.push('Missing HTML: '+file);return;}
 const html=readFileSync(file,'utf8');
 const url=sitePath(path);
 if(!html.includes('rel="canonical" href="'+url+'"'))errors.push('Canonical mismatch: '+path+' expected '+url+' actual '+(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]||'missing'));
 if(!urlInSitemap(url))errors.push('URL missing from sitemap: '+path);
 if(alternate){
  const alternateUrl=sitePath(alternate);
  const lang=path.startsWith('/en/')?'sv':'en';
  if(!html.includes('hreflang="'+lang+'" href="'+alternateUrl+'"'))errors.push('Missing reciprocal '+lang+' hreflang on '+path);
  if(!html.includes('hreflang="x-default"'))errors.push('Missing x-default on '+path);
 }
 if(!html.includes('<meta name="description"'))errors.push('Missing meta description: '+path);
 if(!html.includes('<h1'))errors.push('Missing H1: '+path);
 return html;
}
checkPage('dist/index.html','/','/en/');
checkPage('dist/en/index.html','/en/','/');
checkPage('dist/dikter/index.html','/dikter/','/en/poems/');
checkPage('dist/en/poems/index.html','/en/poems/','/dikter/');
let count=0;
const groups=new Map();
for(const w of registry.works){
 if(w.type!=='dikt')continue;
 const sv=w.translations?.sv, en=w.translations?.en;
 if(!sv||!en||sv.status!=='published'||en.status!=='published')continue;
 const svPath='/dikter/'+sv.slug+'/',enPath='/en/poems/'+en.slug+'/';
 for(const [lang,path,other] of [['sv',svPath,enPath],['en',enPath,svPath]]){
  const file='dist'+path+'index.html';
  const html=checkPage(file,path,other);
  if(html&&!html.includes('"BreadcrumbList"'))errors.push('Missing breadcrumb JSON-LD: '+path);
  if(html&&!html.includes('"/Spiken/images/')&&base==='/Spiken')errors.push('Poem image missing from HTML: '+path);
  count++;
 }
 if(!groups.has(w.category))groups.set(w.category,{sv:0,en:0});
 groups.get(w.category).sv++;groups.get(w.category).en++;
}
for(const category of groups.keys()){
 const sv='/dikter/kategori/'+category+'/', en='/en/poems/category/'+category+'/';
 const svHtml=checkPage('dist'+sv+'index.html',sv);
 const enHtml=checkPage('dist'+en+'index.html',en,sv);
 if(enHtml&&!enHtml.includes('"/Spiken/en/poems/')&&base==='/Spiken')errors.push('English topic has no links to poem pages: '+category);
}
const index=readFileSync('dist/sitemap-index.xml','utf8');
if(!index.includes(sitePath('/sitemap-0.xml')))errors.push('Sitemap index has wrong base URL');
const robots=readFileSync('dist/robots.txt','utf8');
if(!robots.includes(sitePath('/sitemap-index.xml')))errors.push('Sitemap URL missing from robots.txt');
if(errors.length){console.error('SEO verification errors:\n'+errors.map(e=>' - '+e).join('\n'));process.exitCode=1;}
else console.log('SEO checks passed: '+count+' bilingual poem pages, '+groups.size+' paired categories, '+sitemapFiles.length+' sitemap file(s).');
