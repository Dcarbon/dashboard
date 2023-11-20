import {
  useCurrentIOTState,
  useIOTState,
} from "src/DashboardComponents/handleData";
import Button from "./Components/Charts/Button";
import TabsIOT from "./TabsIOT";
import { useMemo, useState } from "react";

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
  const [mobileTabIots, setMobileTabIots] = useState(false);
  const [currentId] = useCurrentIOTState();
  console.log("iots_by_project", iots_by_project);
  // const activeIOT = useMemo(() => iots_by_project, [ ])
  return (
    <div className="py-8 lg:py-12">
      <h3 className="text-T-M leading-T-M mb-4">
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
          <div className="bg-extended-200 border rounded-md text-extended-900 md:hidden">
            <div
              className="py-3 px-5 flex gap-4 justify-between items-center cursor-pointer "
              onClick={() => setMobileTabIots(!mobileTabIots)}
            >
              <div>
                <h4
                  className={`text-T-S leading-T-S font-semibold text-extended-900`}
                >
                  Device IOT {currentId}
                </h4>
                <p
                  className={`text-B-M leading-B-M  text-extended-700"
                  `}
                >
                  <span
                    className={`inline-block w-2 h-2 rounded-full bg-primary align-middle mr-2 mb-0.5`}
                  />
                  Active
                </p>
              </div>
              <span
                className={` rounded-full overflow-hidden p-3 transition-transform ${
                  mobileTabIots ? "rotate-180" : "rotate-0"
                }`}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.41 0.589844L6 5.16984L10.59 0.589844L12 1.99984L6 7.99984L0 1.99984L1.41 0.589844Z"
                    fill="#323232"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className={`${mobileTabIots ? "block" : "hidden md:block"}`}>
            <TabsIOT />
          </div>
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
