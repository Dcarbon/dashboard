import { AxiosGet } from "src/redux/sagaUtils";
import TotalBoxBorder from "../TotalBoxBorder";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apiTotalCarbon, apiTotalSensor } from "./handle";
import { SENSOR__UNIT } from "src/tools/const";
import { getAmountbyNumber } from "src/DashboardComponents/handleConfig";

export function Yesterday({ typeSensor, id, sensorId }) {
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(false);
  // Hàm lấy dữ liệu hôm trước
  // Hàm lấy dữ liệu hôm trước
  // Hàm lấy dữ liệu hôm trước
  // Hàm lấy dữ liệu hôm trước
  const getYesterday = useCallback((type, sensor, iot) => {
    setLoading(true);
    let newDate = new Date();
    newDate.setDate(newDate.getDate() - 1);
    newDate.setHours(0, 0, 0, 0);
    let from = new Date(newDate.getTime());
    newDate.setHours(23, 59, 59);
    let to = new Date(newDate.getTime());
    let url = "";
    if (type === 0) {
      url = apiTotalCarbon(iot, from, to);
    } else {
      url = apiTotalSensor(iot, sensor, from, to, 1);
    }
    console.log("getYesterday --------------------------------", url);
    AxiosGet(url)
      .then((res) => {
        console.log("getYesterday ______resss", res);
        let values = [];
        values = res.data ?? 0;
        setData(values);
      })
      .catch((er) => console.log("getYesterday failed ", er))
      .finally(() => setLoading(false));
  }, []);

  // Lấy dữ liệu hôm trước nếu đủ điều kiện
  // Lấy dữ liệu hôm trước nếu đủ điều kiện
  // Lấy dữ liệu hôm trước nếu đủ điều kiện
  // Lấy dữ liệu hôm trước nếu đủ điều kiện
  useEffect(() => {
    if ((id || sensorId) && typeSensor >= 0) {
      getYesterday(typeSensor, sensorId, id);
    }
  }, [getYesterday, id, sensorId, typeSensor]);
  // Từ data =>number
  // Từ data =>number
  // Từ data =>number
  // Từ data =>number
  const number = useMemo(() => {
    if (data?.length > 0 && typeSensor >= 0) {
      return data[0]?.[typeSensor === 0 ? "carbon" : "value"];
    }
    return 0;
  }, [data, typeSensor]);

  return (
    <TotalBoxBorder
      className={"border-r border-b md:border-b-0"}
      title={"Yesterday"}
      number={getAmountbyNumber(number)}
      loading={loading}
      unit={SENSOR__UNIT[typeSensor]}
    />
  );
}
