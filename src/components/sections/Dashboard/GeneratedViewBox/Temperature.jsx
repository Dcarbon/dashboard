import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DcarbonAPI from "src/tools/hook";

import LineChart from "../Chart/LineChart";
import { SensorsACT } from "src/redux/actions/sensorsAction";

function Temperature({ unit, title, sensorId, iotSelected, setGenerated }) {
  // console.log("sensorId---", sensorId);
  const dispatch = useDispatch();
  const GetSensorsState = useSelector(new DcarbonAPI().GetSensorsState);
  const sensor_metrics_tem = useMemo(
    () => GetSensorsState?.sensor_metrics_tem,
    [GetSensorsState?.sensor_metrics_tem]
  );
  const sensors = useMemo(
    () => GetSensorsState?.sensors,
    [GetSensorsState?.sensors]
  );

  // call back :  Handle get IotMinted
  const handleGetSensorMinted = useCallback(
    (newPayload) => {
      dispatch({
        type: SensorsACT.GET_SENSORS_METRICS_TEM.REQUEST,
        payload: {
          from: Math.round(newPayload?.from / 1000),
          to: Math.round(newPayload?.to / 1000),
          iotId: iotSelected,
          limit: 50,
          skip: 0,
          sensorId,
        },
      });
    },
    [dispatch, iotSelected, sensorId]
  );
  // checksensorId = type 4
  const checksensorId = useMemo(() => {
    let index = sensors?.findIndex((item) => item.id === sensorId);
    console.log("Temperature index", index);
    if (index >= 0) {
      return Boolean(sensors[index].type === 4);
    }
    return false;
  }, [sensorId, sensors]);

  useEffect(() => {
    if (iotSelected && sensorId && checksensorId) {
      console.log("===================================");
      console.log("New Load sensor Temperature");
      console.log("===================================");
      const handleGet = () => {
        let newDate = new Date();
        let toTime = newDate.getTime();
        let fromTime = toTime - 6 * 60 * 60 * 1000;

        handleGetSensorMinted({ from: fromTime, to: toTime });
      };
      handleGet();
      let myInterval = setInterval(() => handleGet(), 5000);
      return () => {
        clearInterval(myInterval);
      };
    }
  }, [checksensorId, handleGetSensorMinted, iotSelected, sensorId]);

  return (
    <LineChart
      checksensorId={checksensorId}
      isLoading={GetSensorsState.loading}
      title={title}
      divider={1}
      data={sensor_metrics_tem}
      setGenerated={setGenerated}
      unit={unit}
    />
  );
}

export default Temperature;
