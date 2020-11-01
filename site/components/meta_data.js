import DEFAULT_CONFIG from '../config/default_config';

export function MetaData() {
  const description = ` ${DEFAULT_CONFIG.siteTitle} by ${DEFAULT_CONFIG.author}`;

  return (
    <>
      <meta name="description" content={ description } />
      <meta property="og:title" content={ description } />
      <meta name="twitter:creator" content={ `@${DEFAULT_CONFIG.authorTwitterHandle}` } />
      <meta
        property="og:image"
        content="https://sony-mathew.github.io/images/sony.jpeg"
      />
    </>
  )
}

export function ArticleMeta({ article }) {
  const publishedDate = (new Date(article.date)).toDateString();
  const extendedTitle = `${article.title} by ${article.author} | ${publishedDate} | ${DEFAULT_CONFIG.siteTitle}`;

  return (
    <>
      <meta property="og:type" content="article" />
        
      <title>{ extendedTitle }</title>
      <meta name="title" content={ extendedTitle } />
      <meta property="og:title" content={ article.title } />
      <meta property="twitter:title" content={ article.title } />

      <meta name="description" content={ article.description } />
      <meta property="og:description" content={ article.description } />
      <meta property="twitter:description" content={ article.description } />

      <meta property="og:image" content="https://sony-mathew.github.io/images/sony.jpeg" />
      <meta property="twitter:image" content="https://sony-mathew.github.io/images/sony.jpeg" />
      <meta property="twitter:card" content="summary_large_image" />

      <meta property="article:published_time" content={ publishedDate } />
      <meta name="article:author" content={ article.author } />
      <meta name="twitter:creator" content={ `@${DEFAULT_CONFIG.authorTwitterHandle}`} />

      <meta name="twitter:label1" value="Reading time" />
      <meta name="twitter:data1" value={ `${article.readingTime} min read` } />

      <meta name="robots" content="index,follow,max-image-preview:large"></meta>
    </>
  );
}
