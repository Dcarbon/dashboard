import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DcarbonAPI from "src/tools/hook";
import CollapseTab from "../CollapseTab";
import { hexToString } from "src/tools/const";
import { SensorsACT } from "src/redux/actions/sensorsAction";
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
function ElectricityGenerated({ iotSelected }) {
  // REDUX
  // REDUX
  // REDUX
  // REDUX
  // REDUX
  // REDUX
  // REDUX
  // REDUX
  // REDUX
  // REDUX
  const dispatch = useDispatch();
  const sensorState = useSelector(new DcarbonAPI().GetSensorsState);
  // sensor list and metrics
  const sensors = useMemo(() => sensorState?.sensors, [sensorState?.sensors]);
  const sensor_metrics = useMemo(
    () => sensorState?.sensor_metrics,
    [sensorState?.sensor_metrics]
  );
  const sensorId = useMemo(
    () => {
      return sensors?.length > 0 ? sensors[0].id : 0;
    }, // Lấy sensor id đầu tiên trong mảng vì mảng trả về sensor giống nhau
    [sensors]
  );
  //
  const [strongNumb, setStrongNumb] = useState(0);
  const [payload, setPayload] = useState({
    iotId: 0,
    from: 0,
    to: 0,
    sensorId: 0,
    limit: 50,
    skip: 0,
  });

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
        let to = Math.ceil(newDate.getTime() / 1000);
        newDate?.setUTCMinutes(newDate?.getUTCMinutes() - 1);
        let from = Math.ceil(newDate.getTime() / 1000); // day 7th before
        handleGetSensorMetrics({ ...payload, ...newPayload, from, to });
      }
    },
    [handleGetSensorMetrics, payload]
  );
  const GET_STRONG_NUMB = useCallback(() => {
    let leng = sensor_metrics?.length;
    const data = leng > 0 ? sensor_metrics[leng - 1] : null; // lấy số liệu của metric cuối cùng trong mảng

    const numb = data ? getAmount(data) : 0;
    setStrongNumb(numb);
  }, [sensor_metrics]);

  useEffect(() => {
    // console.error("!sensorState?.loadingSensorFirstTime");

    // console.log("iotSelected", iotSelected);
    // console.log("sensorId", sensorId);
    if (
      iotSelected > 0 &&
      sensorId > 0 &&
      !sensorState?.loadingSensorFirstTime
    ) {
      dispatch({ type: SensorsACT.LOAD_SENSOR_1ST_TIME, payload: true });
      let newPay = { ...payload, iotId: iotSelected, sensorId };
      setPayload(newPay);
      GET_METRICS(newPay);
    }
  }, [GET_METRICS, dispatch, iotSelected, payload, sensorId, sensorState]);
  //  Lấy Metrics mỗi 5s
  useEffect(() => {
    const intervalGetMetrics = setInterval(GET_METRICS, 15000);
    return () => clearInterval(intervalGetMetrics);
  }, [GET_METRICS]);
  //

  useEffect(() => {
    // SET new strong numb
    // set strong interval
    let newInterval = setInterval(GET_STRONG_NUMB, 1000);
    return () => clearInterval(newInterval);
  }, [GET_STRONG_NUMB, iotSelected, sensorId, sensor_metrics?.length]);

  return (
    <Fragment>
      <CollapseTab
        color="blue"
        title="Electricity generated"
        strongNumb={strongNumb || "---"}
        unit="kWh"
        disable
      />
      <CollapseTab
        color="green"
        title="Biogas treated"
        strongNumb={
          strongNumb ? Number(strongNumb * 0.528888889).toFixed(2) : "---"
        }
        unit="m3"
        disable
      />
    </Fragment>
  );
}

export default ElectricityGenerated;
