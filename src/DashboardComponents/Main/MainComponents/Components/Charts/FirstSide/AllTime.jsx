import { getAmountbyNumber } from "src/DashboardComponents/handleConfig";
import TotalBoxBorder from "../TotalBoxBorder";
import { SENSOR__UNIT } from "src/tools/const";

export function AllTime({ sensorGenerated, loading, typeSensor, iotMinted }) {
  return (
    <TotalBoxBorder
      className={"border-r border-b md:border-b-0"}
      title={"All time"}
      number={
        typeSensor > 0
          ? getAmountbyNumber(sensorGenerated?.total)
          : iotMinted?.total
      }
      loading={loading}
      unit={SENSOR__UNIT[typeSensor]}
    />
  );
}
