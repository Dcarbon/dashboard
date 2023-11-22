import dynamic from "next/dynamic";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  DURATION__TYPE,
  GET_DATA_SERIES,
  GET_STRING_DAY,
  getAmount,
  getSum,
  optionsDefault,
} from "./tools";
import dateFormat from "dateformat";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
function ColumnChart({
  title,
  data,
  durType,
  list_time_by_duration,
  setCarbonGenerated,
}) {
  // const newDcarbon = new DcarbonAPI();
  // const iotState = useSelector(newDcarbon.GetIOTState);

  const [width, setWidth] = useState(0);

  const BOXREF = useRef(null);
  const time_and_val = useMemo(() => {
    let getS = GET_DATA_SERIES(list_time_by_duration, data, durType);
    return {
      onlyTime: getS.onlyTime,
      onlyVal: getS.onlyVal.map(getAmount),
    };
  }, [data, durType, list_time_by_duration]);

  const options = useMemo(() => {
    let newCategories = time_and_val.onlyTime;
    return {
      ...optionsDefault,
      title: {
        text: title,
        align: "left",
        offsetX: 10,
        style: {
          fontSize: "14px",
          fontWeight: "normal",
          color: "#B3B2B8",
        },
      },
      chart: {
        id: "myCarbonChart",
        ...optionsDefault.chart,
        width: "100%",
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
        text: "No Data",
        style: {
          color: "#ffffff",
        },
      },
      xaxis: {
        ...optionsDefault.xaxis,
        type: "categories",
        categories: newCategories || [],
        labels: {
          show: true,
          formatter: (val, timestamp, opts) => {
            switch (durType) {
              case DURATION__TYPE.day:
                return dateFormat(new Date(val), "HH:MM");
              case DURATION__TYPE.month:
                return (opts?.i + 2) % 5 === 0
                  ? dateFormat(new Date(val), "dd mmm")
                  : "";
              case DURATION__TYPE.year:
                return (opts?.i + 2) % 3 === 0
                  ? dateFormat(new Date(val), "mmm yyyy")
                  : "";
              default:
                return "";
            }
          },
          rotate: 0,
        },

        axisTicks: {
          ...optionsDefault?.xaxis.axisTicks,
          borderType: "dotted",
        },
      },
      tooltip: {
        ...optionsDefault.tooltip,
        custom: function (props) {
          const { series, seriesIndex, dataPointIndex } = props;
          if (series?.length > 0) {
            return (
              '<div class="arrow_box">' +
              '<h4 class="title"><b class="strong">' +
              series?.[seriesIndex]?.[dataPointIndex] +
              "</b> carbon" +
              "</h4>" +
              "<span>" +
              GET_STRING_DAY(durType, time_and_val.onlyTime[dataPointIndex]) +
              "</span>" +
              "</div>"
            );
          }
        },
      },
    };
  }, [durType, time_and_val.onlyTime, title]);
  // series
  // series
  const series = useMemo(() => {
    if (data?.length > 0) {
      let newSeries = [
        { name: "durType-" + durType, data: time_and_val.onlyVal },
      ];

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
  useEffect(() => {
    if (time_and_val?.onlyVal?.length > 0) {
      let total =
        time_and_val.onlyVal?.length > 0
          ? time_and_val.onlyVal?.reduce(getSum)
          : 0;
      setCarbonGenerated(total.toFixed(2));
    }
  }, [setCarbonGenerated, time_and_val, time_and_val.onlyVal]);
  return (
    <div ref={BOXREF} className="myApex -ml-5">
      <ReactApexChart
        type="bar"
        options={options}
        series={series}
        width={width || "100%"}
        height={230}
      />
    </div>
  );
}

export default ColumnChart;
