import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
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
  const GET_METRICS = useCallback(
    (newPayload) => {
      if (
        (payload?.iotId > 0 && payload?.sensorId > 0) ||
        (newPayload?.iotId > 0 && newPayload?.sensorId > 0)
      ) {
        let newDate = new Date();
        let to = Math.round(newDate.getTime() / 1000);
        newDate?.setUTCDate(newDate?.getUTCDate() - 6);
        let from = Math.round(newDate.getTime() / 1000); // day 7th before
        handleGetSensorMetrics({ ...payload, ...newPayload, from, to });
      }
    },
    [handleGetSensorMetrics, payload]
  );

  const sensorId = useMemo(
    () => (sensorState?.sensors?.length > 0 ? sensorState?.sensors[0].id : 0),
    [sensorState?.sensors]
  );
  useEffect(() => {
    if (
      iotSelected > 0 &&
      sensorId > 0 &&
      !sensorState?.loadingSensorFirstTime
    ) {
      console.log("__________");
      console.log("--Metric 1st---", [iotSelected, sensorId]);
      dispatch({ type: SensorsACT.LOAD_SENSOR_1ST_TIME, payload: true });
      let newPay = { ...payload, iotId: iotSelected, sensorId };
      setPayload(newPay);
      GET_METRICS(newPay);
    }
  }, [
    GET_METRICS,
    dispatch,
    iotSelected,
    payload,
    sensorId,
    sensorState?.loadingSensorFirstTime,
  ]);
  //  Lấy Metrics mỗi 5s
  useEffect(() => {
    const intervalGetMetrics = setInterval(GET_METRICS, 5000);
    return () => {
      clearInterval(intervalGetMetrics);
    };
  }, [GET_METRICS]);

  useEffect(() => {
    const metrics = sensorState?.sensor_metrics;
    const GET_STRONG_NUMB = () => {
      const data = metrics?.length > 0 ? metrics[metrics?.length - 1] : null;
      const numb = data ? getAmount(data) : 0;
      console.log("n-", numb);
      setStrongNumb(numb);
    };
    // SET new strong numb if new iot, sonsor

    if (iotSelected > 0 && sensorId > 0 && metrics?.length > 0) {
      GET_STRONG_NUMB();
    }
    // set strong interval
    let newInterval = setInterval(GET_STRONG_NUMB, 5000);
    return () => {
      clearInterval(newInterval);
    };
  }, [iotSelected, sensorId, sensorState?.sensor_metrics]);
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
