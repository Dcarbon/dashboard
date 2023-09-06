import BigNumber from "bignumber.js";

import dateFormat from "dateformat";
export const roundup_second = (time) => Math.round(time?.getTime() / 1000);
export const DURATION_TYPE_modal = {
  WEEK: 1, // 7 ngày
  MONTH: 2, // 7 ngày
  MONTHs: 3, // 7 ngày
  YEAR: 4, // 7 ngày
};

export const DURATION__TYPE = {
  day: "day",
  month: "month",
  year: "year",
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
    //
    //
    //
    //
    //
    //
  }

  // thisDate?.setUTCHours(0, 0, 0, 0);
  from = roundup_second(thisDate);

  return { to, from };
};

const oneHour = 60 * 60 * 1000;
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
  let fixed = reduceAmount.toFixed(2);

  return fixed;
  // return 0;
};
export const getSum = (prev, next) => Number(prev) + Number(next);
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
export const GET_STRING_DAY = (durType, time) => {
  if (time) {
    const newTime = new Date(time);
    if (durType === DURATION__TYPE.day) {
      let prevTime = new Date(time - oneHour * 3);
      return (
        dateFormat(prevTime, "HH:MM") + " - " + dateFormat(newTime, "HH:MM")
      );
    } else if (durType === DURATION__TYPE.month) {
      return dateFormat(newTime, "mmm dd, yyyy");
    } else {
      return dateFormat(newTime, "mmmm yyyy");
    }
  }
};
export const GET_STRING_DAY_LineChart = (durType, time) => {
  if (time) {
    const newTime = new Date(time);
    if (durType === DURATION__TYPE.day) {
      return dateFormat(newTime, "HH:MM");
    } else if (durType === DURATION__TYPE.month) {
      return dateFormat(newTime, "mmm dd, yyyy");
    } else {
      return dateFormat(newTime, "mmmm yyyy");
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

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const COMPARE________ = (timeline, newIOT_minted, handle) => {
  let newSeriesArr = [];
  let onlyTime = [];
  let onlyVal = [];
  for (let index = 0; index < timeline.length; index++) {
    const current = timeline[index]; // khoảng thời gian
    const prev = index > 0 ? timeline[index - 1] : 0; //
    // filter data có thời gian nhỏ hơn
    const aggreeConditionsArr = newIOT_minted.filter((item) =>
      handle(current, prev, item)
    );
    const newDataGroup = aggreeConditionsArr.map((item) =>
      item?.carbon ? item?.carbon : 0
    );

    let amount = newDataGroup?.length > 0 ? newDataGroup.reduce(getSum) : 0;
    current;
    let returnVal = amount ?? "";
    newSeriesArr[index] = {
      x: current,
      y: returnVal,
    };
    onlyTime[index] = current;
    // onlyVal[index] = parseFloat(amount).toFixed(4);
    onlyVal[index] = returnVal;
  }
  return {
    newSeriesArr,
    onlyTime,
    onlyVal,
  };
};
export const GET_DATA_SERIES = (timeline, iot_minted, durType) => {
  let resultCompare = {};
  let handle = null;
  // console.log("-----", { timeline, iot_minted, durType });
  const newIOT_minted = iot_minted ? [...iot_minted] : [];

  switch (durType) {
    case DURATION__TYPE.day:
      handle = (current, prev, item) => {
        let newCrAt = new Date(item?.createdAt);
        let newTime = newCrAt.getTime();
        return prev < newTime && newTime <= current && item?.carbon;
      };
      resultCompare = COMPARE________(timeline, newIOT_minted, handle);
      break;

    case DURATION__TYPE.month:
      handle = (current, prev, item) => {
        let newCrAt = new Date(item?.createdAt);
        let currentDate = new Date(current);
        return newCrAt.getDate() === currentDate.getDate() && item?.carbon;
      };
      resultCompare = COMPARE________(timeline, newIOT_minted, handle);

      break;

    case DURATION__TYPE.year:
      break;
    default:
      break;
  }
  return {
    newSeriesArr: resultCompare?.newSeriesArr,
    onlyTime: resultCompare?.onlyTime,
    onlyVal: resultCompare?.onlyVal,
  };
};
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
export const optionsDefault = {
  chart: {
    type: "bar",
    width: 200,
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
