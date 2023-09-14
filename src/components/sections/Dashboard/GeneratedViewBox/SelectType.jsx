import { IOT__TYPE, SENSOR__TYPE } from "src/tools/const";
import stls from "./SelectType.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";

function SelectType({
  iotSelected,
  sensors,
  iot_type,
  carbonGenerated,
  currentType,
  setCurrentType,
  listTab,
  setListTab,
}) {
  // BurnMethane
  const [temperatureGenerated, setTemperatureGenerated] = useState(0);
  // CleanCockstove
  const [biogasGenerated, setBiogasGenerated] = useState(0);
  const [energyGenerated, setEnergyGenerated] = useState(0);
  //
  useEffect(() => {
    if (iotSelected) {
      setBiogasGenerated(0);
      setEnergyGenerated(0);
      setTemperatureGenerated(0);
    }
  }, [iotSelected]);
  const BurnMethane = useMemo(
    () => [
      {
        id: "Power",
        type: SENSOR__TYPE.Power,
        title: "Energy",
        // title: "Energy Generated",
        generated: energyGenerated,
        setGenerated: setEnergyGenerated,
        unit: <span>kWh</span>,
        unitChart: "kWh",
        divider: 10000,
        isDepended: false,
        isSelectable: false,
      },
      {
        id: "Biogas",
        type: SENSOR__TYPE.Biogas,
        title: "Biogas",
        generated: biogasGenerated,
        setGenerated: setBiogasGenerated,
        unit: (
          <span>
            m<sup>3</sup>
          </span>
        ),
        unitChart: "\xB0" + "C",
        divider: 10000,
        isDepended: true,
        dependedOn: SENSOR__TYPE.Power,
        coefficient: 0.528888889,
        isSelectable: false,
      },
    ],
    [biogasGenerated, energyGenerated, setBiogasGenerated, setEnergyGenerated]
  );
  const CleanCockstove = useMemo(
    () => [
      {
        id: "Thermometer",
        type: SENSOR__TYPE.Thermometer,
        title: "Temperature",
        generated: temperatureGenerated,
        setGenerated: setTemperatureGenerated,
        unit: <span>&ordm;C</span>,
        unitChart: "\xB0" + "C",
        timeSpace: 3,
        divider: 1,
        isSelectable: true,
      },
    ],
    [setTemperatureGenerated, temperatureGenerated]
  );
  const changeList = useCallback(
    (iot_type) => {
      switch (iot_type) {
        case IOT__TYPE.BurnMethane:
          setListTab(BurnMethane);
          return BurnMethane;
        case IOT__TYPE.CleanCockstove:
          setListTab(CleanCockstove);
          return CleanCockstove;
      }
    },
    [BurnMethane, CleanCockstove, setListTab]
  );
  const listSensorShowed = useMemo(
    () => sensors?.map((item) => item?.type) || [],
    [sensors]
  );
  useEffect(() => {
    if (iot_type) {
      changeList(iot_type);
    }
  }, [changeList, iot_type]);

  return (
    <div className=''>
      <ul className={stls.list}>
        <li
          onClick={() => setCurrentType(0)}
          key={"selectype-"}
          className={`cursor-pointer ${stls.item} ${
            currentType === 0 ? stls.active : ""
          }`}
        >
          <div className={stls.boxContent}>
            <h3 className={stls.title}>Carbon minted</h3>
            <p className={stls.generated}>{carbonGenerated}</p>
          </div>
        </li>
        {sensors &&
          listTab?.map((item, idx) => {
            let isShow = listSensorShowed?.includes(item?.type);
            return (
              isShow && (
                <li
                  onClick={() => {
                    setCurrentType(item?.type);
                  }}
                  key={"selectype-" + idx}
                  className={`cursor-pointer ${stls.item} ${
                    currentType === item.type ? stls.active : ""
                  }`}
                >
                  <div className={stls.boxContent}>
                    <h3 className={stls.title}>{item.title}</h3>
                    <p className={stls.generated}>
                      {item.generated}{" "}
                      {item?.unit && (
                        <span className='unit'>({item.unit})</span>
                      )}
                    </p>
                  </div>
                </li>
              )
            );
          })}
      </ul>
    </div>
  );
}

export default SelectType;
