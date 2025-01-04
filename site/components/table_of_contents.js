import utilStyles from '../styles/utils.module.scss';

export function TableOfContents({ article }) {
  if (!article.toc) {
    return null;
  }

  // Parse markdown content and extract headings
  // Initialize counters for each level
  const counters = {};
  let previousLevel = 0;
  
  const headings = article.content
    .split('\n')
    .filter(line => line.startsWith('#'))
    .map(heading => {
      const level = heading.match(/^#+/)[0].length;
      const text = heading.replace(/^#+\s+/, '');
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      
      // Reset lower level counters when moving to a higher level
      if (level < previousLevel) {
        for (let i = level + 1; i <= 6; i++) {
          counters[i] = 0;
        }
      }
      
      // Initialize or increment counter for current level
      counters[level] = (counters[level] || 0) + 1;
      
      // Build the section number (e.g., "1.2.3")
      const sectionNumber = [];
      for (let i = 1; i <= level; i++) {
        sectionNumber.push(counters[i] || 0);
      }
      
      previousLevel = level;
      
      return {
        level,
        text,
        id,
        sectionNumber: sectionNumber.join('.')
      };
    });

  // Build table of contents HTML with section numbers
  const tocHtml = headings.map(heading => {
    return `<li style="margin-left: ${heading.level * 20}px">
      <a href="#${heading.id}"><span class="section-number">${heading.sectionNumber.replace(/^0\./, '')}.</span> ${heading.text}</a>
    </li>`;
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
