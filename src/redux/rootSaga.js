import { all } from "redux-saga/effects";
import { watcherIot } from "./saga/iotSaga";
import { watcherProject } from "./saga/projectSaga";
import { watcherOperator } from "./saga/operatorSaga";
import { watcherSensors } from "./saga/sensorsSaga";
import { watcherDashboard } from "./saga/dashboardSaga";

export default function* rootSaga() {
  yield all([
    ...watcherIot,
    ...watcherProject,
    ...watcherOperator,
    ...watcherSensors,
    ...watcherDashboard,
  ]);
}
