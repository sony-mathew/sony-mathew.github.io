import Document, { Html, Head, Main, NextScript } from 'next/document';
import DEFAULT_CONFIG from '../config/default_config';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(() => {
                try {
                  const storedTheme = window.localStorage.getItem('theme');
                  const theme = storedTheme === 'dark' || storedTheme === 'light'
                    ? storedTheme
                    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  const root = document.documentElement;
                  root.classList.remove('theme-dark', 'theme-light');
                  root.classList.add('theme-' + theme);
                  root.style.colorScheme = theme;
                } catch (_) {}
              })();`,
            }}
          />
          <link rel="icon" href="/favicon.ico" />
          <link href="/styles/custom.css" rel="stylesheet" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS feed for The Usual Ramblings"
            href={`${DEFAULT_CONFIG.baseUrl}/rss.xml`}
          />
          {/* <!-- Google Analytics --> */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${DEFAULT_CONFIG.gaTrackingId}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${DEFAULT_CONFIG.gaTrackingId}');`,
            }}
          />
          {/* <!-- For the article share buttons --> */}
          <script async src={ "https://static.addtoany.com/menu/page.js" } />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
