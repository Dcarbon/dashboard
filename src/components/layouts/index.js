import Head from "next/head";
import { Lexend_Deca } from "next/font/google";
import HeaderTransparent from "./header/header_transparent";
import Footer from "./footer";
import { Fragment } from "react";
import Script from "next/script";
const lexend = Lexend_Deca({ subsets: ["vietnamese"] });
function Layout({ title, children, noFooter, noHeader, image, description }) {
  const GGANAS = process.env.NEXT_PUBLIC_GGANAS;
  return (
    <Fragment>
      <Head>
        <title>{"DCarbon" + (title ? " | " + title : "")}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="DCarbon website: Fair to us - Fair to Earth"
        />
        <meta name="description" content={description} key="desc" />
        <meta
          property="og:title"
          content={"DCarbon" + (title ? " | " + title : "")}
        />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        {/* <!-- Google tag (gtag.js) --> */}
      </Head>
      {GGANAS && (
        <Script
          async
          src={"https://www.googletagmanager.com/gtag/js?id=" + GGANAS}
        ></Script>
      )}
      <Script id="gg-anas">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GGANAS}');`}
      </Script>
      <main className={`relative bg-[#151515] ${lexend.className}`}>
        {!noHeader && <HeaderTransparent />}
        {children}
        {!noFooter && <Footer />}
      </main>
    </Fragment>
  );
}

export default Layout;
