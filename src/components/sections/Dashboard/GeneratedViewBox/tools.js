import BigNumber from "bignumber.js";

import dateFormat from "dateformat";
export const roundup_second = (time) => Math.round(time?.getTime() / 1000);

export const DURATION__TYPE = {
  day: "day",
  month: "month",
  year: "year",
};

export const oneHour = 60 * 60 * 1000;
export const oneDay = 24 * oneHour;
export const getAmount = (item) => {
  const hexAmount = new BigNumber(item);
  const reduceAmount = hexAmount.div("1e9");
  let fixed = reduceAmount.toFixed(2);

  return fixed;
  // return 0;
};
export const getSum = (prev, next) => Number(prev) + Number(next);

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
      return dateFormat(newTime, "mmm dd | HH:MM");
    } else if (durType === DURATION__TYPE.month) {
      return dateFormat(newTime, "mmm dd, yyyy");
    } else {
      return dateFormat(newTime, "mmmm yyyy");
    }
  }
};

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

export const Get_list_time = (time, durType) => {
  const newDate = new Date(time);
  let newArr = [];

  if (durType === DURATION__TYPE.day) {
    // ngay
    newArr = new Array(8);
  } else if (durType === DURATION__TYPE.month) {
    // thang
    // set vào ngay đầu tháng
    newDate.setDate(1);
    let thisMonthTime = newDate.getTime();
    newDate.setMonth(newDate.getMonth() + 1);
    let nextMonthTime = newDate.getTime();
    newArr = new Array((nextMonthTime - thisMonthTime) / oneDay);
    newDate.setMonth(newDate.getMonth() - 1);
  } else if (durType === DURATION__TYPE.year) {
    // nam
    newArr = new Array(12);
  }
  if (newArr?.length > 0) {
    var nextDay = 0;
    var timeInThisLoop = 0;
    let startToDay = newDate.getTime(); // start from 0h:0m:0s
    newDate.setMonth(0);
    let startToMonth = newDate.getMonth(); // start from 0h:0m:0s
    for (let idx = 0; idx < newArr.length; idx++) {
      if (durType === DURATION__TYPE.day) {
        // chạy từ 0h
        timeInThisLoop = startToDay + oneHour * 3 * (idx + 1);
      } else if (durType === DURATION__TYPE.month) {
        // chạy lùi về 1 tháng trước
        timeInThisLoop = startToDay + nextDay;
        nextDay += oneDay;
      } else if (durType === DURATION__TYPE.year) {
        // chạy lùi về 1 tháng trước
        timeInThisLoop = startToMonth + idx;
      }
      newArr[idx] = timeInThisLoop;
    }
  }

  return newArr;
};

export const GET_Payload = (time, durType) => {
  let interval = "";
  let newFrom = "";
  let newTo = "";
  var newInit_From_Date = new Date(time);
  var newInit_To_Date = new Date(time);
  newInit_To_Date.setHours(23, 59, 59);
  if (durType === DURATION__TYPE.day) {
    // console.log("lấy dữ liệu trong ngày");
    // trong 1 ngày
    interval = 0;
    // lấy from === 0 h
    newFrom = newInit_From_Date.getTime(); //  time truyền vào là 00h00m => lấy luôn
    // lấy to === 23 h59
    newTo = newInit_To_Date.getTime();
    //
    //
    //
    //
  } else if (durType === DURATION__TYPE.month) {
    // console.log("lấy dữ liệu trong tháng");
    // trong 1 tháng
    interval = 1;
    // lấy from === 0 h ngày đầu tháng
    newInit_From_Date.setDate(1);
    newFrom = newInit_From_Date.getTime();
    // lấy to === 23 h59 ngày cuối tháng
    newInit_To_Date.setDate(1);
    let nextMonth = newInit_To_Date.getMonth() + 1; // thang tiep theo
    newInit_To_Date.setMonth(nextMonth);
    newTo = newInit_To_Date.getTime() - oneDay;
    //
    //
    //
    //
  } else if (durType === DURATION__TYPE.year) {
    // console.log("lấy dữ liệu trong năm");
    // trong 1 năm
    interval = 2;
    // lấy from === 0
    newInit_From_Date.setDate(1);
    newInit_From_Date.setMonth(0);
    newFrom = newInit_From_Date.getTime(); //  time truyền vào là 00h00m => lấy luôn
    // lấy to === 23 h59
    newInit_To_Date.setDate(1); //set ngày 1 cho năm mới
    newInit_To_Date.setMonth(0); //set tháng 1 cho năm mới
    let nextYear = newInit_To_Date.getFullYear() + 1;
    newInit_To_Date.setFullYear(nextYear);
    newTo = newInit_To_Date.getTime() - oneDay;
  }

  return {
    from: newFrom,
    to: newTo,
    interval,
  };
};
