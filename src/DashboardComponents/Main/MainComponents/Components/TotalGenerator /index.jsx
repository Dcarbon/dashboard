import {
  useCurrentIOTState,
  useTotalSensorGenerated,
  useGetTotalIot_byProject,
  useGet_Total_Project_Minted,
  useGetProject,
} from "src/DashboardComponents/handleData";
import { SENSOR__TYPE_TEXT } from "src/tools/const";
import { Yesterday } from "../Charts/FirstSide/Yesterday";
import { PastWeek } from "../Charts/FirstSide/PastWeek";
import { Past30 } from "../Charts/FirstSide/Past30";
import { AllTime } from "../Charts/FirstSide/AllTime";
import { useMemo } from "react";
import {
  getAmount,
  getAmountbyNumber,
} from "src/DashboardComponents/handleConfig";

function TotalGenerator({ typeSensor, sensorId }) {
  const [currentIot] = useCurrentIOTState();
  const totalIots = useGetTotalIot_byProject();
  const projectState = useGetProject();
  //
  //
  //
  //
  //
  // SENSOR
  // totalSensorGenerated là 1 mảng
  // mảng có các phần tử là sensor id
  // đi kèm nó là 1 mảng các giá trị đã sinh ra
  const { data: totalSensorGenerated, loading } = useTotalSensorGenerated(
    totalIots,
    typeSensor,
    projectState?.id ?? 0,
    sensorId
  );
  // quy đổi giá trị của sensor thành số
  const sensorValues = useMemo(
    () =>
      totalSensorGenerated?.map((item) => {
        let newVal =
          item?.data?.length > 0
            ? item.data.reduce((prev, curr) => {
                return {
                  value: Number(prev.value) + Number(curr.value),
                };
              })
            : { value: 0 };

        return {
          ...item,
          total: newVal.value,
        };
      }),
    [totalSensorGenerated]
  );
  // Lọc ra sensor hiện tại
  const sensorGenerated = useMemo(
    () => sensorValues?.find((item) => item.id === Number(currentIot)),
    [currentIot, sensorValues]
  );
  // Tổng tất cả giá trị các sensor
  const sensorTotal = useMemo(
    () =>
      sensorValues?.length > 0
        ? sensorValues.reduce(
            (pre, cur) => Number(pre?.total) + Number(cur?.total)
          )
        : 0,
    [sensorValues]
  );

  //
  //
  //
  //
  //
  //
  // IOT
  const [projectTotal] = useGet_Total_Project_Minted();
  // quy đổi giá trị của iot thành số
  const iotValues = useMemo(
    () =>
      projectTotal?.map((item) => {
        let newVal = item?.amount;
        return {
          iotId: item.iotId,
          total: getAmount(newVal),
        };
      }),
    [projectTotal]
  );
  // Lọc iot hiện tại
  const iotMinted = useMemo(
    () =>
      iotValues?.length > 0
        ? iotValues.find((item) => item.iotId === Number(currentIot))
        : [],
    [currentIot, iotValues]
  );
  // Tổng giá trị của iots
  const iotTotal = useMemo(
    () =>
      iotValues?.length > 0
        ? iotValues.reduce(
            (pre, cur) => Number(pre?.total) + Number(cur?.total)
          )
        : 0,
    [iotValues]
  );
  const handleTitleTotal = (type) => {
    let text = "Total carbon minted";
    if (type) {
      text = `Total ${SENSOR__TYPE_TEXT[type].toLowerCase()} generated`;
    }
    return text;
  };
  return (
    <div>
      <div className="flex flex-wrap gap-8">
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
      </div>
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
