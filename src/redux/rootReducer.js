import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./reducers/customizationReducer";
import iotReducer from "./reducers/iotReducers";
import projectReducer from "./reducers/projectReducer";

// ==============================|| COMBINE REDUCER ||============================== //

const rootReducer = combineReducers({
  customization: customizationReducer,
  iotState: iotReducer,
  projectState: projectReducer,
});

export default rootReducer;
