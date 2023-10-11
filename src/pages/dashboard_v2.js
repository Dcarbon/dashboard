import Head from "next/head";
import Script from "next/script";
import { Fragment } from "react";
import { API } from "src/constants/mapbox";
import DashboardMap from "src/dashboardComponents/Map";

const GGANAS = process.env.NEXT_PUBLIC_GGANAS;
export default function Dashboard() {
  return (
    <Fragment>
      <Head>
        <title>DCarbon | Dashboard</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="DCarbon website: Fair to us - Fair to Earth"
        />
        {/* <!-- Google tag (gtag.js) --> */}
      </Head>

      {GGANAS && <Script async src={API.GGANAS + GGANAS}></Script>}
      <Script id="gg-anas">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GGANAS}');`}
      </Script>
      <DashboardMap />
    </Fragment>
  );
}
