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
          <link rel="icon" href="/favicon.ico" />
          <link href="/styles/custom.css" rel="stylesheet" />
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
