import { OperatorACT } from "../actions/operatorAction";
import { handleResponse } from "../handle";

export const initOperatorState = {
  metric: null,
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
const operatorReducer = (state = initOperatorState, action) => {
  const res = handleResponse(action);
  switch (action.type) {
    case OperatorACT.METRICS.REQUEST:
      // console.log("---------------request ", { action, res });
      return {
        ...state,
        loading: false,
        error: null,
        error_code: null,
        latest: action.type,
      };
    case OperatorACT.METRICS.SUCCESS:
      // console.log("---------------SUCCESS ", res);
      return {
        ...state,
        loading: true,
        metric: res.data,
        latest: action.type,
      };
    case OperatorACT.METRICS.FAILURE:
      // console.log("---------------FAILURE ", res);
      return {
        ...state,
        loading: true,
        error: res.error,
        error_code: res.error_code,
        latest: action.type,
      };

    case OperatorACT.CLEAR_ERR:
      return {
        ...state,
        error: null,
        error_code: null,
      };
    default:
      return state;
  }
};

export default operatorReducer;
