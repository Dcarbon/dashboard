import { handleActions } from "../handle";

export const ProjectACT = {
  GET_PROJECT: handleActions("get_project"),
  Total_PROJECT_minted: handleActions("Total_PROJECT_minted"),
  CLEAR_ERR: "Project_CLEAR_ERR",
  CLEAR_PROJECT: "Project_CLEAR_PROJECT",
};
