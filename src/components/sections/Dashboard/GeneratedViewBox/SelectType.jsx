import { useEffect } from "react";
import stls from "./SelectType.module.scss";

function SelectType({
  sensors = [],
  carbonGenerated,
  temperatureGenerated,
  biomassGenerated,
  currentType,
  setCurrentType,
  setSensorId,
}) {
  useEffect(() => {
    console.log("sensors", sensors);
  }, [sensors]);

  const sensorDefined = [
    {
      type: 2,
      title: "Carbon minted",
      generatedNumber: carbonGenerated,
      unit: <>kWh</>,
    },
    {
      type: 4,
      title: "Temperature",
      generatedNumber: temperatureGenerated,
      unit: <>&ordm;C</>,
    },
    {
      type: 1,
      title: "Biomass",
      generatedNumber: biomassGenerated,
      unit: <>kg</>,
    },
  ];
  return (
    <div className=''>
      <ul className={stls.list}>
        {sensorDefined.map((item, idx) => {
          let thisSensor = sensors?.find((jt) => jt.type === item.type);
          return (
            <li
              onClick={() => {
                setCurrentType(item?.type);
                setSensorId(thisSensor?.id || 0);
              }}
              key={"selectype-" + idx}
              className={`${stls.item} ${
                currentType === item.type ? stls.active : ""
              }`}
            >
              <div>
                <h3 className={stls.title}>{item.title}</h3>
                <p className={stls.generatedNumber}>
                  {item.generatedNumber}{" "}
                  <span className='unit'>({item.unit})</span>
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
