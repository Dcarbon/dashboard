import { AxiosGet } from "../sagaUtils";
import { IOTAct } from "../actions/iotAction";
import { handleTakeEvery } from "../handle";
import { roundup_second } from "src/DashboardComponents/handleConfig";
import axios from "axios";

export const watcherIot = [
  handleTakeEvery(countIot, IOTAct.COUNT_IOT),
  handleTakeEvery(getAllIots, IOTAct.GET_all_IOT),
  handleTakeEvery(getIot, IOTAct.GET_IOT),
  handleTakeEvery(checkisactive, IOTAct.IsActive),
  handleTakeEvery(getIotMinted, IOTAct.GET_IOT_MINTED),
  handleTakeEvery(getIotsMinted, IOTAct.GET_IOTs_MINTED),
  handleTakeEvery(getIOTs_byProject, IOTAct.GET_IOTs_byProject),
];

function countIot() {
  var url = `iots/count`;
  return AxiosGet(url);
}

function checkisactive(action) {
  // console.log("checkisactive-------------", action);
  var url = `sensors/sm?from=${action.payload.from}&to=${action.payload.to}&iotId=${action.payload.iotId}&limit=1`;
  return AxiosGet(url);
}
function getIot({ payload }) {
  var url = `iots/${payload}`;
  return AxiosGet(url);
}
function getAllIots() {
  var url = `iots/geojson`;
  return AxiosGet(url);
}
function getIOTs_byProject(action) {
  var url = `iots/list?projectId=${action.payload}&status=0`;
  return AxiosGet(url);
}
function getIotMinted(action) {
  var url = `iots/${action.payload.iotId}/minted?from=${action.payload.from}&to=${action.payload.to}&interval=${action.payload.interval}`;
  return AxiosGet(url);
}

async function getIotsMinted({ payload }) {
  const listIOT = payload.list;
  const newDate = new Date();
  const toDay = roundup_second(newDate);
  if (listIOT?.length > 0) {
    const listAxiosGet = listIOT?.map((item) => {
      return AxiosGet(`iots/${item?.id}/mint-sign?from=1&to=${toDay}&sort=1`);
    });
    try {
      const res = await axios.all(listAxiosGet);
      return {
        data: res.map((item_1) => item_1.data),
      };
    } catch (error) {
      console.log("AxiosGet getIotsMinted", error);
      return null;
    }
  }
  return { data: [] };
}
