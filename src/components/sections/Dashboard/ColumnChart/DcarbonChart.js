import dynamic from "next/dynamic";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  getAmount,
  getDataSeries,
  getStringDay,
  optionsDefault,
} from "./tools";
import DcarbonAPI from "src/tools/hook";
import { useSelector } from "react-redux";
import Loading from "src/components/ui/Animation/Loading";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
function DcarbonChart({
  data,
  durType,
  time_split_by_durtype,
  // strongNumb,
  // setStrongNumb,
}) {
  const newDcarbon = new DcarbonAPI();
  const iotState = useSelector(newDcarbon.GetIOTState);

  const [width, setWidth] = useState(0);

  const BOXREF = useRef(null);
  const time_and_val = useMemo(() => {
    let getS = getDataSeries(time_split_by_durtype, data, durType);

    return {
      onlyTime: getS.onlyTime,
      onlyVal: getS.onlyVal.map((item) => getAmount(item)),
    };
  }, [data, durType, time_split_by_durtype]);

  const options = useMemo(() => {
    let newCategories = time_and_val.onlyTime;
    return {
      ...optionsDefault,
      chart: {
        ...optionsDefault.chart,
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      noData: {
        text: iotState?.loading ? "Loading..." : "No Data",
        style: {
          color: "#ffffff",
        },
      },
      xaxis: {
        ...optionsDefault.xaxis,
        type: "category",
        categories: newCategories,
      },
      tooltip: {
        ...optionsDefault.tooltip,
        custom: function (props) {
          const { series, seriesIndex, dataPointIndex } = props;
          return (
            '<div class="arrow_box">' +
            '<h4 class="title"><b class="strong">' +
            series?.[seriesIndex]?.[dataPointIndex] +
            "</b> carbon" +
            "</h4>" +
            "<span>" +
            getStringDay(durType, time_and_val.onlyTime[dataPointIndex]) +
            "</span>" +
            "</div>"
          );
        },
      },
    };
  }, [durType, iotState?.loading, time_and_val.onlyTime]);
  // series
  // series
  const series = useMemo(() => {
    if (data?.length > 0) {
      let newSeries = [
        { name: "durType-" + durType, data: time_and_val.onlyVal },
      ];
      // let newSeries = data?.map((item) => item?.carbon);

      return newSeries;
    }
    return [{ name: "duration", data: [] }];
  }, [data?.length, durType, time_and_val.onlyVal]);
  // resize
  // resize
  // resize
  // resize

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth(BOXREF?.current?.clientWidth);
    }, 300);
    return () => {
      clearInterval(interval);
    };
  }, []);
  // const lastCarbon = useMemo(() => {
  //   if (time_and_val?.onlyVal?.length > 0) {
  //     let last = time_and_val?.onlyVal?.reduce(
  //       (total, next) => Number(total) + Number(next)
  //     );
  //     return last;
  //   }
  // }, [time_and_val?.onlyVal]);
  // useEffect(() => {
  //   if (lastCarbon !== strongNumb) {
  //     let newNumber = Math.round(lastCarbon?.toFixed(4) * 1000) / 1000;
  //     setStrongNumb(newNumber ?? 0);
  //   }
  // }, [strongNumb, lastCarbon, setStrongNumb]);

  return (
    <div ref={BOXREF} className="myApex -ml-5">
      <ReactApexChart
        type="bar"
        options={options}
        series={series}
        width={width}
        height={170}
      />
    </div>
  );
}

export default DcarbonChart;
