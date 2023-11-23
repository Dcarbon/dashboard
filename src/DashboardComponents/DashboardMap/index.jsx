import Header from "../Header";
import { useState } from "react";
import ImageDialog from "../Main/MainComponents/Image/ImageDialog";
import Footer from "../Footer";
import Main from "../Main";
import { useCurrentIOT } from "src/hook/useIOT";
import DashboardEarth from "./components/earth";

/**
 * @param {MapboxEvent} evnt
 * @returns
 */
export default function DashboardMap() {
  const [isShow, setIsShow] = useState(false);
  const [currentIOT] = useCurrentIOT();
  const [isShowMain, setIsShowMain] = useState(false);

  return (
    <div className='flex flex-col w-full lg:h-screen bg-extended-900 lg:overflow-hidden'>
      <div className='px-6 py-4'>
        <Header />
      </div>

      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      <div className='lg:relative lg:flex-1 '>
        {/* Map */}
        <div className='h-[50vh] lg:h-full'>
          <div className='flex flex-col w-full h-full'>
            <div className='flex-1'>
              <DashboardEarth />
            </div>
            <div className={`hidden ${!isShowMain ? "lg:block" : ""}`}>
              {!currentIOT && <Footer />}
            </div>
          </div>
        </div>
        {/* info */}
        {Boolean(currentIOT) && (
          <div
            className={` lg:absolute bottom-[0] left-0 w-full lg:max-h-9/10 lg:h-full transition-all duration-500  ${
              isShowMain ? "lg:translate-y-0" : "lg:translate-y-11/12"
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
      {/* Image */}
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
