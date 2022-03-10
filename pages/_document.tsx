import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        {/* <script data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE} async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" /> */}
        {/* <script dangerouslySetInnerHTML={{
        __html: `
        (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: ${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE},
            enable_page_level_ads: true
            });
            `,
            }} /> */}
          

<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=''/>
<link href="https://fonts.googleapis.com/css2?family=Lobster&family=Montserrat:wght@300;500;600;700&display=swap" rel="stylesheet"/>
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