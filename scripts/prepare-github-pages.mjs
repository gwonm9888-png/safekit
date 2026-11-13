import { readFile, writeFile } from 'node:fs/promises';

const repository = process.env.GITHUB_REPOSITORY;
if (!repository || !repository.includes('/')) {
  throw new Error('GITHUB_REPOSITORY must be set as owner/repository.');
}

const [owner, repo] = repository.split('/');
const isOwnerSite = repo.toLowerCase() === `${owner}.github.io`.toLowerCase();
const inferredBase = `https://${owner}.github.io/${isOwnerSite ? '' : `${repo}/`}`;
const configuredBase = process.env.PAGES_BASE_URL || inferredBase;
const base = new URL(configuredBase);
if (base.protocol !== 'https:') throw new Error('PAGES_BASE_URL must use HTTPS.');
if (!base.pathname.endsWith('/')) base.pathname += '/';
const baseUrl = base.href;
const assetUrl = name => new URL(name, base).href;

const indexPath = new URL('../dist/index.html', import.meta.url);
let html = await readFile(indexPath, 'utf8');
html = html
  .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${baseUrl}">`)
  .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${baseUrl}">`)
  .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${assetUrl('og-image.png')}">`)
  .replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${assetUrl('og-image.png')}">`);
await writeFile(indexPath, html);

const manifestPath = new URL('../dist/manifest.webmanifest', import.meta.url);
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
manifest.id = base.pathname;
manifest.start_url = `${base.pathname}?source=pwa`;
manifest.scope = base.pathname;
manifest.icons = manifest.icons.map(icon => ({ ...icon, src: assetUrl(icon.src.replace(/^\//, '')) }));
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

await writeFile(new URL('../dist/robots.txt', import.meta.url), `User-agent: *\nAllow: /\nSitemap: ${assetUrl('sitemap.xml')}\n`);
const publicPages = ['', 'faq.html', 'sources.html'];
const urls = publicPages.map(page => `  <url><loc>${assetUrl(page)}</loc></url>`).join('\n');
await writeFile(new URL('../dist/sitemap.xml', import.meta.url), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
console.log(`Prepared GitHub Pages URLs for ${baseUrl}`);
