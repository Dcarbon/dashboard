import Glide from "@glidejs/glide";
import Image from "next/image";
import { useEffect } from "react";
import { imgsDir, imgsObject } from "src/tools/const";
import stls from "./index.module.scss";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
const images = [
  imgsDir(imgsObject.project_img_1),
  imgsDir(imgsObject.project_img_2),
  imgsDir(imgsObject.project_img_3),
  imgsDir(imgsObject.project_img_4),
  imgsDir(imgsObject.project_img_5),
];
function MyGlide() {
  useEffect(() => {
    let check = false;
    if (!window && !check) return;

    new Glide("#glide", {
      startAt: 2,
      perView: 3,
      focusAt: "center",
      type: "slide",
      gap: 10,
      // autoplay: 8000,
      animationDuration: "500",
      rewind: true,
      breakpoints: {
        800: {
          perView: 1,
        },
        1280: {
          perView: 3,
        },
      },
    }).mount();

    return () => {
      check = false;
    };
  }, []);

  return (
    <div id="glide" className={stls.slider}>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {images?.map((item, idx) => (
            <li key={"idx-" + idx} className={`glide__slide ${stls.slide}`}>
              <div className={`${stls.imgs} `}>
                <Image
                  className={stls.left}
                  src={item}
                  alt={"Project image " + idx}
                  width={452}
                  height={262}
                />
                <Image
                  className={stls.center}
                  src={item}
                  alt={"Project image " + idx}
                  width={452}
                  height={262}
                />
                <Image
                  className={stls.right}
                  src={item}
                  alt={"Project image " + idx}
                  width={452}
                  height={262}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={stls.btn}>
        <div className={`glide__arrows`} data-glide-el="controls">
          <button
            className={`glide__arrow glide__arrow--left ${stls.btn_left}`}
            data-glide-dir="<"
          >
            <ChevronLeftIcon width={24} height={24} />
          </button>
          <button
            className={`glide__arrow glide__arrow--right ${stls.btn_right}`}
            data-glide-dir=">"
          >
            <ChevronRightIcon width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyGlide;
