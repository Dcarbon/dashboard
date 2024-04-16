import Container from "src/components/ui/Container";
import Heading from "src/components/ui/Heading";
import Section from "src/components/ui/Section";
import stls from "./bannerSecond.module.scss";
import { imgsObject } from "src/tools/const";
function BannerSecond() {
  return (
    <Section
      className={`relative ${stls.section}`}
      bgImageUrl={imgsObject.home_banner2}
    >
      <div className="flex flex-col container mx-auto">        
        <iframe
          height={800}
          src="https://www.youtube.com/embed/XdH5eEPr-do?si=xhXLwhQvwoCSgPjl"
          allow="accelerometer; 
      autoplay; 
      clipboard-write; encrypted-media; gyroscope; 
      picture-in-picture; web-share"
        ></iframe>      
      </div>      
    </Section>
  );
}

export default BannerSecond;
