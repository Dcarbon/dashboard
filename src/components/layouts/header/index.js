import Image from "next/image";
import { imgsDir, imgsObject } from "src/tools/const";
import stls from "./index.module.scss";
import FlexBetween from "src/components/ui/Stack/flex-between";
import Link from "next/link";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import useSWR from "swr";
import { CMS_HOST } from "src/redux/handle";
import { useRouter } from "next/router";
import ScrollBox from "src/components/ui/ScrollBox";
import Collapse from "src/components/ui/Collapse";
import { SensorsACT } from "src/redux/actions/sensorsAction";
import { useDispatch } from "react-redux";
//
//
//
//
//
//
const fetcher = (...args) => fetch(...args).then((res) => res.json());
function Header({ setFeatures, setErrFlyTo, mymap, setIotSelected }) {
  const { data } = useSWR(`${CMS_HOST}/api/v1/iots/geojson`, fetcher);
  const searchREF = useRef(null);
  const features = useMemo(() => data?.features, [data?.features]);
  const [searchKey, setSearchKey] = useState("");
  const [showIots, setShowIots] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    let clickOutSide = (event) => {
      if (event?.button === 0) {
        const btnContains = () => searchREF?.current?.contains(event.target);
        if (!btnContains()) {
          setShowIots(false);
        }
      }
    };
    document.addEventListener("mousedown", clickOutSide);
    return () => document.removeEventListener("mousedown", clickOutSide);
  }, []);
  const Flyto = (center, zoom) => {
    if (mymap) {
      try {
        mymap?.flyTo({
          center: center,
          zoom: zoom || 5,
        });
      } catch (error) {
        setErrFlyTo(true);
        console.error("Coordinates is invalid", error);
      }
    }
  };
  return (
    <header className="bg-[#0B0A12]">
      <div className="container w-full max-w-full px-4">
        <FlexBetween
          className={
            "space-x-2 space-y-4 md:space-y-0 p-3 flex-col md:flex-row justify-between items-center "
          }
        >
          <Link href={"/"} className={`${stls.logo} relative `}>
            <Image
              src={imgsDir(imgsObject.logo)}
              alt=""
              width={272}
              height={42}
              priority
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Link>
          <div ref={searchREF} className={stls.search}>
            <button className={`${stls.btn_first} ${stls.btn}`}>
              <MagnifyingGlassIcon width={24} height={24} />
            </button>
            <input
              className={stls.input}
              placeholder="Search project"
              value={searchKey}
              onKeyDown={(e) => {
                if (e.target.value?.length > 0 && !showIots) {
                  setShowIots(true);
                }
              }}
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button
              className={`${stls.btn_second} ${stls.btn} ${
                showIots ? stls.show : ""
              }`}
              onClick={() => setShowIots(!showIots)}
            >
              <ChevronDownIcon width={24} height={24} />
            </button>
            {features?.length && (
              <div
                className={`${stls.listResult} ${stls[showIots ? "show" : ""]}`}
              >
                <Collapse isOpen={showIots}>
                  <ScrollBox className={stls.scrollBox}>
                    <ul>
                      {features?.map((item) => {
                        let id = item?.properties?.id;
                        let coordinates = item.geometry?.coordinates;
                        let check = Boolean(
                          Number(router?.query?.lng) === coordinates[0] &&
                            Number(router?.query?.lat) === coordinates[1]
                        );
                        return coordinates[1] <= 90 && coordinates[1] >= -90 ? (
                          <li
                            key={id}
                            className={`${stls.item} ${
                              stls[check ? "current" : ""]
                            }`}
                            onClick={() => {
                              setShowIots(false);
                              // xóa trạng thái load sensor lần đầu
                              dispatch({
                                type: SensorsACT.LOAD_SENSOR_1ST_TIME,
                                payload: false,
                              });
                              // xóa project hiện tại
                              setFeatures([id]);
                              setIotSelected(id);
                              setTimeout(() => {
                                dispatch({
                                  type: SensorsACT.GET_SENSORS.REQUEST,
                                  payload: {
                                    skip: 0,
                                    limit: 50,
                                    iotId: id,
                                  },
                                });
                              }, 100);
                              router.push(
                                `/dashboard?lng=${coordinates[0]}&lat=${coordinates[1]}&zoom=13`
                              );
                              Flyto(coordinates, 12);
                            }}
                          >
                            <p>{id}</p>
                            <small>
                              [{coordinates[0]}, {coordinates[1]}]
                            </small>
                            {check && (
                              <small className={stls.checked}>
                                <CheckCircleIcon
                                  color="#72bf44"
                                  width={16}
                                  height={16}
                                />
                              </small>
                            )}
                          </li>
                        ) : (
                          <Fragment key={id}></Fragment>
                        );
                      })}
                    </ul>
                  </ScrollBox>
                </Collapse>
              </div>
            )}
          </div>
        </FlexBetween>
      </div>
    </header>
  );
}

export default Header;
