import { takeEvery } from "redux-saga/effects";
import { AxiosPost, grpcCall } from "./sagaUtils";
const checkWindow = () => Boolean(typeof window !== "undefined");
/* eslint-disable no-undef */
var token = checkWindow() && (localStorage.getItem("token") || null);
var duration = (checkWindow() && localStorage.getItem("duration")) || null;
var login_at = (checkWindow() && localStorage.getItem("login_at")) || 0;
var account =
  checkWindow() &&
  (localStorage.getItem("account")
    ? JSON.parse(localStorage.getItem("account"))
    : "");

export const gateway = process.env.NEXT_PUBLIC_APP_GATEWAY;
export const CMS_HOST = process.env.NEXT_PUBLIC_CMS_HOST;
export const IOT_HOST = process.env.NEXT_PUBLIC_IOT_HOST;
export const videoBanner = process.env.VIDEO;
// token
export const setToken = (newToken) => {
  token = newToken;
  window.localStorage.setItem("token", newToken);
};
export const getToken = () => token;

// duration
export const setDuration = (newDuration) => {
  duration = newDuration;
  window.localStorage.setItem("duration", duration);
};
export const getLogin = () => login_at;
export const setLoginTime = (time) => {
  login_at = time;
  window.localStorage.setItem("login_at", login_at);
};
export const getDuration = () => duration;

// user

export function setMyAccount(model) {
  account = model;
  window.localStorage.setItem(
    "account",
    account ? JSON.stringify(account) : ""
  );
}
export const getMyAccount = () => account;

export const errMess = (content) => ({
  type: "error",
  content,
});
export const sucMess = (content) => ({
  type: "success",
  content,
});
export const handleLogin = async (payload) => {
  const data = JSON.stringify(payload);
  return await AxiosPost("login", data);
};
export const handleErrorCodeMessage = (err_code) => {
  switch (err_code) {
    case 2:
      return "Không có quyền";

    default:
      return err_code;
  }
};
export const handleResponse = (action) => {
  const paging = action?.response?.paging;
  return {
    data: action?.response,
    paging: {
      page: paging?.page,
      limit: paging?.limit,
      total: paging?.total,
      next_page: paging?.next_page,
    },
    filter: action?.response?.filter,
    message: {
      success: (text) => sucMess(text),
      error: (text) => errMess(text + ": " + action?.response?.message),
    },
    error: action?.response?.message,
    error_code: action?.response?.error_code,
  };
};
export const handleActions = (text) => ({
  REQUEST: text + "_Request",
  SUCCESS: text + "_Success",
  FAILURE: text + "_Failure",
});

export const handleTakeEvery = (thisFunc, thisObj) => {
  if (thisObj) {
    return takeEvery(
      thisObj.REQUEST,
      grpcCall(thisFunc, thisObj.SUCCESS, thisObj.FAILURE)
    );
  }
};
