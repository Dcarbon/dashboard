import dynamic from "next/dynamic";
import dateFormat from "dateformat";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  GET_DATA_SERIES,
  GET_STRING_DAY,
} from "src/DashboardComponents/handleConfig";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
function ChartData({ data, durationType, typeSensor, title }) {
  const BOXREF = useRef(null);
  const [dataHandled, setDataHandled] = useState({
    time: [],
    value: [],
  });
  useEffect(() => {
    console.log("data", data);
  }, [data]);
  useEffect(() => {
    if (data) {
      let newData = GET_DATA_SERIES(data, typeSensor, durationType);
      console.log(
        "new dât",
        newData.map((item) => ({
          time: new Date(item?.time),
        }))
      );
      let newTime = [];
      let newValue = [];
      newData?.forEach((item) => {
        newTime.push(item.time);
        newValue.push(item.value);
      });
      setDataHandled({
        time: newTime,
        value: newValue,
      });
    }
  }, [data, durationType, typeSensor]);

  const [width, setWidth] = useState(0);
  const optionsColumn = useMemo(() => {
    let newCategories = dataHandled?.value?.length > 0 ? dataHandled.time : [];

    return {
      title: {
        text: "(" + title + ")",
        align: "left",
        margin: 0,
        offsetX: 0,
        // offsetY: 40,
        style: {
          fontSize: "14px",
          fontWeight: "normal",
          // color: "#ffffff",
          color: "#B3B2B8",
        },
      },
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
        type: typeSensor === 0 ? "bar" : "line",
        id: "myCarbonChart",
        animations: {
          enabled: true,
          easing: typeSensor === 0 ? "easeinout" : "linear",
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
        // type: "categories",
        type: "datetime",
        tickAmount: 3,
        categories: newCategories || [],
        labels: {
          show: true,
          formatter: (val) => {
            console.log("val", val);
            switch (durationType) {
              case 0: //1 tuần
              case 1: //1 tháng
              case 2: //3 tháng
                return dateFormat(new Date(val), "dd/ mmm");
              case 3: // 6 tháng
              case 4: // 1 năm
                return dateFormat(new Date(val), "mmm");

              case 5: // all time
                return dateFormat(new Date(val), "mmm yyyy");

              default:
                return "";
            }
          },
          rotate: 0,
        },

        axisTicks: {
          borderType: "dotted",
        },
      },
      yaxis: {
        show: true,
        floating: false,
        labels: {
          show: true,
          align: "right",
          style: {
            colors: [],
            fontSize: "16px",
            fontWeight: 500,
          },
          offsetX: 3,
          offsetY: -1,
        },
        axisBorder: {
          show: true,
        },

        crosshairs: {
          show: false,
        },
      },
      colors: "#72BF44",
      // colors: "#83A2FF",
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
        area: {
          fillTo: "origin",
        },
      },

      tooltip: {
        custom: function (props) {
          const { series, seriesIndex, dataPointIndex } = props;
          if (series?.length > 0) {
            return (
              '<div class="arrow_box">' +
              '<h4 class="title"><b class="strong">' +
              series?.[seriesIndex]?.[dataPointIndex] +
              "</b> " +
              title +
              "</h4>" +
              "<span>" +
              GET_STRING_DAY(durationType, dataHandled.time[dataPointIndex]) +
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
  }, [
    dataHandled.time,
    dataHandled?.value?.length,
    durationType,
    title,
    typeSensor,
  ]);

  // // series
  // // series
  const series = useMemo(
    () => [{ name: "duration", data: dataHandled?.value ?? [] }],
    [dataHandled.value]
  );
  // // resize
  // // resize
  // // resize
  // // resize
  useEffect(() => {
    const handleResize = () => setWidth(BOXREF?.current?.clientWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={BOXREF} className="myApex -ml-5">
      <ReactApexChart
        type="bar"
        options={optionsColumn}
        series={series}
        width={width || "100%"}
        height={332}
      />
    </div>
  );
}

export default ChartData;
