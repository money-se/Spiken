import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages projektadress används tills en egen domän väljs.
// Vid domänbyte: SPIKEN_SITE_URL=https://din-domän.se (och då blir base automatiskt '/').
// SPIKEN_BASE_PATH kan användas om sajten placeras under en särskild undermapp.
const site = (process.env.SPIKEN_SITE_URL || 'https://money-se.github.io').replace(/\/$/, '');
const base = process.env.SPIKEN_BASE_PATH ?? (process.env.SPIKEN_SITE_URL ? '/' : '/Spiken');

export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
  output: 'static'
});
