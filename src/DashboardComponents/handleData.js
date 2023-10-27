import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardAct } from "src/redux/actions/dashboardAction";
import { IOTAct } from "src/redux/actions/iotAction";
import { ProjectACT } from "src/redux/actions/projectAction";
import { SensorsACT } from "src/redux/actions/sensorsAction";
import DcarbonAPI from "src/tools/DcarbonAPI";

const thisAPI = new DcarbonAPI();
export function useAllFeatures() {
  const dispatch = useDispatch();
  const dashboardState = useSelector(thisAPI.DashboardState);
  const features = useMemo(
    () => dashboardState?.all_features,
    [dashboardState?.all_features]
  );
  useEffect(() => {
    if (typeof features === "undefined") {
      console.log("Request get all features available");
      dispatch({ type: DashboardAct.GET_ALL_FEATURES.REQUEST });
    }
  }, [dispatch, features]);
  return features;
}

//
//
//
//
//
export function useCurrentIOTState() {
  const dispatch = useDispatch();
  const dashboardState = useSelector(thisAPI.DashboardState);
  const currentIOT = useMemo(
    () => dashboardState?.currentIOT,
    [dashboardState?.currentIOT]
  );
  const handleSetIOTState = (val) => {
    if (val) {
      dispatch({ type: IOTAct.GET_IOT.REQUEST, payload: val });
      dispatch({ type: DashboardAct.SET_currentIOT, payload: val });
    }
  };
  return [currentIOT, handleSetIOTState];
}
//
//
//
//
//
export function useIOTState() {
  return useSelector(thisAPI.GetIOTState);
}
export function useGetSensorsByIot() {
  const [id] = useCurrentIOTState();
  const dispatch = useDispatch();
  const sensors = useSelector(thisAPI.GetSensorsState);
  const handleGetSensor = useCallback(
    (newId) =>
      dispatch({
        type: SensorsACT.GET_SENSORS.REQUEST,
        payload: {
          iotId: newId ?? id,
          limit: 100,
          skip: 0,
        },
      }),
    [dispatch, id]
  );

  return [sensors?.sensors, handleGetSensor];
}
//
//
//
//
//
export function useTotalIots() {
  const dashboardState = useSelector(thisAPI.DashboardState);
  return dashboardState.all_features;
}
//
//
//
//
//
export function useGet_Total_Project_Minted() {
  const dispatch = useDispatch();
  const dashboardState = useSelector(thisAPI.DashboardState);
  const result = useMemo(
    () => dashboardState?.total_project_minted,
    [dashboardState?.total_project_minted]
  );
  const handleRequest = (listIot = []) => {
    dispatch({
      type: DashboardAct.TOTAL_PROJECT_MINTED.REQUEST,
      payload: { listIOT: listIot },
    });
  };
  return [result, handleRequest];
}

//
//
//
//
//
export function useProjectInformation(projectID) {
  const dispatch = useDispatch();
  const projectState = useSelector(thisAPI.GetProjectState);
  useEffect(() => {
    if (projectID) {
      dispatch({ type: ProjectACT.GET_PROJECT.REQUEST, payload: projectID });
    }
  }, [dispatch, projectID]);

  return projectState?.project;
}
export function useGetTotalIot_byProject(projectID) {
  const dispatch = useDispatch();
  const iotState = useSelector(thisAPI.GetIOTState);
  useEffect(() => {
    if (projectID) {
      dispatch({ type: IOTAct.GET_IOTs_byProject.REQUEST, payload: projectID });
    }
  }, [dispatch, projectID]);

  return iotState?.iots_by_project;
}
