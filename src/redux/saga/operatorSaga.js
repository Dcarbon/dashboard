import { takeEvery } from "redux-saga/effects";
import { AxiosGet, grpcCall } from "../sagaUtils";
import { OperatorACT } from "../actions/operatorAction";

export const watcherOperator = [
  takeEvery(
    OperatorACT.METRICS.REQUEST,
    grpcCall(
      getMetrics,
      OperatorACT.METRICS.SUCCESS,
      OperatorACT.METRICS.FAILURE
    )
  ),
];

function getMetrics(action) {
  var url = `op/metrics/${action.payload.iotId}`;
  return AxiosGet(url);
}
