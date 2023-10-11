/* eslint-disable no-undef */
import { useCallback, useEffect, useState } from "react";
import LineChart from "./LineChart";
import { IOT__TYPE, hexToString } from "src/tools/const";
import { DURATION__TYPE, roundup_second } from "./tools";
import { AxiosGet } from "src/redux/sagaUtils";
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
  iot_type,
  // nếu bị phụ thuộc thì sẽ truyền giá trị vào hàm handle_coefficient
  isDepended = false,
  handle_coefficient,
  list_time_by_duration,
}) {
  const [dataSM, setDataSM] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dataSM?.length > 0) {
      let newString = {};

      let elem =
        iot_type === IOT__TYPE.BurnMethane
          ? dataSM[dataSM?.length - 1]
          : dataSM[0];
      newString = JSON.parse(hexToString(elem?.data));
      let newValue = newString.indicator.value;
      let configValue = isDepended ? handle_coefficient(newValue) : newValue;
      let lastValue = Number(
        divider ? configValue / divider : configValue / 1000
      ).toFixed(2);
      setGenerated(lastValue);
      // }
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
    iot_type,
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
          console.log("Gọi Again =====", true);
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
          console.log("Gọi Again =====", false);
          res.forEach((data) => {
            let newDa = data.data.metrics;
            newDataResponse = newDataResponse.concat(newDa);
          });
          setDataSM(newDataResponse);
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
        res.forEach((data) => {
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
      (durationType || currentDate || iotSelected || list_time_by_duration) &&
      sensorId > 0
    ) {
      setLoading(true);
    }
  }, [currentDate, durationType, iotSelected, list_time_by_duration, sensorId]);

  useEffect(() => {
    console.log("ds2,------", {
      durationType,
      currentDate,
      iotSelected,
      list_time_by_duration,
      sensorId,
      isDepended,
    });
    if (
      (durationType || currentDate || iotSelected || list_time_by_duration) &&
      sensorId > 0 &&
      !isDepended &&
      loading
    ) {
      let check = () => {
        if (durationType === DURATION__TYPE.day) {
          handleGetSensorMinted_by_day(currentDate);
        } else if (durationType === DURATION__TYPE.month) {
          handleGetSensorMinted_by_month(list_time_by_duration);
        }
      };

      check();
      setLoading(false);
    }
  }, [
    currentDate,
    durationType,
    handleGetSensorMinted_by_day,
    handleGetSensorMinted_by_month,
    iotSelected,
    isDepended,
    list_time_by_duration,
    loading,
    sensorId,
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
          // console.log("Gọi Again");
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
