import { useRef, useState, useEffect, Fragment } from "react";
import {
  useGetSensorsByIot,
  useIOTState,
} from "src/DashboardComponents/handleData";
import CarbonGenerator from "./Components/TabGenerator/CarbonGenerator";
import dynamic from "next/dynamic";
import { SENSOR__TYPE } from "src/tools/const";
const PowerGenerator = dynamic(() =>
  import("./Components/TabGenerator/PowerGenerator")
);
const BiomassGenerator = dynamic(() =>
  import("./Components/TabGenerator/BiomassGenerator")
);
const BiogasGenerator = dynamic(() =>
  import("./Components/TabGenerator/BiogasGenerator")
);
const TemporatureGenerator = dynamic(() =>
  import("./Components/TabGenerator/TemporatureGenerator")
);
function TabsGenerator({ selectedSensor, setSelectedSensor }) {
  const listREF = useRef(null);
  const iotState = useIOTState();
  console.log("iotState", iotState);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(0);
  const [sensors, setSensors] = useGetSensorsByIot(undefined);

  // const types = useMemo(() => {
  //   switch (Number(iotState?.iot?.type)) {
  //     case IOT__TYPE.BurnMethane:
  //       return [
  //         {
  //           id: "Power",
  //           generated: totalPower,
  //           type: SENSOR__TYPE.Power,
  //           title: "Energy",
  //           unit: <span>kWh</span>,
  //           unitChart: "kWh",
  //           divider: 10000,
  //           isDepended: false,
  //           isSelectable: false,
  //         },
  //         {
  //           id: "Biomass",
  //           generated: totalBiomass,
  //           type: SENSOR__TYPE.Biomass,
  //           title: "Biomass",
  //           unit: (
  //             <span>
  //               m<sup>3</sup>
  //             </span>
  //           ),
  //           unitChart: "kWh",
  //           divider: 10000,
  //           isDepended: true,
  //           dependedOn: SENSOR__TYPE.Power,
  //           coefficient: 0.528888889,
  //           isSelectable: false,
  //         },
  //       ];
  //     case IOT__TYPE.CleanCockstove:
  //       return [
  //         {
  //           id: "Thermometer",
  //           type: SENSOR__TYPE.Thermometer,
  //           title: "Temperature",
  //           generated: totalTemperature,
  //           unit: <span>&ordm;C</span>,
  //           unitChart: "\xB0" + "C",
  //           timeSpace: 3,
  //           divider: 1,
  //           isSelectable: true,
  //         },
  //       ];
  //     default:
  //       return [];
  //   }
  // }, [iotState?.iot?.type, totalBiomass, totalPower, totalTemperature]);
  const handleClick = (e) => {
    const target = e.target;
    setOffsetLeft(target.offsetLeft);
    setOffsetWidth(target.offsetWidth);
  };
  useEffect(() => {
    if (!sensors && iotState?.iot?.id) {
      console.log("iotState?.iot?.id", iotState?.iot?.id);
      setSensors(iotState?.iot?.id);
    }
  }, [iotState?.iot?.id, sensors, setSensors]);
  useEffect(() => {
    const handleClickOnLoad = () => {
      console.log("listREF", listREF.current.children);
    };
    window.addEventListener("load", handleClickOnLoad);
    return () => {
      window.addEventListener("load", handleClickOnLoad);
    };
  }, []);
  return (
    <div className="mt-8 pt-5">
      <div className={"px-4 xl:px-32 border-b border-extended-800"}>
        <div className="lg:px-7 py-5">
          <div className="relative">
            <ul ref={listREF} className="inline-flex gap-12 flex-wrap">
              <li>
                <CarbonGenerator
                  isActive={selectedSensor === 0}
                  handleClick={() => setSelectedSensor(0)}
                />
              </li>
              {sensors?.map((item) => (
                <ItemTab
                  id={item?.id}
                  type={item?.type}
                  key={"item+" + item.id}
                  isActive={Boolean(item.id === selectedSensor)}
                  handleClick={() => setSelectedSensor(item.id)}
                />
              ))}
            </ul>
            <div
              className="absolute top-full h-[1px] mt-5 transition-all duration-300 bg-extended-300"
              style={{ left: offsetLeft, width: offsetWidth }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabsGenerator;
//
//
//
//
//
//
//
//
//
//
//
//
function ItemTab({ id, type, isActive, handleClick }) {
  const switchE = () => {
    var Element;
    switch (type) {
      case SENSOR__TYPE.Biogas:
        Element = BiogasGenerator;
        break;
      case SENSOR__TYPE.Biomass:
        Element = BiomassGenerator;
        break;
      case SENSOR__TYPE.Thermometer:
        Element = TemporatureGenerator;
        break;
      case SENSOR__TYPE.Power:
        Element = PowerGenerator;
        break;

      default:
        Element = Fragment;
        break;
    }
    return (
      <Element
        type={type}
        id={id}
        isActive={isActive}
        handleClick={handleClick}
      />
    );
  };
  return switchE();
}
