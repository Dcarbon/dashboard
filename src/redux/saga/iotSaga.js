import { takeEvery } from "redux-saga/effects";
import { AxiosGet, grpcCall } from "../sagaUtils";
import { IOTAct } from "../actions/iotAction";

export const watcherIot = [
  takeEvery(
    IOTAct.GET_IOT.REQUEST,
    grpcCall(getIot, IOTAct.GET_IOT.SUCCESS, IOTAct.GET_IOT.FAILURE)
  ),
  takeEvery(
    IOTAct.GET_IOT_MINTED.REQUEST,
    grpcCall(
      getIotMinted,
      IOTAct.GET_IOT_MINTED.SUCCESS,
      IOTAct.GET_IOT_MINTED.FAILURE
    )
  ),
];

function getIot(action) {
  var url = `iots/${action.payload}`;
  return AxiosGet(url);
}

function getIotMinted(action) {
  var url = `iots/${action.payload.iotId}/mint-sign/?from=${action.payload.from}&to=${action.payload.to}`;
  return AxiosGet(url);
}
