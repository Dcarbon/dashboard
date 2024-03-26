import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectACT } from "src/redux/actions/projectAction";

export function useProjectState() {
  const projectState = useSelector((state) => state?.projectState);  
  return {
    iots_inside: projectState?.iots_inside,
    project: projectState?.project,
    error: projectState?.error,
    error_code: projectState?.error_code,
    latest: projectState?.latest,
    loading: projectState?.loading,
  };
}
export function useProjectMinted() {
  const res = useSelector((state) => state?.project?.total_project_minted);
  return res;
}

export function useProject() {
  const dispatch = useDispatch();
  const projectState = useProjectState();
  const handleSetProject = useCallback(
    (id) => {
      dispatch({ type: ProjectACT.GET_PROJECT.REQUEST, payload: id });
    },
    [dispatch]
  );    
  return [projectState.project, handleSetProject];
}
export function useProjectDetail(id) {
  if (id === 2) {
    return {
      type: "Pig farm",
      location: "Khu 5, Xã Minh Côi, Huyện Hạ Hoà, Tỉnh Phú Thọ, Việt Nam",

      detail: `<p>With a daily amount of 1000 kg waste, if it is not properly treated, it will cause environmental pollution, affecting the ecosystem in the area, leading to the death of the ecosystem within the region, as well as emitting tens or even hundreds of tons of greenhouse gases into the atmosphere every year.</p>
        <br /><p>Therefore, when implementing a processing system with machine capacity 500 kVA, environmental concerns will be thoroughly addressed and the health of the residents (HOW MANY HOUSEHOLDS) in the area will be protected, as well as the ability to transparently measure and monitor the waste treatment process on a daily and hourly basis.</p>`,
    };
  }
  return;
}
