import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { IOTAct } from "src/redux/actions/iotAction";
import ColumnChart from "./ColumnChart";

function Carbon({
  title,
  payload,
  list_time_by_duration,
  iotSelected,
  durType,
  setCarbonGenerated,
}) {
  const dispatch = useDispatch();
  const iotState = null;
  const iot_minted = useMemo(
    () => iotState?.iot_minted,
    [iotState?.iot_minted]
  );

  // call back :  Handle get IotMinted
  const handleGetIotMinted = useCallback(
    (newPayload) => {
      console.log("===================================");
      console.log("New Load iot");
      console.log("===================================");
      let newfrom = Math.round(newPayload.from / 1000);
      let newto = Math.round(newPayload.to / 1000);
      dispatch({
        type: IOTAct.GET_IOT_MINTED.REQUEST,
        payload: {
          ...newPayload,
          to: newto,
          from: newfrom,
        },
      });
    },
    [dispatch]
  );
  const handleGetIotTotalMinted = useCallback(
    (newPayload) => {
      dispatch({
        type: IOTAct.GET_IOT_TOTAL_MINTED.REQUEST,
        payload: newPayload,
      });
    },
    [dispatch]
  );

  useEffect(() => {
    let load = () =>
      handleGetIotMinted({
        ...payload,
        iotId: iotSelected,
      });
    if (iotSelected && payload?.from && payload?.to) {
      load();
    }

    let myInteval = setTimeout(load, 15000);
    return () => clearInterval(myInteval);
  }, [
    handleGetIotMinted,
    handleGetIotTotalMinted,
    iotSelected,
    list_time_by_duration,
    payload,
  ]);

  return (
    <ColumnChart
      title={title}
      durType={durType}
      data={iot_minted}
      list_time_by_duration={list_time_by_duration}
      setCarbonGenerated={setCarbonGenerated}
    />
  );
}

export default Carbon;
