import dynamic from "next/dynamic";

import { useEffect, useMemo, useRef, useState } from "react";
import { getAmount, getDataSeries, optionsDefault } from "./tools";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
function DcarbonChart({ data, durType, time_split_by_durtype, setStrongNumb }) {
  const [width, setWidth] = useState(0);

  const BOXREF = useRef(null);
  const time_and_val = useMemo(() => {
    // console.log("time_split_by_durtype", time_split_by_durtype);
    // console.log("data", data);
    let getS = () =>
      getDataSeries(time_split_by_durtype, data, durType, getAmount);
    return {
      onlyTime: getS().onlyTime,
      onlyVal: getS().onlyVal,
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
            // getStringDay(
            //   durType,
            //   // time_and_val.onlyTime[dataPointIndex]
            // ) +
            "</span>" +
            "</div>"
          );
        },
      },
    };
  }, [time_and_val.onlyTime]);
  // series
  // series
  const series = useMemo(() => {
    if (data?.length > 0) {
      let newSeries = [
        { name: "durType-" + durType, data: time_and_val.onlyVal[durType] },
      ];
      // let newSeries = data?.map((item) => item?.carbon);
      console.log("newSeries", newSeries);
      // return newSeries;
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
  const lastCarbon = useMemo(() => {
    if (data?.length > 0) {
      let last = data[data?.length - 1];
      return last?.carbon;
    }
  }, [data]);
  useEffect(() => {
    // const yearData = time_and_val?.onlyVal[3];
    // const filterTotal = yearData?.find((item) => item > 0);
    setStrongNumb(lastCarbon ?? 0);
  }, [lastCarbon, setStrongNumb]);
  useEffect(() => {
    console.log("data___________________", data);
  }, [data]);

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
