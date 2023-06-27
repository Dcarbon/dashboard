import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DcarbonAPI from "src/tools/hook";
import CollapseTab from "../CollapseTab";
import ColumnChart from "../ColumnChart";
import stls from "./index.module.scss";
import { hexToString } from "src/tools/const";
import { SensorsACT } from "src/redux/actions/sensorsAction";

function ElectricityGenerated_intoTrash({
  iotSelected,
  currentTab,
  setCurrentTab,
}) {
  const [payload, setPayload] = useState({
    iotId: 0,
    from: 0,
    to: 0,
    sensorId: 0,
    limit: 50,
    skip: 0,
  });
  const sensorState = useSelector(new DcarbonAPI().GetSensorsState);
  const [durType, setDurType] = useState(0);
  const [arrData, setArrData] = useState(null);
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
      console.log(
        "TRASH ---------- handleGetSensorMetrics",
        handleGetSensorMetrics
      );
      setPayload({ ...newPayload });
      dispatch({
        type: SensorsACT.GET_SENSORS_METRICS.REQUEST,
        payload: newPayload,
      });
    },
    [dispatch]
  );

  // get sensor metrics by iot Selected

  useEffect(() => {
    if (
      iotSelected > 0 &&
      iotSelected !== payload?.iotId &&
      sensorState?.sensors?.length > 0
    ) {
      const sensorId = sensorState?.sensors[0].id;
      handleGetSensorMetrics({ ...payload, iotId: iotSelected, sensorId });
      setArrData(null);
    }
  }, [handleGetSensorMetrics, iotSelected, payload, sensorState?.sensors]);
  const handleDataChangeDurType = (newDur) => {
    handleGetSensorMetrics({ ...payload, from: newDur.from, to: newDur.to });
  };

  return (
    <CollapseTab
      color="blue"
      title="Electricity generated"
      strongNumb={strongNumb}
      unit="kWh"
      isOpen={Boolean(currentTab === 2)}
      handleOpen={() => setCurrentTab(currentTab !== 2 ? 2 : 0)}
    >
      <div className={stls.carbonMinted}>
        <ColumnChart
          unit="kWh"
          data={sensorState?.sensor_metrics}
          payload={payload}
          setPayload={setPayload}
          durType={durType}
          setDurType={setDurType}
          arrData={arrData}
          setArrData={setArrData}
          handleValue={getAmount}
          setStrongNumb={setStrongNumb}
          handleDataChangeDurType={handleDataChangeDurType}
        />
      </div>
    </CollapseTab>
  );
}

export default ElectricityGenerated_intoTrash;
