import { handleActions } from "../handle";

export const IOTAct = {
  COUNT_IOT: handleActions("count_iot"),
  GET_IOT: handleActions("get_iot"),
  GET_IOT_MINTED: handleActions("get_iot_minted"),
  GET_IOT_TOTAL_MINTED: handleActions("get_iot_TOTAL_minted"),
  CLEAR_ERR: "IOT_CLEAR_ERR",
};
