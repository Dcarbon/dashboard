import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Button from "src/components/ui/Button";
import stls from "./index.module.scss";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Heading from "src/components/ui/Heading";
function ImageProject({ project }) {
  return (
    project?.images?.length > 0 && (
      <SliderGroup images={project?.images} projectId={project?.id} />
    )
    // iotSelected > 0 &&
    // projectState?.project?.images?.length > 0 && (

    // )
  );
}

export default ImageProject;

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
// Slide Image
// Slide ImageSlide ImageSlide
//
// --------------------
// --------------------
// --------------------
// --------------------
// --------------------
// --------------------
// --------------------
// --------------------
//
//
//
function SliderGroup({ images, projectId }) {
  const [showDialog, setShowDialog] = useState(false);
  const customProperties = {
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <BtnArr right />,
    prevArrow: <BtnArr />,
  };
  // const responsiveSettings = [
  //   {
  //     breakpoint: 1024,
  //     settings: {
  //       slidesToShow: 2,
  //     },
  //   },
  //   {
  //     breakpoint: 768,
  //     settings: {
  //       slidesToShow: 3,
  //     },
  //   },
  // ];

  const dialogREF = useRef(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const [navState, setNavState] = useState({ nav1: null, nav2: null });
  useEffect(() => {
    if (slider1?.current && slider2?.current) {
      setNavState({
        nav1: slider1?.current,
        nav2: slider2?.current,
      });
    }
  }, [setNavState]);
  return (
    <div id={stls.SliderGroup}>
      <div className={stls.defaultSlide}>
        <div className={stls.static}>
          <div className={`mb-6 ${stls.thumbnails}`}>
            <div className={stls["slide-container"]}>
              <Slider
                className={stls.Slide}
                autoplay={false}
                speed={500}
                {...customProperties}
                // responsive={responsiveSettings}
                infinite={true}
                dots={true}
              >
                {images?.map((slideImage, index) => {
                  return (
                    <div key={index} className={`${stls.imgItem} `}>
                      <div
                        onClick={() => {
                          setShowDialog(true);
                          slider1?.current?.slickGoTo(index);
                        }}
                      >
                        <Image
                          unoptimized
                          quality={60}
                          src={slideImage?.image}
                          alt={"Project " + projectId}
                          width={200}
                          height={120}
                          style={{
                            width: "auto",
                            height: "auto",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${stls.dialog} ${showDialog ? stls.active : ""}`}
        ref={dialogREF}
      >
        <div className={stls.box}>
          <div className={stls.dialog_header}>
            <Heading Tag={"h4"} className={"text-white"}>
              DCarbon Picture
            </Heading>
            <span className={stls.btn} onClick={() => setShowDialog(false)}>
              <XMarkIcon width={24} height={24} />
            </span>
          </div>
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
                      alt=''
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
                      arrows: false,
                    },
                  },
                ]}
              >
                {images?.map((item, idx) => {
                  return (
                    <div key={item?.id} className={stls.img}>
                      <Image
                        unoptimized
                        alt=''
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
              <Button className={stls.btn} onClick={() => setShowDialog(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
