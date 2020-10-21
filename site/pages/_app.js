import "../styles/tailwind.scss"
import "../styles/global.scss"
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GTMPageView } from '../lib/gtm'

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
      const handleRouteChange = (url) => GTMPageView(url);
      router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
          router.events.off('routeChangeComplete', handleRouteChange);
      };
  }, []);

  return <Component {...pageProps} />;
}
