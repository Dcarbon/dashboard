import {
  getAmountbyNumber,
  getSum,
} from "src/DashboardComponents/handleConfig";
import TotalBoxBorder from "../TotalBoxBorder";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHandleIots_minted, useIots_Minted } from "src/hook/useIOT";
import { AxiosGet } from "src/redux/sagaUtils";
import { apiTotalSensor } from "./handle";

export function AllTime({ typeSensor, id, sensorId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [total] = useIots_Minted();
  const values = useHandleIots_minted(total);

  // Hàm lấy dữ liệu
  // Hàm lấy dữ liệu
  // Hàm lấy dữ liệu
  const getAllTimeSensor = useCallback(
    (type, sensor, iot) => {
      setLoading(true);
      let newDate = new Date();
      newDate.setHours(23, 59, 59);
      let to = new Date(newDate.getTime());
      let url = "";
      url = apiTotalSensor(iot, sensor, 0, to, 2);
      AxiosGet(url)
        .then((res) => {
          let newData = [];
          newData = res.data?.data?.map((item) => ({
            time: typeSensor === 0 ? item?.createdAt : item.time,
            created: item?.[type === 0 ? "carbon" : "value"] ?? 0,
          }));
          setData(newData);
        })
        .catch((er) => console.log("getAlltime failed ", er))
        .finally(() => setLoading(false));
    },
    [setData, setLoading, typeSensor]
  );
  // Get data
  // Get data
  // Get data
  // Get data
  useEffect(() => {
    if (typeSensor !== 0 && id && sensorId) {
      getAllTimeSensor(typeSensor, sensorId, id);
    }
  }, [getAllTimeSensor, id, sensorId, typeSensor]);
  // Từ data =>number
  // Từ data =>number
  // Từ data =>number
  // Từ data =>number
  const numberSensor = useMemo(() => {
    if (data?.length > 0) {
      let total = 0;
      total = data.reduce((prev, curr) => {
        return {
          ...prev,
          created: getSum(prev?.created ?? 0, curr?.created ?? 0),
        };
      });      
      return total;
    }
    return { time: 0, created: 0 };
  }, [data]);
  const numberIOT = useMemo(() => {
    let returnNumb = { amount: 0 };
    if (values?.length > 0) {
      let newVal = values.find((item) => Number(item.iotId) === Number(id));

      if (newVal) {
        returnNumb = newVal;
      }
    }
    return returnNumb;
  }, [id, values]);
  const newNumber = useMemo(() => {    
    return getAmountbyNumber(numberSensor?.created);
  }, [numberSensor?.created]);
  return (
    <TotalBoxBorder
      className={"border-r border-b md:border-b-0"}
      title={"All time"}
      number={
        typeSensor === 0
          ? Number(numberIOT?.amount)
          : newNumber
      }
      loading={loading}
    />
  );
}
