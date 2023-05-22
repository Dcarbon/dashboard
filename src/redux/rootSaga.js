import { all } from "redux-saga/effects";
import { watcherIot } from "./saga/iotSaga";
import { watcherProject } from "./saga/projectSaga";
import { watcherOperator } from "./saga/operatorSaga";

export default function* rootSaga() {
  yield all([...watcherIot, ...watcherProject, ...watcherOperator]);
}
