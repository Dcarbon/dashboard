import { initCustomizationState } from "./reducers/customizationReducer";
import { initIotState } from "./reducers/iotReducers";
import { initOperatorState } from "./reducers/operatorReducer";
import { initProjectState } from "./reducers/projectReducer";
import { initsensorsState } from "./reducers/sensorsReducer";
import { initDashboardState } from "./reducers/dashboardReducers";

const rootState = {
  customization: { ...initCustomizationState },
  iotState: { ...initIotState },
  projectState: { ...initProjectState },
  operatorState: { ...initOperatorState },
  sensorsState: { ...initsensorsState },
  dashboardState: { ...initDashboardState },
};
export default rootState;
