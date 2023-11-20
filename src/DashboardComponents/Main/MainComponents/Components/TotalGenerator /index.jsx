import {
  useCurrentIOTState,
  useGet_Total_Project_Minted,
} from "src/DashboardComponents/handleData";
import { SENSOR__TYPE_TEXT } from "src/tools/const";
import { Yesterday } from "../Charts/FirstSide/Yesterday";
import { PastWeek } from "../Charts/FirstSide/PastWeek";
import { Past30 } from "../Charts/FirstSide/Past30";
import { AllTime } from "../Charts/FirstSide/AllTime";
import { useEffect, useMemo } from "react";
import {
  getAmount,
  getAmountbyNumber,
} from "src/DashboardComponents/handleConfig";

function TotalGenerator({
  typeSensor,
  sensorId,
  totalSensorGenerated,
  loading,
}) {
  useEffect(() => {
    console.log("totalSensorGenerated", totalSensorGenerated);
  }, [totalSensorGenerated]);

  // const [currentIot] = useCurrentIOTState();

  //
  //
  //
  //
  //
  // SENSOR
  // totalSensorGenerated là 1 mảng
  // mảng có các phần tử là sensor id
  // đi kèm nó là 1 mảng các giá trị đã sinh ra

  // quy đổi giá trị của sensor thành số
  // const sensorValues = useMemo(() => {
  //   if (totalSensorGenerated) {
  //     console.log("totalSensorGenerated", totalSensorGenerated);
  //     totalSensorGenerated?.map((item) => {
  //       let newItem = item?.data ?? [];
  //       console.log("Step 1");
  //       console.log("Step 1");
  //       console.log("Step 1");
  //       console.log("Step 1-------------------");
  //       let newVal =
  //         newItem.length > 0
  //           ? item.data.reduce((prev, curr) => {
  //               return {
  //                 value: Number(prev.value) + Number(curr.value),
  //               };
  //             })
  //           : [{ value: 0 }];

  //       console.log("Step 1--------newVal-----------", item);
  //       return {
  //         ...item,
  //         total: newVal.value ?? 0,
  //       };
  //     });
  //   }
  //   return [];
  // }, [totalSensorGenerated]);
  // Lọc ra sensor hiện tại
  // const sensorGenerated = useMemo(() => {
  //   if (sensorValues) {
  //     console.log("Step 2");
  //     console.log("Step 2");
  //     console.log("Step 2");
  //     console.log("Step 2");
  //     console.log("Step 2");
  //     return sensorValues?.find((item) => item.id === Number(currentIot));
  //   }
  //   return undefined;
  // }, [currentIot, sensorValues]);
  // // Tổng tất cả giá trị các sensor
  // const sensorTotal = useMemo(() => {
  //   if (sensorValues) {
  //     console.log("Step 3", sensorValues);
  //     console.log("Step 3");
  //     console.log("Step 3");
  //     console.log("Step 3");
  //     return sensorValues.reduce(
  //       (pre, cur) => Number(pre?.total) + Number(cur?.total)
  //     );
  //   }
  //   return 0;
  // }, [sensorValues]);

  //
  //
  //
  //
  //
  //
  // IOT
  // const [projectTotal] = useGet_Total_Project_Minted();

  // quy đổi giá trị của iot thành số
  // const iotValues = useMemo(() => {
  //   if (projectTotal) {
  //     console.log("projectTotal", projectTotal);
  //     projectTotal?.map((item) => {
  //       console.log("Step 4");
  //       console.log("Step 4");
  //       console.log("Step 4");
  //       console.log("Step 4");
  //       console.log("Step 4----------------");
  //       let newVal = item?.amount;
  //       return {
  //         iotId: item?.iotId ?? 0,
  //         total: getAmount(newVal),
  //       };
  //     });
  //   }
  //   return [];
  // }, [projectTotal]);
  // Lọc iot hiện tại
  // const iotMinted = useMemo(() => {
  //   if (iotValues) {
  //     console.log("Step 5");
  //     console.log("Step 5");
  //     console.log("Step 5");
  //     console.log("Step 5----------------");
  //     return iotValues.find((item) => item.iotId === Number(currentIot));
  //   }
  //   return undefined;
  // }, [currentIot, iotValues]);
  // Tổng giá trị của iots
  // const iotTotal = useMemo(() => {
  //   if (iotValues) {
  //     console.log("Step 6");
  //     console.log("Step 6");
  //     console.log("Step 6");
  //     console.log("Step 6");
  //     return iotValues.reduce(
  //       (pre, cur) => Number(pre?.total) + Number(cur?.total)
  //     );
  //   }
  //   return 0;
  // }, [iotValues]);
  // useEffect(() => {
  //   console.log("sensor group -----------------------");
  //   console.log("sensor group -----------------------");
  //   console.log("sensor group -----------------------");
  //   console.log("sensor group -----------------------");
  //   console.log("sensorValues", sensorValues);
  //   console.log("sensorGenerated", sensorGenerated);
  //   console.log("sensorTotal", sensorTotal);
  // }, [sensorGenerated, sensorTotal, sensorValues]);

  // useEffect(() => {
  //   console.log("iot group -----------------------");
  //   console.log("iot group -----------------------");
  //   console.log("iot group -----------------------");
  //   console.log("iot group -----------------------");
  //   console.log("iotValues", iotValues);
  //   console.log("iotMinted", iotMinted);
  //   console.log("iotTotal", iotTotal);
  // }, [iotMinted, iotTotal, iotValues]);

  // useEffect(() => {
  //   console.log("-----------1111 -----------------------");
  //   console.log("-----------1111 -----------------------");
  //   console.log("-----------1111 -----------------------");
  //   console.log("-----------1111 -----------------------");
  //   console.log("sensorId", sensorId);
  //   console.log("typeSensor", typeSensor);
  //   console.log("currentIot", currentIot);
  // }, [currentIot, sensorId, typeSensor]);

  // const handleTitleTotal = (type) => {
  //   let text = "Total carbon minted";
  //   if (type) {
  //     text = `Total ${SENSOR__TYPE_TEXT[type].toLowerCase()} generated`;
  //   }
  //   return text;
  // };
  return (
    <div>
      {/* <div className="flex flex-wrap gap-8">
        <div className="w-full lg:w-[170px]">
          <div>
            <p className="text-B-M leading-B-M text-extended-300">
              {handleTitleTotal(typeSensor)}
            </p>
            <p className="text-B-M leading-B-M text-extended-300">
              (all generator)
            </p>
          </div>
          <h3 className="text-H-M leading-H-M text-white">
            {typeSensor === 0 ? iotTotal : getAmountbyNumber(sensorTotal)}
          </h3>
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap md:flex-nowrap border border-extended-700 rounded-md ">
            <Yesterday
              typeSensor={typeSensor}
              id={currentIot}
              sensorId={sensorId}
            />
            <PastWeek
              sensorId={sensorId}
              typeSensor={typeSensor}
              id={currentIot}
            />
            <Past30
              typeSensor={typeSensor}
              id={currentIot}
              sensorId={sensorId}
            />
            <AllTime
              loading={loading}
              iotMinted={iotMinted}
              sensorGenerated={sensorGenerated}
              typeSensor={typeSensor}
              id={currentIot}
              sensorId={sensorId}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
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
