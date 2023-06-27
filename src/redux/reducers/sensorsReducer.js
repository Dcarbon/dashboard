import { SensorsACT } from "../actions/sensorsAction";
import { handleResponse } from "../handle";

export const initsensorsState = {
  sensors: null,
  sensor_metrics: null,
  error: null,
  error_code: null,
  latest: "",
  loading: false,
  loadingSensorFirstTime: false,
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const sensorsReducer = (state = initsensorsState, action) => {
  const res = handleResponse(action);
  switch (action.type) {
    case SensorsACT.GET_SENSORS.REQUEST:
      // console.log("---------------request ", { action, res });
      return {
        ...state,
        loading: false,
        error: null,
        error_code: null,
        latest: action.type,
      };
    case SensorsACT.GET_SENSORS.SUCCESS:
      // console.log("---------------SUCCESS ", { action, res });
      return {
        ...state,
        sensors: res.data,
        latest: action.type,
        loading: true,
      };
    case SensorsACT.GET_SENSORS.FAILURE:
      // console.log("---------------FAILURE ", { action, res });
      return {
        ...state,
        loading: true,
        error: res.error,
        error_code: res.error_code,
        latest: action.type,
      };
    case SensorsACT.GET_SENSORS_METRICS.REQUEST:
      // console.log("---------------request ", { action, res });
      return {
        ...state,
        loading: false,
        error: null,
        error_code: null,
        latest: action.type,
      };
    case SensorsACT.GET_SENSORS_METRICS.SUCCESS:
      // console.log("---------------SUCCESS ", { action, res });
      return {
        ...state,
        loading: true,
        sensor_metrics: res.data?.metrics,
        latest: action.type,
      };
    case SensorsACT.GET_SENSORS_METRICS.FAILURE:
      // console.log("---------------FAILURE ", { action, res });
      return {
        ...state,
        loading: true,
        error: res.error,
        error_code: res.error_code,
        latest: action.type,
      };

    case SensorsACT.CLEAR_ERR:
      return {
        ...state,
        error: null,
        error_code: null,
      };
    case SensorsACT.LOAD_SENSOR_1ST_TIME:
      return {
        ...state,
        loadingSensorFirstTime: action.payload,
      };
    default:
      return state;
  }
};

export default sensorsReducer;
