import { useCallback, useMemo, useEffect } from "react";

import stls from "./index.module.scss";
import DcarbonAPI from "src/tools/DcarbonAPI";
import { IOT__TYPE_TEXT } from "src/tools/const";
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
import Error from "src/components/ui/Error";
import { ProjectACT } from "src/redux/actions/projectAction";
import { useDispatch } from "react-redux";
import { IOTAct } from "src/redux/actions/iotAction";
import { roundup_second } from "../GeneratedViewBox/tools";
function InfoProject({
  isActive,
  iotSelected,
  err,
  project,
  iot,
  showDetail,
  setShowDetail,
}) {
  const dispatch = useDispatch();
  // get project name
  const projectName = useMemo(() => {
    const descs = project?.descs;
    if (descs?.length > 0) {
      return descs[0].name;
    }
  }, [project?.descs]);

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

  const checkIsActive = useCallback(() => {
    let newDate = new Date();
    let to = roundup_second(newDate);
    let from = to - 20;
    console.log("--------------------------------------- ");
    console.log("--------------------------------------- ");
    console.log("--------------------------------------- ");
    console.log("check active " + iotSelected);
    console.log("newDate " + newDate);
    dispatch({
      type: IOTAct.IsActive.REQUEST,
      payload: {
        iotId: iotSelected,
        to,
        from,
      },
    });
  }, [dispatch, iotSelected]);
  useEffect(() => {
    if (iotSelected) {
      checkIsActive();
      let myInterval = setInterval(checkIsActive, 15000);
      return () => {
        clearInterval(myInterval);
      };
    }
  }, [checkIsActive, iotSelected]);

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

  const clearErrType = () => {
    dispatch({ type: ProjectACT.CLEAR_ERR });
  };
  return (
    <CollapseTab
      disableNumb
      disable
      color='blue'
      title={`Info project ${project?.id}`}
    >
      <div className={stls.infoProject}>
        <ul>
          <li className={stls.itemRow}>
            <div>Project status</div>
            <div>
              {isActive ? "Active" : "Inactive"}
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
            <div>{IOT__TYPE_TEXT[iot?.type]}</div>
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
        {/* <p>is detail {isDetailInfo ? "yes" : "no"} </p>
        <p>is showDetail {showDetail ? "yes" : "no"} </p> */}
        {isDetailInfo && (
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
                    {specs?.livestock} <span title='Livestock unit'>LSU</span>
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
                    type='outline'
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
          <div className='text-right'>
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
        <Error clearErrType={clearErrType} err={err} />
      </div>
    </CollapseTab>
  );
}

export default InfoProject;
