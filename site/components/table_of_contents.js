import utilStyles from '../styles/utils.module.scss';

export function TableOfContents({ article }) {
  const headings = article.headings || [];

  if (!article.toc || headings.length === 0) {
    return null;
  }

  const sectionLabel = headings.length === 1 ? "1 section" : `${headings.length} sections`;

  return (
    <section className={utilStyles.tocSection} aria-label="Table of contents">
      <details className={utilStyles.tocDisclosure} open>
        <summary className={utilStyles.tocSummary}>
          <span className={utilStyles.tocHeading}>
            <span className={utilStyles.tocEyebrow}>On this page</span>
            <span className={utilStyles.tocTitle}>Table of contents</span>
          </span>
          <span className={utilStyles.tocCount}>{sectionLabel}</span>
          <span className={utilStyles.tocChevron} aria-hidden="true" />
        </summary>

        <nav className={utilStyles.tocNav} aria-label="Article sections">
          <ol className={utilStyles.tocList}>
            {headings.map((heading) => {
              const depthClass = utilStyles[`tocDepth${Math.min(heading.depth, 4)}`];

              return (
                <li
                  className={`${utilStyles.tocItem} ${depthClass}`}
                  key={heading.id}
                >
                  <a className={utilStyles.tocLink} href={`#${heading.id}`}>
                    <span className={utilStyles.tocNumber}>{heading.number}</span>
                    <span>{heading.text}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </details>
    </section>
  );
}
