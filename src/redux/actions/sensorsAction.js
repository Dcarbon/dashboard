import { handleActions } from "../handle";

export const SensorsACT = {
  GET_SENSORS: handleActions("get_sensors"),
  GET_SENSORS_METRICS: handleActions("get_sensors_metrics"),
  CLEAR_ERR: "SENSORS_CLEAR_ERR",
};
