import { roundup_second } from "src/DashboardComponents/handleConfig";

export const apiTotalCarbon = (id, from, to, interval) =>
  `iots/${id}/minted?from=${
    from ? roundup_second(from) : 1
  }&to=${roundup_second(to)}&interval=${interval ?? 1}`;

export const apiTotalSensor = (id, sensorId, from, to, interval) =>
  `sensors/sm/aggregate?from=${
    from ? roundup_second(from) : 1
  }&to=${roundup_second(to)}&iotId=${id}&sensorId=${sensorId}&interval=${
    interval ?? 1
  }`;
