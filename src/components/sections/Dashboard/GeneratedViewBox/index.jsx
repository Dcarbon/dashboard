import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import BoxBorderTop from "src/components/ui/Box/BoxBorderTop";
import SelectType from "./SelectType";
import Carbon from "./Carbon";
import { DURATION__TYPE, GET_Payload, Get_list_time } from "./tools";
import dateFormat from "dateformat";
import SensorLineChart from "./SensorLineChart";
import { useSelector } from "react-redux";
import DcarbonAPI from "src/tools/DcarbonAPI";
import { SENSOR__TYPE } from "src/tools/const";
import stls from "./index.module.scss";
import SelectDate_new from "./SelectDate_new";
const initDate = new Date();
initDate.setHours(0, 0, 0, 0);
function GeneratedViewBox({ iotSelected }) {
  const [currentDate, setCurrentDate] = useState(initDate);
  const [currentSensorType, setCurrentSensorType] = useState(SENSOR__TYPE.None);
  const [carbonGenerated, setCarbonGenerated] = useState(0);
  const [payload, setPayload] = useState({ from: 0, to: 0, interval: 0 });

  const [list_time_by_duration, setList_time_by_duration] = useState([]);
  const [durationType, setDurationType] = useState(DURATION__TYPE.day);

  const [listTab, setListTab] = useState([]);

  // Check IOT type
  const newDcarbonAPI = new DcarbonAPI();
  const IOT_state = useSelector(newDcarbonAPI.GetIOTState);
  const SENSOR_state = useSelector(newDcarbonAPI.GetSensorsState);
  const iot_type = IOT_state?.iot?.type;
  const sensors = SENSOR_state?.sensors;
  const title = useMemo(() => {
    if (currentDate) {
      switch (durationType) {
        case DURATION__TYPE.day:
          return dateFormat(currentDate, "mmm dd, yyyy");
        case DURATION__TYPE.month:
          return dateFormat(currentDate, "mmm, yyyy");
        case DURATION__TYPE.year:
          return dateFormat(currentDate, "yyyy");
      }
    }
  }, [currentDate, durationType]);
  const titleLine = useMemo(() => {
    let newDate = new Date();
    return dateFormat(newDate, "mmm dd, yyyy");
  }, []);

  useEffect(() => {
    if (iotSelected) {
      // console.log("Iot Mới", iotSelected);
      // console.log("set Sensor Type  === 0 => hiển thị biểu đồ cột");
      setCurrentSensorType(SENSOR__TYPE.None);
    }
  }, [iotSelected]);

  function GET_sensor_id(sensors = [], typeSensor) {
    if (sensors?.length > 0 && typeSensor) {
      let getIndex = sensors.findIndex((item) => item.type === typeSensor);
      return sensors[getIndex]?.id || 0;
    }
    return 0;
  }

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  const handleNewListTime = useCallback(
    (time, type) => {
      const newPayload = GET_Payload(time?.getTime(), type);
      setPayload(newPayload);
      const newListTime = Get_list_time(time?.getTime(), type);
      setList_time_by_duration(newListTime);
    },
    [setList_time_by_duration, setPayload]
  );
  useEffect(() => {
    if (durationType && currentDate.getTime()) {
      handleNewListTime(currentDate, durationType);
    }
  }, [
    currentDate,
    durationType,
    handleNewListTime,
    list_time_by_duration?.length,
  ]);
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  useEffect(() => {
    if (iotSelected) {
      // console.log("iotSelected mới", iotSelected);
      setCurrentDate(initDate);
      setCurrentSensorType(SENSOR__TYPE.None);
    }
  }, [iotSelected, sensors]);
  //
  //
  //
  //
  //

  return (
    <Fragment>
      <BoxBorderTop>
        <SelectDate_new
          iotSelected={iotSelected}
          currentSensorId={GET_sensor_id(sensors, currentSensorType)}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          currentSensorType={currentSensorType}
          durationType={durationType}
          setDurationType={setDurationType}
        />
      </BoxBorderTop>
      {/* select type to show  */}
      {/* select type to show  */}
      {/* select type to show  */}
      {/* select type to show  */}
      {/* select type to show  */}
      {/* select type to show  */}
      <div className="w-full" style={{ width: "100%" }}>
        <BoxBorderTop isPadding={false}>
          <SelectType
            iotSelected={iotSelected}
            sensors={sensors}
            listTab={listTab}
            iot_type={iot_type}
            carbonGenerated={carbonGenerated}
            currentType={currentSensorType}
            setCurrentType={setCurrentSensorType}
            setListTab={setListTab}
          />
        </BoxBorderTop>

        {/*  show charts  */}
        {/*  show charts  */}
        {/*  show charts  */}
        {/*  show charts  */}
        {/*  show charts  */}
        {/*  show charts  */}

        <BoxBorderTop>
          <div className={stls.tab}>
            <div className={stls.slide}>
              <Box isShow={currentSensorType === SENSOR__TYPE.None}>
                {currentSensorType === SENSOR__TYPE.None ? (
                  <Carbon
                    title={title ? "Data in " + title : ""}
                    payload={payload}
                    list_time_by_duration={list_time_by_duration}
                    iotSelected={iotSelected}
                    durType={durationType}
                    setCarbonGenerated={setCarbonGenerated}
                  />
                ) : (
                  <div className="w-full h-60"></div>
                )}
              </Box>
              {listTab.map((item, idx) => {
                return (
                  <Box
                    key={"box-tab-" + idx}
                    isShow={currentSensorType === item.type}
                  >
                    {currentSensorType === item.type ? (
                      <SensorLineChart
                        id={item.id}
                        iot_type={iot_type}
                        unit={item.unitChart || item.unit}
                        title={titleLine ? "Data in " + titleLine : ""}
                        sensorId={GET_sensor_id(sensors, item.type)}
                        iotSelected={iotSelected}
                        currentDate={currentDate}
                        generated={item.generated}
                        setGenerated={item.setGenerated}
                        timeSpace={3}
                        divider={item.divider}
                        isDepended={item?.isDepended}
                        handle_coefficient={(val) =>
                          val * (item?.coefficient || 1)
                        }
                        durationType={durationType}
                        list_time_by_duration={list_time_by_duration}
                      />
                    ) : (
                      <div className="w-full h-60"></div>
                    )}
                  </Box>
                );
              })}
            </div>
          </div>
        </BoxBorderTop>
      </div>
    </Fragment>
  );
}

export default GeneratedViewBox;
function Box({ isShow, children }) {
  return (
    <div
      className={`${isShow ? stls.active : ""} ${isShow ? "" : "hidden"} ${
        stls.tabContent
      }`}
    >
      {children}
    </div>
  );
}
