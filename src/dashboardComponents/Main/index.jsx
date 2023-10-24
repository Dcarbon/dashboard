import ScrollBox from "src/components/ui/ScrollBox";
import Close from "./Close";
import Information from "./MainComponents/Informations";
import Charts from "./MainComponents/Charts";
import ChevronUp from "./ChevronUp";
import ImageProject from "./MainComponents/Image/ImageProject";
import TabsIOT from "./MainComponents/TabsIOT";
import TabsGenerator from "./MainComponents/TabsGenerator";
import { useState } from "react";
import { useIOTState } from "../handleData";
import Footer from "../Footer";

function Main({ setIsShowMain, isShowMain, isShow, setIsShow }) {
  const iotState = useIOTState();
  const [selectedSensor, setSelectedSensor] = useState(0);
  return (
    iotState.iot && (
      <div className="relative bg-[#0B0B0B] w-full h-full border-t-2 border-t-extended-700 ">
        <div
          className="hidden lg:inline-block cursor-pointer absolute top-0 right-0 -mt-12 z-50"
          onClick={() => setIsShowMain(!isShowMain)}
        >
          <ThisContainer>
            <div className="bg-extended-700 rounded-md inline-block border border-extended-400 p-2 hover:bg-opacity-75">
              {Boolean(isShowMain) ? <Close /> : <ChevronUp />}
            </div>
          </ThisContainer>
        </div>
        <ScrollBox>
          <ThisContainer>
            <Information />
            <ImageProject isShow={isShow} setIsShow={setIsShow} />
          </ThisContainer>
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <TabsGenerator
            selectedSensor={selectedSensor}
            setSelectedSensor={setSelectedSensor}
          />
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <ThisContainer>
            <TabsIOT />
            <Charts />
          </ThisContainer>

          <Footer />
        </ScrollBox>
      </div>
    )
  );
}

export default Main;
//
//
//
//
function ThisContainer({ children }) {
  return (
    <div className={"px-4 xl:px-32"}>
      <div className="lg:px-7 pt-8">{children}</div>
    </div>
  );
}
