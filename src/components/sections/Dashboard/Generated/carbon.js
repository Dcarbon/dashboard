import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IOTAct } from "src/redux/actions/iotAction";
import stls from "./carbon.module.scss";
import CollapseTab from "../CollapseTab";
import DcarbonAPI from "src/tools/hook";
import Button from "src/components/ui/Button";
import BigNumber from "bignumber.js";
import dateFormat from "dateformat";
import dynamic from "next/dynamic";
import Loading from "src/components/ui/Animation/Loading";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

// hàm lấy from to theo durtype
const roundup_second = (time) => Math.round(time.getTime() / 1000);
const Get_Duration_by_Type = (durationType) => {
  console.log("durationType", durationType);
  var thisDate = new Date(); // now
  let to = roundup_second(thisDate);
  let from;
  switch (durationType) {
    case 0: // 7 ngay
      thisDate?.setUTCDate(thisDate?.getUTCDate() - 6);
      break;
    case 1: // 1 thang
      thisDate?.setUTCMonth(thisDate?.getUTCMonth() - 1);
      break;
    case 2: // 6 thang
      thisDate?.setUTCMonth(thisDate?.getUTCMonth() - 6);
      break;
    case 3: // 1 nam
      thisDate?.setUTCFullYear(thisDate?.getUTCFullYear() - 1);
      break;
    default:
      thisDate = new Date(0);
      break;
  }

  thisDate?.setUTCHours(0, 0, 0, 0);
  from = roundup_second(thisDate);

  return { to, from };
};
function CarbonGenerated({ iotSelected, currentTab, setCurrentTab }) {
  const [payload, setPayload] = useState({
    iotId: 0,
    from: 0,
    to: 0,
  });
  const [durType, setDurType] = useState(0);
  const dispatch = useDispatch();
  const iotState = useSelector(new DcarbonAPI().GetIOTState);

  // Step 1 : check time and set up
  useEffect(() => {
    if (!payload?.to) {
      const new_duration = Get_Duration_by_Type(durType);
      let newPayload = {
        ...payload,
        to: new_duration?.to,
        from: new_duration?.from,
      };
      setPayload(newPayload);
    }
  }, [durType, payload]);

  // call back :  Handle get IotMinted
  const handleGetIotMinted = useCallback(
    (newPayload) => {
      setPayload({ ...newPayload });
      dispatch({ type: IOTAct.GET_IOT_MINTED.REQUEST, payload: newPayload });
    },
    [dispatch]
  );
  // Step 2 : Get IotMinted
  useEffect(() => {
    if (iotSelected !== payload?.iotId) {
      handleGetIotMinted({ ...payload, iotId: iotSelected });
    }
  }, [handleGetIotMinted, iotSelected, payload]);
  const handleChangeDurType = (newDurType) => {
    setDurType(newDurType);
    let newDur = Get_Duration_by_Type(newDurType);
    handleGetIotMinted({ ...payload, from: newDur.from, to: newDur.to });
  };
  return (
    <CollapseTab
      color="blue"
      title="CARBON minted"
      strongNumb={120}
      unit="kWh"
      isOpen={Boolean(currentTab === 1)}
      handleOpen={() => setCurrentTab(currentTab !== 1 ? 1 : 0)}
    >
      <div className={stls.carbonMinted}>
        <DcarbonChart durType={durType} iot_minted={iotState?.iot_minted} />
        <DcarbonDuration durType={durType} setDurType={handleChangeDurType} />
      </div>
    </CollapseTab>
  );
}
export default CarbonGenerated;

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
const oneDay = 24 * 60 * 60 * 1000;
const createArray = (length) => new Array(length);
const getAmount = (item) => {
  const hexAmount = new BigNumber(item.amount.toLocaleLowerCase());
  const reduceAmount = hexAmount.div("1e9");
  return reduceAmount.toFixed(2);
};
const getSum = (prev, next) => {
  return Number(prev) + Number(next);
};
const getStringDay = (durType, time) => {
  if (time) {
    const newTime = new Date(time);
    if (durType === "full") {
      return dateFormat(newTime, "d/m/yyyy");
    } else if (durType < 2) {
      return dateFormat(newTime, "dd mmm");
    } else {
      return dateFormat(newTime, "mmm yyyy");
    }
  }
};
function DcarbonChart({ durType, iot_minted }) {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [arrLng, setArrLng] = useState([]);
  const [loading, setLoading] = useState([]);
  const optionsDefault = useMemo(
    () => ({
      chart: {
        toolbar: { show: false },
        width: "100%",
        zoom: {
          enabled: false,
        },
      },
      colors: "#72BF44",
      fill: { opacity: 0.3 },
      yaxis: { show: false },
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
      tooltip: {
        enabled: true,
        custom: function (props) {
          const { series, seriesIndex, dataPointIndex } = props;
          return (
            '<div class="arrow_box">' +
            '<h4 class="title"><b class="strong">' +
            series[seriesIndex][dataPointIndex] +
            "</b> Dcarbon </h4>" +
            "<span>" +
            getStringDay("full", arrLng[dataPointIndex]) +
            "</span>" +
            "</div>"
          );
        },
        marker: { show: true },
      },
      stroke: { show: false },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          borderRadiusWhenStacked: "all",
        },
      },
    }),
    [arrLng]
  );
  // Step 1 : Get array length by durtype
  useEffect(() => {
    let array = null;
    if (durType === 0) {
      array = createArray(7);
    } else if (durType === 1) {
      let newDate = new Date();
      let thisMonthTime = newDate.getTime();
      newDate.setUTCMonth(newDate.getUTCMonth() - 1);
      let beforeMonthTime = newDate.getTime();
      array = createArray((thisMonthTime - beforeMonthTime) / oneDay);
    } else if (durType === 2) {
      array = createArray(6);
    } else if (durType === 3) {
      array = createArray(12);
    }
    setArrLng(array);
  }, [durType]);
  // Step 2 : Set time by array length
  useEffect(() => {
    var prevDay = 0;
    var prevMonth = 0;
    var currentTime = 0;
    for (let idx = 0; idx < arrLng.length; idx++) {
      var toDay = new Date();
      toDay.setHours(0, 0, 0, 0);
      if (durType < 2) {
        currentTime = toDay.getTime() - prevDay;
        prevDay += oneDay;
      } else {
        currentTime = toDay.getUTCMonth() - prevMonth;
        prevMonth++;
      }
      arrLng[idx] = durType < 2 ? currentTime : toDay.setUTCMonth(currentTime);
    }
  }, [arrLng, durType]);
  // Step 3 : Filter value adapt with time
  useEffect(() => {
    if (arrLng?.length) {
      let newSeriesArr = [];
      for (let index = 0; index < arrLng.length; index++) {
        const elm_1 = arrLng[index];
        const elm_2 = arrLng[index + 1] ?? 0;
        let collect_by_time = [];

        collect_by_time = iot_minted?.filter((item) => {
          const created_at = new Date(item?.createdAt).getTime();
          return elm_1 > created_at && elm_2 <= created_at;
        });
        const listAmount = collect_by_time?.map(getAmount);
        const amount = listAmount?.length > 0 ? listAmount?.reduce(getSum) : 0;

        newSeriesArr[index] = {
          x: elm_1,
          y: amount,
        };
      }
      if (newSeriesArr?.length > 0) {
        setLoading(false);
        setOptions({
          ...optionsDefault,
          xaxis: {
            type: "datetime",
            axisTicks: { show: false },
          },
        });
        setSeries([
          {
            name: "duration",
            data: newSeriesArr,
          },
        ]);
      }
    }
  }, [arrLng, durType, iot_minted, optionsDefault]);

  return (
    <div className="myApex">
      {loading ? (
        <Loading />
      ) : (
        <ApexCharts
          options={options}
          series={series}
          type="bar"
          height={170}
          width={"100%"}
        />
      )}
    </div>
  );
}
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
function DcarbonDuration({ durType, setDurType }) {
  var listDur = ["7 days", "1 month", "6 months", "1 year"];
  return (
    <div className={`grid grid-cols-4 ${stls.selectDuration}`}>
      {listDur.map((item, idx) => (
        <div
          key={"dur-" + idx}
          className={`${durType === idx ? stls.active : ""}`}
        >
          <Button onClick={() => setDurType(idx)} className={stls.btn}>
            {item}
          </Button>
        </div>
      ))}
    </div>
  );
}
