import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IOTAct } from "src/redux/actions/iotAction";
import stls from "./index.module.scss";
import CollapseTab from "../CollapseTab";
import BigNumber from "bignumber.js";
import ColumnChart from "../ColumnChart";
import DcarbonAPI from "src/tools/hook";

//
//
//
//
function CarbonGenerated({ iotSelected, currentTab, setCurrentTab }) {
  const [payload, setPayload] = useState({
    iotId: 0,
    from: 0,
    to: 0,
  });
  const [durType, setDurType] = useState(0);
  const [arrData, setArrData] = useState(null);
  const [strongNumb, setStrongNumb] = useState(0);
  const dispatch = useDispatch();
  const iotState = useSelector(new DcarbonAPI().GetIOTState);
  const getAmount = (item) => {
    const hexAmount = new BigNumber(item.amount.toLocaleLowerCase());
    const reduceAmount = hexAmount.div("1e9");
    return reduceAmount.toFixed(2);
  };
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
      setArrData(null);
    }
  }, [handleGetIotMinted, iotSelected, payload]);
  const handleDataChangeDurType = (newDur) => {
    handleGetIotMinted({ ...payload, from: newDur.from, to: newDur.to });
  };

  return (
    <CollapseTab
      color="green"
      title="CARBON minted"
      strongNumb={strongNumb}
      unit="carbon"
      isOpen={Boolean(currentTab === 1)}
      handleOpen={() => setCurrentTab(currentTab !== 1 ? 1 : 0)}
    >
      <div className={stls.carbonMinted}>
        <ColumnChart
          unit="kWh"
          data={iotState?.iot_minted}
          payload={payload}
          setPayload={setPayload}
          durType={durType}
          setDurType={setDurType}
          arrData={arrData}
          setArrData={setArrData}
          handleValue={getAmount}
          setStrongNumb={setStrongNumb}
          handleDataChangeDurType={handleDataChangeDurType}
        />
      </div>
    </CollapseTab>
  );
}
export default CarbonGenerated;
