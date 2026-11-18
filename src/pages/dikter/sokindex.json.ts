import type { APIRoute } from 'astro';
import { getPoems } from '../../lib/poetry.js';

// Fulltexten hämtas först när besökaren söker. Endast publicerade språkversioner ingår.
export const GET: APIRoute = () => new Response(
  JSON.stringify(getPoems('sv').map(({ slug, text }) => ({ slug, text }))),
  { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
);
