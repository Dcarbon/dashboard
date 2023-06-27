import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import dateFormat from "dateformat";
//
//
//
//
//
const getSum = (prev, next) => Number(prev) + Number(next);
const getStringDay = (durType, time) => {
  if (time) {
    const newTime = new Date(time);
    if (durType === "full") {
      return dateFormat(newTime, "d/m/yyyy");
    } else if (durType < 2) {
      return dateFormat("dd/mmm");
    } else {
      return dateFormat(newTime, "mmm yyyy");
    }
  }
};
const getDataSeries = (timeline, iot_minted, handleValue) => {
  let newSeriesArr = [];
  for (let index = 0; index < timeline.length; index++) {
    const elm_1 = timeline[index];
    const elm_2 = timeline[index + 1] ?? 0;
    let collect_by_time = [];

    collect_by_time = iot_minted?.filter((item) => {
      const created_at = new Date(item?.createdAt).getTime();
      return elm_1 > created_at && elm_2 <= created_at;
    });
    const listAmount = collect_by_time?.map(handleValue);
    const amount = listAmount?.length > 0 ? listAmount?.reduce(getSum) : 0;
    newSeriesArr[index] = {
      x: elm_1,
      // y: amount,
      y: parseFloat(amount).toFixed(4),
    };
  }
  return newSeriesArr;
};
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

  grid: { show: false },
  dataLabels: {
    enabled: false,
    // formatter: (val) => parseFloat(val).toFixed(2),
  },
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
  tooltip: { enabled: false },
  stroke: { show: false },
  plotOptions: {
    bar: {
      borderRadius: 4,
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "all",
    },
  },

  yaxis: {
    show: true,
    labels: {
      show: false,
    },
    axisBorder: {
      show: true,
      color: "#504F5A",
      offsetX: 3,
      offsetY: -1,
    },
  },

  xaxis: {
    type: "datetime",
    show: true,
    labels: { show: false },
    axisTicks: { show: false },
    axisBorder: { show: true, color: "#504F5A" },
  },
};
export default function DcarbonChart({
  durType,
  unit,
  data,
  setLoading,
  arrTime,
  arrData,
  setArrData,
  setStrongNumb,
  handleValue,
}) {
  const [options, setOptions] = useState(optionsDefault);
  const [series, setSeries] = useState([]);

  // Step 2 : Filter value adapt with time
  useEffect(() => {
    if (!arrData && arrTime?.length > 0 && data?.length > 0) {
      let newSeriesArr = getDataSeries(arrTime, data, handleValue);
      if (newSeriesArr?.length) {
        setArrData(newSeriesArr);
        const arrY =
          newSeriesArr?.length > 0 ? newSeriesArr.map((item) => item.y) : [];
        // console.log("arrY---------------------------------------------", arrY);
        const filterTotal = arrY.find((item) => item > 0);
        setStrongNumb(filterTotal);
        setLoading(false);

        setSeries([
          {
            name: "duration",
            data: newSeriesArr,
          },
        ]);
        setOptions({
          ...optionsDefault,
          tooltip: {
            enabled: true,
            custom: function (props) {
              const { series, seriesIndex, dataPointIndex } = props;
              return (
                '<div class="arrow_box">' +
                '<h4 class="title"><b class="strong">' +
                series?.[seriesIndex]?.[dataPointIndex] +
                "</b> " +
                unit +
                "</h4>" +
                "<span>" +
                getStringDay(durType, arrTime[dataPointIndex]) +
                "</span>" +
                "</div>"
              );
            },
            marker: { show: true },
          },
        });
      }
    }
  }, [
    durType,
    arrData,
    arrTime,
    data,
    handleValue,
    setArrData,
    setLoading,
    setStrongNumb,
    unit,
  ]);

  return (
    <div className="myApex -ml-6">
      <ApexCharts
        options={options}
        series={series}
        type="bar"
        height={170}
        width={"100%"}
      />
    </div>
  );
}
