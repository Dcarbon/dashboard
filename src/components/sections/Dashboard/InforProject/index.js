import { useEffect, useMemo, useState } from "react";

import stls from "./index.module.scss";
import DcarbonAPI from "src/tools/hook";
import { useSelector } from "react-redux";
import { IOTAct } from "src/redux/actions/iotAction";
import Error from "src/components/ui/Error";
import { IOT_TYPE } from "src/tools/const";
import HTMLReactParser from "html-react-parser";
import {
  ChevronUpIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import Button from "src/components/ui/Button";
import Collapse from "src/components/ui/Collapse";
import CopyButton from "src/components/ui/Button/CopyButton";
import dateFormat from "dateformat";
function InfoProject() {
  const newDcarbon = new DcarbonAPI();
  const iotState = useSelector(newDcarbon.GetIOTState);

  // Project  đã lấy thông tin ở phần SelectIOT
  const projectState = useSelector(newDcarbon.GetProjectState);

  // get project name
  const projectName = useMemo(() => {
    const descs = projectState?.project?.descs;
    if (descs?.length > 0) {
      return descs[0].name;
    }
  }, [projectState?.project?.descs]);

  const [showDetail, setShowDetail] = useState(false);

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

  const specs = useMemo(
    () => projectState?.project?.specs?.specs,
    [projectState?.project?.specs?.specs]
  );

  // Check trạng thái hoạt động của project dựa vào dữ liệu sensor metrics trả về
  // sensor metrics đc lấy ở electricity
  const sensorsState = useSelector(newDcarbon.GetSensorsState);
  const isActive = useMemo(
    () => Boolean(sensorsState?.sensor_metrics?.length > 0),
    [sensorsState?.sensor_metrics?.length]
  );
  return (
    <div className={stls.infoProject}>
      <Error err={iotState.error} clearErrType={IOTAct.CLEAR_ERR} />

      {iotState && (
        <ul>
          <li className={stls.itemRow}>
            <div>Project status</div>
            <div>
              {isActive ? "Active" : "Deactive"}
              <span
                className={`${stls.status} ${
                  isActive ? stls.true : stls.false
                }`}
              ></span>
            </div>
          </li>
          <li className={stls.itemRow}>
            <div>Name</div>
            <div>{projectName || projectState?.project?.id}</div>
          </li>
          {/* Loại IOT */}
          <li className={stls.itemRow}>
            <div>Type</div>
            <div>{IOT_TYPE(iot?.type)}</div>
          </li>
          {/* Ethereum address */}
          <li className={stls.itemRow}>
            <div>Ethereum address</div>
            <div>
              {strCut(iot?.address)}
              <CopyButton className={stls.copyBtn} obj={iot?.address} />
            </div>
          </li>
          {projectDetail?.location && (
            <li className={stls.itemRow}>
              <div>Location</div>
              <div>{projectDetail?.location}</div>
            </li>
          )}
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
