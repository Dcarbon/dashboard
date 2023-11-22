import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import stls from "./ImageProject.module.scss";
import Slider from "react-slick";
import Image from "next/image";
import { useState } from "react";
import { useProjectState } from "src/hook/useProject";
function ImageProject({ setIsShow }) {
  const projectState = useProjectState();
  const project = projectState.project;
  return (
    <div className="mt-10 pt-5 px-4 lg:px-0">
      <h3 className="text-T-L leading-T-L text-extended-200 mb-5">
        Picture project
      </h3>
      {project?.images?.length > 0 ? (
        <div className={stls.boxSlider}>
          <div className={stls.boxBG}>
            <SliderGroup
              images={project?.images}
              projectId={project?.id}
              setIsShow={setIsShow}
            />
          </div>
        </div>
      ) : (
        <h4 className="rounded-md py-5 px-6 border border-extended-700">
          No images
        </h4>
      )}
    </div>
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
function SliderGroup({ images, projectId, setIsShow }) {
  const [current, setCurrent] = useState(0);

  return (
    <Slider
      autoplay={false}
      speed={500}
      infinite={false}
      dots={true}
      centerPadding={20}
      lazyLoad="anticipated"
      className={stls.Slider}
      slidesToShow={4}
      slidesToScroll={1}
      afterChange={(curSlide) => setCurrent(curSlide)}
      nextArrow={current < images?.length - 4 ? <BtnArr right /> : undefined}
      prevArrow={current !== 0 ? <BtnArr /> : undefined}
      responsive={[
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            nextArrow:
              current < images?.length - 3 ? <BtnArr right /> : undefined,
          },
        },
        {
          breakpoint: 525,
          settings: {
            slidesToShow: 2,
            nextArrow:
              current < images?.length - 3 ? <BtnArr right /> : undefined,
          },
        },
      ]}
    >
      {images?.map((slideImage, index) => {
        return (
          <div key={index} className={stls.item}>
            <div onClick={() => setIsShow(true)} className={stls.img}>
              <Image
                unoptimized
                src={slideImage?.image}
                alt={"Project " + projectId}
                fill
                style={{
                  borderRadius: 5,
                }}
              />
            </div>
          </div>
        );
      })}
    </Slider>
  );
}
