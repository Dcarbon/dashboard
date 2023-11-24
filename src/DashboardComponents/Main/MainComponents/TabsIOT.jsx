import { useEffect, useMemo, useState } from "react";
import { roundup_second } from "src/DashboardComponents/handleConfig";
import CircleLoading from "src/components/ui/Loading/CircleLoading";
import { useCurrentIOT, useIotState } from "src/hook/useIOT";
import { AxiosGet } from "src/redux/sagaUtils";

function TabsIOT({ onChangeIOT }) {
  const iotState = useIotState();
  const iots_by_project = useMemo(
    () => iotState?.iots_by_project,
    [iotState?.iots_by_project]
  );

  const [currenid, setCurrentId] = useCurrentIOT();
  const handleCheckActive = (id, setActive, setLoading) => {
    setLoading(true);
    let newDate = new Date();
    let to = roundup_second(newDate);
    newDate.setTime(newDate.getTime() - 1000 * 60 * 5);
    let from = roundup_second(newDate);
    let url = `iots/${id}/is-actived?from=${from}&to=${to}`;
    AxiosGet(url).then((res) => {
      let _res_ = res.data.actived;
      setActive(_res_);
      setLoading(false);
    });
  };
  return (
    <div className='pr-3 md:pr-0 md:pb-3 lg:pr-3 lg:pb-0'>
      {iots_by_project?.length > 0 && (
        <ul className='mt-4 md:mt-0 w-full md:w-auto lg:w-full flex md:inline-flex lg:flex flex-col md:flex-row lg:flex-col gap-1 sm:gap-2 md:gap-4 lg:gap-6'>
          {iots_by_project?.map((item) => (
            <ItemTab
              key={"item-" + item?.id}
              item={item}
              onChangeIOT={onChangeIOT}
              isCurrent={Boolean(Number(item.id) === Number(currenid))}
              setCurrentId={setCurrentId}
              handleCheckActive={handleCheckActive}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TabsIOT;
function ItemTab({
  setCurrentId,
  item,
  onChangeIOT,
  handleCheckActive,
  isCurrent,
}) {
  let [isActive, setIsActive] = useState(false);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item?.id) {
      handleCheckActive(item.id, setIsActive, setLoading);
      let newInterval = setInterval(
        () => handleCheckActive(item.id, setIsActive, setLoading),
        10000
      );
      return () => {
        clearInterval(newInterval);
      };
    }
  }, [handleCheckActive, item]);

  return (
    <li
      className={`w-full md:w-64 lg:w-full border border-extended-600 rounded-md ${
        isCurrent
          ? "bg-extended-100 hover:bg-extended-200 hidden md:block"
          : "bg-extended-900 hover:bg-extended-800"
      }  transition-all duration-300`}
      onClick={(e) => {
        onChangeIOT(e);
        setCurrentId(item.id);
      }}
    >
      <div className='py-3 px-5 '>
        <p
          className={`text-B-M leading-B-M ${
            isCurrent ? "text-extended-700" : "text-extended-400"
          }`}
        >
          {loading ? (
            <CircleLoading small />
          ) : (
            <>
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  isActive ? "bg-primary" : "bg-extended-400"
                } align-middle mr-2 mb-0.5`}
              />
              {isActive ? "Active" : "Inactived"}
            </>
          )}
        </p>
        <h4
          className={`text-T-M leading-T-M ${
            isCurrent ? "text-extended-900" : "text-extended-300"
          }`}
        >
          Device IOT {item?.id}
        </h4>
      </div>
    </li>
  );
}
