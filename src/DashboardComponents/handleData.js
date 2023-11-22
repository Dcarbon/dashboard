import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IOTAct } from "src/redux/actions/iotAction";
import { SensorsACT } from "src/redux/actions/sensorsAction";
import { getAmount, roundup_second } from "./handleConfig";
import { AxiosGet } from "src/redux/sagaUtils";
import axios from "axios";
import { apiTotalSensor } from "./Main/MainComponents/Components/Charts/TotalNumber/handle";
import { useCurrentIOT, useIotState } from "src/hook/useIOT";

export function useGetProject() {
  const projectState = useSelector((state) => state.projectState);
  return projectState.project;
}

//
//
//
//
//
export function useSensorState() {
  return useSelector((state) => state.sensorsState);
}
export function useGetSensorsByIot() {
  const [id] = useCurrentIOT();
  const dispatch = useDispatch();
  const sensors = useSelector((state) => state.sensorsState);
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
// export function useGet_Total_Project_Minted() {
//   const dispatch = useDispatch();
//   const dashboardState = useSelector(thisAPI?.DashboardState);
//   const result = useMemo(
//     () => dashboardState?.total_project_minted,
//     [dashboardState?.total_project_minted]
//   );
//   const handleRequest = (listIot = []) => {
//     dispatch({
//       type: DashboardAct.TOTAL_PROJECT_MINTED.REQUEST,
//       payload: { listIOT: listIot },
//     });
//   };
//   return [result, handleRequest];
// }

//
export function useIots_by_projectId(projectID) {
  const dispatch = useDispatch();
  const iotState = useSelector((state) => state.iotState.iot);
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
  const iotState = useIotState();
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

// Lấy tổng số giá trị sensor tạo ra
// Lấy tổng số giá trị sensor tạo ra
// Lấy tổng số giá trị sensor tạo ra
export function useTotalSensorGenerated(list, type, projectId, sensorId) {
  const [loading, setLoading] = useState(false);
  const [listItem, setListItem] = useState([]);
  useEffect(() => {
    if (projectId && Number(type) > 0) {
      console.log("useTotalSensorGenerated", projectId);
      var to = new Date();
      let idList = [];
      let promisesList = [];
      let url = "";
      idList = list?.map((item) => item.id);

      setLoading(true);
      promisesList = idList?.map((item) => {
        url = apiTotalSensor(item, sensorId, 0, to, 2);
        return AxiosGet(url);
      });
      //
      axios
        .all(promisesList)
        .then((res) => {
          // console.log("=====================================");
          // console.log("===useTotalSensorGenerated===");
          // console.log("=====================================");
          // console.log("=====================================");
          // console.log("=====================================");
          // console.log("=====================================");
          // console.log("=====================================");
          // console.log("=====================================");
          // console.log("=====================================");
          // console.log("=====================================");
          // console.log("=====================================", list);
          // console.log("=====================================");
          // console.log("=====================================", res);
          const newArr = res.map((item, idx) => ({
            id: list[idx].id,
            data: item.data,
          }));
          setListItem(newArr);
        })
        .catch((error) =>
          console.error(
            // "Promises all GET -------- numbType = " + numbType,
            error
          )
        )
        .finally(() => {
          setLoading(false);
        });
    }
  }, [list, projectId, sensorId, type]);
  return { data: listItem, loading };
}
