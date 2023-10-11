import {
  CheckCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import stls from "./search.module.scss";
import Collapse from "src/components/ui/Collapse";
import ScrollBox from "src/components/ui/ScrollBox";
import { useAllFeatures } from "../handleData";
import { useRouter } from "next/router";
function Search() {
  const [isShowList, setIsShowList] = useState(false);
  return (
    <div className="relative">
      <Field isShowList={isShowList} setIsShowList={setIsShowList} />
      <div className={`absolute top-full right-0 w-full z-10 mt-2`}>
        <List isShowList={isShowList} setIsShowList={setIsShowList} />
      </div>
    </div>
  );
}

export default Search;

//
//
//
// Field
function Field({ setIsShowList, isShowList }) {
  const SearchIcon = () => (
    <button className="p-3">
      <MagnifyingGlassIcon
        width={24}
        height={24}
        className="text-extended-400"
      />
    </button>
  );
  const SearchInput = () => (
    <div className="flex-1 h-full">
      <input
        name="iot-id"
        placeholder="Search iot"
        className="p-2 w-full h-full border-none focus-visible:border-none focus:border-none outline-none bg-transparent placeholder:text-extended-300 text-white"
      />
    </div>
  );
  const SearchArrow = () => (
    <button
      className={`p-3 ${stls.arrowBtn} ${isShowList ? stls.active : ""}`}
      onClick={() => setIsShowList(!isShowList)}
    >
      <ChevronDownIcon width={24} height={24} className="text-extended-400" />
    </button>
  );
  return (
    <div className="rounded-md border border-extended-700 bg-extended-800">
      <div className="flex flex-row items-center min-w-[372px]">
        <SearchIcon />
        <SearchInput />
        <SearchArrow />
      </div>
    </div>
  );
}

//
//
//
// List
function List({ setIsShowList, isShowList }) {
  const router = useRouter();
  const features = useAllFeatures();
  return (
    <div
      className={`flex flex-col max-h-56 overflow-hidden rounded-md border ${
        isShowList ? "border-extended-700" : "border-transparent"
      }`}
    >
      <ScrollBox>
        <Collapse isOpen={isShowList}>
          <ul className="py-3 px-2 bg-extended-800">
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
                  className={`transition-all py-4 px-4 hover:px-6 cursor-pointer hover:bg-opacity-25 hover:bg-black rounded-md ${
                    stls[check ? "current" : ""]
                  }`}
                  onClick={() => {
                    setIsShowList(false);
                    router.push(router.pathname + `?iot=` + id);
                  }}
                >
                  <p>{id}</p>
                  {check && (
                    <small>
                      <CheckCircleIcon color="#72bf44" width={16} height={16} />
                    </small>
                  )}
                </li>
              ) : (
                <Fragment key={id}></Fragment>
              );
            })}
          </ul>
        </Collapse>
      </ScrollBox>
    </div>
  );
}
