import TotalBoxBorder from "../TotalBoxBorder";
import { useMemo } from "react";

import {
  getAmountbyNumber,
  getAmountbyNumber2,
  getSum,
} from "src/DashboardComponents/handleConfig";
import SensorTypes from "./SensorType";

export function PastWeek({ data, loading,typeSensor }) {
  // Từ data =>number
  // Từ data =>number
  // Từ data =>number
  // Từ data =>number
  const number = useMemo(() => {    
    // Get today's date
    const currentDate = new Date();
    const today = currentDate.getDate();
  
    // Initialize yesterday's data
    let yesterdayData = { time: 0, created: 0 };
    if (data?.length > 1) {
      const filterData = data.filter(item => {                              
        let newDateByItem = new Date(Number(item.time));
        let dateByItem = newDateByItem.getDate();                                 
        return dateByItem <= today && dateByItem > today - 7;
      });
      // Calculate total created value for the previous week
      if (filterData.length > 0) {
        const totalCreated = filterData.reduce((prev, curr) => ({
          ...prev,
          created: getSum(prev.created, curr.created)
        }));
        yesterdayData = totalCreated;
      }
    }    
    return yesterdayData;
  }, [data]);
  const newNumber = useMemo(() => {
    try {
      return SensorTypes.get(typeSensor)===true?getAmountbyNumber2(number?.created) : getAmountbyNumber(number?.created);
    } catch (error) {
      console.log("PastWeek: ",error)
      return 0;
    }
  }, [number?.created]);  
  return (
    <TotalBoxBorder
      className={"border-r border-b md:border-b-0"}
      title={"Average past week"}
      number={newNumber}
      loading={loading}
    />
  );
}
