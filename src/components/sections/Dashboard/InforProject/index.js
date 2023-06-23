import { useEffect, useMemo, useState } from "react";

import stls from "./index.module.scss";
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
import CopyButton from "src/components/ui/Button/CopyButton";
import dateFormat from "dateformat";
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
  useEffect(() => {
    console.log("projectState", projectState);
  }, [projectState]);
  const specs = useMemo(
    () => projectState?.project?.specs?.specs,
    [projectState?.project?.specs?.specs]
  );
  return (
    <div className={stls.infoProject}>
      <Error err={iotState.error} clearErrType={IOTAct.CLEAR_ERR} />

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
            <div>Location</div>
            <div>{projectDetail?.location}</div>
          </li>
        </ul>
      )}
      {projectState?.project && (
        <Collapse isOpen={showDetail}>
          <ul>
            {projectState?.project?.createdAt && (
              <li className={stls.itemRow}>
                <div>Implement</div>
                <div>
                  {dateFormat(
                    new Date(projectState?.project?.createdAt),
                    "dd/mm/yyyy"
                  )}
                </div>
              </li>
            )}
            {specs?.area && (
              <li className={stls.itemRow}>
                <div>Area</div>
                <div>
                  {specs?.area} m<sup>2</sup>
                </div>
              </li>
            )}

            {specs?.waste && (
              <li className={stls.itemRow}>
                <div>Waste</div>
                <div>{specs?.waste} kg/day</div>
              </li>
            )}

            {specs?.livestock && (
              <li className={stls.itemRow}>
                <div>Livestock</div>
                <div>
                  {specs?.livestock} <span title="Livestock unit">LSU</span>
                </div>
              </li>
            )}
            {specs?.power && (
              <li className={stls.itemRow}>
                <div>Power</div>
                <div>{specs?.power} kVA</div>
              </li>
            )}
          </ul>
          {projectDetail?.detail && (
            <div className={stls.information}>
              <label className={stls.icon}>
                <InformationCircleIcon type="outline" width={24} height={24} />
              </label>
              <div className={stls.content}>
                {/* <fieldset className={stls.icon_hidden}>
                <InformationCircleIcon type="outline" width={24} height={24} />
              </fieldset> */}

                <div className={stls.parsered}>
                  {HTMLReactParser(projectDetail?.detail ?? "")}
                </div>
              </div>
            </div>
          )}
        </Collapse>
      )}

      <div className="text-right">
        <Button
          className={stls.btnDetails}
          onClick={() => {
            setShowDetail(!showDetail);
          }}
        >
          <ChevronUpIcon
            width={24}
            height={16}
            className={!showDetail ? stls.showing : ""}
          />
          {showDetail ? "Hide" : "View"} details
        </Button>
      </div>
    </div>
  );
}

export default InfoProject;
