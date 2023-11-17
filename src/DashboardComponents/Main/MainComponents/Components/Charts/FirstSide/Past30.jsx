import { AxiosGet } from "src/redux/sagaUtils";
import TotalBoxBorder from "../TotalBoxBorder";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apiTotalCarbon, apiTotalSensor } from "./handle";
import { SENSOR__UNIT } from "src/tools/const";
import { getAmountbyNumber } from "src/DashboardComponents/handleConfig";

export function Past30({ typeSensor, id, sensorId }) {
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(false);
  // Hàm lấy dữ liệu 30 ngày trước
  // Hàm lấy dữ liệu 30 ngày trước
  // Hàm lấy dữ liệu 30 ngày trước
  // Hàm lấy dữ liệu 30 ngày trước
  const getPast30 = useCallback((type, sensor, iot) => {
    setLoading(true);
    let newDate = new Date();
    newDate.setHours(23, 59, 59);
    // console.log("new to  : =======", newDate);
    let to = new Date(newDate.getTime());
    newDate.setMonth(newDate.getMonth() - 1);

    // console.log("new from: =======", newDate);
    let from = new Date(newDate.getTime());

    let url = "";
    // console.log("getPast30 --------------------- ");
    // console.log("getPast30 --------------------- ");
    // console.log("getPast30 --------------------- ", type);
    if (type === 0) {
      url = apiTotalCarbon(iot, from, to);
    } else {
      url = apiTotalSensor(iot, sensor, from, to, 1);
    }
    // console.log("getPast30 --------------------------------", url);
    AxiosGet(url)
      .then((res) => {
        // console.log("getPast30 ________res ", res);
        let values = [];
        values = res.data?.map(
          (item) => item?.[type === 0 ? "carbon" : "value"] ?? 0
        );
        setData(values);
      })
      .catch((er) => console.log("getPast30 failed ", er))
      .finally(() => setLoading(false));
  }, []);

  // Lấy dữ liệu 30 ngày trước nếu đủ điều kiện
  // Lấy dữ liệu 30 ngày trước nếu đủ điều kiện
  // Lấy dữ liệu 30 ngày trước nếu đủ điều kiện
  // Lấy dữ liệu 30 ngày trước nếu đủ điều kiện
  useEffect(() => {
    if ((id || sensorId) && typeSensor >= 0) {
      getPast30(typeSensor, sensorId, id);
    }
  }, [getPast30, id, sensorId, typeSensor]);
  // Từ data =>number
  // Từ data =>number
  // Từ data =>number
  // Từ data =>number
  const number = useMemo(() => {
    if (data?.length > 0) {
      let total = 0;
      total = data.reduce((prev, curr) => prev + curr);
      return total;
    }
    return 0;
  }, [data]);
  return (
    <TotalBoxBorder
      className={"border-r border-b md:border-b-0"}
      title={"Past 30 days"}
      number={getAmountbyNumber(number)}
      loading={loading}
      unit={SENSOR__UNIT[typeSensor]}
    />
  );
}
