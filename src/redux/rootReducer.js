import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./reducers/customizationReducer";
import iotReducer from "./reducers/iotReducers";
import projectReducer from "./reducers/projectReducer";
import operatorReducer from "./reducers/operatorReducer";

// ==============================|| COMBINE REDUCER ||============================== //

const rootReducer = combineReducers({
  customization: customizationReducer,
  iotState: iotReducer,
  projectState: projectReducer,
  operatorState: operatorReducer,
});

export default rootReducer;
