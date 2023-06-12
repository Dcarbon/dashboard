import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import BoxSection from "../tools/BoxSection";
import HeadingSideBar from "../tools/Heading";
import CarbonMintedChart from "../tools/Chart";
import FlexBetween from "src/components/ui/Stack/flex-between";
import DcarbonAPI from "src/tools/hook";
import { useDispatch, useSelector } from "react-redux";
import { IOTAct } from "src/redux/actions/iotAction";
import { hexToString, listTime } from "src/tools/const";
import stls from "./CarbonMinted.module.scss";
import SelectItem from "src/components/ui/Selection/SelectItem";
import Selection from "src/components/ui/Selection/Select";
import { SensorsACT } from "src/redux/actions/sensorsAction";
// hàm lấy from to theo durtype
const configDurType = (durationType) => {
  var thisDate = new Date();
  let to = Math.ceil(thisDate.getTime() / 1000);
  let from;
  switch (durationType) {
    case 0: // 7 ngay
      thisDate?.setUTCDate(thisDate?.getUTCDate() - 6);
      break;
    case 1: // 1 thang
      thisDate?.setUTCMonth(thisDate?.getUTCMonth() - 1);
      thisDate?.setUTCHours(0, 0, 0, 0);
      break;
    case 2: // 1 nam
      thisDate?.setUTCFullYear(thisDate?.getUTCFullYear() - 1);
      thisDate?.setUTCHours(0, 0, 0, 0);
      break;
    default:
      thisDate = new Date(0);
      break;
  }
  from = Math.ceil(thisDate?.getTime() / 1000);
  return { to, from };
};
function CarbonMinted({ iotSelected }) {
  const [payload, setPayload] = useState({
    iotId: 0,
    durationType: 2,
    from: 0,
    to: 0,
    limit: 50,
    skip: 700,
    sensorId: 0,
  });
  const dispatch = useDispatch();
  const newDcarbon = new DcarbonAPI();
  const sensorState = useSelector(newDcarbon.GetSensorsState);
  // function handle Dur
  const handleSelectDur = (evt) => {
    let newFromTo = configDurType(evt.target.value);
    let newPayload = {
      ...payload,
      durationType: evt.target.value,
      to: newFromTo.to,
      from: newFromTo.from,
    };
    handleGetIotMint(newPayload);
  };
  // Step 1 : check time and set
  useEffect(() => {
    if (!payload?.to) {
      const newFromTo = configDurType(payload?.durationType);
      let newPayload = {
        ...payload,
        to: newFromTo?.to,
        from: newFromTo?.from,
      };
      setPayload(newPayload);
    }
  }, [payload, payload.iotId, payload?.to]);
  useEffect(() => {
    if (iotSelected !== payload?.iotId && payload?.to) {
      var newPayload = { ...payload };
      newPayload.iotId = iotSelected;
      // Step 2: add iotId to payload
      setPayload({ ...newPayload });
      // Step 3: get sensors by iotId
      dispatch({
        type: SensorsACT.GET_SENSORS.REQUEST,
        payload: { ...payload, iotId: iotSelected },
      });
    }
  }, [dispatch, iotSelected, payload]);

  // function get IotMinted
  const handleGetIotMint = useCallback(
    (newPayload) => {
      if (newPayload) {
        setPayload(newPayload);
      }
      const payloadSend = newPayload ?? payload;
      dispatch({
        type: IOTAct.GET_IOT_MINTED.REQUEST,
        payload: {
          ...payloadSend,
        },
      });
    },
    [dispatch, payload]
  );
  // Step 4 get IotMinted
  useEffect(() => {
    if (payload?.iotId && payload?.to > 0) {
      handleGetIotMint();
    }
  }, [handleGetIotMint, payload?.iotId, payload?.to]);
  // function getSensorMetrics
  const handleGetMetric = useCallback(() => {
    console.log("get Metric ");
    dispatch({ type: SensorsACT.GET_SENSORS_METRICS.REQUEST, payload });
  }, [dispatch, payload]);
  // Step 5 get Metrics
  useEffect(() => {
    if (payload?.iotId && payload?.from) {
      console.log("get Metric step 1 ");
      handleGetMetric();
    }
  }, [handleGetMetric, payload?.from, payload?.iotId, payload?.sensorId]);

  const metric = useMemo(() => {
    const metrics = sensorState?.sensor_metrics;
    if (sensorState?.sensor_metrics?.length > 0) {
      const metricTemp = metrics[metrics?.length - 1]?.data;
      const hexString = JSON.parse(hexToString(metricTemp));
      return hexString?.indicator?.value;
    }
    return null;
  }, [sensorState?.sensor_metrics]);
  return (
    <BoxSection>
      <FlexBetween className={"items-center"}>
        <HeadingSideBar className={"inline-block"} text={"CARBON minted"} />
        <div className="inline-block w-[132px]">
          <Selection
            size={"sm"}
            id={"time"}
            value={listTime[payload.durationType]}
            onChange={handleSelectDur}
            listClassName={"min-w-[160px]"}
          >
            {listTime?.map((item, key) => (
              <SelectItem
                active={item === listTime[payload.durationType]}
                key={"item-" + item}
                value={key}
              >
                {item}
              </SelectItem>
            ))}
          </Selection>
        </div>
      </FlexBetween>
      {/* Chart */}
      {iotSelected && (
        <div className={stls.carbonMinted}>
          <CarbonMintedChart
            durType={payload.durationType}
            from={payload?.from}
            to={payload?.to}
          />
        </div>
      )}
      {/* info */}
      {metric && (
        <Fragment>
          <FlexBetween className={"text-[#919097] font-normal mb-6"}>
            <p>Electricity generated</p>
            <p>
              <span className="text-white">{metric / 1000}</span> (kWh)
            </p>
          </FlexBetween>
        </Fragment>
      )}
    </BoxSection>
  );
}

export default CarbonMinted;
