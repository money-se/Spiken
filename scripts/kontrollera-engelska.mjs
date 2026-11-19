#!/usr/bin/env node
import {readFileSync,existsSync} from 'node:fs';
const raw=readFileSync(new URL('../src/data/publiceringsregister.json',import.meta.url),'utf8');
const works=JSON.parse(raw).works||[];
const failures=[];
const files=[
 'dist/en/index.html',
 'dist/en/about/index.html',
 'dist/en/poems/index.html',
 'dist/en/worlds/index.html',
 'dist/en/privacy/index.html',
 'dist/en/worlds/noveller/index.html',
 'dist/en/worlds/reflektioner/index.html',
 'dist/en/worlds/recensioner/index.html'
];
for(const path of files)if(!existsSync(path))failures.push('English page missing: '+path);
for(const work of works){
 const translation=work.translations?.en;
 if(!translation||translation.status!=='published'){
  if(translation?.slug&&existsSync('dist/en/poems/'+translation.slug+'/index.html'))failures.push('Unpublished English poem found: '+translation.slug);
  continue;
 }
 if(!translation.slug||!translation.title||!translation.text)failures.push('Published English poem missing content: '+work.id);
 else if(!existsSync('dist/en/poems/'+translation.slug+'/index.html'))failures.push('Published English poem has no page: '+translation.slug);
}
if(existsSync('dist/en/index.html')){
 const home=readFileSync('dist/en/index.html','utf8');
 if(home.includes('href="/Spiken/en/worlds/min-bibel/"')||home.includes('href="/Spiken/en/worlds/mork-poesi/"'))failures.push('English homepage links to hidden sections');
 if(!home.includes('recensioner'))failures.push('English homepage is missing Reviews');
}
if(existsSync('dist/en/privacy/index.html')){
 const page=readFileSync('dist/en/privacy/index.html','utf8');
 if(!page.includes('Your reading is yours.'))failures.push('English privacy page lacks English copy');
 if(!page.includes('hreflang="sv"'))failures.push('English privacy page lacks Swedish alternate');
}
if(existsSync('dist/en/poems/index.html')){
 const page=readFileSync('dist/en/poems/index.html','utf8');
 const count=works.filter(w=>w.type==='dikt'&&w.translations?.en?.status==='published').length;
 if(!count&&!page.includes('Explore Swedish poems'))failures.push('Empty English archive has no Swedish originals link');
}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}
else console.log('English-site checks passed; '+works.filter(w=>w.type==='dikt'&&w.translations?.en?.status==='published').length+' published English poems.');
