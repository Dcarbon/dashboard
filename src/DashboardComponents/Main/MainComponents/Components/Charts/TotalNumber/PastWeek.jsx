import TotalBoxBorder from "../TotalBoxBorder";
import { useMemo } from "react";

import {
  getAmountbyNumber,
  getSum,
} from "src/DashboardComponents/handleConfig";

export function PastWeek({ data, loading }) {
  // Từ data =>number
  // Từ data =>number
  // Từ data =>number
  // Từ data =>number
  const number = useMemo(() => {
    let newDate = new Date();
    let time = newDate.getTime();
    let day = newDate.getDay();
    let timeOfOneDay = 1000 * 60 * 60 * 24;
    let overtime = timeOfOneDay * day;
    newDate.setTime(time - overtime);
    let endWeek = newDate.getDate();

    let yesterdayData = { time: 0, created: 0 };
    if (data?.length > 1) {
      let filterData = data?.filter((item) => {
        let newDateByItem = new Date(item.time);
        let dateByItem = newDateByItem.getDate();
        return dateByItem <= endWeek && dateByItem > endWeek - 7;
      });
      let total = 0;
      if (filterData?.length > 0) {
        total = filterData?.reduce((prev, curr) => ({
          ...prev,
          created: getSum(Number(prev.created), Number(curr.created)),
        }));
      }
      yesterdayData = total;
    }
    return yesterdayData;
  }, [data]);
  const newNumber = useMemo(() => {
    return getAmountbyNumber(number?.created);
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
