import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCurrentIOTState } from "src/DashboardComponents/handleData";
import { imgsDir, imgsObject } from "src/tools/const";
const Arrow = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1604_7037)">
        <path
          d="M13.825 7.15703L10 10.9737L6.175 7.15703L5 8.33203L10 13.332L15 8.33203L13.825 7.15703Z"
          fill="#72BF44"
        />
      </g>
      <defs>
        <clipPath id="clip0_1604_7037">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(20 20) rotate(-180)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

function Description() {
  const boxRef = useRef(null);
  // const [isShowBtn, setIsShowBtn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [iotID] = useCurrentIOTState();

  // useEffect(() => {
  //   if (iotID) {
  //     console.log("boxRef ------,");
  //     console.log("boxRef ------,");
  //     console.log("boxRef ------,");
  //     console.log("boxRef ------,", boxRef);
  //   }
  // }, [iotID]);
  console.log("iotID", iotID);
  // const projectDetail = useMemo(() => {
  //   let newD = new DcarbonAPI();
  //   return newD.ProjectInfo(?.id);
  // }, [project?.id]);

  return (
    <div className="h-full border border-extended-700 rounded-md bg-extended-800">
      <div
        className={`p-5`}
        style={{
          boxShadow: "rgb(0 0 0 / 30%) 0px -34px 20px -25px inset",
        }}
      >
        <h3 className="text-H-S leading-H-S text-white mb-6">Description</h3>
        <div className="flex flex-col gap-6">
          <div className="flex-1 text-B-S leading-B-S text-extended-400">
            <div
              ref={boxRef}
              className={`${
                !isOpen
                  ? "line-clamp-6 text-ellipsis   overflow-hidden"
                  : "h-auto"
              }`}
            >
              <p className="mb-2">
                With a daily amount of <span className="text-white">1000</span>{" "}
                kg waste, if it is not properly treated, it will cause
                environmental pollution, affecting the ecosystem in the area,
                leading to the death of the ecosystem within the region, as well
                as emitting tens or even hundreds of tons of greenhouse gases
                into the atmosphere every year.
              </p>
              <p className="mb-2">
                Therefore, when implementing a processing system with machine
                capacity <span className="text-white">500</span> kVA,
                environmental concerns will be thoroughly addressed and the
                health of the residents (HOW MANY HOUSEHOLDS) in the area will
                be protected, as well as the ability to transparently measure
                and monitor the waste treatment process on a daily and hourly
                basis.
              </p>
              <p className="mb-2">
                With a daily amount of <span className="text-white">1000</span>{" "}
                kg waste, if it is not properly treated, it will cause
                environmental pollution, affecting the ecosystem in the area,
                leading to the death of the ecosystem within the region, as well
                as emitting tens or even hundreds of tons of greenhouse gases
                into the atmosphere every year.
              </p>
              <p className="mb-2">
                Therefore, when implementing a processing system with machine
                capacity <span className="text-white">500</span> kVA,
                environmental concerns will be thoroughly addressed and the
                health of the residents (HOW MANY HOUSEHOLDS) in the area will
                be protected, as well as the ability to transparently measure
                and monitor the waste treatment process on a daily and hourly
                basis.
              </p>
            </div>
          </div>
          <div className="text-right">
            <p
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex hover:cursor-pointer hover:underline text-primary"
            >
              <span className="mr-0.5">View {isOpen ? "less" : "details"}</span>
              <span
                className={`transition-all ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                <Arrow />
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center border-t p-5 border-extended-700">
        <div className="inline-block rounded-full bg-[#776CB1]">
          <Image
            src={imgsDir(imgsObject.Icon_Trash)}
            alt=""
            width={40}
            height={40}
          />
        </div>
        <div className="text-B-M leading-B-M text-extended-400">
          <p>
            <span className="text-H-L leading-H-L text-white">1000</span> kg/day
          </p>
        </div>
      </div>
    </div>
  );
}

export default Description;
