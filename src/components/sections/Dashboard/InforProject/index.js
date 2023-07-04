import { useMemo, useState } from "react";

import stls from "./index.module.scss";
import DcarbonAPI from "src/tools/hook";
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
import CollapseTab from "../CollapseTab";
function InfoProject({ project, iot, sensor_metrics }) {
  // get project name
  const projectName = useMemo(() => {
    const descs = project?.descs;
    if (descs?.length > 0) {
      return descs[0].name;
    }
  }, [project?.descs]);

  const [showDetail, setShowDetail] = useState(false);

  // handle Ether address
  const strCut = (str) => {
    const strReplace = str?.substring(5, str?.length - 4);
    return str?.replace(strReplace, "...");
  };
  const projectDetail = useMemo(() => {
    let newD = new DcarbonAPI();
    return newD.ProjectInfo(project?.id);
  }, [project?.id]);

  const specs = useMemo(() => project?.specs?.specs, [project?.specs?.specs]);

  // Check trạng thái hoạt động của project dựa vào dữ liệu sensor metrics trả về
  const isActive = useMemo(() => {
    if (sensor_metrics?.length > 0) {
      // const lastData = sensor_metrics[sensor_metrics.length - 1];
      // console.log("lastData", lastData);
      // console.log(
      //   "date",
      //   dateFormat(new Date(lastData?.createdAt), "dd/mm/yyyy")
      // );

      return true;
    }
  }, [sensor_metrics]);
  console.log("project", project);
  console.log("projectDetail", projectDetail);
  const isDetailInfo = useMemo(
    () =>
      Boolean(
        project?.createdAt ||
          specs?.area ||
          specs?.waste ||
          specs?.livestock ||
          specs?.power ||
          projectDetail?.detail
      ),
    [
      project?.createdAt,
      projectDetail?.detail,
      specs?.area,
      specs?.livestock,
      specs?.power,
      specs?.waste,
    ]
  );
  return (
    <CollapseTab disable color="blue" title="Info project">
      <div className={stls.infoProject}>
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
            <div>{projectName || project?.id}</div>
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

        {project && (
          <Collapse isOpen={showDetail}>
            <ul>
              {project?.createdAt && (
                <li className={stls.itemRow}>
                  <div>Implement</div>
                  <div>
                    {dateFormat(new Date(project?.createdAt), "dd/mm/yyyy")}
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
                  <InformationCircleIcon
                    type="outline"
                    width={24}
                    height={24}
                  />
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
        {isDetailInfo && (
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
        )}
      </div>
    </CollapseTab>
  );
}

export default InfoProject;
