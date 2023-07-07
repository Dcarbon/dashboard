import { IOTAct } from "../actions/iotAction";
import { handleResponse } from "../handle";

export const initIotState = {
  iot: null,
  count: null,
  iot_minted: null,
  total_minted: null,
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
    //
    //
    //
    //
    // count iot
    //
    //
    case IOTAct.COUNT_IOT.REQUEST:
      // console.log("---------------request ", { action, res });
      return {
        ...state,
        loading: false,
        error: null,
        error_code: null,
        latest: action.type,
      };
    case IOTAct.COUNT_IOT.SUCCESS:
      // console.log("---------------SUCCESS ", res);
      return {
        ...state,
        loading: true,
        count: res.data?.count,
        latest: action.type,
      };
    case IOTAct.COUNT_IOT.FAILURE:
      // console.log("---------------FAILURE ", res);
      return {
        ...state,
        loading: true,
        error: res.error,
        error_code: res.error_code,
        latest: action.type,
      };
    //
    //
    //
    //
    // get iot
    //
    //
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
      // console.log("GET_IOT_MINTED---------------request ", { action, res });
      return {
        ...state,
        loading: false,
        error: null,
        error_code: null,
        latest: action.type,
      };
    case IOTAct.GET_IOT_MINTED.SUCCESS:
      // console.log("GET_IOT_MINTED---------------SUCCESS ", res);
      return {
        ...state,
        loading: true,
        iot_minted: res.data,
        latest: action.type,
      };
    case IOTAct.GET_IOT_MINTED.FAILURE:
      // console.log("GET_IOT_MINTED---------------FAILURE ", res);
      return {
        ...state,
        loading: true,
        error: res.error,
        error_code: res.error_code,
        latest: action.type,
      };
    case IOTAct.GET_IOT_TOTAL_MINTED.REQUEST:
      // console.log("GET_IOT_MINTED---------------request ", { action, res });
      return {
        ...state,
        loading: false,
        error: null,
        error_code: null,
        latest: action.type,
      };
    case IOTAct.GET_IOT_TOTAL_MINTED.SUCCESS:
      // console.log("GET_IOT_TOTAL_MINTED---------------SUCCESS ", res);
      return {
        ...state,
        loading: true,
        total_minted: res.data,
        latest: action.type,
      };
    case IOTAct.GET_IOT_TOTAL_MINTED.FAILURE:
      // console.log("GET_IOT_MINTED---------------FAILURE ", res);
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
