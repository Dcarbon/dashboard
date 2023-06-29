import BigNumber from "bignumber.js";

import dateFormat from "dateformat";
const roundup_second = (time) => Math.round(time.getTime() / 1000);

export const Get_Duration_by_Type = (durationType) => {
  var thisDate = new Date(); // now
  let to = roundup_second(thisDate);
  let from;
  switch (durationType) {
    case 0: // 7 ngay
      thisDate?.setUTCDate(thisDate?.getUTCDate() - 6);
      break;
    case 1: // 1 thang
      thisDate?.setUTCMonth(thisDate?.getUTCMonth() - 1);
      break;
    case 2: // 6 thang
      thisDate?.setUTCMonth(thisDate?.getUTCMonth() - 6);
      break;
    case 3: // 1 nam
      thisDate?.setUTCFullYear(thisDate?.getUTCFullYear() - 1);
      break;
    default:
      thisDate = new Date(0);
      break;
  }

  // thisDate?.setUTCHours(0, 0, 0, 0);
  from = roundup_second(thisDate);

  return { to, from };
};
const oneDay = 24 * 60 * 60 * 1000;
const createArray = (length) => new Array(length);

export const getTimeLine = (durType) => {
  let newArr = [];
  if (durType === 0) {
    newArr = createArray(7);
  } else if (durType === 1) {
    let newDate = new Date();
    let thisMonthTime = newDate.getTime();
    newDate.setUTCMonth(newDate.getUTCMonth() - 1);
    let beforeMonthTime = newDate.getTime();
    newArr = createArray((thisMonthTime - beforeMonthTime) / oneDay);
  } else if (durType === 2) {
    newArr = createArray(6);
  } else if (durType === 3) {
    newArr = createArray(12);
  }
  if (newArr?.length > 0) {
    var prevDay = 0;
    var prevMonth = 0;
    var currentTime = 0;
    for (let idx = 0; idx < newArr.length; idx++) {
      var toDay = new Date();
      // toDay.setHours(0, 0, 0, 0);
      if (durType < 2) {
        currentTime = toDay.getTime() - prevDay;
        prevDay += oneDay;
      } else {
        currentTime = toDay.getUTCMonth() - prevMonth;
        prevMonth++;
      }
      newArr[idx] = durType < 2 ? currentTime : toDay.setUTCMonth(currentTime);
    }
  }
  // const toDate = newArr?.map((item) =>
  //   dateFormat(new Date(item), "dd/mm/yy __ hh:mm:ss")
  // );
  return newArr;
};
export const getAmount = (item) => {
  const hexAmount = new BigNumber(item.amount.toLocaleLowerCase());
  const reduceAmount = hexAmount.div("1e9");
  return reduceAmount.toFixed(4);
  // return reduceAmount;
};
const getSum = (prev, next) => Number(prev) + Number(next);
export const getStringDay = (durType, time) => {
  if (time) {
    const newTime = new Date(time);
    if (durType === "full") {
      return dateFormat(newTime, "d/m/yyyy");
    } else if (durType < 2) {
      return dateFormat(newTime, "dd/mmm");
    } else {
      return dateFormat(newTime, "mmm yyyy");
    }
  }
};
export const getDataSeries = (timeline, iot_minted, handleValue) => {
  let newSeriesArr = [];
  let onlyTime = [];
  let onlyVal = [];
  // console.log("timeline", timeline);
  for (let index = 0; index < timeline?.length; index++) {
    const elm_1 = timeline[index];
    const elm_2 = timeline[index + 1] ?? 0;
    let collect_by_time = [];
    collect_by_time = iot_minted?.filter((item) => {
      const created_at = new Date(item?.createdAt);
      let created_at_time = created_at.getTime();
      return elm_1 > created_at_time && elm_2 <= created_at_time;
    });
    const listAmount = collect_by_time?.map(handleValue);
    const amount = listAmount?.length > 0 ? listAmount?.reduce(getSum) : 0;
    newSeriesArr[index] = {
      x: elm_1,
      // y: amount,
      y: amount ?? "",
    };
    onlyTime[index] = elm_1;
    onlyVal[index] = parseFloat(amount).toFixed(4);
  }
  return {
    newSeriesArr: newSeriesArr?.reverse(),
    onlyTime: onlyTime?.reverse(),
    onlyVal: onlyVal?.reverse(),
  };
};
export const optionsDefault = {
  chart: {
    id: "myChart",
    type: "bar",
    width: "100%",
    height: 170,
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  dataLabels: {
    enabled: false,
    // formatter: (val) => parseFloat(val).toFixed(2),
  },
  series: [],
  noData: {
    text: "Loading ...",
    style: {
      color: "#ffffff",
    },
  },

  xaxis: {
    type: "datetime",
    show: true,
    categories: [],
    labels: { show: false },
    axisTicks: { show: false },
    axisBorder: { show: true, color: "#504F5A" },
  },

  // config
  colors: "#72BF44",
  fill: { opacity: 0.3 },

  grid: { show: false },
  crosshairs: {
    fill: {
      type: "gradient",
      gradient: {
        colorFrom: "#D8E3F0",
        colorTo: "#BED1E6",
        stops: [0, 100],
        opacityFrom: 0.4,
        opacityTo: 0.5,
      },
    },
  },
  tooltip: {
    enabled: true,
    marker: { show: true },
  },
  stroke: { show: false },
  plotOptions: {
    bar: {
      borderRadius: 4,
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "all",
    },
  },
  yaxis: {
    show: true,
    labels: {
      show: false,
    },
    axisBorder: {
      show: true,
      color: "#504F5A",
      offsetX: 0,
      offsetY: 0,
    },
  },
};
