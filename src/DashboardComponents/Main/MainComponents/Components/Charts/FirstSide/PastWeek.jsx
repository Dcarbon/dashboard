import { AxiosGet } from "src/redux/sagaUtils";
import TotalBoxBorder from "../TotalBoxBorder";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apiTotalCarbon, apiTotalSensor } from "./handle";
import { SENSOR__UNIT } from "src/tools/const";

export function PastWeek({ typeSensor, id, sensorId }) {
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(false);
  // Hàm lấy dữ liệu tuần trước
  // Hàm lấy dữ liệu tuần trước
  // Hàm lấy dữ liệu tuần trước
  // Hàm lấy dữ liệu tuần trước
  const getPastWeek = useCallback((type, sensor, iot) => {
    setLoading(true);
    let newDate = new Date();
    newDate.setHours(23, 59, 59);
    newDate.setDate(newDate.getDate() - 1);
    let to = new Date(newDate.getTime());
    newDate.setDate(newDate.getDate() - 7);
    let from = new Date(newDate.getTime());

    let url = "";
    if (type === 0) {
      url = apiTotalCarbon(iot, from, to);
    } else {
      url = apiTotalSensor(iot, sensor, from, to, 1);
    }
    console.log("getPastWeek --------------------------------", url);
    AxiosGet(url)
      .then((res) => {
        console.log("getPastWeek ________res ", res);
        let values = [];
        values = res.data?.map(
          (item) => item?.[type === 0 ? "carbon" : "value"] ?? 0
        );
        setData(values);
      })
      .catch((er) => console.log("getPastWeek failed ", er))
      .finally(() => setLoading(false));
  }, []);

  // Lấy dữ liệu tuần trước nếu đủ điều kiện
  // Lấy dữ liệu tuần trước nếu đủ điều kiện
  // Lấy dữ liệu tuần trước nếu đủ điều kiện
  // Lấy dữ liệu tuần trước nếu đủ điều kiện
  useEffect(() => {
    console.log("user effect getPastWeek", { id, sensorId, typeSensor });
    if ((id || sensorId) && typeSensor >= 0) {
      getPastWeek(typeSensor, sensorId, id);
    }
  }, [getPastWeek, id, sensorId, typeSensor]);
  // Từ data =>number
  // Từ data =>number
  // Từ data =>number
  // Từ data =>number
  const number = useMemo(() => {
    if (data?.length > 0) {
      let total = 0;
      let length = data?.length;
      total = data.reduce((prev, curr) => prev + curr);
      return total / length;
    }
    return 0;
  }, [data]);

  return (
    <TotalBoxBorder
      className={"border-r border-b md:border-b-0"}
      title={"Average past week"}
      number={number}
      loading={loading}
      unit={SENSOR__UNIT[typeSensor]}
    />
  );
}
