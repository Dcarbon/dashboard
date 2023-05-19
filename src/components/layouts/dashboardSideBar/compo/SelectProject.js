import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import stls from "./SelectProject.module.scss";
import { Slide } from "react-slideshow-image";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import HookAPI from "src/tools/hook";
import { ProjectACT } from "src/redux/actions/projectAction";
import Error from "src/components/ui/Error";
// import Selection from "src/components/ui/Selection";
// import { listProject } from "src/tools/const";

function SelectProject(props) {
  // const [currentProject, setCurrentProject] = useState(0);
  // const [searchProject, setSearchProject] = useState(
  //   listProject[currentProject].label
  // );
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

  return (
    <div {...props}>
      <Error
        clearErrType={ProjectACT.CLEAR_ERR}
        err={projectState?.error}
        err_code={projectState?.error_code}
      />
      <h3 className='text-white uppercase text-lg mb-2'>
        Project {projectState?.project?.id ?? 0}
      </h3>
      <p className=' mb-4'>Project thumbnails</p>
      {projectState?.project?.images?.length > 0 && (
        <div className='list-img mb-6 -mr-12'>
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
                    className='w-36 h-auto'
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className='slide-container'>
              <Slide
                ref={slideRef}
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
                infinite={false}>
                {projectState?.project?.images?.map((slideImage, index) => (
                  <div key={index} className={stls.imgItem}>
                    <Image
                      unoptimized
                      priority
                      src={slideImage?.image}
                      alt={"Project " + projectState?.project?.id}
                      width={148}
                      height={90}
                      className='w-full h-auto'
                    />
                  </div>
                ))}
              </Slide>
            </div>
          )}
        </div>
      )}
      {/* <Selection
          isSearch
          size={"lg"}
          id={"project-search"}
          label={"Select or search project"}
          value={searchProject}
          onChange={(evt) => {
            const val = evt.target.value;
            if (currentProject !== val) {
              setSearchProject(listProject[val].label);
              setCurrentProject(val);
            }
          }}
          onSearch={(e) =>
            setSearchProject(e.target.value?.length > 0 ? e.target.value : "D")
          }>
          {listProject.map((item, key) => (
            <li
              key={"item-" + key}
              className={`text-[#B3B2B8] p-3 ${
                key < listProject?.length - 1
                  ? "border-b border-b-[#504F5A]"
                  : ""
              } ${
                currentProject === key
                  ? "text-[#504F5A]"
                  : "hover:bg-[#272541] rounded-sm cursor-pointer"
              }  `}
              value={key}>
              {item.label}
            </li>
          ))}
        </Selection> */}
    </div>
  );
}

export default SelectProject;
