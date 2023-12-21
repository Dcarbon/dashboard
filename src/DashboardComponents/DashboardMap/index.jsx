import Header from "../Header";
import { useState } from "react";
import ImageDialog from "../Main/MainComponents/Image/ImageDialog";
import Footer from "../Footer";
import Main from "../Main";
import { useCurrentIOT } from "src/hook/useIOT";
import DashboardEarth from "./components/earth";
import stls from "../../styles/dashboard.module.scss";
/**
 * @param {MapboxEvent} evnt
 * @returns
 */
export default function DashboardMap() {
  const [isShow, setIsShow] = useState(false);
  const [currentIOT] = useCurrentIOT();

  return (
    <div className="bg-extended-900">
      <div className={`${stls.header} px-6 py-4`}>
        <Header />
      </div>

      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      <div className={`${stls.main} flex flex-col justify-between`}>
        {/* Map */}
        <div className="flex-1">
          <div
            className={`${
              currentIOT ? stls.isCurrent : stls.isEmpty
            } lg:h-full`}
          >
            <DashboardEarth />
          </div>
          {/* info */}
          {Boolean(currentIOT) && (
            <Main isShow={isShow} setIsShow={setIsShow} />
          )}
        </div>
        <Footer />
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
