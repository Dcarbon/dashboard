import ScrollBox from "src/components/ui/ScrollBox";
import stls from "./index.module.scss";
import { useEffect, useMemo, useState } from "react";
import InfoProject from "src/components/sections/Dashboard/InforProject";
import CarbonGenerated from "src/components/sections/Dashboard/Generated/carbon";
import SelectIOT from "src/components/sections/Dashboard/SelectIOT";
import ElectricityGenerated from "src/components/sections/Dashboard/Generated/electricity";
import { ProjectACT } from "src/redux/actions/projectAction";
import { useDispatch, useSelector } from "react-redux";
import { IOTAct } from "src/redux/actions/iotAction";
import { SensorsACT } from "src/redux/actions/sensorsAction";
import DcarbonAPI from "src/tools/hook";
import ImageProject from "src/components/sections/Dashboard/ImageProject/ImageProject";

// get info project
// get iot minted
// get power minted
// get biogas minted
function DashboardSideBar({
  features,
  className,
  iotSelected,
  setIotSelected,
}) {
  // INIT REDUX
  // INIT REDUX
  // INIT REDUX
  // INIT REDUX
  // INIT REDUX
  // INIT REDUX
  // INIT REDUX
  // INIT REDUX
  // INIT REDUX
  // INIT REDUX
  // INIT REDUX
  // INIT REDUX
  // INIT REDUX
  // INIT REDUX
  // INIT REDUX
  // INIT REDUX
  // INIT REDUX
  // INIT REDUX
  const dispatch = useDispatch();
  const newDcarbon = new DcarbonAPI();
  const iotState = useSelector(newDcarbon.GetIOTState);
  const sensorsState = useSelector(newDcarbon.GetSensorsState);
  const projectState = useSelector(newDcarbon.GetProjectState);

  // state
  // state
  // state
  // state
  // Khi có iot mới sẽ lấy thông tin iot đó và danh sách sensor của nó
  // Khi có iot mới
  // Khi có iot mới
  // Khi có iot mới
  useEffect(() => {
    // => Get iot by id
    if (iotSelected) {
      // console.log("iotSelected", iotSelected);
      // get id by features in map
      dispatch({
        type: IOTAct.GET_IOT.REQUEST,
        payload: iotSelected,
      });
      // get sensor list
      dispatch({
        type: SensorsACT.GET_SENSORS.REQUEST,
        payload: { skip: 0, limit: 50, iotId: iotSelected },
      });
    }
  }, [dispatch, iotSelected]);
  //  PROJECT
  //  PROJECT
  //  PROJECT
  //  PROJECT
  //  PROJECT
  //  PROJECT
  const [showDetail, setShowDetail] = useState(false);
  const project = useMemo(() => projectState?.project, [projectState?.project]);
  const projectId = useMemo(() => {
    // từ iot hiên tại, lấy project id
    return iotState?.iot?.project;
  }, [iotState?.iot?.project]);
  // lấy thông tin project khi có projectId mới
  useEffect(() => {
    if (projectId) {
      dispatch({ type: ProjectACT.GET_PROJECT.REQUEST, payload: projectId });
    }
  }, [dispatch, projectId]);

  // SENSOR
  // SENSOR
  // SENSOR
  // SENSOR
  // SENSOR
  // SENSOR
  // SENSOR
  // SENSOR
  // SENSOR
  return (
    <div className={className}>
      <ScrollBox disableX>
        <div className='text-[#B3B2B8]'>
          {/* box select iot  */}
          {/* box select iot  */}
          {/* box select iot  */}
          <SelectIOT
            err={iotState.error}
            features={features}
            iotSelected={iotSelected}
            setIotSelected={setIotSelected}
          />

          <div className={stls.boxMiddle}>
            <ImageProject project={project} />
          </div>
          <div className={stls.boxMiddle}>
            {/* info  */}
            {/* info  */}
            {/* info  */}
            <InfoProject
              showDetail={showDetail}
              setShowDetail={setShowDetail}
              err={projectState?.error}
              project={project}
              iot={iotState?.iot}
              sensor_metrics={sensorsState?.sensor_metrics}
            />

            {/* Chart  */}
            {/* Chart  */}
            {/* Chart  */}
            <CarbonGenerated iotSelected={iotSelected} />
            {/* electric and biogas */}
            {/* electric and biogas */}
            {/* electric and biogas */}
            <ElectricityGenerated iotSelected={iotSelected} />
          </div>
        </div>
      </ScrollBox>
    </div>
  );
}

export default DashboardSideBar;
