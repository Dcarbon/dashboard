import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DcarbonAPI from "src/tools/hook";
import CollapseTab from "../CollapseTab";
import { hexToString } from "src/tools/const";
import { SensorsACT } from "src/redux/actions/sensorsAction";

function ElectricityGenerated({ iotSelected }) {
  const [payload, setPayload] = useState({
    iotId: 0,
    from: 0,
    to: 0,
    sensorId: 0,
    limit: 50,
    skip: 0,
  });
  const sensorState = useSelector(new DcarbonAPI().GetSensorsState);

  const [strongNumb, setStrongNumb] = useState(0);
  const dispatch = useDispatch();

  const getAmount = (item) => {
    if (item?.data) {
      const hexConverted = hexToString(item.data);
      let newString = JSON.parse(hexConverted);
      let valStr = newString?.indicator;
      let val = valStr?.value || "";
      return val / 1000 ?? "";
    }
    return 0;
  };
  // call back :  Handle get IotMinted

  const handleGetSensorMetrics = useCallback(
    (newPayload) => {
      setPayload({ ...newPayload });
      dispatch({
        type: SensorsACT.GET_SENSORS_METRICS.REQUEST,
        payload: newPayload,
      });
    },
    [dispatch]
  );
  //  Lấy Metrics
  const getMetrics = useCallback(() => {
    if (payload?.iotId && payload?.sensorId) {
      let newDate = new Date();
      let to = Math.round(newDate.getTime() / 1000);

      newDate?.setUTCDate(newDate?.getUTCDate() - 6);
      let from = Math.round(newDate.getTime() / 1000); // day 7th before
      handleGetSensorMetrics({ ...payload, from, to });
    }
  }, [handleGetSensorMetrics, payload]);
  useEffect(() => {
    //  set Iot Id
    if (iotSelected !== payload?.iotId) {
      setPayload({ ...payload, iotId: iotSelected });
    }
    //  set Sensor Id
    let sensorId =
      sensorState?.sensors?.length > 0 ? sensorState?.sensors[0].id : 0;
    if (sensorId !== payload?.sensorId) {
      setPayload({ ...payload, sensorId });
    }
  }, [iotSelected, payload, sensorState]);

  //  Lấy Metrics mỗi 5s
  useEffect(() => {
    if (
      !sensorState?.sensor_metrics?.length &&
      payload?.iotId > 0 &&
      payload?.sensorId > 0
    ) {
      getMetrics();
    }
    const intervalGetMetrics = setInterval(getMetrics, 5000);
    return () => {
      clearInterval(intervalGetMetrics);
    };
  }, [
    getMetrics,
    payload?.iotId,
    payload?.sensorId,
    sensorState?.sensor_metrics?.length,
    sensorState?.sensors,
  ]);

  useEffect(() => {
    const metrics = sensorState?.sensor_metrics;
    const getStrongNumb = () => {
      const data = metrics?.length > 0 ? metrics[metrics?.length - 1] : null;
      const numb = data ? getAmount(data) : 0;
      setStrongNumb(numb);
    };
    if (metrics?.length > 0 && !strongNumb) {
      getStrongNumb();
    }
    let newInterval = setInterval(getStrongNumb, 5000);
    return () => {
      clearInterval(newInterval);
    };
  }, [sensorState?.sensor_metrics, strongNumb]);
  useEffect(() => {
    if (sensorState?.sensors?.length === 0) {
      setStrongNumb(0);
    }
  }, [sensorState?.sensors]);

  return (
    <Fragment>
      <CollapseTab
        color="blue"
        title="Electricity generated"
        strongNumb={strongNumb}
        unit="kWh"
        disable
      />
      <CollapseTab
        color="green"
        title="Biogas treated"
        strongNumb={Number(strongNumb * 0.528888889).toFixed(3)}
        unit="m3"
        disable
      />
    </Fragment>
  );
}

export default ElectricityGenerated;
