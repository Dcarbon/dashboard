import dynamic from "next/dynamic";

import { useEffect, useMemo, useRef, useState } from "react";

import { hexToString } from "src/tools/const";
import { GET_STRING_DAY_LineChart, optionsDefault } from "./tools";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
function LineChart({
  checksensorId,
  unit,
  title,
  isLoading,
  data = [],
  setGenerated,
}) {
  const BOXREF = useRef(null);
  // console.log("configSeries data", data);
  // const newDcarbon = new DcarbonAPI();
  const configSeries = useMemo(() => {
    if (data?.length > 0) {
      let newData = data.map((item) => {
        let newTime = new Date(item.createdAt);
        let newString = JSON.parse(hexToString(item?.data));
        let newValue = newString.indicator.value;
        return [newTime.getTime(), (newValue / 1000).toFixed(2)];
      });
      return newData.reverse();
    }
    return [];
  }, [data]);
  const [width, setWidth] = useState("100%");
  const options = useMemo(() => {
    return {
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
        type: "line",
        id: "myCarbonChart_" + unit,
        width: "100%",
        height: 170,
        toolbar: { show: false },
        zoom: { enabled: false },
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
        text: !checksensorId
          ? "Have no sensor"
          : isLoading
          ? "Loading..."
          : "No Data",
        style: {
          color: "#ffffff",
        },
      },
      xaxis: {
        type: "datetime",
        tickAmount: 1,
      },

      // colors: "#72BF44",
      fill: { opacity: 0.3 },
      grid: { show: false },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
        marker: { show: true },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          borderRadiusWhenStacked: "all",
        },
      },
      yaxis: {
        show: true,
        axisBorder: {
          show: true,
          color: "#504F5A",
          offsetX: 0,
          offsetY: 0,
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
              "</b> " +
              unit +
              "</h4>" +
              "<span>" +
              GET_STRING_DAY_LineChart("day", configSeries[dataPointIndex][0]) +
              "</span>" +
              "</div>"
            );
          }
        },
      },
    };
  }, [configSeries, isLoading, checksensorId, title, unit]);
  // // resize
  // // resize
  // // resize
  // // resize
  useEffect(() => {
    const interval = setInterval(() => {
      setWidth(BOXREF?.current?.clientWidth);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    if (configSeries.length > 0 && checksensorId) {
      let value_last = configSeries[configSeries?.length - 1][1];

      setGenerated(value_last);
    } else {
      setGenerated(0);
    }
  }, [checksensorId, configSeries, setGenerated]);
  return (
    <div ref={BOXREF} className='myApex -ml-5'>
      <ReactApexChart
        type='line'
        options={options}
        series={[
          {
            data: configSeries,
          },
        ]}
        width={width || "100%"}
        height={230}
      />
    </div>
  );
}

export default LineChart;
