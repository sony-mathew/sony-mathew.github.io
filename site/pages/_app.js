import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GaPageView } from '../lib/gtag';
import "../styles/tailwind.scss";
import "../styles/global.scss";

// Prism core styles
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/toolbar/prism-toolbar.css';


export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
      const handleRouteChange = (url) => GaPageView(url);
      router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
          router.events.off('routeChangeComplete', handleRouteChange);
      };
  }, []);

  return <Component {...pageProps} />;
}
