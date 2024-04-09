import { AxiosGet } from "../sagaUtils";
import { SensorsACT } from "../actions/sensorsAction";
import { handleTakeEvery } from "../handle";
import { apiTotalSensor } from "src/DashboardComponents/Main/MainComponents/Components/Charts/TotalNumber/handle";
import axios from "axios";

export const watcherSensors = [
  handleTakeEvery(getSensors, SensorsACT.GET_SENSORS),
  handleTakeEvery(getSensorMetrics, SensorsACT.GET_SENSORS_METRICS),
  handleTakeEvery(getSensorsGenerated, SensorsACT.getSensorsGenerated),
];
function getSensors(action) {
  var url = `sensors?skip=${action.payload.skip}&limit=${action.payload.limit}&iotId=${action.payload.iotId}`;
  return AxiosGet(url);
}
function getSensorMetrics(action) {
  var url = `sensors/sm?from=${action.payload.from}&to=${
    action?.payload.to
  }&iotId=${action.payload.iotId}&limit=${action.payload.limit}&skip=${
    action.payload.skip
  }&sensorId=${action.payload.sensorId}&sort=${action.payload.sort || 1}`;

  return AxiosGet(url);
}

async function getSensorsGenerated({ payload }) {
  const listIOT = payload.list;
  const sensorId = payload.sensorId;
  const to = new Date();
  if (listIOT?.length > 0) {
    const listAxiosGet = listIOT?.map((item) => {
      let url = apiTotalSensor(item, sensorId, 0, to, 2);
      return AxiosGet(url);
    });
    try {
      const res = await axios.all(listAxiosGet);
      console.log("getSensorGenerated----------", res);
      return {
        data: res.map((item_1) => item_1.data),
      };
    } catch (error) {
      console.log("AxiosGet getSensorGenerated", error);
      return null;
    }
  }
  return { data: [] };
}
