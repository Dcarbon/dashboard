import { roundup_second } from "src/DashboardComponents/handleConfig";

export const apiTotalCarbon = (id, from, to, interval) =>
  `iot-op/minted/${id}?from=${
    from ? roundup_second(from) : 1
  }&to=${roundup_second(to)}&interval=${interval ?? 1}`;

export const apiTotalSensor = (id, sensorId, from, to, interval) =>
  `iot-op/avm/${id}?from=${from ? roundup_second(from): 1}&to=${roundup_second(to)}&interval=${interval ?? 1}&limit=99`;
