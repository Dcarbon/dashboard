import { DURATION_TYPES } from "src/DashboardComponents/handleConfig";
import Button from "./Button";
import TabsIOT from "../../TabsIOT";
import { useCallback, useEffect, useState } from "react";
import { useCurrentIOT } from "src/hook/useIOT";
import { AxiosGet } from "src/redux/sagaUtils";
import { apiTotalCarbon, apiTotalSensor } from "./TotalNumber/handle";
import CircleLoading from "src/components/ui/Loading/CircleLoading";
import ChartData from "./ChartData";
import ScrollBox from "src/components/ui/ScrollBox";
import stls from "./index.module.scss";
import { SENSOR__UNIT_text } from "src/tools/const";
function Charts({ onChangeIOT, sensorId, typeSensor }) {
  const [mobileTabIots, setMobileTabIots] = useState(false);
  const [currentId] = useCurrentIOT();
  const [durationType, setDurationTypes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleGetDuration = (type) => {
    let newDate = new Date();
    newDate.setHours(23, 59, 59);
    let from = null;
    let interval = 1;
    switch (type) {
      case 1: // 1 tháng
        newDate.setMonth(newDate.getMonth() - 1);
        from = newDate;
        interval = 2;
        break;
      case 2: // 3 tháng
        newDate.setMonth(newDate.getMonth() - 3);
        from = newDate;
        break;
      case 3: // 6 tháng
        newDate.setMonth(newDate.getMonth() - 6);
        from = newDate;
        interval = 3;
        break;
      case 4: // 1 năm
        newDate.setFullYear(newDate.getFullYear() - 1);
        from = newDate;
        interval = 3;
        break;
      case 5: // all
        from = null;
        interval = 4;
        break;
      default: // 1 tuần
        newDate.setDate(newDate.getDate() - 7);
        from = newDate;
        interval = 2;
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
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-0">
        {/* left */}
        {/* left */}
        {/* left */}
        {/* left */}
        {/* left */}
        {/* left */}
        {/* left */}
        {/* left */}
        <div className={stls.left}>
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
          <ScrollBox className={"max-h-[400px]"} size={"small"}>
            <div className={`${mobileTabIots ? "block" : "hidden md:block"}`}>
              <TabsIOT open={mobileTabIots} onChangeIOT={onChangeIOT} />
            </div>
          </ScrollBox>
        </div>
        {/* right */}
        {/* right */}
        {/* right */}
        {/* right */}
        {/* right */}
        {/* right */}
        {/* right */}
        {/* right */}
        <div className={stls.right}>
          <div className="flex flex-col w-full h-full ">
            <div className="relative">
              <div className="p-3">
                <ChartData
                  loading={loading}
                  title={SENSOR__UNIT_text[typeSensor]}
                  data={data}
                  durationType={durationType}
                  typeSensor={typeSensor}
                />
              </div>

              {loading && (
                <div className="absolute top-0 left-0 rounded-md flex justify-center items-center w-full h-full bg-primary bg-opacity-10">
                  <CircleLoading big={true} />
                </div>
              )}
            </div>
            <div className="flex flex-row flex-wrap gap-6">
              {DURATION_TYPES.map((item, idx) => {
                return item !== "3M" ? (
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
                ) : (
                  <div
                    key={"duration-type-hidden" + idx}
                    className="hidden"
                  ></div>
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
