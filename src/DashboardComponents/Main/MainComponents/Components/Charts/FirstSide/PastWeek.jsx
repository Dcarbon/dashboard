import { AxiosGet } from "src/redux/sagaUtils";
import TotalBoxBorder from "../TotalBoxBorder";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apiTotalCarbon, apiTotalSensor } from "./handle";
import { hexToString } from "src/tools/const";

export function PastWeek({ typeSensor, id, sensorId }) {
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(false);
  const getPastWeek = useCallback((type, sensor, iot) => {
    setLoading(true);
    let newDate = new Date();
    newDate.setDate(newDate.getDate() - 1);
    newDate.setHours(23, 59, 59);
    console.log("new to: =======", newDate);
    let to = new Date(newDate.getTime());
    newDate.setDate(newDate.getDate() - 6);
    newDate.setHours(0, 0, 0, 0);
    console.log("new from: =======", newDate);
    let from = new Date(newDate.getTime());

    let url = "";
    console.log("getPastWeek --------------------- ");
    console.log("getPastWeek --------------------- ");
    console.log("getPastWeek --------------------- ");
    console.log("getPastWeek --------------------- ");
    console.log("getPastWeek --------------------- ", type);
    if (type === 0) {
      url = apiTotalCarbon(iot, from, to);
    } else {
      url = apiTotalSensor(iot, sensor, from, to, 1);
    }
    console.log("getPastWeek --------------------- ", url);
    AxiosGet(url)
      .then((res) => {
        console.log("resss", res);
        if (type === 0) {
          setData(res.data);
        } else {
          setData(res.data?.metrics);
        }
      })
      .catch((er) => console.log("getPastWeek failed ", er))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    console.log("user effect getPastWeek", { id, sensorId, typeSensor });
    if ((id || sensorId) && typeSensor >= 0) {
      getPastWeek(typeSensor, sensorId, id);
    }
  }, [getPastWeek, id, sensorId, typeSensor]);
  const number = useMemo(() => {
    if (data?.length > 0) {
      if (typeSensor === 0) {
        return data[0]?.carbon;
      } else {
        let checkdata = data[0]?.data;
        if (checkdata) {
          let amountData = hexToString(data[0]?.data);
          if (amountData) {
            return JSON?.parse(amountData)?.indicator?.value;
          }
        }
      }
    }
    return 0;
  }, [data, typeSensor]);
  return (
    <TotalBoxBorder
      className={"border-r border-b md:border-b-0"}
      title={"Average past week"}
      number={number}
      loading={loading}
    />
  );
}
