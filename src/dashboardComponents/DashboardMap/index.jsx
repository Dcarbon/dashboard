import Map from "react-map-gl";
import { MapInitProperties } from "src/constants/mapbox";
import Header from "../Header";
import { useRouter } from "next/router";
import { useCurrentIOTState } from "../handleData";
import { useEffect, useState } from "react";
import Main from "../Main";
import Footer from "../Footer";
import ImageDialog from "../Main/MainComponents/Image/ImageDialog";

/**
 * @param {MapboxEvent} evnt
 * @returns
 */
export default function DashboardMap() {
  const router = useRouter();
  const [isShow, setIsShow] = useState(false);
  const [currentIOT, setCurrentIOT] = useCurrentIOTState(0);
  const [isLoadedQuery, setIsLoadedQuery] = useState(false);
  const [isShowMain, setIsShowMain] = useState(false);
  useEffect(() => {
    if (router?.query?.iot !== currentIOT) {
      setIsLoadedQuery(true);
      setCurrentIOT(router?.query?.iot);
    }
  }, [currentIOT, isLoadedQuery, router, setCurrentIOT]);
  return (
    <div className="flex flex-col w-full lg:h-screen bg-extended-900 lg:overflow-hidden">
      <div className="px-6 py-4">
        <Header />
      </div>

      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      <div className="lg:relative lg:flex-1 ">
        <div className="h-[50vh] lg:h-full">
          <div className="flex flex-col w-full h-full">
            <div className="flex-1">
              <Map
                {...MapInitProperties}
                onLoad={() => {
                  console.log("onLoad evnt");
                }}
                onResize={() => {
                  console.log("onResize evnt");
                }}
              />
            </div>
            <div className={`hidden ${!isShowMain ? "lg:block" : ""}`}>
              {currentIOT <= 0 && <Footer />}
            </div>
          </div>
        </div>
        {Boolean(currentIOT) && (
          <div
            className={` lg:absolute bottom-[0] left-0 w-full lg:max-h-3/4 lg:h-full transition-all duration-500  ${
              isShowMain ? "lg:translate-y-0" : "lg:translate-y-9/10"
            }`}
            style={{
              transitionTimingFunction: "ease-in",
            }}
          >
            <Main
              isShowMain={isShowMain}
              setIsShowMain={setIsShowMain}
              isShow={isShow}
              setIsShow={setIsShow}
            />
          </div>
        )}
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      <div
        className={`fixed w-full h-full transition-all duration-500 z-10 ${
          isShow ? " visible" : " invisible"
        }`}
      >
        <div>
          <ImageDialog isShow={isShow} setIsShow={setIsShow} />
        </div>
      </div>
    </div>
  );
}
