import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  const GGANAS = process.env.NEXT_PUBLIC_GGANAS;
  return (
    <Html lang='en'>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
        <meta
          name='description'
          content='DCarbon website: Fair to us - Fair to Earth'
        />
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          async
          src={"https://www.googletagmanager.com/gtag/js?id=" + GGANAS}
        ></Script>
        <Script id='gg-anas'>
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GGANAS}');`}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
