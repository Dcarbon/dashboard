import { DURATION_TYPES } from "src/DashboardComponents/handleConfig";
import Button from "./Button";
import TabsIOT from "../../TabsIOT";
import { useCallback, useEffect, useState } from "react";
import { useCurrentIOT } from "src/hook/useIOT";
import { AxiosGet } from "src/redux/sagaUtils";
import { apiTotalCarbon, apiTotalSensor } from "./TotalNumber/handle";
import CircleLoading from "src/components/ui/Loading/CircleLoading";
import ChartData from "./ChartData";

function Charts({ onChangeIOT, sensorId, typeSensor }) {
  const [mobileTabIots, setMobileTabIots] = useState(false);
  const [currentId] = useCurrentIOT();
  const [durationType, setDurationTypes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);

  const handleGetDuration = (type) => {
    let newDate = new Date();
    newDate.setHours(23, 59, 59);
    let from = null;
    let interval = 1;
    switch (type) {
      case 1: // 1 tháng
        newDate.setMonth(newDate.getMonth() - 1);
        from = newDate;
        break;
      case 2: // 3 tháng
        newDate.setMonth(newDate.getMonth() - 3);
        from = newDate;
        break;
      case 3: // 6 tháng
        newDate.setMonth(newDate.getMonth() - 6);
        from = newDate;
        interval = 2;
        break;
      case 4: // 1 năm
        newDate.setFullYear(newDate.getFullYear() - 1);
        from = newDate;
        interval = 2;
        break;
      case 5: // all
        from = null;
        interval = 2;
        break;
      default: // 1 tuần
        newDate.setDate(newDate.getDate() - 7);
        from = newDate;
        break;
    }
    return {
      from,
      interval,
    };
  };

  const handleGetData = useCallback(
    (newType = durationType) => {
      setLoading(true);
      let newDate = new Date();
      newDate.setHours(23, 59, 59);
      let to = newDate;
      let url = "";
      let { from, interval } = handleGetDuration(newType);
      if (typeSensor === 0) {
        url = apiTotalCarbon(currentId, from, to, interval);
      } else if (typeSensor > 0 && sensorId) {
        url = apiTotalSensor(currentId, sensorId, from, to, interval);
      }
      AxiosGet(url)
        .then((res) => {
          setData(res?.data);
        })
        .catch((err) => console.error("Handle get data failed", err))
        .finally(() => setLoading(false));
    },
    [currentId, durationType, sensorId, typeSensor]
  );
  useEffect(() => {
    if (currentId) {
      handleGetData();
    }
  }, [currentId, handleGetData]);

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
            <TabsIOT open={mobileTabIots} onChangeIOT={onChangeIOT} />
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
            <div>
              {loading ? (
                <CircleLoading />
              ) : (
                <ChartData
                  title={typeSensor === 0 ? "Carbon" : ""}
                  data={data}
                  durationType={durationType}
                  typeSensor={typeSensor}
                />
              )}
            </div>
            <div className="flex flex-row flex-wrap gap-6">
              {DURATION_TYPES.map((item, idx) => {
                return (
                  <Button
                    key={"duration-type-" + idx}
                    isActive={idx === durationType}
                    onClick={() => {
                      setDurationTypes(idx);
                      handleGetData(idx);
                    }}
                  >
                    {item}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts;
