import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IOTAct } from "src/redux/actions/iotAction";
import stls from "./index.module.scss";
import CollapseTab from "../CollapseTab";
import DcarbonAPI from "src/tools/hook";
import {
  Get_Duration_by_Type,
  getTimeLine,
} from "../ColumnChart/thisColumnTool";
import DcarbonDuration from "../ColumnChart/durationType";
import DcarbonChart from "../ColumnChart/DcarbonChart";
//
//
function CarbonGenerated({ iotSelected }) {
  const [openTab, setOpenTab] = useState(true);
  const [durType, setDurType] = useState(3);

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
  // STEP 1
  // STEP 1 GET Iot minted by iotId and duration time
  // STEP 1
  // STEP 1
  // STEP 1
  useEffect(() => {
    if (iotSelected > 0) {
      // get to and from by durtype
      const newFrom_To = Get_Duration_by_Type(3);
      const newArrTime = [
        getTimeLine(0),
        getTimeLine(1),
        getTimeLine(2),
        getTimeLine(3),
      ];
      setTime_split_by_durtype(newArrTime);
      handleGetIotMinted({ iotId: iotSelected, ...newFrom_To });
      // get new iot minted
      // console.log("iotSelected", iotSelected);
      // console.log("durType", durType);
    }
  }, [durType, handleGetIotMinted, iotSelected]);

  const handleChangeDurType = (newDurType) => {
    setDurType(newDurType);
  };

  return (
    <CollapseTab
      color="green"
      title="Carbon credits earned"
      strongNumb={strongNumb}
      unit="carbon"
      isOpen={openTab}
      handleOpen={() => setOpenTab(!openTab)}
    >
      <div className={stls.carbonMinted}>
        <div className={stls.carbonMinted}>
          <DcarbonChart
            durType={durType}
            data={iot_minted}
            time_split_by_durtype={time_split_by_durtype}
            setStrongNumb={setStrongNumb}
          />

          <DcarbonDuration durType={durType} setDurType={handleChangeDurType} />
        </div>
      </div>
    </CollapseTab>
  );
}
export default CarbonGenerated;
