import { useCallback, useEffect, useMemo, useState } from "react";
import BoxSection from "../tools/BoxSection";
import HeadingSideBar from "../tools/Heading";
import stls from "./InfoProject.module.scss";
import CopyButton from "../tools/CopyButton";
import DcarbonAPI from "src/tools/hook";
import { useDispatch, useSelector } from "react-redux";
import { IOTAct } from "src/redux/actions/iotAction";
import Error from "src/components/ui/Error";
import { IOT_TYPE } from "src/tools/const";
import { SensorsACT } from "src/redux/actions/sensorsAction";
import HTMLReactParser from "html-react-parser";
import {
  ChevronUpIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import Button from "src/components/ui/Button";
import Collapse from "src/components/ui/Collapse";
function InfoProject({ iotSelected }) {
  const newDcarbon = new DcarbonAPI();
  const dispatch = useDispatch();
  const iotState = useSelector(newDcarbon.GetIOTState);
  const sensorsState = useSelector(newDcarbon.GetSensorsState);

  const projectState = useSelector(newDcarbon.GetProjectState);
  // get project name
  const projectName = useMemo(() => {
    const descs = projectState?.project?.descs;
    if (descs?.length > 0) {
      return (
        descs.find((item) => item?.language === "vi").name ||
        projectState.project.id
      );
    }
    return projectState?.project?.id;
  }, [projectState?.project?.descs, projectState?.project?.id]);

  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    if (iotSelected) {
      // get id by features in map
      // get id by features in map
      // get id by features in map
      dispatch({
        type: IOTAct.GET_IOT.REQUEST,
        payload: iotSelected,
      });

      // get sensor list
      // get sensor list
      // get sensor list
      dispatch({
        type: SensorsACT.GET_SENSORS.REQUEST,
        payload: { skip: 0, limit: 5, iotId: iotSelected },
      });
    }
  }, [iotSelected, dispatch]);

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
          iotId: iotSelected,
          limit: 5,
          skip: 0,
          sensorId,
        },
      });
    },
    [iotSelected, dispatch]
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
  const projectDetail = useMemo(() => {
    let newD = new DcarbonAPI();
    return newD.ProjectInfo(projectState?.project?.id);
  }, [projectState?.project?.id]);
  return (
    <BoxSection className={stls.infoProject}>
      <Error err={iotState.error} clearErrType={IOTAct.CLEAR_ERR} />
      <HeadingSideBar text={`Info project`} />
      {iotState && (
        <ul>
          <li className={stls.itemRow}>
            <div>Project status</div>
            <div>
              Active
              <span
                className={`${stls.status} ${
                  sensorsState?.sensor_metrics?.length > 0
                    ? stls.true
                    : stls.false
                }`}
              ></span>
            </div>
          </li>
          <li className={stls.itemRow}>
            <div>Name</div>
            <div>{projectName}</div>
          </li>
          <li className={stls.itemRow}>
            <div>Type</div>
            <div>{IOT_TYPE(iot?.type)}</div>
          </li>
          <li className={stls.itemRow}>
            <div>Ethereum address</div>
            <div>
              {strCut(iot?.address)}
              <CopyButton className={stls.copyBtn} obj={iot?.address} />
            </div>
          </li>
          <li className={stls.itemRow}>
            <div>Loction</div>
            <div>{projectDetail?.location}</div>
          </li>
        </ul>
      )}

      <Collapse isOpen={showDetail}>
        <ul>
          <li className={stls.itemRow}>
            <div>Implement</div>
            <div>{projectDetail?.implement}</div>
          </li>
          <li className={stls.itemRow}>
            <div>Area</div>
            <div>
              {projectDetail?.area} m<sup>2</sup>
            </div>
          </li>
          <li className={stls.itemRow}>
            <div>Waste</div>
            <div>{projectDetail?.waste} kg/day</div>
          </li>
          <li className={stls.itemRow}>
            <div>Power</div>
            <div>{projectDetail?.power} kVA</div>
          </li>
        </ul>
        <div className={stls.information}>
          <span className={stls.icon}>
            <InformationCircleIcon width={24} height={24} />
          </span>
          <div className={stls.content}>
            {/* <span className={stls.icon_hidden}>
              <InformationCircleIcon width={24} height={24} />
            </span> */}
            {HTMLReactParser(projectDetail?.detail ?? "")}
          </div>
        </div>
      </Collapse>
      <Button
        className={stls.btnDetails}
        onClick={() => {
          setShowDetail(!showDetail);
        }}
      >
        <ChevronUpIcon
          width={24}
          height={16}
          className={showDetail ? stls.showing : ""}
        />
        {showDetail ? "Hide" : "View"} details
      </Button>
    </BoxSection>
  );
}

export default InfoProject;
