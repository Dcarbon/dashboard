import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DcarbonAPI from "src/tools/hook";

import LineChart from "../Chart/LineChart";
import { SensorsACT } from "src/redux/actions/sensorsAction";

function Biomass({ unit, title, sensorId, iotSelected, setGenerated }) {
  console.log("sensorId---", sensorId);
  const dispatch = useDispatch();
  const GetSensorsState = useSelector(new DcarbonAPI().GetSensorsState);
  const sensor_metrics_bio = useMemo(
    () => GetSensorsState?.sensor_metrics_bio,
    [GetSensorsState?.sensor_metrics_bio]
  );
  const sensors = useMemo(
    () => GetSensorsState?.sensors,
    [GetSensorsState?.sensors]
  );
  // call back :  Handle get IotMinted
  const handleGetSensorMinted = useCallback(
    (newPayload) => {
      dispatch({
        type: SensorsACT.GET_SENSORS_METRICS_BIO.REQUEST,
        payload: {
          from: Math.round(newPayload?.from / 1000),
          to: Math.round(newPayload?.to / 1000),
          iotId: iotSelected,
          limit: 50,
          skip: 0,
          sensorId: newPayload.sensorId,
        },
      });
    },
    [dispatch, iotSelected]
  );
  // checksensorId = type 1
  const checksensorId = useMemo(() => {
    let index = sensors?.findIndex((item) => item.id === sensorId);
    console.log("biomass index", index);
    if (index >= 0) {
      return Boolean(sensors[index].type === 1);
    }
    return false;
  }, [sensorId, sensors]);
  useEffect(() => {
    if (iotSelected && sensorId && checksensorId) {
      console.log("===================================");
      console.log("New Load sensor biomass");
      console.log("===================================");
      const handleGet = () => {
        let newDate = new Date();
        let toTime = newDate.getTime();
        let fromTime = toTime - 6 * 60 * 60;

        handleGetSensorMinted({ from: fromTime, to: toTime, sensorId });
      };
      handleGet();
      let myInterval = setInterval(() => handleGet(), 10000);
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
      data={sensor_metrics_bio}
      setGenerated={setGenerated}
      unit={unit}
    />
  );
}

export default Biomass;
