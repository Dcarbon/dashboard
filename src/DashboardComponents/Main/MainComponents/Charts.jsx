import {
  useCurrentIOTState,
  useIOTState,
} from "src/DashboardComponents/handleData";
import Button from "./Components/Charts/Button";
import TabsIOT from "./TabsIOT";
import { useMemo } from "react";

function Charts() {
  const iotState = useIOTState();
  const iots_by_project = useMemo(
    () => iotState?.iots_by_project,
    [iotState?.iots_by_project]
  );
  //   {
  //     "id": 290,
  //     "project": 3,
  //     "address": "0x7a7080f6a1b21fc1aa4dec4e3d8e6ac8e0e6cf54",
  //     "type": 20,
  //     "status": 10,
  //     "position": {
  //         "lat": 105.008666,
  //         "lng": 21.5030237
  //     }
  // }
  const [currentId] = useCurrentIOTState();
  console.log("iots_by_project", iots_by_project);
  // const activeIOT = useMemo(() => iots_by_project, [ ])
  return (
    <div className="py-8 lg:py-12">
      <h3 className="text-T-M leading-T-M">
        Select Generator to view data detail
      </h3>
      <div className="flex flex-col lg:flex-row gap-10">
        {/* left */}
        {/* left */}
        {/* left */}
        {/* left */}
        {/* left */}
        {/* left */}
        {/* left */}
        {/* left */}
        <div className="w-full lg:w-[170px]">
          <div className="bg-extended-200 border rounded-md">
            <div className="text-extended-900">
              <h3 className="text-T-S leading-T-S font-semibold">
                Generator 1
              </h3>
              <div className="flex flex-row ">
                <div></div>
                <div></div>
              </div>
            </div>
            <span></span>
          </div>
          <TabsIOT />
        </div>
        {/* right */}
        {/* right */}
        {/* right */}
        {/* right */}
        {/* right */}
        {/* right */}
        {/* right */}
        {/* right */}
        <div className="flex-1 items-stretch ">
          <div className="flex flex-col w-full h-full gap-6">
            <div className="flex flex-row flex-wrap gap-6">
              <Button isActive={true}>1W</Button>
              <Button isActive={false}>1M</Button>
              <Button isActive={false}>3M</Button>
              <Button isActive={false}>6M</Button>
              <Button isActive={false}>1Y</Button>
              <Button isActive={false}>All time</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts;
