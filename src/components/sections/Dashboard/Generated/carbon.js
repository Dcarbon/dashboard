import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IOTAct } from "src/redux/actions/iotAction";
import stls from "./index.module.scss";
import CollapseTab from "../CollapseTab";
import DcarbonAPI from "src/tools/hook";
import {
  DURATION_TYPE_modal,
  Get_Duration_by_Type,
  getAmount,
  getTimeLine,
} from "../ColumnChart/tools";
import DcarbonDuration from "../ColumnChart/durationType";
import DcarbonChart from "../ColumnChart/DcarbonChart";
//
//
function CarbonGenerated({ iotSelected }) {
  const [openTab, setOpenTab] = useState(true);
  const [durType, setDurType] = useState(DURATION_TYPE_modal.WEEK);

  const [time_split_by_durtype, setTime_split_by_durtype] = useState([]);

  const [strongNumb, setStrongNumb] = useState(0);
  const dispatch = useDispatch();
  const iotState = useSelector(new DcarbonAPI().GetIOTState);
  const iot_minted = useMemo(
    () => iotState?.iot_minted,
    [iotState?.iot_minted]
  );

  // call back :  Handle get IotMinted
  const handleGetIotMinted = useCallback(
    (newPayload) => {
      dispatch({ type: IOTAct.GET_IOT_MINTED.REQUEST, payload: newPayload });
    },
    [dispatch]
  );
  const handleGetIotTotalMinted = useCallback(
    (newPayload) => {
      dispatch({
        type: IOTAct.GET_IOT_TOTAL_MINTED.REQUEST,
        payload: newPayload,
      });
    },
    [dispatch]
  );
  // STEP 1
  // STEP 1 GET Iot minted by iotId and duration time
  // STEP 1
  // STEP 1
  // STEP 1
  useEffect(() => {
    if (iotSelected && durType) {
      // get to and from by durtype
      const newFrom_To = Get_Duration_by_Type(durType);
      const newArrTime = getTimeLine(durType);
      setTime_split_by_durtype(newArrTime);
      handleGetIotMinted({
        iotId: iotSelected,
        ...newFrom_To,
        interval: durType > 2 ? 2 : 1, // interval : by day (1) || by month : (2)
      });
      let payloadGetTotal = {
        iotId: iotSelected,
        ...newFrom_To,
        from: 1,
      };
      handleGetIotTotalMinted(payloadGetTotal);
    }
  }, [durType, handleGetIotMinted, handleGetIotTotalMinted, iotSelected]);

  const handleChangeDurType = (newDurType) => setDurType(newDurType);
  useEffect(() => {
    if (iotState.total_minted) {
      let ar = iotState.total_minted;
      let newArr = ar.reverse();
      let amountArr = newArr.filter((item) => item?.amount > 0);
      let newestAmount = amountArr[0];
      setStrongNumb(getAmount(newestAmount?.amount));
      // return 0;
    }
  }, [iotState.total_minted]);
  useEffect(() => {
    if (iotSelected) {
      // let newDate = new Date();
      let payloadGetTotal = {
        iotId: iotSelected,
        // to: roundup_second(newDate),
        to: 0,
        from: 1,
      };
      let myInter = setInterval(
        () => handleGetIotTotalMinted(payloadGetTotal),
        15000
      );
      return () => {
        clearInterval(myInter);
      };
    }
  }, [handleGetIotTotalMinted, iotSelected]);

  return (
    <CollapseTab
      color='green'
      title='Carbon credit earned'
      strongNumb={strongNumb || "---"}
      unit='carbon'
      isOpen={openTab}
      handleOpen={() => setOpenTab(!openTab)}
    >
      <div className={stls.carbonMinted}>
        <div className={stls.carbonMinted}>
          <DcarbonChart
            durType={durType}
            data={iot_minted}
            time_split_by_durtype={time_split_by_durtype}
          />

          <DcarbonDuration durType={durType} setDurType={handleChangeDurType} />
        </div>
      </div>
    </CollapseTab>
  );
}
export default CarbonGenerated;
