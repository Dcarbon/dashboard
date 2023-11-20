import ScrollBox from "src/components/ui/ScrollBox";
import Close from "./Close";
import Information from "./MainComponents/Informations";
import Charts from "./MainComponents/Charts";
import ChevronUp from "./ChevronUp";
import ImageProject from "./MainComponents/Image/ImageProject";
import TabsGenerator from "./MainComponents/TabsGenerator";
import { useEffect, useState } from "react";
import {
  useGetProject,
  useIots_by_projectId,
  useIOTState,
  useTotalSensorGenerated,
} from "../handleData";
import Footer from "../Footer";
import TotalGenerator from "./MainComponents/Components/TotalGenerator ";
import CircleLoading from "src/components/ui/Loading/CircleLoading";

function Main({ setIsShowMain, isShowMain, isShow, setIsShow }) {
  // Cencept
  //
  const iotState = useIOTState();
  const [selectedSensor, setSelectedSensor] = useState(0);
  const [typeSensor, setTypeSensor] = useState(0);
  // Các iot hiện tại nằm trong project
  const iots_by_projectId = useIots_by_projectId();
  // Lấy project Id hiện tại thông qua projectState
  const projectState = useGetProject();
  // Nhận số lượng iot sinh ra
  const { data: totalSensorGenerated, loading } = useTotalSensorGenerated(
    iots_by_projectId,
    typeSensor,
    projectState?.id ?? 0,
    selectedSensor
  );
  useEffect(() => {
    console.log("iotState      iotState", iotState);
  }, [iotState]);
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
        <ScrollBox disableX={true}>
          <div className="">
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
              setTypeSensor={setTypeSensor}
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
            <ThisContainer className={"bg-extended-800 lg:p-7"}>
              {loading ? (
                <div className="p-4">
                  <CircleLoading />
                </div>
              ) : totalSensorGenerated?.length ? (
                <div className="p-4">
                  <TotalGenerator
                    typeSensor={typeSensor}
                    sensorId={selectedSensor}
                    loading={loading}
                    totalSensorGenerated={totalSensorGenerated}
                  />
                  <Charts />
                </div>
              ) : (
                <div className="p-4">
                  <h1 className="p-6 text-center font-bold uppercase">
                    This project have no Iots yet. Please try again later!
                  </h1>
                </div>
              )}
            </ThisContainer>
          </div>

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
function ThisContainer({ children, className }) {
  return (
    <div className={"px-0 lg:px-4 xl:px-32"}>
      <div className={className ?? "lg:px-7 pt-8"}>{children}</div>
    </div>
  );
}
