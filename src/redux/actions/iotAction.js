import { handleActions } from "../handle";

export const IOTAct = {
  GET_IOT: handleActions("get_iot"),
  GET_IOT_MINTED: handleActions("get_iot_minted"),
  CLEAR_ERR: "IOT_CLEAR_ERR",
};
