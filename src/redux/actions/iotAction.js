import { handleActions } from "../handle";

export const IOTAct = {
  COUNT_IOT: handleActions("count_iot"),
  IsActive: handleActions("isActive"),
  GET_all_IOT: handleActions("GET_all_IOT"),
  GET_IOT: handleActions("get_iot"),
  GET_IOT_MINTED: handleActions("get_iot_minted"),
  GET_IOT_TOTAL_MINTED: handleActions("get_iot_TOTAL_minted"),
  GET_IOTs_byProject: handleActions("GET_IOTs_byProject"),
  CLEAR_ERR: "IOT_CLEAR_ERR",
  CLEAR_for_dashboard: "CLEAR_for_dashboard",
};
