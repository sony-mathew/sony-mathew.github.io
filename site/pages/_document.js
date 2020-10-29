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
          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${DEFAULT_CONFIG.gaTrackingId}`}></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${DEFAULT_CONFIG.gaTrackingId}');`,
            }}
          />

          {/* <!-- For mailchimp newsletter popup --> */}
          <script async defer type="text/javascript" src={"//s3.amazonaws.com/downloads.mailchimp.com/js/signup-forms/popup/embed.js"} data-dojo-config={"usePlainJson: true, isDebug: false"}></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                function showMailingPopUp() {
                  require(["mojo/signup-forms/Loader"], function(L) { 
                    L.start({
                      "baseUrl":"${DEFAULT_CONFIG.mcBaseUrl}",
                      "uuid":"${DEFAULT_CONFIG.mcUserId}",
                      "lid":"${DEFAULT_CONFIG.mcListId}"
                    });
                  });
                  document.cookie = 'MCEvilPopupClosed=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;';
                };

                document.addEventListener("DOMContentLoaded", function(event) {
                  document.addEventListener('click', event => {
                    if (typeof(event.target.className) === 'string' && event.target.className.includes('open-mailchimp-subscribe-popup')) {
                      console.log('Subscribe!');
                      showMailingPopUp();
                    }
                  });
                });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
