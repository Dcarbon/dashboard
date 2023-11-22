import { SensorsACT } from "../actions/sensorsAction";
import { handleResponse } from "../handle";
export const initsensorsState = {
  sensors: null,
  sensor_metrics_: null,
  sensors_generated: [],
  error: null,
  error_code: null,
  latest: "",
  loading: false,
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
    //
    //
    // get_Sensors_Generated
    // get_Sensors_Generated
    // get_Sensors_Generated
    // get_Sensors_Generated
    // get_Sensors_Generated
    // get_Sensors_Generated
    // get_Sensors_Generated
    // get_Sensors_Generated
    // get_Sensors_Generated
    // get_Sensors_Generated
    //
    //
    //
    //
    case SensorsACT.get_Sensors_Generated.REQUEST:
      return {
        ...state,
        loading: false,
        error: null,
        error_code: null,
        latest: action.type,
        sensors_generated: [],
      };
    case SensorsACT.get_Sensors_Generated.SUCCESS:
      return {
        ...state,
        loading: true,
        sensors_generated: res.data,
        latest: action.type,
      };
    case SensorsACT.get_Sensors_Generated.FAILURE:
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
    //
    //
    //
    //
    //
    //
    //
    //
    //

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

    default:
      return state;
  }
};

export default sensorsReducer;
