import { Fragment, useEffect } from "react";
import FlexBetween from "src/components/ui/Stack/flex-between";

function ElectricityGenerated({ iotSelected }) {
  console.log("iotSelected");
  // function getSensorMetrics

  // Step 5 get Metrics
  //   useEffect(() => {
  //     if (payload?.iotId && payload?.from) {
  //       console.log("get Metric step 1 ");
  //       handleGetMetric();
  //     }
  //   }, []);

  //   const metric = useMemo(() => {
  //     const metrics = sensorState?.sensor_metrics;
  //     if (sensorState?.sensor_metrics?.length > 0) {
  //       const metricTemp = metrics[metrics?.length - 1]?.data;
  //       const hexString = JSON.parse(hexToString(metricTemp));
  //       return hexString?.indicator?.value;
  //     }
  //     return null;
  //   }, []);
  useEffect(() => {
    console.log("ElectricityGenerated, ", iotSelected);
  }, [iotSelected]);

  return (
    <Fragment>
      <FlexBetween className={"text-[#919097] font-normal mb-6"}>
        <p>Electricity generated</p>
        <p>
          {/* <span className="text-white">{metric / 1000}</span> (kWh) //{" "} */}
        </p>
      </FlexBetween>
    </Fragment>
  );
}

export default ElectricityGenerated;
