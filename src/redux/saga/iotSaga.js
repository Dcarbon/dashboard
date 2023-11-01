import { takeEvery } from "redux-saga/effects";
import { AxiosGet, grpcCall } from "../sagaUtils";
import { IOTAct } from "../actions/iotAction";
import { handleTakeEvery } from "../handle";

export const watcherIot = [
  takeEvery(
    IOTAct.COUNT_IOT.REQUEST,
    grpcCall(countIot, IOTAct.COUNT_IOT.SUCCESS, IOTAct.COUNT_IOT.FAILURE)
  ),
  takeEvery(
    IOTAct.IsActive.REQUEST,
    grpcCall(checkisactive, IOTAct.IsActive.SUCCESS, IOTAct.IsActive.FAILURE)
  ),
  takeEvery(
    IOTAct.GET_IOT.REQUEST,
    grpcCall(getIot, IOTAct.GET_IOT.SUCCESS, IOTAct.GET_IOT.FAILURE)
  ),
  takeEvery(
    IOTAct.GET_IOT_TOTAL_MINTED.REQUEST,
    grpcCall(
      getIotTotalMinted,
      IOTAct.GET_IOT_TOTAL_MINTED.SUCCESS,
      IOTAct.GET_IOT_TOTAL_MINTED.FAILURE
    )
  ),

  takeEvery(
    IOTAct.GET_IOT_MINTED.REQUEST,
    grpcCall(
      getIotMinted,
      IOTAct.GET_IOT_MINTED.SUCCESS,
      IOTAct.GET_IOT_MINTED.FAILURE
    )
  ),
  handleTakeEvery(getIOTs_byProject, IOTAct.GET_IOTs_byProject),
];

function countIot() {
  var url = `iots/count`;
  return AxiosGet(url);
}

function checkisactive(action) {
  // console.log("checkisactive-------------", action);
  var url = `sensors/sm?from=${action.payload.from}&to=${action.payload.to}&iotId=${action.payload.iotId}&limit=1`;
  return AxiosGet(url);
}
function getIot(action) {
  var url = `iots/${action.payload}`;
  return AxiosGet(url);
}
function getIOTs_byProject(action) {
  var url = `iots/list?projectId=${action.payload}&status=0`;
  return AxiosGet(url);
}

function getIotMinted(action) {
  var url = `iots/${action.payload.iotId}/minted?from=${action.payload.from}&to=${action.payload.to}&interval=${action.payload.interval}`;
  return AxiosGet(url);
}

function getIotTotalMinted(action) {
  var url = `iots/${action.payload.iotId}/mint-sign?from=${action.payload.from}&to=${action.payload.to}`;
  return AxiosGet(url);
}
