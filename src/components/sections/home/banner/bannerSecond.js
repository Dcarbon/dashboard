import Container from "src/components/ui/Container";
import Heading from "src/components/ui/Heading";
import Section from "src/components/ui/Section";
import stls from "./bannerSecond.module.scss";
import { imgsObject } from "src/tools/const";
import { CMS_HOST, videoBanner } from "src/redux/handle";
import { useEffect, useRef, useState } from "react";
function BannerSecond() {
  const secREF = useRef(null);
  const [actived, setActived] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const distance = 200;
  useEffect(() => {
    const handleShow = () => {
      const windowHeight = window.innerHeight; // chiều cao hiện tại của window
      const boundingBoxTop = secREF?.current?.getBoundingClientRect().top; // vị trí hiện tại của bounding so với top
      if (
        boundingBoxTop + distance >= 0 &&
        boundingBoxTop < windowHeight - distance // boundingbox nhỏ hơn khoảng 160 tính khoảng cách từ đầu window
      ) {
        setActived(true);
      }
    };
    if (!loaded) {
      setLoaded(true);
      handleShow();
    }
    window.addEventListener("scroll", handleShow);
    return () => {
      window.removeEventListener("scroll", handleShow);
    };
  }, [loaded]);
  useEffect(() => {
    if (loaded && actived) {
      secREF?.current?.play();
    }
  }, [loaded, actived]);
  return (
    <Section
      className={`relative ${stls.section}`}
      bgImageUrl={imgsObject.home_banner2}
    >
      {/* <Container> */}
      <div className="flex flex-col container mx-auto">
        {/* <div className={stls.heading_left}> */}
        {/* <Heading Tag={"h1"} className={stls.bigHeading}>
              Fair to us
            </Heading> */}
        {/* <video ref={secREF} src={videoBanner} controls={true} type="video/mp4"></video> */}      
        <iframe height={800} src="https://www.youtube.com/embed/XdH5eEPr-do?si=xhXLwhQvwoCSgPjl"               
        allow="accelerometer; 
        autoplay; 
        clipboard-write; encrypted-media; gyroscope; 
        picture-in-picture; web-share" 
        ></iframe>              
                
        {/* </div>  */}
        {/* <div className={stls.heading_right}> */}
        {/* <Heading Tag={"h1"} className={stls.bigHeading}>
              Fair to earth            
            </Heading> */}

        {/* </div>           */}
      </div>
      {/* </Container> */}
    </Section>
  );
}

export default BannerSecond;
