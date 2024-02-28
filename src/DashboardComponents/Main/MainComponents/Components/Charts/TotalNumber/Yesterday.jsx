import TotalBoxBorder from "../TotalBoxBorder";
import { useMemo } from "react";

import { getAmountbyNumber } from "src/DashboardComponents/handleConfig";

export function Yesterday({ data, loading }) {
  // Từ data =>number
  // Từ data =>number
  // Từ data =>number
  // Từ data =>number
  const number = useMemo(() => {
    let newDate = new Date();
    let today = newDate.getDate();
    let yesterday = today - 1;

    let yesterdayData = { time: 0, created: 0 };
    if (data?.length > 1) {
      let filterIdx = data?.findIndex((item) => {
        let newDateByItem = new Date(item.time);
        return newDateByItem.getDate() === yesterday;
      });
      yesterdayData = data[filterIdx];
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
