import BigNumber from "bignumber.js";

import dateFormat from "dateformat";
export const roundup_second = (time) => {
  return time ? Math.round(time?.getTime() / 1000) : 1;
};

export const DURATION__TYPE = {
  day: "day",
  month: "month",
  year: "year",
};
export const DURATION_TYPES = ["1W", "1M", "3M", "6M", "1Y", "All time"];
export const oneHour = 60 * 60 * 1000;
export const oneDay = 24 * oneHour;
export const getAmount = (item) => {
  const hexAmount = new BigNumber(item);
  const reduceAmount = hexAmount.div("1e9");
  let fixed = reduceAmount.toFixed(2);
  return fixed;
};
export const getAmountbyNumber = (numb) => {
  const reduceAmount = numb / 1e9;
  let fixed = reduceAmount.toFixed(2);  
  return fixed;
};
export const getSum = (prev, next) => Number(prev) + Number(next);

export const GET_STRING_DAY = (durType, time) => {  
  if (time) {
    const newTime = new Date(time);
    if (durType < 3) {
      let prevTime = new Date(time - oneHour * 3);
      return (
        dateFormat(prevTime, "dd/ mm") + " - " + dateFormat(newTime, "HH:MM")
      );
    } else if (durType < 5 && durType > 3) {
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

export const GET_DATA_SERIES = (data, typeSensor, durationType) => {
  let sorted = [];
  let newmap = [];  
  if (data?.data?.length) {
    // console.log("data");
    // console.log("data");
    // console.log("data");
    // console.log("data");
    // console.log("data");
    // console.log("data");
    // console.log("data");
    // console.log("data");
    // console.log("data");
    // console.log("data");
    // console.log("data");  
    // console.log("data");
    // console.log("data");
    // console.log("data", data);
    // let initTime = 0;
    // let total = 0;
    newmap = data?.data?.map((item) => {        
      let newTime = item.createdAt || item.time;
      let newValue = item.carbon || item.value;          
      return {
        time: new Date(Number(newTime)),
        value: newValue ? getAmountbyNumber(newValue) : "0",
      };
    });    
    sorted = newmap.sort((a, b) => a?.time?.getTime() - b?.time?.getTime());
    let newReverseZA = [];
    let newReverse = [];
    let sortedHandled = [];
    if (durationType === 1) {
      // đảo nghịch trở về ngày gần nhất lên đầu
      newReverseZA = sorted?.reverse() ?? [];
      // cộng dồn về 5 ngày trước đó
      newReverse = [];
      newReverseZA.forEach((val, idx) => {
        // if (idx % 2 === 0 && idx > 0) {
        //   initTime = newReverseZA[idx - 2]?.time;
        //   newReverse.push({
        //     time: initTime,
        //     value: total.toFixed(2),
        //   });
        //   total = 0;
        // } else {
        //   total += Number(val?.value) ?? 0;
        // }
        if (idx % 2 === 0) {
          newReverse.push(val);
        }
      });
      sortedHandled = newReverse.reverse();
      return sortedHandled;
    } else if (durationType === 2) {
      // đảo nghịch trở về ngày gần nhất lên đầu
      newReverseZA = sorted?.reverse() ?? [];
      // cộng dồn về 5 ngày trước đó
      newReverse = [];
      // console.log("durationType", durationType);
      // console.log("newReverseZA", newReverseZA);
      newReverseZA.forEach((val, idx) => {
        // console.log("idx", idx);
        // khi ở ngày thứ 5 trả ra kết quả và total = 0
        if (idx % 3 === 0) {
          // console.log("val", val);
          newReverse.push(val);
        }
        // if (idx % 5 === 0 && idx > 0) {
        //   initTime = newReverseZA[idx - 5]?.time;
        //   newReverse.push({
        //     time: initTime,
        //     value: total.toFixed(2),
        //   });
        //   total = 0;
        // } else {
        //   total += Number(val?.value) ?? 0;
        // }
      });
      sortedHandled = newReverse.reverse();
      return sortedHandled;
    } else {      
      return sorted;
    }
  }
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
export const Options_DEFAULT = {
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
      show: true,
      align: "left",
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
