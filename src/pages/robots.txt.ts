import type { APIRoute } from 'astro';

// Bygg rätt robots.txt för både nuvarande GitHub Pages-undermapp och framtida egen domän.
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const sitemap = site ? new URL(base + '/sitemap-index.xml', site).toString() : '';
  return new Response(
    ['User-agent: *', 'Allow: /', ...(sitemap ? ['Sitemap: ' + sitemap] : [])].join('\n') + '\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
};
