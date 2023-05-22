import { handleActions } from "../handle";

export const OperatorACT = {
  METRICS: handleActions("operator_metrics"),
  STATUS: handleActions("operator_status"),
  CLEAR_ERR: "METRICS_CLEAR_ERR",
};
