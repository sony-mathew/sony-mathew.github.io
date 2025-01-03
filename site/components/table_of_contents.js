import utilStyles from '../styles/utils.module.scss';

export function TableOfContents({ article }) {
  if (!article.toc) {
    return null;
  }

  // Parse markdown content and extract headings
  const headings = article.content
    .split('\n')
    .filter(line => line.startsWith('#'))
    .map(heading => {
      const level = heading.match(/^#+/)[0].length;
      const text = heading.replace(/^#+\s+/, '');
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      
      return { level, text, id };
    });

  // Build table of contents HTML
  const tocHtml = headings.map(heading => {
    return `<li style="margin-left: ${heading.level * 20}px"><a href="#${heading.id}">${heading.text}</a></li>`;
  }).join('\n');
 

  return (
    <>
      <br />
      <div className={utilStyles.tocHeader}>
        Table of Contents
      </div>
      <div className={utilStyles.toc} dangerouslySetInnerHTML={{ __html: tocHtml }} />
    </>
  );
}
