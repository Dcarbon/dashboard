import { useEffect } from "react";
import {
  useCurrentIOTState,
  useGetTotalIot_byProject,
} from "src/DashboardComponents/handleData";
import { SENSOR__TYPE_TEXT } from "src/tools/const";

function TotalGenerator({ typeSensor }) {
  const [currentIot] = useCurrentIOTState();
  const totalIots = useGetTotalIot_byProject();

  useEffect(() => {
    console.log("totalIots", totalIots);
    console.log("typeSensor", typeSensor);
    console.log("typeSensor texxt", SENSOR__TYPE_TEXT[typeSensor]);
  }, [currentIot, totalIots, typeSensor]);

  useEffect(() => {
    if (currentIot) {
      console.log("currentIot", currentIot);
      // nếu currentIot thay đổi
      // request ngày, tuần, tháng, tổng iot all time
    }
  }, [currentIot]);

  return <div></div>;
}

export default TotalGenerator;

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
