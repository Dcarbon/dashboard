import { IOT__TYPE, SENSOR__TYPE } from "src/tools/const";
import stls from "./SelectType.module.scss";
import { useCallback, useEffect, useMemo, useState } from "react";

function SelectType({
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
        timeSpace: 15,
      },
      {
        id: "Biogas",
        type: SENSOR__TYPE.Biogas,
        title: "Biogas",
        // title: "Biogas treated",
        generated: biogasGenerated,
        setGenerated: setBiogasGenerated,
        unit: (
          <span>
            m<sup>3</sup>
          </span>
        ),
        unitChart: "\xB0" + "C",
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
          className={`${stls.item} ${currentType === 0 ? stls.active : ""}`}
        >
          <div className={stls.boxContent}>
            <h3 className={stls.title}>Carbon minted</h3>
            <p className={stls.generated}>{carbonGenerated}</p>
          </div>
        </li>
        {listTab?.map((item, idx) => {
          return (
            <li
              onClick={() => setCurrentType(item?.type)}
              key={"selectype-" + idx}
              className={`${stls.item} ${
                currentType === item.type ? stls.active : ""
              }`}
            >
              <div className={stls.boxContent}>
                <h3 className={stls.title}>{item.title}</h3>
                <p className={stls.generated}>
                  {item.generated}{" "}
                  {item?.unit && <span className='unit'>({item.unit})</span>}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SelectType;
