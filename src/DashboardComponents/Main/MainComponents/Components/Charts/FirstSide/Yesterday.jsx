import { AxiosGet } from "src/redux/sagaUtils";
import TotalBoxBorder from "../TotalBoxBorder";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apiTotalCarbon, apiTotalSensor } from "./handle";
import { hexToString } from "src/tools/const";

export function Yesterday({ typeSensor, id, sensorId }) {
  const [data, setData] = useState(0);
  const [loading, setLoading] = useState(false);
  const getYesterday = useCallback((type, sensor, iot) => {
    setLoading(true);
    let newDate = new Date();
    newDate.setDate(newDate.getDate() - 1);
    newDate.setHours(0, 0, 0, 0);
    let from = new Date(newDate.getTime());
    newDate.setHours(23, 59, 59);
    let to = new Date(newDate.getTime());

    let url = "";
    console.log("getYesterday --------------------- ");
    console.log("getYesterday --------------------- ");
    console.log("getYesterday --------------------- ");
    console.log("getYesterday --------------------- ");
    console.log("getYesterday --------------------- ", type);
    if (type === 0) {
      url = apiTotalCarbon(iot, from, to);
    } else {
      url = apiTotalSensor(iot, sensor, from, to, 1);
    }
    console.log("huhu");
    AxiosGet(url)
      .then((res) => {
        console.log("resss", res);
        if (type === 0) {
          setData(res.data);
        } else {
          setData(res.data?.metrics);
        }
      })
      .catch((er) => console.log("getYesterday failed ", er))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    // console.log("user effect getYesterday", { id, sensorId, typeSensor });
    if ((id || sensorId) && typeSensor >= 0) {
      getYesterday(typeSensor, sensorId, id);
    }
  }, [getYesterday, id, sensorId, typeSensor]);
  const number = useMemo(() => {
    if (data?.length > 0 && typeSensor >= 0) {
      console.log("dataa_____________");
      console.log("dataa_____________");
      console.log("dataa_____________", data);
      if (typeSensor === 0) {
        return data[0]?.carbon;
      } else {
        let checkdata = data[0]?.value;
        return checkdata;
      }
    }
    return 0;
  }, [data, typeSensor]);
  return (
    <TotalBoxBorder
      className={"border-r border-b md:border-b-0"}
      title={"Yesterday"}
      number={number}
      loading={loading}
    />
  );
}
