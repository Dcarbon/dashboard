import { roundup_second } from "src/DashboardComponents/handleConfig";

export const apiTotalCarbon = (id, from, to) =>
  `iots/${id}/mint-sign?from=${roundup_second(from)}&to=${roundup_second(to)}`;

export const apiTotalSensor = (id, sensorId, from, to, interval) =>
  `sensors/sm/aggregate?from=${roundup_second(from)}&to=${roundup_second(
    to
  )}&iotId=${id}&sensorId=${sensorId}&interval=${interval ?? 1}`;
