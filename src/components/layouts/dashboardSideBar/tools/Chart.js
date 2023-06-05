import BigNumber from "bignumber.js";
import { filter } from "domutils";
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
const initArrWeek = (now) => {
  const toDay = now?.getUTCDay();
  const arrWeek = [
    {
      name: toDay - 6,
      data: 0,
    },
    {
      name: toDay - 5,
      data: 0,
    },
    {
      name: toDay - 4,
      data: 0,
    },
    {
      name: toDay - 3,
      data: 0,
    },
    {
      name: toDay - 2,
      data: 0,
    },
    {
      name: toDay - 1,
      data: 0,
    },
    {
      name: toDay,
      data: 0,
    },
  ];
  return arrWeek;
};
const initArrMonth = (now) => {
  // const toDay = now?.getUTCMonth();
  const timeToday = now?.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const arrWeek = [
    {
      name: timeToday - 25 * oneDay,
      data: 0,
    },
    {
      name: timeToday - 20 * oneDay,
      data: 0,
    },
    {
      name: timeToday - 15 * oneDay,
      data: 0,
    },
    {
      name: timeToday - 10 * oneDay,
      data: 0,
    },
    {
      name: timeToday - 5 * oneDay,
      data: 0,
    },
    {
      name: timeToday,
      data: 0,
    },
  ];
  return arrWeek;
};
const initArrYear = (now) => {
  // const toDay = now?.getUTCMonth();
  const timeToday = now?.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const arrWeek = [
    {
      name: timeToday - 25 * oneDay,
      data: 0,
    },
    {
      name: timeToday - 20 * oneDay,
      data: 0,
    },
    {
      name: timeToday - 15 * oneDay,
      data: 0,
    },
    {
      name: timeToday - 10 * oneDay,
      data: 0,
    },
    {
      name: timeToday - 5 * oneDay,
      data: 0,
    },
    {
      name: timeToday,
      data: 0,
    },
  ];
  return arrWeek;
};
const configByWeek = (arrWeek, created_at, value) => {
  switch (created_at) {
    case arrWeek[0].name:
      arrWeek[0].data += value;
      break;
    case arrWeek[1].name:
      arrWeek[1].data += value;
      break;
    case arrWeek[2].name:
      arrWeek[2].data += value;
      break;
    case arrWeek[3].name:
      arrWeek[3].data += value;
      break;
    case arrWeek[4].name:
      arrWeek[4].data += value;
      break;
    case arrWeek[5].name:
      arrWeek[5].data += value;
      break;
    case arrWeek[6].name:
      arrWeek[6].data += value;
      break;
    default:
      break;
  }
};

const configByMonth = (arrWeek, created_at, value) => {
  const timeCreateAt = new Date(created_at * 1000);
  console.log("timeCreateAt", timeCreateAt);
  switch (timeCreateAt) {
    case timeCreateAt >= arrWeek[0].name && timeCreateAt < arrWeek[1].name:
      arrWeek[0].data += value;
      break;
    case timeCreateAt >= arrWeek[1].name && timeCreateAt < arrWeek[2].name:
      arrWeek[1].data += value;
      break;
    case timeCreateAt >= arrWeek[2].name && timeCreateAt < arrWeek[3].name:
      arrWeek[2].data += value;
      break;
    case timeCreateAt >= arrWeek[3].name && timeCreateAt < arrWeek[4].name:
      arrWeek[3].data += value;
      break;
    case timeCreateAt >= arrWeek[4].name && timeCreateAt < arrWeek[5].name:
      arrWeek[4].data += value;
      break;
    case timeCreateAt >= arrWeek[5].name:
      arrWeek[5].data += value;
      break;
    default:
      break;
  }
};
export default function CarbonMintedChart({
  durType,
  //  to, from
}) {
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
      // const minteds = iotState.iot_minted;
      // const getAmount = (amount) => {
      //   const hexAmount = new BigNumber(amount.toLocaleLowerCase());
      //   const reduceAmount = hexAmount.div("1e9");
      //   return reduceAmount.toFixed(2);
      // };
      // if (durType == 0) {
      //   console.log("oldest ", minteds[0].createdAt);
      //   console.log("newest ", minteds[minteds?.length - 1].createdAt);
      //   console.log("by week");
      //   const newestDate = new Date(minteds[minteds?.length - 1].createdAt);
      //   const toDay = minteds.filter((item) => item.amount);
      //   const arrWeek = [
      //     {
      //       name: minteds.filter(item => item.createdAt ),
      //     },
      //   ];
      //   // console.log("__::", new Date(roundCreate * 1000).getUTCDay());
      // } else if (durType == 1) {
      //   console.log("oldest ", minteds[0].createdAt);
      //   console.log("newest ", minteds[minteds?.length - 1].createdAt);

      //   console.log("by month");
      //   // console.log("__::", new Date(roundCreate * 1000).getUTCMonth());
      // } else {
      //   console.log("oldest ", minteds[0].createdAt);
      //   console.log("newest ", minteds[minteds?.length - 1].createdAt);

      //   console.log("by year");
      //   // console.log("__::", new Date(roundCreate * 1000).getUTCFullYear());
      // }
      // console.log("iot_minted", iotState?.iot_minted);
      // const now = new Date();
      // let arrWeek = initArrWeek(now);
      // let arrMonth = initArrWeek(now);
      var newSeriesArr = [];
      for (let idx = 0; idx < iotState.iot_minted.length; idx++) {
        const element = iotState.iot_minted[idx];
        const hexAmount = new BigNumber(element.amount.toLocaleLowerCase());
        const reduceAmount = hexAmount.div("1e9");
        const created_at = new Date(element?.createdAt).getTime();
        const roundCreate = Math.round(created_at / 1000);
        // if (durType == 0) {
        //   console.log("by week");
        //   console.log("__::", new Date(roundCreate * 1000).getUTCDay());
        //   configByWeek(arrWeek, created_at, reduceAmount.toFixed(2));
        // } else if (durType == 1) {
        //   console.log("by month");
        //   console.log("__::", new Date(roundCreate * 1000).getUTCMonth());
        //   configByMonth(arrMonth, created_at, reduceAmount.toFixed(2));
        // } else {
        //   console.log("by year");
        //   console.log("__::", new Date(roundCreate * 1000).getUTCFullYear());
        // }
        newSeriesArr[idx] = [roundCreate * 1000, reduceAmount.toFixed(2)];
      }
      console.log("newSeriesArr", newSeriesArr);
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
          type="bar"
          height={120}
          width={"100%"}
        />
      )}
    </Fragment>
  );
}
