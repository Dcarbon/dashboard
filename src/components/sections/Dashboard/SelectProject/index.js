import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import stls from "./index.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import DcarbonAPI from "src/tools/hook";
import { ProjectACT } from "src/redux/actions/projectAction";
import Error from "src/components/ui/Error";
import SelectItem from "src/components/ui/Selection/SelectItem";
import Selection from "src/components/ui/Selection/Select";
import Slider from "react-slick";
import Heading from "src/components/ui/Heading";
import Button from "src/components/ui/Button";
import { SensorsACT } from "src/redux/actions/sensorsAction";
function SelectProject({ features, iotSelected, setIotSelected }) {
  const newDcarbon = new DcarbonAPI();
  const iotState = useSelector(newDcarbon.GetIOTState);
  const projectState = useSelector(newDcarbon.GetProjectState);
  const projectId = useMemo(
    () => iotState?.iot?.project,
    [iotState?.iot?.project]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectId) {
      dispatch({ type: ProjectACT.GET_PROJECT.REQUEST, payload: projectId });
    }
  }, [dispatch, projectId]);
  return (
    <div className={stls.main}>
      <Error
        clearErrType={ProjectACT.CLEAR_ERR}
        err={projectState?.error}
        err_code={projectState?.error_code}
      />
      {features?.length > 0 && (
        <Selection
          label={"Select node"}
          value={iotSelected}
          onChange={(e) => {
            dispatch({ type: SensorsACT.LOAD_SENSOR_1ST_TIME, payload: false });
            setIotSelected(e.target.value);
          }}
        >
          {features?.map((item) => (
            <SelectItem
              key={"iott-" + item}
              value={item}
              active={item === iotSelected}
            >
              {item}
            </SelectItem>
          ))}
        </Selection>
      )}
      {/* <h3 className="text-white uppercase text-lg mb-2">
        Project: &quot;{}&quot;
      </h3> */}

      {projectState?.project?.images?.length > 0 && (
        <SliderGroup
          images={projectState?.project?.images}
          projectId={projectState?.project?.id}
        />
      )}
    </div>
  );
}

export default SelectProject;
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
function SliderGroup({ images, projectId }) {
  const [showDialog, setShowDialog] = useState(false);
  const customProperties = {
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <BtnArr right />,
    prevArrow: <BtnArr />,
  };
  const responsiveSettings = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
  ];

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
                responsive={responsiveSettings}
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
                        maxHeight: "450px",
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
