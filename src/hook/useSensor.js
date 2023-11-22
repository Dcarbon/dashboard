import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SensorsACT } from "src/redux/actions/sensorsAction";
import { useIotState } from "./useIOT";
import { IOTAct } from "src/redux/actions/iotAction";

export function useSensorState() {
  const sensorsState = useSelector((state) => state.sensorsState);
  return {
    error: sensorsState?.error,
    error_code: sensorsState?.error_code,
    latest: sensorsState?.latest,
    loading: sensorsState?.loading,
    sensor_metrics: sensorsState?.sensor_metrics,
    sensors: sensorsState?.sensors,
  };
}

export function useSensors() {
  const dispatch = useDispatch();
  const sensorsState = useSensorState();
  const handleSetSensor = useCallback(
    ({ iotId, skip, limit, iotAddress }) => {
      dispatch({
        type: SensorsACT.GET_SENSORS.REQUEST,
        payload: { iotId, skip: skip ?? 0, limit: limit ?? 50, iotAddress },
      });
    },
    [dispatch]
  );
  return [sensorsState.sensors, handleSetSensor];
}

export function useSensors_Generated() {
  const dispatch = useDispatch();
  const iotState = useIotState();
  const handleSetIot_inside = useCallback(
    (list) => {
      dispatch({
        type: IOTAct.GET_IOTs_MINTED.REQUEST,
        payload: {
          list,
        },
      });
    },
    [dispatch]
  );
  return [iotState.iots_minted, handleSetIot_inside];
}
