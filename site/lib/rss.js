import DEFAULT_CONFIG from '../config/default_config';

const generateRssItem = (post) => `
  <item>
    <guid>${DEFAULT_CONFIG.baseUrl}/blog/${post.id}</guid>
    <title>${post.title}</title>
    <link>${DEFAULT_CONFIG.baseUrl}/blog/${post.id}</link>
    <description>${post.description}</description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  </item>
`;

const generateRss = (posts) => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Blog - The Usual Ramblings by Sony Mathew</title>
      <link>${DEFAULT_CONFIG.baseUrl}/blog</link>
      <description>Sony Mathew's personal blog and portfolio. He writes about technology, travel and philosophy.</description>
      <language>en</language>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${DEFAULT_CONFIG.baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`;

export default generateRss;
