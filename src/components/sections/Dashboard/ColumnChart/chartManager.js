import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { getDataSeries, getStringDay, optionsDefault } from "./tools";
// import ReactApexChart from "react-apexcharts";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
//
//
//
//
//

export default function DcarbonChart({
  durType,
  unit,
  data,
  loading,
  setLoading,
  time_split_by_durtype,
  arrData,
  setArrData,
  setStrongNumb,
  getAmount,
}) {
  const AOPEx = useRef(null);
  const [options, setOptions] = useState(optionsDefault);
  const [series, setSeries] = useState([]);

  // Step 2 : Filter value adapt with time
  // Step 2 :
  // Step 2 :
  // Step 2 :

  useEffect(() => {
    if (!arrData?.length && time_split_by_durtype?.length > 0 && loading) {
      console.warn("loading chart");
      let newSeriesArr = [];
      if (data?.length > 0) {
        newSeriesArr = getDataSeries(
          time_split_by_durtype,
          data,
          getAmount
        )?.newSeriesArr;
        if (newSeriesArr?.length) {
          setArrData(newSeriesArr);
          const arrY =
            newSeriesArr?.length > 0 ? newSeriesArr.map((item) => item.y) : [];
          // console.log("arrY---------------------------------------------", arrY);
          const filterTotal = arrY.find((item) => item > 0);
          setStrongNumb(filterTotal);
        }
      }

      // console.warn("stucking");
      // console.log("newSeriesArr", newSeriesArr);
      setSeries([
        {
          name: "duration",
          data: newSeriesArr,
        },
      ]);
      setOptions({
        ...optionsDefault,
        tooltip: {
          ...optionsDefault.tooltip,
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
              getStringDay(durType, time_split_by_durtype[dataPointIndex]) +
              "</span>" +
              "</div>"
            );
          },
        },
      });
      setLoading(false);
    }
  }, [
    loading,
    durType,
    arrData,
    time_split_by_durtype,
    data,
    getAmount,
    setArrData,
    setLoading,
    setStrongNumb,
    unit,
  ]);
  return (
    <div className="myApex -ml-6">
      {time_split_by_durtype && (
        <ApexCharts
          ref={AOPEx}
          options={options}
          series={series}
          width={"100%"}
          height={170}
        />
      )}
    </div>
  );
}
