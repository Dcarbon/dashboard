import { initCustomizationState } from "./reducers/customizationReducer";
import { initIotState } from "./reducers/iotReducers";
import { initOperatorState } from "./reducers/operatorReducer";
import { initProjectState } from "./reducers/projectReducer";

const rootState = {
  customization: { ...initCustomizationState },
  iotState: { ...initIotState },
  projectState: { ...initProjectState },
  operatorState: { ...initOperatorState },
};
export default rootState;
