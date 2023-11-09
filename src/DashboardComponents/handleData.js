import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardAct } from "src/redux/actions/dashboardAction";
import { IOTAct } from "src/redux/actions/iotAction";
import { ProjectACT } from "src/redux/actions/projectAction";
import { SensorsACT } from "src/redux/actions/sensorsAction";
import DcarbonAPI from "src/tools/DcarbonAPI";
import { getAmount, roundup_second } from "./handleConfig";
import { AxiosGet } from "src/redux/sagaUtils";
import axios from "axios";
import { configHexAmount } from "src/tools/const";

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
export function useSensorState() {
  return useSelector(thisAPI);
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
//
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

export function useGetTotalCarbon(iotID) {
  const dispatch = useDispatch();

  const handleGetTotal = useCallback(() => {
    let newDate = new Date();
    let to = roundup_second(newDate);
    dispatch({
      type: IOTAct.GET_IOT_TOTAL_MINTED.REQUEST,
      payload: { iotId: iotID, from: 1, to },
    });
  }, [dispatch, iotID]);
  const iotState = useIOTState();
  useEffect(() => {
    if (iotID) {
      handleGetTotal();
      let thisInterval = setInterval(() => handleGetTotal(), 15000);
      return () => clearInterval(thisInterval);
    }
  }, [handleGetTotal, iotID]);
  const total_minted = useMemo(() => {
    if (iotState.total_minted) {
      let thisObj = iotState.total_minted[0];
      let newTotal = thisObj?.amount;
      console.log("");
      return newTotal ? getAmount(newTotal) : 0;
    }
  }, [iotState.total_minted]);

  return total_minted ?? 0;
}

export function useGetGenerated(list, type, sensorId) {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const projectState = useSelector(thisAPI.GetProjectState);
  useEffect(() => {
    if (list?.length > 0 || sensorId) {
      setLoaded(false);
    }
  }, [list?.length, sensorId]);

  useEffect(() => {
    if (list?.length > 0 && !loaded) {
      const numbType = Number(type);
      const newDate = new Date();
      const to = roundup_second(newDate);
      const from = to - 60 * 60 * 24 * 10;
      let idList = [];
      let promisesList = [];
      let url = "";
      idList = list.map((item) => item.id);
      if (numbType >= 0) {
        setLoading(true);
        promisesList = idList.map((item) => {
          if (numbType === 0) {
            // console.log("Get Api mint sign = ", numbType);
            url = `iots/${item}/mint-sign?from=${from}&to=${to}`;
          } else {
            // console.log("Get Api aggregate = ", numbType);
            url = `sensors/sm/aggregate?iotId=${item}&sensorId=${sensorId}&from=${from}&to=${to}&interval=1`;
          }
          // console.log("----------------------url", url);
          return AxiosGet(url);
        });
        //
        axios
          .all(promisesList)
          .then((res) => {
            console.log("GET -------- numbType = " + numbType, res);

            let newValueArr = [];
            console.log("Lọc mảng trả về, lấy data");
            res.forEach((itemRes, idx) => {
              let newData = itemRes?.data;
              // itemRes.data === []
              let checkLength = newData?.length > 0;
              // console.log("newData-----", newData);

              if (checkLength) {
                newValueArr = newData.map((itemData) => {
                  // nếu numbType = 0 => cacbon => amount => handleAmount
                  // nếu numbType > 0 => sensor => value => handleValue
                  if (numbType === 0) {
                    return configHexAmount(itemData?.amount);
                  } else {
                    return itemData?.value;
                  }
                });
                // console.log("newValueArr", newValueArr);
              }
              newData[idx] = {
                id: list[idx].id,
                value: checkLength ? newValueArr : 0,
              };
            });
          })
          .catch((error) =>
            console.error(
              // "Promises all GET -------- numbType = " + numbType,
              error
            )
          )
          .finally(() => {
            setLoaded(true);
            setLoading(false);
          });
      } else {
        console.error("Type không hợp lệ");
      }
    }
  }, [list, loaded, sensorId, type]);
  return { data: projectState?.project_generated || 0, loading };
}
