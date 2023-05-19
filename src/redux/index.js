import { configureStore } from "@reduxjs/toolkit";

// ==============================|| REDUX - MAIN STORE ||============================== //

import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import rootState from "./rootState";

const sagaMiddleware = createSagaMiddleware();
var store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  preloadedState: rootState,
});

sagaMiddleware?.run(rootSaga);
export { store };
