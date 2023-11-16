import { useRef, useEffect } from "react";
import {
  useGetSensorsByIot,
  useIOTState,
} from "src/DashboardComponents/handleData";
import { SENSOR__TYPE, SENSOR__TYPE_TEXT } from "src/tools/const";
import ScrollBox from "src/components/ui/ScrollBox";

function TabsGenerator({ selectedSensor, setSelectedSensor, setTypeSensor }) {
  const listREF = useRef(null);
  const iotState = useIOTState();
  const [sensors, setSensors] = useGetSensorsByIot(undefined);

  const handleClick = (value, type) => {
    setSelectedSensor(value);
    setTypeSensor(type);
  };
  useEffect(() => {
    if (!sensors && iotState?.iot?.id) {
      setSensors(iotState?.iot?.id);
    }
  }, [iotState?.iot?.id, sensors, setSensors]);

  const handleLabelText = (type) => SENSOR__TYPE_TEXT[Number(type)];
  return (
    <div className="mt-8 pt-5 lg:px-4 xl:px-32">
      <div className={"px-0 border-b border-extended-800"}>
        {/* <div classNam> */}
        <div className="relative">
          <ScrollBox disableY={true} size={"zero"}>
            <ul ref={listREF} className="w-max">
              <LabelTab
                isActive={selectedSensor === 0}
                text={"Carbon minted"}
                onClick={() => handleClick(0, SENSOR__TYPE.None)}
              />

              {sensors?.map((item) => (
                <LabelTab
                  key={"item+" + item.id}
                  isActive={selectedSensor === item.id}
                  text={handleLabelText(item.type)}
                  onClick={() => handleClick(item.id, item.type)}
                />
              ))}
            </ul>
          </ScrollBox>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default TabsGenerator;
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
function LabelTab({ text, onClick, isActive }) {
  return (
    <li
      className={`inline-block text-T-S leading-T-S md:text-T-L md:leading-T-L transition-all duration-700 ${
        isActive ? "bg-extended-800 rounded-t-md" : ""
      }`}
    >
      <button className="p-4 md:px-6 md:py-5" onClick={onClick}>
        {text}
      </button>
    </li>
  );
}
