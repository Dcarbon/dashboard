import dynamic from "next/dynamic";
import dateFormat from "dateformat";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  GET_DATA_SERIES,
  GET_STRING_DAY,
} from "src/DashboardComponents/handleConfig";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const initSeries = [{ name: "iot", data: [] }];
const initOptions = {
  title: {
    text: "",
    align: "left",
    margin: 0,
    offsetX: 0,
    style: {
      fontSize: "14px",
      fontWeight: "normal",
      color: "#B3B2B8",
    },
  },
  chart: {
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
    text: "No Data",
    style: {
      color: "#ffffff",
    },
  },
  xaxis: {
    categories: [],
    labels: {
      show: true,
      rotate: 0,
      style: {
        colors: "#F3F3F5",
        fontSize: "16px",
        fontWeight: 500,
      },
    },
    axisTicks: {
      borderType: "dotted",
    },
  },
  yaxis: {
    show: true,
    labels: {
      show: true,
      style: {
        colors: "#F3F3F5",
        fontSize: "16px",
        fontWeight: 500,
      },
    },
    axisBorder: {
      show: true,
    },

    crosshairs: {
      show: false,
    },
  },
  colors: ["#72BF44"],
  fill: { opacity: 1 },
  grid: { show: false },
  crosshairs: {
    show: false,
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
const initOptionsBar = {
  ...initOptions,
  chart: {
    ...initOptions.chart,
    type: "bar",
    id: "_chartBar",
  },
};
const initOptionsLine = {
  ...initOptions,
  chart: {
    ...initOptions.chart,
    type: "line",
    id: "_chartLine",
  },
};
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
function ChartData({ data, durationType, typeSensor, title, loading }) {
  const BOXREF = useRef(null);
  const [dataHandled, setDataHandled] = useState({
    time: [],
    value: [],
  });
  const [series, setSeries] = useState(initSeries);
  const [titleChart, setTitleChart] = useState("");
  const [newCategories, setNewCategories] = useState([]);
  const [optionsBar, setOptionsBar] = useState({ ...initOptionsBar });
  const [optionsLine, setOptionsLine] = useState({ ...initOptionsLine });
  useEffect(() => {
    if (loading && data?.length >= 0) {
      setSeries(initSeries);
    }
  }, [data?.length, loading]);
  useEffect(() => {
    if (data && !loading) {
      let newData = GET_DATA_SERIES(data, typeSensor, durationType);
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
  }, [data, durationType, loading, typeSensor]);
  const formatter = useCallback(
    (val) => {
      if (typeof val === "object") {
        let newD = val ? new Date(val) : null;
        switch (durationType) {
          case 0: //1 tuần
          case 1: //1 tháng
          case 2: //3 tháng
          case 3: // 6 tháng
          case 4: // 1 năm
            return dateFormat(newD, newD?.getDate() === 1 ? "mmm" : "dd/mmm");

          case 5: // all time
            return dateFormat(newD, "yyyy");

          default:
            return "";
        }
      }

      // return "";
    },
    [durationType]
  );
  const custom = useCallback(
    (series, seriesIndex, dataPointIndex) => {
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
    [dataHandled.time, durationType, title]
  );
  useEffect(() => {
    setTitleChart("(" + title + ")");
  }, [title]);

  useEffect(() => {  
  }, [dataHandled]);

  useEffect(() => {
    let newSeries = initSeries;
    if (dataHandled?.value?.length === 0 || dataHandled?.time?.length === 0) {
      newSeries = [{ name: "iot", data: [] }];
    } else if (
      dataHandled?.value?.length > 0 &&
      dataHandled?.time?.length > 0 &&
      !loading
    ) {
      newSeries[0].data = dataHandled.value;
      setNewCategories(dataHandled.time);
    }    
    setSeries(newSeries);
  }, [
    custom,
    dataHandled,
    durationType,
    formatter,
    loading,
    title,
    typeSensor,
  ]);
  useEffect(() => {
    if (typeSensor === 0) {
      let newOpBar = {
        ...initOptions,
        title: {
          ...initOptions.title,
          text: titleChart,
        },
        xaxis: {
          ...initOptions.xaxis,
          categories: newCategories,
          labels: {
            ...initOptions.xaxis.labels,
            show: true,
            formatter,
          },
        },

        tooltip: {
          ...initOptions.tooltip,
          custom: function (props) {
            const { series, seriesIndex, dataPointIndex } = props;
            return custom(series, seriesIndex, dataPointIndex);
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            borderRadiusApplication: "end",
            borderRadiusWhenStacked: "all",
          },
        },
      };
      setOptionsBar(newOpBar);
    } else {
      let newOpLine = {
        ...initOptions,
        title: {
          ...initOptions.title,
          text: titleChart,
        },
        xaxis: {
          ...initOptions.xaxis,
          categories: newCategories,
          labels: {
            ...initOptions.xaxis.labels,
            show: true,
            formatter,
          },
        },
        stroke: {
          curve: "smooth",
        },
        tooltip: {
          ...initOptions.tooltip,
          custom: function (props) {
            const { series, seriesIndex, dataPointIndex } = props;
            return custom(series, seriesIndex, dataPointIndex);
          },
        },
      };
      setOptionsLine(newOpLine);
    }
  }, [data,custom, formatter, newCategories, titleChart, typeSensor]);

  return (
    data?.data && (
      <div ref={BOXREF} className="myApex -ml-5">     
      <div className={typeSensor === 0 ? "block" : "hidden"}>
       <ReactApexChart
         type={"bar"}
         options={optionsBar}
         series={series}         
         height={332}
       />
     </div>
     <div className={typeSensor === 0 ? "hidden" : "block"}>
       <ReactApexChart
         type={"line"}
         options={optionsLine}
         series={series}        
         height={332}
       />
     </div>
   </div> 
    )
  );
}

export default ChartData;
