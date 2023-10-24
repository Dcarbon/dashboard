import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./reducers/customizationReducer";
import iotReducer from "./reducers/iotReducers";
import projectReducer from "./reducers/projectReducer";
import operatorReducer from "./reducers/operatorReducer";
import sensorsReducer from "./reducers/sensorsReducer";
import dashboardReducer from "./reducers/dashboardReducers";

// ==============================|| COMBINE REDUCER ||============================== //

const rootReducer = combineReducers({
  customization: customizationReducer,
  iotState: iotReducer,
  projectState: projectReducer,
  operatorState: operatorReducer,
  sensorsState: sensorsReducer,
  dashboardState: dashboardReducer,
});

export default rootReducer;
