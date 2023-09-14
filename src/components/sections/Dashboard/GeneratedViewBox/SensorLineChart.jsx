/* eslint-disable no-undef */
import { useCallback, useEffect, useState } from "react";
import LineChart from "./LineChart";
import { hexToString } from "src/tools/const";
import { DURATION__TYPE, roundup_second } from "./tools";
import { AxiosGet } from "src/redux/sagaUtils";
// import { useState } from "react";

function SensorLineChart({
  id,
  unit,
  title,
  timeSpace,
  sensorId,
  iotSelected,
  generated,
  setGenerated,
  divider,
  currentDate,
  durationType,
  // nếu bị phụ thuộc thì sẽ truyền giá trị vào hàm handle_coefficient
  isDepended = false,
  handle_coefficient,
  list_time_by_duration,
}) {
  const [dataSM, setDataSM] = useState(undefined);

  useEffect(() => {
    if (dataSM?.length > 0) {
      let newString = JSON.parse(hexToString(dataSM[0]?.data));
      let newValue = newString.indicator.value;
      // console.log("newValue", newValue);
      let configValue = isDepended ? handle_coefficient(newValue) : newValue;
      let lastValue = Number(
        divider ? configValue / divider : configValue / 10000
      ).toFixed(2);
      setGenerated(lastValue);
    } else if (generated && !dataSM?.length) {
      setGenerated(0);
    }
  }, [
    handle_coefficient,
    generated,
    isDepended,
    dataSM,
    setGenerated,
    divider,
  ]);

  //  get sensor matrics function
  //  get sensor matrics function
  //  get sensor matrics function
  //  get sensor matrics function

  const handleGetSensorMinted_by_day = useCallback(
    (date, again) => {
      let newDate = new Date(date);
      let from = roundup_second(newDate);
      newDate.setHours(23, 59, 59, 99);
      let to = roundup_second(newDate);
      let listPromises = [];
      if (again) {
        var url = `sensors/sm?from=${from}&to=${to}&iotId=${iotSelected}&skip=0&limit=1&sensorId=${sensorId}&sort=1`;
        const thisPromise = new Promise((resolve) => resolve(AxiosGet(url)));
        Promise.resolve(thisPromise).then((res) => {
          let newDa = res.data.metrics;
          var newDataResponse = dataSM.slice();
          newDataResponse = newDataResponse.concat(newDa);
          setDataSM(newDataResponse);
        });
      } else {
        [0, 1, 2, 3].forEach((item) => {
          var url = `sensors/sm?from=${from}&to=${to}&iotId=${iotSelected}&skip=${
            item * 50
          }&limit=50&sensorId=${sensorId}&sort=0`;
          listPromises[item] = new Promise((resolve) => resolve(AxiosGet(url)));
        });
        var newDataResponse = [];
        Promise.all(listPromises).then((res) => {
          res.forEach((data, idx) => {
            console.log(idx + " -data", data.data.metrics);
            let newDa = data.data.metrics;
            newDataResponse = newDataResponse.concat(newDa);
            setDataSM(newDataResponse);
          });
        });
      }
    },
    [dataSM, iotSelected, sensorId]
  );
  const handleGetSensorMinted_by_month = useCallback(
    (listDate) => {
      let listPromises = [];
      listDate.forEach((item, idx) => {
        let newDate = new Date(item);
        let from = roundup_second(newDate);
        newDate.setHours(23, 59, 59, 99);
        let to = roundup_second(newDate);
        var url = `sensors/sm?from=${from}&to=${to}&iotId=${iotSelected}&skip=${150}&limit=50&sensorId=${sensorId}`;
        listPromises[idx] = new Promise((resolve) => resolve(AxiosGet(url)));
      });
      var newDataResponse = [];
      Promise.all(listPromises).then((res) => {
        res.forEach((data, idx) => {
          console.log(idx + " -data", data.data.metrics);
          let newDa = data.data.metrics;
          newDataResponse = newDataResponse.concat(newDa);
        });
        setDataSM(newDataResponse);
      });
    },
    [iotSelected, sensorId]
  );
  useEffect(() => {
    if (
      durationType &&
      currentDate &&
      iotSelected &&
      sensorId > 0 &&
      !isDepended
    ) {
      if (durationType === DURATION__TYPE.day) {
        // sẽ gọi api 4 lần
        handleGetSensorMinted_by_day(currentDate);
      }
      if (durationType === DURATION__TYPE.month) {
        console.log("list_time_by_duration", list_time_by_duration);
        handleGetSensorMinted_by_month(list_time_by_duration);
      }
    }
  }, [
    currentDate,
    durationType,
    handleGetSensorMinted_by_day,
    handleGetSensorMinted_by_month,
    iotSelected,
    isDepended,
    sensorId,
    list_time_by_duration,
  ]);
  useEffect(() => {
    if (
      durationType &&
      currentDate &&
      iotSelected &&
      sensorId > 0 &&
      !isDepended
    ) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      if (currentDate?.getTime() === today.getTime() && dataSM !== undefined) {
        const mainterval = setInterval(() => {
          handleGetSensorMinted_by_day(currentDate, true);
        }, 5000);
        return () => {
          clearInterval(mainterval);
        };
      }
    }
  }, [
    currentDate,
    dataSM,
    durationType,
    handleGetSensorMinted_by_day,
    iotSelected,
    isDepended,
    sensorId,
  ]);

  return (
    <LineChart
      durationType={durationType}
      id={id}
      title={title}
      divider={divider}
      data={dataSM}
      unit={unit}
      iotSelected={iotSelected}
      isDepended={isDepended}
      handle_coefficient={handle_coefficient}
      timeSpace={timeSpace}
    />
  );
}

export default SensorLineChart;
