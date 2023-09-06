import { handleActions } from "../handle";

export const SensorsACT = {
  GET_SENSORS: handleActions("get_sensors"),
  GET_SENSORS_METRICS_TEM: handleActions("get_sensors_metrics_tem"),
  GET_SENSORS_METRICS_BIO: handleActions("get_sensors_metrics_bio"),
  CLEAR_ERR: "SENSORS_CLEAR_ERR",
  LOAD_SENSOR_1ST_TIME: "LOAD_SENSOR_1ST_TIME",
  CLEAR_SENSOR: "CLEAR_SENSOR",
};
