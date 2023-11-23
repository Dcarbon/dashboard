import ScrollBox from "src/components/ui/ScrollBox";
import Close from "./Close";
import Information from "./MainComponents/Informations";
import Charts from "./MainComponents/Components/Charts";
import ChevronUp from "./ChevronUp";
import ImageProject from "./MainComponents/Image/ImageProject";
import TabsGenerator from "./MainComponents/TabsGenerator";
import { useEffect, useState } from "react";
import Footer from "../Footer";
import TotalGenerator from "./MainComponents/Components/TotalGenerator";
import { useCurrentIOT, useIot, useIots_by_project } from "src/hook/useIOT";
import { useProject } from "src/hook/useProject";

function Main({ setIsShowMain, isShowMain, isShow, setIsShow }) {
  // Cencept
  //
  const [currentIot] = useCurrentIOT();
  const [getIot, setIot] = useIot();
  const [, setProject] = useProject();
  const [, setIots_by_project] = useIots_by_project();
  const [selectedSensor, setSelectedSensor] = useState(0);
  const [typeSensor, setTypeSensor] = useState(0);

  // Truy vấn thông tin IOT khi có current
  useEffect(() => {
    if (currentIot) {
      setIot(currentIot);
    }
  }, [currentIot, setIot]);

  // Truy vấn thông tin IOT khi có current project id
  useEffect(() => {
    if (getIot?.project) {
      setProject(getIot?.project);
    }
  }, [getIot, setProject]);

  // Truy vấn  IOTs thuộc về project khi có current project id
  useEffect(() => {
    if (getIot?.project) {
      setIots_by_project(getIot?.project);
    }
  }, [getIot, setIots_by_project]);

  return (
    getIot && (
      <div className='relative bg-[#0B0B0B] w-full h-full border-t-2 border-t-extended-700 '>
        <div
          className='hidden lg:inline-block cursor-pointer absolute top-0 right-0 -mt-12 z-50'
          onClick={() => setIsShowMain(!isShowMain)}
        >
          <ThisContainer>
            <div className='bg-extended-700 rounded-md inline-block border border-extended-400 p-2 hover:bg-opacity-75'>
              {Boolean(isShowMain) ? <Close /> : <ChevronUp />}
            </div>
          </ThisContainer>
        </div>
        <ScrollBox disableX={true}>
          <div className='mb-12'>
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
            <ThisContainer className={"bg-extended-800 lg:p-7 "}>
              <div className='p-4'>
                <TotalGenerator
                  typeSensor={typeSensor}
                  sensorId={selectedSensor}
                />
                <Charts
                  onChangeIOT={() => {
                    setSelectedSensor(0);
                    setTypeSensor(0);
                  }}
                  sensorId={selectedSensor}
                  typeSensor={typeSensor}
                />
              </div>
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
