import Image from "next/image";
import { imgsDir, imgsObject } from "src/tools/const";
import stls from "./index.module.scss";
import FlexBetween from "src/components/ui/Stack/flex-between";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
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
function Header({ features, iotSelected, setIotSelected, mymap }) {
  const searchREF = useRef(null);
  const [searchKey, setSearchKey] = useState("");
  const [showIots, setShowIots] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const Flyto = (center, zoom) => {
    if (mymap) {
      try {
        mymap?.flyTo({
          center: center,
          zoom: zoom,
        });
      } catch (error) {
        console.error(" Header flyto :", error);
      }
    }
  };
  const HANDLE_FLY_on_load = (id) => {
    let newZoom = 13;
    let newCenter = [];
    if (id && features) {
      const findIot = features.find(
        (item) => Number(item.properties.id) === Number(id)
      );
      newCenter = findIot?.geometry?.coordinates;
      newZoom = 13;
    }
    if (newCenter?.length) {
      Flyto(newCenter, newZoom);
    }
    setIotSelected(id);
    router.push(`/dashboard?iot=${id}`);
  };
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
                        let check = Boolean(Number(id) === Number(iotSelected));
                        return coordinates[1] <= 90 && coordinates[1] >= -90 ? (
                          <li
                            key={id}
                            className={`${stls.item} ${
                              stls[check ? "current" : ""]
                            }`}
                            onClick={() => {
                              setShowIots(false);
                              HANDLE_FLY_on_load(id);
                            }}
                          >
                            <p>{id}</p>

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
