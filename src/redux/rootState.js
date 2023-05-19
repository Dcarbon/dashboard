import { initCustomizationState } from "./reducers/customizationReducer";
import { initIotState } from "./reducers/iotReducers";
import { initProjectState } from "./reducers/projectReducer";

const rootState = {
  customization: { ...initCustomizationState },
  iotState: { ...initIotState },
  projectState: { ...initProjectState },
};
export default rootState;
