import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Slider from "react-slick";
import Heading from "src/components/ui/Heading";
import stls from "./ImageDialog.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "src/components/ui/Button";
import Image from "next/image";
import { useProject } from "src/hook/useProject";
function ImageDialog({ isShow, setIsShow }) {
  const dialogREF = useRef(null);

  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const [navState, setNavState] = useState({ nav1: null, nav2: null });
  const projectInfo = useProject();
  const images = useMemo(() => projectInfo[0]?.images, [projectInfo]);
  useEffect(() => {
    if (slider1?.current && slider2?.current) {
      setNavState({
        nav1: slider1?.current,
        nav2: slider2?.current,
      });
    }
  }, [setNavState]);
  return (
    <div
      className={`${stls.dialog} ${isShow ? stls.active : ""}`}
      ref={dialogREF}
    >
      <div
        className={`${stls.box} transition-all duration-500 ${
          isShow ? "scale-100 opacity-100" : "scale-0 opacity-50"
        }`}
      >
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        <div className={stls.dialog_header}>
          <Heading Tag={"h4"} className={"text-white"}>
            DCarbon Picture
          </Heading>
          <span className={stls.btn} onClick={() => setIsShow(false)}>
            <XMarkIcon width={24} height={24} />
          </span>
        </div>

        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        <div className="p-3">
          <div className={stls.dialog_content}>
            <Slider
              className={stls.sider_main}
              asNavFor={navState.nav2}
              ref={slider1}
              infinite={false}
              arrows={false}
            >
              {images?.map((item) => {
                return (
                  <div key={item?.id} className={stls.img}>
                    <Image
                      className={stls.img_}
                      unoptimized
                      quality={50}
                      src={item?.image}
                      alt=""
                      width={500}
                      height={500}
                      style={{
                        maxWidth: "100%",
                        width: "auto",
                        height: "auto",
                      }}
                    />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>

        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        <div className={stls.bottom}>
          <Slider
            asNavFor={navState.nav1}
            ref={slider2}
            className={stls.sider_nav}
            nextArrow={<BtnArr right />}
            prevArrow={<BtnArr />}
            focusOnSelect={true}
            variableWidth={true}
            infinite={false}
            accessibility
            responsive={[
              {
                breakpoint: 768,
                settings: {
                  // arrows: false,
                },
              },
            ]}
          >
            {images?.map((item, idx) => {
              return (
                <div key={item?.id} className={stls.img}>
                  <Image
                    unoptimized
                    alt=""
                    key={"nav-" + idx}
                    src={images[idx]?.image}
                    width={60}
                    height={100}
                    quality={10}
                    style={{ width: "auto", height: "60px" }}
                  />
                </div>
              );
            })}
          </Slider>
          <Button className={stls.btn} onClick={() => setIsShow(false)}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ImageDialog;

//
//
//
//
//
//
function BtnArr({ onClick, right }) {
  return (
    <button
      className={`${stls.btnSlide} ${right ? stls.right : stls.left}`}
      onClick={onClick}
    >
      {right ? <ChevronRightIcon width={16} /> : <ChevronLeftIcon width={16} />}
    </button>
  );
}
