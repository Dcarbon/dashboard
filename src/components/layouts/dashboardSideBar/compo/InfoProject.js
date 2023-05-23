import { useCallback, useEffect, useMemo } from "react";
import BoxSection from "../tools/BoxSection";
import HeadingSideBar from "../tools/Heading";
import stls from "./InfoProject.module.scss";
import CopyButton from "../tools/CopyButton";
import HookAPI from "src/tools/hook";
import { useDispatch, useSelector } from "react-redux";
import { IOTAct } from "src/redux/actions/iotAction";
import Error from "src/components/ui/Error";
import { IOT_TYPE } from "src/tools/const";
import { SensorsACT } from "src/redux/actions/sensorsAction";
function InfoProject() {
  const newHook = new HookAPI();
  const dispatch = useDispatch();
  const iotState = useSelector(newHook.GetIOTState);
  const customState = useSelector(newHook.GetCustomState);
  const sensorsState = useSelector(newHook.GetSensorsState);

  // get id by features in map
  // get id by features in map
  // get id by features in map
  useEffect(() => {
    let loaded = false;
    if (customState.idFeature && !loaded) {
      dispatch({
        type: IOTAct.GET_IOT.REQUEST,
        payload: customState.idFeature,
      });
    }
    return () => {
      loaded = true;
    };
  }, [customState.idFeature, dispatch]);
  // get sensor list
  // get sensor list
  // get sensor list
  useEffect(() => {
    if (customState?.idFeature) {
      dispatch({
        type: SensorsACT.GET_SENSORS.REQUEST,
        payload: { skip: 0, limit: 5, iotId: customState?.idFeature },
      });
    }
  }, [customState?.idFeature, dispatch]);
  // get sensor metrics by sensor_id in first item
  // get sensor metrics by sensor_id in first item
  // get sensor metrics by sensor_id in first item
  const getSensorMetrics = useCallback(
    (sensorId) => {
      const newDate = new Date();
      dispatch({
        type: SensorsACT.GET_SENSORS_METRICS.REQUEST,
        payload: {
          to: Math.round(newDate.getTime() / 1000),
          // from : Math.round(newDate.getTime() / 1000 - 5),
          from: 1,
          iotId: customState?.idFeature,
          limit: 5,
          skip: 0,
          sensorId,
        },
      });
    },
    [customState?.idFeature, dispatch]
  );

  useEffect(() => {
    if (sensorsState?.sensors?.length > 0) {
      const sensorId = sensorsState?.sensors[0].id;
      getSensorMetrics(sensorId);
      let thisInterval = setInterval(() => getSensorMetrics(sensorId), 5000);
      return () => clearInterval(thisInterval);
    }
  }, [getSensorMetrics, sensorsState?.sensors]);
  // handle Ether address
  const strCut = (str) => {
    const strReplace = str?.substring(5, str?.length - 4);
    return str?.replace(strReplace, "...");
  };
  const iot = useMemo(() => iotState?.iot, [iotState?.iot]);
  return (
    <BoxSection>
      <Error err={iotState.error} clearErrType={IOTAct.CLEAR_ERR} />
      <HeadingSideBar text={`Info ${iot?.id ? `(${iot.id})` : ""}`} />
      {iotState && (
        <ul>
          <li className={stls.itemRow}>
            <p>Project status</p>
            <p>
              Active
              <span
                className={`${stls.status} ${
                  sensorsState?.sensor_metrics?.length > 0
                    ? stls.true
                    : stls.false
                }`}
              ></span>
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
            <p>{IOT_TYPE(iot?.type)}</p>
          </li>
        </ul>
      )}
    </BoxSection>
  );
}

export default InfoProject;
