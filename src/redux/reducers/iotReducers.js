import { IOTAct } from "../actions/iotAction";
import { handleResponse } from "../handle";

export const initIotState = {
  iot: null,
  iot_minted: null,
  error: null,
  error_code: null,
  latest: "",
  loading: false,
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //
/**
 *
 * @param {import("src/utils/model").IAction} action
 * @returns
 */
const iotReducer = (state = initIotState, action) => {
  const res = handleResponse(action);
  switch (action.type) {
    case IOTAct.GET_IOT.REQUEST:
      // console.log("---------------request ", { action, res });
      return {
        ...state,
        loading: false,
        iot: null,
        error: null,
        error_code: null,
        latest: action.type,
      };
    case IOTAct.GET_IOT.SUCCESS:
      // console.log("---------------SUCCESS ", res);
      return {
        ...state,
        loading: true,
        iot: res.data,
        latest: action.type,
      };
    case IOTAct.GET_IOT.FAILURE:
      // console.log("---------------FAILURE ", res);
      return {
        ...state,
        loading: true,
        error: res.error,
        error_code: res.error_code,
        latest: action.type,
      };
    case IOTAct.GET_IOT_MINTED.REQUEST:
      // console.log("---------------request ", { action, res });
      return {
        ...state,
        loading: false,
        iot_minted: null,
        error: null,
        error_code: null,
        latest: action.type,
      };
    case IOTAct.GET_IOT_MINTED.SUCCESS:
      // console.log("---------------SUCCESS ", res);
      return {
        ...state,
        loading: true,
        iot_minted: res.data,
        latest: action.type,
      };
    case IOTAct.GET_IOT_MINTED.FAILURE:
      // console.log("---------------FAILURE ", res);
      return {
        ...state,
        loading: true,
        error: res.error,
        error_code: res.error_code,
        latest: action.type,
      };
    case IOTAct.CLEAR_ERR:
      return {
        ...state,
        error: null,
        error_code: null,
      };
    default:
      return state;
  }
};

export default iotReducer;
