import Head from "next/head";
import { Lexend_Deca } from "next/font/google";
import HeaderTransparent from "./header/header_transparent";
import Footer from "./footer";
import { Fragment } from "react";
const lexend = Lexend_Deca({ subsets: ["vietnamese"] });
function Layout({ children, noFooter, noHeader }) {
  return (
    <Fragment>
      <Head>
        <title>D-Carbon</title>
        <meta charSet="utf-8" />
        <meta name="description" content="D carbon website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`relative bg-[#151515] ${lexend.className}`}>
        {!noHeader && <HeaderTransparent />}
        {children}
        {!noFooter && <Footer />}
      </main>
    </Fragment>
  );
}

export default Layout;
