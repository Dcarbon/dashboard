import { useEffect, useMemo } from "react";
import BoxSection from "../tools/BoxSection";
import HeadingSideBar from "../tools/Heading";
import stls from "./InfoProject.module.scss";
import CopyButton from "../tools/CopyButton";
import HookAPI from "src/tools/hook";
import { useDispatch, useSelector } from "react-redux";
import { IOTAct } from "src/redux/actions/iotAction";
import Error from "src/components/ui/Error";
function InfoProject() {
  const newHook = new HookAPI();
  const dispatch = useDispatch();
  const iotState = useSelector(newHook.GetIOTState);
  const customState = useSelector(newHook.GetCustomState);

  useEffect(() => {
    let loaded = false;
    if (customState.idFeature && !loaded) {
      // console.log("get iot");
      dispatch({
        type: IOTAct.GET_IOT.REQUEST,
        payload: customState.idFeature,
      });
    }
    return () => {
      loaded = true;
    };
  }, [customState.idFeature, dispatch]);
  const strCut = (str) => {
    const strReplace = str?.substring(5, str?.length - 4);
    return str?.replace(strReplace, "...");
  };
  const iot = useMemo(() => iotState?.iot, [iotState?.iot]);
  return (
    <BoxSection>
      <Error err={iotState.error} clearErrType={IOTAct.CLEAR_ERR} />
      <HeadingSideBar text={"Info"} />
      {iotState && (
        <ul>
          <li className={stls.itemRow}>
            <p>Project status</p>
            <p>
              Active
              <span
                className={`${stls.status} ${
                  iot?.status ? stls.true : stls.false
                }`}></span>
            </p>
          </li>
          <li className={stls.itemRow}>
            <p>Ethereum address</p>
            <p>
              {strCut(iot?.address)}
              <CopyButton className={stls.copyBtn} obj={iot?.address} />
            </p>
          </li>
          <li className={stls.itemRow}>
            <p>Project type</p>
            <p>{iot?.type}</p>
          </li>
        </ul>
      )}
    </BoxSection>
  );
}

export default InfoProject;
