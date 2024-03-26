import { AxiosGet } from "src/redux/sagaUtils";
import TotalBoxBorder from "../TotalBoxBorder";
import { useCallback, useEffect, useMemo } from "react";
import { apiTotalCarbon, apiTotalSensor } from "./handle";
import {
  getAmountbyNumber,
  getSum,
} from "src/DashboardComponents/handleConfig";

export function Past30({
  typeSensor,
  id,
  sensorId,
  loading,
  setLoading,
  data,
  setData,
}) {
  // Hàm lấy dữ liệu 30 ngày trước
  // Hàm lấy dữ liệu 30 ngày trước
  // Hàm lấy dữ liệu 30 ngày trước
  // Hàm lấy dữ liệu 30 ngày trước
  const getPast30 = useCallback(
    (type, sensor, iot) => {
      setLoading(true);
      let newDate = new Date();
      newDate.setHours(23, 59, 59);
      // console.log("new to  : =======", newDate);
      let to = new Date(newDate.getTime());
      newDate.setMonth(newDate.getMonth() - 1);

      // console.log("new from: =======", newDate);
      let from = new Date(newDate.getTime());

      let url = "";
      if (type === 0) {
        url = apiTotalCarbon(iot, from, to);
      } else {
        url = apiTotalSensor(iot, sensor, from, to, 1);
      }
      // console.log("getPast30 --------------------------------", url);
      AxiosGet(url)
        .then((res) => {
          let newData = [];        
          newData = res.data?.data?.map((item) => ({            
            // it has the same response element, so there is no need switch_case.
            time:  item.createdAt, // "typeSensor === 0 ? item?.createdAt : item.createdAt,"
            created: item?.[type === 0 ? "carbon" : "value"] ?? 0,
          }));                    
          setData(newData);          
        })
        .catch((er) => console.log("getPast30 failed ", er))
        .finally(() => setLoading(false));      
    },
    [setData, setLoading, typeSensor]
  );

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

  const newNumber = useMemo(() => {  
    return getAmountbyNumber(number?.created);
  }, [number?.created]);
  return (
    <TotalBoxBorder
      className={"border-r border-b md:border-b-0"}
      title={"Past 30 days"}
      number={newNumber}
      loading={loading}
    />
  );
}
