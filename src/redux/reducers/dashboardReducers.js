import { DashboardAct } from "../actions/dashboardAction";
import { handleResponse } from "../handle";

export const initDashboardState = {
  all_features: undefined,
  currentIOT: 0,
  total_project_minted: undefined,
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //
/**
 *
 * @param {import("src/utils/model").IAction} action
 * @returns
 */
const dashboardReducer = (state = initDashboardState, action) => {
  const res = handleResponse(action);
  switch (action.type) {
    //
    //
    //
    //
    //
    //
    //
    case DashboardAct.TOTAL_PROJECT_MINTED.REQUEST:
      // console.log("---------------request ", { action, res });
      return {
        ...state,
        loading: true,
        error: null,
        error_code: null,
        latest: action.type,
        total_project_minted: 0,
      };
    case DashboardAct.TOTAL_PROJECT_MINTED.SUCCESS:
      console.log("TOTAL_PROJECT_MINTED---------------SUCCESS ", action);
      return {
        ...state,
        latest: action.type,
        loading: false,
        total_project_minted: action?.response,
      };
    case DashboardAct.TOTAL_PROJECT_MINTED.FAILURE:
      console.log("TOTAL_PROJECT_MINTED---------------FAILURE ", action);
      return {
        ...state,
        latest: action.type,
        loading: false,
        error: res.error,
        error_code: res.error_code,
        total_project_minted: -1,
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
    //
    //
    //
    //
    //
    case DashboardAct.SET_currentIOT:
      // console.log("---------------FAILURE ", action);
      return {
        ...state,
        latest: action.type,
        currentIOT: action.payload,
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
    //
    //
    case DashboardAct.GET_ALL_FEATURES.REQUEST:
      // console.log("---------------request ", { action, res });
      return {
        ...state,
        loading: true,
        error: null,
        error_code: null,
        latest: action.type,
      };
    case DashboardAct.GET_ALL_FEATURES.SUCCESS:
      // console.log("---------------SUCCESS ", res);
      return {
        ...state,
        latest: action.type,
        loading: false,
        all_features: res.data?.features,
      };
    case DashboardAct.GET_ALL_FEATURES.FAILURE:
      // console.log("---------------FAILURE ", action);
      return {
        ...state,
        latest: action.type,
        loading: false,
        error: res.error,
        error_code: res.error_code,
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
    case DashboardAct.RESET:
      // console.log("---------------FAILURE ", action);
      return {
        ...state,
        currentIOT: 0,
        total_project_minted: undefined,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
