import TotalBoxBorder from "../TotalBoxBorder";
import { useMemo } from "react";

import { getAmountbyNumber } from "src/DashboardComponents/handleConfig";

export function Yesterday({ data, loading }) {
  // Từ data =>number
  // Từ data =>number
  // Từ data =>number
  // Từ data =>number
  const number = useMemo(() => {
    const today = new Date().getDate();
    const yesterday = today - 1;
    
    let yesterdayData = { time: 0, created: 0 };
    if (data?.length > 1) {
      const filteredData = data.find(item => {
        const newDateByItem = new Date(Number(item.time));
        return newDateByItem.getDate() === yesterday;
      });
      if (filteredData) {
        yesterdayData = filteredData;
      }
    }
    return yesterdayData;
  }, [data]);
  const newNumber = useMemo(() => {
    return getAmountbyNumber(number?.created);
  }, [number?.created]);
  return (
    <TotalBoxBorder
      className={"border-r border-b md:border-b-0"}
      title={"Yesterday"}
      number={newNumber}
      loading={loading}
    />
  );
}
