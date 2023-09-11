import { Fragment, useEffect, useMemo, useState } from "react";
import BoxBorderTop from "src/components/ui/Box/BoxBorderTop";
import SelectType from "./SelectType";
import SelectDate from "./SelectDate";
import Carbon from "./Carbon";
import { DURATION__TYPE, Get_list_time, roundup_second } from "./tools";
import dateFormat from "dateformat";
import SensorLineChart from "./SensorLineChart";

import { AxiosGet } from "src/redux/sagaUtils";
import { useSelector } from "react-redux";
import DcarbonAPI from "src/tools/DcarbonAPI";
import { SENSOR__TYPE } from "src/tools/const";
import stls from "./index.module.scss";
const initDate = new Date();
initDate.setHours(0, 0, 0, 0);
function GeneratedViewBox({ iotSelected }) {
  const [currentDate, setCurrentDate] = useState(initDate);
  const [currentSensorType, setCurrentSensorType] = useState(SENSOR__TYPE.None);
  const [carbonGenerated, setCarbonGenerated] = useState(0);

  const [payload, setPayload] = useState({ from: 0, to: 0, interval: 0 });
  const [list_time_by_duration, setList_time_by_duration] = useState([]);
  const [durationType, setDurationType] = useState(DURATION__TYPE.day);

  const [currentIsActive, setCurrentIsActive] = useState(0);
  const [dayActiveList, setDayActiveList] = useState([]);
  const [monthActiveList, setMonthActiveList] = useState([]);
  const [listTab, setListTab] = useState([]);

  // Check IOT type
  const newDcarbonAPI = new DcarbonAPI();
  const IOT_state = useSelector(newDcarbonAPI.GetIOTState);
  const SENSOR_state = useSelector(newDcarbonAPI.GetSensorsState);
  const iot_type = IOT_state?.iot?.type;
  const sensors = SENSOR_state?.sensors;
  const title = useMemo(() => {
    if (currentDate) {
      switch (durationType) {
        case DURATION__TYPE.day:
          return dateFormat(currentDate, "mmm dd, yyyy");
        case DURATION__TYPE.month:
          return dateFormat(currentDate, "mmm, yyyy");
        case DURATION__TYPE.year:
          return dateFormat(currentDate, "yyyy");
      }
    }
  }, [currentDate, durationType]);
  const titleLine = useMemo(() => {
    let newDate = new Date();
    return dateFormat(newDate, "mmm dd, yyyy");
  }, []);

  useEffect(() => {
    if (iotSelected) {
      console.log("Iot Mới", iotSelected);
      console.log("set Sensor Type  === 0 => hiển thị biểu đồ cột");
      setCurrentSensorType(SENSOR__TYPE.None);
    }
  }, [iotSelected]);

  useEffect(() => {
    if (payload?.from && payload?.to) {
      CheckMonthActive(iotSelected, currentDate, setMonthActiveList);
      CheckDaysActive(iotSelected, currentDate, setDayActiveList);
    }
  }, [currentDate, iotSelected, payload?.from, payload?.to]);
  useEffect(() => {
    if (currentDate) {
      let currrentTime = currentDate?.getTime();
      let newDate = new Date();
      newDate.setHours(0, 0, 0, 0);
      let todayTime = newDate.getTime();
      if (payload?.from && payload?.to && currrentTime === todayTime) {
        CheckCurrentActive(iotSelected, setCurrentIsActive);
        let myInterval = setInterval(() => {
          CheckCurrentActive(iotSelected, setCurrentIsActive);
        }, 5000);
        return () => {
          clearInterval(myInterval);
        };
      }
    }
  }, [currentDate, iotSelected, payload?.from, payload?.to]);

  function GET_sensor_id(sensors = [], typeSensor) {
    if (sensors?.length > 0) {
      let getIndex = sensors.findIndex((item) => item.type === typeSensor);
      return sensors[getIndex]?.id;
    }
    return 0;
  }

  return (
    <Fragment>
      <BoxBorderTop>
        {currentDate && (
          <SelectDate
            currentSensorType={currentSensorType}
            currentIsActive={currentIsActive}
            monthActiveList={monthActiveList}
            dayActiveList={dayActiveList}
            iotSelected={iotSelected}
            list_time_by_duration={list_time_by_duration}
            setList_time_by_duration={setList_time_by_duration}
            durationType={durationType}
            setDurationType={setDurationType}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            setPayload={setPayload}
          />
        )}
      </BoxBorderTop>
      {/* select type to show  */}
      {/* select type to show  */}
      {/* select type to show  */}
      {/* select type to show  */}
      {/* select type to show  */}
      {/* select type to show  */}
      <div className='w-full' style={{ width: "100%" }}>
        <BoxBorderTop isPadding={false}>
          <SelectType
            listTab={listTab}
            iot_type={iot_type}
            carbonGenerated={carbonGenerated}
            currentType={currentSensorType}
            setCurrentType={setCurrentSensorType}
            setListTab={setListTab}
          />
        </BoxBorderTop>

        {/*  show charts  */}
        {/*  show charts  */}
        {/*  show charts  */}
        {/*  show charts  */}
        {/*  show charts  */}
        {/*  show charts  */}

        {/* <p>iotSelected :{iotSelected}</p>
        <p>iot_type : {currentSensorType}</p> */}
        <BoxBorderTop>
          <div className={stls.tab}>
            <div className={stls.slide}>
              <Box isShow={currentSensorType === SENSOR__TYPE.None}>
                <Carbon
                  title={title ? "Data in " + title : ""}
                  payload={payload}
                  list_time_by_duration={list_time_by_duration}
                  iotSelected={iotSelected}
                  durType={durationType}
                  setCarbonGenerated={setCarbonGenerated}
                />
              </Box>
              {listTab.map((item, idx) => {
                return (
                  <Box
                    key={"box-tab-" + idx}
                    isShow={currentSensorType === item.type}
                  >
                    <SensorLineChart
                      id={item.id}
                      unit={item.unitChart || item.unit}
                      title={titleLine ? "Data in " + titleLine : ""}
                      sensorId={GET_sensor_id(sensors, item.type)}
                      iotSelected={iotSelected}
                      generated={item.generated}
                      setGenerated={item.setGenerated}
                      timeSpace={3}
                    />
                  </Box>
                );
              })}
            </div>
          </div>
        </BoxBorderTop>
      </div>
    </Fragment>
  );
}

export default GeneratedViewBox;
function Box({ isShow, children }) {
  return (
    <div
      className={`${isShow ? stls.active : ""} ${isShow ? "" : "hidden"} ${
        stls.tabContent
      }`}
    >
      {children}
    </div>
  );
}

function CheckMonthActive(iotSelected, time, setMonthActive) {
  const today_ = new Date(time);
  const iot_key_year = "iot_" + iotSelected + "_" + today_.getFullYear();
  const thisyearDataa = JSON.parse(localStorage.getItem(iot_key_year));
  if (!thisyearDataa) {
    var url = `iots/${iotSelected}/is-actived`;
    today_.setDate(1);
    let promisesList = [];
    for (let index = 0; index < 12; index++) {
      let newToday = new Date(today_.getTime());
      newToday.setMonth(index);
      newToday.setHours(0, 0, 0, 0);
      let startMonth = newToday.getTime();
      newToday.setMonth(index + 1);
      let endMonth = newToday.getTime() - 1000;
      let newFrom = Math.round(startMonth / 1000);
      let newTo = Math.round(endMonth / 1000);
      // eslint-disable-next-line no-undef
      promisesList[index] = new Promise((resolve) =>
        resolve(AxiosGet(url + `?from=${newFrom}&to=${newTo}`))
      );
    }
    // eslint-disable-next-line no-undef
    Promise.all(promisesList)
      .then((res) => {
        let newListToUse = res.map((item, idx) => {
          return {
            month: idx,
            actived: item?.data?.actived,
          };
        });
        setMonthActive(newListToUse);
        localStorage.setItem(iot_key_year, JSON.stringify(newListToUse));
      })
      .catch((error) => console.error("Promises all catch err", error));
  } else {
    setMonthActive(thisyearDataa);
  }
}
function CheckDaysActive(iotSelected, time, setDayActiveList) {
  const today_ = new Date(time);
  today_.setHours(0, 0, 0, 0);
  const iot_key = "iot_" + iotSelected + "_" + dateFormat(today_, "mmm_yyyy");
  var url = `iots/${iotSelected}/is-actived`;
  if (iotSelected) {
    let newToday = new Date();
    newToday.setHours(0, 0, 0, 0);
    let today = newToday.getTime();
    let newList = Get_list_time(today_?.getTime(), "month");

    let spliceList = newList.findIndex((item) => item === today);

    let localData = JSON.parse(localStorage.getItem(iot_key));
    let promisesList = [];
    let newListToUse = [];
    if (!localData || localData?.time !== newToday.getTime()) {
      // nếu không có thì toàn bộ list phải được request
      promisesList = newList.map((item) => {
        let newDate = new Date(item);
        let newFrom = roundup_second(newDate);
        newDate.setHours(23, 59, 59);
        let newTo = roundup_second(newDate);
        // eslint-disable-next-line no-undef
        return new Promise((resolve) =>
          resolve(AxiosGet(url + `?from=${newFrom}&to=${newTo}`))
        );
      });
      // eslint-disable-next-line no-undef
      Promise.all(promisesList)
        .then((res) => {
          newListToUse = newList.map((item, idx) => {
            if (idx !== spliceList) {
              let newDate = new Date(item);
              return {
                date: newDate.getDate(),
                time: item,
                actived: res[idx]?.data?.actived,
              };
            } else {
              return {};
            }
          });
          setDayActiveList(newListToUse);
          localStorage.setItem(
            iot_key,
            JSON.stringify({ time: today_.getTime(), data: newListToUse })
          );
        })
        .catch((error) => console.error("Promises days catch err", error));
    } else {
      setDayActiveList(localData?.data || []);
    }
  }
}
function CheckCurrentActive(iotSelected, setCurrentIsActive) {
  const today_ = new Date();
  var url = `iots/${iotSelected}/is-actived`;
  today_.setHours(0, 0, 0, 0);
  let newFrom = Math.round(today_.getTime() / 1000);
  today_.setHours(23, 59, 59);
  let newTo = Math.round(today_.getTime() / 1000);
  // eslint-disable-next-line no-undef
  const promise1 = new Promise((resolve) =>
    resolve(AxiosGet(url + `?from=${newFrom}&to=${newTo}`))
  );
  promise1
    .then((res) => setCurrentIsActive(res?.data?.actived))
    .catch((error) =>
      console.error(`Promises ${iotSelected} catch err`, error)
    );
}
