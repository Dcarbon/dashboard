import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IOTAct } from "src/redux/actions/iotAction";
import stls from "./carbon.module.scss";
import CollapseTab from "../CollapseTab";
import CarbonMintedChart from "src/components/layouts/dashboardSideBar/tools/Chart";
import DcarbonAPI from "src/tools/hook";
import Button from "src/components/ui/Button";
import BigNumber from "bignumber.js";
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

// hàm lấy from to theo durtype
const roundup_second = (time) => Math.round(time.getTime() / 1000);
const Get_Duration_by_Type = (durationType) => {
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
    console.log(payload);
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
      isOpen={Boolean(currentTab === 2)}
      handleOpen={() => setCurrentTab(currentTab !== 2 ? 2 : 0)}
    >
      <div className={stls.carbonMinted}>
        <DcarbonChart durType={durType} iot_minted={iotState?.iot_minted} />
        <DcarbonDuration durType={durType} setDurType={handleChangeDurType} />
      </div>
    </CollapseTab>
  );
}

export default CarbonGenerated;
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
  yaxis: { show: false },
  grid: { show: false },
  dataLabels: {
    enabled: true,
    formatter: (val) => parseFloat(val).toFixed(2),
  },
  tooltip: { enabled: false },
  stroke: {
    show: true,
    colors: "#ff0000",
    width: 2,
    dashArray: 2,
  },
  plotOptions: {
    bar: {
      borderRadius: 5,
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "all",
      columnWidth: "32px",
    },
  },
  xaxis: {
    type: "datetime",
    axisTicks: { show: false },
  },
};
const oneDay = 24 * 60 * 60 * 1000;
const CeilDay = (time) => Math.round(time / oneDay);
const createArray = (length) => new Array(length);
function DcarbonChart({ durType, iot_minted }) {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [arrLng, setArrLng] = useState([]);
  var diff = 0;
  useEffect(() => {
    let array = null;
    if (durType === 0) {
      array = createArray(7);
      diff = oneDay;
    } else if (durType === 1) {
      let newDate = new Date();
      let thisMonthTime = newDate.getTime();
      newDate.setUTCMonth(newDate.getUTCMonth() - 1);
      let beforeMonthTime = newDate.getTime();
      array = createArray((thisMonthTime - beforeMonthTime) / oneDay);
      diff = oneDay;
    } else if (durType === 2) {
      array = createArray(6);
      diff = 1;
    } else if (durType === 3) {
      array = createArray(12);
      diff = 1;
    }
    setArrLng(array);
  }, [durType]);

  useEffect(() => {
    var newSeriesArr = [];
    var toDay = new Date();
    var prevDay = 0;
    var prevMonth = 0;
    for (let idx = 0; idx < arrLng.length; idx++) {
      // lọc theo độ dài mảng
      const element = arrLng[idx];
      let getIOTMinted = iot_minted?.filter((item) => {
        let createAt_Date = new Date(item?.createdAt);
        if (durType > 1) {
          // nếu kiểu tgian = nhiều tháng
          // lấy tháng vừa lọc trừ đi 1 đến hết vong lặp
        }

        // item?.createdAt
        // if (durType === 0) {
        //   array = createArray(7);
        // } else if (durType === 1) {
        //   let newDate = new Date();
        //   let thisMonthTime = newDate.getTime();
        //   newDate.setUTCMonth(newDate.getUTCMonth() - 1);
        //   let beforeMonthTime = newDate.getTime();
        //   array = createArray((thisMonthTime - beforeMonthTime) / oneDay);
        // } else if (durType === 2) {
        //   array = createArray(6);
        // } else if (durType === 3) {
        //   array = createArray(12);
        // }
        return 1;
      });
    }
    for (let idx = 0; idx < iot_minted?.length; idx++) {
      const element = iot_minted[idx];
      const hexAmount = new BigNumber(element.amount.toLocaleLowerCase());
      const reduceAmount = hexAmount.div("1e9");
      const created_at = new Date(element?.createdAt).getTime();
      const roundCreate = Math.round(created_at / 1000);

      newSeriesArr[idx] = [roundCreate * 1000, reduceAmount.toFixed(2)];
    }
    console.log("newSeriesArr", newSeriesArr);
    setOptions(optionsDefault);
    setSeries([
      {
        name: "duration",
        data: newSeriesArr,
      },
    ]);
  }, [arrLng, iot_minted]);
  return (
    <ApexCharts
      options={options}
      series={series}
      type="bar"
      height={120}
      width={"100%"}
    />
  );
}
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
