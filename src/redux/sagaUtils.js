import { call, put } from "redux-saga/effects";
import { gateway, getToken } from "./handle";
import axios from "axios";

function* sagaCall(action) {
  try {
    // console.log("action", action);
    // console.log("Saga request ------------------ : ", action.type);
    var resp = yield call(this.execute, action);

    // console.log("Saga Success : ", resp.data);
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
  try {
    return axios.get(handleUrl(url), metaWithAuth());
  } catch (error) {
    console.log("AxiosGet", error);
    alert("AxiosGet lỗi");
    return null;
  }
}
export function AxiosDelete(url) {
  // console.warn("AxiosDelete--------DELETE");
  try {
    return axios.delete(handleUrl(url), metaWithAuth());
  } catch (error) {
    console.log("AxiosDelete", error);
    alert("AxiosDelete lỗi");
    return null;
  }
}
export function AxiosPatch(url, options) {
  // console.warn("AxiosPatch--------PATCH");

  try {
    return axios.patch(handleUrl(url), options, metaWithAuth());
  } catch (error) {
    console.log("AxiosPatch", error);
    alert("AxiosPatch lỗi");
    return null;
  }
}
export function AxiosPost(url, options) {
  // console.warn("AxiosPost--------POST");
  try {
    return axios.post(handleUrl(url), options, metaWithAuth());
  } catch (error) {
    console.log("AxiosPost", error);
    alert("AxiosPost lỗi");
    return null;
  }
}
