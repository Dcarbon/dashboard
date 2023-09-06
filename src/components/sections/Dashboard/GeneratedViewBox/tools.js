import { DURATION__TYPE } from "../Chart/tools";

const Get_list_time = (time, durType) => {
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

const oneHour = 60 * 60 * 1000;
const oneDay = 24 * oneHour;
const GET_Payload = (time, durType) => {
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

export { GET_Payload, Get_list_time };
