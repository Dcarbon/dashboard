import { AxiosGet } from "src/redux/sagaUtils";
import BoxBorder from "../BoxBorder";
import { roundup_second } from "src/components/sections/Dashboard/GeneratedViewBox/tools";

function Yesterday({ type, id }) {
  const getYesterday = async () => {
    let newDate = new Date();
    newDate.setDate(newDate.getDate() - 1);
    newDate.setHours(0, 0, 0, 0);
    let from = newDate.getTime();
    newDate.setHours(23, 59, 59);
    let to = newDate.getTime();

    let url = "";
    if (type === "dcarbon") {
      // https://dev.dcarbon.org/api/v1/iots/1234/minted?from=12341234&to=1234
      url = `iots/${id}/minted?from=${roundup_second(from)}&to=${roundup_second(
        to
      )}`;
    } else {
      // https://dev.dcarbon.org/api/v1/sensors/sm?from=1234&to=1234&iotId=1234&skip=1234&limit=1234&sensorId=23&sort=1
      url = `sensors/sm?from=${roundup_second(from)}&to=${roundup_second(
        to
      )}&iotId=${iotId}&skip=0&limit=1000&sensorId=23&sort=1`;
    }
    AxiosGet(url);
  };
  return <BoxBorder title={"Yesterday"} number={234} />;
}

export default Yesterday;
