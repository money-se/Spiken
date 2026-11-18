import { readFileSync } from 'node:fs';

const registryPath = new URL('../src/data/publiceringsregister.json', import.meta.url);
const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
const works = registry.works;
if (!Array.isArray(works)) throw new Error('Publiceringsregistret saknar en giltig works-lista.');

const errors = [];
const ids = new Set();
const slugs = { sv: new Set(), en: new Set() };
let published = 0;
const languages = ['sv', 'en'];
const required = ['title', 'slug', 'text', 'meta_title', 'meta_description', 'image_alt'];

for (const [index, work] of works.entries()) {
  const context = work.id || `post ${index + 1}`;
  if (!work.id || ids.has(work.id)) errors.push(`Duplicerat eller saknat verk-ID: ${context}`);
  ids.add(work.id);
  if (work.type !== 'dikt') continue;

  for (const lang of languages) {
    const version = work.translations?.[lang];
    if (!version || version.status !== 'published') continue;
    published++;
    for (const field of required) {
      if (typeof version[field] !== 'string' || !version[field].trim()) {
        errors.push(`${context} (${lang}): saknar ${field}`);
      }
    }
    if (!/^[-a-z0-9]+$/.test(version.slug || '')) {
      errors.push(`${context} (${lang}): ogiltig URL-slug`);
    } else if (slugs[lang].has(version.slug)) {
      errors.push(`${context} (${lang}): dubblerad slug ${version.slug}`);
    }
    slugs[lang].add(version.slug);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(version.published_at || '') ||
        Number.isNaN(Date.parse(version.published_at))) {
      errors.push(`${context} (${lang}): saknar giltigt publiceringsdatum`);
    }
    if (typeof work.image?.path !== 'string' ||
        !/^[a-z0-9][a-z0-9-]*\.webp$/.test(work.image.path)) {
      errors.push(`${context} (${lang}): ogiltig eller saknad WebP-bild`);
    }
  }
}

if (errors.length) {
  console.error('Publiceringskontrollen hittade problem:\n' + errors.map(x => '- ' + x).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Publiceringsregister OK: ${works.length} verk, ${published} publicerade språkversioner.`);
}
