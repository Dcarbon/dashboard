import { useMemo } from "react";
import { useCurrentIOT, useIotState } from "src/hook/useIOT";

function TabsIOT({ onChangeIOT }) {
  const iotState = useIotState();
  const iots_by_project = useMemo(
    () => iotState?.iots_by_project,
    [iotState?.iots_by_project]
  );

  const [currentId, setCurrentId] = useCurrentIOT();

  return (
    <div className='pr-3 md:pr-0 md:pb-3 lg:pr-3 lg:pb-0'>
      {iots_by_project?.length > 0 && (
        <ul className='mt-4 md:mt-0 w-full md:w-auto lg:w-full flex md:inline-flex lg:flex flex-col md:flex-row lg:flex-col gap-1 sm:gap-2 md:gap-4 lg:gap-6'>
          {iots_by_project?.map((item) => {
            const isActive = Boolean(Number(currentId) === Number(item?.id));
            return (
              <li
                key={"item-" + item?.id}
                className={`w-full md:w-64 lg:w-full border border-extended-600 rounded-md ${
                  isActive
                    ? "bg-extended-100 hover:bg-extended-200 hidden md:block"
                    : "bg-extended-900 hover:bg-extended-800"
                }  transition-all duration-300`}
                onClick={() => {
                  onChangeIOT();
                  setCurrentId(item.id);
                }}
              >
                <div className='py-3 px-5 '>
                  <p
                    className={`text-B-M leading-B-M ${
                      isActive ? "text-extended-700" : "text-extended-400"
                    }`}
                  >
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        isActive ? "bg-primary" : "bg-extended-400"
                      } align-middle mr-2 mb-0.5`}
                    />
                    {isActive ? "Active" : "Inactived"}
                  </p>
                  <h4
                    className={`text-T-M leading-T-M ${
                      isActive ? "text-extended-900" : "text-extended-300"
                    }`}
                  >
                    Device IOT {item?.id}
                  </h4>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default TabsIOT;
