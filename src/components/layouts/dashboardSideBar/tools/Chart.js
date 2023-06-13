import BigNumber from "bignumber.js";
import dynamic from "next/dynamic";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "src/components/ui/Animation/Loading";
import { IOTAct } from "src/redux/actions/iotAction";
import { listTime } from "src/tools/const";
import DcarbonAPI from "src/tools/hook";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
const optionsDefault = {
  chart: {
    toolbar: { show: false },
    width: "100%",
    zoom: {
      enabled: false,
    },
  },
  colors: "#72BF44",
  fill: { opacity: 0.3 },
  yaxis: { show: false },
  grid: { show: false },
  dataLabels: {
    enabled: true,
    formatter: (val) => parseFloat(val).toFixed(2),
  },
  tooltip: { enabled: false },
  stroke: {
    show: true,
    colors: "#ff0000",
    width: 2,
    dashArray: 2,
  },
  plotOptions: {
    bar: {
      borderRadius: 5,
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "all",
      columnWidth: "32px",
    },
  },
  xaxis: {
    type: "datetime",
    axisTicks: { show: false },
  },
};

export default function CarbonMintedChart({
  durType,
  //  to, from
}) {
  const newDcarbon = new DcarbonAPI();
  const iotState = useSelector(newDcarbon.GetIOTState);
  const [loadingIotMined, setloadingIotMined] = useState(false);
  useEffect(() => {
    if (iotState?.latest === IOTAct.GET_IOT_MINTED.REQUEST) {
      setloadingIotMined(true);
    } else if (
      iotState.latest === IOTAct.GET_IOT_MINTED.SUCCESS ||
      IOTAct.GET_IOT_MINTED.FAILURE
    ) {
      setloadingIotMined(false);
    }
  }, [iotState.latest]);
  // Nếu đã load xong iot minted thì sẽ set option và series theo dữ liệu nhận đc

  return (
    <Fragment>
      {loadingIotMined && <Loading />}
      {iotState?.iot_minted?.length > 0 && (
        <ApexCharts
          options={options}
          series={series}
          type="bar"
          height={120}
          width={"100%"}
        />
      )}
    </Fragment>
  );
}
