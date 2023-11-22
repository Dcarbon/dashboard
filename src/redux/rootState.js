import { initCustomizationState } from "./reducers/customizationReducer";
import { initIotState } from "./reducers/iotReducers";
import { initOperatorState } from "./reducers/operatorReducer";
import { initProjectState } from "./reducers/projectReducer";
import { initsensorsState } from "./reducers/sensorsReducer";

const rootState = {
  customization: { ...initCustomizationState },
  iotState: { ...initIotState },
  projectState: { ...initProjectState },
  operatorState: { ...initOperatorState },
  sensorsState: { ...initsensorsState },
};
export default rootState;
