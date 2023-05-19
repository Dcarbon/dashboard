import BigNumber from "bignumber.js";
import dynamic from "next/dynamic";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "src/components/ui/Animation/Loading";
import { IOTAct } from "src/redux/actions/iotAction";
import { listTime } from "src/tools/const";
import HookAPI from "src/tools/hook";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
const optionsDefault = {
  chart: {
    toolbar: { show: false },
    width: "100%",
  },
  // colors: "#72BF44",
  fill: { opacity: 0.3 },
  yaxis: { show: false },
  grid: { show: false },
  // dataLabels: { enabled: false },
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
export default function CarbonMintedChart({ durType }) {
  const newHook = new HookAPI();
  const iotState = useSelector(newHook.GetIOTState);
  const [options, setOptions] = useState(null);
  const [series, setSeries] = useState(null);
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
  useEffect(() => {
    if (iotState.iot_minted?.length > 0) {
      var newSeriesArr = [];
      for (let idx = 0; idx < iotState.iot_minted.length; idx++) {
        const element = iotState.iot_minted[idx];
        const hexAmount = new BigNumber(element.amount);
        const reduceAmount = hexAmount.div("1e6");
        const created_at = new Date(element?.createdAt).getTime();
        newSeriesArr[idx] = [created_at, reduceAmount.toNumber(10)];
      }
      setOptions(optionsDefault);
      setSeries([
        {
          name: listTime[durType],
          data: newSeriesArr,
        },
      ]);
    }
  }, [durType, iotState.iot_minted]);

  return (
    <Fragment>
      {loadingIotMined && <Loading />}
      {iotState?.iot_minted?.length > 0 && (
        <ApexCharts
          options={options}
          series={series}
          type='bar'
          height={120}
          width={"100%"}
        />
      )}
    </Fragment>
  );
}
