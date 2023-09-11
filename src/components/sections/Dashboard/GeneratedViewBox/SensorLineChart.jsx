import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DcarbonAPI from "src/tools/DcarbonAPI";
import LineChart from "./LineChart";
import { SensorsACT } from "src/redux/actions/sensorsAction";
import { hexToString } from "src/tools/const";

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
  // nếu bị phụ thuộc thì sẽ truyền giá trị vào hàm handle_coefficient
  isDepended = false,
  handle_coefficient,
}) {
  const dispatch = useDispatch();
  const GetSensorsState = useSelector(new DcarbonAPI().GetSensorsState);
  const sensor_metrics_ = useMemo(
    () => GetSensorsState?.sensor_metrics_,
    [GetSensorsState?.sensor_metrics_]
  );
  useEffect(() => {
    if (sensor_metrics_?.length > 0) {
      let newString = JSON.parse(hexToString(sensor_metrics_[0]?.data));
      let newValue = newString.indicator.value;
      // console.log("newValue", newValue);
      let configValue = isDepended ? handle_coefficient(newValue) : newValue;
      let lastValue = Number(
        divider ? configValue / divider : configValue / 1000
      ).toFixed(2);
      setGenerated(lastValue);
    } else if (generated && !sensor_metrics_?.length) {
      setGenerated(0);
    }
  }, [
    handle_coefficient,
    generated,
    isDepended,
    sensor_metrics_,
    setGenerated,
    divider,
  ]);

  //  get sensor matrics function
  //  get sensor matrics function
  //  get sensor matrics function
  //  get sensor matrics function
  const handleGetSensorMinted = useCallback(
    (newPayload) => {
      dispatch({
        type: SensorsACT.GET_SENSORS_METRICS.REQUEST,
        payload: {
          from: Math.round(newPayload?.from / 1000),
          to: Math.round(newPayload?.to / 1000),
          iotId: iotSelected,
          limit: newPayload?.limit,
          skip: 0,
          sensorId,
          isFirstTimeLoad: newPayload?.isFirstTimeLoad,
          // sort: 1,
        },
      });
    },
    [dispatch, iotSelected, sensorId]
  );

  useEffect(() => {
    if (iotSelected && sensorId > 0 && !isDepended) {
      console.log("===================================");
      console.log(
        `New loaded line chart for id=${id} iot=${iotSelected} sensorId=${sensorId}`
      );
      console.log("===================================");
      const handleGet = (isFirstTimeLoad) => {
        let newDate = new Date();
        // theo timeSpace (s) có 1 bản ghi mới => 20 bản ghi => timeSpace * 20
        //

        let toTime = newDate.getTime();
        let fromTime = 0;
        //
        //
        //
        //
        //
        //
        //
        //
        //
        // newDate.setHours(9);
        // newDate.setMinutes(2);
        //
        //
        //
        //
        //
        //
        //
        //
        //

        if (isFirstTimeLoad) {
          // 20 bản ghi trong lần đầu gọi
          fromTime = toTime - timeSpace * 20 * 1000;
        } else {
          fromTime = toTime - timeSpace * 1000;
        }
        // console.log("fromTime", fromTime);
        // console.log("newDate", newDate);
        // console.log("from ", new Date(fromTime));
        // console.log("to ", new Date(toTime));
        handleGetSensorMinted({
          from: fromTime,
          to: toTime,
          // Nếu không phải lần đầu tiên tải dữ liệu =>  gọi 1 bản ghi để ghép vào biểu đồ
          limit: !isFirstTimeLoad ? 1 : 20,
          // limit: 20,
          isFirstTimeLoad,
        });
      };
      handleGet(true);
      let myInterval = setInterval(() => handleGet(false), timeSpace * 1000);
      return () => {
        clearInterval(myInterval);
      };
    }
  }, [handleGetSensorMinted, id, iotSelected, isDepended, sensorId, timeSpace]);

  return (
    <LineChart
      id={id}
      isLoading={GetSensorsState.loading}
      title={title}
      divider={divider}
      data={sensor_metrics_}
      unit={unit}
      iotSelected={iotSelected}
      isDepended={isDepended}
      handle_coefficient={handle_coefficient}
      timeSpace={timeSpace}
    />
  );
}

export default SensorLineChart;
