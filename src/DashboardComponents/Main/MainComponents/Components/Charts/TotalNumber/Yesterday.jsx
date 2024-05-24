import TotalBoxBorder from "../TotalBoxBorder";
import { useMemo } from "react";

import { getAmountbyNumber, getAmountbyNumber2 } from "src/DashboardComponents/handleConfig";
import SensorTypes from "./SensorType";

export function Yesterday({ data, loading,typeSensor }) {
  // Từ data =>number
  // Từ data =>number
  // Từ data =>number
  // Từ data =>number
  const number = useMemo(() => {
    const today = new Date();
    const yesterday = today.getDate() - 1;
    const month = today.getMonth();    
    let yesterdayData = 0;
    if (data?.length > 1) {                
      
      for (var i=0; i < data.length; i++) {
        const newDateByItem = new Date(Number(data[i].time));     
        if(newDateByItem.getDate() === yesterday && newDateByItem.getMonth() === month){
          yesterdayData = Number(yesterdayData) + Number(data[i].created);
        }
      }
    }
    return yesterdayData;
  }, [data]);
  const newNumber = useMemo(() => {    
    try {
      return SensorTypes.get(typeSensor)===true?getAmountbyNumber2(number) : getAmountbyNumber(number);
    } catch (error) {
      console.log("Yesterday: ", error)
      return 0;
    }
  }, [number]);
  return (
    <TotalBoxBorder
      className={"border-r border-b md:border-b-0"}
      title={"Yesterday"}
      number={newNumber}
      loading={loading}
    />
  );
}
