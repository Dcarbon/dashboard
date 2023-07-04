import { handleActions } from "../handle";

export const ProjectACT = {
  GET_PROJECT: handleActions("get_project"),
  CLEAR_ERR: "Project_CLEAR_ERR",
  CLEAR_PROJECT: "Project_CLEAR_PROJECT",
};
