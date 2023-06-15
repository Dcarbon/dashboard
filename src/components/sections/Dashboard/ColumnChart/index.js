import { useEffect, useState } from "react";
import stls from "./index.module.scss";
import DcarbonChart from "./chartManager";
import DcarbonDuration from "./durationType";

// hàm lấy from to theo durtype
const roundup_second = (time) => Math.round(time.getTime() / 1000);

const Get_Duration_by_Type = (durationType) => {
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

  thisDate?.setUTCHours(0, 0, 0, 0);
  from = roundup_second(thisDate);

  return { to, from };
};
const oneDay = 24 * 60 * 60 * 1000;
const createArray = (length) => new Array(length);

const getTimeLine = (durType) => {
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
      toDay.setHours(0, 0, 0, 0);
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
  return newArr;
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
function ColumnChart({
  unit,
  data,
  payload,
  setPayload,
  durType,
  setDurType,
  handleValue,
  arrData,
  setArrData,
  setStrongNumb,
  handleDataChangeDurType,
}) {
  const [loading, setLoading] = useState(true);
  const [arrTime, setArrTime] = useState(null);
  // const dispatch = useDispatch();

  // Check time and set up
  useEffect(() => {
    if (!payload?.to) {
      const new_duration = Get_Duration_by_Type(durType);
      const newArrTime = getTimeLine(durType);
      setArrTime(newArrTime);
      let newPayload = {
        ...payload,
        to: new_duration?.to,
        from: new_duration?.from,
      };
      setPayload(newPayload);
    }
  }, [durType, handleDataChangeDurType, payload, setPayload]);
  const handleChangeDurType = (newDurType) => {
    setLoading(true);
    setDurType(newDurType);
    let newDur = Get_Duration_by_Type(newDurType);
    handleDataChangeDurType(newDur);

    const newArrTime = getTimeLine(newDurType);
    setArrTime(newArrTime);
    setArrData(null);
  };

  return (
    <div className={stls.carbonMinted}>
      <DcarbonChart
        unit={unit}
        handleValue={handleValue}
        durType={durType}
        data={data}
        loading={loading}
        setLoading={setLoading}
        arrTime={arrTime}
        arrData={arrData}
        setArrData={setArrData}
        setStrongNumb={setStrongNumb}
      />
      <DcarbonDuration durType={durType} setDurType={handleChangeDurType} />
    </div>
  );
}
export default ColumnChart;
