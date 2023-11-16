import { useCurrentIOTState } from "src/DashboardComponents/handleData";
import { SENSOR__TYPE_TEXT } from "src/tools/const";
import { Yesterday } from "../Charts/FirstSide/Yesterday";
import { PastWeek } from "../Charts/FirstSide/PastWeek";
import { Past30 } from "../Charts/FirstSide/Past30";
import { AllTime } from "../Charts/FirstSide/AllTime";

function TotalGenerator({ typeSensor, sensorId }) {
  const [currentIot] = useCurrentIOTState();
  // const totalIots = useGetTotalIot_byProject();
  // const totalProjectMinted = useGetGenerated(totalIots, typeSensor, sensorId);

  // useEffect(() => {
  //   if (totalProjectMinted) {
  //     console.log("currentIot thay đổi", totalProjectMinted);
  //   }
  // }, [totalProjectMinted]);
  const handleTitleTotal = (type) => {
    switch (type) {
      case 0:
        return "Total carbon minted";
      default:
        let text = SENSOR__TYPE_TEXT[type] ?? "";
        return `Total ${text.toLowerCase()} generated`;
    }
  };
  return (
    <div>
      <p>Tổng hợp </p>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-[272px]">
          <div>
            <p className="text-B-M leading-B-M text-extended-300">
              {handleTitleTotal(typeSensor)}
            </p>
            <p className="text-B-M leading-B-M text-extended-300">
              (all generator)
            </p>
          </div>
          <h3 className="text-H-M leading-H-M text-white">000000</h3>
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap md:flex-nowrap border border-extended-700 rounded-md ">
            <Yesterday
              typeSensor={typeSensor}
              id={currentIot}
              sensorId={sensorId}
            />
            <PastWeek
              sensorId={sensorId}
              typeSensor={typeSensor}
              id={currentIot}
            />
            <Past30
              typeSensor={typeSensor}
              id={currentIot}
              sensorId={sensorId}
            />
            <AllTime
              typeSensor={typeSensor}
              id={currentIot}
              sensorId={sensorId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalGenerator;

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
