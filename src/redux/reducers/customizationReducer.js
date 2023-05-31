import { customizationAction } from "../actions/customizationAction";

export const initCustomizationState = {
  mymap: null,
  features: null,
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //
/**
 *
 * @param {import("src/utils/model").IAction} action
 * @returns
 */
const customizationReducer = (state = initCustomizationState, action) => {
  switch (action.type) {
    case customizationAction.SET_MAP:
      return {
        ...state,
        mymap: action.payload.mymap,
      };
    case customizationAction.CHANGE_ID_FEATURE:
      return {
        ...state,
        features: action.payload,
      };
    default:
      return state;
  }
};

export default customizationReducer;
