import { call, put } from "redux-saga/effects";
import { gateway, getToken } from "./handle";
import axios from "axios";

function* sagaCall(action) {
  try {
    // console.log('Saga request ------------------ : ', action.type);
    var resp = yield call(this.execute, action);

    // console.log('Saga Success : ', resp.data);
    yield put({
      type: this.success,
      response: resp.data,
      payload: action.payload,
    });
  } catch (err) {
    console.error(
      `Saga call Error ${action.type}:${this.failure}: ${JSON.stringify(err)}`
    );
    yield put({
      type: this.failure,
      payload: action.payload,
      response: err?.response?.data ?? err,
    });
  }
}

export function grpcCall(execute, success, failure) {
  return sagaCall.bind({ execute, success, failure });
}

export function metaWithAuth(meta) {
  if (!meta) {
    meta = {
      "Content-Type": "application/json",
    };
  }
  var token = getToken();
  if (token !== "") {
    meta["Authorization"] = `Bearer ${token}`;
  }
  return { headers: meta };
}

export function metaWithAuthGRPC(meta) {
  if (!meta) {
    meta = {};
  }
  var token = getToken();
  if (token !== "") {
    meta["Authorization"] = `Bearer ${token}`;
  }
  return meta;
}
export const handleUrl = (url) => {
  if (url.startsWith("http")) {
    return url;
  }
  let reqURL = gateway + "/" + url;
  // console.log(`-----------: `, reqURL);
  return reqURL;
};

export function AxiosGet(url) {
  // console.warn("AxiosGet--------GET");
  return axios.get(handleUrl(url), metaWithAuth());
}
export function AxiosDelete(url) {
  // console.warn("AxiosDelete--------DELETE");
  return axios.delete(handleUrl(url), metaWithAuth());
}
export function AxiosPatch(url, options) {
  // console.warn("AxiosPatch--------PATCH");
  return axios.patch(handleUrl(url), options, metaWithAuth());
}
export function AxiosPost(url, options) {
  // console.warn("AxiosPost--------POST");
  return axios.post(handleUrl(url), options, metaWithAuth());
}
