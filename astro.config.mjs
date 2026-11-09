import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://money-se.github.io',
  base: '/Spiken',
  integrations: [sitemap()],
  output: 'static'
});
