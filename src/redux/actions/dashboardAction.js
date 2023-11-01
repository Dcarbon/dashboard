import { handleActions } from "../handle";

export const DashboardAct = {
  GET_ALL_FEATURES: handleActions("iot_GET_ALL_FEATURES"),
  TOTAL_PROJECT_MINTED: handleActions("TOTAL_PROJECT_MINTED"),
  SET_currentIOT: "SET_currentIOT",
  RESET: "RESET",
};
