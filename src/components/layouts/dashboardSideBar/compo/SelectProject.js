import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import stls from "./SelectProject.module.scss";
import { Slide } from "react-slideshow-image";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import HookAPI from "src/tools/hook";
import { ProjectACT } from "src/redux/actions/projectAction";
import Error from "src/components/ui/Error";
function SelectProject(props) {
  const newHook = new HookAPI();
  const iotState = useSelector(newHook.GetIOTState);
  const projectState = useSelector(newHook.GetProjectState);
  const projectId = useMemo(
    () => iotState?.iot?.project,
    [iotState?.iot?.project]
  );
  const [showPrev, setShowPrev] = useState(true);
  const [showNext, setShowNext] = useState(true);
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
      <button className={`${stls.btnSlide} ${!showPrev && "hidden"} ml-2 `}>
        <ChevronLeftIcon width={16} />
      </button>
    ),
    nextArrow: (
      <button className={`${stls.btnSlide} ${!showNext && "hidden"} mr-12`}>
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
  return (
    <div {...props}>
      <Error
        clearErrType={ProjectACT.CLEAR_ERR}
        err={projectState?.error}
        err_code={projectState?.error_code}
      />
      <h3 className="text-white uppercase text-lg mb-2">
        Project {projectState?.project?.id ?? 0}
      </h3>

      {projectState?.project?.images?.length > 0 && (
        <Fragment>
          <p className=" mb-4">Project thumbnails</p>
          <div className="list-img mb-6 -mr-12">
            {projectState?.project?.images?.length < 3 ? (
              <div>
                {projectState?.project?.images?.map((slideImage, index) => (
                  <div key={index} className={stls.imgItem}>
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
              </div>
            ) : (
              <div className="slide-container">
                <Slide
                  ref={slideRef}
                  responsive={responsiveSettings}
                  onStartChange={(from, to) => {
                    let max = projectState?.project?.images?.length - 1;
                    let min = 0;
                    if (from < to) {
                      if (!showPrev) setShowPrev(true);
                      // to === 0 => show next hide prev
                      if (to === max) setShowNext(false);
                    } else {
                      if (!showNext) setShowNext(true);
                      // to === max => hide next show prev
                      if (to === min) setShowPrev(false);
                    }
                  }}
                  cssClass={stls.Slide}
                  {...customProperties}
                  infinite={false}
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
