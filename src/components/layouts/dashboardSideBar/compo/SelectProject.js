/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useMemo, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import stls from "./SelectProject.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import HookAPI from "src/tools/hook";
import { ProjectACT } from "src/redux/actions/projectAction";
import Error from "src/components/ui/Error";
import SelectItem from "src/components/ui/Selection/SelectItem";
import Selection from "src/components/ui/Selection/Select";
import Slider from "react-slick";
function SelectProject({ features, iotSelected, setIotSelected }) {
  const newHook = new HookAPI();
  const iotState = useSelector(newHook.GetIOTState);
  const projectState = useSelector(newHook.GetProjectState);
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

  // get project name
  const projectName = useMemo(() => {
    const descs = projectState?.project?.descs;
    if (descs?.length > 0) {
      return (
        descs.find((item) => item?.language === "vi").desc ||
        projectState.project.id
      );
    }
    return projectState?.project?.id;
  }, [projectState?.project?.descs, projectState?.project?.id]);
  return (
    <div>
      <Error
        clearErrType={ProjectACT.CLEAR_ERR}
        err={projectState?.error}
        err_code={projectState?.error_code}
      />
      {features?.length > 0 && (
        <Selection
          label={"Select node"}
          value={iotSelected}
          onChange={(e) => setIotSelected(e.target.value)}
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
      <h3 className="text-white uppercase text-lg mb-2">
        Project: &quot;{projectName}&quot;
      </h3>

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
  console.log("images", images);
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
  const settingsVariable = {
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
  };
  const dialogREF = useRef(null);
  // useEffect(() => {
  //   let check = false;
  //   if (!document) return;
  //   let bodyREF = document.getElementsByTagName("body");
  //   console.log("boduy", bodyREF[0]);
  //   if (!check && dialogREF.current) {
  //     bodyREF[0].append(dialogREF.current);
  //     check = true;
  //   }
  //   return () => (check = false);
  // }, []);

  return (
    <div id={stls.SliderGroup}>
      {/* <Slider>
        <div className={stls.static}>
          <p className=" mb-4">Thumbnails</p>
          <div className={`mb-6 ${stls.thumbnails}`}>
            <div className={stls["slide-container"]}>
              <Slider
                className={stls.Slide}
                autoplay={false}
                speed={500}
                responsive={responsiveSettings}
                {...customProperties}
                infinite={true}
                dots={true}
              >
                {images?.map((slideImage, index) => (
                  <div key={index} className={`${stls.imgItem} `}>
                    <div>
                      <Image
                        unoptimized
                        priority
                        src={slideImage?.image}
                        alt={"Project " + projectId}
                        width={148}
                        height={90}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </Slider> */}
      <div className={stls.dialog} ref={dialogREF}>
        <div className={stls.dialog_content}>
          {/* <Slider
            className={stls.sider_main}
            slidesToShow={1}
            slidesToScroll={1}
            infinite
            autoplay
          >
            {images?.map((item) => (
              <div key={item?.id} className={stls.img}>
                <Image src={item?.image} alt="" fill />
              </div>
            ))}
          </Slider> */}
          <Slider dots infinite speed={500} slidesToShow={1} slidesToScroll={1}>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>

          {/* <Slider className={stls.sider_nav} {...settingsVariable}>
            {images?.map((item) => (
              <div key={item?.id} className={stls.img}>
                <Image
                  src={item?.image}
                  alt=""
                  width={100}
                  height={100}
                  style={{ width: "auto", height: "100%" }}
                  quality={20}
                />
              </div>
            ))}
          </Slider> */}
        </div>
      </div>
    </div>
  );
}
