import Head from "next/head";
import Header from "./header";

import { Lexend_Deca } from "next/font/google";
import ScrollBox from "../ui/ScrollBox";
const lexend = Lexend_Deca({ subsets: ["vietnamese"] });
import stls from "./iotLayout.module.scss";
function DashboardLayout({ children }) {
  return (
    <>
      <Head>
        <title>D-Carbon</title>
        <meta charSet="utf-8" />
        <meta name="description" content="D carbon website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${stls.main} ${lexend.className}`}>
        <ScrollBox disableX>
          <Header />
          {children}
        </ScrollBox>
      </main>
    </>
  );
}

export default DashboardLayout;
