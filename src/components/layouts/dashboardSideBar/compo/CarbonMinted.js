import { useCallback, useEffect, useState } from "react";
import BoxSection from "../tools/BoxSection";
import HeadingSideBar from "../tools/Heading";
import Selection from "src/components/ui/Selection";
import CarbonMintedChart from "../tools/Chart";
import FlexBetween from "src/components/ui/Stack/flex-between";
import HookAPI from "src/tools/hook";
import { useDispatch, useSelector } from "react-redux";
import { IOTAct } from "src/redux/actions/iotAction";
import { listTime } from "src/tools/const";
function CarbonMinted() {
  const [payload, setPayload] = useState({
    iotId: 0,
    durationType: 3,
    from: 0,
    to: 0,
  });
  const dispatch = useDispatch();
  const newHook = new HookAPI();
  const customState = useSelector(newHook.GetCustomState);
  useEffect(() => {
    if (payload?.iotId !== customState.idFeature) {
      var newPayload = { ...payload };
      newPayload.iotId = customState.idFeature;
      setPayload({ ...newPayload });
    }
  }, [customState.idFeature, payload]);
  // hàm lấy from to theo durtype
  const configDurType = (durationType) => {
    var thisDate = new Date();
    let to = Math.ceil(thisDate.getTime() / 1000);
    let from;
    switch (durationType) {
      case 0: // 7 ngay
        thisDate?.setUTCDate(thisDate?.getUTCDate() - 7);
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
  // hàm lấy thông tin IOT minted
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
  // Khi chưa có thời gian
  useEffect(() => {
    if (!payload?.to) {
      // console.log("Chưa có {To} => SET to from");
      const newFromTo = configDurType(payload?.durationType);
      let newPayload = {
        ...payload,
        to: newFromTo?.to,
        from: newFromTo?.from,
      };
      setPayload(newPayload);
    }
  }, [payload, payload.iotId, payload?.to]);

  // Lấy dữ liệu iot nếu đã có thời gian
  useEffect(() => {
    if (payload?.iotId && payload?.to > 0) {
      // console.log("carbon minted load iot by", payload?.iotId);
      handleGetIotMint();
    }
  }, [handleGetIotMint, payload?.iotId, payload?.to]);

  return (
    <BoxSection>
      <div className='flex justify-between items-center'>
        <HeadingSideBar className={"inline-block"} text={"CARBON minted"} />
        <div className='inline-block w-[132px]'>
          <Selection
            size={"sm"}
            id={"time"}
            value={listTime[payload.durationType]}
            onChange={(evt) => {
              let newFromTo = configDurType(evt.target.value);
              let newPayload = {
                ...payload,
                durationType: evt.target.value,
                to: newFromTo.to,
                from: newFromTo.from,
              };
              handleGetIotMint(newPayload);
            }}
            className={{
              list: "mt-1 min-w-[160px] overflow-hidden rounded-3 border border-[#504F5A]",
            }}>
            {listTime.map((item, key) => (
              <li
                className={`text-sm text-[#B3B2B8] p-2 ${
                  key < listTime?.length - 1
                    ? "border-b border-b-[#504F5A]"
                    : ""
                } ${
                  payload.durationType === key
                    ? "text-[#504F5A]"
                    : "hover:bg-[#272541] rounded-sm cursor-pointer"
                }`}
                key={"item-" + item}
                value={key}>
                {item}
              </li>
            ))}
          </Selection>
        </div>
      </div>
      <div className='-mx-8'>
        <CarbonMintedChart
          durType={payload.durationType}
          from={payload?.from}
          to={payload?.to}
        />
      </div>
      <FlexBetween className={"text-[#919097] font-normal mb-6"}>
        <p>Electricity generated</p>
        <p>
          <span className='text-white'>152</span> (kWh)
        </p>
      </FlexBetween>
      <FlexBetween className={"text-[#919097] font-normal"}>
        <p>Biogas treated</p>
        <p>
          <span className='text-white'>102</span> (m
          <sup>
            <smal>3</smal>
          </sup>
          )
        </p>
      </FlexBetween>
    </BoxSection>
  );
}

export default CarbonMinted;
