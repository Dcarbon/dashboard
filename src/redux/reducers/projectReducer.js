import { ProjectACT } from "../actions/projectAction";
import { handleResponse } from "../handle";

export const initProjectState = {
  project: null,
  error: null,
  error_code: null,
  latest: "",
  loading: false,
  iots_inside: [],
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //
/**
 *
 * @param {import("src/utils/model").IAction} action
 * @returns
 */
const projectReducer = (state = initProjectState, action) => {
  const res = handleResponse(action);
  switch (action.type) {
    case ProjectACT.GET_PROJECT.REQUEST:
      // console.log("---------------request ", { action, res });
      return {
        ...state,
        loading: false,
        error: null,
        error_code: null,
        latest: action.type,
      };
    case ProjectACT.GET_PROJECT.SUCCESS:
      // console.log("---------------SUCCESS ", res);
      return {
        ...state,
        loading: true,
        project: res.data,
        latest: action.type,
      };
    case ProjectACT.GET_PROJECT.FAILURE:
      // console.log("---------------FAILURE ", res);
      return {
        ...state,
        loading: true,
        error: res.error,
        error_code: res.error_code,
        latest: action.type,
      };

    case ProjectACT.CLEAR_ERR:
      return {
        ...state,
        error: null,
        error_code: null,
      };

    case ProjectACT.CLEAR_PROJECT:
      return {
        ...state,
        project: null,
      };
    default:
      return state;
  }
};

export default projectReducer;
