import Head from "next/head";
import Header from "./header";

import { Lexend_Deca } from "next/font/google";
import ScrollBox from "../ui/ScrollBox";
const lexend = Lexend_Deca({ subsets: ["vietnamese"] });
import stls from "./iotLayout.module.scss";
import Script from "next/script";
function DashboardLayout({
  setErrFlyTo,
  mymap,
  iotSelected,
  setIotSelected,
  setFeatures,
  children,
}) {
  // // xóa trạng thái load sensor lần đầu
  // dispatch({ type: SensorsACT.LOAD_SENSOR_1ST_TIME, payload: false });
  // // xóa project hiện tại
  // setIotSelected(e.target.value);

  // setTimeout(() => {
  //   dispatch({
  //     type: SensorsACT.GET_SENSORS.REQUEST,
  //     payload: { skip: 0, limit: 50, iotId: e.target.value },
  //   });
  // }, 100);
  const GGANAS = process.env.NEXT_PUBLIC_GGANAS;
  return (
    <>
      <Head>
        <title> DCarbon</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
        <meta
          name='description'
          content='DCarbon website: Fair to us - Fair to Earth'
        />
        {/* <!-- Google tag (gtag.js) --> */}
      </Head>
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
      <main className={`${stls.main} ${lexend.className}`}>
        <ScrollBox disableX>
          <Header
            setErrFlyTo={setErrFlyTo}
            mymap={mymap}
            setFeatures={setFeatures}
            iotSelected={iotSelected}
            setIotSelected={setIotSelected}
          />
          {children}
        </ScrollBox>
      </main>
    </>
  );
}

export default DashboardLayout;
