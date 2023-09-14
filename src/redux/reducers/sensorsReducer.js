import { SensorsACT } from "../actions/sensorsAction";
import { handleResponse } from "../handle";
export const initsensorsState = {
  sensors: null,
  sensor_metrics_: null,
  sensor_metrics_bio: null,
  error: null,
  error_code: null,
  latest: "",
  loading: false,
  loadingSensorFirstTime: false,
  sensor_id_: 0,
  energy_id: 0,
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
      // console.log("SensorsACT.GET_SENSORS.SUCCESS---------------SUCCESS ", {
      //   action,
      //   res,
      // });
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
      // console.warn("GET_SENSORS_METRICS---------------request ", {
      //   action,
      //   res,
      // });
      return {
        ...state,
        loading: false,
        error: null,
        error_code: null,
        latest: action.type,
      };
    case SensorsACT.GET_SENSORS_METRICS.SUCCESS:
      let oldData = state.sensor_metrics_ || [];
      let newData = res.data?.metrics || [];

      let final = [];
      if (!action.payload.isFirstTimeLoad) {
        let arrayConcat = newData.concat(oldData);
        final = arrayConcat;
      } else {
        final = newData;
      }
      console.log("final", final);
      return {
        ...state,
        loading: true,
        sensor_metrics_: final,
        sensor_id_: action.payload.sensorId,
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

    case SensorsACT.GET_SENSORS_METRICS_BIO.REQUEST:
      // console.warn("GET_SENSORS_METRICS---------------request ", {
      //   action,
      //   res,
      // });
      return {
        ...state,
        loading: false,
        error: null,
        error_code: null,
        latest: action.type,
      };
    case SensorsACT.GET_SENSORS_METRICS_BIO.SUCCESS:
      // console.log("case SensorsACT.GET_SENSORS_METRICS.SUCCESS:", action);
      // console.log("res----------------------------------------:", res);
      return {
        ...state,
        loading: true,
        sensor_metrics_bio: res.data?.metrics,
        latest: action.type,
      };
    case SensorsACT.GET_SENSORS_METRICS_BIO.FAILURE:
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
    case SensorsACT.CLEAR_SENSOR:
      return {
        ...state,
        sensors: null,
        sensor_metrics_: null,
        sensor_metrics_bio: null,
      };
    case SensorsACT.LOAD_SENSOR_1ST_TIME:
      // console.log("payload load sendor 1 st", action);
      return {
        ...state,
        loadingSensorFirstTime: action.payload,
        sensors: null,
        sensor_metrics_: null,
        sensor_metrics_bio: null,
      };
    default:
      return state;
  }
};

export default sensorsReducer;
