import { AxiosGet } from "../sagaUtils";
import { IOTAct } from "../actions/iotAction";
import { handleTakeEvery } from "../handle";
import { roundup_second } from "src/DashboardComponents/handleConfig";
import axios from "axios";
import { Endpoint } from "src/components/router/router";

export const watcherIot = [
  handleTakeEvery(offsetIot, IOTAct.OFFSET_IOT),
  handleTakeEvery(countIot, IOTAct.COUNT_IOT),
  handleTakeEvery(getAllIots, IOTAct.GET_all_IOT),
  handleTakeEvery(getIot, IOTAct.GET_IOT),
  handleTakeEvery(checkisactive, IOTAct.IsActive),
  handleTakeEvery(getIotMinted, IOTAct.GET_IOT_MINTED),
  handleTakeEvery(getIotsMinted, IOTAct.GET_IOTs_MINTED),
  handleTakeEvery(getIOTs_byProject, IOTAct.GET_IOTs_byProject),
];

function countIot() {
  var url = `iots/count?status=10`;
  return AxiosGet(url);
}

function offsetIot() {
  var url = `iot-op/offset`;
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
  var url = Endpoint.GeoJSON;
  return AxiosGet(url);
}
function getIOTs_byProject(action) {
  var url = `iots?projectId=${action.payload}&status=10&type=-1`;
  return AxiosGet(url);
}
function getIotMinted(action) {
  var url = `iot-op/minted/${action.payload.iotId}?from=${action.payload.from}&to=${action.payload.to}&interval=${action.payload.interval}`;
  return AxiosGet(url);
}

async function getIotsMinted({ payload }) {  
  const listIOT = payload.list;
  const newDate = new Date();
  const toDay = roundup_second(newDate);  
  if (listIOT?.data?.length > 0) {
    const listAxiosGet = listIOT?.data?.map((item) => {
      return AxiosGet(`iot-op/mint-sign/${item?.id}?from=1&to=${toDay}&sort=1`);
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
