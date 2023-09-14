import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { hexToString } from "src/tools/const";
import {
  DURATION__TYPE,
  GET_STRING_DAY_LineChart,
  optionsDefault,
} from "./tools";
import dateFormat from "dateformat";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
function LineChart({
  iotSelected,
  unit,
  title,
  data = [],
  divider,
  isDepended,
  handle_coefficient,
  durationType,
}) {
  const BOXREF = useRef(null);
  const [series, setSeries] = useState([]);
  useEffect(() => {
    if (iotSelected) {
      setSeries([]);
    }
  }, [iotSelected]);

  useEffect(() => {
    if (data?.length > 0) {
      let newData = data.map((item) => {
        let newTime = new Date(item.createdAt);
        let newString = JSON.parse(hexToString(item?.data));
        let newValue = newString.indicator.value;
        let valueConfig = divider ? newValue / divider : newValue / 1000;
        let valueIsDepened = isDepended
          ? handle_coefficient(valueConfig)
          : valueConfig;
        let lastValue = valueIsDepened.toFixed(2);
        return [newTime.getTime(), lastValue];
      });
      setSeries(newData);
    }
  }, [data, divider, handle_coefficient, isDepended]);

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
        height: 230,
        toolbar: { show: false },
        zoom: { enabled: false },
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1500,
          },
        },
      },
      stroke: {
        curve: "smooth",
      },
      noData: {
        text: "No Data",
        style: {
          color: "#ffffff",
        },
      },
      xaxis: {
        type: "datetime",
        tickAmount: 3,
        range: durationType === DURATION__TYPE.day ? 147000 : undefined,
        labels: {
          formatter: function (value, timestamp) {
            if (durationType === DURATION__TYPE.day) {
              return dateFormat(new Date(timestamp), "HH:MM:ss"); // The formatter function overrides format property
            }
            if (durationType === DURATION__TYPE.month) {
              return dateFormat(new Date(timestamp), "mm dd - HH:MM"); // The formatter function overrides format property
            }
          },
        },
      },

      // colors: "#72BF44",
      fill: { opacity: 0.3 },
      grid: { show: false },
      crosshairs: {
        show: false,
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

      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          borderRadiusWhenStacked: "all",
        },
      },

      tooltip: {
        ...optionsDefault.tooltip,
        custom: function (props) {
          const { ctx, series, seriesIndex, dataPointIndex } = props;
          if (series?.length > 0) {
            let time = ctx.data.twoDSeriesX[dataPointIndex];
            return (
              '<div class="arrow_box">' +
              '<h4 class="title"><b class="strong">' +
              series?.[seriesIndex]?.[dataPointIndex] +
              "</b> " +
              unit +
              "</h4>" +
              "<span>" +
              GET_STRING_DAY_LineChart("day", time) +
              "</span>" +
              "</div>"
            );
          }
        },
      },
      responsive: [
        {
          breakpoint: 1023,
          options: {
            xaxis: {
              tickAmount: 8,
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            xaxis: {
              tickAmount: 6,
            },
          },
        },

        {
          breakpoint: 525,
          options: {
            xaxis: {
              tickAmount: 3,
            },
          },
        },
      ],
    };
  }, [durationType, title, unit]);
  // // resize
  // // resize
  // // resize
  // // resize
  useEffect(() => {
    const handleSetWidth = () => {
      setTimeout(() => {
        setWidth(BOXREF?.current?.clientWidth);
      }, 200);
    };
    if (data?.length > 0) {
      handleSetWidth();
    }

    window.addEventListener("resize", handleSetWidth);
    return () => {
      window.removeEventListener("resize", handleSetWidth);
    };
  }, [data?.length]);

  return (
    <div ref={BOXREF} className='myApex -ml-5'>
      <ReactApexChart
        type='line'
        options={options}
        series={[
          {
            data: series.slice(),
          },
        ]}
        width={width || "100%"}
        height={230}
      />
    </div>
  );
}

export default LineChart;
