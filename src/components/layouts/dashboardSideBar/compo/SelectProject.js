import { Fragment, useEffect, useMemo, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import stls from "./SelectProject.module.scss";
import { Slide } from "react-slideshow-image";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import HookAPI from "src/tools/hook";
import { ProjectACT } from "src/redux/actions/projectAction";
import Error from "src/components/ui/Error";
import SelectItem from "src/components/ui/Selection/SelectItem";
import Selection from "src/components/ui/Selection/Select";
import FlexBetween from "src/components/ui/Stack/flex-between";
function SelectProject({ features, iotSelected, setIotSelected }) {
  const newHook = new HookAPI();
  const iotState = useSelector(newHook.GetIOTState);
  const projectState = useSelector(newHook.GetProjectState);
  const projectId = useMemo(
    () => iotState?.iot?.project,
    [iotState?.iot?.project]
  );
  const dispatch = useDispatch();
  const slideRef = useRef(null);

  useEffect(() => {
    if (projectId) {
      dispatch({ type: ProjectACT.GET_PROJECT.REQUEST, payload: projectId });
    }
  }, [dispatch, projectId]);
  const customProperties = {
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: (
      <button className={`${stls.btnSlide}   ml-2 `}>
        <ChevronLeftIcon width={16} />
      </button>
    ),
    nextArrow: (
      <button className={`${stls.btnSlide}  mr-12`}>
        <ChevronRightIcon width={16} />
      </button>
    ),
  };
  const responsiveSettings = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
      },
    },
  ];
  const projectName = useMemo(() => {
    const descs = projectState?.project?.descs;
    if (descs?.length > 0) {
      console.log(
        "descs.filter(item => item?.language === )",
        descs.filter((item) => item?.language === "vi")
      );
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
        <Fragment>
          <p className=" mb-4">Thumbnails</p>
          <div className="list-img mb-6 -mr-12">
            {projectState?.project?.images?.length < 3 ? (
              <FlexBetween>
                {projectState?.project?.images?.map((slideImage, index) => (
                  <div key={index} className={`${stls.imgItem} w-1/2`}>
                    <Image
                      unoptimized
                      priority
                      src={slideImage?.image}
                      alt={"Project " + projectState?.project?.id}
                      width={148}
                      height={90}
                      className="w-36 h-auto"
                    />
                  </div>
                ))}
              </FlexBetween>
            ) : (
              <div className="slide-container">
                <Slide
                  ref={slideRef}
                  responsive={responsiveSettings}
                  cssClass={stls.Slide}
                  {...customProperties}
                  infinite={true}
                >
                  {projectState?.project?.images?.map((slideImage, index) => (
                    <div key={index} className={stls.imgItem}>
                      <Image
                        unoptimized
                        priority
                        src={slideImage?.image}
                        alt={"Project " + projectState?.project?.id}
                        width={148}
                        height={90}
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </Slide>
              </div>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default SelectProject;
