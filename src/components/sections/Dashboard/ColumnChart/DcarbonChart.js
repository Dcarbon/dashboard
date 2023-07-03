import dynamic from "next/dynamic";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  getAmount,
  getDataSeries,
  getStringDay,
  optionsDefault,
} from "./thisColumnTool";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
function DcarbonChart({ data, time_split_by_durtype, durType, setStrongNumb }) {
  const [width, setWidth] = useState(0);

  const BOXREF = useRef(null);
  const time_and_val = useMemo(() => {
    let getS = (dur) =>
      getDataSeries(time_split_by_durtype[dur], data, getAmount);
    let newS_0 = getS(0);
    let newS_1 = getS(1);
    let newS_2 = getS(2);
    let newS_3 = getS(3);
    return {
      onlyTime: [
        newS_0.onlyTime,
        newS_1.onlyTime,
        newS_2.onlyTime,
        newS_3.onlyTime,
      ],
      onlyVal: [newS_0.onlyVal, newS_1.onlyVal, newS_2.onlyVal, newS_3.onlyVal],
    };
  }, [data, time_split_by_durtype]);

  const options = useMemo(() => {
    let newCategories = time_and_val.onlyTime[durType];
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
            getStringDay(
              durType,
              time_and_val.onlyTime[durType][dataPointIndex]
            ) +
            "</span>" +
            "</div>"
          );
        },
      },
    };
  }, [durType, time_and_val.onlyTime]);
  // series
  // series
  const series = useMemo(() => {
    let newSeries = [
      { name: "durType-" + durType, data: time_and_val.onlyVal[durType] },
    ];
    return newSeries;
  }, [durType, time_and_val.onlyVal]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth(BOXREF?.current?.clientWidth);
    }, 300);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    const yearData = time_and_val?.onlyVal[3];
    const filterTotal = yearData?.find((item) => item > 0);
    setStrongNumb(filterTotal);
  }, [setStrongNumb, time_and_val?.onlyVal]);

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
