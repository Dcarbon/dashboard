import { AxiosGet } from "src/redux/sagaUtils";
import TotalBoxBorder from "../TotalBoxBorder";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apiTotalCarbon, apiTotalSensor } from "./handle";
import { SENSOR__UNIT } from "src/tools/const";

export function AllTime({ typeSensor, id, sensorId }) {
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(false);
  // Hàm lấy dữ liệu 30 ngày trước
  // Hàm lấy dữ liệu 30 ngày trước
  // Hàm lấy dữ liệu 30 ngày trước
  // Hàm lấy dữ liệu 30 ngày trước
  const getAllTime = useCallback((type, sensor, iot) => {
    setLoading(true);
    let newDate = new Date();
    newDate.setHours(23, 59, 59);
    let to = new Date(newDate.getTime());

    let url = "";
    if (type === 0) {
      url = apiTotalCarbon(iot, 0, to, 2);
    } else {
      url = apiTotalSensor(iot, sensor, 0, to, 2);
    }
    console.log("getAllTime --------------------------------", url);
    AxiosGet(url)
      .then((res) => {
        let values = [];
        values = res.data?.map(
          (item) => item?.[type === 0 ? "carbon" : "value"] ?? 0
        );
        setData(values);
      })
      .catch((er) => console.log("getAllTime failed ", er))
      .finally(() => setLoading(false));
  }, []);

  // Lấy dữ liệu 30 ngày trước nếu đủ điều kiện
  // Lấy dữ liệu 30 ngày trước nếu đủ điều kiện
  // Lấy dữ liệu 30 ngày trước nếu đủ điều kiện
  // Lấy dữ liệu 30 ngày trước nếu đủ điều kiện
  useEffect(() => {
    if ((id || sensorId) && typeSensor >= 0) {
      getAllTime(typeSensor, sensorId, id);
    }
  }, [getAllTime, id, sensorId, typeSensor]);
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
      number={number}
      loading={loading}
      unit={SENSOR__UNIT[typeSensor]}
    />
  );
}
