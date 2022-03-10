import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Script from 'next/script'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import { useEffect } from 'react'
import Head from 'next/head'
import { UserProvider } from '../components/context/userContext'
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url:any) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    } 
  }, [router.events])
  return(
    <>
  
     <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
   id="Adsense-id"
   data-adtest="on"
   strategy="afterInteractive"
   onError={ (e) => { console.error('Script failed to load', e) }}
   data-ad-client="ca-pub-6386024894825471"
   async={true}
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
/>
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    <UserProvider>
    <Header />
  <Component {...pageProps} />
  </UserProvider>
  <Footer />
  </>
  )
}

export default MyApp
