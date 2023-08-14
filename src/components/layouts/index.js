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
        <title> DCarbon</title>
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
