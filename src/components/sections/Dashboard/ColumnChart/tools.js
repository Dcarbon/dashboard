import BigNumber from "bignumber.js";

import dateFormat from "dateformat";
export const roundup_second = (time) => Math.round(time.getTime() / 1000);
export const DURATION_TYPE_modal = {
  WEEK: 1, // 7 ngày
  MONTH: 2, // 7 ngày
  MONTHs: 3, // 7 ngày
  YEAR: 4, // 7 ngày
};

export const Get_Duration_by_Type = (durationType) => {
  var thisDate = new Date(); // now
  let to = roundup_second(thisDate);
  let from;
  switch (durationType) {
    case DURATION_TYPE_modal.WEEK: // 7 ngay
      thisDate?.setUTCDate(thisDate?.getUTCDate() - 6);
      break;
    case DURATION_TYPE_modal.MONTH: // 1 thang
      thisDate?.setUTCMonth(thisDate?.getUTCMonth() - 1);
      break;
    case DURATION_TYPE_modal.MONTHs: // 6 thang
      thisDate?.setUTCMonth(thisDate?.getUTCMonth() - 6);
      break;
    case DURATION_TYPE_modal.YEAR: // 1 nam
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
  // ngay
  if (durType === DURATION_TYPE_modal.WEEK) {
    newArr = createArray(7);
    // thang
  } else if (durType === DURATION_TYPE_modal.MONTH) {
    let newDate = new Date();
    let thisMonthTime = newDate.getTime();
    newDate.setUTCMonth(newDate.getUTCMonth() - 1);
    let beforeMonthTime = newDate.getTime();
    newArr = createArray((thisMonthTime - beforeMonthTime) / oneDay);
    // 6 thang
  } else if (durType === DURATION_TYPE_modal.MONTHs) {
    newArr = createArray(6);
    // nam
  } else if (durType === DURATION_TYPE_modal.YEAR) {
    newArr = createArray(12);
  }
  if (newArr?.length > 0) {
    var prevDay = 0;
    var prevMonth = 0;
    var currentTime = 0;
    for (let idx = 0; idx < newArr.length; idx++) {
      var toDay = new Date();
      toDay.setHours(0, 0, 0, 0);
      if (durType < DURATION_TYPE_modal.MONTHs) {
        currentTime = toDay.getTime() - prevDay;
        prevDay += oneDay;
      } else {
        currentTime = toDay.getMonth() - prevMonth;
        prevMonth++;
      }
      newArr[idx] =
        durType < DURATION_TYPE_modal.MONTHs
          ? currentTime
          : toDay.setMonth(currentTime);
    }
  }

  return newArr;
};
export const getAmount = (item) => {
  const hexAmount = new BigNumber(item);
  const reduceAmount = hexAmount.div("1e9");
  let fxied = reduceAmount.toFixed(2);
  // if (text) {
  //   console.log(text + " ||||-----------------------", item);
  //   console.log("hexAmount--------------", hexAmount);
  //   console.log("reduceAmount-----------", reduceAmount);
  //   console.log("fxied-----------------------------", fxied);
  // }
  return Math.round(fxied * 1000) / 1000;
  // return 0;
};
const getSum = (prev, next) => Number(prev) + Number(next);
export const getStringDay = (durType, time) => {
  if (time) {
    const newTime = new Date(time);
    if (durType === "full") {
      return dateFormat(newTime, "dd mmm yyyy");
    } else if (durType < DURATION_TYPE_modal.MONTHs) {
      return dateFormat(newTime, "dd mmm");
    } else {
      return dateFormat(newTime, "mmm yyyy");
    }
  }
};

export const getDataSeries = (timeline, iot_minted, durType) => {
  let newSeriesArr = [];
  let onlyTime = [];
  let onlyVal = [];
  let getTimeToCompare = (time) => {
    let newDate = new Date(time);
    newDate.setHours(0, 0, 0, 0);
    if (durType > DURATION_TYPE_modal.MONTH) {
      newDate.setDate(1);
    }
    return newDate.getTime();
  };
  for (let index = 0; index < timeline?.length; index++) {
    const thisTime = timeline[index];
    let compare1 = getTimeToCompare(thisTime, "ONE");
    let getData_inThisTime = iot_minted?.filter((item) => {
      // lọc data trả về
      // lấy ngày tạo
      // đổi sang date
      let compare2 = getTimeToCompare(item.createdAt, "TWO");
      // so sánh ngày tạo và thời gian tại vòng lặp này
      return compare1 === compare2;
    });
    const listAmount = getData_inThisTime?.map((item) => item.carbon ?? 0);
    const amount = listAmount?.length > 0 ? listAmount?.reduce(getSum) : 0;
    let returnTime = thisTime;
    let returnVal = amount ?? "";
    newSeriesArr[index] = {
      x: returnTime,
      y: returnVal,
    };
    onlyTime[index] = returnTime;
    // onlyVal[index] = parseFloat(amount).toFixed(4);
    onlyVal[index] = returnVal;
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
  },

  xaxis: {
    type: "categories",
    categories: [],
    labels: { show: false },
    axisTicks: { show: true, color: "#504F5A" },
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
