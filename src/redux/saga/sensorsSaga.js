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
    SensorsACT.GET_SENSORS_METRICS_TEM.REQUEST,
    grpcCall(
      getSensorMetrics,
      SensorsACT.GET_SENSORS_METRICS_TEM.SUCCESS,
      SensorsACT.GET_SENSORS_METRICS_TEM.FAILURE
    )
  ),
  takeEvery(
    SensorsACT.GET_SENSORS_METRICS_BIO.REQUEST,
    grpcCall(
      getSensorMetrics,
      SensorsACT.GET_SENSORS_METRICS_BIO.SUCCESS,
      SensorsACT.GET_SENSORS_METRICS_BIO.FAILURE
    )
  ),
];
function getSensors(action) {
  // console.log("action", action);
  var url = `sensors/?skip=${action.payload.skip}&limit=${action.payload.limit}&iot_id=${action.payload.iotId}&iot_address=${action.payload.iotAddress}`;
  return AxiosGet(url);
}
function getSensorMetrics(action) {
  // console.log("getSensorMetrics");
  var url = `sensors/sm?from=${action.payload.from}&to=${action.payload.to}&iotId=${action.payload.iotId}&limit=${action.payload.limit}&skip=${action.payload.skip}&sensorId=${action.payload.sensorId}`;
  // console.log("url", url);
  return AxiosGet(url);
}
