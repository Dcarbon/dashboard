import { AxiosGet } from "../sagaUtils";
import { handleTakeEvery } from "../handle";
import { DashboardAct } from "../actions/dashboardAction";
import axios from "axios";
export const roundup_second = (time) => Math.round(time?.getTime() / 1000);

export const watcherDashboard = [
  handleTakeEvery(GET_ALL_FEATURES, DashboardAct.GET_ALL_FEATURES),
  handleTakeEvery(TOTAL_PROJECT_MINTED, DashboardAct.TOTAL_PROJECT_MINTED),
];

function GET_ALL_FEATURES() {
  var url = `iots/geojson`;
  return AxiosGet(url);
}

async function TOTAL_PROJECT_MINTED(action) {
  const listIOT = action.payload.listIOT;
  const newDate = new Date();
  const toDay = roundup_second(newDate);
  newDate.setDate(newDate.getDate() - 5);
  const beforeDay = roundup_second(newDate);
  if (listIOT?.length > 0) {
    console.log("listIOT", listIOT);
    const listAxiosGet = listIOT?.map((item) => {
      console.log(
        " ______________url",
        `iots/${item}/mint-sign?from=${beforeDay}&to=${toDay}`
      );
      return AxiosGet(`iots/${item}/mint-sign?from=${beforeDay}&to=${toDay}`);
    });
    try {
      const res = await axios.all(listAxiosGet);

      console.log("listAxiosGet", res);
      return {
        data: res.map((item_1) => item_1.data),
      };
    } catch (error) {
      console.log("AxiosGet TOTAL_PROJECT_MINTED", error);
      alert("AxiosGet TOTAL_PROJECT_MINTED");
      return null;
    }
  }
  return;
}
