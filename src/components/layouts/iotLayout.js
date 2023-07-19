import Head from "next/head";
import Header from "./header";

import { Lexend_Deca } from "next/font/google";
import ScrollBox from "../ui/ScrollBox";
const lexend = Lexend_Deca({ subsets: ["vietnamese"] });
import stls from "./iotLayout.module.scss";
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
  return (
    <>
      <Head>
        <title> DCarbon</title>
        <meta charSet="utf-8" />
        <meta name="description" content="D carbon website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
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
