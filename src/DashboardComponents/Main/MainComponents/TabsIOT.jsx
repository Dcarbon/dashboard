import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import {
  useCurrentIOTState,
  useIOTState,
} from "src/DashboardComponents/handleData";

function TabsIOT({ open }) {
  const iotState = useIOTState();
  const iots_by_project = useMemo(
    () => iotState?.iots_by_project,
    [iotState?.iots_by_project]
  );

  const router = useRouter();
  const [currentId] = useCurrentIOTState();

  return (
    <div className={open ? "block" : "  lg:block"}>
      {iots_by_project?.length > 0 && (
        <ul className="mt-4 flex flex-col md:flex-row lg:flex-col gap-1 sm:gap-2 md:gap-4 lg:gap-6">
          {iots_by_project?.map((item) => {
            const isActive = Boolean(Number(currentId) === Number(item?.id));
            return (
              <li
                key={"item-" + item?.id}
                className={`border border-extended-600 rounded-md ${
                  isActive
                    ? "bg-extended-100 hover:bg-extended-200"
                    : "bg-extended-900 hover:bg-extended-800"
                }  transition-all duration-300`}
              >
                <Link
                  href={router?.pathname + "?iot=" + item?.id}
                  scroll={false}
                >
                  <div className="py-3 px-5 ">
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
                    <p
                      className={`text-T-M leading-T-M ${
                        isActive ? "text-extended-900" : "text-extended-300"
                      }`}
                    >
                      Device IOT {item?.id}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default TabsIOT;
