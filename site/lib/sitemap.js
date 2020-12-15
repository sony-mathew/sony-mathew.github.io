import DEFAULT_CONFIG from '../config/default_config';

const generateSitemapItem = (post) => `
  <url>
    <loc>${DEFAULT_CONFIG.baseUrl}/blog/${post.id}</loc>
    <lastmod>${new Date(post.date).toISOString().slice(0,10)}</lastmod>
    <changefreq>never</changefreq>
  </url>
`;

const generateSitemap = (posts) => `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${DEFAULT_CONFIG.baseUrl}/</loc>
      <changefreq>weekly</changefreq>
    </url>
    <url>
      <loc>${DEFAULT_CONFIG.baseUrl}/blog</loc>
      <lastmod>${new Date(posts[0].date).toISOString().slice(0,10)}</lastmod>
      <changefreq>weekly</changefreq>
    </url>
    ${posts.map(generateSitemapItem).join('')}
  </urlset>
`;

export default generateSitemap;
