import { AxiosGet } from "../sagaUtils";
import { ProjectACT } from "../actions/projectAction";
import { handleTakeEvery } from "../handle";

export const watcherProject = [
 handleTakeEvery(getProject, ProjectACT.GET_PROJECT),
];

function getProject(action) {
  var url = `project/${action.payload}?lang=vi`;
  return AxiosGet(url);
}
