import { takeEvery } from "redux-saga/effects";
import { AxiosGet, grpcCall } from "../sagaUtils";
import { SensorsACT } from "../actions/sensorsAction";

export const watcherSensors = [
  takeEvery(
    SensorsACT.GET_SENSORS.REQUEST,
    grpcCall(
      getSensors,
      SensorsACT.GET_SENSORS.SUCCESS,
      SensorsACT.GET_SENSORS.FAILURE
    )
  ),
  takeEvery(
    SensorsACT.GET_SENSORS_METRICS.REQUEST,
    grpcCall(
      getSensorMetrics,
      SensorsACT.GET_SENSORS_METRICS.SUCCESS,
      SensorsACT.GET_SENSORS_METRICS.FAILURE
    )
  ),
];
function getSensors(action) {
  console.log("action", action);
  var url = `sensors/?skip=${action.payload.skip}&limit=${action.payload.limit}&iot_id=${action.payload.iotId}&iot_address=${action.payload.iotAddress}`;
  return AxiosGet(url);
}
function getSensorMetrics(action) {
  console.log("action", action);
  var url = `sensors/sm?from=${action.payload.from}&to=${action.payload.to}&iotId=${action.payload.iotId}&limit=${action.payload.limit}&skip=${action.payload.skip}&sensorId=${action.payload.sensorId}`;
  return AxiosGet(url);
}
