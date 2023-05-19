import { takeEvery } from "redux-saga/effects";
import { AxiosGet, grpcCall } from "../sagaUtils";
import { ProjectACT } from "../actions/projectAction";

export const watcherProject = [
  takeEvery(
    ProjectACT.GET_PROJECT.REQUEST,
    grpcCall(
      getProject,
      ProjectACT.GET_PROJECT.SUCCESS,
      ProjectACT.GET_PROJECT.FAILURE
    )
  ),
];

function getProject(action) {
  var url = `projects/${action.payload}`;
  return AxiosGet(url);
}
